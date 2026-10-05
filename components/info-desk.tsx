"use client";

// 안내 데스크(연락) + 바닥 띠(푸터). 사이트에서 시그널 색을 면으로 쓰는 유일한 곳.
import Link from "next/link";
import { person } from "@/lib/data";
import { assetPath } from "@/lib/asset";
import { siteStrings } from "@/lib/exhibit";
import { useI18n } from "./lang-provider";
import { FloorTile } from "./floor-sign";
import { ArrowRight, ArrowUpRight, DownloadPicto } from "./pictos";

export function InfoDesk({ compact }: { compact?: boolean }) {
  const { t, lang } = useI18n();
  const s = siteStrings(lang);

  const links = [
    { label: "GitHub", href: person.github, ext: true },
    { label: "LinkedIn", href: person.linkedin, ext: true },
    { label: lang === "ko" ? s.resumeKo : s.resumeEn, href: assetPath(lang === "ko" ? person.resumeKo : person.resume), dl: true },
    { label: lang === "ko" ? s.cvKo : s.cvEn, href: assetPath(lang === "ko" ? person.cvKo : person.cv), dl: true },
  ];

  return (
    <>
      <section id="contact" data-floor="INFO" className="desk" aria-labelledby="desk-title">
        <div className="shell grid12 desk__grid">
          <div className="desk__main">
            {compact ? null : <FloorTile id="INFO" />}
            <h2 id="desk-title" className="desk__title">
              {t.contactHeading}
            </h2>
            <p className="desk__sub">{t.availability}</p>
            <div className="desk__buttons">
              {/* 문의 종류별로 메일 제목을 미리 채운다 */}
              {t.inquiries.map(({ label, subject }, i) => (
                <a
                  key={label}
                  className={`btn ${i === 0 ? "btn--solid" : "btn--line"}`}
                  href={`mailto:${person.email}?subject=${encodeURIComponent(subject)}`}
                >
                  {label}
                  <ArrowRight />
                </a>
              ))}
            </div>
            <a className="desk__mail url" href={`mailto:${person.email}`}>
              {person.email}
            </a>
          </div>
          <div className="desk__side">
            <ul className="desk__links">
              {links.map((l) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    {...(l.ext ? { target: "_blank", rel: "noreferrer" } : {})}
                    {...(l.dl ? { download: true } : {})}
                  >
                    {l.label}
                    {l.dl ? <DownloadPicto /> : <ArrowUpRight />}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <footer className="footer">
        <div className="shell footer__inner">
          <span>{t.footerCopyright}</span>
          <span>
            {t.privacyNotice}{" "}
            <Link href="/privacy">{t.privacyLink}</Link>
          </span>
        </div>
      </footer>
    </>
  );
}
