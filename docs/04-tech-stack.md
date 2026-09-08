# SIH26129 — TECHNOLOGY STACK & IMPLEMENTATION RULES

You are implementing a modern government-service integration platform based on the project's behavioral specification and UI/UX design system.

This document defines the **technology stack, implementation philosophy, and technical boundaries** for the project.

It should be used together with:

* `02-behavioral-blueprint.md` — product behavior and requirements
* `03-ui-ux-design-system.md` — visual and interaction system
* `05-implementation-plan.md` — phased implementation roadmap

These documents serve different purposes.

**02-behavioral-blueprint.md** defines WHAT the product should do.

**03-ui-ux-design-system.md** defines HOW the product should look and feel.

**05-implementation-plan.md** defines IN WHAT ORDER it should be built.

**04-tech-stack.md** defines the TECHNOLOGY AND ENGINEERING ENVIRONMENT in which it should be built.

---

# 1. CORE STACK

The project should primarily use:

### Frontend

**HTML**

**CSS**

**Vanilla JavaScript**

### Backend

**Node.js**

**Express.js**

The frontend must remain based on standard web technologies.

Do not introduce a frontend framework simply because a feature becomes slightly more convenient with one.

The project should remain understandable to developers who know:

* HTML
* CSS
* JavaScript

---

# 2. FRONTEND PHILOSOPHY

The frontend should be built using:

**Semantic HTML + well-structured CSS + Vanilla JavaScript**

The interface should not depend on a frontend framework for its fundamental behavior.

The code should remain:

* understandable
* modular
* maintainable
* easy to debug
* easy to modify
* easy for beginners to follow
* straightforward for AI coding agents to reason about

Avoid unnecessary abstraction.

At the same time, do not intentionally write chaotic or duplicated code merely because the project uses Vanilla JavaScript.

Use good engineering judgment.

---

# 3. HTML

HTML should provide the semantic structure of the application.

Prefer meaningful elements such as:

* `header`
* `nav`
* `main`
* `section`
* `article`
* `aside`
* `footer`
* `form`
* `button`
* `label`

Do not use generic containers for everything when a semantic element is appropriate.

Interactive elements must behave like actual interactive elements.

For example:

Use a real button for an action rather than making a random `div` clickable.

---

# 4. CSS

Use **plain CSS**.

Do not use:

* Tailwind CSS
* Bootstrap
* Material UI
* component frameworks
* CSS utility frameworks

The project's visual language should be controlled directly through CSS.

This is intentional.

The UI needs to remain:

* easy to understand
* easy to customize
* consistent
* visually controllable

---

# 5. CSS ORGANIZATION

CSS should be organized logically.

Separate reusable design concepts from page-specific styling where practical.

Common concepts should have reusable styles for things such as:

* buttons
* cards
* forms
* inputs
* badges
* statuses
* navigation
* modals
* journeys
* document cards
* service cards
* notifications

Do not repeatedly recreate visually identical components with slightly different CSS.

---

# 6. DESIGN TOKENS / VARIABLES

Use CSS custom properties for major design values.

Examples include:

* colors
* typography
* spacing
* radii
* shadows
* transitions
* layout dimensions

This allows the entire visual system to remain consistent.

If the primary color changes, the entire interface should be easy to update.

Do not scatter identical values throughout hundreds of unrelated CSS rules when a shared variable is appropriate.

---

# 7. VANILLA JAVASCRIPT

All frontend behavior should be implemented with standard JavaScript.

Use JavaScript for:

* navigation behavior
* search
* service discovery
* filtering
* forms
* journey progression
* document states
* dependency behavior
* application status
* modals
* notifications
* dynamic content
* validation
* state changes
* animations/interactions

Keep behavioral logic separate from presentation wherever reasonably possible.

---

# 8. JAVASCRIPT STRUCTURE

Avoid creating one enormous JavaScript file containing the entire application.

Organize functionality into logical modules/files where beneficial.

Examples of conceptual modules:

* service discovery
* journey management
* document management
* application management
* dependency handling
* notifications
* UI utilities
* mock data
* government workflow simulation

The exact file structure should be determined by the project and implementation needs.

Do not create dozens of tiny files without a meaningful reason.

---

# 9. COMPONENT THINKING WITHOUT A FRAMEWORK

Even though the project uses Vanilla JavaScript, still think in terms of reusable UI components.

