# Contributing

This is Cole Rowell-Love's personal website. The written content, photo, and resume details are Cole's own, so changes to what the site says about him aren't accepted as pull requests. Bug reports, accessibility problems, broken links, and typos are very welcome.

## Reporting a problem

Open an issue using one of the templates:

- **Bug or broken page**: something looks wrong or doesn't work.
- **Content correction**: a factual error or typo in the text.

For anything else, use the contact details at https://colerowelllove.github.io/contact.

## Working on the code

The site is built with [Astro](https://astro.build). The README covers running it locally, the lint and format commands, and how the project is laid out. In short:

1. Open or find an issue first. Every pull request closes one issue and does only what that issue describes.
2. Branch from `main` with a typed name (`feature/…`, `bugfix/…`, `docs/…`, `chore/…`, `refactor/…`).
3. Run `npm install` (which sets up the pre-commit hook), then `npm run lint`. It checks formatting with Prettier, builds the site, and runs HTML, CSS, and JavaScript linting. `npm run format` fixes formatting.
4. If your change affects how the site looks, include dark and light screenshots in the pull request.
5. Open a pull request. CI must pass before it can be merged.

By contributing code you agree that it is released under the [MIT License](LICENSE). The site's written content and photo are not covered by that license.

Please also follow the [Code of Conduct](CODE_OF_CONDUCT.md).
