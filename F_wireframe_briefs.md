# F. Wireframe Briefs — ready for visual exploration

Designer-sketchable zone briefs for all directions. **Reference frame: 1440 × 900 desktop**
(scale fluidly; min supported 1024w). Every zone box lists **dimensions/weight · contents · one
interaction note**. Environment risk colors are fixed across all directions:
Dev `#16A34A` green · QA `#2563EB` blue · Pre-Live `#D97706` amber · Live `#DC2626` red.
Type scale: H1 18/600, section header 11/600 uppercase tracked, body 13/400, table 12/400.

---

## Direction 0 — RECOMMENDED (synthesis)
*Dir 2 sidebar + ⌘K spine · Dir 3 "Changes in this draft" + pipeline stepper · Dir 1 in-tab
Preview/Rules/JSON segmented control.* No browser tabs; single breadcrumb-anchored canvas.

```
┌───────────────────────────────────────────────────────────────────────┐ 48  TOP BAR
├───────────────────────────────────────────────────────────────────────┤ 40  PIPELINE BAR
│ SIDEBAR  │  CANVAS HEADER (56)                                          │
│  280     │ ──────────────────────────────────────────────────────────  │
│ (→56)    │  CANVAS BODY (fluid)                         [AI sheet 360 →]│
│          │                                                              │
├──────────┴──────────────────────────────────────────────────────────── ┤ 28  STATUS BAR
```

**ZONE 1 — Top bar**
- Dimensions/weight: full width × **48px**, fixed, white, 1px bottom border.
- Contents: `studio` wordmark (left, 96px) · global **Search / ⌘K** field (centered, max 520px, placeholder "Search apps, workflows, records, CRs") · 🔔 notification bell w/ unread badge · avatar menu (right).
- Interaction note: focusing the search field or pressing `⌘K` opens the command palette overlay (navigate / create / switch env-draft / Ask AI).

**ZONE 2 — Pipeline bar**
- Dimensions/weight: full width × **40px**, fixed, tinted to current env color at 8% with a 2px env-color bottom edge.
- Contents: env+draft selector pill `● Development · Testing Ch ▾ 🔒CH` (left) · **pipeline stepper** `Dev ●46 ━► QA ━► Pre-Live ━► Live` (center, current tier filled) · context `Review Pending ▾` / `Merge & Deploy ▾` + `Close` (right).
- Interaction note: clicking a downstream tier opens the promotion CR composer; selecting **Live** dims the screen and requires a typed confirm.

**ZONE 3 — Sidebar**
- Dimensions/weight: **280px** fixed (collapsible to **56px** icon rail), full height between bars, light gray `#F8F9FB`, 1px right border.
- Contents (top→bottom): sidebar header (current app name + ⋮) · `🔍 inline filter` · **segmented toggle [ Navigate | Changes ● ]** ·
  - *Navigate state:* `⭐ Starred · 🕘 Recent` then app sections `Workflows (24) · Records (6) · Configs · App Settings · Change Requests ②` (expand inline to items).
  - *Changes state:* "Δ this draft (5)" tree `▾ WORKFLOWS 3 · ▾ RECORDS 2 · ▾ APP SETTINGS 2` with `●` badges, + `Draft Change Request ✦` button pinned at bottom.
- Interaction note: the **Changes** segment auto-shows a count badge when the draft is dirty; clicking any changed item deep-links the canvas to it.

**ZONE 4 — Canvas header**
- Dimensions/weight: full canvas width × **56px**, sticky, white.
- Contents: breadcrumb `Mayo Client App › Subcontractor Form › Subcontractor Details` · object title + status chip · **segmented view control `[ Preview | Rules | JSON ]`** (right) · overflow ⋮.
- Interaction note: switching Preview/Rules/JSON swaps the body in place (no new tab) and updates the URL segment.

**ZONE 5 — Canvas body**
- Dimensions/weight: fluid fill (≈ 1100×740 at 1440w with AI closed), white, internal scroll.
- Contents: the active view — *Preview* (RECORD DETAILS + TASKS/steps left sub-column, form render right) · *Rules* (WHEN→DO list + search/filters/graph toggle) · *JSON* (line-numbered editor, error/warning gutter).
- Interaction note: selecting a step/field highlights it and arms "Ask about this" in the AI sheet.

