(function () {
  'use strict';

  var SPR = 'game-sprites/';
  var SND = 'game-sprites/snd/';

  var SMALL = "'8-bit Operator Plus Bold','8-bit Operator Plus',monospace";
  var MAIN = "'8-bit Operator Plus Bold','8-bit Operator Plus',monospace";
  var SC = 2;
  var XX = 0, YY = 10;
  var COL = { white: '#ffffff', gray: '#808080', black: '#000000', yellow: '#ffff00' };

  var imgCache = {};
  function img(name) {
    if (imgCache[name]) return imgCache[name];
    var im = new Image(); im.src = SPR + name + '.png'; imgCache[name] = im; return im;
  }
  var sndCache = {};
  function snd(name) { if (!sndCache[name]) { var a = new Audio(SND + name + '.wav'); a.preload = 'auto'; sndCache[name] = a; } return sndCache[name]; }
  function play(name) { try { var a = snd(name); a.currentTime = 0; var p = a.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} }

  var inst = null;

  function LightMenu() {
    this.canvas = null; this.ctx = null; this.opts = null;
    this.st = { menuno: 0, c0: 0, c1: 0, c3: 0, pick: false, pickKind: null, pickList: [], pickIdx: 0, pickPage: 0, slot: 0, anim: 0 };
    this.raf = 0; this.keyHandler = null; this.running = false; this._hover = false;
  }

  LightMenu.prototype.mount = function (container, opts) {
    this.opts = opts;
    var self = this;
    var wrap = document.createElement('div');
    wrap.className = 'light-menu-wrap';

    var cv = document.createElement('canvas');
    cv.width = 320 * SC; cv.height = 240 * SC; cv.className = 'light-menu-canvas';
    cv.tabIndex = 0;
    wrap.appendChild(cv);

    var hint = document.createElement('p');
    hint.className = 'light-menu-hint';
    hint.innerHTML = '<b>WASD / стрелочки</b> — выбор · <b>E / Z / Enter</b> — подтвердить · <b>Q / C</b> — отменить · ' +
      '<img class="hint-mouse" src="' + SPR + 'spr_rhythmgame_editor_mouse_0.png" alt="мышь"> тоже работает';
    wrap.appendChild(hint);

    this.buildStatsEditor(wrap);
    container.appendChild(wrap);

    this.canvas = cv; this.ctx = cv.getContext('2d');
    this.preload();
    try { if (document.fonts && document.fonts.load) { document.fonts.load("16px '8-bit Operator Plus Bold'"); document.fonts.load("32px '8-bit Operator Plus Bold'"); } } catch (e) {}
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

  LightMenu.prototype.preload = function () { img('spr_heartsmall_0'); };

  LightMenu.prototype.unmount = function () {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    if (this.keyHandler) document.removeEventListener('keydown', this.keyHandler, true);
    this.keyHandler = null;
    if (inst === this) inst = null;
  };


  LightMenu.prototype.lw = function () { return this.opts.save.lightWorld; };
  LightMenu.prototype.charName = function () {
    var I = window.KnightI18n;
    return (I && I.RU_CHARACTERS && I.RU_CHARACTERS[1]) || 'Kris';
  };
  LightMenu.prototype.itemLabel = function (kind, id) {
    if (Number(id) === 0) return '';
    try { return window.KnightCore.optionLabel(kind, id) || ('#' + id); } catch (e) { return '#' + id; }
  };
  LightMenu.prototype.dataList = function (kind) {
    var D = window.KnightCore && window.KnightCore.DATA;
    return (D && D[kind]) ? D[kind] : [];
  };
  LightMenu.prototype.hasItems = function () { return Number(this.lw().items[0]) !== 0; };


  LightMenu.prototype.gearName = function (id) {
    if (Number(id) === 0) return 'None';
    var n = this.itemLabel('lightItems', id);
    return n || 'None';
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

  LightMenu.prototype.bindInput = function () {
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
      var x = (e.clientX - r.left) * (320 / r.width);
      var y = (e.clientY - r.top) * (240 / r.height);
      self.handleClick(x, y);
    });
    cv.addEventListener('wheel', function (e) {
      if (self.st.pick) { e.preventDefault(); self.handleKey(e.deltaY > 0 ? 'D' : 'U'); }
    }, { passive: false });
  };

  LightMenu.prototype.handleKey = function (k) {
    var st = this.st;
    if (st.pick) return this.keyPick(k);
    if (st.menuno === 0) {
      if (k === 'U') { if (st.c0 > 0) { st.c0--; play('snd_menumove'); } }
      else if (k === 'D') { if (st.c0 < 2) { st.c0++; play('snd_menumove'); } }
      else if (k === 'OK') {
        if (st.c0 === 0) { if (this.hasItems()) { st.menuno = 1; st.c1 = 0; play('snd_select'); } else play('snd_cantselect'); }
        else if (st.c0 === 1) { st.menuno = 2; play('snd_select'); }
        else { st.menuno = 3; st.c3 = 0; play('snd_select'); }
      }
    } else if (st.menuno === 1) {
      var items = this.lw().items;
      if (k === 'U') { if (st.c1 > 0) { st.c1--; play('snd_menumove'); } }
      else if (k === 'D') { if (st.c1 < 7) { st.c1++; play('snd_menumove'); } }
      else if (k === 'OK') { this.openPick('lightItems', st.c1); play('snd_select'); }
      else if (k === 'NO') { st.menuno = 0; play('snd_menumove'); }
    } else if (st.menuno === 2) {
      if (k === 'OK' || k === 'NO') { st.menuno = 0; play('snd_menumove'); }
    } else if (st.menuno === 3) {
      if (k === 'U') { if (st.c3 > 0) { st.c3--; play('snd_menumove'); } }
      else if (k === 'D') { if (st.c3 < 7) { st.c3++; play('snd_menumove'); } }
      else if (k === 'OK') { this.openPick('phone', st.c3); play('snd_select'); }
      else if (k === 'NO') { st.menuno = 0; play('snd_menumove'); }
    }
  };

  LightMenu.prototype.openPick = function (kind, slot) {
    var st = this.st;
    st.pick = true; st.pickKind = kind; st.slot = slot;
    st.pickList = this.dataList(kind).map(function (e) { return Number(e[0]); });
    var cur = Number((kind === 'phone' ? this.lw().phone : this.lw().items)[slot]) || 0;
    var ci = st.pickList.indexOf(cur);
    st.pickIdx = ci < 0 ? 0 : ci;
    this.fixPickPage();
  };
  LightMenu.prototype.fixPickPage = function () {
    var st = this.st, rows = 7;
    if (st.pickIdx < st.pickPage) st.pickPage = st.pickIdx;
    if (st.pickIdx > st.pickPage + rows - 1) st.pickPage = st.pickIdx - rows + 1;
    if (st.pickPage < 0) st.pickPage = 0;
  };
  LightMenu.prototype.keyPick = function (k) {
    var st = this.st;
    if (k === 'U') { if (st.pickIdx > 0) { st.pickIdx--; this.fixPickPage(); play('snd_menumove'); } }
    else if (k === 'D') { if (st.pickIdx < st.pickList.length - 1) { st.pickIdx++; this.fixPickPage(); play('snd_menumove'); } }
    else if (k === 'OK') { this.applyPick(); }
    else if (k === 'NO') { st.pick = false; play('snd_menumove'); }
  };
  LightMenu.prototype.applyPick = function () {
    var st = this.st, id = Number(st.pickList[st.pickIdx] || 0);
    var arr = st.pickKind === 'phone' ? this.lw().phone : this.lw().items;
    arr[st.slot] = id;
    play('snd_select');
    st.pick = false;
    this.syncStatsEditor();
    if (this.opts.onChange) this.opts.onChange();
  };

  LightMenu.prototype.handleClick = function (x, y) {
    var st = this.st;
    if (st.pick) {

      for (var r = 0; r < 7; r++) {
        var ry = 40 + r * 16;
        if (x >= 100 && x <= 263 && y >= ry - 3 && y <= ry + 13) {
          var idx = st.pickPage + r;
          if (idx < st.pickList.length) {
            if (st.pickIdx === idx) this.applyPick();
            else { st.pickIdx = idx; this.fixPickPage(); play('snd_menumove'); }
          }
          return;
        }
      }
      return;
    }

    if (x >= 16 && x <= 86) {
      var opts = [['ITEM', 94, 0], ['STAT', 112, 1], ['CELL', 130, 2]];
      for (var o = 0; o < opts.length; o++) {
        if (y >= opts[o][1] - 4 && y <= opts[o][1] + 14) {
          var ci = opts[o][2];
          if (st.menuno !== 0) { st.menuno = 0; }
          st.c0 = ci;

          if (ci === 0) { if (this.hasItems()) { st.menuno = 1; st.c1 = 0; play('snd_select'); } else play('snd_cantselect'); }
          else if (ci === 1) { st.menuno = 2; play('snd_select'); }
          else { st.menuno = 3; st.c3 = 0; play('snd_select'); }
          return;
        }
      }
    }

    if ((st.menuno === 1 || st.menuno === 3) && x >= 100 && x <= 263) {
      var n = st.menuno === 1 ? 8 : 8;
      for (var i = 0; i < n; i++) {
        var iy = 40 + i * 16;
        if (y >= iy - 3 && y <= iy + 13) {
          var key = st.menuno === 1 ? 'c1' : 'c3';
          if (st[key] === i) { this.openPick(st.menuno === 1 ? 'lightItems' : 'phone', i); play('snd_select'); }
          else { st[key] = i; play('snd_menumove'); }
          return;
        }
      }
    }
  };


  LightMenu.prototype.r = function (x, y, w, h, color) {
    this.ctx.fillStyle = color; this.ctx.fillRect(x * SC, y * SC, w * SC, h * SC);
  };

  LightMenu.prototype.box = function (x1, y1, x2, y2, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x1 * SC, y1 * SC, (x2 - x1) * SC, (y2 - y1) * SC);
  };
  LightMenu.prototype.t = function (s, x, y, color, px, font, align) {
    var ctx = this.ctx;
    ctx.fillStyle = color || COL.white;
    ctx.font = (px) + "px " + (font || SMALL);
    ctx.textBaseline = 'top';
    ctx.textAlign = align || 'left';
    ctx.fillText(s, x * SC, y * SC);
    ctx.textAlign = 'left';
  };
  LightMenu.prototype.heart = function (x, y) {
    var im = img('spr_heartsmall_0');
    if (!im.complete || !im.naturalWidth) return;
    this.ctx.imageSmoothingEnabled = false;
    this.ctx.drawImage(im, x * SC, y * SC, im.naturalWidth * SC, im.naturalHeight * SC);
  };


  var SMALLPX = 16, MAINPX = 24;

  LightMenu.prototype.draw = function () {
    var ctx = this.ctx, st = this.st, lw = this.lw();
    ctx.imageSmoothingEnabled = false;
    ctx.fillStyle = COL.black; ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    var moveyy = YY;

    this.box(16, 16 + moveyy, 86, 70 + moveyy, COL.white);
    this.box(19, 19 + moveyy, 83, 67 + moveyy, COL.black);

    this.box(16, 74 + YY, 86, 147 + YY, COL.white);
    this.box(19, 77 + YY, 83, 144 + YY, COL.black);


    var statRight = 263;
    if (st.menuno === 1) { this.box(94, 16 + YY, 266, 196 + YY, COL.white); this.box(97, 19 + YY, 263, 193 + YY, COL.black); }
    else if (st.menuno === 2) { this.box(94, 16 + YY, statRight + 3, 224 + YY, COL.white); this.box(97, 19 + YY, statRight, 221 + YY, COL.black); }
    else if (st.menuno === 3) { this.box(94, 16 + YY, 266, 150 + YY, COL.white); this.box(97, 19 + YY, 263, 147 + YY, COL.black); }
    if (st.pick) { this.box(94, 16 + YY, 266, 196 + YY, COL.white); this.box(97, 19 + YY, 263, 193 + YY, COL.black); }


    var s = SMALLPX, m = MAINPX;
    this.t('LV  ' + lw.level, 23, 40 + moveyy, COL.white, s, SMALL);
    this.t('HP  ' + lw.health + '/' + lw.maxHealth, 23, 49 + moveyy, COL.white, s, SMALL);
    this.t('$   ' + lw.money, 23, 58 + moveyy, COL.white, s, SMALL);
    this.t(this.charName(), 23, 19 + moveyy, COL.white, m, MAIN);


    this.t('ITEM', 42, 83 + YY, this.hasItems() ? COL.white : COL.gray, m, MAIN);
    this.t('STAT', 42, 101 + YY, COL.white, m, MAIN);
    this.t('CELL', 42, 119 + YY, COL.white, m, MAIN);


    if (st.pick) { this.drawPick(); this.drawCursor(); return; }

    if (st.menuno === 1) {
      for (var i = 0; i < 8; i++) {
        var iid = Number(lw.items[i]) || 0;
        this.t(iid === 0 ? '(пусто)' : this.itemLabel('lightItems', iid), 116, 29 + YY + i * 16, iid === 0 ? COL.gray : COL.white, m, MAIN);
      }
    } else if (st.menuno === 3) {
      for (var p = 0; p < 8; p++) {
        var pid = Number(lw.phone[p]) || 0;
        this.t(pid === 0 ? '(пусто)' : this.itemLabel('phone', pid), 116, 29 + YY + p * 16, pid === 0 ? COL.gray : COL.white, m, MAIN);
      }
    } else if (st.menuno === 2) {
      this.drawStat();
    }
    this.drawCursor();
  };

  LightMenu.prototype.drawStat = function () {
    var lw = this.lw(), m = MAINPX, x = 108;
    this.t('"' + this.charName() + '"', x, 31 + YY, COL.white, m, MAIN);
    this.t('LV  ' + lw.level, x, 61 + YY, COL.white, m, MAIN);
    this.t('HP  ' + lw.health + ' / ' + lw.maxHealth, x, 77 + YY, COL.white, m, MAIN);
    this.t('AT  ' + lw.attack + ' (' + lw.weaponStrength + ')', x, 109 + YY, COL.white, m, MAIN);
    this.t('DF  ' + lw.defence + ' (' + lw.armorDefence + ')', x, 125 + YY, COL.white, m, MAIN);
    this.t('WEAPON: ' + this.gearName(lw.weapon), x, 155 + YY, COL.white, m, MAIN);
    this.t('ARMOR: ' + this.gearName(lw.armor), x, 171 + YY, COL.white, m, MAIN);
    this.t('MONEY: ' + lw.money, x, 191 + YY, COL.white, m, MAIN);
    var flags = this.opts.save.flags || [];
    var x2 = 192;
    if (this.charName().length >= 7) { this.t('???', x2, 31 + YY, COL.white, m, MAIN); }
    else if ((flags[914] || 0) > 0) {
      this.t('Since', x2, 31 + YY, COL.white, m, MAIN);
      this.t('Chapter ' + flags[914], x2, 47 + YY, COL.white, m, MAIN);
    }
    this.t('EXP: ' + lw.experience, x2, 109 + YY, COL.white, m, MAIN);
    this.t('NEXT: ' + this.nextLevel(), x2, 125 + YY, COL.white, m, MAIN);
  };
  LightMenu.prototype.nextLevel = function () {
    var TH = { 1: 10, 2: 30, 3: 70, 4: 120, 5: 200, 6: 300, 7: 500, 8: 800, 9: 1200, 10: 1700, 11: 2500, 12: 3500, 13: 5000, 14: 7000, 15: 10000, 16: 15000, 17: 25000, 18: 50000, 19: 99999 };
    var lw = this.lw(), lv = Number(lw.level) || 1;
    if (lv >= 20) return 0;
    return (TH[lv] || 0) - (Number(lw.experience) || 0);
  };

  LightMenu.prototype.drawPick = function () {
    var st = this.st, m = MAINPX, rows = 7;
    var title = st.pickKind === 'phone' ? 'Контакт' : 'Предмет';
    for (var r = 0; r < rows; r++) {
      var idx = st.pickPage + r;
      if (idx >= st.pickList.length) break;
      var id = st.pickList[idx];
      var nm = Number(id) === 0 ? '(пусто)' : this.itemLabel(st.pickKind, id);
      this.t(nm, 116, 29 + YY + r * 16, COL.white, m, MAIN);
    }

    if (st.pickPage > 0) this.t('^', 250, 25 + YY, COL.white, m, MAIN);
    if (st.pickPage + rows < st.pickList.length) this.t('v', 250, 175 + YY, COL.white, m, MAIN);
  };

  LightMenu.prototype.drawCursor = function () {
    var st = this.st;
    if (st.pick) {
      this.heart(104, 34 + YY + 16 * (st.pickIdx - st.pickPage));
      return;
    }
    if (st.menuno === 0) this.heart(28, 88 + YY + 18 * st.c0);
    else if (st.menuno === 1) this.heart(104, 34 + YY + 16 * st.c1);
    else if (st.menuno === 3) this.heart(104, 34 + YY + 16 * st.c3);
  };


  LightMenu.prototype.buildStatsEditor = function (wrap) {
    var self = this, lw = this.lw();
    var box = document.createElement('div');
    box.className = 'light-stats-editor';
    box.innerHTML = '<div class="lse-head"><img src="' + SPR + 'spr_heartsmall_0.png" alt=""><span>Статы Крис в Мире света</span>' +
      '<small>Изменяйте значения на удобные вам; меню обновится сразу</small></div>';
    var rows = document.createElement('div');
    rows.className = 'lse-rows';
    box.appendChild(rows);

    this._inputs = {};
    var num = function (key, label, opts) {
      var lab = document.createElement('label');
      lab.className = 'lse-field';
      var sp = document.createElement('span'); sp.textContent = label; lab.appendChild(sp);
      var inp = document.createElement('input'); inp.type = 'number';
      if (opts && opts.min != null) inp.min = opts.min;
      inp.value = Number(lw[key]) || 0;
      inp.addEventListener('input', function () {
        var v = Math.floor(Number(inp.value) || 0);
        if (opts && opts.min != null && v < opts.min) v = opts.min;
        lw[key] = v;
        if (key === 'maxHealth') lw.health = v;
        if (self.opts.onChange) self.opts.onChange();
      });
      inp.addEventListener('keydown', function (e) { e.stopPropagation(); });
      lab.appendChild(inp); self._inputs[key] = inp; rows.appendChild(lab);
    };
    var sel = function (key, label, kind) {
      var lab = document.createElement('label');
      lab.className = 'lse-field';
      var sp = document.createElement('span'); sp.textContent = label; lab.appendChild(sp);
      var s = document.createElement('select');
      self.dataList(kind).forEach(function (e) {
        var o = document.createElement('option'); o.value = e[0];
        o.textContent = self.itemLabel(kind, e[0]) || ('#' + e[0]); if (Number(e[0]) === 0) o.textContent = '(пусто)';
        s.appendChild(o);
      });
      s.value = String(Number(lw[key]) || 0);
      s.addEventListener('change', function () { lw[key] = Number(s.value) || 0; if (self.opts.onChange) self.opts.onChange(); });
      s.addEventListener('keydown', function (e) { e.stopPropagation(); });
      lab.appendChild(s); self._inputs[key] = s; rows.appendChild(lab);
    };

    num('maxHealth', 'Макс. HP', { min: 1 });
    num('health', 'HP', { min: 0 });
    num('level', 'Уровень (LV)', { min: 1 });
    num('experience', 'Опыт (EXP)', { min: 0 });
    num('money', 'Деньги ($)', { min: 0 });
    num('attack', 'Атака (AT)', { min: 0 });
    num('defence', 'Защита (DF)', { min: 0 });
    num('weaponStrength', 'Сила оружия', { min: 0 });
    num('armorDefence', 'Защита брони', { min: 0 });
    sel('weapon', 'Оружие', 'lightItems');
    sel('armor', 'Броня', 'lightItems');

    wrap.appendChild(box);
  };

  LightMenu.prototype.syncStatsEditor = function () {
    if (!this._inputs) return;
    var lw = this.lw();
    for (var k in this._inputs) {
      if (!this._inputs.hasOwnProperty(k)) continue;
      var el = this._inputs[k];
      if (el.tagName === 'SELECT') el.value = String(Number(lw[k]) || 0);
      else if (document.activeElement !== el) el.value = Number(lw[k]) || 0;
    }
  };

  function mountAPI(container, opts) {
    if (inst) inst.unmount();
    inst = new LightMenu();
    inst.mount(container, opts);
    return inst;
  }
  function unmountAPI() { if (inst) inst.unmount(); }

  window.KnightLightMenu = { mount: mountAPI, unmount: unmountAPI, _ctor: LightMenu };
})();
