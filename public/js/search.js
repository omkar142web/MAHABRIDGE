"use strict";

/* Keyword + lightweight intent matching over guide titles, aliases,
 * goal phrases, keywords, and summary/category text. */
const GuideSearch = (() => {
  function normalize(text) {
    return String(text || "")
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s]/gu, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function includesAny(list, q) {
    return (list || []).some((item) => normalize(item).includes(q));
  }

  function scoreGuide(g, q) {
    const title = normalize(g.title);
    if (title === q) return 100;
    if ((g.aliases || []).some((a) => normalize(a) === q)) return 85;
    if (title.includes(q)) return 70;
    if ((g.goalPhrases || []).some((p) => normalize(p).includes(q) || (q.length > 6 && q.includes(normalize(p))))) return 65;
    if ((g.aliases || []).some((a) => normalize(a).includes(q))) return 60;
    if ((g.keywords || []).some((k) => normalize(k).includes(q) || (q.length > 4 && q.includes(normalize(k))))) return 50;
    if (normalize(`${g.summary} ${g.category} ${g.department}`).includes(q)) return 20;
    return 0;
  }

  function rank(guides, query, limit) {
    const q = normalize(query);
    if (!q) return [];
    return guides
      .map((g) => ({ guide: g, score: scoreGuide(g, q) }))
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit || 10)
      .map((s) => s.guide);
  }

  /** Short generic words that show a disambiguation list instead of ranking. */
  function isAmbiguous(query, resultCount) {
    const q = normalize(query);
    return q.length <= 5 && resultCount >= 4;
  }

  return { normalize, rank, isAmbiguous };
})();
