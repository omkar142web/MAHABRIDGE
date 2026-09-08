# SIH26129 — Behavioral Blueprint (Guide-Only)

> Source of truth for WHAT the product should do.
> Aligned 1:1 with `01-problem-statement.md`. No tech, no APIs, no DB — only behavior.
> Scope: **guide only**. No applications, tracking, wallets, verification, dashboards, or integrations.

---

## 1. Product vision

A simple, intelligent guide to government services and documents.

A citizen arrives with a goal or document in mind and leaves understanding:

> **Here is what you need. Here is why you need it. Here is what comes first. Here is what you should do next.**

The product is the **front door to understanding**. Real service delivery stays with official authorities and portals.

---

## 2. Problem definition

- Citizens think in goals (`I want an ATM card`). Government organizes around departments, portals, and documents.
- One want uncovers hidden prerequisites (`ATM Card → PAN Card → Aadhaar + Photograph`), but no single place explains the chain plainly.
- Citizens bounce between portals, agents, and outdated advice; they cannot answer "what comes first?" or "where do I get it?"
- We do **not** fix this by integrating systems in this prototype. We fix the **understanding gap** with clear, clickable, honest guidance.

---

## 3. Target users

1. **First-time citizen** — little knowledge of process, needs plain-language steps. Primary user.
2. **Returning citizen** — knows the document name (`PAN Card`), wants requirements + official route fast.
3. **Helper** — family member / friend / cyber-cafe operator looking something up for someone else.
4. **Low-confidence digital user** — needs large touch targets, readable text, no jargon, mobile-friendly flow.

Non-users in V1: government officers, verifiers, admins. No officer-facing behavior.

---

## 4. Core user need

> **"Tell us what you want. We'll tell you what you need, what comes first, and what to do next."**

Concretely the user must always be able to answer:

1. What am I trying to get?
2. What do I need for it?
3. What am I missing?
4. What do I need first?
5. Why do I need it?
6. What should I do next?

If a feature does not directly serve one of these questions, question whether it belongs.

---

## 5. Product boundaries

### IN scope

- Search / discover a service or document by name or goal phrase.
- Guide page per service / document (what, why, who provides, what is needed, steps, where/how).
- Requirements list: documents, information, prerequisites, conditions.
- Clickable prerequisites — any requirement the platform can explain must open its own guide.
- Simple dependency visualization (what depends on what).
- Missing-requirement pattern ("Don't have X? → View X guide").
- Official-route pointer (which authority / portal, as informational link).
- Related guides.

### OUT of scope (explicitly do not build)

Application submission, real government APIs, workflow orchestration, tracking / status, officer dashboards, document wallet / storage, automatic eligibility decisions, automatic verification, payments, government DB integration, notifications infra, complex auth / identity, AI agents performing actions, auto form-filling, case management, government analytics, multi-department engines, production identity.

---

## 6. Core user journey

```text
USER GOAL
   ↓
FIND SERVICE / DOCUMENT          (Home search → results)
   ↓
UNDERSTAND IT                    (Guide page: what / why / who)
   ↓
SEE REQUIREMENTS                  (What do I need? What first?)
   ↓
SEE PREREQUISITES                 (Dependency view)
   ↓
OPEN MISSING REQUIREMENT          (Click prerequisite → its guide)
   ↓
UNDERSTAND THAT REQUIREMENT       (Same guide-page pattern, recursively)
   ↓
FOLLOW THE GUIDANCE               (Steps + where/how + official link)
```

User always knows: **"What do I need?"** and **"What should I do next?"**

Secondary loop: after reading a prerequisite guide, user goes **Back** to the original guide. Browser back + explicit "Back to [parent]" breadcrumb must both work. No progress state to preserve (guide has no application state).

---

## 7. Information architecture

Top-level IA is flat and search-led. Internal hierarchy is never forced on the citizen:

```text
Home (search-first)
├── Search results
├── Guide page (:id)
│   ├── Overview (what / why / who)
│   ├── Requirements (prereqs + docs + info + conditions)
│   ├── Dependency view (what depends on what)
│   ├── Steps (what to do, in order)
│   ├── Where / How (authority + official route)
│   └── Related guides
├── Services (browse A–Z / by category, thin index over same guides)
├── Documents (same — filtered view, not a separate system)
└── Guides (same — editorial / popular entry points)
```

