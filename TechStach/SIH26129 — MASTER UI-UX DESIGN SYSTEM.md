# SIH26129 — MASTER UI/UX DESIGN SYSTEM

You are working on a serious government-service integration platform for **SIH26129**.

The product is NOT supposed to look like a typical government portal.

It should feel like a modern, trustworthy, intelligent, extremely clean digital public-service platform that makes complicated government processes feel simple.

The entire UI must follow the design system and behavioral principles below.

---

# 1. PRODUCT VISION

The platform's core idea is:

> **Citizens think in terms of goals. Government operates through departments. This platform connects the two.**

A citizen should be able to say:

> "I need a PAN Card."

or:

> "I need financial help for college."

or:

> "I want to start a business."

The platform then guides them through the relevant government services, requirements, documents, dependencies, and application journey.

The UI must therefore communicate:

**Simplicity + Trust + Intelligence + Transparency + Progress**

The interface should make government services feel approachable without making them feel casual or unserious.

---

# 2. OVERALL VISUAL DIRECTION

Use a:

**Minimal + Premium + Institutional + Human + Modern**

visual language.

Think of the quality level of a polished modern product such as:

* Apple
* Linear
* Stripe
* Notion
* modern banking applications
* high-quality government digital services

But DO NOT copy any of their interfaces.

The product should have its own identity.

Avoid the stereotypical government-portal appearance:

* cluttered pages
* excessive borders
* tiny text
* dozens of buttons
* outdated gradients
* heavy shadows
* excessive dropdowns
* dense tables everywhere
* overly bright colors
* decorative government imagery
* unnecessary icons
* giant banners
* visually noisy dashboards

The website should immediately communicate:

> **"This is a modern government platform."**

---

# 3. DESIGN PERSONALITY

The UI should feel:

### Calm

Never visually overwhelming.

### Trustworthy

The citizen should feel safe using it.

### Intelligent

The interface should feel like it understands what the citizen wants.

### Helpful

It should guide rather than force.

### Transparent

The citizen should always understand what is happening.

### Efficient

Experienced users should be able to move quickly.

### Human

Government processes should feel less bureaucratic.

---

# 4. DESIGN PRINCIPLE

The most important rule:

> **Don't make the user understand the system. Make the system understand the user.**

Never force citizens to navigate:

Department → Subdepartment → Category → Service → Form

unless they explicitly choose to.

The primary experience should be:

**Goal → Guidance → Requirements → Journey → Outcome**

---

# 5. TYPOGRAPHY

Use a modern highly readable sans-serif font.

Preferred:

**Inter**

or another equivalent modern UI font if Inter is unavailable.

Typography should have clear hierarchy.

Suggested hierarchy:

### Display

Large, confident headings for major landing-page messaging.

### H1

Strong page titles.

### H2

Section titles.

### H3

Card and subsection titles.

### Body

Highly readable, comfortable line height.

### Caption

Secondary metadata.

### Microcopy

Small but still readable.

Never use extremely small text simply to fit more information.

Avoid:

* decorative fonts
* serif fonts for UI
* excessive font weights
* all-caps body text

Use boldness strategically.

---

# 6. COLOR SYSTEM

Use a restrained institutional palette.

Primary:

**Deep navy / dark blue**

Secondary:

**Blue**

Background:

**Very light neutral / off-white**

Surface:

**White**

Text:

**Dark charcoal**

Secondary text:

**Muted gray**

Success:

**Subtle green**

Warning:

**Subtle amber**

Error:

**Subtle red**

Information:

**Subtle blue**

Do NOT use highly saturated colors everywhere.

Color should communicate meaning, not decoration.

The interface should remain visually calm even when many elements are present.

---

# 7. SPACING

Use generous spacing.

Prefer:

**breathing room > density**

Sections should never feel cramped.

Cards should have comfortable internal padding.

Use consistent spacing increments throughout the entire application.

Do not randomly choose different margins and paddings for similar components.

---

