"use strict";

/* Shared UI builders: one card style, one requirement row, one tree.
 * Guide *text* always renders via DOM text nodes (never innerHTML on data).
 * Icons are static code strings from Icon.el() — safe by construction. */
const GuideUI = (() => {
  /* Presentation-only topic taxonomy over guide.category (no data change). */
  const TOPICS = [
    { id: "identity", title: "Identity & Tax", blurb: "Prove who you are, for taxes, travel, and everyday KYC.", icon: "idCard", categories: ["Identity", "Identity & Tax", "Identity & Civic", "Travel & Identity"] },
    { id: "certificates", title: "Certificates", blurb: "Income, caste, and domicile proofs for schemes and admissions.", icon: "award", categories: ["Certificates"] },
    { id: "records", title: "Birth & Family Records", blurb: "Register births and hold family identity and address proof.", icon: "users", categories: ["Civil Records", "Family & Food"] },
    { id: "transport", title: "Transport", blurb: "Permissions to drive, via your transport department.", icon: "car", categories: ["Transport"] },
    { id: "banking", title: "Banking", blurb: "Cards and accounts — and the ID proofs banks ask for.", icon: "landmark", categories: ["Banking"] },
    { id: "education", title: "Education", blurb: "Understand what scholarships typically ask for.", icon: "gradCap", categories: ["Education"] },
  ];

  function topicOf(guide) {
    return TOPICS.find((t) => t.categories.includes(guide.category)) || null;
  }

  function categoryIcon(guide) {
    const t = topicOf(guide);
    return t ? t.icon : "fileText";
  }

  function h(tag, attrs, children) {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (k === "class") el.className = v;
      else if (k.startsWith("aria") || k === "role" || k === "href" || k === "for" || k === "id") el.setAttribute(k.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()), v);
      else el[k] = v;
    }
    for (const c of children || []) {
      if (c == null) continue;
      el.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
    }
    return el;
  }

  function typeBadge(kind) {
    const label = kind === "service" ? "Service" : "Document";
    return h("span", { class: "badge " + (kind === "service" ? "badge-service" : "badge-doc") }, [label]);
  }

  const STATES = {
    required: { text: "Typically required", cls: "state-required" },
    optional: { text: "Optional", cls: "state-optional" },
    conditional: { text: "May be needed", cls: "state-conditional" },
    uncertain: { text: "Check official source", cls: "state-uncertain" },
  };

  /** Icon per requirement: kind-based, overridden by conditional/uncertain. */
  function reqIconName(req) {
    if (req.state === "conditional") return "alert";
    if (req.state === "uncertain") return "help";
    if (req.kind === "prerequisite") return "layers";
    if (req.kind === "information") return "info";
    return "fileText";
  }

  function stateLine(req) {
    const meta = STATES[req.state] || STATES.required;
    let text = meta.text;
    if (req.state === "conditional" && req.condition) text += " \u2014 " + req.condition;
    if (req.state === "uncertain" && req.detail) text = req.detail;
    return h("div", { class: "state " + meta.cls }, [text]);
  }

  function guideHref(id, fromId) {
    return "guide.html?id=" + encodeURIComponent(id) + (fromId ? "&from=" + encodeURIComponent(fromId) : "");
  }

  /** One requirement row. Clickable full-row link iff guideId resolves. */
  function requirementRow(req, byId, fromId) {
    if (req.state === "uncertain" && !req.guideId) {
      return h("li", { class: "req" }, [
        h("span", { class: "icon" }, [Icon.el("help")]),
        h("div", { class: "body" }, [
          h("div", { class: "label" }, [req.label]),
          req.detail ? h("p", { class: "detail" }, [req.detail]) : null,
          stateLine(req),
        ]),
      ]);
    }

    if (Array.isArray(req.alternatives) && req.alternatives.length > 0) {
      return h("li", { class: "req req-group" }, [
        h("span", { class: "icon" }, [Icon.el("layers")]),
        h("div", { class: "body" }, [
          h("div", { class: "label" }, [req.label + " \u2014 any one of:"]),
          req.detail ? h("p", { class: "detail" }, [req.detail]) : null,
          h("ul", { class: "alt-list" }, req.alternatives.map((a) => requirementRow(a, byId, fromId))),
        ]),
      ]);
    }

    const target = req.guideId ? byId.get(req.guideId) : null;
    const kids = [
      h("span", { class: "icon" }, [Icon.el(reqIconName(req))]),
      h("div", { class: "body" }, [
        h("div", { class: "label" }, [req.label]),
        req.detail ? h("p", { class: "detail" }, [req.detail]) : null,
        stateLine(req),
      ]),
    ];
    if (target) {
      const a = h("a", { class: "req", href: guideHref(target.id, fromId) }, [
        ...kids,
        h("span", { class: "action" }, ["View " + target.title + " guide ", Icon.el("arrowRight")]),
      ]);
      return h("li", {}, [a]);
    }
    return h("li", { class: "req" }, kids);
  }

  /** Simple nested-list dependency tree with cycle + broken-link guards. */
  function depTree(guide, byId, seen) {
    seen = seen || new Set([guide.id]);
    const root = h("ul", { class: "dep-tree" }, []);
    const top = h("li", {}, [guide.title]);
    const prereqs = GuideStore.edges(guide.requirements, []);
    if (prereqs.length > 0) {
      top.appendChild(h("ul", {}, prereqs.map((pid) => depNode(pid, byId, new Set(seen)))));
    }
    root.appendChild(top);
    return root;
  }

  function depNode(pid, byId, seen) {
    const target = byId.get(pid);
    if (!target || seen.has(pid)) {
      const label = target ? target.title : pid;
      return h("li", {}, [label + (target ? " (see above)" : "")]);
    }
    seen.add(pid);
    const li = h("li", {}, [h("a", { href: guideHref(pid, null) }, [target.title])]);
    const nested = GuideStore.edges(target.requirements, []).filter((id) => byId.get(id));
    if (nested.length > 0) {
      li.appendChild(h("ul", {}, nested.map((id) => depNode(id, byId, new Set(seen)))));
    }
    return li;
  }

  /** Result / related card: icon tile + title + purpose + requirements line. */
  function guideCard(g, byId) {
    const needs = GuideStore.edges(g.requirements, [])
      .map((pid) => (byId && byId.get(pid) ? byId.get(pid).title : null))
      .filter(Boolean);
    return h("a", { class: "card", href: "guide.html?id=" + encodeURIComponent(g.id) }, [
      h("div", { class: "card-top" }, [
        h("span", { class: "tile tile-sm" }, [Icon.el(categoryIcon(g))]),
        typeBadge(g.kind),
      ]),
      h("h3", {}, [g.title]),
      h("p", {}, [g.summary]),
      needs.length > 0 ? h("div", { class: "needs" }, ["Requires: " + needs.slice(0, 3).join(", ")]) : null,
      h("div", { class: "go" }, ["Open guide ", Icon.el("arrowRight")]),
    ]);
  }

  /** Topic card for the home browse-by-need grid. */
  function topicCard(topic, count) {
    return h("a", { class: "card topic-card", href: "browse.html?type=guides&cat=" + encodeURIComponent(topic.id) }, [
      h("span", { class: "tile" }, [Icon.el(topic.icon)]),
      h("h3", {}, [topic.title]),
      h("p", {}, [topic.blurb]),
      h("div", { class: "go" }, [count + (count === 1 ? " guide " : " guides "), Icon.el("arrowRight")]),
    ]);
  }

  /** Vertical mini-chain preview (home hero): guides linked by arrows. */
  function chainCard(chain) {
    const wrap = h("div", { class: "chain-nodes" }, []);
    chain.forEach((g, i) => {
      if (i > 0) {
        const arrow = h("div", { class: "chain-arrow" }, [Icon.el("arrowDown")]);
        wrap.appendChild(arrow);
      }
      wrap.appendChild(
        h("a", { class: "chain-node", href: "guide.html?id=" + encodeURIComponent(g.id) }, [
          h("span", { class: "tile tile-xs" }, [Icon.el(categoryIcon(chain[i]))]),
          h("span", { class: "chain-text" }, [
            h("span", { class: "chain-title" }, [chain[i].title]),
            h("span", { class: "chain-sub" }, [chain[i].kind === "service" ? "Service" : "Document"]),
          ]),
          Icon.el("arrowRight", "chain-go"),
        ])
      );
    });
    return wrap;
  }

  function notice(text, amber, iconName) {
    return h("div", { class: "notice" + (amber ? " amber" : ""), role: "note" }, [
      iconName ? Icon.el(iconName, "notice-ic") : null,
      h("span", {}, [text]),
    ]);
  }

  /** Section heading with small eyebrow label. */
  function sectionHead(eyebrow, title) {
    return h("div", { class: "section-head" }, [
      h("span", { class: "eyebrow-sm" }, [eyebrow]),
      h("h2", {}, [title]),
    ]);
  }

  return {
    h, typeBadge, stateLine, guideHref, requirementRow, depTree,
    guideCard, topicCard, chainCard, notice, sectionHead,
    TOPICS, topicOf, categoryIcon,
  };
})();
