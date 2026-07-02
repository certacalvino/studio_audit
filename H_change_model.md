# H. Change-First Governance Model — extensions to the Nav Model & AI Placement decision

> **Companion to** the Notion doc *"Studio: Nav Model & AI Placement"* (Design Tracker · Product).
> Once the strategic frame (Model 1 — scoped copilot, high prominence) was accepted, we extended
> the pattern in five specific ways. This document captures those extensions, the open decisions,
> and the artifacts that materialize them.

---

## Recap — what the Notion doc already resolved

- **Two-axis frame:** Scope (global operator ↔ scoped copilot) × Prominence (dock ↔ first-class ↔ dominant).
- **Verdict — Model 1:** Nav left constant · AI scoped in-app · Canvas right. A copilot on Axis 1, high prominence on Axis 2 — more prominent than Cursor / Linear grant it, but not a global operator.
- **Validated patterns** (cut across any layout): canvas = source of truth · JSON as a view (Preview ⇄ JSON toggle + co-visible diff) · nav collapsible to an icon rail · app-driven adaptive sizing · per-action traceability · draft/CR = git, named as such.
- **Current-state problems the doc calls out and this document builds on:** browser-style tab proliferation · flat lists with no search · cryptic names (`rule_RvqUs8ENlWgnM02lDuVn_`, drafts by timestamp) · 49 ungovernable drafts · wall of red validation.

The strategic direction is settled. This document is the **"what we built on top of it."**

---

## 1. Change-first governance model

### Problem it addresses

The Notion doc names *"49 ungovernable drafts"* and *"cryptic names"* as symptoms. Named drafts alone is not enough — the missing piece is a **container entity** that groups work as it moves through environments, gives it a lifecycle, and gives the user a single mental unit to track.

### Model

- A **Change** is a first-class ticket owned by one person, with a lifecycle:

  ```
  Open → In progress → In review → Approved → Merged → Live
  ```

- A Change contains N **Change Requests (CRs)**, one per environment it touches (Dev → QA → Pre-Live → Live). The existing CR entity stays intact; it becomes a sub-step of a Change.
- The **draft entity stays alive** — a Change adopts a draft per env, and the draft's ID (e.g., `DEV-5430`) is auto-generated from the Change name instead of a timestamp. This kills the `studio-2335` / `test m1` / `check revert` proliferation at the source (creation flow) without breaking existing drafts.

### Impact on the topbar (visible today)

The three previous dropdowns collapse into two, contextual and legible:

| Before | After |
|---|---|
| `● Dev · Testing Ch ▾` (env pill) | `Change: Add PII condition · In review ▾` (Change pill) |
| `Review Pending ▾` | *(merged into Change pill sub-badge)* |
| `Merge & Deploy ▾` | `Promote → QA ▾` (contextual to lifecycle stage) |

### Cost

**Zero data-model changes.** Reframing + one new container entity on top of what already exists.

---

## 2. Topbar → Modal (system rule)

### The rule

Anything that opens from the topbar or its dropdowns opens as a **modal**, not as a full-page destination and not as a right-panel state-swap.

### Applies to

- Change detail (from Change pill or from Open Changes list rows) — implemented
- Future: Review Pending detail · Merge & Deploy confirmation · `...` overflow (App Settings, Env Overrides, Activity Logs)

### Why

- Topbar is chrome. Its outputs are transient overlays — you look/act, dismiss, resume where you were.
- One rule for users to learn (*"if it came from the topbar, X closes it"*), not per-item behaviors.
- Preserves context: the App Overview or the workflow being edited stays visible behind the backdrop.

### Modal spec

- 90% viewport width (max 1280px) · 85% viewport height
- Backdrop `rgba(0,0,0,0.4)`
- Close via `X` button (top-right) · `ESC` key · backdrop click
- Own scroll if content exceeds body height
- Optional right-side **AI drawer** inside the modal (contextual chips for the current Change) — spec'd, not yet built

---

## 3. Overview sub-tabs — Summary / Insights / Activity

Same pattern as workflow's `Preview / Rules / JSON` — alternative **views of one object** (the app), not separate tabs at the browser level. Consolidates the "app overview" from a single dashboard into three densities.

| Sub-tab | Purpose | Content |
|---|---|---|
| **Summary** | Day-to-day glance | Stats · Pipeline · Open changes (top 5) · Recent activity (top 5) |
| **Insights** | Situation room | People · Health · Environments · Proactive suggestions with inline actions |
| **Activity** | Timeline archive | Filterable feed (Changes / Deploys / Comments / AI runs) with search + Load more |

### Why this matters

The original Notion doc's honest trade-off was *"the dashboard loses AI assistance."* Sub-tabs resolve that indirectly: the App Overview becomes rich enough to be its own destination without needing AI assistance at the org level. The AI moves into a **companion** role (see §4), not a dashboard operator.

---

## 4. AI state-awareness — three states, one component

The Notion doc's Model 1 verdict specifies *"a prominent, app-scoped copilot… first-class, adaptive panel."* This section makes "adaptive" concrete.

**The chrome stays constant** (panel position, input, style). **The content adapts to context.**