# 8. BORDER RADIUS

Use modern moderate rounding.

Cards:

approximately 12–16px.

Buttons:

approximately 8–12px.

Inputs:

approximately 8–12px.

Do NOT make everything excessively rounded like a children's application.

Avoid giant pill-shaped containers unless they are intentionally used for tags, filters, or compact status indicators.

---

# 9. SHADOWS

Use shadows very sparingly.

Prefer:

* subtle elevation
* thin borders
* surface contrast

instead of large floating shadows.

Cards should feel grounded.

Avoid:

"floating everything" design.

---

# 10. ICONOGRAPHY

Use one consistent icon family throughout the application.

Icons should be:

* simple
* clean
* recognizable
* consistent in stroke weight
* used only when they improve comprehension

Do not add icons merely to make empty space look interesting.

Never mix multiple icon styles.

---

# 11. NAVIGATION

The primary navigation should remain extremely simple.

Possible structure:

**Home**

**Services**

**My Journey**

**Documents**

**Benefits**

**Applications**

and:

**Profile**

Do not overload the navigation.

The user should always know:

> Where am I?

and:

> Where can I go next?

---

# 12. HOMEPAGE

The homepage should NOT begin with a giant list of departments.

The hero should focus on the citizen's goal.

Example:

> **What do you want to get done?**

Supporting text:

> Find the right government services, documents and next steps — all in one place.

Then provide a prominent search / intent input:

> **"Tell us what you need..."**

Examples beneath it:

> Get a PAN Card
> Apply for a scholarship
> Start a business
> Get an income certificate

The input should be the visual focal point.

---

# 13. HERO DESIGN

Keep the hero elegant.

Do not fill the hero with:

* illustrations everywhere
* government buildings
* stock photographs
* complicated animations
* excessive statistics

The product itself is the hero.

The interaction should communicate the value.

---

# 14. SEARCH / INTENT INPUT

This is one of the most important components in the entire website.

It should feel intelligent.

Example:

> 🔍 What do you want to do?

When focused:

* subtle border transition
* gentle elevation
* clear cursor
* suggestions appear smoothly

Suggestions should feel helpful, not distracting.

Example:

**Popular searches**

PAN Card
Income Certificate
Scholarships
Driving Licence
Business Registration

---

# 15. SERVICE DISCOVERY

After searching for something like:

> PAN Card

show a clean service result.

Example:

### PAN Card

**Permanent Account Number**

Brief explanation.

Then:

**You may need**

✓ Identity information
✓ Address information
✓ Photograph
✓ Supporting documents

Primary CTA:

**Start PAN Card Journey**

Secondary:

**View requirements**

Avoid showing a giant wall of text.

---

# 16. DEPENDENCY UI

This is a core feature and must have excellent UX.

Example:

User wants:

**ATM Card**

The service requires:

**PAN Card**

If PAN Card is missing:

Display:

### Required before you continue

**PAN Card**

> This service requires a valid PAN Card.

Status:

**Not available**

CTA:

**Get PAN Card**

When clicked, open the PAN Card journey.

The user should be able to see:

> ATM Card
> ↓
> PAN Card required
> ↓
> Get PAN Card
> ↓
> Return to ATM Card journey

The dependency relationship must be visually obvious.

---

# 17. DEPENDENCY STATES

Every prerequisite should have a clear state.

### Available

✓ Available

### Missing

○ Required

### Expired

⚠ Expired

### Under verification

◌ Verification in progress

### Invalid

! Needs attention

### Not applicable

— Not required

Never communicate these states through color alone.

Use:

**icon + text + color**

for accessibility.

---

# 18. JOURNEY PAGE

The journey page is one of the most important screens.

It should visually communicate:

> **Where am I?**

> **What have I completed?**

> **What remains?**

> **Why does it matter?**

Use a clean vertical journey/timeline.

Example:

### Your PAN Card Journey

✓ 1. Check eligibility

✓ 2. Prepare documents

