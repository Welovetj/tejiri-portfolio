/* ============================================================
   slideshow.js  —  cinematic auto-advancing slideshow
   ============================================================ */
(function () {
  var stage     = document.querySelector('.slide-stage');
  var slides    = document.querySelectorAll('.slide');
  var dots      = document.querySelectorAll('.slide-dot');
  var thumbs    = document.querySelectorAll('.thumb');
  var counter   = document.querySelector('.slide-counter span');
  var prevBtn   = document.getElementById('slidePrev');
  var nextBtn   = document.getElementById('slideNext');
  var progBar   = document.querySelector('.slide-progress-bar');

  if (!slides.length) return;

  var current  = 0;
  var total    = slides.length;
  var timer    = null;
  var DURATION = 4000;

  function goTo(idx) {
    slides[current].classList.remove('active');
    slides[current].classList.add('prev');
    dots[current]  && dots[current].classList.remove('active');
    thumbs[current] && thumbs[current].classList.remove('active');

    current = (idx + total) % total;

    slides[current].classList.remove('prev');
    slides[current].classList.add('active');
    dots[current]  && dots[current].classList.add('active');
    thumbs[current] && thumbs[current].classList.add('active');
    if (counter) counter.textContent = (current + 1);

    /* restart progress bar */
    if (progBar) {
      progBar.classList.remove('running');
      void progBar.offsetWidth; /* reflow */
      progBar.classList.add('running');
    }

    /* clean up prev class after transition */
    var prev = current === 0 ? total - 1 : current - 1;
    setTimeout(function () {
      slides[prev] && slides[prev].classList.remove('prev');
    }, 950);
  }

  function startAuto() {
    clearInterval(timer);
    timer = setInterval(function () { goTo(current + 1); }, DURATION);
  }

  function resetAuto() { startAuto(); }

  /* init */
  goTo(0);
  startAuto();

  /* arrows */
  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); resetAuto(); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); resetAuto(); });

  /* dots */
  dots.forEach(function (d, i) {
    d.addEventListener('click', function () { goTo(i); resetAuto(); });
  });

  /* thumbs */
  thumbs.forEach(function (t, i) {
    t.addEventListener('click', function () { goTo(i); resetAuto(); });
  });

  /* keyboard */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft')  { goTo(current - 1); resetAuto(); }
    if (e.key === 'ArrowRight') { goTo(current + 1); resetAuto(); }
  });

  /* pause on hover */
  if (stage) {
    stage.addEventListener('mouseenter', function () { clearInterval(timer); if (progBar) progBar.style.animationPlayState = 'paused'; });
    stage.addEventListener('mouseleave', function () { startAuto(); if (progBar) progBar.style.animationPlayState = 'running'; });
  }

  /* touch swipe */
  var touchX = null;
  document.addEventListener('touchstart', function (e) { touchX = e.touches[0].clientX; }, { passive:true });
  document.addEventListener('touchend', function (e) {
    if (touchX === null) return;
    var diff = touchX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) { diff > 0 ? goTo(current + 1) : goTo(current - 1); resetAuto(); }
    touchX = null;
  });
})();
