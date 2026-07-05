
(function () {
  'use strict';
  var GH = 480, FY = 88, BCY = 145, OFFD = 120;
  var KSCALE = 2, KOX = 60, KOY = 68;
  var KTOP = -86;

  var thisScript = document.currentScript ||
    (function () { var s = document.querySelectorAll('script[src*="knight-transition"]'); return s[s.length - 1]; })();
  var srcAttr = thisScript ? thisScript.getAttribute('src') : 'assets/js/knight-transition.js';
  var BASE = srcAttr.replace(/js\/knight-transition\.js.*$/, 'images/knight-slash/');
  var SRC = { flow: BASE + 'flow.png', grate: BASE + 'grate.png', glow: BASE + 'slash-glow.png', core: BASE + 'slash-core.png', cut: BASE + 'knight-cut.wav' };
  var KN = []; for (var i = 0; i < 6; i++) KN.push(BASE + 'knight-slash-' + i + '.png');

  function loadImg(u) { return new Promise(function (res) { var im = new Image(); im.onload = function () { res(im); }; im.onerror = function () { res(null); }; im.src = u; }); }
  function mk(w, h) { var c = document.createElement('canvas'); c.width = w; c.height = h; return c; }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp01(t) { return t < 0 ? 0 : t > 1 ? 1 : t; }
  function easeOutSine(t) { return Math.sin(t * Math.PI / 2); }
  function easeInSine(t) { return 1 - Math.cos(t * Math.PI / 2); }
  function approach(v, t, a) { if (v < t) { v += a; if (v > t) return t; } else { v -= a; if (v < t) return t; } return v; }
  var ldx = function (l, d) { return l * Math.cos(d * Math.PI / 180); };
  var ldy = function (l, d) { return -l * Math.sin(d * Math.PI / 180); };
  function hsv255(h) {
    h = ((h % 255) + 255) % 255; var hp = (h / 255) * 6, c = 1, x = c * (1 - Math.abs((hp % 2) - 1)), r = 0, g = 0, b = 0;
    if (hp < 1) { r = c; g = x; } else if (hp < 2) { r = x; g = c; } else if (hp < 3) { g = c; b = x; }
    else if (hp < 4) { g = x; b = c; } else if (hp < 5) { r = x; b = c; } else { r = c; b = x; }
    return 'rgb(' + Math.round(r * 255) + ',' + Math.round(g * 255) + ',' + Math.round(b * 255) + ')';
  }
  function tint(img, w, h, css) { var c = mk(w, h), x = c.getContext('2d'); x.drawImage(img, 0, 0, w, h); x.globalCompositeOperation = 'source-in'; x.fillStyle = css; x.fillRect(0, 0, w, h); return c; }

  var CSS = '#kt-overlay{position:fixed;inset:0;z-index:2147483600;overflow:hidden;background:transparent;}' +
    '#kt-overlay canvas{position:absolute;inset:0;width:100%;height:100%;display:block;image-rendering:pixelated;}' +
    '@media (prefers-reduced-motion:reduce){#kt-overlay{display:none!important;}}';
  function injectCSS() { if (document.getElementById('kt-style')) return; var s = document.createElement('style'); s.id = 'kt-style'; s.textContent = CSS; document.head.appendChild(s); }


  var AC = null, cutBuf = null, cutFetch = null;
  function getAC() { if (!AC) { var C = window.AudioContext || window.webkitAudioContext; if (C) { try { AC = new C(); } catch (e) {} } } return AC; }
  function decodeCut() {
    var ac = getAC(); if (!ac || cutBuf || cutFetch) return;
    try {
      cutFetch = fetch(SRC.cut).then(function (r) { return r.arrayBuffer(); })
        .then(function (ab) { return new Promise(function (res, rej) { ac.decodeAudioData(ab, res, rej); }); })
        .then(function (buf) { cutBuf = buf; }).catch(function () {});
    } catch (e) {}
  }
  function ensureAudio() { var ac = getAC(); if (ac && ac.state === 'suspended') { try { ac.resume(); } catch (e) {} } decodeCut(); }
  function unlockAudio() {
    var ac = getAC(); if (!ac) return;
    if (ac.state === 'suspended') { try { ac.resume(); } catch (e) {} }
    decodeCut();
    try { var b = ac.createBuffer(1, 1, 22050), s = ac.createBufferSource(); s.buffer = b; s.connect(ac.destination); s.start(0); } catch (e) {}
  }

  (function () {
    var evs = ['pointerdown', 'mousedown', 'touchstart', 'keydown', 'click', 'wheel'];
    function once() { unlockAudio(); evs.forEach(function (ev) { window.removeEventListener(ev, once, true); }); }
    evs.forEach(function (ev) { window.addEventListener(ev, once, { capture: true, passive: true }); });
  })();
  function playCut(vol) {
    try {
      var ac = getAC();
      if (ac && cutBuf) {
        if (ac.state === 'suspended') ac.resume();
        var s = ac.createBufferSource(); s.buffer = cutBuf; var g = ac.createGain(); g.gain.value = vol; s.connect(g); g.connect(ac.destination); s.start(0); return;
      }
      var a = new Audio(SRC.cut); a.volume = vol; a.play().catch(function () {});
    } catch (e) {}
  }

  var running = false, A = {};
  function play(opts) {
    opts = opts || {};
    if (running) return Promise.resolve();
    try {
      if (!opts.force) {
        if (localStorage.getItem('kt-ch3') !== 'yes') return Promise.resolve();
        if (localStorage.getItem('kt-shown-knight') === '1') return Promise.resolve();
      }
    } catch (e) {}
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches) return Promise.resolve();
    try { localStorage.setItem('kt-shown-knight', '1'); } catch (e) {}
    running = true; injectCSS();
    var soundOn = (thisScript && thisScript.getAttribute('data-sound')) !== 'off';
    if (soundOn) ensureAudio();
    return Promise.all([loadImg(SRC.flow), loadImg(SRC.grate), loadImg(SRC.glow), loadImg(SRC.core),
      loadImg(KN[0]), loadImg(KN[1]), loadImg(KN[2]), loadImg(KN[3]), loadImg(KN[4]), loadImg(KN[5])])
      .then(function (r) { A.flow = r[0]; A.grate = r[1]; A.glow = r[2]; A.core = r[3]; A.kn = [r[4], r[5], r[6], r[7], r[8], r[9]]; return run(soundOn); });
  }

  function run(soundOn) {
    return new Promise(function (resolve) {
      var ov = document.createElement('div'); ov.id = 'kt-overlay'; ov.setAttribute('aria-hidden', 'true');
      var cv = document.createElement('canvas'); ov.appendChild(cv); document.body.appendChild(ov);
      var ctx = cv.getContext('2d');

      var VW = Math.max(1, window.innerWidth), VH = Math.max(1, window.innerHeight);
      var GH, GW;
      if (VW >= VH) { GH = 480; GW = Math.round(480 * VW / VH); }
      else { GW = 480; GH = Math.round(480 * VH / VW); }
      var CX = GW / 2, CY = GH / 2;
      var FX = CX, MIDX = CX, BCX = CX, BCY = CY;
      var OFFD = GH * 0.25;
      var KNTOP = CY - KOY * KSCALE;
      var FLYUP = -(CY + 220);
      var DPR = Math.min(window.devicePixelRatio || 1, 2);
      function sizeCanvas() { cv.width = Math.round(window.innerWidth * DPR); cv.height = Math.round(window.innerHeight * DPR); }
      sizeCanvas();
      var prevOverflow = document.documentElement.style.overflow; document.documentElement.style.overflow = 'hidden';

      var bg = mk(GW, GH), bgx = bg.getContext('2d');
      var ball = mk(GW, GH), balx = ball.getContext('2d');
      var tin = mk(GW, GH), tinx = tin.getContext('2d');
      var kl = mk(GW, GH), klx = kl.getContext('2d');
      var fx = mk(GW, GH), fxx = fx.getContext('2d');
      var flowPat = A.flow ? bgx.createPattern(A.flow, 'repeat') : null;

      var st = {
        time: 0, intensity: 4, intensify: 3.0, ballDark: 1, ballSpeed: 1, ballCounter: 0,
        hsv: 200, hsvUp: true, knightImg: 0, lineTimer: -1, lineCol: 0, bobble: 0, bobbleAmp: 2
      };
      var HOLD = 12, TELE = 24;
      var phase = 'hold', pf = 0;
      var snap = null;
      var halves = null;
      var gash = null;
      var after = [];
      var knightYoff = 0, knightAlpha = 1, jumpimages = false, flyT = 0;


      function renderBg() {
        balx.globalCompositeOperation = 'source-over'; balx.clearRect(0, 0, GW, GH);
        if (flowPat) {
          var sx = (FX + st.time * 2) % 320, sy = (FY) % 240;
          balx.save(); balx.translate(-((320 - sx) % 320), -((240 - sy) % 240));
          balx.fillStyle = flowPat; balx.fillRect(0, 0, GW + 320, GH + 240);
          balx.globalCompositeOperation = 'lighter';
          for (var k = 0; k < 4; k++) balx.fillRect(0, 0, GW + 320, GH + 240);
          balx.restore();
        }
        balx.globalCompositeOperation = 'multiply';
        for (var a = 0; a < 6; a++) {
          var R = 1800 - ((st.ballCounter + 300 * a) % 1800); if (R < 2) R = 2;
          var g = balx.createRadialGradient(BCX, BCY, 0, BCX, BCY, R);
          g.addColorStop(0, '#fff'); g.addColorStop(1, '#595959');
          balx.fillStyle = g; balx.beginPath(); balx.arc(BCX, BCY, R, 0, 7); balx.fill();
        }
        var gv = balx.createRadialGradient(BCX, BCY, 0, BCX, BCY, 640);
        gv.addColorStop(0, '#fff'); gv.addColorStop(1, '#000');
        balx.fillStyle = gv; balx.beginPath(); balx.arc(BCX, BCY, 640, 0, 7); balx.fill();
        balx.globalCompositeOperation = 'source-over';

        tinx.globalCompositeOperation = 'source-over'; tinx.clearRect(0, 0, GW, GH); tinx.drawImage(ball, 0, 0);
        tinx.globalCompositeOperation = 'multiply'; tinx.fillStyle = hsv255(st.hsv); tinx.fillRect(0, 0, GW, GH);
        tinx.globalCompositeOperation = 'source-over';

        bgx.globalCompositeOperation = 'source-over'; bgx.fillStyle = '#000'; bgx.fillRect(0, 0, GW, GH);
        bgx.globalCompositeOperation = 'lighter'; bgx.globalAlpha = st.ballDark;
        var ystep = GH > 700 ? 2 : 1;
        for (var y = 0; y < GH; y += ystep) {
          var xoff = Math.sin((y + st.time) * 0.1) * 4 * st.intensity + Math.sin((y + st.time) * 0.35) * 0.5 * st.intensity;
          bgx.drawImage(tin, 0, y, GW, ystep, xoff, y, GW, ystep);
        }
        bgx.globalAlpha = 1; bgx.globalCompositeOperation = 'source-over';
        if (A.grate) { bgx.globalAlpha = 0.28; bgx.drawImage(A.grate, 0, 0, 320, 240, 0, 0, GW, GH); bgx.globalAlpha = 1; }
        if (st.lineTimer > -1) renderMarker(bgx);
      }


      function renderMarker(c) {
        var lt = st.lineTimer; if (lt <= 0) return;
        var t16 = Math.min(lt, 16) / 16;
        var r = Math.round(128 + 127 * t16), gb = Math.round(128 - 128 * t16);
        var xscale = lt, yscale = 4 + 8 * (1 - t16);
        var ax = MIDX - ldx(280, -63), ay = (GH * 0.5) - ldy(280, -63);
        var ang = Math.atan2(GH, 2 * OFFD);
        var W = 250 * xscale, Hg = 46 * yscale, Hc = 22 * yscale;
        c.save(); c.globalCompositeOperation = 'lighter'; c.translate(ax, ay); c.rotate(ang);
        if (A.glow) c.drawImage(tint(A.glow, 250, 46, 'rgb(' + r + ',' + gb + ',' + gb + ')'), -W / 2, -Hg / 2, W, Hg);
        var cr = Math.round(154 + 101 * t16), cg = Math.round(154 + 60 * t16);
        if (A.core) c.drawImage(tint(A.core, 250, 46, 'rgb(' + cr + ',' + cg + ',' + cg + ')'), -W / 2, -Hc / 2, W, Hc);
        c.restore();
      }


      function drawKnightScan(c, frame, yoff, alpha) {
        var img = A.kn[Math.max(0, Math.min(5, Math.round(frame)))]; if (!img) return;
        var sw = img.width, sh = img.height;
        var baseX = FX - KOX * KSCALE, top = KNTOP + yoff + (Math.sin(st.bobble * 0.1) * st.bobbleAmp);
        c.save(); c.globalAlpha = alpha;
        if (st.intensify > 1.5) {
          c.globalAlpha = alpha * 0.75;
          for (var a0 = 0; a0 < sh; a0++) {
            var w0 = Math.sin((a0 + st.time * 4) * 0.15) * (st.intensify - 1.5) * 8;
            var s0 = (a0 % 2 === 0) ? w0 : -w0;
            c.drawImage(img, 0, a0, sw, 1, baseX + s0, top + a0 * KSCALE, sw * KSCALE, KSCALE);
          }
          c.globalAlpha = alpha;
        }
        for (var a = 0; a < sh; a++) {
          var w = Math.sin((a + st.time * 4) * 0.2) * st.intensify * 0.3;
          c.drawImage(img, 0, a, sw, 1, baseX + w, top + a * KSCALE, sw * KSCALE, KSCALE);
        }
        c.restore();
      }

      function drawKnightFlat(c, frame, yoff, alpha) {
        var img = A.kn[Math.max(0, Math.min(5, Math.round(frame)))]; if (!img) return;
        var sw = img.width, sh = img.height;
        var baseX = FX - KOX * KSCALE, top = KNTOP + yoff;
        c.save(); c.globalAlpha = alpha;
        c.drawImage(img, baseX, top, sw * KSCALE, sh * KSCALE);
        c.restore();
      }

      function renderKnightLayer() {
        klx.clearRect(0, 0, GW, GH);
        for (var i = 0; i < after.length; i++) { var g = after[i]; drawKnightFlat(klx, g.frame, g.yoff, Math.max(0, g.alpha)); }
        if (knightAlpha > 0) drawKnightScan(klx, st.knightImg, knightYoff, knightAlpha);
      }


      function renderGash() {
        fxx.clearRect(0, 0, GW, GH); if (!gash || gash.alpha <= 0.002) return;
        var reach = GW + GH;
        var hx = ldx(reach, gash.dir), hy = ldy(reach, gash.dir);
        var hxo = ldx(gash.width, gash.dir + 90), hyo = ldy(gash.width, gash.dir + 90);
        var v = Math.round((1 - gash.alpha) * 255);
        fxx.save(); fxx.globalAlpha = Math.min(1, gash.alpha * 2); fxx.fillStyle = 'rgb(255,' + v + ',' + v + ')';

        fxx.beginPath();
        fxx.moveTo(gash.x + hx * gash.alpha, gash.y + hy * gash.alpha);
        fxx.lineTo(gash.x - hx + hxo, gash.y - hy + hyo);
        fxx.lineTo(gash.x - hx - hxo, gash.y - hy - hyo);
        fxx.closePath(); fxx.fill(); fxx.restore();
      }


      function applyCover() {
        ctx.setTransform(cv.width / GW, 0, 0, cv.height / GH, 0, 0);
        ctx.imageSmoothingEnabled = false;
      }


      function tickBgState() {
        st.time++; st.bobble++;
        if (st.hsvUp) { st.hsv++; if (st.hsv >= 288) st.hsvUp = false; } else { st.hsv--; if (st.hsv <= 128) st.hsvUp = true; }
        st.ballCounter += st.ballSpeed; if (st.ballCounter > 1800) st.ballCounter -= 1800;
        st.intensify = approach(st.intensify, 0, 0.1);
      }
      function step() {
        tickBgState();
        if (phase === 'hold') {
          st.knightImg = 0;
          if (pf >= HOLD) { phase = 'tele'; pf = 0; st.lineTimer = 0; } else pf++;
        } else if (phase === 'tele') {
          st.lineTimer++;
          st.knightImg = lerp(0, 2, clamp01(st.lineTimer / 8));
          if (pf >= TELE) { doCut(); phase = 'fly'; pf = 0; } else pf++;
        } else if (phase === 'fly') {
          flyT++;

          st.knightImg = Math.min(5, 2 + flyT * 0.5);

          if (flyT <= 16) knightYoff = lerp(0, 40, easeOutSine(flyT / 16));
          else { var t2 = clamp01((flyT - 16) / 24); knightYoff = lerp(40, FLYUP, easeInSine(t2)); }
          if (jumpimages) after.push({ frame: Math.round(st.knightImg), yoff: knightYoff, alpha: 1 });
          for (var i = after.length - 1; i >= 0; i--) { after[i].alpha -= 0.08; if (after[i].alpha < 0) after.splice(i, 1); }

          var h = halves; h.t++;
          if (h.t <= 12) { var e = easeOutSine(h.t / 12); h.ls = lerp(15, 0.5, e); h.rs = lerp(14, 0.5, e); }
          else { h.ls += 1; h.rs += 1; }
          h.ldx -= h.ls; h.rdx += h.rs;

          if (gash) { if (gash.grace > 0) gash.grace--; else { gash.width *= 0.66; gash.alpha *= 0.66; } if (gash.width < 0.5) gash = null; }

          var clearDist = GW + OFFD + 60;
          if ((-h.ldx > clearDist && h.rdx > clearDist) || flyT > 96) phase = 'done';
        }
      }

      function doCut() {
        snap = mk(GW, GH); snap.getContext('2d').drawImage(bg, 0, 0);
        halves = { ldx: 0, rdx: 0, ls: 15, rs: 14, t: 0 };
        var cgx = MIDX, cgy = GH * 0.5;
        gash = { x: cgx - ldx(-160, 117), y: cgy - ldy(-160, 117), dir: 117, width: 96, alpha: 1, grace: 1 };
        jumpimages = true; flyT = 0; st.knightImg = 2;
        if (soundOn) playCut(0.7);
      }


      function render() {
        ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height);
        if (phase === 'hold' || phase === 'tele') {
          renderBg(); renderKnightLayer();
          applyCover(); ctx.drawImage(bg, 0, 0); ctx.drawImage(kl, 0, 0);
        } else {
          renderKnightLayer(); renderGash();
          applyCover();

          var topL = MIDX - OFFD, botL = MIDX + OFFD;
          ctx.save(); ctx.translate(halves.ldx, 0);
          ctx.beginPath(); ctx.moveTo(0, -2); ctx.lineTo(topL + 1, -2); ctx.lineTo(botL + 1, GH + 2); ctx.lineTo(0, GH + 2); ctx.closePath(); ctx.clip();
          ctx.drawImage(snap, 0, 0); ctx.restore();
          ctx.save(); ctx.translate(halves.rdx, 0);
          ctx.beginPath(); ctx.moveTo(topL - 1, -2); ctx.lineTo(GW, -2); ctx.lineTo(GW, GH + 2); ctx.lineTo(botL - 1, GH + 2); ctx.closePath(); ctx.clip();
          ctx.drawImage(snap, 0, 0); ctx.restore();

          ctx.drawImage(fx, 0, 0); ctx.drawImage(kl, 0, 0);
        }
      }


      var STEP = 1000 / 30, acc = 0, last = performance.now(), raf, finished = false;
      function loop(now) {
        if (phase === 'done') return finish();
        acc += now - last; last = now; var guard = 0;
        while (acc >= STEP && guard < 5) { step(); acc -= STEP; guard++; if (phase === 'done') break; }
        render();
        if (phase === 'done') return finish();
        raf = requestAnimationFrame(loop);
      }
      function onResize() { sizeCanvas(); }
      window.addEventListener('resize', onResize);
      raf = requestAnimationFrame(loop);

      function finish() {
        if (finished) return; finished = true;
        cancelAnimationFrame(raf); window.removeEventListener('resize', onResize);
        ov.style.transition = 'opacity .14s linear'; ov.style.opacity = '0';
        setTimeout(function () { if (ov.parentNode) ov.parentNode.removeChild(ov); document.documentElement.style.overflow = prevOverflow; running = false; resolve(); }, 150);
      }
    });
  }

  function shouldAutoPlay() {
    var mode = (thisScript && thisScript.getAttribute('data-auto')) || 'once';
    try { var q = new URLSearchParams(window.location.search).get('knight'); if (q === '1' || q === 'replay' || q === 'true') return true; } catch (e) {}
    if (mode === 'off') return false; if (mode === 'always') return true;
    var ver = (thisScript && thisScript.getAttribute('data-version')) || '1', KEY = 'kt-seen-version', seen = null;
    try { seen = localStorage.getItem(KEY); } catch (e) {}
    if (seen !== ver) { try { localStorage.setItem(KEY, ver); } catch (e) {} return true; }
    return false;
  }
  window.KnightTransition = { play: play, replay: function (o) { return play(o || {}); } };


  function loadScript(url) {
    return new Promise(function (res) {
      var s = document.createElement('script'); s.src = url;
      s.onload = function () { res(true); }; s.onerror = function () { res(false); };
      document.head.appendChild(s);
    });
  }

  function lsGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  function reducedMotion() { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion:reduce)').matches); }
  function isMainPage() { try { return /\/ru\/(index\.html)?$/.test(window.location.pathname); } catch (e) { return false; } }

  function askCh3(cb) {
    if (document.getElementById('kt-ch3-ask')) return;
    var heart = srcAttr.replace(/js\/knight-transition\.js.*$/, 'images/chapterselect/heart.png');
    var ov = document.createElement('div');
    ov.id = 'kt-ch3-ask';
    ov.setAttribute('style', 'position:fixed;inset:0;z-index:2147483646;display:flex;align-items:center;justify-content:center;background:#000;');
    var box = document.createElement('div');
    box.setAttribute('style', "max-width:600px;margin:20px;padding:30px 28px;background:#000;border:4px solid #fff;border-radius:4px;color:#fff;font-family:'8bitOperatorPlus-Bold','8-bit Operator Plus',monospace;text-align:center;");
    var q = document.createElement('div');
    q.textContent = 'Вы играли или смотрели третью главу?';
    q.setAttribute('style', 'font-size:26px;line-height:1.35;margin-bottom:10px;');
    var sub = document.createElement('div');
    sub.textContent = 'Один из переходов содержит спойлер Главы 3.';
    sub.setAttribute('style', 'font-size:15px;color:#b9b8c4;margin-bottom:28px;');
    var row = document.createElement('div');
    row.setAttribute('style', 'display:flex;gap:54px;justify-content:center;');
    var opts = ['Да', 'Нет'], vals = ['yes', 'no'], items = [], sel = 0;
    opts.forEach(function (label, i) {
      var it = document.createElement('div');
      it.setAttribute('style', 'display:flex;align-items:center;gap:12px;font-size:26px;cursor:pointer;padding:4px 8px;');
      var h = document.createElement('img');
      h.src = heart;
      h.setAttribute('style', 'width:22px;height:22px;image-rendering:pixelated;visibility:hidden;');
      h.onerror = function () { h.style.display = 'none'; };
      var t = document.createElement('span'); t.textContent = label;
      it.appendChild(h); it.appendChild(t);
      it.addEventListener('mouseenter', function () { setSel(i); });
      it.addEventListener('click', function () { choose(); });
      row.appendChild(it); items.push({ el: it, heart: h });
    });
    function setSel(i) {
      sel = i;
      items.forEach(function (it, k) { it.heart.style.visibility = (k === i) ? 'visible' : 'hidden'; it.el.style.opacity = (k === i) ? '1' : '.45'; });
    }
    function choose() {
      document.removeEventListener('keydown', onKey);
      lsSet('kt-ch3', vals[sel]);
      if (ov.parentNode) ov.parentNode.removeChild(ov);
      cb();
    }
    function onKey(e) {
      var k = e.key;
      if (k === 'ArrowLeft' || k === 'ArrowUp' || k === 'a' || k === 'A' || k === 'ф' || k === 'Ф') { e.preventDefault(); setSel((sel + items.length - 1) % items.length); }
      else if (k === 'ArrowRight' || k === 'ArrowDown' || k === 'd' || k === 'D' || k === 'в' || k === 'В') { e.preventDefault(); setSel((sel + 1) % items.length); }
      else if (k === 'Enter' || k === 'z' || k === 'Z' || k === 'я' || k === 'Я' || k === 'e' || k === 'E' || k === 'у' || k === 'У') { e.preventDefault(); choose(); }
    }
    document.addEventListener('keydown', onKey);
    setSel(0);
    box.appendChild(q); box.appendChild(sub); box.appendChild(row);
    ov.appendChild(box);
    document.body.appendChild(ov);
  }

  function chooseAndPlay() {
    if (reducedMotion()) return;
    var knightPending = lsGet('kt-shown-knight') !== '1';


    if (knightPending && lsGet('kt-ch3') === null) { askCh3(afterGate); }
    else { afterGate(); }

    function afterGate() {

      if (!isMainPage()) return;
      var kp = lsGet('kt-shown-knight') !== '1';
      if (kp && lsGet('kt-ch3') === 'yes' && window.KnightTransition && window.KnightTransition.play) window.KnightTransition.play();
    }
  }
  function boot() { if (shouldAutoPlay()) chooseAndPlay(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
