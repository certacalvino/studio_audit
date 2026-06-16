# A. Current State Map — Certa Studio Navigation Model

> Structured outline of the navigation model as it exists today.
> 🔴 = model breaks (dead end / context loss) · 🟠 = friction (re-orientation cost) · 🟡 = latent risk
> Anchors reference real screens: *Mayo Client App*, *Subcontractor Form*, *CR #461*.

---

## 0. Mental model in one line
Studio behaves like **a web browser nested inside a web app**: a horizontal tab strip at the top owns navigation, a permanent AI chat owns the left rail, and everything else is reached by returning to an "Open existing" home screen. There is **no persistent structural navigation** (no tree, no breadcrumb, no back/forward that respects app hierarchy).

---

## 1. Top-level shell (persistent chrome)

```
Studio Shell
├── Left rail (fixed, full height)
│   └── AI Chat sidebar  ............................. always visible, every screen
│       ├── "New chat" header
│       ├── Input: "Ask about a workflow, field, or rule…"
│       └── [Plan] toggle + send
│       🔴 Occupies permanent primary-nav real estate but provides NO navigation
│       🟠 Contextually disconnected — does not know which workflow/record is open on the right
│
├── Top bar (fixed)
│   ├── Environment switcher  [Development ▾]  ........ 4 tiers: Dev / QA / Pre-Live / Live
│   │   🟡 Risk tier (Live) communicated only by a small green dot — weak signal
│   ├── Draft picker  [Testing Ch ▾]  ................. current working draft/branch
│   │   🟠 Naming ("Testing Ch") is freeform/cryptic; no clear relation to environments
│   ├── ▶ Play button
│   ├── ⑂ Fork / Change Requests icon
│   ├── [Create Change Request] CTA
│   └── ⋮ kebab menu
│   🟠 6 unrelated controls share one bar with no grouping or action hierarchy
│
├── Tab strip (fixed, horizontal)
│   └── [ Subcontractor Form | Rules | JSON | + New Tab ]
│       🔴 Flat tab list — no indication these tabs belong to ONE workflow inside ONE app
│       🔴 No overflow handling defined for 8+ tabs (see §3)
│       🟠 "Rules" / "JSON" are *views of the same object* but look like sibling destinations
│
└── Main canvas (everything else renders here)
```

---

## 2. App-level navigation

```
App List  (453 apps)
│   🔴 Flat list — no search, filter, folders, grouping, or favorites in main view
│   🟠 At 453 items, locating "Mayo Client App" is pure scroll/scan
│
└── Mayo Client App  (selected)
    │   🔴 No breadcrumb or header anchor confirming "you are inside Mayo Client App"
    │
    └── "Open existing" panel  ........................ the de-facto app home
        │   🟠 Flat scroll mixing different object classes (workflows + records + configs)
        │   🟡 Workflow vs Record differentiated only by icon, not grouped by section
        │
        ├── Workflows  (icon-tagged, not section-grouped)
        │   ├── Subcontractor Form
        │   ├── OIS Device Details
        │   ├── OIS Manufacturer & Firmware
        │   ├── Device Scoping Details
        │   ├── External Party Onboarding
        │   ├── Initiate Engagement
        │   ├── Escalation
        │   ├── Initiate Tasks
        │   ├── Update Engagement
        │   ├── Initiate Contract
        │   ├── TAP Release
        │   ├── Risk Remediation
        │   ├── Off-Hold / On-Hold Engagement
        │   ├── Offboarding Data / Annual Attestation
        │   ├── Initiate Offboarding / Monitoring
        │   ├── Offshore Work Form
        │   └── …others
        ├── Records  (6 types)
        │   ├── External Party
        │   ├── Contracts External Party
        │   ├── Mayo Internal Party
        │   ├── Engagement
        │   ├── Monitoring
        │   └── Contracts Engagement
        │       🟠 67+ attributes each, no visible grouping/sectioning of attributes
        ├── Scheduled Actions
        ├── Badges
        ├── Workflow Prepopulation Configs
        ├── Step Copy Configurations
        └── Object Selection Configs
            🔴 Configs share the flat scroll with workflows/records — no IA separation
```

**Critical break:** To move from *Subcontractor Form* to *Initiate Engagement*, the user must abandon the current tab context, return to "Open existing," scroll/scan, and re-select. 🔴 **There is no workflow-to-workflow lateral navigation.**

---

## 3. Tab interaction model (what triggers / replaces / opens inline)

```
Trigger                              → Result
────────────────────────────────────────────────────────────────
Select workflow from "Open existing" → opens workflow as a TAB (e.g. "Subcontractor Form")
Open Rules view                      → opens "Rules" as a SIBLING tab (same object, new tab)
Open JSON view                       → opens "JSON" as a SIBLING tab (same object, new tab)
Open builder                         → renders "Preview" tab alongside name + JSON tabs
"+ New Tab"                          → blank tab → routes back to "Open existing" home
Switch workflow                      → NO inline path; must use "Open existing" again
```

