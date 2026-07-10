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
>
> **v5 — post-implementation audit (July 2026).** Building the v4 spec in Claude Design surfaced navigation-depth problems the spec hadn't accounted for, plus two pieces of direct PM feedback. Revisions:
> 1. **Env context moved off the bottom bar.** Bottom bar is removed entirely; env now shows as a risk-scaled chip in the topbar right (subtle for Dev/QA, escalating fill for Pre-Live/Live) plus a 2px ambient top-border for Pre-Live/Live only. Save/sync state becomes a floating corner chip. See §2.6 (revised).
> 2. **Rules are first-class objects, not drill-down items.** They open as tabs, but nested *inside* their parent workflow tab (not top-level) via a level-2 "All rules" pinned tab + dynamic rule-tabs row — never as loose top-level tabs. See §2.7 (new).
> 3. **Dashboard scales by app count, and isn't always the landing page.** ~90% of orgs have 1-2 apps; the original Dashboard design assumed large-org scale. Three tiers now govern Dashboard content, and orgs with exactly 1 app skip the Dashboard as landing entirely (straight into that app's Overview). See §2.5 and §2.5.1 (revised).
> 4. **New App creation is a dropdown, not a modal**, with an extensible type list (Blank / Template-based / Training, per PM — more types expected). Trigger lives in the Dashboard topbar, persistent across all tiers.
> 5. **Task detail restructured to single-tab with sub-tabs.** `Workspace / Overview / Changes` as Level-2 sub-tabs inside one Task tab — absorbs the shipped product's two-tab content (workspace canvas + task overview) without breaking the "one object = one tab" rule. See §3 (revised).
> 6. **Object categories resolved for Records, Badges, and other root-level types.** Records get a "Records" tab with `All Records` + `Records Map` as twin pinned Level-2 tabs (two views of the same domain) + individual records nested alongside them — reverted twice in testing: first from a per-record Level-1-tab attempt, then from Records Map as its own sibling Level-1 tab, both of which reproduced tab proliferation. Badges/Scheduled Actions/Workflow Prepopulation/Step Copy/Object Selection consolidate under one "Configs" tab, reusing the same nesting primitive from §2.7. See §2.8 (new).
> 7. **No icons on Level-2 sub-tabs, anywhere.** Plain text only — matches the already-plain Level-3 pinned tabs, removing an inconsistency between the two levels.
> 8. **"+ New tab" must be replaced, not added to** (already in v2/v3 spec, re-enforced after repeatedly getting missed in implementation) — selecting anything from a "New tab" placeholder replaces it in place; if the target is already open elsewhere, focus that tab instead of duplicating.

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
3. **Object categories** — 2×2 grid of Workflows / Records / Connectors / Configs cards, each with top items + count + a `[+ Create]` / `[↥ Import]` icon pair in the card header + expand link. Each card's expand link opens that category's full list as a Level-1 tab — see §2.8 for how each category resolves once opened.
4. **Open Tasks** — a single compact link row (`✦ Open Tasks · 5 · View all in Overview →`), not a full list. The full list lives in Overview; the Studio app only signals it exists.

**Behavior:**
- Click any row/card → opens **in that same "+ New tab" placeholder**, replacing it in place — never as an additional tab alongside it. A fresh `+` appears at the far right of the strip once the placeholder is consumed. If the target is already open in another tab, the "New tab" placeholder closes and focus moves to the existing tab (dedup — never two tabs for the same object). This rule was in the original v2/v3 spec but kept getting missed in implementation across multiple builds (workflow, record, Records list all reproduced it) — treat it as load-bearing, not optional polish.
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

The triage/switcher view sitting above the tab-first architecture — reachable via the `[S]` badge from inside any app. **Not always the mandatory landing page** (see §2.5.1 below) — whether login goes here or straight into an app depends on how many apps the org has.

### Adaptive scale — three tiers by app count (v5)

