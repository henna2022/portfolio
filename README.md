# juwonlee.dev

Portfolio site of Juwon Lee, Education R&D · Developer at the Seoul Robot & AI Museum (서울로봇인공지능과학관). It shows the education programs and AI learning apps I planned, built and ran, with English as the default language and a Korean version.

**Live:** https://juwonlee.dev

## What is on the site

- **Selected work:** the smart-farm education program, RAIM EN (the museum's English tour-booking site) and Doctor-Green, each with its own case page under `/work/[slug]`
- **What I make:** learning exhibits and programs, plus teaching and mentoring
- Work experience, tech stack, awards, and downloadable CV and résumé (EN·KO PDF)

## Stack

- Next.js 14 (App Router) with static export, TypeScript, Tailwind CSS
- Framer Motion and Lenis for light motion, React Three Fiber for the 3D robot on the error page
- Supabase for anonymous visit statistics and the admin dashboard (`/admin`)
- Hosted on Vercel, security headers in `vercel.json`

## Where to edit

- Content: `lib/data.ts` (English) and `lib/data-ko.ts` (Korean overrides). Project slugs listed in `hiddenSlugs` stay off the site.
- UI text and the footer's last-updated date: `lib/i18n.ts`
- Page sections: `components/`, styles: `app/globals.css` and `tailwind.config.ts`
- CV and résumé PDFs: `public/files/` (generated outside this repo)
- Analytics and admin setup: `ADMIN-SETUP.md`

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run preview    # static build served from out/
```
