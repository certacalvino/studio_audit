# I. Model comparison — v3 design vs PM's product walkthrough

> **Purpose:** Before the next design pass, close 6 open decisions between our v3 governance model (see `H_change_model.md`) and the model the PM demoed in the video walkthrough. Every row below has a **question that only the PM can answer**.

**Audience:** PM
**Owner:** Chris Calviño
**Date:** 2026-07-06

---

## What changed since v3 was signed off

The PM shared a product walkthrough (video + stills) that revealed the shipped model differs from what we designed in five concrete ways. Some are naming, some are structural. This doc lays them side-by-side so we can decide **align vs defend** for each, not in aggregate.

---

## Decisions to close

### 1. Container entity name — `Task` (product) vs `Proposal` (our v3)

| | Product (as demoed) | Our v3 design |
|---|---|---|
| Name | **Task** | **Proposal** |
| Collision | Workflow steps are also called "Task" — same word, two meanings in the product | No collision, but requires re-education |
| Vocabulary fit | Aligns with Jira-style mental model PM referenced | Aligns with governance/GRC vocabulary |

**Recommendation:** Align with product — rename Proposal → Task in the design. The collision already exists in the shipped product; our doc pretending it doesn't creates a bigger gap than the collision itself. If we're worried about readability, disambiguate as *"Governance Task"* vs *"Workflow Task"* in copy where both appear.

**Question for PM:** Confirm we should adopt `Task`, and confirm you're OK carrying the collision (or is there an internal rename planned)?

---

### 2. Governance structure — `Task through stages` (product) vs `Proposal + CRs-per-env` (our v3)

| | Product | Our v3 |
|---|---|---|
| Unit | **One Task** moves through stages: Draft → Review → Development → QA → Pre-Live → Live | **One Proposal** contains **N Change Requests**, one per env |
| Model mental image | Single ticket that changes state (Jira issue moving through columns) | Parent ticket with per-env children (git branch model) |
| Env promotion | The Task itself gets promoted — same entity, next stage | A new CR is opened per env; the Proposal aggregates them |
| Diff review | Change Log AI-generated per Task (Summary / Changes / Impact) | Diff review is per-CR (per env) |

**Recommendation:** Adopt the product's Task-through-stages model. Reasons:
- It's what's shipped — retrofitting our CRs-per-env would be a rebuild, not a UX layer.
- It's simpler mentally (1 entity, 1 lifecycle) than our (1 parent + N children).
- The Change Log per stage already gives us the "diff per env" affordance without a separate CR entity.

**Trade-off we lose:** The parent-child model made it easy to say *"this Proposal is 3/4 envs deployed"*. In the Task model, the Task itself carries stage — we'd need a separate concept for tracking multi-env rollout status. **May not matter** if promotion is always the next step.

**Question for PM:** Confirm the Task carries the full lifecycle (no per-env sub-entity), OR is there something between "Task" and "environment" we haven't seen?

---

### 3. Env-to-env promotion — `first-class task-like entity` (product) vs `Promote button on Proposal` (our v3)

| | Product | Our v3 |
|---|---|---|
| Promotion is | Its **own Task-like entity** with stages (Created → Awaiting approval → Promoted), Change Log, Discussion, Included tasks | A **button in the Proposal header** (`Promote → QA ▾`) |
| Approval | Explicit stage: "Awaiting approval" — someone reviews before promoting | Implicit; button triggers promotion |
| Bundling | A promotion can bundle **multiple tasks** ("Included tasks: 1 task: jsnfjwdjf" — could be N) | Promotes one Proposal at a time |

**Recommendation:** Adopt product's model. Promotion-as-entity is more powerful than button:
- Bundles multiple ready-tasks into one promotion event (matches release-management reality).
- Gives approval a place to live with real UI (approver, notes, change log).
- Fits the Task vocabulary — "Promote Development to QA" IS itself a task.

**What this means for our design:** The Proposal tab's `Promote → QA ▾` button becomes *"Add to next QA promotion"* or *"Start QA promotion"*. Promotion tabs would open as their own tabs in the tab strip.

**Question for PM:** Is env-promotion always a bundled operation (N tasks per promotion) or 1:1 (one task per promotion) in practice? Design changes based on the answer.

---

### 4. Env version history + rollback — `exists in product`, absent from v3 design

| | Product | Our v3 |
|---|---|---|
| Feature | "Deployed versions for [env]" modal — lists versions (`jsnfjwdjf` / `hello` / `gfghfbhjbvierg`) with **Switch to version** action | Not surfaced |
| Trigger | From env view | — |
| Effect | Rolls the env back to that version | — |

