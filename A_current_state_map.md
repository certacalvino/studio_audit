# A. Current State Map — Certa Studio Navigation Model

> Structured outline of the navigation model as it exists today, verified against live screenshots
> (App List, Mayo Client App, Subcontractor Form Preview/Rules/JSON, Records, CR #461 Overview+Changes,
> Env/Draft switcher, AI Plan mode, App Overrides, App Settings).
> 🔴 = model breaks (dead end / context loss) · 🟠 = friction (re-orientation cost) · 🟡 = latent risk
> ✅ = existing pattern worth crediting / extending (per "extend existing patterns first" constraint)

---

## 0. Mental model in one line
Studio behaves like **a web browser nested inside a web app**: a horizontal tab strip owns navigation, an AI panel owns the left rail, and everything else is reached by returning to a per-app "Open existing" home. There is **no persistent, cross-context structural navigator** — except, tellingly, *inside* App Settings and App Overrides, which already use a persistent left sub-nav (✅ in-product precedent for the redesign in Section D).

---

## 1. Top-level shell (persistent chrome)

```
Studio Shell
├── Left rail (fixed, full height) — AI PANEL  ......... present on every screen
│   ├── Header: "New chat" ⇄ "New plan"  (toggles with Plan mode)
│   ├── ✅ Context-aware: shows a chip of the open object — e.g. [⤳ Subcontractor Form]
│   ├── ✅ Agentic: creates "Checkpoint created · Revert", shows "Thought & Worked · 1 step · 8.25s"
│   ├── [Plan] toggle (bottom) — switches chat→plan; send button becomes a ⊘ state
│   └── Input: "Ask about a workflow, field, or rule…" + 📎 attach
│   🔴 Powerful agent hidden behind a narrow rail that also blocks the prime nav region
│   🟠 Plan mode is unexplained/undiscoverable; no history, no suggested prompts/actions
│
├── Top bar (CONTEXTUAL — differs by location)
│   ├── On App List:   `studio | App list ……………………………… CH`   (minimal; NO env switcher)
│   └── Inside an App:  Env+Draft switcher · ☁ · ▶ Play · ⑂ · [Create Change Request] · ⋮
│       🟠 6 ungrouped controls, no action hierarchy
│       🟡 Risk of operating in Live signalled only by a small green dot
│       🔴 Environment context is absent at App-List level but dominant inside an app
│
├── Tab strip (horizontal, accumulating)
│   ├── Mixes object tabs + view tabs + app-destination tabs in one flat row
│   ├── 🔴 No de-duplication — observed two identical "Change Requests" tabs open at once
│   ├── 🔴 Conflated semantics: a workflow tab, its Preview/Rules/JSON tabs, and app-level
│   │       tabs (App Overrides, Configs, App Settings) all look like siblings
│   ├── 🟡 Identity inconsistency: workflow tab = friendly name ("Subcontractor Form");
│   │       record tab = raw TAG ("supplier_tCEpXz")
│   └── 🔴 Overflow strategy at 8+ tabs undefined; no saved/unsaved cue on tabs
│
└── Main canvas (everything else renders here)
```

---

## 2. App-level navigation & information architecture

