# MASTER PROMPT — GENERATE THE IMPLEMENTATION PLAN

You are the **lead product architect, senior UX engineer, QA strategist, and implementation planner** for this project.

Your task is NOT to implement the website.

Your task is to create a highly detailed, dependency-aware, implementation-ready document named:

**PlanImplementation.md**

This document will later be given to another AI coding agent, which will implement the project phase-by-phase.

Your responsibility is therefore to convert the project's complete behavioral specification and UI/UX design system into a **safe, structured, incremental implementation plan** that minimizes bugs, hallucinations, regressions, inconsistent behavior, and incomplete features.

---

# 1. SOURCE OF TRUTH

Before creating the implementation plan, read and understand ALL of the following:

### Required source

**SIH26129 — Complete Behavioral Blueprint.md**
**Problem-Statement.md**

This contains the complete product behavior, functionality, workflows, edge cases, dependencies, user journeys, government-side behavior, citizen-side behavior, and product vision.

Treat it as the primary behavioral specification.

### Required source

**UI-UX-Design-System.md**

This contains the permanent visual and interaction design rules.

Treat it as the primary UI/UX specification.

### Existing project

Inspect the existing project/codebase and understand:

* what already exists
* what is partially implemented
* what is complete
* what is broken
* what can be reused
* what should be refactored
* what should NOT be rebuilt
* what assumptions the existing code currently makes
* which screens/components already establish design patterns

Do not assume the project is empty.

Do not assume existing code is correct.

Do not unnecessarily rebuild working functionality.

---

# 2. PRIMARY OBJECTIVE

Create a phased implementation roadmap that allows an AI coding agent to build the entire product **incrementally and safely**.

The resulting plan must transform the broad product specification into:

**Phases → Objectives → Workstreams → Tasks → Subtasks → Validation → Completion criteria**

The implementation agent should be able to work through the plan without having to repeatedly reinterpret the original product specification.

---

# 3. DO NOT MANUALLY FOLLOW THE ORDER OF PLAN.md

Do NOT simply turn the numbered sections of Plan.md into:

Phase 1 = points 1–10

Phase 2 = points 11–20

etc.

That is NOT the objective.

Instead, analyze the entire specification and determine the most logical implementation order based on:

* feature dependencies
* behavioral dependencies
* UI dependencies
* shared components
* reusable patterns
* data dependencies
* navigation dependencies
* state dependencies
* user journey dependencies
* testing requirements
* risk
* complexity
* likelihood of regression
* ability to validate each stage independently

You must use your own reasoning to determine the safest phase structure.

---

# 4. PHASE DESIGN PRINCIPLE

Each phase must produce a meaningful, testable improvement to the product.

A phase should NOT be:

> "Build some UI."

Instead, it should have a concrete outcome.

For example, conceptually:

> "A citizen can discover a service, understand its requirements, and enter its journey."

or:

> "A citizen can encounter a missing prerequisite, enter that prerequisite journey, and return to the original journey without losing context."

The exact phases must be determined from the specifications and existing project.

---

# 5. PHASES MUST HAVE DEPENDENCIES

Before defining phases, identify the dependency graph of the product.

Determine:

### What must exist before something else can work?

For example:

A dependency-aware journey may require:

Service discovery

↓

Service definition

↓

Requirement representation

↓

Document state

↓

Prerequisite relationship

↓

Journey state

↓

Navigation between journeys

Therefore, the implementation plan should reflect the logical dependency chain.

Do not implement high-level features before their required foundations exist unless there is a deliberate reason.

---

# 6. IDENTIFY FOUNDATIONAL SYSTEMS

Analyze Plan.md and determine which concepts are reused throughout the product.

Examples may include:

* services
* documents
* requirements
* eligibility
* journeys
* applications
* statuses
* dependencies
* notifications
* user profile
* government departments
* life events
* benefits
* timelines
* errors
* loading states
* empty states

Do not assume this list is complete.

Identify all foundational concepts yourself.

For every foundational concept, determine:

* where it is used
* what must exist before it
* what depends on it
* how it should behave
* how it should appear in the UI
* how it should be validated

---

# 7. BUILD FROM SHARED FOUNDATIONS

Prioritize reusable foundations before repeatedly implementing similar behavior.

For example, if multiple screens require:

* service cards
* status badges
* document cards
* journey steps
* requirement displays
* confirmation dialogs

the implementation plan should establish a consistent pattern before duplicating it across multiple pages.

Avoid plans that cause the coding agent to independently invent the same component multiple times.

