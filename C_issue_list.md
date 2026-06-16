# C. Prioritized Issue List

30 issues synthesized from Sections A (current-state friction inventory), B/B2 (benchmarks),
D/E/F/G (redesign + components). Format per the original brief. **Priority order = Severity first,
then Effort** (quick wins = High/Critical severity + Low effort). Areas:
Navigation · IA · Builder · Change Requests · AI Sidebar · Visual.

> **Quick-wins shortlist (do first — high impact, Low effort):**
> S-04 (in-object Preview/Rules/JSON), S-05 (jump-to JSON errors), S-06 (Live risk signal + gate),
> S-07 (discoverable Plan mode), S-17 (naming hygiene), S-18 (force step naming),
> S-19 (empty-state copy), S-20 (top-bar grouping), S-21 (header contrast), S-22 (friendly names in CR),
> S-23 (block empty CRs), S-24 (tab identity consistency).

---

## CRITICAL

```
ID: S-01
Area: Navigation
Severity: Critical
Current behavior: No persistent structural navigator; moving from one workflow to another (e.g.
  Subcontractor Form → Initiate Engagement) requires returning to the "Open existing" home and re-selecting.
User impact: Every lateral move is a full context teardown; consultants managing 24 workflows lose their
  place constantly and cannot keep two objects in mind.
Recommendation: Introduce a persistent left sidebar spine (App › Section › Item) as the primary nav,
  reusing the pattern App Settings/Overrides already employ; lateral switching becomes one click.
Effort: High
Reference: Linear (persistent sidebar), Retool (in-canvas object switching)
```
```
ID: S-02
Area: Navigation / IA
Severity: Critical
Current behavior: No breadcrumb; once you drill into Mayo Client App › Subcontractor Form › Subcontractor
  Details, that path is never displayed and is lost on tab switch.
User impact: Users cannot tell where they are or climb back up the hierarchy; orientation is purely memory.
Recommendation: Add a persistent breadcrumb in the canvas header for every object, each segment clickable
  to jump up a level; pair with stable URLs (see S-11).
Effort: Medium
Reference: Notion, GitHub (breadcrumbs everywhere)
```
```
ID: S-03
Area: IA
Severity: Critical
Current behavior: The App List is a flat 453-row scroll with no search, filter, folders, sort, or archive,
  polluted with junk (test m1–m14, studio-2335/STUDIO-2335, Sandbox_Test_QA_2, "check revert", a workflow "New").
User impact: Finding a real app is pure scan; the firehose hits every user and buries the ~40 production apps.
Recommendation: Replace with the Section E dashboard — global search/⌘K, Starred/Recent groups, filters,
  and a default "hide sandbox/test" bucket (non-destructive detector).
Effort: Medium
Reference: Linear, Notion (search + grouping)
```

---

## HIGH

