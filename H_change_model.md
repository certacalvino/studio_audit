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
> **v4 — post-PM-walkthrough (July 2026).** PM shared a video of the shipped product. Three surface updates aligned our design to what already exists in-product; structural gaps (promotion-as-entity, env view page, hotfix, version history) are captured separately in `I_model_comparison.md`. **Correction (July 10):** there is no separate PM task-management doc in progress — these gaps are ours to design directly from the product walkthrough already in hand, not something to wait on.
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
>
> **v7 — Task detail reconsidered as in-place panel, not a top-level tab (July 2026).** Task becomes the one exception to §2.9's "individually-opened items get their own top-level tab" rule. Reasoning: unlike Records/Rules/Configs — peer objects the client routinely wants open side-by-side for comparison — a Task is the container/branch that *scopes* changes to those peer objects, not a peer object itself; it's never compared against another Task in the same frame. Opening a Task (from any entry point) now swaps the current app tab's own canvas into the Task's full view — own header + `Overview/Changes/Tests`, with the app's `Summary/Insights/Activity/Tasks/Settings/Overrides` row hidden while active — and a `← Back` to return. Not a new tab, not a modal. See §3 (revised). Scoped to Task only — Records/Rules/Configs are unaffected and keep §2.9's top-level-tab model unchanged.
>
> **v6 — Task Management build-out (July 2026).** Cataloguing the shipped reference's Task Management surface (Task Overview, Sandbox, Tests, env switcher, App Settings, App Overrides, All Tasks) end-to-end surfaced that it needed a real pass to fit our tab-first chrome instead of its own right-rail chrome. Six revisions:
> 1. **Round 3 — Records/Rules/Configs items revert AGAIN to top-level tabs.** §2.7/§2.8's nesting fix solved tab-pileup from casual browsing, but cost something the client needs more: opening multiple objects side-by-side to compare (a record from one app next to a rule from another app's workflow, at once). Nesting is reverted; clutter is solved differently this time — visual tab-grouping by parent app, not containment. See §2.9 (new).
> 2. **Task is scoped to one app, not cross-app.** A Task is a working copy/branch of the single app it was created from. This settles where Task Management lives: inside that app's own tab, not the Studio Dashboard's filter row, not a global tab, not a modal. See §2.10 (new).
> 3. **Env chip becomes a switcher**, not just a read-only indicator — click opens Development/QA/Pre-Live/Live with per-env icons, still risk-scaled per §2.6's original ruling. See §2.6 (revised).
> 4. **Task detail restructured again — `Overview / Changes / Tests` sub-tabs**, replacing v5's `Workspace/Overview/Changes`. Matches the shipped reference: Stage progress · Reviewers · Change Log · Discussion (Overview), diff view (Changes), Scenarios + Run all (Tests). See §3 (revised).
> 5. **App tab sub-tabs gain `Settings` and `Overrides`**, after `Tasks`, separated by a thin divider from the "monitor" tabs (Summary/Insights/Activity/Tasks). See §4 (revised).
> 6. **`CRs pending review` tile confirmed distinct, not a merge candidate** — initially flagged as stale terminology duplicating `Open Tasks`; retracted after confirming CRs are genuinely separate per-env sub-entities of a Task (`DEV-5430.cr`), not a synonym for it. Tile stays as-is.
> 7. **Env chip doubles as the branch/Task switcher** — confirmed against the shipped product's own combined Env+Draft dropdown (`A_current_state_map.md` §6): switching environment and switching which Task/branch you're working in were never two separate mechanisms there. Task Management resolves into three affordances mapped to existing pieces — trigger/switch (env chip), administer (`Tasks` sub-tab), create (`+ New Task` modal, reachable from both). See §2.10 (revised).
>
> **v8 — workflow page architecture + emergent grouping + bottom bar polish + task switching (July 2026).** Roughly twenty prompts (AD → BC) layered onto v6/v7 as we built out the workflow editing surface, refined the bottom bar through many hover-and-contrast passes, and settled how Task switching propagates across every surface where the current task is exposed. Grouped by theme:
> 1. **Rules migrate to top-level tabs with emergent grouping.** After the v6 revert (§2.9) put records back as top-level tabs, rules followed the same rule — open as their own top-level tab with a breadcrumb pointing at the parent workflow. Level-3 nested rule-rows inside a workflow's Rules sub-tab are gone entirely; clicking a rule in the workflow's Rules list opens a top-level tab that visually clusters under the workflow via emergent grouping (the workflow tab becomes a group anchor only when a rule is opened under it, not by default). See §2.9 (revised) and §2.7's superseded note.
> 2. **Workflow page redrawn: Preview-dominant canvas + Rules right panel + JSON bottom panel + top-bar Rules/JSON toggles.** The v5 spec of `Preview/Rules/JSON` as exclusive sibling sub-tabs was replaced. Preview is now the canvas at rest; Rules opens as a collapsible right-side panel; JSON opens as a bottom panel with a drag handle and a fullscreen expand. Both companion panels toggle from icons in the workflow page's own top bar, not sub-tabs. Rules and JSON are always the same rules and JSON of the currently-open workflow — companion views of one canvas, never a competing tab.
> 3. **Advanced group replaces Configs across the board.** "Configs" was already renamed to "Advanced" in v7's grouping model; v8 makes the item behavior explicit — items opened from any "All [type]" list under Advanced open as top-level tabs clustered under the Advanced group anchor, identical to how records cluster under Records. Same primitive, same rules — no special container behavior.
> 4. **Task switching is a first-class cross-surface action.** Three affordances now stay in sync: (a) a radio-style pill on each row in the Tasks list (`✓ Current` filled dark for the active row, `⇄ Switch` outlined for every other); (b) a mirrored `✓ Current` / `⇄ Switch to this task` pill in the Task detail top bar, next to Promote; (c) the bottom bar's env/task label continues to show the active task. Switching from any of the three updates all three in one atomic transition, with the Switch button acting as a loading-capable CTA (spinner + state during the swap). See §2.10.
> 5. **Bottom bar reaches its final visual language.** After v7 restored the bar (§2.6.6), a long polish tail settled several details: (a) Workspace restored as a fourth Task-detail sub-tab and originally the default landing (later moved to Overview in v9 — see below); (b) background switched from solid dark to env-tinted, mirroring the env chip's risk-scaled ramp — same green/blue/amber/red already used everywhere else, so risk escalates in the bar's own fill; (c) a subtle top shadow gives it a recessed feel against the canvas above; (d) the env/task label's clickable affordance is a soft bounding box with a two-state weight — lighter/quieter at rest, darker/clearer on hover — replacing a `▾`/`▴` chevron that pointed the wrong direction (dropdown opens upward from the bottom bar); (e) hover state and group-edge corner rounding on emergent tab groups (workflows with open rules, records under Records, advanced items under Advanced) share the same treatment for consistency.
> 6. **Progressive responsive tab shrink before overflow menu.** Instead of dumping tabs into an overflow menu the moment the strip runs out of space, tabs first shrink progressively (title truncation with tooltip fallback, then icon-only, then group-anchor-only) — the overflow menu is the last resort, not the first response. Preserves side-by-side visibility longer, which is the whole point of §2.9's top-level-tab model.
> 7. **`+ New Task` modal defaults the env to the current env, auto-flags Hotfix for non-Dev.** Previously the modal always defaulted to Development regardless of where the user was. Now: env picker preselects the env the user is currently in; if that env is non-Development (QA / Pre-Live / Live), the modal auto-flags the task as a Hotfix and swaps its header to `+ New Hotfix`. Cross-app.
> 8. **Tab-grouping polish and Studio-app Recent cleanup.** Tab grouping (§2.9) got three small refinements — color-tinted group underline, manual toggle for a stubborn group that won't collapse on its own, hover preview on collapsed groups. Separately, the Studio app's Recent list (§2 item 3) dropped Tasks entirely — Task already has a persistent bottom-bar + env/task-switcher presence, so listing it again alongside genuinely browsable object types blurred the container-vs-peer distinction and was noise.
>
> **v9 — TPRM Basic scoping + cross-app structural sync + Working-in card + Overview restructure (July 2026).** After adding TPRM App for Risk Domains as a second in-file app alongside Mayo, a sweep across every surface surfaced two orthogonal issues: (a) TPRM was leaking Mayo team data (fake activity, pre-assigned reviewers, populated CRs, Mayo-flavored PII test scenarios) into empty states meant for a Basic new-joiner persona, and (b) several component-level decisions applied only to TPRM had never been synced to Mayo, so the two apps had visibly different shells. v9 addresses both, and layers on a redesign of the Task detail Overview + Working-in card interaction. Seven revisions:
> 1. **Summary merged into one context card.** The Working-in card and the app-level Pipeline progress bar collapse into a single container with a thin divider between rows — Working-in row on top (task identity + Open/Continue task on the right), Pipeline row below (STAGE N OF 5 + horizontal progress bar + stage labels). They belong together — both answer "which task, what stage." The `Ready to make changes?` module stays as a separate card below because it's action, not context.
> 2. **Working-in card is fully clickable with a hover-revealed arrow.** The persistent `Open task →` / `Continue task →` button was removed at rest. The entire top row (task identity) is a single click target that opens the task; hover reveals a `→` arrow in the top-right corner plus a subtle elevation shift. The pipeline bar below the divider stays non-interactive display. Discoverability holds via `cursor: pointer` + hover feedback; the affordance appears when the user is about to act, not all the time. Applies to both TPRM and Mayo.
> 3. **Task detail Overview becomes the default landing tab and the first tab in the row.** Users arriving via deep link (Slack, email, notification) need context first, not an empty edit surface. Overview → Workspace → Changes → Tests, with Overview both leftmost and default. Overview itself is restructured into a self-contained landing brief: (a) task header (existing); (b) a three-chip context strip — app / stage / env — below the header, each chip clickable to the corresponding surface; (c) Lifecycle rendered with the same horizontal progress bar component used in the app Summary (one component, minimal in Summary, expanded with per-stage state in Overview); (d) a new `Deployed to` section listing Development/QA/Pre-Live/Live with per-env dot + timestamp reflecting where the task actually lives; (e) a conditional Sync banner when the task is behind its base env; (f) an `In this task` preview (counts + top-3 chips + `See all in Workspace →` link) — not the full item list, that lives in Workspace; (g) Change Log; (h) Discussion.
> 4. **Workspace redefined as the task-scoped items index.** Previously an empty-state CTA shell that duplicated Summary's `Start building`. Now: when the task touches items, Workspace shows them grouped by type — `WORKFLOWS · N` / `RECORDS · N` / `RULES · N` / `CONFIGS · N`, with type icons and Edit + Preview affordances per row; groups with count 0 are hidden entirely. When the task is genuinely empty (TPRM Basic case), Workspace keeps the `This task is empty · Start building` empty state — with the `+` icon dropped (the verb "Start building" is strong enough alone; the icon was noise). Overview's `In this task` becomes a preview; Workspace is the full index.
> 5. **Pipeline stages are Draft → Review → QA → Pre-Live → Live everywhere.** Some earlier surfaces (including a Lifecycle stepper in Task Overview and the Insights Pipeline detail cards) had `Development` sitting between Review and QA as if it were a lifecycle stage. It is not — Development is an environment, not a stage. Removed from every stepper and every pipeline visualization. Related: the Insights Pipeline detail card was also using "Dev" as shorthand for the Development env; unified to "Development" to match every other Development reference across Studio.
> 6. **AI CTAs consolidated in the AI Panel — no inline "Generate with AI" buttons anywhere.** Inline `✦ Generate with AI` buttons on Task detail tabs (Change Log, Tests scenarios, etc.) violated the single-surface principle for AI. AI actions live exclusively in the AI Panel on the left; empty states can guide the user toward the panel via copy ("ask AI in the panel to generate scenarios") but never via an inline button.
> 7. **Cross-app structural sync + Current-task pill lightened.** Every v9 structural change applies to both TPRM and Mayo — the two apps share the same shell, only content differs (TPRM Basic renders empty states, Mayo renders populated data). Separately: the `✓ Current task` indicator that sits next to Promote in the Task detail top bar was overweight — it read as a second CTA competing with Promote. It is now a light capsule pill (subtle background, 100% radius, small check + text, non-interactive), which reads clearly as a state indicator and lets Promote hold the CTA weight. The Tasks-list `Current`/`Switch` pills stay filled-dark because there they need inter-row contrast against the Switch rows — different context, different weight, same underlying pattern.

