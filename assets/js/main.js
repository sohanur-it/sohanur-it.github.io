/* ============================================================
   TYPED INTRO
   ============================================================ */
function say_hello() {
  $('#intro').typed({
    strings: ['Hello!', "I&#8217;m Sohanur Rahman"],
    typeSpeed: 55,
    backSpeed: 28,
    showCursor: false,
    fadeOut: false,
    backDelay: 1400,
    startDelay: 700,
    loop: true,
    loopCount: 1,
  });
}

/* ============================================================
   NAVBAR: add .scrolled class on scroll
   ============================================================ */
(function () {
  var navbar = document.getElementById('navbar');
  if (!navbar) return;

  function onScroll() {
    if (window.scrollY > 24) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}());

/* ============================================================
   MOBILE NAV TOGGLE
   ============================================================ */
(function () {
  var toggle = document.getElementById('navToggle');
  var links  = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    links.classList.toggle('open');
  });

  // close menu when a link is clicked
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('open');
    });
  });
}());

/* ============================================================
   SCROLL REVEAL + SKILL BAR ANIMATION
   Uses IntersectionObserver (no WOW.js dependency needed)
   ============================================================ */
(function () {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      entry.target.classList.add('visible');

      // Animate skill fill bars once they enter the viewport
      entry.target.querySelectorAll('.skill-fill').forEach(function (fill) {
        var target = fill.getAttribute('data-width');
        if (target) fill.style.width = target + '%';
      });

      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
}());

/* ============================================================
   SMOOTH SCROLL (hero scroll indicator)
   ============================================================ */
(function () {
  var btn = document.getElementById('scrollToNext');
  if (!btn) return;

  btn.addEventListener('click', function (e) {
    e.preventDefault();
    var targetId = btn.getAttribute('href');
    var target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}());

/* ============================================================
   PROJECT MODAL
   ============================================================ */
function showProjectDetail(img, title, content) {
  $('#modalTitle').html(title);
  $('#project-modal-img').attr('src', img);
  $('#modal-content-paragrapt').html(content);
  $('#projectModal').modal({ show: true, keyboard: true, focus: true });
}

/* ============================================================
   DOCUMENT READY
   ============================================================ */
$(document).ready(function () {
  say_hello();

  $('[data-lightbox]').on('click', function (e) {
    e.preventDefault();
    showProjectDetail(
      $(this).attr('data-lightbox'),
      $(this).attr('data-title'),
      $(this).attr('data-content')
    );
  });

  $('#projectModalCloseBtn').on('click', function (e) {
    e.preventDefault();
    $('#projectModal').modal('hide');
  });
});
