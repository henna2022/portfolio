# 포트폴리오 Admin · 접속 통계 설정 가이드

이 포트폴리오는 **정적 사이트(Next.js static export → Vercel)** 라 서버가 없습니다. 그래서 로그인/통계/메시지는
**Supabase**(무료 티어)를 백엔드로 씁니다. 아래 순서대로 하면 30~40분 안에 켜집니다.

- 공개 사이트: `https://juwonlee.dev`
- 관리자: `https://juwonlee.dev/admin`

구성 파일
- `admin-schema.sql` — DB 테이블 + 보안(RLS) 정책 · 권한 (신규 프로젝트는 이거 하나면 됨)
- `admin-schema-patch-view-uid.sql` — page_views 가 안 쌓이던 문제 패치 (스키마 실행 후 이어서 Run)
- `admin-schema-patch-hardening.sql` — **보안 점검 후속 패치(2026-07-29)**. 이미 돌아가고 있는
  프로젝트에 적용하는 용도. 테이블 권한 회수 · 공개 메시지 INSERT 차단 · 체류시간 함수 전환
- `public/supabase-config.js` — 연결 값 (여기만 본인 값으로 채우면 됨)
- `public/analytics.js` — 공개 페이지 방문/이벤트/체류시간 수집 + 연락 폼 전송
- `public/admin/index.html` — 관리자 대시보드 (구글 로그인). 배포되면 `/admin` 으로 서빙됩니다.

---

## 1. Supabase 프로젝트 만들기
1. https://supabase.com 로그인 → **New project** 생성 (Region: Northeast Asia(Seoul) 권장).
2. 좌측 **SQL Editor** → `admin-schema.sql` 내용을 통째로 붙여넣고 **Run**.
   - 파일 안 `admin_emails` 의 이메일이 **본인 구글 로그인 이메일**인지 확인하세요.
3. 이어서 `admin-schema-patch-view-uid.sql` 도 붙여넣고 **Run**.
4. **이미 운영 중인 프로젝트라면** `admin-schema-patch-hardening.sql` 도 붙여넣고 **Run**.
   (신규 생성이면 1번의 `admin-schema.sql` 에 이미 반영돼 있어 건너뛰어도 됩니다)

## 2. 구글 로그인(OAuth) 켜기
1. **Google Cloud Console**(console.cloud.google.com) → 프로젝트 생성 →
   **APIs & Services → Credentials → Create Credentials → OAuth client ID → Web application**.
2. **Authorized redirect URIs** 에 아래를 추가:
   ```
   https://<프로젝트ref>.supabase.co/auth/v1/callback
   ```
   (`<프로젝트ref>` 는 Supabase → Project Settings → API 의 Project URL 에서 확인)
3. 발급된 **Client ID / Client secret** 복사.
4. Supabase → **Authentication → Providers → Google** → 켜고 위 Client ID/secret 붙여넣기 → 저장.
5. Supabase → **Authentication → URL Configuration**:
   - **Site URL**: `https://juwonlee.dev`
   - **Redirect URLs** 에 추가:
     ```
     https://juwonlee.dev/admin
     https://juwonlee.dev/admin/
     http://localhost:3000/admin
     ```

> ⚠️ **도메인을 바꾸면 여기를 반드시 같이 고쳐야 합니다.**
> 대시보드는 `redirectTo: location.origin + location.pathname` 으로 로그인을 요청합니다
> ([public/admin/index.html](public/admin/index.html) 의 `signInWithOAuth`).
> 이 주소가 Redirect URLs 목록에 없으면 Supabase 는 **조용히 Site URL 로 돌려보냅니다.**
> 구글 로그인 자체는 성공하는데 인증 코드가 엉뚱한 주소로 가버려서, `/admin` 은
> 영원히 로그인 화면에 머무릅니다(콘솔에도 에러가 안 찍혀서 원인 찾기가 어렵습니다).
>
> 확인 방법 — 아래를 실행해서 `location:` 이 요청한 주소 그대로면 정상, Site URL 로
> 바뀌어 있으면 목록에 안 들어간 것입니다:
> ```bash
> curl -s -D - -o /dev/null "https://<프로젝트ref>.supabase.co/auth/v1/verify?token=x&type=magiclink&redirect_to=https%3A%2F%2Fjuwonlee.dev%2Fadmin" | grep -i '^location'
> ```

## 3. 연결 값 채우기
`public/supabase-config.js` 를 열어 두 값을 본인 것으로 교체:
```js
window.SB_URL = 'https://<프로젝트ref>.supabase.co';
window.SB_ANON_KEY = '<anon public key>';   // Project Settings → API → anon public
```
> anon key 는 **공개돼도 안전**합니다(설계상 브라우저 노출용). 데이터는 RLS가 보호합니다.
> ⚠️ `service_role` 키는 절대 여기에 넣지 마세요(서버 전용, 전권 키).