> **v10 — Env and Task decoupled as orthogonal dimensions (July 2026).** Through v1–v9 the model coupled env and task together — the bottom bar always rendered `[env] > [task]` as a single compound context, every env switch dragged the active task with it, and "no active task" was an opt-in state buried in the env dropdown. v10 corrects the underlying model: **env and task are two independent dimensions**, not one compound context. Rationale, model, and behavior below.
>
> **The Git analogy that makes it click.** Env is the equivalent of a remote branch (main / staging / prod) — the deployed state at each target. Task is the equivalent of a local feature branch — your unit of work in flight. In Git you routinely browse `origin/prod` without your feature branch loaded, and you routinely edit your feature branch regardless of which remote you last inspected. Studio should support the same. Today it doesn't: switching env forces the task along; opening Studio auto-carries the last active task. Both defaults are wrong.
>
> **Three flows that fit cleanly once decoupled:**
>
> 1. **Browsing an env** (env-only, no task) — "I want to see what's in QA today." Env pill only; App Summary renders the Env Review page for QA; no Working-in card. This is the natural default when opening Studio for the first time in a session.
> 2. **Working on a task** (task-first, env is secondary) — "I'm editing Task #438." Task pill visible; env pill still present but visually recessed since work happens in Development regardless. Task detail full-screen, env is contextual metadata not the primary lens.
> 3. **Previewing a task in an env** (both pills active) — "How would my Task #438 look if I deployed it to QA?" Both pills active, App Summary shows Env Review page with a secondary Working-in card ("your task as previewed in QA"). This is the case v1–v9 optimized for exclusively; it remains supported, just no longer the only shape.
>
> **Bottom bar becomes two independent pills.** Left group: env pill (always shown, env-tinted, clicking opens the env picker only). Adjacent: task pill (only shown when a task is active, neutral color, clicking opens the task picker only). Closing the task ("×" on the task pill) returns to env-only state without touching env. Env picker no longer offers a "No active task" row — env selection has nothing to say about task state.
>
> **Cross-cutting behavior implications:**
>
> - **App Summary rendering** now branches on which pills are active, not just on env: env-only → Env Review page (or Dev empty hero); task active in Dev → Working-in card with task pipeline; task active in non-Dev → Env Review page with secondary Working-in preview card underneath. The Env Review + Working-in duality is what supports Flow 3 cleanly.
> - **Task detail** still supports env lens (viewing a task from a specific env's perspective) — the mechanism from v8 stays. What changes is that the env lens is set by the env pill independently, not carried automatically from wherever the task was last opened.
> - **Env switch behavior** no longer needs the Case 1/Case 2/Case 3 rules from earlier prompts — those existed because env switch was assumed to carry task context. It doesn't anymore. Switching env just changes env; the task pill stays put unless the user clicks it separately.
> - **Promotion Tasks** are inherently tied to an env pair (Dev → QA, QA → Pre-Live, etc.), so their bottom-bar rendering is a special case: both env pills of the pair are represented in the task pill itself ("Task #501 · Promote Pre-Live to Live"), and the env pill shows whichever env the user is viewing from.
> - **Studio session default on open** is env-only in Development, not env-plus-last-task. Discoverability shifts to the Working-in card on App Summary (which lists open tasks) and the task picker.
>
> **What v10 does not change.** The 5-stage task lifecycle (Draft → Review → QA → Pre-Live → Live) stays. Promotion Tasks with their 3-stage lifecycle stay. Hotfix targeting a specific env stays. Env Review page for non-Dev envs stays. Everything downstream of the model — pipeline, promote/deploy CTAs, deployed-to sections — continues to work off `task.currentStage` as its source of truth. What changes is upstream: how env and task are *selected*, and how they compose in the bottom bar and App Summary. The rest of the system reads the new state; it doesn't need to be rewritten.

> **v10.1 — Env switch drops task attachment (July 2026).** v10 said "switching env keeps the task pill in place." Building against that revealed the rule was optimizing for the wrong case — the *rare* flow (previewing the same task across envs) at the cost of the *common* flow (browsing another env for a moment while a task is loaded). Users kept flagging the same feel: "why is my task still there? I was just going to look at QA." The instinct is right: a task has its own env home (Dev for regular work, target env for hotfixes). Env switching is a viewing intent, not a task-carrying intent. v10.1 corrects the rule.
>
> **New default:** switching env from the bottom bar dropdown detaches the task. The env pill updates, the task pill collapses, and the bottom bar returns to env-only state for that env. Task selection is a separate action (from the same dropdown's tasks section, from a Working-in card, from a notification, from a task list) — it re-attaches the task pill without touching the env. Env and task remain decoupled at the logic level (neither drags the other on selection), but the *default* on env switch is "leave the task behind" rather than "carry it along."
>
> **What auto-follow still applies.** The other side of the same coin: successful promote/deploy actions initiated from the Task detail auto-snap the env pill to the target env (promote to Live → env pill becomes Live). That's the one case where env and task selection are linked, because the user's action was itself an env-changing action ("deploy this to Live"). Everything else stays decoupled.
>
> **What this deprecates.** The v10 phrase "Switching env just changes env; the task pill stays put unless the user clicks it separately" is superseded. Also deprecated: the "preview card in State 3" as the default landing when env-switching with an active task. State 3 (previewing task in non-Dev env) still exists but is reached explicitly — by activating a task while in a non-Dev env — not as a side effect of env switch. The App Summary in a non-Dev env with no active task shows the Env Review page cleanly; if the user then picks a task, the preview card appears.
>
> **Why this is the honest answer.** Analyzed against real workflows: 90% of env switches are "I want to look at [env]" (env-first intent), 10% are "I want to see my task in [env]" (task-carrying intent). Model 1 forced the 90% case to visually carry a task they weren't actively working on, which read as noise. Model 2 (v10.1) makes the 90% case clean and requires one extra click for the 10% case (re-select task in target env). That's the right tradeoff.

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
2. **Recent** — 4 rows of last-touched objects (workflows, records, connectors). **v7: Tasks dropped from this list** — Task already has a dedicated, always-visible presence (the bottom bar shows the active task at all times; the enriched env/task switcher, §2.10, is one click to any other task) — showing it again here, mixed with genuinely browsable object types, undercuts the distinction the rest of this doc draws between Task (container/branch) and Workflows/Records/Connectors (peer objects you browse to open).
3. **Object categories** — 2×2 grid of Workflows / Records / Connectors / Advanced cards (v7: "Configs" renamed to "Advanced" to match the shipped reference), each with top items + count + a `[+ Create]` / `[↥ Import]` icon pair in the card header + expand link. Each card's expand link opens that category's full list as a Level-1 tab — see §2.8 for how each category resolves once opened.
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

### 5. Env chip becomes a switcher (v6, revised)

The chip stops being read-only. Clicking it opens a small dropdown: `Development / QA / Pre-Live / Live`, each row with a distinct icon (`</>` code / flask / rocket / globe), currently-selected env highlighted. Selecting a different env re-scopes the current app tab's content (see §2.10) — same chip, same risk-scaled styling, now interactive.

### Net effect

Bottom bar's 28px returns to canvas. Env awareness gets *more* prominent (topbar + ambient border) despite less total chrome than v4's bar.

### 6. Bottom bar returns — consolidated, env-tinted, replaces the topbar chip and floating save chip (v7, reverses this section's v5 removal)

Reconsidered against the shipped reference, which keeps exactly this kind of bar always present. Worth reversing the v5 removal because it consolidates three things that were scattered separately — env chip, save/sync state, and now also the active-task context — into one persistent strip, instead of competing for attention in three different corners.

- Same height as the topbar, sits at the very bottom of the viewport, **full width edge to edge** — spans beneath both the AI panel column and the main canvas, not just the main canvas. Matches the IDE precedent this pattern is named after (VS Code's own status bar runs under both the sidebar and the editor); the bar shows app-tab-level state (env, save, active task), not something scoped to one column, so it shouldn't look like it belongs to just one of them.
- **Env-tinted background, risk-scaled** (v7, corrected — built dark/fixed first, then reconsidered: a solid black bar spanning the full width was the single largest concentration of pure black anywhere in the interface, far more visual weight than a peripheral status bar should carry, and it clashed with the otherwise light, airy aesthetic everywhere else). Same risk-scaled mapping already used on the env chip and ambient border: light green for Development, blue-tinted for QA, amber for Pre-Live, red for Live — text/dot use the darker stop of that same ramp for contrast. This also restores the risk-escalation signal directly in the bar's own fill, which the dark version had to offload entirely onto the dot + the ambient top border.
- Left: env dot (still risk-scaled: green/blue/amber/red) + env name + `›` + the active task/draft name, e.g. `Development › Reorder External Party fields`. **Clickable affordance: a subtle bounding box with hover state, not a `▾` chevron** (tried first, then reconsidered — a down-facing chevron implies the dropdown opens downward, but this trigger sits in the bottom bar with no room below, so the switcher always opens *upward*; a directional glyph pointing the wrong way is worse than no glyph, and conditionally flipping it to `▴` was more complication than the affordance is worth). A soft bounding box around the env/task text signals "clickable" without making any directional claim. **Two-state weight, refined once more after seeing it built:** matching the Run button's constant solid fill (previous fix) read as too heavy at rest — this label's primary job is conveying information (env + task), being clickable is secondary, so it should look more like text than a button when idle. Settled on: a lighter, quieter fill at rest, darkening to a clearer, more visible fill only on hover — the interactive cue shows up when the user is about to act, not all the time. The Run button itself stays at its constant solid weight regardless of hover, since it's a primary action rather than a secondary affordance on an information label.
- Right: save/sync state (`Saved` / `Unsaved changes` / `⚠ Sync failed` — same three states the floating chip had) + the Run/preview button.
- **Replaces, not adds to:** the topbar-right `Task #500 ▾` env/task pill (item 1/item 5's switcher trigger) and its adjacent `▶` Run button both relocate here, along with the floating bottom-right save chip (item 4) — all three are removed from where they currently sit. Nothing about env, task, save state, or run is shown in two places at once. The 🔔 bell and avatar are unaffected and stay in the topbar.
- Clicking the env/task area on the left opens the same combined env+task switcher already defined in §2.10 — see that section's v7 addition for what now lives inside it.

---

## 2.7. Rules — nested tabs, not top-level or drill-down (v5, new)

> **⚠️ Superseded by §2.9 + v7 (see the "Round 3" revert and Prompt AG / §2.9's final grouping model).** This entire section describes the Level-2/3 nesting model (a `Rules ●N` sub-tab with a pinned `All rules` + individual rule *pills* nested inside the workflow tab). That is **no longer the model.** Rules now open as **top-level tabs** that cluster with their parent workflow via emergent grouping (the workflow tab becomes a group-anchor only when a rule is opened under it). The `Rules` sub-tab under a workflow still shows the **list** of rules (`All rules · N`), but there is **no nested Level-3 tab row** (`All rules` pinned pill + rule pills) inside it anymore — clicking a rule in that list opens a top-level tab, it does not add a nested pill. Kept below for historical reasoning only.

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

**Lightweight config objects (Badges, Scheduled Actions, Workflow Prepopulation, Step Copy, Object Selection) → consolidated under one "Advanced" group tab (v7 — renamed from "Configs"; behaves exactly like Records):**
- **Naming: "Advanced," not "Configs"** — aligns with the shipped reference, whose own search/filter category for these types reads `Advanced · 11` (alongside `Workflows`, `Records`, `Connectors`). "Configs" is dropped everywhere in favor of "Advanced."
- `Advanced` card → expand → opens an **"Advanced" group tab** (an always-grouped category container, same class as Records — not the emergent per-object grouping used for Workflows). Inside it, a sub-tab row: `Badges · Scheduled Actions · Workflow Prepopulation · Step Copy · Object Selection`, each defaulting to an **"All [type]"** list (e.g. "All Badges · 3") with search, filters, `+ Add`.
- **Individual items behave exactly like records (v7, changed):** clicking an item in any "All [type]" list opens it as a **top-level tab clustered under the "Advanced" group** — the same treatment a record gets under Records — *not* nested at a deeper level. This replaces the earlier Level-3-nesting spec and also replaces the current build's separate per-type group tabs (Badges, Scheduled Actions, etc. as their own standalone group tabs); all five types live under the single "Advanced" group, and their items cluster there just as records cluster under Records.
- Resolves the shipped product's inconsistency (only 3 of these 5 types were grouped under its own tab, with no stated criterion) by treating all five the same way.

**Connectors** — recognized as a fourth category card in the grid, but not yet audited against the shipped product in enough detail to spec its list/detail pattern. Left open until reference screenshots are available.

### What we tried and reverted — two rounds

**Round 1 — Records as Level-1-per-item.** First pass gave Records the same treatment as Workflows: individual record = its own Level-1 tab, reasoning that records carry enough per-object depth (Attributes/Screen Layout/JSON) to earn it, the same way a Workflow does. Built and tested in Claude Design — and it broke immediately in practice: opening the Studio app → Records → Records Map → clicking three record nodes in sequence left **six top-level tabs** open before doing any actual work, reproducing the "49 ungovernable drafts" problem this whole redesign exists to solve, just relocated to records.

The difference from Workflows turned out to be usage pattern, not object richness: records get **browsed** far more than they get **worked on** — via Records Map, via quick-links from inside a Task, via the master list — a "look at many, edit few" pattern that top-level tabs handle badly. Workflows are opened *because* you're about to edit them; records are frequently opened just to check something. Nesting records under one "Records" tab (reusing the exact All-rules/All-Badges primitive) fixed this without losing any of the per-record depth — `Attributes/Screen Layout/JSON` still exist, just one level further in.

**Round 2 — Records Map as its own sibling Level-1 tab.** Even after Round 1's fix, Records Map was kept as a separate top-level tab (rationale at the time: it's a systemic cross-record view, conceptually distinct from an individual record). This *also* produced the same friction once tested: opening "View Records Map" spawned yet another top-level tab, and it read as the identical problem Round 1 had just fixed, just one level up. On reflection, Records Map isn't conceptually distinct from `All Records` at all — it's the same domain (the full set of records), rendered as a graph instead of a table. Treating it as a second pinned Level-2 tab (alongside `All Records`, inside "Records") instead of a sibling Level-1 tab removed the friction entirely: switching between "list of records" and "map of records" is now a tab-switch within one container, not a new top-level tab.

**Takeaway for future categories:** before giving anything a Level-1 tab of its own, ask whether it's really a distinct *object* (deserves its own tab) or just another *view* of an object set already covered by an existing tab (belongs nested as a pinned Level-2 alongside the other views). Getting this wrong twice on Records is a signal to apply this test up front for Connectors and any future category, rather than defaulting to Level-1 and correcting after the fact.

**Superseded (v6):** this conclusion is reverted by §2.9. Comparison need turned out to outweigh casual-browsing protection — kept above for the historical reasoning, not as the current model.

---

## 2.9. Round 3 — Records/Rules/Configs items revert to top-level tabs; clutter solved by tab-grouping, not nesting (v6, new)

### Why we reverted the reversal

§2.7/§2.8 solved a real problem — casual browsing was spawning tab pileup (opening Records Map, clicking three nodes, ending up with six top-level tabs before doing any actual work). Nesting fixed that. But it cost something the client needs more: **comparing multiple objects side-by-side in one session** — a record from one app next to a rule from a different app's workflow, open at the same time. Nesting makes that impossible; anything opened from inside "Records" or a Workflow's "Rules" list is trapped one level down, in a container that can only show one nested item's row of pills at a time, never genuinely side-by-side top-level tabs.

Comparison need > casual-browsing protection. Revert the nesting; solve clutter a different way.

### Model — top-level tabs again, clutter solved by visual grouping

- Clicking a record row in `All Records` (or a node in Records Map) → opens that record as its own **top-level tab**, not nested inside "Records".
- Clicking a rule in a Workflow's `All rules` list → opens that rule as its own **top-level tab**, not nested inside the Workflow.
- Clicking an item in any Configs sub-tab (a Badge, a Scheduled Action, etc.) → opens that item as its own **top-level tab**, not nested inside "Configs".
- `Records` (`All Records` + `Records Map`), a Workflow's `Rules` list, and `Configs` (and its 5 sub-tabs) all stay exactly as browsable entry points — they just stop being *containers* for what you open from them.

**Two entry flows, both must work:**
1. **Via the list** — open `Records` → click a row/node → opens as an *additional* top-level tab next to `Records` (which stays open, unchanged, still browsable). Click another row → another additional tab. `Records` never closes or gets replaced.
2. **Direct entry** (⌘K, a quick-link from a Task, Studio app's Recent list, a notification) — opens *only* that item's own top-level tab. `Records` (or the equivalent list tab) does **not** auto-open as a side effect.

**Clutter, solved by grouping instead of containment (v7, final model):**

The original v6 framing here was app-level color grouping (cluster tabs by parent app, divider between apps). That's moot — a session is **one app at a time** (§2.10: a Task is app-scoped, and you're inside one app's tab), so every tab in the strip already belongs to the same app; there's nothing to distinguish by app color. The only grouping that does real work is **parent-object → its items**, and it applies differently to the two kinds of things in the strip:

- **Category containers (Records, Configs) — always grouped.** `Records` opens as a group tab with its record items clustered after it; `Configs` the same with its items. The group tab is a real, persistent container (it's a category), so it's present whether or not items are open.
- **Workflows — individual tabs, grouping is emergent.** A Workflow is *not* under a "Workflows" umbrella group (that umbrella is dropped — browse-all-workflows lives in the Studio app's category grid, not the strip). Each open workflow is its own individual top-level tab. A workflow tab only *becomes* a group-anchor when a rule is opened from it: at that point the workflow clusters with its rule item(s) — the workflow tab + its open rules read as one connected group (shared underline, adjacency, group-edge corner rounding per Prompt AC). A workflow with no open rules stays a plain lone tab — no group chrome. Close its last rule → it's a lone tab again.
- Why the asymmetry is right: Records/Configs are *categories* (a container that exists independent of what's inside), so they anchor a group by nature. A Workflow is an *object*, not a category — it earns a group only when it actually has children (rules) open under it. Grouping appears exactly when there's a live parent-child relationship to show, and not before.
- **Parent-workflow context still lives in the rule's content too:** the Rule Editor tab carries a small breadcrumb — `Subcontractor Form / Rules / set_name_and_complete` — at the top of its own content (reusing the Task/§3 and Settings-record/§4 breadcrumb). Belt-and-suspenders with the strip grouping: the cluster shows which workflow at a glance, the breadcrumb confirms it inside.
- **Tasks** open in-place, never as a top-level tab (§3) — they don't participate in this strip grouping at all.
- **Grouped tabs read as one connected strip, not separate pills (v7, new):** every tab within a group — hovered or selected, first, middle, or last — shares the same hover background treatment and sizing/padding as any other tab in that group, not just the first one. Corner rounding follows the group boundary, not each individual tab: a tab in the middle of a group has square (flat) corners on the sides touching its neighbors, and only the tabs at the group's outer edges (leftmost/rightmost) get rounded corners. This is what makes the group read as one continuous connected unit rather than a row of individually rounded pills with gaps.

### Status

Supersedes the "individual objects nest at Level-2/3, never top-level" ruling in §2.7 and §2.8's "What we tried and reverted" conclusion. The nesting primitive itself (pinned Level-2 views like `Preview/Rules/JSON`, `Attributes/Screen Layout/JSON`) is untouched — only the rule that *individually-opened items* must nest is reverted.

### Workflow page — Preview canvas + Rules right panel + JSON bottom panel (v7, replaces exclusive Preview/Rules/JSON sub-tabs)

The old model was three mutually-exclusive sub-tabs (`Preview | Rules | JSON`) — you could only see one at a time. That broke the most common real need: seeing a rule (or the JSON) *against* the live form Preview at the same time. Now that heavy rule **editing** moved out to its own top-level tab (§2.9 grouping — a rule opens as a tab clustered with its workflow), the workflow page's own job shrinks to **view/inspect**, which unlocks a better layout. Built incrementally (AK step 1–4: empty companion shell → Rules list into it → Rules/JSON toggle → remove old sub-tabs), then the JSON half was split out to its own region after the toggle-in-one-panel proved too cramped for wide JSON.

**Final layout — a page top bar + three regions inside the workflow content:**
```
┌─────────────────────────────────────────────┐
│  Subcontractor Form        [Rules·3] [JSON]  │  ← page top bar
├──────────────────────┬──────────────────────┤
│  Preview             │                       │
│  ──────────────────  │        Rules          │
│  JSON (bottom panel) │                       │
└──────────────────────┴──────────────────────┘
```
- **Page top bar** — the workflow name on the left; two toggle icons on the right, `Rules · N` and `JSON`. This is the single, unified trigger location for both panels (replacing two mismatched collapsed affordances — a vertical Rules strip and a bottom JSON handle — that were hard to make legible/consistent). It also gives the workflow name a home on the page (previously only in the tab). Each icon shows an active/highlighted state when its panel is open; closed = inactive icon, no leftover strip or handle.
- **Preview** = the primary canvas, always present, top-left. Owns the working space; the form/steps builder needs the room.
- **Rules** = a panel on the **right**, full height, toggled by the top bar's `Rules · N` icon. Compact list only (`All rules · N`, warnings/unused, `+ Add`, search) — *not* an editing surface; clicking a rule (`↗`) opens that rule's own top-level tab (the full When/Conditions/Actions editor, §2.9).
- **JSON** = a **bottom panel** docked under Preview (not in the right panel — wide JSON was clipped in a narrow side slot), toggled by the top bar's `JSON` icon. When open, its own header carries: `⤢`/`⤡` fullscreen-toggle (expand up over Preview ↔ restore to default height, icon reflects state) and `×` close. JSON as read/inspect, next to the live Preview instead of a screen you switch away to.
- Net: no more exclusive Preview/Rules/JSON switching, and no collapsed strips/handles; Preview never disappears; both panels are toggled from one top bar. All combinations reachable: Preview alone, Preview + Rules, Preview + JSON, all three, or JSON fullscreen.

*(The rule **editor** page itself — the full-width top-level tab — has its own separate open issues: validation error placement, nested-condition-builder readability, section density. Tracked separately, not part of this workflow-page layout change.)*

---

## 2.10. Task Management — Task is app-scoped, not cross-app (v6, new)

### Resolves an open question from I_model_comparison.md

I doc's item #5 asked whether an env view is per-env or per-app-per-env, and left "All tasks" placement (rail modal vs tab vs Overview sub-tab) unresolved. Both settle from one underlying fact confirmed against the shipped reference: **a Task is a working copy of one app** — not a cross-app changeset. Everything the shipped reference does (Task Overview, Sandbox, Tests, env switching, Settings, Overrides, "All tasks") operates within the context of a single app.

### Where Task Management lives

- **Not** the Studio Dashboard's category filter row (Workflows/Records/Connectors/Configs) — that row is for cross-app browsable object types; Task isn't cross-app, so it doesn't belong there.
- **Not** a global modal (the shipped reference's "All tasks" is a modal) — a modal would block the AI panel, which is meant to stay usable alongside whatever the user is browsing.
- **Not** a new floating drawer/panel mechanism — would add a third UI paradigm (modal / drawer / tab) alongside ones we already have reasons for.
- **Is** the app's own `Tasks` sub-tab (§4) — since Task is scoped to exactly one app, the existing per-app sub-tab mechanism already fits without inventing anything new. `Tasks` stops being an empty placeholder and becomes the real management surface:
  - Search by title, `+ New Task` button.
  - Filter pills: `My tasks / Assigned reviews / All`, plus field filters (e.g. `Created by is ...`) with `Clear filters`.
  - Table: `Title | Stage | Created by`, current/active task marked with a `current` badge.
- Opening an individual task from that list → **(v7, revised — see §3)** swaps the app tab's own canvas into the Task's full view, in place. No longer a new top-level tab.

### New Task creation

- Modal (not a tab, not a drawer) — a one-off creation action, not a browsing session, so blocking briefly is fine.
- Fields: title, description. Note: *"This creates a working copy from [env]. Your changes are applied there first, then promoted to higher environment."*
- Alt path: `Create a hotfix instead` — for urgent fixes (ties to I doc's item #6, still otherwise open).

### Env switcher doubles as the branch/Task switcher (v6, refined)

Confirmed against the shipped product's own ground truth (`A_current_state_map.md` §6): the real Env + Draft switcher is **one combined dropdown** — `ENVIRONMENTS: Development (46) | QA | Pre-Live | Live` with `DRAFTS: MY DRAFTS · TEAM DRAFTS · + Create new draft · SWITCH →` underneath. Env and branch-switching were never two separate mechanisms there — we shouldn't invent a split that doesn't exist in the model we're aligning to.

This resolves into three distinct affordances, each already mapped to an existing piece of our system — no new UI mechanism needed for any of them:

| Affordance | Shipped reference | Our system |
|---|---|---|
| **Trigger / switch** — which branch am I working in right now | "Switch to Environment" rail icon | Env chip (`● Development ▾`) — expands to `Development / QA / Pre-Live / Live`; selecting `Development` also lists your active Tasks/branches there (mirrors `MY DRAFTS`/`TEAM DRAFTS`/`SWITCH`) so switching env and switching branch happen in the same control |
| **Administer** — browse/find/review any Task regardless of env | "All tasks" rail icon | `Tasks` sub-tab (§4) — full search/filter/table, not scoped to just Development |
| **Create** — start a new Task | "New task" rail icon (pen) | `+ New Task` modal, reachable from *both* the env-chip dropdown (quick create while switching) and the `Tasks` sub-tab (create while browsing) — two entry points, one modal, consistent with the two-entry-flow pattern already used for T25 |

The Task ID's own env prefix (`DEV-6004`, confirmed in the shipped reference's Task Overview breadcrumb `DEV-6004 → Development`) is further evidence a Task/draft lives inside a specific environment — reinforcing that env-switching and branch-switching are the same action, not two.

Switching env still re-scopes the current app tab's content for browsing (resolves I doc's item #5): a non-Development env shows a `Review this environment` banner (Settings/Overrides editable and deployable directly, `Create hotfix` for urgent fixes) and, if there are unpromoted changes, a banner offering `Promote to [next env]`. Non-Development envs are read-only for direct edits — reflected in the status bar.

### Switcher enriched with the current task's context, no separate tooltip (v7, new)

The shipped reference shows a separate hover tooltip on the bottom bar's task name (`New` → `DEV-5664 · Needs update` / `Task` / `Target: Development` / `Owner: CC`) *in addition to* its own task switcher — two mechanisms doing related jobs. Combined into one instead: the active task's row inside the env/task switcher dropdown (the same combined dropdown from the table above) is enriched with this context directly — ID, status, target env, owner — rather than adding a second hover-tooltip mechanism alongside it. Other listed tasks in the same dropdown stay simple (title + stage only, matching the Tasks table), since that level of detail only matters for the one you're actively in.

### Still open (not resolved this pass)

- Promotion-as-entity (I doc #3) — whether promoting bundles multiple tasks into its own tab-entity, or stays a button.
- Version history / rollback (I doc #4) — not designed yet.
- Hotfix gating (I doc #6) — who can create one.

---

## 3. Task detail — in-place panel within the app tab, not a new tab (v7, revised)

### Why Task is the one exception to §2.9

§2.9 reverted Records/Rules/Configs to top-level tabs because the client needs to compare those objects side-by-side — a record from one app next to a rule from another, open at once. Task doesn't share that need: it isn't a peer object being compared against another Task in the same frame, it's the *container* — the branch/scope that changes to those peer objects live inside. Giving it a top-level tab makes it compete visually with the objects it contains. So Task reverses back to a single-slot, in-place view; Records/Rules/Configs are unaffected and keep §2.9's top-level-tab model exactly as-is.

### Model

- **Identity line and tab row are pinned to a fixed position**, directly under the top chrome — a single-line identity row, then the tab row immediately beneath it, always in that order, at the same height, regardless of what renders below:
  - **App level:** the identity line is just the app name (`Mayo Client App`, plain, muted — no back affordance, nothing to return to from here). The tab row beneath it is `Summary/Insights/Activity/Tasks ⏐ Settings/Overrides` (§4).
  - **Task level:** the identity line becomes a breadcrumb — `← Mayo Client App / Reorder External Party fields` — with `←` as its own click target (→ returns to the app's `Tasks` sub-tab) and `Mayo Client App` as a second, independent click target (→ returns to `Summary`); the Task's own name is the current, non-clickable segment. The tab row beneath it becomes `Workspace / Overview / Changes / Tests` (v7, `Workspace` restored as the leftmost tab and the default landing — see "Workspace restored" below).
- **Everything else is tab content, not a separate header zone** — no variable-height block sits between the identity line and the tab row, so the tab row never shifts position between states:
  - At the app level, each of `Summary/Insights/Activity/Tasks/Settings/Overrides` supplies its own content top to bottom. Only `Summary` happens to open with a heading (`Mayo Client App` / `App overview`) — others (e.g. `Tasks`, which opens straight into the search bar + table) don't repeat it.
  - At the Task level, the chip row (`TASK #461` + stage) + title + owner/reviewer/created/touches metadata sits once, shared across all four of `Workspace / Overview / Changes / Tests` — same object, same actions regardless of which view is open, only the content beneath switches. **`Promote/Deploy` sits flush right on the tab row itself** (`Workspace | Overview | Changes | Tests` ................. `Promote → QA`), same move already made for `+ Add` on Settings/Overrides categories (§4) — the page's primary action shares the tab row instead of owning a separate row. The chip row keeps `TASK #461` + stage with nothing to its right; no information is lost since the full stage stepper is already visible in `Overview`'s `Lifecycle` section below.
    - **Workspace** (v7, restored — see below) — search bar (`Search workflows, records, and sections in this task…`) + the app's object categories scoped to this Task's branch: `Workflows` (Create empty workflow / Import from JSON), `Records` (Records Map), `Scheduled Actions`, `Badges`, `Workflow Prepopulation Configs`, `Step Copy Configurations`, `Object Selection Configs` — same list structure as the Studio app's own category grid (§2, item 3), just scoped to one Task's changes instead of the whole app.
    - **Overview** — Stage progress (`Draft → Review → Development → QA → Pre-Live → Live`) · Created by · Reviewers (+Add) · Change Log (AI-generated on move to review) · Discussion thread.
    - **Changes** — diff view against the target branch (empty state: *"No changes to review — this change request has no diff against the target branch"*).
    - **Tests** — Scenarios list, search, `Run all scenarios`, `This branch only` toggle + Filters.
    
    This mirrors how a Workflow's own header already stays constant across its `Preview/Rules/JSON` views.

### Workspace restored as a fourth tab (v7, reverses this section's earlier "Workspace dropped" note)

v6 dropped `Workspace`, reasoning that "working on the task" already happens via the app's own top-level Workflow/Record tabs (§2.9), so a dedicated per-task browsing screen was redundant. Checked directly against the shipped reference and that turned out wrong: the reference treats `Workspace` (the object browser above) and `Task Overview` (`Overview/Changes/Tests`) as genuinely distinct modes, connected by a "Task Overview" button — not the same screen. The distinction that makes both worth keeping: `Workspace` is the *building* mode (actively working — browsing and jumping into the objects this task touches), `Overview` is the *review* mode (stage, reviewers, discussion, diff, tests — everything relevant once you're ready to move the task along toward deploy). Same relationship as a repo's file browser vs. its Pull Request page — related, but not redundant.

Rather than copy the reference's separate-screen-plus-button mechanic (which would introduce a second navigation pattern alongside the fixed tab row this whole model is built on), `Workspace` is added back as a fourth tab, leftmost in the row, and becomes the **default tab a Task opens into** — matching the reference's own default landing. `Overview/Changes/Tests` are unchanged in content; only their position shifts one slot right to make room.

### Switch-to-current CTA in the Task header (v7, new)

Opening a Task (viewing it) and making it the current active working branch are two separate actions (same split as the Tasks list, §4). The header carries the switch action: a fixed-width `Switch task` button in the chip row (next to `Promote`, secondary weight so it doesn't compete with the primary Promote action). **Constant width across all three states; only the leading icon swaps** — `⇄ Switch task` (idle) → `⟳ Switch task` (loading, spinner replaces the icon while the branch re-scope runs) → `✓ Current task` (disabled/info style, same width, no action). No text reflow or size change between states. This mirrors the list's leading radio: same two states (is-current / switch-to-current), just surfaced as a header button on the detail page instead of a row indicator.

**Single source of truth across all three surfaces (v7, critical):** the list's filled radio (§4), this header CTA, and the bottom bar's active-task label (§2.6 item 6) all reflect *one* "current task" value. Switching from any one of them updates the other two immediately — click a radio in the list → the bottom bar's task name changes and the previously-current row's radio empties; switch from the header → the list radio and bottom bar follow. They can never disagree (the build currently shows a mismatch — list radio on one task, bottom bar naming another — which is the bug this rule closes).
- (Three layouts were tried before landing here: a standalone `← Back` row above the header, which rendered with an undefined background; `←` folded into the sub-tab row via a divider, which risked reading as a fourth tab; and title-before-tabs, which fixed both problems but left the tab row's vertical position dependent on how tall that particular header happened to be — visibly lower for a Task than for the App. Pinning the identity line + tab row to a fixed slot and treating the title as tab content removes that last inconsistency: the tab row sits at the same position in every state.)
- A Task never opens as a top-level tab. Opening one — from any entry point — replaces the current app tab's own canvas with this structure.
- The parent app's own tab identity (icon + name, e.g. "Mayo Client App") stays fully expanded and visually active the entire time a Task view is showing — it must never collapse to an icon-only state. Active should read as *more* visible, not less; an active tab that shrinks to a bare icon reads as though navigation left the app, which contradicts the model (the user never left the app tab, only its canvas swapped).
- **AI panel is unaffected** — still the first-class right column of the app tab, still switches to **Review** state while a Task is active (§5). Only the main canvas swaps; AI placement doesn't move.
- If a Task view is already showing and a *different* Task is opened (e.g. a Notification link to Task #483 while #461 is on screen), it swaps directly — no detour through the breadcrumb first.

### Entry points to a Task (same five, new behavior)

- **Overview → Open Tasks** section → click a row
- **Studio app → Open Tasks** section → click a row
- **⌘K** → search by number or name → Enter
- **Recent Activity** → click any `Task #461` reference
- **Notifications** → click the Task link

All five now converge on the same in-place swap instead of opening a tab. If the entry point lives outside the Task's own app (e.g. a Dashboard-level notification), it first focuses/opens that app's own tab, then performs the swap — consistent with Task being app-scoped (§2.10). No dropdowns, no dual-behavior pills, no context switches.

### Management actions (revised)

- **Leave a Task view** → click `←` in the breadcrumb (no tab `×` — there's no tab to close).
- **Copy link / share** → `⋯` icon beside the Promote button, in the shared Task header.
- **Switch between Tasks** → `←` back to the `Tasks` list, then click a different row. No `⌘⇧←/→` cycling — Tasks no longer have tabs to cycle between.

Each action still has one place and one behavior.

### Trade-off accepted

Two Tasks can no longer sit open side-by-side the way two Records or two Rules can — this model is single-slot by design. Not a gap the client has raised: the same reasoning that makes Task the exception (container/scope, not a peer object) is why giving up side-by-side comparison here is acceptable, unlike when the equivalent nesting was tried on Records (§2.8, reverted).

---

## 4. Overview sub-tabs — Summary / Insights / Activity / Tasks / Settings / Overrides (v6, expanded; v7 position + table detail)

Same pattern as workflow's `Preview / Rules / JSON` — alternative views of one object (the app), not separate tabs at the browser level. Row: `Summary | Insights | Activity | Tasks` clustered left, `Settings | Overrides` pushed to the row's right edge by a flexible spacer — grouping the "monitor" tabs apart from the "config" tabs through whitespace alone, not a divider glyph. (v7, revised: the original spec used a single thin vertical divider between `Tasks` and `Settings`; building it produced a divider on *both* sides of `Tasks`, isolating it as its own group instead of clustering it with `Summary/Insights/Activity`. Rather than just fixing the stray divider, the divider approach itself is dropped — a right-aligned group reads as "these are a different category" without adding any line element, and avoids reopening §2.7's settled "no icons on Level-2 sub-tabs" decision, which an icon-based fix would have risked.) Per §3's v7 revision, this row sits directly beneath the single-line `Mayo Client App` identity line, in the same fixed slot the `Overview/Changes/Tests` row occupies when a Task is open — the app's own `Mayo Client App` / `App overview` heading is `Summary`'s own tab content, not a separate zone above this row.

| Sub-tab | Purpose | Content |
|---|---|---|
| **Summary** | Day-to-day glance | Stats (Workflows / Open Tasks / CRs pending review — kept distinct, v6: not a duplicate, CRs are separate per-env sub-entities / Drafts) · Pipeline · Open Tasks (top 5) · Recent activity (top 5) |
| **Insights** | Situation room | People · Health · Environments · Proactive suggestions with inline actions |
| **Activity** | Timeline archive | Filterable feed (Tasks / Deploys / Comments / AI runs) with search + Load more |
| **Tasks** (v6: real content, was a placeholder; v7: table enriched) | Task Management for this app | See §2.10 — search, `+ New Task`, filter pills (`My tasks/Assigned reviews/All`), table (`Title/Stage/Created by`). **v7 additions:** row hover reveals `Copy / Archive` — **not** `Edit` (dropped: built first alongside the other two, then cut — the row click already opens the Task, which is where editing happens; a separate `Edit` icon duplicated that same action) and **not** "Duplicate" (naming corrected — the shipped reference's own rail UI calls this action `Copy` too, e.g. "Copy hotfix to Pre-Live," and our own build's tooltip already read `Copy task`; "Duplicate" was never actually the right label). `Copy` opens the existing `+ New Task` modal pre-filled with the source task's title/description (e.g. `Reorder External Party fields (copy)`), so the user can adjust before creating — not a silent clone. The modal's `Create a hotfix instead →` footer link (§2.10's "New Task creation" alt path) is hidden when entered via `Copy` — that link exists to resolve ambiguity when starting from a blank `+ New Task`, and there's no such ambiguity when copying a specific, already-typed task. Everything else in the modal (title, pre-filled fields, `Cancel`/`Create task`) stays the same regardless of entry point. `Stage` renders as a risk-scaled colored badge instead of plain text, reusing the env chip's color mapping; a `Hotfix` badge marks tasks created via the hotfix path. **Switch-to-current: one fixed-size CTA per row (v7, revised from the leading-radio idea).** A single button in the row's action area conveys both state and action — no separate leading dot/radio (that would be redundant with the button's own Current state). It holds a **constant width across all states; only the leading icon swaps** (no text reflow): `⇄ Switch` (idle) → `⟳ Switch` (loading — spinner replaces the switch icon, same width) → `✓ Current` (disabled/info style, same width). Behavior: the current task's row always shows the disabled `✓ Current` button; every other row reveals `⇄ Switch` on hover (alongside Copy/Archive); clicking it swaps the icon to a spinner while the branch re-scope runs (switching re-scopes the whole app and takes real time — the loading state is why this is a button, not a radio), then on completion that row becomes `✓ Current` and the bottom bar updates (single source of truth, §3). Replaces the old standalone `Current` badge. Row click (outside the button) still opens the task (§3) |
| **Settings** (v6, new; v7: master-detail dropped) | App-scoped config | List of setting categories (Business Units, Regions, Roles, Workflow Kind Policies, Record/Workflow Statuses, Email Templates, Integration Tokens, User Groups, Indicator Rules, etc.), full content width, no side-by-side detail pane |
| **Overrides** (v6, new; v7: master-detail dropped) | App-scoped per-env exceptions | List of override types (Notification templates, Integration configs, Integration tokens), full content width, no side-by-side detail pane |

### Settings/Overrides categories — left category rail (v7.1, supersedes the sub-tab-row below)

> **⚠️ Superseded within v7.** The Level-2 sub-tab-row model described just below was built, then reversed once the real category count landed: the shipped reference has **~18 Settings categories** (Business Units, Regions, Roles, Adjudication Options, Role Group Configs, Workflow Kind Policies, Config Translations, Record Statuses, Workflow Statuses, Comment Flag Options, Email Attachments, Email Templates, Pre-defined Options, Integration Tokens, Context Templates, Integration Configs, User Groups, Indicator Rules) — a horizontal sub-tab row can't hold that many. Settings (and Overrides, for consistency) now use a **left category rail + detail** inside the sub-tab's content area — the standard settings pattern, scales to 18+.
>
> Placement: the rail lives *inside* the Settings content area (to the right of the global AI panel), styled as Settings' own internal nav — subtle/contained, not a second global chrome bar competing with the AI panel. Hierarchy: `AI panel (global) → [Settings = category rail + detail]`.
>
> Per-category content: title · `In-App / All` count tabs (e.g. `In-App 9 · All 249`) · search · `+ Add` · a type-appropriate table (colored status dots for Record/Workflow Statuses; Tag/Description/Options for Pre-defined Options; etc.) · per-row actions (promote/deploy cloud icon, edit, delete).
>
> Rich detail editors: e.g. Email Templates opens a full edit form (Slug read-only, Display title, Subject, HTML body Source/Preview, Plain text fallback, From name/email) with **per-field environment overrides** (a popover listing QA/Pre-Live/Live override inputs + "general override set" note + separate Save) — the same per-env override concept as the Overrides tab.
>
> The breadcrumb-swap for individual records (§4 / Prompt N) still applies: clicking a row opens that record in-place with a breadcrumb, not a top-level tab.

### Settings/Overrides categories — Level-2 sub-tab row, matching Configs (v7, revised)

Master-detail (sidebar + side-by-side detail pane) is dropped — building it produced a narrow fixed-width list with a large unused gap where the detail pane would sit. A breadcrumb-and-swap mechanic (reusing §3's Task pattern) was considered next and also dropped: `Settings`/`Overrides` categories are a small, fixed, enumerable set — structurally the same as `Configs`' own categories (§2.8: `Badges · Scheduled Actions · Workflow Prepopulation · Step Copy · Object Selection`), not a dynamic object you drill into. Reusing a breadcrumb here would solve an already-solved problem with a second mechanism.

**Model:** a Level-2 sub-tab row appears directly below the main `Summary/Insights/Activity/Tasks⏐Settings/Overrides` row, exactly like `Configs`:
- `Settings` active → sub-tab row = `Business Units | Roles | Adjudication Options | Notifications` (etc.), first category selected by default, content beneath is that category's own table (e.g. `Name / Code / Regions` + `Add` for Business Units), full content width.
- `Overrides` active → sub-tab row = `Notification templates | Integration configs | Integration tokens`, same behavior.
- Switching categories is one click on the sub-tab row — no breadcrumb, no list-then-drill-in step.
- **An individual row *inside* a category's table (e.g. one specific Integration Token) does *not* open as a top-level tab** (v7, corrected — this section originally said it should, matching Configs items per §2.9; built and reviewed, then reversed). It follows the same breadcrumb-and-swap mechanic as Task (§3) instead: the identity line becomes `← Mayo Client App / Integration tokens / CI deploy token`, the parent app's tab stays expanded and active exactly as it does for Task, and the content swaps to that record's own detail. Reasoning: a single token/business unit/role isn't a peer object the client needs open side-by-side with another one of its kind (unlike Records/Rules, which is why §2.9 exists) — comparison across environments already happens inside the category's own table (e.g. Dev and Live tokens listed together), not by opening two tabs. This extends the same exception Task already carved out — administrative, scoped records don't need §2.9's top-level-tab treatment, only genuinely comparable peer objects do.
- **No redundant name field inside the record's own detail card.** Built first with the record's name repeated as the first field inside its detail card (e.g. `North America`'s card leading with `Name: North America`, or `CI deploy token`'s card leading with `Token name: CI deploy token`) — triple-redundant, since the same string already appears as the breadcrumb's current segment and as the page's own title directly above the card. The name/title field is dropped from the card; it starts with the next genuinely distinct field (`Code`, `Regions` for a Business Unit; `Environment`, `Last rotated` for a token).
- The boxed-card-with-chevron list built first read as a mobile settings screen and is dropped along with the master-detail/breadcrumb ideas — there's no list to click into anymore, since the sub-tab row makes every category one click away already.
- **Record detail card uses full content width**, same rule already applied to the category table and the Tasks table — a record's detail card was built first in a narrow fixed column with dead space beside it, same class of issue as the earlier category-list width bug, and gets the same fix.

**Visual weight of the category row:** stacking two full-size underline-tab rows directly on top of each other (the main `Summary/Insights/.../Settings/Overrides` row, then the category row) reads as ambiguous hierarchy — both look like peers. The fix is *not* to switch the category row to the pill/chip style used by `Activity`'s filters (`All | Changes | Deploys | Comments | AI runs`) or `Tasks`' filter pills (`My tasks/Assigned reviews/All`) — that style specifically means "filter on one shared list," which doesn't apply here (each category is distinct content, not a filtered view of one dataset — same reasoning that keeps `Configs`' sub-tabs on the underline style per §2.7). Instead, the category row keeps the underline mechanic but at reduced visual weight: smaller text (12px vs. the main row's 14px) and a muted background band beneath it, distinct from the plain white main row — signals "one level down" without borrowing filter-pill semantics that would misrepresent what the row does. (A first build pass rendered the category row as filled/bordered segmented buttons instead — corrected back to the underline mechanic; a solid-fill pill reads as the same "closeable dynamic item" language reserved elsewhere in the system, which these categories are not.)

**`+ Add` position:** sits flush right on the *same row* as the category tabs, not on a separate heading row beneath them. An earlier pass repeated the active category's name as its own heading (`Business Units` in large text, directly under a `Business Units` tab already shown as active) with `+ Add` beside it — redundant, and it costs an extra row. Dropping that heading row and placing `+ Add` at the tab row's height removes the repetition and tightens the layout; the table's own column header (`NAME / CODE / REGIONS`) is the next thing after the tabs.

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
| **Detail access pattern** | ✓ Resolved (v2) | Tab (with AI as first-class right column) — applies to Records/Rules/Configs objects; Task is the exception, see below |
| **Chrome minimalism** | ✓ Resolved (v2) | Sidebar + rail removed; Studio app is the entry point |
| **Task tab AI state name** | ✓ Resolved (v3) | **Review** — chips: Summarize diff · Suggest reviewers · Check compliance risks |
| **App identity in chrome** | ✓ Resolved (v3) | App name IS the leftmost tab; no duplication in topbar |
| **Task detail — single tab vs two tabs** | ✓ Resolved (v5) | Single tab, `Workspace / Overview / Changes` as Level-2 sub-tabs — absorbs shipped product's 2-tab content without breaking "one object = one tab". See §3 |
| **Object categories** (Records, Badges, Scheduled Actions, config-types) | ✓ Resolved (v5) | Records → "Records" tab, `All Records` pinned + records nested at Level-2, Map as sibling (reverted from per-record Level-1 tabs after testing showed proliferation). Config-types consolidate under "Configs" tab, same nesting primitive. See §2.8 |
| **Deploy vs Promote button semantics** | Open | Shipped product uses "Deploy to Development" (verb-first) at Draft stage; our v4 uses "Promote → QA" (progression-first) universally. Decision pending. |
| **Promotion-as-entity** (env-to-env promotion with own lifecycle + Included tasks) | Open | Design directly from the PM's product walkthrough — see `I_model_comparison.md` §3 |
| **Env view page** (read-only env-scoped tab with deploy history + hotfix button) | Open | Design directly from the PM's product walkthrough — see `I_model_comparison.md` §4–§5 |
| **Hotfix flow** (direct-to-higher-env task variant) | Open | Design directly from the PM's product walkthrough — see `I_model_comparison.md` §6 |
| **Version history + rollback** (per-env deployed-versions list + Switch to version) | Open | Design directly from the PM's product walkthrough — see `I_model_comparison.md` §4 |
| **Project layer** (workspace-of-agent above Task, per PM verbal mention) | 🔴 Blocked | Interpretation unclear (agrupador vs agent workspace); needs PM confirmation — this one genuinely needs a PM answer, not a doc |
| **App switcher dropdown** — visual design | Deferred | Click `[S]` → Dashboard; from there enter any app. Explicit switcher dropdown deprioritized. |
| **Tab strip overflow behavior** | ✓ Resolved (v7) | Progressive: tabs shrink responsively as the strip fills → labels truncate with ellipsis once at min width → `⋯` overflow menu only as the last resort, when even min-width tabs can't fit. `⋯` must never appear while tabs still fit (build bug: it was showing with 3 tabs and ample space). |
| **Global notification "View all" page** | Open (post-MVP) | Panel exists; dedicated page for archive/search TBD |

---

## Artifacts

Live in **Claude Design** and **Figma** (`Studio — Navigation Explorations`, file key `Mg3plZn2b0tadSOZAP3ndX`):

- **Studio Dashboard** — adaptive by app count (3 tiers, §2.5): 1-app orgs skip it as landing entirely; 2+ renders Tier 1/2/3 content accordingly. Topbar `+ New app` dropdown (Blank / Template-based / Training), extensible list.
- **App Overview** with 3 sub-tabs (Summary / Insights / Activity) — Summary has enriched Pipeline (per-env sub-metadata + active deploy indicator), Needs your attention, Team row, Open Tasks with Live badge + reviewer designation, Recent Activity with deploy events
- **Task detail tab** — sticky header with Promote → QA button, lifecycle stepper (6 nodes: `Draft → Review → Development → QA → Pre-Live → Live`), Change Requests per env with `.cr` suffix (`CR #461 → DEV-5430.cr`, `CR #483 → QA-1207.cr`), Scope + Activity two-column
- **Env chip + ambient border** (v5) — topbar-right risk-scaled chip (Dev/QA subtle, Pre-Live/Live escalating) + 2px top border for Pre-Live/Live; floating save/sync chip bottom-right. Bottom bar removed. **Superseded (v7):** the topbar chip and floating save chip are both replaced by one dark, always-present bottom bar consolidating env + save state + active task context; the ambient top border stays, unchanged. See §2.6 item 6.
- **Rules nested tabs** (v5) — Level-2 `Preview/Rules/JSON` row with live badge count, Level-3 `All rules` pinned + dynamic rule tabs, all inside the parent workflow tab (§2.7)
- **Studio app "+ New Tab"** — plain search bar (not AI-branded) · Recent · Object categories with Create/Import icons · Open Tasks compact link · gray bg + card treatment matching Overview
- **AI state-aware content** for Discovery (Overview / Dashboard-less / Studio app) · Ready (Workflow tab without task) · Execution (Workflow with active task) · Review (Task tab)
- **Notification panel** — bell dropdown with unread events, actionable inline (Review · View · Take over), "Mark all read", "View all →" footer
- **Avatar menu** — profile / preferences / team / help / shortcuts / sign out. **v7, expanded:** also holds app-scoped actions folded in from the shipped reference's separate app-icon menu (`Edit name & description`, `What's new`, `Activity Logs`, `Sync from Admin Panel`, `Report Issue`, `Delete app`) rather than introducing a second menu trigger — grouped `App` / `Workspace` / `Account` sections, destructive actions (`Delete app`, `Sign out`) last.
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

**Open — design directly from the PM's product walkthrough, no doc to wait on (correction, July 10):**
- Promotion-as-entity (env-to-env promotion as its own task-like tab)
- Env view page (read-only, per-env, with deploy history + hotfix button)
- Hotfix flow (target-env selector on new-Task creation, "Hotfix" badge)
- Version history + rollback ("Deployed versions" modal, "Switch to version" action)

**Blocked — genuinely needs a PM answer:**
- Project layer (workspace-of-agent above Task — interpretation unclear, needs PM confirmation)

**Pending (post-model-alignment):**
1. **Sync v5 back to Notion** (`Studio: Nav Model & AI Placement`) — currently blocked on Notion MCP; will complete when reconnected.
2. **Relabel existing Change Requests page as "Tasks list"** — mostly relabel, not a rebuild.
3. **Empty state for Open Tasks** (Overview + Studio app + Dashboard).
4. **1→2 app transition nudge** — one-time callout when an org's 2nd app is created, since login behavior changes at that threshold (§2.5.1).
5. **Tab strip overflow behavior** — ✓ resolved (v7): progressive shrink → ellipsis truncation → `⋯` menu only as last resort. See Open decisions table.
6. **Global search "View all"** dedicated page — post-MVP, cross-app search results view.
7. **Notification "View all" page** — post-MVP.

---

*Owner: Chris Calviño · chris@chriscalvino.com*
*v10.1 — Env switch drops task attachment (correction to v10). Env pill and task pill unify into one visual pill in the bottom bar (env-tinted, task appended after "·" separator when active), but stay decoupled at the logic level. Env switch removes task pill; task selection reattaches without touching env. Promote/deploy from Task detail auto-snaps env to target env. Downstream systems unchanged.*
