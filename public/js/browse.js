"use strict";

/* Browse: type index (?type=services|documents|guides) or topic view (?cat=topic-id). */
(() => {
  const TITLES = {
    services: "Services",
    documents: "Documents",
    guides: "All guides",
  };

  async function init() {
    const main = document.getElementById("browse");
    const params = new URLSearchParams(window.location.search);
    const type = params.get("type") || "guides";
    const cat = params.get("cat") || "";
    const navLink = document.querySelector('.site-nav a[href="browse.html?type=' + type + '"]');
    if (navLink) navLink.setAttribute("aria-current", "page");

    let guides = [];
    try {
      guides = await GuideStore.all();
    } catch (err) {
      main.appendChild(
        GuideUI.notice("We couldn't load guides right now. Check that the server is running (npm start), then try again.", false, "alert")
      );
      return;
    }
    const byId = new Map(guides.map((g) => [g.id, g]));
    const topic = GuideUI.TOPICS.find((t) => t.id === cat) || null;

    const h1 = document.createElement("h1");
    h1.className = "page-title";
    const count = document.createElement("p");
    count.className = "result-count";

    let list = guides;
    if (topic) {
      h1.textContent = topic.title;
      list = guides.filter((g) => topic.categories.includes(g.category));
      const blurb = document.createElement("p");
      blurb.className = "lede";
      blurb.textContent = topic.blurb;
      main.appendChild(h1);
      main.appendChild(blurb);
      const back = document.createElement("p");
      const backLink = document.createElement("a");
      backLink.className = "btn btn-ghost btn-sm";
      backLink.href = "browse.html?type=guides";
      backLink.textContent = "\u2190 All guides";
      back.appendChild(backLink);
      main.appendChild(back);
    } else {
      h1.textContent = TITLES[type] || TITLES.guides;
      main.appendChild(h1);
      if (type === "services") list = guides.filter((g) => g.kind === "service");
      else if (type === "documents") list = guides.filter((g) => g.kind === "document");
      // Topic shortcut chips on the unfiltered view.
      const chips = document.createElement("div");
      chips.className = "chip-row";
      for (const t of GuideUI.TOPICS) {
        const n = guides.filter((g) => t.categories.includes(g.category)).length;
        if (n === 0) continue;
        const a = document.createElement("a");
        a.className = "chip";
        a.href = "browse.html?type=guides&cat=" + encodeURIComponent(t.id);
        a.appendChild(Icon.el(t.icon));
        a.appendChild(document.createTextNode(t.title + " (" + n + ")"));
        chips.appendChild(a);
      }
      main.appendChild(chips);
    }

    list.sort((a, b) => a.title.localeCompare(b.title));
    count.textContent = list.length + (list.length === 1 ? " guide." : " guides.");
    main.appendChild(count);

    const grid = document.createElement("div");
    grid.className = "card-grid";
    for (const g of list) grid.appendChild(GuideUI.guideCard(g, byId));
    main.appendChild(grid);
  }

  document.addEventListener("DOMContentLoaded", init);
})();
