# Task: Convert portfolio to Astro 7 (AstroWind base)

## Original brief

> Convert portfolio website to use Astro7.
> Include the same colour styling, but make it slightly brighter, and less dark. Currently
> too many dark colours are being used.
> Here is the astro repo https://github.com/arthelokyo/astrowind. Build it around a Landing page.

## Goal

Replace the hand-rolled static one-pager (`index.html` + `css/site.css` + `js/site.js`)
with an Astro 7 site scaffolded from AstroWind. Keep the visual identity (lime/violet/amber/blue
accents, Space Grotesk / Inter / JetBrains Mono) and lift the palette so the page reads
brighter, in both light and dark mode. The home page is a landing page, with an `/about`
page and a real, routed blog alongside it. The site is rebranded from Faktor 10 to
**Haagsoft** on `haagsoft.xyz`.

## Context (verified 2026-09-24)

- `astro@latest` is **7.3.5**. AstroWind `main` targets Astro `^7.3.1` + Tailwind CSS v4,
  needs Node `>=22.22.3`, and builds with `output: 'static'`.
- AstroWind keeps its theme tokens in `src/components/CustomStyles.astro` (`--aw-color-*`),
  site config in `src/config.yaml`, nav/footer in `src/navigation.ts`, and blog posts in
  `src/data/post/*.md(x)`. Fonts go through Astro's native Fonts API (`fonts` in
  `astro.config.ts`).
- AstroWind already ships widgets that line up with the current sections: `Hero`/`HeroText`,
  `Content`, `Steps`/`Features*`, `Projects`, `Integrations`, `Quote`, `CallToAction`,
  `Contact`, `BlogLatestPosts`.
- The current site has no `package.json` and no CI. It is deployed by Vercel's GitHub
  integration (the `portfolio` project, with preview deploys on PRs), set up outside the repo.
- The brand is now **Haagsoft** (`haagsoft.xyz`), and each app lives on its own subdomain:
  `pantler.haagsoft.xyz`, `horizon.haagsoft.xyz`. The current site still says "Faktor 10",
  "F10" and `factor-10.dev` in `index.html`, `README.md`, `css/site.css` and `js/site.js`.
- Current content lives in: `index.html` (all copy), `blog/howibuiltpantler.md` (one post, no
  frontmatter), `img/*.jpg`, `docs/CLAUDE.md` (positioning notes).

## Decisions taken (change them here before starting if you disagree)

1. **Scaffold, don't hand-port.** Copy AstroWind into the repo root, then delete demo pages
   and widgets we don't use. That keeps its blog, SEO, sitemap and RSS plumbing for free.
2. **Two first-class themes, both lifted.** Ship light and dark mode with AstroWind's toggle,
   defaulting to the visitor's OS setting (`ui.theme: 'system'`). Dark mode moves from
   near-black to a charcoal/slate with alternating lighter section surfaces, and light mode
   uses a warm paper background. Both get the same level of polish. Proposed tokens in 2.1.
3. **Motion is minimal.** Drop Lenis, the custom cursor, the loader and the grain overlay. Use
   CSS reveals that respect `prefers-reduced-motion`. The pinned card stack and horizontal
   rail are optional follow-ups (Phase 5), not blockers for launch.
4. **Old sites move to `legacy/`.** The current scroll site goes to `legacy/scroll-site/` until
   the new site is live. The HTML5 UP site in `legacy/` is deleted in Phase 6.
5. **Keep Vercel, build static.** Vercel already deploys this repo, so it stays the host. The
   Astro build stays `output: 'static'`, so no adapter is needed.
6. **Rebrand to Haagsoft.** Every "Faktor 10", "Faktor10", "Factor 10", "F10" and
   `factor-10.dev` reference becomes Haagsoft / `haagsoft.xyz` (subtask 1.6). Live projects
   link out to their subdomains.

---

## Phase 0: Scaffold

Goal: a clean AstroWind build running from the repo root, with the old site parked.

- [ ] **0.1 Park the current site.** `git mv index.html css js img legacy/scroll-site/`
  (keep `img/` handy, the images get reused in 1.4).
- [ ] **0.2 Import AstroWind.** Copy the template into the root (degit or a shallow clone
  without `.git`): `src/`, `public/`, `astro.config.ts`, `package.json`, `tsconfig.json`,
  `eslint.config.js`, prettier config, `vendor/`, `vercel.json`. Skip `Dockerfile`,
  `docker-compose.yml`, `nginx/`, `netlify.toml`, `wrangler.jsonc` and `sandbox.config.json`.
- [ ] **0.3 Pin the toolchain.** Add `.nvmrc` (Node 22 LTS ≥ 22.22.3) and `engines`. Decide
  npm or pnpm and commit the lockfile.
