(() => {
  'use strict';

  const Core = window.KnightCore;
  const I18n = window.KnightI18n || {};
  const STORE = 'ru-save-editor-state-v3';

  const ROUTES = {
    welcome:      { label: 'Главное',      desc: 'Основные параметры: имя, глава, деньги, комната, время.' },
    party:        { label: 'Команда',      desc: 'Состав команды, характеристики, экипировка, заклинания.' },
    'light-world':{ label: 'Мир света',    desc: 'Параметры Крис в Мире света, предметы и телефон.' },
    story:        { label: 'Сюжет',        desc: 'Vessel, Thrash Machine, прогресс по главам.' },
    recruits:     { label: 'В отряде',     desc: 'Завербованные враги: те, кого вы пощадили/завербовали в бою. В игре они селятся в городе Мира тьмы. «В отряде» = враг завербован.' },
    flags:        { label: 'Флаги',        desc: 'Продвинутый редактор флагов с описаниями из кода игры.' },
    about:        { label: 'О редакторе',  desc: 'Информация о проекте, история версий, лицензия.' },
  };
  const GROUP_DEFAULT = { party: 'overview', story: 'ch1', flags: 'known', about: 'overview' };
  const INVENTORY_TABS = [['consumables','Расходуемые'],['keyItems','Важные'],['weapons','Оружие'],['armors','Броня'],['storage','Хранилище']];
  const PARTY_TABS = [['overview','Обзор']];
  const FLAG_TABS = [['known','По категориям'],['all','Все индексы']];
  const PARTY_ACCENT = { kris:'accent-kris', susie:'accent-susie', ralsei:'accent-ralsei', noelle:'accent-noelle' };

  const els = {
    routeTabs: byId('routeTabs'), saveList: byId('saveList'), saveSwitch: byId('saveSwitch'),
    content: byId('content'), pageTitle: byId('pageTitle'), pageCrumbs: byId('pageCrumbs'),
    topbarActions: byId('topbarActions'), statusPill: byId('statusPill'), statusText: byId('statusText'),
    fileInput: byId('fileInput'), toast: byId('toast'), sidebar: byId('sidebar'), sidebarToggle: byId('sidebarToggle'),
    fileActions: byId('fileActions'),
    backdrop: byId('edBackdrop'),
    modalRoot: byId('modalRoot'),
    dropOverlay: byId('dropOverlay'),
  };
  function byId(id) { return document.getElementById(id); }

  function migrateFromV2() {
    try { const v2 = JSON.parse(localStorage.getItem('ru-save-editor-state-v2') || 'null'); if (v2 && v2.saves && v2.saves.length) return v2; } catch {  }
    return null;
  }

  let _slotSeq = 0;
  let state = load() || migrateFromV2() || {
    route: 'welcome', subroute: 'overview', selectedId: null, dirty: false,
    search: '', flagPage: 1, flagPerPage: 50, flagCategory: 'all', flagHideRecruits: false, flagHideCategorized: false,
    saves: [],
  };
  _slotSeq = (state.saves || []).reduce((m, s) => { const x = /^f(\d+)$/.exec(s && s.id); return x ? Math.max(m, +x[1]) : m; }, 0);
  state.saves = state.saves.map(normalizeSlot);
  let searchDebounce = null;
  let invSyncDebounce = null;
  let conflictWarnDebounce = null;

  state.saves = state.saves.filter(s => !(s.source && s.source.kind === 'demo'));
  if (!state.saves.find(s => s.id === state.selectedId)) state.selectedId = state.saves[0]?.id || null;
  recomputeDirty();
  syncRouteFromHash();

  function uid() { return 'f' + (++_slotSeq); }
  function clone(v) { return JSON.parse(JSON.stringify(v)); }
  function esc(v) { return String(v ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;'); }
  function hashStr(str) {
    let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
    for (let i = 0, ch; i < str.length; i++) { ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  }
  function saveHash(save) { try { return hashStr(Core.serializeSave(save) + '|slot' + (save.meta?.slot ?? 0) + '|cs' + (save.meta?.isCompletionSave ? 1 : 0) + '|sb' + (save.meta?.sideB ? 1 : 0)); } catch { return undefined; } }
  function recomputeDirty() {
    state.dirty = state.saves.some(s => s.baselineHash !== undefined && saveHash(s.save) !== s.baselineHash);
  }
  function load() { try { return JSON.parse(localStorage.getItem(STORE) || 'null'); } catch { return null; } }
  function persist() {
    try {
      localStorage.setItem(STORE, JSON.stringify(state));
      persist._warned = false;
    } catch (err) {
      console.error('Не удалось сохранить состояние в localStorage:', err);
      if (!persist._warned) {
        persist._warned = true;
        try { toast('Хранилище браузера переполнено — изменения не сохраняются. Экспортируйте файлы в файлы и удалите лишние файлы.', 'error'); } catch (_) {  }
      }
    }
  }
  function current() { return state.saves.find(s => s.id === state.selectedId) || state.saves[0]; }

  let __chapterBgApplied = -1;
  function applyChapterBackground(ch) {
    const n = Number(ch) || 0;
    if (__chapterBgApplied === n) return;
    __chapterBgApplied = n;
    const cl = document.body.classList;
    for (let i = 1; i <= 5; i++) cl.remove('ch' + i);
    if (n >= 1 && n <= 5) cl.add('ch' + n);
  }
  function fmtDate(ts) { return new Intl.DateTimeFormat('ru-RU',{day:'2-digit',month:'short',hour:'2-digit',minute:'2-digit'}).format(new Date(ts)); }
  function fmtTime(frames) {
    const s = Math.max(0, Math.floor(Number(frames||0)/30));
    return `${Math.floor(s/3600)}:${String(Math.floor(s/60)%60).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  }
  function fmtBytes(n) { if(!n) return '0 Б'; if(n<1024) return `${n} Б`; if(n<1048576) return `${(n/1024).toFixed(1)} КБ`; return `${(n/1048576).toFixed(2)} МБ`; }
  function fileLabel(save) {
    const m = save.meta || {};
    const slotNo = m.isCompletionSave ? Number(m.slot) + 3 : Number(m.slot);
    const player = (save.playerName || '').trim() || '?';
    const vessel = (save.vesselName || '').trim() || '?';
    return `filech${m.chapter}_${slotNo}${m.sideB ? '_b' : ''}_${Number(save.time) || 0}_${player}_${vessel}`;
  }
  function fileLabelShort(save) {
    const m = save.meta || {};
    const slotNo = m.isCompletionSave ? Number(m.slot) + 3 : Number(m.slot);
    const player = (save.playerName || '').trim() || '?';
    return `filech${m.chapter}_${slotNo}${m.sideB ? '_b' : ''}_${player}`;
  }
  function toNumber(v) { return Number.isFinite(Number(v)) ? Number(v) : 0; }

  function makeSlot(name, save, source) {
    const now = Date.now();
    return normalizeSlot({ id:uid(), name, createdAt:now, updatedAt:now, save, source });
  }
  function normalizeSlot(slot) {
    const save = slot.save || Core.createDemoSave();
    save.meta ||= {};
    save.meta.name ||= slot.name || save.playerName || 'Save';
    save.meta.chapter = Core.detectChapter(save);
    return {
      id: slot.id || uid(), name: fileLabelShort(save),
      createdAt: slot.createdAt || Date.now(), updatedAt: slot.updatedAt || Date.now(),
      source: { kind: slot.source?.kind||'demo', fileName: slot.source?.fileName||'demo-save', size: slot.source?.size||0 },
      notes: slot.notes || '', save,
      baselineHash: slot.baselineHash !== undefined ? slot.baselineHash : saveHash(save),
      origFlags: slot.origFlags !== undefined ? slot.origFlags : (Array.isArray(save.flags) ? save.flags.slice() : Object.assign({}, save.flags)),
    };
  }

  function toast(msg, kind) {
    els.toast.textContent = msg;
    els.toast.className = `toast show ${kind||''}`;
    clearTimeout(toast._t);
    toast._t = setTimeout(() => { els.toast.className = 'toast'; }, 2400);
  }

  function setHash(route, sub) { const next = sub ? `#${route}/${sub}` : `#${route}`; if (location.hash !== next) location.hash = next; }
  function syncRouteFromHash() {
    const [route, sub] = location.hash.replace(/^#\/?/,'').split('/');
    if (ROUTES[route]) { state.route = route; state.subroute = sub || GROUP_DEFAULT[route] || 'overview'; }
  }
  function setRoute(route, sub) {
    state.route = route; state.subroute = sub || GROUP_DEFAULT[route] || 'overview';
    state.search = ''; state.flagPage = 1;
    setHash(state.route, state.subroute); persist(); render();
    els.sidebar.classList.remove('open');
    if (els.backdrop) els.backdrop.classList.remove('show');
  }

  function touch(slot = current()) {
    if (!slot) return;
    slot.updatedAt = Date.now(); slot.save.meta.modifiedAt = Date.now();
    slot.save.meta.chapter = Core.detectChapter(slot.save);
    slot.name = fileLabelShort(slot.save);
    recomputeDirty(); persist();
  }

  function softChrome() {
    const hasFile = state.saves.length > 0;
    els.statusText.textContent = !hasFile ? 'Файл не добавлен' : (state.dirty ? 'Есть изменения' : 'Нет изменений');
    els.statusPill.className = `chip ${!hasFile ? 'none' : (state.dirty ? 'dirty' : 'clean')}`;
  }
  function setPath(path, value, opts) {
    const slot = current(); const parts = path.split('.'); let ref = slot.save;
    for (let i=0;i<parts.length-1;i++) ref = ref[parts[i]];
    ref[parts.at(-1)] = value;
    touch(slot);
    if (opts && opts.rerender) render(); else softChrome();
  }
  function setSlotField(path, value) {
    const slot = current(); const parts = path.split('.'); let ref = slot;
    for (let i=0;i<parts.length-1;i++) ref = ref[parts[i]];
    ref[parts.at(-1)] = value; touch(slot); softChrome();
  }

  function ruMapFor(kind) {
    return kind==='consumables'?I18n.RU_CONSUMABLES : kind==='keyItems'?I18n.RU_KEY_ITEMS :
           kind==='weapons'?I18n.RU_WEAPONS : kind==='armors'?I18n.RU_ARMORS :
           kind==='lightItems'?I18n.RU_LIGHT_ITEMS : kind==='spells'?I18n.RU_SPELLS :
           kind==='characters'?I18n.RU_CHARACTERS : null;
  }

  const _optRowsCache = {};
  function optionRows(kind) {
    if (_optRowsCache[kind]) return _optRowsCache[kind];
    const list = Core.DATA[kind] || []; const ru = ruMapFor(kind);
    const rows = list.map(([v, label]) => {
      const ruName = ru ? ru[Number(v)] : null;
      const disp = ruName ? `${ruName} / ${label}` : label;
      return [Number(v), `${esc(disp)} (${v})`];
    });
    _optRowsCache[kind] = rows;
    return rows;
  }
  function options(kind, selected) {
    const rows = optionRows(kind);
    const sel = Number(selected);
    const has = rows.some(([v]) => v === sel);
    const all = has ? rows : [[sel, `#${selected} (${selected})`], ...rows];
    let html = '';
    for (const [v, str] of all) html += `<option value="${v}"${v === sel ? ' selected' : ''}>${str}</option>`;
    return html;
  }
  function roomOptions(selected, chapter) {
    const sel = Number(selected);
    const ch = Number(chapter);
    const rawMode = sel < 10000 && ch >= 1 && ch <= 4;
    let list;
    if (rawMode) {
      const lo = ch * 10000, hi = lo + 9999;
      list = Core.DATA.rooms
        .filter(([v]) => v >= lo && v <= hi)
        .map(([v, label]) => [v - lo, label]);
    } else {
      list = Core.DATA.rooms.map(([v, label]) => [v, label]);
    }
    const has = list.some(([v]) => Number(v) === sel);
    const rows = has ? list : [[sel, `Room ${selected}`], ...list];
    return rows.map(([v, label]) => `<option value="${v}"${Number(v) === sel ? ' selected' : ''}>${esc(label)} (${v})</option>`).join('');
  }
  function characterName(v) { return (I18n.RU_CHARACTERS && I18n.RU_CHARACTERS[Number(v)]) || Core.optionLabel('characters', v); }
  function flagName(i) {
    const e = Core.DATA.flags.find(([x]) => x===i);
    if (e) return e[1];
    const a = window.KnightFlagsAuto && window.KnightFlagsAuto[i];
    return (a && a.n) || `FLAG_${i}`;
  }
  const bit = (n, label, width) => ({ bit: n, label, ...(width ? { width } : {}) });
  const bitList = (items, label) => items.map(n => bit(n, `${label} ${n}`));
  const FLAG_BIT_DOCS = {
    1300: [bit(1, 'Плат-шорткат пройден'), bit(5, 'Собрана Розовая монета №1 — Сад: aquaplatforming'), bit(6, 'Собрана Розовая монета №2 — Сад: aquaplatforming'), bit(7, 'Собрана Розовая монета №3 — Сад: aquaplatforming'), bit(8, 'Собрана Розовая монета №4 — Сад: aquaplatforming')],
    1303: [bit(0, 'Финальный платформинг: платформа превращена'), bit(2, 'Собрана Розовая монета — Сад: finalplatforming_right')],
    1310: [bit(0, 'Жёлтый бой: состояние отрисовки'), bit(1, 'Узел верёвки — Замок Flowery: bounce_3'), bit(2, 'Узел верёвки — Замок Flowery: shinobeetle_3d'), bit(3, 'Головоломка — Замок Flowery: right_puzzle'), bit(4, 'Собрана Розовая монета — Обрыв: precipice'), bit(6, 'Собрана Розовая монета №1 — Замок Flowery: obscured_bullets'), bit(7, 'Собрана Розовая монета №2 — Замок Flowery: obscured_bullets'), bit(8, 'Собрана Розовая монета №3 — Замок Flowery: obscured_bullets'), bit(10, 'Разбит фонарь с монетами (lantern) №1 — Замок Flowery: orange_puppet_introduction'), bit(11, 'Разбит фонарь с монетами (lantern) №2 — Замок Flowery: orange_puppet_introduction'), bit(12, 'Разбит фонарь с монетами (lantern) №3 — Замок Flowery: orange_puppet_introduction'), bit(13, 'Собрана Розовая монета №4 — Замок Flowery: obscured_bullets'), bit(14, 'Собрана Розовая монета №5 — Замок Flowery: obscured_bullets'), bit(15, 'Собрана Розовая монета №6 — Замок Flowery: obscured_bullets'), bit(16, 'Собрана Розовая монета №7 — Замок Flowery: obscured_bullets')],
    1317: [bit(3, 'Анти-софтлок: прогресс разговора', 2), bit(4, 'Головоломка №1 — Замок Flowery: sidepuzzle'), bit(5, 'Sidepuzzle: монета для Ferrol'), bit(8, 'Анти-софтлок: цепочка завершена'), bit(10, 'Головоломка №2 — Замок Flowery: sidepuzzle')],
    1318: [bit(1, 'Trainroom: событие завершено'), bit(10, 'Trainroom: монета для Ferrol'), bit(11, 'Разбит фонарь с монетами (lantern) — Замок Flowery: trainroom')],
    1320: [bit(0, 'Gloves tower: прогресс пузыря Orange', 3), bit(1, 'Gloves tower: счёт верхних фонарей', 3), bit(6, 'Orange proud / игрок получил урон'), bit(7, 'Башня Gloves завершена'), bit(8, 'Собрана Розовая монета — Замок Flowery: gloves tower'), bit(9, 'Разбит фонарь с монетами (lantern) №1 — Замок Flowery: gloves_tower'), bit(10, 'Разбит фонарь с монетами (lantern) №2 — Замок Flowery: gloves_tower'), bit(11, 'Разбит фонарь с монетами (lantern) №3 — Замок Flowery: gloves_tower'), bit(12, 'Разбит фонарь с монетами (lantern) №4 — Замок Flowery: gloves_tower'), bit(13, 'Разбит фонарь с монетами (lantern) №5 — Замок Flowery: gloves_tower'), bit(14, 'Разбит фонарь с монетами (lantern) №6 — Замок Flowery: gloves_tower'), bit(15, 'Разбит фонарь с монетами (lantern) №7 — Замок Flowery: gloves_tower'), bit(16, 'Разбит фонарь с монетами (lantern) №8 — Замок Flowery: gloves_tower'), bit(17, 'Разбит фонарь с монетами (lantern) №9 — Замок Flowery: gloves_tower')],
    1321: [bit(0, 'Собрана Розовая монета №1 — Обрыв: finaldash'), bit(1, 'Собрана Розовая монета №2 — Обрыв: finaldash'), bit(2, 'Собрана Розовая монета №3 — Обрыв: finaldash'), bit(3, 'Собрана Розовая монета №4 — Обрыв: finaldash'), bit(4, 'Собрана Розовая монета №5 — Обрыв: finaldash'), bit(5, 'Собрана Розовая монета №6 — Обрыв: finaldash'), bit(6, 'Собрана Розовая монета №7 — Обрыв: finaldash'), bit(7, 'Собрана Розовая монета №8 — Обрыв: finaldash'), bit(8, 'Собрана Розовая монета №9 — Обрыв: finaldash'), bit(9, 'Собрана Розовая монета №10 — Обрыв: finaldash'), bit(10, 'Собрана Розовая монета №11 — Обрыв: finaldash'), bit(11, 'Собрана Розовая монета №12 — Обрыв: finaldash'), bit(12, 'Собрана Розовая монета №13 — Обрыв: finaldash'), bit(13, 'Собрана Розовая монета №14 — Обрыв: finaldash'), bit(14, 'Собрана Розовая монета №15 — Обрыв: finaldash'), bit(15, 'Собрана Розовая монета №16 — Обрыв: finaldash'), bit(16, 'Собрана Розовая монета №17 — Обрыв: finaldash'), bit(17, 'Собрана Розовая монета №18 — Обрыв: finaldash')],
    1349: [bit(0, 'Собрана Розовая монета №1 — Обрыв: finaldash'), bit(1, 'Собрана Розовая монета №2 — Обрыв: finaldash'), bit(2, 'Собрана Розовая монета №3 — Обрыв: finaldash'), bit(3, 'Собрана Розовая монета №4 — Обрыв: finaldash'), bit(4, 'Собрана Розовая монета №5 — Обрыв: finaldash'), bit(5, 'Собрана Розовая монета №6 — Обрыв: finaldash'), bit(6, 'Собрана Розовая монета №7 — Обрыв: finaldash'), bit(7, 'Собрана Розовая монета №8 — Обрыв: finaldash'), bit(8, 'Собрана Розовая монета №9 — Обрыв: finaldash'), bit(9, 'Собрана Розовая монета №10 — Обрыв: finaldash')],
    1361: [bit(10, 'Собрана Розовая монета №1 — Обрыв: twirlflowerplatforming'), bit(11, 'Собрана Розовая монета №2 — Обрыв: twirlflowerplatforming'), bit(12, 'Собрана Розовая монета №3 — Обрыв: twirlflowerplatforming'), bit(15, 'Собрана Розовая монета — Обрыв: sethaqua_battle'), bit(16, 'Собрана Розовая монета — Обрыв: twirlflowerwind'), bit(17, 'Собрана Розовая монета №4 — Обрыв: twirlflowerplatforming')],
    1365: [bit(8, 'Shearyguide: первый Floradinn-куст срезан'), bit(10, 'Shearyguide: второй Floradinn-куст срезан'), bit(11, 'Подсказка обучения поливу уже показана')],
    1369: [bit(0, 'Садоводство/поливка: вступление пройдено')],
    1371: [bit(6, 'Полив аквы: путь очищен (метка №1)'), bit(7, 'Полив аквы: путь очищен (метка №2)'), bit(9, 'Путь к сокровищу открыт'), bit(11, 'Полив аквы: путь очищен (метка №3)')],
    1384: [bit(0, 'Убрана куча листьев (leafpile) №1 — Сад: newdash'), bit(1, 'Убрана куча листьев (leafpile) №2 — Сад: newdash'), bit(2, 'Убрана куча листьев (leafpile) №3 — Сад: newdash'), bit(3, 'Убрана куча листьев (leafpile) №4 — Сад: newdash'), bit(4, 'Убрана куча листьев (leafpile) №5 — Сад: newdash'), bit(5, 'Убрана куча листьев (leafpile) №6 — Сад: newdash'), bit(6, 'Убрана куча листьев (leafpile) №7 — Сад: newdash'), bit(7, 'Убрана куча листьев (leafpile) №8 — Сад: newdash'), bit(8, 'Убрана куча листьев (leafpile) №9 — Сад: newdash'), bit(9, 'Убрана куча листьев (leafpile) №10 — Сад: newdash'), bit(10, 'Убрана куча листьев (leafpile) №11 — Сад: newdash'), bit(11, 'Убрана куча листьев (leafpile) — Сад: firstdash'), bit(12, 'Убрана куча листьев (leafpile) №12 — Сад: newdash'), bit(13, 'Убрана куча листьев (leafpile) №13 — Сад: newdash'), bit(16, 'Убрана куча листьев (leafpile) №14 — Сад: newdash')],
    1385: [bit(1, 'Срезан куст (shrubbery) №1 — Сад: aquadash_plat'), bit(2, 'Срезан куст (shrubbery) №2 — Сад: aquadash_plat'), bit(3, 'Срезан куст (shrubbery) №3 — Сад: aquadash_plat'), bit(4, 'Срезан куст (shrubbery) №4 — Сад: aquadash_plat'), bit(5, 'Срезан куст (shrubbery) №5 — Сад: aquadash_plat'), bit(6, 'Срезан куст (shrubbery) №6 — Сад: aquadash_plat'), bit(7, 'Срезан куст (shrubbery) №7 — Сад: aquadash_plat'), bit(8, 'Срезан куст (shrubbery) №8 — Сад: aquadash_plat'), bit(9, 'Срезан куст (shrubbery) №9 — Сад: aquadash_plat'), bit(10, 'Срезан куст (shrubbery) №10 — Сад: aquadash_plat'), bit(11, 'Срезан куст (shrubbery) №11 — Сад: aquadash_plat'), bit(12, 'Срезан куст (shrubbery) №12 — Сад: aquadash_plat'), bit(13, 'Срезан куст (shrubbery) №13 — Сад: aquadash_plat')],
    1399: [bit(0, 'Hopschef: состояние хлеба (0 обычный · 1 разрушен · 2 пройдено)', 2)],
    1430: [bit(0, 'Кафе замка: сцена «Aqua и Kris» (показана)'), bit(1, 'Кафе замка: сцена «Aqua и Seth» (показана)'), bit(2, 'Кафе замка: сцена «Aqua и Yellow» (показана)'), bit(3, 'Слот не используется (баг маппинга cut4)'), bit(4, 'Кафе замка: сцена «Aqua и Green» (показана)'), bit(5, 'Кафе замка: сцена «Aqua и Blue» (показана)'), bit(6, 'Кафе замка: сцена «Aqua и Orange» (показана)'), bit(7, 'Кафе замка: сцена «Seth и Ralsei» (показана)'), bit(8, 'Кафе замка: сцена «Seth и Susie» (показана)'), bit(9, 'Кафе замка: сцена «Seth и Yellow» (показана)'), bit(10, 'Кафе замка: сцена «Seth и Green» (показана)'), bit(11, 'Кафе замка: сцена «Seth и Blue» (показана)'), bit(12, 'Кафе замка: сцена «Seth и Orange» (показана)'), bit(13, 'Кафе замка: сцена «Yellow и Ralsei» (показана)'), bit(14, 'Кафе замка: сцена «Yellow и Green» (показана)'), bit(15, 'Кафе замка: сцена «Yellow и Blue» (показана)')],
    1434: [bit(0, 'Ferroll: отряд разбит молотом', 4), bit(4, 'Ferroll: деньги разбиты молотом', 4)],
    1441: [bit(0, 'Слишком долгий подъём (≥5 мин): Каарт Правел «Правило пяти минут» (впервые)'), bit(1, 'Обычный подъём: сцена с Каарт Правелом (впервые)'), bit(2, 'Отличное время (<700): сцена с Ральзеем (впервые)'), bit(3, 'Ответ Ральзея в сцене отличного времени (0/1)'), bit(4, 'Обычный подъём: сцена с Каарт Правелом (повтор)'), bit(5, 'Среднее время (≤799): сцена (рассказчик)'), bit(6, 'Хорошее время (≤749): сцена (рассказчик)'), bit(7, 'Слишком долгий подъём: Каарт Правел (повтор)'), bit(8, 'Отличное время: сцена с Ральзеем (повтор)')],
    1442: [bit(3, 'Darkfruit tree разбито'), bit(9, 'Узел верёвки — Сад: aquaplatforming'), bit(10, 'Собрана Розовая монета №1 — Сад: aquaplatforming'), bit(11, 'Собрана Розовая монета №2 — Сад: aquaplatforming'), bit(12, 'Сад: aquahole — bell jump провален'), bit(13, 'Собрана Розовая монета №1 — Сад: aquahole_left'), bit(14, 'Собрана Розовая монета №2 — Сад: aquahole_left'), bit(15, 'Собрана Розовая монета №3 — Сад: aquahole_left')],
    1715: [bit(10, 'Orange Puppet intro: скрыть объект')],
    1731: [bit(16, 'Узел верёвки — Обрыв: bonuscombat'), bit(17, 'Windstruggler / Розовая монета (учёт Ferrol)'), bit(18, 'Обрыв: bonuscombat — поздние объекты')],
    1737: [bit(0, 'Terracotta foxhunt: drop-маркер'), bit(1, 'Foxhunt: лис 1'), bit(2, 'Foxhunt: лис 2'), bit(3, 'Foxhunt: лис 3'), bit(10, 'Foxhunt: пуля/лис №1 — Замок Flowery'), bit(11, 'Foxhunt: пуля/лис №2 — Замок Flowery'), bit(12, 'Foxhunt: пуля/лис №3 — Замок Flowery'), bit(13, 'Foxhunt: пуля/лис №4 — Замок Flowery')],
    1749: [bit(0, 'В додзё вызван Ballperson'), bit(1, 'В додзё вызван Trashy'), bit(2, 'В додзё вызван Nubert')],
    1762: [bit(0, 'Petal Feather: подсветка в меню', 2), bit(1, 'Ferroll / silver hammer interaction'), bit(2, 'Shihat / scarecrow / sandtrap interaction', 2)],
    1765: [bit(0, 'Точка сохранения возвращена на стол (2-й диннер замка Flowery)')],
    1817: [bit(0, 'Документы: общий прогресс чтения', 2), bit(2, 'Сначала прочитана левая бумага'), bit(3, 'Сначала прочитана правая бумага')],
    1818: [bit(0, 'Top pinkdoor: shortcut открыт'), bit(2, 'Top pinkdoor: разговор двери'), bit(10, 'Узел верёвки — Замок Flowery: top_pinkdoor')],
    1825: [bit(0, 'Сад: aquadash — монета для Ferrol'), bit(1, 'Сад: aquadash — враги/волна пройдены'), bit(2, 'Срезан куст (shrubbery) №1 — Сад: aquadash_plat'), bit(3, 'Срезан куст (shrubbery) №2 — Сад: aquadash_plat'), bit(4, 'Срезан куст (shrubbery) №3 — Сад: aquadash_plat'), bit(5, 'Срезан куст (shrubbery) №4 — Сад: aquadash_plat'), bit(6, 'Срезан куст (shrubbery) №5 — Сад: aquadash_plat'), bit(7, 'Срезан куст (shrubbery) №6 — Сад: aquadash_plat'), bit(8, 'Срезан куст (shrubbery) №7 — Сад: aquadash_plat'), bit(9, 'Срезан куст (shrubbery) №8 — Сад: aquadash_plat'), bit(10, 'Срезан куст (shrubbery) №9 — Сад: aquadash_plat'), bit(11, 'Срезан куст (shrubbery) №10 — Сад: aquadash_plat'), bit(12, 'Срезан куст (shrubbery) №11 — Сад: aquadash_plat'), bit(13, 'Срезан куст (shrubbery) №12 — Сад: aquadash_plat'), bit(14, 'Срезан куст (shrubbery) №13 — Сад: aquadash_plat'), bit(15, 'Срезан куст (shrubbery) №14 — Сад: aquadash_plat'), bit(16, 'Срезан куст (shrubbery) №15 — Сад: aquadash_plat'), bit(17, 'Срезан куст (shrubbery) №16 — Сад: aquadash_plat'), bit(18, 'Срезан куст (shrubbery) — Сад: aquadash')],
    1845: [bit(0, 'Top challenge: предупреждение'), bit(1, 'Top challenge: узел Ferrol'), bit(2, 'Прогресс верхнего испытания замка — Замок Flowery: top_challenge'), bit(5, 'Top descent: Windstruggler')],
    1851: [bit(0, 'Ультра-рывок (опасный платформинг): испытание пройдено')],
    1855: [bit(0, 'Кафе замка: сцена «Aqua и Kris» (досмотрена)'), bit(1, 'Кафе замка: сцена «Aqua и Seth» (досмотрена)'), bit(2, 'Кафе замка: сцена «Aqua и Yellow» (досмотрена)'), bit(3, 'Слот не используется (баг маппинга cut4)'), bit(4, 'Кафе замка: сцена «Aqua и Green» (досмотрена)'), bit(5, 'Кафе замка: сцена «Aqua и Blue» (досмотрена)'), bit(6, 'Кафе замка: сцена «Aqua и Orange» (досмотрена)'), bit(7, 'Кафе замка: сцена «Seth и Ralsei» (досмотрена)'), bit(8, 'Кафе замка: сцена «Seth и Susie» (досмотрена)'), bit(9, 'Кафе замка: сцена «Seth и Yellow» (досмотрена)'), bit(10, 'Кафе замка: сцена «Seth и Green» (досмотрена)'), bit(11, 'Кафе замка: сцена «Seth и Blue» (досмотрена)'), bit(12, 'Кафе замка: сцена «Seth и Orange» (досмотрена)'), bit(13, 'Кафе замка: сцена «Yellow и Ralsei» (досмотрена)'), bit(14, 'Кафе замка: сцена «Yellow и Green» (досмотрена)'), bit(15, 'Кафе замка: сцена «Yellow и Blue» (досмотрена)')],
    1856: [bit(0, 'Cafe friends: цветок 1', 2), bit(2, 'Cafe friends: цветок 2', 2), bit(4, 'Cafe friends: цветок 3', 2), bit(6, 'Cafe friends: цветок 4', 2), bit(8, 'Cafe friends: цветок 5', 2), bit(10, 'Cafe friends: цветок 6', 2), bit(12, 'Cafe friends: цветок 7', 2)],
    1859: [bit(0, 'East Cliff: прогресс Octave'), bit(1, 'Прогресс восточного обрыва (eastcliff) №1 — Обрыв: eastcliff'), bit(2, 'Прогресс восточного обрыва (eastcliff) №2 — Обрыв: eastcliff'), bit(3, 'Прогресс восточного обрыва (eastcliff) №3 — Обрыв: eastcliff'), bit(4, 'Прогресс восточного обрыва (eastcliff) №4 — Обрыв: eastcliff'), bit(5, 'Прогресс восточного обрыва (eastcliff) №5 — Обрыв: eastcliff'), bit(6, 'Прогресс восточного обрыва (eastcliff) №6 — Обрыв: eastcliff'), bit(7, 'Прогресс восточного обрыва (eastcliff) №7 — Обрыв: eastcliff'), bit(8, 'Прогресс восточного обрыва (eastcliff) №8 — Обрыв: eastcliff'), bit(9, 'Прогресс восточного обрыва (eastcliff) №9 — Обрыв: eastcliff'), bit(10, 'Узел верёвки — Обрыв: eastcliff'), bit(11, 'Прогресс восточного обрыва (eastcliff) №10 — Обрыв: eastcliff'), bit(12, 'Прогресс восточного обрыва (eastcliff) №11 — Обрыв: eastcliff'), bit(13, 'Прогресс восточного обрыва (eastcliff) №12 — Обрыв: eastcliff'), bit(14, 'Прогресс восточного обрыва (eastcliff) №13 — Обрыв: eastcliff'), bit(15, 'Прогресс восточного обрыва (eastcliff) №14 — Обрыв: eastcliff'), bit(16, 'Прогресс восточного обрыва (eastcliff) №15 — Обрыв: eastcliff'), bit(17, 'Прогресс восточного обрыва (eastcliff) №16 — Обрыв: eastcliff'), bit(18, 'Прогресс восточного обрыва (eastcliff) №17 — Обрыв: eastcliff')],
    1860: [bit(0, 'Куплен цветок Seth → SethSpecs (броня)'), bit(1, 'Куплен цветок Blue → BlueShoes (оружие)'), bit(2, 'Куплен цветок Aqua → AquaKnife (оружие)'), bit(3, 'Куплен цветок Yellow → YellowHat (броня)'), bit(4, 'Куплен цветок Orange → O.Glove (броня)'), bit(5, 'Куплен цветок Green → GreenApron (броня)'), bit(6, 'Куплен цветок Flowery → FloweryScarf (оружие)')],
    1867: [bit(0, 'Dogplatforming: troll / treasure room'), bit(1, 'Dogplatforming: disarm hook'), bit(10, 'Собрана Розовая монета №1 — Собачий платформинг'), bit(11, 'Собрана Розовая монета №2 — Собачий платформинг')],
    1878: [bit(0, 'Шорткат Hopschef'), bit(1, 'Шорткат Aquahole'), bit(2, 'Шорткат Top Pinkdoor'), bit(3, 'Шорткат Final Save'), bit(4, 'Шорткат Top of Castle / Green Checkpoint')],
    1880: [bit(1, 'Susie chase: номер круга', 3)],
    1891: [bit(0, 'Собрана Розовая монета №1 — Замок Flowery: bounce_1'), bit(1, 'Собрана Розовая монета №2 — Замок Flowery: bounce_1'), bit(2, 'Собрана Розовая монета №3 — Замок Flowery: bounce_1'), bit(3, 'Собрана Розовая монета №4 — Замок Flowery: bounce_1'), bit(4, 'Собрана Розовая монета — Замок Flowery: bounce_3'), bit(10, 'Головоломка №1 — Замок Flowery: right_puzzle'), bit(11, 'Головоломка №2 — Замок Flowery: right_puzzle'), bit(12, 'Головоломка №3 — Замок Flowery: right_puzzle'), bit(14, 'Головоломка №1 — Замок Flowery: sidepuzzle'), bit(15, 'Головоломка №2 — Замок Flowery: sidepuzzle')],
    1892: [bit(0, 'Кафе замка: сцена «Yellow и Orange» (показана)'), bit(1, 'Кафе замка: сцена «Green» (показана)'), bit(2, 'Кафе замка: сцена «Green и Orange» (показана)'), bit(3, 'Кафе замка: сцена «Blue и Susie» (показана)'), bit(4, 'Кафе замка: сцена «Blue и Orange» (показана)'), bit(5, 'Кафе замка: сцена «Blue и Orange 2» (показана)'), bit(6, 'Кафе замка: сцена «Blue и Orange 3» (показана)'), bit(7, 'Кафе замка: сцена «Blue и Green» (показана)'), bit(8, 'Кафе замка: сцена «Orange и Susie» (показана)'), bit(9, 'Кафе замка: сцена «Orange и Ralsei» (показана)'), bit(10, 'Кафе замка: сцена «Pink и Orange» (показана)'), bit(11, 'Кафе замка: сцена «Pink и Kris» (показана)')],
    1893: [bit(0, 'Кафе замка: сцена «Yellow и Orange» (досмотрена)'), bit(1, 'Кафе замка: сцена «Green» (досмотрена)'), bit(2, 'Кафе замка: сцена «Green и Orange» (досмотрена)'), bit(3, 'Кафе замка: сцена «Blue и Susie» (досмотрена)'), bit(4, 'Кафе замка: сцена «Blue и Orange» (досмотрена)'), bit(5, 'Кафе замка: сцена «Blue и Orange 2» (досмотрена)'), bit(6, 'Кафе замка: сцена «Blue и Orange 3» (досмотрена)'), bit(7, 'Кафе замка: сцена «Blue и Green» (досмотрена)'), bit(8, 'Кафе замка: сцена «Orange и Susie» (досмотрена)'), bit(9, 'Кафе замка: сцена «Orange и Ralsei» (досмотрена)'), bit(10, 'Кафе замка: сцена «Pink и Orange» (досмотрена)'), bit(11, 'Кафе замка: сцена «Pink и Kris» (досмотрена)')],
  };
  function flagDoc(i) {
    const doc = I18n.FLAG_DOCS ? I18n.FLAG_DOCS[i] : null;
    const bits = FLAG_BIT_DOCS[i];
    return bits ? { ...(doc || {}), bits } : doc;
  }
  function flagAuto(i) { return window.KnightFlagsAuto ? window.KnightFlagsAuto[i] : null; }
  function flagDetail(i) { return window.KnightFlagsDetail ? window.KnightFlagsDetail[i] : null; }
  function trimNumber(v) {
    return String(v).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
  }
  function flagNumberDisplay(i, value) {
    if (Number(i) === 1440) return trimNumber((Number(value) || 0) / 30);
    return value;
  }
  function flagNumberStored(i, value) {
    if (Number(i) === 1440) return Math.round((Number(value) || 0) * 30);
    return value;
  }
  function flagNumberAttr(i, attr, value) {
    if (value === undefined || value === null || value === '') return '';
    const v = Number(i) === 1440 ? trimNumber(Number(value) / 30) : value;
    return ` ${attr}="${esc(v)}"`;
  }
  function flagNumberExtra(i) {
    return Number(i) === 1440 ? ' step="0.001" data-flag-unit="seconds" title="Введите секунды; в сохранение запишутся тики игры (секунды × 30)."' : '';
  }
  function flagNumberSuffix(i) {
    return Number(i) === 1440 ? ' <span style="color:var(--text-3);font-size:13px;">сек.</span>' : '';
  }

  const Avail = window.KnightAvailability || null;
  function availIntro(kind, id) {
    if (!Avail || !Avail.intro[kind]) return null;
    const v = Avail.intro[kind][Number(id)];
    return v === undefined ? null : v;
  }

  function availBad(kind, id, chapter) {
    if (Number(id) === 0) return 0;
    const intro = availIntro(kind, id);
    return (intro !== null && intro > chapter) ? intro : 0;
  }
  function availWarnText(intro) { return `Появляется в игре только начиная с Главы ${intro}. В сохранении более ранней главы этого быть не может — игра может зависнуть или повести себя некорректно.`; }
  function availTag(kind, id, chapter) {
    const intro = availBad(kind, id, chapter);
    if (!intro) return '';
    return `<span class="avail-warn" title="${esc(availWarnText(intro))}">⚠ Гл. ${intro}+</span>`;
  }
  function countItemWarn(save) {
    if (!Avail) return 0;
    const ch = save.meta.chapter; let n = 0;
    ['consumables','keyItems','weapons','armors'].forEach(k => {
      (save.inventory[k] || []).forEach(v => { if (availBad(k, Number(v), ch)) n++; });
    });
    return n;
  }
  function countPartyWarn(save) {
    if (!Avail) return 0;
    const ch = save.meta.chapter; let n = 0;
    (save.characters || []).forEach(c => {
      if (!c) return;
      if (availBad('weapons', Number(c.weapon), ch)) n++;
      if (availBad('armors', Number(c.primaryArmor), ch)) n++;
      if (availBad('armors', Number(c.secondaryArmor), ch)) n++;
      (c.spells || []).forEach(sp => { if (availBad('spells', Number(sp), ch)) n++; });
    });
    return n;
  }
  function countFlagWarn(save) {
    if (!Avail) return 0;
    const ch = save.meta.chapter;
    const max = Core.SAVE_META[save.meta.format].flagCount;
    let n = 0; const m = Avail.intro.flags;
    for (const id in m) { const i = Number(id); if (i < max && m[id] > ch && Number(save.flags[i]) !== 0) n++; }
    return n;
  }
  function routeWarnCounts(save) {
    if (!save || !Avail) return {};
    return { inventory: countItemWarn(save), party: countPartyWarn(save), flags: countFlagWarn(save) };
  }

  const SPEAKERS = {
    narration:{ name:'',         color:'#ffffff' },
    voice:    { name:'???',      color:'#c9c9c9' },
    kris:     { name:'Крис',     color:'#00a2e8' },
    susie:    { name:'Сьюзи',    color:'#ea79c8', face:['game-sprites/faces/susie_0.png'] },
    ralsei:   { name:'Ральзей',  color:'#b5e61d', face:['game-sprites/faces/ralsei_0.png'] },
    noelle:   { name:'Ноэль',    color:'#ffff00', face:['game-sprites/faces/noelle_0.png','game-sprites/faces/noelle_1.png'] },
    king:     { name:'Король',   color:'#b07be8', face:['game-sprites/faces/king_0.png'] },
    lancer:   { name:'Лансер',   color:'#3aa0ff', face:['game-sprites/faces/lancer_0.png','game-sprites/faces/lancer_1.png'] },
    spamton:  { name:'Спамтон',  color:'#ffd000', face:['game-sprites/faces/spamton_0.png','game-sprites/faces/spamton_1.png'] },
    jevil:    { name:'Джевил',   color:'#7affc6' },
    seam:     { name:'Seam',     color:'#5ec2c2', face:['game-sprites/faces/seam_0.png','game-sprites/faces/seam_1.png'] },
    tenna:    { name:'Тенна',    color:'#ff5a5a', face:['game-sprites/faces/tenna_0.png'] },
    rouxls:   { name:'Каард',    color:'#7fd4ff', face:['game-sprites/faces/rouxls_0.png'] },
    ramb:     { name:'Рамб',     color:'#8fd36b' },
    gerson:   { name:'Герсон',   color:'#6fd6b0' },
    berdly:   { name:'Птицын',   color:'#5aa9ff', face:['game-sprites/faces/berdly_0.png','game-sprites/faces/berdly_1.png'] },
    elnina:   { name:'Эльнина',  color:'#9ad0ff' },
    lanino:   { name:'Ланино',   color:'#ffb36b' },
    mike:     { name:'Майк',     color:'#c9a0ff', face:['game-sprites/faces/mike_0.png'] },
    queen:    { name:'Королева', color:'#b07be8', face:['game-sprites/faces/queen_0.png'] },
    rudy:     { name:'Руди',     color:'#e89a4a', face:['game-sprites/faces/rudy_0.png'] },
    toriel:   { name:'Ториэль',  color:'#e3c98a', face:['game-sprites/faces/toriel_0.png'] },
    swatch:   { name:'Свотч',    color:'#d0d0d0' },
    asgore:   { name:'Азгор',    color:'#e8a13a', face:['game-sprites/faces/asgore_0.png','game-sprites/faces/asgore_1.png'] },
    flowery:  { name:'Flowery',  color:'#ff5fa2', face:['game-sprites/faces/flowery_0.png','game-sprites/faces/flowery_1.png'] },
    sans:     { name:'Санс',     color:'#ffffff', face:['game-sprites/faces/sans_0.png'] },
  };
  function faceHTML(who) {
    const sp = SPEAKERS[who] || SPEAKERS.narration;
    if (sp.face && sp.face.length) {
      return `<div class="dlg-face" data-frames="${sp.face.join('|')}"><img src="${sp.face[0]}" alt="" onerror="var p=this.closest('.dlg-face'); if(p) p.remove();"></div>`;
    }
    return '';
  }

  function parseGameText(raw) {
    if (raw == null) return '';
    let s = String(raw);
    s = s.replace(/&/g, '\n');
    s = s.replace(/\^[0-9]/g, '');
    s = s.replace(/\/%%|\/%/g, '').replace(/\/(?=\n|$)/g, '');
    s = s.replace(/\\E[0-9A-Za-z]/g, '');
    s = s.replace(/\\[A-Za-z*][0-9A-Za-z]?/g, '');
    s = s.replace(/\|/g, '');
    s = s.split('\n').map((l) => l.replace(/[ \t]{2,}/g, ' ').replace(/\s+$/, '')).join('\n');
    return s.replace(/^\n+|\n+$/g, '');
  }
  function dialogueBox(who, texts) {
    const arr = Array.isArray(texts) ? texts : [texts];

    const linesHtml = arr.map((t) => {
      const parsed = parseGameText(t);
      const segs = parsed.split(/\s*\*\s+/).map((s) => s.trim()).filter((s) => s.length);
      const list = segs.length ? segs : [parsed.replace(/^\*\s*/, '').trim()].filter((s) => s.length);
      return list.map((seg) => {
        const full = '* ' + seg;
        const eng = /[А-Яа-яЁё]/.test(seg) ? '' : ' eng';
        return `<div class="dlg-line${eng}" data-full="${esc(full)}">${esc(full)}</div>`;
      }).join('');
    }).join('');
    return `<div class="dlg gamebox">
      <span class="tbx tbx-tl"></span><span class="tbx tbx-tr"></span><span class="tbx tbx-bl"></span><span class="tbx tbx-br"></span>
      <span class="tbx-edge tbx-top"></span><span class="tbx-edge tbx-bottom"></span>
      <span class="tbx-edge tbx-left"></span><span class="tbx-edge tbx-right"></span>
      ${faceHTML(who)}
      <div class="dlg-body">${linesHtml}</div>
    </div>`;
  }

  function renderLines(lines) {
    if (!lines || !lines.length) return '';
    let html = ''; let lastCond = null; let i = 0;
    while (i < lines.length) {
      const cond = lines[i].cond || '';
      if (cond !== lastCond) { if (cond) html += `<div class="dlg-cond-head">${esc(cond)}</div>`; lastCond = cond; }
      const who = lines[i].who || 'narration';
      const texts = [];
      while (i < lines.length && (lines[i].cond || '') === cond && (lines[i].who || 'narration') === who) {
        texts.push(lines[i].text || ''); i += 1;
      }
      html += dialogueBox(who, texts);
    }
    return `<div class="dr-variations">${html}</div>`;
  }

  function runTypewriter(root) {
    if (!root) return;
    root.querySelectorAll('.dlg.gamebox').forEach((box) => {
      const lines = Array.from(box.querySelectorAll('.dlg-line'));
      if (!lines.length) return;
      const face = box.querySelector('.dlg-face');
      const frames = face && face.getAttribute('data-frames') ? face.getAttribute('data-frames').split('|') : null;
      const img = face && face.querySelector('img');
      const twoFrame = frames && frames.length > 1;
      const typeSound = box.getAttribute('data-typesound');
      lines.forEach((el) => { el._full = el.getAttribute('data-full') || el.textContent; el.textContent = ''; });
      box._timers = box._timers || [];
      box._typing = false;

      const flap = () => {
        if (!box._typing) return;
        box._mouthOpen = box._mouthOpen ? 0 : 1;
        if (img && twoFrame) img.src = frames[box._mouthOpen];
        const t = setTimeout(flap, box._mouthOpen ? 167 : 133);
        box._timers.push(t);
      };
      const startMouth = () => { if (!box._typing) { box._typing = true; if (face) face.classList.add('talking'); box._mouthOpen = 0; flap(); } };
      const stopMouth = () => { box._typing = false; if (face) face.classList.remove('talking'); if (img && twoFrame) img.src = frames[0]; };
      let li = 0;
      const typeLine = () => {
        if (li >= lines.length) { stopMouth(); return; }
        const el = lines[li]; const full = el._full; let i = 0;
        startMouth();
        const step = () => {
          if (i <= full.length) {
            el.textContent = full.slice(0, i);
            const ch = full[i - 1];
            if (typeSound && i > 0 && ch && ch !== ' ' && i % 2 === 0) playTypeSound(typeSound);
            i += 1;
            let delay = 35;
            if (typeSound && ch && '.!?…'.includes(ch)) delay = 260;
            else if (typeSound && ch && ',«»'.includes(ch)) delay = 130;
            const t = setTimeout(step, delay); box._timers.push(t);
          }
          else { li += 1; const t = setTimeout(typeLine, 120); box._timers.push(t); }
        };
        step();
      };
      typeLine();
      box._stopMouth = stopMouth;
    });
  }

  const _typeAudioCache = {};
  function playTypeSound(name) {
    try {
      const src = 'game-sprites/snd/' + name + '.wav';
      let base = _typeAudioCache[src];
      if (!base) { base = new Audio(src); _typeAudioCache[src] = base; }
      const a = base.cloneNode();
      a.volume = 0.45;
      a.play().catch(() => {});
    } catch (e) {}
  }

  function openFlagDetailModal(index) {
    const d = flagDetail(index); const doc = flagDoc(index);
    const name = flagName(index);
    let body = '';
    if (doc && doc.description) body += `<p class="helper" style="margin:0 0 12px;color:var(--text-2)">${esc(doc.description)}</p>`;
    if (d && d.detail) body += `<span class="flag-detail" style="margin-bottom:12px">${esc(d.detail)}</span>`;
    if (d && d.fx) body += fxHTML(d.fx);
    if (d && d.sprites && d.sprites.length) body += spritesHTML(d.sprites);
    if (doc && doc.values) {
      body += `<div style="margin:12px 0 4px;color:var(--text-3);font-size:16px;text-transform:uppercase">Значения</div>
        <div class="bullet-list" style="padding-left:18px">${Object.entries(doc.values).map(([k,v]) => `<li><b style="color:var(--yellow)">${esc(k)}</b> — ${esc(v)}</li>`).join('')}</div>`;
    }
    if (d && d.lines && d.lines.length) body += `<div id="dlgVariations">${renderLines(d.lines)}</div>`;
    if (d && d.dialogue) body += `<p class="helper" style="margin-top:10px;color:var(--green)">${esc(d.dialogue)}</p>`;
    if (d && d.related && d.related.length) body += `<div class="flag-related" style="margin-top:12px">Связанные флаги: ${d.related.map(r => `<button type="button" class="flag-link" data-goflag="${r}">#${r} ${esc(flagName(r))}</button>`).join(' ')}</div>`;
    if (d && d.conflicts && d.conflicts.length) body += conflictsHTML(index);
    if (!body) {
      const a = flagAuto(index);
      const hint = a ? flagAutoHint(a.n) : '';
      if (hint) body = `<p class="helper">${esc(hint)}${a && a.v && a.v.length ? ` Значения по коду: ${esc(a.v.join(', '))}.` : ''}</p>`;
      else body = `<p class="helper">Этот индекс не используется игрой (резервный).</p>`;
    }
    els.modalRoot.innerHTML = `
      <div class="modal-overlay" data-modal-overlay>
        <div class="modal">
          <button class="modal-x" id="mdCancel" type="button" aria-label="Закрыть">×</button>
          <h2><img src="game-sprites/spr_heart_0.png" alt="">${esc(name)} <span style="color:var(--text-3);font-size:14px">#${index}</span></h2>
          <div style="margin-top:14px">${body}</div>
        </div>
      </div>`;
    byId('mdCancel').addEventListener('click', closeModal);
    els.modalRoot.querySelector('[data-modal-overlay]').addEventListener('click', (e) => { if (e.target===e.currentTarget) closeModal(); });
    runTypewriter(byId('dlgVariations'));
  }

  function hasFlagHint(i) { const d = flagDetail(i); const doc = flagDoc(i); return !!(d && (d.detail || d.fx || (d.sprites && d.sprites.length) || (d.lines && d.lines.length) || d.dialogue || (d.related && d.related.length) || (d.conflicts && d.conflicts.length))) || !!(doc && (doc.description || doc.values)); }

  function hintBtn(i) {
    if (!hasFlagHint(i)) return '';
    return `<button class="hint-btn" type="button" data-hint="${i}" title="Подробнее" aria-label="Подробнее"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg></button>`;
  }

  function fxHTML(fx) {
    if (!fx) return '';
    if (fx.proph) {
      return `<div class="flag-fx-wrap"><canvas class="proph-fx" width="360" height="250" data-proph="${esc(JSON.stringify(fx.proph))}"></canvas></div>`;
    }
    if (fx.states && fx.states.length) {
      const cards = fx.states.map((s) => {
        const media = s.img
          ? `<img src="${esc(s.img)}" alt="">`
          : `<span class="flag-fx-state-note">${esc(s.note || '')}</span>`;
        return `<figure class="flag-fx-state">${media}<figcaption>${esc(s.cond || '')}</figcaption></figure>`;
      }).join('');
      const cap = fx.cap ? `<span class="flag-fx-states-cap">${esc(fx.cap)}</span>` : '';
      return `<div class="flag-fx-states-wrap">${cap}<div class="flag-fx-states">${cards}</div></div>`;
    }
    if (!fx.frames || !fx.frames.length) return '';
    const cls = ['flag-fx'];
    if (fx.big) cls.push('big');
    if (fx.blink) cls.push('blink');
    if (fx.shake) cls.push('shake');
    if (fx.water) cls.push('water');
    const caps = Array.isArray(fx.caps) ? fx.caps : (fx.cap ? [fx.cap] : null);
    const capAttr = caps ? ` data-caps="${esc(caps.join('§§'))}"` : '';
    let capHTML;
    if (caps) capHTML = `<span class="${fx.water ? 'flag-fx-cap water' : 'flag-fx-cap'}">${esc(caps[0])}</span>`;
    else capHTML = `<span class="flag-fx-cap">↑ что мелькает на экране (спрайт из игры)</span>`;
    return `<div class="flag-fx-wrap"><img class="${cls.join(' ')}" data-frames="${fx.frames.join('|')}" data-speed="${fx.speed || 150}"${capAttr} data-fi="0" data-acc="0" src="${fx.frames[0]}" alt="">${capHTML}</div>`;
  }

  function flagDetailHTML(i) {
    const d = flagDetail(i); if (!d) return '';
    let html = '';
    if (d.detail) html += `<span class="flag-detail">${esc(d.detail)}</span>`;
    if (d.fx) html += fxHTML(d.fx);
    if (d.sprites && d.sprites.length) html += spritesHTML(d.sprites);
    if (d.lines && d.lines.length) html += renderLines(d.lines);
    if (d.related && d.related.length) html += `<span class="flag-related">Связанные флаги: ${d.related.map(r => `<button type="button" class="flag-link" data-goflag="${r}">#${r} ${esc(flagName(r))}</button>`).join(' ')}</span>`;
    if (d.conflicts && d.conflicts.length) html += conflictsHTML(i);
    return html ? `<div class="flag-extra">${html}</div>` : '';
  }
  function spritesHTML(sprites) {
    const items = sprites.map(s => `<figure class="flag-fx-state"><img src="game-sprites/flagfx/${esc(s.src)}.png" alt="${esc(s.src)}" onerror="this.closest('figure').style.display='none'"><figcaption>${esc(s.cond || '')}</figcaption></figure>`).join('');
    return `<div class="flag-fx-states-wrap"><span class="flag-fx-states-cap">Спрайт в игре:</span><div class="flag-fx-states">${items}</div></div>`;
  }
  function flagConflicts(i) { const d = flagDetail(i); return (d && d.conflicts) || []; }
  function conflictActive(save, i) {
    if (!save) return false;
    const val = Number(save.flags[i] || 0);
    return flagConflicts(i).some(c => (c.self || []).map(Number).includes(val) && (c.otherVals || []).map(Number).includes(Number(save.flags[c.other] || 0)));
  }
  function conflictsHTML(i) {
    const cs = flagConflicts(i); if (!cs.length) return '';
    const slot = current(); const save = slot && slot.save; const val = save ? Number(save.flags[i] || 0) : null;
    let anyActive = false;
    const items = cs.map(c => {
      const active = save && (c.self || []).map(Number).includes(val) && (c.otherVals || []).map(Number).includes(Number(save.flags[c.other] || 0));
      if (active) anyActive = true;
      return `<div class="conflict-item">✖ Несовместим с <button type="button" class="flag-link" data-goflag="${c.other}">#${c.other} ${esc(flagName(c.other))}</button>${c.note ? ` — ${esc(c.note)}` : ''}${active ? ' <b style="color:var(--red)">⚠ сейчас установлена невозможная комбинация!</b>' : ''}</div>`;
    }).join('');
    return `<div class="flag-conflicts${anyActive ? ' has-active' : ''}"><span class="flag-conflicts-cap">Взаимоисключающие флаги:</span>${items}</div>`;
  }
  let _conflictIndex = null;
  function buildConflictIndex() {
    if (_conflictIndex) return _conflictIndex;
    const idx = {}; const D = window.KnightFlagsDetail || {};
    for (const k in D) {
      const cs = D[k].conflicts; if (!cs || !cs.length) continue;
      const owner = Number(k);
      for (const c of cs) {
        const rec = { owner, self: c.self || [], other: c.other, otherVals: c.otherVals || [], note: c.note };
        (idx[owner] = idx[owner] || []).push(rec);
        (idx[c.other] = idx[c.other] || []).push(rec);
      }
    }
    _conflictIndex = idx; return idx;
  }
  function activeConflictsFor(save, i) {
    if (!save) return [];
    const recs = buildConflictIndex()[i] || []; const out = []; const seen = new Set();
    for (const c of recs) {
      const key = Math.min(c.owner, c.other) + '|' + Math.max(c.owner, c.other);
      if (seen.has(key)) continue;
      const ownerVal = Number(save.flags[c.owner] || 0), otherVal = Number(save.flags[c.other] || 0);
      if (c.self.map(Number).includes(ownerVal) && c.otherVals.map(Number).includes(otherVal)) { out.push(c); seen.add(key); }
    }
    return out;
  }
  function warnConflicts(save, i) {
    const ac = activeConflictsFor(save, i);
    if (!ac.length) return;
    openConflictSansModal(ac[0]);
  }
  function openConflictSansModal(rec) {
    const slot = current(); if (!slot) return;
    if (els.modalRoot.innerHTML) return;
    const label1 = `#${rec.owner} ${flagName(rec.owner)}`;
    const label2 = `#${rec.other} ${flagName(rec.other)}`;
    const parts = [
      '* ЧЕЛОВЕК, я помню твои действия, но позволь помочь.',
      `«${label1}» и «${label2}» несовместимы.`,
      'Так что будь осторожнее и не устрой случайный геноцид своего мира в другой игре...'
    ];
    const linesHtml = parts.map((full) => {
      const cls = full.startsWith('* ') ? 'dlg-line' : 'dlg-line nobullet';
      return `<div class="${cls}" data-full="${esc(full)}">${esc(full)}</div>`;
    }).join('');
    els.modalRoot.innerHTML = `
      <div class="modal-overlay" data-modal-overlay>
        <div class="modal sans-conflict-modal">
          <div class="dlg gamebox sans-box" data-typesound="snd_txtsans">
            <span class="tbx tbx-tl"></span><span class="tbx tbx-tr"></span><span class="tbx tbx-bl"></span><span class="tbx tbx-br"></span>
            <span class="tbx-edge tbx-top"></span><span class="tbx-edge tbx-bottom"></span>
            <span class="tbx-edge tbx-left"></span><span class="tbx-edge tbx-right"></span>
            ${faceHTML('sans')}
            <div class="dlg-body">${linesHtml}</div>
          </div>
          <div class="sans-conflict-actions">
            <button type="button" class="btn" id="sansClose">Закрыть окно</button>
            <button type="button" class="btn primary" id="sansRevert">Откатить оба флага</button>
          </div>
        </div>
      </div>`;
    byId('sansClose').addEventListener('click', closeModal);
    byId('sansRevert').addEventListener('click', () => {
      const orig = slot.origFlags || {};
      slot.save.flags[rec.owner] = Number(orig[rec.owner] || 0);
      slot.save.flags[rec.other] = Number(orig[rec.other] || 0);
      touch(); closeModal(); render();
      toast('Флаги откатаны к исходным значениям');
    });
    els.modalRoot.querySelector('[data-modal-overlay]').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal(); });
    runTypewriter(els.modalRoot);
  }
  function allActiveConflicts(save) {
    if (!save) return [];
    const idx = buildConflictIndex(); const out = []; const seen = new Set();
    for (const owner in idx) {
      for (const c of idx[owner]) {
        const key = Math.min(c.owner, c.other) + '|' + Math.max(c.owner, c.other);
        if (seen.has(key)) continue;
        const ov = Number(save.flags[c.owner] || 0), tv = Number(save.flags[c.other] || 0);
        if (c.self.map(Number).includes(ov) && c.otherVals.map(Number).includes(tv)) { out.push(c); seen.add(key); }
      }
    }
    return out;
  }
  function conflictBanner(save) {
    const ac = allActiveConflicts(save);
    if (!ac.length) return '';
    const rows = ac.map(c => `<div>✖ <button type="button" class="flag-link" data-goflag="${c.owner}">#${c.owner} ${esc(flagName(c.owner))}</button> ↔ <button type="button" class="flag-link" data-goflag="${c.other}">#${c.other} ${esc(flagName(c.other))}</button>${c.note ? ` — ${esc(c.note)}` : ''}</div>`).join('');
    return `<div class="conflict-banner">⚠ В этом сейве обнаружено невозможных комбинаций флагов: ${ac.length}${rows}</div>`;
  }

  function plotLabelHTML(chapter, value) {
    const ch = Number(chapter), v = Number(value);
    const table = window.KnightPlot && window.KnightPlot[ch];
    if (!table || !Object.keys(table).length) {
      return `<span class="plot-name plot-none">Гл.${ch}: точные названия этапов недоступны для этой главы</span>`;
    }
    if (table[v]) {
      const r = table[v];
      const src = r.code ? ' <span class="plot-unused">(этап определён по коду Гл.5)</span>' : (r.u ? ' <span class="plot-unused">(не используется)</span>' : '');
      return `<span class="plot-name">▸ ${esc(r.n || ('этап ' + v))}${src}</span>` +
        (r.d ? `<span class="plot-desc">${esc(r.d)}</span>` : '');
    }
    const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
    let lower = null, higher = null;
    for (const k of keys) { if (k <= v) lower = k; if (k > v && higher === null) higher = k; }
    if (lower !== null) {
      return `<span class="plot-name plot-approx">Промежуточный кадр — сразу после «${esc(table[lower].n)}» (этап ${lower})` +
        (higher !== null ? `, перед «${esc(table[higher].n)}» (этап ${higher})` : '') + `</span>`;
    }
    return `<span class="plot-name plot-none">Ранний кадр — до «${esc(table[keys[0]].n)}» (этап ${keys[0]})</span>`;
  }

  function plotOptions(chapter, selected) {
    const ch = Number(chapter), sel = Number(selected);
    const table = (window.KnightPlot && window.KnightPlot[ch]) || {};
    const keys = Object.keys(table).map(Number).sort((a, b) => a - b);
    let html = '', hasSel = false;
    for (const k of keys) {
      const r = table[k] || {};
      const nm = r.n || ('этап ' + k);
      const extra = r.code ? ' ⟨по коду⟩' : (r.u ? ' (не исп.)' : '');
      if (k === sel) hasSel = true;
      html += `<option value="${k}"${k === sel ? ' selected' : ''}>${esc(k + ' — ' + nm + extra)}</option>`;
    }
    if (!hasSel) {

      let lo = null, hi = null;
      for (const k of keys) { if (k <= sel) lo = k; if (k > sel && hi === null) hi = k; }
      let lab;
      if (lo !== null) lab = sel + ' — после «' + (table[lo].n || ('этап ' + lo)) + '» (промежуточное)';
      else if (hi !== null) lab = sel + ' — до «' + (table[hi].n || ('этап ' + hi)) + '» (промежуточное)';
      else lab = sel + ' — (значение вне известных этапов)';
      html = `<option value="${sel}" selected>${esc(lab)}</option>` + html;
    }
    return html;
  }

  function roomValidForSave(save) {
    const sel = Number(save.room), ch = Number(save.meta.chapter);
    const rawMode = sel < 10000 && ch >= 1 && ch <= 4;
    let list;
    if (rawMode) { const lo = ch * 10000; list = Core.DATA.rooms.filter(([x]) => x >= lo && x <= lo + 9999).map(([x]) => x - lo); }
    else list = Core.DATA.rooms.map(([x]) => x);
    return list.some((x) => Number(x) === sel);
  }
  function dogWarningBanner(save) {
    if (!save || roomValidForSave(save)) return '';
    return `<div class="dog-banner"><img class="dog-ic" src="game-sprites/dogcheck/spr_dogcheck_head_0.png" alt="dog_check"><div><b>⚠ Возможна «собака» (dog_check) при запуске.</b> Комната <code>#${esc(save.room)}</code> не входит в список комнат Главы ${esc(save.meta.chapter)}. При загрузке игра проверяет комнату через <code>scr_dogcheck()</code>, и сохранение <b>не запустится</b>. Выберите настоящую комнату этой главы в поле «Текущая комната».</div></div>`;
  }

  function getGameColor(value) {
    const h = ((Number(value) * 8 * 360) / 255) % 360;
    const s = 1, v = 1;
    const c = v * s, x = c * (1 - Math.abs(((h / 60) % 2) - 1)), m = v - c;
    let r = 0, g = 0, b = 0;
    if (h < 60) { r = c; g = x; } else if (h < 120) { r = x; g = c; }
    else if (h < 180) { g = c; b = x; } else if (h < 240) { g = x; b = c; }
    else if (h < 300) { r = x; b = c; } else { r = c; b = x; }
    const hx = (n) => Math.round((n + m) * 255).toString(16).padStart(2, '0');
    return `#${hx(r)}${hx(g)}${hx(b)}`;
  }

  let _tmFid = 0;

  function field(path, label, value, type='text', attrs='', hint='') {
    return `<label class="field"><span>${esc(label)}</span><input name="${esc(path)}" type="${type}" ${attrs} data-path="${esc(path)}" value="${esc(value)}">${hint?`<span class="hint">${esc(hint)}</span>`:''}</label>`;
  }
  function selectField(path, label, kind, value) {
    return `<label class="field"><span>${esc(label)}</span><select data-path="${esc(path)}">${options(kind,value)}</select></label>`;
  }
  function roomSelectField(path, label, value) {
    return `<label class="field"><span>${esc(label)}</span><select data-path="${esc(path)}">${roomOptions(value)}</select></label>`;
  }
  function checkField(path, label, checked) {
    return `<label class="check-row"><input type="checkbox" data-path="${esc(path)}"${checked?' checked':''}><span>${esc(label)}</span></label>`;
  }

  function flagField(index, save) {
    const doc = flagDoc(index); const name = flagName(index); const value = save.flags[index] || 0;
    let control;
    if (doc && doc.values) {
      const has = Object.keys(doc.values).some(k => Number(k)===Number(value));
      const opts = (has ? Object.entries(doc.values) : [[value, `Неизвестно (${value})`], ...Object.entries(doc.values)])
        .map(([k,v]) => `<option value="${k}"${Number(k)===Number(value)?' selected':''}>${esc(v)} (${k})</option>`).join('');
      control = `<select data-path="flags.${index}">${opts}</select>`;
    } else {
      const min = doc && doc.min !== undefined ? flagNumberAttr(index, 'min', doc.min) : '';
      const max = doc && doc.max !== undefined ? flagNumberAttr(index, 'max', doc.max) : '';
      control = `<input type="number" data-path="flags.${index}" value="${esc(flagNumberDisplay(index, value))}"${min}${max}${flagNumberExtra(index)}>${flagNumberSuffix(index)}`;
    }
    const desc = doc && doc.description ? `<span class="hint">${esc(doc.description)}</span>` : '';
    return `<label class="field"><span>${esc(name)} <span style="color:var(--text-3)">#${index}</span></span>${control}${desc}${flagDetailHTML(index)}</label>`;
  }

  function renderChrome() {
    const slot = current();
    applyChapterBackground(slot ? slot.save.meta.chapter : 0);
    const warns = slot ? routeWarnCounts(slot.save) : {};
    els.routeTabs.innerHTML = Object.entries(ROUTES).map(([key,r]) => {
      const locked = !slot && key !== 'about' && key !== 'welcome';
      const wc = warns[key] || 0;
      const badge = wc ? `<span class="nav-badge" title="Возможные несоответствия выбранной главе: ${wc}">${wc}</span>` : '';
      return `<button class="nav-btn${key===state.route?' active':''}${locked?' locked':''}" type="button" data-route="${key}"${locked?' aria-disabled="true"':''}><img class="soul" src="game-sprites/spr_heart_0.png" alt=""> <span class="nav-label">${esc(r.label)}</span>${badge}</button>`;
    }).join('');
    const lk = slot ? '' : ' locked';
    els.fileActions.innerHTML = [
      `<button class="nav-btn" data-action="import-file" type="button"><img class="soul" src="game-sprites/spr_heart_0.png" alt=""> Загрузить файл</button>`,
      `<button class="nav-btn${lk}" data-action="export-file" type="button"${slot?'':' aria-disabled="true"'}><img class="soul" src="game-sprites/spr_heart_0.png" alt=""> Скачать файл</button>`,
      `<button class="nav-btn${lk}" data-action="duplicate-slot" type="button"${slot?'':' aria-disabled="true"'}><img class="soul" src="game-sprites/spr_heart_0.png" alt=""> Дублировать</button>`,
      `<button class="nav-btn${lk}" data-action="delete-slot" type="button"${slot?'':' aria-disabled="true"'}><img class="soul" src="game-sprites/spr_heart_0.png" alt=""> Закрыть файл</button>`,
    ].join('');
    els.saveList.innerHTML = state.saves.map(s =>
      `<button class="slot-card${s.id===state.selectedId?' active':''}" type="button" data-save="${s.id}"><strong>${esc(s.name)}</strong><small>Гл. ${s.save.meta.chapter} · ${esc(s.source.kind)} · ${fmtDate(s.updatedAt)}</small></button>`).join('') || '<p class="helper" style="margin:0 10px;color:var(--text-3);">Файлов нет. Нажмите «Загрузить файл».</p>';
    els.saveSwitch.innerHTML = state.saves.map(s =>
      `<option value="${s.id}"${s.id===state.selectedId?' selected':''}>${esc(s.name)} (Гл. ${s.save.meta.chapter})</option>`).join('');
    softChrome();
    const r = ROUTES[state.route] || ROUTES.welcome;
    els.pageTitle.textContent = r.label;
    els.pageCrumbs.textContent = slot ? `Игрок: ${slot.save.playerName || slot.name} · ${Core.roomLabel(slot.save.room, slot.save.meta.chapter)}` : 'ФАЙЛ не выбран';
    els.topbarActions.innerHTML = '';
  }

  function subtabsHTML(list, active, group, badges) {
    return `<div class="subtabs">${list.map(([k,l]) => {
      const b = (badges && badges[k]) ? `<span class="tab-badge" title="Предметов не из этой главы: ${badges[k]}">${badges[k]}</span>` : '';
      return `<button class="subtab${active===k?' active':''}" type="button" data-group="${group}" data-subroute="${k}">${esc(l)}${b}</button>`;
    }).join('')}</div>`;
  }
  function searchBar() {
    return `<div class="inline-tools" style="margin-bottom:16px;"><input class="search-input" id="searchInput" type="search" placeholder="Поиск..." value="${esc(state.search)}"></div>`;
  }

  function render() {
    renderChrome();
    const slot = current();
    if (!slot && state.route !== 'about') { els.content.innerHTML = renderNoSave(); persist(); return; }
    const renderers = { welcome:renderWelcome, party:renderParty, 'light-world':renderLightWorld, story:renderStory, recruits:renderRecruits, flags:renderFlags, about:renderAbout };
    els.content.innerHTML = (renderers[state.route] || renderWelcome)(slot);
    mountEquipMenu();
    mountLightMenu();
    persist();
  }

  function mountLightMenu() {
    if (!window.KnightLightMenu) return;
    const host = els.content.querySelector('#light-menu-mount');
    const slot = current();
    if (!host || !slot) { window.KnightLightMenu.unmount(); return; }
    window.KnightLightMenu.mount(host, {
      save: slot.save,
      onChange: function () { touch(slot); softChrome(); },
    });
  }

  function mountEquipMenu() {
    if (!window.KnightEquipMenu) return;
    const host = els.content.querySelector('#equip-menu-mount');
    const slot = current();
    if (!host || !slot) { window.KnightEquipMenu.unmount(); return; }
    window.KnightEquipMenu.mount(host, {
      save: slot.save,
      onChange: function () { touch(slot); softChrome(); },
    });
  }

  function openFileNamingModal() {
    els.modalRoot.innerHTML = `
      <div class="modal-overlay" data-modal-overlay>
        <div class="modal" style="max-width:560px;">
          <button class="modal-x" id="mdCancel" type="button" aria-label="Закрыть" style="font-size:30px;">×</button>
          <h2><img src="game-sprites/spr_heart_0.png" alt="">Имена игровых сохранений</h2>
          <table style="width:100%;margin-top:14px;border-collapse:collapse;font-size:14px;">
            <thead>
              <tr style="color:var(--text-2);text-align:left;border-bottom:1px solid var(--border);">
                <th style="padding:6px 10px 6px 0;font-size:23px;">Файл</th>
                <th style="padding:6px 10px;font-size:23px;">Ячейка</th>
                <th style="padding:6px 0 6px 10px;font-size:23px;">Описание</th>
              </tr>
            </thead>
            <tbody>
              ${[1,2,3,4,5].map(ch => `
                <tr style="border-bottom:1px solid var(--border);"><td colspan="3" style="padding:8px 0 2px;font-size:18px;"><u>Глава ${ch}</u></td></tr>
                <tr style="border-bottom:1px solid var(--border);"><td style="padding:5px 10px 5px 0;font-size:16px;"><code>filech${ch}_0</code></td><td style="padding:5px 10px;font-size:21px;">ФАЙЛ 1</td><td style="padding:5px 0 5px 10px;font-size:21px;">Обычное сохранение</td></tr>
                <tr style="border-bottom:1px solid var(--border);"><td style="padding:5px 10px 5px 0;font-size:16px;"><code>filech${ch}_1</code></td><td style="padding:5px 10px;font-size:21px;">ФАЙЛ 2</td><td style="padding:5px 0 5px 10px;font-size:21px;">Обычное сохранение</td></tr>
                <tr style="border-bottom:1px solid var(--border);"><td style="padding:5px 10px 5px 0;font-size:16px;"><code>filech${ch}_2</code></td><td style="padding:5px 10px;font-size:21px;">ФАЙЛ 3</td><td style="padding:5px 0 5px 10px;font-size:21px;">Обычное сохранение</td></tr>
                <tr style="border-bottom:1px solid var(--border);"><td style="padding:5px 10px 5px 0;font-size:16px;"><code>filech${ch}_3</code></td><td style="padding:5px 10px;font-size:21px;">ФАЙЛ 1</td><td style="padding:5px 0 5px 10px;font-size:21px;">ФАЙЛ завершён</td></tr>
                <tr style="border-bottom:1px solid var(--border);"><td style="padding:5px 10px 5px 0;font-size:16px;"><code>filech${ch}_4</code></td><td style="padding:5px 10px;font-size:21px;">ФАЙЛ 2</td><td style="padding:5px 0 5px 10px;font-size:21px;">ФАЙЛ завершён</td></tr>
                <tr style="border-bottom:1px solid var(--border);"><td style="padding:5px 10px 5px 0;font-size:16px;"><code>filech${ch}_5</code></td><td style="padding:5px 10px;font-size:21px;">ФАЙЛ 3</td><td style="padding:5px 0 5px 10px;font-size:21px;">ФАЙЛ завершён</td></tr>
                <tr style="border-bottom:1px solid var(--border);"><td style="padding:5px 10px 5px 0;font-size:16px;"><code>filech${ch}_9</code></td><td style="padding:5px 10px;font-size:21px;">—</td><td style="padding:5px 0 5px 10px;font-size:21px;">Резервная копия</td></tr>
              `).join('')}
              <tr><td colspan="3" style="padding:12px 0 2px;font-size:18px;"><u>Глава 5 — Weird Route (Side B)</u></td></tr>
              <tr style="border-bottom:1px solid var(--border);"><td style="padding:5px 10px 5px 0;font-size:16px;"><code>filech5_3_b</code> … <code>filech5_5_b</code></td><td style="padding:5px 10px;font-size:21px;">ФАЙЛ 1–3</td><td style="padding:5px 0 5px 10px;font-size:21px;">Завершение Weird Route (отдельно от обычных, суффикс <code>_b</code>)</td></tr>
              <tr style="border-bottom:1px solid var(--border);"><td style="padding:5px 10px 5px 0;font-size:16px;"><code>filech5_9_b</code></td><td style="padding:5px 10px;font-size:21px;">—</td><td style="padding:5px 0 5px 10px;font-size:21px;">Резервная копия Weird Route</td></tr>
              <tr><td colspan="3" style="padding:6px 0 10px;font-size:14px;color:var(--text-3);">Плюс в общий <code>dr.ini</code> пишется <code>[side_b] complete=1</code> — глобальная отметка прохождения Weird Route (не привязана к файлу). Редактор её не меняет.</td></tr>
            </tbody>
          </table>
        </div>
      </div>`;
    byId('mdCancel').addEventListener('click', closeModal);
    els.modalRoot.querySelector('[data-modal-overlay]').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal(); });
  }

  function renderNoSave() {
    return `
      ${editorPurposeCard()}
      <article class="card accent-red">
        <h2>Добро пожаловать</h2>
        <p class="helper">Редактор сохранений DELTARUNE прямо в браузере.</p>
        <p class="helper">Чтобы начать, <u>нажмите на область ниже</u> (или перетащите файл).</p>
        <p class="helper-warning">Перед редактированием обязательно сделайте резервную копию сохранения!</p>
        <button class="upload-drop" data-action="import-file" type="button">
          <img src="game-sprites/spr_heart_0.png" alt="" style="width:30px;height:30px;image-rendering:pixelated;margin-bottom:10px;">
          <strong>Нажмите, чтобы загрузить сохранение</strong>
          <span>Кнопка загрузки также есть в правом верхнем углу</span>
        </button>
      </article>
      <article class="card" style="margin-top:16px;"><h2>Где найти сохранения?</h2>
        <p class="helper">Файлы сохранений DELTARUNE обычно лежат здесь:</p>
        <ul class="bullet-list">
          <li>Windows: <code>C:\\Users\\<wbr>&lt;имя&gt;\\<wbr>AppData\\<wbr>Local\\<wbr>DELTARUNE</code>
            <br><span style="font-size:14px;">(или <u>Win+R</u>: <code>%localappdata%\\DELTARUNE</code>)</span></li>
          <li>Mac: <code>~/Library/<wbr>Application Support/<wbr>com.tobyfox.deltarune/</code></li>
          <li>Linux (Steam Proton): <code>~/.steam/<wbr>steam/<wbr>steamapps/<wbr>compatdata/<wbr>1690940/<wbr>pfx/<wbr>drive_c/<wbr>users/<wbr>steamuser/<wbr>AppData/<wbr>Local/<wbr>DELTARUNE/</code></li>
        </ul>
      </article>
      <article class="card" style="margin-top:16px;"><h2>Совместимость</h2>
        <p class="helper">Редактор поддерживает файлы DELTARUNE Глав 1–5 для следующих платформ:</p>
        <ul class="bullet-list">
          <li><b>PC (Windows)</b></li>
          <li><b>Mac</b></li>
          <li><b>Linux (через Steam Proton)</b></li>
        </ul>
        <p class="helper" style="margin-top:20px;">Консольные версии <u>не поддерживаются</u>.</p>
        <p class="helper"><u>Номер главы</u> в файле определяется автоматически.</p>
      </article>
      ${fileNamingCard()}`;
  }

  function fileNamingCard() {
    return `
    <article class="card accent-noelle" style="margin-top:16px;">
      <h2>Какой файл за что отвечает</h2>
      <p class="helper">Файлы сохранений в папке DELTARUNE записываются в формате <span class="highlight">filech<code>[N]</code>_<code>[S]</code></span>, где:</p>
      <ul class="bullet-list">
        <li><code>[N]</code> — номер главы (1–5);</li>
        <li><code>[S]</code> — статус сохранения (0–5, 9).</li>
      </ul>
      <p class="helper", style="margin-top:20px;">Статус файла сохранения <code>[S]</code> определяется следующим образом:</p>
      <ul class="bullet-list">
        <li><code>filech<code2>[N]</code2>_<yellow>0</yellow></code>, <code>filech<code2>[N]</code2>_<yellow>1</yellow></code>, <code>filech<code2>[N]</code2>_<yellow>2</yellow></code> — стандартные файлы сохранения, соответствующие ФАЙЛАМ&nbsp;1,&nbsp;2,&nbsp;3 в&nbsp;меню игры.</li>
        <li><code>filech<code2>[N]</code2>_<yellow>3</yellow></code>, <code>filech<code2>[N]</code2>_<yellow>4</yellow></code>, <code>filech<code2>[N]</code2>_<yellow>5</yellow></code> — «завершённые» сохранения для ФАЙЛОВ&nbsp;1,&nbsp;2,&nbsp;3.
          <br>Создаются в конце главы (после титров) и переносятся на старте следующей главы.
          <br><u>Например:</u> <code>"filech1_<yellow>3</yellow>"</code> = Глава 1 завершена в ФАЙЛЕ 1, его можно продолжить в&nbsp;Главе 2.</li>
        <li><code>filech<code2>[N]</code2>_<yellow>9</yellow></code> — автоматическая резервная копия, перезаписывается при каждом новом сохранении. Пригодится, если основной файл повреждён.</li>
      </ul>
      <p class="helper" style="margin-top:10px;">Онлайн-редактор использует ту же схему: галочка «Завершённое сохранение» меняет <yellow>1</yellow>/<yellow>2</yellow>/<yellow>3</yellow> => <yellow>3</yellow>/<yellow>4</yellow>/<yellow>5</yellow> на конце файла.</p>
      <p class="helper", style="margin-top:20px;"><code>Рядом с этими файлами лежат и служебные (их редактировать необязательно):</p>
      <ul class="bullet-list">
        <li><code2>dr.ini</code2> — список файлов (имя, уровень, время, дата);</li>
        <li><code2>config.ini</code2> и <code2>keyconfig_*.ini</code2> — настройки и управление.</code></p></li>
      </ul>
    </article>`;
  }

  function editorPurposeCard() {
    return `
    <article class="card accent-noelle">
      <h2>Для кого этот редактор</h2>
      <p class="helper">Редактор рассчитан на тех, кто готов загрузить <b>собственный</b> файл сохранения из игры — желательно <b>завершённый, после титров</b>. Так из своего прохождения можно собрать «идеальные» файлы для будущих глав, чтобы при переносе прогресса <u>ничего не ломалось</u>.</p>
      <p class="helper" style="margin-top:10px;">Для каждого игрока его прохождение уже «идеальное». Но если какие-то <b>ваши действия во время игры вам не понравились</b> — здесь их можно изменить.</p>
    </article>`;
  }

  const INFO_DOCS = {
    chapter: ['Глава', 'Определяется так:<ol style="color:var(--text-2);"><li>Если файл загружен с именем <code>filechN_M</code> — глава берётся из имени (N). Самый надёжный способ.</li><li>Старый формат файла → всегда Глава 1.</li><li>Иначе по номеру комнаты: <code>≥50000</code> → Гл. 5, <code>40000–49999</code> → Гл. 4, <code>30000–39999</code> → Гл. 3, <code>20000–29999</code> → Гл. 2.</li><li>Иначе — Глава 2.</li></ol><p style="margin-top:10px;color:var(--text-2)">Реальные сохранения отдельных глав хранят «сырой» индекс комнаты, поэтому по одному содержимому главу видно не всегда — надёжнее всего имя файла <code>filechN_M</code>.</p>'],
    sideB: ['Маршрут Weird (Side B)', '<p style="color:var(--text-2)">Уникальная механика Главы 5: при завершении <b>Weird Route</b> игра сохраняет файл <u>отдельно</u> — с суффиксом <code>_b</code> на конце имени (напр. <code>filech5_4_b</code>, резервная копия <code>filech5_9_b</code>). Содержимое такого файла — обычное сохранение того же формата, отличается только имя файла.</p><p style="margin-top:10px;color:var(--text-2)">По коду (<code>scr_complete_save_file_b</code>): берётся слот завершения (ФАЙЛ+3), к имени добавляется <code>_b</code>, и в общий файл <code>dr.ini</code> пишется <code>[side_b] complete=1</code> — глобальная отметка «Weird Route пройден вообще» (не привязана к конкретному файлу).</p><p style="margin-top:10px;color:var(--yellow)">⚠ Если включить этот флажок, редактор сохранит файл с <code>_b</code>. <b>Не снимайте</b> его у файлов <code>_b</code> — иначе при скачивании перезапишете обычный файл завершения, а не Weird-Route-копию. Сам редактор НЕ трогает <code>dr.ini</code>.</p>'],
    startChapter: ['Стартовая глава', 'Глава, на которой был создан текущий файл сохранения. <b>0</b> — если файл создан на текущей главе (или прохождение всё ещё в Главе 1: первая глава этот флаг не трогает).<p class="helper" style="margin-top:10px;color:var(--text-2)">По коду: значение ставится один раз в меню сохранения при первом сохранении в главе ≥2 (<code>flag[914] = глава − 1</code>), в мире света показывается как «Since Chapter N». Поэтому файл, начатый в Главе 1, после сохранения в Главе 2 показывает <b>Глава 1</b> — это и есть «начат в Главе 1».</p>'],
    playerName: ['Имя игрока', 'Имя, введённое игроком в начале игры (truename). Отличается от имени СОСУДА.'],
    money: ['Тёмные доллары (D$)', 'Основная валюта миров тьмы — <code>global.gold</code>. Падает с врагов и лежит в сундуках; тратится в магазинах мира тьмы. В HUD Главы 5 рисуется как «D$».'],
    flowerDollars: ['Цветочные доллары (F$)', 'Флаг 1411: валюта мира тьмы Главы 5 («Цветочные доллары»). Собирается монетками-цветами (<code>obj_climb_coin</code>/<code>obj_plat_coin</code>), тратится в кафе и магазинах замка. В HUD рисуется как «F$».<p class="helper" style="margin-top:8px;color:var(--text-2)">В Главах 1–4 обычно 0 (механика появилась в Главе 5).</p>'],
    pinkDollars: ['Розовые монеты (Pink coins)', 'Флаг 1312: розовая валюта мира тьмы Главы 5. Собирается розовыми монетами, тратится в «розовом магазине» замка (<code>obj_dw_fcastle_pinkshop</code>). В HUD рисуется как «P$».<p class="helper" style="margin-top:8px;color:var(--text-2)">В Главах 1–4 обычно 0 (механика появилась в Главе 5).</p>'],
    points: ['Очки', 'Флаг 1044: валюта телешоу Тенны в Главе 3. В других главах обычно 0.'],
    playtime: ['Время игры', 'Сколько сыграно (хранится в кадрах, 30 кадров = 1 секунда).'],
    room: ['Текущая комната', 'ID комнаты, где находится персонаж.<p class="helper" style="margin-top:10px;color:var(--text-2)">В сохранениях отдельных глав это «сырой» индекс комнаты (небольшое число); название подставляется автоматически по главе.</p>'],
    plot: ['Сюжетный счётчик (Plot)', '<p style="color:var(--text-2)"><b>Главный счётчик прогресса главы</b> — в коде игры это одна переменная <code>global.plot</code>. У каждой главы он свой и начинается с 0 (между главами не переносится).</p><p style="margin-top:10px;color:var(--text-2)"><b>Что он делает (по коду игры):</b> по всей главе раскиданы сотни проверок вида <code>global.plot &gt;= N</code>, и именно они решают:</p><ul class="bullet-list"><li>какие сцены/катсцены уже пройдены и что будет дальше;</li><li>где стоят и что говорят NPC (напр. реплики Короля включаются при <code>plot &gt;= 235</code>);</li><li>какие враги встречаются и насколько они сильны — <code>scr_monstersetup</code> смотрит на <code>plot</code> (напр. <code>plot &lt; 40</code>, <code>plot &lt; 150</code>);</li><li>что происходит при загрузке в комнате — <code>scr_load</code> сверяет комнату и <code>plot</code>.</li></ul><p style="margin-top:10px;color:var(--text-2)"><b>Как растёт:</b> ступеньками по ходу сюжета, почти всегда только вверх. Шаги НЕравномерные — например в конце это …, 235, 240, 249, 250, 251. Значения по коду игры:</p><ul class="bullet-list"><li>Глава 1: <b>0–251</b></li><li>Глава 2: <b>0–211</b></li><li>Глава 3: <b>0–350</b></li><li>Глава 4: <b>0–320</b> (основная концовка/титры ≈ <b>249–251</b>; значения выше — пост-титры и секретный контент)</li><li>Глава 5: <b>0–590</b> (запечатывание источника ≈ <b>550–580</b>, титры = <b>590</b>)</li></ul><p style="margin-top:6px;color:var(--text-3)">Примечание: <code>plot = 999</code> в коде Главы 4 — служебное значение одной катсцены (легенда), к реальному прогрессу отношения не имеет. Названия этапов Глав 1–4 — устоявшиеся в сообществе; для Главы 5 названия выведены по коду игры (сцена/объект-установщик каждого значения).</p><p style="margin-top:10px;color:var(--yellow)"><b>⚠ Самое опасное поле.</b> Значение должно совпадать с текущей комнатой, флагами и составом отряда. Если поставить «чужое» число, игра может застрять (не пройти дальше), запустить сцену не в том месте, выставить не тех врагов или вылететь.</p><p style="margin-top:10px;color:var(--text-2)"><b>Совет:</b> не меняйте без необходимости. Если нужно «перемотать» сюжет — надёжнее загрузить подходящее сохранение, чем угадывать число. Перед любой правкой сделайте резервную копию.</p>'],
    darkWorld: ['В мире тьмы', 'Игровой флаг: персонаж сейчас в мире тьмы.<p class="helper" style="margin-top:10px;color:var(--text-2)"><u>(В Мире света, если галочка не выбрана)</u>.</p><p class="helper" style="margin-top:10px;color:var(--yellow)">⚠ Обычно это состояние определяется комнатой автоматически. Менять его вручную имеет смысл, только если оно рассинхронизировалось с текущей комнатой; несоответствие (мир тьмы + светлая комната или наоборот) может привести к странному поведению при загрузке.</p>'],
    vesselName: ['Имя СОСУДА', 'Имя созданного в прологе СОСУДА.<p class="helper" style="margin-top:10px;color:var(--text-2)"><u>Пустое</u>, если игрок не проходил Главу 1.</p>'],
    lv: ['УР (LV)', '<p style="color:var(--text-2)">В DELTARUNE «УР»/«LV» — это <b>не уровень в привычном смысле и не счётчик убийств</b>. В меню сохранения (Главы 2–4) рядом с «LV» рисуется <b>номер главы</b> (<code>global.chapter</code>); в Главе 1 рисуется само поле <code>global.lv</code>, но оно равно 1 — что совпадает с номером главы. Титулы мира тьмы «LV4 Dark Hero», «LV4 Moss Most», «LV4 Axe of Justice», «LV4 Dark Bead» — это <b>жёстко прописанные строки под главу</b> (условия выбирают лишь какой титул показать, само число «LV4» в коде литеральное и от <code>global.lv</code> не зависит). Поэтому даже на сейве, где все враги пощажены, всё равно «LV4».</p><p style="margin-top:10px;color:var(--text-2)">Само поле «Level» (<code>global.lv</code>) во всех 4 главах только задаётся <code>= 1</code> или читается из файла — <b>его ничто не повышает</b>, в обычной игре оно всегда 1. Настоящая «LOVE» — отдельное значение <code>global.llv</code> (в мире света показывается как «LV»); в обычной игре оно тоже остаётся 1.</p><p style="margin-top:10px;color:var(--text-3)">Проще говоря: «LV4» в титуле означает «Глава 4», а не уровень и не убийства.</p><p style="margin-top:10px;color:var(--text-3)">В этом редакторе титулы персонажей показывают «LV» = номер главы сейва (как в игре: Гл. 5 → «LV5», Гл. 4 → «LV4», Гл. 3 → «LV3» и т.д.) с соответствующим главе титулом, а не значение <code>global.lv</code>.</p>'],
    xp: ['Опыт (EXP)', '<p style="color:var(--text-2)">Очки опыта — <code>global.xp</code>. При победе в бою (в том числе за пощаду, ведь «You won» засчитывается и за неё) делается <code>global.xp += global.monsterexp</code>. Но <code>monsterexp</code> у всех врагов в игре равен <b>0</b> (обнуляется в <code>scr_monstersetup</code> и нигде не становится больше), поэтому за бой реально начисляется <b>0 опыта</b> — в сообщении боя так и пишется «Got 0 EXP».</p><p style="margin-top:10px;color:var(--text-2)">Опыт <b>не повышает уровень и не влияет на статы</b>: <code>global.lv</code> от <code>global.xp</code> не зависит вообще. Рост статов (макс. HP, атака, магия) даёт <code>scr_levelup</code> (есть в Главах 2–4, в Главе 1 его нет) — по <b>числу выигранных боёв</b> (счётчик-флаг: Гл.2 №65, Гл.3 №1248, Гл.4 №1580), а не по накопленному опыту. Хранится в файле сразу после денег, перед полем «Level».</p>'],
    saveName: ['Имя ФАЙЛА', 'Внутреннее имя сохранения в редакторе (для удобства, в файл игры не пишется).'],
    inGameSlot: ['Номер ФАЙЛА', 'Номер ячейки с сохранением в меню игры.<p class="helper" style="margin-top:10px;color:var(--text-2)">Ячейки 1–3 соответствуют следующим <u>игровым файлам</u>:<ul class="bullet-list"><li>ФАЙЛ 1: <code>filech<code2>[N]</code2>_<yellow>0</yellow></code> / <code>filech<code2>[N]</code2>_<yellow>3</yellow></code>;</li><li>ФАЙЛ 2: <code>filech<code2>[N]</code2>_<yellow>1</yellow></code> / <code>filech<code2>[N]</code2>_<yellow>4</yellow></code>;</li><li>ФАЙЛ 3: <code>filech<code2>[N]</code2>_<yellow>2</yellow></code> / <code>filech<code2>[N]</code2>_<yellow>5</yellow></code>.</li></ul>'],
    completion: ['Завершённое сохранение', 'Файл завершённой главы (появляется после титров). <p class="helper" style="margin-top:10px;color:var(--text-2)">Добавляется к обычному сохранению:<ul class="bullet-list"><li>ФАЙЛ 1: <code>filech<code2>[N]</code2>_<yellow>0</yellow></code> + <span class=highlight><code>filech<code2>[N]</code2>_<yellow>3</yellow></code></span>;</li><li>ФАЙЛ 2: <code>filech<code2>[N]</code2>_<yellow>1</yellow></code> + <span class=highlight><code>filech<code2>[N]</code2>_<yellow>4</yellow></code></span>;</li><li>ФАЙЛ 3: <code>filech<code2>[N]</code2>_<yellow>2</yellow></code> + <span class=highlight><code>filech<code2>[N]</code2>_<yellow>5</yellow></code></span>;</li></ul>'],
  };
  function infoHint(key) {
    if (!INFO_DOCS[key]) return '';
    return `<button class="hint-btn" type="button" data-info="${key}" title="Подробнее" aria-label="Подробнее"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.2 1 2.5h6c0-1.3.3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg></button>`;
  }
  function openInfoModal(key) {
    const d = INFO_DOCS[key]; if (!d) return;
    els.modalRoot.innerHTML = `
      <div class="modal-overlay" data-modal-overlay>
        <div class="modal">
          <button class="modal-x" id="mdCancel" type="button" aria-label="Закрыть">×</button>
          <h2><img src="game-sprites/spr_heart_0.png" alt="">${esc(d[0])}</h2>
          <p class="helper" style="margin-top:14px;color:var(--text-2)">${d[1]}</p>
        </div>
      </div>`;
    byId('mdCancel').addEventListener('click', closeModal);
    els.modalRoot.querySelector('[data-modal-overlay]').addEventListener('click', (e) => { if (e.target === e.currentTarget) closeModal(); });
  }

  function renderWelcome(slot) {
    const s = slot.save;
    const chNames = { 1: '', 2: "A Cyber's World", 3: 'Late Night', 4: 'Prophecy', 5: '' };
    const chDisplay = `${s.meta.chapter}${chNames[s.meta.chapter] ? '   ' + chNames[s.meta.chapter] : ''}`;
    const lbl = (text, key) => `<span style="display:flex;align-items:center;gap:5px;">${esc(text)}${key ? infoHint(key) : ''}</span>`;
    const fld = (text, key, path, value, type, attrs) => `<label class="field">${lbl(text, key)}<input data-path="${esc(path)}" type="${type || 'text'}" ${attrs || ''} value="${esc(value)}"></label>`;
    const roBox = (text, key, value) => `<label class="field">${lbl(text, key)}<div style="background:var(--surface-3);border:1px solid var(--border);border-radius:8px;padding:9px 11px;color:var(--text-1);min-height:40px;display:flex;align-items:center;">${esc(value)}</div></label>`;
    const selFld = (text, key, path, optsHtml) => `<label class="field">${lbl(text, key)}<select data-path="${esc(path)}">${optsHtml}</select></label>`;
    const chkFld = (text, key, path, checked, disabled) => `<label class="check-row" style="align-items:center;${disabled ? 'cursor:default;' : ''}"><input type="checkbox" data-path="${esc(path)}"${checked ? ' checked' : ''}${disabled ? ' disabled' : ''}>${lbl(text, key)}</label>`;
    const scOpts = [[0,'Создан в текущей главе (0)'],[1,'Глава 1'],[2,'Глава 2'],[3,'Глава 3'],[4,'Глава 4']].map(([v,l]) => `<option value="${v}"${Number(s.flags[914]) === v ? ' selected' : ''}>${l}</option>`).join('');
    const slotOpts = [0, 1, 2].map((n) => `<option value="${n}"${Number(s.meta.slot) === n ? ' selected' : ''}>ФАЙЛ ${n + 1}</option>`).join('');

    return `
      ${dogWarningBanner(s)}
      ${editorPurposeCard()}
      <article class="card accent-red"><h2>Общее</h2>
        <div class="grid three" style="margin-top:14px; ">
          ${roBox('Глава', 'chapter', chDisplay)}
          ${selFld('Текущая комната', 'room', 'room', roomOptions(s.room, s.meta.chapter))}
          ${selFld('Стартовая глава', 'startChapter', 'flags.914', scOpts)}

          <label class="field">${lbl('Сюжетный счётчик', 'plot')}<select data-path="plot">${plotOptions(s.meta.chapter, s.plot)}</select><div id="plotLabel" class="plot-label-wrap">${plotLabelHTML(s.meta.chapter, s.plot)}</div></label>
          ${fld('Имя игрока', 'playerName', 'playerName', s.playerName)}
          ${fld('Имя СОСУДА', 'vesselName', 'vesselName', s.vesselName)}

          ${fld('УР', 'lv', 'lv', s.lv, 'number', 'min="1"')}
          ${fld('Опыт', 'xp', 'xp', s.xp, 'number', 'min="0"')}
          ${fld('Время (в кадрах)', 'playtime', 'time', s.time, 'number', 'min="0"')}

          ${chkFld('Сейчас в мире тьмы', 'darkWorld', 'inDarkWorld', s.inDarkWorld, false)}
          ${selFld('Номер ФАЙЛА', 'inGameSlot', 'meta.slot', slotOpts)}
          ${chkFld('Завершённое сохранение', 'completion', 'meta.isCompletionSave', s.meta.isCompletionSave, false)}
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:12px;justify-content:space-between;align-items:center;margin-top:18px;">
          <button class="btn" type="button" data-action="open-file-naming" style="font-size:27px;color:var(--text-2)">Список всех имён файлов</button>
        </div>
      </article>

      <article class="card accent-noelle"><h2>Валюты</h2>
        <p class="helper" style="margin-top:8px;">Все денежные значения прохождения в одном месте. Тёмные доллары хранятся отдельным полем сохранения, остальные валюты — во флагах.</p>
        <div class="grid three" style="margin-top:14px;">
          ${fld('Тёмные доллары (D$)', 'money', 'money', s.money, 'number', 'min="0"')}
          ${fld('Цветочные доллары (F$)', 'flowerDollars', 'flags.1411', s.flags[1411] || 0, 'number', 'min="0"')}
          ${fld('Розовые монеты (Pink coins)', 'pinkDollars', 'flags.1312', s.flags[1312] || 0, 'number', 'min="0"')}
          ${fld('Очки', 'points', 'flags.1044', s.flags[1044] || 0, 'number', 'min="0"')}
        </div>
      </article>

      ${fileNamingCard()}`;
  }

  function renderInventory(slot) {
    const s = slot.save;
    const storageAvailable = s.meta.format===2 && s.inventory.storage;
    const tabs = INVENTORY_TABS.filter(([k]) => k!=='storage' || storageAvailable);
    let active = state.subroute || 'consumables';
    if (!tabs.some(([k]) => k===active)) active = 'consumables';
    const allRows = active==='storage' ? (s.inventory.storage||[]) : (s.inventory[active]||[]);
    const kind = active==='keyItems'?'keyItems' : active==='weapons'?'weapons' : active==='armors'?'armors' : 'consumables';

    const INV_NOTES = {
      consumables: 'Повышают характеристики. Можно использовать один раз на локации или в бою.',
      keyItems: '',
      weapons: 'Слоты 1–3 — персонажи Гл. 1, слоты 1–4 — Гл. 2+.',
      armors: '',
      storage: 'Хранилище доступно только с Главы 2. Ёмкость определяется флагом 64.',
    };

    let cap;
    if (active==='storage') cap = Number(s.flags[64]) || allRows.length;
    else if (kind==='consumables' || kind==='keyItems') cap = 12;
    else cap = s.meta.format===1 ? 12 : 48;
    const rows = allRows.slice(0, Math.min(cap, allRows.length));
    const q = state.search.toLowerCase();
    const ru = ruMapFor(kind);
    const vis = rows.map((value,index) => ({value,index})).filter(r => {
      if (!q) return true;
      const label = (ru&&ru[Number(r.value)]||'') + ' ' + Core.optionLabel(kind, r.value);
      return `${r.index} ${r.value} ${label}`.toLowerCase().includes(q);
    });
    const title = tabs.find(([k]) => k===active)?.[1] || active;
    const note = INV_NOTES[active] ? `<p class="helper" style="margin:8px 0 14px;">${INV_NOTES[active]}</p>` : '';

    const chap = s.meta.chapter;
    const availKind = active==='storage' ? null : kind;
    const badges = {};
    tabs.forEach(([k]) => {
      if (k==='storage') return;
      let c=0; (s.inventory[k]||[]).forEach(v => { if (availBad(k, Number(v), chap)) c++; });
      if (c) badges[k]=c;
    });
    const curWarn = badges[active] || 0;
    const warnBanner = curWarn ? `<p class="avail-banner">⚠ В этой вкладке ${curWarn} ${plural(curWarn,'предмет','предмета','предметов')} не из Главы ${chap}. Такие предметы в игре этой главы существовать не могут и часто ломают сохранение — замените их или поставьте «Пусто».</p>` : '';

    return `${subtabsHTML(tabs, active, 'inventory', badges)}${searchBar()}
      <article class="card"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:14px;">
        <div><h2>${esc(title)}</h2>
        <p class="sub">${rows.length} ${plural(rows.length, 'ячейка', 'ячейки', 'ячеек')}</p></div>
        <button class="btn small" data-action="inv-clear-empty" type="button" style="font-size:21px;">Сгруппировать</button>
      </div>
      ${note}${warnBanner}
      <div class="table-wrap"><table class="ed-table"><thead><tr><th style="width:48px;font-size:21px;">#</th><th style="width:110px;font-size:21px;">ID</th><th style="font-size:21px;">Предмет</th></tr></thead><tbody>
        ${vis.map(({value,index}) => {
          const dp = active==='storage'?`inventory.storage.${index}`:`inventory.${active}.${index}`;
          const bad = availKind ? availBad(availKind, Number(value), chap) : 0;
          const tag = bad ? `<span class="avail-warn" title="${esc(availWarnText(bad))}">⚠ Гл. ${bad}+</span>` : '';
          return `<tr class="${bad?'row-warn':''}"><td>${index+1}</td><td><input id="invnum-${active}-${index}" type="number" min="0" data-path="${dp}" data-itemnum="${kind}" data-avail="${availKind||''}" style="font-size:21px;" value="${Number(value||0)}"></td><td><select data-path="${dp}" style="font-size:21px;">${options(kind,value)}</select>${tag}</td></tr>`;
        }).join('')}
      </tbody></table></div></article>`;
  }

  function renderParty(slot) {
    const s = slot.save; let active = state.subroute || 'overview';

    const tabs = s.meta.format === 1 ? PARTY_TABS.filter(([k]) => k !== 'noelle') : PARTY_TABS;

    if (active !== 'overview' && !tabs.some(([k]) => k === active)) active = 'overview';
    if (active==='overview') {
      const Chars = window.KnightChars;
      const allowNon = !!state.allowNonStandardParty;
      const party = s.party;
      const chapChars = (Chars && Chars.CHAPTER_CHARS[s.meta.chapter]) || [1, 2, 3, 4];
      const allowedSlots = (Chars && Chars.ALLOWED_SLOTS) || {};
      const slotCard = (slot) => {
        const cur = Number(party[slot] || 0);

        let avail = [];
        for (const ch of chapChars) {
          const slots = allowedSlots[ch] || [1, 2];
          if (slots.includes(slot)) avail.push(ch);
        }

        if ((allowedSlots[0] || [1, 2]).includes(slot)) avail.push(0);
        if (allowNon) {
          avail = [...chapChars, 0];
        } else {

          const usedElsewhere = new Set(party.map((c, i) => i !== slot ? Number(c) : -99).filter(c => c !== 0 && c !== -99));
          avail = avail.filter(c => c === cur || c === 0 || !usedElsewhere.has(c));
        }
        avail = Array.from(new Set(avail)).sort((a, b) => a - b);

        if (party[2] !== 0 && !allowNon && slot === 1) avail.shift();

        const isValid = chapChars.includes(cur) || cur === 0;
        if (!avail.includes(cur)) avail.push(cur);
        const opts = avail.map(c => {
          const inv = (!chapChars.includes(c) && c !== 0) ? ' ⚠' : '';
          return `<option value="${c}"${c === cur ? ' selected' : ''}>${esc(characterName(c))}${inv} (${c})</option>`;
        }).join('');

        let titleHtml = '';
        if (cur !== 0 && chapChars.includes(cur) && Chars) {
          const t = Chars.computeTitle(cur, s);
          if (t) titleHtml = `<p class="sub" style="margin:6px 0 0;color:var(--yellow)">LV${t.lv} ${esc(t.name)}</p><p class="helper" style="margin:2px 0 0">${esc(t.desc)}</p>`;
        } else if (cur !== 0 && !isValid) {
          titleHtml = `<p class="helper" style="margin:6px 0 0;color:var(--danger,#e66)">Персонаж недоступен в этой главе.</p>`;
        }
        const accent = PARTY_ACCENT[{1:'kris',2:'susie',3:'ralsei',4:'noelle'}[cur]] || '';
        return `<article class="card ${accent}" style="text-align:center;">
          <p class="sub" style="margin:0;font-size:12px;letter-spacing:2px;">ФАЙЛ ${slot + 1} · MEMBER</p>
          <h2 style="margin:4px 0;text-transform:uppercase;">${esc(characterName(cur))}</h2>
          ${titleHtml}
          <div style="margin-top:14px;text-align:left;">${`<label class="field"><span>Персонаж</span><select data-path="party.${slot}">${opts}</select></label>`}</div>
        </article>`;
      };
      return `
        <article class="card accent-kris" style="margin-bottom:16px;">
          <p class="helper" style="margin:6px 0 12px;">Чтобы запустить интерактивное меню, нажмите по нему, после чего появится возможность изменения вашей экипировки, магии и предметов команды.</p>
          <div id="equip-menu-mount"></div>
        </article>
        <article class="card" style="margin-bottom:16px;">
          <label class="check-row" style="padding:6px 10px;"><input type="checkbox" data-toggle="allowNonStandardParty"${allowNon ? ' checked' : ''}><span>Нестандартный состав команды</span></label>
          <p class="helper" style="margin:6px 0 0;">«Нестандартный состав» позволяет ставить любого персонажа в любой файл. Игра обычно не рассчитана на такие сочетания — это может приводить к вылетам.</p>
        </article>
        <div class="grid three">${[0, 1, 2].map(slotCard).join('')}</div>
        <article class="card" style="margin-top:16px;"><h3>Подсказка</h3><p class="helper">Файл 1 — лидер (Крис). Остальные файлы — спутники.</p></article>`;
    }
  }

  function renderLightWorld(slot) {
    return `
      <article class="card accent-noelle" style="margin-bottom:16px;">
        <p class="helper" style="margin:6px 0 12px;">Для взаимодействия с интерактивным меню, кликните по нему.</p>
        <div id="light-menu-mount"></div>
      </article>`;
  }

  const PART_MAX = { 900: 7, 901: 5, 902: 4 };

  const VESSEL_MIND = [
    { flag: 903, q: 'КАКУЮ ЕДУ ВЫ\nПРЕДПОЧИТАЕТЕ?', opts: [[0,'СЛАДКУЮ'],[1,'МЯГКУЮ'],[2,'КИСЛУЮ'],[3,'СОЛЁНУЮ'],[4,'БОЛЬ'],[5,'ХОЛОДНУЮ']] },
    { flag: 904, q: 'ВАША ЛЮБИМАЯ\nГРУППА КРОВИ?', opts: [[0,'A'],[1,'AB'],[2,'B'],[3,'C'],[4,'D']] },
    { flag: 905, q: 'ЛЮБИМЫЙ ЦВЕТ\nВАШЕГО СОСУДА?', opts: [[0,'КРАСНЫЙ'],[1,'СИНИЙ'],[2,'ЗЕЛЁНЫЙ'],[3,'ГОЛУБОЙ']] },

    { flag: 909, q: 'НАДЕЛИТЕ ЕГО ДАРОМ.', opts: [[1,'ДОБРОТА'],[0,'УМ'],[-1,'РВЕНИЕ'],[-2,'ХРАБРОСТЬ'],[-3,'ГОЛОС']] },
    { flag: 906, q: 'ЧТО ВЫ ИСПЫТЫВАЕТЕ\nК СВОЕМУ ТВОРЕНИЮ?\n(ОНО НЕ УСЛЫШИТ.)', opts: [[0,'ЛЮБОВЬ'],[1,'НАДЕЖДУ'],[2,'ОТВРАЩЕНИЕ'],[3,'СТРАХ']] },
    { flag: 907, q: 'ВАШИ ОТВЕТЫ\nБЫЛИ ЧЕСТНЫ?', opts: [[0,'ДА'],[1,'НЕТ']] },
    { flag: 908, q: 'ВЫ ГОТОВЫ ТЕРПЕТЬ\nФИЗИЧЕСКУЮ И\nДУШЕВНУЮ БОЛЬ.', opts: [[0,'ДА'],[1,'НЕТ']] },
  ];

  const THRASH_OPTS = {
    220: [[-1,'НЕТ'],[0,'ЛАЗЕР'],[1,'МЕЧ'],[2,'ПЛАМЯ'],[3,'УТКА']],
    221: [[-1,'НЕТ'],[0,'ПРОСТОЕ'],[1,'КОЛЕСО'],[2,'ТАНК'],[3,'УТКА']],
    222: [[-1,'НЕТ'],[0,'КЕДЫ'],[1,'КОЛЁСА'],[2,'ГУСЕНИЦЫ'],[3,'УТКА']],
  };
  const THRASH_PART_LABEL = { 220: 'ГОЛОВА', 221: 'ТЕЛО', 222: 'БОТИНКИ' };

  function gtChoice(flag, opts, save) {
    const cur = save.flags[flag];
    return `<div class="gt-choice">${opts.map(([val, label]) =>
      `<button class="gt-opt${Number(cur)===Number(val)?' sel':''}" type="button" data-vchoice="${flag}" data-vval="${val}"><img class="soul-cur" src="game-sprites/spr_heart_0.png" alt="">${esc(label)}</button>`).join('')}</div>`;
  }

  function gtPart(flag, label, save) {
    const v = save.flags[flag] || 0; const max = PART_MAX[flag] || 0;
    return `<div class="gt-part">
      <span class="gp-label">${esc(label)}</span>
      <div class="gp-mid">
        <button class="gt-arrow" type="button" data-vpart="${flag}" data-dir="-1">&#9664;</button>
        <span class="gp-val">№ ${v + 1} из ${max + 1}</span>
        <button class="gt-arrow" type="button" data-vpart="${flag}" data-dir="1">&#9654;</button>
      </div>
    </div>`;
  }

  function colorGrid(index, save, label) {
    const cur = save.flags[index] || 0; let cells = '';
    for (let i = 0; i < 32; i += 1) cells += `<button type="button" class="swatch${i===cur?' sel':''}" data-color="${index}" data-ci="${i}" style="background:${getGameColor(i)}" title="Цвет ${i}" aria-label="Цвет ${i}" aria-pressed="${i===cur?'true':'false'}"></button>`;
    return `<div><div style="color:var(--text-3);font-size:12px;text-transform:uppercase;margin-bottom:6px;text-align:center">${esc(label || flagName(index))}</div><div class="color-grid">${cells}</div></div>`;
  }

  const VESSEL_S = 4;
  function vesselSprite(save) {
    const head = save.flags[900]||0, body = save.flags[901]||0, legs = save.flags[902]||0;
    const S = VESSEL_S;
    const layer = (file, topSp, hSp, z) => `<img src="sprites/vessel/${file}.png" style="left:0;top:${topSp*S}px;width:${21*S}px;height:${hSp*S}px;z-index:${z}" alt="" onerror="this.style.display='none'">`;
    return `<div class="gt-vessel">
      ${layer('vessel-head-'+head, 0, 22, 1)}
      ${layer('vessel-body-'+body, 17, 15, 2)}
      ${layer('vessel-legs-'+legs, 30, 9, 3)}
    </div>`;
  }
  function vesselCreator(save) {
    return `<div class="game-term">
      <div class="gt-stage"><img class="gt-soul-float" src="game-sprites/spr_heart_0.png" alt="">${vesselSprite(save)}</div>
      ${gtPart(900,'ГОЛОВА',save)}${gtPart(901,'ТУЛОВИЩЕ',save)}${gtPart(902,'НОГИ',save)}
      ${VESSEL_MIND.map(q => `<div class="gt-question">${esc(q.q)}</div>${gtChoice(q.flag, q.opts, save)}`).join('')}
    </div>`;
  }

  const THRASH_S = 3;
  const THRASH_BX = 29 * THRASH_S;
  const THRASH_BY = 7 * THRASH_S;

  const THRASH_HEAD = {
    0: { f:'head-0', W:25, H:13, x:-26, y:0  },
    1: { f:'head-1', W:27, H:14, x:-29, y:0  },
    2: { f:'head-2', W:26, H:13, x:-24, y:-1 },
    3: { f:'head-3', W:23, H:21, x:-22, y:-7 },
  };

  const THRASH_FOOT = {
    0: { back:{ f:'shoe-0', x:-11, y:19 }, front:{ f:'shoe-0', x:-5, y:20 } },
    1: { back:{ f:'shoe-1', x:-6,  y:17 }, front:{ f:'shoe-1', x:0,  y:18 } },
    2: {                                    front:{ f:'shoe-2', x:-15,y:18 } },
    3: { back:{ f:'shoe-4', x:-8,  y:21 }, front:{ f:'shoe-3', x:0,  y:22 } },
  };
  const FOOT_W = 34, FOOT_H = 11, BODY_W = 42, BODY_H = 25, BODY_X = -27, BODY_Y = 0;
  function tLayer(key, colorIdx, x, y, w, h, z) {
    const s = THRASH_S;
    const fid = 'tmf' + (_tmFid++);
    const color = getGameColor(colorIdx);
    const svg = `<svg width="${w*s}" height="${h*s}" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="image-rendering:pixelated;display:block"><defs><filter id="${fid}" color-interpolation-filters="sRGB"><feFlood flood-color="${color}" result="f"/><feComposite in="f" in2="SourceGraphic" operator="in" result="fm"/><feBlend mode="multiply" in="SourceGraphic" in2="fm"/></filter></defs><image href="sprites/thrash-machine/${key}.png" width="${w}" height="${h}" filter="url(#${fid})" style="image-rendering:pixelated"/></svg>`;
    return `<div class="tm-layer" style="left:${THRASH_BX + x*s}px;top:${THRASH_BY + y*s}px;width:${w*s}px;height:${h*s}px;z-index:${z}">${svg}</div>`;
  }
  function thrashSprite(save) {
    const head = Number(save.flags[220]), body = Number(save.flags[221]), foot = Number(save.flags[222]);

    const cBody = save.flags[223]||0, cHead = save.flags[224]||0, cFoot = save.flags[225]||0;
    const F = THRASH_FOOT[foot]; let html = '';
    if (F && F.back) html += tLayer(F.back.f, cFoot, F.back.x, F.back.y, FOOT_W, FOOT_H, 1);
    if (body >= 0) html += tLayer('body-'+body, cBody, BODY_X, BODY_Y, BODY_W, BODY_H, 2);
    if (THRASH_HEAD[head]) { const H = THRASH_HEAD[head]; html += tLayer(H.f, cHead, H.x, H.y, H.W, H.H, 3); }
    if (F && F.front) html += tLayer(F.front.f, cFoot, F.front.x, F.front.y, FOOT_W, FOOT_H, 4);
    return `<div class="gt-thrash">${html}</div>`;
  }
  function thrashCreator(save) {
    return `<div class="game-term">
      <div class="gt-stage">${thrashSprite(save)}</div>
      ${[220,221,222].map(f => `<div class="gp-label" style="text-align:center;color:#fff;margin:10px 0 2px">${esc(THRASH_PART_LABEL[f])}</div>${gtChoice(f, THRASH_OPTS[f], save)}`).join('')}
      <div style="display:flex;flex-wrap:wrap;gap:18px;margin-top:14px;justify-content:center">${colorGrid(224,save,'ЦВЕТ ГОЛОВЫ')}${colorGrid(223,save,'ЦВЕТ ТЕЛА')}${colorGrid(225,save,'ЦВЕТ БОТИНОК')}</div>
    </div>`;
  }

  const SUSIEFIT = [
    { flag:1421, part:'HAIR', frames:6, opts:[
      { n:'Normal',      d:"-Normal-\nYour everyday\nSusie. Can't\ndeny the\nclassics." },
      { n:'Ponytail',    d:'-Ponytail-\nA horse tail\ncould appeal\nto\nungulates?' },
      { n:'Royal Bob',   d:'-Royal Bob-\nHas a needle\nthat could\ndouble as a\nweapon.' },
      { n:'Duck Tiara',  d:'-Duck Tiara-\nThis outfit\nsucks. You\nare going to\nlose points.' },
      { n:'Fresh Swish', d:'-Fresh Swish-\nWhip your\nhair around\nto cut grass\nor beat foes.' },
      { n:'Princey',     d:'-Princey-\nSeen in the\nboys role of\nTakarabazooka.' },
    ]},
    { flag:1422, part:'SHIRT', frames:8, opts:[
      { n:'Dark Jacket',  d:'-Dark Jacket-\nIncreases\naptitude\ntowards\naxe and gun.' },
      { n:'Rip Jacket',   d:'-Rip Jacket-\nHigh quality\njacket, with\nhigh quality\nrips.' },
      { n:'Similar Hood', d:'-Similar Hood-\nSports could\nbe committed\nin a cool\nclimate.' },
      { n:'Duck',         d:'-Duck-\nThis outfit\nsucks. You\nare going to\nlose points.' },
      { n:'Lancer Shirt', d:'-Lancer Shirt-\nA shirt that\nprotects\nagainst\nLancers.' },
      { n:'Royal Dress',  d:'-Royal Dress-\nThe pinnacle\nof elegance,\nyou will look\nnormal\ngood.' },
      { n:'Swag Jacket',  d:'-Swag Jacket-\nThe King of\ncasual\nfashion,\nare you ready?' },
      { n:'Tuxusie',      d:'-Tuxusie-\nPart of her\nrarely seen\nFormal Form.' },
    ]},
    { flag:1423, part:'PANT', frames:7, opts:[
      { n:'SusiePant',   d:'-SusiePant-\nTrousers with\nlarge pocket\nto hold\nmultiple gun.' },
      { n:'Shorter',     d:'-Shorter-\nExpose ankle\nto elements\nto make it\nstronger.' },
      { n:'Bagi',        d:'-Bagi-\nMighty nature\ncannot fell\nthe casual\nloose thread.' },
      { n:'Duck',        d:'-Duck-\nThis outfit\nsucks. You\nare going to\nlose points.' },
      { n:'White Pant',  d:'-White Pant-\nBut what if\nyou spill\nsomething\nwhen eating.' },
      { n:'Gray Pants',  d:'-Gray Pants-\nSafe if you\nspill gray\nfood.' },
      { n:'Blackpants2', d:"-Blackpants2-\nRalsei's\nlost fur will\nstand out." },
    ]},
    { flag:1424, part:'HAT', frames:5, opts:[
      { n:'No Hat',     d:'-No Hat-\nLittle swag,\nbut easier\nto fire a\ngun.' },
      { n:'Casual Hat', d:'-Casual Hat-\nAppearance\nof enjoying\nthe sport\nor sports.' },
      { n:'Second Hat', d:'-Second Hat-\nSomeone put\nin the same\nhat twice.' },
      { n:'Tiara',      d:'-Tiara-\nA princesses\nappearance\ngives a royal\ntreatment.' },
      { n:'Silk',       d:'-Silk-\nNamed from a\nsong mix of\nsoda + milk.' },
    ]},
    { flag:1425, part:'SHO', frames:7, opts:[
      { n:'Susie Shoesy', d:'-Susie Shoesy-\nAlready\nbroken in,\neasier to\nrun and gun.' },
      { n:'Brown Leg',    d:"-Brown Leg-\nIt's a\nshoes\nused for\nbrown." },
      { n:'Black Flats',  d:'-Black Flats-\nIt will cool\nyour ankles\nwith the\nlow coverage.' },
      { n:'Duck',         d:'-Duck-\nThis outfit\nsucks. You\nare going to\nlose points.' },
      { n:'Glass Shoes',  d:'-Glass Shoes-\nRalsei might\nturn back to\na pumpkin\nor mouse.' },
      { n:'Brown Shoe',   d:'-Brown Shoe-\nA shoe made\nof a sturdy\nbrown, like\ndirt.' },
      { n:'Blackshoes3',  d:'-Blackshoes3-\nMaybe there\nwas only 2.' },
    ]},
  ];
  const SUSIEFIT_STATS = {
    1421: [[5],[1,2],[0,2],[],[3,4],[0]],
    1422: [[5],[1,3],[3,4],[],[2,4],[0,2],[1,4],[0]],
    1423: [[5],[1,4],[1,3],[],[0,2],[2,4],[0]],
    1424: [[5],[1,4],[4,3],[0,2],[0]],
    1425: [[5],[1,3],[1,4],[],[0,2],[3,4],[0]],
  };
  const SUSIEFIT_STATCOLOR = ['#80ff80','#ffff80','#ff99ff','#ff4d4d','#8080ff','#b366b3'];
  function sfFrame(v, n) { v = Number(v) || 0; return (v >= 0 && v < n) ? v : 0; }
  function sfVal(save, flag) { const p = SUSIEFIT.find(x => x.flag === flag); return sfFrame(save.flags[flag], p.frames); }
  function susieFitStars(save, statIdx) {
    let n = 0;
    for (const p of SUSIEFIT) { const arr = SUSIEFIT_STATS[p.flag][sfVal(save, p.flag)] || []; n += arr.filter(x => x === statIdx).length; }
    return n;
  }
  function sfTint(src, w, h, color) {
    const fid = 'sff' + (_tmFid++);
    return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="image-rendering:pixelated;display:block"><defs><filter id="${fid}" color-interpolation-filters="sRGB"><feFlood flood-color="${color}" result="f"/><feComposite in="f" in2="SourceGraphic" operator="in"/></filter></defs><image href="game-sprites/susiefit/${src}" width="${w}" height="${h}" filter="url(#${fid})"/></svg>`;
  }
  function susieFitSprite(save, S) {
    const W = 33 * S, H = 51 * S;
    const layer = (key, frame, z, top, h) => `<img src="game-sprites/susiefit/${key}_${frame}.png" style="position:absolute;left:0;top:${top}px;width:${W}px;height:${h}px;z-index:${z};image-rendering:pixelated" alt="" onerror="this.style.display='none'">`;
    return `<div class="tf-susie" style="width:${W}px;height:${H}px;">
      ${layer('feet', sfVal(save,1425), 1, 0, H)}
      ${layer('pants', sfVal(save,1423), 2, 0, H)}
      ${layer('shirt', sfVal(save,1422), 3, 0, H)}
      ${layer('hair', sfVal(save,1421), 4, 0, H)}
      ${layer('hat', sfVal(save,1424), 5, -5 * S, 56 * S)}
    </div>`;
  }
  function susieFitIsDuck(save) { return [1421,1422,1423,1425].every(f => sfVal(save, f) === 3); }
  function sfRow(save, flag, label, x, y, focused, rightCol, scrolling) {
    const v = sfVal(save, flag);
    const valX = x + (rightCol ? 128 : 150);
    const edit = (focused && scrolling) ? ' edit' : '';
    const heart = focused ? `<img class="tf-heart" src="game-sprites/spr_heart_0.png" alt="" style="left:${x + 32}px;top:${y + 6}px">` : '';
    return `${heart}
      <button class="tf-opt${focused ? ' foc' : ''}" type="button" data-sffocus="${flag}" style="left:${x + 56}px;top:${y}px">${esc(label)}</button>
      <button class="tf-arrow${edit}" type="button" data-sfarrow="${flag}" data-dir="-1" style="left:${valX - 22}px;top:${y + 3}px" aria-label="назад"><img src="game-sprites/susiefit/arrow_left.png" alt=""></button>
      <span class="tf-val${edit}" style="left:${valX}px;top:${y}px">0${v}</span>
      <button class="tf-arrow${edit}" type="button" data-sfarrow="${flag}" data-dir="1" style="left:${valX + 24}px;top:${y + 3}px" aria-label="вперёд"><img src="game-sprites/susiefit/arrow_right.png" alt=""></button>`;
  }
  const SUSIEFIT_GRID = [[1421, 1422, 1423], [1424, 1425, 'end']];
  function susieFitCreator(save) {
    const valid = [1421, 1422, 1423, 1424, 1425, 'end'];
    const focus = valid.includes(state.sfFocus) ? state.sfFocus : 1421;
    const scrolling = !!state.sfScroll && focus !== 'end';
    const S = 2;
    let rows = '';
    [SUSIEFIT[0], SUSIEFIT[1], SUSIEFIT[2]].forEach((p, i) => { rows += sfRow(save, p.flag, p.part, 22, 306 + i * 42, focus === p.flag, false, scrolling); });
    [SUSIEFIT[3], SUSIEFIT[4]].forEach((p, i) => { rows += sfRow(save, p.flag, p.part, 210, 306 + i * 42, focus === p.flag, true, scrolling); });
    const endFoc = focus === 'end';
    const endY = 306 + 2 * 42;
    const endHeart = endFoc ? `<img class="tf-heart" src="game-sprites/spr_heart_0.png" alt="" style="left:${210 + 32}px;top:${endY + 6}px">` : '';
    rows += `${endHeart}<button class="tf-opt${endFoc ? ' foc' : ''}" type="button" data-sffocus="end" style="left:${210 + 56}px;top:${endY}px">END</button>`;
    let stats = '';
    for (let i = 0; i < 6; i++) {
      stats += `<span class="tf-stat" style="left:410px;top:${104 + 26 * i}px">${sfTint('stat_' + i + '.png', 58, 18, SUSIEFIT_STATCOLOR[i])}</span>`;
      const cnt = susieFitStars(save, i);
      for (let j = 0; j < cnt; j++) stats += `<span class="tf-star" style="left:${480 + j * 22}px;top:${104 + 26 * i}px">${sfTint('star.png', 18, 18, SUSIEFIT_STATCOLOR[i])}</span>`;
    }
    let desc;
    if (focus === 'end') desc = 'END\n\nЗакончить примерку.\nВыбор уже сохранён\nв флаги 1421–1425.';
    else { const fp = SUSIEFIT.find(p => p.flag === focus); desc = fp.opts[sfVal(save, focus)].d; }
    const duck = susieFitIsDuck(save) ? '<div class="tf-duck">«This outfit sucks ass.»</div>' : '';
    const hint = 'WASD / стрелки — выбор · E / Z / Enter — ок · Q / C — отмена';
    return `<div class="tf-wrap"><div class="tf-screen" tabindex="0">
      <img class="tf-header" src="game-sprites/susiefit/header.png" alt="Outfit to thrash your date's ass" style="left:${320 - 207}px;top:30px">
      <div class="tf-stage" style="left:${300 - 33 * S / 2}px;top:150px">${susieFitSprite(save, S)}</div>
      ${rows}
      ${stats}
      <div class="tf-desc" style="left:392px;top:296px">${esc(desc)}</div>
      ${duck}
      <div class="tf-hint">${esc(hint)}</div>
    </div></div>`;
  }

  function bitmaskValue(value, bit, width) {
    const mask = (1 << (width || 1)) - 1;
    return (Number(value || 0) >> bit) & mask;
  }

  function bitmaskControlHTML(index, value, doc, inline) {
    const bits = Array.isArray(doc && doc.bits) ? doc.bits : [];
    if (!bits.length) return '';
    const full = bits.reduce((acc, b) => acc | (((1 << (Number(b.width) || 1)) - 1) << Number(b.bit)), 0);
    let upto = 0;
    let setCount = 0;
    const bitRows = bits.map((b) => {
      const bit = Number(b.bit); const width = Number(b.width) || 1;
      upto |= (((1 << width) - 1) << bit);
      const cur = bitmaskValue(value, bit, width);
      const checked = cur !== 0;
      if (checked) setCount += 1;
      const label = b.label || `bit ${bit}`;
      const title = width > 1 ? `Биты ${bit}-${bit + width - 1}` : `Бит ${bit}`;
      if (width > 1) {
        const max = (1 << width) - 1;
        const opts = Array.from({ length: max + 1 }, (_, v) => `<option value="${v}"${v === cur ? ' selected' : ''}>${v}</option>`).join('');
        return `<div class="bit-row bit-row-wide${checked ? ' on' : ''}" title="${esc(title)}"><span class="bit-num">${bit}-${bit + width - 1}</span><span class="bit-lbl">${esc(label)}</span><select data-flagbits="${index}" data-bit="${bit}" data-width="${width}">${opts}</select><button class="btn small" type="button" data-flagbits-upto="${index}" data-mask="${upto}" title="Взвести все биты до этого включительно">◄</button></div>`;
      }
      return `<div class="bit-row${checked ? ' on' : ''}" title="${esc(title)}"><label><input type="checkbox" data-flagbit="${index}" data-bit="${bit}"${checked ? ' checked' : ''}><span class="bit-num">#${bit}</span><span class="bit-lbl">${esc(label)}</span></label><button class="btn small" type="button" data-flagbits-upto="${index}" data-mask="${upto}" title="Взвести все биты до этого включительно">◄</button></div>`;
    }).join('');
    return `<div class="bitmask-editor${inline ? ' compact' : ''}">
      <div class="bitmask-head"><span class="bm-count">Включено <b>${setCount}</b> из ${bits.length} · значение ${esc(value || 0)}</span><span><button class="btn small" type="button" data-flagbits-all="${index}" data-mask="${full}">Все</button> <button class="btn small" type="button" data-flagbits-clear="${index}">Сброс</button></span></div>
      <details class="bitmask-details"${inline ? '' : ' open'}><summary>Показать/скрыть отдельные биты (${bits.length})</summary><div class="bitmask-note">Это <b>набор независимых битов</b>-маркеров (комнаты, объекты, монеты, счётчики прогресса), а не один выбор. Любую комбинацию можно ставить одновременно — невозможных сочетаний нет; все биты = всё в зоне собрано/пройдено.</div><div class="bit-grid">${bitRows}</div></details>
    </div>`;
  }

  function momentField(index, save) {
    const doc = flagDoc(index); const value = save.flags[index] || 0; const name = flagName(index);
    const keys = doc && doc.values ? Object.keys(doc.values).map(Number).sort((a,b)=>a-b) : null;
    let control;
    if (doc && doc.bits) {
      control = `<label class="field"><span>${esc(name)} <span style="color:var(--text-3)">#${index}</span></span><span class="flag-value-readonly">Текущее значение: ${esc(flagNumberDisplay(index, value))}</span></label>${bitmaskControlHTML(index, value, doc, false)}`;
    } else if (keys && keys.length === 2 && keys[0] === 0 && keys[1] === 1) {
      control = `<label class="check-row"><input type="checkbox" data-path="flags.${index}"${Number(value)===1?' checked':''}><span>${esc(name)} <span style="color:var(--text-3)">#${index}</span></span></label>`;
    } else if (doc && doc.values) {
      const has = keys.some(k => k === Number(value));
      const opts = (has ? Object.entries(doc.values) : [[value, `Неизвестно (${value})`], ...Object.entries(doc.values)])
        .map(([k,v]) => `<option value="${k}"${Number(k)===Number(value)?' selected':''}>${esc(v)} (${k})</option>`).join('');
      control = `<label class="field"><span>${esc(name)} <span style="color:var(--text-3)">#${index}</span></span><select data-path="flags.${index}">${opts}</select></label>`;
    } else {
      let effMax = (doc && doc.max !== undefined) ? Number(doc.max) : null;
      if (effMax === null) {
        const a = flagAuto(index);
        if (a && Array.isArray(a.v) && a.v.length) {
          const nums = a.v.map(Number).filter(x => Number.isFinite(x));
          if (nums.length) { const m = Math.max(...nums); if (m > 0) effMax = m; }
        }
      }
      const min = doc && doc.min !== undefined ? flagNumberAttr(index, 'min', doc.min) : '';
      const max = effMax !== null ? flagNumberAttr(index, 'max', effMax) : '';
      const maxBtn = effMax !== null ? ` <button class="btn small" type="button" data-flagmax="${index}" data-maxval="${effMax}" title="Поставить максимум (из кода игры)">Макс.</button>` : '';
      control = `<label class="field"><span>${esc(name)} <span style="color:var(--text-3)">#${index}</span></span><span class="numwrap"><input type="number" data-path="flags.${index}" value="${esc(flagNumberDisplay(index, value))}"${min}${max}${flagNumberExtra(index)}>${flagNumberSuffix(index)}${maxBtn}</span></label>`;
    }
    return `<div class="moment"><div class="moment-field">${control}</div>${hintBtn(index)}</div>`;
  }

  const STORY_SECTION_TITLES = { vessel: 'СОСУД (Vessel)', thrashMachine: 'Взбучкотрон', darkWorld: 'Мир тьмы', lightWorld: 'Мир света', onion: 'Лук (Onion)', gameshow: 'Телешоу Тенны' };

  const MENU_FLAG_LOC = {};
  [900,901,902,903,904,905,906,907,908,909].forEach(i => { MENU_FLAG_LOC[i] = 'Гл. 1: СОСУД (меню-конструктор)'; });
  [220,221,222,223,224,225].forEach(i => { MENU_FLAG_LOC[i] = 'Гл. 1: Взбучкотрон (меню-конструктор)'; });
  [1421,1422,1423,1424,1425].forEach(i => { MENU_FLAG_LOC[i] = 'Гл. 5: Наряд Сьюзи (меню-конструктор)'; });
  function flagStoryLocations(index) {
    if (MENU_FLAG_LOC[index]) return [MENU_FLAG_LOC[index]];
    if (flagName(index).startsWith('RECRUIT_')) return ['Раздел «В отряде»'];
    const out = [];
    const M = window.KnightProgressMap || {};
    for (const chapter of [1, 2, 3, 4, 5]) {
      for (const sec of (M[chapter] || [])) {
        const cs = sec.clusters || [{ title: '', flags: sec.flags }];
        for (const c of cs) {
          if (Array.isArray(c.flags) && c.flags.includes(index)) out.push(`Гл. ${chapter}: ${sec.title}${c.title ? ' → ' + c.title : ''}`);
        }
      }
    }
    return [...new Set(out)];
  }

  function flagPersistChapters(index) {
    return (I18n.FLAG_CATEGORIES || [])
      .map(([key, , indices]) => {
        const m = /^persist(\d+)$/.exec(key);
        return m && Array.isArray(indices) && indices.includes(index) ? Number(m[1]) : null;
      })
      .filter(Boolean);
  }

  function flagSectionCellHTML(i) {
    const story = flagStoryLocations(i);
    const persist = flagPersistChapters(i);
    const storyText = story.length ? `Сюжет: ${story.join('; ')}` : 'Сюжет: нет';
    const persistText = persist.length ? `Сохранённый выбор: ${persist.map(ch => `Гл. ${ch}`).join(', ')}` : 'Сохранённый выбор: нет';
    return `<span class="flag-desc">${esc(storyText)}</span><span class="flag-desc" style="display:block;margin-top:4px">${esc(persistText)}</span>`;
  }

  function flagHasMissingSection(i) {
    return !flagStoryLocations(i).length || !flagPersistChapters(i).length;
  }

  const UNUSED_FLAGS = new Set([111, 125, 204, 208, 235, 267, 351, 361, 501, 588, 704, 705, 728, 783, 784, 785, 795, 1052, 1057, 1060, 1085, 1088, 1097, 1098, 1104, 1105, 1106, 1107, 1108, 1126, 1127, 1128, 1129, 1130, 1138, 1142, 1164, 1169, 1212, 1271, 1279, 1280, 1541, 1560]);
  const RESERVE_FLAGS = new Set([0, 143, 144]);

  function flagIsReserveIndex(i, slot) {
    if (RESERVE_FLAGS.has(i)) return true;
    return flagName(i) === `FLAG_${i}` && !flagDoc(i) && ((slot.save.flags[i] || 0) === 0);
  }

  function flagMatchesReserveFilters(i, slot) {
    return !state.flagHideReserve || !flagIsReserveIndex(i, slot);
  }

  function flagMatchesUnusedFilters(i) {
    const isUnused = UNUSED_FLAGS.has(i);
    if (state.flagOnlyUnused) return isUnused;
    if (state.flagHideUnused) return !isUnused;
    return true;
  }

  function flagMatchesRecruitFilters(i) {
    return !state.flagHideRecruits || !flagName(i).startsWith('RECRUIT_');
  }

  function categorizedFlagSet(max) {
    const out = new Set();
    const cats = I18n.FLAG_CATEGORIES || [];
    const catKeys = new Set(cats.map(([key]) => key));
    for (const [, , indices] of cats) {
      if (!Array.isArray(indices)) continue;
      indices.forEach(i => { if (i < max) out.add(i); });
    }
    const docs = I18n.FLAG_DOCS || {};
    for (const k in docs) {
      if (docs[k] && catKeys.has(docs[k].category)) {
        const i = Number(k);
        if (i < max) out.add(i);
      }
    }
    return out;
  }

  function flagMatchesCategoryFilters(i, categorized) {
    return !state.flagHideCategorized || !categorized.has(i);
  }

  function flagMatchesMissingFilters(i) {
    const filtersOn = !!(state.flagMissingOnly || state.flagMissingStoryOnly || state.flagMissingPersistOnly);
    if (!filtersOn) return true;
    const storyMissing = !flagStoryLocations(i).length;
    const persistMissing = !flagPersistChapters(i).length;
    return (state.flagMissingOnly && (storyMissing || persistMissing))
      || (state.flagMissingStoryOnly && storyMissing)
      || (state.flagMissingPersistOnly && persistMissing);
  }
  function storyPersistFlags(ch) {
    const cats = (I18n && I18n.FLAG_CATEGORIES) || [];
    const row = cats.find((c) => c[0] === 'persist' + ch);
    return row ? row[2].slice() : [];
  }
  function storyTheme(title) {
    const t = title || '';
    if (/Ритм|Тенн/i.test(t)) return 'st-tenna';
    if (/Sword|Shadow Mantle/i.test(t)) return 'st-sword';
    if (/Weird|Snowgrave/i.test(t)) return 'st-weird';
    if (/Источник|финал/i.test(t)) return 'st-end';
    if (/Бои|счётчик|телешоу|секрет/i.test(t)) return 'st-battle';
    if (/Мир света/i.test(t)) return 'st-lw';
    if (/Мир тьмы|Castle Town|Киберполе|Кибер-Сити|Особняк|Лес|Поле|Карточн|Замок|Сад|Обрыв|Dark Sanctuary|церков|Telemир|Телемир/i.test(t)) return 'st-dw';
    return 'st-other';
  }

  function renderStory(slot) {
    const s = slot.save; const chapter = s.meta.chapter;
    const tabs = [['ch1','Глава 1'],['ch2','Глава 2'],['ch3','Глава 3'],['ch4','Глава 4'],['ch5','Глава 5']];
    const active = state.subroute || `ch${Math.min(chapter,5)||1}`;
    const ac = Number(active.replace('ch','')) || 1;
    const note = ac > chapter ? `<p class="helper" style="margin-bottom:14px;color:var(--yellow)">Сейчас загружено сохранение Главы ${chapter}. Флаги Главы ${ac} можно редактировать, но они вступят в силу только в этой главе.</p>` : '';
    const shown = new Set();
    const moment = (i) => { shown.add(Number(i)); return momentField(i, s); };
    const grid = (arr) => `<div class="grid two" style="margin-top:12px;">${(arr||[]).map(moment).join('')}</div>`;
    let body = '';

    if (ac === 1) {
      body += `<div class="grid two">
        <article class="card accent-red"><h2>СОСУД (Vessel)</h2><p class="sub">Создание СОСУДА из пролога</p>${vesselCreator(s)}</article>
        <article class="card accent-susie"><h2 style="margin-bottom:12px;">Взбучкотрон</h2>${thrashCreator(s)}</article>
      </div>`;
    }
    if (ac === 5) {
      body += `<article class="card accent-susie"><h2 style="margin-bottom:4px;">Наряд Сьюзи</h2><p class="sub" style="margin-bottom:16px;">Да, да, а он запоминается, прикиньте?</p>${susieFitCreator(s)}</article>`;
    }

    const SS = (window.KnightProgressMap && window.KnightProgressMap[ac]) || null;
    if (SS && SS.length) {
      body += `<div class="story-toolbar"><button class="btn small" type="button" data-action="story-expand">Развернуть всё</button><button class="btn small" type="button" data-action="story-collapse">Свернуть всё</button></div>`;
      for (const sec of SS) {
        let inner;
        if (sec.clusters) inner = sec.clusters.map((c) => `<details class="story-cluster" open><summary><span class="sc-chev">▶</span><span class="sc-title">${esc(c.title)}</span><span class="sc-count">${c.flags.length}</span></summary><div class="story-cluster-body">${grid(c.flags)}</div></details>`).join('');
        else inner = `<div class="story-cluster-body" style="padding:0;">${grid(sec.flags)}</div>`;
        const cnt = sec.clusters ? sec.clusters.reduce((a,c)=>a+c.flags.length,0) : (sec.flags||[]).length;
        body += `<details class="story-sec ${storyTheme(sec.title)}" open><summary><span class="st-chev">▶</span><span class="st-title">${esc(sec.title)}</span><span class="st-count">${cnt} ${plural(cnt, 'флаг', 'флага', 'флагов')}</span></summary><div class="story-sec-body">${inner}</div></details>`;
      }
    } else {

      const sf = Core.STORY_FLAGS[ac] || {};
      const sp = (Core.STORY_PERSIST && Core.STORY_PERSIST[ac]) || {};
      const ORDER = ['darkWorld', 'gameshow', 'onion', 'lightWorld'];
      const keys = [...new Set([...Object.keys(sf), ...Object.keys(sp)])].filter((k) => k !== 'vessel' && k !== 'thrashMachine');
      keys.sort((a, b) => { const ia = ORDER.indexOf(a), ib = ORDER.indexOf(b); return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib); });
      keys.forEach((key) => {
        const merged = [...new Set([...(sf[key] || []), ...(sp[key] || [])])];
        if (!merged.length) return;
        const title = STORY_SECTION_TITLES[key] || key;
        body += `<article class="card" style="margin-top:16px;"><h2>${esc(title)} (Глава ${ac})</h2>${grid(merged)}</article>`;
      });
    }

    const rest = storyPersistFlags(ac).filter((i) => !shown.has(Number(i)));
    if (rest.length) {
      body += `<article class="card" style="margin-top:16px;"><h2>Остальные флаги Главы ${ac} <span style="color:var(--text-3);font-size:15px;">— ${rest.length}</span></h2><p class="sub">Флаги этой главы, не вошедшие в сюжетные блоки выше — в основном технические маркеры комнат, монеты и мелкие состояния. Их также можно править на вкладке «Флаги».</p><details class="story-rest"><summary>Показать остальные (${rest.length})</summary>${grid(rest)}</details></article>`;
    }
    return `${subtabsHTML(tabs, active, 'story')}${note}${body}`;
  }

  function renderRecruits(slot) {
    const META = (window.KnightChars && window.KnightChars.RECRUIT_META) || {};
    const named = Core.DATA.flags.filter(([,n]) => n.startsWith('RECRUIT_'));
    const showNon = !!state.showNonRecruitable;
    const q = state.search.toLowerCase();
    const rname = (i, n) => (I18n.RECRUIT_DOCS && I18n.RECRUIT_DOCS[i]) || n.replace('RECRUIT_', '');
    const groups = [['Глава 1', 1], ['Глава 2', 2], ['Глава 3', 3], ['Глава 4', 4], ['Глава 5', 5]].map(([title, ch]) => {
      let list = named.filter(([i]) => (META[i] ? META[i].ch === ch : false));
      if (!showNon) list = list.filter(([i]) => META[i] && META[i].r);
      if (q) list = list.filter(([i, n]) => `${i} ${n} ${rname(i, n)}`.toLowerCase().includes(q));
      return [title, list];
    }).filter(([, l]) => l.length);

    const recruitRow = (i, n) => {
      const meta = META[i] || { c: 1, r: true };
      const count = meta.c || 1;
      const flagVal = Number(slot.save.flags[i]) || 0;

      let recruited = flagVal;
      if (count > 1 && flagVal !== 0 && flagVal !== -1) recruited = Math.round(flagVal * count);
      const full = recruited === count;
      const statusText = full ? (count > 1 ? `Все (${count})` : 'В отряде')
        : recruited === -1 ? 'Потерян' : recruited > 0 ? 'Частично' : 'Нет';
      const statusColor = full ? 'var(--green)' : recruited > 0 ? 'var(--yellow)' : 'var(--text-3)';
      const statusCell = `<span style="color:${statusColor}">${statusText}</span>`;
      const maxBtn = full ? '' : ` <button class="btn small" type="button" data-recruit-max="${i}" title="Выставить максимум (${count})">Макс</button>`;
      const countCell = `<input id="rec-${i}" type="number" min="-1" max="${count}" data-recruit="${i}" data-count="${count}" value="${recruited}" style="width:70px;"> <span style="color:var(--text-3)">из ${count}</span>${maxBtn}`;
      return `<tr><td>${esc(rname(i, n))} <span style="color:var(--text-3)">(${esc(n.replace('RECRUIT_', ''))})</span><br><code>#${i}</code></td>
        <td>${statusCell}</td>
        <td>${countCell}</td></tr>`;
    };

    return `<article class="card accent-noelle" style="margin-bottom:16px;">
        <h2>В отряде</h2>
        <p class="helper" style="margin-top:8px;">«В отряде» — это завербованные враги: те, кого вы пощадили или завербовали в бою вместо победы силой. В игре они переселяются в город Мира тьмы и пополняют список новобранцев. Здесь «в отряде» = враг завербован (это <b>не</b> боевая команда Крис/Сьюзи/Ральзей — она в разделе «Команда»).</p>
      </article>
      <div class="inline-tools" style="margin-bottom:14px;flex-wrap:wrap;gap:10px;">
        <button class="btn small primary" data-action="recruit-all" type="button">Завербовать всех</button>
        <button class="btn small" data-action="recruit-clear" type="button">Сбросить всех</button>
        <label class="check-row" style="padding:6px 10px;"><input type="checkbox" data-toggle="showNonRecruitable"${showNon ? ' checked' : ''}><span>Показать невербуемых (боссы, враги Гл. 1–2)</span></label>
      </div>${searchBar()}

      ${groups.map(([title, list]) => {
        const total = list.length;
        const got = list.filter(([i]) => Number(slot.save.flags[i]) > 0).length;
        return `<article class="card" style="margin-bottom:16px;"><h2>${esc(title)} <span style="color:var(--text-3);font-size:15px;">— ${got}/${total} в отряде</span></h2>
          <div class="table-wrap" style="margin-top:12px;"><table class="ed-table"><thead><tr><th>Враг</th><th style="width:130px">Статус</th><th style="width:150px">Сколько</th></tr></thead><tbody>
          ${list.map(([i, n]) => recruitRow(i, n)).join('')}
          </tbody></table></div></article>`;
      }).join('') || '<article class="card"><p class="helper">Нет записей для отображения. Включите «Показать невербуемых» или сбросьте поиск.</p></article>'}`;
  }

  function flagAutoHint(name) {
    if (!name || /^FLAG_\d+$/.test(name)) return '';
    const rules = [
      [/^GOT_/, 'Получен предмет или награда.'],
      [/^RECRUIT_/, 'Статус вербовки врага (см. раздел «В отряде»).'],
      [/^TALKED_|_TALK(ED)?$|_TALK_/, 'Состоялся разговор с персонажем.'],
      [/^ENCOUNT(ER)?_|_ENCOUNTER/, 'Маркер встречи или боя.'],
      [/^FOUGHT_|^BEAT_|_DEFEATED|^DOOM_|_FIGHT/, 'Бой пройден / враг повержен.'],
      [/^SOLVED_|_PUZZLE|_SOLVED$/, 'Состояние головоломки.'],
      [/^INSPECTED_|^READ_|^READABLE_|_READABLE/, 'Объект осмотрен или прочитан.'],
      [/^USED_/, 'Предмет или объект был использован.'],
      [/^SEEN_|_SEEN$|^SAW_/, 'Сцена или событие просмотрено.'],
      [/^VESSEL_/, 'Параметр Сосуда (см. раздел «Сюжет»).'],
      [/^THRASH_MACHINE_/, 'Параметр Машины Хлама (см. раздел «Сюжет»).'],
      [/^EGG_/, 'Прогресс с пасхальным Яйцом.'],
      [/^GAMESHOW_|^RANK_|^SCORE_|^BOARD_/, 'Параметр телешоу Тенны (Глава 3).'],
      [/^TIMES_|_COUNT$|_COUNTER$|^TOTAL_/, 'Счётчик (число повторений события).'],
      [/^TEXT_FLAG_|^NPC_|^SAVEPOINT_|_STATE$|_PROGRESS$|_FLAG$/, 'Служебный флаг состояния или диалога.'],
      [/^UNKNOWN_|_TEMP_|DEBUG|^TODO_/, 'Назначение не задокументировано (служебный или неиспользуемый).'],
    ];
    for (const [re, txt] of rules) if (re.test(name)) return txt;
    return 'Игровой флаг состояния.';
  }
  function flagRowHTML(i, n, slot, showSections) {
    const doc = flagDoc(i); const value = slot.save.flags[i]||0;
    let control;
    if (doc && doc.bits) {
      control = `<span class="flag-value-readonly">Значение: ${esc(flagNumberDisplay(i, value))}</span>${bitmaskControlHTML(i, value, doc, true)}`;
    } else if (doc && doc.values) {
      const has = Object.keys(doc.values).some(k => Number(k)===Number(value));
      let entries = Object.entries(doc.values).sort((a,b)=>Number(a[0])-Number(b[0]));
      if (!has) entries = [[value,`(${value})`], ...entries];
      const opts = entries.map(([k,v]) => `<option value="${k}"${Number(k)===Number(value)?' selected':''}>${esc(v)} (${k})</option>`).join('');
      control = `<select data-path="flags.${i}">${opts}</select>`;
    } else {
      let effMax = (doc && doc.max !== undefined) ? Number(doc.max) : null;
      if (effMax === null) {
        const a = flagAuto(i);
        if (a && Array.isArray(a.v) && a.v.length) {
          const nums = a.v.map(Number).filter(x => Number.isFinite(x));
          if (nums.length) { const m = Math.max(...nums); if (m > 0) effMax = m; }
        }
      }
      const mn = doc&&doc.min!==undefined?flagNumberAttr(i, 'min', doc.min):'';
      const mx = effMax!==null?flagNumberAttr(i, 'max', effMax):'';
      const maxBtn = (effMax!==null) ? ` <button class="btn small" type="button" data-flagmax="${i}" data-maxval="${effMax}" title="Поставить максимум (из кода игры)">Макс.</button>` : '';
      control = `<span class="numwrap"><input type="number" data-path="flags.${i}" value="${esc(flagNumberDisplay(i, value))}"${mn}${mx}${flagNumberExtra(i)}>${flagNumberSuffix(i)}${maxBtn}</span>`;
    }
    let descHtml = doc&&doc.description ? `<span class="flag-desc">${esc(doc.description)}</span>` : '';
    if (!descHtml) {
      const a = flagAuto(i);
      const hint = a ? flagAutoHint(a.n) : '';
      if (hint && a && a.v && a.v.length) descHtml = `<span class="flag-desc" style="opacity:.75">${esc(hint)} Значения по коду: ${esc(a.v.join(', '))}.</span>`;
      else if (hint) descHtml = `<span class="flag-desc" style="opacity:.7">${esc(hint)}</span>`;
      else if (a && a.v && a.v.length) descHtml = `<span class="flag-desc" style="opacity:.75">Значения по коду игры: ${esc(a.v.join(', '))}.</span>`;
      else if (value !== 0) descHtml = '<span class="flag-desc" style="opacity:.6">Неизвестный флаг — в этом сохранении есть значение. По номеру в коде не встречается (возможно, задаётся косвенно).</span>';
      else descHtml = '<span class="flag-desc" style="opacity:.5">Не используется игрой (резервный индекс).</span>';
    }
    descHtml += flagDetailHTML(i);
    const fb = availBad('flags', i, slot.save.meta.chapter);
    const flagWarn = (fb && Number(value)!==0) ? `<div class="avail-warn" style="margin-top:5px;" title="${esc('Этот флаг игра использует только начиная с Главы '+fb+'. В более ранней главе его значение ни на что не влияет и может мешать.')}">⚠ Используется с Главы ${fb}</div>` : '';
    const sectionCell = showSections ? `<td>${flagSectionCellHTML(i)}</td>` : '';
    return `<tr class="${(fb&&Number(value)!==0)?'row-warn':''}"><td>${i}</td><td><code>${esc(n)}</code></td><td>${control}</td>${sectionCell}<td>${descHtml}${flagWarn}</td></tr>`;
  }

  function renderFlags(slot) {
    const active = state.subroute || 'known';
    const max = Core.SAVE_META[slot.save.meta.format].flagCount;
    const q = state.search.toLowerCase();

    if (active === 'all') {

      const source = [];
      for (let i = 0; i < max; i++) { if (RESERVE_FLAGS.has(i)) continue; source.push([i, flagName(i)]); }
      const categorized = categorizedFlagSet(max);
      const filtered = source.filter(([i,n]) => (!q || `${i} ${n} ${slot.save.flags[i]||0}`.toLowerCase().includes(q)) && flagMatchesMissingFilters(i) && flagMatchesUnusedFilters(i) && flagMatchesRecruitFilters(i) && flagMatchesCategoryFilters(i, categorized) && flagMatchesReserveFilters(i, slot));
      const pages = Math.max(1, Math.ceil(filtered.length/state.flagPerPage));
      state.flagPage = Math.min(state.flagPage, pages);
      const start = (state.flagPage-1)*state.flagPerPage;
      const rows = filtered.slice(start, start+state.flagPerPage);
      return `${subtabsHTML(FLAG_TABS, active, 'flags')}${searchBar()}
        <article class="card"><div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:12px;">
          <div><h2>Все флаги</h2><p class="sub" style="margin:0">${filtered.length} найдено · стр. ${state.flagPage}/${pages}</p></div>
          <div class="inline-tools" style="gap:10px;flex-wrap:wrap;">
            <label class="check-row" style="padding:6px 10px;"><input type="checkbox" data-toggle="flagHideUnused"${state.flagHideUnused?' checked':''}><span>Скрыть unused</span></label>
            <label class="check-row" style="padding:6px 10px;"><input type="checkbox" data-toggle="flagOnlyUnused"${state.flagOnlyUnused?' checked':''}><span>Только unused</span></label>
            <label class="check-row" style="padding:6px 10px;"><input type="checkbox" data-toggle="flagHideReserve"${state.flagHideReserve?' checked':''}><span>Скрыть резервные индексы</span></label>
            <label class="field" style="margin:0;flex-direction:row;align-items:center;gap:6px;"><span style="white-space:nowrap;">На странице:</span>
              <select data-setting="flagPerPage">${[25,50,100,200].map(n=>`<option value="${n}"${n===(state.flagPerPage||50)?' selected':''}>${n}</option>`).join('')}</select>
            </label>
            <div class="pager"><button class="btn small" data-action="flags-prev" type="button">Назад</button><button class="btn small" data-action="flags-next" type="button">Вперёд</button></div>
          </div>
        </div>
        <div class="table-wrap"><table class="ed-table flags-table" style="min-width:980px"><thead><tr><th style="width:88px">#</th><th style="width:190px">Имя</th><th style="width:230px">Значение</th><th style="width:260px">Где</th><th>Описание</th></tr></thead><tbody>
        ${rows.map(([i,n]) => flagRowHTML(i, n, slot, true)).join('')}
        </tbody></table></div></article>`;
    }

    const cats = I18n.FLAG_CATEGORIES || [];
    const recruitIdx = Core.DATA.flags.filter(([,n]) => n.startsWith('RECRUIT_')).map(([i]) => i);

    const docCatIndex = (() => {
      const m = {}; const docs = I18n.FLAG_DOCS || {};
      for (const k in docs) { const c = docs[k] && docs[k].category; if (c) (m[c] = m[c] || []).push(+k); }
      return m;
    })();
    const matches = (i) => { const n = flagName(i); return !q || `${i} ${n} ${slot.save.flags[i]||0}`.toLowerCase().includes(q); };
    const curCat = state.flagCategory || 'all';

    const visibleCats = (curCat === 'all') ? cats : cats.filter(([k]) => k === curCat);
    const catMap = Object.fromEntries(cats.map(c => [c[0], c]));
    const catCount = (key, indices) => {
      let list = indices === null ? recruitIdx.slice() : indices.slice();
      if (docCatIndex[key]) list = list.concat(docCatIndex[key]);
      return new Set(list.filter(i => i < max)).size;
    };
    const chip = (key) => {
      const c = catMap[key]; if (!c) return '';
      const acc = ({ persist1: ' chip-ch1', persist2: ' chip-ch2', persist3: ' chip-ch3', persist4: ' chip-ch4', persist5: ' chip-ch5' })[key] || '';
      const short = ({ persist1: 'Глава 1', persist2: 'Глава 2', persist3: 'Глава 3', persist4: 'Глава 4', persist5: 'Глава 5' })[key] || c[1];
      return `<button class="chip${acc}${curCat === key ? ' active' : ''}" type="button" data-flagcat="${esc(key)}">${esc(short)}<span class="chip-n">${catCount(key, c[2])}</span></button>`;
    };
    const CHIP_GROUPS = [
      ['Общие', ['system', 'battle', 'kill', 'meta']],
      ['Яйца', ['eggs']],
      ['Маршруты', ['weird', 'sword']],
      ['По коду игры', ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'codeNotSave', 'codeUnknown']],
      ['Сохранённый выбор — по главам', ['persist1', 'persist2', 'persist3', 'persist4', 'persist5']],
    ];
    const grouped = new Set(CHIP_GROUPS.flatMap(g => g[1]));
    const leftover = cats.map(c => c[0]).filter(k => !grouped.has(k));
    if (leftover.length) CHIP_GROUPS.push(['Прочее', leftover]);
    const catChips = `<div class="cat-filter">
      <button class="chip chip-all${curCat === 'all' ? ' active' : ''}" type="button" data-flagcat="all">Все категории<span class="chip-n">${[...new Set(cats.flatMap(c => (c[2] === null ? recruitIdx : c[2]).concat(docCatIndex[c[0]] || [])).filter(i => i < max))].length}</span></button>
      ${CHIP_GROUPS.map(([label, keys]) => {
        const chips = keys.filter(k => catMap[k]).map(chip).join('');
        return chips ? `<div class="cat-group"><span class="cat-group-label">${esc(label)}</span><div class="cat-chips">${chips}</div></div>` : '';
      }).join('')}
    </div>`;
    let totalShown = 0;
    const RMETA = (window.KnightChars && window.KnightChars.RECRUIT_META) || {};
    const sections = visibleCats.map(([key, label, indices]) => {
      const isRecruit = indices === null;
      let list = isRecruit ? recruitIdx.slice() : indices.slice();
      if (docCatIndex[key]) list = list.concat(docCatIndex[key]);
      list = [...new Set(list)];
      if (key !== 'weird' && key !== 'eggs') list.sort((a, b) => a - b);
      list = list.filter(i => i < max && matches(i));
      if (isRecruit && !state.showNonRecruitable && !q) list = list.filter(i => RMETA[i] && RMETA[i].r);
      if (!list.length) return '';
      totalShown += list.length;
      const recruitToggle = isRecruit ? `<label class="check-row" style="padding:6px 10px;margin:10px 0 0;"><input type="checkbox" data-toggle="showNonRecruitable"${state.showNonRecruitable?' checked':''}><span>Показать невербуемых (боссы, неиспользуемые индексы)</span></label>` : '';
      return `<article class="card" style="margin-bottom:14px;"><h2>${esc(label)}</h2>${recruitToggle}
        <div class="table-wrap" style="margin-top:10px;"><table class="ed-table flags-table"><thead><tr><th style="width:88px">#</th><th style="width:180px">Имя</th><th style="width:230px">Значение</th><th>Описание</th></tr></thead><tbody>
        ${list.map(i => flagRowHTML(i, flagName(i), slot)).join('')}
        </tbody></table></div></article>`;
    }).join('');
    return `${subtabsHTML(FLAG_TABS, active, 'flags')}
      <p class="helper" style="margin-bottom:12px;">Флаги сгруппированы по категориям. Выберите категорию ниже или используйте «Все индексы» для доступа к любому из ${max} флагов.${q && curCat !== 'all' ? ' Поиск идёт только внутри выбранной категории.' : ''}</p>
      ${conflictBanner(slot.save)}
      ${catChips}
      ${searchBar()}
      ${sections || '<div class="empty-state">Ничего не найдено.</div>'}`;
  }

  const ABOUT_TABS = [['overview','Обзор'],['versions','Версии'],['license','Лицензия'],['credits','Авторы']];
  function renderAbout() {
    const active = state.subroute || 'overview';
    let body;
    if (active === 'versions') {
      body = `<article class="card"><h2>История версий</h2>
        <ul class="bullet-list" style="margin-top:12px;">
          <li><b>v_0.2</b> — пятая глава/дамп/редактор save / 02.07.2026</li>
          <li><b>v_0.1</b> — альфа-тест / 23.06.2026</li>
        </ul></article>`;
    } else if (active === 'license') {
      body = `<article class="card"><h2>Лицензия и правовая информация</h2>
        <p class="helper" style="margin-top:8px;">Код редактора распространяется по лицензии <b>MIT</b>. Проект некоммерческий: он создан фанатами для фанатов и <b>не предназначен для продажи или извлечения прибыли</b>.</p>
        <pre class="license-box" style="white-space:pre-wrap;background:var(--surface-3);border:1px solid var(--border);border-radius:8px;padding:12px;font-size:16px;line-height:1.55;margin:12px 0;">MIT License

Copyright (c) 2026 DarkgoD Team

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.</pre>
        <p class="helper">Лицензия MIT относится только к коду редактора. Все ассеты, текст и код игры DELTARUNE™ принадлежат Toby Fox и используются в рамках добросовестного некоммерческого фанатского использования (fair use).</p></article>`;
    } else if (active === 'credits') {
      body = `<article class="card"><h2>Информация об авторах</h2>
        <ul class="bullet-list">
          <li>Ассеты, текст и код игры: <a href="https://deltarune.com/" target="_blank" rel="noopener" style="color:var(--blue)">Toby Fox — DELTARUNE</a></li>
          <li>Дампы игры: <a href="https://github.com/UnderminersTeam/UndertaleModTool" target="_blank" rel="noopener" style="color:var(--blue)">UNDERTALE MOD TOOL</a></li>
          <li>Русский перевод: <a href="https://t.me/darkgodteam" target="_blank" rel="noopener" style="color:var(--blue)">DarkgoD Team</a></li>
          <li>Вдохновение: <a href="https://saveeditor.spamton.com/" target="_blank" rel="noopener" style="color:var(--blue)">saveeditor.spamton.com</a></li>
        </ul></article>`;
    } else {
      body = `<article class="card accent-red"><h2>О редакторе</h2>
        <p class="helper" style="margin-top:8px;">Неофициальный редактор сохранений Deltarune. Позволяет менять сохранения для каждой главы и понять, какое сохранение к чему относится — где какой файл читается и за что отвечает (<a href="#welcome/overview" style="color:var(--blue)">подробнее на главной</a>).</p>
        <p class="helper" style="margin-top:8px;">Работает полностью в браузере — данные не покидают ваше устройство.</p></article>`;
    }
    return `${subtabsHTML(ABOUT_TABS, active, 'about')}${body}`;
  }

  function addSlot() {
    const slot = makeSlot(`Файл ${state.saves.length+1}`, Core.createDemoSave(), {kind:'demo',fileName:'demo-save',size:0});
    state.saves.unshift(slot); state.selectedId = slot.id; state.dirty = true; persist(); render(); toast('Создан новый файл','success');
  }
  function duplicateSlot() {
    const src = clone(current()); src.id = uid(); src.name = `${src.name} (копия)`;
    src.createdAt = Date.now(); src.updatedAt = Date.now();
    state.saves.unshift(normalizeSlot(src)); state.selectedId = src.id; state.dirty = true; persist(); render(); toast('Файл дублирован','success');
  }
  function deleteSlot() {
    const slot = current(); if (!slot) return;
    if (!confirm(`Закрыть файл «${slot.name}»? Он удалится только из редактора — игровое сохранение на диске не тронуто.`)) return;
    state.saves = state.saves.filter(x => x.id!==slot.id); state.selectedId = state.saves[0]?.id||null; state.dirty = true; persist(); render(); toast('Файл закрыт');
  }
  function resetSlot() {
    const slot = current(); if (!confirm(`Сбросить файл «${slot.name}» до демо?`)) return;
    Object.assign(slot, makeSlot(slot.name, Core.createDemoSave(), slot.source)); state.selectedId = slot.id; state.dirty = true; persist(); render(); toast('Файл сброшен');
  }
  function exportSlot() { openExportModal(); }
  function closeModal() {
    els.modalRoot.querySelectorAll('.dlg.gamebox').forEach((box) => { if (box._timers) box._timers.forEach((t) => clearTimeout(t)); if (box._stopMouth) box._stopMouth(); });
    els.modalRoot.innerHTML = '';
  }
  function openExportModal() {
    const slot = current(); if (!slot) { toast('Сначала загрузите файл сохранения','error'); return; }
    const ch = slot.save.meta.chapter;
    let completion = !!slot.save.meta.isCompletionSave;
    let slotNum = Number(slot.save.meta.slot) || 0;
    let sideB = !!slot.save.meta.sideB;
    const fname = () => `filech${ch}_${completion ? slotNum + 3 : slotNum}${sideB ? '_b' : ''}`;
    els.modalRoot.innerHTML = `
      <div class="modal-overlay" data-modal-overlay>
        <div class="modal">
          <button class="modal-x" id="mdCancel" type="button" aria-label="Закрыть">×</button>
          <h2><img src="game-sprites/spr_heart_0.png" alt=""> Скачать сохранение</h2>
          <p class="sub">Файл «${esc(slot.name)}» — Глава ${ch}.</p>
          <label class="field"><span>Номер ФАЙЛА</span>
            <select id="mdSlot">${[0,1,2].map(n=>`<option value="${n}"${n===slotNum?' selected':''}>ФАЙЛ ${n+1}</option>`).join('')}</select>
          </label>
          <label class="check-row" style="margin:4px 0 14px;"><input type="checkbox" id="mdCompletion"${completion?' checked':''}><span>Сохранение после титров (Completion save) — для следующей главы</span></label>
          ${sideB ? `<p class="helper" style="color:var(--text-3);font-size:13px;">Это сохранение Weird Route (Side B) — файл сохранится с суффиксом <code>_b</code>, как в оригинале (напр. <code>filech5_4_b</code>).</p>` : ''}
          <p class="helper">Файл будет сохранён как: <code id="mdName">${fname()}</code></p>
          <div class="modal-actions">
            <button class="btn primary" id="mdDownload" type="button">Скачать</button>
          </div>
        </div>
      </div>`;
    const nameEl = byId('mdName');
    const refresh = () => { nameEl.textContent = fname(); };
    byId('mdSlot').addEventListener('change', (e) => { slotNum = Number(e.target.value); refresh(); });
    byId('mdCompletion').addEventListener('change', (e) => { completion = e.target.checked; refresh(); });
    byId('mdCancel').addEventListener('click', closeModal);
    els.modalRoot.querySelector('[data-modal-overlay]').addEventListener('click', (e) => { if (e.target===e.currentTarget) closeModal(); });
    byId('mdDownload').addEventListener('click', () => doDownload(fname(), slotNum, completion, sideB));
  }
  function plural(n, one, few, many) {
    const m = Math.abs(n) % 100, m2 = m % 10;
    if (m > 10 && m < 20) return many;
    if (m2 > 1 && m2 < 5) return few;
    if (m2 === 1) return one;
  return many;
  }
  function doDownload(filename, slotNum, completion, sideB) {
    const slot = current(); if (!slot) return;
    try {
      slot.save.meta.slot = Number(slotNum) || 0;
      slot.save.meta.isCompletionSave = !!completion;
      slot.save.meta.sideB = !!sideB;
      const text = Core.serializeSave(slot.save);
      const blob = new Blob([text], {type:'application/octet-stream'});
      const a = document.createElement('a'); a.href = URL.createObjectURL(blob);
      a.download = (filename||'save').replace(/[\\/:*?"<>|]+/g,'_');
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      state.dirty = false; persist(); closeModal(); softChrome(); toast('Файл скачан','success');
    } catch (e) { toast('Ошибка экспорта: '+(e.message||e),'error'); }
  }
  async function importFile(file) {
    const text = await file.text(); let parsed;
    try { parsed = JSON.parse(text); if (parsed.save) parsed = parsed.save; }
    catch { parsed = Core.parseSave(text, {name:file.name.replace(/\.[^.]+$/,'')}); }

    const slotMatch = file.name.match(/filech(\d+)_(\d+)(_b)?/i);
    if (slotMatch) {
      const detectedChapter = parseInt(slotMatch[1], 10);
      if (detectedChapter >= 1 && detectedChapter <= 5) {
        parsed.meta.chapterHint = detectedChapter;
        parsed.meta.chapter = Core.detectChapter(parsed);
      }
      parsed.meta.sideB = !!slotMatch[3];
      const detectedSlot = parseInt(slotMatch[2], 10);
      if (detectedSlot >= 0 && detectedSlot <= 2) {
        parsed.meta.slot = detectedSlot;
        parsed.meta.isCompletionSave = false;
      } else if (detectedSlot >= 3 && detectedSlot <= 5) {

        parsed.meta.slot = detectedSlot - 3;
        parsed.meta.isCompletionSave = true;
      }
    } else if (Core.detectCompletion && Core.detectCompletion(parsed)) {
      parsed.meta.isCompletionSave = true;
    }

    const slot = makeSlot(parsed.meta?.name || parsed.playerName || file.name.replace(/\.[^.]+$/,''), parsed, {kind:'save',fileName:file.name,size:file.size});
    state.saves.unshift(slot); state.selectedId = slot.id; state.dirty = false; persist(); render();
    toast('Файл импортирован — Глава ' + parsed.meta.chapter + (parsed.meta.isCompletionSave ? ' (completion)' : '') + (parsed.meta.sideB ? ' · Side B (Weird Route)' : ''),'success');
  }

  document.addEventListener('click', (e) => {

    const sw = e.target.closest('.swatch');
    if (sw) { const idx = Number(sw.dataset.color); const ci = Number(sw.dataset.ci); const slot = current(); if (slot) { slot.save.flags[idx] = ci; touch(); render(); } return; }
    const btn = e.target.closest('button'); if (!btn) return;
    if (btn.classList.contains('locked')) { toast('Сначала загрузите файл сохранения','error'); return; }
    const a = btn.dataset;
    if (a.route) return setRoute(a.route);
    if (a.save) { state.selectedId = a.save; persist(); render(); els.sidebar.classList.remove('open'); if (els.backdrop) els.backdrop.classList.remove('show'); return; }
    if (a.group && a.subroute) return setRoute(a.group, a.subroute);
    if (a.flagcat) { state.flagCategory = a.flagcat; persist(); render(); return; }
    if (btn.dataset.hint) { openFlagDetailModal(Number(btn.dataset.hint)); return; }
    if (btn.dataset.info) { openInfoModal(btn.dataset.info); return; }
    if (btn.dataset.recruitMax) {
      const i = Number(btn.dataset.recruitMax);
      const slot = current(); if (!slot) return;
      slot.save.flags[i] = 1; touch(); render();
      return;
    }
    if (btn.dataset.flagmax) {
      const i = Number(btn.dataset.flagmax); const mv = Number(btn.dataset.maxval);
      const slot = current(); if (!slot) return;
      slot.save.flags[i] = mv; touch(); render();
      return;
    }
    if (btn.dataset.flagbitsAll) {
      const i = Number(btn.dataset.flagbitsAll); const mask = Number(btn.dataset.mask) || 0;
      const slot = current(); if (!slot) return;
      slot.save.flags[i] = mask; touch(); render();
      return;
    }
    if (btn.dataset.flagbitsUpto) {
      const i = Number(btn.dataset.flagbitsUpto); const mask = Number(btn.dataset.mask) || 0;
      const slot = current(); if (!slot) return;
      slot.save.flags[i] = mask; touch(); render();
      return;
    }
    if (btn.dataset.flagbitsClear) {
      const i = Number(btn.dataset.flagbitsClear);
      const slot = current(); if (!slot) return;
      slot.save.flags[i] = 0; touch(); render();
      return;
    }
    if (btn.dataset.vchoice) {
      const idx = Number(btn.dataset.vchoice); const val = Number(btn.dataset.vval);
      const slot = current(); if (!slot) return;
      slot.save.flags[idx] = val; touch(); render(); warnConflicts(slot.save, idx);
      return;
    }
    if (btn.dataset.vpart) {
      const idx = Number(btn.dataset.vpart); const dir = Number(btn.dataset.dir);
      const slot = current(); if (!slot) return;
      const max = PART_MAX[idx] || 0; let v = (slot.save.flags[idx] || 0) + dir;
      if (v < 0) v = 0; if (v > max) v = max;
      slot.save.flags[idx] = v; touch(); render();
      return;
    }
    if (btn.dataset.sffocus) { const f = btn.dataset.sffocus; state.sfFocus = (f === 'end') ? 'end' : Number(f); state.sfScroll = false; if (f === 'end') toast('Наряд сохранён'); render(); return; }
    if (btn.dataset.sfarrow) {
      const idx = Number(btn.dataset.sfarrow); const dir = Number(btn.dataset.dir);
      const slot = current(); if (!slot) return;
      const p = SUSIEFIT.find(x => x.flag === idx); const n = p ? p.frames : 1;
      const v = ((Number(slot.save.flags[idx] || 0) + dir) % n + n) % n;
      slot.save.flags[idx] = v; state.sfFocus = idx; touch(); render();
      return;
    }
    if (btn.dataset.goflag) {
      if (els.modalRoot.innerHTML) closeModal();
      const idx = btn.dataset.goflag;
      state.route = 'flags'; state.subroute = 'all'; state.search = String(idx); state.flagPage = 1;
      setHash('flags', 'all'); persist(); render();
      return;
    }
    if (btn.dataset.cycle) {
      const idx = Number(btn.dataset.cycle); const dir = Number(btn.dataset.dir);
      const slot = current(); if (!slot) return;
      const doc = flagDoc(idx); const cur = slot.save.flags[idx] || 0;
      let next;
      if (doc && doc.values) {
        const vals = Object.keys(doc.values).map(Number).sort((a,b)=>a-b);
        let i = vals.indexOf(cur); if (i < 0) i = 0;
        i = (i + dir + vals.length) % vals.length;
        next = vals[i];
      } else { next = cur + dir; }
      slot.save.flags[idx] = next; touch(); render();
      return;
    }
    switch (a.action) {
      case 'import-file': return els.fileInput.click();
      case 'export-file': return exportSlot();
      case 'create-slot': return addSlot();
      case 'duplicate-slot': return duplicateSlot();
      case 'delete-slot': return deleteSlot();
      case 'reset-slot': return resetSlot();
      case 'story-expand': document.querySelectorAll('.story-sec, .story-cluster').forEach(d => { d.open = true; }); return;
      case 'story-collapse': document.querySelectorAll('.story-sec').forEach(d => { d.open = false; }); return;
      case 'heal': { const c = current().save.characters[Number(a.character)]; if (c) c.health = c.maxHealth; touch(); render(); return; }
      case 'max-stats': { const c = current().save.characters[Number(a.character)]; if (c) { c.health=999;c.maxHealth=999;c.attack=99;c.defence=99;c.magic=99;c.guts=99; } touch(); render(); toast('Статы максимизированы'); return; }
      case 'recruit-all': { const M = (window.KnightChars && window.KnightChars.RECRUIT_META) || {}; Core.DATA.flags.filter(([i,n])=>n.startsWith('RECRUIT_') && M[i] && M[i].r).forEach(([i])=>current().save.flags[i]=1); touch(); render(); toast('Завербованы все вербуемые','success'); return; }
      case 'recruit-clear': { Core.DATA.flags.filter(([,n])=>n.startsWith('RECRUIT_')).forEach(([i])=>current().save.flags[i]=0); touch(); render(); toast('Список сброшен'); return; }
      case 'clear-all': { if (!confirm('Удалить ВСЕ файлы безвозвратно?')) return; state.saves=[]; state.selectedId=null; state.dirty=false; persist(); render(); toast('Все файлы удалены'); return; }
      case 'inv-clear-empty': {
        const active = state.subroute||'consumables';
        const arr = active==='storage'?current().save.inventory.storage:current().save.inventory[active];
        if (arr) { const filled = arr.filter(v=>v!==0); const len = active==='storage'?72:(active==='weapons'||active==='armors')?(current().save.meta.format===2?48:13):13; arr.length=0; arr.push(...filled); while(arr.length<len) arr.push(0); }
        touch(); render(); return;
      }
      case 'flags-prev': { state.flagPage = Math.max(1, state.flagPage-1); persist(); render(); return; }
      case 'flags-next': { state.flagPage += 1; persist(); render(); return; }
      case 'open-file-naming': return openFileNamingModal();
    }
  });

  document.addEventListener('input', (e) => {
    const t = e.target;
    if (!(t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t instanceof HTMLSelectElement)) return;
    if (t.id === 'searchInput') {
      state.search = t.value; state.flagPage = 1;
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        persist(); render();
        const si = byId('searchInput');
        if (si) { si.focus(); si.setSelectionRange(si.value.length, si.value.length); }
      }, 200);
      return;
    }
    if (t.dataset.slotPath) return setSlotField(t.dataset.slotPath, t.value);
    if (t.dataset.toggle) {
      state[t.dataset.toggle] = t.checked;
      if (t.dataset.toggle === 'flagHideUnused' && t.checked) state.flagOnlyUnused = false;
      if (t.dataset.toggle === 'flagOnlyUnused' && t.checked) state.flagHideUnused = false;
      if (['flagMissingOnly', 'flagMissingStoryOnly', 'flagMissingPersistOnly', 'flagHideReserve', 'flagHideUnused', 'flagOnlyUnused', 'flagHideRecruits', 'flagHideCategorized'].includes(t.dataset.toggle)) state.flagPage = 1;
      persist(); render(); return;
    }
    if (t.dataset.recruitCheck) { const i = Number(t.dataset.recruitCheck); const slot = current(); if (slot) { slot.save.flags[i] = t.checked ? 1 : 0; touch(); render(); } return; }
    if (t.dataset.recruit) {
      const i = Number(t.dataset.recruit); const count = Number(t.dataset.count) || 1;
      let v = toNumber(t.value); if (v < -1) v = -1; if (v > count) v = count;
      let flagv = v; if (count > 1 && v !== 0 && v !== -1) flagv = v / count;
      const slot = current(); if (slot) {
        slot.save.flags[i] = flagv; touch();
        clearTimeout(invSyncDebounce);
        invSyncDebounce = setTimeout(() => {
          render();
          const el = byId('rec-' + i);
          if (el) { el.focus(); el.setSelectionRange(el.value.length, el.value.length); }
        }, 250);
      }
      return;
    }
    if (t.dataset.setting) { state[t.dataset.setting] = toNumber(t.value); state.flagPage = 1; persist(); render(); return; }

    if (t.dataset.flagbit) {
      const i = Number(t.dataset.flagbit); const bit = Number(t.dataset.bit);
      const slot = current(); if (!slot) return;
      const mask = 1 << bit;
      const cur = Number(slot.save.flags[i] || 0);
      slot.save.flags[i] = t.checked ? (cur | mask) : (cur & ~mask);
      touch(); render();
      return;
    }
    if (t.dataset.flagbits) {
      const i = Number(t.dataset.flagbits); const bit = Number(t.dataset.bit); const width = Number(t.dataset.width) || 1;
      const slot = current(); if (!slot) return;
      const mask = ((1 << width) - 1) << bit;
      const max = (1 << width) - 1;
      const v = Math.max(0, Math.min(max, toNumber(t.value)));
      const cur = Number(slot.save.flags[i] || 0);
      slot.save.flags[i] = (cur & ~mask) | (v << bit);
      touch(); render();
      return;
    }

    if (t.dataset.itemnum !== undefined && t.type === 'number' && t.dataset.path) {
      let value = toNumber(t.value); if (value < 0) value = 0;
      setPath(t.dataset.path, value);
      const row = t.closest('tr');
      const sel = row && row.querySelector('select[data-path="' + t.dataset.path + '"]');
      if (sel) sel.innerHTML = options(t.dataset.itemnum, value);
      clearTimeout(invSyncDebounce);
      const fid = t.id;
      invSyncDebounce = setTimeout(() => {
        render();
        const el = byId(fid);
        if (el) { el.focus(); const n = el.value.length; el.setSelectionRange(n, n); }
      }, 350);
      return;
    }
    if (!t.dataset.path) return;
    const isSelect = t.tagName==='SELECT';
    const isCheck = t.type==='checkbox';
    const flagPath = /^flags\.(\d+)$/.exec(t.dataset.path);
    let value = isCheck ? (t.checked?1:0) : ((t.type==='number'||t.type==='range'||isSelect) ? toNumber(t.value) : t.value);
    if (t.type==='number') {
      const mn = t.getAttribute('min'), mx = t.getAttribute('max');
      const wrap = t.closest('.field');
      let bad = false;

      if (mn!==null && value < Number(mn)) { value = Number(mn); bad = true; }
      if (mx!==null && value > Number(mx)) { bad = true; }
      if (wrap) wrap.classList.toggle('invalid', bad);
    }
    if (flagPath && t.type === 'number') value = flagNumberStored(Number(flagPath[1]), value);

    setPath(t.dataset.path, value, { rerender: isSelect || isCheck });
    if (flagPath) {
      const fi = Number(flagPath[1]); const s = current();
      clearTimeout(conflictWarnDebounce);
      conflictWarnDebounce = setTimeout(() => { if (s) warnConflicts(s.save, fi); }, 350);
    }
  });

  els.saveSwitch.addEventListener('change', (e) => { state.selectedId = e.target.value; persist(); render(); });

  els.fileInput.addEventListener('change', async (e) => {
    const [file] = e.target.files || []; if (!file) return;
    try { await importFile(file); } catch (err) { toast(err.message||'Не удалось импортировать','error'); } finally { e.target.value=''; }
  });

  let dragDepth = 0;
  const hasFiles = (e) => e.dataTransfer && Array.from(e.dataTransfer.types||[]).includes('Files');
  window.addEventListener('dragenter', (e) => { if (!hasFiles(e)) return; e.preventDefault(); dragDepth++; els.dropOverlay.classList.add('show'); });
  window.addEventListener('dragover', (e) => { if (!hasFiles(e)) return; e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; });
  window.addEventListener('dragleave', (e) => { if (!hasFiles(e)) return; dragDepth--; if (dragDepth <= 0) { dragDepth = 0; els.dropOverlay.classList.remove('show'); } });
  window.addEventListener('drop', async (e) => {
    if (!hasFiles(e)) return;
    e.preventDefault(); dragDepth = 0; els.dropOverlay.classList.remove('show');
    const [file] = e.dataTransfer.files || []; if (!file) return;
    try { await importFile(file); } catch (err) { toast(err.message||'Не удалось импортировать','error'); }
  });

  els.sidebarToggle.addEventListener('click', () => {
    const open = els.sidebar.classList.toggle('open');
    if (els.backdrop) els.backdrop.classList.toggle('show', open);
  });
  if (els.backdrop) els.backdrop.addEventListener('click', () => {
    els.sidebar.classList.remove('open');
    els.backdrop.classList.remove('show');
  });
  window.addEventListener('hashchange', () => { syncRouteFromHash(); render(); });
  function handleSusieFitKey(e) {
    if (els.modalRoot.innerHTML) return;
    if (!document.querySelector('.tf-screen')) return;
    const slot = current(); if (!slot) return;
    const t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable)) return;
    const k = e.key.toLowerCase();
    const code = e.code;
    const has = (arr) => arr.includes(k) || arr.includes(code);
    const UP = ['w', 'arrowup', 'KeyW', 'ArrowUp'], DOWN = ['s', 'arrowdown', 'KeyS', 'ArrowDown'];
    const LEFT = ['a', 'arrowleft', 'KeyA', 'ArrowLeft'], RIGHT = ['d', 'arrowright', 'KeyD', 'ArrowRight'];
    const CONFIRM = ['e', 'z', 'enter', 'KeyE', 'KeyZ', 'Enter', 'NumpadEnter'], CANCEL = ['q', 'c', 'KeyQ', 'KeyC'];
    const isU = has(UP), isD = has(DOWN), isL = has(LEFT), isR = has(RIGHT), isC = has(CONFIRM), isX = has(CANCEL);
    if (!(isU || isD || isL || isR || isC || isX)) return;
    e.preventDefault();

    const grid = SUSIEFIT_GRID;
    const valid = [1421, 1422, 1423, 1424, 1425, 'end'];
    let focus = valid.includes(state.sfFocus) ? state.sfFocus : 1421;
    let col = 0, row = 0;
    for (let c = 0; c < 2; c++) for (let r = 0; r < 3; r++) if (grid[c][r] === focus) { col = c; row = r; }
    const setFocus = (c, r) => { state.sfFocus = grid[c][r]; };

    if (state.sfScroll && focus !== 'end') {
      const flag = focus;
      if (isL || isR) {
        const dir = isR ? 1 : -1;
        const p = SUSIEFIT.find(x => x.flag === flag); const n = p.frames;
        slot.save.flags[flag] = ((Number(slot.save.flags[flag] || 0) + dir) % n + n) % n;
        touch(); render(); return;
      }
      if (isC || isX) { state.sfScroll = false; render(); return; }
      if (isU) { state.sfScroll = false; setFocus(col, (row + 2) % 3); render(); return; }
      if (isD) { state.sfScroll = false; setFocus(col, (row + 1) % 3); render(); return; }
      return;
    }

    if (isU) { setFocus(col, (row + 2) % 3); render(); return; }
    if (isD) { setFocus(col, (row + 1) % 3); render(); return; }
    if (isL) { setFocus(0, row); render(); return; }
    if (isR) { setFocus(1, row); render(); return; }
    if (isC) {
      if (focus === 'end') { toast('Наряд сохранён'); return; }
      state.sfScroll = true; render(); return;
    }
  }

  document.addEventListener('keydown', (e) => {
    if (e.key==='Escape' && els.modalRoot.innerHTML) closeModal();
    handleSusieFitKey(e);
  });

  render();

  setInterval(() => {
    document.querySelectorAll('.flag-fx').forEach((img) => {
      const fr = img.getAttribute('data-frames'); if (!fr) return;
      const frames = fr.split('|'); if (frames.length < 2) return;
      const speed = Number(img.getAttribute('data-speed')) || 150;
      let acc = (Number(img.getAttribute('data-acc')) || 0) + 150;
      if (acc < speed) { img.setAttribute('data-acc', String(acc)); return; }
      img.setAttribute('data-acc', '0');
      let fi = (Number(img.getAttribute('data-fi')) || 0) + 1;
      if (fi >= frames.length) fi = 0;
      img.setAttribute('data-fi', String(fi)); img.src = frames[fi];
      const capAttr = img.getAttribute('data-caps');
      if (capAttr) {
        const caps = capAttr.split('§§');
        const wrap = img.closest('.flag-fx-wrap');
        const capEl = wrap && wrap.querySelector('.flag-fx-cap');
        if (capEl && caps[fi] !== undefined) capEl.textContent = caps[fi];
      }
    });
  }, 150);
})();
