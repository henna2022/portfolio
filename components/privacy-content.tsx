"use client";

import Link from "next/link";

import { useI18n } from "@/components/lang-provider";
import { PrivacyOptOut } from "@/components/privacy-opt-out";
import { person } from "@/lib/data";

const UPDATED = "26 July 2026 / 2026년 7월 26일";

// 전문(全文)은 EN·KO 두 벌 모두 항상 페이지에 남긴다 — 방침 문서라 어느
// 언어로든 원문을 확인할 수 있어야 한다. 언어 토글은 "무엇을 지우는가"가
// 아니라 "무엇을 먼저 보여주는가"만 바꾼다.
export function PrivacyContent() {
  const { lang } = useI18n();
  const ko = lang === "ko";

  return (
    <>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        Privacy · 개인정보처리방침
      </p>
      <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.05] tracking-[-0.03em] sm:text-5xl">
        {ko ? "이 사이트가 남기는 기록" : "What this site records"}
      </h1>
      <p className="mt-4 text-lg leading-relaxed text-muted">
        {ko ? (
          <>
            이 사이트는 이주원(Juwon Lee)이 운영하는 개인 포트폴리오입니다. 어떤
            작업이 실제로 읽히는지 확인하기 위해 익명 방문 기록을 남기며, 광고·
            광고성 추적기·쿠키는 사용하지 않습니다.
          </>
        ) : (
          <>
            This is a personal portfolio run by Juwon Lee ({person.hangul}). It
            keeps a small, anonymous record of visits so I can see which work
            people actually read. There are no ads, no advertising trackers, and
            no cookies.
          </>
        )}
      </p>
      <p className="mt-2 text-sm text-muted">
        {ko ? `최종 수정: ${UPDATED}` : `Last updated: ${UPDATED}`}
      </p>

      {/* Opt-out */}
      <div className="mt-10 rounded-4xl bg-sand/60 p-6">
        <h2 className="font-display text-lg font-semibold">
          {ko ? "수집 거부 / Turn it off" : "Turn it off / 수집 거부"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {ko ? (
            <>
              아래 스위치는 이 브라우저에만 저장되며, 다음에 여는 페이지부터
              적용됩니다. 아무 페이지나{" "}
              <code className="text-ink/70">?notrack=1</code> 을 붙여 방문하는
              것과 같습니다.
            </>
          ) : (
            <>
              The switch below is stored only in this browser and takes effect
              from the next page you open. It is the same as visiting any page
              with <code className="text-ink/70">?notrack=1</code>.
            </>
          )}
        </p>
        <div className="mt-5">
          <PrivacyOptOut />
        </div>
      </div>

      {ko ? (
        <>
          <KoBody />
          <Divider label="English" />
          <EnBody heading="What this site records" />
        </>
      ) : (
        <>
          <EnBody />
          <Divider label="한국어" />
          <KoBody heading="개인정보처리방침" />
        </>
      )}
    </>
  );
}

export function PrivacyHomeLink() {
  const { lang } = useI18n();
  return (
    <Link
      href="/"
      className="mt-16 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-cream transition-opacity hover:opacity-90"
    >
      {lang === "ko" ? "홈으로 돌아가기" : "Back to home"}
    </Link>
  );
}

// 뒤에 붙는 쪽에만 제목을 달아 두 벌이 이어져도 경계가 보이게 한다
function Divider({ label }: { label: string }) {
  return (
    <div className="mt-16 flex items-center gap-4">
      <hr className="flex-1 border-ink/10" />
      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
        {label}
      </span>
      <hr className="flex-1 border-ink/10" />
    </div>
  );
}

function EnBody({ heading }: { heading?: string }) {
  return (
    <>
      {heading ? (
        <h2 className="font-display mt-12 text-3xl font-semibold tracking-[-0.02em]">
          {heading}
        </h2>
      ) : null}

      <Section title="1. What is collected">
        <p>Each page view records:</p>
        <List
          items={[
            "the page path you opened (including the section anchor)",
            "the referring URL, if your browser sends one",
            "an approximate country (see §4 — no city, no address)",
            "device type (mobile or desktop), screen width, and page language",
            "how long the page stayed open",
            "a random ID that groups the pages of one browser tab session — it is regenerated when the tab is closed and is never linked to a person",
          ]}
        />
        <p className="mt-4">
          It also records clicks on project cards and on the main links —
          resume/CV download, e-mail, GitHub, LinkedIn, and project demo links —
          as the link type, not as anything about you.
        </p>
      </Section>

      <Section title="2. What is not collected">
        <List
          items={[
            "No name, e-mail, account, or login. There is no sign-up on this site.",
            "No IP address is stored in the database.",
            "No cookies, and no advertising, retargeting, or social-media trackers.",
            "No profile that follows you across other sites.",
            "Nothing you type — there is no form on this site; contact goes through your own e-mail app.",
          ]}
        />
      </Section>

      <Section title="3. Why, and how long">
        <p>
          The records are used only to understand which projects are read and
          whether the site works on the devices people use — that is, to improve
          this portfolio. They are not sold, shared, or used to contact anyone.
          They are kept only as long as they are useful for that purpose, and
          are deleted on request.
        </p>
      </Section>

      <Section title="4. Who else is involved">
        <List
          items={[
            "Supabase (PostgreSQL) stores the records. Read access is locked to my own Google account by row-level security, so no visitor and no other account can read them.",
            "ipapi.co is called once per tab session to turn the connection into a country name. That request necessarily reaches ipapi.co with your IP address; the answer this site keeps is the country only.",
            "GitHub Pages hosts the files, so GitHub sees the request as any web host does.",
          ]}
        />
        <p className="mt-4">
          Fonts and images are served from this site itself, so no font or CDN
          provider is contacted while you read.
        </p>
      </Section>

      <Section title="5. What is stored in your browser">
        <List
          items={[
            "sessionStorage — the tab session ID and the looked-up country name, both cleared when you close the tab.",
            "localStorage — your light/dark theme choice, your language choice, and the opt-out flag above if you set it.",
          ]}
        />
        <p className="mt-4">No cookies are set.</p>
      </Section>

      <Section title="6. Your choices">
        <p>
          Use the switch above to stop collection in this browser. Ad blockers,
          tracker blockers, and private-window browsing also stop it. To ask
          what is stored about a visit, or to have records deleted, e-mail{" "}
          <a
            href={`mailto:${person.email}`}
            className="text-ink underline underline-offset-4"
          >
            {person.email}
          </a>
          .
        </p>
      </Section>
    </>
  );
}

