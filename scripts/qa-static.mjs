// 빌드 산출물 정적 QA — 브라우저 없이 결정적으로 돌아간다.
// 자산 무결성 / 라우트 / 데이터-페이지 정합 / 메타·SEO / alt / 사이트맵 / 위생
//
//   npm run qa            빌드 후 out/ 을 검사
//   HIGH 발견이 하나라도 있으면 exit 1 → CI 에서 배포를 막는다.
import fs from "node:fs";
import path from "node:path";
import url from "node:url";

const ROOT = path.resolve(url.fileURLToPath(import.meta.url), "../..");
const OUT = path.join(ROOT, "out");
const DATA = path.join(ROOT, "lib/data.ts");
// GitHub Pages 빌드는 basePath 가 /portfolio 라 HTML 안의 절대경로에 접두사가 붙는다
const BASE_PATH = process.env.DEPLOY_TARGET === "github-pages" ? "/portfolio" : "";
const strip = (u) => (BASE_PATH && u.startsWith(BASE_PATH) ? u.slice(BASE_PATH.length) || "/" : u);

if (!fs.existsSync(OUT)) {
  console.error("out/ 이 없습니다. 먼저 `npm run build` 를 실행하세요.");
  process.exit(1);
}
const findings = [];
const ok = [];
const add = (sev, area, msg) => findings.push({ sev, area, msg });
const pass = (area, msg) => ok.push(`${area}: ${msg}`);

const htmlFiles = [];
(function walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) { if (e.name !== "_next") walk(f); }
    else if (e.name.endsWith(".html")) htmlFiles.push(f);
  }
})(OUT);

