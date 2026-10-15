# Cole Rowell-Love: Personal Website

My personal site, live at **https://colerowelllove.github.io**. It's a small multi-page static site built with plain HTML, CSS, and JavaScript (no frameworks, no build step).

## Features

- Five pages: Home, Experience, Projects, About (skills and education), and Contact, plus a custom 404 page
- Resume content only, with a projects page that notes which work is private
- SEO basics: per-page titles and descriptions, Open Graph tags, canonical URLs, `robots.txt`, and `sitemap.xml`
- Terminal-inspired design in JetBrains Mono: prompt-style headings, a blinking cursor, a rotating topic line, and scroll-reveal cards, dark by default with a light variant (follows system setting)
- Responsive layout that works from phone to desktop, with a scrollable navigation bar on small screens
- Accessible markup: skip link, keyboard focus styles, semantic headings, reduced-motion support (animations are off when the OS asks for less motion)
- Print-friendly styles

## Project structure

```
.
├── index.html       # Home
├── experience.html  # Work history
├── projects.html    # Selected projects
├── about.html       # Skills and education
├── contact.html     # Email and profile links
├── 404.html         # Not-found page
├── style.css        # Styling and responsive layout
├── script.js        # Footer year, rotating topic word, scroll-reveal
├── favicon.svg
├── robots.txt
├── sitemap.xml
├── README.md
└── CLAUDE.md    # Contribution and workflow rules
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Development

Linting uses [Node.js](https://nodejs.org) 20 or newer:

```bash
npm install
npm run lint
```

This runs `html-validate` on every page, `stylelint` on the CSS, and `eslint` on the JavaScript. The same checks run in GitHub Actions on every pull request and on pushes to `main` (see `.github/workflows/ci.yml`). Dependabot opens monthly update PRs for the dev dependencies and the workflow actions.

`npm install` also sets up a [husky](https://typicode.github.io/husky/) pre-commit hook (`.husky/pre-commit`) that runs `npm run lint` before every commit, so lint errors are caught locally. Don't bypass it with `--no-verify`.

Workflow: every change starts from an issue, gets its own typed branch off `main` (`feature/<name>`, `bugfix/<name>`, and so on), and goes through a pull request that covers that issue only. CI must pass before merging, and the branch is deleted once it's merged. The full rules are in [`CLAUDE.md`](CLAUDE.md).

## Deployment

Hosted with GitHub Pages from the `main` branch. Pushing to `main` updates the live site.

## Cache busting

GitHub Pages lets browsers cache files for about 10 minutes, so a visitor can briefly see a new `index.html` with an old stylesheet. The `style.css` and `script.js` links in every HTML page carry a `?v=` number. Bump it whenever you change either file.

## Contact

[colerowell11@gmail.com](mailto:colerowell11@gmail.com) · [LinkedIn](https://www.linkedin.com/in/colerowell) · [GitHub](https://github.com/ColeRowellLove)
