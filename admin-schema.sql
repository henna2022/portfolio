-- ============================================================
--  포트폴리오 Admin / Analytics 스키마  (Supabase · PostgreSQL)
--  Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 Run 하세요.
--  (여러 번 실행해도 안전하도록 작성됨)
--  ⚠️ 관리자 이메일 insert 는 주석 처리돼 있습니다 (이 파일은 public 저장소에 있음).
--     아래 admin_emails 절의 안내대로 본인 계정으로 직접 한 번 실행해야 합니다.
-- ============================================================

-- ---------- 관리자 이메일 허용목록 ----------
create table if not exists public.admin_emails (
  email text primary key
);
-- ⚠️ 관리자 이메일은 이 파일에 적지 않는다 — 이 저장소는 public 이라 적는 즉시 공개된다.
--    (허용목록일 뿐이라 그 자체로 로그인이 뚫리진 않지만, "관리자 계정 = 이것 하나" 가
--     확정되면 피싱·크리덴셜 스터핑의 표적이 명확해지고 개인 주소가 크롤러에 수집된다.)
--
--    설치할 때: 아래 두 줄의 주석을 풀고 본인 구글 로그인 이메일로 바꿔 SQL Editor 에서
--    한 번만 실행할 것. 실행 뒤에는 값을 이 파일에 되돌려 적지 말고 Supabase 안에만 둔다.
--    이 줄을 건너뛰면 admin_emails 가 비어 있어 아무도 /admin 에 들어갈 수 없다.
--
-- insert into public.admin_emails(email) values ('you@example.com')
--   on conflict do nothing;

-- 로그인한 사용자가 관리자인지 판별하는 헬퍼.
-- 이메일 일치 + "구글 로그인"인 경우만 인정 → 나중에 다른 로그인 방식이
-- 켜져도 같은 이메일로 관리자를 사칭할 수 없음.
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select
    coalesce(auth.jwt() -> 'app_metadata' ->> 'provider', '') = 'google'
    and exists (
      select 1 from public.admin_emails
      where email = lower(auth.jwt() ->> 'email')
    );
$$;

-- ---------- 페이지 방문 ----------
create table if not exists public.page_views (
  id          bigint generated always as identity primary key,
  session_id  text not null,
  path        text,
  referrer    text,
  country     text,          -- 국가명/코드 (대략치, 원본 IP는 저장하지 않음)
  device      text,          -- 'mobile' | 'desktop'
  lang        text,          -- 'ko' | 'en'
  screen_w    int,
  duration_ms int,           -- 체류시간 (페이지를 떠날 때 1회 갱신)
  view_uid    text,          -- 방문 행 식별자 (클라이언트 생성) — 체류시간 UPDATE 의 열쇠
  created_at  timestamptz not null default now()
);
alter table public.page_views add column if not exists view_uid text;
create index if not exists page_views_created_idx on public.page_views(created_at);
create index if not exists page_views_session_idx on public.page_views(session_id);
create unique index if not exists page_views_view_uid_idx on public.page_views(view_uid);

-- 쓰레기 데이터로 저장소를 채우지 못하도록 길이·범위 제한
alter table public.page_views drop constraint if exists page_views_sane;
alter table public.page_views add constraint page_views_sane check (
  char_length(session_id)              <= 64  and
  char_length(coalesce(path, ''))      <= 512 and
  char_length(coalesce(referrer, ''))  <= 1024 and
  char_length(coalesce(country, ''))   <= 80  and
  char_length(coalesce(device, ''))    <= 16  and
  char_length(coalesce(lang, ''))      <= 8   and
  char_length(coalesce(view_uid, ''))  <= 80  and
  coalesce(screen_w, 0)    between 0 and 20000 and
  coalesce(duration_ms, 0) between 0 and 86400000  -- 최대 24시간
);

-- ---------- 이벤트 (프로젝트 열람 · CTA 클릭 등) ----------
create table if not exists public.events (
  id         bigint generated always as identity primary key,
  session_id text not null,
  type       text not null,  -- 'project_open' | 'cta_click' | 'lang_toggle' | ...
  label      text,           -- 프로젝트 id 또는 링크 종류
  path       text,
  created_at timestamptz not null default now()
);
create index if not exists events_created_idx on public.events(created_at);

alter table public.events drop constraint if exists events_sane;
alter table public.events add constraint events_sane check (
  char_length(session_id)          <= 64  and
  char_length(type)                <= 40  and
  char_length(coalesce(label, '')) <= 200 and
  char_length(coalesce(path, ''))  <= 512
);

