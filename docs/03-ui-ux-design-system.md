# SIH26129 — UI/UX Design System (Guide-Only)

> Visual and interaction rules for the **government-service guide**.
> Companion to `01-problem-statement.md` (why) and `02-behavioral-blueprint.md` (what).
> Scope: Home, search results, guide page (overview / requirements / dependency view / steps / related). No dashboards, trackers, wallets, forms, or officer views.

---

## 1. Product vision

> **A very good assistant explaining government processes to a normal person — not another complicated government portal.**

The interface must communicate: **simplicity + trust + readability + next-step clarity.**

Story every screen tells:

```text
I have a goal → system understands → I see what I need →
I see what comes first → I open what's missing →
I know what to do next → official portal does the real work.
```

---

## 2. Visual direction

**Minimal + calm + institutional + human + modern.**

Quality bar: Linear / Stripe / Notion / modern banking — without copying them.

Never: cluttered portal look, tiny text, dozens of buttons, heavy shadows, bright saturated fills, decorative government imagery, fake seals/logos, giant banners, dense tables, cartoon illustrations, neon/glassmorphism, stock buildings.

---

## 3. Personality

Calm, trustworthy, helpful, transparent, human. Intelligent but quiet — never shouts "AI-powered". Guidance, never authority.

---

## 4. Typography

Font: **Inter** (fallback: system sans). Sans only; no serif UI, no decorative fonts.

Scale (desktop, fluid down on mobile):

| Role | Size / Weight | Use |
|---|---|---|
| Display | 40–48 / 700 | Home hero only |
| H1 | 28–32 / 700 | Guide title, results heading |
| H2 | 20–24 / 650 | Guide sections (What / Requirements / Steps…) |
| H3 | 16–18 / 600 | Card titles, requirement labels |
| Body | 16 / 400, lh 1.6 | All reading text |
| Small | 14 / 400 | Metadata (authority, demo note) |
| Micro | 12–13 / 500 | Badges, type labels (never body copy) |

Never all-caps body. Bold sparingly (key nouns, next actions).

---

## 5. Color system (CSS variables)

```css
--navy: #1a2b4a;        /* primary / headings / header */
--blue: #2563eb;        /* links, primary actions, focus */
--bg: #f7f8fa;          /* page background */
--surface: #ffffff;     /* cards */
--text: #1f2937;        /* body */
--muted: #6b7280;       /* secondary text */
--border: #e5e7eb;      /* hairlines */
--green-bg: #ecfdf5; --green-tx: #047857;
--amber-bg: #fffbeb; --amber-tx: #b45309;
--red-bg: #fef2f2;   --red-tx: #b91c1c;
--blue-bg: #eff6ff;  --blue-tx: #1d4ed8;
```

Restrained, calm. Color = meaning, never decoration. Every state pairs **icon + text + color** (never color alone).

Requirement-state mapping:

| State | Badge |
|---|---|
| Typically required | blue dot + "Typically required" |
| You have (opt. check) | green ✓ + "You have this" |
| Optional | gray + "Optional" |
| Conditional | amber ◐ + "May be needed — [condition]" |
| Uncertain | gray ? + "Check official source" |

---

## 6. Spacing / radius / shadow

- Spacing scale: `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64`. Section gap 32–48; card padding 20–24; never cramped.
- Radius: cards 12–16px; buttons/inputs 8–12px; badges/pills only for type labels. Nothing toy-rounded.
- Shadows: borders + surface contrast over elevation. `0 1px 2px rgba(16,24,40,.06)` max for cards; no floating-everything.

---

## 7. Icons

One family, single stroke weight (inline SVG preferred; no emoji-as-icons). Icons only where they aid comprehension: search, requirement states, steps, external-link, back/forward, related `→`. Never mix styles.

---

## 8. Navigation

Structure (only this):

```text
Home | Services | Documents | Guides
```

