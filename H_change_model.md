# H. Proposal-First Governance Model — extensions to the Nav Model & AI Placement decision

> **Companion to** the Notion doc *"Studio: Nav Model & AI Placement"* (Design Tracker · Product).
>
> **v2 — post-PM-sync (July 2026).** After presenting v1 to the PM, three revisions came back that reshape the surface but not the intent:
> 1. **Naming:** "Change" is out. Container entity is now **Proposal**.
> 2. **Detail access:** modal is out. Proposal detail opens as a **tab**, so the AI can live inside it as a first-class companion.
> 3. **Chrome model:** the persistent left sidebar (220px) AND the icon rail (56px) are eliminated. Everything opens as a tab; the entry point is a **Launchpad** page reached via `+ new tab`.

---

## Recap — Model 1 direction (unchanged)

- Two-axis frame (Scope × Prominence) → **scoped copilot, high prominence** (Model 1) is settled.
- Validated patterns (canvas = source of truth · JSON as a view · adaptive sizing · per-action traceability · drafts/CRs as git) still apply.
- Current-state problems the original doc names — tab proliferation, flat lists, cryptic names, 49 ungovernable drafts, wall of red validation — are still what we're addressing.

Model 1's *"scoped copilot"* verdict is the strategic ground. Everything below is how we materialize it in the surface after PM feedback.

---

## 1. Proposal — the container entity

### Problem it addresses

Named drafts alone don't solve *"49 ungovernable drafts"*. What's missing is a container entity that groups work as it moves through environments, gives it a lifecycle, and gives the user a single mental unit to track.

### Model

- A **Proposal** is a first-class ticket owned by one person, with a lifecycle:

  ```
  Open → In progress → In review → Approved → Merged → Live
  ```

- A Proposal contains N **Change Requests (CRs)**, one per environment it touches (Dev → QA → Pre-Live → Live). The existing CR entity stays intact; a CR is now a sub-step of a Proposal.
- The **draft entity stays alive** — a Proposal adopts a draft per env, and the draft's ID (e.g., `DEV-5430`) is auto-generated from the Proposal name instead of a timestamp. This kills the `studio-2335` / `test m1` / `check revert` proliferation at the source (creation flow) without breaking existing drafts.

### Why "Proposal" and not "Change" or "Issue"

- **"Change"** was v1's naming. Rejected because it is too generic (every workflow edit is a change) and collides mentally with "Change Request" (a Proposal *has* Change Requests but is not one).
- **"Issue"** was the fallback (GitHub / Linear convention). Rejected because it reads as a bug or complaint in a compliance / GRC context.
- **"Proposal"** wins:
  - Coherent with governance vocabulary. *"Sarah is reviewing my Proposal"* reads natural.
  - Doesn't collide with Change Request. A Proposal *proposes* changes; each CR *implements* the proposal in a specific environment.
  - Implies review lifecycle organically — a Proposal is inherently something you formalize, submit, get reviewed.

### Zero data-model changes

Reframing + one new container entity on top of what already exists.

---

## 2. Tab-first navigation — the new chrome model

### What we eliminated

- **The 220px workflow sidebar.** Was showing a long flat list of workflows, mixing types with configs.
- **The 56px icon rail** (S logo + 4 object-type icons). Merged into the topbar as a compact identity mark.
- **The "Change pill" in the topbar.** Was a parallel context indicator competing with the tab strip, and split behavior between "click text" and "click ▾" — a UX anti-pattern.
- **The "Promote → QA" button in the global topbar.** Moved into the Proposal tab where it belongs.

### What we kept

- **The topbar** (48px), now minimal.
  - Left: `[S] Mayo Client App ▾`
  - Right: notifications only. Everything else migrated to tabs.
- **The tab strip** — first-class navigation surface. Every object opens as a tab.
- **The AI panel** — still a first-class second element inside object tabs, adaptive by state (see §5).

### What we added — the Launchpad

The `+ new tab` icon in the tab strip opens the **Launchpad**: a full-canvas page whose job is to be the entry point to everything — search, browse, create, import.

**Launchpad structure (top to bottom):**

