/* ==========================================================================
   Ryzo Technologies — Global scripts
   Handles: mobile nav toggle, hero slider, contact form submission
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Mobile navigation toggle ---- */
  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.querySelector(".main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  /* ---- Hero slider ----
     Rotation timing is adjustable via the data-interval attribute (ms)
     on the .hero-slider element. Defaults to 6000ms if not set. */
  var slider = document.querySelector(".hero-slider");

  if (slider) {
    var slides = Array.prototype.slice.call(slider.querySelectorAll(".slide"));
    var dots = Array.prototype.slice.call(slider.querySelectorAll(".slider-dot"));
    var prevBtn = slider.querySelector(".slider-arrow--prev");
    var nextBtn = slider.querySelector(".slider-arrow--next");
    var intervalMs = parseInt(slider.getAttribute("data-interval"), 10) || 6000;
    var current = slides.findIndex(function (s) {
      return s.classList.contains("is-active");
    });
    if (current < 0) current = 0;
    var timer = null;

    function showSlide(index) {
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
      });
      dots.forEach(function (dot, i) {
        dot.classList.toggle("is-active", i === index);
        dot.setAttribute("aria-current", i === index ? "true" : "false");
      });
      current = index;
    }

    function goTo(index) {
      var total = slides.length;
      var next = (index + total) % total;
      showSlide(next);
    }

    function startAutoRotate() {
      stopAutoRotate();
      if (slides.length > 1) {
        timer = window.setInterval(function () {
          goTo(current + 1);
        }, intervalMs);
      }
    }

    function stopAutoRotate() {
      if (timer) {
        window.clearInterval(timer);
        timer = null;
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", function () {
        goTo(current - 1);
        startAutoRotate();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", function () {
        goTo(current + 1);
        startAutoRotate();
      });
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i);
        startAutoRotate();
      });
    });

    /* Pause rotation while a user is focused/interacting inside the slider,
       resume afterwards. Keeps auto-rotate from disrupting keyboard users. */
    slider.addEventListener("mouseenter", stopAutoRotate);
    slider.addEventListener("mouseleave", startAutoRotate);
    slider.addEventListener("focusin", stopAutoRotate);
    slider.addEventListener("focusout", startAutoRotate);

    showSlide(current);
    startAutoRotate();
  }

})();
