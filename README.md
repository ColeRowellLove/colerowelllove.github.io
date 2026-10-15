# Cole Rowell: Personal Website

My personal portfolio site, live at **https://colerowell11.github.io**. It's built from my resume as a single-page static site with plain HTML, CSS, and JavaScript (no frameworks, no build step).

## Features

- Hero section with an animated neural-network particle background and a typing effect
- Resume content laid out as an experience timeline, a project card, a skills grid, and education
- Animated stat counters and scroll-reveal animations
- Cursor-following spotlight effect on cards
- Dark and light themes (saved in `localStorage`)
- Responsive layout with a mobile menu
- Respects `prefers-reduced-motion`

## Project structure

```
.
├── index.html   # Page structure and content
├── style.css    # Styling, themes, responsive layout
├── script.js    # Theme toggle, animations, particle canvas
└── README.md
```

## Run locally

No install needed. Open `index.html` in a browser, or serve the folder:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deployment

The site is hosted with GitHub Pages from the `main` branch. Pushing to `main` updates the live site.

## Customizing

- **Content:** edit the sections in `index.html`.
- **Colors:** change the CSS variables at the top of `style.css` (`--accent`, `--accent-2`, `--grad`, ...).
- **Typing phrases:** edit the `phrases` array in `script.js`.

## Contact

[colerowell11@gmail.com](mailto:colerowell11@gmail.com) · [LinkedIn](https://www.linkedin.com/in/colerowell) · [GitHub](https://github.com/ColeRowell11)
