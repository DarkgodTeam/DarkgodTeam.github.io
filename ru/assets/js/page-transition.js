(function () {
  if (!document.getElementById('mobile-site-nav-css')) {
    var mobileNavCss = document.createElement('link');
    mobileNavCss.id = 'mobile-site-nav-css';
    mobileNavCss.rel = 'stylesheet';
    mobileNavCss.href = '/assets/css/mobile-site-nav.css?v=20260715-1';
    document.head.appendChild(mobileNavCss);
  }

  var de = document.documentElement;
  var FADE = 450;
  var GIF_HISTORY_KEY = 'pt-gif-history-v1';
  var GIF_HISTORY_SIZE = 5;
  var BLOCKED_GIFS = {
    '04-spamton-1-n-5D5Qn7h03FrD2KiY.gif': true,
    '04-spamton-1-n-5D5Qn7h03FrD2KiY-8eee18.gif': true,
    '06-spamton-3-n-LbXtgvThkyV7r1SU.gif': true,
    '06-spamton-3-n-LbXtgvThkyV7r1SU-6ea9d1.gif': true,
    '25-mettaton-1-n-nfH9RCzvDWQURU2R.gif': true,
    '25-mettaton-1-n-nfH9RCzvDWQURU2R-bb9415.gif': true,
    '31-queen-1-n-qWNP1ZH6tD6QbRQN.gif': true,
    '31-queen-1-n-qWNP1ZH6tD6QbRQN-61114e.gif': true
  };


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

  function gifName(src) {
    return String(src || '').split(/[\\/]/).pop();
  }

  function readGifHistory() {
    try {
      var value = JSON.parse(sessionStorage.getItem(GIF_HISTORY_KEY) || '[]');
      if (!Array.isArray(value)) return [];
      var clean = [];
      for (var i = 0; i < value.length; i++) {
        var name = gifName(value[i]);
        if (name && clean.indexOf(name) === -1) clean.push(name);
      }
      return clean.slice(-GIF_HISTORY_SIZE);
    } catch (_) {
      return [];
    }
  }

  function rememberGif(name, history) {
    var next = history.slice();
    var oldIndex = next.indexOf(name);
    if (oldIndex !== -1) next.splice(oldIndex, 1);
    next.push(name);
    next = next.slice(-GIF_HISTORY_SIZE);
    try { sessionStorage.setItem(GIF_HISTORY_KEY, JSON.stringify(next)); } catch (_) {}
  }

  function injectGif() {
    if (document.getElementById('pt-gif')) return;
    var list = window.__PTGIFS;
    if (!list || !list.length) return;
    var allowed = [];
    for (var i = 0; i < list.length; i++) {
      var name = String(list[i]).split('/').pop();
      if (!BLOCKED_GIFS[name]) allowed.push(list[i]);
    }
    if (!allowed.length) return;
    var history = readGifHistory();
    var choices = [];
    for (var j = 0; j < allowed.length; j++) {
      if (history.indexOf(gifName(allowed[j])) === -1) choices.push(allowed[j]);
    }
    if (!choices.length) {
      history = [];
      choices = allowed.slice();
    }
    var pick = choices[(Math.random() * choices.length) | 0];
    rememberGif(gifName(pick), history);
    var img = document.createElement('img');
    img.id = 'pt-gif';
    img.alt = '';
    img.setAttribute('aria-hidden', 'true');
    img.src = base + pick;
    de.appendChild(img);
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
  if (document.readyState === 'complete') scheduleHide();
  else window.addEventListener('load', function () { scheduleHide(); });

  function scheduleHide() {
    var p = window.__ptPreload;
    if (p && p.then) {
      var done = false;
      var go = function () { if (!done) { done = true; hide(); } };
      p.then(go);
      setTimeout(go, 6000);
    } else {
      setTimeout(hide, 1000);
    }
  }

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
