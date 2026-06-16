# D. Navigation Redesign Proposal — 3 Directions

Three *distinct* navigation architectures for Studio. All three obey the constraints:
no engine/data-model rebuild · browser-only · multi-environment (Dev→QA→Pre-Live→Live) as a
first-class frame · stable deep-link URLs + keyboard nav · **extend existing Studio patterns first**
(the App Settings/Overrides left sub-nav, the entity-tree CR diff, the agentic AI, typed tables).

Anchors used throughout: *Mayo Client App*, *Subcontractor Form › Subcontractor Details*, the
*External Party* record, *Rules*, *JSON*, *CR #461 / #630*.

Shared primitive (all 3 directions): **stable URLs**
`/studio/:env/:draft/apps/:app/workflows/:workflow/steps/:step` (and `/records/:record/attributes/:attr`,
`/change-requests/:id`). Every workflow, step, record, attribute, and CR is deep-linkable and back/forward works.

Shared primitive: **environment risk color** — Development = green, QA = blue, Pre-Live = amber,
Live = red. Used consistently on the env pill, rail accent, and a 3px top edge so risk is never ambiguous.

---

## Direction 1 — "Studio IDE" (the Cursor/VS Code model)

**One-line mental model:** *Studio is an IDE — a collapsible file-tree of your app on the left,
your working set as tabs in the middle, and the AI as a togglable copilot on the right.*

**App › Section › Item hierarchy:**
A thin **activity bar** (icons) + an expandable **Explorer tree**:
`Mayo Client App ▸ Workflows ▸ Subcontractor Form ▸ Subcontractor Details ▸ [fields]`,
plus sibling roots `Records`, `Configs`, `App Settings`, `Change Requests`. The tree is the
hierarchy made literal and is always present (collapsible to icons). Tabs are retained but
**scoped to the open app group** and de-conflated: Preview/Rules/JSON become a **segmented control
*inside* one workflow tab**, not three sibling tabs — killing the object-vs-view confusion.

**Where the AI lives / trigger:** a **right panel**, collapsed by default, opened by a copilot icon
or `Cmd+I`. It is bound to the current selection (the [Subcontractor Form] chip already exists);
selecting a step/field and hitting `Cmd+I` seeds "ask about this". The Plan toggle becomes a labeled
**Chat / Plan** segmented switch at the panel top (discoverable, no mystery).

**Branch/environment surfacing:** a persistent **env+draft pill** in the top bar
(`● Development · Testing Ch ▾`) colored by tier, plus a **3px top-edge bar** in the env color across
the whole window. Merge/review state shows as `Review Pending ▾` / `Merge & Deploy ▾` in the same bar.

**Flat wireframe:**
```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ TOP BAR (env-colored 3px top edge)                                                      │
│ studio │ Mayo Client App › Subcontractor Form › Subcontractor Details   [breadcrumb]    │
│                         ● Development · Testing Ch ▾ │ ▶Run │ Review Pending ▾ │ ⌘K │ CH │
├──┬───────────────────────┬──────────────────────────────────────────────┬──────────────┤
│A │ EXPLORER (tree)        │ MAIN CANVAS (tabbed, app-scoped group)        │ AI PANEL (▸) │
│C │ ▾ Mayo Client App      │ [Subcontractor Form ×][External Party ×][+]   │ Chat | Plan  │
│T │   ▾ Workflows          │ ┌── view switch: Preview | Rules | JSON ──┐   │ ──────────── │
│I │     ▸ Subcontractor F. │ │  RECORD DETAILS │ form preview…          │  │ ▸ Subcontr.  │
│V │     ▸ OIS Device…      │ │  TASKS / steps  │                        │  │   Form       │
│I │   ▸ Records            │ └────────────────────────────────────────┘   │ "ask about   │
│T │   ▸ Configs            │                                               │  this step…" │
│Y │   ▸ App Settings       │                                               │ [Checkpoint] │
│  │   ▸ Change Requests ②  │                                               │ [Revert]     │
├──┴───────────────────────┴──────────────────────────────────────────────┴──────────────┤
│ STATUS BAR: ● Development  · errors 1 · warnings 1 · ⌘K command palette                  │
└───────────────────────────────────────────────────────────────────────────────────────┘
Behavior: activity bar switches the tree root; tree is keyboard-navigable; tabs persist per app
group and show dirty dots; Preview/Rules/JSON never spawn new tabs; AI panel collapses to reclaim
width. Status bar mirrors the JSON error/warning counts with jump-to.
```
*Best for:* engineers and power-user admins who think in trees and tabs. *Weakness:* still tab-bearing,
so the least radical departure.

