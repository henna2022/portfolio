-- ============================================================
--  포트폴리오 Admin / Analytics 스키마  (Supabase · PostgreSQL)
--  Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 Run 하세요.
--  (여러 번 실행해도 안전하도록 작성됨)
--  ⚠️ 아래 admin_emails 의 이메일이 본인 구글 계정인지 확인하세요.
-- ============================================================

-- ---------- 관리자 이메일 허용목록 ----------
create table if not exists public.admin_emails (
  email text primary key
);
-- ⚠️ 본인 구글 로그인 이메일
insert into public.admin_emails(email) values ('henna2022@gmail.com')
  on conflict do nothing;

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

-- 공개(anon): 방문/이벤트/메시지는 "삽입만" 가능, 조회는 불가
drop policy if exists "anon insert page_views" on public.page_views;
create policy "anon insert page_views" on public.page_views
  for insert to anon, authenticated with check (true);
drop policy if exists "anon insert events" on public.events;
create policy "anon insert events" on public.events
  for insert to anon, authenticated with check (true);
drop policy if exists "anon insert messages" on public.messages;
create policy "anon insert messages" on public.messages
  for insert to anon, authenticated with check (true);

-- 방문 체류시간(duration)은 최근 2시간 내, 아직 비어있는 행에 대해 1회만 갱신 허용
drop policy if exists "anon set duration once" on public.page_views;
create policy "anon set duration once" on public.page_views
  for update to anon, authenticated
  using (duration_ms is null and created_at > now() - interval '2 hours')
  with check (true);

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
--  컬럼 단위 권한 (RLS 위에 한 겹 더)
--  - 방문자(anon)는 정해진 컬럼만 INSERT 가능
--    → messages 에 read=true 를 심거나 created_at 을 조작하는 것 차단
--  - 방문자의 UPDATE 는 page_views.duration_ms 단 한 컬럼만 가능
--    → 통계(국가·경로 등) 오염 차단
-- ============================================================
revoke insert, update on public.page_views from anon, authenticated;
grant insert (session_id, path, referrer, country, device, lang, screen_w, view_uid)
  on public.page_views to anon, authenticated;
grant update (duration_ms) on public.page_views to anon, authenticated;

-- 체류시간 UPDATE 는 "?view_uid=eq.<uid>" 로 행을 찾는다.
-- PostgreSQL 은 UPDATE 의 WHERE 가 읽는 컬럼에 SELECT 권한 + SELECT 정책을 요구하므로,
-- anon 에게 view_uid "한 컬럼만", 그것도 최근 2시간 행만 읽도록 연다.
-- (국가·유입경로 등 나머지 컬럼은 anon 이 여전히 읽을 수 없고, 관리자는 authenticated 라 영향 없음)
-- ⚠️ 조건에 "duration_ms is null" 을 넣지 말 것 — UPDATE 후의 새 행도 SELECT 정책을 통과해야 해서
--    체류시간을 채우는 순간 42501 로 거부된다. 1회 제한은 UPDATE 정책의 USING 이 담당한다.
revoke select on public.page_views from anon;
grant select (view_uid) on public.page_views to anon;
drop policy if exists "anon match own view row" on public.page_views;
create policy "anon match own view row" on public.page_views
  for select to anon
  using (created_at > now() - interval '2 hours');

revoke insert, update on public.events from anon, authenticated;
grant insert (session_id, type, label, path)
  on public.events to anon, authenticated;

revoke insert on public.messages from anon, authenticated;
grant insert (name, email, body) on public.messages to anon, authenticated;
-- messages 의 read 플래그 갱신(관리자용 UPDATE)은 RLS 정책이 관리자만 통과시킴

-- ============================================================
--  끝. 이제 Authentication → Providers 에서 Google "만" 켜세요.
--  (다른 로그인 방식은 모두 꺼두는 것이 안전합니다)
-- ============================================================
