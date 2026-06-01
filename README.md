# Crown & Conquer — Homepage

Premium animated homepage for Crown & Conquer gym apparel.

## Stack
- React 18 + TypeScript
- GSAP 3 (ScrollTrigger, custom splits)
- React Three Fiber + Drei (Three.js r163)
- Tailwind CSS 3
- Lenis smooth scroll
- Vite 5

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`

## Build

```bash
npm run build
npm run preview
```

## Sections
| Component | Feature |
|-----------|---------|
| `Hero` | Full-screen Three.js crown + GSAP char stagger + magnetic CTAs |
| `FeaturedCollection` | 3D tilt cards, hover clip reveal, scroll stagger |
| `BrandStatement` | Word-by-word scroll reveal, animated gradient bg |
| `InteractiveThree` | Split layout — metallic emblem with mouse parallax |
| `FeaturedProducts` | Floating stagger cards, hover clip-height reveal |
| `LifestyleBanner` | Parallax bg, word reveal, stats |
| `FinalCTA` | Scanline, magnetic buttons, word reveal |

## Customisation
- Replace product card gradient backgrounds with real product images
- Update `PRODUCTS` / `ITEMS` arrays in collection components
- Add real lifestyle photo to `LifestyleBanner` background
- Swap Bebas Neue for any heading font in `index.html` + `tailwind.config.js`

## Connecting to Lovable
1. Push this repo to GitHub
2. In Lovable → New Project → "Import from GitHub"
3. Select this repo — Lovable detects Vite + React automatically