→ 3. Complete application

○ 4. Verification

○ 5. Final outcome

The current step should be visually prominent.

Completed steps should become quieter.

Future steps should remain visible but secondary.

---

# 19. PROGRESS

Always communicate progress meaningfully.

Example:

**3 of 5 steps complete**

or:

**You're almost ready**

Avoid meaningless progress bars such as:

> 62%

if the percentage doesn't correspond to a meaningful user action.

---

# 20. DOCUMENT EXPERIENCE

Documents should be presented as understandable objects, not rows of bureaucracy.

Example:

### Income Certificate

**Status:** Available

**Valid until:** 24 March 2027

Actions:

**View**

**Use for application**

If expired:

### Income Certificate

**Expired**

> You'll need a current certificate for this service.

CTA:

**Get new certificate**

---

# 21. DOCUMENT REUSE

When a document is already available:

> **Already available**

Then:

> Use this document

instead of:

> Upload again.

Make document reuse visually obvious.

This should feel like a major convenience.

---

# 22. MISSING DOCUMENT

Never simply say:

> ❌ Missing document.

Instead:

### Income Certificate

**Required for this application**

You don't currently have a valid certificate.

**Get Income Certificate →**

The user should immediately understand what to do.

---

# 23. SERVICE REQUIREMENTS

Requirements should be progressively revealed.

Do not dump 20 requirements onto the user immediately.

Structure:

### What you'll need

**Already available**
✓ Aadhaar
✓ Domicile

**Still needed**
○ Income Certificate

**Not required**
— Caste Certificate

This creates clarity.

---

# 24. APPLICATION STATUS

Use human-readable status labels.

Good:

**Submitted**

**Under verification**

**Waiting for your action**

**Waiting for another department**

**Approved**

**Rejected**

Bad:

**Level 2 Pending**

**Stage 3A**

**Process initiated**

unless accompanied by a plain-language explanation.

---

# 25. STATUS DETAIL

Every status should answer:

### What's happening?

### Why?

### Do I need to do anything?

### What's next?

Example:

**Waiting for another department**

> Your application has been sent to the Revenue Department for verification.

**Action required:** No

**Next:** Verification → Review

---

# 26. "ACTION REQUIRED"

This must be visually distinct.

Example:

### Action required

> Your income document has expired.

**Update document →**

This should never be hidden inside an application detail page.

---

# 27. DASHBOARD

The dashboard should be personalized.

At the top:

> **Good morning. What would you like to get done?**

Then:

### Continue where you left off

Active journeys.

Then:

### Your applications

Current government processes.

Then:

### Your documents

Important document status.

Then:

### Relevant services

Potentially useful services.

Don't show everything at once.

Prioritize what requires attention.

---

# 28. PRIORITY ORDER

The dashboard should prioritize:

1. Action required
2. Upcoming deadlines
3. Active journeys
4. Recently updated applications
5. Documents
6. Service recommendations

The user should never have to hunt for something urgent.

---

# 29. LIFE EVENTS

Create a separate discovery experience:

> **Something changed in your life?**

Cards:

🎓 Starting college
💼 Starting a business
🏠 Moving
👶 Having a child
💍 Getting married
👴 Becoming eligible for senior benefits

Clicking a life event should produce a personalized list of potentially relevant government services.

Do NOT automatically apply for everything.

The system should recommend; the citizen decides.

---

# 30. BENEFITS / SCHEME DISCOVERY

Don't make it look like an e-commerce catalog.

Avoid:

> 100 government schemes

Instead:

### Benefits you may be eligible for

Each card should answer:

**What is it?**

**Why might I qualify?**

**What does it provide?**

**What is required?**

**Deadline, if applicable**

CTA:

**Check eligibility**

---

# 31. ELIGIBILITY UI

Use clear language.

Good:

> **You may be eligible**

> Based on the information currently available, you appear to meet the basic criteria.

Then:

> Final eligibility will be determined by the responsible government authority.

