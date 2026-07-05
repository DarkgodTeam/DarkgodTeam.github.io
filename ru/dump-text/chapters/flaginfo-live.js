(function () {
  function clean(s) { return String(s == null ? '' : s).replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s{2,}/g, ' ').trim(); }
  function shortLabel(desc) {
    if (!desc) return '';
    var s = String(desc).replace(/<[^>]+>/g, ' ');
    s = s.replace(/\([^)]*\)/g, ' ');
    s = s.split(/[;]|\.\s|\.$/)[0];
    s = s.replace(/\b(?:obj|scr)_[A-Za-z0-9_]+/g, ' ')
         .replace(/gml_[A-Za-z0-9_]+/g, ' ')
         .replace(/global\.[A-Za-z]\w*(\[\d+\])?/g, ' ')
         .replace(/flag\[\d+\]/gi, ' ')
         .replace(/[<>]=?=?\s*-?\d+(\.\d+)?/g, ' ')
         .replace(/[→]/g, ' ');
    s = s.replace(/\s{2,}/g, ' ').replace(/\s+([,:;)])/g, '$1').trim();
    s = s.replace(/[\s,:(—–-]+$/, '').trim();
    if (s.length > 72) s = s.slice(0, 69).replace(/\s+\S*$/, '') + '…';
    return s;
  }
  function rebuild() {
    var DOCS = (window.KnightI18n && window.KnightI18n.FLAG_DOCS) || {};
    var AUTO = window.KnightFlagsAuto || {};
    var DETAIL = window.KnightFlagsDetail || {};
    var info = {};
    var full = {};
    var keys = {};
    Object.keys(DOCS).forEach(function (k) { keys[k] = 1; });
    Object.keys(AUTO).forEach(function (k) { keys[k] = 1; });
    Object.keys(keys).forEach(function (k) {
      var n = Number(k);
      if (!isFinite(n)) return;
      var label = '';
      if (DOCS[k] && DOCS[k].description) label = shortLabel(DOCS[k].description);
      if (!label && AUTO[k] && AUTO[k].n) label = AUTO[k].n;
      if (label) info[n] = label;
      var e = {};
      if (AUTO[k] && AUTO[k].n) e.name = AUTO[k].n;
      if (DOCS[k]) {
        if (DOCS[k].description) e.d = clean(DOCS[k].description);
        if (DOCS[k].values && typeof DOCS[k].values === 'object') {
          var v = {};
          Object.keys(DOCS[k].values).forEach(function (vk) { v[vk] = clean(DOCS[k].values[vk]); });
          if (Object.keys(v).length) e.v = v;
        }
        if (DOCS[k].min != null) e.mn = DOCS[k].min;
        if (DOCS[k].max != null) e.mx = DOCS[k].max;
      }
      if (DETAIL[k] && DETAIL[k].detail) e.det = clean(DETAIL[k].detail);
      if (AUTO[k] && Array.isArray(AUTO[k].v) && AUTO[k].v.length) e.obs = AUTO[k].v.slice(0, 40);
      if (e.d || e.det || e.v || e.name) full[n] = e;
    });
    window.__FLAGINFO = info;
    window.__FLAGFULL = full;
  }
  rebuild();
  window.__FLAGINFO_REBUILD = rebuild;
})();