// ── 1. 로컬 자산 참조 무결성 ────────────────────────────────────────────────
const missing = new Set();
const referenced = new Set();
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, "utf8");
  const urls = [...html.matchAll(/(?:src|href)="([^"]+)"/g)].map((m) => m[1]);
  for (let u of urls) {
    u = u.replace(/&amp;/g, "&");
    if (/^(https?:|mailto:|data:|#|blob:)/.test(u)) continue;
    if (!u.startsWith("/")) continue;
    let clean = u.split("#")[0].split("?")[0];
    try { clean = decodeURIComponent(clean); } catch {}   // /work/%5Bslug%5D → /work/[slug]
    clean = strip(clean);
    referenced.add(clean);
    // 라우트(확장자 없음)는 .html 로도 확인
    const cands = [path.join(OUT, clean), path.join(OUT, clean + ".html"),
                   path.join(OUT, clean, "index.html")];
    if (!cands.some((c) => fs.existsSync(c))) missing.add(`${clean}  (in ${path.relative(OUT, f)})`);
  }
}
missing.size
  ? add("HIGH", "자산", `깨진 로컬 참조 ${missing.size}건:\n    ` + [...missing].slice(0, 12).join("\n    "))
  : pass("자산", `로컬 참조 ${referenced.size}개 전부 존재`);

// ── 2. 데이터 ↔ 페이지 정합 ────────────────────────────────────────────────
const src = fs.readFileSync(DATA, "utf8");
const slugs = [...src.matchAll(/^\s{4}slug: "([^"]+)"/gm)].map((m) => m[1]);
const dupes = slugs.filter((s, i) => slugs.indexOf(s) !== i);
dupes.length ? add("HIGH", "데이터", `중복 slug: ${dupes.join(", ")}`)
             : pass("데이터", `slug ${slugs.length}개 전부 고유`);
const noPage = slugs.filter((s) => !fs.existsSync(path.join(OUT, "work", s + ".html")));
noPage.length ? add("HIGH", "라우트", `페이지 없는 프로젝트: ${noPage.join(", ")}`)
              : pass("라우트", `프로젝트 ${slugs.length}개 전부 페이지 생성됨`);

// 파일이 있다는 것과 내용이 들어있다는 건 다르다.
// Next 16 업그레이드 시도에서 /work/<slug>.html 이 전부 "404 · ..." 껍데기로
// 나왔는데(RSC 페이로드만 생성) 위 존재 검사는 그대로 통과했다. 포트폴리오에서
// SEO 가 가장 중요한 페이지들이라, 제목과 본문이 실제로 프리렌더됐는지까지 본다.
const hollow = [];
for (const s of slugs) {
  const p = path.join(OUT, "work", s + ".html");
  if (!fs.existsSync(p)) continue;
  const html = fs.readFileSync(p, "utf8");
  const title = (html.match(/<title>(.*?)<\/title>/) || [, ""])[1];
  const bodyText = (html.match(/<body[\s\S]*<\/body>/) || [""])[0].replace(/<[^>]+>/g, "").trim();
  if (/^404\b/.test(title) || bodyText.length < 1500) {
    hollow.push(`${s} (title: "${title.slice(0, 24)}", 본문 ${bodyText.length}자)`);
  }
}
hollow.length
  ? add("HIGH", "라우트", `본문이 프리렌더되지 않은 프로젝트 페이지:\n    ` + hollow.join("\n    "))
  : pass("라우트", `프로젝트 페이지 ${slugs.length}개 본문까지 프리렌더됨`);

// data.ts 가 참조하는 이미지가 실제로 있는지
const imgRefs = [...src.matchAll(/"(\/portfolio_images\/[^"]+)"/g)].map((m) => m[1]);
const badImgs = [...new Set(imgRefs)].filter((p) => !fs.existsSync(path.join(OUT, p)));
badImgs.length ? add("HIGH", "자산", `data.ts 가 가리키는 없는 이미지 ${badImgs.length}건: ${badImgs.slice(0,6).join(", ")}`)
               : pass("자산", `data.ts 이미지 참조 ${new Set(imgRefs).size}개 전부 존재`);

// flow SVG (light/dark 쌍)
const flowRefs = [...src.matchAll(/"(\/portfolio_images\/flow\/[^"]+)"/g)].map((m) => m[1]);
const badFlow = [...new Set(flowRefs)].filter((p) => !fs.existsSync(path.join(OUT, p)));
badFlow.length ? add("MED", "자산", `없는 flow 다이어그램: ${badFlow.join(", ")}`)
               : pass("자산", `flow 다이어그램 ${new Set(flowRefs).size}개 전부 존재`);

// ── 3. 메타 / SEO ──────────────────────────────────────────────────────────
for (const f of htmlFiles) {
  const rel = path.relative(OUT, f);
  if (rel === "404.html" || rel.startsWith("admin")) continue;
  const html = fs.readFileSync(f, "utf8");
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1];
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1];
  const og = html.match(/<meta property="og:image"[^>]*content="([^"]*)"/)?.[1];
  if (!title) add("HIGH", "SEO", `${rel}: <title> 없음`);
  else if (title.length > 65) add("LOW", "SEO", `${rel}: title ${title.length}자 (검색결과 잘릴 수 있음)`);
  if (!desc) add("MED", "SEO", `${rel}: description 없음`);
  if (!og) add("LOW", "SEO", `${rel}: og:image 없음`);
}
if (!findings.some((f) => f.area === "SEO")) pass("SEO", "모든 페이지 title/description/og:image 보유");

// JSON-LD
const home = fs.readFileSync(path.join(OUT, "index.html"), "utf8");
const ld = home.match(/application\/ld\+json"[^>]*>(.*?)<\/script>/s)?.[1];
try {
  const j = JSON.parse(ld.replace(/&quot;/g, '"'));
  const need = ["@type", "name", "jobTitle", "url"];
  const miss = need.filter((k) => !j[k]);
  miss.length ? add("MED", "SEO", `JSON-LD 필드 누락: ${miss.join(", ")}`)
              : pass("SEO", `JSON-LD 유효 (jobTitle: ${j.jobTitle})`);
} catch { add("MED", "SEO", "JSON-LD 파싱 실패"); }

// sitemap
const sm = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
const locs = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const smPaths = locs.map((u) => new URL(u).pathname.replace(/^\/portfolio/, "").replace(/\/$/, "") || "/");
const expected = ["/", ...slugs.map((s) => "/work/" + s)];
const smMissing = expected.filter((e) => !smPaths.includes(e));
smMissing.length ? add("MED", "SEO", `사이트맵 누락: ${smMissing.join(", ")}`)
                 : pass("SEO", `사이트맵 ${locs.length}개 URL, 전 페이지 포함`);
fs.existsSync(path.join(OUT, "robots.txt")) ? pass("SEO", "robots.txt 존재")
                                            : add("LOW", "SEO", "robots.txt 없음");

// ── 4. 접근성 (정적으로 잡히는 것) ─────────────────────────────────────────
let imgTotal = 0, noAlt = 0;
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, "utf8");
  for (const tag of html.match(/<img\b[^>]*>/g) ?? []) {
    imgTotal++;
    if (!/\balt=/.test(tag)) noAlt++;
  }
}
noAlt ? add("MED", "접근성", `alt 없는 <img> ${noAlt}개 / 전체 ${imgTotal}개`)
      : pass("접근성", `<img> ${imgTotal}개 전부 alt 보유`);

