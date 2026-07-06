# H. Task-First Governance Model — extensions to the Nav Model & AI Placement decision

> **Companion to** the Notion doc *"Studio: Nav Model & AI Placement"* (Design Tracker · Product).
>
> **v2 — post-PM-sync (July 2026).** After presenting v1 to the PM, three revisions came back that reshape the surface but not the intent:
> 1. **Naming:** "Change" is out. Container entity was renamed to **Proposal**.
> 2. **Detail access:** modal is out. Container detail opens as a **tab**, so the AI can live inside it as a first-class companion.
> 3. **Chrome model:** the persistent left sidebar (220px) AND the icon rail (56px) are eliminated. Everything opens as a tab; the entry point is a **Studio app** page reached via `+ new tab`.
>
> **v3 — after end-to-end build (July 2026).** All v2 revisions still stand. What's new after building and validating the full flow in Claude Design:
> 1. **Studio Dashboard** — the root landing above the app layer. Built.
> 2. **Container detail tab** — full spec built and validated. Sticky header with Promote button, lifecycle stepper, CRs per env, Scope + Activity two-column, AI panel in Review state.
> 3. **AI panel scope confirmed** absent at Dashboard level (Model 1 verdict: scoped copilot in-app, not global operator); present at every tab inside an app.
> 4. **App identity as tab label** — "Mayo Client App" IS the leftmost tab (uncloseable). No app name duplication in chrome. [S] badge navigates back to Studio Dashboard.
>
> **v4 — post-PM-walkthrough (July 2026).** PM shared a video of the shipped product. Three surface updates aligned our design to what already exists in-product; structural gaps (promotion-as-entity, env view page, hotfix, version history) are captured separately in `I_model_comparison.md` pending the PM's task-management doc.
> 1. **Naming:** `Proposal → Task`. The shipped product already uses "Task" as the container. Aligning eliminates re-education. CRs remain intact as per-env sub-entities with `.cr` suffix (`DEV-5430.cr`, `QA-1207.cr`).
> 2. **Lifecycle stages:** replaced workflow-oriented `Open → In progress → In review → Approved → Merged → Live` with the shipped env-oriented sequence `Draft → Review → Development → QA → Pre-Live → Live`. Stage names now double as env names, matching the mental model in the product.
> 3. **Bottom status bar:** persistent 28px bar (IDE-style) added showing env context + object breadcrumb + stage pill. Fills the "which env am I editing" gap the topbar didn't cover. See §2.6.

---

## Recap — Model 1 direction (unchanged)

- Two-axis frame (Scope × Prominence) → **scoped copilot, high prominence** (Model 1) is settled.
- Validated patterns (canvas = source of truth · JSON as a view · adaptive sizing · per-action traceability · drafts/CRs as git) still apply.
- Current-state problems the original doc names — tab proliferation, flat lists, cryptic names, 49 ungovernable drafts, wall of red validation — are still what we're addressing.

Model 1's *"scoped copilot"* verdict is the strategic ground. Everything below is how we materialize it in the surface after PM feedback.

---

## 1. Task — the container entity

### Problem it addresses

Named drafts alone don't solve *"49 ungovernable drafts"*. What's missing is a container entity that groups work as it moves through environments, gives it a lifecycle, and gives the user a single mental unit to track.

### Model

- A **Task** is a first-class ticket owned by one person, with a lifecycle:

  ```
  Draft → Review → Development → QA → Pre-Live → Live
  ```

  Stage names double as env names past the review gate — the mental model is *"work moves through envs"*, not *"work moves through workflow states"*.

- A Task contains N **Change Requests (CRs)**, one per environment it touches (Dev → QA → Pre-Live → Live). The existing CR entity stays intact; a CR is now a sub-step of a Task. CRs are named per-env: `DEV-5430.cr`, `QA-1207.cr`, `PRE-…`, `LIVE-…` (confirmed from product screenshots — the `.cr` suffix is the shipped convention).
- The **draft entity stays alive** — a Task adopts a draft per env, and the draft's ID (e.g., `DEV-5430`) is auto-generated from the Task name instead of a timestamp. This kills the `studio-2335` / `test m1` / `check revert` proliferation at the source (creation flow) without breaking existing drafts.

### Naming history — Change → Proposal → Task

