// Renders the filter bar and masonry gallery from photos/photos.js.
// The active filter lives in the URL hash (e.g. index.html#city) so it can be shared.
// With no hash, the "Featured" view shows the categories listed in SITE.featured.
(function () {
  const { categories, featured } = window.SITE;
  const filterBar = document.getElementById("filters");
  const grid = document.getElementById("gallery");

  const currentFilter = () => {
    const hash = decodeURIComponent(location.hash.slice(1));
    return hash in categories ? hash : "featured";
  };

  function renderFilters(active) {
    const buttons = [["featured", "Featured"], ...Object.entries(categories)];
    filterBar.innerHTML = buttons
      .map(([key, label]) => {
        const selected = key === active;
        return `<button type="button" data-filter="${key}" aria-pressed="${selected}"
          class="font-signika text-lg pb-0.5 border-b-2 transition duration-300 ${
            selected
              ? "border-black dark:border-white"
              : "border-transparent text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
          }">${label}</button>`;
      })
      .join("");
  }

  function renderGallery(active) {
    const photos = window.PHOTOS.filter((p) =>
      active === "featured" ? featured.includes(p.category) : p.category === active
    );
    grid.innerHTML = "";
    photos.forEach((photo, i) => {
      const link = document.createElement("a");
      link.href = photo.src;
      link.dataset.fancybox = "gallery";
      if (photo.title) link.dataset.caption = photo.title;
      link.className = "block mb-2 overflow-hidden break-inside-avoid";

      const img = document.createElement("img");
      img.src = photo.thumb || photo.src;
      img.alt = photo.alt || `${categories[photo.category]} photograph`;
      // Known dimensions reserve space, so lazy-loaded images don't make the columns jump.
      if (photo.width && photo.height) {
        img.width = photo.width;
        img.height = photo.height;
      }
      img.loading = i < 6 ? "eager" : "lazy";
      img.className =
        "block w-full h-auto opacity-0 transition duration-500 transform scale-100 hover:scale-110";
      img.addEventListener("load", () => img.classList.replace("opacity-0", "opacity-100"), { once: true });

      link.appendChild(img);
      grid.appendChild(link);
    });
    if (!photos.length) {
      grid.innerHTML = `<p class="text-gray-500 dark:text-gray-400">No photos in this category yet.</p>`;
    }
  }

  function render() {
    const active = currentFilter();
    renderFilters(active);
    renderGallery(active);
  }

  filterBar.addEventListener("click", (e) => {
    const button = e.target.closest("[data-filter]");
    if (!button) return;
    const key = button.dataset.filter;
    // replaceState so filtering doesn't fill up the back button history.
    history.replaceState(null, "", key === "featured" ? location.pathname : `#${key}`);
    render();
  });
  window.addEventListener("hashchange", render);

  // Bound once; Fancybox looks up the group at click time, so it only
  // cycles through the photos currently rendered for the active filter.
  Fancybox.bind('[data-fancybox="gallery"]', { Hash: false });

  render();
})();