```
ID: S-04
Area: Builder / Navigation
Severity: High
Current behavior: Preview, Rules, and JSON open as sibling tabs, conflating "an object" with "a view of an
  object"; opening a workflow can spawn 3 tabs.
User impact: The tab strip becomes unreadable and users can't tell objects from lenses; duplicate views proliferate.
Recommendation: Collapse Preview/Rules/JSON into an in-object segmented control in the canvas header that
  swaps the body in place (no new tab).  [QUICK WIN]
Effort: Low
Reference: Cursor / Figma (view modes within one object)
```
```
ID: S-05
Area: Builder
Severity: High
Current behavior: The JSON editor shows error/warning counts ("● 1 error ● 1 warning") and inline squiggles
  but offers no jump-to-error.
User impact: On large workflow JSON, locating the flagged line is manual hunting; errors get ignored.
Recommendation: Make the count badges clickable to jump to the next error/warning; mirror counts in a status
  bar with the same jump action.  [QUICK WIN]
Effort: Low
Reference: VS Code (Problems panel jump-to)
```
```
ID: S-06
Area: Visual / Navigation
Severity: High
Current behavior: The active environment (incl. Live) is signalled only by a small green dot; switching to a
  higher tier carries no extra friction.
User impact: Risk of editing/deploying against Live or the wrong environment with no strong perceptual cue.
Recommendation: Apply a consistent environment risk color (Dev green / QA blue / Pre-Live amber / Live red)
  to the env pill + a window edge, and add a typed confirm gate when entering Live.  [QUICK WIN]
Effort: Low
Reference: GitHub deployment environments; generic risk-color convention
```
```
ID: S-07
Area: AI Sidebar
Severity: High
Current behavior: The Plan toggle is unlabeled/unexplained; the panel shows no conversation history or
  suggested prompts/actions.
User impact: A powerful agentic capability (checkpoints, Plan) is undiscovered; users treat it as a basic chatbot.
Recommendation: Replace the toggle with a labeled [Chat | Plan] segmented switch + a one-line mode hint;
  add recent-conversation history and per-context suggested actions.  [QUICK WIN]
Effort: Low
Reference: Cursor (mode switch + history)
```
```
ID: S-08
Area: AI Sidebar / Navigation
Severity: High
Current behavior: The AI panel is permanently docked in the full-height left rail on every screen — the prime
  navigation real estate.
User impact: The structural navigator has nowhere to live; the AI occupies space disproportionate to per-session use.
Recommendation: Move the AI to an on-demand, context-bound right side-sheet summoned by ⌘I/⌘K; free the left
  rail for the S-01 navigator. (See B2 synthesis.)
Effort: Medium
Reference: Cursor, Claude Code (on-demand context-bound panel)
```
```
ID: S-09
Area: Navigation
Severity: High
Current behavior: One flat tab strip mixes objects, object-views, and app-destinations; no de-duplication
  (two identical "Change Requests" tabs observed); no overflow strategy at 8+ tabs.
User impact: Tabs sprawl and duplicate; users lose track and there's no defined behavior when they overflow.
Recommendation: Keep app-scoped tab groups but de-dupe (focus existing), add overflow handling, dirty-state
  dots, and remove view-tabs via S-04.
Effort: Medium
Reference: VS Code (tab groups, overflow, dirty indicators)
```
```
ID: S-10
Area: Navigation
Severity: High
Current behavior: Opening a Change Request or another object replaces/loses the workflow context you were in;
  there is no peek mechanism.
User impact: Reviewing a CR or a linked record abandons the canvas, forcing a costly round-trip back.
Recommendation: Add a side-peek (slide-over) for CRs, records, and diffs so a second object opens without
  leaving the first.
Effort: Medium
Reference: Notion (side-peek)
```
```
ID: S-11
Area: Navigation
Severity: High
Current behavior: Routes exist (/studio/apps) but individual workflows, steps, records, attributes, and CRs
  lack stable deep-link URLs, and in-app back/forward is unreliable.
User impact: Users can't share a link to a step/CR or rely on the back button; collaboration is copy-paste-name.
Recommendation: Give every object a stable URL (/studio/:env/:draft/apps/:app/workflows/:wf/steps/:step …)
  with working back/forward and scroll restoration.
Effort: Medium
Reference: GitHub, Linear (permalinks)
```
```
ID: S-12
Area: Change Requests
Severity: High
Current behavior: Reviewers are optional/advisory ("No reviewers yet · + Add"); Merge & Deploy is available
  with zero approvals, including for tier promotions toward Live.
User impact: Changes can reach higher environments unreviewed; no governance on risk-bearing merges.
Recommendation: Add optional required-reviewer gates configurable per target tier (e.g. enforce ≥1 approval
  for Pre-Live/Live-bound CRs) that block Merge & Deploy until met.
Effort: Medium
Reference: GitHub (required reviewers / branch protection)
```
```
ID: S-13
Area: IA
Severity: High
Current behavior: App Settings (~18 sections) and App Overrides (per QA/Pre-Live/Live) — both env-critical —
  are reached only via small header links and then live as throwaway tabs.
User impact: Important configuration is hard to find and easy to lose; their good persistent sub-nav is hidden.
Recommendation: Surface Settings and Overrides as first-class sections in the S-01 sidebar; keep their existing
  internal left sub-nav.
Effort: Medium
Reference: Studio's own App Settings sub-nav (extend); Linear
```
```
ID: S-14
Area: Change Requests / IA
Severity: High
Current behavior: There is no global inbox/notification surface; CR reviews, approvals, merges, deploys, and
  draft takeovers are invisible unless you open the CR area.
User impact: Reviewers miss requests; authors don't learn their CR merged or their long deploy finished.
Recommendation: Add a notification center (bell + dashboard attention strip) for review-requested, approved/merged,
  deploy finished/failed, draft taken-over, new comment — each deep-linking to the exact locus.
Effort: Medium
Reference: GitHub, Linear (inbox)
```
```
ID: S-15
Area: Navigation
Severity: High
Current behavior: There is no command palette or meaningful keyboard navigation; everything is mouse-driven via
  "Open existing".
User impact: Power users (consultants, engineers) are throttled to clicking; speed across many objects suffers.
Recommendation: Add a global ⌘K palette that navigates to any object, creates, switches env/draft, and invokes AI;
  support arrow/j-k list traversal.
Effort: Medium
Reference: Linear, Cursor (⌘K)
```
```
ID: S-16
Area: Change Requests
Severity: High
Current behavior: The CR Changes diff is a raw two-pane JSON diff (machine tags like supplier_tCEpXz, line refs)
  — the only representation of what changed.
User impact: Non-technical client admins (a primary persona) cannot read the diff and so cannot meaningfully review.
Recommendation: Layer a semantic/visual diff over the JSON — render before/after of the affected form/record/rule
  in human terms, with the JSON available as a toggle.
Effort: High
Reference: Figma (visual branch/diff)
```