🔴 **Conflated semantics:** tabs represent *both* distinct objects (a workflow) *and* views of one object (Rules/JSON/Preview). The user cannot tell from the tab strip what is an object vs a lens on that object.
🔴 **Overflow undefined:** behavior at 8+ tabs (scroll, collapse, dropdown?) is not specified — likely horizontal crowding.
🟠 **No tab persistence cues:** unsaved JSON vs saved state not surfaced on the tab itself.

---

## 4. Workflow Builder internal navigation

```
Workflow (e.g. Subcontractor Form)
├── Tab: [Subcontractor Form]  (name/overview)
├── Tab: [Preview]   ............................. builder canvas
│   ├── Left:  RECORD DETAILS panel  + collapse arrow
│   ├── Center: TASKS swimlane area
│   │   └── Empty state: "No tasks configured + Add Swimlane"
│   │       🟠 Empty state affordance unclear — "Swimlane" jargon, weak guidance
│   ├── Step list (left)
│   │   └── Subcontractor Form > Subcontractor Details > Untitled Step
│   │       🟡 "Untitled Step" — no forced naming → orphaned/ambiguous steps
│   └── Right: Form preview (labels, inputs, radios, dropdowns, submit)
│       🔴 Unclear if Preview is ever editable or always read-only — no live-edit affordance
│       🔴 Field-level ops (reorder / duplicate / conditional show) not visible in UI
└── Tab: [JSON]  ................................ raw editor
    ├── Line numbers + Save button
    ├── 🔴 red dot = 1 error · 🟠 orange dot = 1 warning  (counts only, no jump-to)
    └── 🔴 No visual diff / change tracking inside the builder
```

**Context-switch cost:** Editing a field's logic means leaving the visual Preview tab and switching to the JSON tab — a full context swap with no side-by-side, no two-way sync cue, and no indication of *where* in the JSON the field lives. 🟠🟠

---

## 5. Records navigation

```
Records (within Mayo Client App)
└── [Record type]  → opens as a tab (same flat tab model as workflows)
    └── 67+ attributes
        🔴 No attribute grouping, search, or sub-navigation within a record
        🟠 Long flat scroll; same break as App List but at the attribute level
```

---

## 6. Change Requests navigation

```
Top bar ⑂ icon → Change Requests
├── Tabs: [All] [Needs Review] [Approved] [My Drafts] [Team Drafts]
├── CR list rows
│   └── CR #461 "Add Update Engagement Copy workflow and update record types"
│       ├── author avatar (SP/YS/SH/HS/RV/SA/NE)
│       ├── branch source → target (Development)
│       ├── timestamp + status (Needs Review / Approved)
│       ├── AI Summary  (prose)
│       ├── Changes by entity (workflow / record type / status / kind settings)
│       ├── Impact (Low Risk / Overview)
│       └── "No reviewers yet"
│           🔴 Approval model unclear — blocking or advisory? No checklist/required reviewers
│           🔴 No inline/line-level diff — only prose summary
│           🟠 Pipeline Draft→CR→Dev→QA→Pre-Live→Live is NOT visualized anywhere
└── 🔴 CR system is globally entered from top bar, fully disconnected from the workflow
    the user was just editing — opening a CR loses workflow context entirely
```

---

## 7. Consolidated friction inventory

### 🔴 Dead ends / context loss
1. Workflow↔workflow switching forces a return to "Open existing" (no lateral nav).
2. No breadcrumb — App > Workflow > Step hierarchy is never displayed.
3. Tab strip conflates objects and views; no overflow strategy.
4. Entering Change Requests abandons workflow context.
5. JSON editor errors/warnings are counts only, with no jump-to and no diff.
6. App List (453) has no search/filter/grouping.

### 🟠 Context-switch / re-orientation costs
7. Preview ↔ JSON is a full tab swap, no side-by-side, no sync cue.
8. AI sidebar is permanently present yet context-blind.
9. Top bar packs 6 ungrouped controls with no action hierarchy.
10. Draft naming ("Testing Ch") is cryptic and decoupled from environments.
11. Records expose 67+ flat attributes with no grouping.
12. "Add Swimlane" empty state uses unexplained jargon.

### 🟡 Latent risks
13. Live vs Development distinguished only by a small green dot — weak risk signal.
14. "Untitled Step" allows unnamed, ambiguous steps to persist.
15. Branching pipeline (Dev→QA→Pre-Live→Live) is never visualized.

---

## 8. Summary judgment
The current model optimizes for **single-object focus** (open one thing, edit it deeply) at the direct expense of **structural orientation** (knowing where you are) and **lateral movement** (getting to the next thing). The browser-tab metaphor borrows browser *mechanics* without browser *affordances* (no address bar / URL, no reliable back, no history). The AI sidebar consumes the exact screen region a structural navigator should occupy.
