# B. Competitive Benchmark Summary

Studio benchmarked against Linear, Cursor/VS Code, Retool, GitHub, Figma, Webflow, and Notion across
five dimensions. Scale: **1 = poor · 3 = adequate · 5 = best-in-class.** Each cell = score + one-line
rationale. Scores reflect the *current* Studio (Mayo Client App), verified against live screenshots.
The Figma/Webflow/Notion rows weight the three dimensions called out for this round: handling **many
open objects at once**, **context persistence**, and **branching/versioning**.

## Score matrix (scannable)

| Product | Navigation model | Context persistence | Branching / versioning UX | AI integration | Density / info hierarchy | Avg |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| **Certa Studio** | 2 | 2 | 4 | 4 | 3 | **3.0** |
| **Linear** | 5 | 5 | 2 | 3 | 5 | **4.0** |
| **Cursor / VS Code** | 4 | 4 | 4 | 5 | 4 | **4.2** |
| **Retool** | 4 | 3 | 3 | 3 | 3 | **3.2** |
| **GitHub** | 4 | 5 | 5 | 4 | 4 | **4.4** |
| **Figma** | 4 | 4 | 4 | 3 | 4 | **3.8** |
| **Webflow** | 3 | 3 | 2 | 2 | 3 | **2.6** |
| **Notion** | 4 | 5 | 2 | 3 | 4 | **3.6** |

## Detailed rationale

### Navigation model
| Product | Score | One-line rationale |
|---|:--:|---|
| Studio | 2 | Browser-tab model with no persistent structural navigator; lateral workflow↔workflow movement forces a return to "Open existing". |
| Linear | 5 | Persistent left sidebar (Workspace › Team › Project › Issue) + `Cmd+K` command palette make every destination one or two keystrokes away. |
| Cursor/VS Code | 4 | File tree (activity bar) anchors hierarchy while editor tabs handle the working set; command palette covers everything else. |
| Retool | 4 | App list → app → page/component is navigable via a left tree + component outline without leaving the canvas. |
| GitHub | 4 | Repo-scoped top tabs (Code/Issues/PRs) + file tree + breadcrumbs give a stable, learnable map. |
| Figma | 4 | Infinite canvas shows many frames at once; Pages + Layers tree + file tabs manage many objects, though cross-file work still spawns multiple browser tabs. |
| Webflow | 3 | Navigator (DOM tree) + Pages panel organize one page well, but it is page-at-a-time with no multi-object working set. |
| Notion | 4 | Persistent nested sidebar + breadcrumbs + tabs + side-peek keep many pages reachable at once without leaving the current one. |

### Context persistence (knowing & keeping where you are)
| Product | Score | One-line rationale |
|---|:--:|---|
| Studio | 2 | Routes exist (`/studio/apps`) but no breadcrumb survives a drill-in and switching tabs/CRs drops you out of workflow context. |
| Linear | 5 | Stable URL per issue/project, reliable back/forward, breadcrumbs, and restored sidebar state. |
| Cursor/VS Code | 4 | Workspaces restore open tabs and the breadcrumb bar shows file › symbol; weak point is no shareable URLs. |
| Retool | 3 | URL per app/page is shareable, but deep component/inspector state isn't addressable. |
| GitHub | 5 | Every artifact (line, comment, commit, diff) is a permalink with breadcrumbs throughout. |
| Figma | 4 | Shareable links down to a file/page/frame/selected node; in-app back is weak but deep-links to a node restore exact context. |
| Webflow | 3 | URL per page in the Designer is shareable, but selection and panel state aren't addressable. |
| Notion | 5 | Every page is a permalink, breadcrumbs are everywhere, and back/forward reliably restores where you were. |

### Branching / versioning UX
| Product | Score | One-line rationale |
|---|:--:|---|
| Studio | 4 | Genuinely strong: draft branches per environment, entity-tree diff, inline + threaded comments, AI summary/impact, Merge & Deploy with in-progress handling — held back only by raw-JSON-only diffs and no required-reviewer gate. |
| Linear | 2 | Not a versioned-artifact tool; issue history exists but there is no diff/merge/branch review of content. |
| Cursor/VS Code | 4 | First-class git: source-control panel, side-by-side diffs, stage/commit, inline change gutters — but it's git, not a guided promotion pipeline. |
| Retool | 3 | Release versions, protected apps, and history exist, but in-product diff/PR review is shallow vs a true code review. |
| GitHub | 5 | The reference model: PRs, line-level diffs + comments, required reviewers, status checks, and explicit merge strategies. |
| Figma | 4 | True branches with visual review + merge + version history — the standout *visual* diff/branch model and the most direct lesson for Studio's raw-JSON-only diff. |
| Webflow | 2 | Site/page backups and version history exist, but there is no branch/merge or change-by-change review. |
| Notion | 2 | Page-level version history only; no branching, merge, or diff of content. |

