# Cole Rowell-Love: Personal Website

My personal site, live at **https://colerowell11.github.io**. It's a single-page static site built with plain HTML, CSS, and JavaScript (no frameworks, no build step).

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
└── README.md
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

Workflow: branch off `main`, open a pull request, wait for CI to pass, then merge.

## Deployment

Hosted with GitHub Pages from the `main` branch. Pushing to `main` updates the live site.

## Contact

[colerowell11@gmail.com](mailto:colerowell11@gmail.com) · [LinkedIn](https://www.linkedin.com/in/colerowell) · [GitHub](https://github.com/ColeRowell11)