---

## MEDIUM

```
ID: S-17
Area: Visual / IA
Severity: Medium
Current behavior: Drafts default to timestamp names ("16 Jun 16:32:46"; 46 in Development), many CRs are "Untitled
  change request", and machine tags surface to humans.
User impact: Drafts/CRs are indistinguishable; reviewers can't triage by name; the system feels unmaintained.
Recommendation: Extend the existing AI title-drafting to drafts; prompt for a name on first edit; show friendly
  names with the tag as secondary.  [QUICK WIN]
Effort: Low
Reference: GitHub (AI/PR titles); Studio's own AI CR-title feature
```
```
ID: S-18
Area: Builder
Severity: Medium
Current behavior: Steps can be left as "Untitled Step" and persist indefinitely (seen in Subcontractor Form).
User impact: Ambiguous/orphaned steps clutter workflows and confuse reviewers and the CR diff.
Recommendation: Require a step name on creation (or auto-suggest from content) and flag remaining "Untitled" steps.  [QUICK WIN]
Effort: Low
Reference: Generic form-builder validation
```
```
ID: S-19
Area: Builder / Visual
Severity: Medium
Current behavior: Empty states use jargon and weak guidance ("No tasks configured + Add Swimlane").
User impact: New users don't understand "Swimlane" or what to do next; empty states are dead ends.
Recommendation: Use plain-language empty states (icon + one-line title + one-line help + single primary CTA)
  per the G empty-state component.  [QUICK WIN]
Effort: Low
Reference: Notion (guided empty states)
```
```
ID: S-20
Area: Visual
Severity: Medium
Current behavior: The in-app top bar packs ~6 ungrouped controls (env/draft, Play, Fork, Create CR, kebab) with
  no visual hierarchy.
User impact: High cognitive load; primary vs secondary actions are indistinguishable.
Recommendation: Group controls by function (environment cluster · run · review/CR cluster · overflow) with clear
  primary-action emphasis.  [QUICK WIN]
Effort: Low
Reference: Linear (top-bar restraint)
```
```
ID: S-21
Area: Visual
Severity: Medium
Current behavior: Section headers (RECORD DETAILS, TASKS, APP) are low-contrast and barely distinguishable from body.
User impact: Visual hierarchy is flat; scanning is slow in dense screens.
Recommendation: Adopt the G type token (11px/600 uppercase tracked, stronger color) for all section headers.  [QUICK WIN]
Effort: Low
Reference: Linear (type hierarchy)
```
```
ID: S-22
Area: Change Requests / AI Sidebar
Severity: Medium
Current behavior: The AI-generated CR summary references entities by raw machine tag (supplier_tCEpXz,
  engagement_UNWCkwrxTF) instead of friendly names.
User impact: The otherwise-excellent summary is partly unreadable to non-technical reviewers.
Recommendation: Resolve tags to friendly names ("External Party", "Engagement") in summaries, with tag on hover.  [QUICK WIN]
Effort: Low
Reference: Studio's own friendly-name data (extend)
```
```
ID: S-23
Area: Change Requests
Severity: Medium
Current behavior: Empty CRs are allowed (e.g. #477 "No changes detected in the branch diff").
User impact: Noise in the review queue; reviewers waste time on no-op CRs.
Recommendation: Block creation of (or clearly flag) CRs whose diff is empty.  [QUICK WIN]
Effort: Low
Reference: GitHub (prevents empty PRs)
```
```
ID: S-24
Area: Visual / Navigation
Severity: Medium
Current behavior: A workflow tab is labeled with its friendly name ("Subcontractor Form") but a record tab is
  labeled with its raw tag ("supplier_tCEpXz").
User impact: Inconsistent identity makes tabs hard to scan and records hard to recognize.
Recommendation: Label all tabs with the friendly name + type icon, tag secondary.  [QUICK WIN]
Effort: Low
Reference: Studio internal consistency
```
```
ID: S-25
Area: IA
Severity: Medium
Current behavior: Records expose their attributes as a single flat table (External Party = 67) with no grouping
  or sectioning.
User impact: Finding/maintaining an attribute among 67 is slow; relationships between attributes are invisible.
Recommendation: Allow attribute groups/sections (collapsible) and quick filter within a record; reuse the typed table.
Effort: Medium
Reference: Notion / Airtable (field grouping)
```
```
ID: S-26
Area: Change Requests
Severity: Medium
Current behavior: "Merge & Deploy → update in-progress workflows" can take hours and blocks further deploys, with
  no progress indicator or completion notification.
User impact: Users don't know if a deploy is running, done, or failed; the long op is silent.
Recommendation: Show a live deploy status (spinner chip on app tile + attention strip) and notify on completion/failure.
Effort: Medium
Reference: GitHub Actions (deploy status)
```
```
ID: S-27
Area: IA
Severity: Medium
Current behavior: Development holds 46 mostly timestamp-named drafts with no curation, ownership clarity, or
  stale cleanup.
User impact: Draft clutter makes the env switcher noisy and obscures active work.
Recommendation: Add a branch-activity view (Section E) with owner, last-touched, and stale-draft nudges
  (e.g. untouched 30+ days).
Effort: Medium
Reference: Linear / git branch cleanup
```

