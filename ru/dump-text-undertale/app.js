(function () {
  'use strict';

  var DATA = (window.__UT_DUMP && window.__UT_DUMP.rows) || [];
  var STORE_KEY = 'undertale-dump-paired-state-v3';
  var WALLPAPER_KEY = 'undertale-dump-wallpaper-dim-v1';
  var state = {
    q: '',
    scope: { a: true, b: true, c: true, d: true, e: true },
    cols: { a: true, b: true, c: true, d: true, e: true },
    mode: { case: false, word: false, regex: false, noUnused: false, noDup: false },
    object: '',
    objectDraft: '',
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
    objectQuery: document.getElementById('objectQuery'),
    objectQueryClear: document.getElementById('objectQueryClear'),
    objectList: document.getElementById('objectList'),
    objectApply: document.getElementById('objectApply'),
    objectClear: document.getElementById('objectClear'),
    objectActive: document.getElementById('objectActive'),
    objectMessage: document.getElementById('objectMessage'),
    wallpaperToggle: document.getElementById('wallpaperToggle')
  };
  var objectNames = [];

  function setWallpaperDim(dimmed, saveChoice) {
    document.documentElement.classList.toggle('wallpaper-dim', dimmed);
    els.wallpaperToggle.setAttribute('aria-pressed', dimmed ? 'true' : 'false');
    els.wallpaperToggle.textContent = dimmed ? 'Убрать затемнение' : 'Затемнить обои';
    if (saveChoice) try { localStorage.setItem(WALLPAPER_KEY, dimmed ? '1' : '0'); } catch (_) {}
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (ch) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[ch];
    });
  }

  function cleanText(value) {
    return String(value == null ? '' : value)
      .replace(/\\[A-Za-z<>](?:~?-?\d+)?/g, '')
      .replace(/\^(?:\d+)?/g, '')
      .replace(/\/%*$/g, '')
      .replace(/%+$/g, '')
      .replace(/&/g, '\n')
      .replace(/#/g, '\n')
      .replace(/[ \t]+\n/g, '\n')
      .trim();
  }

  function normalize(value) {
    value = String(value == null ? '' : value);
    return state.mode.case ? value : value.toLowerCase();
  }

  function normForDup(value) {
    return String(value || '').normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function objectFromKey(key) {
    key = String(key || '');
    if (!key) return '';
    return key.replace(/(?:_\d+)+(?:_[A-Za-z])?$/, '');
  }

  function syncObjectUI(message, keepInput, isError) {
    if (!keepInput) els.objectQuery.value = state.object || state.objectDraft || '';
    els.objectActive.textContent = state.object || 'Все объекты';
    els.objectActive.classList.toggle('on', !!state.object);
    els.objectClear.disabled = !state.object;
    els.objectMessage.textContent = message || (state.object ? '' : 'Выберите объект из списка.');
    els.objectMessage.classList.toggle('error', !!isError);
  }

  function buildObjectList() {
    var seen = Object.create(null);
    DATA.forEach(function (row) {
      var name = objectFromKey(row[0]);
      if (name) seen[name] = true;
    });
    objectNames = Object.keys(seen).sort(function (a, b) { return a.localeCompare(b); });
    els.objectList.innerHTML = objectNames.map(function (name) {
      return '<option value="' + escapeHtml(name) + '"></option>';
    }).join('');
    if (state.object && objectNames.indexOf(state.object) === -1) state.object = '';
    syncObjectUI();
  }

  function setObjectFilter(name) {
    state.object = name || '';
    state.objectDraft = state.object;
    syncObjectUI();
    applyFilter(true);
  }

  function applyObjectInput() {
    var value = els.objectQuery.value.trim();
    if (!value) { setObjectFilter(''); return; }
    var lower = value.toLowerCase();
    var exact = objectNames.filter(function (name) { return name.toLowerCase() === lower; });
    if (exact.length === 1) { setObjectFilter(exact[0]); return; }
    var matches = objectNames.filter(function (name) { return name.toLowerCase().indexOf(lower) !== -1; });
    if (matches.length === 1) { setObjectFilter(matches[0]); return; }
    syncObjectUI(matches.length
      ? 'Найдено объектов: ' + matches.length + '. Уточните имя и выберите вариант из списка.'
      : 'Такого объекта нет в дампе UNDERTALE.', true, true);
  }

  function buildMatcher() {
    var query = state.q;
    els.regexErr.style.display = 'none';
    if (!query) return null;
    var flags = state.mode.case ? '' : 'i';
    if (state.mode.regex) {
      try { return new RegExp(query, flags); }
      catch (error) {
        els.regexErr.style.display = 'block';
        els.regexErr.textContent = 'Ошибка Regex: ' + error.message;
        return false;
      }
    }
    if (state.mode.word) {
      var safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      return new RegExp('(^|[^A-Za-zА-Яа-яЁё0-9_])' + safe + '(?=$|[^A-Za-zА-Яа-яЁё0-9_])', flags);
    }
    return normalize(query);
  }

  function testValue(value, matcher) {
    if (!matcher) return true;
    if (matcher === false) return false;
    if (matcher instanceof RegExp) {
      matcher.lastIndex = 0;
      return matcher.test(value);
    }
    return normalize(value).indexOf(matcher) !== -1;
  }

  function rowMatches(row, matcher) {
    var id = String(row[0] || '');
    var en = cleanText(row[1]);
    var ja = cleanText(row[2]);
    var carth = cleanText(row[3]);
    var tales = cleanText(row[4]);
    var hasEnglishAndJapanese = !!(en && ja);
    var sameEnglishAndJapanese = hasEnglishAndJapanese && normForDup(en) === normForDup(ja);
    if (state.object && objectFromKey(id) !== state.object) return false;
    if (state.mode.noUnused && !hasEnglishAndJapanese) return false;
    if (state.mode.noDup && sameEnglishAndJapanese) return false;
    if (!matcher) return true;
    return (state.scope.a && testValue(id, matcher)) ||
      (state.scope.b && testValue(en + '\n' + String(row[1] || ''), matcher)) ||
      (state.scope.c && testValue(ja + '\n' + String(row[2] || ''), matcher)) ||
      (state.scope.d && testValue(carth + '\n' + String(row[3] || ''), matcher)) ||
      (state.scope.e && testValue(tales + '\n' + String(row[4] || ''), matcher));
  }

  function highlight(value) {
    var text = String(value == null ? '' : value);
    var query = state.q;
    if (!query) return escapeHtml(text).replace(/\n/g, '<br>');

    var flags = (state.mode.case ? '' : 'i') + 'g';
    var pattern;
    var wordMode = !state.mode.regex && state.mode.word;
    try {
      if (state.mode.regex) {
        pattern = new RegExp(query, flags);
      } else {
        var safe = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        pattern = wordMode
          ? new RegExp('(^|[^A-Za-zА-Яа-яЁё0-9_])(' + safe + ')(?=$|[^A-Za-zА-Яа-яЁё0-9_])', flags)
          : new RegExp(safe, flags);
      }
    } catch (_) {
      return escapeHtml(text).replace(/\n/g, '<br>');
    }

    var html = '';
    var from = 0;
    var match;
    while ((match = pattern.exec(text)) !== null) {
      var hit = wordMode ? match[2] : match[0];
      var at = match.index + (wordMode ? match[1].length : 0);
      if (!hit) {
        pattern.lastIndex += 1;
        continue;
      }
      html += escapeHtml(text.slice(from, at)) + '<mark>' + escapeHtml(hit) + '</mark>';
      from = at + hit.length;
    }
    return (html + escapeHtml(text.slice(from))).replace(/\n/g, '<br>');
  }

  function render() {
    var shown = state.filtered.length;
    var pages = Math.max(1, Math.ceil(shown / state.perPage));
    state.page = Math.max(1, Math.min(state.page, pages));
    var start = (state.page - 1) * state.perPage;
    var end = Math.min(shown, start + state.perPage);
    els.count.innerHTML = 'Найдено: <b>' + shown.toLocaleString('ru-RU') + '</b> <span class="tot">из ' + DATA.length.toLocaleString('ru-RU') +
      (shown ? ' · показаны ' + (start + 1).toLocaleString('ru-RU') + '–' + end.toLocaleString('ru-RU') : '') + '</span>';

    if (!shown) {
      els.tbody.innerHTML = '<tr><td colspan="5" class="no-results">Ничего не найдено.</td></tr>';
      els.pager.innerHTML = '';
      return;
    }

    var rows = state.filtered.slice(start, end);
    var html = '';
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var en = cleanText(row[1]);
      var ja = cleanText(row[2]);
      var carth = cleanText(row[3]);
      var tales = cleanText(row[4]);
      var objectName = objectFromKey(row[0]);
      var objectButton = objectName
        ? '<button class="row-object-btn" type="button" data-object="' + escapeHtml(objectName) + '" title="Показать всё по объекту ' + escapeHtml(objectName) + '">Всё по объекту</button>'
        : '';
      html += '<tr>' +
        '<td class="td-a' + (state.cols.a ? '' : ' hidden-col') + '"><div class="row-id-wrap"><code class="sid">' + highlight(row[0]) + '</code>' + objectButton + '</div></td>' +
        '<td class="td-b' + (state.cols.b ? '' : ' hidden-col') + '">' + (en ? highlight(en) : '<span class="empty-cell">—</span>') + '</td>' +
        '<td class="td-c' + (state.cols.c ? '' : ' hidden-col') + '">' + (ja ? highlight(ja) : '<span class="empty-cell">—</span>') + '</td>' +
        '<td class="td-d' + (state.cols.d ? '' : ' hidden-col') + '">' + (carth ? highlight(carth) : '<span class="empty-cell">—</span>') + '</td>' +
        '<td class="td-e' + (state.cols.e ? '' : ' hidden-col') + '">' + (tales ? highlight(tales) : '<span class="empty-cell">—</span>') + '</td>' +
        '</tr>';
    }
    els.tbody.innerHTML = html;
    applyColumns();
    renderPager(pages);
  }

  function renderPager(pages) {
    if (pages <= 1) { els.pager.innerHTML = ''; return; }
    var html = '<button class="page-btn" data-page="' + (state.page - 1) + '"' + (state.page === 1 ? ' disabled' : '') + '>‹</button>';
    var list = [1, state.page - 2, state.page - 1, state.page, state.page + 1, state.page + 2, pages];
    var seen = {}, previous = 0;
    list.sort(function (a, b) { return a - b; }).forEach(function (page) {
      if (page < 1 || page > pages || seen[page]) return;
      seen[page] = true;
      if (previous && page - previous > 1) html += '<span class="page-gap">…</span>';
      html += '<button class="page-btn' + (page === state.page ? ' current' : '') + '" data-page="' + page + '">' + page + '</button>';
      previous = page;
    });
    html += '<button class="page-btn" data-page="' + (state.page + 1) + '"' + (state.page === pages ? ' disabled' : '') + '>›</button>';
    els.pager.innerHTML = html;
  }

  function applyColumns() {
    var table = document.querySelector('table.dump');
    if (table) table.classList.toggle('without-id', !state.cols.a);
    var headers = document.querySelectorAll('table.dump th');
    ['a', 'b', 'c', 'd', 'e'].forEach(function (key, index) {
      if (headers[index]) headers[index].classList.toggle('hidden-col', !state.cols[key]);
    });
  }

  function applyFilter(resetPage) {
    var matcher = buildMatcher();
    state.filtered = DATA.filter(function (row) { return rowMatches(row, matcher); });
    if (resetPage !== false) state.page = 1;
    render();
    save();
  }

  function syncUI() {
    els.q.value = state.q;
    els.perPage.value = String(state.perPage);
    els.colChips.querySelectorAll('[data-col]').forEach(function (chip) {
      var on = !!state.cols[chip.getAttribute('data-col')];
      chip.classList.toggle('on', on); chip.querySelector('input').checked = on;
    });
    els.scopeChips.querySelectorAll('[data-scope]').forEach(function (chip) {
      var on = !!state.scope[chip.getAttribute('data-scope')];
      chip.classList.toggle('on', on); chip.querySelector('input').checked = on;
    });
    els.modeChips.querySelectorAll('[data-mode]').forEach(function (chip) {
      var on = !!state.mode[chip.getAttribute('data-mode')];
      chip.classList.toggle('on', on); chip.querySelector('input').checked = on;
    });
    syncObjectUI();
  }

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ q:state.q, scope:state.scope, cols:state.cols, mode:state.mode, object:state.object, objectDraft:state.objectDraft, page:state.page, perPage:state.perPage }));
    } catch (_) {}
  }

  function restore() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
      if (!saved) return;
      state.q = saved.q || '';
      state.scope = Object.assign(state.scope, saved.scope || {});
      state.cols = Object.assign(state.cols, saved.cols || {});
      var savedMode = saved.mode || {};
      if (savedMode.empty && savedMode.noUnused == null) savedMode.noUnused = true;
      state.mode = Object.assign(state.mode, savedMode);
      delete state.mode.empty;
      state.object = saved.object || '';
      state.objectDraft = saved.objectDraft || state.object;
      state.page = Number(saved.page) || 1;
      state.perPage = Number(saved.perPage) || 100;
    } catch (_) {}
  }

  var searchTimer;
  els.q.addEventListener('input', function () {
    state.q = els.q.value;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(function () { applyFilter(true); }, 80);
  });
  els.wallpaperToggle.addEventListener('click', function () {
    setWallpaperDim(!document.documentElement.classList.contains('wallpaper-dim'), true);
  });
  els.qClear.addEventListener('click', function () { els.q.value = ''; state.q = ''; applyFilter(true); els.q.focus(); });
  els.resetBtn.addEventListener('click', function () {
    state.q = '';
    state.scope = { a:true, b:true, c:true, d:true, e:true };
    state.cols = { a:true, b:true, c:true, d:true, e:true };
    state.mode = { case:false, word:false, regex:false, noUnused:false, noDup:false };
    state.object = '';
    state.objectDraft = '';
    state.page = 1;
    state.perPage = 100;
    syncUI();
    applyFilter(true);
  });
  els.colChips.addEventListener('change', function (event) {
    var chip = event.target.closest('[data-col]');
    if (!chip) return;
    state.cols[chip.getAttribute('data-col')] = event.target.checked;
    syncUI(); render(); save();
  });
  els.scopeChips.addEventListener('change', function (event) {
    var chip = event.target.closest('[data-scope]');
    if (!chip) return;
    state.scope[chip.getAttribute('data-scope')] = event.target.checked;
    syncUI(); applyFilter(true);
  });
  els.modeChips.addEventListener('change', function (event) {
    var chip = event.target.closest('[data-mode]');
    if (!chip) return;
    state.mode[chip.getAttribute('data-mode')] = event.target.checked;
    syncUI(); applyFilter(true);
  });
  els.tbody.addEventListener('click', function (event) {
    var button = event.target.closest('.row-object-btn');
    if (!button) return;
    var objectName = button.getAttribute('data-object');
    if (objectName) {
      state.q = '';
      els.q.value = '';
      setObjectFilter(objectName);
    }
  });
  els.objectApply.addEventListener('click', applyObjectInput);
  els.objectQueryClear.addEventListener('click', function () {
    els.objectQuery.value = '';
    state.objectDraft = '';
    setObjectFilter('');
    els.objectQuery.focus();
  });
  els.objectClear.addEventListener('click', function () { setObjectFilter(''); });
  els.objectQuery.addEventListener('change', function () {
    var value = els.objectQuery.value.trim().toLowerCase();
    if (objectNames.some(function (name) { return name.toLowerCase() === value; })) applyObjectInput();
  });
  els.objectQuery.addEventListener('input', function () {
    state.objectDraft = els.objectQuery.value;
    if (!els.objectQuery.value.trim() && state.object) setObjectFilter('');
    else save();
  });
  els.objectQuery.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') { event.preventDefault(); applyObjectInput(); }
  });
  els.perPage.addEventListener('change', function () { state.perPage = Number(els.perPage.value) || 100; state.page = 1; render(); save(); });
  els.pager.addEventListener('click', function (event) {
    var button = event.target.closest('[data-page]');
    if (!button || button.disabled) return;
    state.page = Number(button.getAttribute('data-page'));
    render(); save();
    window.scrollTo({ top:document.querySelector('.meta-row').offsetTop - 12, behavior:'smooth' });
  });

  window.addEventListener('beforeunload', save);

  restore();
  setWallpaperDim(document.documentElement.classList.contains('wallpaper-dim'), false);
  buildObjectList();
  syncUI();
  applyFilter(false);
})();
