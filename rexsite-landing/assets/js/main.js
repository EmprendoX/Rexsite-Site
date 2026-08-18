/* ============================================================
   RexSite.app — Landing
   Interacciones: header, reveal on scroll, FAQ, barra móvil.
   ============================================================ */
(function () {
  'use strict';

  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Enlace de pago (cámbialo aquí una sola vez) ---------- */
  var CTA_URL = 'https://mpago.la/1YYGPtm';
  document.querySelectorAll('[data-cta]').forEach(function (a) {
    a.setAttribute('href', CTA_URL);
    a.setAttribute('target', '_blank');
    a.setAttribute('rel', 'noopener');
  });

  /* ---------- Header: fondo claro al hacer scroll ---------- */
  var hdr = document.getElementById('hdr');
  var mbar = document.getElementById('mbar');
  var hero = document.querySelector('.hero');

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    hdr.classList.toggle('is-stuck', y > 40);

    // La barra móvil aparece cuando el CTA del hero queda fuera de vista.
    var limit = hero ? hero.offsetHeight * 0.75 : 700;
    mbar.classList.toggle('is-on', y > limit);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      onScroll();
      ticking = false;
    });
  }, { passive: true });
  onScroll();

  /* ---------- Reveal on scroll ---------- */
  var items = document.querySelectorAll('.rv');
  if (reduce || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          io.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- FAQ: solo una respuesta abierta a la vez ---------- */
  var qas = document.querySelectorAll('.qa');
  qas.forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      qas.forEach(function (o) { if (o !== d) o.open = false; });
    });
  });

  /* ---------- Parallax suave del visual del hero ---------- */
  var art = document.querySelector('.hero__art img');
  if (art && !reduce && window.matchMedia('(min-width: 980px)').matches) {
    window.addEventListener('scroll', function () {
      var y = window.scrollY || window.pageYOffset;
      if (y > window.innerHeight) return;
      art.style.transform = 'translateY(' + (y * -0.035).toFixed(2) + 'px)';
    }, { passive: true });
  }
})();