---

# 8. UI/UX CONSISTENCY IS A HARD REQUIREMENT

Every phase must reference and respect:

**UI-UX-Design-System.md**

The implementation plan must explicitly preserve:

* typography
* spacing
* colors
* buttons
* cards
* status indicators
* forms
* navigation
* responsive behavior
* animations
* transitions
* accessibility
* loading states
* empty states
* error states

Do not allow individual phases to invent their own visual language.

---

# 9. DO NOT OVERLOAD A PHASE

A phase should be small enough that an AI coding agent can implement it without losing context.

If a feature contains many independent behavioral areas, divide it into smaller phases or workstreams.

Avoid giant phases such as:

> "Implement entire citizen dashboard."

Instead, decompose the dashboard according to its actual dependencies and behavior.

However, do not create meaningless micro-phases either.

The goal is:

**small enough to reason about + large enough to produce a meaningful outcome.**

---

# 10. EVERY PHASE MUST HAVE A CLEAR CONTRACT

For every phase, include:

### Phase name

A concise descriptive name.

### Objective

What this phase is supposed to accomplish.

### Why this phase exists

What problem it solves.

### Dependencies

What must already exist.

### Scope

What is included.

### Non-scope

What deliberately should NOT be implemented yet.

This prevents scope creep.

---

# 11. GRANULAR TASK BREAKDOWN

Every phase must contain detailed TODOs.

Use a structure similar to:

### Tasks

* [ ] Task

  * [ ] Subtask
  * [ ] Subtask
  * [ ] Subtask

Tasks should be specific enough that the implementation agent knows what needs to be done.

Avoid vague TODOs such as:

> [ ] Improve dashboard

Instead:

> [ ] Create the dashboard section that prioritizes citizen actions requiring attention.

Then include its expected behavior.

---

# 12. BEHAVIOR MUST BE EXPLICIT

For every meaningful feature, describe:

### User action

What the user does.

### System response

What the system should do.

### UI response

What the user should see.

### State transition

What changes after the action.

### Next step

Where the user goes next.

### Failure behavior

What happens if something goes wrong.

This is especially important for:

* service journeys
* dependencies
* documents
* applications
* eligibility
* navigation
* government handoffs

---

# 13. HANDLE DEPENDENCIES EXPLICITLY

The product's prerequisite behavior is critical.

The implementation plan must explicitly account for scenarios such as:

**ATM Card**

↓

**PAN Card required**

↓

Citizen does not have PAN Card

↓

Citizen selects:

**Get PAN Card**

↓

PAN Card requirements are shown

↓

Citizen enters PAN Card journey

↓

Citizen can complete/save/return

↓

Citizen returns to ATM Card journey

↓

ATM Card journey recognizes the updated prerequisite state

↓

Citizen continues.

The plan must ensure this behavior is designed as a reusable system rather than a one-off implementation.

---

# 14. HANDLE ALL MAJOR STATES

Every major feature must consider appropriate states.

At minimum, investigate whether it needs:

* initial
* loading
* available
* unavailable
* empty
* incomplete
* completed
* pending
* action required
* error
* expired
* rejected
* cancelled
* unavailable temporarily
* conflicting information

Do not blindly add irrelevant states.

Determine which states logically apply to each feature.

---

# 15. EDGE-CASE ANALYSIS

For every major workflow, actively search for behavioral loopholes.

Ask:

> What happens if the user does not have the required document?

> What if the document is expired?

> What if information conflicts?

> What if the user leaves halfway?

> What if they return later?

> What if the dependency is completed?

> What if the dependency is rejected?

> What if the dependency becomes unavailable?

> What if the user starts the same journey twice?

> What if the user already has an active application?

> What if a requirement changes?

> What if a service is temporarily unavailable?

> What if the government status has not updated?

> What if the user is not eligible?

> What if eligibility cannot yet be determined?

> What if the user provides incorrect information?

> What if an application is rejected?

> What if correction is possible?

> What if correction is not possible?

> What if another department is responsible?

> What if the user is only helping someone else?

> What if the applicant and beneficiary are different?

> What if the user needs human assistance?

Identify additional edge cases yourself.

---

# 16. NEVER ASSUME IDEAL CONDITIONS

The plan must not be based only on:

> User does everything correctly.

Government-service workflows are inherently messy.

The implementation plan must account for incomplete, contradictory, outdated, unavailable, delayed, rejected, duplicated, and interrupted states wherever applicable.

---

# 17. PRESERVE USER CONTEXT