**ZONE 6 — AI side-sheet (summoned, not permanent)**
- Dimensions/weight: **360px** right overlay, slides over canvas, dismissible; full height between bars.
- Contents: header `[ Chat | Plan ]` segmented + current-context chip `⤳ Subcontractor Form` · message stream w/ `Thought & Worked` collapsibles · `Checkpoint · Revert` row · input + 📎 + send.
- Interaction note: opened by `⌘I` or the floating ✦ button; in **Plan** mode the composer asks a clarifying question before acting and the send button shows the ⊘ working state.

**ZONE 7 — Status bar**
- Dimensions/weight: full width × **28px**, fixed bottom, env-tinted.
- Contents: `● Development` · `changes 5` · `errors 1 · warnings 1` (clickable) · `⌘K` hint (right).
- Interaction note: clicking `errors 1` jumps the JSON view to the offending line.

---

## Direction 1 — "Studio IDE"
*Tree + tabs + right copilot.* Keeps a working-set tab strip; de-conflates views inside a tab.

**ZONE 1 — Top bar**
- Dimensions/weight: full width × **48px**, fixed, with a **3px env-color top edge** spanning the window.
- Contents: `studio` · breadcrumb · env+draft pill `● Development · Testing Ch ▾` · `▶ Run` · `Review Pending ▾` · `⌘K` · avatar.
- Interaction note: the top-edge color is the always-on environment risk signal (green→red).

**ZONE 2 — Activity bar**
- Dimensions/weight: **48px** fixed-width vertical strip, full height, dark.
- Contents: icons — Explorer/Workflows · Records · Configs · App Settings · Change Requests (badge) · Search.
- Interaction note: clicking an icon swaps the Explorer tree's root; active icon shows a 2px left accent.

**ZONE 3 — Explorer tree**
- Dimensions/weight: **260px** (resizable 200–360, collapsible), full height, `#F8F9FB`.
- Contents: collapsible tree `▾ Mayo Client App ▸ Workflows ▸ Subcontractor Form ▸ Subcontractor Details ▸ [fields]`, sibling roots Records/Configs/App Settings/Change Requests.
- Interaction note: full keyboard nav (↑↓ to move, → expand, Enter opens in the active tab); dirty items show a `●`.

**ZONE 4 — Tab strip**
- Dimensions/weight: full canvas width × **40px**, scrollable with overflow `»` menu.
- Contents: app-scoped tabs (`Subcontractor Form ×`, `External Party ×`, `+`); each tab = one object.
- Interaction note: Preview/Rules/JSON do **not** spawn tabs — they live as a segmented control inside the tab's header (Zone 5); duplicate-open is prevented (focuses the existing tab).

**ZONE 5 — Editor canvas**
- Dimensions/weight: fluid fill, white.
- Contents: in-tab header `[ Preview | Rules | JSON ]` segmented control + breadcrumb; below, the active view body.
- Interaction note: segmented switch swaps body in place and updates the URL.

**ZONE 6 — AI copilot panel**
- Dimensions/weight: **360px** right panel, **collapsed by default**, toggles canvas width.
- Contents: `[ Chat | Plan ]` switch · context chip · stream · Checkpoint/Revert · input.
- Interaction note: `⌘I` toggles it; selecting code/fields seeds "ask about this".

**ZONE 7 — Status bar**
- Dimensions/weight: full width × **28px**, bottom, env-tinted.
- Contents: env · branch · error/warning counts · ⌘K hint.
- Interaction note: error count jumps to the JSON line.

---

## Direction 2 — "Command Workspace"
*Sidebar spine + ⌘K, breadcrumbs replace tabs, single panel.*

**ZONE 1 — Top bar**
- Dimensions/weight: full width × **48px**, fixed, minimal.
- Contents: `studio` · breadcrumb (center) · `⌘K` chip · `+ Create Change Request` · avatar.
- Interaction note: breadcrumb segments are clickable to jump up the hierarchy.

**ZONE 2 — Branch bar**
- Dimensions/weight: full width × **40px**, env-tinted, 2px env-color bottom edge.
- Contents: `● Development · Testing Ch ▾` (left) · pipeline `[ Dev ●46 → QA → Pre-Live → Live ]` (center) · `Review ▾` (right).
- Interaction note: the whole bar is sticky and never scrolls away, keeping env risk permanently visible.

