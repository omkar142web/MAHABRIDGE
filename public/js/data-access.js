"use strict";

/* GuideStore — the ONLY layer that touches raw guide data.
 * Pages call GuideStore.all()/get()/related(); never fetch directly.
 * Today the source is local /data/guides.json; a future official API
 * can replace these internals without changing any page. */
const GuideStore = (() => {
  let cache = null;

  async function load() {
    if (cache) return cache;
    const res = await fetch("data/guides.json");
    if (!res.ok) throw new Error("guides-unavailable");
    cache = await res.json();
    return cache;
  }

  /** Prerequisite guideId edges, including inside requires-one-of groups. */
  function edges(requirements, out) {
    out = out || [];
    for (const r of requirements || []) {
      if (r && r.kind === "prerequisite" && r.guideId) out.push(r.guideId);
      if (r && Array.isArray(r.alternatives)) edges(r.alternatives, out);
    }
    return out;
  }

  async function all() {
    return load();
  }

  async function get(id) {
    const guides = await load();
    return guides.find((g) => g.id === id) || null;
  }

  async function related(guide) {
    const guides = await load();
    const byId = new Map(guides.map((g) => [g.id, g]));
    return (guide.relatedIds || []).map((id) => byId.get(id)).filter(Boolean);
  }

  async function byIdMap() {
    const guides = await load();
    return new Map(guides.map((g) => [g.id, g]));
  }

  return { all, get, related, byIdMap, edges };
})();