```
App List  (Apps 453)  — route /studio/apps
│   🔴 Flat list, no search / filter / folders / sort / favorites
│   🔴 No archive/cleanup → list polluted with junk: test m1–m14, studio-2335 + STUDIO-2335
│       (case-dup), Sandbox_Test_QA_2, "check revert", a workflow literally named "New"
│   ✅ Row hover-reveals inline actions (✏️ edit / 🗑️ delete / ↗ open)
│
└── Mayo Client App  →  "Open existing" panel (de-facto app home)
    │   🔴 No breadcrumb / header anchor persists once you drill in
    │   ✅ App-level actions exist top-right: [Flow view] [Overrides] [Settings]
    │   🟠 Single long scroll with labeled sections but NO sticky/jump nav between them:
    │
    ├── Workflows  (each row: icon · name · "workflow" tag · [Preview][Rules][JSON])
    │     Subcontractor Form, OIS Device Details, OIS Manufacturer & Firmware,
    │     Device Scoping Details, Initiate Engagement (Internal/External), Other Queries,
    │     External Party Onboarding, Device/Service/Tool Details, Computer Scoping Details,
    │     Architecture Ports & Protocols, Escalation, Initiate Tasks, Update Engagement,
    │     Initiate Contract (×2), Initiate TAP Release, Risk Remediation, On/Off-Hold
    │     Engagement, Offboarding Data/Annual Attestation, Initiate Offboarding/Monitoring,
    │     Offshore Work Form, New …
    │   🔴 No lateral workflow→workflow nav (must return here & re-select)
    │
    ├── Records  ([Preview][JSON] only — NO Rules)  → "Flow view" opens a clean table
    │     ✅ Records table: NAME | TAG | ATTRIBUTES + Columns + Add record + row actions
    │     • External Party (supplier_tCEpXz) — 67 attrs
    │     • Engagement (engagement_UNWCkwrxTF) — 32
    │     • Contracts External Party — 10 · Mayo Internal Party — 9
    │     • Contracts Engagement — 7 · Monitoring — 2
    │     ✅ Attribute editor is a typed table: NAME | TYPE | REQUIRED | INDEXED + 🔒 system + Σ
    │     🟠 No attribute grouping/sections within a record (flat, even at 67 rows)
    │
    ├── Scheduled Actions → "All Scheduled Actions"
    ├── Badges → "All Badges"
    ├── Workflow Prepopulation Configs → "All …"
    ├── Step Copy Configurations → "All …"
    └── Object Selection Configs → "All …"

App-level destinations (separate tabs, reached from the app header):
├── Flow view (app-level)           — workflow graph (per app header link)
├── App Overrides  ✅ persistent left sub-nav: Notification templates / Integration configs /
│     Integration tokens — scoped to QA | Pre-Live | Live (environment-specific overrides)
│     🟡 First-class part of the multi-env model, but buried behind a header link
└── App Settings  ✅ PERSISTENT LEFT VERTICAL SUB-NAV (~18 sections):
      Business Units · Regions · Roles · Adjudication Options · Role Group Configs ·
      Workflow Kind Policies · Config Translations · Record Statuses · Workflow Statuses ·
      Comment Flag Options · Email Attachments · Email Templates · Pre-defined Options ·
      Integration Tokens · Context Templates · Integration Configs · User Groups · Indicator Rules
      ✅ Each section = searchable table (In-App / All counts, sort, Add) — strong pattern
      ➡️ This sidebar is the IN-PRODUCT PRECEDENT for the persistent navigator proposed in §D
```

**Critical break:** workflow↔workflow and section↔section navigation both require returning to "Open existing"; the rich App Settings/Overrides surfaces are only reachable via small header links and then live in throwaway tabs.

---

## 3. Tab interaction model

```
Trigger                                  → Result
──────────────────────────────────────────────────────────────────────────
Select workflow in "Open existing"       → workflow opens; launching Preview/Rules/JSON
                                            each spawns a SIBLING tab (name + view tabs)
Open a record                            → tab named by TAG (supplier_tCEpXz) + Preview tab
App header → Overrides / Settings / Flow → opens as its own top-level tab
Open a Change Request                    → "Change Request #461" tab (no dedup → can duplicate)
"+ New Tab"                              → routes back to "Open existing" home
Switch workflow                          → NO inline path; via "Open existing" again
```
🔴 Tabs represent objects, views-of-an-object, AND app destinations indistinguishably.
🔴 No dedup, no overflow handling, no dirty-state indicator.

---

## 4. Workflow Builder — three views of one object

```
Workflow (e.g. Subcontractor Form)
├── PREVIEW (builder canvas)
│   ├── Left: RECORD DETAILS (+ Link record) · TASKS (+ Add Swimlane) · collapse arrow
│   ├── Step list:  Subcontractor Form ▸ Subcontractor Details ▸ Untitled Step  (+ Add Step)
│   │     🟡 "Untitled Step" — unnamed steps persist; no forced naming
│   ├── Right: full-fidelity form render (header, info alert, inputs, radios, dropdowns, Submit)
│   │     🔴 Edit affordances at field level (reorder/duplicate/conditional) not visible
│   └── Empty state: "No tasks configured + Add Swimlane"  🟠 jargon, weak guidance
│
├── RULES (WHEN/DO automations)
│   ├── ✅ "… Rules" + Add New Rule + Search + Filters + list/graph toggle
│   ├── Rule card: WHEN [Submit Step][Subcontractor Details] → DO [Update Workflow V2]
│   └── 🟡 Rule names machine-generated (set_name_and_complete_on_submit_254d00bb)
│
└── JSON (source of truth)
    ├── "Workflow JSON" + ● 1 error + ● 1 warning + Save + expand
    ├── Tags are machine hashes (subcontractor_form_dfb1fe11, request_for_approval_header_a6abcea0)
    └── 🔴 Errors/warnings = COUNT badges + inline squiggles only — no jump-to, no in-builder diff
```
🟠🟠 Preview ↔ JSON is a full tab swap: no side-by-side, no two-way sync cue, no "where is this field in the JSON".

