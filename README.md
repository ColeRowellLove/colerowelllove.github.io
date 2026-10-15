# Cole Rowell-Love: Personal Website

My personal site, live at **https://colerowelllove.github.io**. It's a small multi-page static site built with [Astro](https://astro.build) (static output, no client-side framework), with plain CSS and a little vanilla JavaScript.

## Features

- Five pages: Home, Experience, Projects, About (skills, education, and interests), and Contact, plus a custom 404 page
- One shared layout, with all content kept in a single data file (`src/data/site.js`)
- Resume content only, with a projects page that notes which work is private
- SEO basics: per-page titles and descriptions, Open Graph tags, canonical URLs, `robots.txt`, and `sitemap.xml`
- Terminal-inspired design in JetBrains Mono: prompt-style headings, a blinking cursor, a rotating topic line, and scroll-reveal cards
- Dark and light mode: follows the OS by default, with a header toggle that remembers your choice
- Responsive layout that works from phone to desktop, with a scrollable navigation bar on small screens
- Accessible markup: skip link, keyboard focus styles, semantic headings, reduced-motion support (animations are off when the OS asks for less motion)
- Print-friendly styles

## Project structure

```
.
├── src/
│   ├── pages/        # index, experience, projects, about, contact, 404 (.astro)
│   ├── layouts/      # Layout.astro: head/meta, header/nav, footer
│   ├── components/   # Entry.astro: the shared card
│   ├── assets/       # Images processed by Astro (the About-page photo)
│   ├── data/site.js  # All page content: experience, projects, skills, interests
│   ├── styles/       # global.css
│   └── scripts/      # site.js: footer year, rotating topic word, scroll-reveal
├── public/           # favicon.svg and PNG icons, robots.txt, sitemap.xml (copied as-is)
├── astro.config.mjs
├── .github/workflows # ci.yml (lint and checks), deploy.yml (GitHub Pages)
├── README.md
└── CLAUDE.md         # Contribution and workflow rules
```

## Run locally

Requires [Node.js](https://nodejs.org) 22.12 or newer.

```bash
npm install
npm run dev
```

Then visit http://localhost:4321. `npm run build` writes the site to `dist/`, and `npm run preview` serves that build.

## Development

```bash
npm install
npm run lint
```

`npm run lint` builds the site, then runs `html-validate` on the built pages, `stylelint` on the CSS, and `eslint` on the JavaScript. The same checks run in GitHub Actions on every pull request and on pushes to `main` (see `.github/workflows/ci.yml`). Dependabot opens monthly update PRs for the dev dependencies and the workflow actions.

`npm install` also sets up a [husky](https://typicode.github.io/husky/) pre-commit hook (`.husky/pre-commit`) that runs `npm run lint` before every commit, so lint errors are caught locally. Don't bypass it with `--no-verify`.

Workflow: every change starts from an issue, gets its own typed branch off `main` (`feature/<name>`, `bugfix/<name>`, and so on), and goes through a pull request that covers that issue only. CI must pass before merging, and the branch is deleted once it's merged. PRs that change the site's look include dark and light screenshots. The full rules are in [`CLAUDE.md`](CLAUDE.md).

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds the site and publishes `dist/` to GitHub Pages on every push to `main`. In the repository settings, Pages uses the "GitHub Actions" source. Astro content-hashes the CSS and JS filenames, so browsers never serve a stale stylesheet with a new page.

## Contact

[colerowell11@gmail.com](mailto:colerowell11@gmail.com) · [LinkedIn](https://www.linkedin.com/in/colerowelllove) · [GitHub](https://github.com/ColeRowellLove)
