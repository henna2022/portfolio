/* ============================================================
   Supabase 연결 설정
   아래 두 값을 본인 Supabase 프로젝트 값으로 바꾸세요.
   (Supabase 대시보드 → Project Settings → API 에서 확인)

   ⚠️ anon key 는 공개돼도 안전합니다. 실제 데이터는 DB의 RLS 정책이 보호합니다.
      절대 붙여넣지 말아야 할 것은 'service_role' 키입니다 (그건 서버 전용).
   ============================================================ */
window.SB_URL = 'https://euoofcnectmqshjrysze.supabase.co';
window.SB_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV1b29mY25lY3RtcXNoanJ5c3plIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ3OTgxNzUsImV4cCI6MjEwMDM3NDE3NX0.4Vme92QdEVCnIkwF6nQunVB-dr9z-uWTabFgxno3rPE';
// 관리자 이메일은 여기 두지 않는다 — 이 파일은 공개 URL(/supabase-config.js)로
// 그대로 서빙되고, 어차피 판정은 DB 쪽 admin_emails + is_admin() 이 한다.
