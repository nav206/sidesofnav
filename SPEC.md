# SPEC.md: sidesofnav.dev

## 1. Project Overview & Vision
`sidesofnav.dev` is an interactive personal portfolio and digital almanac built around the metaphor of a multi-faceted 3D die. The site showcases different dimensions ("sides") of identity—from software engineering and spatial data storytelling to street photography and personal micro-projects—without cluttering the primary user experience.

### Core Objectives
* **Modular Architecture:** Hub-and-spoke model separating top-level identity categories while supporting deep-dive sub-pages.
* **Interactive UX:** A signature 3D cube rotation transition between top-level pages.
* **Deep-Link Integrity:** Full URL synchronization, bookmark preservation, and browser history (back/forward) support across all 3D transitions.
* **Responsive & Accessible:** Fluid experience across mobile, desktop, and low-motion environments.
* **Zero-Cost Scaling:** Hosted on Cloudflare Pages for unlimited static asset bandwidth.

---

## 2. Tech Stack & Infrastructure

| Layer | Tool / Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | Astro | Fast static site generation with selective React island hydration |
| **UI Components** | React | Interactive data visualizations, map widgets, and complex UI states |
| **Styling** | Tailwind CSS | Utility-first styling for custom themes and layout design |
| **Animation Engine**| Framer Motion / CSS 3D | GPU-accelerated 3D cube rotations and scroll transitions |
| **Data & Mapping** | D3.js / Chart.js / MapLibre GL | Custom client-side data storytelling and SF spatial map rendering |
| **Hosting & CDN** | Cloudflare Pages | \$0 free-tier deployment with unlimited static asset bandwidth (`sidesofnav.pages.dev`) |
| **Adapter** | `@astrojs/cloudflare` | Astro server/edge output integration for Cloudflare Pages |

---

## 3. Information Architecture & Routing

### Cube Faces (Y-axis)
| Route | Face title | Role |
| :--- | :--- | :--- |
| `/` | The Core | Landing + Bio / Quick Resume |
| `/projects` | The Analyst & Builder | Technical & Data Projects |
| `/creative` | The Observer & Writer | Photography + Substack / Writing |
| `/community` | The Human & Community | Volunteering, Fundraisers, Network Spotlight |

### Directory Structure (`src/pages/`)
```text
src/pages/
├── index.astro                 --> / (The Core)
├── projects/
│   ├── index.astro             --> /projects (The Analyst & Builder)
│   ├── zenna-the-zinnia.astro  --> /projects/zenna-the-zinnia (Interactive Scrollytelling)
│   └── sf-almanac.astro        --> /projects/sf-almanac (SF Spatial Dashboard)
├── creative/
│   └── index.astro             --> /creative (The Observer & Writer)
├── community/
│   └── index.astro             --> /community (The Human & Community)
└── 404.astro                   --> Fallback routing
```
