# E. Dashboard Redesign — the new Studio home

Replaces today's flat **"Apps 453"** list (no search, no grouping, polluted with `test m1–m14`,
`studio-2335`/`STUDIO-2335`, `Sandbox_Test_QA_2`, "check revert"). The home becomes a **work-routing
dashboard**: find the right app fast, and see what needs your attention across branches and Change
Requests — without opening an app first.

Constraints honored: no engine/data-model changes (apps, drafts, CRs, environments already exist);
browser-only; every tile/row deep-links; environment risk colors (Dev green / QA blue / Pre-Live amber
/ Live red); extends existing patterns (the searchable typed tables already in Records/App Settings,
the CR list, the env/draft switcher).

---

## 1. Layout (flat wireframe)
```
┌───────────────────────────────────────────────────────────────────────────────────────┐
│ TOP BAR  studio                              🔍 Search apps, workflows, CRs (⌘K)   🔔③ CH│
├───────────────────────────┬───────────────────────────────────────────────────────────┤
│ LEFT RAIL (global)         │ MAIN — "Home"                                              │
│  🏠 Home                   │  ┌── ATTENTION STRIP ───────────────────────────────────┐ │
│  ⭐ Starred apps           │  │ 🔵 3 CRs need your review   🟣 2 drafts you locked    │ │
│  🕘 Recent                 │  │ 🟠 1 Live-bound CR awaiting approval   ⚙ 1 deploying  │ │
│  🗂 All apps (453)         │  └────────────────────────────────────────────────────────┘│
│  ── views ──               │                                                            │
│  🔀 Change Requests ③      │  APPS                              [ Grid │ Table ] [+ New]│
│  🌿 Branch activity        │  Filter: ▾Owner ▾Environment ▾Status   ☐ Hide sandbox/test │
│  🗑 Sandbox / Test (412)   │  ┌─ Starred ──────────────────────────────────────────────┐│
│                            │  │ [Mayo Client App] [TPRM App for Risk Domains]           ││
│                            │  └────────────────────────────────────────────────────────┘│
│                            │  ┌─ Recently active ──────────────────────────────────────┐│
│                            │  │ ▦ Mayo Client App   ⋮                                    ││
│                            │  │   Dev●46  QA●  Pre-Live  Live  · 3 open CRs · edited 2h  ││
│                            │  │ ▦ Sandbox_Test_QA_2  (sandbox)  · 0 CRs · 4d            ││
│                            │  └────────────────────────────────────────────────────────┘│
└───────────────────────────┴───────────────────────────────────────────────────────────┘
```

## 2. How apps are organized
- **Search-first (`⌘K` global):** searches across apps *and* their workflows/records/CRs, so a
  consultant types "Subcontractor" and lands on the workflow, not just the app.
- **Smart groups, not a flat list:** `Starred` (pinned) → `Recently active` (last edited/visited) →
  `All apps`. Grouping is the default cure for the 453-row scroll.
- **Hide-the-noise toggle:** a detector classifies obvious sandbox/test apps (`test *`, `studio-####`,
  `Sandbox_*`, "check revert", apps with 0 CRs and 0 recent edits) into a collapsed **Sandbox / Test**
  bucket, on by default — surfacing the ~40 real apps instead of 453. Non-destructive; one click to show.
- **Filters + sort:** by Owner, Environment (has activity in QA/Live…), Status (has open CRs, deploying,
  errors), and last-edited. Table view reuses the existing typed-table pattern (Name · Owner · Open CRs ·
  Last deploy · Environments).
- **App tile contents (each card):** name + favorite star; an **environment health row** —
  four dots `Dev / QA / Pre-Live / Live` colored by tier, filled when that tier has pending/promotable
  changes; **# open CRs**; **# active drafts**; owner avatars; last-edited. The tile is the at-a-glance
  status of that app's pipeline.

## 3. How pending Change Requests surface
- **Attention strip** (top of Home): the first thing you see — counts that route you to work:
  `N CRs need your review`, `drafts you locked`, `Live-bound CR awaiting approval`, `deploy in progress`.
  Each is a filtered link into the CR list (reusing the existing `Review requested / Created by me / All`
  tabs + search).
- **🔔 Notification center** (top bar, badge count): an inbox of events — *review requested*, *your CR
  was approved/merged*, *merge & deploy finished/failed*, *someone took over your draft*
  ("Unlock & take over"), *new comment on your CR*. Read/unread; click jumps to the CR at the relevant
  Changes line/comment. This is the missing connective tissue between the (already good) CR system and
  the rest of Studio.
- **Per-app CR indicator:** the `3 open CRs` chip on a tile expands to a popover listing them with
  status badges, so you triage without entering the app.

## 4. How branch / environment activity surfaces
- **Branch activity view** (left rail): a chronological feed — *draft created* (with owner), *draft
  locked/taken over*, *CR opened/merged*, *promotion Dev→QA / QA→Pre-Live / Pre-Live→Live*, *deploy
  started/finished*. Filterable by app and environment. This makes the today-invisible "46 drafts in
  Development" legible and curatable (stale-draft nudges, e.g. timestamp-named drafts untouched 30+ days).
- **Pipeline indicators on every tile:** the four environment dots double as promotion signals — an
  amber Pre-Live dot with an arrow means "changes in Pre-Live ready to promote to Live." Hover shows the
  governing CR.
- **Deploy status as a live indicator:** because `Merge & Deploy` can "take hours" when updating
  in-progress workflows, an in-progress deploy shows a spinner chip on the tile and in the attention strip,
  and fires a notification on completion — closing the loop on a long, currently-silent operation.
- **Risk always communicated:** environment color is consistent across dots, chips, and (once inside an
  app) the chrome — so Live work is unmistakable from the home screen onward.

## 5. Behavior & access
- Everything is keyboard-reachable (`⌘K` to search/navigate/switch env-draft, `j/k` through lists).
- Every tile, CR chip, notification, and activity item is a stable URL (shareable, back/forward-safe).
- Default landing = **Home**; the old flat list survives as `All apps` for muscle memory.
- New users see the same dashboard scoped to their starred/owned apps, so the 453-app firehose never
  hits them.

**Outcome:** the home stops being a parking lot of 453 rows and becomes the place you start work —
the right app in two keystrokes, and every pending review, lock, promotion, and deploy visible before
you open anything.