1. **Find or create — plain search bar.** Not AI-branded. `🔍 Search workflows, records, connectors…` + `⌘K`. Below it, 3 literal shortcuts: `+ New workflow` / `+ New record` / `+ Import`. This is navigation, not conversation — see "AI panel stays put" below for why it's deliberately *not* styled like the AI input.
2. **Recent** — 4 rows of last-touched objects (workflows, records, proposals).
3. **Object categories** — 2×2 grid of Workflows / Records / Connectors / Configs cards, each with top items + count + a `[+ Create]` / `[↥ Import]` icon pair in the card header + expand link.
4. **Open Proposals** — a single compact link row (`✦ Open Proposals · 5 · View all in Overview →`), not a full list. The full list lives in Overview; the Launchpad only signals it exists.

**Behavior:**
- Click any row/card → opens as a new tab. The `+ New tab` tab is replaced by the opened object; a fresh `+` icon appears at the far right of the tab strip.
- `⌘K` focuses the search input.
- Click on `[S]` badge → back to Dashboard (all-apps view). Doesn't affect open tabs.
- Click on `Mayo Client App ▾` → app switcher dropdown.

### AI panel stays put — no duplicate AI surface

First pass of the Launchpad put an AI-branded hero in the canvas (`✦ Studio AI` + `Ask, find, or create…` + suggestion chips) *in addition to* the existing left AI panel. That's two AI-looking inputs on one page — confusing, and it duplicates a surface that's already shared chrome across every page (Overview, Workflow tabs, Proposal tabs).

**Fix:** the AI panel is the *only* AI entry point on the Launchpad, same as everywhere else. Its state is **Discovery** (memory line + Recent AI activity + exploratory chips), identical to how it behaves on Overview — there's no separate "Command" state. The canvas gets a plain, non-AI search bar instead (see structure item 1 above). Two distinct interaction modes, two distinct visual languages: **search bar = go somewhere directly; AI panel = think something through.**

### Overview and Launchpad don't share content — by design

Early drafts explored a shared "Navigator" block (search + 4 category cards) rendered inside *both* Overview and the Launchpad, reasoning that they overlap in audience. Decided against it — **PM confirmed Overview stays exactly as it is** (stats, pipeline, full Open Proposals list, Recent Activity feed). No merge needed. The two pages serve different questions and don't need shared UI to feel connected:

| | Overview | Launchpad |
|---|---|---|
| Answers | *"How's my app doing?"* | *"What do I want to open?"* |
| Stats + Pipeline | ✓ | — |
| Open Proposals | Full list | Link only (`View all in Overview →`) |
| Recent Activity feed | ✓ | — |
| Search / Create / Import | — | ✓ (category cards) |
| Recent objects (last-touched) | — | ✓ |

They're linked by cross-reference (the Launchpad's Open Proposals link points at Overview), not by shared components.

### Why this is better than the sidebar

- **~276px more canvas** (sidebar 220 + rail 56 = 276 recovered).
- **Single mental model.** Everything is a tab. No modals for "detail views", no swap states.
- **One AI, one place.** No duplicate AI-branded surfaces competing for attention.
- **Familiar semantics** for a technical builder (Cursor / VSCode / Chrome tab-strip pattern).

---

## 3. Proposal detail — a tab, not a modal

A Proposal opens as a tab. Its content:

- **Sticky header inside the tab:**

  ```
  Proposal #461 · Add PII condition · In review     [Promote → QA ▾]
  ```

  The Promote button lives here — pegged to the object it acts on. Actions travel with their objects.

- **Body:** Lifecycle stepper · Change Requests by environment (with draft IDs like `DEV-5430`) · Scope + Activity two-column.

- **AI panel** — first-class right column inside the Proposal tab. State = **Review** (see §5).

### Entry points to a Proposal (multiple, all consistent)

- **Overview → Open Proposals** section → click a row
- **Launchpad → Open Proposals** section → click a row
- **⌘K** → search by number or name → Enter
- **Recent Activity** → click any `Proposal #461` reference
- **Notifications** → click the Proposal link

All open the same tab. No dropdowns, no dual-behavior pills, no context switches.

### Management actions

- **Close a Proposal tab** → the `×` on the tab (browser-native).
- **Copy link / share** → `⋯` icon in the tab's own top-right, next to the Promote button.
- **Switch between Proposals** → click a different tab, or `⌘⇧←/→`.

Each action has one place and one behavior.

---

## 4. Overview sub-tabs — Summary / Insights / Activity

Same pattern as workflow's `Preview / Rules / JSON` — alternative views of one object (the app), not separate tabs at the browser level.

