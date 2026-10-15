# CLAUDE.md

Guidance for Claude (and any contributor) working in this repository.

## Project

Personal website of Cole Rowell-Love, served by GitHub Pages at https://colerowelllove.github.io. It's a single-page static site: plain HTML, CSS, and JavaScript, no frameworks and no build step. Content comes from Cole's resume, so don't invent claims, metrics, or roles that the resume doesn't support.

```
index.html   page content and structure
style.css    styling, light/dark theme, responsive layout
script.js    footer year and active-section nav highlight
README.md    project overview and developer docs
CLAUDE.md    this file
.github/     CI workflow, Dependabot, PR template
```

## Commands

```bash
npm install        # install lint tooling (Node 20+)
npm run lint       # html-validate + stylelint + eslint (what CI runs)
npm run serve      # preview at http://localhost:8000
```

## Workflow rules

1. **Every PR has an issue.** Open or find a GitHub issue before starting work, and link it in the PR (for example `Closes #12`).
2. **One issue per PR, and nothing else.** A PR does exactly what its issue describes. Unrelated fixes, refactors, or cleanups go in their own issue and PR, even if they're small.
3. **Never commit directly to `main`.** `main` is deployed to GitHub Pages on every push, so all changes arrive through a pull request.
4. **Branch from `main` using a typed name:**
   - `feature/<name>` for new features or content
   - `bugfix/<name>` for fixes
   - `docs/<name>` for documentation-only changes
   - `chore/<name>` for tooling, dependencies, and CI
   - `refactor/<name>` for restructuring with no behavior change

   Use short, lowercase, hyphenated names, for example `feature/add-projects-section` or `bugfix/mobile-nav-overflow`.
5. **Run CI before merging.** Run `npm run lint` locally and check the page at phone and desktop widths. The GitHub Actions CI must pass on the PR before it's merged.
6. **Keep the docs in sync.** Every change must update `README.md` and `CLAUDE.md` if anything they describe has changed (structure, commands, features, workflow, conventions). If nothing needs updating, say so in the PR.
7. **Commit messages** are short and imperative ("Add projects section"). Claude-authored commits end with the `Co-Authored-By` trailer required by the environment.

## Conventions

- **Name:** the site name is "Cole Rowell-Love". Use it consistently in titles, headings, metadata, and docs.
- **Accessibility:** keep semantic headings, the skip link, visible focus styles, and sufficient contrast in both themes. Respect `prefers-reduced-motion`.
- **Responsive:** every change must work from 320px wide up. Check for horizontal scrolling on phones.
- **No new runtime dependencies.** Lint tooling is a dev dependency only. Don't add frameworks or a build step without an issue that justifies it.
- **Cache busting:** if the `style.css` and `script.js` links in `index.html` carry a `?v=` number, bump it whenever you change either file, because GitHub Pages caches assets for about 10 minutes.
- **Lint configs** live in `.htmlvalidate.json`, `.stylelintrc.json`, and `eslint.config.js`. Fix the code rather than loosening a rule, unless the issue is about the rule.

## PR checklist

- [ ] Linked issue, and the PR is limited to that issue
- [ ] Branch name follows the convention above
- [ ] `npm run lint` passes and CI is green
- [ ] Checked at phone and desktop widths
- [ ] `README.md` and `CLAUDE.md` updated if needed
