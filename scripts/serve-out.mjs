// 정적 export(out/)를 실제 배포처럼 깔끔한 주소(/work/slug → work/slug.html)로 서빙하는
// 미리보기 서버. 개발 서버(next dev)는 압축 안 된 React·실시간 컴파일 때문에 스크롤이 버벅인다.
// 실행: npm run preview  (빌드 후 이 서버를 띄운다, 기본 포트 3124)
import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { join, extname, normalize, sep } from "node:path";

const root = join(process.cwd(), "out");
const port = Number(process.env.PORT || 3124);
const types = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json",
  ".txt": "text/plain; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".ico": "image/x-icon",
  ".glb": "model/gltf-binary",
  ".wasm": "application/wasm",
  ".pdf": "application/pdf",
  ".xml": "application/xml",
};

async function resolve(p) {
  for (const c of [p, `${p}.html`, join(p, "index.html")]) {
    try {
      if ((await stat(c)).isFile()) return c;
    } catch {}
  }
  return null;
}

http
  .createServer(async (req, res) => {
    let path;
    try {
      path = decodeURIComponent((req.url || "/").split("?")[0]);
    } catch {
      res.writeHead(400).end();
      return;
    }
    const target = join(root, normalize(path));
    // out/ 밖으로 나가는 경로는 막는다
    if (target !== root && !target.startsWith(root + sep)) {
      res.writeHead(403).end();
      return;
    }
    const file = await resolve(target);
    if (!file) {
      const page = await readFile(join(root, "404.html")).catch(() => null);
      res.writeHead(404, { "content-type": types[".html"] });
      res.end(page || "Not found");
      return;
    }
    res.writeHead(200, {
      "content-type": types[extname(file).toLowerCase()] || "application/octet-stream",
      "cache-control": file.includes(`${sep}_next${sep}static${sep}`)
        ? "public, max-age=31536000, immutable"
        : "no-cache",
    });
    res.end(await readFile(file));
  })
  .listen(port, () => console.log(`preview: http://localhost:${port}`));
