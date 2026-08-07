/**
 * DarkgoD Team – site nav (same markup as homepage)
 *
 *   <div id="site-nav"></div>
 *   <script src="/assets/js/site-nav.js"></script>
 */
(function () {
  "use strict";

  var LINK =
    "px-2 transition-opacity text-white hover:opacity-80 hover:duration-0 duration-150 inline-block text-center text-xs sm:text-sm md:text-lg drop-shadow-[2px_2px_0px_rgba(0,0,0)]";
  var REGION =
    "transition-opacity hover:opacity-80 hover:duration-0 duration-150";

  function detectLang() {
    var path = (window.location.pathname || "").toLowerCase();
    if (path.indexOf("/jp/") !== -1 || path.indexOf("/ja/") !== -1) return "ja";
    if (path.indexOf("/ru/") !== -1) return "ru";
    if (path.indexOf("/eng/") !== -1 || path.indexOf("/en/") !== -1) return "en";
    var l = (document.documentElement.getAttribute("lang") || "en").toLowerCase();
    if (l.indexOf("ja") === 0) return "ja";
    if (l.indexOf("ru") === 0) return "ru";
    return "en";
  }

  function siteRoot() {
    var path = window.location.pathname || "";
    var m = path.match(/^(.*\/)(?:eng|en|jp|ja|ru)(?:\/|$)/i);
    if (m) return m[1].replace(/\/$/, "") || "";
    return "";
  }

  function depthPrefix() {
    var path = window.location.pathname || "";
    var m = path.match(/\/(?:eng|en|jp|ja|ru)\/(.*)$/i);
    if (!m || !m[1] || m[1] === "index.html" || m[1] === "index.htm") return "";
    var rest = m[1].replace(/index\.html?$/, "").replace(/\/$/, "");
    if (!rest) return "";
    return rest.split("/").filter(Boolean).map(function () { return ".."; }).join("/") + "/";
  }

  function pageSuffix() {
    var path = window.location.pathname || "";
    var m = path.match(/\/(?:eng|en|jp|ja|ru)(\/.*)$/i);
    if (!m) return "/";
    var suf = m[1].replace(/index\.html?$/, "");
    return suf === "" ? "/" : suf;
  }

  var LABELS = {
    en: { home: "HOME", ost: "SOUNDTRACK", merch: "MERCH" },
    ja: { home: "HOME", ost: "SOUNDTRACK", merch: "MERCH" },
    ru: { home: "ГЛАВНАЯ", ost: "САУНДТРЕК", merch: "ОФИЦИАЛЬНЫЕ ТОВАРЫ" }
  };

  var OST = {
    en: "https://tobyfox.bandcamp.com/",
    ja: "https://tobyfoxjp.bandcamp.com/",
    ru: "https://tobyfox.bandcamp.com/"
  };

  var MERCH = {
    en: "https://www.fangamer.com/collections/deltarune",
    ja: "https://www.fangamer.jp/collections/deltarune",
    ru: "https://www.fangamer.com/collections/deltarune"
  };

  function build(lang) {
    var L = LABELS[lang] || LABELS.en;
    var prefix = depthPrefix();
    var site = siteRoot();
    var page = pageSuffix();
    var home = prefix + "index.html";
    var flags = prefix + "assets/images";

    function langUrl(code) {
      var b = (site || "") + "/" + code + page;
      if (b.slice(-1) !== "/") b += "/";
      return b + "index.html";
    }

    return (
      '<nav class="site-nav w-full z-40 bg-nav-blue">' +
      '  <div class="relative w-full">' +
      '    <ul class="flex items-center justify-between w-full max-w-2xl mx-auto gap-1 md:gap-6 h-12 pr-[96px] md:pr-0 pl-2 md:pl-0 font-8bit uppercase">' +
      '      <li><a class="' + LINK + '" href="' + home + '">' + L.home + "</a></li>" +
      '      <li><a class="' + LINK + '" href="' + (OST[lang] || OST.en) + '" target="_blank" rel="noopener noreferrer">' + L.ost + "</a></li>" +
      '      <li><a class="' + LINK + '" href="' + (MERCH[lang] || MERCH.en) + '" target="_blank" rel="noopener noreferrer">' + L.merch + "</a></li>" +
      "    </ul>" +
      '    <ul id="regions">' +
      '      <li><a href="' + langUrl("eng") + '" class="' + REGION + '"><img alt="US English Version" src="' + flags + '/flag-us.png"></a></li>' +
      '      <li><a href="' + langUrl("jp") + '" class="' + REGION + '"><img alt="JP Japanese Version" src="' + flags + '/flag-jp.png"></a></li>' +
      '      <li><a href="' + langUrl("ru") + '" class="' + REGION + '"><img alt="RU Russian Version" src="' + flags + '/flag-ru.png"></a></li>' +
      "    </ul>" +
      "  </div>" +
      "</nav>"
    );
  }

  function mount() {
    var el = document.getElementById("site-nav");
    if (!el) return;
    el.outerHTML = build(detectLang());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