For example:

**Service Card**

should have one consistent implementation.

**Document Card**

should have one consistent implementation.

**Status Badge**

should have one consistent implementation.

**Journey Step**

should have one consistent implementation.

**Modal**

should have one consistent implementation.

Do not duplicate the same UI structure across multiple pages unnecessarily.

---

# 10. BACKEND

Use:

**Node.js + Express.js**

when backend behavior is genuinely useful or required.

The backend should not be artificially introduced simply because the project has a backend stack available.

At the same time, do not avoid backend functionality when it improves:

* user experience
* state handling
* application behavior
* separation of concerns
* future integration
* realistic government workflow simulation

Use engineering judgment.

---

# 11. BACKEND PHILOSOPHY

The backend should remain simple.

Do not build an unnecessarily complicated enterprise architecture for the prototype.

The objective is:

**simple now → extensible later**

The code should be structured so that future functionality can be introduced without throwing away the entire project.

---

# 12. EXPRESS

Express should be used for backend routes and services where appropriate.

Backend responsibilities may include things such as:

* serving application data
* managing simulated application state
* handling form submissions
* managing mock service workflows
* processing requests
* simulating government service interactions
* preparing the project for future external integrations

Only introduce backend behavior where it provides a real benefit.

---

# 13. DATA STRATEGY

For the current prototype:

**Use mock/demo data.**

There are currently no live government API integrations.

The system should therefore simulate government information and workflows using realistic data.

The mock data should represent realistic scenarios such as:

* services
* departments
* requirements
* documents
* eligibility
* applications
* application states
* dependencies
* government handoffs
* notifications
* benefits
* bottlenecks

---

# 14. MOCK DATA MUST BE STRUCTURED REALISTICALLY

Do not create random hardcoded strings throughout the interface.

Keep demonstration data organized and reusable.

For example, conceptually:

**Service**

has:

* name
* description
* department
* requirements
* dependencies
* eligibility information
* journey stages

A:

**Document**

has:

* name
* status
* validity
* relevance
* issuing authority

An:

**Application**

has:

* service
* current stage
* status
* timeline
* pending dependency
* responsible department

The exact representation should follow the needs of the implementation.

---

# 15. NO DATABASE FOR THE CURRENT PROTOTYPE

Do not introduce:

* MongoDB
* PostgreSQL
* MySQL
* Firebase
* Supabase
* cloud databases
* online persistence services

for the current prototype unless the project requirements later explicitly change.

Data should remain local/demo-oriented for now.

The architecture should nevertheless avoid making future persistence impossible.

---

# 16. NO EXTERNAL GOVERNMENT APIs FOR NOW

The current implementation should not depend on live government APIs.

Do not make the prototype unreliable because a government service is unavailable.

Government integrations should currently be represented through realistic simulated behavior.

The product should nevertheless be designed conceptually so these simulated interactions can later be replaced by legitimate official integrations.

---

# 17. FUTURE GOVERNMENT INTEGRATIONS

The current project is a prototype.

Future versions may connect with legitimate government systems where appropriate.

Therefore, do not design the application's behavior in a way that makes future integration unnecessarily difficult.

For example, conceptually separate:

**"What the citizen experiences"**

from:

**"Where the information currently comes from."**

Today:

> Mock government data

Future:

> Official government source

The citizen-facing experience should not need to be completely redesigned merely because the source of information changes.

---

# 18. NO SCRAPING

Do not scrape random government websites to simulate integration.

Do not depend on unofficial data sources.

Do not invent government endpoints.

Do not pretend an external integration exists when it does not.

For the prototype:

**Use mock data.**

For the future:

**Use legitimate official integrations.**

---

# 19. EXTERNAL SERVICES

External services are not currently required.

Do not introduce external services simply to make the project appear more advanced.

If a future requirement genuinely benefits from an external service, evaluate it based on:

* reliability
* security
* necessity
* maintainability
* user experience
* project requirements

The technology stack is allowed to evolve when the product genuinely requires it.

---

# 20. NPM DEPENDENCIES

There is no artificial rule that says:

> "Never use npm packages."

If a package genuinely improves the project, it may be used.

Examples might include:

* a high-quality icon solution
* a useful utility
* validation
* a legitimate backend requirement
* a development tool

However:

Do not install packages merely because they are popular.

Every dependency should have a meaningful purpose.

