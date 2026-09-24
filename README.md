# Haagsoft — haagsoft.xyz

![Haagsoft](docs/brand/preview.png)

Studio site for **Haagsoft**, Ross O'Reilly's one-person software studio building agentic AI
SaaS in TypeScript, made reliable with evals and harness engineering.

- **Landing page**: manifesto, principles, active builds, stack and contact.
- **`/about`**
- **`/blog`**: build logs, with an RSS feed.
- **Apps on their own subdomains**: [pantler.haagsoft.xyz](https://pantler.haagsoft.xyz),
  [horizon.haagsoft.xyz](https://horizon.haagsoft.xyz).

Built with [Astro 7](https://astro.build) on the [AstroWind](https://github.com/arthelokyo/astrowind)
template and Tailwind CSS v4. It's a fully static site, deployed on Vercel.

## Develop

```sh
nvm use          # Node 24 (anything >= 22.22.3)
npm ci
npm run dev      # http://localhost:4321
npm run check    # astro check + ESLint + Prettier
npm run build    # static output in dist/
```

## Edit content

| What                                     | Where                               |
| ---------------------------------------- | ----------------------------------- |
| Home page copy                           | `src/pages/index.astro`             |
| About page                               | `src/pages/about.astro`             |
| Project cards (and footer project links) | `src/data/projects.ts`              |
| Blog posts                               | `src/data/post/*.md`                |
| Header and footer links                  | `src/navigation.ts`                 |
| Site name, URL, SEO defaults, theme mode | `src/config.yaml`                   |
| Colours and fonts (light + dark)         | `src/components/CustomStyles.astro` |
| Logo sources                             | `docs/brand/`                       |

More detail for contributors (human or AI) is in [CLAUDE.md](CLAUDE.md).

## Deploy

Vercel's GitHub integration builds every push: production from `main` and a preview URL per
pull request. The build is `npm run build` and the output is `dist/`. GitHub Actions
(`.github/workflows/ci.yml`) runs `npm run check` and `npm run build` on pull requests.

## Licence

Site content © Ross O'Reilly (`LICENSE`). Code derived from the AstroWind template is MIT licensed © onWidget; its notice is kept in `LICENSE-ASTROWIND.md`.
