# Studio Audit — Memory

**Repo:** certacalvino/studio_audit
**Project:** Certa Studio UX/UI Audit
**Design Lead:** Chris Calviño (chris@chriscalvino.com)
**Started:** June 2026

## Purpose
Track decisions, findings, and deliverable progress across audit sessions.

## Status
- [x] A. Current State Map  (`A_current_state_map.md`, verified against live screenshots)
- [x] B. Competitive Benchmark Summary  (`B_competitive_benchmark.md`, 7 competitors: +Figma/Webflow/Notion)
- [ ] C. Prioritized Issue List (20+ issues)  — SKIPPED this session per user request (open for next session)
- [x] D. Navigation Redesign Proposal  (`D_navigation_redesign.md`, 3 directions + Dir 0 synthesis)
- [x] E. Dashboard Redesign  (`E_dashboard_redesign.md`) — user redefined E from "Top 3 Quick Wins" to a home/dashboard redesign
- [x] F. Wireframe Briefs  (`F_wireframe_briefs.md`, Direction 0 recommended + Directions 1-3, designer-ready zone boxes)
- [x] G. Component Inventory  (`G_component_inventory.md`, 12 shared atoms + density/a11y baselines)

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
- NEXT SESSION: Section C (Prioritized Issue List, 20+ issues) is the remaining deliverable; raw findings already captured in A §7.
