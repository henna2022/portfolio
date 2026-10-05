# juwonlee.dev reborn · design contract (2026-10)

## Concept
The site is Juwon's own museum. She is a bilingual docent at the Seoul Robot & AI
Science Museum and most of her work runs on real exhibition floors, so the portfolio
borrows the language of museum wayfinding and wall labels.

- **Lobby (hero)**: name as the building lettering, the one-line mission, a bilingual
  floor-guide sign (층별 안내 Floor Guide), and the docent robot walking in to greet.
- **Introduction**: the curator's wall text (About).
- **4F Featured Exhibition (특별전)**: the three major projects (Smart-Farm first, the largest), on a dark floor. Named so it is
  not confused with the museum's real 4th-floor special exhibition that RE:PLAY archives.
- **3F Galleries (갤러리)**: landscape-screen exhibits framed on a wall (on view first,
  largest frames), plus a display case (진열장) where portrait phone/kiosk screens stand
  on a shelf, cut to the device so no frame is left half empty.
- Hidden from this site on request (data.ts unchanged): raim-floor-guide,
  education-room-board, robot-ar-tour, ai-ethics-vote (lib/exhibit.ts hiddenSlugs).
- **2F Services**: the systems behind the exhibits, as a collection catalogue with a viewer.
- **1F Archive**: chronology (experience), teaching & mentoring (activities), awards, materials (stack).
- **Information desk**: contact, on a signal-colored floor.
- Header = elevator button panel (scroll-spy). Detail pages = object pages.

## Rules
- One accent, cobalt blue (Juwon's favorite color), used as fill with white text on it. Ink/wall otherwise.
  Signal surfaces: the 4F tile and the information desk only; they never share a screen.
- Focus ring follows each surface's ink (visible on wall, night floor and blue desk).
- No decorative outlines: secondary controls (nav pills, toggles, secondary buttons, download chips)
  use a soft ink fill (0.06, hover 0.12); lines are kept only where they carry structure
  (row dividers, floor-sign rules, the floor line, focus rings).
- Wall label order: title, status line, category and year, medium. Status is sentence
  case, not an uppercase eyebrow.
- Status is a fact field: on view ● / coming or pending ◐ / closed ○ / prototype ◌.
  Derived only from lib/data.ts wording (see lib/exhibit.ts). Never upgrade a status.
- Bilingual signage: floor names show the active language large, the other small.
- Content comes from lib/data.ts and lib/data-ko.ts unchanged (audited). New copy
  lives in lib/exhibit.ts. No em dash. No numbers that are not in data.ts.
- Korean: keep-all, text-wrap pretty (balance on short KO blocks), one sentence per line
  in KO prose and floor intros, runtime tail fixer (letter-spacing -0.01 to -0.05em) for
  last lines of one or two eojeol; unfixable ones land in window.koTailReport.
- Images: phone screenshots with a baked beige field use transparent cutouts
  (public/portfolio_images/projects-cutout, mapped in lib/exhibit.ts). Architecture
  diagrams use recolored copies (public/portfolio_images/flow-reborn).
- Hierarchy per screen: one big title, one filled emphasis.
- Motion: lobby name "lights on" intro (letters unfold from wdth 62/wght 100 to 112/800 in a
  blue glow, staggered), then a variable-font lens: letters near the cursor widen, thicken
  and glow blue while the rest compress so the word keeps its width (touch: one automatic
  sweep). Robot walks in and waves, then faces the viewer, turns slightly toward a moving
  cursor and makes a small gesture every 7 to 12 s (no speech bubble). Gentle reveals.
  All off under prefers-reduced-motion (the robot waves once in place and stops).

## Type
- Display: Archivo (variable, wdth axis). Name and floor numerals at wdth 112, 800.
- Body: Pretendard (Latin and Hangul), 17px / 1.65.
- Labels: IBM Plex Mono, uppercase, 0.06em tracking, used sparingly (years, breadcrumbs,
  table keys). In Korean the labels use Pretendard first (Plex Mono spaces gap Hangul words).

## Color
| token | light | dark |
|---|---|---|
| wall | #F3F1EC | #111110 |
| mat | #FAF9F6 | #1A1A18 |
| ink | #141413 | #ECE9E2 |
| muted | #66645E | #9A978F |
| signal (cobalt) | #2252F5 | #3C66FF |
| on-signal | #FFFFFF | #FFFFFF |
| sign (directory panel) | ink | wall inverse |
| night (4F floor) | #141413 | #080807 |