Do not add a framework when a simple native solution is more appropriate.

Do not remove a useful dependency merely for the sake of having fewer dependencies.

Use judgment.

---

# 21. ICONS

Prefer high-quality SVG icons.

Icons should be:

* consistent
* clean
* accessible
* appropriately sized
* visually aligned with the design system

Inline SVGs or an appropriate icon library may be used when beneficial.

Do not mix random icon styles.

Do not use emojis as the primary icon system.

---

# 22. FONTS

Use a modern, highly readable UI font consistent with `03-ui-ux-design-system.md`.

The exact font may be selected based on:

* readability
* visual quality
* availability
* performance
* language support

Typography must remain consistent throughout the product.

---

# 23. RESPONSIVENESS

The project must be fully responsive.

Primary target:

**Mobile + Desktop**

Also account for intermediate tablet-sized layouts.

Do not create separate unrelated implementations for mobile and desktop unless genuinely necessary.

The same product should adapt intelligently.

---

# 24. MOBILE-FIRST THINKING

Citizen-facing experiences should be designed with mobile use strongly in mind.

Pay special attention to:

* touch targets
* readable text
* form usability
* navigation
* long journeys
* document cards
* status information
* timelines
* dependency flows
* notifications

Never assume that a desktop layout can simply be compressed into mobile.

---

# 25. MODERN BROWSER SUPPORT

Target modern versions of:

* Chrome
* Edge
* Firefox
* Safari

Do not optimize the project around obsolete browser behavior unless a specific requirement is introduced later.

---

# 26. ACCESSIBILITY

Accessibility is part of implementation, not an optional final step.

Use:

* semantic HTML
* proper labels
* keyboard navigation
* visible focus states
* sufficient contrast
* accessible buttons
* meaningful status text
* appropriate ARIA only when necessary
* non-color indicators for important states

Do not rely solely on color.

For example:

Do not communicate:

> green = approved

without also communicating:

> ✓ Approved

---

# 27. STATE MANAGEMENT

Do not introduce a large state-management framework for the sake of it.

Use straightforward state handling appropriate to the application's current complexity.

The important requirement is behavioral correctness.

The system must reliably maintain states such as:

* current service
* current journey
* current step
* documents
* prerequisites
* applications
* status
* user actions
* navigation context

As complexity grows, organize state cleanly rather than allowing scattered variables to control the same behavior unpredictably.

---

# 28. PERSISTENCE

For the prototype, use appropriate local persistence when necessary to preserve the user's experience.

Examples may include:

* saved journeys
* progress
* mock application state
* preferences

However, do not create unnecessary persistence for information that does not need it.

---

# 29. NAVIGATION

Navigation should remain predictable.

If a user enters:

**ATM Card**

↓

**PAN Card prerequisite**

↓

**PAN Card journey**

the application must preserve the original context.

Returning should restore:

**ATM Card journey**

rather than forcing the user to search for ATM Card again.

This behavior is a product requirement and should be implemented reliably.

---

# 30. ERROR HANDLING

Technical errors must not leak into the citizen experience.

Do not show users:

* stack traces
* raw exceptions
* internal paths
* technical error codes
* debugging information

Instead provide human-readable messages.

For example:

> **We couldn't retrieve this information right now.**

Then:

> Your progress is safe.

and provide an appropriate next action.

---

# 31. DEVELOPMENT VS USER EXPERIENCE

Development convenience must never compromise the citizen-facing experience.

Do not expose:

* mock identifiers unnecessarily
* internal object names
* technical terminology
* debug states
* development-only controls

unless explicitly intended for the government/admin interface.

---

# 32. SECURITY-MINDED DEVELOPMENT

Even though this is a prototype, follow sensible security practices.

Do not:

* hardcode secrets
* expose credentials
* expose private information unnecessarily
* trust user input blindly
* pretend mock authentication is real authentication
* expose unrelated citizen information

Mock data should be fictional or non-sensitive.

---

# 33. GOVERNMENT DATA SHOULD BE FICTIONAL IN THE PROTOTYPE

Do not use real citizens' personal information.

Demonstration data should be synthetic.

Names, identifiers, documents and application records should be fictional.

---

# 34. NO FAKE AUTHORITY

The application must clearly distinguish:

**Platform guidance**

from:

**Actual government decision**

The system may say:

> You appear eligible.

It must not falsely claim:

> Government has approved you.

unless that is explicitly represented as a mock demonstration state.

Even mock demonstrations should be clearly understood as demonstration behavior when appropriate.

---

# 35. CODE QUALITY

Code should prioritize:

**clarity > cleverness**

Avoid unnecessarily complex patterns.

Prefer readable functions and predictable behavior.

Avoid giant functions that perform unrelated responsibilities.

Avoid duplicated logic where reuse is clearly beneficial.

Avoid abstractions that exist only to look sophisticated.

---

# 36. DON'T OVER-ENGINEER

This is a prototype intended to demonstrate a serious product vision.

Do not build:

* unnecessary microservices
* unnecessary databases
* unnecessary frameworks
* complex authentication systems
* elaborate infrastructure
* excessive abstraction layers

unless the project genuinely requires them.

The goal is not to create the largest codebase.

The goal is to create the **best working representation of the product.**

---

# 37. BUT DON'T UNDER-ENGINEER

Simplicity does not mean:

* everything in one HTML file
* everything in one JavaScript file
* duplicated code everywhere
* giant inline scripts
* random global variables
* hardcoded UI logic everywhere

Use reasonable structure.

The project should be easy to continue developing.

---

# 38. PRODUCTION-READY MINDSET

The current implementation should be:

**prototype-first, production-conscious.**

This means:

Build only what is currently necessary.

But build it cleanly enough that future development does not require throwing everything away.

The project should be reasonably capable of evolving toward:

* real government integrations
* persistent data
* stronger authentication
* real application workflows
* additional departments
* real government users
* production deployment

without fundamentally destroying the product structure.

---

# 39. DEMO-FIRST, NOT DEMO-ONLY

The application must be excellent for the SIH demonstration.

But do not implement artificial behavior that would make the project impossible to evolve later.

A feature may use mock data today while maintaining realistic behavior.

Example:

Today:

**Mock PAN verification**

Future:

**Official PAN verification**

The citizen journey should conceptually remain compatible with both.

---

# 40. PERFORMANCE

Keep the application responsive.

Avoid unnecessary:

* huge assets
* excessive JavaScript
* unnecessary network requests
* expensive animations
* repeated rendering
* redundant processing

The interface should feel fast.

Especially prioritize responsiveness on mobile devices.

---

# 41. ANIMATIONS

Animations should follow the UI/UX design system.

Use animations to communicate:

* transitions
* state changes
* navigation
* hierarchy
* progress
* relationships

Do not add animations simply because they are possible.

Never let animation interfere with task completion.

---

# 42. LOADING BEHAVIOR

Where operations take time, provide meaningful feedback.

Examples:

> Checking available documents...

> Preparing your journey...

> Retrieving application status...

Avoid making the interface appear frozen.

Never display a fake successful result while a real operation is still pending.

---

# 43. MOCK GOVERNMENT BEHAVIOR

When simulating a government service, make the simulation behaviorally realistic.

It should be possible to demonstrate:

* submission
* verification
* waiting
* additional information
* cross-department dependency
* approval
* rejection
* correction
* completion

The simulation should support the product's behavioral specification rather than being random placeholder data.

---

# 44. TESTABILITY

Implementation should make important behaviors easy to test manually.

Especially test:

### Service discovery

### Eligibility

### Document availability

### Missing prerequisites

### Dependency navigation

### Returning to the original journey

### Application submission

### Application status

### Government handoffs

### Errors

### Loading states

### Mobile responsiveness

### Accessibility

---

# 45. DEVELOPMENT SHOULD FOLLOW PLANIMPLEMENTATION.MD

Do not attempt to implement the entire product simultaneously.

Follow the phases defined in:

**05-implementation-plan.md**

The coding agent should work on the currently assigned phase while respecting:

* 02-behavioral-blueprint.md
* 03-ui-ux-design-system.md
* 04-tech-stack.md

Do not silently skip foundational dependencies.

Do not jump ahead merely because a later feature looks visually exciting.

---

# 46. PHASE BOUNDARIES

When implementing a phase:

Understand:

**What this phase is responsible for.**

Also understand:

**What this phase deliberately does not implement yet.**

Avoid implementing unrelated future features.

However, if a missing prerequisite is necessary for the current phase to function correctly, implement the minimum required foundation rather than creating broken placeholder behavior.

---

# 47. REUSE BEFORE REBUILD

