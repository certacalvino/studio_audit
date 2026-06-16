# Studio Audit — Memory

**Repo:** certacalvino/studio_audit
**Project:** Certa Studio UX/UI Audit
**Design Lead:** Chris Calviño (chris@chriscalvino.com)
**Started:** June 2026

## Purpose
Track decisions, findings, and deliverable progress across audit sessions.

## Status
- [x] A. Current State Map  (`A_current_state_map.md`, verified against live screenshots)
- [x] B. Competitive Benchmark Summary  (`B_competitive_benchmark.md`, 7 competitors +Figma/Webflow/Notion; + B2 AI-integration-patterns table: 6 AI products, recommends on-demand context-bound side-sheet over permanent rail)
- [x] C. Prioritized Issue List (`C_issue_list.md`, 30 issues S-01–S-30, prioritized by severity→effort; 12 quick wins flagged)
- [x] D. Navigation Redesign Proposal  (`D_navigation_redesign.md`, 3 directions + Dir 0 synthesis)
- [x] E. Dashboard Redesign  (`E_dashboard_redesign.md`) — user redefined E from "Top 3 Quick Wins" to a home/dashboard redesign
- [x] F. Wireframe Briefs  (`F_wireframe_briefs.md`, Direction 0 recommended + Directions 1-3, designer-ready zone boxes)
- [x] G. Component Inventory  (`G_component_inventory.md`, 12 shared atoms + density/a11y baselines)
- [x] Figma Phase — Direction 0 visual build (4 frames) in Figma, real DS 4.0 tokens/components.

## Figma Phase (complete)
- **File:** "Studio — Navigation Explorations" — key `Mg3plZn2b0tadSOZAP3ndX`
- **URL:** https://www.figma.com/design/Mg3plZn2b0tadSOZAP3ndX
- **Branch (Figma deliverable ref):** `claude/blissful-galileo-2qigv1`
- **Frames built (all 1440×900, Direction 0 shell):**
  1. `01 — Dashboard` — work-routing home (attention strip, app tiles w/ env-health dots, Deploying/CR chips).
  2. `02 — App Interior` — Records › Engagement (pipeline bar, Navigate/Changes sidebar, attribute table, Studio AI).
  3. `03 — Workflow Builder` — Subcontractor Form › Subcontractor Details Step 1/4 (Preview/Rules/JSON, RECORD DETAILS + TASKS, form preview, AI).
  4. `04 — Change Requests` — 3-col: CR list / CR #461 detail (Summary/Changes tree/Impact) / Studio AI.
- **Token provenance:** DS file `h6ZML0jUOPU8MZ0bLBBOPE` ("Certa Design System 4.0") = local tokens (7 Inter text styles, 55 paint styles: Neutral/Brand/Green/Orange/Red/Blueberry…) reusing **"Design Sytem 3.0"** published components (Filled/Outline/Text buttons, Icon button, Badge, Avatar, Text Field) + Icons page. Everything live-linked by key — **no hardcoded colors or type styles**.
- **Env→DS color map:** Dev=Green/Green · QA=Brand/Brand (only true blue; doubles as primary) · Pre-Live=Orange/Orange · Live=Red/Red · locked-draft=Blueberry.
- **PENDING (next session):** icon contrast — **Bell** (top bar), **Gear** (attention-strip "deploy in progress" card), **Attach** (AI composer) render faint. Cause: these glyphs are stroke-based, but the ICON recolor only set `fillStyleId`; recolor must also set `strokeStyleId` (as done for the tile Deploying gear). Fix: bump to Neutral 700 / Brand and recolor strokes. Also `viz/01-dashboard.html` referenced in the brief never existed — Frame 1 was built from `E_dashboard_redesign.md` + `F_wireframe_briefs.md`.

## Key Decisions
- Section A written in `A_current_state_map.md`, then corrected against 3 batches of real screenshots.
- Severity legend: 🔴 model break / 🟠 friction / 🟡 latent risk / ✅ existing strength to extend.
- Audit will favor RE-COMPOSING existing patterns over inventing new ones (per task constraint).

## Verified facts (anchors for later sections)
- AI rail is an **agentic, context-aware** assistant (context chips, checkpoints+revert, Plan mode) — not a passive chatbot.
- Change Requests **have a real entity-tree diff** (Workflows/Records/App Settings → field/line, +/~, 2-pane JSON) AND inline + threaded comments AND AI-drafted title/summary/impact (Regenerate). Gaps: diff is **raw JSON only** (no semantic/visual diff), reviewers are optional/advisory (no required-reviewer gate). Promotion between tiers (e.g. #485 Development→QA) is itself a CR; merge = "Merge & Deploy" with ignore-vs-update in-progress-workflows modes. Drafts are owner-locked ("Unlock & take over").
- App Settings (~18 sections) & App Overrides (per QA/Pre-Live/Live) already use a **persistent left sub-nav** → precedent for the §D navigator.
- Env→Draft model: drafts live inside an environment; Development holds 46 (mostly timestamp-named) drafts.
- Record attribute counts: External Party 67, Engagement 32, Contracts External Party 10, Mayo Internal Party 9, Contracts Engagement 7, Monitoring 2.
- Workflow has 3 views: Preview (builder) / Rules (WHEN→DO) / JSON (source of truth).

## Session Log
- 2026-06-16 — Initialized repo + CLAUDE.md. Drafted Section A, then revised it across 4 batches of live screenshots (App List, Open existing, Records, Subcontractor Form Preview/Rules/JSON, CR #461 + #630 Overview+Changes diff + inline comments + Merge & Deploy, Env/Draft switcher + locking, AI Plan mode + checkpoints, App Overrides, App Settings, tab groups). Then delivered: B (Competitive Benchmark, Studio avg 3.0 — bimodal: strong branching/AI, weak nav). Skipped C per request. D (3 nav directions + Dir 0 synthesis: sidebar+⌘K base + pipeline/changes rail + in-tab view switch). E (dashboard redesign replacing flat 453 list). F (designer-ready wireframe briefs, Dir 0 + 1-3). G (12-atom component inventory). All committed/pushed to `claude/magical-tesla-vzktpc`.
- 2026-06-16 — Figma phase. Created file "Studio — Navigation Explorations" (`Mg3plZn2b0tadSOZAP3ndX`) and built all 4 Direction 0 frames (Dashboard, App Interior/Records, Workflow Builder, Change Requests) using real Certa DS 4.0 paint/text styles + DS 3.0 components, live-linked by key. Iterated on Frame 1 (tile parity, env-dot fill/outline semantics, Deploying chip contrast) and Frame 3 (header crowding) per review. All approved.
- NEXT SESSION: fix faint stroke-based icons (Bell, Gear, Attach) — recolor strokes too, bump to Neutral 700/Brand. Optional: build Direction 1–3 frames; export/share deck.