Whenever a user enters a secondary journey from a primary journey, the plan must explicitly preserve context.

Example:

Primary:

**ATM Card**

↓

Dependency:

**PAN Card**

↓

PAN Card journey

↓

Return

↓

ATM Card

The citizen should not lose:

* original goal
* original service
* completed requirements
* pending requirements
* previous progress

The implementation plan must treat this as a reusable navigation behavior.

---

# 18. DO NOT CREATE FAKE GOVERNMENT BEHAVIOR

If the actual government integration is not available in the current project, the implementation plan must clearly distinguish:

### Demonstration behavior

from:

### Actual government-connected behavior

Do not instruct the coding agent to pretend that a government approval happened.

Do not invent:

* eligibility
* application status
* government decisions
* document validity
* processing times
* official requirements

Use clearly defined demonstration states where necessary.

---

# 19. DEMO DATA MUST BE REALISTIC

If the project requires demonstration data, define realistic examples based on the product specification.

The data should demonstrate:

* service dependencies
* document availability
* missing documents
* expired documents
* application progress
* government handoffs
* life events
* benefits
* bottlenecks

Do not create random unrelated sample data.

The demo should tell the story of the product.

---

# 20. IMPLEMENTATION ORDER SHOULD SUPPORT DEMONSTRATION

The phase plan should eventually allow the project to reach meaningful demo milestones.

Do not leave the most important user journey until the absolute end.

The plan should produce progressively demonstrable states.

At multiple points, the product should be usable enough to demonstrate a coherent portion of the vision.

---

# 21. CITIZEN AND GOVERNMENT EXPERIENCES

Treat them as related but distinct experiences.

The plan must account for:

### Citizen side

* discovery
* guidance
* requirements
* documents
* dependencies
* journeys
* applications
* status
* notifications
* benefits
* life events
* assistance

### Government side

* application handling
* verification
* cross-department handoff
* responsibility
* bottlenecks
* delays
* service performance
* workflow visibility
* feedback
* government-level insights

Determine the appropriate implementation order from their dependencies.

---

# 22. DO NOT BUILD ANALYTICS BEFORE THE UNDERLYING BEHAVIOR EXISTS

If an analytics feature depends on application states, those states must exist first.

If bottleneck visualization depends on cross-department workflow, that workflow must exist first.

The implementation plan must respect such dependencies.

---

# 23. VALIDATION AFTER EVERY PHASE

Every phase must end with a validation section.

Include:

### Behavioral validation

What user journeys must work.

### UI validation

What visual behavior must be checked.

### Edge-case validation

What failure/exception scenarios must be tested.

### Regression validation

What previously working behavior must still work.

### Responsive validation

What must be checked on mobile and desktop.

---

# 24. DEFINITION OF DONE

Every phase must have explicit completion criteria.

A phase is not complete merely because:

> "The screen exists."

It is complete only when its intended behavior works.

For example:

* user can start the journey
* required information is displayed
* missing prerequisite is identified
* dependency can be opened
* context is preserved
* returning restores the original journey
* error state works
* loading state works
* mobile layout works
* existing functionality remains intact

Use criteria appropriate to each phase.

---

# 25. REGRESSION PROTECTION

After each phase, identify what existing behavior could accidentally break.

The plan should include a small regression checklist.

Especially protect:

* navigation
* search
* existing journeys
* document states
* dependency behavior
* responsive layout
* shared components
* existing styling

---

# 26. REFACTORING

If the existing project contains duplicated or conflicting implementations, identify them.

Do not automatically rewrite everything.

Instead determine:

* what should remain
* what should be unified
* what should be deprecated
* what should be refactored
* what should be left untouched

Refactoring should have a reason.

---

# 27. AVOID PREMATURE POLISH

Do not spend an early phase perfecting animations while core behavior is incomplete.

Prioritize approximately:

**correct behavior → coherent UX → visual consistency → refinement**

The exact ordering can be adjusted based on dependencies.

---

# 28. BUT DO NOT LEAVE UX UNTIL THE END

UI and behavior must evolve together.

Do not build an entire invisible system and only later decide how users interact with it.

Every user-facing capability should be validated through its intended interface.

---

# 29. ACCESSIBILITY MUST BE PLANNED, NOT ADDED RANDOMLY

For every major UI system, consider:

* readable typography
* contrast
* focus states
* keyboard behavior
* touch targets
* labels
* non-color status communication
* responsive behavior

Do not create inaccessible components and postpone the issue indefinitely.

---

# 30. MOBILE-FIRST VALIDATION