Avoid making the platform appear to be the authority.

---

# 32. GOVERNMENT OFFICIAL DASHBOARD

The government side should visually differ slightly from the citizen side while clearly belonging to the same product.

Citizen side:

**Human + simple**

Official side:

**Data + clarity + control**

The official should immediately see:

### Service performance

Applications
Pending
Delayed
Awaiting another department
Awaiting citizen action

---

# 33. CROSS-DEPARTMENT VIEW

Show the service as a journey rather than merely a table.

Example:

**Scholarship**

Education
↓
Revenue verification
↓
Education review
↓
Approval

Highlight where applications are currently accumulating.

---

# 34. BOTTLENECK DESIGN

Make bottlenecks visually obvious but not alarmist.

Example:

### Revenue verification

**823 applications waiting**

**Average waiting time:** X

Then:

> **Potential bottleneck**

The system should explain the issue rather than simply coloring everything red.

---

# 35. OFFICIAL APPLICATION VIEW

When an official opens an application, show:

### Citizen goal

What the citizen is trying to accomplish.

### Current stage

Where the process is now.

### Required information

What matters for this stage.

### Previous stages

What has already happened.

### Pending dependencies

What is blocking progress.

### Next action

What the official is expected to do.

This provides context.

---

# 36. INTER-DEPARTMENTAL HANDOFF

When an application moves between departments, make the transition explicit.

Example:

> **Sent to Revenue Department**

Reason:

> Income verification required.

Status:

> Waiting for verification.

The receiving official should understand why the application arrived.

---

# 37. TIMELINE

Every application should have a timeline.

Example:

**8 Sep — Application submitted**

**8 Sep — Documents verified**

**9 Sep — Sent for income verification**

**11 Sep — Verification completed**

**12 Sep — Under review**

The timeline should be visually clean.

---

# 38. ERROR STATES

Errors should never be technical-looking.

Never expose:

> 404
> 500
> Timeout
> Null
> API Error

to normal citizens.

Instead:

### We couldn't retrieve your information

> Your information isn't available right now.

**Your progress is safe.**

Actions:

**Try again**

**Continue later**

If appropriate:

**Use another official route**

---

# 39. EMPTY STATES

Never show blank pages.

Bad:

> No data.

Good:

### Nothing here yet

> Start a government service and your active journeys will appear here.

CTA:

**Explore services**

---

# 40. LOADING STATES

Avoid generic spinning loaders whenever possible.

Use meaningful skeletons or contextual messages.

Example:

> **Checking your available documents...**

> **Finding relevant services...**

> **Preparing your journey...**

Loading should feel intentional.

---

# 41. SUCCESS STATES

Don't use excessive confetti.

Government services should feel trustworthy, not like a gaming application.

Use a calm success screen:

### Application submitted

✓ Your application has been successfully submitted.

**Application ID**

**What's next?**

> Your application will now move to verification.

CTA:

**Track application**

---

# 42. REJECTION STATES

Never make rejection feel like a dead end.

Example:

### Application not approved

**Reason**

> The submitted income information could not be verified.

Then:

### What can you do?

**Correct the information**

**View requirements**

**Appeal / request review**, only where officially available.

---

# 43. CONFIRMATION DIALOGUES

Do not use confirmation dialogs for trivial actions.

Use them when an action is:

* irreversible
* legally significant
* submitting information
* cancelling an application
* withdrawing a request

The dialog should clearly explain the consequence.

---

# 44. MICRO-INTERACTIONS

Use subtle transitions everywhere.

Examples:

* buttons gently change state on hover/tap
* cards slightly elevate when interactive
* search suggestions fade/slide in
* journey steps transition smoothly
* status changes animate subtly
* document states update gracefully
* modal windows appear smoothly

Animations should communicate:

**cause → effect**

rather than decoration.

---

# 45. ANIMATION SPEED

Keep most transitions short and subtle.

Approximate visual feel:

**150–250ms** for small interactions.

