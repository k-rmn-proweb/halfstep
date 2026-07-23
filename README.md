# Halfstep

Landing page for a fictional design engineering studio — a showcase of interface
design and motion.

> Work in progress. The live URL lands here once Phase 7 ships.

## Stack

| Layer     | Choice                                                 |
| --------- | ------------------------------------------------------ |
| Framework | Next.js 16 (App Router, static)                        |
| Language  | TypeScript, strict                                     |
| Styling   | Tailwind CSS v4 — tokens only, one stylesheet          |
| Motion    | Motion (Framer Motion) via `LazyMotion` in strict mode |
| Type      | Instrument Serif (display), Geist, Geist Mono          |
| Quality   | ESLint + Prettier with import sorting                  |

## Getting started

```bash
npm install
npm run dev
```

Copy `.env.example` to `.env.local` if you need canonical URLs to point
somewhere real — everything else runs without configuration. On Vercel the
platform's own URL is used when the variable is unset.

## Lighthouse

Measured against a production build, not the dev server:

|         | Performance | Accessibility | Best practices | SEO |
| ------- | ----------- | ------------- | -------------- | --- |
| Desktop | 100         | 100           | 100            | 100 |
| Mobile  | 93          | 100           | 100            | 100 |

Zero cumulative layout shift on both. The gap on mobile is Largest Contentful
Paint under simulated throttling.

## Scripts

| Script           | What it does                          |
| ---------------- | ------------------------------------- |
| `npm run dev`    | Development server                    |
| `npm run build`  | Production build                      |
| `npm run check`  | `typecheck` + `lint` + `format:check` |
| `npm run format` | Format and sort imports               |

`npm run check` and `npm run build` must both pass before every commit.

## Design system

Colour and type values are calculated, not picked by eye. The palette is
declared in oklch in `src/app/globals.css`, and every quiet tone sits at the
lightness that clears its WCAG contrast target against all three backgrounds it
appears on.

A few constraints are non-obvious and documented at their definition:

- the brand vermilion has a lightness range where neither white nor ink is
  legible on it, so it is split into three roles
- `ink-faint` clears 3:1 rather than 4.5:1, which restricts it to 18px and above
- prose needs an explicit measure — full page width runs to ~124 characters per line
- the LCP element is never wrapped in a scroll reveal

See [ARCHITECTURE.md](./ARCHITECTURE.md) for how the code is organised and why.

## Accessibility and motion

The site ships a single light theme. Every animation respects
`prefers-reduced-motion`: CSS transitions are neutralised globally in
`globals.css`, and Motion components check `useReducedMotion` themselves.
Scroll-revealed blocks are server-rendered at `opacity: 0`, so a `<noscript>`
fallback reveals them when JavaScript is unavailable.