**ZONE 3 — Sidebar (spine)**
- Dimensions/weight: **280px** fixed (collapsible 56px), full height, `#F8F9FB`.
- Contents: `🔍 Search ⌘K` · `★ Starred` · `🕘 Recent` · divider · current app sections `Workflows (24) · Records (6) · Configs · App Settings · Change Requests ②` (expand inline).
- Interaction note: selecting an item replaces the main panel (no tabs); `j/k` traverses, Enter opens.

**ZONE 4 — Main panel**
- Dimensions/weight: fluid fill, white, single focused panel.
- Contents: breadcrumb header + object title + in-panel `[ Preview | Rules | JSON ]` (workflows) or `[ Preview | JSON ]` (records); body below (e.g. External Party attribute table).
- Interaction note: reliable browser-style back/forward restores prior panel + scroll position.

**ZONE 5 — AI side-sheet (no permanent rail)**
- Dimensions/weight: **400px** right overlay, summoned; full height.
- Contents: `[ Chat | Plan ]` · context chip · stream · Checkpoint/Revert · input.
- Interaction note: opened via `⌘K → Ask AI` or a floating ✦ FAB (bottom-right, 48px); closes with Esc.

**ZONE 6 — (optional) Split view**
- Dimensions/weight: canvas splits 50/50 vertically on demand.
- Contents: two independent panels (e.g. Subcontractor Form Preview | its JSON, or two workflows).
- Interaction note: invoked from the breadcrumb overflow ("Open to the side"); each pane keeps its own URL.

---

## Direction 3 — "Deploy Cockpit"
*Branch-first; nav doubles as a change tracker; pipeline is the centerpiece.*

**ZONE 1 — Top bar (pipeline-centric)**
- Dimensions/weight: full width × **56px** (taller to host the stepper), env-tinted, 2px env edge.
- Contents: `studio` · **large pipeline stepper** `● Dev 46 ━━► QA ━━► Pre-Live ━━► Live` (center, connectors = promotion CRs) · `draft: Testing Ch ▾ 🔒CH` · `Merge & Deploy ▾` (right).
- Interaction note: clicking a tier switches context to that environment; promoting into Live triggers a red full-screen confirm gate.

**ZONE 2 — Rail Zone 1: "Changes in this draft"**
- Dimensions/weight: **300px** wide × top ~45% of rail height, `#FFF7ED` (warm) when dirty.
- Contents: `Δ this draft (5)` · entity tree `▾ WORKFLOWS 3 · ▾ RECORDS 2 · ▾ APP SETTINGS 2` with `●` badges · pinned `Draft Change Request ✦`.
- Interaction note: updates live as you edit; collapses to a single "No changes" line when the draft is clean.

**ZONE 3 — Rail Zone 2: App hierarchy**
- Dimensions/weight: **300px** wide × remaining rail height, `#F8F9FB`.
- Contents: `▸ Workflows ▸ Records ▸ Configs ▸ App Settings`.
- Interaction note: items modified in this draft mirror the `●` badge from Zone 2 so hierarchy and change-state read as one surface.

**ZONE 4 — Canvas**
- Dimensions/weight: fluid fill, white.
- Contents: breadcrumb + `[ Preview | Rules | JSON ]` + body; modified items in view carry an inline `● changed` tag.
- Interaction note: clicking a `●` tag opens an inline before/after peek for that field.

**ZONE 5 — AI / CR panel**
- Dimensions/weight: **380px** right panel, dockable.
- Contents: `[ Chat | Plan ]` · context+diff chip · stream · prominent `Draft CR ✦` (hands the diff to the composer) · Checkpoint/Revert.
- Interaction note: asking "what changed in this draft?" returns a per-entity summary linked to Zone 2 items.

**ZONE 6 — Footer**
- Dimensions/weight: full width × **28px**, bottom, env-tinted.
- Contents: `● Development` · `changes 5` · `ready to review` · `errors 1`.
- Interaction note: `ready to review` is a shortcut to open the CR composer pre-filled with the current diff.
