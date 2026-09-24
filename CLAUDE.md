# CLAUDE.md — Haagsoft site

## What this site is

Ross O'Reilly's personal solopreneur marketing site for **Haagsoft**
([haagsoft.xyz](https://haagsoft.xyz)). It's a classic landing page that advertises the
skillset and shows the work, as proof of building **reliable agentic AI software**. The core
specialism is agentic reliability, evals and harness engineering, built on strong type-safe
TypeScript skills, with LangChain where it fits.

The voice is personal, first person, and plain. It shows value rather than claiming it.

There's also a blog of build logs and design decisions (`src/data/post/`).

Each Haagsoft app lives on its own subdomain (`pantler.haagsoft.xyz`,
`horizon.haagsoft.xyz`) and is deployed separately. This repo is only the apex site.

## Stack

Astro 7 static site on the AstroWind template, with Tailwind CSS v4 and TypeScript, deployed
by Vercel's GitHub integration (production from `main`, a preview per PR).

| Command           | Purpose                         |
| ----------------- | ------------------------------- |
| `npm run dev`     | Dev server at localhost:4321    |
| `npm run build`   | Production build to `./dist/`   |
| `npm run preview` | Serve the production build      |
| `npm run check`   | astro check + ESLint + Prettier |
| `npm run fix`     | Auto-fix ESLint + Prettier      |

Node: see `.nvmrc` (24). Anything `>=22.22.3` works.

## Where things live

```
src/
  pages/index.astro          # landing page (all home-page copy lives here)
  pages/about.astro          # about page
  data/projects.ts           # project cards: status, copy, tags, accent, url, postSlug
  data/post/*.md(x)          # blog posts
  navigation.ts              # header + footer links
  config.yaml                # site name, URL, SEO defaults, blog settings, theme mode
  components/CustomStyles.astro  # colour + font tokens for light and dark mode
  components/haagsoft/       # Section, SectionLabel, Reveal, ProjectCard
  components/Logo.astro      # header logo (inline mark + wordmark)
  assets/styles/tailwind.css # Tailwind v4 theme, btn utilities, motion CSS
docs/brand/                  # logo sources and brand notes
docs/task_convert_astro7.md  # the conversion plan (done)
vendor/integration/          # AstroWind config loader (astrowind:config virtual module)
```

- `~/` imports from `src/`.
- Site config is read through the `astrowind:config` virtual module.

## Conventions

- **Theme.** Both light and dark are first-class, and the default follows the OS
  (`ui.theme: 'system'`). Use the tokens, not raw colours:
  - Tailwind colours: `bg-page`, `bg-surface`, `bg-band`, `border-rule`, `text-heading`,
    `text-default`, `text-muted`, `text-primary`, `text-link`.
  - Accent fills: `bg-lime`, `bg-violet`, `bg-amber`, `bg-blue`.
  - Buttons: `btn-primary` (lime fill, ink text) and `btn`.
- **Fonts.** Space Grotesk (`font-heading`), Inter (body) and JetBrains Mono (`font-mono`),
  self-hosted from `@fontsource-variable/*` through the Fonts API local provider. No
  third-party font API is needed at build time.
- **Motion is CSS-first and progressive.** There are the `hs-line` hero wipe, the
  `hs-marquee__track` marquee and the `hs-light-up` scroll-driven statements, plus the
  `<Reveal>` wrapper (AstroWind's Intersect observer). Everything is static under
  `prefers-reduced-motion`, and content stays visible with JS off. Keep the JS shipped to `/`
  under 15 KB gzipped (it's about 7.5 KB now).
- **Semantic HTML first.** Headings are in order, lists are lists, and links are real `<a>`
  elements.
- **Adding a project.** Add an entry to `src/data/projects.ts`. Give it a `url` when it has a
  live subdomain (it then appears in the footer too) and a `postSlug` when there's a build
  log.
- **Adding a post.** Add `src/data/post/<slug>.md` with frontmatter `title`, `publishDate`,
  `excerpt`, `category`, `tags` and optionally `image` (`~/assets/images/...`). It's served
  at `/blog/<slug>`.
- **Brand.** The name is always "Haagsoft" (the wordmark is lowercase "haagsoft"). The old
  names Faktor 10 and factor-10.dev are retired and shouldn't reappear.

## Before you push

1. `npm run build` succeeds.
2. `npm run check` passes.
3. Visual check of the home page, `/about`, `/blog` and a post, in light and dark mode and
   at mobile width.
4. The structured data in `src/pages/index.astro` is still true for Haagsoft.
