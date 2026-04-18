# Agent Instructions — dutta14.github.io

Personal portfolio website for Anindya Dutta. React 18 + TypeScript + Vite single-page app deployed via GitHub Pages.

## Sections

Hero, CTA (Book appointment), Experience (5 roles), Products (react-bootstrap Carousel, 3 items), Education (2 schools), Skills (12 badges), Contact/Footer (4 social links).

## Design Tokens

Light mode:
```
--primary: #2c3e50
--secondary: #3498db
--accent: #e74c3c
--light-bg: #ecf0f1
--text-dark: #2c3e50
--text-light: #7f8c8d
```

Dark mode (`body.dark-mode`):
```
--primary: #0a0e27
--light-bg: #1a1f3a
--white: #1e2639
--text-dark: #ecf0f1
--text-light: #b8c5d6
```

## Key Behaviors

- Dark/light mode toggle with `localStorage` key `darkMode`
- Navbar brand appears only after hero scrolls out of view (IntersectionObserver)
- Smooth scroll via CSS `scroll-behavior: smooth`
- Bootstrap carousel for products section (react-bootstrap)
- Responsive breakpoint at 768px (hero stacks, headings shrink)

## Data

All content lives in `src/data/portfolioData.ts` as typed constants. Components import from there — no hardcoded strings in JSX.