---

## Direction 2 — "Command Workspace" (the Linear model)

**One-line mental model:** *Studio is Linear — a structured sidebar is the spine, breadcrumbs replace
tabs, and `⌘K` gets you anywhere instantly.*

**App › Section › Item hierarchy:** a **persistent left sidebar** (not a tree of trees but grouped
nav like Linear): a top zone with `Search`, `Recent`, `Starred`; then the current app's sections as
flat groups — **Workflows · Records · Configs · App Settings · Change Requests**. Clicking an item
**replaces the single main panel** (no browser tabs); a **breadcrumb bar** maintains orientation and
back/forward is reliable. Lateral movement (Subcontractor Form → Initiate Engagement) is one sidebar
click — the core fix for today's "return to Open existing" dead end.

**Where the AI lives / trigger:** **no permanent rail.** AI is summoned via `⌘K → "Ask AI"` or a small
floating action button, opening as a **right side-sheet** bound to the current screen's context. Plan
becomes a palette command (`⌘K → Plan a change`). This reclaims the entire left rail for navigation —
directly resolving the "AI squats on the prime nav region" finding.

**Branch/environment surfacing:** a **branch bar** pinned directly under the top bar, spanning full
width, showing the pipeline and your position: `Development › Testing Ch  ───  QA · Pre-Live · Live`
with the current tier color-filled and counts (`Development 46`). The env+draft selector lives at the
sidebar's top header too, so it's visible whether or not the branch bar is scrolled.

**Flat wireframe:**
```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ TOP BAR  studio        Mayo Client App › Records › External Party   ⌘K   + Create CR  CH │
├───────────────────────────────────────────────────────────────────────────────────────┤
│ BRANCH BAR  ● Development · Testing Ch ▾   [ Dev ●46 ─→ QA ─→ Pre-Live ─→ Live ]  Review▾│
├───────────────────────────┬───────────────────────────────────────────────────────────┤
│ SIDEBAR (persistent)       │ MAIN CANVAS (single panel, breadcrumb-anchored)            │
│ 🔍 Search…  ⌘K             │ ← External Party  (supplier_tCEpXz)        [Preview|JSON]   │
│ ★ Starred                  │ Attributes (67)              Columns   + Add attribute     │
│ 🕘 Recent                  │ ┌─────────────────────────────────────────────────────┐   │
│ ── Mayo Client App ──      │ │ NAME            TYPE     REQUIRED  INDEXED            │   │
│  ▸ Workflows  (24)         │ │ City            string   ☐        ☐                   │   │
│  ▸ Records    (6)          │ │ HVAs            integer  ☐        ☐                   │   │
│  ▸ Configs                 │ │ …                                                    │   │
│  ▸ App Settings            │ └─────────────────────────────────────────────────────┘   │
│  ▸ Change Requests ②       │                                                            │
│                            │                          [ floating: ✦ Ask AI ]           │
├───────────────────────────┴───────────────────────────────────────────────────────────┤
│ (no tab strip — back/forward + breadcrumb maintain context)                             │
└───────────────────────────────────────────────────────────────────────────────────────┘
Behavior: sidebar groups expand inline; selection swaps the main panel; ⌘K palette navigates,
creates, switches env/draft, and invokes AI; AI opens as a right side-sheet over the canvas.
Keyboard-first; every panel is a URL.
```
*Best for:* implementation consultants moving fast across many objects. *Weakness:* losing tabs means
no side-by-side of two workflows without split view (offer an optional split).

---

## Direction 3 — "Deploy Cockpit" (branch-first model)

**One-line mental model:** *Studio is a deployment cockpit — you always stand inside a branch, the
Dev→QA→Pre-Live→Live pipeline is the frame, and the nav doubles as your "what's changed" tracker.*

