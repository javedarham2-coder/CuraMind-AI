# CuraMind — CuraCore™ Powered Risk Screening (Prototype)

A front-end prototype for clinical decision support and early risk screening.
This repository contains the CuraMind UI, now branded around CuraCore™ and
updated to include an interactive Three.js brain visualization in the
analysis/loading flow.

> **Medical Disclaimer:** CuraMind (powered by CuraCore™) provides clinical
> decision support and risk estimation. It does not diagnose disease. Always
> consult a qualified healthcare provider.

## Key updates in this version

- Branded AI: Core product is now `CuraCore™` (used across UI labels,
  disclaimers, and badges).
- Analysis animation: `AnalysisPage` now renders a rotating, pulsing 3D
  brain using `three` (replaces the prior static SVG loader).
- Dependency updates: `three` and TypeScript types (`@types/three`) added.

## ✨ Highlights

- Full UI: Landing, Assessment, Analysis (loading), Dashboard, Report,
  Sign-In pages.
- Three.js brain visualization for richer loading feedback.
- Responsive design with Tailwind, modular components, and Framer Motion
  animations.

## 🛠 Tech Stack

- React + TypeScript + Vite
- Tailwind CSS 3
- Framer Motion (animations)
- Three.js (3D brain visualization)
- Lucide Icons, React Router

## Local development

Install and run:

```bash
cd curamind
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

Notes:
- If you added or removed packages, re-run `npm install`.
- Large bundles: the Three.js visuals add weight—consider code-splitting
  if you want smaller initial bundles.

## Routes

| Route | Page |
| ----- | ---- |
| `/` | Landing |
| `/assessment` | Patient assessment form |
| `/analysis` | Analysis/loading with Three.js brain |
| `/dashboard` | Risk dashboard (CuraCore™ output) |
| `/report` | CuraCore™ generated report |
| `/signin` | Sign-in page |

## Files touched in this update

- `src/pages/AnalysisPage.tsx` — integrated Three.js brain animation
- `src/pages/DashboardPage.tsx`, `src/pages/ReportPage.tsx`,
  `src/pages/AssessmentPage.tsx`, and landing components — updated
  CuraCore™ branding and short inline comments for readability

---

Prototype only — not a medical device.
