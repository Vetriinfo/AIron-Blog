/**
 * Utility functions: escape HTML (XSS prevention), safe text rendering.
 * All dynamic content from JSON must be escaped before insertion into DOM.
 */
(function () {
  "use strict";

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;"
  };

  /**
   * Escape a string for safe use in HTML text content / attributes.
   * Prevents XSS when rendering user or JSON-sourced content.
   */
  function escapeHtml(str) {
    if (str == null || typeof str !== "string") return "";
    return String(str).replace(/[&<>"'/]/g, function (s) {
      return entityMap[s];
    });
  }

  /**
   * Render plain-text content safely: escape HTML then convert newlines to <br>.
   * Use for post body content. Do not pass unsanitized HTML here.
   */
  function safeTextToHtml(str) {
    if (str == null || typeof str !== "string") return "";
    return escapeHtml(str).replace(/\n/g, "<br>");
  }

  /**
   * Format date string (YYYY-MM-DD) for display.
   */
  function formatDate(dateStr) {
    if (!dateStr) return "";
    try {
      var d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    } catch (e) {
      return dateStr;
    }
  }

  window.BLOG_UTILS = {
    escapeHtml: escapeHtml,
    safeTextToHtml: safeTextToHtml,
    formatDate: formatDate
  };
})();
