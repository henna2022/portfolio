import type { Metadata } from "next";
import { Header } from "@/components/header";
import { PrivacyContent } from "@/components/privacy-content";
import { PrivacyHomeLink } from "@/components/privacy-content";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Privacy — Juwon Lee",
  description:
    "What this portfolio records about a visit, where it is stored, which third parties are involved, and how to turn the visit statistics off.",
  // 트레일링 슬래시 없음 — 실제 서빙 형태(privacy.html)와 일치시킨다.
  alternates: { canonical: `${SITE_URL}/privacy` },
  // 정책 페이지는 검색 결과에 뜰 필요가 없다 (사이트 본문이 아님)
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <main>
      <Header />
      <article className="mx-auto max-w-3xl px-6 pb-24 pt-28">
        {/* 본문은 EN·KO 전문을 모두 담되, 언어 토글에 따라 순서만 바뀐다 */}
        <PrivacyContent />
        <PrivacyHomeLink />
      </article>
    </main>
  );
}
