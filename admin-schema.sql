-- ============================================================
--  포트폴리오 Admin / Analytics 스키마  (Supabase · PostgreSQL)
--  Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 Run 하세요.
--  ⚠️ 아래 admin_emails 의 이메일을 본인 구글 계정으로 바꾸세요.
-- ============================================================

-- ---------- 관리자 이메일 허용목록 ----------
create table if not exists public.admin_emails (
  email text primary key
);
-- ⚠️ 본인 구글 로그인 이메일로 변경
insert into public.admin_emails(email) values ('henna2022@gmail.com')
  on conflict do nothing;

-- 로그인한 사용자가 관리자인지 판별하는 헬퍼
create or replace function public.is_admin()
returns boolean
language sql stable security definer
set search_path = public
as $$
  select exists (
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
  created_at  timestamptz not null default now()
);
create index if not exists page_views_created_idx on public.page_views(created_at);
create index if not exists page_views_session_idx on public.page_views(session_id);

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

-- ---------- 연락 폼 메시지 (인박스) ----------
create table if not exists public.messages (
  id         bigint generated always as identity primary key,
  name       text,
  email      text,
  body       text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
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
create policy "anon insert page_views" on public.page_views
  for insert to anon, authenticated with check (true);
create policy "anon insert events" on public.events
  for insert to anon, authenticated with check (true);
create policy "anon insert messages" on public.messages
  for insert to anon, authenticated with check (true);

-- 방문 체류시간(duration)은 최근 2시간 내, 아직 비어있는 행에 대해 1회만 갱신 허용
create policy "anon set duration once" on public.page_views
  for update to anon, authenticated
  using (duration_ms is null and created_at > now() - interval '2 hours')
  with check (true);

-- 관리자만 조회/수정
create policy "admin read page_views" on public.page_views
  for select using (public.is_admin());
create policy "admin read events" on public.events
  for select using (public.is_admin());
create policy "admin read messages" on public.messages
  for select using (public.is_admin());
create policy "admin update messages" on public.messages
  for update using (public.is_admin()) with check (public.is_admin());

-- content: 게시된 항목은 공개 읽기, 나머지/쓰기는 관리자
create policy "public read published content" on public.content
  for select using (published = true or public.is_admin());
create policy "admin write content" on public.content
  for all using (public.is_admin()) with check (public.is_admin());

-- admin_emails: 관리자만 조회
create policy "admin read admin_emails" on public.admin_emails
  for select using (public.is_admin());

-- ============================================================
--  끝. 이제 Authentication → Providers 에서 Google 을 켜세요.
-- ============================================================
