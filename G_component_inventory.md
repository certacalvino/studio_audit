# G. Component Inventory — shared UI kit

Reusable atoms/molecules that recur across Directions 0–3 and the Dashboard (Section E). Each entry:
**purpose · anatomy · states/variants · one usage rule**. Built to **extend existing Studio patterns**,
not replace them. Tokens referenced:
env colors Dev `#16A34A` / QA `#2563EB` / Pre-Live `#D97706` / Live `#DC2626`;
neutrals surface `#FFFFFF`, rail `#F8F9FB`, border `#E5E7EB`, text `#111827` / muted `#6B7280`;
radius 8px (cards) / 6px (controls); type: H1 18/600, section 11/600 uppercase, body 13/400, mono 12.

---

## 1. Environment pill
- **Purpose:** show + switch the active environment and draft; carry risk color everywhere.
- **Anatomy:** `● {dot, env color} {Env} · {Draft name} ▾` + optional `🔒 {owner}` lock glyph.
- **States/variants:** Dev/QA/Pre-Live/Live (color) · locked-by-me / locked-by-other (read-only) · open (dropdown active) · compact (dot+initial only, for 56px rail).
- **Usage rule:** always present in the top/pipeline bar; the dot color is the single source of truth for risk — never show env by text alone.

## 2. Pipeline stepper
- **Purpose:** make the Dev→QA→Pre-Live→Live promotion path always visible and navigable.
- **Anatomy:** four nodes joined by connectors; each node = env dot + label + count badge (`Dev ●46`); connector = thin line, thickened/colored when a promotion CR exists.
- **States/variants:** current tier (filled) · upstream (muted) · downstream (outline) · connector: none / open-CR / merging (animated) · Live node hover = warning affordance.
- **Usage rule:** the current tier is always filled in its env color; clicking a downstream node starts a promotion CR, never an instant deploy.

## 3. Segmented view control
- **Purpose:** switch Preview / Rules / JSON within one object (kills the object-vs-view tab confusion).
- **Anatomy:** 2–3 inline segments in a pill track; active segment filled white w/ subtle shadow.
- **States/variants:** Workflows `[ Preview | Rules | JSON ]` · Records `[ Preview | JSON ]` · dirty segment shows a `●`; JSON segment shows error/warning dots (red/orange).
- **Usage rule:** switching a segment swaps the canvas body in place and updates the URL segment — it must never open a new tab.

## 4. Entity-tree diff row
- **Purpose:** the unit of the CR Changes view and the "Changes in this draft" rail (Dir 0/3).
- **Anatomy:** indent guide · disclosure ▸ · type icon (workflow/record/setting) · name · change marker `+`/`~`/`−` · optional line ref `L68` · count badge on group rows.
- **States/variants:** added (green `+`) · modified (amber `~`) · removed (red `−`) · group (WORKFLOWS 3) · selected (env-tinted bg) · has-comment (💬 dot).
- **Usage rule:** the same row component renders in both the live draft rail and the CR diff — clicking it deep-links to the object/line.

## 5. Status badge
- **Purpose:** communicate CR/review/workflow state at a glance.
- **Anatomy:** rounded chip, 11px text, color-coded fill/outline.
- **States/variants:** `Needs Review` (blue) · `Approved` (green) · `Review Pending` (amber) · `Merged`/`Deployed` (gray) · `Closed` (red outline) · workflow statuses (`In Progress`, `Rejected` red) reuse the same chip.
- **Usage rule:** one badge per row/header; color maps to a fixed semantic — never reuse a color for two meanings.

## 6. AI context chip
- **Purpose:** show the AI exactly what it's bound to; let users reference an object.
- **Anatomy:** small pill `⤳ {object name}` w/ type icon, removable `×`.
- **States/variants:** workflow / step / field / record / diff-scope ("this draft") · active (filled) · stale (outline, when selection changed).
- **Usage rule:** appears in the AI panel header and inline in composed messages; clicking it deep-links to the referenced object.

## 7. Checkpoint / Revert row
- **Purpose:** expose the agent's edit history as restorable points.
- **Anatomy:** timestamped node `◦ 02:47 PM Checkpoint created` + `↩ Revert` action.
- **States/variants:** current · past (reverting jumps here) · plan-mode checkpoint (distinct icon).
- **Usage rule:** a checkpoint is created on every agent edit; Revert is always one click and confirms only when discarding newer checkpoints.

## 8. App tile (dashboard)
- **Purpose:** at-a-glance app status + pipeline health on the home screen.
- **Anatomy:** name + ★ · **env health row** (four dots Dev/QA/Pre-Live/Live, filled when that tier has promotable changes) · `# open CRs` chip · `# active drafts` · owner avatars · last-edited · hover ⋮ (edit/open/delete).
- **States/variants:** starred · sandbox/test (muted, in collapsed bucket) · deploying (spinner chip) · has-review-for-me (blue accent).
- **Usage rule:** the four env dots always render in fixed order and color; a filled downstream dot implies "ready to promote," surfaced on hover.

## 9. Table (typed list)
- **Purpose:** reuse the existing Records/App-Settings table for all object lists.
- **Anatomy:** header row w/ sortable `↕` columns · `Columns` toggle · search field · `+ Add` · row hover-reveal actions (✏️/👁/🗑) · `🔒` system-row glyph · `Σ` aggregate.
- **States/variants:** In-App / All count tabs · empty state · loading skeleton · row selected.
- **Usage rule:** every list of homogeneous objects (records, attributes, rules, BUs, CRs) uses this one table, not a bespoke layout.

## 10. Command palette (⌘K)
- **Purpose:** primary keyboard navigation + creation + AI entry across all directions.
- **Anatomy:** centered overlay, search input, grouped results (Navigate · Create · Switch env/draft · Ask AI · Recent).
- **States/variants:** empty (shows recents + suggestions) · scoped (prefix `>` commands, `#` CRs, `@` people) · loading.
- **Usage rule:** `⌘K` is bound globally and must reach any deep-linkable object; selecting a result navigates or acts, never opens a dead-end modal.

## 11. Notification item (dashboard / bell)
- **Purpose:** connect the CR/branch system to the rest of Studio.
- **Anatomy:** actor avatar · event verb (review requested / approved / merged / deploy finished / draft taken over / new comment) · target link · timestamp · unread dot.
- **States/variants:** unread / read · success / failure (deploy) · actionable (inline "Review" / "View diff").
- **Usage rule:** clicking jumps to the precise locus (CR Changes line, comment thread, or app) — no generic "open CR" landing.

## 12. Empty state
- **Purpose:** turn dead ends (e.g. "No tasks configured + Add Swimlane", "No change requests") into guided starts.
- **Anatomy:** icon · one-line plain-language title · one-line help · single primary action.
- **States/variants:** no steps · no CRs to review · no changes in draft · no search results.
- **Usage rule:** replace jargon ("Add Swimlane") with plain verbs; exactly one primary CTA, no orphaned states.

---

## Density & accessibility baselines (apply to all)
- Control height 32px (compact 28px); table row 36px; tap target ≥ 32px.
- Section headers use the 11px uppercase token to lift the currently low-contrast `RECORD DETAILS / TASKS / APP` headers.
- Color is never the only signal: pair env/status color with a dot shape, label, or icon (color-blind safe).
- Every interactive atom is focusable, has a visible focus ring, and is reachable via `⌘K` or arrow/`j-k` traversal.
