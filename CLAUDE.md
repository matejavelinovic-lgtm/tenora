# Tenora (tenora.com rebuild)

Astro 7, plain class-based CSS — no Tailwind, no UI framework. This is a
rebuild of https://www.tenora.com/ (Webflow). Migration state lives in
`MIGRATION.md` and `.shipstudio/migration.json`.

## Conventions

- One semantic class per element, one rule per class, in `src/styles/main.css`.
  Responsive overrides go in the `@media` blocks at the bottom of that file.
  Ship Studio's visual editor relies on this.
- No inline `style=""` except CSS variables passed to a rule (`style="--i:2"`).
- Images live in `public/assets/` under their original Webflow file names
  (spaces → hyphens). Keep the original `srcset`/`sizes`; the browser then
  picks the same file the original does at each width.
- Icons are SVG files in `src/icons/`, inlined with `<Icon name="…" />`.
- Mark self-animating regions (canvases, marquees, tickers) with
  `data-fidelity-mask`. The fidelity tool hides them on both sides.

## Measuring against the original

```
node .shipstudio/fidelity/site-fidelity.mjs --reference https://www.tenora.com/ \
  --rebuild http://localhost:3000/ --breakpoints 2560,1920,1440,1280,991,767,479 \
  --mask "$(cat .shipstudio/fidelity/mask-home.txt)" --label home --out .shipstudio/fidelity/<pass>
node .shipstudio/fidelity/site-structure.mjs --reference <url> --rebuild <url> --width <w>
```

`localhost:3000` is a pass-through (`scripts/proxy-3000.mjs`) to Ship Studio's
own Astro dev server. A page is done at ≥99.5% at its worst breakpoint.

## Visual language

The source of truth is `src/styles/tokens.css`, rendered at `/style-guide`.
Reference the custom properties, never raw hex values.

**Breakpoints.** The original's own breakpoints: `min-width:1440px`,
`min-width:1280px`, base 992–1279 (no query), `max-width:991px`,
`max-width:767px`, `max-width:479px`. Custom properties can't go in `@media`,
so use these literal values.

**Colour, by role.**
- Brand: `--color-green` #01e89d (primary buttons, accents, links on dark),
  `--color-green-soft` #80f1cb (icons on dark), `--color-gradient-brand`
  (70° green→blue, used only as eyebrow text fill).
- Surfaces: `--color-bg-page` #060906 (body, hero, dark bands),
  `--color-bg-black` #070707 (nav, problem band, timeline), `--color-bg-white`,
  `--color-bg-off-white` #f8faf9 (page flow, grey bands below 992),
  `--color-bg-grey` #fafafa (grey bands and cards ≥992).
- Text: `--color-text-heading-dark` #060906, `--color-text-body-dark` #2c3f4d
  (body on light), `--color-text-body-light` #f2f2f2 (body on dark),
  `--color-text-muted` #454545, `--color-text-off-black` #2f2f30.
- Two near-black backgrounds (#060906 and #070707) and two off-whites (#f8faf9
  and #fafafa) are both genuinely used by the original, for different
  sections. They are recorded as found, not merged.

**Type.** Satoshi only (self-hosted OTF, ITF Free Font License). The original
declares Light 300, Regular 400, Bold 700, Black 900 (+ italics) and **no 500
or 600 face**, so `font-weight:500` renders as Regular and 600 as Bold. Keep
it that way or text widths change. Scale: H1 60/72 (≤479: 46), H2 46/55.2
(≤991: 32), card title 40/48, problem 34/40.8, glass title 28/36.4, H4
24/31.2, lead 20/28, body 18/25.2, small 16/22.4, button 14/20 bold
capitalised with 0.5px tracking, eyebrow 12/20 bold uppercase with 1px
tracking and gradient fill (≤991 line-height 110%).

**Spacing.** Section padding is on a 20/40/60/80/100/120/140 rhythm. Grid
gaps are 16/24/40/60/80. Container side padding is **3%** (not px), with
1280px or 1400px max-widths. Rounded "grey bands" are 95% wide ≥1280.

**Radii.** 2px buttons, 4/8px small, 12px cards, 16px section bands ≥1280
(4px ≤991, 8px ≤479), 24px quote, 99px pills/flags.

**Borders and shadows.** Cards use 1px `--color-border-card`. Dark menu
cards use 1px `--color-border-dark`. Shadows are rare and subtle:
`--shadow-card` (icon tiles), `--shadow-mock` (glass cards),
`--shadow-subtle` (CTA).

**Motion.** Fade-up reveal on scroll: add `.reveal` (and `.reveal-group` on
the parent to stagger siblings by .2s). 48px travel, .9s
`cubic-bezier(.16,1,.3,1)`, triggered 250px before entering the viewport.
Hover transitions are .4s on colour/background/border.

**Absent on purpose.** No gradients except the eyebrow text, the glass cards,
section fades and the CTA flag fade. No drop shadows on buttons. No rounded
buttons (2px only). No uppercase except eyebrows.