- [ ] **0.4 Merge `.gitignore`.** Add `node_modules/`, `dist/`, `.astro/`.
- [ ] **0.5 Smoke test.** `npm i && npm run build && npm run check` pass on the untouched
  template.
- [ ] **0.6 Vercel project settings.** Framework preset Astro, build command `npm run build`,
  output directory `dist`, and a Node version that matches `.nvmrc`. The PR preview deploy
  must go green.

**Done when:** `npm run dev` serves the stock AstroWind site and `npm run check` is green.

## Phase 1: Strip and configure

Goal: only the pages and widgets we need, with Haagsoft branding and metadata.

- [ ] **1.1 Delete the demo pages.** `src/pages/homes/*`, `src/pages/landing/*`,
  `pricing.astro`, `services.astro`, and the demo posts in `src/data/post/*`. Keep
  `about.astro`, which gets rewritten in 3.13.
- [ ] **1.2 `src/config.yaml`.** Site name `Haagsoft`, `site: https://haagsoft.xyz`, title
  template `%s — Haagsoft`, the description from the current `<meta name="description">`
  (reworded for Haagsoft), a real OG image, the Twitter handle (or remove it),
  `ui.theme: 'system'` (see decision 2), and remove `googleSiteVerificationId`.
- [ ] **1.3 `src/navigation.ts`.** Header links: Work, Stack, Studio, About, Blog, and a
  "Let's talk" CTA. Footer: email `devguy@duck.com`, GitHub `oreillyross`, a "Projects"
  column linking to `pantler.haagsoft.xyz` and `horizon.haagsoft.xyz`, and RSS. Remove the AstroWind
  links and the attribution columns.
- [ ] **1.4 Assets.** Move the reused `img/*.jpg` into `src/assets/images/`. Replace the
  favicons and the `Logo.astro` wordmark with a Haagsoft mark. A quick version is the
  current inline-SVG `f10` favicon reworked as `hs` or `H`, in lime on the page background. Drop the `.xcf`
  source files or keep them outside `src/`.
- [ ] **1.5 Prune unused widgets.** Delete the widgets nothing imports once Phase 3 is done;
  leave them in place until then.
- [ ] **1.6 Rebrand to Haagsoft.** Rename every "Faktor 10", "Faktor10", "Factor 10",
  "factor-10" and "F10" in the new `src/` content, `package.json` `name`, `README.md` and
  `docs/CLAUDE.md` to Haagsoft. Replace every `factor-10.dev` URL (site config, canonical/OG
  URLs, the contact link) with `https://haagsoft.xyz`. Leave `legacy/` untouched. Reword copy
  that plays on the old name, for example "Faktor 10 is a microservices-first studio…" in the
  manifesto. Check with:
  `grep -rniE "faktor|factor[- ]?10|\bF10\b" --exclude-dir={node_modules,dist,.git,legacy} .`,
  which should come back empty.

**Done when:** there is no AstroWind or Faktor 10 branding in the built output
(`grep -riE "astrowind|faktor|factor-10" dist/` is empty apart from licence credits) and
the build is green.

## Phase 2: Theme (brand, brighter)

Goal: same identity, visibly less dark.

- [ ] **2.1 Colour tokens in `CustomStyles.astro`.** Map the current palette onto `--aw-color-*`
  and lift it. Starting proposal, to be tuned by eye:

  | Role | Current | New (dark mode) |
  | --- | --- | --- |
  | Page background | `#0b0b0c` | `#16181d` |
  | Raised surface / cards | `#141416` | `#1f232b` |
  | Alternate section band | none | `#232833` |
  | Heading text | `#f3f1ec` | `#f7f5f0` |
  | Body text | `#f3f1ec` @ 62% | `#f3f1ec` @ 78% |
  | Rules / borders | `#f3f1ec` @ 14% | `#f3f1ec` @ 20% |
  | Primary (CTA, focus) | `#ccff33` | `#ccff33` |
  | Accents | violet `#b09bff`, amber `#ffa14a`, blue `#7cc9ff` | unchanged, and used more widely as section tints |

  | Role | New (light mode) |
  | --- | --- |
  | Page background | `#f7f5f0` (paper) |
  | Raised surface / cards | `#ffffff` |
  | Alternate section band | `#eeebe3` |
  | Heading text | `#16181d` |
  | Body text | `#16181d` @ 78% |
  | Rules / borders | `#16181d` @ 14% |
  | Primary fill (buttons, highlights) | `#ccff33`, with ink text on it |
  | Primary as text or links | darkened lime, around `#4d6b00` (AA on paper) |
  | Accents | violet, amber and blue darkened for text use, full strength for tints |