| Sub-tab | Purpose | Content |
|---|---|---|
| **Summary** | Day-to-day glance | Stats · Pipeline · Open Proposals (top 5) · Recent activity (top 5) |
| **Insights** | Situation room | People · Health · Environments · Proactive suggestions with inline actions |
| **Activity** | Timeline archive | Filterable feed (Proposals / Deploys / Comments / AI runs) with search + Load more |

---

## 5. AI state-awareness — one component, four states

The chrome stays constant (panel position, input, style). The content adapts to context.

| Context | State | Content |
|---|---|---|
| App Overview | **Discovery** | Memory line (*"You've been working on X"*) · Recent AI activity · Exploratory chips |
| Launchpad open | **Discovery** | Same as Overview — the Launchpad reuses the Discovery state rather than inventing a separate one. The canvas has its own plain search bar for direct navigation; the AI panel is for thinking things through. |
| Workflow tab open, no active task | **Ready** | Empty state + 3 workflow-specific chips |
| Workflow tab with active AI task | **Execution** | Task card with actions history · Diff pills · Inline suggestion with Apply / Dismiss |
| Proposal tab open | **Review** | Chips: *"Summarize the diff"* · *"Suggest reviewers"* · *"Check compliance risks"* · Input: *"Ask about this Proposal…"* |

### Coherence rule

The AI's content must always match the object in the currently active tab. Cross-context leaks (e.g., Subcontractor Form's task showing while OIS Device Details is active) are bugs, not features.

### Why this differentiates from Cursor / Copilot

- Cursor / Copilot AI is scoped to the open file and reactive.
- Studio AI is scoped to the app and **proactive on Discovery** (Launchpad + Overview Insights), **contextual on Execution** (workflow tabs), **review-oriented on Review** (Proposal tabs), and **carrying memory across sessions**.

---

## Open decisions

| Decision | Status | Notes |
|---|---|---|
| **Naming** — container entity | ✓ Resolved | **Proposal** |
| **Detail access pattern** | ✓ Resolved | Tab (with AI as first-class right column) |
| **Chrome minimalism** | ✓ Resolved | Sidebar + rail removed; Launchpad is the entry point |
| **Proposal tab AI state name** | Recommendation: **Review** | Awaiting PM confirmation |
| **App switcher dropdown** — visual design | Open | Needs Claude Design mock |
| **Tab strip overflow behavior** | Open | Proposal: horizontal scroll + `⋯` overflow menu listing tabs beyond viewport |

---

## Artifacts

Live in **Claude Design** and **Figma** (`Studio — Navigation Explorations`, file key `Mg3plZn2b0tadSOZAP3ndX`):

- **App Overview** with 3 sub-tabs (Summary / Insights / Activity) — full content specced and rendered
- **Proposal detail tab** — lifecycle stepper, CRs per env (with draft IDs — `CR #461 → DEV-5430`, `CR #483 → QA-1207`), Scope + Activity two-column, sticky header with Promote → QA. AI panel in Review state.
- **AI state-aware content** for Discovery / Ready / Execution / Review states
- **Launchpad (+ New Tab)** — AI-first hero, Recent, object category grid, Open Proposals section
- **New minimal topbar** — `[S badge] Mayo Client App ▾` · notifications right

Figma file: https://www.figma.com/design/Mg3plZn2b0tadSOZAP3ndX/Studio-%E2%80%94-Navigation-Explorations

---

## Next steps (post-v2)

1. **Sync v2 back to Notion** (`Studio: Nav Model & AI Placement`) — the July 2026 update section needs revision to reflect Proposal + tab-first + Launchpad.
2. **Design Launchpad in Claude Design** — prompt drafted, next execution.
3. **Design Proposal detail tab** with AI Review panel.
4. **Design app switcher dropdown** (`Mayo Client App ▾` open state).
5. **Design tab strip overflow behavior** (many tabs open).
6. **Propagate Proposal language** across the product (Dashboard 3.1, Recent Activity, notifications, existing CR references in UI).
7. **Relabel existing Change Requests page as "Proposals list"** — mostly relabel, not a rebuild.
8. **Empty state for Open Proposals section** (Overview + Launchpad).

---

*Owner: Chris Calviño · chris@chriscalvino.com*
*v2 draft — post-PM-sync July 2026.*
