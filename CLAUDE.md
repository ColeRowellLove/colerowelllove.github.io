# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Personal website of Cole Rowell-Love, served by GitHub Pages at https://colerowelllove.github.io. It is a small multi-page static site built with [Astro](https://astro.build) (static output, no client-side framework), plus plain CSS and a little vanilla JavaScript. The content comes from Cole's resume, so don't invent claims, metrics, or roles the resume doesn't support. Use the name "Cole Rowell-Love" in titles, headings, metadata, and docs.

## Commands

Node 22.12+ is required (Astro's minimum).

```bash
npm install                      # install Astro and lint tooling
npm run dev                      # dev server with live reload at http://localhost:4321
npm run build                    # build the site to dist/
npm run preview                  # serve the built dist/ locally
npm run lint                     # build + html-validate (dist/) + stylelint + eslint (exactly what CI runs)
npm run lint:html                # one check at a time: lint:html, lint:css, lint:js
npx stylelint src/styles/global.css   # lint a single file
```

There is no test suite. Verify changes by previewing the page at phone width (about 375px) and desktop width and checking for horizontal scrolling.

## Architecture

- **Pages, layout, and content are separate.** Pages live in `src/pages/` (`index`, `experience`, `projects`, `about`, `contact`, `404`, each an `.astro` file). `src/layouts/Layout.astro` holds the `<head>` (title, description, canonical, Open Graph, fonts), header/nav, and footer, so those are edited in one place. The nav comes from `nav` in `src/data/site.js`, and `aria-current="page"` is set from the URL, which is also what the CSS uses to highlight it. All page content (experience, projects, skills, education, interests, highlights, links) lives in `src/data/site.js`; edit content there, not in the pages. Content comes from the resume, plus the owner-supplied interests list and the awards (copied from his LinkedIn profile) on the About page; never invent claims. Images that should be optimized (like the About-page photo `src/assets/cole.jpg`) live in `src/assets/` and are rendered with Astro's `<Image>`, which outputs small WebP files; crop and re-encode photos first so camera metadata (EXIF, location) isn't published, and always give them real alt text. Static files (`favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`, `robots.txt`, `sitemap.xml`) are in `public/`; the icon is a green terminal prompt (`>_`) on a dark square, and the SVG switches to a light square under `prefers-color-scheme: light`, so if you change the SVG regenerate the two PNGs (they are always the dark version); update `sitemap.xml` when you add a page.
- **URLs have no extension.** Links are `/projects`, not `/projects.html`. `astro.config.mjs` sets `build.format: 'file'`, so the build writes `dist/projects.html`, which GitHub Pages serves at both `/projects` and `/projects.html`.
- **Resume entries share one layout.** Experience, projects, and education all use `.entries > .entry > .entry-meta + .entry-body`, a bordered card with a two-column grid on desktop that stacks on screens up to 720px; the card accent color cycles through `:nth-child` rules, so no per-item classes are needed. Render items with `src/components/Entry.astro` rather than adding new markup patterns. Skills and interests use a separate `dl.skills`.
- **Theming is CSS plus a small toggle.** The design is a terminal/ML-lab look. Colors are custom properties on `:root` defined with `light-dark(light, dark)` (`--bg`, `--card`, `--line`, and accents `--green`, `--blue`, `--amber`, `--purple`; `--on-green` for text on a green fill), so a new color is one variable with both values, never a separate dark block. `color-scheme` picks which value applies: dark by default, light when the OS prefers it, and an explicit `<html data-theme="light|dark">` overrides the OS. The header has a dark/light toggle button (`.theme-toggle`, hidden until JavaScript runs); an inline script in the `<head>` of `Layout.astro` applies the saved choice (`localStorage` key `theme`) before first paint to avoid a flash, and `src/scripts/site.js` handles the click and keeps the label and `aria-label` in sync. Everything is set in JetBrains Mono (Google Fonts). Terminal flourishes (`./` nav prefixes, `## ` heading prefix, `>` bullets, blinking cursor on `h1`) are CSS `::before`/`::after`, so keep them out of the HTML text. `src/scripts/site.js` (bundled by Astro through `Layout.astro`) also sets the footer year, cycles the home-page topic word (`[data-words]`), and adds the scroll-reveal class; motion is skipped under `prefers-reduced-motion`, and content stays visible without JavaScript.
- **Deployment is GitHub Actions.** `.github/workflows/deploy.yml` builds the site and deploys `dist/` to GitHub Pages on every push to `main` (Pages is set to the "GitHub Actions" source), live within a couple of minutes. CSS and JS filenames are content-hashed by Astro, so there is no manual cache-busting; don't add `?v=` numbers.
- **CI** (`.github/workflows/ci.yml`) runs on every push and pull request, with two jobs: lint (build, then HTML, CSS, JS) and a site check that builds the site, confirms the expected pages exist in `dist/`, and verifies every internal link and asset in every built page resolves. HTML is validated on the built output in `dist/`. Lint rules live in `.htmlvalidate.json`, `.stylelintrc.json` (recommended config, `no-descending-specificity` off), and `eslint.config.js`. Fix the code rather than loosening a rule, unless the issue is about the rule.
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
9. **PRs that change how the site looks include screenshots.** That means any change to `style.css`, page markup, or content shown on a page. Capture the changed page in dark and light at desktop width, plus one at phone width, after your final commit. Headless Chrome works without extra tooling (it can't go narrower than about 500px, so label that shot "phone layout"):

   ```bash
   chrome --headless=new --hide-scrollbars --virtual-time-budget=20000 --run-all-compositor-stages-before-draw \
     --blink-settings=preferredColorScheme=0 --window-size=1280,2000 \
     --screenshot=home-dark-desktop.png http://localhost:8000/index.html
   ```

   `preferredColorScheme=0` is dark and `1` is light. The virtual-time flags matter: without them the scroll-reveal cards are still invisible in the capture. Look at every image before using it. Upload them to the data-only `pr-screenshots` branch under `pr-<number>/` and embed them in the PR body by raw URL (`https://raw.githubusercontent.com/ColeRowellLove/colerowelllove.github.io/pr-screenshots/pr-<number>/<file>.png`). `pr-screenshots` is the one branch exempt from rules 3 and 6: it never merges into `main` and is never deleted.
