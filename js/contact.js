/**
 * Contact form: front-end validation only (no backend). Basic checks and error messages.
 * Automation: Form action or submit handler can be replaced to POST to a server or serverless function.
 */
(function () {
  "use strict";

  var form = document.getElementById("contact-form");
  var successEl = document.getElementById("form-success");

  function showError(fieldId, message) {
    var el = document.getElementById("error-" + fieldId);
    var input = document.getElementById("contact-" + fieldId);
    if (el) {
      el.textContent = message || "";
      el.classList.toggle("hidden", !message);
    }
    if (input) {
      input.classList.toggle("input-error", !!message);
    }
  }

  function validate() {
    var name = (document.getElementById("contact-name") && document.getElementById("contact-name").value) || "";
    var email = (document.getElementById("contact-email") && document.getElementById("contact-email").value) || "";
    var message = (document.getElementById("contact-message") && document.getElementById("contact-message").value) || "";
    var valid = true;

    showError("name", "");
    showError("email", "");
    showError("message", "");

    if (name.length < 2) {
      showError("name", "Name must be at least 2 characters.");
      valid = false;
    }
    if (!email) {
      showError("email", "Email is required.");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError("email", "Please enter a valid email address.");
      valid = false;
    }
    if (message.length < 10) {
      showError("message", "Message must be at least 10 characters.");
      valid = false;
    }
    return valid;
  }

  function init() {
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (successEl) successEl.classList.add("hidden");
      if (!validate()) return;
      if (successEl) {
        successEl.classList.remove("hidden");
        form.reset();
        showError("name", "");
        showError("email", "");
        showError("message", "");
      }
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