Before creating a new implementation, inspect the existing project.

Ask:

> Does this already exist?

> Can it be reused?

> Can it be extended?

> Is the existing implementation correct?

> Would rebuilding cause regression?

Prefer extending good existing work.

Do not duplicate functionality.

---

# 48. UI CONSISTENCY

All implementation decisions must respect:

**03-ui-ux-design-system.md**

If an existing component establishes a visual pattern, reuse that pattern.

Do not introduce a new:

* button style
* card style
* font
* radius
* status system
* icon style
* navigation pattern

without a legitimate reason.

---

# 49. BEHAVIORAL CONSISTENCY

Similarly, reuse established behavioral patterns.

If one journey handles:

> missing prerequisite → open prerequisite → return

then other journeys with the same concept should behave consistently.

Do not implement each service as an isolated special case when the behavior is fundamentally shared.

---

# 50. DATA CONSISTENCY

The same concept should have the same meaning throughout the application.

For example:

If:

**Approved**

means a completed government decision in one screen,

it should not mean:

**submitted successfully**

somewhere else.

Maintain consistent semantics.

---

# 51. DON'T HIDE PRODUCT LIMITATIONS

If the prototype uses mock data, the application architecture and development documentation should make that clear.

Do not accidentally make a mock system appear to be connected to live government systems.

The UI should remain credible without being deceptive.

---

# 52. FUTURE EXTENSIBILITY

When making important structural decisions, consider whether the same behavior could later support:

**Mock source**

and:

**Official source**

without rewriting the entire user experience.

Do not prematurely implement future integrations.

Simply avoid unnecessary coupling that would make future integration difficult.

---

# 53. WHAT NOT TO OPTIMIZE FOR

Do not optimize for:

* maximum number of files
* maximum number of dependencies
* maximum amount of code
* maximum number of animations
* maximum number of features
* technical complexity
* buzzwords
* framework adoption

Optimize for:

**correct behavior**

**excellent UX**

**maintainability**

**clarity**

**reliability**

**future extensibility**

---

# 54. TECHNOLOGY DECISION RULE

When choosing between two implementation approaches, prefer the approach that provides the best balance of:

1. User experience
2. Simplicity
3. Maintainability
4. Reliability
5. Compatibility with the current stack
6. Future extensibility

Do not choose a technology merely because it is newer.

Do not reject a technology merely because it adds a dependency.

Use engineering judgment.

---

# 55. STACK SUMMARY

The current intended environment is:

### Frontend

**HTML**

**CSS**

**Vanilla JavaScript**

### Backend

**Node.js**

**Express.js**

### Data

**Local mock/demo data**

### Database

**None currently**

### External APIs

**None currently**

### Government integrations

**Simulated for prototype**

### Styling frameworks

**None**

### Frontend frameworks

**None**

### Icons

**SVG / appropriate icon library**

### Browser target

**Modern browsers**

### Architecture philosophy

**Simple now, extensible later**

---

# 56. FINAL ENGINEERING PRINCIPLE

The stack should never become the product.

The product is the citizen experience.

Technology exists to make that experience:

**fast**

**clear**

**reliable**

**maintainable**

**accessible**

**extensible**

The simplest correct solution should generally be preferred over a complicated solution that merely appears more advanced.

---

# 57. FINAL INSTRUCTION TO THE CODING AGENT

Before implementing anything:

1. Read `02-behavioral-blueprint.md`.
2. Read `03-ui-ux-design-system.md`.
3. Read `05-implementation-plan.md`.
4. Read `04-tech-stack.md`.
5. Inspect the existing codebase.
6. Understand what already exists.
7. Determine what the current phase requires.
8. Implement only the required scope.
9. Reuse existing patterns.
10. Preserve UI consistency.
11. Preserve behavioral consistency.
12. Handle meaningful edge cases.
13. Validate the completed behavior.
14. Check mobile and desktop behavior.
15. Check for regressions.
16. Do not invent government behavior.
17. Use mock data for current integrations.
18. Keep the implementation simple enough to understand.
19. Keep the structure clean enough to evolve.
20. Do not sacrifice user experience for technical convenience.

The ultimate goal is:

> **Build a simple, elegant, reliable prototype of a unified government-service experience using HTML, CSS, Vanilla JavaScript, Node.js and Express—while keeping the foundation clean enough to evolve into a real production system later.**
