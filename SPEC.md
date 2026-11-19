# SPEC.md: sidesofnav (Cloudflare Pages)

## 1. Project Overview & Vision
`sidesofnav` is an interactive personal portfolio and digital almanac built around the metaphor of a multi-faceted 3D die. The site showcases different dimensions ("sides") of identity—from software engineering and spatial data storytelling to writing, nature observation, and community work—without cluttering the primary user experience.

**Live URL (for now):** `https://sidesofnav.pages.dev` — custom domain deferred (not purchased yet).
**Deploy:** `npm run deploy` (Cloudflare Pages via Wrangler → `dist/client`).

### Core Objectives
* **Modular Architecture:** Hub-and-spoke model separating top-level identity categories while supporting deep-dive sub-pages.
* **Interactive UX:** A signature 3D cube rotation transition between top-level pages.
* **Deep-Link Integrity:** Full URL synchronization, bookmark preservation, and browser history (back/forward) support across all 3D transitions.
* **Responsive & Accessible:** Fluid experience across mobile, desktop, and low-motion environments.
* **Zero-Cost Scaling:** Hosted on Cloudflare Pages free tier (`*.pages.dev`).

---

## 2. Tech Stack & Infrastructure

| Layer | Tool / Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Astro | Fast static site generation with selective React island hydration |
| **UI Components** | React | Interactive data visualizations, map widgets, and complex UI states |
| **Styling** | Tailwind CSS | Utility-first styling for custom themes and layout design |
| **Animation Engine**| CSS 3D (+ motion later as needed) | Cube rotations and scroll transitions |
| **Data & Mapping** | D3.js / Chart.js / MapLibre GL | Custom client-side data storytelling and SF spatial map rendering |
| **Hosting & CDN** | Cloudflare Pages | Free-tier at `sidesofnav.pages.dev` (no custom domain yet) |
| **Adapter** | `@astrojs/cloudflare` | Astro build for Cloudflare; static assets uploaded to Pages |

### Sitewide contacts (`src/lib/site.ts`)
| Kind | Value |
| :--- | :--- |
| Email | `navneet.singh@uni.minerva.edu` |
| LinkedIn | https://www.linkedin.com/in/navneet-in2026/ |
| GitHub | https://github.com/nav206/ |
| Resume PDF | TBD (redo in progress) |
| Writing / Substack | TBD |
| iNaturalist | https://www.inaturalist.org/people/navneet11 |
| eBird | https://ebird.org/profile/MzUxNjU3Ng |

---

## 3. Information Architecture & Routing

### Cube Faces (Y-axis)
| Route | Face title | Role |
| :--- | :--- | :--- |
| `/` | The Core | Brand, facts-only bio, city strip, face CTAs, elsewhere links |
| `/projects` | The Analyst & Builder | Curated project pipeline (`live` / `building` / `pipeline`) |
| `/creative` | The Observer & Writer | Writing first; nature profiles; photos after shortlist |
| `/community` | The Human & Community | Fundraisers (cause · action · proof) |

**Not routes:** `/skills`, `/about`, `/contact`.

### Directory Structure (`src/pages/`)
```text
src/pages/
├── index.astro                      --> / (The Core)
├── projects/
│   ├── index.astro                  --> /projects
│   ├── causal-hub.astro             --> /projects/causal-hub (live)
│   ├── lanesight.astro              --> /projects/lanesight (building)
│   ├── zenna-the-zinnia.astro       --> /projects/zenna-the-zinnia (building)
│   └── sf-almanac.astro             --> /projects/sf-almanac (building)
├── creative/
│   └── index.astro                  --> /creative
├── community/
│   └── index.astro                  --> /community
└── 404.astro                        --> Fallback routing
```