// 빈 링크·버튼 (접근 가능한 이름 없음)
let namelessLinks = 0;
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, "utf8");
  for (const m of html.matchAll(/<a\b([^>]*)>(.*?)<\/a>/gs)) {
    const [, attrs, inner] = m;
    const text = inner.replace(/<[^>]+>/g, "").trim();
    if (!text && !/aria-label=/.test(attrs) && !/<img[^>]+alt="[^"]+"/.test(inner)) namelessLinks++;
  }
}
namelessLinks ? add("MED", "접근성", `접근 가능한 이름 없는 <a> ${namelessLinks}개`)
              : pass("접근성", "모든 <a> 에 접근 가능한 이름 있음");

// lang
/<html[^>]+lang="[a-z]{2}/.test(home) ? pass("접근성", "html[lang] 설정됨")
                                      : add("MED", "접근성", "html[lang] 없음");

// ── 5. 잔여 플레이스홀더 / 개발 흔적 ───────────────────────────────────────
const badWords = ["TODO", "FIXME", "lorem ipsum", "PLACEHOLDER", "XXX_", "localhost:"];
const hits = [];
for (const f of htmlFiles) {
  const html = fs.readFileSync(f, "utf8");
  for (const w of badWords) if (html.toLowerCase().includes(w.toLowerCase()))
    hits.push(`${path.relative(OUT, f)}: "${w}"`);
}
hits.length ? add("MED", "위생", `개발 흔적: ${[...new Set(hits)].slice(0,6).join(" / ")}`)
            : pass("위생", "TODO/lorem/localhost 등 잔여 흔적 없음");

// ── 6. 이미지 용량 ────────────────────────────────────────────────────────
const heavy = [];
(function walkImg(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walkImg(f);
    else if (/\.(jpe?g|png|webp)$/i.test(e.name)) {
      const kb = fs.statSync(f).size / 1024;
      if (kb > 500) heavy.push(`${path.relative(OUT, f)} ${Math.round(kb)}KB`);
    }
  }
})(path.join(OUT, "portfolio_images"));
heavy.length ? add("LOW", "성능", `500KB 초과 이미지 ${heavy.length}건: ${heavy.slice(0,5).join(", ")}`)
             : pass("성능", "모든 이미지 500KB 이하");