Citizen paths:

- Path A (direct): Home → type `PAN Card` → open PAN guide.
- Path B (goal): Home → type `I want an ATM card` → results → ATM guide → click PAN Card → PAN guide.
- Path C (browse): Services / Documents list → filter → open guide.

No login, no dashboard, no journey persistence in V1.

---

## 8. Service / document hierarchy (internal model)

```text
Government
  ↓
Department
  ↓
Category
  ↓
Service / Document
  ↓
Purpose
  ↓
Prerequisites
  ↓
Required Documents
  ↓
Required Information
  ↓
Steps
  ↓
Where / How to Obtain
```

Rules:

- `Service` and `Document` share the **same guide-page template**. Difference is only in content (a service has steps to avail; a document has steps to obtain).
- `Department / Category` exist for grouping, filtering, and "who provides it" display — never as mandatory navigation levels.
- Every level below Service / Document must be renderable as a section on one page; no deep drill-down required to understand basics.

---

## 9. Dependency model

General, reusable — never hardcode `ATM → PAN` as a special case.

### Relationship types

| Type | Meaning | Example |
|---|---|---|
| `requires` | Must have before proceeding | ATM Card `requires` PAN Card |
| `requires-one-of` | Alternatives; any one satisfies | ID proof: Aadhaar OR Passport OR Voter ID |
| `conditionally-requires` | Needed only in some situations | Income certificate `if` applying for fee waiver |
| `informational` | Useful but not blocking | Photograph specifications note |

### Requirement states (display only, no backend verification)

- `have` — user reports they already have it (client-side checkmark only, optional V1).
- `need` — required, not yet confirmed.
- `optional` — helpful but not blocking.
- `conditional` — "may be required depending on your situation" + condition text.
- `uncertain` — information unavailable; show "Requirements can vary — check official source."

### Behavior rules

1. Every `requires` target that has its own guide **must be clickable** and open that guide.
2. Requirements that are plain items (e.g. "recent photograph") render as text — no dead links.
3. Dependencies are recursive: a prerequisite guide shows its own prerequisites the same way.
4. Cycles must be guarded in data (A requires B requires A). If detected at render, show B as text, not a link, and log a content warning.
5. Missing-target handling: if a requirement references an unknown guide id, render as plain text, never a broken link.

### Canonical example (data-driven, not special-cased)

```text
ATM Card
│  requires → PAN Card (guide: pan-card)
│
└── PAN Card
    │  requires → Aadhaar (guide: aadhaar)
    │  requires → Photograph (item, no guide)
    │  requires-info → Date of Birth
```

---

## 10. Search / discovery behavior

Home prompt:

> **What do you need help with?**

Input accepts: document names (`PAN Card`), service names (`Driving Licence`), goal phrases (`I need a birth certificate`, `I want an ATM card`), informal phrases (`atm card ke liye kya chahiye` → best-effort keyword match; no language guarantee in V1).

Behavior:

- **Keyword + lightweight intent matching.** Normalize case/punctuation; match against `title`, `aliases[]`, `keywords[]`, `goalPhrases[]`. Rank: exact title > alias > keyword > goal-phrase > category.
- **Instant suggestions** (on type, debounced ~150ms): top 6 with type label (`Document` / `Service`) and one-line "why" (`Requires PAN Card`).
- **Empty query:** show Popular guides + Common documents (curated, max 6–8).
- **No match:** never dead-end. Show: "We couldn't find an exact match for 'X'." + up to 3 related guides + tips ("Try 'PAN', 'birth certificate', 'driving licence'") + link to browse all.
- **Ambiguous query** (`certificate`): show disambiguation list (Birth / Income / Caste / Domicile…) with one-line purpose each. Optionally one clarifying line: "What do you need it for?" — then filter. Never expose raw category trees as the answer.
- Keyboard: `/` focuses search; arrows + Enter navigate suggestions; Esc closes. Screen-reader announces result count.

No login, no personalization, no search history in V1.

---

## 11. Guide-page structure

