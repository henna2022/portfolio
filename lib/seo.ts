// 절대 URL(og:url, canonical, sitemap, JSON-LD)의 유일한 소스.
// juwonlee.dev 가 정식 도메인이고 GitHub Pages(/portfolio 서브패스)는 미러이므로,
// DEPLOY_TARGET 과 무관하게 두 빌드 타깃 모두 이 루트 도메인을 절대 URL로 쓴다
// (lib/asset.ts 의 assetPath/BASE_PATH 는 사이트 "내부" 상대 경로 전용이며 여기엔 쓰지 않는다).
export const SITE_URL = "https://juwonlee.dev";
