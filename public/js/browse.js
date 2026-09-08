"use strict";

/* Browse: thin A-Z index over the same guides (?type=services|documents|guides). */
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

    let guides = [];
    try {
      guides = await GuideStore.all();
    } catch (err) {
      main.appendChild(
        GuideUI.notice("We couldn't load guides right now. Check that the server is running (npm start), then try again.")
      );
      return;
    }
    const byId = new Map(guides.map((g) => [g.id, g]));

    const h1 = document.createElement("h1");
    h1.textContent = TITLES[type] || TITLES.guides;
    h1.style.color = "var(--navy)";
    main.appendChild(h1);
    const count = document.createElement("p");
    count.className = "result-count";

    const list = type === "services"
      ? guides.filter((g) => g.kind === "service")
      : type === "documents"
        ? guides.filter((g) => g.kind === "document")
        : guides;

    list.sort((a, b) => a.title.localeCompare(b.title));
    count.textContent = list.length + (list.length === 1 ? " guide." : " guides.");
    main.appendChild(count);

    const grid = document.createElement("div");
    grid.className = "card-grid";
    for (const g of list) grid.appendChild(GuideUI.guideCard(g, byId));
    main.appendChild(grid);

    main.appendChild(GuideUI.notice("Demo catalogue \u2014 a small sample to demonstrate guidance, not the full government catalogue."));
  }

  document.addEventListener("DOMContentLoaded", init);
})();