Every citizen-facing phase must include mobile validation.

Check:

* narrow screens
* long text
* large document names
* multiple statuses
* long forms
* timelines
* dependency chains
* notifications
* navigation

Do not assume desktop behavior automatically translates to mobile.

---

# 31. CONTENT MUST BE CONSISTENT

Use the terminology established by Plan.md.

Don't randomly rename concepts across screens.

For example, if the product uses:

**Journey**

don't create another screen calling the same concept:

**Workflow**

unless there is a meaningful distinction.

Maintain one vocabulary.

---

# 32. TRACEABILITY

Every important implementation task should be traceable back to the specification.

Where useful, reference the relevant concept or section from Plan.md.

Do not copy huge sections of Plan.md into the implementation plan.

Instead, create concise references.

Example:

> Related specification: Service Dependencies / Prerequisite Journey

This allows the implementation agent to verify intent.

---

# 33. DO NOT INVENT FEATURES JUST TO FILL PHASES

Additional improvements are allowed only when they:

* solve a clear loophole
* improve usability
* protect against a realistic failure
* improve accessibility
* improve consistency
* directly support the stated product vision

Do not add unrelated features.

If you identify a genuinely valuable missing feature, put it in:

### Recommended Enhancements

and explain why it matters.

Do not silently change the product scope.

---

# 34. IDENTIFY AMBIGUITIES

If Plan.md contains ambiguous behavior:

Do NOT silently invent an interpretation.

Create:

### Decisions Required

For each ambiguity:

* what is unclear
* why it matters
* possible interpretations
* recommended interpretation

If the ambiguity can safely be resolved using the existing product vision, state the chosen interpretation and why.

---

# 35. IDENTIFY CONTRADICTIONS

If different parts of the specification conflict:

Create:

### Specification Conflicts

Explain:

* conflict
* affected behavior
* recommended resolution

Do not create an implementation plan that leaves contradictory behavior unresolved.

---

# 36. RISK CLASSIFICATION

For every major phase, classify risk:

### Low

Straightforward UI/content behavior.

### Medium

Multiple states or shared dependencies.

### High

Cross-journey behavior, application state, complex dependencies, or government workflow behavior.

High-risk phases should have more detailed validation and smaller implementation steps.

---

# 37. PHASE SIZING

Use your judgment.

There is no predetermined number of phases.

Do NOT force the project into:

5 phases

10 phases

15 phases

or any arbitrary number.

Create as many phases as are genuinely necessary to keep implementation manageable and safe.

---

# 38. PHASE ORDER

The overall order should generally move from:

**Understanding the existing project**

→

**Foundational patterns**

→

**Core user experience**

→

**Core service behavior**

→

**Complex dependencies**

→

**Applications and tracking**

→

**Government workflows**

→

**Advanced intelligence**

→

**Polish and hardening**

BUT this is only a conceptual guideline.

Determine the actual order yourself from the real dependencies in Plan.md and the existing project.

---

# 39. IMPLEMENTATION CHECKPOINTS

After meaningful groups of phases, define a checkpoint.

A checkpoint should answer:

> Is the product still coherent?

> Are the main journeys working?

> Did anything regress?

> Is the UI still consistent?

> Are we ready to proceed?

These checkpoints prevent errors from accumulating across dozens of phases.

---

# 40. FINAL HARDENING PHASE

The implementation plan must eventually include a dedicated stabilization/hardening stage.

It should review:

* all major user journeys
* dependency flows
* document states
* application states
* government workflows
* errors
* loading states
* empty states
* responsive layouts
* accessibility
* navigation
* consistency
* copy
* animations
* edge cases
* regression
* dead ends
* broken links/actions
* contradictory states

Do not consider the product complete without this stage.

---

# 41. FINAL DEMO JOURNEY

The plan must define at least one complete end-to-end demonstration journey that showcases the core innovation.

Preferably a journey where:

**Citizen goal**

↓

**Service discovery**

↓

**Missing prerequisite**

↓

**Dependency journey**

↓

**Return to original journey**

↓

**Application**

↓

**Government processing**

↓

**Cross-department dependency**

↓

**Status tracking**

↓

**Outcome**

↓

**Government-side insight**

The exact demonstration journey should be chosen based on the strongest scenario supported by the project.

---

# 42. PLANIMPLEMENTATION.MD STRUCTURE

Generate the final document using this general structure:

# PlanImplementation.md

## 1. Implementation Strategy

Explain the overall implementation philosophy.

## 2. Existing Project Assessment

