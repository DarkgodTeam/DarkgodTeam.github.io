(function () {
  'use strict';

  var SPR = 'game-sprites/';
  var SND = 'game-sprites/snd/';
  var FONT = "'8bitOperatorJVE','8-bit Operator Plus',monospace";
  var NAME_FONT = "'8-bit Operator Plus Bold','8bitOperatorJVE',monospace";

  var COL = {
    white: '#ffffff', dkgray: '#808080', gray: '#bcbcbc', black: '#000000',
    yellow: '#ffff00', red: '#ff0000', orange: '#ff9000',
    abil_white: '#ffffff', abil_change: '#00ffff', abil_none: '#0000ff',
    shadow: '#3a3a3a',
    krisbar: '#00ffff', susiebar: '#ff00ff', ralseibar: '#00ff00', noellebar: '#ffff00',
    maroon: '#800000',
  };
  var BARCOL = { 1: COL.krisbar, 2: COL.susiebar, 3: COL.ralseibar, 4: COL.noellebar };
  var HEADSPR = { 1: 'spr_headkris', 2: 'spr_headsusie', 3: 'spr_headralsei', 4: 'spr_headnoelle' };
  var NAMESPR = { 1: 'spr_bnamekris', 2: 'spr_bnamesusie', 3: 'spr_bnameralsei', 4: 'spr_bnamenoelle' };

  var SPELL_COST = { 0: -1, 1: 125, 2: 80, 3: 40, 4: 125, 5: 0, 6: 0, 7: 0, 8: 80, 9: 40, 10: 200, 11: 200, 12: 212, 13: 100 };

  var imgCache = {};
  function img(name) {
    if (imgCache[name]) return imgCache[name];
    var im = new Image();
    im.src = SPR + name + '.png';
    imgCache[name] = im;
    return im;
  }

  function preload() {
    var i;
    for (i = 0; i <= 6; i++) img('spr_dmenu_captions_' + i);
    for (i = 0; i <= 5; i++) img('spr_dmenu_equip_' + i);
    for (i = 0; i <= 28; i++) img('spr_dmenu_items_' + i);
    for (i = 0; i <= 4; i++) img('spr_equipchar_ch2_' + i);
    for (i = 0; i <= 3; i++) img('spr_heart_harrows_' + i);
    img('spr_heart_0');
    [1, 2, 3, 4].forEach(function (c) { img(HEADSPR[c] + '_0'); img(NAMESPR[c] + '_0'); });
    img('spr_hpname_0'); img('spr_hpslash_0');
    for (i = 0; i <= 7; i++) img('spr_textbox_topleft_' + i);
  }

  var sndCache = {};
  function snd(name) {
    if (!sndCache[name]) { var a = new Audio(SND + name + '.wav'); a.preload = 'auto'; sndCache[name] = a; }
    return sndCache[name];
  }
  function play(name) {
    try { var a = snd(name); a.currentTime = 0; var p = a.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {}
  }


  var tintBuf = document.createElement('canvas');
  var tintCtx = tintBuf.getContext('2d');
  function drawIcon(ctx, frame, x, y, scale, color) {
    var im = img('spr_dmenu_items_' + frame);
    if (!im.complete || !im.naturalWidth) return;
    var w = im.naturalWidth, h = im.naturalHeight;
    tintBuf.width = w; tintBuf.height = h;
    tintCtx.clearRect(0, 0, w, h);
    tintCtx.imageSmoothingEnabled = false;
    tintCtx.globalCompositeOperation = 'source-over';
    tintCtx.drawImage(im, 0, 0);
    if (color && color !== '#ffffff') {

      tintCtx.globalCompositeOperation = 'multiply';
      tintCtx.fillStyle = color;
      tintCtx.fillRect(0, 0, w, h);
      tintCtx.globalCompositeOperation = 'destination-in';
      tintCtx.drawImage(im, 0, 0);
      tintCtx.globalCompositeOperation = 'source-over';
    }
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(tintBuf, x, y, w * scale, h * scale);
  }
  function drawSpr(ctx, name, frame, x, y, scale, alpha) {
    var im = img(name + '_' + frame);
    if (!im.complete || !im.naturalWidth) return;
    ctx.globalAlpha = alpha == null ? 1 : alpha;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(im, x, y, im.naturalWidth * scale, im.naturalHeight * scale);
    ctx.globalAlpha = 1;
  }

  function pxrect(ctx, x, y, w, h, color) { ctx.fillStyle = color; ctx.fillRect(x, y, w, h); }


  var inst = null;

  var showAllEquip = false;
  var allowAnyEquip = false;

  function EquipMenu() {
    this.canvas = null; this.ctx = null; this.opts = null;
    this.mode = 'equip';
    this.st = { submenu: 10, c10: 0, c11: 0, c12: 0, c13: 0, c14: 0, p0: 0, p1: 0, ps: 20, pslot: 0, ppick: 0, pp: 0, ist: 0, icat: 0, islot: 0, ipick: 0, ipp: 0, anim: 0 };
    this.raf = 0; this.keyHandler = null; this.running = false;
    this.charList = [1, 2, 3];
  }

  EquipMenu.prototype.mount = function (container, opts) {
    this.opts = opts;
    var Chars = window.KnightChars;
    var ch = opts.save.meta.chapter;
    this.charList = (Chars && Chars.CHAPTER_CHARS[ch]) || [1, 2, 3];

    var self = this;
    this.charList = this.charList.filter(function (id) { return self.charObj(id); });
    if (!this.charList.length) this.charList = [1];

    var wrap = document.createElement('div');
    wrap.className = 'equip-menu-wrap';
    this.buildTabs(wrap);
    var cv = document.createElement('canvas');
    cv.width = 640; cv.height = 480; cv.className = 'equip-menu-canvas';
    cv.tabIndex = 0;
    wrap.appendChild(cv);
    var hint = document.createElement('p');
    hint.className = 'equip-menu-hint';
    hint.innerHTML = '<b>WASD / стрелочки</b> — выбор · <b>E / Z / Enter</b> — подтвердить · <b>Q / C</b> — отменить · <img class="hint-mouse" src="' + SPR + 'spr_rhythmgame_editor_mouse_0.png" alt="мышь"> тоже работает';
    wrap.appendChild(hint);
    this.buildShowAllToggle(wrap);
    this.buildHpEditor(wrap);
    container.appendChild(wrap);

    this.canvas = cv; this.ctx = cv.getContext('2d');
    preload();
    try { if (document.fonts && document.fonts.load) { document.fonts.load("bold 28px '8-bit Operator Plus Bold'"); document.fonts.load("24px '8bitOperatorJVE'"); } } catch (e) {}
    this.bindInput();
    this.running = true;
    var loop = function () {
      if (!self.running) return;
      if (!document.body.contains(cv)) { self.unmount(); return; }
      self.st.anim++;
      self.draw();
      self.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);

    try { cv.focus({ preventScroll: true }); } catch (e) { try { cv.focus(); } catch (e2) {} }
  };

  EquipMenu.prototype.buildTabs = function (wrap) {
    var self = this;
    var bar = document.createElement('div');
    bar.className = 'equip-mode-tabs';
    var mk = function (mode, label) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'equip-mode-tab' + (self.mode === mode ? ' active' : '');
      b.textContent = label;
      b.addEventListener('click', function () {
        self.setMode(mode);
        if (b.parentNode) Array.prototype.forEach.call(b.parentNode.children, function (x) { x.classList.remove('active'); });
        b.classList.add('active');
      });
      return b;
    };
    bar.appendChild(mk('equip', 'ЭКИПИРОВКА'));
    bar.appendChild(mk('power', 'СИЛА · POWER'));
    bar.appendChild(mk('item', 'ПРЕДМЕТЫ · ITEM'));
    wrap.appendChild(bar);
  };
  EquipMenu.prototype.setMode = function (mode) {
    this.mode = mode;
    if (mode === 'power') { this.st.ps = 20; this.st.pslot = 0; }
    else if (mode === 'item') { this.st.ist = 0; this.st.icat = 0; this.st.islot = 0; }
    else { this.st.submenu = 10; }
    if (this.canvas) { try { this.canvas.focus({ preventScroll: true }); } catch (e) {} }
  };

  EquipMenu.prototype.unmount = function () {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.keyHandler) document.removeEventListener('keydown', this.keyHandler, true);
    this.keyHandler = null;
    if (inst === this) inst = null;
  };

  EquipMenu.prototype.buildShowAllToggle = function (wrap) {
    var self = this;
    var lab = document.createElement('label');
    lab.className = 'equip-showall';
    var cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = showAllEquip;
    cb.addEventListener('change', function () { self.setShowAll(cb.checked); });
    lab.appendChild(cb);
    var txt = document.createElement('span');
    txt.textContent = ' Показывать неподходящие предметы (их нельзя надеть)';
    lab.appendChild(txt);
    wrap.appendChild(lab);

    var lab2 = document.createElement('label');
    lab2.className = 'equip-showall';
    var cb2 = document.createElement('input');
    cb2.type = 'checkbox';
    cb2.checked = allowAnyEquip;
    cb2.addEventListener('change', function () { self.setAllowAny(cb2.checked); });
    lab2.appendChild(cb2);
    var txt2 = document.createElement('span');
    txt2.textContent = ' Разрешить надевать неподходящие предметы';
    lab2.appendChild(txt2);
    wrap.appendChild(lab2);
  };

  EquipMenu.prototype.buildHpEditor = function (wrap) {
    var self = this;
    var box = document.createElement('div');
    box.className = 'equip-hp-editor';
    var head = document.createElement('div');
    head.className = 'ehp-head';
    head.innerHTML = '<img src="' + SPR + 'spr_heart_0.png" alt=""><span>Здоровье и статы отряда</span><small>Изменяйте статы комадны на удобные вам</small>';
    box.appendChild(head);
    var rows = document.createElement('div');
    rows.className = 'ehp-rows';
    box.appendChild(rows);

    var ACCENT = { 1: '#00a2e8', 2: '#ea79c8', 3: '#b5e61d', 4: '#ffff00' };
    this.charList.forEach(function (cid) {
      var c = self.charObj(cid); if (!c) return;
      var row = document.createElement('div');
      row.className = 'ehp-row';
      row.style.setProperty('--c', ACCENT[cid] || '#fff');
      var nm = self.itemNameChar(cid);
      var nf = function (cls, label, val) { return '<label>' + label + '<input type="number" class="' + cls + '" value="' + (Number(val) || 0) + '"></label>'; };
      row.innerHTML =
        '<img class="ehp-head-spr" src="' + SPR + HEADSPR[cid] + '_0.png" alt="">' +
        '<span class="ehp-name">' + nm + '</span>' +
        '<span class="ehp-fields">' +
          '<label>HP<input type="number" min="1" class="ehp-hp" value="' + (Number(c.maxHealth) || 1) + '"></label>' +
          nf('ehp-at', 'Атака', c.attack) +
          nf('ehp-df', 'Защита', c.defence) +
          nf('ehp-mg', 'Магия', c.magic) +
        '</span>';
      var hpIn = row.querySelector('.ehp-hp');
      var apply = function () {
        var v = Math.max(1, Math.floor(Number(hpIn.value) || 1));
        c.maxHealth = v; c.health = v;
        if (self.opts.onChange) self.opts.onChange();
      };
      hpIn.addEventListener('input', apply);
      hpIn.addEventListener('blur', function () { hpIn.value = Number(c.maxHealth) || 1; });
      hpIn.addEventListener('keydown', function (e) { e.stopPropagation(); });
      var wire = function (cls, key) {
        var inp = row.querySelector('.' + cls); if (!inp) return;
        inp.addEventListener('input', function () { c[key] = Math.floor(Number(inp.value) || 0); if (self.opts.onChange) self.opts.onChange(); });
        inp.addEventListener('keydown', function (e) { e.stopPropagation(); });
      };
      wire('ehp-at', 'attack'); wire('ehp-df', 'defence'); wire('ehp-mg', 'magic');
      rows.appendChild(row);
    });
    wrap.appendChild(box);
  };


  EquipMenu.prototype.charObj = function (id) {
    var cs = this.opts.save.characters || [];
    return cs[id] || null;
  };
  EquipMenu.prototype.curChar = function () { return this.charList[this.st.c10] || this.charList[0]; };

  EquipMenu.prototype.headLayout = function (cx) {
    var n = this.charList.length;
    var sp = n > 3 ? 44 : 50;
    var startX = 72;
    return { n: n, sp: sp, headW: 50, x: function (i) { return startX + i * sp; } };
  };
  EquipMenu.prototype.partyList = function () {
    var self = this;
    var p = (this.opts.save.party || []).map(Number).filter(function (id) { return id && self.charObj(id); });
    if (!p.length) p = this.charList.slice(0, 3);
    var seen = {}, out = [];
    p.forEach(function (id) { if (!seen[id]) { seen[id] = 1; out.push(id); } });
    return out.slice(0, 3);
  };
  function eqTable(kind) {
    var D = window.KnightEquipData || { weapons: {}, armors: {} };
    return kind === 'weapons' ? D.weapons : D.armors;
  }
  function itemInfo(kind, id) {
    var t = eqTable(kind); var e = t[String(id)];
    return e || { at: 0, df: 0, mag: 0, ability: '', abilityIcon: 0, icon: 0, who: [], desc: '' };
  }
  EquipMenu.prototype.itemName = function (kind, id) {
    var Core = window.KnightCore;
    if (Number(id) === 0) return '';
    try { return Core.optionLabel(kind, id) || ('#' + id); } catch (e) { return '#' + id; }
  };
  EquipMenu.prototype.inv = function (kind) {
    var iv = this.opts.save.inventory;
    return (kind === 'weapons' ? iv.weapons : iv.armors) || [];
  };
  EquipMenu.prototype.invLen = function (kind) { return Math.min(this.inv(kind).length, 48); };

  EquipMenu.prototype.equipChoices = function (charId, kind) {
    var D = window.KnightCore && window.KnightCore.DATA;
    var list = (D && D[kind]) ? D[kind] : [];
    var out = [];
    for (var i = 0; i < list.length; i++) {
      var id = Number(list[i][0]);
      if (showAllEquip || allowAnyEquip) { out.push(id); continue; }
      var info = itemInfo(kind, id);
      if (info.who && info.who.indexOf(charId) !== -1) out.push(id);
    }
    return out;
  };

  EquipMenu.prototype.canWear = function (charId, kind, id) {
    if (allowAnyEquip) return true;
    var info = itemInfo(kind, Number(id));
    return !!(info.who && info.who.indexOf(charId) !== -1);
  };
  EquipMenu.prototype.equippedId = function (charId, slot) {
    var c = this.charObj(charId) || {};
    return Number(slot === 0 ? c.weapon : slot === 1 ? c.primaryArmor : c.secondaryArmor) || 0;
  };


  EquipMenu.prototype.stats = function (charId) {
    var c = this.charObj(charId) || {};
    var w = itemInfo('weapons', c.weapon), a1 = itemInfo('armors', c.primaryArmor), a2 = itemInfo('armors', c.secondaryArmor);
    return {
      at: (Number(c.attack) || 0) + w.at + a1.at + a2.at,
      df: (Number(c.defence) || 0) + w.df + a1.df + a2.df,
      mag: (Number(c.magic) || 0) + w.mag + a1.mag + a2.mag,
    };
  };

  EquipMenu.prototype.slotAbility = function (charId, slot) {
    var c = this.charObj(charId) || {};
    var id = slot === 0 ? c.weapon : slot === 1 ? c.primaryArmor : c.secondaryArmor;
    var info = itemInfo(slot === 0 ? 'weapons' : 'armors', id);
    return { text: info.ability || '', icon: info.abilityIcon || 0 };
  };


  EquipMenu.prototype.equipFromList = function () {
    var st = this.st, slot = st.submenu - 12;
    var charId = this.curChar();
    var c = this.charObj(charId); if (!c) return;
    var kind = slot === 0 ? 'weapons' : 'armors';
    var list = this.equipChoices(charId, kind);
    var idx = slot === 0 ? st.c12 : slot === 1 ? st.c13 : st.c14;
    if (idx < 0 || idx >= list.length) { play('snd_cantselect'); return; }
    var newId = Number(list[idx]);
    if (!this.canWear(charId, kind, newId)) {
      play('snd_cantselect');
      var rmsg = itemInfo(kind, newId).msg;
      var rline = rmsg && rmsg[charId];
      if (rline) this.flashMsg(rline, COL.white);
      return;
    }
    if (slot === 0) c.weapon = newId;
    else if (slot === 1) c.primaryArmor = newId;
    else c.secondaryArmor = newId;
    play('snd_equip');
    st.submenu = 11;
    var msg = itemInfo(kind, newId).msg;
    var line = msg && msg[charId];
    if (line) this.flashMsg(line, COL.white);
    if (this.opts.onChange) this.opts.onChange();
  };


  EquipMenu.prototype.flashMsg = function (text, color) {
    this._flash = { text: text, color: color || COL.white };
    this._flashUntil = this.st.anim + 90;
  };


  EquipMenu.prototype.setShowAll = function (v) {
    showAllEquip = !!v;
    var st = this.st;
    st.c12 = st.c13 = st.c14 = 0;
    st.p0 = st.p1 = 0;
  };

  EquipMenu.prototype.setAllowAny = function (v) {
    allowAnyEquip = !!v;
    var st = this.st;
    st.c12 = st.c13 = st.c14 = 0;
    st.p0 = st.p1 = 0;
  };


  function normKey(e) {
    var c = e.code;
    if (c === 'ArrowLeft' || c === 'KeyA') return 'L';
    if (c === 'ArrowRight' || c === 'KeyD') return 'R';
    if (c === 'ArrowUp' || c === 'KeyW') return 'U';
    if (c === 'ArrowDown' || c === 'KeyS') return 'D';
    if (c === 'KeyZ' || c === 'Enter' || c === 'KeyE' || c === 'Space') return 'OK';
    if (c === 'KeyX' || c === 'Escape' || c === 'Backspace' || c === 'KeyC' || c === 'Delete') return 'NO';

    var k = (e.key || '').toLowerCase();
    if (k === 'ф') return 'L'; if (k === 'в') return 'R'; if (k === 'ц') return 'U'; if (k === 'ы') return 'D';
    if (k === 'я' || k === 'у') return 'OK'; if (k === 'ч' || k === 'с') return 'NO';
    return null;
  }

  EquipMenu.prototype.bindInput = function () {
    var self = this;
    this.keyHandler = function (e) {
      if (!self.running || !self.canvas) return;
      var tgt = e.target;
      if (tgt && (tgt.tagName === 'INPUT' || tgt.tagName === 'TEXTAREA' || tgt.tagName === 'SELECT' || tgt.isContentEditable)) return;

      var active = document.activeElement;
      var within = active === self.canvas || (self.canvas.parentNode && self.canvas.parentNode.contains(active)) || self._hover;
      if (!within) return;
      var k = normKey(e);
      if (!k) return;
      e.preventDefault(); e.stopPropagation();
      self.handleKey(k);
    };
    document.addEventListener('keydown', this.keyHandler, true);


    var cv = this.canvas;
    cv.addEventListener('mouseenter', function () { self._hover = true; });
    cv.addEventListener('mouseleave', function () { self._hover = false; });
    cv.addEventListener('mousedown', function (e) {
      cv.focus({ preventScroll: true });
      var r = cv.getBoundingClientRect();
      var x = (e.clientX - r.left) * (640 / r.width);
      var y = (e.clientY - r.top) * (480 / r.height);
      self.handleClick(x, y);
    });

    cv.addEventListener('wheel', function (e) {
      if (self.st.submenu >= 12 && self.st.submenu <= 14) {
        e.preventDefault();
        self.handleKey(e.deltaY > 0 ? 'D' : 'U');
      }
    }, { passive: false });
  };

  EquipMenu.prototype.handleKey = function (k) {
    if (this.mode === 'power') this.keyPower(k); else if (this.mode === 'item') this.keyItem(k); else this.keyEquip(k);
  };
  EquipMenu.prototype.keyEquip = function (k) {
    var st = this.st;
    if (st.submenu === 10) {
      if (k === 'L') { st.c10 = (st.c10 - 1 + this.charList.length) % this.charList.length; play('snd_menumove'); }
      else if (k === 'R') { st.c10 = (st.c10 + 1) % this.charList.length; play('snd_menumove'); }
      else if (k === 'OK') { st.c11 = 0; st.submenu = 11; play('snd_select'); }

    } else if (st.submenu === 11) {
      if (k === 'U') { st.c11 = (st.c11 + 2) % 3; play('snd_menumove'); }
      else if (k === 'D') { st.c11 = (st.c11 + 1) % 3; play('snd_menumove'); }
      else if (k === 'OK') {
        st.submenu = 12 + st.c11;
        var kind = st.c11 === 0 ? 'weapons' : 'armors';
        var charId = this.curChar();
        var list = this.equipChoices(charId, kind);
        var key = st.submenu === 12 ? 'c12' : st.submenu === 13 ? 'c13' : 'c14';
        var ci = list.indexOf(this.equippedId(charId, st.c11));
        st[key] = ci < 0 ? 0 : ci;
        this.fixPage();
        play('snd_select');
      } else if (k === 'NO') { st.submenu = 10; play('snd_smallswing'); }
    } else if (st.submenu >= 12 && st.submenu <= 14) {
      var kind2 = st.submenu === 12 ? 'weapons' : 'armors';
      var len = this.equipChoices(this.curChar(), kind2).length;
      var ck = st.submenu === 12 ? 'c12' : st.submenu === 13 ? 'c13' : 'c14';
      if (k === 'U') { if (st[ck] > 0) { st[ck]--; this.fixPage(); play('snd_menumove'); } }
      else if (k === 'D') { if (st[ck] < len - 1) { st[ck]++; this.fixPage(); play('snd_menumove'); } }
      else if (k === 'OK') { this.equipFromList(); }
      else if (k === 'NO') { st.submenu = 11; play('snd_smallswing'); }
    }
  };

  EquipMenu.prototype.fixPage = function () {
    var st = this.st;
    var pm = st.submenu === 12 ? 'p0' : 'p1';
    var ck = st.submenu === 12 ? 'c12' : st.submenu === 13 ? 'c13' : 'c14';
    var cur = st[ck];
    if (cur < st[pm]) st[pm] = cur;
    if (cur > st[pm] + 5) st[pm] = cur - 5;
    if (st[pm] < 0) st[pm] = 0;
  };

  EquipMenu.prototype.handleClick = function (x, y) {
    if (this.mode === 'power') this.clickPower(x, y); else if (this.mode === 'item') this.clickItem(x, y); else this.clickEquip(x, y);
  };
  EquipMenu.prototype.clickEquip = function (x, y) {
    var st = this.st;

    var L = this.headLayout(194);
    for (var i = 0; i < this.charList.length; i++) {
      var hx = L.x(i), hy = 160;
      if (x >= hx && x <= hx + 50 && y >= hy && y <= hy + 40) {
        if (st.c10 !== i) { st.c10 = i; play('snd_menumove'); }
        if (st.submenu > 11) st.submenu = 11;
        if (st.submenu < 11) { st.submenu = 11; st.c11 = 0; play('snd_select'); }
        return;
      }
    }

    if (x >= 296 && x <= 582) {
      var rows = [108, 142, 172];
      for (var s = 0; s < 3; s++) {
        if (y >= rows[s] - 6 && y <= rows[s] + 24) {
          st.c11 = s; st.submenu = 12 + s;
          var kind = s === 0 ? 'weapons' : 'armors';
          var charId = this.curChar();
          var list = this.equipChoices(charId, kind);
          var key = st.submenu === 12 ? 'c12' : st.submenu === 13 ? 'c13' : 'c14';
          var ci = list.indexOf(this.equippedId(charId, s));
          st[key] = ci < 0 ? 0 : ci;
          this.fixPage(); play('snd_select');
          return;
        }
      }
    }

    if (st.submenu >= 12 && st.submenu <= 14 && x >= 340 && x <= 560) {
      var pm = st.submenu === 12 ? st.p0 : st.p1;
      var ck = st.submenu === 12 ? 'c12' : st.submenu === 13 ? 'c13' : 'c14';
      var kind3 = st.submenu === 12 ? 'weapons' : 'armors';
      var len3 = this.equipChoices(this.curChar(), kind3).length;
      for (var j = 0; j < 6; j++) {
        var ry = 230 + j * 27;
        if (y >= ry - 4 && y <= ry + 23) {
          var idx = pm + j;
          if (idx < len3) {
            if (st[ck] === idx) { this.equipFromList(); }
            else { st[ck] = idx; this.fixPage(); play('snd_menumove'); }
          }
          return;
        }
      }
    }
  };


  EquipMenu.prototype.text = function (s, x, y, color, px, align, font) {
    var ctx = this.ctx;
    ctx.fillStyle = color || COL.white;
    ctx.font = (px || 24) + "px " + (font || FONT);
    ctx.textBaseline = 'top';
    ctx.textAlign = align || 'left';
    ctx.fillText(s, x, y);
    ctx.textAlign = 'left';
  };

  EquipMenu.prototype.drawTopDesc = function (text) {
    if (!text) return;
    if (this._flash && this.st.anim <= this._flashUntil) return;
    var lines = String(text).split(/[#&]/);
    for (var i = 0; i < lines.length; i++) {
      this.text(lines[i], 20, 10 + i * 28, COL.white, 22, 'left', FONT);
    }
  };

  EquipMenu.prototype.darkbox = function (x0, y0, x1, y1) {

    if (this._jewel == null) this._jewel = 0;
    this._jewel += 1;
    var tw = x1 - x0 - 63; if (tw < 0) tw = 0;
    var th = y1 - y0 - 63; if (th < 0) th = 0;
    if (tw > 0) {
      this.drawStretched('spr_textbox_top', 0, x0 + 32, y0, tw, 32);
      this.drawSpriteScaled('spr_textbox_top', 0, x0 + 32, y1 + 1, tw, -2);
    }
    if (th > 0) {
      this.drawSpriteScaled('spr_textbox_left', 0, x1 + 1, y0 + 32, -2, th);
      this.drawSpriteScaled('spr_textbox_left', 0, x0, y0 + 32, 2, th);
    }
    var f = Math.floor(this._jewel / 10) % 8;
    this.drawSpriteScaled('spr_textbox_topleft', f, x0, y0, 2, 2);
    this.drawSpriteScaled('spr_textbox_topleft', f, x1 + 1, y0, -2, 2);
    this.drawSpriteScaled('spr_textbox_topleft', f, x0, y1 + 1, 2, -2);
    this.drawSpriteScaled('spr_textbox_topleft', f, x1 + 1, y1 + 1, -2, -2);
  };
  EquipMenu.prototype.drawStretched = function (name, frame, x, y, w, h) {
    var im = img(name + '_' + frame);
    if (!im.complete || !im.naturalWidth) return;
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(im, x, y, w, h);
  };
  EquipMenu.prototype.drawSpriteScaled = function (name, frame, x, y, sx, sy) {
    var im = img(name + '_' + frame);
    if (!im.complete || !im.naturalWidth) return;
    var ctx = this.ctx;
    ctx.save();
    ctx.imageSmoothingEnabled = false;
    ctx.translate(x, y);
    ctx.scale(sx < 0 ? -1 : 1, sy < 0 ? -1 : 1);
    ctx.drawImage(im, 0, 0, im.naturalWidth * Math.abs(sx), im.naturalHeight * Math.abs(sy));
    ctx.restore();
  };

  EquipMenu.prototype.draw = function () {
    if (this.mode === 'power') this.drawPower(); else if (this.mode === 'item') this.drawItem(); else this.drawEquip();
    this.drawFlash();
  };

  EquipMenu.prototype.drawFlash = function () {
    if (!this._flash) return;
    if (this.st.anim > this._flashUntil) { this._flash = null; return; }
    var ctx = this.ctx;
    var lines = String(this._flash.text).split(/[#&]/);
    pxrect(ctx, 0, 6, 640, 10 + lines.length * 28, COL.black);
    for (var i = 0; i < lines.length; i++) {
      this.text(lines[i], 20, 10 + i * 28, this._flash.color, 22, 'left', NAME_FONT);
    }
  };
  EquipMenu.prototype.drawEquip = function () {
    var ctx = this.ctx, st = this.st;
    var charId = this.curChar();
    ctx.clearRect(0, 0, 640, 480);
    pxrect(ctx, 0, 0, 640, 480, COL.black);


    this.darkbox(50, 80, 590, 420);
    pxrect(ctx, 270, 88, 6, 134, COL.white);
    pxrect(ctx, 59, 221, 522, 6, COL.white);
    pxrect(ctx, 323, 222, 6, 189, COL.white);


    drawSpr(ctx, 'spr_dmenu_captions', 0, 118, 86, 2, 1);
    drawSpr(ctx, 'spr_dmenu_captions', 1, 376, 86, 2, 1);
    drawSpr(ctx, 'spr_dmenu_captions', (st.c11 === 1 || st.c11 === 2) ? 2 : 3, 372, 216, 2, 1);
    drawSpr(ctx, 'spr_dmenu_captions', 4, 116, 216, 2, 1);


    var cx = 194;
    this.text(this.itemNameChar(charId), cx, 105, COL.white, 28, 'center', NAME_FONT);
    var L = this.headLayout(cx);
    for (var i = 0; i < this.charList.length; i++) {
      var cid = this.charList[i];
      var chosen = (i === st.c10) ? 1 : 0.4;
      drawSpr(ctx, 'spr_equipchar_ch2', cid, L.x(i), 160, 2, chosen);
    }
    if (st.submenu === 10) {
      var hf = Math.floor(st.anim / 20) % 4;
      drawSpr(ctx, 'spr_heart_harrows', hf, L.x(st.c10) + 9, 141, 1, 1);
    }


    this.drawEquipped(charId);


    this.drawStats(charId);


    this.drawList(charId);


    this.drawHpBars();
  };

  EquipMenu.prototype.itemNameChar = function (charId) {
    var I = window.KnightI18n;
    var ru = I && I.RU_CHARACTERS ? I.RU_CHARACTERS[charId] : null;
    var en = { 1: 'Kris', 2: 'Susie', 3: 'Ralsei', 4: 'Noelle' }[charId] || ('#' + charId);
    return ru || en;
  };

  EquipMenu.prototype.drawEquipped = function (charId) {
    var ctx = this.ctx, st = this.st, c = this.charObj(charId) || {};

    var bicon = charId === 4 ? 5 : (charId - 1);
    var slots = [
      { y: 108, icon: bicon, id: c.weapon, kind: 'weapons' },
      { y: 142, icon: 3, id: c.primaryArmor, kind: 'armors' },
      { y: 172, icon: 4, id: c.secondaryArmor, kind: 'armors' },
    ];
    for (var s = 0; s < 3; s++) {
      var sl = slots[s];
      if (st.submenu === 11 && st.c11 === s) {
        drawSpr(ctx, 'spr_heart', 0, 308, sl.y + 14, 1, 1);
      } else {
        drawSpr(ctx, 'spr_dmenu_equip', sl.icon, 302, sl.y, 2, 1);
      }
      var nm = this.itemName(sl.kind, sl.id);
      if (Number(sl.id) !== 0 && nm) {
        drawIcon(ctx, itemInfo(sl.kind, sl.id).icon, 343, sl.y + 10, 2, COL.white);
        this.text(nm, 365, sl.y + 4, COL.white, 24);
      } else {
        this.text('(Nothing)', 365, sl.y + 4, COL.dkgray, 24);
      }
    }
  };

  EquipMenu.prototype.drawStats = function (charId) {
    var ctx = this.ctx, st = this.st;
    var vs = 27, x0 = 100, lx = 74;
    var base = this.stats(charId);

    drawIcon(ctx, 1, lx, 236, 2, COL.white); this.text('Attack:', x0, 230, COL.white, 24);
    drawIcon(ctx, 4, lx, 236 + vs, 2, COL.white); this.text('Defense:', x0, 230 + vs, COL.white, 24);
    drawIcon(ctx, 5, lx, 236 + vs * 2, 2, COL.white); this.text('Magic:', x0, 230 + vs * 2, COL.white, 24);


    var prev = null;
    if (st.submenu >= 12 && st.submenu <= 14) prev = this.previewItem(charId);

    var at = base.at, df = base.df, mag = base.mag;
    var atc = COL.white, dfc = COL.white, mgc = COL.white;
    if (prev && prev.canShow) {
      at = base.at + prev.atup; df = base.df + prev.dfup; mag = base.mag + prev.magup;
      atc = prev.atup > 0 ? COL.yellow : prev.atup < 0 ? COL.red : COL.white;
      dfc = prev.dfup > 0 ? COL.yellow : prev.dfup < 0 ? COL.red : COL.white;
      mgc = prev.magup > 0 ? COL.yellow : prev.magup < 0 ? COL.red : COL.white;
    }
    this.text(String(Math.floor(at)), 230, 230, atc, 24);
    this.text(String(Math.floor(df)), 230, 230 + vs, dfc, 24);
    this.text(String(Math.floor(mag)), 230, 230 + vs * 2, mgc, 24);


    var ab = [this.slotAbility(charId, 0), this.slotAbility(charId, 1), this.slotAbility(charId, 2)];
    var abColor = [COL.abil_white, COL.abil_white, COL.abil_white];
    if (prev && prev.slot != null) {
      ab[prev.slot] = { text: prev.ability, icon: prev.abilityIcon };
      var changed = prev.ability !== this.slotAbility(charId, prev.slot).text;
      abColor[prev.slot] = changed ? (prev.ability ? COL.abil_change : COL.abil_none) : COL.abil_white;
    }
    for (var i = 0; i < 3; i++) {
      var ry = 230 + vs * (i + 3);
      if (!ab[i].text) {
        this.text('(No ability.)', x0, ry, COL.dkgray, 24);
      } else {
        this.text(ab[i].text, x0, ry, abColor[i], 24);
        drawIcon(ctx, ab[i].icon, lx, ry + 8, 2, COL.orange);
      }
    }
  };


  EquipMenu.prototype.previewItem = function (charId) {
    var st = this.st, slot = st.submenu - 12;
    var kind = slot === 0 ? 'weapons' : 'armors';
    var list = this.equipChoices(charId, kind);
    var idx = slot === 0 ? st.c12 : slot === 1 ? st.c13 : st.c14;
    var newId = Number(list[idx]);
    var info = itemInfo(kind, newId);
    var cur = itemInfo(kind, this.equippedId(charId, slot));
    return {
      slot: slot, canShow: true, ability: info.ability || '', abilityIcon: info.abilityIcon || 0,
      atup: info.at - cur.at,
      dfup: info.df - cur.df,
      magup: info.mag - cur.mag,
    };
  };

  EquipMenu.prototype.drawList = function (charId) {
    var ctx = this.ctx, st = this.st;
    var isWeapon = (st.c11 === 0);
    var kind = isWeapon ? 'weapons' : 'armors';
    var list = this.equipChoices(charId, kind);
    var len = list.length;
    var pm = isWeapon ? st.p0 : st.p1;
    var vs = 27;
    for (var j = 0; j < 6; j++) {
      var idx = pm + j;
      if (idx >= len) break;
      var id = Number(list[idx]);
      var info = itemInfo(kind, id);
      var iy = 236 + j * vs, ty = 230 + j * vs;
      var usable = (id === 0) || this.canWear(charId, kind, id);
      var col = usable ? COL.white : COL.dkgray;
      drawIcon(ctx, info.icon, 364, iy, 2, usable ? COL.white : COL.dkgray);
      if (id !== 0) this.text(this.itemName(kind, id), 384, ty, col, 24);
      else this.text('(Пусто)', 384, ty, COL.dkgray, 24);
    }

    if (st.submenu >= 12 && st.submenu <= 14) {
      var ck = st.submenu === 12 ? st.c12 : st.submenu === 13 ? st.c13 : st.c14;
      var pmv = st.submenu === 12 ? st.p0 : st.p1;
      this.drawTopDesc(itemInfo(kind, Number(list[ck])).desc);
      drawSpr(ctx, 'spr_heart', 0, 344, 240 + (ck - pmv) * vs, 1, 1);
      pxrect(ctx, 555, 260, 5, 118, COL.dkgray);
      var th = (len > 6) ? (pmv / Math.max(1, len - 6)) : 0;
      pxrect(ctx, 555, 260 + Math.round(th * 100), 5, 18, COL.white);
      var bob = Math.sin(st.anim / 12) * 3;
      if (pmv > 0) this.text('▲', 549, 246 - bob, COL.white, 16);
      if (pmv + 5 < len - 1) this.text('▼', 549, 384 + bob, COL.white, 16);
    }
  };

  EquipMenu.prototype.drawHpBars = function () {
    var ctx = this.ctx;
    var list = this.partyList();
    var n = list.length;
    var chunks = n >= 3 ? [0, 213, 426] : n === 2 ? [80, 346] : [213];
    var y0 = 432, boxW = 210, boxH = 42;
    for (var i = 0; i < n; i++) {
      var cid = list[i];
      var c = this.charObj(cid) || {};
      var xc = chunks[i] || 0;
      var col = BARCOL[cid] || COL.white;

      pxrect(ctx, xc, y0, boxW, boxH, col);
      pxrect(ctx, xc + 2, y0 + 2, boxW - 4, boxH - 4, COL.black);

      drawSpr(ctx, HEADSPR[cid], 0, xc + 8, y0 + 8, 1, 1);

      this.text(this.itemNameChar(cid), xc + 46, y0 + 8, COL.white, 18, 'left', NAME_FONT);

      var hp = Math.max(0, Number(c.health) || 0), mhp = Math.max(1, Number(c.maxHealth) || 1);
      var ratio = hp / mhp;
      var nc = hp <= 0 ? COL.red : (ratio <= 0.25 ? COL.yellow : COL.white);
      this.text(String(hp), xc + 162, y0 + 5, nc, 16, 'right');
      drawSpr(ctx, 'spr_hpslash', 0, xc + 164, y0 + 5, 1, 1);
      this.text(String(mhp), xc + 182, y0 + 5, nc, 16, 'left');

      drawSpr(ctx, 'spr_hpname', 0, xc + 46, y0 + 26, 1, 1);
      pxrect(ctx, xc + 70, y0 + 26, 124, 9, COL.maroon);
      if (hp > 0) pxrect(ctx, xc + 70, y0 + 26, Math.ceil(ratio * 124), 9, col);
    }
  };


  EquipMenu.prototype.spellChoices = function () {
    var Chars = window.KnightChars;
    var charId = this.curChar();
    var ch = this.opts.save.meta.chapter;
    if (Chars && Chars.allowedSpells) return Chars.allowedSpells(charId, ch).slice();
    return [0, 7];
  };
  EquipMenu.prototype.spellName = function (id) {
    if (Number(id) === 0) return '';
    try { return window.KnightCore.optionLabel('spells', id) || ('#' + id); } catch (e) { return '#' + id; }
  };
  EquipMenu.prototype.spellAllowed = function (charId, id) {
    var Chars = window.KnightChars;
    if (!Chars || !Chars.allowedSpells) return true;
    return Number(id) === 0 || Chars.allowedSpells(charId, this.opts.save.meta.chapter).indexOf(Number(id)) !== -1;
  };
  EquipMenu.prototype.fixPickPage = function () {
    var st = this.st;
    if (st.ppick < st.pp) st.pp = st.ppick;
    if (st.ppick > st.pp + 5) st.pp = st.ppick - 5;
    if (st.pp < 0) st.pp = 0;
  };
  EquipMenu.prototype.applySpell = function () {
    var st = this.st, list = this.spellChoices();
    var id = Number(list[st.ppick] || 0);
    var c = this.charObj(this.curChar()); if (!c) return;
    c.spells = c.spells || [];
    c.spells[st.pslot] = id;
    play('snd_equip');
    st.ps = 21;
    if (this.opts.onChange) this.opts.onChange();
  };

  EquipMenu.prototype.keyPower = function (k) {
    var st = this.st;
    if (st.ps === 20) {
      if (k === 'L') { st.c10 = (st.c10 - 1 + this.charList.length) % this.charList.length; play('snd_menumove'); }
      else if (k === 'R') { st.c10 = (st.c10 + 1) % this.charList.length; play('snd_menumove'); }
      else if (k === 'OK') { st.ps = 21; st.pslot = 0; play('snd_select'); }
    } else if (st.ps === 21) {
      if (k === 'U') { st.pslot = (st.pslot + 5) % 6; play('snd_menumove'); }
      else if (k === 'D') { st.pslot = (st.pslot + 1) % 6; play('snd_menumove'); }
      else if (k === 'OK') {
        st.ps = 22;
        var list = this.spellChoices();
        var cur = Number((this.charObj(this.curChar()).spells || [])[st.pslot] || 0);
        var idx = list.indexOf(cur);
        st.ppick = idx < 0 ? 0 : idx; this.fixPickPage(); play('snd_select');
      } else if (k === 'NO') { st.ps = 20; play('snd_smallswing'); }
    } else if (st.ps === 22) {
      var list2 = this.spellChoices();
      if (k === 'U') { if (st.ppick > 0) { st.ppick--; this.fixPickPage(); play('snd_menumove'); } }
      else if (k === 'D') { if (st.ppick < list2.length - 1) { st.ppick++; this.fixPickPage(); play('snd_menumove'); } }
      else if (k === 'OK') { this.applySpell(); }
      else if (k === 'NO') { st.ps = 21; play('snd_smallswing'); }
    }
  };

  EquipMenu.prototype.clickPower = function (x, y) {
    var st = this.st;
    var L = this.headLayout(200);
    for (var i = 0; i < this.charList.length; i++) {
      var hx = L.x(i), hy = 160;
      if (x >= hx && x <= hx + 50 && y >= hy && y <= hy + 40) {
        if (st.c10 !== i) { st.c10 = i; play('snd_menumove'); }
        if (st.ps > 21) st.ps = 21;
        if (st.ps < 21) { st.ps = 21; st.pslot = 0; play('snd_select'); }
        return;
      }
    }

    if (x >= 310 && x <= 580) {
      var vs = 27;
      for (var j = 0; j < 6; j++) {
        var ry = 230 + j * vs;
        if (y >= ry - 4 && y <= ry + 23) {
          if (st.ps === 22) {
            var idx = st.pp + j; var list = this.spellChoices();
            if (idx < list.length) { if (st.ppick === idx) this.applySpell(); else { st.ppick = idx; this.fixPickPage(); play('snd_menumove'); } }
          } else {
            st.ps = 22; st.pslot = j;
            var list2 = this.spellChoices();
            var cur = Number((this.charObj(this.curChar()).spells || [])[j] || 0);
            var ci = list2.indexOf(cur); st.ppick = ci < 0 ? 0 : ci; this.fixPickPage(); play('snd_select');
          }
          return;
        }
      }
    }
  };

  EquipMenu.prototype.wrapText = function (s, x, y, maxw, px, color, font) {
    var ctx = this.ctx; ctx.font = (px || 22) + "px " + (font || FONT);
    var words = String(s || '').split(' '); var line = ''; var yy = y;
    for (var i = 0; i < words.length; i++) {
      var test = line ? line + ' ' + words[i] : words[i];
      if (ctx.measureText(test).width > maxw && line) { this.text(line, x, yy, color, px, 'left', font); yy += (px || 22) + 4; line = words[i]; }
      else line = test;
    }
    if (line) this.text(line, x, yy, color, px, 'left', font);
  };

  EquipMenu.prototype.drawPower = function () {
    var ctx = this.ctx, st = this.st; var charId = this.curChar();
    ctx.clearRect(0, 0, 640, 480); pxrect(ctx, 0, 0, 640, 480, COL.black);
    this.darkbox(50, 80, 590, 420);
    pxrect(ctx, 60, 216, 521, 6, COL.white);
    pxrect(ctx, 294, 218, 6, 193, COL.white);
    drawSpr(ctx, 'spr_dmenu_captions', 0, 124, 84, 2, 1);
    drawSpr(ctx, 'spr_dmenu_captions', 4, 124, 210, 2, 1);
    drawSpr(ctx, 'spr_dmenu_captions', 5, 380, 210, 2, 1);


    var cx = 200;
    this.text(this.itemNameChar(charId), cx, 105, COL.white, 28, 'center', NAME_FONT);
    var L = this.headLayout(cx);
    for (var i = 0; i < this.charList.length; i++) {
      var cid = this.charList[i];
      var chosen = (i === st.c10) ? 1 : 0.4;
      drawSpr(ctx, 'spr_equipchar_ch2', cid, L.x(i), 160, 2, chosen);
    }
    if (st.ps === 20) { var hf = Math.floor(st.anim / 20) % 4; drawSpr(ctx, 'spr_heart_harrows', hf, L.x(st.c10) + 9, 141, 1, 1); }


    var Chars = window.KnightChars;
    var title = Chars ? Chars.computeTitle(charId, this.opts.save) : null;
    if (title) {
      this.text('LV' + title.lv + ' ' + title.name, 320, 105, COL.yellow, 24, 'left', NAME_FONT);
      this.wrapText(title.desc, 320, 138, 250, 20, COL.white, NAME_FONT);
    }


    var stt = this.stats(charId); var vs = 25;
    var sy = function (i) { return 230 + vs * i; };
    drawIcon(ctx, 1, 74, sy(0) + 6, 2, COL.white); this.text('Attack:', 100, sy(0), COL.white, 24); this.text(String(Math.floor(stt.at)), 230, sy(0), COL.white, 24);
    drawIcon(ctx, 4, 74, sy(1) + 6, 2, COL.white); this.text('Defense:', 100, sy(1), COL.white, 24); this.text(String(Math.floor(stt.df)), 230, sy(1), COL.white, 24);
    drawIcon(ctx, 5, 74, sy(2) + 6, 2, COL.white); this.text('Magic:', 100, sy(2), COL.white, 24); this.text(String(Math.floor(stt.mag)), 230, sy(2), COL.white, 24);
    var fv = this.charFlavorStats(charId);
    this.drawStatRow(fv.rows[0], sy(3));
    this.drawStatRow(fv.rows[1], sy(4));
    this.text('Guts:', 100, sy(5), COL.white, 24); drawIcon(ctx, 9, 74, sy(5) + 6, 2, COL.white);
    for (var gi = 0; gi < fv.guts; gi++) drawIcon(ctx, 9, 190 + gi * 20, sy(5) + 6, 2, COL.white);


    if (st.ps === 22) this.drawSpellPicker(charId); else this.drawSpellSlots(charId);
  };


  EquipMenu.prototype.charFlavorStats = function (charId) {
    var s = this.opts.save, f = s.flags || [], plot = Number(s.plot) || 0, ch = s.meta.chapter;
    var clamp = function (v, lo, hi) { return Math.max(lo, Math.min(hi, v)); };
    var num = function (i) { return Number(f[i]) || 0; };
    var dim = { dim: true };
    var rows = [dim, dim], guts = 0;
    var rude = (ch === 2) ? 89 : (ch === 1 && plot >= 154) ? 99 : 100;
    if (charId === 1) {
      guts = ch >= 4 ? 3 : ch >= 2 ? 2 : 1;
      if (ch === 5) {
        if (f[24]) rows = [{ label: 'Jumps:', icon: 28, value: num(1904) }, { label: 'Slashes:', icon: 1, value: num(1905) }];
      } else if (ch === 4) {
        var pured = clamp(num(1597), 0, 9999), slain = clamp(num(1598), 0, 9999);
        if (pured || slain) rows = [dim, (slain < pured) ? { label: 'Purify', star: true, value: pured } : { label: 'Slain', star: true, value: slain }];
      } else if (ch === 3) {
        if (num(1255) > 0) rows = [dim, { label: '', star: true, value: clamp(num(1255), 0, 9999) }];
      }
    } else if (charId === 2) {
      guts = ch >= 4 ? 4 : ch >= 3 ? 3 : 2;
      var r4 = dim;
      if (ch === 1) r4 = { label: 'Crudeness', icon: 13, value: (f[214] === 1 ? 101 : 100) };
      else if (ch === 2) r4 = { label: 'Purple', icon: 13, value: 'Yes' };
      else if (ch === 3) { if (num(1256) > 0) r4 = { label: 'Plucked', value: clamp(num(1256), 0, 99) }; }
      else { var m1 = Number((this.charObj(1) || {}).magic) || 0, fl = num(1045); var heal = (f[1569] === 1) ? (m1 * 10 + 2 * fl) : (m1 * 5 + 15 + 2 * fl); if (heal) r4 = { label: 'Healing', star: true, value: heal }; }
      rows = [{ label: 'Rudeness', icon: 13, value: rude }, r4];
    } else if (charId === 3) {
      guts = ch === 3 ? 1 : 0;
      var fluff = (ch === 2 ? 2 : 1) + ((this.charObj(3) || {}).weapon === 10 ? 1 : 0);
      var fr = { label: 'Fluffiness', icon: 12, iconRepeat: fluff };
      if (ch === 1) rows = [{ label: 'Kindness', icon: 10, value: 100 }, fr];
      else if (ch === 2) rows = [{ label: 'Sweetness', icon: 15, value: 97 }, fr];
      else if (ch === 3) rows = [(num(1257) > 0) ? { label: 'Carried', value: clamp(num(1257), 0, 99) } : dim, fr];
      else if (ch === 5) rows = [null, fr];
      else rows = [dim, fr];
    } else if (charId === 4) {
      rows = [{ label: 'Coldness', icon: 17, value: clamp(47 + num(925) * 7, 47, 100) }, { label: 'Boldness', icon: 16, value: Math.min(-12 + (plot - 70) * 3, 100) }];
    }
    return { guts: guts, rows: rows };
  };
  EquipMenu.prototype.drawStatRow = function (row, y) {
    if (!row) return;
    var ctx = this.ctx;
    if (row.dim) { this.text('???', 100, y, COL.dkgray, 24); return; }
    if (row.icon != null) drawIcon(ctx, row.icon, 74, y + (row.icon === 28 ? 8 : 6), 2, COL.white);
    if (row.star) this.text('*', 74, y, COL.white, 24);
    if (row.label) this.text(row.label, 100, y, COL.white, 24);
    if (row.iconRepeat != null) { for (var i = 0; i < row.iconRepeat; i++) drawIcon(ctx, 12, 230 + i * 20, y + 6, 2, COL.white); }
    else if (row.value != null) this.text(String(row.value), 230, y, COL.white, 24);
  };

  EquipMenu.prototype.drawSpellRow = function (charId, id, ry, usable, empty) {
    var cost = SPELL_COST[id];
    var col = usable ? COL.white : COL.gray;
    if (empty) { this.text('---------', 395, ry, COL.dkgray, 22); return; }
    if (cost > 0) this.text(Math.round(cost) + '%', 332, ry, col, 22, 'left');
    this.text(this.spellName(id), 395, ry, col, 22);
  };

  EquipMenu.prototype.drawSpellSlots = function (charId) {
    var ctx = this.ctx, st = this.st; var c = this.charObj(charId) || {}; var spells = c.spells || []; var vs = 27;
    for (var i = 0; i < 6; i++) {
      var id = Number(spells[i] || 0);
      this.drawSpellRow(charId, id, 230 + i * vs, this.spellAllowed(charId, id), id === 0);
    }
    if (st.ps === 21) drawSpr(ctx, 'spr_heart', 0, 315, 230 + st.pslot * vs, 1, 1);
  };

  EquipMenu.prototype.drawSpellPicker = function (charId) {
    var ctx = this.ctx, st = this.st; var list = this.spellChoices(); var vs = 27;
    for (var j = 0; j < 6; j++) {
      var idx = st.pp + j; if (idx >= list.length) break;
      var id = Number(list[idx]);
      this.drawSpellRow(charId, id, 230 + j * vs, this.spellAllowed(charId, id), false);
    }
    drawSpr(ctx, 'spr_heart', 0, 315, 230 + (st.ppick - st.pp) * vs, 1, 1);
    var sd = window.KnightEquipData && window.KnightEquipData.spells && window.KnightEquipData.spells[String(list[st.ppick])];
    if (sd) this.drawTopDesc(sd.desc);

    if (list.length > 6) {
      pxrect(ctx, 560, 260, 5, 118, COL.dkgray);
      var th = st.pp / Math.max(1, list.length - 6);
      pxrect(ctx, 560, 260 + Math.round(th * 100), 5, 18, COL.white);
      var bob = Math.sin(st.anim / 12) * 3;
      if (st.pp > 0) this.text('▲', 556, 246 - bob, COL.white, 16);
      if (st.pp + 5 < list.length - 1) this.text('▼', 556, 384 + bob, COL.white, 16);
    }
  };


  EquipMenu.prototype.itemCats = function () {
    var iv = this.opts.save.inventory || {};
    var cats = [
      { key: 'consumables', label: 'Вещи', kind: 'consumables' },
      { key: 'keyItems', label: 'Важное', kind: 'keyItems' },
    ];
    if (this.opts.save.meta.format === 2 && iv.storage) cats.push({ key: 'storage', label: 'Хранилище', kind: 'consumables' });
    return cats;
  };
  EquipMenu.prototype.itemSlotsArr = function (key) {
    var iv = this.opts.save.inventory || {};
    return (key === 'consumables' ? iv.consumables : key === 'keyItems' ? iv.keyItems : iv.storage) || [];
  };
  EquipMenu.prototype.itemCap = function (key) {
    var arr = this.itemSlotsArr(key);
    if (key === 'storage') { var n = Number(this.opts.save.flags[64]) || arr.length; return Math.min(n, arr.length); }
    return Math.min(12, arr.length);
  };
  EquipMenu.prototype.itemPickList = function (kind) {
    var D = window.KnightCore && window.KnightCore.DATA;
    return (D && D[kind] ? D[kind] : []).map(function (r) { return Number(r[0]); });
  };

  EquipMenu.prototype.keyItem = function (k) {
    var st = this.st, cats = this.itemCats();
    if (st.icat >= cats.length) st.icat = 0;
    var cat = cats[st.icat];
    if (st.ist === 0) {
      if (k === 'L') { st.icat = (st.icat - 1 + cats.length) % cats.length; play('snd_menumove'); }
      else if (k === 'R') { st.icat = (st.icat + 1) % cats.length; play('snd_menumove'); }
      else if (k === 'OK' || k === 'D') { st.ist = 1; st.islot = 0; play('snd_select'); }
    } else if (st.ist === 1) {
      var cap = this.itemCap(cat.key);
      if (k === 'U') { if (st.islot >= 2) { st.islot -= 2; play('snd_menumove'); } else { st.ist = 0; play('snd_smallswing'); } }
      else if (k === 'D') { if (st.islot + 2 < cap) { st.islot += 2; play('snd_menumove'); } }
      else if (k === 'L') { if (st.islot % 2 === 1) { st.islot--; play('snd_menumove'); } }
      else if (k === 'R') { if (st.islot % 2 === 0 && st.islot + 1 < cap) { st.islot++; play('snd_menumove'); } }
      else if (k === 'OK') {
        st.ist = 2;
        var list = this.itemPickList(cat.kind);
        var cur = Number(this.itemSlotsArr(cat.key)[st.islot] || 0);
        var ci = list.indexOf(cur); st.ipick = ci < 0 ? 0 : ci; this.fixItemPick();
        play('snd_select');
      } else if (k === 'NO') { st.ist = 0; play('snd_smallswing'); }
    } else if (st.ist === 2) {
      var list2 = this.itemPickList(cat.kind);
      if (k === 'U') { if (st.ipick > 0) { st.ipick--; this.fixItemPick(); play('snd_menumove'); } }
      else if (k === 'D') { if (st.ipick < list2.length - 1) { st.ipick++; this.fixItemPick(); play('snd_menumove'); } }
      else if (k === 'OK') {
        var arr = this.itemSlotsArr(cat.key);
        arr[st.islot] = Number(list2[st.ipick]);
        play('snd_equip'); st.ist = 1;
        if (this.opts.onChange) this.opts.onChange();
      } else if (k === 'NO') { st.ist = 1; play('snd_smallswing'); }
    }
  };
  EquipMenu.prototype.fixItemPick = function () {
    var st = this.st;
    if (st.ipick < st.ipp) st.ipp = st.ipick;
    if (st.ipick > st.ipp + 6) st.ipp = st.ipick - 6;
    if (st.ipp < 0) st.ipp = 0;
  };

  EquipMenu.prototype.clickItem = function (x, y) {
    var st = this.st, cats = this.itemCats();
    var cat = cats[st.icat];

    if (y >= 104 && y <= 140) {
      var itemoff = [180, 300, 420];
      for (var i = 0; i < cats.length; i++) {
        if (x >= itemoff[i] - 30 && x < itemoff[i] + 110) {
          if (st.icat !== i) { st.icat = i; st.islot = 0; play('snd_menumove'); }
          st.ist = 1; play('snd_select'); return;
        }
      }
    }
    if (st.ist === 2) {
      var list = this.itemPickList(cat.kind);
      for (var j = 0; j < 7; j++) {
        var py = 150 + j * 30;
        if (y >= py - 4 && y <= py + 26 && x >= 110 && x <= 560) {
          var pidx = st.ipp + j;
          if (pidx < list.length) { if (st.ipick === pidx) { this.keyItem('OK'); } else { st.ipick = pidx; this.fixItemPick(); play('snd_menumove'); } }
          return;
        }
      }
      return;
    }

    var cap = this.itemCap(cat.key);
    var page = Math.floor(st.islot / 12) * 12;
    for (var li = 0; li < 12; li++) {
      var row = Math.floor(li / 2), c2 = li % 2;
      var sx = c2 ? 330 : 110, sy = 152 + 30 * row;
      if (x >= sx && x <= sx + 220 && y >= sy - 4 && y <= sy + 26) {
        var idx = page + li;
        if (idx < cap) {
          if (st.ist === 1 && st.islot === idx) { this.keyItem('OK'); }
          else { st.islot = idx; st.ist = 1; play('snd_menumove'); }
        }
        return;
      }
    }
  };

  EquipMenu.prototype.itemName2 = function (kind, id) {
    if (Number(id) === 0) return '';
    try { return window.KnightCore.optionLabel(kind, id) || ('#' + id); } catch (e) { return '#' + id; }
  };
  EquipMenu.prototype.itemDesc = function (kind, id) {
    var D = window.KnightEquipData; var m = D && D[kind];
    return (m && m[String(id)] && m[String(id)].desc) || '';
  };

  EquipMenu.prototype.drawItem = function () {
    var ctx = this.ctx, st = this.st;
    ctx.clearRect(0, 0, 640, 480); pxrect(ctx, 0, 0, 640, 480, COL.black);
    this.darkbox(60, 80, 580, 370);
    var cats = this.itemCats(); if (st.icat >= cats.length) st.icat = 0;
    var cat = cats[st.icat];

    var itemoff = [180, 300, 420];
    if (st.ist === 0) drawSpr(ctx, 'spr_heart', 0, 155 + 120 * st.icat, 120, 1, 1);
    for (var i = 0; i < cats.length; i++) {
      var hc = (st.ist === 0) ? COL.white : (i === st.icat ? COL.orange : COL.gray);
      this.text(cats[i].label, itemoff[i], 110, hc, 28, 'left', FONT);
    }
    if (st.ist === 2) { this.drawItemPicker(cat); return; }
    if (st.ist === 1) this.drawTopDesc(this.itemDesc(cat.kind, Number(this.itemSlotsArr(cat.key)[st.islot] || 0)));

    var arr = this.itemSlotsArr(cat.key), cap = this.itemCap(cat.key);
    var page = Math.floor(st.islot / 12) * 12;
    var mainCol = (st.ist === 0) ? COL.gray : COL.white;
    for (var li = 0; li < 12; li++) {
      var idx = page + li; if (idx >= cap) break;
      var row = Math.floor(li / 2), c2 = li % 2;
      var x = c2 ? 356 : 146, y = 152 + 30 * row;
      var id = Number(arr[idx] || 0);
      if (id === 0) {
        this.text('пусто', x, y, COL.dkgray, 26, 'left', NAME_FONT);
        continue;
      }
      var nm = this.itemName2(cat.kind, id);
      this.text(nm, x + 2, y + 2, COL.shadow, 26, 'left', FONT);
      this.text(nm, x, y, mainCol, 26, 'left', FONT);
    }
    if (st.ist === 1) {
      var local = st.islot % 12, r2 = Math.floor(local / 2), cc = local % 2;
      drawSpr(ctx, 'spr_heart', 0, cc ? 330 : 120, r2 * 30 + 162, 1, 1);
    }
    if (cap > 12) this.text('Стр. ' + (Math.floor(st.islot / 12) + 1) + '/' + Math.ceil(cap / 12), 290, 330, COL.dkgray, 18, 'left', NAME_FONT);
  };

  EquipMenu.prototype.drawItemPicker = function (cat) {
    var ctx = this.ctx, st = this.st;
    var list = this.itemPickList(cat.kind);
    this.drawTopDesc(this.itemDesc(cat.kind, Number(list[st.ipick])));
    var rows = 7;
    for (var j = 0; j < rows; j++) {
      var idx = st.ipp + j; if (idx >= list.length) break;
      var id = Number(list[idx]);
      var ry = 152 + j * 30;
      if (id === 0) {
        this.text('(пусто)', 146, ry, COL.dkgray, 26, 'left', NAME_FONT);
      } else {
        var nm = this.itemName2(cat.kind, id);
        this.text(nm, 148, ry + 2, COL.shadow, 26, 'left', FONT);
        this.text(nm, 146, ry, COL.white, 26, 'left', FONT);
      }
      if (idx === st.ipick) drawSpr(ctx, 'spr_heart', 0, 120, ry + 10, 1, 1);
    }
    if (list.length > rows) {
      pxrect(ctx, 560, 152, 5, rows * 30 - 10, COL.dkgray);
      var th = st.ipp / Math.max(1, list.length - rows);
      pxrect(ctx, 560, 152 + Math.round(th * (rows * 30 - 10 - 18)), 5, 18, COL.white);
    }
  };


  window.KnightEquipMenu = {
    mount: function (container, opts) {
      if (inst) inst.unmount();
      inst = new EquipMenu();
      inst.mount(container, opts);
      return inst;
    },
    unmount: function () { if (inst) inst.unmount(); },
    get: function () { return inst; },
  };
})();
