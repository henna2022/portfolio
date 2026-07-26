import { ErrorPage } from "@/components/error-page";

// 정적 배포에서는 서버가 401 을 내려줄 수 없어 실제 도달 경로가 없다.
// 디자인 확인·추후 API 연동 대비용 미리보기 라우트.
export default function Page() {
  return <ErrorPage code="401" />;
}