- [ ] **2.2 Brightening beyond hex values.** Add soft accent glows or gradients behind the hero
  and CTA (the current `hero__glow`, made stronger). Use alternating section bands. Give
  project cards tinted backgrounds (lime/violet/amber/blue at around 10–15%) instead of
  flat black.
- [ ] **2.3 Fonts.** Swap Inter-only for the three current families through the Astro Fonts
  API: `--aw-font-heading` → Space Grotesk, `--aw-font-sans` → Inter, plus a mono token for
  JetBrains Mono (used for labels, tags and section numbers).
- [ ] **2.4 Details.** Carry over `::selection` (lime on ink), `:focus-visible` (lime outline),
  and the mono `sectionLabel` style (`01 Manifesto`) as a small reusable component.
- [ ] **2.5 Theme toggle.** Keep AstroWind's `ToggleTheme` in the header. There must be no
  flash of the wrong theme on load (`ApplyColorMode` runs inline in `<head>`), the choice
  persists across pages, and `theme-color` follows the active mode.
- [ ] **2.6 Contrast check.** Every text/background pair meets WCAG AA in both modes; check
  with axe or Lighthouse.

**Done when:** in both modes, a side-by-side screenshot against `legacy/scroll-site/` is
recognisably the same visual identity and clearly lighter, and the Lighthouse accessibility
score is at least 95.

## Phase 3: Landing page (`src/pages/index.astro`)

Goal: every section of the current one-pager, rebuilt from AstroWind widgets. Copy moves
over verbatim unless 3.9 changes it.

| # | Current section | AstroWind widget | Notes |
| --- | --- | --- | --- |
| 3.1 | Hero ("Agentic AI SaaS, shipped in slices.") | `Hero` or `HeroText` | Keep the "Available for one new build" tag and the location tag as the tagline. CTAs: "See the work" and "Let's talk". |
| 3.2 | Marquee | small custom `Marquee.astro` | Pure CSS keyframes, `aria-hidden`, paused under reduced motion. |
| 3.3 | 01 Manifesto | `Content` | Big statement plus two columns. |
| 3.4 | 02 How I work (5 principles) | `Steps` or `Features2` | `id="studio"`. |
| 3.5 | 03 Active builds (Pantler, Horizon, Beliefs, Tiny GPT, Verity) | `Projects` | `id="work"`. Status badge, description, tag list, accent per card, and an optional `url`. Move the data to `src/data/projects.ts` so cards aren't hard-coded in markup. Links: see 3.14. |
| 3.6 | 04 Stack | `Features` (list) or `Integrations` | `id="stack"`. Six rows. |
| 3.7 | 05 The coworker | `Quote` | |
| 3.8 | Blog teaser (new) | `BlogLatestPosts` | Shows the latest 3 posts, placed after the coworker section. |
| 3.10 | 06 Contact | `CallToAction` | `id="contact"`. "Let's build something small that compounds." plus email, GitHub and `haagsoft.xyz` links. |

- [ ] **3.1–3.8, 3.10:** build each row of the table above.
- [ ] **3.9 Copy pass (optional, flagged).** `docs/CLAUDE.md` puts the positioning on
  **agentic reliability, evals and harness engineering** with type-safe TypeScript and
  LangChain. The current copy barely mentions evals. Do the conversion first, then run a
  separate copy pass so the diff stays reviewable.
- [ ] **3.11 Anchors.** Header links scroll to `#work`, `#stack`, `#studio`, `#contact`, and
  work from `/blog/*` pages too (`/#work`).
- [ ] **3.12 SEO parity.** Title, description, OG and Twitter tags carry over from the
  current `<head>` but under the Haagsoft name and `haagsoft.xyz` URLs.
- [ ] **3.13 `/about` page.** Rewrite `src/pages/about.astro` as a personal page: who Ross
  is, why Haagsoft exists, the specialism (agentic reliability, evals, harness engineering,
  type-safe TypeScript, LangChain; see `docs/CLAUDE.md`), how an engagement works, a photo,
  and a contact CTA. Reuse the principles and stack copy instead of duplicating it. Draft the
  copy from `docs/CLAUDE.md` and the current site, then leave it for Ross to edit before
  merge.
- [ ] **3.14 Project links.** The project cards link to the live apps:
  - Pantler → `https://pantler.haagsoft.xyz`
  - Horizon → `https://horizon.haagsoft.xyz`

  The whole card is the primary link, with an "Open app ↗" label. External links use
  `rel="noopener"`. Projects without a `url` (Beliefs, Tiny GPT, Verity) render as plain
  cards. Add the same two links to the footer "Projects" column (1.3).

**Done when:** every section from `legacy/scroll-site/index.html` exists on `/` (rebranded),
`/about` renders, the Pantler and Horizon cards open their subdomains, the page is usable
with JS disabled, and it looks right at 375px and at 1440px in both themes.

