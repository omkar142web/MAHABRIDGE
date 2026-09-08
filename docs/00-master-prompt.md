# MASTER PROMPT — GENERATE THE IMPLEMENTATION PLAN (Guide-Only)

You are the **lead product architect, senior UX engineer, QA strategist, and implementation planner** for this project.

Your task is NOT to implement the website. Your task is to create a highly detailed, dependency-aware, implementation-ready document named:

**05-implementation-plan.md**

This document will later be given to another AI coding agent, which will implement the project phase-by-phase.

Convert the guide-only specifications into a **safe, structured, incremental plan** that minimizes bugs, hallucinations, regressions, and scope creep.

---

## 1. SOURCE OF TRUTH

Read all of these before planning:

- **01-problem-statement.md** — guide vision, boundaries, success criteria. Primary "why".
- **02-behavioral-blueprint.md** — complete guide behavior (§1–§25). Primary "what". Treat as binding.
- **03-ui-ux-design-system.md** — visual/interaction rules. Primary "how it looks". Binding.
- **04-tech-stack.md** — HTML/CSS/Vanilla JS + thin Express + local mock. Binding tech constraints.
- **Existing project** — inspect what exists (currently docs-only). Reuse, don't rebuild; never assume code correctness.

Scope reminder: **guide only** — search → understand → requirements → dependency → next step. No applications, tracking, wallets, verification, dashboards, auth, payments, notifications, officer views, or integrations.

---

## 2. PRIMARY OBJECTIVE

Produce: **Phases → Objectives → Workstreams → Tasks → Subtasks → Validation → Completion criteria**, ordered by real dependencies so the coding agent never has to reinterpret the specs.

Do NOT mirror `02`'s section order into phases (Phase 1 ≠ §§1–10). Derive order from: feature/data/UI dependencies, shared components, navigation needs, risk, testability. Each phase = small enough to hold in context, large enough to demo something coherent.

---

## 3. DEPENDENCY MAP (derive, don't assume)

Minimum chain to respect (refine yourself):

```text
design tokens + base layout
  → data-access layer (getGuide/search/getRelated over local guides.json)
    → home search + suggestions
      → search results (incl. disambiguation + no-results)
        → guide page core (overview/requirements/steps/where/related)
          → dependency system (clickable prereqs, tree, one-of/conditional/uncertain, cycle+broken-link guards)
            → browse indexes (Services/Documents/Guides thin views)
              → hardening (states, a11y, responsive, copy, dead-link sweep)
```

Shared foundations to establish ONCE then reuse: type badges, result/requirement/related card (one style), requirement rows, dependency tree, steps list, header/nav/breadcrumb, search + suggestions, loading/empty/error patterns, honesty/demo labeling.

---

## 4. PHASE CONTRACT (every phase needs all of these)

- **Objective** — concrete outcome (e.g. "citizen can search 'PAN' and open its guide", "ATM → PAN prerequisite chain is clickable to depth 2").
- **Why** — problem it solves.
- **Dependencies** — what must exist.
- **Scope / Non-scope** — explicit, to block creep (name the tempting extras and defer them).
- **Workstreams + Tasks + Subtasks** — specific, observable, testable (`[ ]` checkboxes). Bad: "Build guides". Good: "Render prerequisite requirements with guideId as full-row links resolving via data-access.js".
- **Behavioral requirements** — for each action: user action / system response / UI response / next step / failure behavior.
- **UI/UX requirements** — tokens, components, states referenced to `03`.
- **Edge cases + failure states** — from `02` §§19–20 that apply to this phase.
- **Validation** — behavioral, UI, edge-case, regression, responsive (360px + desktop), keyboard/screen-reader where UI ships.
- **Definition of done** — behavior works, not "screen exists".
- **Regression checklist** — what prior behavior must still work.
- **Risk** — Low/Med/High + why; High = smaller steps + more validation.

---

## 5. NON-NEGOTIABLE RULES FOR THE PLAN