Real usage data: ~90% of orgs have only 1-2 apps; the Dashboard's original design (Starred/Recently/All-apps table with sort, pagination, hide-sandbox) was built for the large-org case, which is the minority. Content scales down for the common case instead of always showing large-org chrome:

| Tier | App count | What renders |
|---|---|---|
| **1** | Exactly 1 app | App tile(s) render directly below the stats row — no "Starred"/"Recently active"/"All apps" section labels, no sort, no hide-sandbox toggle, no table. |
| **2** | 3-8 apps | "Starred" + "Recently active" grids only — no "All apps" table (grids already surface everything at this scale). |
| **3** | 9+ apps | Full original design unchanged: Starred grid + Recently active grid + "All apps" table with sort/hide-sandbox/pagination. |

`+ New app` lives in the Dashboard topbar (right side, before the 🔔 bell) — persistent across all three tiers, since it previously only existed inside the "All apps" table header, which doesn't render in Tiers 1-2. Opens as a dropdown (not a modal) listing creation types (Blank app / Template-based app / Training app) as a data-driven vertical list, extensible for future types.

### 2.5.1. Login destination — skip Dashboard for single-app orgs (v5)

**The Dashboard is not always the landing page.** The cut is at exactly 1 app, not "1-2":

- **Exactly 1 app** → login goes directly into that app's Overview. The Dashboard would be pure redundancy here: there is no cross-app anything to triage, and the App Overview already has its own "Needs your attention" section (§4) covering everything the Dashboard would show, scoped to the one app that exists. The `[S]` badge still reaches the Dashboard (e.g., to create a 2nd app), it's just not where login lands.
- **2+ apps** → login goes to the Dashboard (Tier 1, 2, or 3 per the table above). Even at exactly 2 apps, real cross-app awareness exists — e.g., a connector expiring in App B is invisible while sitting in App A's Overview. Skipping the Dashboard here would genuinely lose information, unlike the 1-app case.

**Transition moment (1 → 2 apps):** when an org creates its second app, login behavior changes for the first time. Needs a light one-time nudge (e.g., a toast or inline callout on next login: *"You now have 2 apps — here's how to switch between them"*) so the change doesn't read as a bug. Post-MVP detail, not blocking the core decision.

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

## 2.6. Env context & status — topbar chip + floating save indicator (v5, supersedes the v4 bottom bar)

### What changed and why

v4 put env, object breadcrumb, and stage on a persistent 28px bottom bar. Built and tested, then reconsidered: the PM flagged that env/stage context deserved more prominence than a look-down bar delivers, and there was already unused space in the topbar right (near the bell) — better real estate for something safety-critical like "which env am I about to edit." The bottom bar is **removed entirely**; its jobs move to three places.

### 1. Env chip — topbar right, risk-scaled

- Position: topbar right, 24px gap from the tab strip / "+" button, 12px gap before the 🔔 bell. Always visible on any in-app page (not on Studio Dashboard — pre-app, no env context yet).
- Visible chip container in **every** state (a fully transparent Dev/QA chip read as stray nav in testing — it needs a visible boundary even at rest):
  - **Dev / QA** (safe): neutral-100 bg, 1px neutral-200 border, neutral-800 text weight 500, 8px saturated dot (green for Dev, brand-blue for QA), 12px font, 2px 8px padding, 10px radius.
  - **Pre-Live** (caution): orange-50 bg, orange-200 border, orange-900 text, orange-500 dot — same sizing as above.
  - **Live** (alarm): red-500 solid bg, white text weight 600 (sentence case, not all-caps), white dot — same sizing.
- Structure (dot + label) stays identical across all four envs; only the fill escalates with risk. This is deliberate — same element, recognizable at a glance, more assertive as risk increases.

### 2. Ambient top border — Pre-Live / Live only

- 2px horizontal strip, full viewport width, above the topbar.
- Invisible on Dev/QA. `orange-500` on Pre-Live. `red-500` on Live.
- Non-interactive, purely ambient — reinforces the env chip without requiring the user to read text.