**250–400ms** for larger transitions.

Avoid slow animations that make government processes feel slower.

The interface should feel:

> **fast, calm and deliberate.**

---

# 46. PAGE TRANSITIONS

When navigating between related parts of a journey, preserve visual continuity.

For example:

ATM Card

→ PAN Card dependency

→ PAN Card requirements

→ PAN Card journey

→ Return to ATM Card

The user should never feel lost.

---

# 47. RETURN TO PREVIOUS JOURNEY

This is extremely important.

If the user enters a prerequisite journey:

**ATM Card**

↓

**PAN Card required**

↓

**Get PAN Card**

After completing/starting the PAN Card journey:

> **Return to ATM Card journey**

The system should remember where the user came from.

The user should never have to manually find the ATM Card service again.

---

# 48. BREADCRUMBS

Use breadcrumbs only where they actually improve orientation.

Example:

**Services / Banking / ATM Card**

Don't use breadcrumbs on every tiny screen.

---

# 49. MOBILE-FIRST

The product must look excellent on mobile.

Do not simply shrink the desktop design.

On mobile:

* bottom navigation can be considered
* cards become stacked
* tables become cards
* long forms become steps
* important CTAs remain reachable
* typography remains readable
* spacing remains comfortable

Never require horizontal scrolling for essential content.

---

# 50. DESKTOP

On desktop, use the additional space for:

* journey context
* side panels
* status summaries
* government dashboards
* document previews
* comparison of requirements

Do not simply make everything extremely wide.

Keep content at comfortable reading widths.

---

# 51. FORMS

Forms should never feel like traditional government forms.

Break long forms into logical steps.

Example:

### Step 1

Personal information

### Step 2

Address

### Step 3

Documents

### Step 4

Review

### Step 5

Submit

Show progress.

---

# 52. FORM VALIDATION

Validate at the point where the mistake occurs.

Don't wait until final submission to tell the citizen:

> 14 errors found.

Instead:

> **Please check this field.**

Explain what is wrong in plain language.

---

# 53. REVIEW BEFORE SUBMIT

Before a major government submission:

### Review your application

Show:

**Information**

**Documents**

**Declarations**

**Service**

**Applicant**

**Beneficiary**

The citizen should be able to verify everything.

---

# 54. PREVENT ACCIDENTAL SUBMISSION

The final CTA should clearly say:

**Submit application**

not:

**Continue**

when the next action actually submits something.

Never trick the user into submission.

---

# 55. TRUST SIGNALS

Use subtle institutional signals.

Examples:

* official service indicator
* responsible department
* official information source
* last updated date
* application status
* clear privacy explanation

But do not fill the interface with logos and government seals.

Trust should come from **clarity**, not decoration.

---

# 56. OFFICIAL VS UNOFFICIAL

If the platform links to an external government service, clearly indicate:

> **Official government service**

or:

> **You'll continue on the responsible department's official service.**

The user should never be confused about where they are.

---

# 57. RESPONSIVE STATES

Every component must have states:

**Default**

**Hover**

**Focused**

**Pressed**

**Disabled**

**Loading**

**Success**

**Warning**

**Error**

Don't design only the perfect state.

---

# 58. ACCESSIBILITY

Accessibility is mandatory.

Ensure:

* sufficient contrast
* keyboard navigation
* readable text
* clear focus states
* labels for inputs
* icons are not the only communication method
* color is not the only status indicator
* touch targets are large enough
* screen-reader-friendly labels

The product is for everyone.

---

# 59. CONSISTENCY RULE

Once a component is established, reuse it.

If:

**Service Card**

exists, don't create five visually different service cards.

If:

**Status Badge**

exists, reuse it.

If:

**Journey Step**

exists, reuse it.

If:

**Document Card**

exists, reuse it.

Consistency is more important than novelty.

---

# 60. NO RANDOM UI INVENTION

When modifying an existing page:

DO NOT redesign the entire website.

First understand the established design system.

Then extend it.

