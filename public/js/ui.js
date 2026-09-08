"use strict";

/* Shared UI builders: one card style, one requirement row, one tree.
 * All rendering uses DOM APIs (no innerHTML on data) so guide text
 * can never inject markup. */
const GuideUI = (() => {
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
    required: { icon: "\u25C9", text: "Typically required", cls: "state-required" },
    optional: { icon: "\u25CB", text: "Optional", cls: "state-optional" },
    conditional: { icon: "\u25D0", text: "May be needed", cls: "state-conditional" },
    uncertain: { icon: "?", text: "Check official source", cls: "state-uncertain" },
  };

  function stateLine(req) {
    const meta = STATES[req.state] || STATES.required;
    let text = meta.text;
    if (req.state === "conditional" && req.condition) text += " \u2014 " + req.condition;
    if (req.state === "uncertain" && req.detail) text = req.detail;
    return h("div", { class: "state " + meta.cls }, [meta.icon + " " + text]);
  }

  function guideHref(id, fromId) {
    return "guide.html?id=" + encodeURIComponent(id) + (fromId ? "&from=" + encodeURIComponent(fromId) : "");
  }

  /** One requirement row. Clickable full-row link iff guideId resolves. */
  function requirementRow(req, byId, fromId) {
    if (req.state === "uncertain" && !req.guideId) {
      const li = h("li", { class: "req" }, [
        h("span", { class: "icon", ariaHidden: "true" }, ["?"]),
        h("div", { class: "body" }, [
          h("div", { class: "label" }, [req.label]),
          req.detail ? h("p", { class: "detail" }, [req.detail]) : null,
          stateLine(req),
        ]),
      ]);
      return li;
    }

    if (Array.isArray(req.alternatives) && req.alternatives.length > 0) {
      const group = h("li", { class: "req req-group" }, [
        h("span", { class: "icon", ariaHidden: "true" }, ["\u25C9"]),
        h("div", { class: "body" }, [
          h("div", { class: "label" }, [req.label + " \u2014 any one of:"]),
          req.detail ? h("p", { class: "detail" }, [req.detail]) : null,
          h("ul", { class: "alt-list" }, req.alternatives.map((a) => requirementRow(a, byId, fromId))),
        ]),
      ]);
      return group;
    }

    const target = req.guideId ? byId.get(req.guideId) : null;
    const kids = [
      h("span", { class: "icon", ariaHidden: "true" }, [(STATES[req.state] || STATES.required).icon]),
      h("div", { class: "body" }, [
        h("div", { class: "label" }, [req.label]),
        req.detail ? h("p", { class: "detail" }, [req.detail]) : null,
        stateLine(req),
      ]),
    ];
    if (target) {
      // Full-row link to the prerequisite guide.
      const a = h("a", { class: "req", href: guideHref(target.id, fromId) }, [
        ...kids,
        h("span", { class: "action" }, ["View " + target.title + " guide \u2192"]),
      ]);
      const li = h("li", {}, [a]);
      return li;
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
      const sub = h("ul", {}, prereqs.map((pid) => depNode(pid, byId, new Set(seen))));
      top.appendChild(sub);
    }
    root.appendChild(top);
    return root;
  }

  function depNode(pid, byId, seen) {
    const target = byId.get(pid);
    if (!target || seen.has(pid)) {
      // Broken link or cycle: plain text, never a dead link.
      const label = target ? target.title : pid;
      return h("li", {}, [label + (target ? " (see above)" : "")]);
    }
    seen.add(pid);
    const li = h("li", {}, [
      h("a", { href: guideHref(pid, null) }, [target.title]),
    ]);
    const nested = GuideStore.edges(target.requirements, []).filter((id) => byId.get(id));
    if (nested.length > 0) {
      li.appendChild(h("ul", {}, nested.map((id) => depNode(id, byId, new Set(seen)))));
    }
    return li;
  }

  /** Result / related card: title + type + purpose + requirements line. */
  function guideCard(g, byId) {
    const needs = GuideStore.edges(g.requirements, [])
      .map((pid) => (byId && byId.get(pid) ? byId.get(pid).title : null))
      .filter(Boolean);
    return h("a", { class: "card", href: "guide.html?id=" + encodeURIComponent(g.id) }, [
      h("h3", {}, [typeBadge(g.kind), document.createTextNode(g.title)]),
      h("p", {}, [g.summary]),
      needs.length > 0 ? h("div", { class: "needs" }, ["Requires: " + needs.slice(0, 3).join(", ")]) : null,
      h("div", { class: "go" }, ["Open guide \u2192"]),
    ]);
  }

  function notice(text, amber) {
    return h("div", { class: "notice" + (amber ? " amber" : ""), role: "note" }, [text]);
  }

  return { h, typeBadge, stateLine, guideHref, requirementRow, depTree, guideCard, notice };
})();
