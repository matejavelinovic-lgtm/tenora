# tenora.com → Astro migration

Source: https://www.tenora.com/ (Webflow site, 57 URLs in sitemap)
Target: this project — Astro 7, plain class-based CSS (no Tailwind), per the starter's conventions.
Status file: `.shipstudio/migration.json` (the live report).

## Survey (2026-11-22)

### Breakpoints (from the site's own stylesheet)
Webflow desktop-first base, plus two custom wide breakpoints:

| Range | Media query |
|---|---|
| ≥1440 | `min-width:1440px` |
| 1280–1439 | `min-width:1280px` |
| 992–1279 | base (no query) |
| 768–991 | `max-width:991px` |
| 480–767 | `max-width:767px` |
| ≤479 | `max-width:479px` |

Measured at **1440, 1280, 991, 767, 479**.

### Fonts
- **Satoshi** (300/400/500i/700/900 + italics), Indian Type Foundry via Fontshare. ITF Free Font License allows commercial self-hosting → self-host the same files. No substitution needed.
- Material Icons / Material Symbols (Apache 2.0), only inside the Trade Analyser widget page.

### Shared regions
- **Header**: logo, Platform ▾ (mega dropdown), Company ▾, Insights, "Free Trade Analyser" (outline) + "Contact Us" (solid). Announcement bar under it (Fexco news). Hamburger + Contact Us at ≤991.
- Variant header (`t_nav_bottom`) on legal-detail and help pages.
- **Footer**: logo + tagline + address/contact, three link columns (Platform / About / Legal Hub), grey regulatory notice box.
- **CTA band** "Ready to take control?" with flag marquee — shared across home and platform pages.
- **Blog teaser** "Keep Up To Date" (3 latest insights) — shared.

### Templates (57 URLs → 11 templates)

| # | Template | URLs | Notes |
|---|---|---|---|
| 1 | Homepage | `/` | Dark hero with UI mock cards + animated wave canvas, rotating "problem" list, 3 stage cards, quote, 4 alternating feature rows, timeline, governance grid, CTA, blog teaser. `/home-copy` is a Webflow duplicate of this page. |
| 2 | Platform product page | 5: `/platform/{global-accounts-and-payments, fx-risk-management, transparent-fx-execution, fx-trade-analyser, what-is-fx-orchestration}` | Same section vocabulary as the homepage (dark hero, feature rows, grey/dark bands, CTA). Each one has bespoke content. |
| 3 | Platform overview | `/platform` | Hero + feature sections |
| 4 | About us | `/about-us` | Hero, team grid (links to team members), values |
| 5 | Insights listing | `/insights` | 27 cards on one page, no pagination or filter |
| 6 | Insight post | 27 × `/insights/*` (sitemap count; 25 shown in the listing) | **CMS collection.** Rich text body, dark related band |
| 7 | Team member | 11 × `/team-member/*` | **CMS collection.** Photo, name, role, bio |
| 8 | Form / lead pages | `/contact-us`, `/start-free-trial`, `/book-a-call`, `/fx-orchestration-whitepaper` | HubSpot forms (portal 49449969) and HubSpot Meetings embeds (2 calendars) |
| 9 | Long-form whitepaper | `/how-fx-orchestration-will-redefine-fx-risk` | Long article with sticky section nav and 16 accordion dropdowns |
| 10 | Trade Analyser Lite | `/trade-analyser-lite` | Marketing page wrapping Tenora's own widget from `cdn.tenora.com/widget/*` |
| 11 | Legal | `/legal-hub`, `/legal/governance`, `/legal/currency-cloud-terms` (CMS, 2), `/help/legal-disclosures` (CMS, 1) | Text pages. Two PDFs are linked from the Webflow CDN. |

### Dynamic content (Webflow CMS)
| Collection | Items | Used by |
|---|---|---|
| Insights | 27 | listing, post, homepage blog teaser — now `src/content/insights/*.md` |
| Team members | 11 | about-us, team-member pages |
| Legal | 2 | legal detail |
| Help docs | 1 | help page |

### Motion and scripts
- Fade-up reveal on scroll (custom `microanimations` script: opacity 0 → 1, translateY 48px → 0, .9s `cubic-bezier(.16,1,.3,1)`, children staggered by .2s).
- GSAP + ScrollTrigger interactions, a particle-network canvas, a globe.gl WebGL globe (`#tenora-globe`) on 7 pages, a Flowbase carousel ticker (flag/logo marquee).
- Third-party tags: Cookiebot (blocking mode), GTM `GTM-N875S8SW`, GA4 `G-V9KFFLPYC4`, LinkedIn Insight, HubSpot tracking `49449969`.