New screens must feel like they belong to the same product.

---

# 61. NO VISUAL DRIFT

Every new feature must follow:

* same typography
* same spacing
* same colors
* same border radius
* same button style
* same card treatment
* same icon style
* same animations
* same interaction patterns

The application should feel like one product.

---

# 62. COMPONENT HIERARCHY

Prefer:

**Page**

→ **Section**

→ **Card**

→ **Content**

→ **Action**

rather than:

**Page**

→ 25 unrelated cards.

Each screen should have a clear visual hierarchy.

---

# 63. PRIMARY CTA

Every major screen should have one obvious primary action.

Examples:

**Start journey**

**Continue**

**Get document**

**Submit application**

**Track application**

Avoid five equally prominent buttons.

---

# 64. SECONDARY ACTIONS

Secondary actions should be visually quieter.

Examples:

**View requirements**

**Learn more**

**Save for later**

**View details**

They should not compete with the primary CTA.

---

# 65. DEStructive ACTIONS

Use clear warning treatment for:

* cancel
* withdraw
* delete
* remove

Never make destructive actions visually similar to positive actions.

---

# 66. SEARCH RESULTS

Search results should prioritize:

1. relevance
2. eligibility
3. user intent
4. service importance

Don't simply return alphabetical government service names.

---

# 67. SEARCH NO RESULTS

If the user searches:

> “Help for my daughter's college fees”

and no exact service matches:

Do NOT say:

> No results found.

Instead:

> **We couldn't find an exact match.**

Then:

> Here are some related government services that may help.

This preserves the intelligent nature of the product.

---

# 68. AMBIGUOUS SEARCH

If user searches:

> “certificate”

show:

> What are you trying to use the certificate for?

Then guide them.

Never force them through a giant category tree.

---

# 69. RECOMMENDATIONS

Recommendations must explain themselves.

Bad:

> Recommended for you.

Good:

> **You may be eligible because your profile matches the basic age and income criteria.**

The user should understand why something is being recommended.

---

# 70. PERSONALIZATION

Personalization should be useful, not creepy.

Good:

> Your scholarship application is waiting for an Income Certificate.

Bad:

> We know everything about your family and financial life.

The interface should feel helpful, not invasive.

---

# 71. DATA CONFLICT UI

If information conflicts:

### We found conflicting information

> Your address appears differently in two government records.

Then:

**Review information**

Don't silently choose one.

---

# 72. OUTDATED INFORMATION UI

If information is old:

### This information may be outdated

> Please confirm before continuing.

CTA:

**Review**

This avoids silent errors.

---

# 73. SERVICE UNAVAILABLE

If one service is temporarily unavailable:

### This service is temporarily unavailable

> The responsible government service isn't responding right now.

Then:

**Try again later**

and preserve the citizen's progress.

Do not make the entire platform look broken.

---

# 74. PARTIAL AVAILABILITY

If one dependency is unavailable but the rest of the journey can continue:

Allow the user to continue wherever possible.

Example:

> PAN verification temporarily unavailable.

But:

> You can review the rest of your application while we wait.

Don't unnecessarily block the entire journey.

---

# 75. SECURITY / PRIVACY UI

Privacy should be understandable.

Instead of legal walls of text, use short explanations:

> **Why we need this**

> This information is required to verify your eligibility.

For important data-sharing actions:

> **Where will this be used?**

Explain clearly.

---

# 76. ACTIVITY HISTORY

Provide:

### Your activity

* Application submitted
* Document used
* Verification completed
* Application updated
* Government response received

This improves transparency.

---

# 77. GOVERNMENT OFFICIAL DESIGN LANGUAGE

Officials need more density than citizens, but still maintain hierarchy.

Use:

* compact summary cards
* clean tables
* filters
* timelines
* service maps
* bottleneck indicators
* drill-down views

Avoid turning the dashboard into a spreadsheet nightmare.

---

# 78. OFFICIAL FILTERS