**App › Section › Item hierarchy:** the left rail is split into **two stacked zones**. Top:
**"Changes in this draft"** — a live git-status-style list of modified workflows/records/settings
(mirroring the CR entity tree: `WORKFLOWS 3 · RECORDS 2 · APP SETTINGS 2`). Bottom: the full
**App hierarchy** (Workflows/Records/Configs/Settings). Modified items carry a `●` change badge in
both zones, so hierarchy and change-state are one surface. Items open in the main canvas (single panel
+ breadcrumb, like Direction 2).

**Where the AI lives / trigger:** a **docked right panel** that is **diff- and context-aware** — it can
answer "what changed in this draft and why" and draft the CR. Triggered by icon or `⌘I`; Plan mode is a
labeled tab. Because the rail already tracks changes, the AI's CR-drafting (title/summary/impact) is one
click from "Changes in this draft".

**Branch/environment surfacing:** **maximal** — the pipeline stepper is the top-bar centerpiece and is
impossible to miss: `Dev ●46 ━━► QA ━━► Pre-Live ━━► Live`, current tier filled in its risk color, with
promotion CRs shown as connectors. Entering **Live** triggers a red theme + confirm gate. The current
draft, its lock owner, and "Review Pending / Merge & Deploy" all live here.

**Flat wireframe:**
```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ TOP BAR  studio │  ● Dev 46 ━━►  QA  ━━►  Pre-Live  ━━►  Live    │ draft: Testing Ch ▾ 🔒CH│
│                 │  Mayo Client App › Subcontractor Form          │ Merge & Deploy ▾  ⌘K  │
├───────────────────────────┬──────────────────────────────────────────┬──────────────────┤
│ RAIL ZONE 1: CHANGES       │ MAIN CANVAS (single panel)                │ AI / CR PANEL    │
│  Δ this draft (5)          │ Subcontractor Form   [Preview|Rules|JSON] │ Chat | Plan      │
│  ▾ WORKFLOWS 3             │ ┌──────────────────────────────────────┐  │ ──────────────── │
│   ● Subcontractor Form     │ │ steps:  Subcontractor Details ●       │  │ "What changed in │
│   ● Update Engagement      │ │         Untitled Step                 │  │  this draft?"    │
│  ▾ RECORDS 2               │ │ form preview…                         │  │ → 3 workflows…   │
│   ● External Party         │ └──────────────────────────────────────┘  │ [Draft CR ✦]     │
│ ─────────────────────────  │                                            │ [Checkpoint]     │
│ RAIL ZONE 2: HIERARCHY      │                                           │ [Revert]         │
│  ▸ Workflows ▸ Records      │                                           │                  │
│  ▸ Configs ▸ App Settings   │                                           │                  │
├───────────────────────────┴──────────────────────────────────────────┴──────────────────┤
│ FOOTER: ● Development (green)  · changes 5 · ready to review · errors 1                   │
└───────────────────────────────────────────────────────────────────────────────────────┘
Behavior: Zone 1 updates live as you edit; clicking a changed item jumps to it; "Draft CR" hands the
diff to the AI composer; the pipeline stepper is clickable to switch tiers (with a Live confirm gate);
risk color themes the chrome.
```
*Best for:* engineers reviewing/merging CRs and anyone managing the promotion pipeline. *Weakness:*
foregrounds versioning so heavily it can feel heavyweight for someone just building one form — mitigate
by collapsing Zone 1 when a draft has no changes.

---

## How to choose
- **Fastest to ship / least retraining:** Direction 1 (keeps tabs, adds the tree + de-conflates views).
- **Biggest leap in orientation & speed:** Direction 2 (kills tabs, sidebar + `⌘K`).
- **Best for the multi-environment/review mandate:** Direction 3 (branch-first).
A pragmatic synthesis: **Direction 2's sidebar + `⌘K` spine** as the base, **Direction 3's "Changes in
this draft" zone + pipeline stepper** layered in, and **Direction 1's in-tab Preview/Rules/JSON segmented
control**. This is the recommendation to carry into prototyping.
