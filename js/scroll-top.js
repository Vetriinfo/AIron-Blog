/**
 * Scroll-to-top button: show after user scrolls down, hide at top.
 * Smooth scroll on click via CSS (scroll-behavior: smooth).
 */
(function () {
  "use strict";

  var scrollThreshold = 400;
  var btn = document.getElementById("scroll-top");

  function toggleVisible() {
    if (!btn) return;
    if (window.pageYOffset > scrollThreshold) {
      btn.classList.add("visible");
    } else {
      btn.classList.remove("visible");
    }
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function init() {
    if (!btn) return;
    toggleVisible();
    window.addEventListener("scroll", toggleVisible, { passive: true });
    btn.addEventListener("click", scrollToTop);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