Officials should be able to conceptually filter by:

* service
* department
* status
* date
* priority
* delayed cases
* dependency
* responsible authority

Filters should be easy to understand.

---

# 79. GOVERNMENT DASHBOARD COLORS

Use colors to indicate:

**normal**

**attention**

**delayed**

**critical**

but don't turn the dashboard into a wall of red.

Red should mean something genuinely important.

---

# 80. GOVERNMENT ANALYTICS

The dashboard should visually answer:

> Where are applications?

> Where are they getting stuck?

> Which dependency causes delays?

> Which department is waiting for another?

> Where are citizens dropping off?

> Which services have the most demand?

Use visualizations only when they answer a real question.

No decorative charts.

---

# 81. DATA VISUALIZATION

Prefer:

* simple bars
* simple trends
* progress indicators
* flow diagrams
* distribution summaries

Avoid:

* 3D charts
* decorative graphs
* excessive pie charts
* unnecessary animations

The goal is understanding.

---

# 82. SERVICE FLOW VISUALIZATION

For complex government workflows, show:

**Citizen**

↓

**Service**

↓

**Department A**

↓

**Department B**

↓

**Approval**

The visual should clearly highlight:

> **Where the application currently is.**

---

# 83. BOTTLENECK VISUALIZATION

Example:

### Scholarship applications

**2,842 active**

↓

**823 waiting for Revenue verification**

↓

**Revenue verification**

### Potential bottleneck

This should immediately communicate the systemic problem.

---

# 84. RESPONSIBILITY

At each stage:

> **Next responsible authority**

should be visible to officials.

For citizens:

> **Currently being processed by the responsible department.**

Don't expose internal details that don't help citizens.

---

# 85. FEEDBACK UI

After completion:

### How was your experience?

Then ask meaningful questions.

Avoid forcing users to leave a long review.

One or two quick questions are better.

---

# 86. EMPTY / FIRST-TIME EXPERIENCE

For a new user:

Don't show an empty dashboard.

Show:

> **Let's get started.**

Then:

**Find a service**

**Tell us what you need**

**Explore benefits**

---

# 87. RETURNING USER EXPERIENCE

For a returning user:

Don't make them start over.

Show:

> **Continue your journey**

> Scholarship application — waiting for your action

This should be the most prominent element.

---

# 88. VISUAL PRIORITY

Every page should answer:

### What is the user supposed to notice first?

### What should they do second?

### What information supports that action?

If everything is visually emphasized, nothing is emphasized.

---

# 89. CONTENT DENSITY

Citizen UI:

**Low-to-medium density**

Official UI:

**Medium-to-high density**

Landing pages:

**Low density**

Forms:

**Focused density**

Never use the same density everywhere.

---

# 90. MOBILE BOTTOM SHEETS

For mobile interactions such as:

* filters
* document actions
* additional information
* service details

bottom sheets can be used.

They should feel native and smooth.

---

# 91. MODALS

Use modals sparingly.

Don't open a modal for every piece of information.

If the user needs to read or complete something substantial, use a full page instead.

---

# 92. TOASTS

Use toasts only for lightweight confirmations.

Example:

> Document saved.

Don't use toasts for important government decisions.

Those should remain visible in the actual application timeline.

---

# 93. TOOLTIP RULE

Don't hide essential information in tooltips.

If something is important, display it directly.

Tooltips are only for supplementary explanations.

---

# 94. LANGUAGE STYLE

Copy should be:

**clear**

**short**

**human**

**neutral**

**respectful**

Avoid bureaucratic language.

Bad:

> "The applicant is hereby required to furnish the requisite documentation."

Good:

> **"You'll need these documents to continue."**

But never oversimplify legal requirements.

---

# 95. BUTTON LANGUAGE

Use verbs.

Good:

**Start journey**

**Continue**

**Get document**

**Check eligibility**

**Submit application**

**Track application**

Bad:

**Click here**

**Proceed**

**Submit**

without context.

---

