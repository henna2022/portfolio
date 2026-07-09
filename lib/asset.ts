// GitHub Pages serves this site under a /portfolio subpath, while Vercel
// serves it at the domain root. NEXT_PUBLIC_BASE_PATH is set at build time
// (see next.config.mjs) so the same codebase produces both correctly.
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

// Prefixes an absolute root path (e.g. "/portfolio_images/x.jpg" or "/resume.pdf")
// with the active basePath. Leaves external URLs (http/https/mailto) untouched.
export function assetPath(path: string): string {
  if (/^(https?:)?\/\//.test(path) || path.startsWith("mailto:")) return path;
  return `${BASE_PATH}${path}`;
}
