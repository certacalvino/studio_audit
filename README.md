# Certa Studio — UX/UI Audit & Diagnostic

A navigation-focused UX/UI audit of **Certa Studio** (Certa's internal workflow builder & platform
configuration tool), conducted against the live *Mayo Client App* environment and verified across
four batches of real screenshots.

**Design Lead:** Chris Calviño · **Conducted:** June 2026 · **Branch:** `claude/magical-tesla-vzktpc`

## Headline finding
Studio is **bimodal**: a **top-quartile branching/review/AI engine** (entity-tree CR diff, inline
comments, AI-drafted summaries, Merge & Deploy with in-progress handling, agentic context-aware AI)
wrapped in a **bottom-quartile navigation shell** (browser-tab model, no persistent navigator, no
breadcrumb, an unsearchable 453-app list, AI squatting on the prime nav rail). The fix is
**re-composition of patterns Studio already owns**, not reinvention.

## Deliverables
| § | Document | What's inside |
|---|---|---|
| A | [`A_current_state_map.md`](A_current_state_map.md) | Full current navigation model, zone by zone, with a consolidated friction inventory (🔴 break / 🟠 friction / 🟡 risk / ✅ strength). |
| B | [`B_competitive_benchmark.md`](B_competitive_benchmark.md) | Benchmark vs Linear, Cursor/VS Code, Retool, GitHub, Figma, Webflow, Notion (5 dims, 1–5). Plus **B2**: AI-integration-patterns benchmark (Claude.ai, Claude Code, ChatGPT, Cursor, Atlas Browser, Notion AI). |
| C | [`C_issue_list.md`](C_issue_list.md) | 30 prioritized issues (S-01–S-30), severity→effort, with 12 quick wins flagged. |
| D | [`D_navigation_redesign.md`](D_navigation_redesign.md) | 3 distinct navigation directions + **Direction 0 (recommended synthesis)**. |
| E | [`E_dashboard_redesign.md`](E_dashboard_redesign.md) | New home/dashboard replacing the flat 453-app list; surfaces CRs, branch activity, deploy status. |
| F | [`F_wireframe_briefs.md`](F_wireframe_briefs.md) | Designer-ready zone briefs (dimensions · contents · interaction note) for Dir 0 + Dir 1–3. |
| G | [`G_component_inventory.md`](G_component_inventory.md) | 12-atom shared UI kit + density/accessibility baselines. |

[`CLAUDE.md`](CLAUDE.md) holds the running memory: status, key decisions, verified facts, and session log.

## Recommendation in one line
Adopt **Direction 0**: a persistent left-sidebar + `⌘K` spine (from Linear), a branch-aware
"Changes in this draft" rail + pipeline stepper (branch-first), and an in-object Preview/Rules/JSON
segmented control (from the IDE model) — freeing the left rail by moving the AI to an on-demand,
context-bound side-sheet. Ship the 12 Low-effort quick wins (Section C) in parallel.
