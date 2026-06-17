# Direction 0 frames — built on Catalyst

Static HTML mocks of the four Direction 0 frames, rebuilt on the Catalyst
design system (tokens + component classes from the uploaded kit) instead of
the prior token set.

Rendered as dependency-free static HTML (the kit's React/Babel bootstrap loads
from a CDN, which isn't reachable in the build environment) — the markup mirrors
the Catalyst components' DOM and reuses the exact `ck-*` classes.

## Assets
- `assets/colors_and_type.css` — Catalyst token source of truth (copied)
- `assets/catalyst.css` — Catalyst component CSS (copied; @import re-pointed)
- `assets/dir0.css` — composed Direction 0 extensions (all on Catalyst tokens)
- `assets/fonts/` — Inter variable fonts

## Environment color remap (Catalyst semantic tokens)
Dev = green-400 · QA = brand-400 · Pre-Live = orange-400 · Live = red-400

## Frames
1. `01-dashboard.html` — Home / dashboard (per E_dashboard_redesign.md)
2. `02-app-interior.html` — *pending*
3. `03-workflow-builder.html` — *pending*
4. `04-change-requests.html` — *pending*

PNGs are regenerable: `node .shoot.js <frame>.html <out>.png`