Every guide answers, in this order, in plain language:

1. **Header** — title, type badge (`Document`/`Service`), providing authority (`Provided by: Income Tax Department` or `Typically issued by your bank`), last-verified note (`Demo content — verify on official portal`), demo badge if mock.
2. **What is it?** — 1–2 short sentences.
3. **Why do I need it?** — common uses as bullets (max 4–5).
4. **What do I need first?** — prerequisites list, each clickable if a guide exists. Strongest visual block on the page. Includes "Don't have X? → View X guide" affordance.
5. **What documents are required?** — list with state labels (`Typically required` / `May be required if…` / `Optional`).
6. **What information is required?** — e.g. date of birth, address, mobile number. No data collection — purely informational.
7. **Basic conditions, if relevant** — 1–3 bullets max (e.g. age, residency). Informational only; never a verdict.
8. **What should I do? (Steps)** — numbered, 3–7 steps, verb-led (`1. Keep your Aadhaar and photograph ready.`). No in-app form.
9. **Where / how do I get it?** — authority + official route description + official link (labeled `Official portal — you'll continue on the department site`). Never imply issuance happens here.
10. **Dependency view** — simple tree (see §12/§15 of problem direction; text tree + minimal visual, not a technical graph).
11. **Related guides** — up to 4 (prerequisites, next-logical documents, same-category).
12. **Honesty footer** — "Requirements can vary by state and situation. Check the official requirements before applying. Final decision rests with the relevant authority."

---

## 12. Requirement behavior

- **Progressive disclosure:** show prerequisites first, then documents, then info. Never dump 20 items at once; group under the three headings above.
- **Clickable > text:** anything with a guide id is a link styled as such, with trailing `→`. Plain items have no link affordance.
- **Conditional display:** `conditional` items show condition inline: `Income Certificate — may be required if you're applying for a fee waiver.` Never hide them behind tooltips.
- **Alternatives:** `requires-one-of` renders as grouped block: `Any one of: Aadhaar / Passport / Voter ID`, each clickable if it has a guide.
- **Uncertain:** `uncertain` renders neutral card: "We don't have confirmed requirements for this yet. Check the official source before you proceed." + official link if known.
- **No state persistence required in V1.** Optional enhancement only: client-side "I have this" checkmarks stored in memory (not authority, purely a reading aid). Must never be labeled verified/approved.

---

## 13. Navigation

```text
Home | Services | Documents | Guides
```

- Search always reachable (header search on every page except Home hero, where it is the hero).
- Guide → prerequisite guide → Back returns to parent (browser back + explicit breadcrumb `Guides / ATM Card / PAN Card`).
- No auth-gated routes. Every guide is directly linkable (`/guide/:id`).
- Unknown `:id` → friendly not-found guide page (see §20), never a technical error.

---

## 14. Core screens (only these)

1. **Home** — hero question + search + popular guides + common documents + how-it-works strip (3 steps: Search → Understand → Do next). No dashboards.
2. **Search results** — query echo, result cards (title, type, one-line purpose, "Requires: X, Y"), disambiguation variant, no-results variant.
3. **Guide page** — full structure from §11.
4. **Requirements block** — section within guide page (not a separate route), anchor-linkable (`/guide/pan-card#requirements`).
5. **Dependency view** — section within guide page + optional enlarged simple tree; answers "what depends on what?"
6. **Steps** — section within guide page; ordered instructions.
7. **Related guides** — section within guide page; cross-links.

No other screens in V1. In particular: no login, dashboard, tracker, wallet, officer views, forms, payment, or settings pages.

---

## 15. UX principles

Calm, clean, trustworthy, modern, readable, mobile-friendly, information-first. Assistant explaining to a normal person — not another government portal.

- Minimal chrome; content max-width ~720–800px for reading.
- One primary action per viewport (`View PAN Card guide`, `Check official portal`).
- Dependency links visually unmistakable (card rows with `→`, not inline-only links).
- Icon + text + color for every state; never color alone.
- Subtle transitions (150–250ms); no decorative animation.
- No giant banners, dense tables, fake seals/logos, stock government imagery, walls of text.

---

## 16. Content principles

