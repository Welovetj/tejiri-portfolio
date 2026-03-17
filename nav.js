/* ============================================================
   nav.js  —  hamburger menu · scroll reveal · skill bars
   ============================================================ */
(function () {
  /* ── Hamburger ── */
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', function () {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
  }

  /* ── Scroll reveal ── */
  var revealObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(function (el) { revealObs.observe(el); });

  /* ── Skill bars ── */
  var skillObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-bar').forEach(function (b) { b.classList.add('animated'); });
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll('.skill-group').forEach(function (g) { skillObs.observe(g); });
})();

/* Global close menu helper called from inline onclick */
function closeMenu() {
  var hamburger  = document.getElementById('hamburger');
  var mobileMenu = document.getElementById('mobileMenu');
  if (hamburger)  hamburger.classList.remove('open');
  if (mobileMenu) mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
}