- **v1: "Change"** — rejected because generic (every workflow edit is a change) and collided mentally with "Change Request".
- **v2/v3: "Proposal"** — chosen for governance vocabulary fit and no collision with Change Request. Held for two revisions.
- **v4: "Task"** — the shipped product already uses "Task" as the container. Aligning is the low-cost move: no re-education, no doc conflicts with the actual UI. Accepts one trade-off (workflow steps are also called "tasks" in the product — same word, two meanings in-product) since the collision exists whether we name it or not. When both surfaces appear on one page, copy disambiguates: *"Governance Task"* vs *"Workflow Task"*.

### Zero data-model changes

Task, CRs, drafts, and per-env promotion all already exist in the shipped product. Our surface work is design layer on top of an existing model.

---

## 2. Tab-first navigation — the new chrome model

### What we eliminated

- **The 220px workflow sidebar.** Was showing a long flat list of workflows, mixing types with configs.
- **The 56px icon rail** (S logo + 4 object-type icons). Merged into the topbar as a compact identity mark.
- **The "Change pill" in the topbar.** Was a parallel context indicator competing with the tab strip, and split behavior between "click text" and "click ▾" — a UX anti-pattern.
- **The "Promote → QA" button in the global topbar.** Moved into the Task tab where it belongs.

### What we kept

- **The topbar** (48px), now minimal.
  - Left: `[S] Mayo Client App ▾`
  - Right: notifications only. Everything else migrated to tabs.
- **The tab strip** — first-class navigation surface. Every object opens as a tab.
- **The AI panel** — still a first-class second element inside object tabs, adaptive by state (see §5).

### What we added — the Studio app

The `+ new tab` icon in the tab strip opens the **Studio app**: a full-canvas page whose job is to be the entry point to everything — search, browse, create, import.

**Studio app structure (top to bottom):**

1. **Find or create — plain search bar.** Not AI-branded. `🔍 Search workflows, records, connectors…` + `⌘K`. Below it, 3 literal shortcuts: `+ New workflow` / `+ New record` / `+ Import`. This is navigation, not conversation — see "AI panel stays put" below for why it's deliberately *not* styled like the AI input.
2. **Recent** — 4 rows of last-touched objects (workflows, records, tasks).
3. **Object categories** — 2×2 grid of Workflows / Records / Connectors / Configs cards, each with top items + count + a `[+ Create]` / `[↥ Import]` icon pair in the card header + expand link.
4. **Open Tasks** — a single compact link row (`✦ Open Tasks · 5 · View all in Overview →`), not a full list. The full list lives in Overview; the Studio app only signals it exists.

**Behavior:**
- Click any row/card → opens as a new tab. The `+ New tab` tab is replaced by the opened object; a fresh `+` icon appears at the far right of the tab strip.
- `⌘K` focuses the search input.
- Click on `[S]` badge → back to Dashboard (all-apps view). Doesn't affect open tabs.
- Click on `Mayo Client App ▾` → app switcher dropdown.

### AI panel stays put — no duplicate AI surface

First pass of the Studio app put an AI-branded hero in the canvas (`✦ Studio AI` + `Ask, find, or create…` + suggestion chips) *in addition to* the existing left AI panel. That's two AI-looking inputs on one page — confusing, and it duplicates a surface that's already shared chrome across every page (Overview, Workflow tabs, Task tabs).

**Fix:** the AI panel is the *only* AI entry point on the Studio app, same as everywhere else. Its state is **Discovery** (memory line + Recent AI activity + exploratory chips), identical to how it behaves on Overview — there's no separate "Command" state. The canvas gets a plain, non-AI search bar instead (see structure item 1 above). Two distinct interaction modes, two distinct visual languages: **search bar = go somewhere directly; AI panel = think something through.**

### Overview and Studio app don't share content — by design

Early drafts explored a shared "Navigator" block (search + 4 category cards) rendered inside *both* Overview and the Studio app, reasoning that they overlap in audience. Decided against it — **PM confirmed Overview stays exactly as it is** (stats, pipeline, full Open Tasks list, Recent Activity feed). No merge needed. The two pages serve different questions and don't need shared UI to feel connected:

| | Overview | Studio app |
|---|---|---|
| Answers | *"How's my app doing?"* | *"What do I want to open?"* |
| Stats + Pipeline | ✓ | — |
| Open Tasks | Full list | Link only (`View all in Overview →`) |
| Recent Activity feed | ✓ | — |
| Search / Create / Import | — | ✓ (category cards) |
| Recent objects (last-touched) | — | ✓ |

They're linked by cross-reference (the Studio app's Open Tasks link points at Overview), not by shared components.

### Why this is better than the sidebar