- Short, clear, human, action-oriented. Grade-8 reading level target.
- Prefer: "You need a PAN Card before continuing." Over: "PAN Card is a mandatory prerequisite document required for availing the aforementioned banking facility."
- Every claim hedged honestly: "typically", "you may need", "can vary".
- No invented processing times, fees, or eligibility verdicts. If unknown, say so.
- Each guide: title ≤ 60 chars, "what" ≤ 280 chars, steps 3–7 items ≤ 140 chars each.
- Terminology fixed: `guide`, `requirement`, `prerequisite`, `steps`, `official portal`. System entities are never called `journey / workflow / application / status` (`journey` appears only as "example walkthrough" in §25, describing user walkthroughs, not a system object).

---

## 17. Data model (conceptual, local mock)

```text
Department { id, name, level: central|state, website? }
Category { id, name, departmentId }
Guide {
  id, slug, kind: service|document,
  title, aliases[], keywords[], goalPhrases[],
  summary, uses[], authority: { name, website? },
  conditions[]: { text, appliesWhen? },
  requirements: Requirement[],
  steps[]: { title, detail? },
  obtain: { where, how, officialLinks[]: { label, url } },
  relatedIds[],
  demo: true, lastVerifiedNote
}
Requirement {
  kind: prerequisite|document|information,
  label, detail?,
  state: required|optional|conditional|uncertain,
  condition?,                 // if conditional
  guideId?,                   // clickable iff present + exists
  alternatives?: Requirement[] // for requires-one-of groups
}
```

- Dependency = `Requirement{ kind: prerequisite, guideId }`. No separate edge table in V1.
- `guideId` must resolve to an existing Guide; build-time check required.
- No user, application, status, or verification entities in V1.

---

## 18. Mock-data structure

`data/guides.json` (or equivalent local file): array of ~10–14 guides sufficient to demo chains at depth 2–3:

- Depth chain: `atm-card → pan-card → { aadhaar, photograph(info) }`
- Second chain: `scholarship* (informational guide, no apply) → income-certificate → { domicile or address-proof }` — framed as "what you'd typically need", not live scheme data.
- Breadth: `birth-certificate, driving-licence, caste-certificate, voter-id, passport, ration-card`.
- Each guide carries `demo: true` + honesty note. Official links only to real public portal homepages where confident (e.g. incometaxindia.gov.in for PAN info); otherwise omit URL rather than guess.
- Seed must include: one `conditional` example, one `requires-one-of` example, one `uncertain` example, one alias-heavy entry (`atm` → ATM Card), one goal-phrase entry (`I want an ATM card` → ATM Card).

---

## 19. Edge cases

| # | Case | Required behavior |
|---|---|---|
| 1 | No match | Friendly no-results + related guides + search tips (§10) |
| 2 | Similar names | Disambiguation list with purposes, not raw id dump |
| 3 | Conditional requirement | Inline condition, never hidden |
| 4 | Alternatives | `Any one of` group, each independently clickable |
| 5 | Nested prerequisites (depth ≥2) | Recursive same template; breadcrumb shows chain |
| 6 | Vague query | Clarifying line + best-guess related list |
| 7 | State/department variance | "Can vary by state — check official source for [State]" note |
| 8 | Changed info | `Demo content — last reviewed [date]; verify on official portal` |
| 9 | Official info unavailable | `uncertain` card, no fabrication |
| 10 | Service temporarily unavailable (real world) | Informational note only; our guide page always renders |
| 11 | Not required in every situation | Mark `conditional`/`optional`, explain when |
| 12 | Conflicting sources | Present both briefly, defer to official link |
| 13 | Misunderstood prerequisite | Each prerequisite link labeled with purpose ("PAN Card — needed as ID for the bank") |
| 14 | Informal language | Alias/keyword coverage; graceful no-match fallback |
| 15 | Non-English query | Best-effort match; no translation promise in V1; fallback to popular guides |
| 16 | Goal vs document name | `goalPhrases[]` mapping (goal → guide), shown with "This guide covers…" |
| 17 | Broken / unknown guideId | Render as text; never 500; content warning in console/build check |
| 18 | Cyclic dependency | Break cycle: render second occurrence as text |

