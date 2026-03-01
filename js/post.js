/**
 * Single post page: read ?id= from URL, fetch posts JSON, find post, render with escaped content.
 * Updates meta title/description and JSON-LD. Fallback 404 UI if not found.
 */
(function () {
  "use strict";

  var escapeHtml = window.BLOG_UTILS && window.BLOG_UTILS.escapeHtml;
  var formatDate = window.BLOG_UTILS && window.BLOG_UTILS.formatDate;
  var safeTextToHtml = window.BLOG_UTILS && window.BLOG_UTILS.safeTextToHtml;

  if (!escapeHtml || !formatDate || !safeTextToHtml) return;

  function getPostId() {
    var params = new URLSearchParams(window.location.search);
    return params.get("id") || "";
  }

  function setMeta(post) {
    document.title = (post.title || "Post") + " | Tech & AI Blog";
    var desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", (post.excerpt || "").slice(0, 160));
    var ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", (post.title || "") + " | Tech & AI Blog");
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", (post.excerpt || "").slice(0, 160));
    if (post.image) {
      var ogImage = document.querySelector('meta[property="og:image"]');
      if (!ogImage) {
        ogImage = document.createElement("meta");
        ogImage.setAttribute("property", "og:image");
        document.head.appendChild(ogImage);
      }
      ogImage.setAttribute("content", post.image);
    }
    var canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      var url = window.location.origin + window.location.pathname + "?id=" + encodeURIComponent(post.id);
      canonical.setAttribute("href", url);
    }
    var jsonLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "author": { "@type": "Organization", "name": post.author || "Tech & AI Blog" }
    };
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }

  function showPost(post) {
    var skeleton = document.getElementById("post-skeleton");
    var wrap = document.getElementById("post-content-wrap");
    var errorEl = document.getElementById("post-error");
    if (skeleton) skeleton.classList.add("hidden");
    if (errorEl) errorEl.classList.add("hidden");
    if (wrap) wrap.classList.remove("hidden");

    var catEl = document.getElementById("post-category");
    var titleEl = document.getElementById("post-title");
    var metaEl = document.getElementById("post-meta");
    var imgWrap = document.getElementById("post-image-wrap");
    var img = document.getElementById("post-image");
    var bodyEl = document.getElementById("post-body");

    if (catEl) catEl.textContent = post.category || "";
    if (titleEl) titleEl.textContent = post.title || "";
    if (metaEl) {
      metaEl.innerHTML =
        "<span>" + escapeHtml(formatDate(post.date)) + "</span>" +
        "<span>" + escapeHtml(post.author || "") + "</span>" +
        "<span>" + escapeHtml(post.readTime || "") + "</span>";
    }
    if (img && post.image) {
      img.src = post.image;
      img.alt = escapeHtml(post.imageAlt || post.title);
      img.loading = "lazy";
      if (imgWrap) imgWrap.classList.remove("hidden");
    } else if (imgWrap) {
      imgWrap.classList.add("hidden");
    }
    if (bodyEl) {
      bodyEl.innerHTML = safeTextToHtml(post.content || "");
    }
    setMeta(post);
  }

  function showError() {
    var skeleton = document.getElementById("post-skeleton");
    var wrap = document.getElementById("post-content-wrap");
    var errorEl = document.getElementById("post-error");
    if (skeleton) skeleton.classList.add("hidden");
    if (wrap) wrap.classList.add("hidden");
    if (errorEl) errorEl.classList.remove("hidden");
  }

  function init() {
    var id = getPostId();
    if (!id) {
      showError();
      return;
    }

    window.BLOG_API.fetchBlogData()
      .then(function (data) {
        var post = (data.posts || []).find(function (p) {
          return p.id === id;
        });
        if (post) {
          showPost(post);
        } else {
          showError();
        }
      })
      .catch(function () {
        showError();
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