## 4. 배포
`main` 에 커밋/푸시하면 Vercel 이 자동 배포합니다.
- 공개 사이트 `https://juwonlee.dev`: 방문 통계가 쌓이기 시작, 하단 연락 폼이 메시지를 저장.
- 관리자 `https://juwonlee.dev/admin`: 구글 로그인 →
  본인 계정이면 대시보드, 아니면 "접근 권한 없음".

> **배포처는 Vercel 하나뿐입니다.** 예전에 GitHub Pages 로도 같이 내보내던
> 워크플로(`.github/workflows/deploy-pages.yml`)는 제거했습니다 — Pages 는 응답 헤더를
> 붙일 방법이 없어서 CSP·X-Frame-Options 같은 보호가 하나도 적용되지 않는 사본이
> 계속 돌아가는 상태였고, 옛 콘텐츠를 그대로 서빙하고 있었습니다.
>
> 저장소 **Settings → Pages → Unpublish site** 로 남아 있는 사본도 내려주세요
> (`https://henna2022.github.io/portfolio/` 가 404 가 되면 완료).
> `next.config.mjs` 의 `DEPLOY_TARGET=github-pages` 분기는 남겨뒀습니다 — 나중에
> 다시 쓸 수 있고, 안 쓰면 아무 영향이 없습니다.

---

## 대시보드에서 보이는 것 (좌측 네비게이션 기준)
- **개요**: 총 방문 · 순 세션 · 평균 체류시간 · 오늘 방문 · 일자별 추이
- **방문 분석**: 세계지도(국가별 접속 분포 choropleth) · 국가별 · 기기 · 언어 · 인기 페이지 · 유입 경로
- **관심도**: 이력서·CV·소개 덱 다운로드, GitHub·LinkedIn·이메일·Live 링크 클릭, 프로젝트 열람 TOP
- **인박스**: 방문자가 남긴 메시지(안읽음 배지 · 읽음 처리)
- **콘텐츠(라이트 CMS)**: `content` 테이블에 프로젝트/수상 데이터를 JSON으로 추가·수정
- **설정(유지보수)**: 관리자 목록 조회 · 내 방문 집계 제외(notrack) 토글 · Supabase 연결/테이블 행 수 ·
  CSV 내보내기 · 인박스 모두 읽음 · 통계 정리용 SQL · Supabase/GitHub 바로가기

## 개인정보 / 보안 메모
- 원본 IP는 저장하지 않고 **국가만** 저장합니다(ipapi.co 로 국가 판별).
- 방문/이벤트는 **삽입만** 공개 허용, **조회는 관리자 이메일만** (RLS).
- **메시지(messages)는 공개 INSERT 를 닫아뒀습니다.** 공개 anon 키로 누구나 REST 에 직접
  POST 할 수 있어서(폼 앞단 검증·허니팟은 우회됨) 스팸과 무료 티어 용량 소진에 그대로
  노출됩니다. 현재 연락 수단은 mailto 링크뿐이라 정상 유입이 0 이라서 닫는 쪽이 이득입니다.
  폼을 다시 붙일 거면 `admin-schema-patch-hardening.sql` 맨 아래 "되돌리기" 블록 + 캡차를 함께.
- **테이블 권한은 전부 revoke 후 필요한 것만 grant** 합니다. Supabase 는 public 스키마 새
  테이블에 anon/authenticated 전권을 기본으로 주기 때문에, 이걸 안 걷어내면 RLS 정책 한 줄이
  잘못 붙는 순간 테이블이 통째로 열립니다(RLS 한 겹에만 의존하지 않기).
- `page_views` 는 anon 이 **읽지도 수정하지도 못합니다.** 체류시간은 `set_view_duration()`
  함수로만 기록되고, 이 함수는 "정확히 일치하는 view_uid · 아직 비어 있음 · 2시간 이내" 인
  행 하나만 갱신합니다. (예전에는 anon 이 view_uid 목록을 읽고 남의 방문 행 체류시간을
  덮어쓸 수 있었습니다)
- 보안 헤더(CSP · X-Frame-Options · Referrer-Policy · Permissions-Policy)는 서버가 없어서
  `vercel.json` 에서 붙입니다. `/admin` 은 jsdelivr 를 허용해야 해서 CSP 규칙이 따로입니다.
  ⚠️ GitHub Pages 배포본은 헤더를 붙일 방법이 없어 이 보호를 받지 못합니다.

## 다음 단계(선택)
- 국가 판별을 서버에서 하고 싶으면 Supabase **Edge Function** 으로 옮길 수 있습니다(요청 IP 기반, 3rd-party 호출 제거).
- 라이트 CMS 데이터를 공개 사이트가 읽어 카드로 렌더링하도록 연결(현재 프로젝트/수상 카드는 코드에 하드코딩).
- 스팸이 많아지면 메시지 폼에 Cloudflare Turnstile 같은 캡차 추가.
