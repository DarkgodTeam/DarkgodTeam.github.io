(function () {
  'use strict';

  var STORE_KEY = 'combined-dump-search-state-v1';
  var WALLPAPER_KEY = 'combined-dump-wallpaper-dim-v1';
  var state = {
    q: '',
    chapters: { 1:true, 2:true, 3:true, 4:true, 5:true },
    columns: { utEn:true, utJa:true, drEn:true, drJa:true },
    sameOnly: false,
    page: 1,
    perPage: 100
  };
  var records = [];
  var ready = false;
  var currentPairs = [];
  var currentCounts = { ut:0, dr:0 };
  var exactPairs = [];
  var els = {
    query: document.getElementById('query'),
    clearQuery: document.getElementById('clearQuery'),
    reset: document.getElementById('reset'),
    chapterChips: document.getElementById('chapterChips'),
    columnChips: document.getElementById('columnChips'),
    sameLinesWrap: document.getElementById('sameLinesWrap'),
    sameLines: document.getElementById('sameLines'),
    sameLinesCount: document.getElementById('sameLinesCount'),
    status: document.getElementById('status'),
    perPage: document.getElementById('perPage'),
    results: document.getElementById('results'),
    pager: document.getElementById('pager')
  };
  els.wallpaperToggle = document.getElementById('wallpaperToggle');

  function setWallpaperDim(dimmed, saveChoice) {
    document.documentElement.classList.toggle('wallpaper-dim', dimmed);
    els.wallpaperToggle.setAttribute('aria-pressed', dimmed ? 'true' : 'false');
    els.wallpaperToggle.textContent = dimmed ? 'Убрать затемнение' : 'Затемнить обои';
    if (saveChoice) try { localStorage.setItem(WALLPAPER_KEY, dimmed ? '1' : '0'); } catch (_) {}
  }

  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (char) {
      return { '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char];
    });
  }

  function escapeRegex(value) {
    return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function cleanText(value) {
    if (!value) return '';
    var text = String(value);
    var literals = [];
    function protect(char) {
      var token = '\uE000' + literals.length + '\uE001';
      literals.push(char);
      return token;
    }
    text = text.replace(/`([%#\/&\uFF05])/g, function (_, char) { return protect(char); });
    text = text.replace(/(^|[\s"'])#(?=\d)/g, function (_, prefix) { return prefix + protect('#'); });
    text = text.replace(/\\[Ee]~\d+/g, '');
    text = text.replace(/\\[A-Za-z][A-Za-z0-9]?/g, '');
    text = text.replace(/\^\d+(?:\.\d+)?/g, '').replace(/\^,/g, '').replace(/`/g, '');
    text = text.replace(/&/g, '\n').replace(/#/g, '\n');
    text = text.replace(/\/%+/g, '').replace(/\/(?=\s*$)/g, '');
    text = text.replace(/%{2,}\s*$/g, '').replace(/(^|[^\d])%\s*$/g, '$1');
    text = text.replace(/^[ \t]*(?:[*\uFF0A][ \t]*)+/gm, '');
    text = text.replace(/[ \t]+\n/g, '\n').replace(/\n[ \t]+/g, '\n').replace(/\n{3,}/g, '\n\n');
    text = text.replace(/\uE000(\d+)\uE001/g, function (_, index) { return literals[Number(index)] || ''; });
    return text.trim();
  }

  function normalize(value) {
    return String(value || '').normalize('NFKC').toLowerCase().replace(/\s+/g, ' ').trim();
  }

  function normalizeSameEnglish(value) {
    var text = normalize(value).replace(/(?:\.{2,}|\u2025+|\u2026+|\u30FB{2,})/g, '').replace(/\s+/g, ' ').trim();
    var meaningful = text.match(/[\p{L}\p{N}]/gu) || [];
    return meaningful.length >= 2 ? text : '';
  }

  function makeRecord(game, chapter, row) {
    var en = cleanText(row[1]);
    var ja = cleanText(row[2]);
    return {
      game: game,
      chapter: chapter || 0,
      key: String(row[0] || ''),
      en: en,
      ja: ja,
      enNorm: normalize(en),
      sameEnNorm: normalizeSameEnglish(en),
      jaNorm: normalize(ja),
      keyNorm: normalize(row[0])
    };
  }

  function addRows(game, chapter, rows) {
    for (var i = 0; i < rows.length; i++) records.push(makeRecord(game, chapter, rows[i]));
  }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      var script = document.createElement('script');
      script.src = src;
      script.onload = function () { resolve(script); };
      script.onerror = function () { reject(new Error('Не удалось загрузить ' + src)); };
      document.body.appendChild(script);
    });
  }

  function setLoading(text) {
    els.status.className = 'loading';
    els.status.textContent = text;
  }

  function loadUndertale() {
    setLoading('Загрузка UNDERTALE…');
    window.__UT_DUMP = null;
    return loadScript('../dump-text-undertale/dump.js?v=20260714-teams1').then(function () {
      var rows = (window.__UT_DUMP && window.__UT_DUMP.rows) || [];
      addRows('ut', 0, rows);
      window.__UT_DUMP = null;
    });
  }

  function loadDeltaruneChapter(chapter) {
    setLoading('Загрузка DELTARUNE · Глава ' + chapter + ' из 5…');
    window.__DUMP = null;
    return loadScript('../dump-text/chapters/ch' + chapter + '/dump.js').then(function () {
      var rows = (window.__DUMP && window.__DUMP.rows) || [];
      addRows('dr', chapter, rows);
      window.__DUMP = null;
    });
  }

  function loadAll() {
    var chain = loadUndertale();
    for (var chapter = 1; chapter <= 5; chapter++) {
      (function (number) { chain = chain.then(function () { return loadDeltaruneChapter(number); }); })(chapter);
    }
    return chain;
  }

  function save() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify({ q:state.q, chapters:state.chapters, columns:state.columns, sameOnly:state.sameOnly, page:state.page, perPage:state.perPage }));
    } catch (_) {}
  }

  function restore() {
    try {
      var saved = JSON.parse(localStorage.getItem(STORE_KEY) || 'null');
      if (!saved) return;
      state.q = saved.q || '';
      state.chapters = Object.assign(state.chapters, saved.chapters || {});
      state.columns = Object.assign(state.columns, saved.columns || {});
      state.sameOnly = !!saved.sameOnly;
      state.page = Number(saved.page) || 1;
      state.perPage = [50,100,250,500].indexOf(Number(saved.perPage)) !== -1 ? Number(saved.perPage) : 100;
    } catch (_) {}
  }

  function syncControls() {
    els.query.value = state.q;
    els.perPage.value = String(state.perPage);
    els.chapterChips.querySelectorAll('[data-chapter]').forEach(function (chip) {
      var on = !!state.chapters[chip.getAttribute('data-chapter')];
      chip.classList.toggle('on', on);
      chip.querySelector('input').checked = on;
    });
    els.columnChips.querySelectorAll('[data-column]').forEach(function (chip) {
      var on = !!state.columns[chip.getAttribute('data-column')];
      chip.classList.toggle('on', on);
      chip.querySelector('input').checked = on;
    });
    syncSameLinesControl();
    applyColumnVisibility();
  }

  function syncSameLinesControl() {
    if (!ready && !exactPairs.length) {
      els.sameLinesWrap.hidden = true;
      els.sameLines.setAttribute('aria-pressed', state.sameOnly ? 'true' : 'false');
      return;
    }
    var available = exactPairs.length >= 10;
    if (!available) state.sameOnly = false;
    els.sameLinesWrap.hidden = !available;
    els.sameLines.setAttribute('aria-pressed', state.sameOnly ? 'true' : 'false');
    els.sameLinesCount.textContent = available ? '· ' + exactPairs.length.toLocaleString('ru-RU') : '';
  }

  function applyColumnVisibility() {
    var map = { utEn:'col-ut-en', utJa:'col-ut-ja', drEn:'col-dr-en', drJa:'col-dr-ja' };
    Object.keys(map).forEach(function (key) {
      document.querySelectorAll('.' + map[key]).forEach(function (cell) { cell.classList.toggle('hidden-col', !state.columns[key]); });
    });
  }

  function recordScore(record, query) {
    var fields = [];
    if (record.game === 'ut') {
      if (state.columns.utEn) fields.push(record.enNorm);
      if (state.columns.utJa) fields.push(record.jaNorm);
    } else {
      if (state.columns.drEn) fields.push(record.enNorm);
      if (state.columns.drJa) fields.push(record.jaNorm);
    }
    fields.push(record.keyNorm);
    var best = 99;
    for (var i = 0; i < fields.length; i++) {
      var value = fields[i];
      if (!value) continue;
      if (value === query) best = Math.min(best, 0);
      else if (value.indexOf(query) === 0) best = Math.min(best, 1);
      else if (value.indexOf(' ' + query) !== -1 || value.indexOf('\n' + query) !== -1) best = Math.min(best, 2);
      else if (value.indexOf(query) !== -1) best = Math.min(best, 3);
    }
    return best;
  }

  function pairMatches(undertale, deltarune) {
    var buckets = Object.create(null);
    var used = new Set();
    var unmatchedUndertale = [];
    deltarune.forEach(function (item, index) {
      if (!item.record.enNorm) return;
      if (!buckets[item.record.enNorm]) buckets[item.record.enNorm] = [];
      buckets[item.record.enNorm].push({ item:item, index:index });
    });
    var pairs = [];
    undertale.forEach(function (item) {
      var bucket = item.record.enNorm && buckets[item.record.enNorm];
      var match = bucket && bucket.length ? bucket.shift() : null;
      if (match) {
        used.add(match.index);
        pairs.push({ ut:item.record, dr:match.item.record, score:Math.min(item.score, match.item.score), sort:item.record.enNorm || item.record.jaNorm });
      } else unmatchedUndertale.push(item);
    });
    var unmatchedDeltarune = [];
    deltarune.forEach(function (item, index) {
      if (!used.has(index)) unmatchedDeltarune.push(item);
    });
    unmatchedUndertale.sort(function (a, b) { return a.score - b.score || (a.record.enNorm || a.record.jaNorm).localeCompare(b.record.enNorm || b.record.jaNorm, 'en'); });
    unmatchedDeltarune.sort(function (a, b) { return a.score - b.score || (a.record.enNorm || a.record.jaNorm).localeCompare(b.record.enNorm || b.record.jaNorm, 'en'); });
    var looseCount = Math.max(unmatchedUndertale.length, unmatchedDeltarune.length);
    for (var looseIndex = 0; looseIndex < looseCount; looseIndex++) {
      var utItem = unmatchedUndertale[looseIndex] || null;
      var drItem = unmatchedDeltarune[looseIndex] || null;
      pairs.push({
        ut:utItem ? utItem.record : null,
        dr:drItem ? drItem.record : null,
        score:Math.min(utItem ? utItem.score : 99, drItem ? drItem.score : 99),
        sort:(utItem && (utItem.record.enNorm || utItem.record.jaNorm)) || (drItem && (drItem.record.enNorm || drItem.record.jaNorm)) || ''
      });
    }
    pairs.sort(function (a, b) {
      if (a.score !== b.score) return a.score - b.score;
      var textOrder = a.sort.localeCompare(b.sort, 'en');
      if (textOrder) return textOrder;
      if (!!a.ut !== !!b.ut) return a.ut ? -1 : 1;
      return ((a.dr && a.dr.chapter) || 0) - ((b.dr && b.dr.chapter) || 0);
    });
    return pairs;
  }

  function rebuildExactPairs() {
    var buckets = Object.create(null);
    var used = Object.create(null);
    var pairs = [];
    var i;
    for (i = 0; i < records.length; i++) {
      var dr = records[i];
      if (dr.game !== 'dr' || !state.chapters[dr.chapter] || !dr.sameEnNorm) continue;
      if (!buckets[dr.sameEnNorm]) buckets[dr.sameEnNorm] = dr;
    }
    for (i = 0; i < records.length; i++) {
      var ut = records[i];
      if (ut.game !== 'ut' || !ut.sameEnNorm) continue;
      if (used[ut.sameEnNorm]) continue;
      var match = buckets[ut.sameEnNorm];
      if (!match) continue;
      used[ut.sameEnNorm] = true;
      pairs.push({ ut:ut, dr:match, score:0, sort:ut.sameEnNorm });
    }
    pairs.sort(function (a, b) {
      var textOrder = a.sort.localeCompare(b.sort, 'en');
      if (textOrder) return textOrder;
      return a.dr.chapter - b.dr.chapter;
    });
    exactPairs = pairs;
    syncSameLinesControl();
  }

  function buildResults() {
    var query = normalize(state.q);
    currentCounts = { ut:0, dr:0 };
    if (state.sameOnly) {
      currentPairs = exactPairs.map(function (pair) {
        var score = query ? Math.min(recordScore(pair.ut, query), recordScore(pair.dr, query)) : 0;
        return { ut:pair.ut, dr:pair.dr, score:score, sort:pair.sort };
      }).filter(function (pair) { return pair.score !== 99; });
      currentPairs.sort(function (a, b) {
        if (a.score !== b.score) return a.score - b.score;
        var textOrder = a.sort.localeCompare(b.sort, 'en');
        if (textOrder) return textOrder;
        return a.dr.chapter - b.dr.chapter;
      });
      currentCounts = { ut:currentPairs.length, dr:currentPairs.length };
      return;
    }
    if (!query) { currentPairs = []; return; }
    var undertale = [];
    var deltarune = [];
    var showUt = state.columns.utEn || state.columns.utJa;
    var showDr = state.columns.drEn || state.columns.drJa;
    for (var i = 0; i < records.length; i++) {
      var record = records[i];
      if (record.game === 'ut' && !showUt) continue;
      if (record.game === 'dr' && (!showDr || !state.chapters[record.chapter])) continue;
      var score = recordScore(record, query);
      if (score === 99) continue;
      if (record.game === 'ut') { undertale.push({ record:record, score:score }); currentCounts.ut++; }
      else { deltarune.push({ record:record, score:score }); currentCounts.dr++; }
    }
    currentPairs = pairMatches(undertale, deltarune);
  }

  function highlight(value) {
    var text = String(value || '');
    if (!text) return '<span class="empty-cell">—</span>';
    var query = state.q.trim();
    var safe = escapeHtml(text);
    if (query) {
      try {
        var regex = new RegExp(escapeRegex(escapeHtml(query)), 'gi');
        safe = safe.replace(regex, function (match) { return '<mark>' + match + '</mark>'; });
      } catch (_) {}
    }
    return safe.replace(/\n/g, '<br>');
  }

  function cellMeta(record) {
    if (!record) return '';
    if (record.game === 'ut') return '<div class="cell-meta"><code>' + escapeHtml(record.key) + '</code></div>';
    return '<div class="cell-meta"><span class="chapter-badge">ГЛАВА ' + record.chapter + '</span><code>' + escapeHtml(record.key) + '</code></div>';
  }

  function resultCell(record, language, classes) {
    return '<td class="' + classes + '">' + (record ? cellMeta(record) + highlight(record[language]) : '<span class="empty-cell">—</span>') + '</td>';
  }

  function renderPager(pages) {
    if (pages <= 1) { els.pager.innerHTML = ''; return; }
    var list = [1, state.page - 2, state.page - 1, state.page, state.page + 1, state.page + 2, pages];
    var seen = Object.create(null), previous = 0, html = '<button class="page-btn" data-page="' + (state.page - 1) + '"' + (state.page === 1 ? ' disabled' : '') + '>‹</button>';
    list.sort(function (a, b) { return a - b; }).forEach(function (page) {
      if (page < 1 || page > pages || seen[page]) return;
      seen[page] = true;
      if (previous && page > previous + 1) html += '<span class="page-btn">…</span>';
      html += '<button class="page-btn' + (page === state.page ? ' current' : '') + '" data-page="' + page + '">' + page + '</button>';
      previous = page;
    });
    html += '<button class="page-btn" data-page="' + (state.page + 1) + '"' + (state.page === pages ? ' disabled' : '') + '>›</button>';
    els.pager.innerHTML = html;
  }

  function render() {
    applyColumnVisibility();
    if (!ready) return;
    if (!state.q.trim() && !state.sameOnly) {
      els.status.className = '';
      els.status.textContent = '';
      els.results.innerHTML = '<tr><td colspan="4" class="empty-result">Начните вводить английскую или японскую фразу.</td></tr>';
      els.pager.innerHTML = '';
      return;
    }
    buildResults();
    var total = currentPairs.length;
    var pages = Math.max(1, Math.ceil(total / state.perPage));
    state.page = Math.max(1, Math.min(state.page, pages));
    var start = (state.page - 1) * state.perPage;
    var end = Math.min(total, start + state.perPage);
    els.status.className = '';
    els.status.innerHTML = state.sameOnly
      ? 'Одинаковых строк: <b>' + total.toLocaleString('ru-RU') + '</b>' + (total ? ' · показаны ' + (start + 1).toLocaleString('ru-RU') + '–' + end.toLocaleString('ru-RU') : '')
      : 'Найдено: <b>' + currentCounts.ut.toLocaleString('ru-RU') + '</b> UNDERTALE + <b>' + currentCounts.dr.toLocaleString('ru-RU') + '</b> DELTARUNE' + (total ? ' · показаны ' + (start + 1).toLocaleString('ru-RU') + '–' + end.toLocaleString('ru-RU') : '');
    if (!total) {
      els.results.innerHTML = '<tr><td colspan="4" class="empty-result">Совпадений нет.</td></tr>';
      els.pager.innerHTML = '';
      save();
      return;
    }
    var html = '';
    for (var i = start; i < end; i++) {
      var pair = currentPairs[i];
      html += '<tr>' + resultCell(pair.ut, 'en', 'col-ut-en') + resultCell(pair.ut, 'ja', 'col-ut-ja') + resultCell(pair.dr, 'en', 'col-dr-en') + resultCell(pair.dr, 'ja', 'col-dr-ja') + '</tr>';
    }
    els.results.innerHTML = html;
    applyColumnVisibility();
    renderPager(pages);
    save();
  }

  function resetState() {
    state.q = '';
    state.chapters = { 1:true, 2:true, 3:true, 4:true, 5:true };
    state.columns = { utEn:true, utJa:true, drEn:true, drJa:true };
    state.sameOnly = false;
    state.page = 1;
    state.perPage = 100;
    rebuildExactPairs();
    syncControls();
    render();
    save();
  }

  var searchTimer;
  els.query.addEventListener('input', function () {
    state.q = els.query.value;
    state.page = 1;
    clearTimeout(searchTimer);
    searchTimer = setTimeout(render, 90);
  });
  els.clearQuery.addEventListener('click', function () { state.q = ''; els.query.value = ''; state.page = 1; render(); els.query.focus(); });
  els.reset.addEventListener('click', resetState);
  els.chapterChips.addEventListener('change', function (event) {
    var chip = event.target.closest('[data-chapter]');
    if (!chip) return;
    state.chapters[chip.getAttribute('data-chapter')] = event.target.checked;
    chip.classList.toggle('on', event.target.checked);
    state.page = 1;
    rebuildExactPairs();
    render();
  });
  els.columnChips.addEventListener('change', function (event) {
    var chip = event.target.closest('[data-column]');
    if (!chip) return;
    var key = chip.getAttribute('data-column');
    state.columns[key] = event.target.checked;
    if (!state.columns.utEn && !state.columns.utJa && !state.columns.drEn && !state.columns.drJa) {
      state.columns[key] = true;
      event.target.checked = true;
    }
    chip.classList.toggle('on', state.columns[key]);
    state.page = 1;
    render();
  });
  els.perPage.addEventListener('change', function () { state.perPage = Number(els.perPage.value) || 100; state.page = 1; render(); });
  els.sameLines.addEventListener('click', function () {
    if (exactPairs.length < 10) return;
    state.sameOnly = !state.sameOnly;
    state.page = 1;
    syncSameLinesControl();
    render();
  });
  els.wallpaperToggle.addEventListener('click', function () {
    setWallpaperDim(!document.documentElement.classList.contains('wallpaper-dim'), true);
  });
  els.pager.addEventListener('click', function (event) {
    var button = event.target.closest('[data-page]');
    if (!button || button.disabled) return;
    state.page = Number(button.getAttribute('data-page')) || 1;
    render();
    document.querySelector('.status').scrollIntoView({ behavior:'smooth', block:'start' });
  });
  window.addEventListener('beforeunload', save);

  restore();
  setWallpaperDim(document.documentElement.classList.contains('wallpaper-dim'), false);
  syncControls();
  loadAll().then(function () {
    ready = true;
    rebuildExactPairs();
    render();
  }).catch(function (error) {
    els.status.className = 'loading';
    els.status.textContent = error.message || 'Не удалось загрузить дампы.';
    els.results.innerHTML = '<tr><td colspan="4" class="empty-result">Ошибка загрузки данных.</td></tr>';
  });
})();