### AI integration
| Product | Score | One-line rationale |
|---|:--:|---|
| Studio | 4 | Agentic and context-aware (context chips, checkpoints + revert, Plan mode, auto-drafted CR title/summary/impact) — impressive capability, undercut by a cramped rail, undiscoverable Plan mode, and no history/suggested actions. |
| Linear | 3 | Useful AI (summaries, similar-issue, drafting) but assistive, not an agent that builds the artifact. |
| Cursor/VS Code | 5 | Best-in-class: inline edit, agent mode, `@`-referencing of files/symbols, tab completion, and chat tightly fused with the editor. |
| Retool | 3 | AI app/query generation and AI actions are handy but bolt-on rather than pervasive. |
| GitHub | 4 | Copilot delivers strong inline completion, PR summaries, and chat, though less agentic inside the review surface itself. |
| Figma | 3 | First Draft generation, layer rename, and visual search are useful but assistive, not an agent that owns the artifact. |
| Webflow | 2 | AI site builder / AI assist are bolt-on generators rather than an integrated copilot. |
| Notion | 3 | Notion AI (Q&A over the workspace, writing, autofill) is broadly available but assistive, not agentic. |

### Density / information hierarchy
| Product | Score | One-line rationale |
|---|:--:|---|
| Studio | 3 | Power-user dense with good typed tables, but low-contrast section headers (RECORD DETAILS/TASKS), flat long-scroll lists, and machine tags surfaced to humans weaken the hierarchy. |
| Linear | 5 | Dense yet impeccably structured: consistent type scale, grouping, and whitespace make high information density feel calm. |
| Cursor/VS Code | 4 | Very dense but tamable via collapsible panels and a clear tree → editor → terminal rhythm. |
| Retool | 3 | Component- and panel-rich; powerful but can read as cluttered without discipline. |
| GitHub | 4 | Comfortable density with clear visual hierarchy, occasionally sprawling on large PRs. |
| Figma | 4 | Clean, well-organized panels (layers/properties/assets) with a strong, consistent hierarchy. |
| Webflow | 3 | Panel-heavy and dense; powerful for builders but can overwhelm newcomers. |
| Notion | 4 | Document-first with generous whitespace; hierarchy comes from nesting, at lower information density. |

## Synthesis — what Studio should steal, and from whom

- **From Linear — the persistent structural sidebar + command palette.** Studio's single biggest gap (nav model 2, context 2). Studio already has the ingredient (the App Settings/Overrides left sub-nav); Linear shows how to make it the *primary* spine with `Cmd+K` for everything.
- **From GitHub — finish the review surface.** Studio is already 80% here; close the gap with (a) a **semantic/visual diff** layered over the raw-JSON diff so non-engineers can read changes, and (b) optional **required-reviewer gates** before Merge & Deploy for Live-bound CRs.
- **From Cursor — fuse the AI with the canvas.** Studio's AI is nearly as capable but lives in an isolated rail; Cursor shows how to let it reference and act on the *currently selected* step/field, with inline edits and a discoverable mode switch (replacing the unexplained Plan toggle).
- **From Retool — in-canvas object switching.** Studio forces a trip back to "Open existing"; Retool keeps the object list and the editor co-resident so you never lose the canvas.
- **Studio's own edge to protect:** its branching/versioning UX (4) already beats Linear and Retool and rivals Cursor — the redesign must *surface* this strength in navigation, not bury it behind a top-bar fork icon.

### Lessons from the second cohort (Figma · Webflow · Notion)
- **From Figma — the visual branch/diff.** Figma is the clearest proof that branching can be *reviewed visually*, not as raw source. This is the single most relevant precedent for Studio's biggest CR gap (raw-JSON-only diff): show a before/after of the rendered form/record, not just JSON lines.
- **From Notion — context persistence with many objects.** Breadcrumbs + nested sidebar + **side-peek** let users open a second object without losing the first — exactly Studio's "switching tabs/CRs drops workflow context" failure. Adopt side-peek for CRs/records so review never abandons the canvas.
- **From Webflow — a cautionary baseline (2.6 avg).** Powerful but page-at-a-time with weak versioning; it shows what Studio must avoid — depth of editing without a multi-object working set or real change review. Studio already beats it on branching; it must not regress on the working-set front.

**Updated headline:** across all seven, Studio (3.0) still sits mid-pack — above Webflow (2.6), near Notion (3.6) and Retool (3.2), below the nav/versioning leaders (GitHub 4.4, Cursor 4.2, Linear 4.0, Figma 3.8). The pattern is unchanged: **strong branching/AI engine, weak navigation shell.** Figma (visual diff) and Notion (side-peek + breadcrumbs) sharpen the prescription already in Section D.

---