function KoBody({ heading }: { heading?: string }) {
  return (
    <>
      {heading ? (
        <h2 className="font-display mt-12 text-3xl font-semibold tracking-[-0.02em]">
          {heading}
        </h2>
      ) : null}

      <Section title="1. 수집하는 항목">
        <p>페이지를 열 때마다 다음이 기록됩니다.</p>
        <List
          items={[
            "열람한 페이지 경로 (섹션 앵커 포함)",
            "브라우저가 보내는 경우에 한해 유입 경로(referrer)",
            "대략적인 국가 (§4 참고 — 도시·주소는 수집하지 않음)",
            "기기 구분(모바일/데스크톱), 화면 너비, 페이지 언어",
            "해당 페이지에 머무른 시간",
            "브라우저 탭 세션을 묶는 임의의 식별자 — 탭을 닫으면 새로 만들어지며 개인과 연결되지 않습니다",
          ]}
        />
        <p className="mt-4">
          또한 프로젝트 카드 클릭과 주요 링크 클릭(이력서·CV 다운로드, 이메일,
          GitHub, LinkedIn, 프로젝트 데모)이 &ldquo;링크 종류&rdquo;로만
          기록됩니다.
        </p>
      </Section>

      <Section title="2. 수집하지 않는 항목">
        <List
          items={[
            "이름·이메일·계정·로그인 정보 (이 사이트에는 회원가입이 없습니다)",
            "IP 주소 — 데이터베이스에 저장하지 않습니다",
            "쿠키, 광고·리타게팅·소셜 추적기",
            "다른 사이트까지 따라다니는 프로필",
            "입력값 — 이 사이트에는 입력 폼이 없으며, 연락은 방문자의 메일 앱을 통해 이루어집니다",
          ]}
        />
      </Section>

      <Section title="3. 이용 목적과 보관 기간">
        <p>
          수집된 기록은 어떤 프로젝트가 읽히는지, 실제 사용 기기에서 사이트가
          제대로 동작하는지 파악하는 용도, 즉 포트폴리오 개선 목적으로만
          사용합니다. 판매·공유하거나 연락 목적으로 쓰지 않습니다. 해당 목적에
          필요한 기간 동안만 보관하며, 삭제 요청 시 삭제합니다.
        </p>
      </Section>

      <Section title="4. 처리에 관여하는 외부 서비스">
        <List
          items={[
            "Supabase(PostgreSQL) — 기록이 저장되는 곳입니다. 행 수준 보안(RLS)으로 조회 권한이 운영자 본인의 구글 계정에만 열려 있어, 방문자나 다른 계정은 읽을 수 없습니다.",
            "ipapi.co — 탭 세션당 1회 호출해 접속 정보를 국가명으로 변환합니다. 이 요청 특성상 ipapi.co 에는 방문자의 IP가 전달되며, 이 사이트가 저장하는 것은 국가명뿐입니다.",
            "GitHub Pages — 파일이 호스팅되는 곳으로, 모든 웹 호스트가 그렇듯 GitHub 은 요청 자체를 확인할 수 있습니다.",
          ]}
        />
        <p className="mt-4">
          폰트와 이미지는 이 사이트에서 직접 제공하므로, 열람 중 폰트·CDN
          업체로 나가는 요청은 없습니다.
        </p>
      </Section>

      <Section title="5. 브라우저에 저장되는 값">
        <List
          items={[
            "sessionStorage — 탭 세션 식별자와 조회된 국가명. 탭을 닫으면 사라집니다.",
            "localStorage — 라이트/다크 테마 선택값, 언어 선택값, 그리고 위에서 수집 중단을 설정한 경우 그 플래그.",
          ]}
        />
        <p className="mt-4">쿠키는 사용하지 않습니다.</p>
      </Section>

      <Section title="6. 방문자의 선택권">
        <p>
          위의 스위치로 이 브라우저에서의 수집을 중단할 수 있습니다. 광고·추적
          차단기나 시크릿 창을 사용하는 경우에도 수집되지 않습니다. 저장된 내용
          확인이나 삭제를 원하시면{" "}
          <a
            href={`mailto:${person.email}`}
            className="text-ink underline underline-offset-4"
          >
            {person.email}
          </a>
          {" "}로 연락 주세요.
        </p>
      </Section>
    </>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-12">
      <h2 className="font-display text-xl font-semibold tracking-[-0.01em]">
        {title}
      </h2>
      <div className="mt-3 leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2">
      {items.map((it) => (
        <li key={it} className="flex gap-3">
          <span
            aria-hidden
            className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-ink/30"
          />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}
