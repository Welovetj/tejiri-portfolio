/* ============================================================
   cursor.js  —  golden crown cursor
   ============================================================ */
(function () {
  var crown = document.getElementById('cursorCrown');
  var glow  = document.getElementById('cursorGlow');
  if (!crown || !glow) return;

  document.addEventListener('mousemove', function (e) {
    crown.style.left = e.clientX + 'px';
    crown.style.top  = e.clientY + 'px';
    glow.style.left  = e.clientX + 'px';
    glow.style.top   = e.clientY + 'px';
  });

  var hoverEls = document.querySelectorAll(
    'a, button, .badge, .room-card, .project-item, .interest-card, .stat-box, .social-card, .slide-arrow, .thumb, .slide-dot'
  );
  hoverEls.forEach(function (el) {
    el.addEventListener('mouseenter', function () { document.body.classList.add('cursor-hover'); });
    el.addEventListener('mouseleave', function () { document.body.classList.remove('cursor-hover'); });
  });

  document.addEventListener('mousedown', function (e) {
    var r = document.createElement('div');
    r.className = 'cursor-ripple';
    r.style.left = e.clientX + 'px';
    r.style.top  = e.clientY + 'px';
    document.body.appendChild(r);
    r.addEventListener('animationend', function () { r.remove(); });
  });
})();
