/* ============================================================
   index.js  —  welcome overlay transition
   ============================================================ */
(function () {
  var body = document.body;
  var welcomeScreen = document.getElementById('welcomeScreen');
  var enterButton = document.getElementById('welcomeEnter');

  if (!body || !welcomeScreen || !enterButton) return;

  var entered = false;

  function enterPortfolio() {
    if (entered) return;
    entered = true;
    body.classList.add('intro-entering');

    window.setTimeout(function () {
      body.classList.remove('intro-locked', 'intro-entering');
      body.classList.add('intro-complete');
      welcomeScreen.setAttribute('aria-hidden', 'true');
    }, 950);
  }

  enterButton.addEventListener('click', function (event) {
    event.stopPropagation();
    enterPortfolio();
  });

  welcomeScreen.addEventListener('click', enterPortfolio);

  welcomeScreen.addEventListener('keydown', function (event) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      enterPortfolio();
    }
  });
})();