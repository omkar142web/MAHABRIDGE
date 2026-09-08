"use strict";

/* Home: hero search + suggestions, chain demo, topics, popular, results. */
(() => {
  const POPULAR = ["pan-card", "aadhaar", "birth-certificate", "driving-licence", "income-certificate", "atm-card"];
  const CHAIN = ["atm-card", "pan-card", "aadhaar"];

  let guides = [];
  let byId = new Map();
  let activeSuggestion = -1;

  let input, suggestBox, results, popularGrid, topicGrid, chainBox;

  function init() {
    input = document.getElementById("search-input");
    suggestBox = document.getElementById("suggestions");
    results = document.getElementById("results");
    popularGrid = document.getElementById("popular-grid");
    topicGrid = document.getElementById("topic-grid");
    chainBox = document.getElementById("chain-demo");

    document.addEventListener("keydown", (e) => {
      if (e.key === "/" && document.activeElement !== input) {
        e.preventDefault();
        input.focus();
      }
    });
    input.addEventListener("input", onType);
    input.addEventListener("keydown", onKeys);
    document.addEventListener("click", (e) => {
      if (!e.target.closest(".search-row")) hideSuggestions();
    });
    document.querySelectorAll("[data-example]").forEach((btn) => {
      btn.addEventListener("click", () => {
        input.value = btn.getAttribute("data-example");
        runSearch(input.value);
        input.focus();
      });
    });

    popularGrid.appendChild(skeleton());
    GuideStore.all()
      .then((g) => {
        guides = g;
        byId = new Map(guides.map((x) => [x.id, x]));
        renderChain();
        renderTopics();
        renderPopular();
        const preset = new URLSearchParams(window.location.search).get("q");
        if (preset) {
          input.value = preset;
          runSearch(preset);
        }
      })
      .catch(() => {
        popularGrid.innerHTML = "";
        popularGrid.appendChild(
          GuideUI.notice("We couldn't load guides right now. Check that the server is running (npm start), then try again.", false, "alert")
        );
      });
  }

  function skeleton() {
    const d = document.createElement("div");
    d.className = "skeleton";
    d.style.minHeight = "120px";
    d.setAttribute("role", "status");
    d.setAttribute("aria-label", "Loading guides");
    return d;
  }

  function prereqHint(g) {
    const names = GuideStore.edges(g.requirements, [])
      .map((pid) => (byId.get(pid) ? byId.get(pid).title : ""))
      .filter(Boolean)
      .slice(0, 2);
    return names.length > 0 ? "Requires: " + names.join(", ") : (g.kind === "service" ? "Service guide" : "Document guide");
  }

  function renderChain() {
    const chain = CHAIN.map((id) => byId.get(id)).filter(Boolean);
    if (chain.length < 2 || !chainBox) return;
    chainBox.appendChild(GuideUI.chainCard(chain));
  }

  function renderTopics() {
    topicGrid.innerHTML = "";
    for (const t of GuideUI.TOPICS) {
      const count = guides.filter((g) => t.categories.includes(g.category)).length;
      if (count > 0) topicGrid.appendChild(GuideUI.topicCard(t, count));
    }
  }

  function renderPopular() {
    popularGrid.innerHTML = "";
    for (const id of POPULAR) {
      const g = byId.get(id);
      if (g) popularGrid.appendChild(GuideUI.guideCard(g, byId));
    }
  }

  // ---- Suggestions ----
  let debounce = null;
  function onType() {
    clearTimeout(debounce);
    debounce = setTimeout(showSuggestions, 150);
  }

  function showSuggestions() {
    const q = input.value.trim();
    activeSuggestion = -1;
    if (!q) {
      hideSuggestions();
      return;
    }
    const matches = GuideSearch.rank(guides, q, 6);
    suggestBox.innerHTML = "";
    if (matches.length === 0) {
      hideSuggestions();
      return;
    }
    for (const g of matches) {
      const a = document.createElement("a");
      a.href = "guide.html?id=" + encodeURIComponent(g.id);
      a.appendChild(Icon.el(GuideUI.categoryIcon(g), "sug-ic"));
      const title = document.createElement("span");
      title.textContent = g.title;
      const hintEl = document.createElement("span");
      hintEl.className = "hint";
      hintEl.textContent = prereqHint(g);
      a.appendChild(title);
      a.appendChild(hintEl);
      const li = document.createElement("li");
      li.appendChild(a);
      suggestBox.appendChild(li);
    }
    const more = document.createElement("li");
    more.className = "see-all";
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = "";
    btn.appendChild(document.createTextNode("See all results for \u201C" + q + "\u201D "));
    btn.appendChild(Icon.el("arrowRight"));
    btn.addEventListener("click", () => runSearch(q));
    more.appendChild(btn);
    suggestBox.appendChild(more);

    suggestBox.hidden = false;
    input.setAttribute("aria-expanded", "true");
  }

  function hideSuggestions() {
    suggestBox.hidden = true;
    input.setAttribute("aria-expanded", "false");
  }

  function suggestionLinks() {
    return [...suggestBox.querySelectorAll("li:not(.see-all) a")];
  }

  function onKeys(e) {
    const links = suggestionLinks();
    if (e.key === "Escape") {
      hideSuggestions();
      return;
    }
    if (suggestBox.hidden || links.length === 0) {
      if (e.key === "Enter") runSearch(input.value);
      return;
    }
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      links.forEach((l) => l.classList.remove("active"));
      activeSuggestion = e.key === "ArrowDown"
        ? (activeSuggestion + 1) % links.length
        : (activeSuggestion - 1 + links.length) % links.length;
      links[activeSuggestion].classList.add("active");
      links[activeSuggestion].focus();
    } else if (e.key === "Enter" && document.activeElement === input) {
      runSearch(input.value);
    }
    // Enter on a focused suggestion link navigates natively.
  }

  // ---- Results ----
  function runSearch(raw) {
    const q = raw.trim();
    hideSuggestions();
    results.innerHTML = "";
    if (!q) return;
    const matches = GuideSearch.rank(guides, q, 10);

    const head = document.createElement("div");
    head.className = "results-head";
    const heading = document.createElement("h2");
    const count = document.createElement("p");
    count.className = "result-count";
    count.setAttribute("role", "status");

    if (matches.length === 0) {
      heading.textContent = "We couldn't find an exact match for \u201C" + q + "\u201D.";
      count.textContent = "Showing related guides instead.";
      head.appendChild(heading);
      head.appendChild(count);
      results.appendChild(head);
      const grid = document.createElement("div");
      grid.className = "card-grid";
      for (const id of POPULAR.slice(0, 3)) {
        const g = byId.get(id);
        if (g) grid.appendChild(GuideUI.guideCard(g, byId));
      }
      results.appendChild(grid);
      results.appendChild(GuideUI.notice("Try searching for \u201CPAN\u201D, \u201Cbirth certificate\u201D, or \u201Cdriving licence\u201D \u2014 or browse all guides.", false, "info"));
      const browse = document.createElement("p");
      const link = document.createElement("a");
      link.className = "btn btn-ghost";
      link.href = "browse.html?type=guides";
      link.textContent = "Browse all guides";
      browse.appendChild(link);
      results.appendChild(browse);
      results.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (GuideSearch.isAmbiguous(q, matches.length)) {
      heading.textContent = "What do you need \u201C" + q + "\u201D for?";
      count.textContent = matches.length + " related guides. Pick the one matching your goal.";
    } else {
      heading.textContent = "Results for \u201C" + q + "\u201D";
      count.textContent = matches.length + (matches.length === 1 ? " guide found." : " guides found.");
    }
    head.appendChild(heading);
    head.appendChild(count);
    results.appendChild(head);
    const grid = document.createElement("div");
    grid.className = "card-grid";
    for (const g of matches) grid.appendChild(GuideUI.guideCard(g, byId));
    results.appendChild(grid);
    results.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
