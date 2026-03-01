/**
 * Home page: load featured posts (featured === true) and render cards with lazy images.
 * Fallback UI if fetch fails. Uses escaped content for XSS safety.
 */
(function () {
  "use strict";

  var escapeHtml = window.BLOG_UTILS && window.BLOG_UTILS.escapeHtml;
  var formatDate = window.BLOG_UTILS && window.BLOG_UTILS.formatDate;
  var safeTextToHtml = window.BLOG_UTILS && window.BLOG_UTILS.safeTextToHtml;

  if (!escapeHtml || !formatDate) return;

  function buildPostUrl(id) {
    return "post.html?id=" + encodeURIComponent(id);
  }

  function createCard(post) {
    var wrap = document.createElement("div");
    wrap.className = "blog-card";
    var link = document.createElement("a");
    link.className = "blog-card-link";
    link.href = buildPostUrl(post.id);
    link.setAttribute("rel", "noopener noreferrer");

    var imgWrap = document.createElement("div");
    imgWrap.className = "blog-card-image-wrap";
    var img = document.createElement("img");
    img.className = "blog-card-image";
    img.alt = escapeHtml(post.imageAlt || post.title);
    img.setAttribute("data-loaded", "false");
    img.loading = "lazy";
    img.width = 800;
    img.height = 450;
    if (post.image) {
      img.src = post.image;
      img.addEventListener("load", function () {
        img.setAttribute("data-loaded", "true");
      });
      img.addEventListener("error", function () {
        img.setAttribute("data-loaded", "true");
      });
    }
    imgWrap.appendChild(img);

    var body = document.createElement("div");
    body.className = "blog-card-body";
    var cat = document.createElement("span");
    cat.className = "blog-card-category";
    cat.textContent = post.category || "";
    var title = document.createElement("h3");
    title.className = "blog-card-title";
    title.textContent = post.title || "";
    var excerpt = document.createElement("p");
    excerpt.className = "blog-card-excerpt";
    excerpt.textContent = (post.excerpt || "").slice(0, 120);
    if ((post.excerpt || "").length > 120) excerpt.textContent += "\u2026";
    var meta = document.createElement("div");
    meta.className = "blog-card-meta";
    meta.innerHTML =
      "<span>" + escapeHtml(formatDate(post.date)) + "</span><span>" + escapeHtml(post.readTime || "") + "</span>";

    body.appendChild(cat);
    body.appendChild(title);
    body.appendChild(excerpt);
    body.appendChild(meta);
    link.appendChild(imgWrap);
    link.appendChild(body);
    wrap.appendChild(link);
    return wrap;
  }

  function showError() {
    var el = document.getElementById("featured-error");
    if (el) el.classList.remove("hidden");
  }

  function init() {
    var container = document.getElementById("featured-posts");
    if (!container) return;

    window.BLOG_API.fetchBlogData()
      .then(function (data) {
        var featured = (data.posts || []).filter(function (p) {
          return p.featured === true;
        });
        if (featured.length === 0) featured = (data.posts || []).slice(0, 3);
        container.innerHTML = "";
        featured.slice(0, 3).forEach(function (post) {
          container.appendChild(createCard(post));
        });
      })
      .catch(function () {
        container.innerHTML = "";
        showError();
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
