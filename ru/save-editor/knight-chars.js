
(() => {
  'use strict';


  const EQUIP = {
    1: {
      weapons: [0, 1, 5, 8, 11, 14, 16, 23, 26, 50, 53, 4],
      armors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 50, 51, 52, 53, 54],
      spells: [0, 7],
    },
    2: {
      weapons: [2, 6, 7, 17, 24, 52, 54, 4],
      armors: [0, 1, 2, 4, 5, 6, 7, 8, 10, 11, 12, 13, 14, 15, 18, 19, 21, 22, 23, 24, 25, 27, 50, 51, 52, 54],
      spells: [0, 4, 5, 11],
    },
    3: {
      weapons: [0, 3, 9, 10, 15, 18, 19, 21, 25, 51, 4],
      armors: [0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 50, 51, 52, 53, 54],
      spells: [0, 2, 3, 6],
    },
    4: {
      weapons: [12, 13, 22, 26, 50, 4],
      armors: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 18, 19, 20, 21, 22, 24, 25, 26, 27, 50, 51, 52, 53],
      spells: [0, 2, 8, 9, 10],
    },
  };


  const TITLES = {
    1: {
      1: { name: 'Человек', desc: 'Тело с ДУШОЙ человека.' },
      2: { name: 'Лидер', desc: 'ДЕЙСТВИЯМИ отдаёт отряду команды.' },
      3: { name: 'Тактик', desc: 'ДЕЙСТВИЯМИ отдаёт отряду команды.' },
      4: { name: 'Dark Hero', desc: 'Carries out fate with the blade.' },
    },
    2: {
      1: { name: 'Грубиянка', desc: 'Будет только бить.' },
      2: { name: 'Тёмный рыцарь', desc: 'Наносит урон тёмной энергией.' },
      3: { name: 'Тёмный рыцарь', desc: 'Наносит урон тёмной энергией.' },
      4: { name: 'Dark Hero', desc: 'Carries out fate with the blade.' },
    },
    3: {
      1: { name: 'Одинокий принц', desc: 'Житель мира тьмы. Без подданных.' },
      2: { name: 'Тёмный принц', desc: 'Чадо мира тьмы. Завёл друзей.' },
      3: { name: 'Тёмный принц', desc: 'Чадо мира тьмы. Завёл друзей, но...' },
      4: { name: 'Dark Hero', desc: 'Records and faces the fate.' },
    },
    4: {
      1: { name: 'Снежный маг', desc: 'Умеет всякие обморожительные штучки.' },
      2: { name: 'Снежный маг', desc: 'Умеет всякие обморожительные штучки.' },
      3: { name: 'Снежный маг', desc: 'Умеет всякие обморожительные штучки.' },
      4: { name: 'Снежный маг', desc: 'Умеет всякие обморожительные штучки.' },
    },
  };


  function computeTitle(charIndex, save) {
    const ch = save.meta.chapter;
    const f = save.flags;
    const plot = save.plot || 0;
    const room = Number(save.room);
    const keyItems = (save.inventory && save.inventory.keyItems) || [];
    const hasEgg = keyItems.includes(2);
    const w = (save.characters[charIndex] && save.characters[charIndex].weapon) || 0;
    const realLv = Number(save.lv) || 1;
    const mk = (name, desc, _lv) => ({ name, desc, lv: realLv });
    const baseObj = (TITLES[charIndex] && (TITLES[charIndex][ch] || TITLES[charIndex][1])) || { name: '—', desc: '' };
    let t = mk(baseObj.name, baseObj.desc, (ch >= 1 && ch <= 4) ? ch : 1);

    if (charIndex === 1) {
      if (ch === 1) {
        t = mk('Человек', 'Тело с ДУШОЙ человека.', 1);
        if (plot > 30) t = mk('Лидер', 'ДЕЙСТВИЯМИ отдаёт отряду команды.', 1);
        if (f[252]) t = mk('Ревизор кроватей', 'Зачем-то осматривает все кровати.', 1);
      } else if (ch === 2) {
        const lv = plot > 200 ? 3 : 2;
        t = mk('Лидер', 'ДЕЙСТВИЯМИ отдаёт отряду команды.', lv);
        if (plot > 60) t = mk('Тактик', 'ДЕЙСТВИЯМИ отдаёт отряду команды.', lv);
        if (f[252] && f[414] && f[409] && f[410] && f[411] && f[412] && f[413]) t = mk('Ревизор кроватей', 'Зачем-то осматривает все кровати.', lv);
        if (f[920]) t = mk('Moss Finder', 'Basic moss-finding abilities', lv);
        if (!f[916] && f[915] > 0) t = mk('Лидер', 'ДЕЙСТВИЯМИ отдаёт отряду команды.', lv);
      } else if (ch === 3) {
        t = mk('Тактик', 'ДЕЙСТВИЯМИ отдаёт отряду команды.', 3);
        if (plot >= 250) t = mk('Режиссёр', 'Руководит актёрами.', 3);
        if (f[1078]) t = mk('Сыщик мха', 'Имеет средние навыки обнаружения мха.', 3);
        if (f[1055] === 1) t = mk('Мастер меча', 'Профи в ближнем бою с мечом.', 3);
        if (f[1055] === 3) t = mk('Мастер ледомеча', 'Профи в ближнем бою с мечом.', 3);
        if (f[1055] === 6) t = mk('Ножненосец', 'Рядом с мечами аж дух захватывает.', 3);
        if (hasEgg) t = mk('Enjoying', 'The Youthful Days', 3);
      } else {
        t = mk('Dark Hero', 'Carries out fate with the blade.', 4);
        if (f[106] && f[920] && f[1078] && f[1592]) t = mk('Moss Most', 'Munched the most moist mosses', 4);
        if (f[915] >= 3) t = mk('Dark Bead', 'Broken off, but still locked', 4);
      }
    } else if (charIndex === 2) {
      if (ch === 1) {
        t = mk('Грубиянка', 'Будет только бить.', 1);
        if (plot > 154) t = mk('Тёмный рыцарь', 'Наносит урон тёмной энергией.', 1);
      } else if (ch === 2) {
        const lv = plot > 200 ? 3 : 2;
        t = mk('Тёмный рыцарь', 'Наносит урон тёмной энергией.', lv);
        if (plot >= 95) t = mk('Healing Master', 'Can use ultimate healing. (Losers!)', lv);
        if (f[922]) t = mk('Moss Enjoyer', 'Supports those that find moss', lv);
      } else if (ch === 3) {
        t = mk('Тёмный рыцарь', 'Наносит урон тёмной энергией.', 3);
        if (plot >= 250) t = mk('Тёмный актёр', 'Соучастница в оккультных ДЕЙСТВИЯХ.', 3);
      } else {
        t = mk('Dark Hero', 'Carries out fate with the blade.', 4);
        if (f[852] > 0) t = mk('Axe of Justice', 'Faces fate with the blade', 4);
      }
    } else if (charIndex === 3) {
      if (ch === 1) {
        t = mk('Одинокий принц', 'Житель мира тьмы. Без подданных.', 1);
        if (w === 9) t = mk('Колючий принц', 'Наносит урон своим шершавым шарфом.', 1);
        if (w === 10) t = mk('Пушистый принц', 'Слаб, но умеет исцелять.', 1);
      } else if (ch === 2) {
        const lv = plot > 200 ? 3 : 2;
        t = mk('Тёмный принц', 'Чадо мира тьмы. Завёл друзей.', lv);
        const photo = f[325];
        if (photo === 1) t = mk('Hug Prince', 'Receives and gives many hugs', lv);
        else if (photo === 2) t = mk('Pose Prince', 'Poses for photos at times', lv);
        else if (photo === 3) t = mk('Rude Prince', 'Friends with a rude gesturer', lv);
        else if (photo === 4) t = mk('Blank Prince', "Doesn't even have a photo", lv);
      } else if (ch === 3) {
        t = mk('Тёмный принц', 'Чадо мира тьмы. Завёл друзей, но...', 3);
        if (plot >= 250) t = mk('Тёмный актёр', 'Ему сложно даётся актёрское мастерство.', 3);
        if (room === 30204 && !f[1152]) t = mk('Horse', 'Is a horse', 3);
        if (f[1152]) t = mk('Бывший конь', 'Когда-то был конём.', 3);
        if (plot >= 320) t = mk('Тёмный принц', 'Чадо мира тьмы. Завёл друзей.', 3);
      } else {
        t = mk('Dark Hero', 'Records and faces the fate.', 4);
        if (room === 40176 && plot >= 145) t = mk('Stool Boy', 'Boy with stool like abilities', 4);
      }
    } else if (charIndex === 4) {
      t = mk('Снежный маг', 'Умеет всякие обморожительные штучки.', 1);
      const lv = (ch === 2) ? (plot >= 200 ? 3 : 2) : 1;
      if (f[925] > 0) t = mk('Колдунья мороза', 'Замораживает врага.', lv);
      if (w === 13) t = mk('Ice Trancer', 'Receives pain to become stronger', lv);
      if (f[921] && (!f[916] || f[915] === 0)) t = mk('Moss Neutral', 'Neither chaotic nor lawful to moss', lv);
    }
    return t;
  }

  function isAllowed(charIndex, kind, value) {
    const e = EQUIP[charIndex];
    if (!e) return true;
    const list = kind === 'weapons' ? e.weapons : kind === 'armors' ? e.armors : kind === 'spells' ? e.spells : null;
    if (!list) return true;
    return list.includes(Number(value));
  }


  const CHAPTER_CHARS = { 1: [1, 2, 3], 2: [1, 2, 3, 4], 3: [1, 2, 3, 4], 4: [1, 2, 3, 4] };

  const ALLOWED_SLOTS = { 0: [1, 2], 1: [0], 2: [1, 2], 3: [1, 2], 4: [1, 2] };

  window.KnightChars = { EQUIP, TITLES, computeTitle, isAllowed, CHAPTER_CHARS, ALLOWED_SLOTS };


  const RECRUIT_META = {
    601:{c:1,r:false,ch:1}, 602:{c:1,r:false,ch:1}, 603:{c:1,r:false,ch:1}, 604:{c:1,r:false,ch:1},
    605:{c:1,r:true,ch:1}, 606:{c:1,r:true,ch:1}, 607:{c:1,r:false,ch:1}, 609:{c:1,r:false,ch:1},
    610:{c:1,r:false,ch:1}, 611:{c:1,r:true,ch:1}, 612:{c:1,r:false,ch:1}, 613:{c:1,r:true,ch:1},
    614:{c:1,r:true,ch:1}, 615:{c:1,r:true,ch:1}, 616:{c:1,r:false,ch:1}, 617:{c:1,r:false,ch:1},
    618:{c:1,r:false,ch:1}, 619:{c:1,r:false,ch:1}, 620:{c:1,r:false,ch:1}, 621:{c:1,r:false,ch:1},
    622:{c:1,r:true,ch:1}, 623:{c:1,r:true,ch:1}, 625:{c:1,r:false,ch:1},
    630:{c:4,r:true,ch:2}, 631:{c:3,r:true,ch:2}, 632:{c:5,r:true,ch:2}, 633:{c:6,r:true,ch:2},
    634:{c:3,r:true,ch:2}, 635:{c:4,r:true,ch:2}, 636:{c:5,r:true,ch:2}, 637:{c:1,r:false,ch:2},
    638:{c:1,r:false,ch:2}, 639:{c:1,r:false,ch:2}, 640:{c:1,r:true,ch:2}, 641:{c:1,r:false,ch:2},
    642:{c:1,r:true,ch:2}, 643:{c:1,r:false,ch:2}, 644:{c:1,r:true,ch:2}, 645:{c:1,r:false,ch:2},
    646:{c:1,r:false,ch:2}, 647:{c:1,r:false,ch:2}, 648:{c:1,r:false,ch:2}, 649:{c:1,r:false,ch:2},
    650:{c:1,r:false,ch:2}, 651:{c:1,r:false,ch:2}, 652:{c:1,r:false,ch:2}, 653:{c:1,r:false,ch:2},
    654:{c:25,r:true,ch:3}, 655:{c:2,r:true,ch:3}, 656:{c:2,r:true,ch:3}, 657:{c:3,r:true,ch:3},
    658:{c:1,r:true,ch:3}, 659:{c:5,r:true,ch:3}, 660:{c:1,r:true,ch:3}, 661:{c:1,r:true,ch:3},
    662:{c:3,r:true,ch:4}, 663:{c:5,r:true,ch:4}, 664:{c:3,r:true,ch:4}, 665:{c:2,r:true,ch:4},
    666:{c:2,r:true,ch:4}, 667:{c:2,r:true,ch:4}, 668:{c:3,r:true,ch:4}, 669:{c:1,r:true,ch:4},
  };
  window.KnightChars.RECRUIT_META = RECRUIT_META;
})();
