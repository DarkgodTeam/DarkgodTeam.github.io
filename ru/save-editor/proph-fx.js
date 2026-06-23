(function () {
  'use strict';
  var ROOT = 'game-sprites/flagfx/';
  var cache = {};
  function img(name) {
    if (!name) return null;
    if (!cache[name]) { var im = new Image(); im.src = ROOT + name; cache[name] = im; }
    return cache[name];
  }
  var swirl = img('proph_swirl.png');
  var swirlBright = img('proph_swirl_bright.png');
  var perlin = img('proph_perlin.png');
  var grid = img('proph_grid.png');
  var SET = [];
  for (var s = 0; s < 10; s++) SET.push(img('spr_dw_church_prophecy_set_' + s + '.png'));

  var CYAN = 'rgb(66,208,255)';
  var tintCache = {};
  function tintMul(im, color) {
    if (!im || !im.complete || !im.width) return null;
    var key = im.src + '|' + color;
    if (tintCache[key]) return tintCache[key];
    var c = document.createElement('canvas');
    c.width = im.width; c.height = im.height;
    var g = c.getContext('2d');
    g.drawImage(im, 0, 0);
    g.globalCompositeOperation = 'multiply';
    g.fillStyle = color;
    g.fillRect(0, 0, c.width, c.height);
    g.globalCompositeOperation = 'destination-in';
    g.drawImage(im, 0, 0);
    tintCache[key] = c;
    return c;
  }

  var tmpGlow, glowCtx, tmpPanel, panelCtx, tmpText, textCtx, tmpW = 0, tmpH = 0, txtW = 0, txtH = 0;
  function ensureTmp(w, h) {
    if (tmpW === w && tmpH === h) return;
    tmpGlow = document.createElement('canvas'); tmpGlow.width = w; tmpGlow.height = h; glowCtx = tmpGlow.getContext('2d');
    tmpPanel = document.createElement('canvas'); tmpPanel.width = w; tmpPanel.height = h; panelCtx = tmpPanel.getContext('2d');
    tmpW = w; tmpH = h;
  }
  function ensureText(w, h) {
    if (txtW === w && txtH === h) return;
    tmpText = document.createElement('canvas'); tmpText.width = w; tmpText.height = h; textCtx = tmpText.getContext('2d');
    txtW = w; txtH = h;
  }

  function tileFill(ctx, im, w, h, offx, offy) {
    if (!im || !im.width) return;
    var sx = ((offx % im.width) + im.width) % im.width;
    var sy = ((offy % im.height) + im.height) % im.height;
    for (var ox = -sx; ox < w; ox += im.width)
      for (var oy = -sy; oy < h; oy += im.height)
        ctx.drawImage(im, ox, oy);
  }

  function perlinPulse(siner) {
    var v = 0.2 + 0.2 * Math.sin((siner / 30 / 4) * 2 * Math.PI);
    return Math.max(0, Math.min(0.4, v));
  }

  function buildGlow(pw, ph, siner, item) {
    var g = glowCtx;
    g.globalCompositeOperation = 'source-over';
    g.globalAlpha = 1;
    g.clearRect(0, 0, pw, ph);
    if (item.icon === 'angel') return;
    var ic = img(item.icon);
    if (!ic || !ic.complete || !ic.width) return;
    var cy = tintMul(swirl, CYAN);
    if (cy) tileFill(g, cy, pw, ph, Math.floor(siner / 2), Math.floor(siner / 2));
    else { g.fillStyle = CYAN; g.fillRect(0, 0, pw, ph); }
    g.globalCompositeOperation = 'destination-in';
    var sc = Math.min((pw * 0.82) / ic.width, (ph * 0.64) / ic.height);
    var iw = ic.width * sc, ih = ic.height * sc;
    g.drawImage(ic, pw / 2 - iw / 2, ph * 0.4 - ih / 2, iw, ih);
    g.globalCompositeOperation = 'source-over';
  }

  function lineCol(siner) {
    var t = Math.round((0.5 + 0.5 * Math.sin(siner / 120)) * 10) / 10;
    var r = Math.round(139 + (23 - 139) * t);
    var gg = Math.round(233 + (237 - 233) * t);
    var b = Math.round(239 + (255 - 239) * t);
    return 'rgb(' + r + ',' + gg + ',' + b + ')';
  }

  function buildPanel(pw, ph, siner, item) {
    var p = panelCtx;
    p.globalCompositeOperation = 'source-over';
    p.globalAlpha = 1;
    p.clearRect(0, 0, pw, ph);
    var gc = tintMul(grid, lineCol(siner));
    if (gc) tileFill(p, gc, pw, ph, Math.floor(-siner / 2), Math.floor(-siner / 2));
    else { p.fillStyle = 'rgb(16,46,52)'; p.fillRect(0, 0, pw, ph); }
    buildGlow(pw, ph, siner, item);
    p.globalCompositeOperation = 'lighter';
    p.drawImage(tmpGlow, 0, 0);
    p.drawImage(tmpGlow, 0, 0);
    p.drawImage(tmpGlow, 0, 0);
    p.globalCompositeOperation = 'source-over';
    var eg = 0.15;
    var gx = p.createLinearGradient(0, 0, pw, 0);
    gx.addColorStop(0, 'rgba(0,0,16,0.9)'); gx.addColorStop(eg, 'rgba(0,0,16,0)');
    gx.addColorStop(1 - eg, 'rgba(0,0,16,0)'); gx.addColorStop(1, 'rgba(0,0,16,0.9)');
    p.fillStyle = gx; p.fillRect(0, 0, pw, ph);
    var gy = p.createLinearGradient(0, 0, 0, ph);
    gy.addColorStop(0, 'rgba(0,0,16,0.9)'); gy.addColorStop(eg + 0.05, 'rgba(0,0,16,0)');
    gy.addColorStop(1 - eg - 0.05, 'rgba(0,0,16,0)'); gy.addColorStop(1, 'rgba(0,0,16,0.9)');
    p.fillStyle = gy; p.fillRect(0, 0, pw, ph);
  }

  function bgCosmic(ctx, W, H, siner) {
    ctx.fillStyle = '#04020f';
    ctx.fillRect(0, 0, W, H);
    var cy = tintMul(swirlBright, 'rgb(20,52,120)');
    if (cy) { ctx.save(); ctx.globalAlpha = 0.5; ctx.globalCompositeOperation = 'lighter'; tileFill(ctx, cy, W, H, Math.floor(siner / 4), Math.floor(siner / 4)); ctx.restore(); }
  }

  function drawVerse(ctx, verse, W, top, siner, alpha) {
    if (!verse) return;
    var lines = verse.split('#');
    var lh = 24;
    var th = lines.length * lh + 16;
    ensureText(W, th);
    var t = textCtx;
    t.globalCompositeOperation = 'source-over';
    t.globalAlpha = 1;
    t.clearRect(0, 0, W, th);
    t.fillStyle = 'rgb(0,255,255)';
    t.fillRect(0, 0, W, th);
    var gw = tintMul(grid, 'rgb(255,255,255)');
    if (gw) { t.save(); t.globalAlpha = 0.6; tileFill(t, gw, W, th, Math.floor(siner / 2), Math.floor(siner / 2)); t.restore(); }
    t.globalCompositeOperation = 'destination-in';
    t.font = '18px "8bitOperatorJVE", "8-bit Operator Plus", monospace';
    t.textAlign = 'center';
    t.textBaseline = 'middle';
    t.fillStyle = '#fff';
    for (var i = 0; i < lines.length; i++) t.fillText(lines[i], W / 2, 8 + lh / 2 + i * lh);
    t.globalCompositeOperation = 'source-over';
    var bob = Math.sin(siner / 28) * 4;
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.globalAlpha = alpha;
    ctx.drawImage(tmpText, 0, top + bob);
    ctx.drawImage(tmpText, 0, top + bob);
    ctx.restore();
  }

  function drawProphecy(ctx, W, H, item, siner, alpha) {
    var pw = 264, ph = 150, px = (W - pw) / 2, py = 6;
    var ysin = Math.cos(siner / 12) * 4;
    ensureTmp(pw, ph);
    buildPanel(pw, ph, siner, item);
    ctx.save();
    var ccx = px + pw / 2, ccy = py + ph / 2;
    var glow = ctx.createRadialGradient(ccx, ccy, 10, ccx, ccy, pw * 0.72);
    glow.addColorStop(0, 'rgba(70,200,255,' + (0.2 * alpha) + ')');
    glow.addColorStop(1, 'rgba(70,200,255,0)');
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, W, H);
    for (var i = 2; i >= 1; i--) {
      ctx.globalAlpha = alpha * 0.18;
      ctx.drawImage(tmpPanel, px + ysin * i, py + ysin * 2 * i, pw, ph);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = alpha;
    ctx.drawImage(tmpPanel, px, py + ysin, pw, ph);
    ctx.restore();
    drawVerse(ctx, item.verse, W, py + ph + 6 + ysin, siner, alpha);
  }

  function drawWall(ctx, W, H, siner) {
    bgCosmic(ctx, W, H, siner);
    var pn = tintMul(perlin, CYAN);
    if (pn) { ctx.save(); ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = perlinPulse(siner); tileFill(ctx, pn, W, H, Math.floor(siner / 3), Math.floor(siner / 3)); ctx.restore(); }
    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    for (var lay = 2; lay >= 0; lay--) {
      var scale = 0.5 + lay * 0.28;
      var gap = 52 + lay * 26;
      var par = siner * (0.4 + lay * 0.4);
      var idx = lay * 5;
      for (var gy = -gap; gy < H + gap; gy += gap) {
        for (var gx = -gap; gx < W + gap; gx += gap) {
          var im = SET[(idx * 3 + lay) % 10]; idx++;
          var tt = tintMul(im, '#7fd6ff');
          if (!tt) continue;
          var yy = (((gy + par) % (H + gap)) + (H + gap)) % (H + gap) - gap;
          var bobx = Math.sin((siner / 30) + idx) * 4;
          ctx.globalAlpha = (0.55 - lay * 0.13) * (0.6 + 0.4 * Math.sin(siner / 22 + idx));
          ctx.drawImage(tt, gx + bobx, yy, im.width * scale, im.height * scale);
        }
      }
    }
    ctx.restore();
    ctx.save();
    ctx.font = '13px "8bitOperatorJVE", monospace';
    ctx.fillStyle = 'rgba(170,225,255,0.75)';
    ctx.textAlign = 'center';
    ctx.fillText('ГИГА-ПРОРОЧЕСТВО — стена знамений', W / 2, H - 12);
    ctx.restore();
  }

  var descs = new WeakMap();
  function render(cv, now) {
    var d = descs.get(cv);
    if (!d) {
      try { d = JSON.parse(cv.getAttribute('data-proph')); } catch (e) { d = { items: [] }; }
      d.t0 = now;
      descs.set(cv, d);
    }
    var ctx = cv.getContext('2d');
    var W = cv.width, H = cv.height;
    var elapsed = now - d.t0;
    var siner = elapsed / 33.333;
    if (d.mode === 'wall') { drawWall(ctx, W, H, siner); return; }
    bgCosmic(ctx, W, H, siner);
    var items = d.items || [];
    if (!items.length) return;
    if (items.length === 1) { drawProphecy(ctx, W, H, items[0], siner, 1); return; }
    var per = 4400, fade = 600;
    var pos = elapsed % (items.length * per);
    var idx = Math.floor(pos / per);
    var local = pos - idx * per;
    var a = 1;
    if (local < fade) a = local / fade;
    else if (local > per - fade) a = (per - local) / fade;
    drawProphecy(ctx, W, H, items[idx], siner, a);
  }

  function loop(now) {
    var list = document.querySelectorAll('canvas.proph-fx');
    for (var i = 0; i < list.length; i++) render(list[i], now);
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);
  window.ProphFX = { _cache: cache };
})();
