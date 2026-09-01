/* Harvard x Oxford Hackathon — shared behaviour.
   Everything here is progressive enhancement: with JavaScript off the
   navigation stays visible and every section is readable in full. */

(function () {
  'use strict';

  /* Tell the stylesheet the menu button now works. Without this class the
     navigation stays open in the header, so the page is usable with JS off. */
  document.documentElement.classList.add('js-nav');

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- mobile menu ------------------------------------------------ */
  var btn = document.querySelector('.menu-btn');
  var nav = document.getElementById('mainnav');

  if (btn && nav) {
    var close = function (returnFocus) {
      nav.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      if (returnFocus) btn.focus();
    };

    btn.addEventListener('click', function () {
      if (btn.getAttribute('aria-expanded') === 'true') {
        close(false);
      } else {
        nav.classList.add('open');
        btn.setAttribute('aria-expanded', 'true');
        var first = nav.querySelector('a');
        if (first) first.focus();
      }
    });

    /* a link inside the menu jumps down the page — shut the menu after it */
    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) close(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') close(true);
    });

    document.addEventListener('click', function (e) {
      if (btn.getAttribute('aria-expanded') !== 'true') return;
      if (!nav.contains(e.target) && !btn.contains(e.target)) close(false);
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) close(false);
    });
  }


  /* ---- Google Forms submission ------------------------------------
     The forms post straight to Google. With JavaScript off that still works:
     the browser posts and Google shows its own confirmation page. With
     JavaScript on we post into a hidden iframe instead and swap in an
     on-page thank-you, so nobody leaves the site. */
  var forms = document.querySelectorAll('form[data-thanks]');

  Array.prototype.forEach.call(forms, function (form) {
    var thanks = document.getElementById(form.getAttribute('data-thanks'));
    if (!thanks) return;

    /* checkbox groups where at least one box must be ticked. The browser
       cannot express "one of these" on its own. */
    var groups = form.querySelectorAll('fieldset[data-group-required]');

    var showGroupError = function (message) {
      var box = form.querySelector('.form-error');
      if (!box) {
        box = document.createElement('p');
        box.className = 'form-error';
        box.setAttribute('role', 'alert');
        form.insertBefore(box, form.firstChild);
      }
      box.textContent = message;
      box.scrollIntoView({ block: 'center' });
    };

    var sink = document.createElement('iframe');
    sink.name = 'gform-sink-' + form.id;
    sink.title = 'Form submission target';
    sink.setAttribute('aria-hidden', 'true');
    sink.hidden = true;
    sink.style.display = 'none';
    document.body.appendChild(sink);
    form.target = sink.name;

    var submitted = false;

    form.addEventListener('submit', function (e) {
      for (var i = 0; i < groups.length; i++) {
        var boxes = groups[i].querySelectorAll('input[type=checkbox]');
        var any = false;
        for (var k = 0; k < boxes.length; k++) { if (boxes[k].checked) any = true; }
        if (!any) {
          e.preventDefault();
          showGroupError(groups[i].getAttribute('data-group-required'));
          return;
        }
      }
      submitted = true;
      var btn = form.querySelector('button[type=submit]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
    });

    /* the iframe loads once on insertion, then again when Google answers */
    sink.addEventListener('load', function () {
      if (!submitted) return;
      form.hidden = true;
      thanks.hidden = false;
      thanks.setAttribute('tabindex', '-1');
      thanks.focus();
      thanks.scrollIntoView({ block: 'center' });
    });
  });

  /* ---- scroll reveal ---------------------------------------------- */
  /* Only hide anything once we know this script has run and can show it again. */
  document.documentElement.classList.add('js');

  var items = document.querySelectorAll('.rv');

  if (reduce || !('IntersectionObserver' in window)) {
    Array.prototype.forEach.call(items, function (el) { el.classList.add('in'); });
    return;
  }

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0 });

  Array.prototype.forEach.call(items, function (el) { io.observe(el); });
}());
