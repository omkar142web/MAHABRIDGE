# SIH26129 — Technology Stack & Implementation Rules (Guide-Only)

> Tech + engineering boundaries for the **government-service guide**.
> Use with `01-problem-statement.md` (why), `02-behavioral-blueprint.md` (what), `03-ui-ux-design-system.md` (how it looks), `05-implementation-plan.md` (build order).

**02** = WHAT · **03** = HOW it looks · **05** = IN WHAT ORDER · **04 (this file)** = TECHNOLOGY + ENVIRONMENT.

---

## 1. Core stack

### Frontend — HTML + CSS + Vanilla JavaScript. No framework.

No React / Vue / Angular. Must stay understandable to anyone knowing HTML, CSS, JS.

### Backend — Node.js + Express, only where it genuinely helps.

For a guide, the backend is optional/thin: serve static pages + a small read-only guides API (`GET /api/guides`, `GET /api/guides/:id`, `GET /api/search?q=`). No auth, sessions, writes, or workflow engines in V1.

### Data — local mock/demo files. No database. No government APIs.

---

## 2. Frontend philosophy

Semantic HTML + plain CSS + vanilla JS. Understandable, modular, maintainable, debuggable. Good engineering judgment; no cleverness, no chaos.

---

## 3. HTML

Semantic elements (`header, nav, main, section, article, aside, footer, form, button, label`). Real links for guide navigation (deep-linkable `/guide/:id`), real buttons for actions. Dependency tree as nested `<ul>`, not canvas.

---

## 4. CSS

Plain CSS only. No Tailwind / Bootstrap / MUI / utility frameworks. Design tokens via custom properties (colors, type, spacing, radii, shadows, transitions per `03`). Reusable classes for: buttons, badges, cards (result / requirement / related — one style), search, suggestions, steps, tree, header, footer.

---

## 5. Vanilla JavaScript

JS owns: search + suggestions + ranking, guide rendering from local data, related-guides resolution, `requires-one-of` / conditional / uncertain rendering, cycle + broken-link guards, header search, keyboard (`/` focus, arrows/Enter/Esc), loading/empty/error states.

Keep logic separate from presentation. No giant single file; small logical modules are fine:

```text
js/
  data-access.js   # getGuide(), searchGuides(), getRelated() — ONLY layer touching raw data
  search.js        # normalize, rank, suggestions
  render-guide.js  # guide page sections
  render-results.js
  ui.js            # header, focus, disclosures
  main.js          # routing glue
```

Don't create dozens of micro-files. Pages must call `data-access.js`, never import raw JSON directly (so mock → official API swap later touches one layer).

---

## 6. Backend (thin, optional)

Express responsibilities in V1 (max):

- Serve static frontend.
- Serve guides read-only (`/api/guides`, `/api/guides/:id`, `/api/search?q=`), reading the same local files.
- Build-time or boot-time validation: every `guideId` resolves; no cycles; required fields present. Fail loudly in logs, never with user-facing traces.

Do NOT build: auth, sessions, persistence, uploads, wallets, applications, statuses, notifications, payments, scraping, proxy-to-government, analytics pipelines.

---

## 7. Data strategy

Single source: local `data/guides.json` (~10–14 guides, depth 2–3 chains, incl. conditional / one-of / uncertain / alias examples per `02` §18).

```text
Guide { id, kind, title, aliases[], keywords[], goalPhrases[],
        summary, uses[], authority{name, website?},
        conditions[], requirements[{kind, label, detail?, state,
        condition?, guideId?, alternatives?}],
        steps[], obtain{where, how, officialLinks[]},
        relatedIds[], demo:true }
```

Rules: `guideId` must exist; cycles forbidden; unknown ids render as text (guard in code + validated at boot). All demo content flagged `demo:true` + honesty note.

---

## 8. No database / no external APIs / no scraping

- No Mongo/Postgres/MySQL/Firebase/Supabase in V1.
- No live government API dependencies; official links are plain outbound `<a>` (no framing, no fetch).
- Never scrape, invent endpoints, or fake issuance/verification. Mock = clearly-labeled guidance content only.

---

## 9. NPM dependencies

Allowed when genuinely useful (e.g. `express` for the thin server). No frontend framework, no CSS framework. Every dependency needs a reason; never add weight to look advanced.

Icons: inline SVG preferred. Fonts: Inter via system stack or single font link; no icon-emoji reliance.

---

## 10. State, persistence, navigation

- No app state to persist (guide has no applications/progress). Optional V1 nicety only: in-memory "I have this" checkmarks — never persisted as authority, never labeled verified.
- Navigation = real routes (`/`, `/results?q=`, `/guide/:id`, `/services`, `/documents`, `/guides`); back button + breadcrumb work without JS-state tricks. Preserve scroll on back where trivial; no custom router needed beyond static + tiny glue.

---

## 11. Quality bars

- **Security:** no secrets, no PII, fictional demo data only, escape all rendered strings, no `innerHTML` on untrusted content.
- **No fake authority:** copy hedged ("typically", "you may need"); demo badge; official links labeled external. Architecture docs state mock vs official clearly.
- **Accessibility:** per `03` §21 — semantic, keyboard, focus, contrast, live regions, 44px targets.
- **Responsive:** 360px + 1280px real checks; single-column mobile; no horizontal scroll.
- **Performance:** no huge assets, minimal JS, debounced search, skeletons over spinners. Fast on low-end mobile.
- **Errors:** human copy + next action; never leak traces/codes/paths.
- **Code:** clarity > cleverness; small functions; no duplicated card renderers; consistent semantics (`required` means the same everywhere).

---

## 12. Stack summary

| Layer | Choice |
|---|---|
| Frontend | HTML + CSS + Vanilla JS |
| Styling | Plain CSS + variables |
| Backend | Node.js + Express (thin, read-only, optional) |
| Data | Local `guides.json` mock |
| DB / APIs / govt integrations | None in V1 (simulated guidance content only) |
| Frameworks | None |
| Target | Modern browsers, mobile + desktop |
| Philosophy | Simple now, extensible later |

Tech exists to make guidance **fast, clear, reliable, maintainable, accessible, extensible** — never the product itself.

---

## 13. Coding-agent checklist (before implementing anything)

1. Read `02`, then `03`, then `05`, then this file. 2. Inspect existing code; reuse patterns. 3. Implement only current-phase scope. 4. Route all data through `data-access.js`. 5. Validate guide links/cycles. 6. Keep UI consistent with `03`. 7. Handle no-results / unknown-guide / malformed-data states. 8. Check 360px + desktop, keyboard, screen reader. 9. No invented requirements, statuses, or official claims. 10. Simple, clean, evolvable.

> Goal: **a simple, elegant, reliable guide prototype in HTML/CSS/Vanilla JS (+ thin Express) with a clean seam where mock guides can later become official sources — without redesigning the experience.**