---

## 5. Records navigation
✅ Genuinely decent: Flow-view table → record detail = typed attribute table (TYPE/REQUIRED/INDEXED, 🔒 system attrs, Σ aggregate, Columns).
🟠 No attribute grouping/sectioning even at 67 attributes (External Party); 🟡 tab named by tag not friendly name.

---

## 6. Change Requests & branching model

```
Env + Draft switcher (single two-pane dropdown, top bar)
├── ENVIRONMENTS: Development (46) | QA | Pre-Live | Live      ← tier + draft count
└── DRAFTS: MY DRAFTS (Testing Ch ✓) · TEAM DRAFTS (author + "Xh ago") · + Create new draft · SWITCH →
    🟡 Drafts default to TIMESTAMP names ("16 Jun 16:32:46"); 46 uncurated drafts in Development
    ✅ Model is real: Environment → Draft(branch); promotion = a CR between tiers

Change Requests (top-bar ⑂)
├── Sub-tabs: Review requested · Created by me · All   ✅ + Search by title + status filter (Open)
├── List rows: avatar · title · #id · source → target · status badge · timestamp
│     #485  Development → QA · Approved          ← ✅ tier-to-tier PROMOTION is a CR
│     #461  04 Jun 01:12:06 → Development · Needs Review
│     #477  "No changes detected in the branch diff"  🔴 empty CRs are allowed
│     #613/#424/#421/#416  "Untitled change request"  🟡 naming hygiene (mirrors drafts)
└── CR detail (#461)
    ├── Header ✅ GitHub-like: "RV wants to merge … → Development · opened … · No reviewers yet"
    ├── OVERVIEW  ✅ AI summary: Summary · Changes-by-entity · Impact (Low Risk)
    │     🟠 references entities by raw TAG (supplier_tCEpXz) — opaque to non-technical admins
    └── CHANGES  ✅ real navigable diff:
          • entity tree WORKFLOWS 3 / RECORDS 2 / APP SETTINGS 2, expandable to field/line (L68)
          • +/~ markers, two-pane line-numbered JSON diff (Development vs draft), READ-ONLY
          🔴 diff is RAW JSON only — no semantic/visual diff (can't be read by non-engineers)
          🔴 no inline line-level comments; no review checklist / required reviewers (advisory only)
```

---

## 7. Consolidated friction inventory

### 🔴 Dead ends / context loss
1. No lateral workflow↔workflow (or section↔section) nav — always via "Open existing".
2. No persistent breadcrumb; App > Workflow > Step hierarchy never shown once drilled in.
3. App List (453): no search/filter/folders/archive → junk-polluted.
4. Tab strip conflates objects/views/app-destinations; no dedup; no overflow strategy.
5. JSON errors/warnings: counts only, no jump-to; no in-builder diff.
6. CR diff is raw JSON; no inline comments; no required-reviewer/approval gate.

### 🟠 Re-orientation / cognitive costs
7. Preview↔JSON is a full tab swap (no side-by-side/sync).
8. AI agent capability buried in a narrow rail; Plan mode unexplained; no history/suggestions.
9. Top bar packs 6 ungrouped controls.
10. App Overrides / App Settings (env-critical) hidden behind small header links → throwaway tabs.
11. Records: 67 flat attributes, no grouping.
12. "Add Swimlane" empty-state jargon.

### 🟡 Latent risks
13. Live vs Development distinguished only by a small green dot.
14. Naming hygiene: timestamp-named drafts (46 in Dev), "Untitled change request", "Untitled Step", machine-tag rule/field names surfaced to humans.
15. Empty CRs permitted (#477).

### ✅ Existing strengths to extend (not replace)
- Persistent left sub-nav already used in App Settings & App Overrides → precedent for §D navigator.
- Real entity-tree diff + GitHub-style CR header.
- AI is context-aware + agentic with checkpoints/revert.
- Records/attribute/settings tables (typed, searchable, sortable).
- Rules WHEN/DO model with search/filter/graph toggle.

---

## 8. Summary judgment
Studio optimizes **single-object deep focus** at the expense of **structural orientation** and **lateral movement**. It borrows browser *mechanics* (tabs) without browser *affordances* (address bar/stable URL, reliable back, history, dedup). The paradox: the product **already contains** the building blocks of a better model — a persistent left sub-nav (Settings/Overrides), a real diff, an agentic context-aware AI, and clean typed tables — but these are siloed behind header links and throwaway tabs while the prime left rail is spent on a chat panel. The redesign opportunity (Section D) is therefore mostly **re-composition of existing patterns**, not net-new invention.
