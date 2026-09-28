// Loaded in <head> (not deferred) so the theme is set before the page paints.
(function () {
  let stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {}
  const dark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
  document.documentElement.classList.toggle("dark", dark);
})();

function toggleTheme() {
  const dark = document.documentElement.classList.toggle("dark");
  try {
    localStorage.setItem("theme", dark ? "dark" : "light");
  } catch (e) {}
}
