-- ============================================================
--  보안 점검 후속 패치  (2026-07-29)
--  Supabase 대시보드 → SQL Editor 에 통째로 붙여넣고 Run.
--  여러 번 실행해도 안전합니다.
--
--  무엇을 고치나
--   ① 테이블 권한이 RLS 한 겹에만 매달려 있던 문제
--      - anon 은 messages 에 SELECT/UPDATE/DELETE 권한을 그대로 갖고 있었다.
--        (지금은 RLS 정책이 막아주지만, 정책 하나만 잘못 붙어도 인박스가 통째로 열린다)
--      - 확인법: DELETE /rest/v1/messages?id=eq.-1 → 204 (권한 있음)
--                DELETE /rest/v1/page_views?id=eq.-1 → 401 42501 (권한 없음 = 정상)
--      → 필요한 롤에 필요한 컬럼만 남기고 전부 회수한다.
--   ② 연락 메시지 INSERT 가 공개 REST 로 무제한 열려 있던 문제
--      → 현재 사이트에 연락 폼이 없다(mailto 링크만). 정상 경로 유입이 0 이므로 닫는다.
--        폼을 다시 붙일 때는 맨 아래 "되돌리기" 블록을 실행.
--   ③ 체류시간 UPDATE 에 소유권 검사가 없던 문제
--      → anon 의 SELECT(view_uid)/UPDATE 를 걷어내고, view_uid 를 아는 사람만
--        자기 행 하나를 갱신하는 security definer 함수로 대체한다.
--        (public/analytics.js 도 PATCH → rpc 호출로 함께 바뀌었다)
-- ============================================================

-- ------------------------------------------------------------
-- ① + ③  page_views : anon 은 INSERT 만, 조회·수정 권한 없음
-- ------------------------------------------------------------
drop policy if exists "anon set duration once"  on public.page_views;
drop policy if exists "anon match own view row" on public.page_views;

revoke all on public.page_views from anon, authenticated;
grant insert (session_id, path, referrer, country, device, lang, screen_w, view_uid)
  on public.page_views to anon, authenticated;
-- 관리자(로그인 = authenticated)의 조회는 RLS "admin read page_views" 가 다시 거른다
grant select on public.page_views to authenticated;

-- 체류시간 기록 전용 함수.
-- security definer 라 테이블 권한 없이도 동작하고, 갱신 대상은
-- "view_uid 가 정확히 일치하고 · 아직 비어 있고 · 2시간 이내" 인 행 하나뿐이다.
-- view_uid 는 클라이언트가 만든 추측 불가능한 값이고, 이제 목록 조회도 막혀 있다.
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

-- ------------------------------------------------------------
-- ①  events : anon 은 지정 컬럼 INSERT 만
-- ------------------------------------------------------------
revoke all on public.events from anon, authenticated;
grant insert (session_id, type, label, path) on public.events to anon, authenticated;
grant select on public.events to authenticated;

-- ------------------------------------------------------------
-- ① + ②  messages : anon 권한 전면 회수 (INSERT 포함)
-- ------------------------------------------------------------
drop policy if exists "anon insert messages" on public.messages;

revoke all on public.messages from anon, authenticated;
grant select on public.messages to authenticated;         -- RLS "admin read messages" 가 거름
grant update (read) on public.messages to authenticated;  -- RLS "admin update messages" 가 거름

-- ------------------------------------------------------------
-- ①  content : 공개 읽기(published)는 유지, 쓰기는 로그인 사용자만(+RLS 로 관리자만)
-- ------------------------------------------------------------
revoke all on public.content from anon, authenticated;
grant select on public.content to anon, authenticated;
grant insert, update, delete on public.content to authenticated;

-- ------------------------------------------------------------
-- ①  admin_emails : 관리자 조회만
-- ------------------------------------------------------------
revoke all on public.admin_emails from anon, authenticated;
grant select on public.admin_emails to authenticated;

-- ============================================================
--  확인 (Run 후 아래 쿼리로 권한이 실제로 어떻게 남았는지 볼 수 있음)
-- ============================================================
-- select grantee, table_name, privilege_type
--   from information_schema.role_table_grants
--  where table_schema = 'public' and grantee in ('anon','authenticated')
--  order by grantee, table_name, privilege_type;

-- ============================================================
--  되돌리기 — 연락 폼을 다시 붙여 인박스를 열 때만 실행
-- ============================================================
-- create policy "anon insert messages" on public.messages
--   for insert to anon, authenticated with check (true);
-- grant insert (name, email, body) on public.messages to anon, authenticated;
--   ⚠️ 이때는 캡차(Cloudflare Turnstile 등)나 Edge Function 경유를 같이 붙일 것.
--      공개 anon 키로 직접 POST 가 되므로 폼 앞단 검증만으로는 막히지 않는다.
