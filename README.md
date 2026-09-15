# Faktor 10 — portfolio

One-page portfolio site for [factor-10.dev](https://factor-10.dev): a single flowing
page that reveals content as you scroll — pinned card stack, horizontally scrolling
project rail, word-by-word text lighting, velocity-reactive marquee.

No build step, no framework, no bundler. Three files do the work:

```
index.html      semantic markup — the whole site reads fine with JS off
css/site.css    design tokens, layout, reduced-motion fallbacks
js/site.js      motion layer (Lenis + GSAP ScrollTrigger), progressive enhancement
```

## Libraries

Loaded from jsDelivr, pinned:

- [Lenis](https://github.com/darkroomengineering/lenis) 1.1.20 — smooth scroll
- [GSAP](https://gsap.com) 3.13.0 + ScrollTrigger — reveals, pinning, scrub

Both are enhancements. If the CDN is unreachable or JavaScript is disabled, the page
still renders and scrolls natively; if the visitor asks for reduced motion, every
animation is skipped and all text is shown in its final state.

## Run it

Any static server:

```sh
npx http-server . -p 8080
# or: python3 -m http.server 8080
```

Deploys as-is to GitHub Pages, Netlify, Cloudflare Pages or a plain bucket — there is
nothing to compile.

## Editing content

Copy lives in `index.html` and nowhere else. Sections in order: hero, marquee,
manifesto, principles (`[data-card]`), work rail (`.proj`), stack, coworker, contact.

Animation hooks are data attributes, so new markup opts in without touching the JS:

| Attribute | Effect |
| --- | --- |
| `data-reveal` | fade + rise when it enters the viewport |
| `data-hero-line` | masked line wipe (wrap it in `.line`) |
| `data-words` | text lights up word by word as you scroll through it |
| `data-card` | joins the sticky principle stack |
| `data-parallax="0.25"` | parallax drift, value is the depth |
| `data-magnetic` | element leans toward the cursor on hover |

Project cards pick their accent from a modifier class: `proj--lime`, `proj--violet`,
`proj--amber`, `proj--blue`, `proj--ghost`.

## legacy/

The previous Solid State (HTML5 UP) site, kept for reference. Nothing in the current
page depends on it.