Summarize what already exists and what the implementation must account for.

## 3. Product Dependency Map

Describe the major behavioral dependencies.

## 4. Shared Foundations

List reusable concepts/components that must be established.

## 5. Implementation Phases

For each phase:

### Phase X — [Name]

**Objective**

**Why**

**Dependencies**

**Scope**

**Non-Scope**

### Workstreams

### Tasks

### Subtasks

### Behavioral Requirements

### UI/UX Requirements

### Edge Cases

### Failure States

### Validation

### Definition of Done

### Regression Checklist

### Risk

---

## 6. Integration / Cross-Phase Rules

Rules that must remain true throughout implementation.

## 7. Known Ambiguities

Anything requiring a decision.

## 8. Specification Conflicts

Anything contradictory.

## 9. Recommended Enhancements

Only genuinely valuable additions.

## 10. Final Hardening Checklist

Complete-system validation.

## 11. End-to-End Demo Journey

The strongest demonstration path.

---

# 43. TASK WRITING STANDARD

Tasks must be:

**specific**

**observable**

**testable**

**dependency-aware**

**non-ambiguous**

Bad:

> [ ] Build services

Good:

> [ ] Establish the service representation used by discovery, service details, requirements and journey creation.

Bad:

> [ ] Make dependencies work

Good:

> [ ] Implement the behavioral flow in which a missing prerequisite can be opened as a separate journey while preserving the originating service context.

---

# 44. NEVER WRITE IMPLEMENTATION TASKS THAT HIDE MULTIPLE UNKNOWN PROBLEMS

If a task contains several unrelated decisions, split it.

Bad:

> [ ] Build the entire citizen service journey, documents, eligibility, applications and notifications.

Instead separate the work according to actual dependencies.

The implementation agent should be able to complete a task and confidently know whether it is done.

---

# 45. DO NOT DICTATE TECHNICAL IMPLEMENTATION

This document is an implementation roadmap, not a code tutorial.

Do not prescribe:

* specific frameworks
* libraries
* database schemas
* API architecture
* file structures
* code snippets
* programming patterns

unless the existing project already requires a specific constraint that must be preserved.

Focus on:

**what must exist**

**how it behaves**

**how it interacts**

**how it is validated**

---

# 46. CODING AGENT HANDOFF

The final PlanImplementation.md should be written so another AI agent can receive:

**Plan.md**

*

**UI-UX-Design-System.md**

*

**PlanImplementation.md**

and then execute the implementation phase-by-phase.

The coding agent should not need to invent the product behavior.

It should implement the behavior described by these documents.

---

# 47. IMPORTANT: DON'T IMPLEMENT WHILE PLANNING

You are creating the plan.

Do not modify the application.

Do not write production code.

Do not claim a feature is implemented.

Do not generate fake completion reports.

Your output is exclusively the implementation roadmap.

---

# 48. FINAL QUALITY CHECK BEFORE GENERATING THE FILE

Before producing PlanImplementation.md, internally verify:

### Coverage

Did you cover the entire behavioral specification?

### Dependencies

Did you identify what must come before what?

### Edge cases

Did you actively search for loopholes?

### UX

Did you preserve the UI design system?

### Citizen

Can the citizen complete the intended journeys?

### Government

Can the government-side workflows eventually function?

### State

Are meaningful states represented?

### Errors

Are failure behaviors defined?

### Context

Are prerequisite journeys capable of returning to the originating journey?

### Regression

Does each phase protect existing behavior?

### Validation

Can every phase be objectively tested?

### Scope

Did you avoid inventing unrelated features?

### Phase sizing

Can an AI reasonably execute each phase without losing context?

### Final product

Does the complete sequence actually produce the product described by Plan.md?

Only after this review should you generate the final PlanImplementation.md.

---

# 49. MOST IMPORTANT RULE

**Plan the implementation; do not merely summarize the product.**

Plan.md answers:

> **WHAT should the product do?**

UI-UX-Design-System.md answers:

> **HOW should the product look and feel?**

PlanImplementation.md must answer:

> **IN WHAT SAFE, LOGICAL, DEPENDENCY-AWARE ORDER should an AI implement it, what exactly must it do at each step, and how do we know each step is correct?**

The final plan should minimize the amount of interpretation required from the coding AI.

When uncertain, prioritize:

**correctness → dependencies → behavioral completeness → consistency → validation → polish.**

Do not optimize for fewer phases.

Optimize for **a reliable implementation with minimal regressions and minimal ambiguity.**
