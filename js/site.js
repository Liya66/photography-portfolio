// Renders the shared header/footer and fills in details from site.config.js.
// Each page includes <header id="site-header"> and <footer id="site-footer">,
// and marks its nav item with <body data-page="portfolio|about|contact">.
(function () {
  const site = window.SITE;
  const page = document.body.dataset.page;

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

  const navItem = (key, href, label) => {
    const underline =
      key === page
        ? "hidden md:block h-0.5 bg-black dark:bg-white"
        : "hidden md:block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-black dark:bg-white";
    return `
      <li class="group transition duration-300">
        <a href="${href}" class="font-signika text-2xl tap-highlight-transparent"${key === page ? ' aria-current="page"' : ""}>${label}
          <span class="${underline}"></span>
        </a>
      </li>`;
  };

  document.getElementById("site-header").innerHTML = `
    <nav x-data="{ open: false }" class="w-full">
      <div class="container mx-auto flex flex-wrap items-center md:flex-nowrap">
        <div class="mr-4 md:mr-8">
          <a href="index.html" class="text-2xl font-signika font-bold uppercase">${esc(site.name)}</a>
        </div>
        <div class="order-last w-full h-0 overflow-hidden transition-all ease-out duration-500 md:order-none md:h-auto md:overflow-visible md:transition-none md:w-auto md:flex-grow md:flex md:items-center"
          :class="{ '!h-40': open }">
          <ul class="flex flex-col items-center text-center md:text-start space-y-2 md:space-y-0 md:space-x-5 mt-5 md:flex-row md:items-center md:ml-auto md:mt-0">
            ${navItem("portfolio", "index.html", "PORTFOLIO")}
            ${navItem("about", "about.html", "ABOUT ME")}
            ${navItem("contact", "contact.html", "CONTACT")}
          </ul>
        </div>
        <button type="button" onclick="toggleTheme()" aria-label="Toggle dark mode"
          class="tap-highlight-transparent ml-auto md:ml-6 p-1 text-black dark:text-white hover:opacity-70 transition">
          <svg class="w-5 h-5 dark:hidden" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
          </svg>
          <svg class="w-5 h-5 hidden dark:block" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" />
            <path stroke-linecap="round" d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </button>
        <div class="ml-4 md:hidden flex items-center">
          <button type="button" @click="open = !open" :aria-expanded="open"
            class="tap-highlight-transparent text-black dark:text-white w-5 h-5 relative focus:outline-none">
            <span class="sr-only">Open main menu</span>
            <div class="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
                :class="{ 'rotate-45': open, '-translate-y-1.5': !open }"></span>
              <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
                :class="{ 'opacity-0': open }"></span>
              <span aria-hidden="true" class="block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out"
                :class="{ '-rotate-45': open, 'translate-y-1.5': !open }"></span>
            </div>
          </button>
        </div>
      </div>
    </nav>`;

  const icons = {
    instagram:
      "M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z",
    facebook:
      "M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z",
    linkedin:
      "M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z",
    behance:
      "M4.654 3c.461 0 .887.035 1.278.14.39.07.711.216.996.391.286.176.497.426.641.747.14.32.216.711.216 1.137 0 .496-.106.922-.356 1.242-.215.32-.566.606-.997.817.606.176 1.067.496 1.348.922.281.426.461.957.461 1.563 0 .496-.105.922-.285 1.278a2.317 2.317 0 0 1-.782.887c-.32.215-.711.39-1.137.496a5.329 5.329 0 0 1-1.278.176L0 12.803V3h4.654zm-.285 3.978c.39 0 .71-.105.957-.285.246-.18.355-.497.355-.887 0-.216-.035-.426-.105-.567a.981.981 0 0 0-.32-.355 1.84 1.84 0 0 0-.461-.176c-.176-.035-.356-.035-.567-.035H2.17v2.31c0-.005 2.2-.005 2.2-.005zm.105 4.193c.215 0 .426-.035.606-.07.176-.035.356-.106.496-.216s.25-.215.356-.39c.07-.176.14-.391.14-.641 0-.496-.14-.852-.426-1.102-.285-.215-.676-.32-1.137-.32H2.17v2.734h2.305v.005zm6.858-.035c.286.285.711.426 1.278.426.39 0 .746-.106 1.032-.286.285-.215.46-.426.53-.64h1.74c-.286.851-.712 1.457-1.278 1.848-.566.355-1.243.566-2.06.566a4.135 4.135 0 0 1-1.527-.285 2.827 2.827 0 0 1-1.137-.782 2.851 2.851 0 0 1-.712-1.172c-.175-.461-.25-.957-.25-1.528 0-.531.07-1.032.25-1.493.18-.46.426-.852.747-1.207.32-.32.711-.606 1.137-.782a4.018 4.018 0 0 1 1.493-.285c.606 0 1.137.105 1.598.355.46.25.817.532 1.102.958.285.39.496.851.641 1.348.07.496.105.996.07 1.563h-5.15c0 .58.21 1.11.496 1.396zm2.24-3.732c-.25-.25-.642-.391-1.103-.391-.32 0-.566.07-.781.176-.215.105-.356.25-.496.39a.957.957 0 0 0-.25.497c-.036.175-.07.32-.07.46h3.196c-.07-.526-.25-.882-.497-1.132zm-3.127-3.728h3.978v.957h-3.978v-.957z",
  };
  const emailIcon =
    "M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z";
  const labels = { instagram: "Instagram", facebook: "Facebook", linkedin: "LinkedIn", behance: "Behance" };

  // Contact page: labelled icon buttons for Instagram and email.
  const contactLinks = document.getElementById("contact-links");
  if (contactLinks) {
    const button = (href, icon, label, external) => `
      <a href="${esc(href)}"${external ? ' target="_blank" rel="noreferrer"' : ""}
        class="inline-flex items-center gap-2 py-2.5 px-4 text-sm font-medium rounded-lg border border-gray-300 dark:border-neutral-700 hover:bg-black hover:text-white hover:border-black dark:hover:bg-white dark:hover:text-black dark:hover:border-white transition">
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="${icon}" /></svg>
        ${label}
      </a>`;
    contactLinks.innerHTML = [
      site.socials?.instagram && button(site.socials.instagram, icons.instagram, "Instagram", true),
      site.email && button(`mailto:${site.email}`, emailIcon, "Email me", false),
    ]
      .filter(Boolean)
      .join("");
  }

  const iconLink = (href, icon, label, external) => `
    <a class="transition duration-300 hover:opacity-75" href="${esc(href)}" aria-label="${label}" title="${label}"${
      external ? ' target="_blank" rel="noreferrer"' : ""
    }>
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true"><path d="${icon}" /></svg>
    </a>`;

  const socialLinks = [
    ...Object.entries(site.socials || {})
      .filter(([key, url]) => url && icons[key])
      .map(([key, url]) => iconLink(url, icons[key], labels[key], true)),
    site.email && iconLink(`mailto:${site.email}`, emailIcon, "Email", false),
  ]
    .filter(Boolean)
    .join("");

  const details = site.location ? esc(site.location) : "";

  document.getElementById("site-footer").innerHTML = `
    <div class="max-w-screen-xl py-16 mx-auto text-center">
      <p class="font-signika font-bold uppercase">${esc(site.name)}</p>
      ${details ? `<p class="mt-4 text-sm text-gray-600 dark:text-gray-300">${details}</p>` : ""}
      ${socialLinks ? `<div class="flex justify-center space-x-6 mt-8 text-gray-600 dark:text-gray-300">${socialLinks}</div>` : ""}
      <p class="mt-8 text-xs text-gray-600 dark:text-gray-300">
        © ${new Date().getFullYear()} ${esc(site.name)}
      </p>
    </div>`;

  // Fill <... data-site="name|tagline|email|location"> placeholders.
  document.querySelectorAll("[data-site]").forEach((el) => {
    el.textContent = site[el.dataset.site] || "";
  });

  const title = document.body.dataset.title;
  document.title = title ? `${title} — ${site.name}` : `${site.name} — Photography`;
  document.querySelector('meta[name="description"]')?.setAttribute("content", site.description);

  // Fade the page in once it's rendered (body starts at opacity-0).
  requestAnimationFrame(() => document.body.classList.replace("opacity-0", "opacity-100"));
})();
