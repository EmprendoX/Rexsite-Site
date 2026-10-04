/* ============================================================
   RexSite — De dónde llega cada visita (para la campaña)
   Si la página se abre desde un anuncio (utm_*, fbclid, gclid), lo
   guarda 30 días en este navegador. El formulario de empezar.html
   lo manda junto con el registro, para saber qué anuncio funcionó.
   No guarda nada personal; si el navegador no deja guardar, no pasa nada.
   ============================================================ */
(function () {
  'use strict';

  var CLAVE = 'rexsite_rastreo';
  var DIAS = 30;
  var NOMBRES = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'fbclid', 'gclid'];

  function deLaDireccion() {
    var datos = {};
    var hay = false;
    try {
      var params = new URLSearchParams(window.location.search);
      NOMBRES.forEach(function (n) {
        var v = params.get(n);
        if (v) { datos[n] = v.slice(0, 300); hay = true; }
      });
    } catch (e) { /* navegador muy viejo: sin rastreo */ }
    if (hay) datos.pagina = window.location.pathname.slice(0, 300);
    return hay ? datos : null;
  }

  // Una visita que llega de un anuncio reemplaza lo guardado antes.
  var nuevo = deLaDireccion();
  if (nuevo) {
    try {
      window.localStorage.setItem(CLAVE, JSON.stringify({ t: Date.now(), datos: nuevo }));
    } catch (e) { /* sin almacenamiento: se usa solo lo de la dirección */ }
  }

  /** Lo que haya: lo de esta dirección o lo guardado hace menos de 30 días. */
  window.rexsiteRastreo = function () {
    if (nuevo) return nuevo;
    try {
      var guardado = JSON.parse(window.localStorage.getItem(CLAVE) || 'null');
      if (guardado && guardado.datos && Date.now() - guardado.t < DIAS * 864e5) return guardado.datos;
    } catch (e) { /* nada guardado o no se puede leer */ }
    return {};
  };
})();
