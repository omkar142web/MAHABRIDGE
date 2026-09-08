"use strict";

/**
 * MAHA-BRIDGE — thin read-only server for the government-service guide prototype.
 *
 * Serves the static frontend from /public and exposes a small read-only API
 * over the local mock file /data/guides.json:
 *
 *   GET /api/guides        list all guides (trimmed cards)
 *   GET /api/guides/:id    full guide or 404 JSON
 *   GET /api/search?q=...  ranked guide matches
 *
 * At boot the guide data is validated: required fields, resolvable
 * prerequisite links, no dependency cycles. Broken references fail loudly
 * in server logs (never with user-facing traces — routes return human
 * JSON errors instead).
 */

const path = require("path");
const fs = require("fs");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_FILE = path.join(__dirname, "data", "guides.json");

function normalize(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function loadGuides() {
  const raw = fs.readFileSync(DATA_FILE, "utf8");
  const parsed = JSON.parse(raw);
  if (!Array.isArray(parsed)) throw new Error("guides.json must contain an array");
  return parsed;
}

/** Collect prerequisite guideId edges recursively (incl. inside alternatives). */
function prereqEdges(requirements, out) {
  for (const r of requirements || []) {
    if (r && r.kind === "prerequisite" && r.guideId) out.push(r.guideId);
    if (r && Array.isArray(r.alternatives)) prereqEdges(r.alternatives, out);
  }
  return out;
}

function validateGuides(guides) {
  const errors = [];
  const warnings = [];
  const byId = new Map(guides.map((g) => [g.id, g]));

  for (const g of guides) {
    for (const field of ["id", "kind", "title", "summary"]) {
      if (!g[field] || (typeof g[field] === "string" && !g[field].trim())) {
        errors.push(`guide "${g.id || "?"}": missing required field "${field}"`);
      }
    }
    if (g.kind && !["service", "document"].includes(g.kind)) {
      errors.push(`guide "${g.id}": kind must be "service" or "document"`);
    }
    for (const target of prereqEdges(g.requirements, [])) {
      if (!byId.has(target)) {
        errors.push(`guide "${g.id}": prerequisite references unknown guide "${target}"`);
      }
    }
  }

  // Cycle detection over prerequisite edges (DFS).
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = new Map([...byId.keys()].map((id) => [id, WHITE]));
  const stack = [];
  function visit(id) {
    color.set(id, GRAY);
    stack.push(id);
    for (const next of prereqEdges(byId.get(id).requirements, [])) {
      if (!byId.has(next)) continue;
      if (color.get(next) === GRAY) {
        warnings.push(`dependency cycle: ${[...stack, next].join(" -> ")} (render breaks the cycle)`);
      } else if (color.get(next) === WHITE) {
        visit(next);
      }
    }
    stack.pop();
    color.set(id, BLACK);
  }
  for (const id of byId.keys()) if (color.get(id) === WHITE) visit(id);

  return { errors, warnings, byId };
}

let GUIDES = [];
let GUIDES_BY_ID = new Map();

try {
  GUIDES = loadGuides();
} catch (err) {
  console.error(`[maha-bridge] Could not load ${DATA_FILE}: ${err.message}`);
  process.exit(1);
}

const { errors, warnings, byId } = validateGuides(GUIDES);
for (const w of warnings) console.warn(`[maha-bridge] warning: ${w}`);
if (errors.length > 0) {
  for (const e of errors) console.error(`[maha-bridge] data error: ${e}`);
  process.exit(1);
}
GUIDES_BY_ID = byId;
console.log(`[maha-bridge] loaded ${GUIDES.length} guides from data/guides.json`);

function trimGuide(g) {
  return {
    id: g.id,
    kind: g.kind,
    title: g.title,
    summary: g.summary,
    department: g.department || "",
    category: g.category || "",
    prereqTitles: prereqEdges(g.requirements, [])
      .map((pid) => (GUIDES_BY_ID.get(pid) ? GUIDES_BY_ID.get(pid).title : null))
      .filter(Boolean)
      .slice(0, 3),
  };
}

function rankGuides(query) {
  const q = normalize(query);
  if (!q) return [];
  const scored = [];
  for (const g of GUIDES) {
    const title = normalize(g.title);
    let score = 0;
    if (title === q) score = 100;
    else if (title.includes(q)) score = 70;
    else if ((g.aliases || []).some((a) => normalize(a) === q)) score = 85;
    else if ((g.aliases || []).some((a) => normalize(a).includes(q))) score = 60;
    else if ((g.goalPhrases || []).some((p) => normalize(p).includes(q) || q.includes(normalize(p)))) score = 65;
    else if ((g.keywords || []).some((k) => normalize(k).includes(q) || q.includes(normalize(k)))) score = 50;
    else if (normalize(`${g.summary} ${g.category} ${g.department}`).includes(q)) score = 20;
    if (score > 0) scored.push({ guide: trimGuide(g), score });
  }
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 10).map((s) => s.guide);
}

app.use(express.static(path.join(__dirname, "public")));
app.use("/data", express.static(path.join(__dirname, "data")));

app.get("/api/guides", (req, res) => {
  res.json({ guides: GUIDES.map(trimGuide) });
});

app.get("/api/guides/:id", (req, res) => {
  const g = GUIDES_BY_ID.get(req.params.id);
  if (!g) return res.status(404).json({ error: "We couldn't find that guide." });
  res.json({ guide: g });
});

app.get("/api/search", (req, res) => {
  const q = String(req.query.q || "").trim();
  if (!q) return res.status(400).json({ error: "Type what you need help with to search." });
  res.json({ query: q, results: rankGuides(q) });
});

app.listen(PORT, () => {
  console.log(`[maha-bridge] guide running at http://localhost:${PORT}`);
});
