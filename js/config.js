/**
 * Blog configuration - single source for URLs and constants.
 * Automation: Update DATA_URL when serving from a different base path (e.g. GitHub Pages subpath).
 */
(function () {
  "use strict";
  window.BLOG_CONFIG = {
    DATA_URL: "data/posts.json",
    POSTS_PER_PAGE: 6,
    THEME_KEY: "blog-theme"
  };
})();
