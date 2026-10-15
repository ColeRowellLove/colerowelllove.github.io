# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website of Cole Rowell-Love, served by GitHub Pages at https://colerowelllove.github.io. It is a small multi-page static site in plain HTML, CSS, and JavaScript: no framework, no bundler, no build step. The content comes from Cole's resume, so don't invent claims, metrics, or roles the resume doesn't support. Use the name "Cole Rowell-Love" in titles, headings, metadata, and docs.

## Commands

Node 20+ is needed only for linting; the site itself has no runtime dependencies.

```bash
npm install                      # install lint tooling
npm run lint                     # html-validate (all *.html) + stylelint + eslint (exactly what CI runs)
npm run lint:html                # one check at a time: lint:html, lint:css, lint:js
npx stylelint style.css          # lint a single file
npm run serve                    # preview at http://localhost:8000 (python http.server)
```

There is no test suite. Verify changes by previewing the page at phone width (about 375px) and desktop width and checking for horizontal scrolling.

## Architecture

- **One HTML file per page:** `index.html` (home), `experience.html`, `projects.html`, `about.html` (skills, education, and interests), `contact.html`, and `404.html`. There are no includes, so the header, nav, and footer are repeated in every file: change them in all six. The current page's nav link carries `aria-current="page"`, which is also what the CSS uses to highlight it. `404.html` uses root-relative (`/`) asset paths because GitHub Pages serves it from any URL depth. `robots.txt` and `sitemap.xml` list the pages, so update the sitemap when you add one. Page content comes from the resume, plus the owner-supplied interests list on the About page; never invent claims.
- **Resume entries share one layout.** Experience, projects, and education all use `.entries > .entry > .entry-meta + .entry-body`, a bordered card with a two-column grid on desktop that stacks on screens up to 720px; the card accent color cycles through `:nth-child` rules, so no per-item classes are needed. Add new items by reusing these classes rather than adding new markup patterns. Skills use a separate `dl.skills`.
- **Theming is pure CSS.** The design is a terminal/ML-lab look: dark by default, with a light variant under `@media (prefers-color-scheme: light)`. Colors are custom properties on `:root` (`--bg`, `--card`, `--line`, and accents `--green`, `--blue`, `--amber`, `--purple`; `--on-green` for text on a green fill), so new colors must be defined as variables for both schemes. Everything is set in JetBrains Mono (Google Fonts). Terminal flourishes (`./` nav prefixes, `## ` heading prefix, `>` bullets, blinking cursor on `h1`) are CSS `::before`/`::after`, so keep them out of the HTML text. There is no theme toggle. `script.js` only sets the footer year, cycles the home-page topic word (`[data-words]`), and adds the scroll-reveal class; all of it is skipped under `prefers-reduced-motion`, and content stays visible without JavaScript.
- **Deployment is the `main` branch root.** GitHub Pages serves `main` directly (`.nojekyll` disables Jekyll), so any push to `main` is live within a couple of minutes. Browsers cache assets for about 10 minutes, so if the `style.css` and `script.js` links in the HTML pages carry a `?v=` number, bump it in every page whenever either file changes. The CI asset-reference check tolerates the query string.
- **CI** (`.github/workflows/ci.yml`) runs on every push and pull request, with two jobs: lint (HTML, CSS, JS) and a file-existence check that also verifies every local asset and page link in every `*.html` file resolves. Lint rules live in `.htmlvalidate.json`, `.stylelintrc.json` (recommended config, `no-descending-specificity` off), and `eslint.config.js`. Fix the code rather than loosening a rule, unless the issue is about the rule.
- The GitHub account is `ColeRowellLove` (the old `ColeRowell11` username no longer exists). The contact email `colerowell11@gmail.com` is still correct.

## Workflow rules

1. **Every PR has an issue.** Open or find a GitHub issue before starting work, and link it in the PR (for example `Closes #12`).
2. **One issue per PR, and nothing else.** A PR does exactly what its issue describes. Unrelated fixes, refactors, or cleanups go in their own issue and PR, even if they're small.
3. **Every branch goes through a PR first.** Push the branch, open a pull request, and merge it on GitHub once CI is green. Never merge a branch into `main` locally and push it, and never commit or push directly to `main`.
4. **Branch from `main` using a typed name:** `feature/<name>`, `bugfix/<name>`, `docs/<name>`, `chore/<name>`, or `refactor/<name>`. Use short, lowercase, hyphenated names, for example `feature/add-projects-section` or `bugfix/mobile-nav-overflow`.
5. **Run CI before merging.** A husky pre-commit hook (installed by `npm install`) runs `npm run lint` on every commit. Never skip it with `--no-verify`; fix the lint error instead. The GitHub Actions CI must also pass on the PR, and branch protection blocks merging until it does.
6. **Delete old branches.** Once a PR is merged, delete its branch on GitHub and locally (`git push origin --delete <branch>`, then `git branch -d <branch>`), and run `git fetch --prune`. If a branch is renamed, delete the old name as well. Before deleting a branch, confirm it is merged or duplicated elsewhere (`git branch -r --merged origin/main`).
7. **Keep the docs in sync.** Every change must update `README.md` and `CLAUDE.md` if anything they describe has changed (structure, commands, features, workflow, conventions). If nothing needs updating, say so in the PR.
8. **Commit messages** are short and imperative ("Add projects section"). Commits authored by Claude end with the `Co-Authored-By` trailer given in the environment.