- **~276px more canvas** (sidebar 220 + rail 56 = 276 recovered).
- **Single mental model.** Everything is a tab. No modals for "detail views", no swap states.
- **One AI, one place.** No duplicate AI-branded surfaces competing for attention.
- **Familiar semantics** for a technical builder (Cursor / VSCode / Chrome tab-strip pattern).

---

## 2.5. Studio Dashboard — the root above apps

### What it is

The landing page users see when they log in, before entering any specific app. Also where they return by clicking the `[S]` badge from inside any app. Sits above the tab-first architecture — a switcher and triage view, not a workspace.

### Chrome (distinct from in-app chrome)

- Left: `[S] Studio` — wordmark, no dropdown; this is home
- Center: global search `🔍 Search apps, workflows, tasks… ⌘K`
- Right: `🔔` with unread badge + avatar
- **No tab strip** (you're pre-app)
- **No AI panel** (see rationale below)

### Content

1. **Stats row** — 4 cards, 3 attention (Open Tasks across apps · Assigned to you for review · Blocked) + 1 context (Apps count · sandbox/test hidden).
2. **Needs your attention** — cross-app actionable list with app names inline (`Docusign · Mayo, TPRM`), inline action links (Review / Renew / Show me / etc.).
3. **Starred apps** — 3-column tile grid. Each tile: name + star + 4 env dots + workflow/record counts + open tasks + last edited.
4. **Recently active** — same tile format, ordered chronologically.
5. **All apps** — table (Name / Environments / Open Tasks / Drafts / Last Edited). Sort dropdown + `Hide sandbox/test` toggle ON by default (from audit's original spec — dedupes the 453-row noise).

### Why no AI panel at Dashboard level

Per Model 1 verdict in the Notion doc (*"scoped copilot, not global operator"*): the AI belongs inside apps where the work happens. Dashboard is triage — find the right app, then work. Cross-app AI queries can be added later (Command palette expansion), but they're not the primary use case and don't justify a persistent panel at the pre-app level.

### Trade-off honored from the original doc

The audit acknowledged that Model 1's honest trade-off is *"the dashboard loses AI assistance"*. Dashboard is deliberately AI-less to preserve the scoped-copilot verdict. Enrichment (proactive suggestions across apps, notification dispatcher) lives elsewhere — inside apps or via the 🔔 notification center.

---

## 2.6. Bottom status bar — IDE-style persistent context (v4)

### What it is

A 28px bar sticky to the viewport bottom, always visible on any in-app page. Serves the "which env am I in / what am I looking at / what state is it" question that the topbar (intentionally minimal) does not answer.

### Structure

- **Left:** colored dot + env name.
  - `● Development` (green)
  - `● QA` (brand-blue)
  - `● Pre-Live` (orange)
  - `● Live` (red)
- **Middle** *(only when inside an object tab)*: `‹ {object type + name}`.
  - Example: `‹ Task #461 · Add PII condition`
  - Omitted on Overview and the Studio app page (no object context to breadcrumb).
- **Right** *(when applicable)*: stage pill.
  - Example: `Awaiting approval`, `Deployed`, `Draft`.
  - Neutral 100 bg, 12px text, 2px radius.

### Behavior

- Always visible; not hidable, not scrollable off.
- Env dot stays saturated even when the rest of the UI is in a grayed-out/disabled state (context should never be ambiguous).
- Chrome, not surface — no interactions live here in v4. It reads state, doesn't offer actions. (Actions still travel with objects — Promote button lives in the Task tab, not in the bar.)

### Why bottom, not topbar-extension

- **Roles are distinct:** topbar carries objects and app identity (tabs, app switcher, notifications); bottom bar carries operational context (env, stage). Separating them keeps each read-scan predictable.
- **IDE precedent:** VSCode / Cursor use bottom bars for the exact same job (branch, sync state, current file mode). Familiar for the technical-builder audience.
- **Confirmed pattern in shipped product** (PM walkthrough).

### What it displaces

Nothing. Adds ~28px of vertical chrome (net effect: canvas is 276 - 28 = ~248px larger than the pre-audit sidebar+rail baseline, still a big win).

---

## 3. Task detail — a tab, not a modal

A Task opens as a tab. Its content:

- **Sticky header inside the tab:**

  ```
  Task #461 · Add PII condition · Review     [Promote → QA ▾]
  ```

  The Promote button lives here — pegged to the object it acts on. Actions travel with their objects.

- **Body:** Lifecycle stepper (`Draft → Review → Development → QA → Pre-Live → Live`, 6 nodes) · Change Requests by environment (with per-env draft IDs like `DEV-5430.cr`, `QA-1207.cr`) · Scope + Activity two-column.

- **AI panel** — first-class right column inside the Task tab. State = **Review** (see §5).

### Entry points to a Task (multiple, all consistent)

- **Overview → Open Tasks** section → click a row
- **Studio app → Open Tasks** section → click a row
- **⌘K** → search by number or name → Enter
- **Recent Activity** → click any `Task #461` reference
- **Notifications** → click the Task link

All open the same tab. No dropdowns, no dual-behavior pills, no context switches.

### Management actions

- **Close a Task tab** → the `×` on the tab (browser-native).
- **Copy link / share** → `⋯` icon in the tab's own top-right, next to the Promote button.
- **Switch between Tasks** → click a different tab, or `⌘⇧←/→`.

Each action has one place and one behavior.

---

## 4. Overview sub-tabs — Summary / Insights / Activity

Same pattern as workflow's `Preview / Rules / JSON` — alternative views of one object (the app), not separate tabs at the browser level.

| Sub-tab | Purpose | Content |
|---|---|---|
| **Summary** | Day-to-day glance | Stats · Pipeline · Open Tasks (top 5) · Recent activity (top 5) |
| **Insights** | Situation room | People · Health · Environments · Proactive suggestions with inline actions |
| **Activity** | Timeline archive | Filterable feed (Tasks / Deploys / Comments / AI runs) with search + Load more |

---

## 5. AI state-awareness — one component, four states

The chrome stays constant (panel position, input, style). The content adapts to context.

| Context | State | Content |
|---|---|---|
| App Overview | **Discovery** | Memory line (*"You've been working on X"*) · Recent AI activity · Exploratory chips |
| Studio app open | **Discovery** | Same as Overview — the Studio app reuses the Discovery state rather than inventing a separate one. The canvas has its own plain search bar for direct navigation; the AI panel is for thinking things through. |
| Workflow tab open, no active task | **Ready** | Empty state + 3 workflow-specific chips |
| Workflow tab with active AI task | **Execution** | Task card with actions history · Diff pills · Inline suggestion with Apply / Dismiss |
| Task tab open | **Review** | Chips: *"Summarize the diff"* · *"Suggest reviewers"* · *"Check compliance risks"* · Input: *"Ask about this Task…"* |

### Coherence rule

The AI's content must always match the object in the currently active tab. Cross-context leaks (e.g., Subcontractor Form's task showing while OIS Device Details is active) are bugs, not features.

### Why this differentiates from Cursor / Copilot

- Cursor / Copilot AI is scoped to the open file and reactive.
- Studio AI is scoped to the app and **proactive on Discovery** (Studio app + Overview Insights), **contextual on Execution** (workflow tabs), **review-oriented on Review** (Task tabs), and **carrying memory across sessions**.

---

## Open decisions

| Decision | Status | Notes |
|---|---|---|
| **Naming** — container entity | ✓ Resolved (v4) | **Task** — aligned to shipped product (was Proposal in v2/v3) |
| **Lifecycle stages** | ✓ Resolved (v4) | `Draft → Review → Development → QA → Pre-Live → Live` — aligned to shipped product |
| **Bottom status bar** | ✓ Resolved (v4) | 28px persistent bar: env dot + object breadcrumb + stage pill (see §2.6) |
| **Detail access pattern** | ✓ Resolved (v2) | Tab (with AI as first-class right column) |
| **Chrome minimalism** | ✓ Resolved (v2) | Sidebar + rail removed; Studio app is the entry point |
| **Task tab AI state name** | ✓ Resolved (v3) | **Review** — chips: Summarize diff · Suggest reviewers · Check compliance risks |
| **App identity in chrome** | ✓ Resolved (v3) | App name IS the leftmost tab; no duplication in topbar |
| **Dashboard existence and scope** | ✓ Resolved (v3) | Studio Dashboard as root above apps; no AI panel |
| **Promotion-as-entity** (env-to-env promotion with own lifecycle + Included tasks) | 🔴 Blocked | Awaiting PM's task-management doc. Structural gap — see `I_model_comparison.md` §3 |
| **Env view page** (read-only env-scoped tab with deploy history + hotfix button) | 🔴 Blocked | Awaiting PM doc. See `I_model_comparison.md` §4–§5 |
| **Hotfix flow** (direct-to-higher-env task variant) | 🔴 Blocked | Awaiting PM doc. See `I_model_comparison.md` §6 |
| **Version history + rollback** (per-env deployed-versions list + Switch to version) | 🔴 Blocked | Awaiting PM doc. See `I_model_comparison.md` §4 |
| **Project layer** (workspace-of-agent above Task, per PM verbal mention) | 🔴 Blocked | Interpretation unclear (agrupador vs agent workspace); needs PM confirmation |
| **App switcher dropdown** — visual design | Deferred | Click `[S]` → Dashboard; from there enter any app. Explicit switcher dropdown deprioritized. |
| **Tab strip overflow behavior** | Open (post-MVP) | Horizontal scroll + `⋯` overflow menu — needed when 8+ tabs open |
| **Global notification "View all" page** | Open (post-MVP) | Panel exists; dedicated page for archive/search TBD |

---

## Artifacts

Live in **Claude Design** and **Figma** (`Studio — Navigation Explorations`, file key `Mg3plZn2b0tadSOZAP3ndX`):

- **Studio Dashboard** (root, above apps) — global search chrome · 4-stat row · Needs your attention cross-app · Starred apps grid · Recently active grid · All apps table with sort + Hide sandbox toggle
- **App Overview** with 3 sub-tabs (Summary / Insights / Activity) — Summary has enriched Pipeline (per-env sub-metadata + active deploy indicator), Needs your attention, Team row, Open Tasks with Live badge + reviewer designation, Recent Activity with deploy events
- **Task detail tab** — sticky header with Promote → QA button, lifecycle stepper (6 nodes: `Draft → Review → Development → QA → Pre-Live → Live`), Change Requests per env with `.cr` suffix (`CR #461 → DEV-5430.cr`, `CR #483 → QA-1207.cr`), Scope + Activity two-column
- **Bottom status bar** (v4) — 28px, env dot + object breadcrumb + stage pill; sticky bottom on every in-app page
- **Studio app "+ New Tab"** — plain search bar (not AI-branded) · Recent · Object categories with Create/Import icons · Open Tasks compact link · gray bg + card treatment matching Overview
- **AI state-aware content** for Discovery (Overview / Dashboard-less / Studio app) · Ready (Workflow tab without task) · Execution (Workflow with active task) · Review (Task tab)
- **Notification panel** — bell dropdown with unread events, actionable inline (Review · View · Take over), "Mark all read", "View all →" footer
- **Avatar menu** — profile / preferences / team / help / shortcuts / sign out
- **Minimal chrome** across all in-app tabs — `[S]` (returns to Dashboard) · tab strip · 🔔 · avatar

Figma file: https://www.figma.com/design/Mg3plZn2b0tadSOZAP3ndX/Studio-%E2%80%94-Navigation-Explorations

---

## Next steps (post-v4)

**Done (v4):**
- ✓ Naming aligned to shipped product (`Proposal → Task`)
- ✓ Lifecycle stages aligned (`Draft → Review → Development → QA → Pre-Live → Live`)
- ✓ Bottom status bar built (env dot + breadcrumb + stage pill, 28px)
- ✓ CRs preserved with `.cr` suffix per shipped convention

**Done (v3):**
- ✓ Studio Dashboard built (root above apps)
- ✓ Studio app page built (with search + Recent + object categories + Open Tasks link)
- ✓ Task detail tab spec drafted and rendered
- ✓ App identity solved (Mayo Client App as leftmost tab, not chrome duplicate)
- ✓ Notification panel + avatar menu built

**Blocked (awaiting PM's task-management doc):**
- Promotion-as-entity (env-to-env promotion as its own task-like tab)
- Env view page (read-only, per-env, with deploy history + hotfix button)
- Hotfix flow (target-env selector on new-Task creation, "Hotfix" badge)
- Version history + rollback ("Deployed versions" modal, "Switch to version" action)
- Project layer (workspace-of-agent — pending PM clarification on interpretation)

**Pending (post-model-alignment):**
1. **Sync v4 back to Notion** (`Studio: Nav Model & AI Placement`) — currently blocked on Notion MCP; will complete when reconnected.
2. **Relabel existing Change Requests page as "Tasks list"** — mostly relabel, not a rebuild.
3. **Empty state for Open Tasks** (Overview + Studio app + Dashboard).
4. **Tab strip overflow behavior** (many tabs open — horizontal scroll + `⋯` menu). Post-MVP.
5. **Global search "View all"** dedicated page — post-MVP, cross-app search results view.
6. **Notification "View all" page** — post-MVP.

---

*Owner: Chris Calviño · chris@chriscalvino.com*
*v4 — post-PM-walkthrough July 2026. Aligned to shipped product surface. Structural gaps captured in `I_model_comparison.md`.*