# 96. DON'T OVERUSE "AI"

Don't put:

> AI-powered
> AI-powered
> AI-powered

everywhere.

The user doesn't care what technology is underneath.

They care:

> **It understands what I need.**

---

# 97. INTELLIGENCE SHOULD FEEL INVISIBLE

The best intelligent UX is:

> User says something naturally.

↓

> System understands.

↓

> User gets a useful result.

The interface shouldn't constantly announce that AI is involved.

---

# 98. ANIMATION PHILOSOPHY

Animation should explain relationships.

For example:

When a prerequisite is selected:

**ATM Card**

↓

**PAN Card required**

Animate the transition to the PAN Card journey.

When returning:

**PAN Card**

↓

**ATM Card**

Restore the previous context.

This makes the dependency system feel understandable.

---

# 99. PERFORMANCE FEEL

Even if an operation takes time, the UI should feel responsive.

Immediately acknowledge user actions.

Avoid interfaces that appear frozen.

Use:

* skeletons
* progressive loading
* contextual loading messages
* optimistic visual feedback where appropriate

But never falsely indicate that a government action has completed when it has not.

---

# 100. FINAL QUALITY BAR

Before considering any screen complete, ask:

### Is it understandable in 3 seconds?

### Is the primary action obvious?

### Does the user know what happens next?

### Does the interface feel trustworthy?

### Is unnecessary information hidden?

### Is the hierarchy clear?

### Does it work beautifully on mobile?

### Are loading/error/empty states designed?

### Does it match the rest of the application?

### Does it feel like a modern government platform rather than a generic SaaS dashboard?

If any answer is "no", improve the design.

---

# 101. ABSOLUTE DON'TS

Never introduce:

* random gradients
* excessive glassmorphism
* neon colors
* giant shadows
* excessive rounded cards
* cartoon illustrations
* unnecessary 3D
* excessive animations
* decorative charts
* tiny text
* cluttered navigation
* generic stock imagery
* inconsistent icons
* random font changes
* different design language on every page
* fake government seals/logos
* fake application statuses
* invented government requirements
* invented eligibility decisions
* misleading progress
* technical error messages to citizens

---

# 102. THE UI SHOULD TELL A STORY

The entire product should visually communicate:

**I have a goal.**

↓

**The system understands me.**

↓

**It knows what I need.**

↓

**It knows what I already have.**

↓

**It tells me what's missing.**

↓

**It guides me through dependencies.**

↓

**It coordinates government services.**

↓

**I can see what's happening.**

↓

**I know what I need to do next.**

↓

**I reach the outcome.**

That story should be visible throughout the entire application.

---

# 103. DESIGN NORTH STAR

Whenever there is uncertainty about a UI decision, choose the option that best satisfies:

> **Less searching.
> Less repetition.
> Less confusion.
> More visibility.
> More guidance.
> More progress.
> More trust.**

---

# 104. FINAL INSTRUCTION TO THE CODING/DESIGN AGENT

Whenever you modify this project:

1. Read and understand the existing UI before changing it.
2. Preserve the established design system.
3. Reuse existing components whenever possible.
4. Do not introduce a new visual style for a new feature.
5. Keep the interface minimal and premium.
6. Prioritize mobile responsiveness.
7. Design all important states, not only the ideal state.
8. Maintain consistent typography, spacing, colors, icons and animations.
9. Never sacrifice clarity for visual decoration.
10. Never sacrifice trust for cleverness.
11. Never expose technical complexity to ordinary citizens.
12. Never invent government information.
13. Always make the next action obvious.
14. Always explain important statuses.
15. Always preserve context when navigating through service dependencies.
16. Always make the citizen feel that the system is coordinating complexity **for them**, rather than asking them to coordinate it themselves.

The final product should feel like:

> **One simple front door to a complex government ecosystem.**

Not another government portal.

Not another generic AI dashboard.

Not another service directory.

It should feel like a **unified digital government experience built around the citizen.**
