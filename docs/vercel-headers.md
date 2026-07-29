# vercel.json 헤더 설계 노트

`vercel.json`은 JSON이라 주석을 못 담고, Vercel 스키마는 `headers` 항목 안의 `"//"` 같은
추가 프로퍼티를 **거부한다** (빌드가 `Invalid vercel.json` 으로 실패 — 2026-07-29 실제 발생).
그래서 설정의 근거를 이 파일에 남긴다. `vercel.json`을 고칠 때 이 문서도 같이 갱신할 것.

## 공통 방어 헤더 (`/(.*)`)

모든 응답에 붙는 공통 방어 헤더. 정적 export라 서버 코드가 없어서, 헤더는 vercel.json에서만 붙일 수 있다.

## 공개 사이트 CSP (`/((?!admin).*)`)

`/admin`은 아래 규칙이 따로 맡는다 — CSP 헤더가 두 번 붙으면 브라우저가 둘 다 강제해서(교집합)
페이지가 깨지므로 두 규칙은 서로 겹치지 않게 뺀다.

- **3D**: 히어로 3D 때문에 필요한 것들 — 실제로 브라우저에서 하나씩 확인함.
  `wasm-unsafe-eval`(draco 디코더 WASM) · `script-src blob:` + `worker-src blob:`(draco 워커
  스크립트가 blob: URL) · `connect-src blob:`(GLTFLoader가 내장 텍스처를 blob: 로 fetch) ·
  `img-src blob:`. 하나라도 빠지면 캔버스가 통째로 까맣게 뜬다.
- **no-cdn**: 공개 페이지는 서드파티 출처를 하나도 허용하지 않는다. 예전엔 drei `<Text>`(troika)가
  font 미지정 시 cdn.jsdelivr.net에서 unicode-font-resolver 데이터를 받아왔는데, 라벨 폰트를 로컬
  서브셋으로 고정해 그 경로를 없앴다(hero-scene.tsx의 LABEL_FONT). 여기에 CDN을 다시 추가해야
  하는 상황이 오면, 그건 어딘가에서 서드파티 요청이 되살아났다는 신호다.
- **inline**: `script-src 'unsafe-inline'`은 Next 정적 export의 인라인 부트스트랩과 테마·언어
  선반영 스크립트 때문에 뺄 수 없다(nonce를 붙이려면 서버가 필요). 대신
  `frame-ancestors`·`base-uri`·`object-src`·`form-action`으로 남는 위험을 줄인다.

## 관리자 대시보드 CSP (`/admin`, `/admin/:path*`)

jsdelivr(supabase-js·d3·topojson·Paperlogy 폰트·world-atlas)만 추가로 허용.