---

## LOW

```
ID: S-28
Area: AI Sidebar
Severity: Low
Current behavior: The AI is context-aware of the open workflow (chip), but you can't click a specific step/field
  and "ask about this".
User impact: Users must describe the field in prose; precise, fast assistance is lost.
Recommendation: Let selecting a step/field arm an "Ask/act on this" action that seeds the AI with that reference.
Effort: Medium
Reference: Cursor (@-reference / ask about selection)
```
```
ID: S-29
Area: Builder / Visual
Severity: Low
Current behavior: Workflows offer Preview/Rules/JSON, but records offer only Preview/JSON (no Rules), an
  inconsistent affordance set.
User impact: Minor confusion about which views exist where.
Recommendation: Align the view set (or clearly label why records have no Rules) within the S-04 segmented control.
Effort: Low
Reference: Studio internal consistency
```
```
ID: S-30
Area: Visual
Severity: Low
Current behavior: The UI is uniformly dense with small type and compact rows, with no spacing/density options.
User impact: Long configuration sessions can be fatiguing; no accommodation for comfort or accessibility.
Recommendation: Offer a comfortable/compact density toggle and respect larger text settings (see G a11y baseline).
Effort: Medium
Reference: Linear / Retool (density discipline)
```

---

## Summary by severity & effort

| Severity | Low effort (quick wins) | Medium effort | High effort | Count |
|---|---|---|---|:--:|
| **Critical** | — | S-02, S-03 | S-01 | 3 |
| **High** | S-04, S-05, S-06, S-07 | S-08, S-09, S-10, S-11, S-12, S-13, S-14, S-15 | S-16 | 13 |
| **Medium** | S-17, S-18, S-19, S-20, S-21, S-22, S-23, S-24 | S-25, S-26, S-27 | — | 11 |
| **Low** | S-29 | S-28, S-30 | — | 3 |
| | | | | **30** |

**Sequencing recommendation:** ship the 12 Low-effort quick wins first (mostly Visual/Builder/CR polish that
needs no nav rebuild), in parallel land the Critical/High Medium-effort nav+IA work that constitutes Section D
Direction 0 (S-01/02/03/08/09/10/11/15 + dashboard S-03/14), and schedule the two High-effort bets
(S-16 visual diff, S-01 full navigator) as the anchor projects.
