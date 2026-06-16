# Studio Audit — Memory

**Repo:** certacalvino/studio_audit
**Project:** Certa Studio UX/UI Audit
**Design Lead:** Chris Calviño (chris@chriscalvino.com)
**Started:** June 2026

## Purpose
Track decisions, findings, and deliverable progress across audit sessions.

## Status
- [x] A. Current State Map  (verified against live screenshots)
- [x] B. Competitive Benchmark Summary  (`B_competitive_benchmark.md`)
- [ ] C. Prioritized Issue List (20+ issues)  — SKIPPED for now per user request
- [x] D. Navigation Redesign Proposal  (`D_navigation_redesign.md`, 3 directions)
- [x] E. Dashboard Redesign  (`E_dashboard_redesign.md`) — user redefined E from "Top 3 Quick Wins" to a home/dashboard redesign

## Key Decisions
- Section A written in `A_current_state_map.md`, then corrected against 3 batches of real screenshots.
- Severity legend: 🔴 model break / 🟠 friction / 🟡 latent risk / ✅ existing strength to extend.
- Audit will favor RE-COMPOSING existing patterns over inventing new ones (per task constraint).

## Verified facts (anchors for later sections)
- AI rail is an **agentic, context-aware** assistant (context chips, checkpoints+revert, Plan mode) — not a passive chatbot.
- Change Requests **have a real entity-tree diff** (Workflows/Records/App Settings → field/line, +/~, 2-pane JSON), but it is **raw JSON only**, no inline comments, no required reviewers; promotion between tiers (e.g. #485 Development→QA) is itself a CR.
- App Settings (~18 sections) & App Overrides (per QA/Pre-Live/Live) already use a **persistent left sub-nav** → precedent for the §D navigator.
- Env→Draft model: drafts live inside an environment; Development holds 46 (mostly timestamp-named) drafts.
- Record attribute counts: External Party 67, Engagement 32, Contracts External Party 10, Mayo Internal Party 9, Contracts Engagement 7, Monitoring 2.
- Workflow has 3 views: Preview (builder) / Rules (WHEN→DO) / JSON (source of truth).

## Session Log
- 2026-06-16 — Initialized repo + CLAUDE.md. Drafted Section A, then revised it against live screenshots (App List, Open existing, Records, Subcontractor Form Preview/Rules/JSON, CR #461 Overview+Changes diff, Env/Draft switcher, AI Plan mode, App Overrides, App Settings). Section A complete. Next: Section B (Competitive Benchmark) pending user confirmation.