1. **Guide-only.** Any task implying submission, tracking, wallet, verification, eligibility verdicts, officer views, auth, or integrations must be rejected or moved to "Deferred (post-V1)".
2. **Generic dependency system.** `ATM → PAN` is demo data, never a special case. Plan must require `guideId`-driven links, recursive rendering, cycle/broken-link guards, build/boot validation.
3. **Data-access seam.** All pages call `getGuide()/searchGuides()/getRelated()`; never raw JSON imports. Mock → official swap touches one layer.
4. **Content honesty.** Every phase rendering guides must include demo labeling + hedged copy + official-link labeling. Forbid invented fees/timelines/verdicts/URLs.
5. **UX + behavior together.** No invisible-system phases; every capability validated through its UI. But no premature polish over broken behavior (correct → coherent → consistent → refined).
6. **One vocabulary.** `guide / requirement / prerequisite / steps / official portal`. Never `journey/workflow/application/status`.
7. **Accessibility + mobile planned per UI phase**, not deferred: semantics, focus, `/` shortcut, live regions, 44px targets, contrast, tree-as-list, 200% zoom.
8. **No tech dictation** beyond `04` constraints (no frameworks, file-structure suggestions only as non-binding sketches, no code dumps).
9. **No invented features.** Genuinely valuable extras → `Recommended Enhancements` with rationale, never silently scoped in.

---

## 6. COVERAGE CHECK (plan must include)

- Home hero search + suggestions + popular/common entry points.
- Results: ranked cards, disambiguation, no-results with related + tips.
- Guide page: all 12 blocks in `02` §11 in order, anchor-linkable requirements.
- Requirements: required/optional/conditional/uncertain + `requires-one-of` groups + plain items (no fake links).
- Dependency view: simple tree, recursive, breadcrumb + Back behavior, unknown-id and cycle guards.
- Steps + Where/How (external-labeled official links; omit URL rather than guess).
- Related guides (≤4).
- Browse thin views (Services/Documents/Guides over same data).
- Failure states: unknown guide, search-index failure, malformed data — human copy + next action.
- Seed data spec: ~10–14 guides incl. ATM→PAN→Aadhaar chain, conditional/one-of/uncertain/alias/goal-phrase examples.
- Final hardening + end-to-end demo (Journeys A/B/C from `02` §25 must be named as acceptance).

---

## 7. OUTPUT STRUCTURE (generate exactly this)

```markdown
# 05-implementation-plan.md
## 1. Implementation Strategy
## 2. Existing Project Assessment
## 3. Product Dependency Map
## 4. Shared Foundations
## 5. Implementation Phases
### Phase X — [Name] (Objective/Why/Dependencies/Scope/Non-Scope/Workstreams/Tasks/Behavioral/UI/Edge/Failure/Validation/Done/Regression/Risk)
## 6. Integration / Cross-Phase Rules
## 7. Known Ambiguities (unclear / why it matters / options / recommendation)
## 8. Specification Conflicts (conflict / impact / resolution)
## 9. Recommended Enhancements (deferred, with rationale)
## 10. Final Hardening Checklist
## 11. End-to-End Demo Journey (A/B/C acceptance scripts)
```

Keep references concise (`Related spec: 02 §10 search ranking`) instead of pasting spec text.

---

## 8. FINAL QUALITY GATE (check before emitting)

Coverage of `02` §§1–25? Dependencies ordered? Shared components established once? Guide-only scope held? Honesty states present? Every phase testable + regression-guarded? Mobile + a11y per UI phase? Demo journeys (esp. ATM→PAN depth-2 + failure paths) achievable early-ish and green at end? Phase sizes executable without context loss? If any "no", revise.

**Most important: plan the build order and exact verifiable behaviors — don't summarize the product.** Optimize for reliable implementation: correctness → dependencies → completeness → consistency → validation → polish.

*Output exclusively the roadmap file. Do not modify application code or claim implementation.*
