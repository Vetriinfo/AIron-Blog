/**
 * Blog listing: fetch posts, real-time search, category filter, pagination.
 * Renders cards with lazy images. Escape all dynamic content.
 */
(function () {
  "use strict";

  var escapeHtml = window.BLOG_UTILS && window.BLOG_UTILS.escapeHtml;
  var formatDate = window.BLOG_UTILS && window.BLOG_UTILS.formatDate;
  var config = window.BLOG_CONFIG || {};
  var perPage = config.POSTS_PER_PAGE || 6;

  if (!escapeHtml || !formatDate) return;

  var allPosts = [];
  var currentPage = 1;

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

  function getQuery() {
    var input = document.getElementById("search-input");
    return (input && input.value) ? input.value.trim().toLowerCase() : "";
  }

  function getCategory() {
    var sel = document.getElementById("category-filter");
    return (sel && sel.value) ? sel.value : "";
  }

  function filterPosts() {
    var q = getQuery();
    var cat = getCategory();
    return allPosts.filter(function (post) {
      var matchCat = !cat || (post.category === cat);
      var matchSearch = !q || (
        (post.title || "").toLowerCase().indexOf(q) >= 0 ||
        (post.excerpt || "").toLowerCase().indexOf(q) >= 0 ||
        (post.category || "").toLowerCase().indexOf(q) >= 0
      );
      return matchCat && matchSearch;
    });
  }

  function render(filtered, page) {
    var list = document.getElementById("blog-list");
    var noResults = document.getElementById("no-results");
    var paginationWrap = document.getElementById("pagination-wrap");
    if (!list) return;

    var start = (page - 1) * perPage;
    var slice = filtered.slice(start, start + perPage);

    list.innerHTML = "";
    if (slice.length === 0) {
      noResults && noResults.classList.remove("hidden");
      paginationWrap && paginationWrap.classList.add("hidden");
      return;
    }
    noResults && noResults.classList.add("hidden");
    slice.forEach(function (post) {
      list.appendChild(createCard(post));
    });

    var totalPages = Math.ceil(filtered.length / perPage);
    if (totalPages <= 1) {
      paginationWrap && paginationWrap.classList.add("hidden");
      return;
    }
    paginationWrap && paginationWrap.classList.remove("hidden");
    paginationWrap.innerHTML = "";

    var prevBtn = document.createElement("button");
    prevBtn.type = "button";
    prevBtn.className = "btn btn-secondary";
    prevBtn.textContent = "Previous";
    prevBtn.disabled = page <= 1;
    prevBtn.addEventListener("click", function () {
      if (page > 1) {
        currentPage = page - 1;
        render(filtered, currentPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    paginationWrap.appendChild(prevBtn);

    var pageInfo = document.createElement("span");
    pageInfo.style.cssText = "padding: 0 0.5rem; color: var(--color-text-muted); font-size: 0.9375rem;";
    pageInfo.textContent = "Page " + page + " of " + totalPages;
    paginationWrap.appendChild(pageInfo);

    var nextBtn = document.createElement("button");
    nextBtn.type = "button";
    nextBtn.className = "btn btn-secondary";
    nextBtn.textContent = "Next";
    nextBtn.disabled = page >= totalPages;
    nextBtn.addEventListener("click", function () {
      if (page < totalPages) {
        currentPage = page + 1;
        render(filtered, currentPage);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    });
    paginationWrap.appendChild(nextBtn);
  }

  function attachFilters() {
    var searchInput = document.getElementById("search-input");
    var categoryFilter = document.getElementById("category-filter");
    function run() {
      currentPage = 1;
      render(filterPosts(), currentPage);
    }
    if (searchInput) {
      searchInput.addEventListener("input", run);
      searchInput.addEventListener("search", run);
    }
    if (categoryFilter) {
      categoryFilter.addEventListener("change", run);
    }
  }

  function init() {
    var list = document.getElementById("blog-list");
    var errorEl = document.getElementById("blog-error");
    if (!list) return;

    window.BLOG_API.fetchBlogData()
      .then(function (data) {
        allPosts = data.posts || [];
        currentPage = 1;
        attachFilters();
        render(filterPosts(), 1);
      })
      .catch(function () {
        list.innerHTML = "";
        if (errorEl) errorEl.classList.remove("hidden");
      });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
