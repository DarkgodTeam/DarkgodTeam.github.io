(function () {
  var CHAPTERS = [
    { n: 1, label: 'Глава 1', available: true },
    { n: 2, label: 'Глава 2', available: true },
    { n: 3, label: 'Глава 3', available: true },
    { n: 4, label: 'Глава 4', available: true },
    { n: 5, label: 'Глава 5', available: true }
  ];
  var DEFAULT_CHAPTER = 1;
  var dumpCache = {};
  var curChapter = 0;
  var STORE_KEY = 'dumptext-state-v1';
  var restoring = false, savedPage = 1, savedScroll = 0;

  var DATA = [];

  var state = {
    q: '',
    scope: { a: true, b: true, c: true },
    cols: { a: true, b: true, c: true },
    mode: { case: false, word: false, regex: false, empty: false, dialog: false, noUnused: false, noDup: false },
    condFlags: [],
    weirdRoute: false,
    page: 1,
    perPage: 100,
    filtered: DATA
  };

  var els = {
    q: document.getElementById('q'),
    qClear: document.getElementById('qClear'),
    resetBtn: document.getElementById('resetBtn'),
    colChips: document.getElementById('colChips'),
    scopeChips: document.getElementById('scopeChips'),
    modeChips: document.getElementById('modeChips'),
    regexErr: document.getElementById('regexErr'),
    count: document.getElementById('count'),
    perPage: document.getElementById('perPage'),
    tbody: document.getElementById('tbody'),
    pager: document.getElementById('pager'),
    cgA: document.getElementById('cgA'),
    cgB: document.getElementById('cgB'),
    cgC: document.getElementById('cgC'),
    chapterSelect: document.getElementById('chapterSelect'),
    heroChapter: document.getElementById('heroChapter'),
    flagCond: document.getElementById('flagCond'),
    dlgModal: document.getElementById('dlgModal'),
    dlgClose: document.getElementById('dlgClose'),
    dlgObj: document.getElementById('dlgObj'),
    dlgEv: document.getElementById('dlgEv'),
    dlgMeta: document.getElementById('dlgMeta'),
    dlgAffects: document.getElementById('dlgAffects'),
    dlgEffects: document.getElementById('dlgEffects'),
    dlgEffectsWrap: document.getElementById('dlgEffectsWrap'),
    dlgBody: document.getElementById('dlgBody')
  };

  var dlgCache = {};
  var choicesCache = {};
  var currentUnitObj = null;
  var curDlg = null;
  var keyText = {};
  var dlgText = {};
  var keyCond = {};
  var _weirdRouteFlagsCache = null;
  function weirdRouteFlags() {
    if (_weirdRouteFlagsCache) return _weirdRouteFlagsCache;
    var set = {};
    var CATS = (window.KnightI18n && window.KnightI18n.FLAG_CATEGORIES) || [];
    CATS.forEach(function (c) {
      if (!c || !c[0]) return;
      if (c[0] === 'weird' || c[0] === 'sword') return;
      var key = String(c[0]).toLowerCase();
      if (key.indexOf('weird') < 0 && key.indexOf('snowgrave') < 0 && key.indexOf('sideb') < 0) return;
      (c[2] || []).forEach(function (n) { set[n] = 1; });
    });
    var weirdCat = CATS.find && CATS.find(function (c) { return c && c[0] === 'weird'; });
    if (weirdCat && weirdCat[2]) weirdCat[2].forEach(function (n) { set[n] = 1; });
    var DOCS = (window.KnightI18n && window.KnightI18n.FLAG_DOCS) || {};
    var DETAIL = window.KnightFlagsDetail || {};
    Object.keys(DOCS).forEach(function (k) {
      var d = DOCS[k]; if (!d) return;
      var text = String((d.description || '') + ' ' + (DETAIL[k] && DETAIL[k].detail || ''));
      if (/(?:Weird Route|маршрут Weird|Snowgrave|маршрут Snowgrave|Side B|сторона B)/i.test(text) || d.category === 'weird') {
        set[Number(k)] = 1;
      }
    });
    [254, 349, 452, 456, 457, 531, 532, 533, 559, 560, 561, 562, 563, 564, 565, 915, 916, 924, 925, 926, 1528, 1656, 1704, 1742, 1743].forEach(function (n) { set[n] = 1; });
    _weirdRouteFlagsCache = Object.keys(set).map(Number);
    return _weirdRouteFlagsCache;
  }
  function condSignals(cond, vars) {
    var flags = {}, named = {};
    (cond || []).forEach(function (c) {
      var info = condInfo(c, vars);
      info.flags.forEach(function (f) { flags[f] = 1; });
      if (/scr_sideb_(active|get_phase|fail)|sideb/.test(c)) named.sideb = 1;
      if (/murderlv/.test(c)) named.murder = 1;
    });
    return { flags: Object.keys(flags).map(Number), named: Object.keys(named) };
  }
  function setCurDlg(d) {
    curDlg = d || null;
    dlgText = {}; keyCond = {};
    if (curDlg && curDlg.units) {
      for (var uid in curDlg.units) {
        if (!Object.prototype.hasOwnProperty.call(curDlg.units, uid)) continue;
        var unit = curDlg.units[uid];
        var ns = unit.nodes || [];
        for (var i = 0; i < ns.length; i++) {
          if (ns[i].en != null) dlgText[ns[i].key] = ['', ns[i].en, ns[i].ja];
          var sig = condSignals(ns[i].cond, unit.vars || {});
          if (sig.flags.length || sig.named.length) keyCond[ns[i].key] = sig;
        }
      }
    }
  }

  function escapeHtml(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return c === '&' ? '&amp;' : c === '<' ? '&lt;' : c === '>' ? '&gt;' : '&quot;';
    });
  }

  function escapeRegex(s) {
    return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function buildMatcher() {
    var q = state.q;
    if (!q) return null;
    var flags = state.mode.case ? 'g' : 'gi';
    var src;
    if (state.mode.regex) {
      src = q;
    } else {
      src = escapeRegex(q);
      if (state.mode.word) src = '\\b' + src + '\\b';
    }
    try {
      var re = new RegExp(src, flags);
      els.regexErr.style.display = 'none';
      return re;
    } catch (e) {
      if (state.mode.regex) {
        els.regexErr.textContent = 'Ошибка регулярного выражения: ' + e.message;
        els.regexErr.style.display = 'block';
      }
      return null;
    }
  }

  function rowMatches(row, re) {
    var en = row.cleanEn != null ? row.cleanEn : row[1];
    var ja = row.cleanJa != null ? row.cleanJa : row[2];
    if (state.mode.empty && en && ja) return false;
    if (state.mode.noUnused && (!en || !ja)) return false;
    if (state.mode.noDup && en && ja && normForDup(en) === normForDup(ja)) return false;
    if (state.mode.dialog && curDlg && !resolveUnitId(row[0])) return false;
    if (state.weirdRoute) {
      var kcW = keyCond[row[0]];
      if (!kcW) return false;
      var WEIRD = weirdRouteFlags();
      if (kcW.named.indexOf('sideb') < 0 && !WEIRD.some(function (f) { return kcW.flags.indexOf(f) >= 0; })) return false;
    }
    if (state.condFlags && state.condFlags.length) {
      var kcF = keyCond[row[0]];
      if (!kcF) return false;
      if (!state.condFlags.some(function (f) { return kcF.flags.indexOf(f) >= 0; })) return false;
    }
    if (!re) return true;
    re.lastIndex = 0;
    if (state.scope.a && re.test(row[0])) return true;
    re.lastIndex = 0;
    if (state.scope.b && re.test(en)) return true;
    re.lastIndex = 0;
    if (state.scope.c && re.test(ja)) return true;
    return false;
  }

  function applyFilter() {
    var re = buildMatcher();
    if (!state.q && !state.mode.empty && !state.mode.dialog && !state.mode.noUnused && !state.mode.noDup && !state.weirdRoute && !(state.condFlags && state.condFlags.length)) {
      state.filtered = DATA;
    } else {
      var out = [];
      for (var i = 0; i < DATA.length; i++) {
        if (rowMatches(DATA[i], re)) out.push(DATA[i]);
      }
      state.filtered = out;
    }
    state.page = 1;
    render();
  }

  function highlight(raw, re, inScope) {
    if (!raw) return '<span class="empty-cell">—</span>';
    if (!re || !inScope) return escapeHtml(raw);
    var html = '';
    var last = 0;
    re.lastIndex = 0;
    var m;
    var guard = 0;
    while ((m = re.exec(raw)) !== null) {
      if (m.index >= last) {
        html += escapeHtml(raw.slice(last, m.index));
        html += '<mark>' + escapeHtml(m[0]) + '</mark>';
        last = m.index + m[0].length;
      }
      if (m.index === re.lastIndex) re.lastIndex++;
      if (++guard > 100000) break;
    }
    html += escapeHtml(raw.slice(last));
    return html;
  }

  function render() {
    var total = state.filtered.length;
    var per = state.perPage;
    var pages = Math.max(1, Math.ceil(total / per));
    if (state.page > pages) state.page = pages;
    var start = (state.page - 1) * per;
    var end = Math.min(start + per, total);
    var re = (state.q || (state.mode.regex && state.q)) ? buildMatcher() : (state.q ? buildMatcher() : null);

    els.count.innerHTML = 'Найдено: <b>' + total.toLocaleString('ru-RU') + '</b> из ' + DATA.length.toLocaleString('ru-RU') +
      (total ? ' · показаны ' + (start + 1) + '–' + end : '');

    if (!total) {
      els.tbody.innerHTML = '<tr><td colspan="4" class="no-results">Ничего не найдено. Измените запрос или параметры поиска.</td></tr>';
      els.pager.innerHTML = '';
      return;
    }

    var rows = state.filtered;
    var html = '';
    for (var i = start; i < end; i++) {
      var r = rows[i];
      var k = r[0];
      var en = r.cleanEn != null ? r.cleanEn : r[1];
      var ja = r.cleanJa != null ? r.cleanJa : r[2];
      var hasDlg = !!resolveUnitId(k);
      var objName = null;
      var idx = k.indexOf('_slash_');
      if (idx > 0) objName = k.slice(0, idx);
      var actions = '';
      if (hasDlg) actions += '<button type="button" class="dlg-btn">Показать диалог</button>';
      else actions += '<span class="no-dlg-mark">—</span>';
      if (objName) actions += '<button type="button" class="obj-btn" data-obj="' + escapeHtml(objName) + '" title="Показать всё по объекту ' + escapeHtml(objName) + '">Всё по объекту</button>';
      html += '<tr data-key="' + escapeHtml(k) + '"' + (hasDlg ? '' : ' class="no-dlg"') + '>' +
        '<td class="td-a"><code>' + highlight(k, re, state.scope.a) + '</code></td>' +
        '<td class="td-b">' + highlight(en, re, state.scope.b) + '</td>' +
        '<td class="td-c cell-jp">' + highlight(ja, re, state.scope.c) + '</td>' +
        '<td class="td-d"><div class="row-actions">' + actions + '</div></td>' +
        '</tr>';
    }
    els.tbody.innerHTML = html;
    renderPager(pages);
    if (!restoring) doSave();
  }

  function renderPager(pages) {
    if (pages <= 1) { els.pager.innerHTML = ''; return; }
    var p = state.page;
    var h = '';
    h += '<button data-go="first" ' + (p === 1 ? 'disabled' : '') + '>« Первая</button>';
    h += '<button data-go="prev" ' + (p === 1 ? 'disabled' : '') + '>‹ Назад</button>';
    h += '<span class="page-info">Стр. <input id="pageJump" type="number" min="1" max="' + pages + '" value="' + p + '"> из ' + pages + '</span>';
    h += '<button data-go="next" ' + (p === pages ? 'disabled' : '') + '>Вперёд ›</button>';
    h += '<button data-go="last" ' + (p === pages ? 'disabled' : '') + '>Последняя »</button>';
    els.pager.innerHTML = h;
  }

  function applyColumns() {
    var map = { a: ['cgA', 'th-a', 'td-a'], b: ['cgB', 'th-b', 'td-b'], c: ['cgC', 'th-c', 'td-c'] };
    Object.keys(map).forEach(function (k) {
      var on = state.cols[k];
      var cg = els[map[k][0]];
      if (cg) cg.style.display = on ? '' : 'none';
      var sel = document.querySelectorAll('.' + map[k][1] + ', .' + map[k][2]);
      for (var i = 0; i < sel.length; i++) {
        sel[i].classList.toggle('hidden-col', !on);
      }
    });
  }

  function debounce(fn, ms) {
    var t;
    return function () {
      clearTimeout(t);
      t = setTimeout(fn, ms);
    };
  }

  var doFilter = debounce(applyFilter, 130);

  els.q.addEventListener('input', function () {
    state.q = els.q.value;
    doFilter();
  });
  els.qClear.addEventListener('click', function () {
    els.q.value = '';
    state.q = '';
    applyFilter();
    els.q.focus();
  });

  els.resetBtn.addEventListener('click', function () {
    els.q.value = '';
    state.q = '';
    state.scope = { a: true, b: true, c: true };
    state.cols = { a: true, b: true, c: true };
    state.mode = { case: false, word: false, regex: false, empty: false, dialog: false, noUnused: false, noDup: false };
    state.condFlags = []; state.weirdRoute = false;
    if (els.flagCond) els.flagCond.value = '';
    var wl = document.querySelector('label[data-cond="weird"]');
    if (wl) { wl.classList.remove('on'); var wb = wl.querySelector('input'); if (wb) wb.checked = false; }
    syncChipUI();
    applyColumns();
    applyFilter();
  });

  function bindChips(container, group) {
    container.addEventListener('change', function (e) {
      var label = e.target.closest('label');
      if (!label) return;
      var on = e.target.checked;
      label.classList.toggle('on', on);
      var key;
      if (group === 'cols') { key = label.getAttribute('data-col'); state.cols[key] = on; applyColumns(); }
      else if (group === 'scope') { key = label.getAttribute('data-scope'); state.scope[key] = on; applyFilter(); }
      else { key = label.getAttribute('data-mode'); state.mode[key] = on; applyFilter(); }
    });
  }
  bindChips(els.colChips, 'cols');
  bindChips(els.scopeChips, 'scope');
  bindChips(els.modeChips, 'mode');

  if (els.flagCond) els.flagCond.addEventListener('input', function () {
    state.condFlags = els.flagCond.value.split(/[^\d]+/).map(Number).filter(function (n) { return n > 0; });
    doFilter();
  });
  document.addEventListener('change', function (e) {
    var lab = (e.target && e.target.closest) ? e.target.closest('label[data-cond="weird"]') : null;
    if (!lab) return;
    state.weirdRoute = !!e.target.checked;
    lab.classList.toggle('on', state.weirdRoute);
    applyFilter();
  });

  function syncChipUI() {
    [['colChips', 'data-col', state.cols], ['scopeChips', 'data-scope', state.scope], ['modeChips', 'data-mode', state.mode]].forEach(function (cfg) {
      var labels = els[cfg[0]].querySelectorAll('label');
      for (var i = 0; i < labels.length; i++) {
        var k = labels[i].getAttribute(cfg[1]);
        var on = !!cfg[2][k];
        labels[i].classList.toggle('on', on);
        var box = labels[i].querySelector('input');
        if (box) box.checked = on;
      }
    });
  }

  els.perPage.addEventListener('change', function () {
    state.perPage = parseInt(els.perPage.value, 10) || 100;
    state.page = 1;
    render();
  });

  els.pager.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    var go = btn.getAttribute('data-go');
    var pages = Math.max(1, Math.ceil(state.filtered.length / state.perPage));
    if (go === 'first') state.page = 1;
    else if (go === 'prev') state.page = Math.max(1, state.page - 1);
    else if (go === 'next') state.page = Math.min(pages, state.page + 1);
    else if (go === 'last') state.page = pages;
    render();
    document.querySelector('.table-scroll').scrollTop = 0;
  });

  els.pager.addEventListener('change', function (e) {
    if (e.target && e.target.id === 'pageJump') {
      var v = parseInt(e.target.value, 10);
      var pages = Math.max(1, Math.ceil(state.filtered.length / state.perPage));
      if (!isNaN(v)) { state.page = Math.min(pages, Math.max(1, v)); render(); }
    }
  });

  function loadSaved() {
    try { return JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) { return null; }
  }
  function saveState() {
    try {
      var ts = document.querySelector('.table-scroll');
      localStorage.setItem(STORE_KEY, JSON.stringify({
        chapter: curChapter,
        q: state.q,
        scope: state.scope,
        cols: state.cols,
        mode: state.mode,
        condFlags: state.condFlags,
        weirdRoute: state.weirdRoute,
        perPage: state.perPage,
        page: state.page,
        scroll: ts ? ts.scrollTop : 0
      }));
    } catch (e) {}
  }
  var doSave = debounce(function () { if (!restoring) saveState(); }, 400);

  function setData(rows) {
    DATA = rows || [];
    keyText = {};
    for (var i = 0; i < DATA.length; i++) {
      var row = DATA[i];
      keyText[row[0]] = row;
      row.cleanEn = cleanForTable(row[1]);
      row.cleanJa = cleanForTable(row[2]);
    }
    state.page = 1;
    applyColumns();
    applyFilter();
    if (restoring) {
      var pages = Math.max(1, Math.ceil(state.filtered.length / state.perPage));
      state.page = Math.min(pages, Math.max(1, savedPage));
      render();
      var ts = document.querySelector('.table-scroll');
      if (ts) ts.scrollTop = savedScroll;
      restoring = false;
    }
  }

  function loadDialogues(n) {
    n = Number(n);
    if (dlgCache[n] !== undefined) { if (curChapter === n) { setCurDlg(dlgCache[n]); applyFilter(); } return; }
    window.__DLG = null;
    var s = document.createElement('script');
    s.src = 'chapters/ch' + n + '/dialogues.js';
    s.onload = function () {
      dlgCache[n] = window.__DLG || null;
      if (curChapter === n) { setCurDlg(dlgCache[n]); applyFilter(); }
    };
    s.onerror = function () { dlgCache[n] = null; };
    document.body.appendChild(s);
  }
  function loadChoices(n) {
    n = Number(n);
    if (choicesCache[n] !== undefined) { if (curChapter === n) window.__CHOICES = choicesCache[n] || {}; return; }
    window.__CHOICES = null;
    var s = document.createElement('script');
    s.src = 'chapters/ch' + n + '/choices.js';
    s.onload = function () {
      choicesCache[n] = window.__CHOICES || {};
      if (curChapter === n) window.__CHOICES = choicesCache[n];
    };
    s.onerror = function () { choicesCache[n] = {}; };
    document.body.appendChild(s);
  }

  function showLoading(n) {
    els.tbody.innerHTML = '<tr><td colspan="4" class="loading">Загрузка дампа Главы ' + n + '…</td></tr>';
    els.count.textContent = 'Загрузка…';
    els.pager.innerHTML = '';
  }
  function showError(msg) {
    els.tbody.innerHTML = '<tr><td colspan="4" class="no-results">' + escapeHtml(msg) + '</td></tr>';
    els.count.textContent = 'Ошибка';
    els.pager.innerHTML = '';
  }

  function loadChapter(n) {
    n = Number(n);
    curChapter = n;
    if (document.body) document.body.classList.toggle('dump-ch5', n === 5);
    setCurDlg(dlgCache[n] !== undefined ? dlgCache[n] : null);
    if (els.heroChapter) els.heroChapter.textContent = 'ГЛАВА ' + n;
    if (dumpCache[n]) { setData(dumpCache[n]); loadDialogues(n); loadChoices(n); return; }
    showLoading(n);
    window.__DUMP = null;
    var s = document.createElement('script');
    s.src = 'chapters/ch' + n + '/dump.js';
    s.onload = function () {
      var rows = (window.__DUMP && window.__DUMP.rows) || [];
      dumpCache[n] = rows;
      if (curChapter === n) { setData(rows); loadDialogues(n); loadChoices(n); }
    };
    s.onerror = function () {
      if (curChapter === n) showError('Не удалось загрузить дамп Главы ' + n + '. Файл chapters/ch' + n + '/dump.js не найден.');
    };
    document.body.appendChild(s);
  }

  function buildChapterSelect() {
    if (!els.chapterSelect) return;
    var html = '';
    for (var i = 0; i < CHAPTERS.length; i++) {
      var c = CHAPTERS[i];
      html += '<option value="' + c.n + '"' + (c.available ? '' : ' disabled') + (c.n === DEFAULT_CHAPTER ? ' selected' : '') + '>' +
        c.label + (c.available ? '' : ' (скоро)') + '</option>';
    }
    els.chapterSelect.innerHTML = html;
    els.chapterSelect.addEventListener('change', function () {
      loadChapter(els.chapterSelect.value);
    });
  }


  function cleanText(s) {
    if (!s) return '';
    var t = String(s);
    t = t.replace(/\\[A-Za-z][A-Za-z0-9]?/g, '');
    t = t.replace(/\^\d/g, '');
    t = t.replace(/`/g, '');
    t = t.replace(/&/g, '\n');
    t = t.replace(/\/%+/g, '').replace(/\/(?=\s*$)/g, '');
    t = t.replace(/%+\s*$/g, '');
    t = t.replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n');
    return t.trim();
  }

  function cleanForTable(s) {
    var t = cleanText(s);
    if (!t) return '';
    return t.replace(/\s+/g, ' ').trim();
  }

  function normForDup(s) {
    if (!s) return '';
    return String(s).normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function wordRe(w) { return new RegExp('\\b' + w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b'); }


  function condInfo(c, vars) {
    var flags = {};
    collectFlags(c, flags);
    for (var vn in vars) {
      if (!Object.prototype.hasOwnProperty.call(vars, vn)) continue;
      if (wordRe(vn).test(c)) vars[vn].forEach(function (f) { flags[f] = 1; });
    }
    var choices = [], m, re = /global\.choice\s*==\s*(\d+)/g;
    while ((m = re.exec(c))) choices.push(Number(m[1]));
    var optKey = null, bi = c.indexOf('\u0001');
    if (bi >= 0) optKey = c.slice(bi + 1);
    return { flags: Object.keys(flags).map(Number).sort(function (a, b) { return a - b; }), choices: choices, optKey: optKey };
  }

  function flagMeaning(n) {
    var FI = (typeof window !== 'undefined' && window.__FLAGINFO) || {};
    return FI[n] || '';
  }
  function flagFull(n) {
    var F = (typeof window !== 'undefined' && window.__FLAGFULL) || {};
    return F[n] || null;
  }
  function flagBulb(n) {
    if (!flagFull(n)) return '';
    return '<button type="button" class="flag-bulb" data-flagdoc="' + n + '" title="Полное описание флага ' + n + '" aria-label="Полное описание флага"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg></button>';
  }
  function closeFlagDoc() { var ov = document.getElementById('flagdocOverlay'); if (ov) { ov.style.display = 'none'; ov.innerHTML = ''; } }
  function openFlagDoc(n) {
    var f = flagFull(n); if (!f) return;
    var h = '<div class="flagdoc-card"><button class="flagdoc-x" type="button" aria-label="Закрыть">×</button>';
    h += '<h3><img src="../save-editor/game-sprites/spr_heart_0.png" alt="">Флаг ' + n + (f.name ? ' <span class="flagdoc-code">' + escapeHtml(f.name) + '</span>' : '') + '</h3>';
    if (f.d) h += '<p class="flagdoc-d">' + escapeHtml(f.d) + '</p>';
    if (f.v) { h += '<div class="flagdoc-sect"><div class="flagdoc-h">Значения</div><ul class="flagdoc-vals">'; Object.keys(f.v).forEach(function (k) { h += '<li><b>' + escapeHtml(k) + '</b> — ' + escapeHtml(f.v[k]) + '</li>'; }); h += '</ul></div>'; }
    else if (f.mn != null || f.mx != null) { h += '<div class="flagdoc-sect"><div class="flagdoc-h">Диапазон</div><div class="flagdoc-vals">от ' + (f.mn != null ? f.mn : '?') + ' до ' + (f.mx != null ? f.mx : '?') + '</div></div>'; }
    if (f.obs && f.obs.length) h += '<div class="flagdoc-sect"><div class="flagdoc-h">Встречаются значения (из кода)</div><div class="flagdoc-obs">' + f.obs.map(escapeHtml).join(', ') + '</div></div>';
    if (f.det) h += '<div class="flagdoc-sect"><div class="flagdoc-h">Подробно</div><div class="flagdoc-det">' + escapeHtml(f.det) + '</div></div>';
    h += '</div>';
    var ov = document.getElementById('flagdocOverlay');
    if (!ov) { ov = document.createElement('div'); ov.id = 'flagdocOverlay'; ov.className = 'flagdoc-overlay'; document.body.appendChild(ov); ov.addEventListener('click', function (e) { if (e.target === ov) closeFlagDoc(); }); }
    ov.innerHTML = h; ov.style.display = 'flex';
    var x = ov.querySelector('.flagdoc-x'); if (x) x.addEventListener('click', closeFlagDoc);
  }
  document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('.flag-bulb'); if (b) { e.preventDefault(); e.stopPropagation(); openFlagDoc(Number(b.getAttribute('data-flagdoc'))); } });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { var ov = document.getElementById('flagdocOverlay'); if (ov && ov.style.display !== 'none') { e.stopImmediatePropagation(); closeFlagDoc(); } } });
  function optText(key) {
    var row = key && (keyText[key] || dlgText[key]);
    if (!row) return '';
    var t = cleanText(row[1]) || cleanText(row[2]);
    return t.replace(/#/g, ' ').replace(/\s*\n\s*/g, ' ').replace(/\s{2,}/g, ' ').trim();
  }

  function condLabel(c, vars) {
    var info = condInfo(c, vars);
    if (!info.flags.length && !info.choices.length) return null;
    var parts = [];
    if (info.choices.length) {
      var ot = optText(info.optKey);
      info.choices.forEach(function (n) {
        var fallback = ot || choicesLookup(n);
        parts.push(fallback ? ('выбор игрока: «' + fallback + '»') : ('выбор игрока: значение ' + n));
      });
    }
    if (info.flags.length) {
      var bare = c.split('\u0001')[0];
      var sm = bare.match(/^\s*(?:global\.flag\[|scr_flag_get\()\s*(\d+)\s*[\])]?\s*(==|!=|>=|<=|>|<)\s*(-?\d+(?:\.\d+)?)\s*$/);
      if (sm) {
        var mean = flagMeaning(sm[1]);
        parts.push('флаг ' + sm[1] + (mean ? ' — ' + mean : '') + (sm[2] === '==' ? ' = ' : ' ' + sm[2] + ' ') + sm[3]);
      } else {
        info.flags.forEach(function (f) { var m2 = flagMeaning(f); parts.push('флаг ' + f + (m2 ? ' — ' + m2 : '')); });
      }
    }
    return parts.join(' · ');
  }

  function filterChain(cond, vars) {
    var out = [];
    (cond || []).forEach(function (c) { var l = condLabel(c, vars); if (l) out.push(l); });
    return out;
  }

  function collectFlags(text, set) {
    var m, re = /(?:global\.flag\[|scr_flag_get\()\s*(\d+)/g;
    while ((m = re.exec(text))) set[m[1]] = set[m[1]] || '';
  }

  function renderAffects(cond, vars) {
    var flags = {}, choiceOpts = {};
    (cond || []).forEach(function (c) {
      var info = condInfo(c, vars);
      info.flags.forEach(function (f) {
        var direct = new RegExp('(?:global\\.flag\\[|scr_flag_get\\()\\s*' + f + '\\b').test(c);
        if (!direct && flags[f] === undefined) {
          for (var vn in vars) { if (Object.prototype.hasOwnProperty.call(vars, vn) && wordRe(vn).test(c) && vars[vn].indexOf(f) >= 0) { flags[f] = 'через ' + vn; break; } }
        }
        if (flags[f] === undefined) flags[f] = '';
      });
      if (info.choices.length) { var ot = optText(info.optKey); info.choices.forEach(function (n) { if (choiceOpts[n] === undefined || (!choiceOpts[n] && ot)) choiceOpts[n] = ot || ''; }); }
    });
    var chips = [];
    Object.keys(flags).sort(function (a, b) { return a - b; }).forEach(function (f) {
      var mean = flagMeaning(f);
      var via = flags[f] ? ' <small style="opacity:.7">(' + escapeHtml(flags[f]) + ')</small>' : '';
      chips.push('<span class="aff-chip flag">Флаг ' + f + (mean ? ' — ' + escapeHtml(mean) : '') + via + flagBulb(f) + '</span>');
    });
    Object.keys(choiceOpts).sort(function (a, b) { return a - b; }).forEach(function (n) {
      var ot = choiceOpts[n];
      chips.push('<span class="aff-chip choice">Выбор игрока: ' + (function () { var fb = ot || choicesLookup(Number(n)); return fb ? '«' + escapeHtml(fb) + '»' : 'значение ' + n; })() + '</span>');
    });
    if (!chips.length) chips.push('<span class="aff-chip none">Без условий-выборов — показывается всегда</span>');
    return chips.join('');
  }

  function opLabel(op, val) {
    var o = op === '==' ? '=' : op === '!=' ? '≠' : op === '>=' ? '≥' : op === '<=' ? '≤' : op;
    return o + ' ' + val;
  }
  function opWords(op, val) {
    if (op === '==') return 'равен ' + val;
    if (op === '!=') return 'не равен ' + val;
    if (op === '>=') return val + ' или больше';
    if (op === '<=') return val + ' или меньше';
    if (op === '>') return 'больше ' + val;
    if (op === '<') return 'меньше ' + val;
    return op + ' ' + val;
  }
  function flagValueLabel(flagNum, op, val) {
    var f = flagFull(flagNum); if (!f || !f.v) return null;
    if (op === '==' && f.v[val]) return f.v[val];
    if (op === '>=' && f.v[val]) return f.v[val];
    if (op === '<=' && f.v[val]) return f.v[val];
    if (op === '>') { var vn = String(Number(val) + 1); if (f.v[vn]) return f.v[vn]; }
    if (op === '<') { var vp = String(Number(val) - 1); if (f.v[vp]) return f.v[vp]; }
    if (op === '!=') {
      var others = Object.keys(f.v).filter(function (k) { return k !== String(val); });
      if (others.length === 1 && f.v[others[0]]) return f.v[others[0]];
      if (others.length > 1 && others.length <= 4) {
        var lbls = others.map(function (k) { return f.v[k]; }).filter(Boolean);
        if (lbls.length === others.length) return lbls.join(' / ');
      }
    }
    if (op === '==' && val === '0' && f.v['0']) return f.v['0'];
    return null;
  }
  function flagHeadParen(head) {
    var m = head.match(/^Флаг (\d+) — (.+)$/);
    if (m) return 'Флаг ' + m[1] + ' («' + m[2] + '»)';
    return head;
  }

  function gateSentence(kind, head, item) {
    if (kind === 'choice') {
      if (/иначе|другой/i.test(item.value)) return 'Показывается при другом выборе игрока';
      if (/^значение\s/i.test(item.value)) return 'Показывается при одном из выборов игрока (' + item.value + ')';
      return 'Показывается, если игрок выбрал ' + item.value;
    }
    if (kind === 'flag' && item.op) {
      var vl = item.flagNum != null ? flagValueLabel(item.flagNum, item.op, item.val) : null;
      if (vl) return flagHeadParen(head) + ': ' + vl;
      return 'Показывается, только если ' + flagHeadParen(head) + ' ' + opWords(item.op, item.val);
    }
    if (kind === 'flag' && !item.op) {
      return 'Показывается при определённом значении ' + flagHeadParen(head);
    }
    if (kind === 'cond' && item.op && /^Зависит от /.test(head)) {
      var vname = head.replace(/^Зависит от /, '');
      return 'Показывается, только если ' + vname + ' ' + opWords(item.op, item.val);
    }
    if (/^иначе$/i.test(item.value || '')) return 'Показывается в остальных случаях (' + head + ')';
    return 'Показывается, только если: ' + head;
  }
  function humanizeCondShort(c) {
    var s = String(c || '').split('\u0001')[0].trim();
    if (!s) return '';
    s = s.replace(/global\.flag\[(\d+)\]/g, 'флаг $1').replace(/scr_flag_get\(\s*(\d+)\s*\)/g, 'флаг $1');
    s = s.replace(/global\./g, '').replace(/scr_/g, '');
    s = s.replace(/\s*==\s*/g, ' = ').replace(/\s*!=\s*/g, ' ≠ ').replace(/\s*>=\s*/g, ' ≥ ').replace(/\s*<=\s*/g, ' ≤ ');
    s = s.replace(/\s*&&\s*/g, ', ').replace(/\s*\|\|\s*/g, ' или ');
    s = s.replace(/\s+/g, ' ').trim();
    if (s.length > 80) s = s.slice(0, 77) + '…';
    return s;
  }
  var currentStateNum = null;
  function choicesLookup(choiceVal, contextLine) {
    if (typeof window === 'undefined' || !window.__CHOICES || !currentUnitObj) return null;
    var menus = window.__CHOICES[currentUnitObj];
    if (!menus || !menus.length) return null;
    if (currentStateNum != null) {
      for (var k = 0; k < menus.length; k++) {
        if (menus[k].state === currentStateNum && menus[k].opts && menus[k].opts[choiceVal]) {
          return menus[k].opts[choiceVal];
        }
      }
    }
    var best = null;
    for (var i = 0; i < menus.length; i++) {
      var m = menus[i];
      if (contextLine == null || m.at <= contextLine) {
        if (!best || m.at > best.at) best = m;
      }
    }
    if (!best) best = menus[menus.length - 1];
    return (best && best.opts && best.opts[choiceVal]) || null;
  }
  function firstLineOf(branch) {
    var minLine = Infinity;
    function scan(b) {
      (b.lines || []).forEach(function (n) {
        var m = n.key && n.key.match(/_gml_(\d+)_\d+/);
        if (m) { var L = Number(m[1]); if (L < minLine) minLine = L; }
      });
      (b.children || []).forEach(scan);
    }
    scan(branch);
    return isFinite(minLine) ? minLine : null;
  }
  function nodeHasText(n) {
    var row = keyText[n.key] || dlgText[n.key];
    var en = row ? cleanText(row[1]) : (n.en != null ? cleanText(n.en) : '');
    var ja = row ? cleanText(row[2]) : (n.ja != null ? cleanText(n.ja) : '');
    return !!(en || ja);
  }
  function branchHasText(b) {
    if (!b) return false;
    if ((b.lines || []).some(nodeHasText)) return true;
    return (b.children || []).some(branchHasText);
  }
  function decisionOf(c, vars) {
    var info = condInfo(c, vars);
    if (info.choices.length) {
      var ot = optText(info.optKey);
      if (!ot) ot = choicesLookup(info.choices[0]);
      return { groupKey: 'choice', kind: 'choice', head: 'Выбор игрока', value: ot ? '«' + ot + '»' : ('значение ' + info.choices[0]) };
    }
    var bare = c.split('\u0001')[0];
    var sm = bare.match(/^\s*(?:global\.flag\[|scr_flag_get\()\s*(\d+)\s*[\])]?\s*(==|!=|>=|<=|>|<)\s*(-?\d+(?:\.\d+)?)\s*$/);
    if (sm) {
      var mean = flagMeaning(sm[1]);
      return { groupKey: 'flag:' + sm[1], kind: 'flag', head: 'Флаг ' + sm[1] + (mean ? ' — ' + mean : ''), value: opLabel(sm[2], sm[3]), op: sm[2], val: sm[3] };
    }
    var bf = bare.match(/^\s*(!?)\s*(?:global\.flag\[|scr_flag_get\()\s*(\d+)\s*[\])]?\s*$/);
    if (bf) {
      var bop = bf[1] === '!' ? '==' : '!=';
      var bmean = flagMeaning(bf[2]);
      return { groupKey: 'flag:' + bf[2], kind: 'flag', head: 'Флаг ' + bf[2] + (bmean ? ' — ' + bmean : ''), value: opLabel(bop, '0'), op: bop, val: '0' };
    }
    if (info.flags.length === 1 && !info.choices.length) {
      var fid = info.flags[0];
      var vmean = flagMeaning(fid);
      var directRe = new RegExp('(?:global\\.flag\\[|scr_flag_get\\()\\s*' + fid + '\\s*[\\])]?\\s*(==|!=|>=|<=|>|<)\\s*(-?\\d+(?:\\.\\d+)?)');
      var dm = bare.match(directRe);
      if (dm) {
        var rest = bare.replace(directRe, '').replace(/^\s*(&&|\|\|)\s*/, '').replace(/\s*(&&|\|\|)\s*$/, '').trim();
        var restLabel = rest ? humanizeCondShort(rest) : '';
        return {
          groupKey: 'flag:' + fid + (rest ? '|' + bare : ''),
          kind: 'flag', head: 'Флаг ' + fid + (vmean ? ' — ' + vmean : ''),
          value: opLabel(dm[1], dm[2]) + (restLabel ? ' (' + restLabel + ')' : ''),
          op: dm[1], val: dm[2]
        };
      }
      for (var vn in vars) {
        if (!Object.prototype.hasOwnProperty.call(vars, vn)) continue;
        if ((vars[vn] || []).indexOf(fid) < 0) continue;
        var vre = new RegExp('\\b' + vn + '\\s*(==|!=|>=|<=|>|<)\\s*(-?\\d+(?:\\.\\d+)?)');
        var vmm = bare.match(vre);
        if (vmm) {
          return {
            groupKey: 'flag:' + fid,
            kind: 'flag', head: 'Флаг ' + fid + (vmean ? ' — ' + vmean : ''),
            value: opLabel(vmm[1], vmm[2]),
            op: vmm[1], val: vmm[2]
          };
        }
      }
      return {
        groupKey: 'flag:' + fid + '|' + bare, kind: 'flag',
        head: 'Флаг ' + fid + (vmean ? ' — ' + vmean : ''),
        value: humanizeCondShort(bare), op: null, val: null
      };
    }
    var humLab = humanizeCondShort(bare);
    var varOp = bare.match(/^\s*(!?)\s*([A-Za-z_]\w*(?:\.\w+)*)\s*(==|!=|>=|<=|>|<)\s*(-?\d+(?:\.\d+)?)\s*$/);
    if (varOp && !varOp[1] && !/^global\.choice/.test(varOp[2])) {
      var vname = varOp[2];
      return {
        groupKey: 'var:' + vname,
        kind: 'cond',
        head: 'Зависит от ' + vname,
        value: opLabel(varOp[3], varOp[4]),
        op: varOp[3],
        val: varOp[4]
      };
    }
    return { groupKey: 'cond:' + bare, kind: 'cond', head: condLabel(c, vars) || humLab, value: humLab || 'выполнено' };
  }

  function splitCond(c) {
    var opt = '', bi = c.indexOf('\u0001');
    if (bi >= 0) { opt = c.slice(bi); c = c.slice(0, bi); }
    var parts = [], depth = 0, cur = '';
    for (var i = 0; i < c.length; i++) {
      var ch = c[i];
      if (ch === '(') depth++;
      else if (ch === ')') depth--;
      if (depth === 0 && ch === '&' && c[i + 1] === '&') { parts.push(cur.trim()); cur = ''; i++; continue; }
      cur += ch;
    }
    if (cur.trim()) parts.push(cur.trim());

    parts = parts.filter(function (p) { return p && !/^(?:global\.flag\[\d+\]|scr_flag_get\(\s*\d+\s*\))\s*>=\s*0$/.test(p); });
    if (opt) { for (var j = 0; j < parts.length; j++) { if (/global\.choice/.test(parts[j])) { parts[j] += opt; break; } } }
    return parts;
  }


  function isFlattenable(c) {
    var bare = (c || '').split('\u0001')[0].trim();
    if (/^!?d_ex\(\)$/.test(bare)) return true;
    if (/^!?i_ex\b/.test(bare)) return true;
    if (/^global\.interact\s*(==|!=)\s*-?\d+$/.test(bare)) return true;
    if (/^global\.choice\s*!=\s*-1$/.test(bare)) return true;
    if (/^!?instance_exists/.test(bare)) return true;
    if (/^global\.(bmenuno|batstate|spellphase|specialbattle|bturn)\s*(==|!=|>=|<=|>|<)\s*-?\d+$/.test(bare)) return true;
    if (/^[A-Za-z_]\w*con\s*(==|!=|>=|<=|>|<)\s*-?[\d.]+$/.test(bare)) return true;
    if (/^(myinteract|talked|interact)\s*(==|!=|>=|<=|>|<)\s*-?[\d.]+$/.test(bare)) return true;
    return false;
  }

  function buildTree(nodes, vars) {
    var root = { children: [], map: {}, lines: [], firstIdx: Infinity, lastIdx: -1 };
    nodes.forEach(function (node, idx) {
      node._idx = idx;
      var conds = [];
      (node.cond || []).forEach(function (c) { splitCond(c).forEach(function (p) { if (!isFlattenable(p)) conds.push(p); }); });
      var cur = root;
      if (idx < cur.firstIdx) cur.firstIdx = idx;
      if (idx > cur.lastIdx) cur.lastIdx = idx;
      conds.forEach(function (c) {
        if (!cur.map[c]) { var ch = { cond: c, children: [], map: {}, lines: [], firstIdx: idx, lastIdx: idx }; cur.map[c] = ch; cur.children.push(ch); }
        cur = cur.map[c];
        if (idx < cur.firstIdx) cur.firstIdx = idx;
        if (idx > cur.lastIdx) cur.lastIdx = idx;
      });
      cur.lines.push(node);
    });
    return root;
  }

  function lineBoxHTML(node, focusKey) {
    var row = keyText[node.key] || dlgText[node.key];
    var en = row ? cleanText(row[1]) : (node.en != null ? cleanText(node.en) : '');
    var ja = row ? cleanText(row[2]) : (node.ja != null ? cleanText(node.ja) : '');
    var here = node.key === focusKey;
    return '<div class="fbox"><div class="dlg-line' + (here ? ' here' : '') + '">' +
      (node.speaker ? '<div class="spk">' + escapeHtml(node.speaker) + '</div>' : '') +
      '<div class="en">' + (en ? escapeHtml(en) : '<span class="empty-cell">—</span>') + '</div>' +
      (ja ? '<div class="ja">' + escapeHtml(ja) + '</div>' : '') +
      '<div class="kid">' + escapeHtml(node.key) + '</div></div></div>';
  }

  function plural(n, one, few, many) {
    var m = Math.abs(n) % 100, m2 = m % 10;
    if (m > 10 && m < 20) return many;
    if (m2 > 1 && m2 < 5) return few;
    if (m2 === 1) return one;
    return many;
  }


  function charRu(n) { return ({ kris: 'Крис', susie: 'Сьюзи', ralsei: 'Ральзей', noelle: 'Ноэль' })[n] || n; }
  function roomRu(rn) {
    var world = '';
    if (/^dw_/.test(rn)) { world = 'Мир тьмы'; rn = rn.slice(3); }
    else if (/^lw_/.test(rn)) { world = 'Мир света'; rn = rn.slice(3); }
    rn = rn.replace(/_/g, ' ').trim();
    return world ? (world + ' — ' + rn) : rn;
  }
  function humanizeCond(c) {
    c = c.split('\u0001')[0].trim();
    if (/^!?d_ex\(\)$/.test(c)) return null;
    if (/^global\.interact\s*==\s*0$/.test(c)) return null;
    if (/^global\.choice\s*!=\s*-1$/.test(c)) return null;
    if (/^!?instance_exists/.test(c)) return null;
    var m;
    if (m = c.match(/^room\s*(==|!=)\s*(?:room_)?(\w+)/)) return { label: (m[1] === '!=' ? 'Не в комнате: ' : 'В комнате: ') + roomRu(m[2]), meaningful: true };
    if (m = c.match(/^(?:[A-Za-z_]\w*\.)?(x|y)\s*(<=|>=|<|>|==)\s*(-?\d+)/)) return { label: 'В определённом месте комнаты', meaningful: true };
    if (m = c.match(/global\.chapter\s*(==|>=|<=|>|<)\s*(\d+)/)) return { label: 'Глава ' + m[1] + ' ' + m[2], meaningful: true };
    if (/scr_sideb_active\(\)/.test(c)) return { label: 'Weird Route активен', meaningful: true };
    if (/scr_sideb_get_phase/.test(c)) return { label: 'Weird Route (по фазе)', meaningful: true };
    if (m = c.match(/scr_havechar\(\s*"(\w+)"/)) return { label: charRu(m[1]) + ' в отряде', meaningful: true };
    if (m = c.match(/sprite_index\s*==\s*(?:spr_)?(\w+)/)) return { label: 'Осматриваешь: ' + m[1].replace(/^dw_|^lw_/, '').replace(/_/g, ' ').trim(), meaningful: true };
    if (m = c.match(/^(con|customcon|myinteract|talked|tempcon)\s*(==|>=|<=|>|<)\s*([\d.]+)/)) return { label: 'Состояние ' + m[3], meaningful: false };
    var cl = c.replace(/global\./g, '').replace(/scr_flag_get\((\d+)\)/g, 'флаг $1').replace(/scr_/g, '').replace(/\s+/g, ' ').trim();
    return { label: cl, meaningful: false };
  }

  function collapseLabeled(item, vars) {
    var labels = [item.h.label], cur = item.branch;
    while (cur.lines.length === 0) {
      var tr = [], grp = false;
      cur.children.forEach(function (ch) { var i = condInfo(ch.cond, vars); if (i.flags.length || i.choices.length) grp = true; else tr.push(ch); });
      if (grp || tr.length !== 1) break;
      var h = humanizeCond(tr[0].cond);
      if (!h) { cur = tr[0]; continue; }
      if (!h.meaningful) break;
      labels.push(h.label); cur = tr[0];
    }
    var uniq = [];
    labels.forEach(function (l) { if (uniq.indexOf(l) < 0) uniq.push(l); });
    return { label: uniq.join(' · '), branch: cur };
  }

  function renderInner(branch, focusKey, vars) {
    var html = '';
    var childMin = Infinity, childMax = -1;
    branch.children.forEach(function (ch) {
      if (ch.firstIdx != null && ch.firstIdx < childMin) childMin = ch.firstIdx;
      if (ch.lastIdx != null && ch.lastIdx > childMax) childMax = ch.lastIdx;
    });
    var preLines = [], postLines = [];
    branch.lines.forEach(function (n) {
      if (branch.children.length && n._idx != null && n._idx > childMax) postLines.push(n);
      else preLines.push(n);
    });
    preLines.forEach(function (n) { html += lineBoxHTML(n, focusKey); });
    var groups = [], gmap = {}, transparent = [];
    var lastGroup = null;
    var menuSeq = 0;
    branch.children.forEach(function (ch) {
      var info = condInfo(ch.cond, vars);
      if (info.flags.length || info.choices.length) {
        var d = decisionOf(ch.cond, vars);
        if (d.kind === 'choice' && /^значение /.test(d.value)) {
          var line = firstLineOf(ch);
          var ot2 = choicesLookup(info.choices[0], line);
          if (ot2) d.value = '«' + ot2 + '»';
        }
        var gk = d.groupKey;
        if (d.kind === 'choice' && gmap[gk] && gmap[gk].items.some(function (x) { return /иначе|другой/i.test(x.value || ''); })) {
          menuSeq++;
          gk = 'choice#' + menuSeq;
        }
        if (!gmap[gk]) { gmap[gk] = { head: d.head, kind: d.kind, flag: (d.kind === 'flag' ? Number(d.groupKey.slice(5)) : (info.flags.length ? info.flags[0] : null)), items: [] }; groups.push(gmap[gk]); }
        gmap[gk].items.push({ value: d.value, op: d.op, val: d.val, flagNum: gmap[gk].flag, branches: [ch] });
        lastGroup = gmap[gk];
      } else {
        var bareCond = (ch.cond || '').split('\u0001')[0].trim();
        var vc = bareCond.match(/^([A-Za-z_]\w*(?:\.\w+)*)\s*(==|!=|>=|<=|>|<)\s*(-?\d+(?:\.\d+)?)\s*$/);
        if (vc && !/^global\.(choice|flag)\b/.test(vc[1]) && !/con$/.test(vc[1]) && vc[1] !== 'myinteract' && vc[1] !== 'talked') {
          var vgk = 'var:' + vc[1];
          if (!gmap[vgk]) { gmap[vgk] = { head: 'Зависит от ' + vc[1], kind: 'cond', flag: null, items: [] }; groups.push(gmap[vgk]); }
          gmap[vgk].items.push({ value: opLabel(vc[2], vc[3]), op: vc[2], val: vc[3], branches: [ch] });
          lastGroup = gmap[vgk];
          return;
        }
        if (bareCond === 'иначе' && lastGroup) {
          var hasElse = lastGroup.items.some(function (x) { return /иначе|другой/i.test(x.value || ''); });
          if (!hasElse) {
            lastGroup.items.push({ value: lastGroup.kind === 'choice' ? 'другой вариант' : 'иначе', branches: [ch] });
          } else {
            transparent.push(ch);
          }
          lastGroup = null;
        } else {
          transparent.push(ch);
          lastGroup = null;
        }
      }
    });


    groups.forEach(function (g) {
      if (g.kind === 'choice') return;
      g.items = g.items.filter(function (it) {
        return it.synthetic || (it.branches || []).some(branchHasText);
      });
    });
    groups = groups.filter(function (g) {
      if (g.kind === 'choice') return true;
      return g.items.some(function (it) { return !it.synthetic && (it.branches || []).some(branchHasText); });
    });

    groups.forEach(function (g) {
      if (g.kind !== 'flag') return;
      var eq = {};
      g.items.forEach(function (it) { if (it.op === '==') eq[it.val] = it; });
      var keep = [];
      g.items.forEach(function (it) {
        if (it.op === '!=') {
          var others = Object.keys(eq).filter(function (v) { return v !== String(it.val); });
          if (others.length === 1) { var tgt = eq[others[0]]; it.branches.forEach(function (b) { tgt.branches.push(b); }); return; }
        }
        if (it.op === '>=' || it.op === '>') {
          var thr = it.op === '>=' ? Number(it.val) : Number(it.val) + 1;
          var ff = g.flag != null ? flagFull(g.flag) : null;
          var hasDistinct = !!(ff && ff.v && ff.v[String(thr)]);
          var multipleEqVals = Object.keys(eq).length >= 2;
          if (thr > 0 && !hasDistinct && !multipleEqVals) {
            var keys = Object.keys(eq).map(Number);
            var target = null;
            if (eq[String(thr - 1)]) target = eq[String(thr - 1)];
            else if (eq[String(thr)]) target = eq[String(thr)];
            else {
              var lower = keys.filter(function (v) { return v < thr; }).sort(function (a, b) { return b - a; });
              if (lower.length) target = eq[String(lower[0])];
            }
            if (target) { it.branches.forEach(function (b) { target.branches.push(b); }); return; }
          }
        }
        if (it.op === '<=' || it.op === '<') {
          var thr2 = it.op === '<=' ? Number(it.val) : Number(it.val) - 1;
          var ff2 = g.flag != null ? flagFull(g.flag) : null;
          var hasDistinct2 = !!(ff2 && ff2.v && ff2.v[String(thr2)]);
          var multipleEqVals2 = Object.keys(eq).length >= 2;
          if (!hasDistinct2 && !multipleEqVals2) {
            var keys2 = Object.keys(eq).map(Number);
            var target2 = null;
            if (eq[String(thr2 + 1)]) target2 = eq[String(thr2 + 1)];
            else if (eq[String(thr2)]) target2 = eq[String(thr2)];
            else {
              var higher = keys2.filter(function (v) { return v > thr2; }).sort(function (a, b) { return a - b; });
              if (higher.length) target2 = eq[String(higher[0])];
            }
            if (target2) { it.branches.forEach(function (b) { target2.branches.push(b); }); return; }
          }
        }
        keep.push(it);
      });
      g.items = keep;
    });
    groups.forEach(function (g) {
      if (g.kind !== 'flag' || g.flag == null) return;
      var ff = flagFull(g.flag);
      if (!ff || !ff.v) return;
      var docKeys = Object.keys(ff.v);
      if (!docKeys.length || docKeys.length > 8) return;
      var coveredVals = {};
      g.items.forEach(function (it) {
        if (it.op === '==') coveredVals[String(it.val)] = true;
        if (/^-?\d+$/.test(it.val)) {
          var n = Number(it.val);
          docKeys.forEach(function (vk) {
            if (!/^-?\d+$/.test(vk)) return;
            var dn = Number(vk);
            if (it.op === '>=' && dn >= n) coveredVals[vk] = true;
            else if (it.op === '>' && dn > n) coveredVals[vk] = true;
            else if (it.op === '<=' && dn <= n) coveredVals[vk] = true;
            else if (it.op === '<' && dn < n) coveredVals[vk] = true;
            else if (it.op === '!=' && dn !== n) coveredVals[vk] = true;
          });
        }
        if (it.flagNum != null && it.op && it.op !== '!=') {
          var lab = flagValueLabel(it.flagNum, it.op, it.val);
          if (lab) {
            docKeys.forEach(function (vk) { if (ff.v[vk] === lab) coveredVals[vk] = true; });
          }
        }
      });
      var added = [];
      docKeys.forEach(function (vk) {
        if (coveredVals[vk]) return;
        added.push({ value: opLabel('==', vk), op: '==', val: vk, flagNum: g.flag, branches: [], synthetic: true });
      });
      if (added.length) {
        g.items = g.items.concat(added).sort(function (a, b) {
          var av = (a.op === '==' && /^-?\d+$/.test(a.val)) ? Number(a.val) : 9999;
          var bv = (b.op === '==' && /^-?\d+$/.test(b.val)) ? Number(b.val) : 9999;
          return av - bv;
        });
      }
    });
    var forkKids = [], flowKids = [];
    transparent.forEach(function (ch) {
      var h = humanizeCond(ch.cond);
      if (h && h.meaningful && branchHasText(ch)) forkKids.push({ h: h, branch: ch });
      else flowKids.push(ch);
    });
    flowKids.forEach(function (ch) { html += renderInner(ch, focusKey, vars); });
    if (forkKids.length) {
      var items = forkKids.map(function (it) { return collapseLabeled(it, vars); });
      if (items.length === 1) {
        html += '<div class="fbox decision gate fork-state"><span class="fork-ic"></span><span class="fork-title">Показывается, только если: ' + escapeHtml(items[0].label) + '</span></div>';
        html += '<div class="flow gate-flow">' + renderInner(items[0].branch, focusKey, vars) + '</div>';
      } else {
        html += '<div class="fbox decision fork-state"><span class="fork-ic"></span><span class="fork-title">Зависит от ситуации</span><span class="fork-n">' + items.length + ' ' + plural(items.length, 'ветка', 'ветки', 'веток') + '</span></div>';
        html += '<ul class="kids fork-state">';
        items.forEach(function (it) {
          html += '<li><div class="kid-label">' + escapeHtml(it.label) + '</div><div class="flow">' + renderInner(it.branch, focusKey, vars) + '</div></li>';
        });
        html += '</ul>';
      }
    }
    groups.forEach(function (g) {
      var n = g.items.length;
      if (n === 1) {
        var it1 = g.items[0], body1 = '';
        it1.branches.forEach(function (b) { body1 += renderInner(b, focusKey, vars); });
        html += '<div class="fbox decision gate fork-' + g.kind + '"><span class="fork-ic"></span><span class="fork-title">' + escapeHtml(gateSentence(g.kind, g.head, it1)) + '</span>' + (g.flag ? flagBulb(g.flag) : '') + '</div>';
        html += '<div class="flow gate-flow">' + (body1 || '<div class="col-end">Ветка заканчивается после выбора</div>') + '</div>';
        return;
      }
      var cnt = g.kind === 'choice' ? plural(n, 'вариант', 'варианта', 'вариантов') : plural(n, 'ветка', 'ветки', 'веток');
      var htitle = g.kind === 'flag' ? escapeHtml(flagHeadParen(g.head)) + ' — что показывается при разных значениях' : escapeHtml(g.head);
      html += '<div class="fbox decision fork-' + g.kind + '"><span class="fork-ic"></span><span class="fork-title">' + htitle + '</span>' + (g.flag ? flagBulb(g.flag) : '') + '<span class="fork-n">' + n + ' ' + cnt + '</span></div>';
      html += '<ul class="kids fork-' + g.kind + '">';
      g.items.forEach(function (it) {
        var body = '';
        it.branches.forEach(function (b) { body += renderInner(b, focusKey, vars); });
        var lab;
        if (g.kind === 'flag' && it.op) {
          var vd = g.flag != null ? flagValueLabel(g.flag, it.op, it.val) : null;
          lab = vd || ('значение ' + opLabel(it.op, it.val));
        } else { lab = it.value; }
        var emptyMsg = it.synthetic
          ? '<div class="col-end synthetic">Нет особого диалога в этой ветке — далее общее продолжение</div>'
          : '<div class="col-end">Ветка заканчивается после выбора</div>';
        html += '<li><div class="kid-label' + (it.synthetic ? ' synthetic' : '') + '">' + escapeHtml(lab) + '</div><div class="flow">' + (body || emptyMsg) + '</div></li>';
      });
      html += '</ul>';
    });
    if (postLines.length && branch.children.length) {
      html += '<div class="post-merge-bar"><span>Далее (общий поток)</span></div>';
    }
    postLines.forEach(function (n) { html += lineBoxHTML(n, focusKey); });
    return html;
  }

  function stateVarOf(unit) {
    var cnt = {};
    function scan(conds) {
      (conds || []).forEach(function (c) {
        var bare = c.split('\u0001')[0];
        var re = /\b([A-Za-z_]\w*)\s*==/g;
        var m;
        while ((m = re.exec(bare))) {
          var name = m[1];
          if (/con$/.test(name) || name === 'myinteract' || name === 'talked') {
            cnt[name] = (cnt[name] || 0) + 1;
          }
        }
      });
    }
    (unit.nodes || []).forEach(function (n) { scan(n.cond); });
    (unit.consets || []).forEach(function (s) { scan(s.cond); });
    var best = null, bn = 0;
    for (var v in cnt) {
      if (cnt[v] > bn || (cnt[v] === bn && v === 'con')) {
        bn = cnt[v]; best = v;
      }
    }
    return bn >= 2 ? best : null;
  }
  function splitStateCond(cond, sv) {
    var st = null, rest = [];
    var re = new RegExp('^' + sv + '\\s*==\\s*(-?\\d+(?:\\.\\d+)?)$');
    (cond || []).forEach(function (c) {
      splitCond(c).forEach(function (atom) {
        var bare = atom.split('\u0001')[0].trim();
        var m = bare.match(re);
        if (m) st = Number(m[1]); else rest.push(atom);
      });
    });
    return { state: st, rest: rest };
  }
  function buildStateGraph(unit, sv) {
    var states = {};
    function ensure(v) { if (!states[v]) states[v] = { lines: [], exits: [] }; return states[v]; }
    (unit.nodes || []).forEach(function (n) {
      var s = splitStateCond(n.cond, sv);
      var key = s.state == null ? '__root' : s.state;
      ensure(key).lines.push({ key: n.key, speaker: n.speaker, en: n.en, ja: n.ja, cond: s.rest });
    });
    (unit.consets || []).forEach(function (cs) {
      if (cs.var !== sv) return;
      var s = splitStateCond(cs.cond, sv);
      var from = s.state == null ? '__root' : s.state;
      ensure(from).exits.push({ to: cs.to, guard: s.rest });
    });
    return states;
  }
  function exitGuardKind(guard, vars) {
    for (var i = 0; i < guard.length; i++) {
      var c = guard[i];
      var bare = c.split('\u0001')[0];
      var info = condInfo(c, vars);
      if (info.choices.length) return { kind: 'choice', val: info.choices[0], optKey: info.optKey };
      var sm = bare.match(/^\s*(?:global\.flag\[|scr_flag_get\()\s*(\d+)\s*[\])]?\s*(==|!=|>=|<=|>|<)\s*(-?\d+)\s*$/);
      if (sm) return { kind: 'flag', f: Number(sm[1]), op: sm[2], val: sm[3] };
    }
    for (var j = guard.length - 1; j >= 0; j--) {
      var bj = guard[j].split('\u0001')[0].trim();
      if (!bj) continue;
      if (bj === 'иначе') return { kind: 'cond', isElse: true, distinct: null };
      if (/^global\.choice\b/.test(bj)) continue;
      if (isFlattenable(bj)) continue;
      return { kind: 'cond', isElse: false, distinct: bj };
    }
    return null;
  }
  function copyVisited(v) { var o = {}; for (var k in v) o[k] = 1; return o; }
  function stateHasText(states, N, seen) {
    seen = seen || {};
    if (seen[N]) return false; seen[N] = 1;
    var st = states[N]; if (!st) return false;
    if ((st.lines || []).some(nodeHasText)) return true;
    return (st.exits || []).some(function (e) { return e.to !== -1 && e.to !== 0 && stateHasText(states, e.to, seen); });
  }
  function forkHTML(kind, head, n, items) {
    var cnt = kind === 'choice' ? plural(n, 'вариант', 'варианта', 'вариантов') : plural(n, 'ветка', 'ветки', 'веток');
    var h = '<div class="fbox decision fork-' + kind + '"><span class="fork-ic"></span><span class="fork-title">' + escapeHtml(head) + '</span><span class="fork-n">' + n + ' ' + cnt + '</span></div>';
    h += '<ul class="kids fork-' + kind + '">';
    items.forEach(function (it) {
      h += '<li><div class="kid-label">' + escapeHtml(it.label) + '</div><div class="flow">' + (it.body || '<div class="col-end">Ветка заканчивается после выбора</div>') + '</div></li>';
    });
    h += '</ul>';
    return h;
  }
  function renderStateBody(state, focusKey, vars) {
    if (!state || !state.lines.length) return '';
    var nodes = state.lines.map(function (l) { return { key: l.key, speaker: l.speaker, en: l.en, ja: l.ja, cond: l.cond }; });
    return renderInner(buildTree(nodes, vars), focusKey, vars);
  }
  function renderStateNode(N, states, sv, focusKey, vars, path, rendered, depth) {
    if (path[N] || depth > 80) return '';

    if (rendered[N]) {
      var stx = states[N] || {};
      var lc = (stx.lines || []).filter(nodeHasText).length;
      return '<div class="post-merge-bar"><span>Общее продолжение (состояние ' + N +
        (lc ? ', ' + lc + ' ' + plural(lc, 'строка', 'строки', 'строк') : '') + ') — показано выше</span></div>';
    }
    path[N] = 1; rendered[N] = 1;
    var st = states[N];
    if (!st) return '';
    var prevState = currentStateNum;
    currentStateNum = (typeof N === 'number') ? N : null;
    var html = renderStateBody(st, focusKey, vars);
    currentStateNum = prevState;
    var choiceExits = [], flagGroups = {}, flagOrder = [], condExits = [], plain = [];
    (st.exits || []).forEach(function (e) {
      if (e.to === -1) return;
      var g = exitGuardKind(e.guard, vars);
      if (!g) { plain.push(e); return; }

      if ((g.kind === 'flag' || g.kind === 'cond') && !stateHasText(states, e.to)) return;
      if (g.kind === 'choice') choiceExits.push({ e: e, g: g });
      else if (g.kind === 'flag') { var fk = 'flag:' + g.f; if (!flagGroups[fk]) { flagGroups[fk] = { f: g.f, items: [] }; flagOrder.push(fk); } flagGroups[fk].items.push({ e: e, g: g }); }
      else condExits.push({ e: e, g: g });
    });
    if (choiceExits.length) {
      var ct = {}; choiceExits.forEach(function (x) { ct[x.e.to] = 1; });
      if (Object.keys(ct).length === 1) { plain.push({ to: choiceExits[0].e.to }); choiceExits = []; }
    }
    flagOrder = flagOrder.filter(function (fk) {
      var grp = flagGroups[fk], ft = {}; grp.items.forEach(function (x) { ft[x.e.to] = 1; });
      if (Object.keys(ft).length === 1) { plain.push({ to: grp.items[0].e.to }); return false; }
      return true;
    });
    if (condExits.length) {
      var dt = {}; condExits.forEach(function (x) { dt[x.e.to] = 1; });
      if (Object.keys(dt).length === 1) { plain.push({ to: condExits[0].e.to }); condExits = []; }
    }
    if (choiceExits.length) {
      rendered.__f = (rendered.__f || 0) + 1;
      html += forkHTML('choice', 'Выбор игрока', choiceExits.length, choiceExits.map(function (x) {
        var ot = optText(x.g.optKey);
        if (!ot) ot = choicesLookup(x.g.val);
        var lab = ot ? '«' + ot + '»' : 'значение ' + x.g.val;
        return { label: lab, body: renderStateNode(x.e.to, states, sv, focusKey, vars, copyVisited(path), rendered, depth + 1) };
      }));
    }
    flagOrder.forEach(function (fk) {
      var grp = flagGroups[fk];
      var mean = flagMeaning(grp.f);
      rendered.__f = (rendered.__f || 0) + 1;
      html += forkHTML('flag', 'Флаг ' + grp.f + (mean ? ' — ' + mean : ''), grp.items.length, grp.items.map(function (x) {
        return { label: opLabel(x.g.op, x.g.val), body: renderStateNode(x.e.to, states, sv, focusKey, vars, copyVisited(path), rendered, depth + 1) };
      }));
    });
    if (condExits.length) {
      rendered.__f = (rendered.__f || 0) + 1;
      var elseSeenC = 0;
      html += forkHTML('cond', 'Развилка по условию', condExits.length, condExits.map(function (x) {
        var lab;
        if (x.g.isElse) { elseSeenC++; lab = elseSeenC > 1 ? ('иначе (' + elseSeenC + ')') : 'иначе'; }
        else lab = x.g.distinct ? ('если: ' + humanizeCondShort(x.g.distinct)) : 'условие выполнено';
        return { label: lab, body: renderStateNode(x.e.to, states, sv, focusKey, vars, copyVisited(path), rendered, depth + 1) };
      }));
    }
    plain.forEach(function (e) { html += renderStateNode(e.to, states, sv, focusKey, vars, path, rendered, depth + 1); });
    return html;
  }
  function renderGraph(unit, focusKey) {
    var vars = unit.vars || {};
    var sv = stateVarOf(unit);
    if (!sv) return null;
    var states = buildStateGraph(unit, sv);
    var keys = Object.keys(states).filter(function (k) { return k !== '__root'; });
    if (!keys.length) return null;
    var targets = {};
    keys.forEach(function (k) { states[k].exits.forEach(function (e) { if (e.to !== -1 && e.to !== 0) targets[e.to] = 1; }); });
    if (states['__root']) states['__root'].exits.forEach(function (e) { if (e.to !== -1 && e.to !== 0) targets[e.to] = 1; });
    var html = '', path = {}, rendered = {};
    if (states['__root']) html += renderStateNode('__root', states, sv, focusKey, vars, path, rendered, 0);
    var roots = keys.map(Number).filter(function (v) { return !targets[v] && !rendered[v]; }).sort(function (a, b) { return a - b; });
    if (!roots.length) { roots = keys.map(Number).filter(function (v) { return !rendered[v]; }); if (!roots.length) roots = [Math.min.apply(null, keys.map(Number))]; }
    function entryMarker(stateNum) {
      var st = states[stateNum] || {};
      var lcount = (st.lines || []).length;
      var hint = lcount ? ' (' + lcount + ' ' + plural(lcount, 'строка', 'строки', 'строк') + ' диалога)' : '';
      return '<div class="entry-bar"><span class="entry-bar-ic"></span><span class="entry-bar-title">Альтернативная точка входа · состояние ' + stateNum + '</span><span class="entry-bar-sub">' + hint + '</span></div>';
    }
    function hasContent(stateNum, seen) {
      if (!seen) seen = {};
      if (seen[stateNum]) return false;
      seen[stateNum] = 1;
      var st = states[stateNum];
      if (!st) return false;
      if (st.lines && st.lines.length) return true;
      return (st.exits || []).some(function (e) { return e.to !== -1 && e.to !== 0 && hasContent(e.to, seen); });
    }
    roots.forEach(function (r) {
      if (rendered[r]) return;
      if (hasContent(r)) html += entryMarker(r);
      html += renderStateNode(r, states, sv, focusKey, vars, path, rendered, 0);
    });
    keys.map(Number).sort(function (a, b) { return a - b; }).forEach(function (v) {
      if (!rendered[v] && states[v].lines.length) {
        html += entryMarker(v);
        html += renderStateNode(v, states, sv, focusKey, vars, {}, rendered, 0);
      }
    });
    if (!rendered.__f) return null;
    return html || null;
  }

  function renderBranches(unit, focusKey) {
    var nodes = unit.nodes || [];
    var vars = unit.vars || {};
    if (!nodes.length) return '<div class="dlg-empty">Для этой строки нет реконструированного диалога.</div>';
    var g = renderGraph(unit, focusKey);
    if (g) return '<div class="flow">' + g + '</div>';
    return '<div class="flow">' + renderInner(buildTree(nodes, vars), focusKey, vars) + '</div>';
  }

  function setApplies(setCond, lineCond) {
    var a = setCond || [], b = lineCond || [], n = Math.min(a.length, b.length);
    for (var i = 0; i < n; i++) if (a[i] !== b[i]) return false;
    return true;
  }
  function renderEffects(focusNode, unit) {
    var sets = (unit && unit.sets) || [];
    if (!sets.length) return '';
    var lc = focusNode ? (focusNode.cond || []) : [];
    var seen = {}, chips = [];
    sets.forEach(function (s) {
      if (!setApplies(s.cond, lc)) return;
      var k = s.f + '=' + s.v;
      if (seen[k]) return; seen[k] = 1;
      var mean = flagMeaning(s.f);
      chips.push('<span class="aff-chip set">Флаг ' + s.f + (mean ? ' — ' + escapeHtml(mean) : '') + ' <b>= ' + escapeHtml(s.v) + '</b></span>');
    });
    return chips.join('');
  }

  function deriveUnitId(key) {
    var i = key.indexOf('_slash_');
    if (i < 0) return null;
    var obj = key.slice(0, i);
    var rest = key.slice(i + 7).replace(/_gml_\d+_\d+.*$/, '').replace(/_+$/, '');
    if (!rest || rest === obj) return 'gml_GlobalScript_' + obj;
    return 'gml_Object_' + obj + '_' + rest;
  }
  function resolveUnitId(key) {
    if (curDlg && curDlg.keyToUnit && curDlg.keyToUnit[key]) return curDlg.keyToUnit[key];
    var d = deriveUnitId(key);
    if (d && curDlg && curDlg.units && curDlg.units[d]) return d;
    return null;
  }
  function singleLineHTML(key) {
    var row = keyText[key] || dlgText[key];
    var en = row ? cleanText(row[1]) : '';
    var ja = row ? cleanText(row[2]) : '';
    return '<div class="flow"><div class="fbox"><div class="dlg-line here">' +
      '<div class="en">' + (en ? escapeHtml(en) : '<span class="empty-cell">—</span>') + '</div>' +
      (ja ? '<div class="ja">' + escapeHtml(ja) + '</div>' : '') +
      '<div class="kid">' + escapeHtml(key) + '</div></div></div></div>';
  }

  function mscOf(cond) {
    var arr = cond || [], m;
    for (var i = 0; i < arr.length; i++) { m = arr[i].split('\u0001')[0].match(/(?:global\.msc|arg0|argument0)\s*==\s*(\d+)/); if (m) return m[1]; }
    return null;
  }

  function openDialog(key) {
    if (!curDlg) return;
    var unitId = resolveUnitId(key);
    var unit = unitId ? curDlg.units[unitId] : null;
    currentUnitObj = unit ? unit.obj : null;
    var focus = null;
    if (unit) { for (var i = 0; i < unit.nodes.length; i++) { if (unit.nodes[i].key === key) { focus = unit.nodes[i]; break; } } }

    if (unit) {

      var renderUnit = unit, mscN = focus ? mscOf(focus.cond) : null, scoped = false;
      if (mscN != null) {
        var sub = unit.nodes.filter(function (n) { return mscOf(n.cond) === mscN; });
        if (sub.length && sub.length < unit.nodes.length) {
          renderUnit = { obj: unit.obj, ev: unit.ev, vars: unit.vars, sets: unit.sets, consets: unit.consets, nodes: sub };
          scoped = true;
        }
      }
      els.dlgObj.textContent = unit.obj || unitId;
      els.dlgEv.textContent = unit.ev ? unit.ev.replace(/_/g, ' ') : '';
      els.dlgMeta.textContent = renderUnit.nodes.length + ' строк диалога' + (scoped ? ' (реплика msc ' + mscN + ')' : ' в этом блоке') + ' · ' + unitId;
      els.dlgAffects.innerHTML = renderAffects(focus ? focus.cond : [], unit.vars || {});
      var effects = renderEffects(focus, unit);
      els.dlgEffects.innerHTML = effects;
      els.dlgEffectsWrap.hidden = !effects;
      var body = renderBranches(renderUnit, key);
      if (!focus) {
        body = '<div class="dlg-note">Эта строка не размечена как отдельная реплика в коде — показан весь диалог объекта; искомая строка:</div>' + singleLineHTML(key) + body;
      }
      els.dlgBody.innerHTML = body;
      var pmb = els.dlgBody.querySelectorAll('.post-merge-bar');
      for (var i = 0; i < pmb.length; i++) {
        var prev = pmb[i].previousElementSibling;
        if (prev && prev.tagName === 'UL' && prev.classList.contains('kids')) prev.classList.add('kids-merge');
      }
    } else {
      var di = deriveUnitId(key) || key;
      els.dlgObj.textContent = di.replace(/^gml_(Object|GlobalScript)_/, '');
      els.dlgEv.textContent = '';
      els.dlgMeta.textContent = 'Отдельная строка · ' + key;
      els.dlgAffects.innerHTML = '<span class="aff-chip none">Без условий-выборов</span>';
      els.dlgEffects.innerHTML = '';
      els.dlgEffectsWrap.hidden = true;
      els.dlgBody.innerHTML = '<div class="dlg-note">Эта строка не входит в реконструированный диалог (системная/служебная строка, меню или текст без кода в этой главе).</div>' + singleLineHTML(key);
    }
    els.dlgModal.hidden = false;
    document.body.style.overflow = 'hidden';
    setTimeout(function () {
      var h = els.dlgBody.querySelector('.dlg-line.here');
      if (h) h.scrollIntoView({ block: 'center' });
    }, 0);
  }

  function closeDialog() {
    els.dlgModal.hidden = true;
    document.body.style.overflow = '';
  }

  els.tbody.addEventListener('click', function (e) {
    var objBtn = e.target.closest('.obj-btn');
    if (objBtn) {
      e.preventDefault();
      var obj = objBtn.getAttribute('data-obj');
      if (!obj) return;
      els.q.value = obj;
      state.q = obj;
      state.scope.a = true;
      var scopeLabel = els.scopeChips.querySelector('label[data-scope="a"]');
      if (scopeLabel) {
        scopeLabel.classList.add('on');
        var box = scopeLabel.querySelector('input');
        if (box) box.checked = true;
      }
      state.mode.regex = false;
      state.mode.word = false;
      var regexLabel = els.modeChips.querySelector('label[data-mode="regex"]');
      if (regexLabel) {
        regexLabel.classList.remove('on');
        var rb = regexLabel.querySelector('input');
        if (rb) rb.checked = false;
      }
      var wordLabel = els.modeChips.querySelector('label[data-mode="word"]');
      if (wordLabel) {
        wordLabel.classList.remove('on');
        var wb = wordLabel.querySelector('input');
        if (wb) wb.checked = false;
      }
      applyFilter();
      var ts = document.querySelector('.table-scroll');
      if (ts) ts.scrollTop = 0;
      return;
    }
    var badge = e.target.closest('.dlg-btn');
    if (!badge) return;
    var tr = badge.closest('tr');
    if (!tr) return;
    var key = tr.getAttribute('data-key');
    if (key) openDialog(key);
  });
  els.dlgClose.addEventListener('click', closeDialog);
  els.dlgModal.addEventListener('click', function (e) { if (e.target === els.dlgModal) closeDialog(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !els.dlgModal.hidden) closeDialog(); });

  buildChapterSelect();

  var saved = loadSaved();
  if (saved && saved.chapter) {
    restoring = true;
    state.q = saved.q || '';
    state.scope = Object.assign({ a: true, b: true, c: true }, saved.scope || {});
    state.cols = Object.assign({ a: true, b: true, c: true }, saved.cols || {});
    state.mode = Object.assign(state.mode, saved.mode || {});
    state.condFlags = saved.condFlags || [];
    state.weirdRoute = !!saved.weirdRoute;
    state.perPage = saved.perPage || 100;
    savedPage = saved.page || 1;
    savedScroll = saved.scroll || 0;
    if (els.q) els.q.value = state.q;
    if (els.perPage) els.perPage.value = String(state.perPage);
    if (els.flagCond) els.flagCond.value = (state.condFlags || []).join(' ');
    syncChipUI();
    var wl0 = document.querySelector('label[data-cond="weird"]');
    if (wl0) { wl0.classList.toggle('on', state.weirdRoute); var wb0 = wl0.querySelector('input'); if (wb0) wb0.checked = state.weirdRoute; }
    if (els.chapterSelect) els.chapterSelect.value = String(saved.chapter);
    applyColumns();
    loadChapter(saved.chapter);
  } else {
    applyColumns();
    loadChapter(DEFAULT_CHAPTER);
  }

  (function () {
    var ts = document.querySelector('.table-scroll');
    if (ts) ts.addEventListener('scroll', doSave, { passive: true });
    window.addEventListener('pagehide', function () { if (!restoring) saveState(); });
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden' && !restoring) saveState(); });
  })();
})();