-- ---------- 연락 폼 메시지 (인박스) ----------
create table if not exists public.messages (
  id         bigint generated always as identity primary key,
  name       text,
  email      text,
  body       text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.messages drop constraint if exists messages_sane;
alter table public.messages add constraint messages_sane check (
  char_length(coalesce(name, ''))  <= 120 and
  char_length(coalesce(email, '')) <= 254 and
  char_length(body) between 1 and 5000
);

-- ---------- 라이트 CMS 콘텐츠 (프로젝트 · 수상 등) ----------
create table if not exists public.content (
  id         bigint generated always as identity primary key,
  kind       text not null,                 -- 'project' | 'award' | ...
  slug       text,
  data       jsonb not null default '{}'::jsonb,
  sort       int not null default 0,
  published  boolean not null default true,
  updated_at timestamptz not null default now()
);

-- ============================================================
--  Row Level Security  (기본 전면 차단 → 정책으로만 허용)
-- ============================================================
alter table public.page_views   enable row level security;
alter table public.events       enable row level security;
alter table public.messages     enable row level security;
alter table public.content      enable row level security;
alter table public.admin_emails enable row level security;

-- 공개(anon): 방문/이벤트는 "삽입만" 가능, 조회는 불가
drop policy if exists "anon insert page_views" on public.page_views;
create policy "anon insert page_views" on public.page_views
  for insert to anon, authenticated with check (true);
drop policy if exists "anon insert events" on public.events;
create policy "anon insert events" on public.events
  for insert to anon, authenticated with check (true);

-- messages 는 공개 INSERT 를 열지 않는다.
-- 공개 anon 키로 누구나 직접 POST 할 수 있어서(폼 앞단 검증은 우회됨) 스팸·용량 소진에
-- 그대로 노출된다. 현재 사이트의 연락 수단은 mailto 링크뿐이라 정상 유입이 0 이다.
-- 폼을 다시 붙일 때만 아래 두 줄 + 맨 아래 grant 를 살리고, 캡차(Turnstile 등)를 함께 붙일 것.
-- drop policy if exists "anon insert messages" on public.messages;
-- create policy "anon insert messages" on public.messages
--   for insert to anon, authenticated with check (true);
drop policy if exists "anon insert messages" on public.messages;

-- 체류시간은 anon 의 UPDATE 권한으로 처리하지 않는다 — 아래 set_view_duration() 참고.
drop policy if exists "anon set duration once"  on public.page_views;
drop policy if exists "anon match own view row" on public.page_views;

-- 관리자만 조회/수정
drop policy if exists "admin read page_views" on public.page_views;
create policy "admin read page_views" on public.page_views
  for select using (public.is_admin());
drop policy if exists "admin read events" on public.events;
create policy "admin read events" on public.events
  for select using (public.is_admin());
drop policy if exists "admin read messages" on public.messages;
create policy "admin read messages" on public.messages
  for select using (public.is_admin());
drop policy if exists "admin update messages" on public.messages;
create policy "admin update messages" on public.messages
  for update using (public.is_admin()) with check (public.is_admin());

-- content: 게시된 항목은 공개 읽기, 나머지/쓰기는 관리자
drop policy if exists "public read published content" on public.content;
create policy "public read published content" on public.content
  for select using (published = true or public.is_admin());
drop policy if exists "admin write content" on public.content;
create policy "admin write content" on public.content
  for all using (public.is_admin()) with check (public.is_admin());

-- admin_emails: 관리자만 조회 (쓰기 정책 없음 → API로는 아무도 수정 불가)
drop policy if exists "admin read admin_emails" on public.admin_emails;
create policy "admin read admin_emails" on public.admin_emails
  for select using (public.is_admin());

-- ============================================================
--  테이블·컬럼 단위 권한 (RLS 위에 한 겹 더)
--  ⚠️ Supabase 는 public 스키마의 새 테이블에 anon/authenticated 전권을 기본으로 준다.
--     그래서 "필요한 것만 grant" 가 아니라 "전부 revoke 후 필요한 것만 grant" 해야 한다.
--     안 그러면 RLS 정책 한 줄이 잘못 붙는 순간 테이블이 통째로 열린다.
--  - 방문자(anon)는 정해진 컬럼만 INSERT. 조회·수정·삭제 권한 없음.
--  - 관리자 조회/수정은 authenticated 에 주되, 실제 통과 여부는 RLS 의 is_admin() 이 정한다.
-- ============================================================
revoke all on public.page_views from anon, authenticated;
grant insert (session_id, path, referrer, country, device, lang, screen_w, view_uid)
  on public.page_views to anon, authenticated;
grant select on public.page_views to authenticated;

-- 체류시간 기록 — anon 에게 UPDATE 를 주는 대신 함수 하나만 연다.
-- (직접 UPDATE 를 허용하면 소유권 검사를 걸 수 없어서, view_uid 를 조회할 수 있는
--  누구든 최근 2시간 안의 남의 방문 행을 덮어쓸 수 있었다)
create or replace function public.set_view_duration(p_view_uid text, p_duration_ms int)
returns void
language sql
security definer
set search_path = public
as $$
  update public.page_views
     set duration_ms = least(greatest(coalesce(p_duration_ms, 0), 0), 86400000)
   where view_uid = p_view_uid
     and duration_ms is null
     and created_at > now() - interval '2 hours';
$$;
revoke all on function public.set_view_duration(text, int) from public;
grant execute on function public.set_view_duration(text, int) to anon, authenticated;

revoke all on public.events from anon, authenticated;
grant insert (session_id, type, label, path) on public.events to anon, authenticated;
grant select on public.events to authenticated;

-- messages: anon 권한 없음(위 정책 주석 참고). 관리자만 읽고 read 플래그를 갱신한다.
revoke all on public.messages from anon, authenticated;
grant select on public.messages to authenticated;
grant update (read) on public.messages to authenticated;
-- 연락 폼을 다시 붙일 때: grant insert (name, email, body) on public.messages to anon, authenticated;

revoke all on public.content from anon, authenticated;
grant select on public.content to anon, authenticated;   -- published 만 보이도록 RLS 가 거름
grant insert, update, delete on public.content to authenticated;

revoke all on public.admin_emails from anon, authenticated;
grant select on public.admin_emails to authenticated;

-- ============================================================
--  끝. 이제 Authentication → Providers 에서 Google "만" 켜세요.
--  (다른 로그인 방식은 모두 꺼두는 것이 안전합니다)
-- ============================================================
