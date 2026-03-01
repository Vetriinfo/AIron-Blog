/**
 * Blog data API: fetch posts JSON with error handling.
 * Returns { posts: [], meta: {} } or throws / returns null on failure.
 * Automation: This is the single point to swap for a different data source (e.g. Python-generated JSON).
 */
(function () {
  "use strict";

  var DATA_URL = (window.BLOG_CONFIG && window.BLOG_CONFIG.DATA_URL) || "data/posts.json";

  function getBaseUrl() {
    var base = document.querySelector("script[src*='api.js']");
    if (base && base.src) {
      var path = base.src.replace(/\/[^/]+$/, "/");
      return path;
    }
    return "";
  }

  /**
   * Fetch blog data from JSON. Relative URL is resolved from current page or script base.
   */
  function fetchBlogData() {
    var url = DATA_URL;
    if (url.indexOf("http") !== 0 && url.indexOf("//") !== 0) {
      var base = window.location.origin + window.location.pathname.replace(/\/[^/]*$/, "/");
      if (base.indexOf("file:") === 0) {
        base = window.location.href.replace(/\/[^/]*$/, "/");
      }
      url = base + url;
    }
    return fetch(url, { method: "GET" })
      .then(function (res) {
        if (!res.ok) throw new Error("Fetch failed: " + res.status);
        return res.json();
      })
      .then(function (data) {
        if (!data || !Array.isArray(data.posts)) {
          throw new Error("Invalid blog data");
        }
        return { posts: data.posts, meta: data.meta || {} };
      });
  }

  window.BLOG_API = {
    fetchBlogData: fetchBlogData
  };
})();