// ── 7. 서드파티 요청 (정적 HTML 기준) ─────────────────────────────────────
// 공개 페이지와 관리자 페이지를 분리해서 본다 (관리자는 방문자 경로가 아님)
// canonical/OG 등 SEO 태그는 og:url·alternates.canonical 처럼 juwonlee.dev 절대
// URL을 자기 자신에게 거는 경우가 있는데, 이는 실제로 로드되는 서드파티 리소스가
// 아니므로 사이트 자체 호스트는 여기서 제외한다.
const OWN_HOST = "juwonlee.dev";
const tpPublic = new Set(), tpAdmin = new Set();
for (const f of htmlFiles) {
  const rel = path.relative(OUT, f);
  const bucket = rel.startsWith("admin") ? tpAdmin : tpPublic;
  const html = fs.readFileSync(f, "utf8");
  // 링크(<a href>)가 아니라 실제로 로드되는 리소스만
  for (const m of html.matchAll(/(?:<script[^>]+src|<link[^>]+href|<img[^>]+src)="(https?:\/\/[^"]+)"/g)) {
    const host = new URL(m[1].replace(/&amp;/g, "&")).host;
    if (host !== OWN_HOST) bucket.add(host);
  }
  for (const m of html.matchAll(/url\(['"]?(https?:\/\/[^'")]+)/g)) {
    const host = new URL(m[1]).host;
    if (host !== OWN_HOST) bucket.add(host);
  }
}
tpPublic.size
  ? add("MED", "위생", `공개 페이지가 로드하는 서드파티: ${[...tpPublic].join(", ")}`)
  : pass("위생", "공개 페이지에서 로드하는 서드파티 리소스 없음");
pass("위생", `관리자 페이지 서드파티(방문자 경로 아님): ${tpAdmin.size ? [...tpAdmin].join(", ") : "없음"}`);

// ── 8. 공개 CSP 에 서드파티 출처가 없는지 ─────────────────────────────────
// 위 7번은 정적 HTML 만 본다 — 런타임에 생기는 요청(예전에 troika 가 폰트 데이터를
// jsdelivr 에서 받아오던 것)은 못 잡는다. 그 통로를 실제로 막는 건 CSP 라서,
// "공개 페이지 CSP 에 서드파티 출처가 들어왔는가" 를 대신 확인한다.
// 여기에 CDN 이 다시 등장했다면 어딘가에서 런타임 서드파티 요청이 되살아난 것이다.
const VERCEL_JSON = path.join(ROOT, "vercel.json");
if (!fs.existsSync(VERCEL_JSON)) {
  add("HIGH", "보안", "vercel.json 이 없습니다 — 보안 헤더(CSP·X-Frame-Options 등)가 전혀 붙지 않습니다");
} else {
  const rules = JSON.parse(fs.readFileSync(VERCEL_JSON, "utf8")).headers || [];
  const publicRule = rules.find((r) => r.source === "/((?!admin).*)");
  const csp = publicRule?.headers?.find((h) => h.key === "Content-Security-Policy")?.value;
  if (!csp) {
    add("HIGH", "보안", "vercel.json 에 공개 페이지용 CSP 규칙이 없습니다");
  } else {
    const ALLOWED = new Set([`https://ipapi.co`, "https://euoofcnectmqshjrysze.supabase.co"]);
    const hosts = [...csp.matchAll(/https?:\/\/[^\s;']+/g)].map((m) => m[0]).filter((h) => !ALLOWED.has(h));
    const required = ["frame-ancestors 'none'", "object-src 'none'", "base-uri 'self'"];
    const lacking = required.filter((d) => !csp.includes(d));
    if (hosts.length) add("MED", "보안", `공개 CSP 에 예상 밖 서드파티 출처: ${[...new Set(hosts)].join(", ")}`);
    else if (lacking.length) add("MED", "보안", `공개 CSP 에 빠진 지시어: ${lacking.join(" · ")}`);
    else pass("보안", "공개 CSP — 서드파티 출처 없음 + frame-ancestors·object-src·base-uri 설정됨");
  }
}

// ── 9. 배포되면 안 되는 잡파일 ────────────────────────────────────────────
// public/ 는 통째로 out/ 으로 복사된다 → Finder 가 만든 .DS_Store 가 그대로
// 공개되고, 그 안에는 아직 공개하지 않은 파일명들이 들어 있다.
const JUNK = [];
(function walkJunk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const f = path.join(d, e.name);
    if (e.isDirectory()) walkJunk(f);
    else if (/^\.DS_Store$|\.(bak|orig|swp)$|~$/.test(e.name)) JUNK.push(path.relative(OUT, f));
  }
})(OUT);
JUNK.length
  ? add("HIGH", "위생", `배포 산출물에 잡파일: ${JUNK.join(", ")} — public/ 에서 지우고 다시 빌드하세요`)
  : pass("위생", "배포 산출물에 .DS_Store 등 잡파일 없음");

// ── 리포트 ────────────────────────────────────────────────────────────────
const bySev = (s) => findings.filter((f) => f.sev === s);
console.log(`\n  정적 QA — 페이지 ${htmlFiles.length} · 프로젝트 ${slugs.length}\n`);
for (const o of ok) console.log(`  \x1b[32mPASS\x1b[0m  ${o}`);
if (findings.length) {
  console.log("");
  for (const sev of ["HIGH", "MED", "LOW"]) {
    for (const f of bySev(sev)) {
      const c = sev === "HIGH" ? "\x1b[31m" : sev === "MED" ? "\x1b[33m" : "\x1b[90m";
      console.log(`  ${c}${sev}\x1b[0m  ${f.area} — ${f.msg}`);
    }
  }
}
const high = bySev("HIGH").length;
console.log(`\n  통과 ${ok.length} · 발견 ${findings.length} (HIGH ${high})\n`);
if (process.env.QA_JSON) fs.writeFileSync(process.env.QA_JSON, JSON.stringify({ findings, ok }, null, 2));
process.exit(high > 0 ? 1 : 0);