## Phase 4: Blog

Goal: `/blog` lists posts, and each post has its own page and shows up in RSS.

- [ ] **4.1 Migrate the post.** Move `blog/howibuiltpantler.md` to
  `src/data/post/how-i-built-pantler.md` and add frontmatter (`title`, `publishDate`,
  `excerpt`, `category: build-log`, `tags: [pantler, llm, caching]`, `image`).
- [ ] **4.2 Tidy the prose.** Fix typos only (for example "becamse", "capitilise",
  "languge", "localiation"). Keep the voice.
- [ ] **4.3 Blog config.** Choose between `/blog/%slug%` and `/%slug%` permalinks and set
  `postsPerPage`. Categories on, tags `noindex` (the AstroWind default).
- [ ] **4.4 Link from the Pantler card.** The Pantler card gets a secondary "How I built it"
  link to the post, next to its main link to `pantler.haagsoft.xyz` (3.14).
- [ ] **4.5 RSS and sitemap.** Check that `/rss.xml` and `sitemap-index.xml` include the post
  with the production domain.

**Done when:** `/blog`, the post page, the category page and `/rss.xml` all render, and the
post appears in the landing page teaser.

## Phase 5: Motion (progressive enhancement, optional before launch)

Goal: bring back the character of the scroll site without shipping heavy JS.

- [ ] **5.1 Reveal on scroll.** Use AstroWind's `Intersect` or a tiny IntersectionObserver
  script to fade and rise elements marked `data-reveal`. Skip it entirely under
  `prefers-reduced-motion`.
- [ ] **5.2 Hero line wipe.** Use CSS-only masked line reveals on load.
- [ ] **5.3 (Stretch) Horizontal project rail.** Use CSS scroll-snap first, and only reach
  for GSAP ScrollTrigger (npm, not CDN) if snap isn't enough.
- [ ] **5.4 (Stretch) Word-by-word bigtext lighting and a sticky principles stack.** Try CSS
  `animation-timeline: view()` with a static fallback.
- [ ] **5.5 Budget.** JS shipped to `/` stays under 15 KB gzipped (excluding a stretch GSAP
  import).

**Done when:** Lighthouse performance is at least 95 on mobile and reduced-motion users see
all content immediately.

## Phase 6: Ship and clean up

- [ ] **6.1 Production on Vercel.** Add `haagsoft.xyz` (and `www.haagsoft.xyz`, redirecting
  to the apex) as domains on the Vercel `portfolio` project. The production deploy from
  `main` must be green. Make sure this apex project doesn't clash with the `pantler.` and
  `horizon.` subdomains, which are served by their own projects.
- [ ] **6.1b Old domain.** If `factor-10.dev` is still registered, add it to the same
  project with a permanent redirect to `https://haagsoft.xyz` so old links keep working.
  Otherwise let it lapse.
- [ ] **6.2 CI.** A GitHub Action on PRs runs `npm ci && npm run check && npm run build`.
- [ ] **6.3 Docs.** Rewrite `README.md` for the Astro workflow (dev, build, where copy lives,
  how to add a post or project, how to change theme tokens). Move `docs/CLAUDE.md` to a root
  `CLAUDE.md` and merge in the useful parts of AstroWind's `CLAUDE.md`/`AGENTS.md`.
- [ ] **6.4 Remove the old sites.** Once production is verified, delete `legacy/` (both the
  HTML5 UP and scroll-site versions), plus the top-level `blog/`, `css/`, `js/`, `img/` if
  anything is left.
- [ ] **6.5 Post-launch check.** Check 404, OG preview (share the URL once), RSS in a reader,
  Lighthouse on production in both themes, and that the Pantler and Horizon links resolve.

---

## Suggested PR slicing

One PR per phase keeps each diff reviewable: **P0+P1** (scaffold and strip), **P2**
(theme), **P3** (landing), **P4** (blog), **P5** (motion, can wait until after launch),
**P6** (ship). P2 and P3 can be merged into one PR if iterating on colour needs the real
sections on screen.

## Resolved questions (2026-09-24)

- **Light mode?** Yes, as a first-class theme alongside dark (decision 2, 2.1, 2.5).
- **`/about` page?** Yes (1.1, 1.3, 3.13).
- **Faktor 10 vs `factor-10.dev`?** The brand is now Haagsoft on `haagsoft.xyz`, with apps on
  subdomains (decision 6, 1.6, 3.14, 6.1b).
- **Host?** Vercel (decision 5, 0.6, 6.1).

## Open questions

- Is `factor-10.dev` still registered, and should it redirect (6.1b)?
- Is there a Haagsoft logo, or should 1.4 ship the simple text mark?