| Context | State | Content |
|---|---|---|
| App Overview | **Discovery** | Memory line (*"You've been working on Subcontractor Form"*) · Recent AI activity · Exploratory chips (*"Summarize compliance risks"* · *"Explain the current Change diff"* · *"What did I ask about yesterday?"*) |
| Workflow open, no active task | **Ready** | Empty state + 3 workflow-specific chips (*"What does this workflow do?"* · *"Suggest improvements"* · *"Check for issues"*) |
| Workflow with active AI task | **Execution** | Task card with actions history (*"9 actions taken · Show all"*) · Diff pills (`+ Added Field · Company Name`) · Inline suggestion with Apply / Dismiss |

### Coherence rule

The AI's content must always match the object visible in the canvas. Cross-context leaks (e.g., Subcontractor Form's task showing while OIS Device Details is open in the canvas) are **bugs, not features**.

### Why this differentiates from Cursor / Copilot

- Cursor / Copilot AI is scoped to the *open file* and reactive.
- Studio AI is scoped to the *app* and **proactive on discovery** (Insights-adjacent surfacing), **contextual on execution** (workflow tasks), and **carrying memory across sessions** ("You asked me last week about connector renewals").

---

## 5. Sidebar consolidation — four object types

The current sidebar mixes object types (Workflows, Records, Connectors) with configs (Scheduled Actions, Badges, Workflow Prepopulation Configs, Step Copy Configurations, Object Selection Configs) as flat peers. This is the *"flat lists"* anti-pattern the Notion doc explicitly calls out.

### Proposed structure

```
Rail (4 items + logo)
├── S (logo)
├── ⊞  Workflows
├── ⊟  Records          ← Badges lives here (they decorate records)
├── ⌁  Connectors
└── ⚙  Configs          ← already a parent group in-product
       ├── Automation
       │     └── Scheduled Actions
       └── Behavior
             ├── Workflow Prepopulation
             ├── Step Copy
             └── Object Selection
```

### Evidence for the grouping

The three `*Configs` share the **exact same indexing schema** — `(WorkflowKind, X-in-workflow, Object)` — visible in the product's own tab breadcrumbs (`Configs › Workflow Prepopulation...`, `Configs › Step Copy Configura...`, `Configs › Object Selection Con...`). We are formalizing a hierarchy that already exists in the data model, just not in the sidebar.

**Badges** was mis-grouped with configs. Investigation of the actual Badges page (Target = Engagement record type, Field = optional) confirms it is **record-decoration metadata**, not behavior config. Correct home is inside Records (as a sub-tab of a record type).

**Scheduled Actions** is temporal automation (fires on a schedule), distinct from the three `*Configs` which are static behavior rules. Grouped under "Automation" within Configs to preserve the parent-child model already in-product while signaling different nature.

---

## Open decisions (as of writing)

| Decision | Constraint | Recommendation |
|---|---|---|
| **Naming** — what to call the new container? | Workflow "Tasks" **cannot** be renamed (hard product constraint). | **"Change"** — coherent with existing *Change Request* language (a Change has N Change Requests). Fallback: **"Issue"** (GitHub / Linear convention). |
| **Overview AI content** — companion or duplicate? | Insights sub-tab already surfaces proactive insights (Docusign / deprecated / stale drafts). | **Companion** — Recent AI activity + memory line + exploratory chips. Do **not** duplicate Insights data in the AI panel. |
| **Change detail modal** — AI drawer default? | Modal already has an `✦ Ask AI` link in the header. | **Closed by default.** Opens a 320px right drawer within the modal on demand. Prevents visual crowding for read-only glances. |

---

## Artifacts

Live in **Claude Design** (interactive prototype) and **Figma** (`Studio — Navigation Explorations`, file key `Mg3plZn2b0tadSOZAP3ndX`):

- **App Overview** with 3 sub-tabs (Summary / Insights / Activity) — full content specced and rendered
- **Change detail modal** with lifecycle stepper, CRs per env (with draft IDs — `CR #461 → DEV-5430`, `CR #483 → QA-1207`), Scope + Activity two-column
- **Change pill + Promote button** in the topbar (three dropdowns → one pill + one action)
- **Change pill dropdown** (5 options: `↗ Open change details` · `⇄ Switch change` · `👁 View activity` · `🔗 Copy link` · `✕ Close change`)
- **AI state-aware content** for Discovery / Ready / Execution states

Figma file: `https://www.figma.com/design/Mg3plZn2b0tadSOZAP3ndX/Studio-%E2%80%94-Navigation-Explorations`

---

## Next steps (post-sync)

1. **Naming decision from PM** → this document updates in place with the chosen name; find-and-replace `Change` if `Issue` wins.
2. **Propagate Change language to Dashboard (3.1)** attention strip — replace `3 CRs need your review` with `5 Changes assigned to you`, etc.
3. **Relabel existing Change Requests page as "Changes list"** — ~80% relabel, not a new build. Same tabs (Review requested / Created by me / All) work as-is; rows become Change-shaped.
4. **Empty state for Open Changes section** — when the app has no active Changes (empty apps, quiet weeks).
5. **Design Change detail "AI drawer"** — contextual chips (`Summarize the diff` / `Suggest reviewers` / `Check compliance risks`) inside the modal, on-demand.
6. **Sync back to Notion** — this doc's `## Update` section into *Studio: Nav Model & AI Placement* under the existing page (append, not replace).

---

*Owner: Chris Calviño · chris@chriscalvino.com*
*Draft version 1 — awaiting naming decision from PM sync.*