- Sticky slim header: wordmark + nav + search field (icon-collapsed on mobile).
- Active route underlined; focus ring always visible.
- Breadcrumb on guides only: `Guides / ATM Card / PAN Card` (reflects click chain, not forced hierarchy).
- "Back to [parent]" link at top of prerequisite guides. Browser back must also work (real routes, no modal-trapped flows).
- No auth, profile, notifications, or settings nav in V1.

---

## 9. Homepage

Hero (centered, max-width ~720px):

> **H1: What do you need help with?**
> Sub: *Tell us what you want — we'll tell you what you need, what comes first, and what to do next.*
> [ 🔍 Tell us what you need… ]  (hero search, autofocus-friendly, `/` shortcut)

Below hero:

1. **Popular guides** (max 6 cards: PAN, Aadhaar, Birth Certificate, Driving Licence, Income Certificate, ATM Card).
2. **Common documents** (chips or compact cards).
3. **How it works** — 3 quiet steps: `1. Search → 2. Understand requirements → 3. Follow next steps on the official portal.`

No department lists, no stats walls, no illustrations competing with the input. The input is the hero.

---

## 10. Search input + suggestions

- Large input (56px desktop / 48px mobile), 1px border → blue border + soft ring on focus.
- Debounced (~150ms) suggestions dropdown: max 6 rows; each row = title + type badge + one-line hint (`Requires PAN Card`).
- Keyboard: ↑↓ + Enter select, Esc closes; `aria-expanded` + live-region result count.
- Empty state of dropdown: "Popular:" quick links. Loading: "Finding related guides…" skeleton rows (never spinner-only).

---

## 11. Search results

- Heading echoes query: `Results for "atm card"` + count.
- Cards (vertical stack, comfortable gaps): title (link) + type badge + 1-line summary + `Requires: PAN Card, …` line + `Open guide →`.
- **Disambiguation variant** (e.g. "certificate"): intro line "What do you need it for?" + purpose-labeled cards (Birth — register a newborn; Income — scholarships/fees; …).
- **No-results variant:** "We couldn't find an exact match for 'X'." + up to 3 related cards + tips ("Try 'PAN', 'birth certificate'…") + [Browse all guides]. Never bare "No results".

---

## 12. Guide page layout

Reading column 720–800px centered; desktop optional sticky "On this page" rail (anchor links, CSS sticky, no JS framework).

Order (matches blueprint §11):

1. Header: type badge + H1 + authority line (`Provided by: …`) + demo honesty line (`Demo content — verify on the official portal`).
2. What is it? (2 sentences max)
3. Why do I need it? (bullets ≤5)
4. **What do I need first?** — strongest block: prerequisite cards.
5. Documents required / Information required / Conditions (grouped lists).
6. Steps (numbered).
7. Where / how (authority + official-link button, external icon, `Official portal — you'll continue on the department site`).
8. Dependency view (simple tree).
9. Related guides (cards).
10. Honesty footer (vary-by-state + final-authority lines).

One primary action per viewport: the next prerequisite link or the official-portal button. Secondary links quiet.

---

## 13. Requirement rows (core component)

Row = state icon + label + sub-line + action:

```text
[◉] PAN Card                    [View PAN Card guide →]
     Needed as ID proof by the bank. Typically required.
```

- Clickable rows are full-width links (44px+ target), hover lift 1px + border-darken, never bare inline links alone for prerequisites.
- Conditional rows append condition: `— may be required if you're applying for a fee waiver.`
- `requires-one-of` renders grouped card: "Any one of:" + sub-rows (Aadhaar / Passport / Voter ID).
- `uncertain` renders neutral dashed card with `?` + official-source pointer.
- Plain items (photograph) render same row without link affordance — no fake links.

---

## 14. Dependency view

Simple, non-technical. Nested list + connecting guides (CSS), e.g.:

```text
ATM Card
  └── requires PAN Card →
        ├── requires Aadhaar →
        └── requires Photograph
```

