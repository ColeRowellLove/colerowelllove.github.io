# Cole Rowell-Love: Personal Website

My personal site, live at **https://colerowelllove.github.io**. It's a single-page static site built with plain HTML, CSS, and JavaScript (no frameworks, no build step).

## Features

- Resume content presented as experience, projects, skills, and education
- Clean typographic design, with automatic light and dark mode (follows system setting)
- Responsive layout that works from phone to desktop, with a scrollable navigation bar on small screens
- Accessible markup: skip link, keyboard focus styles, semantic headings, reduced-motion support
- Print-friendly styles

## Project structure

```
.
├── index.html   # Page content and structure
├── style.css    # Styling and responsive layout
├── script.js    # Footer year and active-section nav highlight
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

This runs `html-validate` on the HTML, `stylelint` on the CSS, and `eslint` on the JavaScript. The same checks run in GitHub Actions on every pull request and on pushes to `main` (see `.github/workflows/ci.yml`). Dependabot opens monthly update PRs for the dev dependencies and the workflow actions.

`npm install` also sets up a [husky](https://typicode.github.io/husky/) pre-commit hook (`.husky/pre-commit`) that runs `npm run lint` before every commit, so lint errors are caught locally. Don't bypass it with `--no-verify`.

Workflow: every change starts from an issue, gets its own typed branch off `main` (`feature/<name>`, `bugfix/<name>`, and so on), and goes through a pull request that covers that issue only. CI must pass before merging, and the branch is deleted once it's merged. The full rules are in [`CLAUDE.md`](CLAUDE.md).

## Deployment

Hosted with GitHub Pages from the `main` branch. Pushing to `main` updates the live site.

## Cache busting

GitHub Pages lets browsers cache files for about 10 minutes, so a visitor can briefly see a new `index.html` with an old stylesheet. The `style.css` and `script.js` links in `index.html` carry a `?v=` number. Bump it whenever you change either file.

## Contact

[colerowell11@gmail.com](mailto:colerowell11@gmail.com) · [LinkedIn](https://www.linkedin.com/in/colerowell) · [GitHub](https://github.com/ColeRowellLove)
