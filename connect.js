(function () {
  var form = document.getElementById('contactForm');
  var success = document.getElementById('formSuccess');
  var status = document.getElementById('formStatus');
  var submit = document.getElementById('formSubmit');
  var submitLabel = submit ? submit.querySelector('[data-submit-label]') : null;

  if (window.lucide && typeof window.lucide.createIcons === 'function') {
    window.lucide.createIcons();
  }

  if (!form || !success || !status || !submit || !submitLabel) return;

  var endpoint = (form.getAttribute('data-form-endpoint') || '').trim();
  var isConfigured = endpoint !== '' && endpoint.indexOf('your-form-id') === -1;

  function setStatus(message, tone) {
    status.hidden = false;
    status.textContent = message;
    status.setAttribute('data-tone', tone);
  }

  function clearStatus() {
    status.hidden = true;
    status.textContent = '';
    status.removeAttribute('data-tone');
  }

  if (!isConfigured) {
    setStatus('Form is not connected yet. Add your Formspree endpoint to connect.html to enable email delivery.', 'info');
  }

  form.addEventListener('submit', function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    if (!isConfigured) {
      setStatus('This form cannot send yet because no endpoint is configured. Update the data-form-endpoint value in connect.html.', 'error');
      return;
    }

    submit.disabled = true;
    submitLabel.textContent = 'Sending...';
    setStatus('Sending your message...', 'info');

    var payload = new FormData(form);
    if (!payload.get('subject')) {
      payload.set('subject', 'Portfolio contact form');
    }

    fetch(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/json'
      },
      body: payload
    })
      .then(function (response) {
        if (response.ok) return response;

        return response.json()
          .then(function (data) {
            var message = 'Something went wrong while sending your message.';

            if (data && Array.isArray(data.errors) && data.errors.length > 0) {
              message = data.errors.map(function (entry) {
                return entry.message;
              }).join(' ');
            }

            throw new Error(message);
          })
          .catch(function () {
            throw new Error('Something went wrong while sending your message.');
          });
      })
      .then(function () {
        clearStatus();
        form.hidden = true;
        success.classList.add('visible');
        form.reset();
      })
      .catch(function (error) {
        setStatus(error.message, 'error');
      })
      .finally(function () {
        submit.disabled = false;
        submitLabel.textContent = 'Send Message';
      });
  });
})();