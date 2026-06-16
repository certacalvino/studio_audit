# B. Competitive Benchmark Summary

Studio benchmarked against Linear, Cursor/VS Code, Retool, and GitHub across five dimensions.
Scale: **1 = poor · 3 = adequate · 5 = best-in-class.** Each cell = score + one-line rationale.
Scores reflect the *current* Studio (Mayo Client App), verified against live screenshots.

## Score matrix (scannable)

| Product | Navigation model | Context persistence | Branching / versioning UX | AI integration | Density / info hierarchy | Avg |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| **Certa Studio** | 2 | 2 | 4 | 4 | 3 | **3.0** |
| **Linear** | 5 | 5 | 2 | 3 | 5 | **4.0** |
| **Cursor / VS Code** | 4 | 4 | 4 | 5 | 4 | **4.2** |
| **Retool** | 4 | 3 | 3 | 3 | 3 | **3.2** |
| **GitHub** | 4 | 5 | 5 | 4 | 4 | **4.4** |

## Detailed rationale

### Navigation model
| Product | Score | One-line rationale |
|---|:--:|---|
| Studio | 2 | Browser-tab model with no persistent structural navigator; lateral workflow↔workflow movement forces a return to "Open existing". |
| Linear | 5 | Persistent left sidebar (Workspace › Team › Project › Issue) + `Cmd+K` command palette make every destination one or two keystrokes away. |
| Cursor/VS Code | 4 | File tree (activity bar) anchors hierarchy while editor tabs handle the working set; command palette covers everything else. |
| Retool | 4 | App list → app → page/component is navigable via a left tree + component outline without leaving the canvas. |
| GitHub | 4 | Repo-scoped top tabs (Code/Issues/PRs) + file tree + breadcrumbs give a stable, learnable map. |

### Context persistence (knowing & keeping where you are)
| Product | Score | One-line rationale |
|---|:--:|---|
| Studio | 2 | Routes exist (`/studio/apps`) but no breadcrumb survives a drill-in and switching tabs/CRs drops you out of workflow context. |
| Linear | 5 | Stable URL per issue/project, reliable back/forward, breadcrumbs, and restored sidebar state. |
| Cursor/VS Code | 4 | Workspaces restore open tabs and the breadcrumb bar shows file › symbol; weak point is no shareable URLs. |
| Retool | 3 | URL per app/page is shareable, but deep component/inspector state isn't addressable. |
| GitHub | 5 | Every artifact (line, comment, commit, diff) is a permalink with breadcrumbs throughout. |

### Branching / versioning UX
| Product | Score | One-line rationale |
|---|:--:|---|
| Studio | 4 | Genuinely strong: draft branches per environment, entity-tree diff, inline + threaded comments, AI summary/impact, Merge & Deploy with in-progress handling — held back only by raw-JSON-only diffs and no required-reviewer gate. |
| Linear | 2 | Not a versioned-artifact tool; issue history exists but there is no diff/merge/branch review of content. |
| Cursor/VS Code | 4 | First-class git: source-control panel, side-by-side diffs, stage/commit, inline change gutters — but it's git, not a guided promotion pipeline. |
| Retool | 3 | Release versions, protected apps, and history exist, but in-product diff/PR review is shallow vs a true code review. |
| GitHub | 5 | The reference model: PRs, line-level diffs + comments, required reviewers, status checks, and explicit merge strategies. |

### AI integration
| Product | Score | One-line rationale |
|---|:--:|---|
| Studio | 4 | Agentic and context-aware (context chips, checkpoints + revert, Plan mode, auto-drafted CR title/summary/impact) — impressive capability, undercut by a cramped rail, undiscoverable Plan mode, and no history/suggested actions. |
| Linear | 3 | Useful AI (summaries, similar-issue, drafting) but assistive, not an agent that builds the artifact. |
| Cursor/VS Code | 5 | Best-in-class: inline edit, agent mode, `@`-referencing of files/symbols, tab completion, and chat tightly fused with the editor. |
| Retool | 3 | AI app/query generation and AI actions are handy but bolt-on rather than pervasive. |
| GitHub | 4 | Copilot delivers strong inline completion, PR summaries, and chat, though less agentic inside the review surface itself. |

### Density / information hierarchy
| Product | Score | One-line rationale |
|---|:--:|---|
| Studio | 3 | Power-user dense with good typed tables, but low-contrast section headers (RECORD DETAILS/TASKS), flat long-scroll lists, and machine tags surfaced to humans weaken the hierarchy. |
| Linear | 5 | Dense yet impeccably structured: consistent type scale, grouping, and whitespace make high information density feel calm. |
| Cursor/VS Code | 4 | Very dense but tamable via collapsible panels and a clear tree → editor → terminal rhythm. |
| Retool | 3 | Component- and panel-rich; powerful but can read as cluttered without discipline. |
| GitHub | 4 | Comfortable density with clear visual hierarchy, occasionally sprawling on large PRs. |

## Synthesis — what Studio should steal, and from whom

- **From Linear — the persistent structural sidebar + command palette.** Studio's single biggest gap (nav model 2, context 2). Studio already has the ingredient (the App Settings/Overrides left sub-nav); Linear shows how to make it the *primary* spine with `Cmd+K` for everything.
- **From GitHub — finish the review surface.** Studio is already 80% here; close the gap with (a) a **semantic/visual diff** layered over the raw-JSON diff so non-engineers can read changes, and (b) optional **required-reviewer gates** before Merge & Deploy for Live-bound CRs.
- **From Cursor — fuse the AI with the canvas.** Studio's AI is nearly as capable but lives in an isolated rail; Cursor shows how to let it reference and act on the *currently selected* step/field, with inline edits and a discoverable mode switch (replacing the unexplained Plan toggle).
- **From Retool — in-canvas object switching.** Studio forces a trip back to "Open existing"; Retool keeps the object list and the editor co-resident so you never lose the canvas.
- **Studio's own edge to protect:** its branching/versioning UX (4) already beats Linear and Retool and rivals Cursor — the redesign must *surface* this strength in navigation, not bury it behind a top-bar fork icon.

**Headline:** Studio is **average overall (3.0)** but **bimodal** — a top-quartile branching/AI engine wrapped in a bottom-quartile navigation shell. The fix is re-composition (Section D), not reinvention.