---

## 20. Failure states

- **Unknown guide route:** "We couldn't find that guide." + search box + popular guides. No stack trace / status code to users.
- **Search index fails to load:** "Search isn't available right now. You can still browse Services / Documents." + retry.
- **Data file malformed:** build/serve-time validation; at runtime show "Some guide content couldn't load. Try again." + retry. Never half-render a guide silently.
- **Official link unreachable:** our page unaffected; link is external and clearly labeled. No inline framing of external portals.
- Copy rule: state what happened, that guide content is safe, and the next action (`Try again`, `Browse guides`, `Go home`).

---

## 21. Accessibility

- Semantic HTML (`header/nav/main/section/article/footer`, real buttons/links, `label` for search).
- Keyboard: full operability, visible focus, `/` focuses search, skip-to-content link.
- Screen reader: landmarks, `aria-expanded` on suggestions, result-count live region, dependency tree as nested list (not canvas-only).
- Contrast ≥ 4.5:1 body text; states never color-only (icon + text).
- Touch targets ≥ 44px; no horizontal scroll for essential content; 200% zoom reflows.
- Plain language; expandable complexity only via disclosure, not jargon.

---

## 22. Responsive behavior

- **Mobile (≤640px):** single column; hero search full-width; requirement rows stack; dependency tree vertical; sticky header search collapses to icon; bottom nav optional — header nav suffices in V1.
- **Tablet (641–1024px):** reading width preserved; related guides 2-up grid.
- **Desktop (>1024px):** centered reading column + right-rail "On this page" anchor nav (optional, CSS-only sticky); related guides 3–4 up. No wide data tables.
- All validations on real 360px + 1280px viewports, not just devtools emulation assumptions.

---

## 23. Future extensibility (do not build now)

Architecture must allow replacing `Mock Guides` with `Official Guides API` without redesigning pages: keep a thin `guides.js` data-access layer (`getGuide(id)`, `searchGuides(q)`, `getRelated(g)`) that pages call instead of importing JSON directly.

Later phases (explicitly deferred): saved checklists, language packs, officer views, application/tracking, wallet, eligibility logic. None may leak into V1 routes or copy.

---

## 24. Prototype boundaries

V1 ships when: ~10–14 guides render, search + disambiguation + no-results work, every prerequisite with a guide is clickable to depth ≥2, steps + official-route sections present, demo-vs-official labeling present, mobile + desktop readable, keyboard + screen-reader pass on Home/Results/Guide.

V1 explicitly does **not** promise: completeness of government catalogue, legal accuracy, live data, coverage of all states, or any transactional capability.

---

## 25. End-to-end example journeys

### Journey A — ATM Card (canonical demo, must work)

1. Home: user types `I want an ATM card` → results show **ATM Card** ("Bank-issued card for cash/withdrawals. Typically requires a PAN Card.").
2. Open **ATM Card** guide → "What do I need first?" shows **PAN Card** (clickable) + bank account note.
3. "Don't have a PAN Card? → View PAN Card guide" → **PAN Card** guide opens; breadcrumb `Guides / ATM Card / PAN Card`.
4. PAN guide shows: Aadhaar (clickable → **Aadhaar** guide), Photograph (item), Date-of-birth info; steps; "Apply through the relevant official PAN service" + official link; honesty footer.
5. User presses Back → returns to **ATM Card** guide. Can answer: need PAN first, why, what PAN needs, where to get it.

### Journey B — Scholarship orientation (informational)

1. Home: `scholarship help for college` → results: **Scholarship (general guide)** + **Income Certificate** + **Caste Certificate** with "requirements vary by scheme — check official notification" banner.
2. Open Scholarship guide → typical-requirements list (each clickable), conditional notes ("caste certificate — only for certain categories"), official-links section. No apply button, no eligibility verdict.

### Journey C — Failure-path demo

1. Search `unicorn licence` → no-results page with related guides.
2. Open guide with unknown slug `/guide/not-a-thing` → friendly not-found + search.
3. Open guide containing a `conditional` + `requires-one-of` + `uncertain` block → all three render distinctly without jargon.

If A + B + C all work cleanly on mobile and desktop, the concept is proven.