**Recommendation:** Add to the v3 design. Currently missing entirely. Fits inside the app-scope; belongs in an **env view** page (which we don't currently have — see #5 below).

**Question for PM:** Is this the primary rollback mechanism, or does a "Revert" also exist on the Task/CR itself (like our v3 has on drafts)?

---

### 5. Read-only environments — `explicit in product`, implicit in v3 design

| | Product | Our v3 |
|---|---|---|
| Model | Env views are **read-only**. Tooltip: *"Environment views are read-only. Use a task or promotion flow when you need to make changes."* | We have per-env drafts (draft = writable canvas), but no explicit "read-only env view" |
| Env view page | Exists ("Review this environment", "Create hotfix to QA" button, deploy history) | We don't have an env-scoped page — everything is app-scoped or Proposal-scoped |

**Recommendation:** Add an **Env view tab** to the design. Reachable from the Overview pipeline (click an env dot → env tab opens) or from the tab strip. Contents: env stats, deploy history, hotfix button, "Promote to next stage" button, list of tasks currently in this env.

**This is new surface area** we didn't design in v3. Not big — one page — but it fills a real product need.

**Question for PM:** Confirm env view is a first-class page (not a modal). And is it per-env only, or per-app-per-env (which would give us `Mayo Client App · QA` as a tab)?

---

### 6. Hotfix flow — `exists in product`, absent from v3 design

| | Product | Our v3 |
|---|---|---|
| Model | **Direct-to-env hotfix** ("Create hotfix to QA") — bypasses lower stages | Not designed |
| Tag | "Hotfix to QA" appears as a badge on Task cards in "All tasks" modal | — |
| Why exists | Urgent fixes where staging through Dev is too slow | — |

**Recommendation:** Adopt. Hotfix is a task variant, not a separate entity — a Task can be **created directly in a higher-env stage** (Live/Pre-Live/QA) instead of Draft/Dev.

**Design change:** In the "New task" flow, add a "Target env" selector defaulting to Dev but allowing higher envs. Any task not created at Dev gets a `Hotfix` badge automatically.

**Question for PM:** Are hotfixes gated (only some users can create them) or open to any author? Affects whether we surface it as a subtle option or a distinct button.

---

## Bonus item — Project management layer (PM mentioned briefly)

PM referenced: *"project management for design agent setup"* as a future layer. Not clear if this means:

- **A: A Project entity above Task** — group related tasks across time (e.g. "Q3 PII rollout" contains Tasks A / B / C)
- **B: Setup/onboarding tooling for the design-agent (Claude) integration** — separate from governance
- **C: Both**

**No design decision to make yet**, but worth confirming which of A/B/C. If A, our current entity stack (Dashboard → App → Task) gets a new level: **Dashboard → App → Project → Task**.

---

## Right rail — a note, not a decision

The product uses a **right rail with global actions** (Deploy sandbox, New task, All tasks, Switch env, Settings, Overrides). Our v3 explicitly killed both sidebars in favor of tab-first.

**I do not recommend bringing the rail back.** The actions on the product's rail can all be reachable via:
- `New task` → Studio app quick action, or `⌘K → new task`
- `All tasks` → a tab, or Overview sub-tab
- `Switch env` → click env dot in pipeline, or `⌘K`
- `Settings / Overrides` → app-level tabs

Tab-first + `⌘K` covers 100% of what the rail does, with less chrome. **Only concede if PM insists** — this is a defendable position.

---

## Summary — what changes if PM says yes to everything

Concretely, v4 of the design would need:

1. Global rename `Proposal → Task` across all frames (**#1**).
2. Simplify Task detail — no more per-env CR children; one Task carries the lifecycle (**#2**).
3. New surface: **Promotion tabs** (Task-like entities themselves) opening from `Promote → QA` (**#3**).
4. New surface: **Env view tab** — deploys, hotfix button, version history (**#4** + **#5**).
5. New affordance: **Hotfix flag** on task creation, badge on task cards (**#6**).
6. Retain tab-first architecture (defend against right rail).

Roughly **1 new tab type + 1 relabeling pass + 1 promotion flow addition**. Manageable.

---

## Recommended next step

Send this to PM (Slack or paste into Notion). Ask for a **written yes/no per row** so we don't lose decisions in a call. Once they land, I do a v4 of `H_change_model.md` and update the Claude Design frames.

---

*Owner: Chris Calviño · chris@chriscalvino.com*
*Companion to `H_change_model.md` v3.*
