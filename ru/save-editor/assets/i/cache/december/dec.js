
(function () {
  'use strict';

  var SECRET_FLAG = 1226;

  var thisScript = document.currentScript ||
    (function () { var s = document.querySelectorAll('script[src*="december/dec"]'); return s[s.length - 1]; })();
  var srcAttr = thisScript ? thisScript.getAttribute('src') : 'assets/i/cache/december/dec.js';
  var BASE = srcAttr.replace(/dec\.js.*$/, 'm/');
  var OGG = BASE.replace(/december\/m\/$/, 'snd/') + 'findher.ogg';
  function url(u) { return BASE + u; }
  function img(u) { var im = new Image(); im.src = url(u); return im; }

  var PAGES = [
    '* Вы использовали автомат./',
    '* ..^2.Вышла капсула./',
    '* Внутри что-то твёрдое^1, похожее на застывшую смолу./',
    '* Это маленький тёмный треугольник./',
    '* Вы попробовали его взять.../',
    '* Но^2 он высклользнул из руки.../',
    '* Вы нигде его не видите./%'
  ];
  var FINAL = '* Вы нигде не видите^1^1^1^1^1^1^1^1^1^1^1\n\nсвоей руки.';
  var PAUSE = { '1': 5, '2': 10, '3': 15, '4': 20, '5': 30, '6': 40, '7': 60, '8': 90, '9': 150 };
  var CHARLINE = 33;


  var AC = null;
  function ac() { if (!AC) { var C = window.AudioContext || window.webkitAudioContext; if (C) try { AC = new C(); } catch (e) {} } if (AC && AC.state === 'suspended') try { AC.resume(); } catch (e) {} return AC; }
  var blipBuf = null;
  (function () { var c = ac(); if (!c) return;
    fetch(url('snd_text.wav')).then(function (r) { return r.arrayBuffer(); })
      .then(function (b) { return new Promise(function (res, rej) { c.decodeAudioData(b, res, rej); }); })
      .then(function (buf) { blipBuf = buf; }).catch(function () {}); })();
  function blip() { var c = ac(); if (!c || !blipBuf) return; try { var s = c.createBufferSource(); s.buffer = blipBuf; var g = c.createGain(); g.gain.value = 0.45; s.connect(g); g.connect(c.destination); s.start(0); } catch (e) {} }
  var music = null, musicOn = false;
  function startMusic() {
    try { ac(); } catch (e) {}
    if (musicOn && music) return;
    try {
      if (!music) { music = new Audio(OGG); music.loop = true; music.volume = 0; }
      var pr = music.play();
      var onOk = function () { musicOn = true; var t0 = performance.now();
        var ramp = function (now) { var k = Math.min(1, (now - t0) / 1000); if (music) music.volume = 0.7 * k; if (k < 1 && music) requestAnimationFrame(ramp); };
        requestAnimationFrame(ramp); };
      if (pr && pr.then) pr.then(onOk).catch(function () { musicOn = false; });
      else onOk();
    } catch (e) {}
  }
  function fadeMusic(ticks) { if (!music) return; var v0 = music.volume, i = 0; var iv = setInterval(function () { i++; if (music) music.volume = Math.max(0, v0 * (1 - i / ticks)); if (i >= ticks) clearInterval(iv); }, 1000 / 30); }
  function stopMusic() { if (music) { try { music.pause(); } catch (e) {} music = null; } musicOn = false; }

  function play(host, onExit) {
    try { if (document.fonts && document.fonts.load) document.fonts.load('24px "8bitOperatorJVE"').catch(function () {}); } catch (e) {}
    var cv = document.createElement('canvas');
    cv.width = 640; cv.height = 480; cv.style.imageRendering = 'pixelated';
    host.appendChild(cv);
    var ctx = cv.getContext('2d'); ctx.imageSmoothingEnabled = false;

    var ROOMDATA = window.__DEC || { width: 4080, height: 4080, layers: [], meta: { solids: [] } };
    var tileLayers = (ROOMDATA.layers || []).filter(function (l) { return l.type === 'tile'; });
    var solids = (ROOMDATA.meta && ROOMDATA.meta.solids) || [];


    var tileset = img('tileset.png');
    var pattern = img('pattern.png');
    var gacha = img('gacha.png');
    var corner = []; for (var i = 0; i < 8; i++) corner.push(img('tbox_corner_' + i + '.png'));
    var railTop = img('tbox_top.png'), railLeft = img('tbox_left.png');
    var K = { 0: [], 1: [], 2: [], 3: [] };
    var DIR = { 0: 'down', 1: 'right', 2: 'up', 3: 'left' };
    Object.keys(DIR).forEach(function (d) { for (var f = 0; f < 4; f++) K[d].push(img('kris-' + DIR[d] + '-' + f + '.png')); });


    var ROOM_L = 640, ROOM_W = 2560, ROOM_T = 480, ROOM_H = 2880;
    var VW = 640, VH = 480, SCALE = 2;
    var KW = 19, KH = 38;
    var MACH = { x: 2220, y: 2286, w: 40, h: 57 };

    var sp = (ROOMDATA.meta && ROOMDATA.meta.spawn) || { x: 1460, y: 1138 };
    var kris = { x: sp.x, y: sp.y, face: 2, frame: 0, walktimer: 0, moving: false, runtimer: 0 };


    var keys = {};
    function tok(e) {
      var c = e.code;
      if (c === 'ArrowLeft' || c === 'KeyA') return 'L';
      if (c === 'ArrowRight' || c === 'KeyD') return 'R';
      if (c === 'ArrowUp' || c === 'KeyW') return 'U';
      if (c === 'ArrowDown' || c === 'KeyS') return 'D';
      if (c === 'KeyZ' || c === 'Enter' || c === 'KeyE') return 'OK';
      if (c === 'ShiftLeft' || c === 'ShiftRight' || c === 'KeyX') return 'RUN';
      var k = (e.key || '').toLowerCase();
      if (k === 'arrowleft' || k === 'a' || k === 'ф') return 'L';
      if (k === 'arrowright' || k === 'd' || k === 'в') return 'R';
      if (k === 'arrowup' || k === 'w' || k === 'ц') return 'U';
      if (k === 'arrowdown' || k === 's' || k === 'ы') return 'D';
      if (k === 'enter' || k === 'z' || k === 'я' || k === 'e' || k === 'у') return 'OK';
      if (k === 'shift' || k === 'x' || k === 'ч') return 'RUN';
      return null;
    }
    function kd(e) { startMusic(); var t = tok(e); if (!t) return; if (['L', 'R', 'U', 'D', 'OK'].indexOf(t) >= 0) e.preventDefault(); if (!keys[t]) { keys[t] = true; if (t === 'OK') onConfirm(); } }
    function ku(e) { var t = tok(e); if (t) keys[t] = false; }
    function gestureKick() { startMusic(); }
    window.addEventListener('keydown', kd);
    window.addEventListener('keyup', ku);
    window.addEventListener('pointerdown', gestureKick);


    var dlg = null;
    function parsePage(raw) {
      var ev = [], i = 0;
      while (i < raw.length) {
        var ch = raw[i];
        if (ch === '^' && PAUSE[raw[i + 1]]) { ev.push({ p: PAUSE[raw[i + 1]] }); i += 2; continue; }
        if (ch === '/') break;
        if (ch === '\\') { i += 2; continue; }
        ev.push({ c: ch }); i++;
      }
      return ev;
    }
    function startSeq() { dlg = { pi: 0, ev: null, out: '', evi: 0, pause: 0, rate: 1, ratec: 0, halt: false, sound: true, finalPhase: false, siner: 0, endTimer: 0 }; loadPage(PAGES[0]); }
    function loadPage(raw) { dlg.ev = parsePage(raw); dlg.evi = 0; dlg.pause = 0; dlg.ratec = 0; dlg.out = ''; dlg.halt = false; dlg.siner = 0; dlg.endTimer = 0; }
    function tickDialogue() {
      dlg.siner++;
      if (dlg.evi >= dlg.ev.length) { dlg.halt = true; if (dlg.finalPhase) { dlg.endTimer++; if (dlg.endTimer >= 30) state = 'fadeout'; } return; }
      if (dlg.pause > 0) { dlg.pause--; return; }
      dlg.ratec++; if (dlg.ratec < dlg.rate) return; dlg.ratec = 0;
      var e = dlg.ev[dlg.evi++];
      if (e.p !== undefined) { dlg.pause = e.p; return; }
      dlg.out += e.c;
      if (dlg.sound && ' ^!.?,:/\\|*\n'.indexOf(e.c) < 0) blip();
      if (dlg.evi >= dlg.ev.length) dlg.halt = true;
    }
    function advance() {
      if (!dlg.halt) { while (dlg.evi < dlg.ev.length) { var e = dlg.ev[dlg.evi++]; if (e.c !== undefined) dlg.out += e.c; } dlg.halt = true; return; }
      if (dlg.finalPhase) return;
      if (dlg.siner <= 0) return;
      dlg.pi++;
      if (dlg.pi < PAGES.length) loadPage(PAGES[dlg.pi]);
      else { fadeMusic(10); dlg.finalPhase = true; dlg.rate = 4; dlg.sound = false; loadPage(FINAL); }
    }


    function onConfirm() {
      if (state === 'dialogue') { advance(); return; }
      if (state !== 'walk') return;
      var b = feetBox(kris.x, kris.y);
      var R = 28, M = 10;
      var rx0 = b.x0 - M, ry0 = b.y0 - M, rx1 = b.x1 + M, ry1 = b.y1 + M;
      if (kris.face === 0) ry1 += R; else if (kris.face === 2) ry0 -= R;
      else if (kris.face === 1) rx1 += R; else rx0 -= R;
      for (var i = 0; i < solids.length; i++) {
        var s = solids[i];
        if (rx0 < s.x + s.w && rx1 > s.x && ry0 < s.y + s.h && ry1 > s.y) {
          state = 'dialogue'; kris.moving = false; kris.frame = 0; startSeq(); return;
        }
      }
    }

    var state = 'fadein', fade = 1, finished = false, fadeStep = 0, jewel = 0;


    function feetBox(x, y) { return { x0: x + 8, y0: y + KH * SCALE - 22, x1: x + KW * SCALE - 8, y1: y + KH * SCALE }; }
    function hits(x, y) {
      var b = feetBox(x, y);
      for (var i = 0; i < solids.length; i++) { var s = solids[i]; if (b.x0 < s.x + s.w && b.x1 > s.x && b.y0 < s.y + s.h && b.y1 > s.y) return true; }
      return false;
    }
    function stepWalk() {
      var sp2 = 4;
      if (keys.RUN) { kris.runtimer++; sp2 = 6; if (kris.runtimer > 10) sp2 = 8; if (kris.runtimer > 60) sp2 = 9; } else kris.runtimer = 0;
      var dx = 0, dy = 0;
      if (keys.L) { dx -= sp2; kris.face = 3; } else if (keys.R) { dx += sp2; kris.face = 1; }
      if (keys.U) { dy -= sp2; kris.face = 2; } else if (keys.D) { dy += sp2; kris.face = 0; }
      kris.moving = (dx !== 0 || dy !== 0);
      if (dx && !hits(kris.x + dx, kris.y)) kris.x += dx;
      if (dy && !hits(kris.x, kris.y + dy)) kris.y += dy;
      if (kris.x > ROOM_L + ROOM_W) kris.x -= ROOM_W; if (kris.x < ROOM_L) kris.x += ROOM_W;
      if (kris.y > ROOM_T + ROOM_H) kris.y -= ROOM_H; if (kris.y < ROOM_T) kris.y += ROOM_H;
      if (kris.moving) { kris.walktimer += keys.RUN ? 3 : 1.5; if (kris.walktimer >= 40) kris.walktimer -= 40; kris.frame = kris.walktimer < 10 ? 0 : kris.walktimer < 20 ? 1 : kris.walktimer < 30 ? 2 : 3; }
      else { kris.walktimer = 0; kris.frame = 0; }
    }

    function step() {
      if (state === 'fadein') { fade -= 1 / 60; if (fade <= 0) { fade = 0; state = 'walk'; } }
      else if (state === 'walk') stepWalk();
      else if (state === 'dialogue') tickDialogue();
      else if (state === 'fadeout') { fadeStep++; fade = Math.min(1, fadeStep / 25); if (fadeStep >= 45 && !finished) { finished = true; stopMusic(); cleanup(); if (onExit) onExit(); } }
    }

    function cam() { return { x: Math.round(kris.x + (KW * SCALE) / 2 - VW / 2), y: Math.round(kris.y + (KH * SCALE) / 2 - VH / 2) }; }

    function drawTiles(layer, c) {
      if (!tileset.complete || !tileset.naturalWidth) return;
      var T = layer.tile, cols = layer.columns, st = layer.stride, bd = layer.border, W = layer.w, H = layer.h, data = layer.data;
      var x0 = Math.floor(c.x / T), x1 = Math.floor((c.x + VW) / T);
      var y0 = Math.floor(c.y / T), y1 = Math.floor((c.y + VH) / T);
      for (var cy = y0; cy <= y1; cy++) {
        if (cy < 0 || cy >= H) continue;
        for (var cx = x0; cx <= x1; cx++) {
          if (cx < 0 || cx >= W) continue;
          var raw = data[cy * W + cx]; if (!raw) continue;
          var idx = raw & 0x7FFFF; if (!idx) continue;
          var col = idx % cols, row = Math.floor(idx / cols);
          ctx.drawImage(tileset, col * st + bd, row * st + bd, T, T, cx * T - c.x, cy * T - c.y, T, T);
        }
      }
    }

    function draw() {
      var c = cam();
      jewel++;
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = '#000'; ctx.fillRect(0, 0, VW, VH);

      if (pattern.complete && pattern.naturalWidth) {
        ctx.save(); ctx.globalAlpha = 0.25;
        var pw = pattern.width * SCALE, ph = pattern.height * SCALE, ystep = ROOM_H / 21;
        var bx = ((c.x / 2) % pw + pw) % pw, by = ((c.y / 2) % ystep + ystep) % ystep;
        for (var yy = -by; yy < VH + ystep; yy += ystep) for (var xx = -bx; xx < VW + pw; xx += pw) ctx.drawImage(pattern, Math.round(xx), Math.round(yy), pw, ph);
        ctx.restore();
      }

      for (var li = 0; li < tileLayers.length; li++) drawTiles(tileLayers[li], c);

      drawWrapped(gacha, MACH.x, MACH.y, MACH.w * SCALE, MACH.h * SCALE, c);
      var kf = K[kris.face][kris.moving ? kris.frame : 0];
      if (kf && kf.complete) ctx.drawImage(kf, Math.round(kris.x - c.x), Math.round(kris.y - c.y), KW * SCALE, KH * SCALE);

      ctx.save(); ctx.globalAlpha = 0.5;
      ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = 'rgb(11,11,59)'; ctx.fillRect(0, 0, VW, VH);
      ctx.globalCompositeOperation = 'lighten'; ctx.fillStyle = 'rgb(11,11,59)'; ctx.fillRect(0, 0, VW, VH);
      ctx.restore(); ctx.globalCompositeOperation = 'source-over';

      if (state === 'dialogue' && dlg) drawBox();
      if (fade > 0) { ctx.save(); ctx.globalAlpha = fade; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, VW, VH); ctx.restore(); }
    }

    function drawWrapped(im, wx, wy, dw, dh, c) {
      if (!im.complete || !im.naturalWidth) return;
      for (var ox = -ROOM_W; ox <= ROOM_W; ox += ROOM_W) for (var oy = -ROOM_H; oy <= ROOM_H; oy += ROOM_H) {
        var sx = Math.round(wx + ox - c.x), sy = Math.round(wy + oy - c.y);
        if (sx > VW || sy > VH || sx + dw < 0 || sy + dh < 0) continue;
        ctx.drawImage(im, sx, sy, dw, dh);
      }
    }

    function layout(text, maxW) {
      var lines = [];
      text.split('\n').forEach(function (seg) {
        if (seg === '') { lines.push(''); return; }
        var words = seg.split(' '), line = '';
        for (var w = 0; w < words.length; w++) { var t = line === '' ? words[w] : line + ' ' + words[w]; if (ctx.measureText(t).width > maxW && line !== '') { lines.push(line); line = words[w]; } else line = t; }
        if (line !== '') lines.push(line);
      });
      return lines;
    }
    function drawBox() {

      var x0 = 24, y0 = 312, x1 = 616, y1 = 478;

      ctx.fillStyle = '#000';
      ctx.fillRect(x0 + 20, y0 + 20, (x1 - 20) - (x0 + 20) + 1, (y1 - 20) - (y0 + 20) + 1);

      var tw = (x1 - x0) - 63; if (tw < 0) tw = 0;
      var th = (y1 - y0) - 63; if (th < 0) th = 0;
      if (tw > 0 && railTop.complete) {
        ctx.drawImage(railTop, x0 + 32, y0, tw, 32);
        ctx.save(); ctx.translate(x0 + 32, y1 + 1); ctx.scale(1, -1); ctx.drawImage(railTop, 0, 0, tw, 32); ctx.restore();
      }
      if (th > 0 && railLeft.complete) {
        ctx.drawImage(railLeft, x0, y0 + 32, 32, th);
        ctx.save(); ctx.translate(x1 + 1, y0 + 32); ctx.scale(-1, 1); ctx.drawImage(railLeft, 0, 0, 32, th); ctx.restore();
      }
      var cs = corner[Math.floor(jewel / 10) % 8];
      if (cs && cs.complete) {
        drawCorner(cs, x0, y0, 1, 1); drawCorner(cs, x1 + 1, y0, -1, 1);
        drawCorner(cs, x0, y1 + 1, 1, -1); drawCorner(cs, x1 + 1, y1 + 1, -1, -1);
      }

      var ox = 58, oy = 340, vspace = 36, indent = 32;
      ctx.fillStyle = '#fff'; ctx.textBaseline = 'top';
      ctx.font = '24px "8bitOperatorJVE", "8bitOperatorPlus-Bold", monospace';
      var maxW = (x1 - 20) - (ox + indent);
      var lines = layout(dlg.out, maxW);
      for (var li = 0; li < lines.length; li++) { ctx.fillText(lines[li], ox + (li > 0 ? indent : 0), oy + li * vspace); }
    }
    function drawCorner(im, x, y, sx, sy) { ctx.save(); ctx.translate(x, y); ctx.scale(sx * 2, sy * 2); ctx.drawImage(im, 0, 0, 16, 16); ctx.restore(); }

    var STEP = 1000 / 30, acc = 0, last = performance.now(), raf, started = false;
    function loop(now) {
      if (!started) { started = true; startMusic(); }
      acc += now - last; last = now; var g = 0;
      while (acc >= STEP && g < 5) { step(); acc -= STEP; g++; }
      draw();
      if (!finished) raf = requestAnimationFrame(loop);
    }
    function cleanup() { cancelAnimationFrame(raf); window.removeEventListener('keydown', kd); window.removeEventListener('keyup', ku); window.removeEventListener('pointerdown', gestureKick); }
    raf = requestAnimationFrame(loop);
    return { stop: function () { stopMusic(); cleanup(); }, dbg: function () { return { x: kris.x, y: kris.y, face: kris.face, state: state, mx: MACH.x + (MACH.w * SCALE) / 2, mfeet: MACH.y + MACH.h * SCALE }; } };
  }

  window.__DZ = { play: play, FLAG: SECRET_FLAG };
})();
