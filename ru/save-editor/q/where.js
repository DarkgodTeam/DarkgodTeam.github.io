(function () {
  'use strict';
  var pw = document.getElementById('pw');
  var body = document.body;
  var fade = document.getElementById('fade');
  var EDITOR = '../index.html';


  try {
    if (!sessionStorage.getItem('kn-where')) { location.replace(EDITOR); return; }
    sessionStorage.removeItem('kn-where');
  } catch (e) { location.replace(EDITOR); return; }


  var EXPECT = 'e53fd1e1d0a242343eda30537982ba8d110977ec04c2b8c3e3d21153b23918ee';

  var SALT = String.fromCharCode(116, 114, 105, 95);

  var busy = false;

  function toHex(buf) {
    var b = new Uint8Array(buf), s = '';
    for (var i = 0; i < b.length; i++) s += b[i].toString(16).padStart(2, '0');
    return s;
  }
  function digest(text) {
    var data = new TextEncoder().encode(text);
    if (window.crypto && crypto.subtle && crypto.subtle.digest) {
      return crypto.subtle.digest('SHA-256', data).then(toHex);
    }
    return Promise.resolve('');
  }

  function wrong() {
    pw.value = '';
    body.classList.remove('shake'); void body.offsetWidth; body.classList.add('shake');

    var done = function () { window.location.href = EDITOR; };
    if (window.KnightTransition && KnightTransition.play) {
      var p = KnightTransition.play();
      if (p && p.then) { p.then(done); setTimeout(done, 6000); }
      else setTimeout(done, 3000);
    } else {
      setTimeout(done, 600);
    }
  }

  function right() {
    pw.blur();
    document.getElementById('wrap').style.display = 'none';
    fade.classList.add('on');
    setTimeout(function () {
      var host = document.getElementById('scene');
      host.style.display = 'block';
      if (window.__DZ && __DZ.play) {
        __DZ.play(host, function () {

          window.location.href = EDITOR;
        });

        setTimeout(function () { fade.classList.remove('on'); }, 60);
      } else {
        window.location.href = EDITOR;
      }
    }, 380);
  }

  function submit() {
    if (busy) return;
    var v = (pw.value || '').trim();
    if (!v) return;
    busy = true;
    digest(SALT + v + (window.__seed || '')).then(function (h) {
      busy = false;
      if (h && h === EXPECT) right(); else wrong();
    }).catch(function () { busy = false; wrong(); });
  }

  pw.addEventListener('input', function () {
    var d = (pw.value || '').replace(/\D/g, '').slice(0, 4);
    if (pw.value !== d) pw.value = d;
    if (d.length === 4) submit();
  });
  pw.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { e.preventDefault(); submit(); }
  });
  setTimeout(function () { try { pw.focus(); } catch (e) {} }, 100);
})();