# B2. AI Integration Patterns — focused benchmark

A second benchmark scoped to **how AI is embedded in the product surface**, since Studio's AI rail is
both a strength (agentic, context-aware) and a liability (squats on the prime nav region, undiscoverable
Plan mode). Products: Claude.ai web · Claude Code · ChatGPT · Cursor · Atlas Browser · Notion AI.

Scale **1–5** (5 = best fit for a configuration tool where the user is always inside one object).
Column rubric:
- **AI panel placement** — how well-placed the AI surface is for focused work (5 = adjacent to the object, non-intrusive).
- **Context awareness** — does it know what you're looking at *without being told*? (5 = auto-binds to the current object/selection).
- **Always-visible vs on-demand** — fit of the visibility model (5 = instantly reachable yet not occupying permanent real estate).
- **Canvas/editor integration** — can it read and *act on* the thing you're editing inline? (5 = inline edits + diffs in the editor).
- **Relevance to Studio** — how transferable the pattern is to Studio's object-bound workflow.

## Score matrix

| Product | AI panel placement | Context awareness | Always-vis vs on-demand | Canvas/editor integration | Relevance to Studio | Avg |
|---|:--:|:--:|:--:|:--:|:--:|:--:|
| **Claude.ai web** | 3 | 2 | 3 | 3 | 2 | **2.6** |
| **Claude Code** | 4 | 5 | 4 | 5 | 5 | **4.6** |
| **ChatGPT** | 3 | 2 | 3 | 3 | 2 | **2.6** |
| **Cursor** | 5 | 5 | 4 | 5 | 5 | **4.8** |
| **Atlas Browser** | 4 | 5 | 4 | 3 | 4 | **4.0** |
| **Notion AI** | 4 | 4 | 3 | 4 | 4 | **3.8** |

## Per-product rationale

| Product | Pattern & why it scores this way |
|---|---|
| **Claude.ai web** | The AI *is* the app: full-screen chat with **Artifacts** as a right-side canvas. No awareness of an external object you're configuring (you paste/Projects), so it's powerful but unbound — low relevance to an object-centric tool. |
| **Claude Code** | Agentic CLI/IDE companion that **reads the working tree, runs commands, edits files, and checkpoints** — it knows your context and acts on it. Always-on session, deep filesystem integration. The closest analog to what Studio's AI already aspires to (checkpoints + revert + Plan). |
| **ChatGPT** | Standalone chat with a **Canvas** mode for docs/code; relies on memory/custom-instructions rather than live app context. Strong generator, weak at "knows what you're looking at" — same unbound limitation as Claude.ai web. |
| **Cursor** | **Best fit.** Right-side chat **plus inline `Cmd+K`** in the editor, `@`-references to files/symbols, codebase indexing, and in-editor diffs. On-demand yet instantly reachable; acts directly on the open object. The reference pattern for Studio Direction 1. |
| **Atlas Browser** | An AI **sidebar companion that auto-reads the current web page** and can act on it (agent mode). Demonstrates ambient, no-setup context awareness over *any* surface — but generic DOM-level, not structured by an object model, so integration depth is shallow. |
| **Notion AI** | Lives **inside the object you're editing**: inline via slash/selection and a side Q&A panel, editing the document in place. Knows the current page/workspace. Assistive rather than agentic, but the in-object placement is highly transferable. |

## Synthesis — the right AI pattern for Studio

For a configuration tool where the user is **always inside a specific object** (a workflow, a record, a
step, a field), the winning pattern is the **Cursor / Claude Code hybrid, not the Claude.ai / ChatGPT
full-screen chat**: AI that is **on-demand but instantly reachable** (a keyboard summon like `⌘I`/`⌘K`,
opening as a dismissible side-sheet) rather than a panel that permanently occupies the prime rail —
which is exactly Studio's current mistake. It must be **context-aware by default**: Studio has an
advantage Atlas Browser has to fake — it *owns the object model*, so the assistant can bind to the
current workflow/step/field with certainty (the existing `⤳ Subcontractor Form` context chip proves the
hook exists) instead of guessing from the DOM. And it must be **canvas-integrated and agentic**: able to
read and *act on* the selected object inline (Cursor's `Cmd+K`, Claude Code's edit-and-checkpoint),
which Studio already half-implements via checkpoints + revert. The prescription: **free the left rail
for navigation, move the AI to an on-demand context-bound side-sheet, make "ask/act on *this* step/field"
a one-keystroke action, and keep the agentic checkpoint/Plan model** — combining Cursor's placement,
Claude Code's agency, Atlas's ambient awareness, and Notion's in-object inline edits.

**Headline:** Studio is **average overall (3.0)** but **bimodal** — a top-quartile branching/AI engine wrapped in a bottom-quartile navigation shell. The fix is re-composition (Section D), not reinvention.
