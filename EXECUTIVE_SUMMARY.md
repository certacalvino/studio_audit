# Certa Studio Audit — Executive Summary

**One page for stakeholders.** Full detail in [`README.md`](README.md) and Sections A–G.

## The verdict
Studio is **bimodal**. Its change-management engine is genuinely excellent — entity-tree diffs,
inline review comments, AI-drafted change summaries, environment promotion, Merge & Deploy with
in-progress-workflow handling, and an agentic, context-aware AI. But that engine is wrapped in a
**weak navigation shell**: a browser-tab model with no persistent navigator, no breadcrumb, an
unsearchable 453-app list, and an AI panel occupying the prime navigation rail.

> **Across 8 benchmarked tools, Studio scores 3.0/5 overall — strong on branching/AI (4/4), weak on
> navigation/context (2/2).** The opportunity is to *surface* strengths Studio already has, not to
> rebuild the engine.

## What's costing users today (top 5)
1. **No lateral navigation** — every workflow→workflow move forces a return to the "Open existing" home. *(S-01)*
2. **No sense of place** — no breadcrumb; the App › Workflow › Step path is never shown. *(S-02)*
3. **The app list doesn't scale** — 453 flat rows, no search/filter, polluted with test junk. *(S-03)*
4. **The AI blocks the nav** — a powerful assistant permanently occupies the left rail where navigation belongs. *(S-08)*
5. **Reviews aren't readable by everyone** — the diff is raw JSON, unreadable to non-technical admins. *(S-16)*

## The recommendation — Direction 0
A re-composition of patterns Studio (and best-in-class tools) already use:
- **Persistent left sidebar + `⌘K` palette** as the primary spine (from Linear; precedent already exists in App Settings).
- **A "Changes in this draft" rail + pipeline stepper** so branch/environment status is always visible (branch-first).
- **In-object Preview/Rules/JSON segmented control** (from the IDE model) — ends the object-vs-view tab confusion.
- **AI moved to an on-demand, context-bound side-sheet** (`⌘I`), freeing the rail for navigation.

## Sprint sequencing
**Sprint 1 — Quick wins (12 issues, Low effort, no nav rebuild).** Visual/Builder/CR polish that ships immediately:
S-04 in-object view switch · S-05 jump-to JSON errors · S-06 Live risk color + confirm gate ·
S-07 discoverable Plan mode · S-17 naming hygiene · S-18 force step naming · S-19 empty-state copy ·
S-20 top-bar grouping · S-21 header contrast · S-22 friendly names in CR summaries · S-23 block empty CRs ·
S-24 tab identity consistency.

**Sprints 2–4 — Navigation & IA core (Direction 0).** Medium-effort structural work:
S-01 sidebar navigator · S-02 breadcrumb · S-03 dashboard · S-08 AI side-sheet · S-09 tab cleanup ·
S-10 side-peek · S-11 stable URLs · S-13 surface Settings/Overrides · S-14 notification center · S-15 ⌘K.

**Anchor bets (parallel track).** Two High-effort investments:
S-16 semantic/visual diff · S-01 full navigator build-out · plus S-12 reviewer gates and S-25/26/27 (record
grouping, deploy status, draft curation) as they land.

## Risk & scope guardrails (honored throughout)
No engine or data-model changes · browser-only · multi-environment (Dev→QA→Pre-Live→Live) treated as a
first-class constraint · every proposal extends an existing Studio pattern before inventing a new one.
