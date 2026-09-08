"use strict";

/* Guide page: renders every section in blueprint order (§11).
 * Unknown ids and broken links render friendly messages, never errors. */
(() => {
  async function init() {
    const main = document.getElementById("guide");
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id") || "";
    const fromId = params.get("from") || "";

    let guide = null;
    let byId = new Map();
    try {
      const guides = await GuideStore.all();
      byId = new Map(guides.map((g) => [g.id, g]));
      guide = byId.get(id) || null;
    } catch (err) {
      main.appendChild(
        GuideUI.notice("We couldn't load this guide right now. Check that the server is running (npm start). Try again, or go back home.")
      );
      main.appendChild(homeLink());
      return;
    }

    if (!guide) {
      document.title = "Guide not found \u2014 MAHA-BRIDGE";
      const wrap = document.createElement("div");
      wrap.className = "reading";
      const h1 = document.createElement("h1");
      h1.textContent = "We couldn't find that guide.";
      wrap.appendChild(h1);
      wrap.appendChild(GuideUI.notice("The link may be old, or the guide may not exist yet. Try searching instead \u2014 nothing you viewed was lost."));
      const form = document.createElement("form");
      form.action = "index.html";
      form.method = "get";
      form.className = "search-row";
      const label = document.createElement("label");
      label.setAttribute("for", "nf-q");
      label.className = "skip-link";
      label.textContent = "Search guides";
      const inp = document.createElement("input");
      inp.type = "search";
      inp.id = "nf-q";
      inp.name = "q";
      inp.placeholder = "Tell us what you need\u2026";
      const btn = document.createElement("button");
      btn.className = "btn";
      btn.type = "submit";
      btn.textContent = "Search";
      btn.style.marginTop = "12px";
      form.appendChild(label);
      form.appendChild(inp);
      form.appendChild(btn);
      wrap.appendChild(form);
      wrap.appendChild(homeLink());
      main.appendChild(wrap);
      return;
    }

    document.title = guide.title + " \u2014 MAHA-BRIDGE guide";
    main.appendChild(renderGuide(guide, byId, fromId));
  }

  function homeLink() {
    const p = document.createElement("p");
    const a = document.createElement("a");
    a.className = "btn btn-ghost";
    a.href = "index.html";
    a.textContent = "Go home";
    p.appendChild(a);
    return p;
  }

  function section(title, id) {
    const s = document.createElement("section");
    s.className = "section";
    if (id) s.id = id;
    const h2 = document.createElement("h2");
    h2.textContent = title;
    s.appendChild(h2);
    return s;
  }

  function bullets(items) {
    const ul = document.createElement("ul");
    for (const t of items) {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    }
    return ul;
  }

  function renderGuide(g, byId, fromId) {
    const wrap = document.createElement("div");
    wrap.className = "reading";

    // Breadcrumb (+ explicit back-to-parent when arriving from a prerequisite).
    const crumbs = document.createElement("nav");
    crumbs.className = "crumbs";
    crumbs.setAttribute("aria-label", "Breadcrumb");
    const home = document.createElement("a");
    home.href = "index.html";
    home.textContent = "Guides";
    crumbs.appendChild(home);
    const from = fromId ? byId.get(fromId) : null;
    if (from) {
      crumbs.appendChild(document.createTextNode(" / "));
      const back = document.createElement("a");
      back.href = GuideUI.guideHref(from.id, null);
      back.textContent = from.title;
      crumbs.appendChild(back);
      crumbs.appendChild(document.createTextNode(" / "));
      const backNote = document.createElement("p");
      const backLink = document.createElement("a");
      backLink.className = "btn btn-ghost btn-sm";
      backLink.href = GuideUI.guideHref(from.id, null);
      backLink.textContent = "\u2190 Back to " + from.title;
      backNote.appendChild(backLink);
      wrap.appendChild(crumbs);
      wrap.appendChild(backNote);
    } else {
      crumbs.appendChild(document.createTextNode(" / " + g.title));
      wrap.appendChild(crumbs);
    }

    // Header.
    const head = document.createElement("div");
    head.className = "guide-head";
    const badgeRow = document.createElement("p");
    badgeRow.appendChild(GuideUI.typeBadge(g.kind));
    const h1 = document.createElement("h1");
    h1.textContent = g.title;
    const auth = document.createElement("p");
    auth.className = "authority";
    auth.textContent = "Provided by: " + (g.authority ? g.authority.name : "See official source");
    head.appendChild(badgeRow);
    head.appendChild(h1);
    head.appendChild(auth);
    wrap.appendChild(head);

    // What is it?
    const what = section("What is it?");
    const sum = document.createElement("p");
    sum.textContent = g.summary;
    what.appendChild(sum);
    wrap.appendChild(what);

    // Why do I need it?
    if (g.uses && g.uses.length > 0) {
      const why = section("Why do I need it?");
      why.appendChild(bullets(g.uses));
      wrap.appendChild(why);
    }

    // Requirements, grouped: prerequisites first, then documents, then info.
    const reqs = g.requirements || [];
    const prereqs = reqs.filter((r) => r.kind === "prerequisite");
    const docs = reqs.filter((r) => r.kind === "document");
    const infos = reqs.filter((r) => r.kind === "information");

    if (prereqs.length > 0) {
      const s = section("What do I need first?", "requirements");
      const list = document.createElement("ul");
      list.className = "req-list";
      for (const r of prereqs) list.appendChild(GuideUI.requirementRow(r, byId, g.id));
      s.appendChild(list);
      wrap.appendChild(s);
    }
    if (docs.length > 0) {
      const s = section(prereqs.length > 0 ? "What documents are required?" : "What do I need?", "docs");
      const list = document.createElement("ul");
      list.className = "req-list";
      for (const r of docs) list.appendChild(GuideUI.requirementRow(r, byId, g.id));
      s.appendChild(list);
      wrap.appendChild(s);
    }
    if (infos.length > 0) {
      const s = section("What information is required?", "info");
      const list = document.createElement("ul");
      list.className = "req-list";
      for (const r of infos) list.appendChild(GuideUI.requirementRow(r, byId, g.id));
      s.appendChild(list);
      wrap.appendChild(s);
    }
    if (g.conditions && g.conditions.length > 0) {
      const s = section("Basic conditions");
      s.appendChild(GuideUI.notice("These are typical conditions, not a decision about you. The final decision rests with the relevant authority.", true));
      s.appendChild(bullets(g.conditions.map((c) => c.text)));
      wrap.appendChild(s);
    }

    // Steps.
    if (g.steps && g.steps.length > 0) {
      const s = section("What should I do?");
      const ol = document.createElement("ol");
      ol.className = "steps";
      for (const st of g.steps) {
        const li = document.createElement("li");
        li.textContent = st.title + (st.detail ? " " + st.detail : "");
        ol.appendChild(li);
      }
      s.appendChild(ol);
      wrap.appendChild(s);
    }

    // Where / how.
    if (g.obtain) {
      const s = section("Where and how do I get it?");
      const where = document.createElement("p");
      where.textContent = g.obtain.where || "";
      const how = document.createElement("p");
      how.textContent = g.obtain.how || "";
      s.appendChild(where);
      s.appendChild(how);
      for (const link of g.obtain.officialLinks || []) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.className = "btn";
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = link.label + " \u2197";
        p.appendChild(a);
        const note = document.createElement("p");
        note.className = "authority";
        note.textContent = "Official portal \u2014 you'll continue on the department site. This guide doesn't issue anything.";
        p.appendChild(note);
        s.appendChild(p);
      }
      if ((g.obtain.officialLinks || []).length === 0) {
        s.appendChild(GuideUI.notice("No verified official link in this demo. Check the department's official website before you proceed."));
      }
      wrap.appendChild(s);
    }

    // Dependency view.
    if (GuideStore.edges(g.requirements, []).length > 0) {
      const s = section("What depends on what?");
      s.appendChild(GuideUI.depTree(g, byId));
      wrap.appendChild(s);
    }

    // Related guides.
    GuideStore.related(g).then((relatives) => {
      if (relatives.length === 0) return;
      const s = section("Related guides");
      const grid = document.createElement("div");
      grid.className = "card-grid";
      for (const r of relatives.slice(0, 4)) grid.appendChild(GuideUI.guideCard(r, byId));
      s.appendChild(grid);
      // Insert before honesty footer (last child).
      wrap.insertBefore(s, wrap.lastChild);
    });

    // Honesty footer.
    const honest = document.createElement("div");
    honest.className = "honesty notice";
    honest.textContent = "Demo content \u2014 requirements can vary by state and situation. Check the official requirements before applying. The final decision is made by the relevant authority, not by this guide.";
    wrap.appendChild(honest);

    return wrap;
  }

  document.addEventListener("DOMContentLoaded", init);
})();