- Each node with a guide is a link; plain items are text.
- Screen-reader: real nested `<ul>` with "requires" text, not canvas.
- No zoom/pan graph libraries, no animated node physics. Calm and printable.

---

## 15. Steps + Where/How + Related

- **Steps:** numbered list, verb-led, ≤140 chars/step; current-user relevance over exhaustiveness (3–7 steps).
- **Where/How:** authority name + 1–2 sentence route + official-link button (external icon). If no confident URL: "Check the [Department] official website — link not verified in this demo." Never guess URLs.
- **Related:** ≤4 cards (title + one-line why-related + `→`). Same card component as results (consistency rule).

---

## 16. Badges, buttons, cards

- **Type badge:** `Document` (blue-bg) / `Service` (navy-bg, white text) / `Demo` (gray outline). 12–13px, pill.
- **Primary button:** navy or blue fill, white text, 8–12px radius, 44px min-height. One per viewport.
- **Secondary:** outline/ghost. **Destructive:** none in V1 (no destructive actions exist).
- **Cards:** white surface, 1px border, 12–16px radius, 20–24px padding; interactive cards elevate 1px on hover. One card style reused for results / requirements / related — no visual drift.

---

## 17. States: loading / empty / error

- **Loading:** content skeletons with contextual line ("Finding related guides…", "Loading guide…"). No bare spinners; never fake success while pending.
- **Empty:** headline + reason + action ("Nothing here yet — [Explore guides]").
- **Error / unknown guide:** "We couldn't find that guide." + search + popular links. Human copy, no codes/traces. ("Your reading position is safe" equivalent: "Nothing you viewed was lost — [Go home] [Browse guides]".)
- **Partial data:** `uncertain` card inline; page always renders what it has.

---

## 18. Trust + honesty UI

- `Demo` badge + "Demo content — requirements can vary. Check the official requirements before applying." near header.
- Official links labeled as external continuations, never as in-app issuance.
- Hedged copy ("typically", "you may need"); no eligibility verdicts, approvals, or timelines presented as fact.
- No fake seals, tricolour-washing, or official-emblem mimicry. Trust from clarity.

---

## 19. Motion

150–250ms ease for hover/focus/disclosure; 250–400ms max for page-level fades. Motion explains cause→effect (open prerequisite, expand alternatives). `prefers-reduced-motion` disables non-essential transitions. Nothing that slows task completion.

---

## 20. Responsive

- **≤640px:** single column; hero search full-width; requirement rows stack (action button full-width under text); tree vertical; header search collapses to icon; no horizontal scroll.
- **641–1024px:** reading width held; related 2-up.
- **>1024px:** centered column + optional sticky anchor rail; related 3–4 up. Comfortable line length always (~60–75 chars).
- Validate at 360px + 1280px; long titles wrap, never truncate meaning.

---

## 21. Accessibility (mandatory, not add-on)

Semantic landmarks; real links/buttons; labeled search; visible focus; contrast ≥4.5:1; icon+text states; 44px targets; skip-to-content; suggestions ARIA + live count; tree as list; 200% zoom reflow; plain language.

---

## 22. Content style

Clear, short, human, respectful. Verbs on buttons (`View PAN Card guide`, `Check official portal`). "You'll need…" over bureaucratese. No "Click here / Proceed / Submit" without context. No AI-branding noise.

---

## 23. Absolute don'ts

Random gradients, glassmorphism, neon, giant shadows, cartoon art, 3D, decorative charts, tiny text, cluttered nav, stock imagery, inconsistent icons/fonts, per-page redesigns, fake seals/statuses/requirements/verdicts, technical errors to users, misleading progress, color-only states.

---

## 24. Quality bar (per screen)

Understandable in 3 seconds? Primary action obvious? Next step known? Trustworthy without decoration? Hierarchy clear? Mobile-clean? Loading/error/empty designed? Consistent with rest? Feels like a guide, not a portal? If any "no" — fix before shipping.
