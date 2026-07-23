# Architecture

How this project is organized and why. Every file has exactly one obvious home;
if a new file does not fit a folder below, the folder list is wrong — fix it
here first.

## Folder map

```
src/
├── app/                    # Routing only. Next.js file conventions live here.
│   ├── layout.tsx          # Root layout: html/body, fonts, providers
│   ├── page.tsx            # Home — composes sections, holds no markup of its own
│   ├── globals.css         # Design tokens (@theme) + base layer. Only CSS file.
│   ├── icon.svg            # Favicon (Next metadata convention)
│   ├── opengraph-image.tsx # Generated OG image
│   ├── robots.ts           # robots.txt
│   └── sitemap.ts          # sitemap.xml
│
├── components/
│   ├── ui/                 # Design-system primitives. Know nothing about this site.
│   ├── motion/             # Movement primitives. Wrap children, render nothing of their own.
│   ├── layout/             # Site chrome: header, footer, providers
│   └── sections/           # One file per landing section, in page order
│
├── content/                # All user-facing copy, as typed const objects
├── config/
│   ├── site.ts             # Identity, external links, section anchors
│   └── brand.ts            # Hex mirrors of the colour tokens (see rule 10)
├── lib/
│   ├── utils.ts            # cn()
│   └── motion.ts           # Easing, durations and variants for JS animation
├── hooks/                  # Shared client hooks (created when a second consumer appears)
└── types/                  # Cross-cutting types (created only when actually shared)

public/
└── images/                 # Static imagery
```

## The rules

**1. `app/` is routing, not UI.**
Route files stay thin. `page.tsx` imports sections and renders them in order —
reading it should read like the page outline. Anything with real markup lives in
`components/`.

**2. Copy is data, not markup.**
Every user-facing string lives in `src/content/<section>.ts` as a typed `const`.
Section components receive it by import and are pure layout. One question —
"where is this text?" — has exactly one answer, and rewording never touches JSX.

**3. `config/` vs `content/`.**
`config/` holds structural values (URLs, anchor ids). `content/` holds prose.
A link's `href` is config, its label is content.

**4. Four kinds of component, four folders.**

| Folder      | Knows about the product? | Example                                     |
| ----------- | ------------------------ | ------------------------------------------- |
| `ui/`       | No — reusable anywhere   | `button.tsx`, `container.tsx`               |
| `motion/`   | No — wraps anything      | `reveal.tsx`, `stagger.tsx`, `parallax.tsx` |
| `layout/`   | Site chrome, all pages   | `header.tsx`, `footer.tsx`, `providers.tsx` |
| `sections/` | Yes — one landing block  | `hero.tsx`, `work.tsx`, `contact.tsx`       |

`ui/` and `motion/` are split because they answer different questions: `ui/` is
what a thing looks like, `motion/` is how it arrives. This site has one or two
dozen of the second kind, and mixing them would bury the axis the project is
actually about.

`ui/` is also where `shadcn/ui` drops its components, so the boundary stays
intact when we add one.

**5. A section becomes a folder when it earns it.**
A section starts as one file. When it grows a supporting part, that part sits
next to it with the section's name as prefix — `sections/work.tsx` +
`sections/work-card.tsx`. At three files it becomes a folder instead:
`sections/work/{index.tsx,card.tsx,preview.tsx}`. Structure follows what is
there, never what might be there later.

**6. Dependencies point one way.**

```
app  ->  components/sections  ->  components/ui, components/motion
          |          |                        ^
          v          v                        |
       content     lib  --------------------- config
```

`ui/` and `motion/` never import from `sections/` or `content/`. `lib/` and
`config/` never import from `components/`. A cycle means something is in the
wrong folder.

**7. Server by default.**
Components are Server Components unless they need state, effects, browser APIs
or animation. `"use client"` goes as deep in the tree as possible — on the
interactive leaf, never on a whole section.

**8. Naming.**
Files and folders `kebab-case`. Components `PascalCase`. Hooks `useCamelCase`.
Named exports everywhere, except `app/` route files, which Next requires to be
default exports.

**9. No barrel files.**
No `index.ts` re-exports, except the one a section folder gets under rule 5.
Imports name the real file, so any symbol is one click from its definition and
nothing is pulled into a bundle by accident.

**10. One stylesheet.**
Tailwind v4 keeps its tokens in CSS. All of them — colours, type scale, fonts,
measure, easing — are declared in `app/globals.css` under `@theme`. No
component-level `.css` files, no inline hex values in JSX: if a value is worth
reusing, it is a token.

Two documented exceptions, both for code that sits outside the CSS cascade and
cannot read custom properties:

- `config/brand.ts` — hex mirrors, for the OG image renderer and `theme-color`
- `lib/motion.ts` — easing and durations, because Framer Motion resolves no
  custom properties

Change a token, change its mirror.

## The design system's non-obvious constraints

These are calculated values. Changing them is a contrast or layout decision, not
a taste one — recalculate before adjusting.

**No theme switch.** The site ships a single light theme. That is why
`globals.css` uses `@theme` and not `@theme inline`, and why there is no `.dark`
block: nothing swaps a value at runtime.

**Vermilion has a dead zone.** Around lightness 0.60-0.66 neither white nor ink
clears 4.5:1 against the brand colour — and that is exactly the range that looks
best. Hence three roles: `brand` (fills under white text), `brand-vivid`
(graphics only, never under text), `brand-ink` (vermilion as text on paper).

**`ink-faint` clears 3:1, not 4.5:1.** At 4.5 it lands on the same lightness as
`ink-muted` and stops being a second tone at all. The cost of keeping it is that
it may only carry text at 18px and above, or bold — and non-text elements.
Never a caption.

**Prose needs a container.** Body text at 18px across the full page width runs
to ~124 characters per line against a 45-85 norm. Use `Container` with
`width="measure"` (~70 cpl) or `width="lead"` for anything with sentences in it.

**The LCP element is never animated.** Above-the-fold content is not wrapped in
`Reveal`: starting the hero at `opacity: 0` delays the metric it is measured by.
Motion in the hero must come from something other than fading in.

## Import order

Enforced automatically by Prettier (`@ianvs/prettier-plugin-sort-imports`), in
the same direction as rule 6:

```
react / next  ->  third party  ->  config  ->  content  ->  lib  ->  hooks
              ->  components/ui  ->  components/motion  ->  components
              ->  relative  ->  css
```

Run `npm run format`; never hand-sort imports.

## Quality gate

`npm run check` = `typecheck` + `lint` + `format:check`. It must pass, along
with `npm run build`, before every commit.
