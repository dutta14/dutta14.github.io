# Agent Instructions — dutta14.github.io

Personal portfolio website for Anindya Dutta. React 18 + TypeScript + Vite single-page app deployed via GitHub Pages.

## Sections

Hero, Products (3 items), Experience (5 roles with SVG company logos), Credentials bar (degrees + patent), How I Work (4 beliefs, each linked to the blog post it came from), Now, Writing (live from the blog), Mentoring ("Happy to Talk About" — 4 conversation topics + booking CTA), Contact/Footer (CTA + social links + copyright combined).

## Design Tokens

LinkedIn-inspired, light pastel palette with white surfaces on warm off-white canvas.

Light mode:
```
--primary: #1b1f23
--secondary: #0a66c2
--accent: #e7a0ae
--surface: #ffffff
--page-bg: #f4f2ee
--text-dark: #191919
--text-light: #666666
--text-muted: #00000099
--border-color: #e0e0e0
```

Dark mode (`body.dark-mode`):
```
--primary: #e8e8e8
--secondary: #70b5f9
--accent: #f5b8c4
--surface: #1d2226
--page-bg: #000000
--text-dark: #e8e8e8
--text-light: #ffffffb3
--text-muted: #ffffff66
--border-color: #38434f
```

## Key Behaviors

- Dark/light mode toggle with `localStorage` key `darkMode`
- Navbar brand appears only after hero scrolls out of view (IntersectionObserver)
- Smooth scroll via CSS `scroll-behavior: smooth`
- Bootstrap carousel for products section (react-bootstrap)
- Responsive breakpoint at 768px (hero stacks, headings shrink)
- No colored backgrounds — white surfaces on warm off-white canvas
- Thin borders as dividers between sections and list items (no alternating backgrounds)

## Data

All content lives in `src/data/portfolioData.ts` as typed constants. Components import from there — no hardcoded strings in JSX.