### 3. Object breadcrumb & stage — did not need the bottom bar after all

- **Stage** already lives in the object's own sticky header (Task detail's `TASK #461 · Review` — see §3) — the bottom bar was duplicating it.
- **Object identity** already lives in the tab title — also duplicated.
- Removing the bar loses nothing; it was carrying information that had a home already.

### 4. Save/sync state — floating corner chip (replaces the bar's only non-duplicated job)

- ~140px chip, floats bottom-right, 16px from both edges, shadow elevation-1, 24px height, 12px radius.
- States: `◐ Saved` (fades to transparent 3s after save), `◐ Unsaved changes` (persistent while dirty), `⚠ Sync failed` (persistent, click to retry).
- Absent on Studio Dashboard.

### Net effect

Bottom bar's 28px returns to canvas. Env awareness gets *more* prominent (topbar + ambient border) despite less total chrome than v4's bar.

---

## 2.7. Rules — nested tabs, not top-level or drill-down (v5, new)

### Problem it addresses

The shipped product opens every rule as its own top-level tab — reproducing exactly the tab-proliferation problem this whole redesign exists to solve (`A_current_state_map.md`'s "tab proliferation" issue). A pure drill-down (replace the Rules list in-place, no tabs at all) was tried first and rejected: users regularly need multiple rules open side-by-side to compare WHEN/DO logic, and a single-slot drill-down can't do that.

### Model — two-level tab nesting

- **Level 1** — the object tab (e.g., a Workflow tab like "Subcontractor Form") stays exactly as-is: one tab per object, opened from the Studio app or search.
- **Level 2** — inside the object tab, a horizontal row: `Preview · Rules ●N · JSON` (plain text label, no icon — see "No icons on Level-2 sub-tabs" below; `●N` badge showing count of currently-open rule tabs). This is the same Preview/Rules/JSON pattern from §4, unchanged in position — just now carries a live count badge.
- **Level 3** (new) — when Rules is active, a second horizontal row appears beneath it: `All rules` (pinned, non-closeable, plain text, always the first item) followed by individual rule tabs (opened on demand, each with a `×` to close).

Rules never appear as Level-1 (top-level) tabs. They live nested inside their parent workflow's Level-2/3 structure — closing the workflow tab closes all its rule tabs with it (confirmation modal if any are unsaved).

### Why not an icon rail

An earlier iteration replaced the horizontal Preview/Rules/JSON row with a vertical icon-only rail on the left (to visually separate "stable views" from "dynamic items"). Rejected after building and reviewing it:
- No precedent elsewhere in the product — Records' own Attributes/Screen Layout/JSON already ship as horizontal links, not a vertical rail. The rail introduced a new pattern to solve a problem that didn't need one.
- Icon-only reduces discoverability (needs hover+tooltip for something a label gives for free).
- Left significant unused vertical space in the rail column — chrome that didn't earn its keep.

### Why "All rules" is pinned, not toggle-only

First version had no persistent list-entry point — returning to the list meant re-clicking the already-active Rules tab, a non-discoverable toggle interaction. `All rules` as a permanent, non-closeable first tab in the Level-3 row makes "go back to the list" an explicit, always-visible target instead of a hidden toggle.

### Behavior

- Click a rule row in the list → opens/focuses its Level-3 tab, "All rules" deactivates (stays visible, stays clickable).
- Click `All rules` → shows the list; any open rule tabs remain in the row, just unfocused.
- Click `×` on a rule tab → closes it; if it was active, an adjacent tab (or `All rules` if none remain) takes focus.
- Editing a rule marks its tab dirty (visual indicator). Closing the parent workflow tab with dirty rule tabs open triggers a confirmation modal (`Cancel` / `Discard` / `Save all & close`).

### Extensibility

The same Level-2/3 nesting is intended to generalize to any object with an internal item-list-plus-editor pattern (e.g., a Record's Screen Layout sections), not just Workflow Rules — not built for those yet, but the primitive should be reusable when the need comes up.

### No icons on Level-2 sub-tabs (v5, revised)

Every Level-2 sub-tab row built so far (`Preview/Rules/JSON`, `Attributes/Screen Layout/JSON`, `Workspace/Overview/Changes`, the Configs row) originally paired an icon with each label. Removed — plain text only, everywhere this pattern appears, including inline quick-links that reuse the same icon set (Task Workspace's object tree, the Records list's per-row links). Two reasons:
1. **Noise without payoff** — the labels are already unambiguous English words; the icon added visual weight without adding legibility.
2. **Internal inconsistency** — Level-3 pinned tabs (`All rules`, `All Badges`) were already plain text; icons only at Level-2 made the two levels look like different systems when they're the same primitive. Removing icons everywhere makes the whole tab system read as one consistent language, distinguished by position and state (underline, weight), not decoration.

### Two visual styles for nested tabs: underline vs. pill (v5, new)

Once Records' nested row mixed pinned views (`All Records`, `Records Map`) with dynamically-opened items (individual records) in the same row, both using the same underline-tab style, they became visually indistinguishable — a real ambiguity, not just a taste preference, since the two categories mean different things (a permanent view vs. something-you-opened-and-can-close).

**Rule, applied everywhere this nesting pattern exists (Records, Rules, Configs):**
- **Pinned/structural views** (`All Records`, `Records Map`, `All rules`, `All Badges`, `Preview`, `JSON`, `Attributes`, `Screen Layout`, `Workspace`, `Overview`, `Changes`, and the 5 Configs sub-tabs) → stay **underline-tab style**, never closeable, always present.
- **Dynamically-opened items** (an individual record, an individual rule, an individual badge/scheduled action/etc.) → become **pills** (rounded chip, bordered, closeable with `×`) — visually distinct from the underline tabs they sit alongside.

### Title size scales with nesting depth (v5, new)

A record's own title (e.g. "Contracts Engagement") was rendering at the same size as a genuine Level-1 page title (e.g. a Task's "Add PII condition to Subcontractor Form") — but the record is nested two levels inside "Records", not a page of its own. Visual weight should track actual nesting depth:
- **Level 1** (Task title, app name, a category tab's own heading) → large, bold (~24-28px).
- **Level 2/3 nested content** (an individual record/rule/badge's own title inside its parent tab) → smaller, semibold (~18-20px) — never competes visually with a real page title.

---

## 2.8. Object categories — where Records, Badges, and other root-level types live (v5, new)

### Problem it addresses

Auditing the shipped product surfaced several object types that don't fit the Workflow/Task/App shape we'd already designed for: Records (with their own Records Map), Badges, Scheduled Actions, Workflow Prepopulation Configs, Step Copy Configurations, Object Selection Configs. Each needed a place in the tab-first architecture, and the shipped product's own answer was inconsistent — it groups 3 of these 5 config-types under a "Configs" tab, but leaves Badges and Scheduled Actions as unexplained standalone root items with no visible grouping logic.

### Model

The Studio app's existing **Object categories** grid (§2, item 3) is the single entry point for all of these — each category card's expand link opens a Level-1 tab. What happens *inside* that tab follows the same nested Level-2/3 primitive built for Rules (§2.7), applied consistently to every category — including Records, after an initial attempt to give records their own Level-1-per-item treatment reproduced the exact tab-proliferation problem this redesign exists to fix (see "What we tried and reverted" below).

**Records:**
- `Records` card → expand → opens a **"Records" Level-1 tab**.
- Inside it, a Level-2 row: **`All Records`** and **`Records Map`** — both pinned, non-closeable, siblings (list view vs. graph view of the same domain) — followed by individual record tabs, opened on demand, each closeable with `×`.
- Clicking a row in the `All Records` list → opens/focuses that record's Level-2 tab. It does **not** open a new top-level tab.
- Inside an individual record's Level-2 tab, its `Attributes / Screen Layout / JSON` views render as an inline sub-tab row — the same component already built for records, just nested one level deeper than originally spec'd.
- **Records Map** (the systemic cross-record ER diagram) is **not** a separate Level-1 tab (reverted — see "What we tried and reverted" below) — it's the second pinned Level-2 tab alongside `All Records`, inside the same "Records" tab. Clicking a node in the Map opens/focuses that record's Level-2 tab in the same row, right next to `All Records`/`Records Map` — never a new top-level tab.
- Any other entry point that surfaces a record (a Task's Workspace quick-links, ⌘K search, the Studio app's Recent list) routes through the same behavior — a record never opens as a bare top-level tab, regardless of where the click originated.

**Workflows** keep their existing, unchanged pattern (individual workflow = its own Level-1 tab, with `Preview/Rules/JSON` Level-2 and Rules nesting at Level-3 per §2.7) — Workflows are opened deliberately and in small numbers (you open one because you're about to edit it), which hasn't produced the same proliferation risk in testing. If that changes, apply the same nesting fix used for Records.

**Lightweight config objects (Badges, Scheduled Actions, Workflow Prepopulation, Step Copy, Object Selection) → consolidated under one "Configs" Level-1 tab:**
- `Configs` card → expand → opens a **"Configs" Level-1 tab** with a Level-2 sub-tab row (same plain-text pattern as Preview/Rules/JSON — see "No icons on Level-2 sub-tabs", §2.7): `Badges · Scheduled Actions · Workflow Prepopulation · Step Copy · Object Selection`.
- Each Level-2 sub-tab defaults to an **"All [type]"** list (e.g., "All Badges · 3") — search, filters, `+ Add`.
- Clicking an individual item opens it **nested at Level-3**, identical to how an individual rule opens inside a workflow's Rules sub-tab: `All Badges` pinned tab + the opened item's tab alongside it, editable inline (form + JSON), closeable independently.
- Resolves the shipped product's inconsistency (only 3 of these 5 types were grouped under its own "Configs" tab, with no stated criterion) by treating all five the same way.

**Connectors** — recognized as a fourth category card in the grid, but not yet audited against the shipped product in enough detail to spec its list/detail pattern. Left open until reference screenshots are available.

### What we tried and reverted — two rounds

**Round 1 — Records as Level-1-per-item.** First pass gave Records the same treatment as Workflows: individual record = its own Level-1 tab, reasoning that records carry enough per-object depth (Attributes/Screen Layout/JSON) to earn it, the same way a Workflow does. Built and tested in Claude Design — and it broke immediately in practice: opening the Studio app → Records → Records Map → clicking three record nodes in sequence left **six top-level tabs** open before doing any actual work, reproducing the "49 ungovernable drafts" problem this whole redesign exists to solve, just relocated to records.

The difference from Workflows turned out to be usage pattern, not object richness: records get **browsed** far more than they get **worked on** — via Records Map, via quick-links from inside a Task, via the master list — a "look at many, edit few" pattern that top-level tabs handle badly. Workflows are opened *because* you're about to edit them; records are frequently opened just to check something. Nesting records under one "Records" tab (reusing the exact All-rules/All-Badges primitive) fixed this without losing any of the per-record depth — `Attributes/Screen Layout/JSON` still exist, just one level further in.

**Round 2 — Records Map as its own sibling Level-1 tab.** Even after Round 1's fix, Records Map was kept as a separate top-level tab (rationale at the time: it's a systemic cross-record view, conceptually distinct from an individual record). This *also* produced the same friction once tested: opening "View Records Map" spawned yet another top-level tab, and it read as the identical problem Round 1 had just fixed, just one level up. On reflection, Records Map isn't conceptually distinct from `All Records` at all — it's the same domain (the full set of records), rendered as a graph instead of a table. Treating it as a second pinned Level-2 tab (alongside `All Records`, inside "Records") instead of a sibling Level-1 tab removed the friction entirely: switching between "list of records" and "map of records" is now a tab-switch within one container, not a new top-level tab.

**Takeaway for future categories:** before giving anything a Level-1 tab of its own, ask whether it's really a distinct *object* (deserves its own tab) or just another *view* of an object set already covered by an existing tab (belongs nested as a pinned Level-2 alongside the other views). Getting this wrong twice on Records is a signal to apply this test up front for Connectors and any future category, rather than defaulting to Level-1 and correcting after the fact.

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
| **Env context placement** | ✓ Resolved (v5) | Topbar-right risk-scaled chip + ambient top border, replaces v4's bottom bar (removed). See §2.6 |
| **Rules navigation** | ✓ Resolved (v5) | Nested Level-2/3 tabs inside the parent workflow tab — never top-level, never a plain drill-down. See §2.7 |
| **Dashboard adaptive scale** | ✓ Resolved (v5) | 3 tiers by app count (1 / 3-8 / 9+) — large-org chrome (sort, table, pagination) only renders when there's actual scale to justify it. See §2.5 |
| **Dashboard as mandatory landing** | ✓ Resolved (v5) | Only for 2+ apps. Exactly 1 app → skip Dashboard, login lands directly in that app's Overview. See §2.5.1 |
| **New App creation** | ✓ Resolved (v5) | Dropdown (not modal), extensible type list (Blank / Template-based / Training), trigger in Dashboard topbar |
| **Detail access pattern** | ✓ Resolved (v2) | Tab (with AI as first-class right column) |
| **Chrome minimalism** | ✓ Resolved (v2) | Sidebar + rail removed; Studio app is the entry point |
| **Task tab AI state name** | ✓ Resolved (v3) | **Review** — chips: Summarize diff · Suggest reviewers · Check compliance risks |
| **App identity in chrome** | ✓ Resolved (v3) | App name IS the leftmost tab; no duplication in topbar |
| **Task detail — single tab vs two tabs** | ✓ Resolved (v5) | Single tab, `Workspace / Overview / Changes` as Level-2 sub-tabs — absorbs shipped product's 2-tab content without breaking "one object = one tab". See §3 |
| **Object categories** (Records, Badges, Scheduled Actions, config-types) | ✓ Resolved (v5) | Records → "Records" tab, `All Records` pinned + records nested at Level-2, Map as sibling (reverted from per-record Level-1 tabs after testing showed proliferation). Config-types consolidate under "Configs" tab, same nesting primitive. See §2.8 |
| **Deploy vs Promote button semantics** | Open | Shipped product uses "Deploy to Development" (verb-first) at Draft stage; our v4 uses "Promote → QA" (progression-first) universally. Decision pending. |
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

- **Studio Dashboard** — adaptive by app count (3 tiers, §2.5): 1-app orgs skip it as landing entirely; 2+ renders Tier 1/2/3 content accordingly. Topbar `+ New app` dropdown (Blank / Template-based / Training), extensible list.
- **App Overview** with 3 sub-tabs (Summary / Insights / Activity) — Summary has enriched Pipeline (per-env sub-metadata + active deploy indicator), Needs your attention, Team row, Open Tasks with Live badge + reviewer designation, Recent Activity with deploy events
- **Task detail tab** — sticky header with Promote → QA button, lifecycle stepper (6 nodes: `Draft → Review → Development → QA → Pre-Live → Live`), Change Requests per env with `.cr` suffix (`CR #461 → DEV-5430.cr`, `CR #483 → QA-1207.cr`), Scope + Activity two-column
- **Env chip + ambient border** (v5) — topbar-right risk-scaled chip (Dev/QA subtle, Pre-Live/Live escalating) + 2px top border for Pre-Live/Live; floating save/sync chip bottom-right. Bottom bar removed.
- **Rules nested tabs** (v5) — Level-2 `Preview/Rules/JSON` row with live badge count, Level-3 `All rules` pinned + dynamic rule tabs, all inside the parent workflow tab (§2.7)
- **Studio app "+ New Tab"** — plain search bar (not AI-branded) · Recent · Object categories with Create/Import icons · Open Tasks compact link · gray bg + card treatment matching Overview
- **AI state-aware content** for Discovery (Overview / Dashboard-less / Studio app) · Ready (Workflow tab without task) · Execution (Workflow with active task) · Review (Task tab)
- **Notification panel** — bell dropdown with unread events, actionable inline (Review · View · Take over), "Mark all read", "View all →" footer
- **Avatar menu** — profile / preferences / team / help / shortcuts / sign out
- **Minimal chrome** across all in-app tabs — `[S]` (returns to Dashboard) · tab strip · env chip · 🔔 · avatar

Figma file: https://www.figma.com/design/Mg3plZn2b0tadSOZAP3ndX/Studio-%E2%80%94-Navigation-Explorations

---

## Next steps (post-v5)

**Done (v5):**
- ✓ Env context moved to topbar chip + ambient border; bottom bar removed
- ✓ Save/sync state as floating corner chip
- ✓ Rules nested tab system (Level-2/3), rejecting both top-level-tabs (shipped product) and icon-rail (rejected iteration)
- ✓ Dashboard adaptive by app-count tier (1 / 3-8 / 9+)
- ✓ Dashboard skipped as landing for exactly-1-app orgs
- ✓ New App creation as extensible dropdown, topbar-persistent trigger

**Done (v4):**
- ✓ Naming aligned to shipped product (`Proposal → Task`)
- ✓ Lifecycle stages aligned (`Draft → Review → Development → QA → Pre-Live → Live`)
- ✓ CRs preserved with `.cr` suffix per shipped convention

**Done (v3):**
- ✓ Studio Dashboard built (root above apps)
- ✓ Studio app page built (with search + Recent + object categories + Open Tasks link)
- ✓ Task detail tab spec drafted and rendered
- ✓ App identity solved (Mayo Client App as leftmost tab, not chrome duplicate)
- ✓ Notification panel + avatar menu built

**Open — needs a decision, not blocked on PM:**
- Task detail: single tab (ours) vs two tabs (shipped product)
- Deploy vs Promote button semantics
- New Task modal design (depends on the single/two-tab decision above)
- AI Change Log section inside Task Overview

**Blocked (awaiting PM's task-management doc):**
- Promotion-as-entity (env-to-env promotion as its own task-like tab)
- Env view page (read-only, per-env, with deploy history + hotfix button)
- Hotfix flow (target-env selector on new-Task creation, "Hotfix" badge)
- Version history + rollback ("Deployed versions" modal, "Switch to version" action)
- Project layer (workspace-of-agent — pending PM clarification on interpretation)

**Pending (post-model-alignment):**
1. **Sync v5 back to Notion** (`Studio: Nav Model & AI Placement`) — currently blocked on Notion MCP; will complete when reconnected.
2. **Relabel existing Change Requests page as "Tasks list"** — mostly relabel, not a rebuild.
3. **Empty state for Open Tasks** (Overview + Studio app + Dashboard).
4. **1→2 app transition nudge** — one-time callout when an org's 2nd app is created, since login behavior changes at that threshold (§2.5.1).
5. **Tab strip overflow behavior** (many tabs open — horizontal scroll + `⋯` menu). Post-MVP.
6. **Global search "View all"** dedicated page — post-MVP, cross-app search results view.
7. **Notification "View all" page** — post-MVP.

---

*Owner: Chris Calviño · chris@chriscalvino.com*
*v5 — post-implementation audit, July 2026. Navigation depth and Dashboard scale-reality fixes on top of v4's product alignment. Structural gaps captured in `I_model_comparison.md`.*
