# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website of Cole Rowell-Love, served by GitHub Pages at https://colerowelllove.github.io. It is a single-page static site in plain HTML, CSS, and JavaScript: no framework, no bundler, no build step. The content comes from Cole's resume, so don't invent claims, metrics, or roles the resume doesn't support. Use the name "Cole Rowell-Love" in titles, headings, metadata, and docs.

## Commands

Node 20+ is needed only for linting; the site itself has no runtime dependencies.

```bash
npm install                      # install lint tooling
npm run lint                     # html-validate + stylelint + eslint (exactly what CI runs)
npm run lint:html                # one check at a time: lint:html, lint:css, lint:js
npx stylelint style.css          # lint a single file
npm run serve                    # preview at http://localhost:8000 (python http.server)
```

There is no test suite. Verify changes by previewing the page at phone width (about 375px) and desktop width and checking for horizontal scrolling.

## Architecture

- **`index.html` is the single source of content.** Every section (`#experience`, `#projects`, `#skills`, `#education`, `#contact`) is a `<section class="wrap block">` with an `id`. `script.js` builds the nav highlight by reading the nav links' `href`s and observing the matching section ids, so renaming or removing a section id requires updating the nav link too.
- **Resume entries share one layout.** Experience, projects, and education all use `.entries > .entry > .entry-meta + .entry-body`, a two-column grid on desktop that stacks on screens up to 720px. Add new items by reusing these classes rather than adding new markup patterns. Skills use a separate `dl.skills`.
- **Theming is pure CSS.** Colors are custom properties on `:root`, overridden inside `@media (prefers-color-scheme: dark)`. There is no theme toggle and no JavaScript involved, so new colors must be defined as variables for both schemes.
- **Deployment is the `main` branch root.** GitHub Pages serves `main` directly (`.nojekyll` disables Jekyll), so any push to `main` is live within a couple of minutes. Browsers cache assets for about 10 minutes, so if the `style.css` and `script.js` links in `index.html` carry a `?v=` number, bump it whenever either file changes. The CI asset-reference check tolerates the query string.
- **CI** (`.github/workflows/ci.yml`) runs on every push and pull request, with two jobs: lint (HTML, CSS, JS) and a file-existence check. Lint rules live in `.htmlvalidate.json`, `.stylelintrc.json` (recommended config, `no-descending-specificity` off), and `eslint.config.js`. Fix the code rather than loosening a rule, unless the issue is about the rule.
- The GitHub account is `ColeRowellLove` (the old `ColeRowell11` username no longer exists). The contact email `colerowell11@gmail.com` is still correct.

## Workflow rules

1. **Every PR has an issue.** Open or find a GitHub issue before starting work, and link it in the PR (for example `Closes #12`).
2. **One issue per PR, and nothing else.** A PR does exactly what its issue describes. Unrelated fixes, refactors, or cleanups go in their own issue and PR, even if they're small.
3. **Every branch goes through a PR first.** Push the branch, open a pull request, and merge it on GitHub once CI is green. Never merge a branch into `main` locally and push it, and never commit or push directly to `main`.
4. **Branch from `main` using a typed name:** `feature/<name>`, `bugfix/<name>`, `docs/<name>`, `chore/<name>`, or `refactor/<name>`. Use short, lowercase, hyphenated names, for example `feature/add-projects-section` or `bugfix/mobile-nav-overflow`.
5. **Run CI before merging.** Run `npm run lint` locally, and the GitHub Actions CI must pass on the PR.
6. **Keep the docs in sync.** Every change must update `README.md` and `CLAUDE.md` if anything they describe has changed (structure, commands, features, workflow, conventions). If nothing needs updating, say so in the PR.
7. **Commit messages** are short and imperative ("Add projects section"). Commits authored by Claude end with the `Co-Authored-By` trailer given in the environment.
