-- ############################################################
--  ⛔ 폐기됨 (DEPRECATED) — 실행하지 마세요.
--
--  2026-07-29 의 admin-schema-patch-hardening.sql 로 완전히 대체됐습니다.
--  이 파일을 지금 실행하면 그 하드닝을 **되돌립니다**:
--    · revoke select ... / grant select (view_uid) on public.page_views to anon
--      → anon 이 다시 view_uid 를 읽을 수 있게 된다
--    · create policy "anon match own view row" / "anon set duration once"
--      → 소유권 검사 없는 anon UPDATE 경로가 되살아난다
--        (view_uid 를 아는 누구든 최근 2시간 내 남의 방문 행을 덮어쓸 수 있었음)
--
--  지금 올바른 순서는 admin-schema.sql → admin-schema-patch-hardening.sql 뿐입니다.
--  체류시간 기록은 이제 security definer 함수 public.set_view_duration() 이 담당하고,
--  view_uid 컬럼·인덱스·길이제약·INSERT 권한은 위 두 파일에 모두 들어 있습니다.
--  이 파일은 경위 기록용으로만 남겨 둡니다.
-- ############################################################

-- ============================================================
--  패치: page_views 가 한 줄도 안 쌓이던 문제 수정
--  (INSERT 시 Prefer: return=representation → RETURNING 에 SELECT 권한이 필요 →
--   anon 에게 SELECT 정책이 없어 INSERT 자체가 42501 로 롤백되고 있었음)
--  클라이언트는 return=minimal + 클라이언트 생성 view_uid 방식으로 변경됨.
--  Supabase 대시보드 → SQL Editor 에 붙여넣고 Run.
-- ============================================================

-- 1) 컬럼/인덱스 (이미 실행했다면 그대로 통과)
alter table public.page_views add column if not exists view_uid text;
create unique index if not exists page_views_view_uid_idx on public.page_views(view_uid);

-- 2) anon 이 view_uid 를 INSERT 할 수 있도록 컬럼 권한에 추가
grant insert (session_id, path, referrer, country, device, lang, screen_w, view_uid)
  on public.page_views to anon, authenticated;

-- 3) 체류시간 UPDATE 는 "?view_uid=eq.<uid>" 로 행을 찾는다.
--    PostgreSQL 은 UPDATE 의 WHERE 가 읽는 컬럼에 SELECT 권한 + SELECT 정책을 요구하므로
--    anon 에게 view_uid "한 컬럼만", 그것도 최근 2시간 행만 열어준다.
--    → 국가·유입경로·경로 등은 anon 이 여전히 못 읽고, 관리자(authenticated)는 영향 없음.
--    ⚠️ 여기에 "duration_ms is null" 을 넣으면 안 된다. UPDATE 후의 새 행도 SELECT 정책을
--       통과해야 하는데, 체류시간을 채우는 순간 조건에서 벗어나 42501 로 거부된다.
--       "1회만 갱신" 은 아래 UPDATE 정책의 USING 이 이미 보장한다.
revoke select on public.page_views from anon;
grant select (view_uid) on public.page_views to anon;
drop policy if exists "anon match own view row" on public.page_views;
create policy "anon match own view row" on public.page_views
  for select to anon
  using (created_at > now() - interval '2 hours');

-- 체류시간은 아직 비어있는 최근 행에 1회만 (기존 정책 재확인)
drop policy if exists "anon set duration once" on public.page_views;
create policy "anon set duration once" on public.page_views
  for update to anon, authenticated
  using (duration_ms is null and created_at > now() - interval '2 hours')
  with check (true);

-- 4) 길이 제한 갱신 (쓰레기 데이터 방지)
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
  coalesce(duration_ms, 0) between 0 and 86400000
);

-- 5) 진단용으로 넣었던 테스트 행 삭제
delete from public.page_views where session_id = 'diag-test-claude';
