import { ErrorPage } from "@/components/error-page";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "402 · Juwon Lee", robots: { index: false } };

export default function Page() {
  return <ErrorPage code="402" />;
}