### Cannot come across as-is
- **HubSpot form and meeting backends.** We can embed the same forms, but we cannot see or own what happens after submission.
- **Cookiebot banner.** It is tied to the tenora.com domain group (cbid `69029d66…`), so it will not render on localhost or on preview URLs.
- **Trade Analyser widget.** Served from `cdn.tenora.com`. It may be origin-restricted; untested until the template is built.
- **Exact animation frames.** The canvas waves, marquee and rotating list never land on the same frame twice. The original doesn't match itself (below).

### Measurement notes (important)
- The fidelity tool had no Windows browser path and could not kill Chrome on Windows. I patched `.shipstudio/fidelity/headless-chrome.mjs` to look for Windows Chrome, Playwright's Chromium and Edge, and to use `taskkill` on Windows.
- The original's reveal script attaches late, because Cookiebot defers scripts. Because of that, the tool's single scroll pass ran **before** content was marked hidden, and the reference showed 35 of 44 animated blocks as blank. I added a second scroll pass after the settle wait in `site-fidelity.mjs`. It runs the same way on both sides, and the reference now shows what a visitor sees.
- **Noise floor: the original measured against itself scores 99.09% at 1440 and 98.62% at 479.** The difference sits in the hero wave canvas, the rotating problem list, the flag marquee and the blog wave background. Below the 99.5% bar until those are dealt with (see decisions).
- Dev server: Ship Studio runs its own Astro dev server (currently :3657). `scripts/proxy-3000.mjs` forwards :3000 to it, so the configured URL works without starting a second server.

## Decisions
See `needsYou` in `.shipstudio/migration.json`.

## Progress (live detail in .shipstudio/migration.json)

| Page | Worst breakpoint | Report |
|---|---|---|
| `/` | 99.81% (1280) | p2-home-confirm |
| `/platform/fx-risk-management` | 99.65% (1440) | p3-frm-confirm |
| `/platform/transparent-fx-execution` | 99.57% (479; later 99.81%) | p3-tfe-confirm |
| `/platform/global-accounts-and-payments` | 99.77% (1280) | p3-gap-confirm |
| `/platform/fx-trade-analyser` | 99.75% (479) | p3-fta-confirm, -05, -06 |
| `/platform/what-is-fx-orchestration` | 99.76% (991, 767) | p3-wfo-confirm |
| `/platform` (overview) | 99.75% (479) | p3-plt-confirm, -08; 767/479 later 99.83/99.82 (p3-plt-09) |
| `/about-us` | 99.86% (479; later 99.90%) | p3-abt-confirm, p3-abt-08 |
| `/team-member/*` (11 pages, one template) | 99.70% (767) | p3-tm-confirm2 (andy-mowat, all widths); russ-fowden 767 99.69, harry-adams 767 99.70 |
| `/insights` | 99.97% (767) | p3-ins-all |
| `/insights/*` (27 posts, one template) | 99.87% (767) | p3-post-all + p3-post-1 (descending-wedge, all widths); p3-post-more (3 posts at 1440/479, 99.80–99.96) |

## How each page is built (workflow)

Diagnostic helpers live in `.shipstudio/fidelity/tools/` (copied from the session scratchpad):
- `dump.sh <url> <width> <out>` + `compact.mjs`: rendered tree with positions and non-default computed styles. Build CSS from this, never from screenshots.
- `cmp.sh <orig> <rebuild> <width>`: exact top-level section geometry side by side. Use it to find which section drifts.
- `texts.cjs <html>`: every text in document order (⏎ = `<br>`). `assets.cjs <html> public/assets`: download images and srcset variants. `icons.cjs <html> src/icons`: content-hashed SVG icons (`i-xxxxxxxx`).
- `rules.cjs src/site.css <classes…>`: the original's real CSS rules per breakpoint. Mirror these; it beats inferring from geometry.
- `bands.ps1 diff.png` / `crop.ps1`: where in the page the pixel diff is, and side-by-side crops.

Lessons that cost time:
- Webflow's default `h1–h6` margins (20/10) and `p` bottom margin (10) still apply where a class doesn't override them. Several titles only zero them at ≥1280 or ≥1440.
- The original mixes `%` and unitless line-heights. Chrome snaps them differently, so match per element (measure exact heights) rather than switching globally.
- Some content quirks are real and must be mirrored: leading `&nbsp;`, `<br>` placement, inconsistent card markup.
- Script-driven styles (ticker height, glass-card gradient on timeline pages, the footer GSAP fade) need the page's actual behaviour, not CSS.
