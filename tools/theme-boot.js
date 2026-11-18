(function () {
  try {
    var stored = localStorage.getItem("brand.theme");
    var dark =
      stored === "dark" ||
      ((stored === null || stored === "system") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (dark) document.documentElement.classList.add("dark");
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", dark ? "#12110e" : "#f4f0e7");
  } catch (error) {
    // Storage can be blocked. The default light theme still works.
  }
})();
