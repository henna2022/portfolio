# Juwon Lee — Portfolio

A Next.js re-creation of a Framer-style minimalist portfolio (cream / black / lime),
filled with content from [portfoliojuwonlee211.vercel.app](https://portfoliojuwonlee211.vercel.app/)
and built with **rich, orchestrated motion**.

## Stack

- **Next.js 14** (App Router, TypeScript)
- **Tailwind CSS** — design tokens for the cream/ink/lime palette
- **Framer Motion** — staggered reveals, scroll parallax, gestures, animated counters
- **Lenis** — smooth (inertia) scrolling, matching the Framer feel
- **Fonts** — General Sans (Fontshare) for display, Inter for body

## Motion (level: rich)

| Technique | Where |
| --- | --- |
| Staggered entrance | Hero, project grid |
| Scroll-reveal (`whileInView`) | Every section |
| Scroll parallax (`useScroll`/`useTransform`) | Featured case mockup |
| Gesture — drag + inertia | Skills strip ("drag to explore") |
| Gesture — hover/tap | Cards, buttons |
| Animated counters | Featured metrics (0.95 mAP, 7 classes) |
| Scroll progress bar | Fixed top |
| Smooth inertia scroll | Whole page (Lenis) |

## Run

```bash
npm install
npm run dev      # http://localhost:3000
```

Build for production:

```bash
npm run build && npm start
```

Deploy: push to GitHub and import into **Vercel** (zero config).

## Where to edit

All content lives in **`lib/data.ts`** — person info, hero copy, the featured case,
the 8 project cards, skills, experience, and awards. Colors/fonts are in
`tailwind.config.ts` + `app/globals.css`. Each section is its own component in
`components/`.

> Note: some figures (e.g. `140+/day`, `0.95 mAP50`) come from the reference site.
> Update them in `lib/data.ts` if the real numbers have changed.

## Images

All images live in **`public/portfolio_images/`** (profile photo, project shots,
Doctor-Green logo) — imported from your existing portfolio. To swap any image:

1. Drop the new file into `public/portfolio_images/...`
2. Point to it in `lib/data.ts`:
   - **Profile photo** → `about.photo` / `person.photo`
   - **Featured logo** → `featured.logo`
   - **Project card image** → each project's `image` field
     (projects without an `image` show a clean lettermark fallback — add a path to
     give `Smart-Farm Education`, `RAIM AI Photo Booth`, and `RAIM Metaverse` real shots)

Paths are served from `/` (e.g. `/portfolio_images/profile/juwonlee.jpg`).
