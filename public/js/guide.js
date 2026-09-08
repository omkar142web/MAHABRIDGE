"use strict";

/* Guide page: article + sticky "On this page" rail, sections in blueprint
 * order. Unknown ids and broken links render friendly messages, never errors. */
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
        GuideUI.notice("We couldn't load this guide right now. Check that the server is running (npm start). Try again, or go back home.", false, "alert")
      );
      main.appendChild(homeLink());
      return;
    }

    if (!guide) {
      renderNotFound(main);
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

  function renderNotFound(main) {
    document.title = "Guide not found \u2014 MAHA-BRIDGE";
    const wrap = document.createElement("div");
    wrap.className = "reading";
    const h1 = document.createElement("h1");
    h1.textContent = "We couldn't find that guide.";
    wrap.appendChild(h1);
    wrap.appendChild(GuideUI.notice("The link may be old, or the guide may not exist yet. Try searching instead \u2014 nothing you viewed was lost.", false, "info"));
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
  }

  function section(eyebrow, title, id) {
    const s = document.createElement("section");
    s.className = "section";
    if (id) s.id = id;
    s.appendChild(GuideUI.sectionHead(eyebrow, title));
    return s;
  }

  function bullets(items) {
    const ul = document.createElement("ul");
    ul.className = "bullets";
    for (const t of items) {
      const li = document.createElement("li");
      li.textContent = t;
      ul.appendChild(li);
    }
    return ul;
  }

  function renderGuide(g, byId, fromId) {
    const layout = document.createElement("div");
    layout.className = "guide-layout";
    const article = document.createElement("article");
    article.className = "reading";
    layout.appendChild(article);

    const tocLinks = [];
    function addToc(id, label) {
      tocLinks.push({ id, label });
    }

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
      crumbs.appendChild(document.createTextNode(" / " + g.title));
      article.appendChild(crumbs);
      const backNote = document.createElement("p");
      const backLink = document.createElement("a");
      backLink.className = "btn btn-ghost btn-sm btn-back";
      backLink.href = GuideUI.guideHref(from.id, null);
      backLink.appendChild(Icon.el("arrowLeft"));
      backLink.appendChild(document.createTextNode("Back to " + from.title));
      backNote.appendChild(backLink);
      article.appendChild(backNote);
    } else {
      crumbs.appendChild(document.createTextNode(" / " + g.title));
      article.appendChild(crumbs);
    }

    // Header with icon tile.
    const head = document.createElement("div");
    head.className = "guide-head";
    const badgeRow = document.createElement("p");
    badgeRow.appendChild(GuideUI.typeBadge(g.kind));
    const titleRow = document.createElement("div");
    titleRow.className = "title-row";
    const tile = document.createElement("span");
    tile.className = "tile";
    tile.appendChild(Icon.el(GuideUI.categoryIcon(g)));
    const h1 = document.createElement("h1");
    h1.textContent = g.title;
    titleRow.appendChild(tile);
    titleRow.appendChild(h1);
    const auth = document.createElement("p");
    auth.className = "authority";
    auth.appendChild(Icon.el("shield", "auth-ic"));
    auth.appendChild(document.createTextNode("Provided by: " + (g.authority ? g.authority.name : "See official source")));
    head.appendChild(badgeRow);
    head.appendChild(titleRow);
    head.appendChild(auth);
    article.appendChild(head);

    // What is it?
    const what = section("Overview", "What is it?", "what");
    const sum = document.createElement("p");
    sum.className = "lede";
    sum.textContent = g.summary;
    what.appendChild(sum);
    article.appendChild(what);
    addToc("what", "What is it?");

    // Why do I need it?
    if (g.uses && g.uses.length > 0) {
      const why = section("Why it matters", "Why do I need it?", "why");
      why.appendChild(bullets(g.uses));
      article.appendChild(why);
      addToc("why", "Why do I need it?");
    }

    // Requirements, grouped: prerequisites first, then documents, then info.
    const reqs = g.requirements || [];
    const prereqs = reqs.filter((r) => r.kind === "prerequisite");
    const docs = reqs.filter((r) => r.kind === "document");
    const infos = reqs.filter((r) => r.kind === "information");

    function reqList(items) {
      const list = document.createElement("ul");
      list.className = "req-list";
      for (const r of items) list.appendChild(GuideUI.requirementRow(r, byId, g.id));
      return list;
    }

    if (prereqs.length > 0) {
      const s = section("Start here", "What do I need first?", "requirements");
      s.appendChild(GuideUI.notice("You'll need these first. Open each one to understand exactly what it takes \u2014 then come back here.", false, "layers"));
      s.appendChild(reqList(prereqs));
      article.appendChild(s);
      addToc("requirements", "What do I need first?");
    }
    if (docs.length > 0) {
      const s = section("Checklist", prereqs.length > 0 ? "What documents are required?" : "What do I need?", "docs");
      s.appendChild(reqList(docs));
      article.appendChild(s);
      addToc("docs", "Documents required");
    }
    if (infos.length > 0) {
      const s = section("Checklist", "What information is required?", "info");
      s.appendChild(GuideUI.notice("For your reference only \u2014 this guide never collects your information.", false, "info"));
      s.appendChild(reqList(infos));
      article.appendChild(s);
      addToc("info", "Information required");
    }
    if (g.conditions && g.conditions.length > 0) {
      const s = section("Good to know", "Basic conditions", "conditions");
      s.appendChild(GuideUI.notice("Typical conditions, not a decision about you. The final decision rests with the relevant authority.", true, "alert"));
      s.appendChild(bullets(g.conditions.map((c) => c.text)));
      article.appendChild(s);
      addToc("conditions", "Basic conditions");
    }

    // Steps.
    if (g.steps && g.steps.length > 0) {
      const s = section("Action plan", "What should I do?", "steps");
      const ol = document.createElement("ol");
      ol.className = "steps";
      for (const st of g.steps) {
        const li = document.createElement("li");
        li.textContent = st.title + (st.detail ? " " + st.detail : "");
        ol.appendChild(li);
      }
      s.appendChild(ol);
      article.appendChild(s);
      addToc("steps", "What should I do?");
    }

    // Where / how.
    if (g.obtain) {
      const s = section("Official route", "Where and how do I get it?", "obtain");
      const where = document.createElement("p");
      const whereStrong = document.createElement("strong");
      whereStrong.textContent = "Where: ";
      where.appendChild(whereStrong);
      where.appendChild(document.createTextNode(g.obtain.where || "See the official source."));
      const how = document.createElement("p");
      const howStrong = document.createElement("strong");
      howStrong.textContent = "How: ";
      how.appendChild(howStrong);
      how.appendChild(document.createTextNode(g.obtain.how || "Follow the official process."));
      s.appendChild(where);
      s.appendChild(how);
      for (const link of g.obtain.officialLinks || []) {
        const p = document.createElement("p");
        const a = document.createElement("a");
        a.className = "btn btn-official";
        a.href = link.url;
        a.target = "_blank";
        a.rel = "noopener";
        a.textContent = link.label + " ";
        a.appendChild(Icon.el("external"));
        p.appendChild(a);
        const note = document.createElement("p");
        note.className = "authority";
        note.textContent = "Official portal \u2014 you'll continue on the department site. This guide doesn't issue anything.";
        p.appendChild(note);
        s.appendChild(p);
      }
      if ((g.obtain.officialLinks || []).length === 0) {
        s.appendChild(GuideUI.notice("No verified official link in this catalogue. Check the department's official website before you proceed.", true, "alert"));
      }
      article.appendChild(s);
      addToc("obtain", "Where and how?");
    }

    // Dependency view.
    if (GuideStore.edges(g.requirements, []).length > 0) {
      const s = section("Big picture", "What depends on what?", "depends");
      s.appendChild(GuideUI.depTree(g, byId));
      article.appendChild(s);
      addToc("depends", "Dependencies");
    }

    // Honesty footer.
    const honest = document.createElement("div");
    honest.className = "honesty notice";
    honest.textContent = "Requirements can vary by state and situation. Check the official requirements before applying. The final decision is made by the relevant authority, not by this guide.";
    article.appendChild(honest);

    // Rail + mobile disclosure share the same links.
    layout.appendChild(buildToc(tocLinks, false));
    const mobileToc = buildToc(tocLinks, true);
    article.insertBefore(mobileToc, article.children[1] || null);

    // Related guides (async): section + TOC link appended together.
    GuideStore.related(g).then((relatives) => {
      if (relatives.length === 0) return;
      const s = section("Keep exploring", "Related guides", "related");
      const grid = document.createElement("div");
      grid.className = "card-grid";
      for (const r of relatives.slice(0, 4)) grid.appendChild(GuideUI.guideCard(r, byId));
      s.appendChild(grid);
      article.insertBefore(s, honest);
      appendTocLink(layout, "related", "Related guides");
      spy.watch(s);
    });

    const spy = initSpy(layout, article);

    return layout;
  }

  function buildToc(links, mobile) {
    if (mobile) {
      const det = document.createElement("details");
      det.className = "toc-mobile";
      const sum = document.createElement("summary");
      sum.textContent = "On this page";
      det.appendChild(sum);
      const nav = document.createElement("nav");
      nav.setAttribute("aria-label", "On this page");
      nav.appendChild(tocList(links));
      det.appendChild(nav);
      return det;
    }
    const aside = document.createElement("aside");
    aside.className = "toc";
    aside.setAttribute("aria-label", "On this page");
    const title = document.createElement("strong");
    title.textContent = "On this page";
    aside.appendChild(title);
    aside.appendChild(tocList(links));
    return aside;
  }

  function tocList(links) {
    const ul = document.createElement("ul");
    ul.className = "toc-list";
    for (const l of links) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + l.id;
      a.dataset.section = l.id;
      a.textContent = l.label;
      li.appendChild(a);
      ul.appendChild(li);
    }
    return ul;
  }

  function appendTocLink(layout, id, label) {
    for (const nav of layout.querySelectorAll(".toc-list")) {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = "#" + id;
      a.textContent = label;
      li.appendChild(a);
      nav.appendChild(li);
    }
  }

  /* Highlights the TOC link for the section in view (drives both rails). */
  function initSpy(layout, article) {
    function setActive(id) {
      const links = layout.querySelectorAll(".toc-list a[data-section]");
      for (const a of links) {
        if (a.dataset.section === id) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      }
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive(e.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    function watch(section) {
      if (section && section.id) observer.observe(section);
    }
    article.querySelectorAll("section[id]").forEach(watch);
    return { watch };
  }

  // Highlight the section in the header nav (scripts run after the header markup).
  const navLink = document.querySelector('.site-nav a[href="browse.html?type=guides"]');
  if (navLink) navLink.setAttribute("aria-current", "page");

  document.addEventListener("DOMContentLoaded", init);
})();
