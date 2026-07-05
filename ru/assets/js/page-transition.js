(function () {
  var de = document.documentElement;
  var FADE = 450;


  var base = '';
  try {
    var s = document.currentScript;
    if (!s) {
      var all = document.getElementsByTagName('script');
      for (var i = all.length - 1; i >= 0; i--) {
        if (/page-transition\.js(\?|$)/.test(all[i].src)) { s = all[i]; break; }
      }
    }
    if (s && s.src) base = s.src.replace(/assets\/js\/page-transition\.js(?:\?.*)?$/, '');
  } catch (e) {}

  function injectGif() {
    if (document.getElementById('pt-gif')) return;
    var list = window.__PTGIFS;
    if (!list || !list.length) return;
    var pick = list[(Math.random() * list.length) | 0];
    var img = document.createElement('img');
    img.id = 'pt-gif';
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.src = base + pick;
    (document.body || de).appendChild(img);
  }
  if (document.body) injectGif();
  else document.addEventListener('DOMContentLoaded', injectGif);

  function hide() {
    de.classList.add('pt-loaded');
    if (de.__ptT) clearTimeout(de.__ptT);
    de.__ptT = setTimeout(function () { de.classList.add('pt-gone'); }, FADE + 80);
  }
  function show() {
    de.classList.remove('pt-gone');
    void de.offsetWidth;
    de.classList.remove('pt-loaded');
  }
  if (document.readyState === 'complete') setTimeout(hide, 1000);
  else window.addEventListener('load', function () { setTimeout(hide, 1000); });

  document.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download')) return;
    if (/^(#|mailto:|tel:|javascript:)/i.test(href)) return;
    var url;
    try { url = new URL(a.href, location.href); } catch (_) { return; }
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && (url.hash || url.search === location.search)) return;
    show();
  }, true);

  window.addEventListener('pageshow', function (ev) { if (ev.persisted) hide(); });
  window.addEventListener('pagehide', function () { show(); });
})();
