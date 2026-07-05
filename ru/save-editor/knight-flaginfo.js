(() => {
  'use strict';
  window.KnightFlagsDetail = {
  "23": {
    "detail": "Гл.4. При flag[23]==0 объекты obj_climbstarter и obj_climbstartertrig в Create ставят amsolid=true и создают obj_solidblock, перекрывая дорогу. obj_climbstartertrig (Other_10) разрешает взаимодействие, когда flag[23]==1 || plot>=180. obj_dw_church_nwconnect делает makeslide=true при flag[850]>=5 || flag[23]==true. В отладке (scr_debug) flag[23] выставляется в 1 при plot>=230, а в obj_dw_church_trueclimbadventure и obj_dw_churchb_rotatingtower2 — принудительно (debug_print «Climb Flag [23] enabled»). На что влияет: проходимость подъёма в церкви Гл.4 (obj_climbstarter/obj_climbstartertrig/obj_solidblock), запуск obj_dw_church_trueclimbadventure и obj_dw_churchb_rotatingtower2, реплика «слишком скользко» в obj_dw_church_waterfallroom при flag[23]==0.",
    "related": [
      850,
      1530
    ],
    "lines": [
      {
        "cond": "При flag[23] = 0 (слишком скользко — подъём в церкви перекрыт)",
        "who": "narration",
        "text": "* It's too slippery to climb... If only you had something to help you climb."
      }
    ]
  },
  "40": {
    "detail": "Инкремент global.flag[40] += 1 при flag[51+myself]==1 (враг побеждён силой) в scr_monsterdefeat (ch1/ch2/ch4), obj_knight_enemy (ch3), obj_spamton_neo_enemy и obj_queen_enemy (ch2); если fatal==1, ещё и flag[44]++. В scr_text счётчик уменьшается на normal_kills = flag[520] − flag[523] (с обнулением при <0), а прощённое насилие над бубинном вычитается. Читается obj_kingcutscene (type=0 при flag[40]>0 || flag[43]>=2) и obj_ch2_scene23a (ветка при flag[40]==0 и сумме рекрутов <7). На что влияет: маршрут прохождения и реакции NPC; катсцена с Королём (obj_kingcutscene), сцена obj_ch2_scene23a, статистика боёв.",
    "related": [
      43,
      44,
      520,
      523
    ],
    "lines": [
      {
        "cond": "Мирная реакция (flag[40] < 2): посаженный рекрут, room_cc_prison2 (spr_diamond_overworld)",
        "who": "narration",
        "text": "* Меня посадили, потому что я не хотел с вами сражаться..."
      },
      {
        "cond": "Мирная реакция (flag[40] < 2): посаженный рекрут, room_cc_prison2 (spr_diamond_overworld)",
        "who": "narration",
        "text": "* А с чего бы мне хотеть?! Вы, по-моему, НАМНОГО добрее Короля!.."
      },
      {
        "cond": "Реакция при насилии (flag[40] ≥ 2): «вы внушаете страх»",
        "who": "narration",
        "text": "* Ха-ха, лучше уж в тюрьме посидеть, чем встретиться с вами! Меня от вас в дрожь бросает!"
      }
    ]
  },
  "41": {
    "detail": "global.flag[41] += 1 выполняется, когда flag[51+myself]==2 (враг пощажён). Срабатывает в scr_monsterdefeat (ch1/ch2/ch4), obj_knight_enemy (ch3), obj_spamton_neo_enemy и obj_queen_enemy (ch2). На что влияет: статистика мирного прохождения боёв; счётчик пощад, который вместе с flag[40]/42/43 формирует тип маршрута.",
    "related": [
      40,
      42,
      43
    ]
  },
  "42": {
    "detail": "global.flag[42] += 1 выполняется при flag[51+myself]==3 (враг усмирён ДЕЙСТВИЕМ). Срабатывает в scr_monsterdefeat (ch1/ch2/ch4), obj_knight_enemy (ch3), obj_spamton_neo_enemy и obj_queen_enemy (ch2). На что влияет: статистика боёв; счётчик усмирений, влияющий на оценку маршрута наряду с flag[40]/41/43.",
    "related": [
      40,
      41,
      43
    ]
  },
  "43": {
    "detail": "global.flag[43] += 1 выполняется при flag[51+myself]==5 (враг повержен автоатакой Сьюзи). Растёт в scr_monsterdefeat (ch1/ch2/ch4), obj_knight_enemy (ch3), obj_spamton_neo_enemy и obj_queen_enemy (ch2). В scr_text при прощении вычитается flag[523] (с обнулением при <0). Читается obj_kingcutscene (type=0 при flag[40]>0 || flag[43]>=2). На что влияет: катсцена с Королём (obj_kingcutscene), общий счётчик насилия и сцена прощения бубинна.",
    "related": [
      40,
      523
    ],
    "lines": [
      {
        "cond": "Сцена прощения бубинна (scr_text при извинении): вычитает flag[523] из flag[43]",
        "who": "narration",
        "text": "* Обещаем, этого не повторится!"
      },
      {
        "cond": "Сцена прощения бубинна (scr_text при извинении): вычитает flag[523] из flag[43]",
        "who": "narration",
        "text": "* А?.. Ну раз вы извиняетесь, я вас прощаю..."
      },
      {
        "cond": "Сцена прощения бубинна (scr_text при извинении): вычитает flag[523] из flag[43]",
        "who": "narration",
        "text": "* (Вы искупили свою вину перед бубинном!)"
      },
      {
        "cond": "Сцена прощения червонны (scr_text при извинении): вычитает flag[524] из flag[43]",
        "who": "narration",
        "text": "* Честно, мы больше так не будем!"
      },
      {
        "cond": "Сцена прощения червонны (scr_text при извинении): вычитает flag[524] из flag[43]",
        "who": "narration",
        "text": "* (Червонна чувствует искренность. Она простила ваши грехи...)"
      },
      {
        "cond": "Сцена прощения червонны (scr_text при извинении): вычитает flag[524] из flag[43]",
        "who": "narration",
        "text": "* (Как гора с плеч.)"
      }
    ]
  },
  "44": {
    "detail": "global.flag[44]++ выполняется внутри ветки flag[51+myself]==1, если fatal==1. Срабатывает в scr_monsterdefeat (ch2/ch4), obj_knight_enemy (ch3), obj_spamton_neo_enemy и obj_queen_enemy (ch2). На что влияет: счётчик именно убийств (например, Snowgrave/добивания), отдельный от общего «насилия» flag[40].",
    "related": [
      40
    ]
  },
  "45": {
    "detail": "global.flag[45] += 1 выполняется при flag[51+myself]==6 (враг завершён в «замороженном» состоянии), там же начисляется global.monstergold[3] += 24. Срабатывает в scr_monsterdefeat (ch2/ch4), obj_knight_enemy (ch3), obj_spamton_neo_enemy и obj_queen_enemy (ch2). На что влияет: счётчик заморозок (маршрут Snowgrave) и начисление монет за заморозку.",
    "related": [
      40,
      44
    ]
  },
  "61": {
    "detail": "Глобальный выключатель вербовки (при 1 пополнение отряда отключено). Как это работает: при каждом пощажении/усмирении нужного врага его счётчик вербовки растёт; когда наберётся нужное число — враг присоединяется к отряду. Значение -1 = «потерян» (убит или заморожен насмерть) — навсегда.",
    "related": [
      605,
      606,
      607
    ],
    "dialogue": "Отключает систему пополнения отряда."
  },
  "66": {
    "detail": "Гл.2 (Мир тьмы). scr_fountain_levelup ведёт счёт повышений уровня у фонтана. На что влияет: читается в Гл.3/4 (for _i = global.flag[66]; _i < 2) — учёт количества прокачек, переносится вперёд."
  },
  "100": {
    "detail": "Гл.1. obj_readable_room1 (Create) в room_dark3a при flag[100]==0 создаёт маркер spr_shine (свечение). В scr_text при выборе «Взять» (case 111) выдаётся scr_itemget(3), flag[100]=1, а маркер shine у obj_readable_room1 уничтожается. На что влияет: наличие светящегося маркера и возможность подобрать Светосколок в room_dark3a (obj_readable_room1, scr_text).",
    "lines": [
      {
        "cond": "Осмотр светящегося маркера (флаг=0)",
        "who": "narration",
        "text": "* (Внутри что-то светится.)"
      },
      {
        "cond": "Осмотр светящегося маркера (флаг=0)",
        "who": "narration",
        "text": "* (Взять?)"
      },
      {
        "cond": "После взятия светосколка (флаг→1)",
        "who": "narration",
        "text": "* (Получен светосколок.)"
      }
    ]
  },
  "101": {
    "detail": "Гл.1. В scr_text по flag[101] выбирается текст: ==0 «на дереве висят два предмета», ==1 «висит конфета», >=2 «нечего взять». При взятии scr_itemget(1) и flag[101] += 1 (если есть место). В Гл.4 obj_ch4_PDC03 учитывает scr_flag_get(101)>0 в проверке darkcandy_check (Тёмная конфета как «нюхательные наклейки»). На что влияет: возможность снять конфету с дерева в Гл.1 (scr_text) и проверку наличия Тёмной конфеты в Гл.4 (obj_ch4_PDC03).",
    "related": [
      102,
      128,
      140
    ],
    "lines": [
      {
        "cond": "При flag[101]=0 — на дереве два предмета",
        "who": "narration",
        "text": "* (На дереве висят два предмета.)"
      },
      {
        "cond": "При flag[101]=0 — на дереве два предмета",
        "who": "narration",
        "text": "* (Взять один?)"
      },
      {
        "cond": "При flag[101]=1 — осталась одна конфета",
        "who": "narration",
        "text": "* (На дереве висит конфета.)"
      },
      {
        "cond": "При flag[101]≥2 — больше не дотянуться",
        "who": "narration",
        "text": "* (Вы не можете дотянуться до остальных.)"
      },
      {
        "cond": "При взятии конфеты (есть место в инвентаре)",
        "who": "narration",
        "text": "* (Получена тёмная конфета.)"
      },
      {
        "cond": "При взятии — нет места в инвентаре",
        "who": "narration",
        "text": "* (У вас больше нет места.)"
      }
    ]
  },
  "102": {
    "detail": "Гл.1. Аналогично flag[101]: в scr_text по flag[102] выбирается текст (==0 два предмета, ==1 одна конфета, >=2 нечего взять), при взятии scr_itemget(1) и flag[102] += 1. В Гл.4 obj_ch4_PDC03 учитывает scr_flag_get(102)>0 в darkcandy_check. На что влияет: вторая конфета на дереве в Гл.1 (scr_text) и проверка наличия Тёмной конфеты в Гл.4 (obj_ch4_PDC03).",
    "related": [
      101,
      128,
      140
    ],
    "lines": [
      {
        "cond": "Гл.1: осмотр дерева, обе конфеты на месте (flag=0)",
        "who": "narration",
        "text": "* (На дереве висят два предмета.)"
      },
      {
        "cond": "Гл.1: осмотр дерева, обе конфеты на месте (flag=0)",
        "who": "narration",
        "text": "* (Взять один?)"
      },
      {
        "cond": "Гл.1: осмотр дерева, осталась одна конфета (flag=1)",
        "who": "narration",
        "text": "* (На дереве висит конфета.)"
      },
      {
        "cond": "Гл.1: осмотр дерева, всё уже забрано (flag≥2)",
        "who": "narration",
        "text": "* (Вы не можете дотянуться до остальных.)"
      },
      {
        "cond": "Конфета взята, есть место в инвентаре",
        "who": "narration",
        "text": "* (Получена тёмная конфета.)"
      },
      {
        "cond": "Инвентарь полон при попытке взять",
        "who": "narration",
        "text": "* (У вас больше нет места.)"
      }
    ]
  },
  "103": {
    "detail": "Гл.1. В scr_text при flag[103]==0 предлагается взять кусок дымящегося торта; при подтверждении scr_keyitemget(3) и flag[103]=1 (если есть место). На что влияет: получение ключ-предмета Сломанный торт в scr_text (раздел ВАЖНЫЕ ВЕЩИ).",
    "lines": [
      {
        "cond": "При 0 (предложение взять кусок торта)",
        "who": "narration",
        "text": "* (Остатки торта всё ещё дымятся...)"
      },
      {
        "cond": "При 0 (предложение взять кусок торта)",
        "who": "narration",
        "text": "* (Взять кусок?)"
      },
      {
        "cond": "При подтверждении, есть место (→103=1)",
        "who": "narration",
        "text": "* (Сломанный торт добавлен в раздел ВАЖНЫЕ ВЕЩИ.)"
      },
      {
        "cond": "При подтверждении, нет места в инвентаре",
        "who": "narration",
        "text": "* (У вас больше нет места.)"
      }
    ]
  },
  "104": {
    "detail": "Сундук задаёт itemflag=104, itemtype=\"armor\", itemidchest=4 в obj_treasure_room (ch2) и obj_tower_dog_egg (ch4) Create. Флаг ставится через переменный индекс сундука (литерала global.flag[104] в этих ветках нет). На что влияет: открыт ли сундук с этой бронёй (obj_treasure_room / obj_tower_dog_egg) — повторно её не выдаёт."
  },
  "105": {
    "detail": "Гл.1. obj_npc_sign в room_cc_prison_cells показывает spr_ironshackle: image_index=1 при flag[105]==1 (кандалы сняты). В scr_text при подтверждении взятия image_index=1 и flag[105]=1, кандалы добавляются в раздел БРОНЯ. На что влияет: спрайт кандалов (obj_npc_sign) и выдачу брони Железные кандалы (scr_text) в тюрьме Карточного замка.",
    "lines": [
      {
        "cond": "Осмотр кандалов, вопрос «Взять?» (flag 0)",
        "who": "narration",
        "text": "* (Как ни странно, эти кандалы смотрятся модно.)"
      },
      {
        "cond": "Осмотр кандалов, вопрос «Взять?» (flag 0)",
        "who": "narration",
        "text": "* (Взять?)"
      },
      {
        "cond": "После согласия взять (flag → 1)",
        "who": "narration",
        "text": "* (Не нужно себя сдерживать...)"
      },
      {
        "cond": "После согласия взять (flag → 1)",
        "who": "narration",
        "text": "* (КАНДАЛЫ добавлены в раздел БРОНЯ.)"
      }
    ]
  },
  "106": {
    "detail": "Гл.1. В scr_text при выборе «съесть» восстанавливается HP[1]=maxhp[1], играет snd_swallow и flag[106]=1 (через obj_event_manager триггерится событие). При flag[106]==1 в obj_room_castle_kris и obj_ch2_room_castle_kris (Гл.2/3) в комнате Крис появляются маркеры мха (obj_readable_room1 + spr_dw_kris_room_moss), а obj_readable_room1 даёт особую реплику. В Гл.3 obj_npc_sign (стог сена) и в Гл.2 obj_npc_dumpster проверяют flag[106]. На что влияет: восстановление HP и память о съеденном мхе; появление мха в комнате Крис в последующих главах (obj_room_castle_kris/obj_ch2_room_castle_kris), реплики у стога/мусорки, вклад в титул Гл.4 «Moss Most».",
    "related": [
      922,
      1153
    ],
    "lines": [
      {
        "cond": "При осмотре мха в камере (флаг = 0)",
        "who": "narration",
        "text": "* Чего? В вашей камере есть МОХ?!"
      },
      {
        "cond": "При осмотре мха в камере (флаг = 0)",
        "who": "narration",
        "text": "* (Так нечестно...)"
      },
      {
        "cond": "При осмотре мха в камере (флаг = 0)",
        "who": "narration",
        "text": "* (Даже мне ничего не оставили...)"
      },
      {
        "cond": "При осмотре мха в камере (флаг = 0)",
        "who": "narration",
        "text": "* (Всё в мире нуждается в пище.) * (Даже мох пьёт воду.)"
      },
      {
        "cond": "При осмотре мха в камере (флаг = 0)",
        "who": "narration",
        "text": "* (Продолжить пищевую цепь?)"
      },
      {
        "cond": "При выборе «съесть» мох (флаг → 1)",
        "who": "narration",
        "text": "* (Вы съели мох.) * (На вкус... мшисто.)"
      },
      {
        "cond": "При выборе «съесть» мох (флаг → 1)",
        "who": "narration",
        "text": "* (Все ОЗ восстаМХОвлены...)"
      },
      {
        "cond": "При выборе «съесть» мох (флаг → 1)",
        "who": "narration",
        "text": "* (Мох был съеден.) * (Пищевая цепь возобновлена...)"
      },
      {
        "cond": "При выборе «съесть» мох (флаг → 1)",
        "who": "narration",
        "text": "* (Цикл заканчивается здесь, в углу маленькой камеры...)"
      }
    ]
  },
  "107": {
    "detail": "Гл.1. obj_treasure_room в room_forest_dancers1 задаёт itemflag=107, itemtype=\"item\", t_itemid=2, extratext=1. Флаг ставится через переменный индекс сундука. На что влияет: открыт ли сундук с Живительн. мятой в room_forest_dancers1 (obj_treasure_room)."
  },
  "108": {
    "detail": "Гл.1. obj_treasure_room в room_forest_area2A задаёт itemflag=108, itemtype=\"weapon\", t_itemid=9. obj_npc_room (NPC-вешалка) меняет реплики по flag[108]: при ==1 && flag[233]==0 рассказывает про шарф, при ==0 зовёт взять сундук (и ставит flag[233]=1), при ==1 && отсутствии оружия 9 предлагает вернуть. На что влияет: выдачу оружия Рваник (obj_treasure_room) и диалоги NPC-вешалки в Лесу (obj_npc_room, совместно с flag[233]).",
    "related": [
      233
    ],
    "lines": [
      {
        "cond": "По умолчанию (шарф уже взят) — приветствие вешалки",
        "who": "narration",
        "text": "* У меня была ДОЛЖНОСТЬ в замке, пока КОРОЛЬ не уволил всех СЛУГ."
      },
      {
        "cond": "По умолчанию (шарф уже взят) — приветствие вешалки",
        "who": "narration",
        "text": "* Какая должность? КОРОЛЕВСКАЯ ВЕШАЛКА!"
      },
      {
        "cond": "При 108=1 и flag[233]=0 — узнаёт взятый ШАРФ",
        "who": "narration",
        "text": "* А, тот ШАРФ!"
      },
      {
        "cond": "При 108=1 и flag[233]=0 — узнаёт взятый ШАРФ",
        "who": "narration",
        "text": "* Вы взяли его даже не спросив!"
      },
      {
        "cond": "При 108=1 и flag[233]=0 — узнаёт взятый ШАРФ",
        "who": "narration",
        "text": "* Всё нормально! Я дарю. * Пусть он поможет вам справиться с КОРОЛЁМ!"
      },
      {
        "cond": "При 108=0 — зовёт взять ШАРФ из сундука",
        "who": "narration",
        "text": "* Ребятки, да вы вылитые герои! * Возьмите из сундука ШАРФ и ПОБЕДИТЕ этого КОРОЛЯ!"
      },
      {
        "cond": "При 108=1 и оружия Рваник нет — предлагает вернуть в сундук",
        "who": "narration",
        "text": "* А где тот шарф? Что, не подошёл?"
      },
      {
        "cond": "При 108=1 и оружия Рваник нет — предлагает вернуть в сундук",
        "who": "narration",
        "text": "* Всё нормально! Просто положите обратно в сундук! Кто-нибудь его заберёт!"
      }
    ]
  },
  "109": {
    "detail": "Гл.1. obj_treasure_room в room_forest_area3A задаёт itemflag=109, itemtype=\"armor\", t_itemid=2, extratext=1. Флаг ставится через переменный индекс сундука. На что влияет: открыт ли сундук с бронёй Кубраслет в room_forest_area3A (obj_treasure_room)."
  },
  "110": {
    "detail": "Гл.1, room_forest_area4. obj_treasure_room различает два сундука по вертикальной позиции: ВЕРХНИЙ (y <= room_height/2) → itemflag=110, itemtype=\"gold\", t_itemid=40 (40 монет). На что влияет: открыт ли ВЕРХНИЙ сундук. flag 111 — это ДРУГОЙ (нижний) сундук той же комнаты (Живительн. мята); сундуки независимы — можно открыть один и пропустить другой (поэтому 110=1, а 111=0 — нормально).",
    "related": [
      111
    ]
  },
  "111": {
    "detail": "Гл.1, room_forest_area4. obj_treasure_room различает два сундука по вертикальной позиции: НИЖНИЙ (ветка else, y > room_height/2) → itemflag=111, itemtype=\"item\", t_itemid=2 (Живительн. мята). На что влияет: открыт ли НИЖНИЙ сундук. flag 110 — это ДРУГОЙ (верхний) сундук той же комнаты (40 монет); сундуки независимы — открываются раздельно.",
    "related": [
      110
    ]
  },
  "112": {
    "detail": "Гл.1. obj_treasure_room в room_cc_prison_prejoker: при flag[112]==1 сундук уничтожается (instance_destroy). Содержимое зависит от flag[242]: ==1 → itemflag=112, weapon, t_itemid=7; ==2 → itemflag=112, armor, t_itemid=7. На что влияет: наличие и тип награды за Джевила в room_cc_prison_prejoker (obj_treasure_room), завязано на flag[242].",
    "related": [
      242
    ]
  },
  "115": {
    "detail": "Гл.1. obj_shop1 (лавка Seam, Draw): при global.flag[241]>=1 (Джевил уже встречен/освобождён) и global.flag[115]==0 предлагается забрать Часть ключа А; при получении — global.flag[115]=1, и при flag[115]>=1 предмет в лавке больше не предлагается. На что влияет: получена ли Часть ключа А и пропадает ли её пункт в лавке. Связь: 241 (Джевил).",
    "related": [
      241
    ]
  },
  "119": {
    "detail": "Гл.2. obj_npc_room_animated (Other_10): nubert_check = (global.flag[119]==1) — меняет концовку реплики Nubert (sentenceEnd «/» либо «/%»). Флаг = получено ли сокровище Nubert. На что влияет: вариант реплики Nubert."
  },
  "123": {
    "detail": "Гл.2. obj_treasure_room в room_dw_cyber_viro_ring задаёт itemidchest=2, itemtype=\"item\", itemflag=123. При flag[123]==1 RoomCC_room_dw_cyber_viromaze2 меняет вид (extflag=0, image_index=26), а маркер сундука в room_dw_cyber_viro_ring уничтожается (RoomCC._13). На что влияет: выдачу Мятных конфет и состояние сундука/маркера в Кибермире (obj_treasure_room, RoomCC-объекты)."
  },
  "125": {
    "detail": "Гл.2. obj_treasure_room в room_dw_mansion_bridges задаёт itemidchest=30, itemtype=\"item\", itemflag=125. При flag[125]==true obj_dw_mansion_bridges_chestSpawner уничтожается (сундук не спавнится повторно). На что влияет: выдачу предмета и спавн сундука в Особняке (obj_treasure_room, obj_dw_mansion_bridges_chestSpawner)."
  },
  "128": {
    "detail": "В Гл.4 obj_ch4_PDC03 учитывает scr_flag_get(128)>0 в проверке darkcandy_check (наряду с flag 101/102/140): если есть хоть одна Тёмная конфета, она засчитывается как «нюхательные наклейки». На что влияет: проверку наличия Тёмной конфеты в сцене obj_ch4_PDC03 (Гл.4).",
    "related": [
      101,
      102,
      140
    ],
    "lines": [
      {
        "cond": "Гл.4, obj_ch4_PDC03: Сьюзи осматривает принесённые вещи (показывается всегда)",
        "who": "narration",
        "text": "* Let's see what the hell you've got here."
      },
      {
        "cond": "Гл.4, obj_ch4_PDC03: пункт перечня при наличии Тёмной конфеты (flag[128] > 0)",
        "who": "narration",
        "text": "* Smellable stickers."
      }
    ]
  },
  "129": {
    "detail": "Гл.2. obj_treasure_room в room_dw_cyber_teacup_final задаёт itemidchest=19, itemtype=\"weapon\", itemflag=129. Флаг ставится через переменный индекс сундука. На что влияет: открыт ли сундук с этим оружием в room_dw_cyber_teacup_final (obj_treasure_room)."
  },
  "130": {
    "detail": "Гл.2. obj_treasure_room в room_dw_city_big_3 задаёт itemidchest=14, itemtype=\"weapon\", itemflag=130. Флаг ставится через переменный индекс сундука. На что влияет: открыт ли сундук с этим оружием в room_dw_city_big_3 (obj_treasure_room)."
  },
  "133": {
    "detail": "Гл.2. obj_treasure_room в room_dw_mansion_b_west_1f_b задаёт itemtype=\"money\", itemflag=133, itemidchest=1. На что влияет: открыт ли денежный сундук в room_dw_mansion_b_west_1f_b (obj_treasure_room)."
  },
  "134": {
    "detail": "Гл.2. obj_treasure_room в room_dw_city_treasure задаёт itemflag=134, itemtype=\"armor\", itemidchest=3. На что влияет: открыт ли сундук с этой бронёй в room_dw_city_treasure (obj_treasure_room)."
  },
  "135": {
    "detail": "Гл.2. obj_treasure_room в room_dw_city_cheesemaze задаёт itemidchest=16, itemtype=\"item\", itemflag=135. На что влияет: открыт ли сундук с этим предметом в room_dw_city_cheesemaze (obj_treasure_room)."
  },
  "136": {
    "detail": "Гл.2. obj_treasure_room в room_dw_mansion_east_1f_secret задаёт itemidchest=1, itemtype=\"item\", itemflag=136. На что влияет: открыт ли потайной сундук в room_dw_mansion_east_1f_secret (obj_treasure_room)."
  },
  "137": {
    "detail": "Гл.2. obj_treasure_room в room_dw_mansion_bridges задаёт itemflag=137, itemidchest=30, itemtype=\"item\". На что влияет: открыт ли этот сундук на мостах room_dw_mansion_bridges (obj_treasure_room).",
    "related": [
      125
    ]
  },
  "138": {
    "detail": "Гл.2. obj_queenart_red в room_dw_mansion_fire_paintings (extflag==\"treasure\"): при flag[138]==0 играет snd_impact, выдаёт предмет через scr_itemget_anytype_text(2,\"item\") и показывает реплику. В Step image_index картины = (flag[138]==1). На что влияет: выдачу ReviveMint из картины и её спрайт (obj_queenart_red).",
    "lines": [
      {
        "cond": "При flag[138] = 0 → 1 (получена Мята из картины, obj_queenart_red, Гл.2)",
        "who": "narration",
        "text": "* (You found a ReviveMint!)"
      }
    ]
  },
  "139": {
    "detail": "Гл.2. obj_treasure_room в room_dw_mansion_east_2f_c_a задаёт itemidchest=3, itemtype=\"item\", itemflag=139. obj_ch2_room_mansion_east_2f_c_a при flag[139]==0 ставит dothis=true (запускает связанную головоломку/событие). На что влияет: выдачу Светосколка и логику комнаты room_dw_mansion_east_2f_c_a (obj_treasure_room, obj_ch2_room_mansion_east_2f_c_a)."
  },
  "140": {
    "detail": "В Гл.4 obj_ch4_PDC03 учитывает scr_flag_get(140)>0 в проверке darkcandy_check (наряду с flag 101/102/128). На что влияет: проверку наличия Тёмной конфеты в сцене obj_ch4_PDC03 (Гл.4).",
    "related": [
      101,
      102,
      128
    ],
    "lines": [
      {
        "cond": "Гл.4 (obj_ch4_PDC03, con=99): Сьюзи начинает осмотр инвентаря — всегда (до проверки конфеты)",
        "who": "narration",
        "text": "* Let's see what the hell you've got here."
      },
      {
        "cond": "Гл.4 (obj_ch4_PDC03): запись в списке при наличии Тёмной конфеты (darkcandy_check, в т.ч. flag[140] > 0)",
        "who": "narration",
        "text": "* Smellable stickers."
      }
    ]
  },
  "141": {
    "detail": "Гл.2. obj_treasure_room в room_dw_mansion_east_1f_e задаёт itemidchest=11, itemtype=\"armor\", itemflag=141. На что влияет: открыт ли сундук с этой бронёй в room_dw_mansion_east_1f_e (obj_treasure_room)."
  },
  "142": {
    "detail": "Гл.2–4. obj_treasure_room (room_dw_castle_west_cliff и в Гл.2 room_dw_mansion_b_east_transformed) задаёт itemidchest=21, itemflag=142. Доступность (qualify) зависит от flag[468]>0 и сбрасывается в 0 при flag[142]==1 (уже открыт) либо при flag[571]==1 / flag[468]==2. На что влияет: появление и доступность сундука Спамтона (obj_treasure_room) в Главах 2–4, завязано на flag[468] и flag[571].",
    "related": [
      468,
      571
    ]
  },
  "200": {
    "detail": "Гл.1, obj_schoollobbycutscene_Step (scon==4): при obj_mainchara.y<=80 если ran>=15 ставится global.flag[200]=1 и грузятся реплики Сьюзи gml_727-730 (Крис много бежал); при ran<15 — gml_719-722 («ползёшь медленно»). На что влияет: только вариант реплик Сьюзи в школьном холле; на дальнейшую игру не влияет, перенос отсутствует.",
    "lines": [
      {
        "cond": "Крис много бежал (ran≥15 → flag[200]=1): реплика Сьюзи в школьном холле",
        "who": "susie",
        "text": "* А ты быстро ходишь."
      },
      {
        "cond": "Крис много бежал (ran≥15 → flag[200]=1): реплика Сьюзи в школьном холле",
        "who": "susie",
        "text": "* Хотя..."
      },
      {
        "cond": "Крис много бежал (ran≥15 → flag[200]=1): реплика Сьюзи в школьном холле",
        "who": "susie",
        "text": "* Наверно, убегать — для тебя уже привычка."
      },
      {
        "cond": "Крис много бежал (ran≥15 → flag[200]=1): реплика Сьюзи в школьном холле",
        "who": "susie",
        "text": "* Пошли, чудила."
      }
    ]
  },
  "201": {
    "detail": "Гл.1. obj_darkeyepuzzle (Create) при flag[201]==0 обнуляет глаза; в Step при con==5 ставит flag[201]=1 (головоломка решена). В Гл.4 obj_classscene при flag[201]==1 && flag[269]==0 включает альтернативную реплику Альфис («Крис! Слава богу!»). На что влияет: состояние головоломки с глазами (obj_darkeyepuzzle) и альтернативный диалог в школьной сцене Гл.4 (obj_classscene), совместно с flag[269].",
    "related": [
      269
    ],
    "lines": [
      {
        "cond": "Школьная сцена Гл.4 (obj_classscene) — обычная реплика Альфис",
        "who": "narration",
        "text": "* Крис, ну наконец-то!"
      },
      {
        "cond": "Школьная сцена Гл.4 (obj_classscene) — обычная реплика Альфис",
        "who": "narration",
        "text": "* (Даже Сьюзи раньше тебя пришла, хе...)"
      },
      {
        "cond": "При flag[201]=1 и flag[269]=0 — альт. реплика Альфис",
        "who": "narration",
        "text": "* (Крис! Слава богу!!)"
      },
      {
        "cond": "При flag[201]=1 и flag[269]=0 — альт. реплика Альфис",
        "who": "narration",
        "text": "* (Я очень разволновалась. Тебя весь день вчера не было...)"
      }
    ]
  },
  "203": {
    "detail": "Гл.1: в scr_text при выборе пропустить выставляется flag[203]=1 (иначе Ральзей договаривает); obj_darkcastle_event по flag[203] выбирает альтернативные реплики и переход con=54. В Гл.4 obj_ch4_DCA04 и obj_dw_church_intro_guei по flag[203] меняют диалог о пророчестве (Сьюзи жалеет, что пропустила), а в отладке клавиша переключает флаг. На что влияет: реплики и ветвление сцен пророчества в Гл.1 (scr_text, obj_darkcastle_event) и Гл.4 (obj_ch4_DCA04, obj_dw_church_intro_guei).",
    "lines": [
      {
        "cond": "Гл.1: пророчество пропущено — Ральзей даёт краткую версию (flag=1)",
        "who": "narration",
        "text": "* Фух! * Ну что ж..."
      },
      {
        "cond": "Гл.1: пророчество пропущено — Ральзей даёт краткую версию (flag=1)",
        "who": "ralsei",
        "text": "* ... Yes, I..."
      },
      {
        "cond": "Гл.1: пророчество пропущено — Ральзей даёт краткую версию (flag=1)",
        "who": "ralsei",
        "text": "* ... My version was... more of... a summary."
      },
      {
        "cond": "Гл.4: Сьюзи жалеет, что пропустила пророчество (flag=1)",
        "who": "susie",
        "text": "* Damn, looks kinda cool. Too bad I skipped hearing it."
      },
      {
        "cond": "Гл.4: Сьюзи жалеет, что пропустила пророчество (flag=1)",
        "who": "susie",
        "text": "* I mighta actually liked it."
      }
    ]
  },
  "205": {
    "detail": "Гл.2. В обучающем бою obj_dummyenemy и obj_ralseienemy выставляют flag[205]: 6 — при dummyhp полном, misstime==9 и plot==2 (без атак); 4 — при hitdum>=3 (били манекен); 5 — при defendtime>=4 (защищались); 3 — при ударе по Ральзею; 1 — actcon==15 (ACT, «Как заботливо, Крис!»); 2 — победа объятием (Ральзей «You win!»). Читается obj_getsusieevent: при flag[205]==0 особые реплики и выдача Руководства Ральзея. На что влияет: реакции Ральзея/Сьюзи после обучения и сцену выдачи Руководства (obj_getsusieevent).",
    "related": [
      207
    ],
    "lines": [
      {
        "cond": "При 205=0 (после обучения без ДЕЙСТВИЙ Сьюзи)",
        "who": "narration",
        "text": "* (Ой, Крис! Сьюзи ведь пропустила обучение!)"
      },
      {
        "cond": "При 205=0 (после обучения без ДЕЙСТВИЙ Сьюзи)",
        "who": "narration",
        "text": "* (В следующем бою нам нужно будет обучить её ДЕЙСТВИЯМ!)"
      },
      {
        "cond": "При 205=0 (после обучения без ДЕЙСТВИЙ Сьюзи)",
        "who": "narration",
        "text": "* (Думаю, ей понравится!)"
      },
      {
        "cond": "При ДЕЙСТВИИ в бою (actcon=15 → 205=1)",
        "who": "narration",
        "text": "* Как заботливо, Крис!"
      },
      {
        "cond": "При 205=0 (выдача Руководства Ральзея)",
        "who": "narration",
        "text": "* В общем, вот! * Я вам со Сьюзи сделал руководство!"
      },
      {
        "cond": "При 205=0 (выдача Руководства Ральзея)",
        "who": "narration",
        "text": "* (Получено руководство.)"
      },
      {
        "cond": "При 205=0 (извинение Ральзея)",
        "who": "narration",
        "text": "* Прости, Крис. В следующий раз я постараюсь лучше объяснять."
      }
    ]
  },
  "207": {
    "detail": "obj_darkcontroller обрабатывает выбрасывание Руководства: при flag[207]==1 бросок «с размахом» (страницы по ветру) ставит flag[207]=2; при flag[207]==0 «роняешь с грохотом», затем Ральзей возвращает его (scr_itemget(4), flag[207]=1). При flag[207]>=2 в комнате Крис (obj_room_castle_kris/obj_ch2_room_castle_kris) появляется маркер мусора bg_dw_kris_room_trash, а obj_readable_room1 (Гл.3) даёт реплику про мусорку. На что влияет: наличие Руководства в инвентаре и появление мусорки в комнате Крис (obj_darkcontroller, obj_room_castle_kris, obj_readable_room1).",
    "related": [
      205
    ],
    "lines": [
      {
        "cond": "Бросок при flag 1 — окончательно (flag → 2)",
        "who": "narration",
        "text": "* (Вы с размахом бросили руководство.) * (Его страницы разбросало ветром.)"
      },
      {
        "cond": "Бросок при flag 1 — окончательно (flag → 2)",
        "who": "narration",
        "text": "* Э-э... * Всё нормально, Крис! * Я просто..."
      },
      {
        "cond": "Бросок при flag 1 — окончательно (flag → 2)",
        "who": "narration",
        "text": "* ...В следующий раз просто попонятнее напишу!"
      },
      {
        "cond": "Бросок при flag 0 — Ральзей возвращает (flag → 1)",
        "who": "narration",
        "text": "* (Вы бросаете руководство, и оно с грохотом падает на пол.)"
      },
      {
        "cond": "Бросок при flag 0 — Ральзей возвращает (flag → 1)",
        "who": "narration",
        "text": "* Вот, Крис! * Ты уж его не теряй!"
      },
      {
        "cond": "Бросок при flag 0 — Ральзей возвращает (flag → 1)",
        "who": "narration",
        "text": "* (Получено руководство.) * (Опять.)"
      },
      {
        "cond": "При flag ≥ 2 — мусорка в комнате Крис (Гл.3)",
        "who": "narration",
        "text": "* Это мусорка."
      }
    ]
  },
  "211": {
    "detail": "Гл.1. obj_smallcheckers_enemy (Step): при ударе атакой (spr_attack_cut1/spr_attack_slap1) flag[211]=3 (повержены); при пощаде flag[211]=1, а если был автопромах (automiss[0]==1) — flag[211]=2. obj_npc_puzzlemaster1 (Гл.3) при plot>=42 || flag[211]==3 ставит lecturecon=100. На что влияет: реплики после стычки с шашками и состояние мастера головоломок (obj_smallcheckers_enemy, obj_npc_puzzlemaster1).",
    "lines": [
      {
        "cond": "При пощаде шашек (флаг = 1)",
        "who": "narration",
        "text": "* И правда к лицу. * Хе-хе-хе-хе."
      },
      {
        "cond": "При пощаде шашек (флаг = 1)",
        "who": "narration",
        "text": "* (Ох... Крис, мне стоит с ней поговорить...)"
      },
      {
        "cond": "При пощаде с автопромахом (флаг = 2)",
        "who": "narration",
        "text": "* Гр-р-р, ИДИОТЫ! * Она сбежала!"
      },
      {
        "cond": "При пощаде с автопромахом (флаг = 2)",
        "who": "narration",
        "text": "* (Фух, чудом пронесло...)"
      },
      {
        "cond": "При пощаде с автопромахом (флаг = 2)",
        "who": "narration",
        "text": "* (Крис, думаю, мне стоит с ней поговорить...)"
      }
    ]
  },
  "214": {
    "detail": "Гл.1: в scr_text выбор названия ставит flag[214] (1/2/3). obj_savepoint в room_field_checkers3 подставляет название команды в текст точки сохранения по flag[214]. obj_darkcontroller (Draw) при flag[214]==1 показывает «Crudeness/Ярость» (crude_amount=101). В Гл.2 obj_checker_animtest и obj_darkcontroller тоже читают flag[214] для подстановки названия. На что влияет: имя отряда в точке сохранения (obj_savepoint), статистике (obj_darkcontroller) и репликах NPC (obj_checker_animtest).",
    "lines": [
      {
        "cond": "При 214=1 — подстановка названия «Отряд $!$?ов»",
        "who": "narration",
        "text": "Отряда $!$?ов"
      },
      {
        "cond": "При 214=2 — подстановка названия «Фан-клуб Лансера»",
        "who": "narration",
        "text": "Фан-клуба Лансера"
      },
      {
        "cond": "При 214=3 — подстановка названия «Весёлая банда»",
        "who": "narration",
        "text": "Весёлой банды"
      },
      {
        "cond": "Выбран вариант 1 ($!$?) — реакция Лансера",
        "who": "narration",
        "text": "* Ладно, ладно! Название оставим! Но я не буду его произносить."
      },
      {
        "cond": "Выбран вариант 2 (Фан-клуб Лансера) — реакция Лансера",
        "who": "narration",
        "text": "* А, во! Назовём сокращённо: ФАН-КЛУБ ЛАНСЕРА!"
      },
      {
        "cond": "Выбран вариант 2 (Фан-клуб Лансера) — реакция Лансера",
        "who": "narration",
        "text": "* Идеально!!!"
      },
      {
        "cond": "Выбран вариант 3 (Весёлая банда) — реакция Лансера",
        "who": "narration",
        "text": "* Тогда до скорого, Весёлая банда!"
      }
    ]
  },
  "215": {
    "detail": "Гл.3. obj_npc_puzzlemaster1 (Create) при flag[215]==1 уничтожается (уже ушёл); в Step после разговора con=8, flag[215]=1, instance_destroy. В Гл.2 obj_checker_animtest при подъёме plot до 60: если flag[215]==1, ставит flag[251]=1. На что влияет: присутствие мастера головоломок (obj_npc_puzzlemaster1) и установку flag[251] в obj_checker_animtest.",
    "related": [
      251
    ]
  },
  "216": {
    "detail": "На что влияет: scr_text (Гл.1/3/4) — при флаге 1 текст дыры становится «(The hole is filled to the brim with cash.)»/«(Дыра переполнена деньгами.)», а в Гл.3/4 от него зависят реплики о БИЗНЕС-ЦЕЛИ/ДЫРЕ (scr_speaker no_name). В Гл.1 obj_npc_room при x>1140 меняет спрайт головоломочного NPC на spr_npc_puzzlepiece_shaved (побритый), а obj_npc_room_Other_10 подменяет вторую строку реплики.",
    "lines": [
      {
        "cond": "Осмотр «Дыры для чаевых» (надпись)",
        "who": "narration",
        "text": "* «Дыра для чаевых»."
      },
      {
        "cond": "При flag[216] = 0 (дыра ещё не полна)",
        "who": "narration",
        "text": "* (Если вам нравятся наши обучалки, пожалуйста, бросьте чаевые в дыру.)"
      },
      {
        "cond": "При flag[216] = 1 (дыра переполнена деньгами)",
        "who": "narration",
        "text": "* (Дыра переполнена деньгами.)"
      },
      {
        "cond": "При flag[216] = 0 — реплика NPC (БИЗНЕС-ЦЕЛЬ не достигнута)",
        "who": "narration",
        "text": "* Не дошли до желаемой мы БИЗНЕС-ЦЕЛИ..."
      },
      {
        "cond": "При flag[216] = 1 — реплика NPC (на чаевые куплена шляпа, NPC побрит)",
        "who": "narration",
        "text": "* И спасибо за пожертвования, я наконец-то смог купить себе новую шляпу и крем для бритья."
      }
    ]
  },
  "217": {
    "detail": "На что влияет: obj_rurus_event_Create (комната room_cc_rurus1) — при флаге 1 событие головоломки удаляется и на его месте создаётся обычный obj_npc_room (Rouxls уже не загадывает загадку). obj_cc_event_Create при флаге 1 переводит шип spike[0] в положение image_index=1 (опущен).",
    "related": [
      218
    ]
  },
  "218": {
    "detail": "На что влияет: obj_rurus_event_Create (комната room_cc_rurus2) — при флаге 1 событие заменяется обычным obj_npc_room; obj_cc_event_Create опускает шип spike[0] (image_index=1).",
    "related": [
      217
    ]
  },
  "220": {
    "detail": "На что влияет: Гл.1 obj_thrashmachine/obj_thrashmaker_event (сборка робота); Гл.2 obj_thrashmachine и scr_monstersetup (part[1]=flag220 задаёт спрайт головы и название/описание режима-акта врага Rouxls), obj_rouxls_enemy (duckmode, если 220/221/222 все ==3); Гл.3 obj_quiz_thrashmachine (превью в викторине Тенны); Гл.4 scr_gamestart рандомит choose(0,1,2,3).",
    "related": [
      221,
      222,
      223,
      224,
      225,
      226
    ],
    "lines": [
      {
        "cond": "Сборка взбучкотрона (Гл.1): подтверждение нормальной сборки",
        "who": "narration",
        "text": "* Это ваш взбучкотрон.# Готово?"
      },
      {
        "cond": "Сборка взбучкотрона (Гл.1): подтверждение «отстойной» сборки (плохие части)",
        "who": "narration",
        "text": "* Вы сделали полную хрень.# Готово?"
      }
    ]
  },
  "221": {
    "detail": "На что влияет: Гл.1 сборка робота; Гл.2 obj_thrashmachine (part[0]=flag221 — спрайт тела), obj_rouxls_enemy (duckmode при 220/221/222==3), obj_ch2_scene21_loop; Гл.3 obj_quiz_thrashmachine; Гл.4 scr_gamestart рандомит choose(0,1,2,3).",
    "related": [
      220,
      222,
      226
    ],
    "lines": [
      {
        "cond": "Гл.1, сборка взбучкотрона: при «правильном» наборе частей",
        "who": "narration",
        "text": "* Это ваш взбучкотрон.# Готово?"
      },
      {
        "cond": "Гл.1, сборка взбучкотрона: при несуразном наборе частей («полная хрень»)",
        "who": "narration",
        "text": "* Вы сделали полную хрень.# Готово?"
      }
    ]
  },
  "222": {
    "detail": "На что влияет: Гл.1 сборка робота; Гл.2 obj_thrashmachine (part[2]=flag222 — спрайт ходовой части), obj_rouxls_enemy (duckmode при 220/221/222==3), obj_ch2_scene21_loop; Гл.3 obj_quiz_thrashmachine; Гл.4 scr_gamestart рандомит choose(0,1,2,3).",
    "related": [
      220,
      221,
      226
    ]
  },
  "223": {
    "detail": "На что влияет: Гл.2 obj_thrashmachine_Draw (dcolor — цвет головы) и obj_rocketpunch_bhero/obj_thrash_intro (headcolor = make_color_hsv(flag223*8,.)); Гл.3 obj_quiz_thrashmachine (colorflag/dcolor); Гл.1 obj_thrashmachine_Step. Гл.4 scr_gamestart рандомит floor(random(31)).",
    "related": [
      220,
      224,
      225
    ]
  },
  "224": {
    "detail": "На что влияет: Гл.2 obj_thrashmachine_Draw (dcolor[0] = make_color_hsv(flag224*8,.)); Гл.3 obj_quiz_thrashmachine; Гл.1 obj_thrashmachine_Step. Гл.4 scr_gamestart рандомит floor(random(31)).",
    "related": [
      220,
      223,
      225
    ]
  },
  "225": {
    "detail": "На что влияет: Гл.2 obj_thrashmachine_Draw (dcolor[2] = make_color_hsv(flag225*8,.)); Гл.3 obj_quiz_thrashmachine; Гл.1 obj_thrashmachine_Step. Гл.4 scr_gamestart рандомит floor(random(31)).",
    "related": [
      220,
      223,
      224
    ]
  },
  "226": {
    "detail": "На что влияет: Гл.1 obj_thrashmaker_event_Create при флаге 1 переводит куст (bush) в image_index=1 (робот уже собран); Гл.3 GlobalScript_scr_quiztext (case 6): переменная _newThrash = (flag226==0 && flag435==0) — определяет, можно ли предложить вопрос о новом взбучкотроне в викторине.",
    "related": [
      220,
      221,
      222
    ]
  },
  "233": {
    "detail": "obj_npc_room (Other_10): при global.flag[108]==1 (Рваник уже взят) и global.flag[233]==0 Ральзей произносит реплики про ШАРФ-подарок, после чего global.flag[233]=1 — повторно не показывается. На что влияет: показывается ли эта особая реплика Ральзея (зависит от флага 108).",
    "related": [
      108
    ],
    "lines": [
      {
        "cond": "Рваник уже взят (108=1) и flag[233]=0 — Ральзей дарит ШАРФ (obj_npc_room, room_forest_area2A)",
        "who": "ralsei",
        "text": "* А, тот ШАРФ!"
      },
      {
        "cond": "Рваник уже взят (108=1) и flag[233]=0 — Ральзей дарит ШАРФ (obj_npc_room, room_forest_area2A)",
        "who": "ralsei",
        "text": "* Вы взяли его даже не спросив!"
      },
      {
        "cond": "Рваник уже взят (108=1) и flag[233]=0 — Ральзей дарит ШАРФ (obj_npc_room, room_forest_area2A)",
        "who": "ralsei",
        "text": "* Всё нормально! Я дарю. * Пусть он поможет вам справиться с КОРОЛЁМ!"
      }
    ]
  },
  "234": {
    "detail": "На что влияет: obj_cloverpuzzle_event_Create при флаге 0 создаёт тёмный блок obj_soliddark (преграду); при решении блок удаляется, шип spiken[0] опускается (image_index=1), global.interact=1.",
    "related": [
      290
    ]
  },
  "237": {
    "detail": "На что влияет: obj_tempblock_room_Create при флаге >0 удаляет дерево-преграду (tree), открывая проход. Текст подсказки в obj_readable_room1 меняется при срабатывании.",
    "lines": [
      {
        "cond": "Осмотр дерева в точке x≤340 (room_forest_area5) — подсказка «чем темнее, тем виднее», не зависит от флага",
        "who": "narration",
        "text": "* (Чем темнее, тем виднее.)"
      },
      {
        "cond": "При flag[237]=0 (точка x 600–1300) — найден переключатель в дереве, флаг ставится в 1",
        "who": "narration",
        "text": "* (В темноте сложно разглядеть, но в дереве есть переключатель!..)"
      }
    ]
  },
  "240": {
    "detail": "На что влияет: obj_cc_event_Create (room_cc_1f) — при флаге 0 ставит преграду elevatorblocker перед лифтом; obj_readable_room1_Other_10 (x 500–1300) меняет описание лифта при флаге 1.",
    "lines": [
      {
        "cond": "Осмотр лифта (общая первая строка)",
        "who": "narration",
        "text": "* (Лифт на верхний этаж.)"
      },
      {
        "cond": "Осмотр лифта: лифт ещё заблокирован наверху (flag=0)",
        "who": "narration",
        "text": "* (Застрял на верхнем этаже, поэтому сначала кто-то должен его оттуда спустить.)"
      },
      {
        "cond": "Осмотр лифта: лифт разблокирован (flag=1)",
        "who": "narration",
        "text": "* (Больше не застревает на верхнем этаже.)"
      }
    ]
  },
  "241": {
    "conflicts": [
      { "self": [6], "other": 242, "otherVals": [2], "note": "если Джевил побеждён силой (241=6), в сундуке оружие (242=1), не броня" },
      { "self": [0,1,5,7], "other": 242, "otherVals": [1], "note": "если Джевил не побеждён силой, в сундуке броня (242=2), не оружие" }
    ],
    "detail": "На что влияет: Гл.1 obj_shop1 (Seam) — пункт меню «Королевство» при <6, «О ДЖЕВИЛЕ» при >=6; readable-объект msc=415 при >=5. Гл.4 scr_jevil_check (item_knife при ==6, item_tail при ==7) и scr_gamestart_chapter_override (при >=6 выдаётся Теневой кристалл — scr_get_shadow_crystal(1)). Кристалл побеждённого Джевила переносится в следующие главы.",
    "related": [
      242,
      954
    ],
    "lines": [
      {
        "cond": "Seam до боя (при <6): рассказ о рыцаре и Джевиле",
        "who": "seam",
        "text": "* Но совсем недавно объявился подозрительный рыцарь... * И три короля оказались взаперти."
      },
      {
        "cond": "Seam до боя (при <6): рассказ о рыцаре и Джевиле",
        "who": "seam",
        "text": "* Забавный был паренёк... Он был придворным шутом. А я — придворным магом."
      },
      {
        "cond": "Seam до боя (при <6): рассказ о рыцаре и Джевиле",
        "who": "seam",
        "text": "* Но я дам подсказку: идите туда, где не горят звёзды."
      },
      {
        "cond": "Seam после победы над Джевилом (при >=6)",
        "who": "seam",
        "text": "* Вы его победили?! Вы ПРАВДА победили?!"
      },
      {
        "cond": "Seam после победы над Джевилом (при >=6)",
        "who": "seam",
        "text": "* Но по сравнению с тем, что ждёт вас дальше, ДЖЕВИЛ был только началом."
      },
      {
        "cond": "Джевил в бою (его реплика при пощаде)",
        "who": "jevil",
        "text": "* НЕПРАВДА. * МНЕ В МОЕЙ СВОБОДЕ ОДИНОКО."
      }
    ]
  },
  "242": {
    "conflicts": [
      { "self": [1], "other": 241, "otherVals": [0,1,5,7], "note": "оружие в сундуке Джевила (242=1) выдаётся только при победе силой (241=6)" },
      { "self": [2], "other": 241, "otherVals": [6], "note": "броня в сундуке Джевила (242=2) выдаётся только если Джевил пощажён (241≠6)" }
    ],
    "detail": "На что влияет: obj_treasure_room_Create — при флаге 0 сундук уничтожается; при 1 готовит оружие, при 2 — броню (itemflag=112). obj_jokerbattleevent_Step выводит реплику о появлении сундука и задаёт значение.",
    "related": [
      241,
      112
    ],
    "lines": [
      {
        "cond": "После боя с Джевилом — появляется сундук-награда (flag → 1/2)",
        "who": "narration",
        "text": "* (Снаружи появился странный сундук...)"
      }
    ]
  },
  "247": {
    "detail": "На что влияет: obj_king_boss_Other_20 при флаге 0 запускает obj_kingcutscene с боевым вариантом; obj_kingcutscene_Step при флаге 1 подменяет реплики Короля (мирный диалог о капитуляции).",
    "related": [
      248
    ],
    "lines": [
      {
        "cond": "Мирная победа над Королём (флаг=1): капитуляция Короля",
        "who": "king",
        "text": "* В-вижу, вы..."
      },
      {
        "cond": "Мирная победа над Королём (флаг=1): капитуляция Короля",
        "who": "king",
        "text": "* Намного сильнее... чем я думал..."
      },
      {
        "cond": "Мирная победа над Королём (флаг=1): капитуляция Короля",
        "who": "king",
        "text": "* Я... понял, что не смогу вас одолеть."
      },
      {
        "cond": "Мирная победа над Королём (флаг=1): капитуляция Короля",
        "who": "king",
        "text": "* Я больше не в силах сражаться."
      }
    ]
  },
  "248": {
    "detail": "На что влияет: obj_event_room_Step (room_cc_prefountain) при флаге 1 запускает особую сцену; Гл.2/3 obj_npc_room_Other_10 — NPC Червонне/прочие реагируют иначе («(Вы ощущаете ауру прощения.)», упрёки за насилие в Гл.2 при plot<200).",
    "related": [
      247
    ],
    "lines": [
      {
        "cond": "Реплика червонне у фонтана (всегда)",
        "who": "narration",
        "text": "* (Похоже, червонне нравится это место.)"
      },
      {
        "cond": "При 248=0 — обычная 2-я реплика червонне",
        "who": "narration",
        "text": "* (Она надеется, что вам тоже понравится.)"
      },
      {
        "cond": "При 248=1 (жестокая концовка) — 2-я реплика заменяется «аурой прощения»",
        "who": "narration",
        "text": "* (Вы ощущаете ауру прощения...)"
      }
    ]
  },
  "249": {
    "detail": "На что влияет: obj_lancerboss3_Step и obj_susieandlancer_event_Step по значению подменяют реплики после боя (Лансер/Сьюзи/Ральзей) и спрайт Сьюзи (при флаге 0 — spr_susie_enemy_defeat).",
    "lines": [
      {
        "cond": "Реплики после боя с Лансером — вариант «вы победили» (Лансер сдаётся)",
        "who": "lancer",
        "text": "* Ладно, всё! Вы победили!"
      },
      {
        "cond": "Реплики после боя с Лансером — вариант «вы победили» (Лансер сдаётся)",
        "who": "ralsei",
        "text": "* (Крис, может, нам стоило быть помягче...)"
      },
      {
        "cond": "Реплики после боя с Лансером — вариант «вы победили» (Лансер сдаётся)",
        "who": "lancer",
        "text": "* Так и быть... Я СНОВА буду героем."
      },
      {
        "cond": "Реплики после боя с Лансером — вариант «вы победили» (Лансер сдаётся)",
        "who": "lancer",
        "text": "* Имейте в виду, ДРАТЬСЯ я не перестану."
      },
      {
        "cond": "Реплики после боя с Лансером — вариант Сьюзи «вы смухлевали» (flag[249] = 0, spr_susie_enemy_defeat)",
        "who": "susie",
        "text": "* Ну, вы нас НЕ ПОБЕДИЛИ. * Вы, э-э..."
      },
      {
        "cond": "Реплики после боя с Лансером — вариант Сьюзи «вы смухлевали» (flag[249] = 0, spr_susie_enemy_defeat)",
        "who": "susie",
        "text": "* Смухлевали. Набросились на Лансера. Со своей..."
      }
    ]
  },
  "252": {
    "detail": "Гл.1 (Мир тьмы). obj_readable_room1 ставит flag[252]=1 при осмотре всех кроватей. На что влияет: в Гл.2 титул «Bed Inspector» (obj_darkcontroller), особые реплики в Гл.2/3."
  },
  "253": {
    "detail": "На что влияет: scr_text — при флаге 1 в ресторане/кафе (room_dw_castle_cafe/restaurant) можно бесконечно получать торт (scr_itemget(7)), если его нет в инвентаре/кармане. Связано с темой дня рождения Крести.",
    "related": [
      313
    ],
    "lines": [
      {
        "cond": "При flag[253] = 1 (обмен совершён) — повторное предложение торта, если торта нет с собой",
        "who": "narration",
        "text": "* Если у тебя нет с собой торта, приди ко мне, и я его дам! В любое время!"
      },
      {
        "cond": "При обмене Круторта на Верторт (flag[253] → 1)",
        "who": "narration",
        "text": "* (Вы поменяли круторт на верторт.)"
      },
      {
        "cond": "Реплики крутящегося повара (Гл.1, кафе/ресторан замка)",
        "who": "narration",
        "text": "* А сейчас я продолжу крутиться и сокрушаться! Крутиться и сокрушаться!"
      },
      {
        "cond": "Реплики крутящегося повара (Гл.1, кафе/ресторан замка)",
        "who": "narration",
        "text": "* Сладок торт, но не характер! Какая трагедия!!"
      }
    ]
  },
  "254": {
    "detail": "Гл.1/2 (Мир света). Разговор с оригинальным Звездоходцем ставит flag[254]. На что влияет (перенос вперёд): scr_recruitchecks (flag[254]>0), obj_dw_b3bs_jail1 (createstar = scr_flag_get(254) — спавн NPC), obj_ch3_GSD02 (plot>=280 && flag>0). Парный поздний флаг — 1240 (STARWALKER_CH3).",
    "related": [
      1240
    ]
  },
  "255": {
    "detail": "Гл.1 (Мир света). obj_rudy_Step ставит flag[255]=1 (scr_text доводит до 2). На что влияет: в Гл.4 obj_npc_facing_Other_10 при flag[255]>=1 && flag[256]==0 — ветка про окно больницы.",
    "related": [
      256
    ]
  },
  "256": {
    "detail": "Гл.1 (Мир света). obj_npc_facing_Other_10 ставит flag[256]=1. На что влияет: парный с 255 — в Гл.4 определяет, показывать ли диалог про окно больницы.",
    "related": [
      255
    ]
  },
  "259": {
    "detail": "На что влияет: scr_text — по значению подставляется имя-обращение Крис (nn = «Крис»/«Гиппопотам», искажения «Krismas»/«Hyper Potato Mask») в репликах Лука; Гл.4 — варианты «Crisper!!»/«Hyper-Potato-Mouse!», «Kiss!»/«Mouse!!».",
    "related": [
      260,
      258
    ],
    "lines": [
      {
        "cond": "При flag[259] = 1 (имя «Крис»)",
        "who": "narration",
        "text": "* Крис! Вот как! * Отличное имя для друга!"
      },
      {
        "cond": "При flag[259] = 2 (имя «Гиппопотам»)",
        "who": "narration",
        "text": "* Г... Гиппо... Гипер... Гопер... * Кхм, Гиппопотам! Вот как! * Длинное имя, но оно того стоит!"
      },
      {
        "cond": "Общая концовка наречения (любое имя)",
        "who": "narration",
        "text": "* Спасибо за имя! * Я буду им дорожить, да-да!!"
      }
    ]
  },
  "260": {
    "detail": "На что влияет: scr_text — по значению задаёт реплики Лука при наречении (formы имени: Лунк/Препис/Карамель) и flag258 (выбор 3 ставит 258=3 и flag20=1, обрывая сцену %%%); Гл.4 при возвращении Лук подставляет onionname = Onion/Beauty/Asriel II.",
    "related": [
      259,
      258,
      20
    ],
    "lines": [
      {
        "cond": "Имя принято (обычная реакция Лука)",
        "who": "narration",
        "text": "* Хм-м-м-м! Прекрасно! * Понятия не имею, что оно значит, но звучит прекрасно!"
      },
      {
        "cond": "Выбрано имя «Лунк»",
        "who": "narration",
        "text": "* Погоди, как ещё раз? * Л... Лунк? Да! Прекрасно! * Лунк — так меня зовут."
      },
      {
        "cond": "Выбрано имя «Азриэль II»",
        "who": "narration",
        "text": "* Азриэль II... М-м-м... * Звучит... знакомо. * Словно... где-то было!"
      },
      {
        "cond": "Финал наречения (любой выбор)",
        "who": "narration",
        "text": "* Спасибо за имя! * Я буду им дорожить, да-да!!"
      }
    ]
  },
  "261": {
    "detail": "Гл.1 (Мир света). obj_npc_room_Other_10: при flag[261]==0 — scr_litemget(1) и flag[261]=1/2. На что влияет: повторно предмет не выдаётся (сохранённый факт получения)."
  },
  "262": {
    "detail": "На что влияет: obj_flowershop_event (магазин, выдача букета), scr_text (выбор отдать Ториэль), obj_event_room_Create (концовка Гл.1, plot>=250, дом Ториэль: 3→4); при >=4 букет оказывается выброшенным — obj_readable_room1_Other_10 (room_torhouse, x>340) меняет описание мусорного ведра на цветочный аромат (Гл.1/2/3/4).",
    "lines": [
      {
        "cond": "При flag[262]≥4 — осмотр мусорного ведра (цветочный аромат)",
        "who": "narration",
        "text": "* Это мусорное ведро. * Почему-то оно испускает приятный цветочный аромат."
      },
      {
        "cond": "При flag[262]=2 — получен букет в цветочном магазине",
        "who": "narration",
        "text": "* (Получен букет цветов.)"
      },
      {
        "cond": "При вручении букета Ториэль (flag[262]→3)",
        "who": "narration",
        "text": "* Держи. * Это маме... * Наш маленький секретик."
      },
      {
        "cond": "Ответ Ториэль при вручении букета",
        "who": "toriel",
        "text": "* ...найду им применение."
      }
    ]
  },
  "263": {
    "detail": "На что влияет: obj_overworldc_Step (использование Яйца на холодильнике); scr_text (Гл.4) выбирает текст осмотра холодильника: при 2 «(There are two Eggs.)», при 1 «(. and, for some reason, a lone egg.)», при 0 кладёт яйцо/ставит 1.",
    "lines": [
      {
        "cond": "Использование предмета Яйцо вне контекста («Какое яйцо?»)",
        "who": "narration",
        "text": "* Какое яйцо?"
      },
      {
        "cond": "Использование Яйца без эффекта",
        "who": "narration",
        "text": "* Ничего не произошло."
      },
      {
        "cond": "Осмотр холодильника: внутри два яйца (flag=2)",
        "who": "narration",
        "text": "* (Теперь в холодильнике лежат два яйца.)"
      },
      {
        "cond": "Осмотр холодильника: заглянули, внутри одно яйцо (flag=1)",
        "who": "narration",
        "text": "* (Внутри стоит лишь банка с одиноким огурчиком...)"
      },
      {
        "cond": "Осмотр холодильника: заглянули, внутри одно яйцо (flag=1)",
        "who": "narration",
        "text": "* (...И почему-то одно яйцо.)"
      }
    ]
  },
  "269": {
    "detail": "Гл.1 (Мир света). obj_alphysalley_event_Step ставит flag[269]=1. На что влияет: в Гл.2/4 obj_classscene_Step при flag[201]==1 && flag[269]==0 даёт альтернативную реплику Алфис.",
    "related": [
      201
    ]
  },
  "273": {
    "detail": "Гл.1 (Мир света). obj_town_event ставит flag[273]=2. На что влияет: в Гл.4 scr_text (obj_npc_conbini) при flag[273]==2 — особая ветка Санса (про брата)."
  },
  "274": {
    "detail": "На что влияет: scr_phonename — пункт телефона показывается как «Номер Санса» при <2 и «Не номер Санса» при >=2; scr_text по значению меняет реплики Санса (0 — не даёт дружить сразу, 1 — «я же дал номер», 2 — отказ + бесконечные гудки «Hotline for Idiot Babies»).",
    "lines": [
      {
        "cond": "При 0 (Санс сперва отказывает)",
        "who": "narration",
        "text": "* эх, прости. я не тусуюсь с тупыми соплячками."
      },
      {
        "cond": "При 1 (повторно: «я же дал номер»)",
        "who": "narration",
        "text": "* я же дал свой номер, что тебе ещё надо?"
      },
      {
        "cond": "При выдаче номера (case 373 → 274=1)",
        "who": "narration",
        "text": "* на."
      },
      {
        "cond": "При выдаче номера (case 373 → 274=1)",
        "who": "narration",
        "text": "* звони в любое время."
      },
      {
        "cond": "При выдаче номера (case 373 → 274=1)",
        "who": "narration",
        "text": "* (Получен номер Санса.)"
      }
    ]
  },
  "276": {
    "detail": "Гл.1 (Мир света). scr_text ставит flag[276]. На что влияет: в Гл.2 obj_ch2_lw_cutscenes_short_Create при flag>=2 (noelle_chalk) — вариант катсцены."
  },
  "278": {
    "detail": "Гл.1 (Мир света). obj_readable_room1 ставит flag[278]=1. На что влияет: в Гл.4 при flag[278]==1 && flag[461]==1 — особая реплика Руди (sinkcheck).",
    "related": [
      461,
      754
    ]
  },
  "290": {
    "detail": "На что влияет: obj_event_room_Create при флаге 1 опускает шип spikee[0] (image_index=1), фиксируя решённое состояние головоломки и открытый проход.",
    "related": [
      234
    ]
  },
  "300": {
    "detail": "Гл.2, Мир тьмы. scr_text (choice 0): при выборе обнять манекен — «You hugged the dummy.» / «Nothing wrong with a little extra fluffiness in your life.», ставится global.flag[300]=1. На что влияет: при flag[300]==1 Ральзей и NPC отыгрывают это в Гл.2–4 (obj_npc_facing — реакция Ральзея «.»; obj_npc_room). Запомненный добрый жест, переносится в следующие главы.",
    "lines": [
      {
        "cond": "При выборе «обнять манекен» (flag → 1)",
        "who": "narration",
        "text": "* You hugged the dummy."
      },
      {
        "cond": "При выборе «обнять манекен» (flag → 1)",
        "who": "narration",
        "text": "* Nothing wrong with a little extra fluffiness in your life."
      },
      {
        "cond": "Реакция Ральзея при flag 1",
        "who": "ralsei",
        "text": "* ..."
      }
    ]
  },
  "302": {
    "detail": "На что влияет: obj_mainchara_Create (Гл.2) при флаге 1 создаёт obj_kris_headobj (Крис несёт spr_trashball на голове); obj_npc_castle_door_Create при >=1 спавнит NPC-блоксера (spr_blockguy_pants3/4); obj_npc_room_Create (room_dw_castle_west_cliff) учитывает >=1.",
    "related": [
      432,
      642
    ]
  },
  "307": {
    "detail": "На что влияет: Гл.2 obj_ch2_city08/obj_ch2_scene20 (gavepresent при 1 или 2), obj_ch2_room_castle_susie/obj_room_castle_susie (при ==2 спавнит spr_dw_susie_plush); Гл.3/4 scr_text (case 1113) подставляет имя «о ком думает» (Susie/Noelle/Berdly).",
    "lines": [
      {
        "cond": "Сцена пленения Ноэль у Королевы (obj_ch2_city08) — при любом значении",
        "who": "noelle",
        "text": "* B... Berdly!?"
      },
      {
        "cond": "Сцена пленения Ноэль у Королевы (obj_ch2_city08) — при любом значении",
        "who": "berdly",
        "text": "* My splendorious Queen! There you are!"
      },
      {
        "cond": "Если подарок вручён НЕ Птицыну (flag[307] ≠ 4)",
        "who": "berdly",
        "text": "* Phew! I looked in every used game store for you!"
      }
    ]
  },
  "308": {
    "detail": "Гл.2 (Мир света). obj_npc_conbini ставит flag[308]=1. На что влияет: в Гл.3 obj_npc_rudy_Step при flag==1 — ветка pickletalk."
  },
  "309": {
    "detail": "На что влияет: obj_shop_ch2_spamton (ассортимент/серый фон/реплики «MANSION. BASEMENT!», изъятие предметов при 7); obj_ch2_sceneex2_mus (музыка при <8 и наличии keyitem 11); Гл.3 obj_npc_castle_cliff/obj_readable_room1 (показ блеска/дыры при <9, tempflag36).",
    "lines": [
      {
        "cond": "Реплика Спамтона в магазине (Гл.2)",
        "who": "spamton",
        "text": "* DON'T FORGET TO [Like and Subscribe] FOR MORE [Hyperlink Blocked]!"
      },
      {
        "cond": "Спамтон указывает на подвал особняка (после боя в магазине)",
        "who": "spamton",
        "text": "* MANSION... BASEMENT! * FIND IT!!"
      },
      {
        "cond": "При выходе из магазина без диска (309<8)",
        "who": "spamton",
        "text": "* YOU'RE LEAVING!? * WHAT ABOUT MY DISK!?!?"
      },
      {
        "cond": "Гл.3 — осмотр компьютера (obj_readable_room1) при 309<9",
        "who": "narration",
        "text": "* (Дельфин на рабочем столе рекламирует какой-то вирус.)"
      },
      {
        "cond": "Гл.3 — осмотр компьютера (obj_readable_room1) при 309<9",
        "who": "narration",
        "text": "* (Кто-то пытался проверить свою почту, но интернет умер.)"
      }
    ]
  },
  "313": {
    "detail": "На что влияет: scr_text — при флаге 0 (и наличии возвращённого торта, scr_itemget(7)) повар произносит полную благодарность и выдаёт Верторт, затем ставит 1; при 1 диалог сокращается.",
    "related": [
      253
    ],
    "lines": [
      {
        "cond": "При flag[313] = 0 — впервые вернули торт повару (полная благодарность, выдаётся Круторт)",
        "who": "narration",
        "text": "* Мама-миба! Вы вернули мне мой торт..."
      },
      {
        "cond": "При flag[313] = 0 — впервые вернули торт повару (полная благодарность, выдаётся Круторт)",
        "who": "narration",
        "text": "* Муа! Никогда не забуду вашу доброту!!"
      },
      {
        "cond": "При flag[313] = 0 — впервые вернули торт повару (полная благодарность, выдаётся Круторт)",
        "who": "narration",
        "text": "* Каждый день, я буду дарить вам головокружительные вкусы!"
      },
      {
        "cond": "При flag[313] = 0 — впервые вернули торт повару (полная благодарность, выдаётся Круторт)",
        "who": "narration",
        "text": "* Это сила [Рук пекаря]!"
      },
      {
        "cond": "При flag[313] = 0 — впервые вернули торт повару (полная благодарность, выдаётся Круторт)",
        "who": "narration",
        "text": "* (Вы получили круторт.)"
      }
    ]
  },
  "315": {
    "detail": "Гл.2 (Мир света). obj_room_town_shelter ставит flag[315]=1. На что влияет: в Гл.4 scr_text и obj_readable_room1 учитывают визит в приют."
  },
  "316": {
    "detail": "Гл.2 (Мир света). obj_room_town_hospital ставит flag[316]=1. На что влияет: в Гл.4 несколько объектов (церковь/Руди/readable) учитывают визит в больницу."
  },
  "317": {
    "detail": "Гл.2 (Мир света). obj_npc_police ставит flag[317]=1/2. На что влияет: в Гл.4 obj_npc_room (room_lw_police) при flag!=0 — состояние погони (dogchase)."
  },
  "325": {
    "detail": "На что влияет: obj_darkcontroller_Draw (Гл.2) — титул Ральзея: 1 «Hug Prince», 2 «Pose Prince», 3 «Rude Prince», 4 «Blank Prince (Doesn't even have a photo)»; obj_ch2_sceneex3_Step и обработка butler-NPC (при !=4 спавнит obj_npc_butler) реагируют на значение.",
    "lines": [
      {
        "cond": "obj_ch2_sceneex3 (сцена после карусели): при flag[325]=1 (обнимашки) Ральзей обнимает Крис",
        "who": "ralsei",
        "text": "* K... Kris? Are you OK? You're yelling..."
      },
      {
        "cond": "При отказе фотографироваться на карусели (obj_ch2_scene21_loop, photocon=1 → flag[325]=4)",
        "who": "ralsei",
        "text": "* That's OK, Kris! Let's keep going."
      }
    ]
  },
  "327": {
    "detail": "Гл.2 (Мир тьмы). obj_npc_cafe ставит flag[327]=1. На что влияет: в Гл.4 при flag==1 — другая флейвор-реплика кафе."
  },
  "330": {
    "detail": "На что влияет: obj_dw_cyber_tasque_battle_controller_Draw при флаге 0 постепенно наращивает alpha-подсказку (через таймер wait); obj_readable_room1 при флаге 1 выдаёт «(Nothing happened.)» вместо срабатывания.",
    "lines": [
      {
        "cond": "При первом нажатии (flag[330]: 0→1, найден скрытый переключатель)",
        "who": "narration",
        "text": "* (Click!) * (You found a hidden switch!)"
      },
      {
        "cond": "При flag[330] = 1 (повторно — «Nothing happened»)",
        "who": "narration",
        "text": "* (Nothing happened.)"
      }
    ]
  },
  "332": {
    "detail": "На что влияет: RoomCC_room_dw_cyber_battle_maze_2 при флаге 1 уничтожает соответствующий инстанс (силовое поле снято); obj_readable_room1 при 1 выдаёт «(Nothing happened.)».",
    "lines": [
      {
        "cond": "Снятие силового поля (решение)",
        "who": "narration",
        "text": "* (Sounds like a forcefield powering down... or something.)"
      },
      {
        "cond": "Повторный осмотр (флаг=1)",
        "who": "narration",
        "text": "* (Nothing happened.)"
      }
    ]
  },
  "333": {
    "detail": "На что влияет: obj_ch2_keyboardpuzzle_tile/controller (won=true при флаге 1); obj_ow_virovirokunswitch_Step (image_index=flag333); obj_controller_keyboard_puzzle_2 уничтожается/завершается при флаге 1; obj_readable_room1 (room_dw_cyber_virovirokun_fight) меняет текст.",
    "lines": [
      {
        "cond": "При решении головоломки (flag[333]=1) — силовое поле отключается",
        "who": "narration",
        "text": "* (Sounds like a forcefield powering down... or something.)"
      },
      {
        "cond": "При flag[333]=0 — ничего не происходит",
        "who": "narration",
        "text": "* (Nothing happened.)"
      }
    ]
  },
  "335": {
    "detail": "На что влияет: obj_mansion_shovelpile_Create при флаге 1 сразу показывает открытую дверь (spr_dw_mansion_door_open, scale 2) и пропускает анимацию разбора; obj_readable_room1_Create (room_dw_mansion_lightner_hallway) при флаге 1 удаляет преграду."
  },
  "339": {
    "detail": "На что влияет: obj_ch2_room_mansion_east_1f_e_Create при флаге 1 спавнит hacker_npc (если flag357==1); obj_readable_room1_Create скрывает секретный объект при флаге 1 и y<170; обработка NPC-курсора (Hacker) меняет реплики.",
    "lines": [
      {
        "cond": "Гл.2: переключатель найден, реплика Хакера (flag[339] = 1)",
        "who": "narration",
        "text": "* Psst... Hey, it's me, the Hacker. No one figured it out but it's me."
      },
      {
        "cond": "Гл.2: переключатель найден, реплика Хакера (flag[339] = 1)",
        "who": "narration",
        "text": "* Keep it on the download."
      }
    ]
  },
  "340": {
    "detail": "На что влияет: obj_ch2_room_mansion_east_1f_secret_Create при флаге 1 прячет слой TILES_Secret; obj_ch2_room_mansion_entrance_Create при weird-условии авто-открывает путь (scr_losechar/scr_getchar); obj_readable_room1 отмечает прочтение при флаге 1.",
    "related": [
      346,
      915,
      916
    ]
  },
  "342": {
    "detail": "На что влияет: scr_litemuseb (поедание/вручение, расход предмета, изменение lhp/lgold); scr_text (case 1158) при отдаче Альфис ставит 3 + scr_litemremove(10); obj_ch4_PDC03A_alphys_juice_Step проверяет scr_flag_get(342)==3 для особой сцены.",
    "lines": [
      {
        "cond": "При вручении Сьюзи (→342=2)",
        "who": "susie",
        "text": "* Нифига, Крис, откуда у тебя эти конфеты?"
      },
      {
        "cond": "При вручении Сьюзи (→342=2)",
        "who": "susie",
        "text": "* ...кто-то тебе их дал?"
      },
      {
        "cond": "При вручении Сьюзи (→342=2)",
        "who": "susie",
        "text": "* ХА-ХА-ХА!! АГА, ЩАС!!! Ты у нас воришка, небось?!"
      },
      {
        "cond": "При поедании самим Крис (→342=1)",
        "who": "narration",
        "text": "* (Вы без раздумий пожираете всю коробку конфет.)"
      },
      {
        "cond": "При поедании самим Крис (→342=1)",
        "who": "narration",
        "text": "* (Вы принимаете это месиво как часть жизни...)"
      }
    ]
  },
  "344": {
    "detail": "На что влияет: obj_ch2_room_mansion_east_2f_a_Create при флаге 1 ставит открытую дверь (spr_dw_mansion_door_open); при флаге 0 активна логика ключа и взрыва замка.",
    "related": [
      346
    ]
  },
  "346": {
    "detail": "На что влияет: obj_ch2_room_mansion_2f_shortcut_Create при флаге 0 ставит книжный шкаф-преграду (spr_dw_mansion_bookcase); obj_ch2_room_mansion_entrance_Create при weird-условии (flag915==7 && flag916==0) авто-ставит 346 и 340.",
    "related": [
      340,
      344
    ]
  },
  "349": {
    "detail": "На что влияет: obj_ch2_city_berdly_Create при флаге 1 спавнит berdly_npc со спрайтом spr_berdly_ice; Гл.4 obj_room_town_hospital_room2 (фон/преграда при scr_flag_get(349)>0), obj_readable_room1/obj_npc_room меняют осмотр шкафа/шкалы боли и реплики при заморозке.",
    "related": [
      38,
      457
    ],
    "lines": [
      {
        "cond": "Осмотр шкафа в больнице (Гл.4)",
        "who": "narration",
        "text": "* (You looked inside the cupboard.)"
      },
      {
        "cond": "Осмотр шкафа в больнице (Гл.4)",
        "who": "narration",
        "text": "* (... a very small obligatory piano is hiding inside.)"
      },
      {
        "cond": "Осмотр шкалы боли в больнице (Гл.4)",
        "who": "narration",
        "text": "* (It's a classic 1-to-10 pain scale, using ICE-E as a model.)"
      }
    ]
  },
  "353": {
    "detail": "На что влияет: Гл.2 obj_shop1_Draw (Seam забирает кристаллы, реплики «You have collected 2 Shadow Crystals», took_crystal); Гл.4 obj_shop1_Draw проверяет shadow_crystal_sneo = flag353>=1 вместе с flag954 и наличием Shadow Mantle (броня 23) для особой ветки (scr_flag_get(961)).",
    "related": [
      954,
      312
    ],
    "lines": [
      {
        "cond": "При сдаче первого Теневого кристалла Seam (flag 0 → 1)",
        "who": "seam",
        "text": "* Well, what have we here! You managed to find another Shadow Crystal..."
      },
      {
        "cond": "При сдаче второго Теневого кристалла Seam (flag 1 → 2)",
        "who": "seam",
        "text": "* You have collected 2 Shadow Crystals."
      },
      {
        "cond": "При сдаче второго Теневого кристалла Seam (flag 1 → 2)",
        "who": "seam",
        "text": "* But don't let down your guard. I feel your next opponent may be... hm."
      },
      {
        "cond": "При сдаче второго Теневого кристалла Seam (flag 1 → 2)",
        "who": "seam",
        "text": "* In reality, it may be impossible to win."
      }
    ]
  },
  "356": {
    "detail": "На что влияет: obj_ch2_scene20_Create при флаге 0 (и plot>=120) спавнит obj_pushable_lancer; Room_room_dw_mansion_dining_a при флаге 1 ставит тарелку (obj_soliddark, plate); Гл.3 obj_npc_room_Other_10 (plot>=128) при scr_flag_get(356)==1 добавляет реплику Лансера про вкусную пасту.",
    "lines": [
      {
        "cond": "Сцена ухода отряда (общая)",
        "who": "susie",
        "text": "* Hey, don't turn to stone while we're gone, OK?"
      },
      {
        "cond": "Сцена ухода отряда (общая)",
        "who": "lancer",
        "text": "* No worries, Susie! Feel! I'm still warm and fluffy."
      },
      {
        "cond": "Гл.3 — при 356=1 Лансер вспоминает вкусную пасту",
        "who": "lancer",
        "text": "* Plus, I had a delicious pasta meal last time I became stone."
      }
    ]
  },
  "357": {
    "detail": "На что влияет: при ==1 хакер-курсор появляется как NPC на 1-м и 2-м этажах особняка и на горках-аттракционе Птицына (obj_berdlycoaster_event), включает фейерверки в кибер-лабиринте (room_dw_cyber_maze_fireworks) и добавляет hacker_npc в замке Лансера в Гл.4. Вербовка хакера завязана на сбор трёх синих «галочек»: obj_npc_sign_Other_10 в room_dw_cyber_maze_fireworks считает var total_checkmarks = global.flag[367] + global.flag[407] + global.flag[420] и при сумме < 3 хакер ещё не доступен.",
    "related": [
      367,
      407,
      420
    ],
    "lines": [
      {
        "cond": "Гл.2 (obj_npc_room, spr_npc_wig_robot): хакер-NPC на вечеринке — при flag[357] = 1",
        "who": "narration",
        "text": "* This guy keeps telling everyone at the party he's a hacker."
      },
      {
        "cond": "Гл.2 (obj_npc_room, spr_npc_wig_robot): хакер-NPC на вечеринке — при flag[357] = 1",
        "who": "narration",
        "text": "* I don't know what to do with this information."
      }
    ]
  },
  "362": {
    "detail": "На что влияет: победа над Маусвилом переключает вид кухни (сыр, мыши, сватчлинги), снимает напуганную реплику сватчлингов и открывает запертую дверь на втором этаже восточного крыла (при условии flag[382]==0).",
    "related": [
      382,
      9
    ],
    "lines": [
      {
        "cond": "При flag[362]=0 — испуганный сватчлинг у входа кухни (x>540)",
        "who": "narration",
        "text": "* M-m-mouse!!"
      },
      {
        "cond": "При flag[362]=0 — испуганный сватчлинг у входа кухни (x>540)",
        "who": "narration",
        "text": "* And it's n-not wearing a wig!!"
      },
      {
        "cond": "При flag[362]=0 — другой сватчлинг, забравшийся на плиту (x>660)",
        "who": "narration",
        "text": "* The mouse can't get me up here!!"
      }
    ]
  },
  "367": {
    "detail": "На что влияет: одна из трёх синих галочек. obj_npc_sign_Other_10 в room_dw_cyber_maze_fireworks суммирует global.flag[367]+global.flag[407]+global.flag[420]; собрав все три, открываешь вербовку Хакера (флаг 357).",
    "related": [
      407,
      420,
      357
    ],
    "lines": [
      {
        "cond": "При flag[367] = 1 (галочка получена; экран застрял — «It seems to be stuck»)",
        "who": "narration",
        "text": "* (It seems to be stuck.)"
      }
    ]
  },
  "379": {
    "detail": "На что влияет: меняет акт в бою с мышиной башней (Fear → Compliment), отмечает головоломку у города мышей как решённую (забор/блоки меняют спрайт) и снимает башню-головоломку.",
    "related": [],
    "lines": [
      {
        "cond": "Акт «Страх» при flag[379]=0 (Ноэль ещё боится мышиной башни)",
        "who": "narration",
        "text": "* Noelle screamed quietly!"
      },
      {
        "cond": "Акт «Страх» при flag[379]=0 (Ноэль ещё боится мышиной башни)",
        "who": "noelle",
        "text": "Страх"
      }
    ]
  },
  "386": {
    "detail": "В obj_shop_ch2_spamton (Create) при флаге==0 он сразу ставится в 1 (вход в магазин). В obj_ch2_room_spamton_shop_exterior при флаге==1 он повышается до 2, если в отряде есть Ноэль (scr_havechar(4)); также 2 ставится в Step при завершении сцены. В obj_readable_room1 при флаге>=1 у магазина создаётся дверь obj_doorw_musfade.",
    "related": [
      309
    ]
  },
  "387": {
    "detail": "На что влияет: гейтит финальную сцену возвращения в Городок (салют по рекрутам, восстановление отряда) и появление Королевы на 2-м этаже замка в Гл.2 и Гл.3.",
    "related": [
      388,
      200
    ]
  },
  "388": {
    "detail": "На что влияет: помечает, что игрок не завербовал никого; меняет реплики Королевы и логику её появления в замке во всех последующих главах (проверка идёт вместе со scr_get_total_recruits(2)==0).",
    "related": [
      387
    ]
  },
  "393": {
    "detail": "На что влияет: забранная статуя Сьюзи исчезает из комнаты Ноэль и затем появляется как декорация в комнате Сьюзи в Городке у замка (Гл.2 и Гл.3).",
    "related": [
      394
    ],
    "lines": [
      {
        "cond": "При взятии статуи Сьюзи (flag[393]=1) — реакция Сьюзи и Ральзея",
        "who": "susie",
        "text": "* Woah, this statue rocks!"
      },
      {
        "cond": "При взятии статуи Сьюзи (flag[393]=1) — реакция Сьюзи и Ральзея",
        "who": "susie",
        "text": "* Hey, Ralsei, can we take this for my room?"
      }
    ]
  },
  "394": {
    "detail": "На что влияет: забранная подушка ICE-E пропадает из комнаты Ноэль и появляется в комнате Крис в Городке (Гл.2/3), а в Гл.4 участвует в сцене obj_ch4_PDC06B (мебель/расстановка актёров).",
    "related": [
      393
    ],
    "lines": [
      {
        "cond": "Осмотр подушки-статуи ICE-E (Гл.2, комната Ноэль)",
        "who": "narration",
        "text": "* (From the search 'is ice e real cryptid')"
      },
      {
        "cond": "Осмотр подушки-статуи ICE-E (Гл.2, комната Ноэль)",
        "who": "narration",
        "text": "* (It's a cross between ICE-E and something else...)"
      }
    ]
  },
  "407": {
    "detail": "На что влияет: одна из трёх синих галочек. Суммируется в obj_npc_sign (room_dw_cyber_maze_fireworks) вместе с 367 и 420; сбор всех трёх открывает вербовку Хакера (флаг 357).",
    "related": [
      367,
      420,
      357
    ]
  },
  "418": {
    "detail": "На что влияет: отмечает получение ботинка; меняет описание соответствующего ключевого предмета в меню (scr_keyiteminfo) и завязан на сцену с золотой статуей (plot>=75).",
    "lines": [
      {
        "cond": "При flag[418] = 0 — описание ключ-предмета (plot ≥ 75, бесплатный образец ещё не получен)",
        "who": "narration",
        "text": "* Эта золотая статуя... Может ли это быть...#...обманчивой техникой сосков?!"
      },
      {
        "cond": "При flag[418] = 1 — описание ключ-предмета (бесплатный образец получен)",
        "who": "narration",
        "text": "* Ого! Спасибо за бесплатный образец!#Мне ни кусочка больше в рот не лезет!!"
      }
    ]
  },
  "420": {
    "detail": "На что влияет: одна из трёх синих галочек; помечает решённой клавиатурную головоломку. Суммируется в obj_npc_sign (room_dw_cyber_maze_fireworks) с 367 и 407; сбор всех трёх открывает вербовку Хакера (флаг 357).",
    "related": [
      367,
      407,
      357
    ]
  },
  "421": {
    "detail": "На что влияет: предусловие странного (Weird) маршрута — холодный ответ Ноэль участвует в проверке события у Аддисона (obj_weirdEvent_addison_city_big_2) вместе с состоянием маршрута (flag[915]/flag[916]).",
    "related": [
      915,
      916
    ],
    "lines": [
      {
        "cond": "При global.choice = 1 — холодный ответ Ноэль (scr_text case 1070, flag → 1)",
        "who": "noelle",
        "text": "* (Ч-что это значит???)"
      },
      {
        "cond": "При global.choice = 1 — холодный ответ Ноэль (scr_text case 1070, flag → 1)",
        "who": "noelle",
        "text": "* (На этот вопрос нет хорошего ответа, это точно!)"
      }
    ]
  },
  "422": {
    "detail": "Гл.2 (Мир света). scr_text ставит flag[422]=1. На что влияет: в Гл.4 scr_text case 1359 при flag>0 — Меттатон узнаёт Крис."
  },
  "423": {
    "detail": "scr_text (Гл.2/3/4): при «краже» CD-бублика, если global.flag[423] < 4, то global.flag[423]++ (максимум 4). На что влияет: сколько CD-бубликов уже украдено — гейтит дальнейшую кражу (по достижении 4 больше не даёт)."
  },
  "424": {
    "detail": "Поговорил ли Крис с Луком (Onion) в Ch2 — необязательная тёплая сценка.",
    "related": [
      258
    ],
    "lines": [
      {
        "cond": "При разговоре с Луком (флаг = 1)",
        "who": "narration",
        "text": "...hey!! I missed you, y'hear!? Missed you all day!!"
      }
    ]
  },
  "425": {
    "detail": "Гл.2 (Мир света). scr_text case 1031 ставит flag[425]=1/2 по выбору. На что влияет: в Гл.4 obj_room_beach_Create при flag==1 — сцена на реке (связка с flag 771).",
    "related": [
      771
    ]
  },
  "430": {
    "detail": "Гл.2, Мир света (комната Азриэля в доме Крис). scr_text (case 1050): при выборе взять деньги — global.flag[430]=1 и global.lgold += 5 («You reluctantly \"borrowed\" 5 dollars»); если flag[430]==1 повторно — «(You have already taken enough.)». На что влияет: моральный выбор «взять деньги брата»; читается в Гл.3 и Гл.4 (реакции/диалоги). Азриэль — старший брат Крис.",
    "lines": [
      {
        "cond": "При согласии взять деньги (430:0→1)",
        "who": "narration",
        "text": "* You reluctantly \"borrowed\" 5 dollars."
      },
      {
        "cond": "При 430=1 — повторное взаимодействие",
        "who": "narration",
        "text": "* (You have already taken enough.)"
      }
    ]
  },
  "435": {
    "detail": "Гл.2 (Мир тьмы). obj_rouxls_simtown/obj_rouxls_enemy ставит flag[435]=1/2/3. На что влияет: в Гл.3 scr_quiztext (квиз Тенны obj_quiz_thrashmachine) при flag[226]==0 && flag[435]==0 — «новый Thrash».",
    "related": [
      226
    ]
  },
  "439": {
    "detail": "На что влияет: помечает, что яйцо «анти-украдено»/оставлено в кучу яиц; после этого читаемое место постоянно показывает реплику про лишние яйца.",
    "lines": [
      {
        "cond": "Осмотр прилавка с яйцами (надпись и комментарий)",
        "who": "narration",
        "text": "* НИЗКОКАЧЕСТВЕННЫЕ ЯЙЦА 1 $"
      },
      {
        "cond": "Осмотр прилавка с яйцами (надпись и комментарий)",
        "who": "narration",
        "text": "* (Слишком много ответственности для яйца.)"
      },
      {
        "cond": "При flag[439] = 1 (яйцо оставлено: яиц больше обычного)",
        "who": "narration",
        "text": "* (Похоже, здесь яиц больше, чем обычно.)"
      },
      {
        "cond": "При flag[439] = 1 (яйцо оставлено: яиц больше обычного)",
        "who": "narration",
        "text": "* (Куча яиц.)"
      },
      {
        "cond": "Реакция Сьюзи на «анти-кражу» яйца",
        "who": "susie",
        "text": "* ...Ты сейчас, э, анти-воруешь яйцо?"
      }
    ]
  },
  "446": {
    "detail": "В obj_readable_room1 в комнате room_dw_city_spamton_shop_exterior при global.flag[309]==0: если в отряде есть Ноэль (scr_havechar(4)) и flag[446]==0, при осмотре запертой двери флаг ставится в 1 и проигрываются реплики Ноэль (scr_anyface_next(\"noelle\")).",
    "related": [
      309
    ],
    "lines": [
      {
        "cond": "При flag[446]=0 с Ноэль в отряде — осмотр запертой двери у магазина Спамтона (flag[446] → 1)",
        "who": "noelle",
        "text": "* Kris...? Wh-why did you bring me here...?"
      },
      {
        "cond": "При flag[446]=0 с Ноэль в отряде — осмотр запертой двери у магазина Спамтона (flag[446] → 1)",
        "who": "noelle",
        "text": "* No one's home... no, no one's around at all."
      },
      {
        "cond": "При flag[446]=0 с Ноэль в отряде — осмотр запертой двери у магазина Спамтона (flag[446] → 1)",
        "who": "noelle",
        "text": "* It's... it's so creepy..."
      }
    ]
  },
  "451": {
    "detail": "Разговор с Сансом о его брате (Папирусе) по телефону/в баре. Открывает отсылочную реплику.",
    "related": [],
    "lines": [
      {
        "cond": "При flag[451] = 1 (разговор о Папирусе состоялся)",
        "who": "narration",
        "text": "by the way. about my brother... looks like you won't be able to meet him today."
      }
    ]
  },
  "453": {
    "detail": "На что влияет: одноразовая реплика Спамтона у запертой двери перед боем со Spamton NEO (на странном/Snowgrave-маршруте); после прослушивания флаг ставится в 1 и реплика меняется.",
    "lines": [
      {
        "cond": "У запертой двери перед Spamton NEO (flag[453] = 0)",
        "who": "spamton",
        "text": "* WOAH!!! YOU SAUCY LITTLE [Sponge] YOU!"
      },
      {
        "cond": "У запертой двери перед Spamton NEO (flag[453] = 0)",
        "who": "spamton",
        "text": "* DON'T BARGE IN WHEN A MAN IS [ch4nging Forms]!"
      },
      {
        "cond": "У запертой двери перед Spamton NEO (flag[453] = 0)",
        "who": "spamton",
        "text": "* I AM LIVING [Big]!"
      },
      {
        "cond": "У запертой двери перед Spamton NEO (flag[453] = 0)",
        "who": "spamton",
        "text": "* SOON I'LL HAVE EVERY[One] IN THIS CITY EATING RIGHT OUT OF MY [$!$!]!"
      },
      {
        "cond": "У запертой двери перед Spamton NEO (flag[453] = 0)",
        "who": "spamton",
        "text": "* HA HA HA! I SURE HOPE NO ONE SEALS THE [Fountain] AROUND NOW."
      },
      {
        "cond": "У запертой двери перед Spamton NEO (flag[453] = 0)",
        "who": "spamton",
        "text": "* HA HA HA! I SURE HOPE. I SURE HOPE."
      }
    ]
  },
  "454": {
    "detail": "На что влияет: отмечает получение брони Dealmaker (армор-ID 21) на обычном маршруте; влияет на боевую реплику Тенны в Гл.3 (наряду с 309==9 и 456).",
    "related": [
      456,
      468,
      309
    ],
    "lines": [
      {
        "cond": "Бой Тенны (Гл.3): реплика на 10-м ходу (показывается всегда)",
        "who": "tenna",
        "text": "* МАЙК... МАЙК, ТЫ ЗДЕСЬ?.. В СУВЕНИРНЫЙ МАГАЗИН БОЛЬШЕ НИКОГО НЕ ПУСКАТЬ!"
      },
      {
        "cond": "Бой Тенны (Гл.3): реплика на 11-м ходу при flag[454]=1 (или 309==9 / 456==1)",
        "who": "tenna",
        "text": "* Я НЕ СТАНУ КАК ОН! Я ГОРАЗДО ЛУЧШЕ! КЛЯНУСЬ! СКАЖИ, МАЙК!"
      }
    ]
  },
  "456": {
    "detail": "На что влияет: ключевая отметка прохождения Snowgrave; вместе с flag[309]=9 включает странный/тёмный исход. Влияет на альт-сцену в шкафу Гл.3, поведение Сьюзи в obj_swordroute_event_leavescreen, реплики Тенны (Гл.3) и боевые сообщения в Гл.4.",
    "related": [
      309,
      454
    ],
    "lines": [
      {
        "cond": "Гл.3 (бой с Тенной, obj_tenna_enemy): реплика на 10-м ходу — всегда",
        "who": "tenna",
        "text": "* МАЙК... МАЙК, ТЫ ЗДЕСЬ?.. В СУВЕНИРНЫЙ МАГАЗИН БОЛЬШЕ НИКОГО НЕ ПУСКАТЬ!"
      },
      {
        "cond": "Гл.3 (бой с Тенной, obj_tenna_enemy): реплика на 11-м ходу — только на странном/тёмном маршруте (flag[456]=1, либо 309=9 / 454=1)",
        "who": "tenna",
        "text": "* Я НЕ СТАНУ КАК ОН! Я ГОРАЗДО ЛУЧШЕ! КЛЯНУСЬ! СКАЖИ, МАЙК!"
      }
    ]
  },
  "457": {
    "detail": "На что влияет: определяет состояние Птицын в катсценах конца Гл.2 (scene27/scene28b) и фон больничной палаты в Гл.4; при достижении Гл.3+ флаг принудительно выставляется в 1 в scr_gamestart.",
    "related": [
      632,
      633,
      636,
      642
    ],
    "lines": [
      {
        "cond": "Сцена 28b (конец Гл.2): общая реплика прощания (не зависит от flag[457])",
        "who": "berdly",
        "text": "* Oh no, how is it that late already!?"
      },
      {
        "cond": "Сцена 28b (конец Гл.2): общая реплика прощания (не зависит от flag[457])",
        "who": "berdly",
        "text": "* Well, adieu, everyone. I must gather my booklongings."
      },
      {
        "cond": "Сцена 28b (конец Гл.2): общая реплика прощания (не зависит от flag[457])",
        "who": "berdly",
        "text": "* ... Good day, Kris. ... Susie."
      }
    ]
  },
  "460": {
    "detail": "На что влияет: отмечает, что из дыры достали Джевила/стекло; разблокирует диалоги Seam про Джевила в магазине (obj_shop1) — проверяется вместе с flag[241]>=6 (победа над Джевилом).",
    "related": [
      241
    ],
    "lines": [
      {
        "cond": "При извлечении из дыры (flag → 1)",
        "who": "narration",
        "text": "* (Вы протянули руку и нашли что-то, вместе со странным куском стекла...)"
      },
      {
        "cond": "В лавке Seam при flag 1 (реплики про Джевила)",
        "who": "seam",
        "text": "* So we are here now, in a new world."
      },
      {
        "cond": "В лавке Seam при flag 1 (реплики про Джевила)",
        "who": "seam",
        "text": "* And right off the heels of defeating that clown... Incredible."
      }
    ]
  },
  "461": {
    "detail": "Гл.2 (Мир света). obj_readable_room1 при chapter==2 ставит flag[461]=1. На что влияет: в Гл.4 при flag[278]==1 && flag[461]==1 — реплика Руди про раковину.",
    "related": [
      278
    ]
  },
  "462": {
    "detail": "Гл.2 (Мир тьмы, кибергород). Счётчик сбитых машин. На что влияет (перенос вперёд): obj_npc_castle_door и obj_room_castle_queen в Гл.3/4 проверяют flag[462]<3 совместно с flag[465]==1 и рекрутом 613 — состояние «потерянных зверьков»/NPC в Карточном замке.",
    "related": [
      465,
      613
    ]
  },
  "465": {
    "detail": "Гл.2 (Мир тьмы). obj_ch2_city_car_a (con==60) ставит flag[465]=1. На что влияет: в Гл.4 obj_room_castle_queen при flag>0 (с 613, 462<3) — спавн NPC у замка Королевы.",
    "related": [
      613,
      462
    ]
  },
  "468": {
    "detail": "Гл.2 (Мир тьмы). obj_ch2_sceneex2a → flag=1; obj_fountainkris_ch2_sideb при полном инвентаре → flag=2. На что влияет: в Гл.3/4 obj_treasure_room (room_dw_castle_west_cliff) при flag>0 — сундук с предметом 21.",
    "related": [
      571
    ]
  },
  "501": {
    "detail": "На что влияет: фиксирует исход стычки с Червонной для Поля (room_field2): убирает повторный энкаунтер и переключает реплику отдыхающей Червонны (манекена) в зависимости от того, как с ней обошлись.",
    "related": [
      50
    ],
    "lines": [
      {
        "cond": "Если боя с Червонной не было (флаг = 0)",
        "who": "narration",
        "text": "* (Это обычный манекен.)"
      },
      {
        "cond": "Если Червонна пощажена (флаг = 2)",
        "who": "narration",
        "text": "* В вашем замке есть бассейн? * Может, мне стоит взять с собой купальник, он очень милый..."
      }
    ]
  },
  "502": {
    "detail": "На что влияет: с каждым новым столкновением Приспешка движется медленнее и меняется тип энкаунтера (бой); в room_field_checkers5 принудительно myencounter=14. Это счётчик (растёт на 1 за столкновение), не флаг 0/1."
  },
  "520": {
    "detail": "На что влияет: счётчик побитых Бубиннов; вместе с flag[523] (добивания Сьюзи) вычисляет «обычное» насилие и корректирует счётчик жестокости (flag[40]); влияет на реплики NPC в Гл.1.",
    "related": [
      523,
      40,
      43
    ],
    "lines": [
      {
        "cond": "Реплика NPC (продал кровати) — независимо от флага",
        "who": "narration",
        "text": "* Мы продали все кровати и заменили их на сокровища."
      },
      {
        "cond": "Реплика NPC (продал кровати) — независимо от флага",
        "who": "narration",
        "text": "* Спина болит, но жизнь прекрасна как никогда!!!"
      },
      {
        "cond": "При 520=0 (Бубинны не побиты) — реакция NPC справа",
        "who": "narration",
        "text": "* А?"
      }
    ]
  },
  "521": {
    "detail": "На что влияет: счётчик побитых Червонн; совместно с flag[524] (добивания Сьюзи) определяет «обычное» насилие и корректирует счётчик жестокости (flag[40]); меняет реплики NPC-Червонны в Гл.1.",
    "related": [
      524,
      40,
      244
    ],
    "lines": [
      {
        "cond": "При flag[521] = 0 (червонн не били) — мирная реплика Червонны",
        "who": "narration",
        "text": "* (Похоже, червонна продала все драгоценности и заменила их на кровати.)"
      },
      {
        "cond": "При flag[521] = 0 (червонн не били) — мирная реплика Червонны",
        "who": "narration",
        "text": "* (Выглядит максимально выспанной.)"
      },
      {
        "cond": "После искупления грехов перед Червонной (прощение)",
        "who": "narration",
        "text": "* (Червонна ласково на вас посмотрела. Вы искупили все грехи перед червонной.)"
      },
      {
        "cond": "При flag[521] > 0 (червонны побиты) — обиженная реплика Червонны",
        "who": "narration",
        "text": "* (Червонна взглянула на вас...)"
      },
      {
        "cond": "При flag[521] > 0 (червонны побиты) — обиженная реплика Червонны",
        "who": "narration",
        "text": "* Простите, что поранили вас..."
      }
    ]
  },
  "522": {
    "detail": "На что влияет: помечает насилие над Крестей; во всех главах меняет её реплики при чтении NPC с нейтральных/приглашающих на обиженные.",
    "lines": [
      {
        "cond": "Крестя не побита (flag[522]=0) — обычная зазывающая реплика Кресте (obj_npc_room, room_cc_clover)",
        "who": "narration",
        "text": "* Хотите сдать верхнюю одежду? * ХА! Мы смоем её в УНИТАЗ! * ...Которого у нас нет."
      },
      {
        "cond": "Крестя побита (flag[522]=1) — обиженная реплика Кресте (obj_npc_room, room_cc_clover)",
        "who": "narration",
        "text": "* Вас кто-то пригласил? * ВОТ ИМЕННО — НИКТО!!! * Вы нас покалечили..."
      },
      {
        "cond": "Крестя побита (flag[522]=1) — обиженная реплика Кресте (obj_npc_room, room_cc_clover)",
        "who": "narration",
        "text": "* Да, неловко... * Что, ЕЩЁ хотите?! * Вам лучше уйти..."
      }
    ]
  },
  "523": {
    "detail": "На что влияет: счётчик ударов Сьюзи по Бубиннам; используется в сцене прощения (вычитает из счётчика жестокости flag[43]) и при расчёте «обычного» насилия (flag[520]-flag[523]).",
    "related": [
      520,
      43,
      40
    ],
    "lines": [
      {
        "cond": "Сцена прощения бубинна (scr_text case 426, выбор «Извиниться» / choice 0): вычитает flag[523]",
        "who": "narration",
        "text": "* Обещаем, этого не повторится!"
      },
      {
        "cond": "Сцена прощения бубинна (scr_text case 426, выбор «Извиниться» / choice 0): вычитает flag[523]",
        "who": "narration",
        "text": "* А?.. Ну раз вы извиняетесь, я вас прощаю..."
      },
      {
        "cond": "Сцена прощения бубинна (scr_text case 426, выбор «Извиниться» / choice 0): вычитает flag[523]",
        "who": "narration",
        "text": "* (Вы искупили свою вину перед бубинном!)"
      }
    ]
  },
  "524": {
    "detail": "На что влияет: счётчик ударов Сьюзи по Червоннам; используется в сцене прощения Червонны (вычитает из счётчика жестокости flag[43]) и при расчёте «обычного» насилия (flag[521]-flag[524]).",
    "related": [
      521,
      43,
      40
    ],
    "lines": [
      {
        "cond": "Сцена прощения Червонны (Гл.1, flag[521]>0): добивания Сьюзи учтены",
        "who": "narration",
        "text": "* Честно, мы больше так не будем!"
      },
      {
        "cond": "Сцена прощения Червонны (Гл.1, flag[521]>0): добивания Сьюзи учтены",
        "who": "narration",
        "text": "* (Червонна чувствует искренность. Она простила ваши грехи...)"
      },
      {
        "cond": "Сцена прощения Червонны (Гл.1, flag[521]>0): добивания Сьюзи учтены",
        "who": "narration",
        "text": "* (Как гора с плеч.)"
      }
    ]
  },
  "526": {
    "detail": "На что влияет: счётчик стадий боксёрского поединка с Tasque — чем выше, тем строже порог урона за ход (сложнее) и тем дальше продвинут экран Королевы. Растёт по +1 за раунд до 10.",
    "related": [
      539
    ]
  },
  "528": {
    "detail": "На что влияет: отмечает повторную встречу со Smorgasbord и управляет спавном врага в комнате queenscreen лабиринта.",
    "related": [
      527
    ]
  },
  "529": {
    "detail": "На что влияет: запоминает, как закончился первый бой с Птицыном; вместе с исходами второго боя с Птицыном (550) и боя с Королевой (548) решает, играется ли особая (ненасильственная) сцена поражения Королевы.",
    "related": [
      548,
      550,
      54
    ]
  },
  "531": {
    "detail": "На что влияет: обучающий бой с Виро; завершённый (==6) при flag[915]==0 запускает первую ступень странного/жестокого маршрута (flag[915]=1).",
    "related": [
      915,
      438
    ]
  },
  "532": {
    "detail": "На что влияет: одна из «жёлтых» стычек жестокого маршрута; вместе с 564/565/533 (все ==6) продвигает странный маршрут с этапа 1.75 до 2.",
    "related": [
      533,
      564,
      565,
      915,
      916
    ]
  },
  "533": {
    "detail": "На что влияет: одна из стычек жестокого маршрута; вместе с 532/564/565 (все ==6) продвигает странный маршрут с этапа 1.75 до 2.",
    "related": [
      532,
      564,
      565,
      915,
      916
    ]
  },
  "539": {
    "detail": "На что влияет: запоминает исход боя с Tasque в лабиринте; при пощаде/усмирении (2/3) в комнате появляются преследователи, экраны Королевы переключаются на «застрявший» вид.",
    "related": [
      526
    ]
  },
  "540": {
    "detail": "На что влияет: помечает первую стычку с дворецкими; при ==6 в комнате с горшком появляется враг-преследователь.",
    "related": [
      541
    ]
  },
  "541": {
    "detail": "На что влияет: отмечает стычку с группой дворецких; при ненулевом значении выставляет flag[385]=1 (связанное состояние особняка) и влияет на настройку энкаунтера сватчлингов (flag[426]).",
    "related": [
      385,
      426,
      540
    ]
  },
  "542": {
    "detail": "На что влияет: отмечает бой с Менеджером задач; влияет на спавн врага при повторном посещении галереи и на логику странного маршрута (obj_weirdroute_manipulator).",
    "related": [
      54,
      9
    ]
  },
  "548": {
    "detail": "На что влияет: запоминает исход боя с Королевой; если этот бой и оба боя с Птицыном (529 и 550) завершены пощадой/усмирением (2 или 3), играется особая (ненасильственная) сцена поражения Королевы.",
    "related": [
      529,
      550,
      54,
      9
    ]
  },
  "550": {
    "detail": "На что влияет: запоминает исход второго боя с Птицыном; вместе с исходами 529 и 548 решает, играется ли особая сцена поражения Королевы.",
    "related": [
      529,
      548,
      54,
      9
    ]
  },
  "559": {
    "detail": "На что влияет: одна из стычек свалки жестокого маршрута; вместе с 560 и 561 (все ==6) продвигает странный маршрут с этапа 1 до 1.5.",
    "related": [
      560,
      561,
      915,
      916
    ]
  },
  "560": {
    "detail": "На что влияет: одна из стычек свалки жестокого маршрута; вместе с 559 и 561 (все ==6) продвигает странный маршрут с этапа 1 до 1.5.",
    "related": [
      559,
      561,
      915,
      916
    ]
  },
  "561": {
    "detail": "На что влияет: одна из стычек свалки жестокого маршрута; вместе с 559 и 560 (все ==6) продвигает странный маршрут с этапа 1 до 1.5.",
    "related": [
      559,
      560,
      915,
      916
    ]
  },
  "562": {
    "detail": "На что влияет: одна из дорожных стычек жестокого маршрута; вместе с 563 (оба ==6) продвигает странный маршрут с этапа 1.5 до 1.75.",
    "related": [
      563,
      915,
      916
    ]
  },
  "563": {
    "detail": "На что влияет: одна из дорожных стычек жестокого маршрута; вместе с 562 (оба ==6) продвигает странный маршрут с этапа 1.5 до 1.75.",
    "related": [
      562,
      915,
      916
    ]
  },
  "564": {
    "detail": "На что влияет: obj_chaseenemy задаёт этой стычке encounterflag=564 (pacetype 17) в комнате room_dw_city_big_1. Значение читает obj_weirdroute_manipulator (Step): при global.flag[915]==1.75 и global.flag[916]==0 он проверяет global.flag[564]==6 && global.flag[565]==6 && global.flag[532]==6 && global.flag[533]==6 — то есть все четыре дорожные стычки должны быть «пройдены» (==6). Только тогда играет snd_ominous и счётчик маршрута продвигается: global.flag[915]=2. Значение 6 ставится самим прохождением стычки.",
    "related": [
      565,
      532,
      533,
      915,
      916
    ]
  },
  "565": {
    "detail": "На что влияет: obj_chaseenemy задаёт этой стычке encounterflag=565 (eraser=2, moveradius). Значение читает obj_weirdroute_manipulator (Step): при global.flag[915]==1.75 и global.flag[916]==0 проверяется global.flag[564]==6 && global.flag[565]==6 && global.flag[532]==6 && global.flag[533]==6; при совпадении всех четырёх — snd_ominous и global.flag[915]=2 (продвижение Странного маршрута). 6 ставится прохождением стычки.",
    "related": [
      564,
      532,
      533,
      915,
      916
    ]
  },
  "571": {
    "detail": "На что влияет: НАГРАДА за Спамтона НЕО — 1 (насилие) → оружие «PuppetScarf», 2 (пощада) → броня «Dealmaker» (obj_ch2_sceneex2a_Step: scr_weaponget(21) / scr_armorget(21)+flag[454]). Значение = flag[50] на конце боя (1=насилие, 2=пощада) через flag[54]. scr_save кодирует в uraboss; obj_treasure_room выдаёт сундук с предметом 21 (тип по flag[571]/flag[468]). ShadowCrystal переносится дальше.",
    "related": [
      468,
      142
    ],
    "lines": [
      {
        "cond": "При завершении боя со Спамтоном НЕО — выдан ShadowCrystal",
        "who": "narration",
        "text": "* (You got ShadowCrystal.)"
      }
    ]
  },
  "580": {
    "detail": "На что влияет: encounterflag=580 присваивается стычке с Zapper (obj_chaseenemy_zapper Create; RoomCC_room_board_1_3 и obj_board_deathevent спавнят obj_chaseenemy_board_spawner с encounterno=110, encounterflag=580). Значение читает GlobalScript_scr_ch3_violencecheck: если global.flag[580]==1 — счётчик насилия __violence увеличивается. Так игра отслеживает, прошёл ли игрок эту стычку с насилием.",
    "related": [
      581,
      582,
      583,
      584
    ]
  },
  "581": {
    "detail": "На что влияет: в obj_chaseenemy_zapper (Create) при room == room_dw_b3bs_zapper_a задаётся encounterflag=581; obj_b1push2 спавнит obj_chaseenemy_board_spawner с encounterno=132, encounterflag=581. Значение читает GlobalScript_scr_ch3_violencecheck: global.flag[581]==1 → __violence++ (стычка засчитывается как акт насилия).",
    "related": [
      580,
      582,
      583,
      584
    ]
  },
  "582": {
    "detail": "На что влияет: в obj_chaseenemy_zapper (Create) при room == room_dw_b3bs_zapper_b задаётся encounterflag=582; RoomCC_room_board_2_6 задаёт encounterno=122, extflag \"b2enemy1\", tennareq=true, encounterflag=582. Значение читает GlobalScript_scr_ch3_violencecheck: global.flag[582]==1 → __violence++.",
    "related": [
      580,
      581,
      583,
      584
    ]
  },
  "583": {
    "detail": "На что влияет: в obj_chaseenemy_zapper (Create) при room == room_dw_b3bs_zapper_c задаётся encounterflag=583; RoomCC_room_board_2_5 задаёт encounterno=123, tennareq=false, encounterflag=583. Значение читает GlobalScript_scr_ch3_violencecheck: global.flag[583]==1 → __violence++.",
    "related": [
      580,
      581,
      582,
      584
    ]
  },
  "584": {
    "detail": "На что влияет: в obj_b2bossencounterroom (Step) создаётся obj_gameshow_battlemanager с encounterno=111 и encounterflag=584 (рядом сбрасывается global.flag[9]=0, global.interact=1). Значение читает GlobalScript_scr_ch3_violencecheck: global.flag[584]==1 → __violence++ (стычка засчитывается как акт насилия).",
    "related": [
      580,
      581,
      582,
      583,
      586
    ]
  },
  "586": {
    "detail": "На что влияет: encounterflag=586 присвоен стычке в obj_dw_teevie_shuttahmaze; объекты obj_b3bs_ribbick_trash (encounterno=126) и obj_b3bs_rabbick_a (encounterno=125) проверяют global.flag[encounterflag] и при значении ≠ 0 уничтожаются/превращаются в маркер (scr_dark_marker), отмечая, что стычка уже была. Значение читает GlobalScript_scr_ch3_violencecheck: global.flag[586]==1 → __violence++.",
    "related": [
      584,
      587,
      591
    ]
  },
  "587": {
    "detail": "На что влияет: в obj_room_ranking_c (Step) запускается бой — encounterno=139, encounterflag=587, global.flag[54]=encounterflag, затем scr_battle(encounterno, 0, watercooler). Значение читает GlobalScript_scr_ch3_violencecheck: global.flag[587]==1 → __violence++ (первая стычка с Кулером засчитана как насилие).",
    "related": [
      588,
      592
    ]
  },
  "588": {
    "detail": "На что влияет: в obj_npc_room (Other_10) при реплике безымянного NPC «* The hell'd you recruit our cooler for.» проверяется global.flag[588]: если ==1, переменная violenceused=1 (NPC реагирует на то, что кулер был добыт насилием). Значение также читает GlobalScript_scr_ch3_violencecheck: global.flag[588]==1 → __violence++.",
    "related": [
      587,
      592
    ],
    "lines": [
      {
        "cond": "Гл.3: попытка вербовки Кулера — реплика NPC",
        "who": "narration",
        "text": "* The hell'd you recruit our cooler for..."
      }
    ]
  },
  "589": {
    "detail": "На что влияет: в obj_room_green_room (Step) запускается стычка — encounterno=138, encounterflag=589, global.flag[54]=encounterflag; obj_dw_b3bs_rabbick_b также использует encounterflag=589 (encounterno=126), global.flag[54]=encounterflag → scr_battle. Значение читает GlobalScript_scr_ch3_violencecheck: global.flag[589]==1 → __violence++.",
    "related": [
      580,
      590,
      591
    ]
  },
  "590": {
    "detail": "На что влияет: единственная прямая ссылка — GlobalScript_scr_ch3_violencecheck: global.flag[590]==1 → __violence++ (первая стычка с Прихвостнем засчитывается как акт насилия в общем счётчике насилия Гл.3). Само значение ставится прохождением соответствующей стычки.",
    "related": [
      589,
      591
    ]
  },
  "591": {
    "detail": "На что влияет: в obj_dw_teevie_ribbicks_a (Create) encounterflag=591; myencounter=125, но если global.flag[591]!=0 → myencounter=131; при global.flag[591]==1 трэш удаляется и con=9999 (стычки больше нет). В obj_b3bs_cooltrashy: при global.flag[591]>1 (или 593>1) makeribbick=true, а при ==1 (или 593==1) makeribbick=false — то есть значение >1 повторно создаёт Прыглика. GlobalScript_scr_ch3_violencecheck: global.flag[591]==1 → __violence++.",
    "related": [
      593,
      586,
      589
    ]
  },
  "592": {
    "detail": "На что влияет: encounterflag=592 присвоен ряду объектов второй стычки с Кулером — obj_dw_teevie_susiezilla_ropeenemy (при global.flag[encounterflag]==1 instance_destroy), obj_dw_teevie_watercooler (encounterflag=592, рядом логика global.flag[1143]), obj_b3bs_zapper_b. Значение читает GlobalScript_scr_ch3_violencecheck: global.flag[592]==1 → __violence++.",
    "related": [
      587,
      588,
      593,
      1143
    ]
  },
  "593": {
    "detail": "На что влияет: в obj_dw_teevie_ribbicks_b (Create) encounterflag=593; при global.flag[encounterflag]==1 трэш удаляется и con=9999. В obj_b3bs_cooltrashy: global.flag[593]>1 (или 591>1) → makeribbick=true, а ==1 (или 591==1) → makeribbick=false. GlobalScript_scr_ch3_violencecheck: global.flag[593]==1 → __violence++.",
    "related": [
      591,
      592,
      586
    ]
  },
  "602": {
    "detail": "На что влияет: это слот сохранённого прогресса вербовки персонажа/врага Лансер (Lancer). Прямой литерал global.flag[602] в коде не встречается — доступ к статусу вербовки идёт косвенно через систему вербовки (GlobalScript_scr_recruitchecks, сверяющий имя рекрута, и спавны NPC в мирах тьмы/замке). : доли «сколько из N», −1 = потерян.",
    "related": [
      612,
      618,
      619
    ]
  },
  "604": {
    "detail": "На что влияет: слот сохранённого прогресса вербовки Ральзея (обучающая запись). Прямой литерал global.flag[604] в коде не встречается — статус читается косвенно через GlobalScript_scr_recruitchecks (по имени рекрута) и используется для появления NPC."
  },
  "605": {
    "detail": "На что влияет: статус вербовки врага Бубинн (Rudinn). GlobalScript_scr_gamestart (и scr_gamestart_chapter_override в Гл.2) автоматически ставит global.flag[605]=1 при global.chapter>=2 (прогресс переносится вперёд). GlobalScript_scr_recruitchecks по подстроке \"rud\": если global.flag[605]==1 — _recruited=true; ==-1 — _lost=true. В Гл.4 obj_castle_tutorial при scr_flag_get(605)==1 спавнит NPC бубинна (spr_diamond_fan). obj_encounter_incenseturtle использует encounterflag=605 (encounterno 151).",
    "related": [
      606,
      611,
      622
    ]
  },
  "606": {
    "detail": "На что влияет: статус вербовки врага Червонна (Hathy). GlobalScript_scr_gamestart (и scr_gamestart_chapter_override в Гл.2) автоматически ставит global.flag[606]=1 при global.chapter>=2. GlobalScript_scr_recruitchecks по подстроке \"hat\": global.flag[606]==1 → _recruited=true; ==-1 → _lost=true. Используется для появления NPC Червонны.",
    "related": [
      605,
      623
    ]
  },
  "607": {
    "detail": "На что влияет: слот сохранённого прогресса вербовки врага Крестя (Clover). Прямой литерал global.flag[607] в коде не встречается — статус читается косвенно через GlobalScript_scr_recruitchecks (по имени рекрута) и используется для спавна NPC.",
    "related": [
      616
    ]
  },
  "609": {
    "detail": "На что влияет: слот сохранённого прогресса вербовки группы «C ROUND». Прямой литерал global.flag[609] в коде не встречается — доступ косвенный через систему вербовки (GlobalScript_scr_recruitchecks) и спавны NPC.",
    "related": [
      610,
      621
    ]
  },
  "610": {
    "detail": "На что влияет: слот сохранённого прогресса вербовки группы «K ROUND». Прямой литерал global.flag[610] в коде не встречается — доступ косвенный через GlobalScript_scr_recruitchecks и спавны NPC.",
    "related": [
      609,
      621
    ]
  },
  "611": {
    "detail": "На что влияет: статус вербовки врага Приспешка (Ponman). GlobalScript_scr_gamestart (и scr_gamestart_chapter_override в Гл.2) автоматически ставит global.flag[611]=1 при global.chapter>=2. GlobalScript_scr_recruitchecks по подстроке \"pon\": global.flag[611]==1 → _recruited=true; ==-1 → _lost=true. В Гл.4 obj_room_castle_lancer при global.flag[611]==1 спавнит ponman_npc (obj_npc_room_animated).",
    "related": [
      605,
      613,
      614
    ]
  },
  "612": {
    "detail": "На что влияет: второй слот сохранённого прогресса вербовки Лансера (Lancer). Прямой литерал global.flag[612] в коде не встречается — статус читается косвенно через GlobalScript_scr_recruitchecks и используется для спавна NPC.",
    "related": [
      602,
      618,
      619
    ]
  },
  "613": {
    "detail": "На что влияет: статус вербовки врага Пылик (Rabbick). GlobalScript_scr_gamestart (и scr_gamestart_chapter_override в Гл.2) автоматически ставит global.flag[613]=1 при global.chapter>=2. GlobalScript_scr_recruitchecks по подстроке \"rab\": global.flag[613]==1 → _recruited=true; ==-1 → _lost=true. В Гл.3 obj_room_changing_room при scr_flag_get(613)>0 спавнит rabbick_npc (спрайт меняется по shadow_mantle_defeat). В Гл.4 obj_room_castle_queen при scr_flag_get(613)>0 && scr_flag_get(462)<3 && scr_flag_get(465)>0 создаёт car_rabbick.",
    "related": [
      611,
      614,
      462,
      465
    ]
  },
  "614": {
    "detail": "На что влияет: статус вербовки врага Блоксёр (Bloxer). GlobalScript_scr_gamestart (и scr_gamestart_chapter_override в Гл.2) автоматически ставит global.flag[614]=1 при global.chapter>=2. GlobalScript_scr_recruitchecks по подстроке \"blo\": global.flag[614]==1 → _recruited=true; ==-1 → _lost=true. Используется для появления NPC Блоксёра.",
    "related": [
      613,
      615
    ]
  },
  "615": {
    "detail": "На что влияет: статус вербовки врага Боязл (Jigsawry). GlobalScript_scr_gamestart (и scr_gamestart_chapter_override в Гл.2) автоматически ставит global.flag[615]=1 при global.chapter>=2. GlobalScript_scr_recruitchecks при arg0==\"jigsawry\": global.flag[615]==1 → _recruited=true; ==-1 → _lost=true. Используется для появления NPC.",
    "related": [
      614,
      622
    ]
  },
  "616": {
    "detail": "На что влияет: второй слот сохранённого прогресса вербовки врага Крестя (Clover). Прямой литерал global.flag[616] в коде не встречается — статус читается косвенно через GlobalScript_scr_recruitchecks и используется для спавна NPC.",
    "related": [
      607
    ]
  },
  "617": {
    "detail": "На что влияет: слот сохранённого прогресса вербовки «DOOMTANK». Прямой литерал global.flag[617] в коде не встречается — доступ косвенный через GlobalScript_scr_recruitchecks и спавны NPC."
  },
  "618": {
    "detail": "На что влияет: третий слот сохранённого прогресса вербовки Лансера (Lancer). Прямой литерал global.flag[618] в коде не встречается — статус читается косвенно через GlobalScript_scr_recruitchecks и используется для спавна NPC.",
    "related": [
      602,
      612,
      619
    ]
  },
  "619": {
    "detail": "На что влияет: слот сохранённого прогресса вербовки Сьюзи (совместно с Лансером). Прямой литерал global.flag[619] в коде не встречается — статус читается косвенно через GlobalScript_scr_recruitchecks и используется для спавна NPC.",
    "related": [
      602,
      612,
      618
    ]
  },
  "620": {
    "detail": "На что влияет: слот сохранённого прогресса вербовки тайного босса ДЖЕВИЛ (Jevil). Прямой литерал global.flag[620] в коде не встречается — статус читается косвенно через GlobalScript_scr_recruitchecks (по имени рекрута) и используется для появления NPC."
  },
  "621": {
    "detail": "На что влияет: второй слот сохранённого прогресса вербовки группы «K ROUND». Прямой литерал global.flag[621] в коде не встречается — доступ косвенный через GlobalScript_scr_recruitchecks и спавны NPC.",
    "related": [
      610,
      609
    ]
  },
  "622": {
    "detail": "На что влияет: статус вербовки врага Боевой бубинн (Rudinn Ranger). GlobalScript_scr_gamestart (и scr_gamestart_chapter_override в Гл.2) автоматически ставит global.flag[622]=1 при global.chapter>=2. GlobalScript_scr_recruitchecks по подстроке \"ran\" (или arg0==\"rudinn ranger\"/\"rudinnranger\"): global.flag[622]==1 → _recruited=true; ==-1 → _lost=true. Используется для появления NPC.",
    "related": [
      605,
      623
    ]
  },
  "623": {
    "detail": "На что влияет: статус вербовки врага Чёрствая червонна (Head Hathy). GlobalScript_scr_gamestart (и scr_gamestart_chapter_override в Гл.2) автоматически ставит global.flag[623]=1 при global.chapter>=2. GlobalScript_scr_recruitchecks по подстроке \"hea\": global.flag[623]==1 → _recruited=true; ==-1 → _lost=true. В Гл.4 obj_room_castle_queen: computer_look = scr_flag_get(640)>0 && scr_flag_get(623)>0 → спавнит werewerewire_npc (spr_npc_werewerewire_look).",
    "related": [
      606,
      622,
      640
    ]
  },
  "625": {
    "detail": "На что влияет: слот сохранённого прогресса вербовки босса Король (King). Прямой литерал global.flag[625] в коде не встречается — статус читается косвенно через GlobalScript_scr_recruitchecks (по имени рекрута) и используется для появления NPC."
  },
  "630": {
    "detail": "На что влияет: статус вербовки врага Колекарь (Ambyu-Lance). GlobalScript_scr_recruitchecks по подстроке \"amb\": global.flag[630]==1 → _recruited=true; ==-1 → _lost=true. Входит в проверку полной вербовки Гл.2 obj_fusionmenu (flag[630]==1 && 631==1 &&. && 644==1 → ch2_allrecruited=1) и в счётчик total_recruits (630.636) в obj_ch2_scene23a. В obj_gigaqueen_enemy при global.flag[630]==1 hprecruit+=5 (завербованные усиливают босса).",
    "related": [
      631,
      632,
      633,
      634
    ]
  },
  "631": {
    "detail": "На что влияет: статус вербовки врага Всплывачка (Poppup). obj_npc_castle_door (ch2/ch3/ch4) при global.flag[631]==1 спавнит poppup (obj_readable_room1, spr_npc_poppup). В Гл.4 obj_room_castle_lancer при global.flag[631]==1 создаёт poppup_npc (scr_dark_marker, spr_npc_poppup_idle_overworld). GlobalScript_scr_recruitchecks по \"pop\": ==1 _recruited, ==-1 _lost. Входит в ch2_allrecruited (obj_fusionmenu), счётчик total_recruits (obj_ch2_scene23a) и усиление obj_gigaqueen_enemy (hprecruit+=5).",
    "related": [
      630,
      632,
      633,
      634
    ]
  },
  "632": {
    "detail": "На что влияет: статус вербовки врага Задатьща (Tasque). GlobalScript_scr_gamestart при global.chapter>=3 ставит global.flag[632]=1. obj_npc_castle_door при global.flag[642]!=1 && global.flag[632]==1 спавнит tasque (spr_tasque_idle_overworld); в Гл.4 obj_room_castle_lancer при global.flag[632]==1 создаёт tasque_npc. GlobalScript_scr_recruitchecks по \"tas\": ==1 _recruited, ==-1 _lost. В Гл.4 GlobalScript_scr_text: при global.flag[642]==1 && global.flag[632]==1 && global.flag[654]==1 (cat_cafe) идут реплики кошачьего кафе. Входит в ch2_allrecruited (obj_fusionmenu) и усиление obj_gigaqueen_enemy.",
    "related": [
      630,
      642,
      654
    ],
    "lines": [
      {
        "cond": "Приветствие официанта в ресторане/кафе (Гл.4, NPC no_name)",
        "who": "narration",
        "text": "* Good day, boss."
      },
      {
        "cond": "Рекомендация официанта (выбор «Рекомендация»), если в отряде случайно выбран Крис",
        "who": "narration",
        "text": "* Для юного человека мы рекомендуем шоколадно-черничный латте..."
      }
    ]
  },
  "633": {
    "detail": "На что влияет: статус вербовки врага Переменник (Werewire). GlobalScript_scr_gamestart при global.chapter>=3 ставит global.flag[633]=1. GlobalScript_scr_recruitchecks по \"wer\": ==1 _recruited, ==-1 _lost. В Гл.2 obj_npc_room при global.flag[633]==1 меняет спрайт NPC (spr_npc_werewire / spr_npc_plugboy_static_outline). Входит в ch2_allrecruited (obj_fusionmenu), счётчик total_recruits (obj_ch2_scene23a) и усиление obj_gigaqueen_enemy.",
    "related": [
      630,
      632,
      634
    ]
  },
  "634": {
    "detail": "На что влияет: статус вербовки врага Мышь (Maus). obj_npc_castle_door (ch2/ch3/ch4) при global.flag[634]==1 спавнит maus (obj_readable_room1, spr_maus_idle); в Гл.4 obj_room_castle_lancer при global.flag[634]==1 создаёт maus_npc (scr_dark_marker, spr_npc_maus_idle_overworld). GlobalScript_scr_recruitchecks по \"mau\": ==1 _recruited, ==-1 _lost. Входит в ch2_allrecruited (obj_fusionmenu), счётчик total_recruits (obj_ch2_scene23a) и усиление obj_gigaqueen_enemy (hprecruit+=5).",
    "related": [
      630,
      631,
      632,
      633
    ]
  },
  "635": {
    "detail": "Флаг хранит исход вербовки Вировирокуна. «На что влияет: при ==1 учитывается в общем зачёте рекрутов obj_fusionmenu (Гл.2), даёт ГИГА-Королеве +5 HP (obj_gigaqueen_enemy), увеличивает total_recruits в obj_ch2_scene23a и включает NPC в obj_npc_room (зона x310-330,y910-930); в Гл.3/4 scr_recruitchecks по «vir» отмечает рекрута как завербованного (==1) или потерянного (==-1).»",
    "related": [
      630,
      631,
      632,
      633,
      634,
      636,
      640,
      642,
      644
    ],
    "lines": [
      {
        "cond": "При flag[635] = 1 — Вировирокун завербован (реплика NPC, obj_npc_room зона x310-330,y910-930)",
        "who": "narration",
        "text": "* Ха-ха! Так и есть! Они так долго планировали свой ход..."
      },
      {
        "cond": "При flag[635] = 1 — Вировирокун завербован (реплика NPC, obj_npc_room зона x310-330,y910-930)",
        "who": "narration",
        "text": "* Что?! Рогатая девчонка? Ни разу её не видел!"
      }
    ]
  },
  "636": {
    "detail": "Флаг хранит исход вербовки Спектрецкого. «На что влияет: при ==1 учитывается в зачёте рекрутов (obj_fusionmenu, Гл.2), даёт ГИГА-Королеве +5 HP, добавляет swatchling в кафе (obj_npc_castle_cafe) и в Гл.4 спавнит swatchling-NPC (obj_room_castle_lancer x656,y26; obj_castle_tutorial spr_npc_swatchling_fan), а связка 636+656+657 включает сцену в obj_room_castle_town; в scr_text реплика «Good evening, boss…» при ==1.»",
    "related": [
      632,
      633,
      642,
      654,
      656,
      657,
      659,
      660,
      661
    ],
    "lines": [
      {
        "cond": "При flag[636]=1 (Спектрецкий завербован) — рапорт о хулигане в кафе (scr_text, flag[464] → 1)",
        "who": "narration",
        "text": "* Добрый вечер, босс."
      },
      {
        "cond": "При flag[636]=1 (Спектрецкий завербован) — рапорт о хулигане в кафе (scr_text, flag[464] → 1)",
        "who": "narration",
        "text": "* Мы нашли странного хулигана, пытавшегося превратить кафе..."
      }
    ]
  },
  "637": {
    "detail": "Флаг вербовки рекрута. «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "638": {
    "detail": "Флаг вербовки рекрута. «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "639": {
    "detail": "Флаг вербовки рекрута Ваниль. «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "640": {
    "detail": "Флаг хранит исход вербовки Постоянника. «На что влияет: при !=1 в додзё (obj_*_room_castle_dojo) появляется pippins_npc и срабатывает реплика clubs_idle (obj_npc_room); при ==1 учитывается в зачёте рекрутов obj_fusionmenu (Гл.2) и даёт ГИГА-Королеве +5 HP; в Гл.4 scr_recruitchecks по «wwr»/«werewerewire» отмечает завербован (==1)/потерян (==-1).»",
    "related": [
      630,
      631,
      632,
      633,
      634,
      635,
      636,
      642,
      644
    ]
  },
  "641": {
    "detail": "Флаг вербовки рекрута. «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "642": {
    "detail": "Флаг хранит исход вербовки Диспетчера задатьщ. «На что влияет: при ==1 меняет позицию/спрайт bloxer в obj_npc_castle_door и убирает readable «tasque», открывает приз додзё «Tasque Manager Says»/«$250» (obj_fusionmenu_Step), даёт особую ветку в бою с Колёсиком-мыши (obj_mauswheel_enemy actcon=22.1) и +5 HP ГИГА-Королеве; в Гл.4 связка 642+632+654 управляет сценой кафе в scr_text.»",
    "related": [
      302,
      632,
      644,
      654
    ],
    "lines": [
      {
        "cond": "При 642=1 (завербован) — приветствие Диспетчера",
        "who": "narration",
        "text": "* Good day, boss."
      },
      {
        "cond": "Гл.4 — сцена кафе (642=1 в связке с 632/654)",
        "who": "narration",
        "text": "* Для юного человека мы рекомендуем шоколадно-черничный латте..."
      }
    ]
  },
  "643": {
    "detail": "Флаг вербовки Птицына. «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "644": {
    "detail": "Флаг хранит исход вербовки Колёсико-мыши. «На что влияет: при ==1 завершает зачёт рекрутов obj_fusionmenu (Гл.2) и даёт ГИГА-Королеве +5 HP (после чего hprecruit>50); в Гл.3/4 scr_recruitchecks по «whe»/«mauswheel» отмечает завербован (==1)/потерян (==-1).»",
    "related": [
      630,
      631,
      632,
      633,
      634,
      635,
      636,
      640,
      642
    ]
  },
  "645": {
    "detail": "Флаг вербовки Рулса. «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "646": {
    "detail": "Флаг вербовки Птицына (вторая запись). «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "647": {
    "detail": "Флаг вербовки Крести (додзё). «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "648": {
    "detail": "Флаг вербовки Королевы. «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "649": {
    "detail": "Флаг вербовки Спамтона. «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "650": {
    "detail": "Флаг вербовки Спамтона НЕО. «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "651": {
    "detail": "Флаг вербовки ГИГА-Королевы. «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "652": {
    "detail": "Флаг вербовки рекрута (додзё). «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "653": {
    "detail": "Флаг вербовки рекрута. «На что влияет: хранит прогресс вербовки (−1 потерян / 0 нет / далее завербован).»"
  },
  "654": {
    "detail": "Флаг хранит исход вербовки Прихвостня. «На что влияет: при ==1 учитывается в общем зачёте теле-рекрутов Гл.3 (obj_room_green_room gotemall), оставляет pynpc (obj_dw_teevie_shadow_guys), в Гл.4 меняет спрайты окон в доме Ториэль (obj_room_torhouse, obj_ch4_LWF03 windows_small/dark) и вместе с 642+632 управляет сценой кафе (scr_text); ==-1 = потерян (lostem).»",
    "related": [
      655,
      656,
      657,
      658,
      659,
      642,
      632,
      1147,
      1148
    ],
    "lines": [
      {
        "cond": "Гл.4, кафе (при 642+632+654 = 1) — приветствие официанта",
        "who": "narration",
        "text": "* Good day, boss."
      },
      {
        "cond": "Гл.4, кафе — пункт меню «Рекомендация» (ответ для Крис)",
        "who": "narration",
        "text": "* Для юного человека мы рекомендуем шоколадно-черничный латте..."
      }
    ]
  },
  "655": {
    "detail": "Флаг хранит исход вербовки Паноры. «На что влияет: при ==1 учитывается в зачёте теле-рекрутов Гл.3 (obj_room_green_room) и в Гл.4 включает фото-критера и маркер shutta_idle в obj_room_castle_front; scr_recruitchecks по «shu» отмечает завербован (==1)/потерян (==-1).»",
    "related": [
      654,
      656,
      657,
      658,
      659
    ]
  },
  "656": {
    "detail": "Флаг хранит исход вербовки Пультия. «На что влияет: при ==1 учитывается в зачёте теле-рекрутов Гл.3; в лабиринте obj_dw_teevie_shuttahmaze значение ==0 меняет стычку (encounterno 112 вместо 118); в Гл.4 связка 636+656+657 спавнит obj_npc_zapper (obj_room_castle_town); scr_recruitchecks по «zap» отмечает завербован (==1)/потерян (==-1).»",
    "related": [
      654,
      655,
      657,
      658,
      659,
      636,
      54
    ]
  },
  "657": {
    "detail": "Флаг хранит исход вербовки Прыглика. «На что влияет: при ==1 учитывается в зачёте теле-рекрутов Гл.3 (obj_room_green_room) и вместе с 636+656 включает obj_npc_zapper в Гл.4 (obj_room_castle_town); scr_recruitchecks по «rib» отмечает завербован (==1)/потерян (==-1).»",
    "related": [
      654,
      655,
      656,
      658,
      659,
      636
    ]
  },
  "658": {
    "detail": "Флаг хранит исход вербовки Кулера. «На что влияет: при ==1 учитывается в зачёте теле-рекрутов Гл.3 (obj_room_green_room); в Гл.4 при >0 спавнит rudinn_npc (obj_room_castle_town); scr_recruitchecks по «wat» отмечает завербован (==1)/потерян (==-1).»",
    "related": [
      654,
      655,
      656,
      657,
      659
    ]
  },
  "659": {
    "detail": "Флаг хранит исход вербовки Кубикса. «На что влияет: при ==1 учитывается в зачёте теле-рекрутов Гл.3 (obj_room_green_room), в Гл.4 спавнит hacker_npc (obj_npc_castle_cliff), влияет на scr_tenna_alt_plot (recruited_pippins) и меняет реплику NPC (obj_npc_room) про «других Пиппинсов»; scr_recruitchecks по «pip» отмечает завербован (==1)/потерян (==-1).»",
    "related": [
      654,
      655,
      656,
      657,
      658,
      1248
    ],
    "lines": [
      {
        "cond": "Реплика NPC-Пиппинса (Гл.4): вступление (показывается всегда)",
        "who": "narration",
        "text": "* Hey, apparently you met my friends. The other Pippinses."
      },
      {
        "cond": "Реплика NPC-Пиппинса (Гл.4): вступление (показывается всегда)",
        "who": "narration",
        "text": "* ..."
      },
      {
        "cond": "При flag[659]==1 (Кубикс завербован)",
        "who": "narration",
        "text": "* Yeah, they're actually losers. Guess I hyped them up a bit."
      }
    ]
  },
  "660": {
    "detail": "Флаг хранит исход вербовки Эльнины. «На что влияет: при завершении сцены повара (obj_room_teevie_chef con==80) Гл.3 ставится 660=1 (одновременно с 661 и 1148=2), помечая Эльнину завербованной; в Гл.4 gamestart-оверрайд также ставит 660=1.»",
    "related": [
      661,
      1148
    ]
  },
  "661": {
    "detail": "Флаг хранит исход вербовки Ланино. «На что влияет: при завершении сцены повара (obj_room_teevie_chef con==80) Гл.3 ставится 661=1 (одновременно с 660 и 1148=2), помечая Ланино завербованным; в Гл.4 gamestart-оверрайд также ставит 661=1.»",
    "related": [
      660,
      1148
    ]
  },
  "662": {
    "detail": "Флаг хранит исход вербовки Guei (рекрут Гл.4). «На что влияет: в scr_recruitchecks по «guei» отмечает рекрута завербованным (==1) или потерянным (==-1).»"
  },
  "663": {
    "detail": "Флаг хранит исход вербовки Balthizard (рекрут Гл.4). «На что влияет: в scr_recruitchecks по «balthizard» отмечает рекрута завербованным (==1) или потерянным (==-1).»"
  },
  "664": {
    "detail": "Флаг хранит исход вербовки Bibliox (рекрут Гл.4). «На что влияет: в scr_recruitchecks по «bibliox» отмечает рекрута завербованным (==1) или потерянным (==-1).»"
  },
  "665": {
    "detail": "Флаг хранит исход вербовки Mizzle (рекрут Гл.4). «На что влияет: в scr_recruitchecks по «mizzle» отмечает рекрута завербованным (==1) или потерянным (==-1).»"
  },
  "666": {
    "detail": "Флаг хранит исход вербовки Wicabel (рекрут Гл.4). «На что влияет: в scr_recruitchecks по «wicabel» отмечает рекрута завербованным (==1) или потерянным (==-1).»"
  },
  "667": {
    "detail": "Флаг хранит исход вербовки Winglade (рекрут Гл.4). «На что влияет: в scr_recruitchecks по «winglade» отмечает рекрута завербованным (==1) или потерянным (==-1).»"
  },
  "668": {
    "detail": "Флаг хранит исход вербовки Organikk (рекрут Гл.4). «На что влияет: в scr_recruitchecks по «organikk» отмечает рекрута завербованным (==1) или потерянным (==-1).»"
  },
  "669": {
    "detail": "Флаг хранит исход вербовки Miss Mizzle (рекрут Гл.4). «На что влияет: в scr_recruitchecks по «miss» отмечает рекрута завербованным (==1) или потерянным (==-1).»"
  },
  "701": {
    "detail": "Флаг отмечает посещение закусочной в Гл.4. «На что влияет: при plot<50 и 701==0 присутствует дверь-триггер obj_ch4_PDC05A (вход в закусочную), при входе ставится 701=1; далее значение читается в obj_ch4_PDC07 (Сьюзи говорит, что заскучала), в obj_dw_churchb_libraryconnector и obj_dw_gerson_study (ветка диалога про рисунок и фразу «Susie rulez»), а в obj_npc_room персонаж qc показывает текст 1252 только при 701==0. Связано с настройкой scr_flag_set(7,0) и 1559.»",
    "related": [
      7,
      1252,
      1559
    ],
    "lines": [
      {
        "cond": "Гл.4 obj_ch4_PDC07: при flag[701] > 0 (Сьюзи скучает после закусочной)",
        "who": "susie",
        "text": "* ... damn, I'm getting bored."
      },
      {
        "cond": "Гл.4 obj_dw_gerson_study: ветка про рисунок «Susie rulez» (при flag[701] > 0)",
        "who": "susie",
        "text": "* ... weird illustration, though."
      },
      {
        "cond": "Гл.4 obj_dw_gerson_study: ветка про рисунок «Susie rulez» (при flag[701] > 0)",
        "who": "susie",
        "text": "* Plus, why's it calling you a \"cage\"...?"
      },
      {
        "cond": "Гл.4 obj_dw_gerson_study: ветка про рисунок «Susie rulez» (при flag[701] > 0)",
        "who": "susie",
        "text": "* Shouldn't you be something more like..."
      },
      {
        "cond": "Гл.4 obj_dw_gerson_study: ветка про рисунок «Susie rulez» (при flag[701] > 0)",
        "who": "susie",
        "text": "* \"The cool\"? Then for the picture, they can like..."
      },
      {
        "cond": "Гл.4 obj_dw_gerson_study: ветка про рисунок «Susie rulez» (при flag[701] > 0)",
        "who": "susie",
        "text": "* Use my drawing where you're saying \"Susie rulez\". Heh."
      },
      {
        "cond": "Гл.4 obj_dw_gerson_study: ветка про рисунок «Susie rulez» (при flag[701] > 0)",
        "who": "gerson",
        "text": "* Oh? Here, take the pen then.."
      },
      {
        "cond": "Гл.4 obj_dw_gerson_study: ветка про рисунок «Susie rulez» (при flag[701] > 0)",
        "who": "susie",
        "text": "* See, Kris wasn't saying \"SUSIE RULEZ.\""
      }
    ]
  },
  "702": {
    "detail": "В obj_ch4_PDC05A при con == 6 ставится в 1 вместе со звуком snd_window_draw_squeak (скрип по стеклу) и репликой Сьюзи. Позже при con == 10 переменная drew_susie = scr_flag_get(702) == 1 выбирает продолжение сцены: con = 11 (рисунок есть) либо con = 16 (нет).",
    "related": [
      701,
      703
    ]
  },
  "703": {
    "detail": "Ставится в 1 в obj_ch4_PDC05A при con == 18 (переход к con = 20), сопровождается двойным звуком snd_window_draw_squeak. По коду — внутренний маркер этапа сцены рисования на стекле.",
    "related": [
      701,
      702
    ]
  },
  "704": {
    "detail": "Флаг хранит состояние настенного рычага в тёмной комнате Гл.4. «На что влияет: задаёт кадр спрайта рычага (image_index=flag[704]); при первом нажатии (из 0) звучит snd_locker, экран трясётся (scr_shakescreen) и флаг становится 1; при ==1 объект obj_darkroom1_bookshelfWall (стена-шкаф) уничтожается, открывая проход.»"
  },
  "705": {
    "detail": "Флаг хранит состояние свечи в церкви Гл.4. «На что влияет: при зажигании свечи ставится 705=1 и удаляется пуле-зона obj_overworld_bulletarea; при ==1 в Create снимается блокиратор двери (door2blocker), показывается слой TILES_DOOR2 и свеча инициализируется как горящая (lit=2), а зажигалку obj_church_candleLighter удаляют. По сути открывает проход через дверь.»"
  },
  "706": {
    "detail": "Флаг отмечает прохождение катсцены obj_ch4_PDC06 в Гл.4. «На что влияет: при plot 35.110 и 706==0 включается чёрное затемнение (blackall); по ходу сцены con 3→4 ставится 706=1; после этого obj_caterpillarchara меняет спрайт спутника на spr_ralsei_splat_caterpillar, в obj_room_castle_town при ==1 продолжается сцена (con 11 → 793=1), а в obj_room_town_south ветка susie_check срабатывает только при 706==0.»",
    "related": [
      793,
      1551,
      1661
    ]
  },
  "707": {
    "detail": "В obj_ch4_PDC14A_noelle (con == 11) при scr_flag_get(707) == 0 проигрывается ветка (выбор c_sel(no), скрытие, звук snd_grab). Позже флаг ставится в 1, после чего вызывается scr_sideb_fail() и звук snd_ominous_cancel — отметка, что эта часть side B уже произошла."
  },
  "710": {
    "detail": "Флаг хранит состояние головоломки книжных полок / пианино в тёмной церкви Гл.4 (флаг «Saw Ralsei's Room»). «На что влияет: при завершении сцены obj_ch4_PDC06B ставится 710=2; в obj_dw_church_bookshelfpuzzle значение переключается (>=2 → 0, иначе → 2) вместе со сбросом флагов полок 878-881; при >=2 меняется спрайт/состояние правого фрагмента пианино (obj_dw_church_pianopiece_right, susprite 433); при 710==0 в комнате есть читаемая кассета tape_readable (obj_ch4_PDC06A).»",
    "related": [
      866,
      878,
      879,
      880,
      881
    ]
  },
  "733": {
    "detail": "Флаг отмечает осмотр домашнего стола Ноэль в Гл.4. «На что влияет: при первом взаимодействии со столом (extflag «desk», 733==0) игрок получает предметы (scr_litemget(15) и оружие 50, звук snd_item), и если есть свободное место — ставится 733=1, после чего реплика меняется на «…You took a pencil out of habit». При 733==1 предметы повторно не выдаются.»",
    "lines": [
      {
        "cond": "Первый осмотр стола Ноэль (флаг=0)",
        "who": "narration",
        "text": "* (It's Noelle's homework desk.)"
      },
      {
        "cond": "Повторный осмотр стола (флаг=1)",
        "who": "narration",
        "text": "* (It's Noelle's homework desk. You took a pencil out of habit.)"
      }
    ]
  },
  "747": {
    "detail": "Флаг отмечает получение приза от Сьюзи в Гл.4. «На что влияет: ставится 747=1 в obj_ch4_PDC01D_Step; при >0 в комнате Крис рисуется звезда spr_krisroom_star/_dark (obj_krisroom, obj_krisroom_dark, obj_ch4_PDC01D, отрисовка obj_ch4_LWF04A_vfx); при осмотре кровати Крис (obj_readable_room1) значение 747==0 запускает сцену с Сьюзи (PDC01D susie_con=1), а при >0 — дополнительную реплику Сьюзи.»",
    "lines": [
      {
        "cond": "При flag[747]>0 — осмотр кровати Крис (особая реплика)",
        "who": "narration",
        "text": "* (... What kind of dreams would you see if you slept here?)"
      }
    ]
  },
  "779": {
    "detail": "Флаг хранит, отдан ли сломанный ТВ. «На что влияет: при значении <2 ТВ ещё стоит дома (obj_room_torhouse, obj_readable_room1), при первом осмотре через obj_dw_transition_interactable ставится 780=1; при >=2 (или 780==1, или plot>=100) объект tv_broken уничтожается и появляется реплика про «отсутствие развлечений»; пока <2 в подземелье (obj_room_dungeon_2f) появляется Король, а в бою с Майком звучит отдельная строка.»",
    "related": [
      780,
      790
    ],
    "lines": [
      {
        "cond": "Гл.4: ТВ ещё дома, осмотр (flag<2)",
        "who": "narration",
        "text": "* (So I tried patching him up... hope it worked out.)"
      },
      {
        "cond": "Гл.4: ТВ ещё дома, осмотр (flag<2)",
        "who": "narration",
        "text": "* (Let's find a new home for him fast, OK, Kris?)"
      },
      {
        "cond": "Гл.4: ТВ уже отдан/убран — «нет развлечений» (flag≥2)",
        "who": "narration",
        "text": "* (You can feel a pressure gradient from the absence of entertainment.)"
      },
      {
        "cond": "Гл.4: бой с Майком, ТВ ещё не отдан (flag<2)",
        "who": "mike",
        "text": "* Ahhhh, I give up! As long as someone's Mike, it'll work out!"
      }
    ]
  },
  "795": {
    "detail": "Гл.4, obj_dw_church_legender — строфы легенды, написанные на стенах лестницы Тёмной церкви при подъёме (room_dw_church_stairs_topleft/topright). На что влияет: какую строфу уже показали. 0 — ещё не видели: показывается строфа «THE LIGHT AND DARK, BOTH BURNING DIRE…» (prophecy_index 3), после чего ставится 1 (левая лестница) или 2 (правая). Ненулевое — далее показывается следующая строфа «BUT LO… THREE HEROES AT THE WORLD'S END.» (prophecy_index 4). Не сбрасывается — переносится по ходу главы.",
    "fx": {
      "proph": {
        "items": [
          {
            "icon": "proph_icon_main3.png",
            "verse": "THE LIGHT AND DARK, BOTH BURNING DIRE.#A COUNTDOWN TO THE EARTH'S EXPIRE."
          },
          {
            "icon": "proph_icon_heroes1.png",
            "verse": "BUT LO, ON HOPES AND DREAMS THEY SEND.#THREE HEROES AT THE WORLD'S END."
          }
        ]
      }
    }
  },
  "810": {
    "detail": "Флаг хранит исход одного из испытаний додзё. «На что влияет: при !=0 в меню додзё (obj_fusionmenu_Step) приз помечается «Награда получена»; когда ВСЕ пять испытаний (810-814) == 2, тренер поздравляет с прохождением всех испытаний (scr_text).»",
    "related": [
      811,
      812,
      813,
      814
    ],
    "lines": [
      {
        "cond": "Реплика тренера додзё (общая)",
        "who": "narration",
        "text": "* Мы сделаем вас сильнее всех, босс!"
      },
      {
        "cond": "Когда все 5 испытаний пройдены (810–814=2)",
        "who": "narration",
        "text": "* Поздравляю вас, босс! Вы прошли все испытания!"
      },
      {
        "cond": "Реплика тренера додзё (общая)",
        "who": "narration",
        "text": "* Не волнуйтесь, босс! Мы всегда будем здесь."
      }
    ]
  },
  "811": {
    "detail": "Флаг хранит исход испытания «Clover» в додзё. «На что влияет: при !=0 приз отмечается «Награда получена» (obj_fusionmenu_Step); при 810-814 == 2 тренер выдаёт поздравление с прохождением всех испытаний (scr_text).»",
    "related": [
      810,
      812,
      813,
      814
    ],
    "lines": [
      {
        "cond": "Гл.3 (додзё, scr_text case 1107): вступительная речь тренера при первом обращении (flag[431]=0)",
        "who": "narration",
        "text": "* Тем временем вы, возможно, станете немножко жёстче!"
      },
      {
        "cond": "Гл.3 (додзё, scr_text case 1108): прощание при выборе «Ничего»/уйти (global.choice=1)",
        "who": "narration",
        "text": "* Мы будем работать над НОВЫМИ ИСПЫТАНИЯМИ, так что заглядывайте, босс!"
      }
    ]
  },
  "812": {
    "detail": "Флаг хранит исход испытания «Tasque Manager Says» в додзё. «На что влияет: при !=0 приз отмечается «Награда получена» (obj_fusionmenu_Step); при 810-814 == 2 тренер поздравляет с прохождением всех испытаний (scr_text).»",
    "related": [
      810,
      811,
      813,
      814
    ],
    "lines": [
      {
        "cond": "По прохождении испытания (флаг = 2)",
        "who": "narration",
        "text": "* Мне больше нечему вас научить и нечего вам дать. Но вы всегда можете немного попрактиковаться!"
      }
    ]
  },
  "813": {
    "detail": "Флаг хранит исход испытания «All Stars» в додзё. «На что влияет: при !=0 приз отмечается «Награда получена» (obj_fusionmenu_Step); при 810-814 == 2 тренер выдаёт поздравление с прохождением всех испытаний (scr_text).»",
    "related": [
      810,
      811,
      812,
      814
    ],
    "lines": [
      {
        "cond": "При 810–814 = 2 (все испытания пройдены) — поздравление тренера",
        "who": "narration",
        "text": "* Поздравляю вас, босс! Вы прошли все испытания!"
      }
    ]
  },
  "814": {
    "detail": "Флаг хранит исход боя с Джигсо Джо в додзё. «На что влияет: при !=0 приз отмечается «Награда получена» (obj_fusionmenu_Step); при 810-814 == 2 тренер поздравляет с прохождением всех испытаний (scr_text).»",
    "related": [
      810,
      811,
      812,
      813
    ],
    "lines": [
      {
        "cond": "При flag[814] ≠ 0 — пометка «Награда получена» в меню додзё",
        "who": "narration",
        "text": "Награда получена"
      },
      {
        "cond": "Реплика тренера додзё (obj_fusionmenu)",
        "who": "narration",
        "text": "* Мы сделаем вас сильнее всех, босс!"
      }
    ]
  },
  "815": {
    "detail": "Флаг отмечает выданный приз додзё в Гл.4. «На что влияет: при !=0 в меню додзё (obj_fusionmenu_Step) приз помечается «Claimed»/«Награда получена».»",
    "related": [
      810,
      811,
      812,
      813,
      814
    ],
    "lines": [
      {
        "cond": "При flag[815] ≠ 0 (приз получен) — пометка «Claimed» в меню додзё (Гл.4, obj_fusionmenu)",
        "who": "narration",
        "text": "Claimed"
      }
    ]
  },
  "816": {
    "related": [254, 914, 1705, 1749, 1802],
    "fx": {
      "cap": "Нуберт в Городе-Замке — как он выглядит при разных значениях флага:",
      "states": [
        {
          "cond": "816 = 0 — ОГРОМНЫЙ (супер-Нуберт)",
          "img": "game-sprites/flagfx/spr_npc_nubert_super_0.png"
        },
        {
          "cond": "816 > 0 — обычного размера",
          "img": "game-sprites/flagfx/spr_npc_nubert_0.png"
        }
      ]
    },
    "lines": [
      {
        "cond": "При значении > 0 (NPC Nubert)",
        "who": "narration",
        "text": "* Nubert's dramatically cutting his hair to symbolize a new chapter in his life..."
      },
      {
        "cond": "При значении > 0 (реплика тренера додзё)",
        "who": "narration",
        "text": "* Boss! You fought everybody we had today..."
      },
      {
        "cond": "При значении > 0 (реплика тренера додзё)",
        "who": "narration",
        "text": "* Well... I was thinkin' of making a trio, too, but..."
      },
      {
        "cond": "При значении > 0 (реплика тренера додзё)",
        "who": "narration",
        "text": "* Maybe that's not a great idea right now."
      }
    ]
  },
  "832": {
    "detail": "Флаг хранит, забраны ли 5 долларов из ящика. «На что влияет: при ==0 у тумбочки в комнате Крис виден блеск (spr_shine, obj_krisroom) и предлагается взять деньги; после взятия ставится 1, блеск исчезает и повторный осмотр говорит, что взято достаточно (scr_text).»",
    "lines": [
      {
        "cond": "При flag[832] = 0 (предложение взять 5 долларов)",
        "who": "narration",
        "text": "* There's 5 dollars in your brother's drawer. Take it?"
      },
      {
        "cond": "При взятии (flag[832]: 0→1, «borrowed 5 dollars»)",
        "who": "narration",
        "text": "* You reluctantly \"borrowed\" 5 dollars."
      },
      {
        "cond": "При flag[832] = 1 (уже взято — «You have already taken enough»)",
        "who": "narration",
        "text": "* (You have already taken enough.)"
      }
    ]
  },
  "833": {
    "detail": "В scr_text официантка (no_name): если scr_flag_get(833) == 0, флаг ставится в 1 и выводятся реплики про нехватку денег и деньги дома. Позже при взятии $5 из ящика (см. флаг 832), если 833 == 1, добавляется реплика Сьюзи про то, что брат угостил их в закусочной.",
    "related": [
      832
    ],
    "lines": [
      {
        "cond": "Официантка: не хватает денег (флаг=0)",
        "who": "narration",
        "text": "* Hm, looks like you don't have enough."
      },
      {
        "cond": "Официантка: не хватает денег (флаг=0)",
        "who": "narration",
        "text": "* I'm sure you have some money at home..."
      },
      {
        "cond": "После взятия $5 дома (833=1, ср. флаг 832)",
        "who": "susie",
        "text": "Heheh... nice of your brother to treat us to the diner."
      }
    ]
  },
  "835": {
    "detail": "В obj_savepoint (Other_10) в комнате room_dw_church_savepoint при scr_flag_get(835) == 0 флаг ставится в 1 и один раз выводится особый текст про стеклянный витраж над головой; при повторных взаимодействиях он уже не повторяется.",
    "lines": [
      {
        "cond": "Первый раз у точки сохранения церкви (flag[835]=0)",
        "who": "narration",
        "text": "* (A glass tapestry rings above you. Strangely, no matter how you turn to look...)"
      },
      {
        "cond": "Первый раз у точки сохранения церкви (flag[835]=0)",
        "who": "narration",
        "text": "* (... its perspective never changes.)"
      }
    ]
  },
  "836": {
    "detail": "В scr_text при открытии магазина Герсон спрашивает «Ya want somethin'?»; если scr_flag_get(836) == 0, флаг ставится в 1 и дополнительно играет вступительное приветствие. При повторных визитах приветствие пропускается.",
    "lines": [
      {
        "cond": "Гл.4: открытие магазина Герсона (любой визит)",
        "who": "gerson",
        "text": "Ya want somethin'?"
      },
      {
        "cond": "Гл.4: первый визит — приветствие (flag=0)",
        "who": "gerson",
        "text": "Welcome, welcome!"
      },
      {
        "cond": "Гл.4: первый визит — приветствие (flag=0)",
        "who": "gerson",
        "text": "A pleasure seeing you young'uns here! Whatcha need?"
      }
    ]
  },
  "847": {
    "detail": "В scr_itemuse case 330 (применение ключевого предмета): если scr_flag_get(847) == 0, ставится scr_flag_set(847, 1) и создаётся obj_dw_church_susiesnote. В obj_dw_gerson_study_Step при выходе: если scr_flag_get(848) > 0 → scr_flag_set(847, 3), иначе scr_flag_set(847, 2), затем room_goto(room_dw_church_organpuzzle). В obj_dw_gerson_study_Create: если scr_flag_get(847) > 0 — gerson_door.image_index = 1. Отладка в obj_dw_church_organ_Create: клавиша 1 → flag[847]=0, plot=170; клавиша 2 → flag[847]=0, plot=180; клавиша 3 → flag[847]=1, plot=180. В scr_text реплика jackenstein (case 1408) показывается только при scr_flag_get(847) == 0; при scr_flag_get(847) > 0 при флаге 1605 == 0 ставится scr_flag_set(1605, 1).",
    "related": [
      848,
      1605,
      30
    ],
    "lines": [
      {
        "cond": "Сьюзи-подсказка (Северо-Западная библиотека)",
        "who": "susie",
        "text": "* Maybe the Northwest Library's got somethin' for ya!"
      },
      {
        "cond": "Сьюзи-подсказка (Северо-Западная библиотека)",
        "who": "susie",
        "text": "* (Probably not, but whatever.)"
      },
      {
        "cond": "Jackenstein при 847=0 (подсказка про пианино)",
        "who": "narration",
        "text": "* I HEARD A RUMMOR THAT THE RIGHTWARD ZONE... CONTAINS A BAEIOUTIFUL PAINO."
      },
      {
        "cond": "Jackenstein при 847=0 (подсказка про пианино)",
        "who": "narration",
        "text": "* BE CAIREFUL. MANNY HOT PEOEPLES LIVE IN THAT PLACE."
      }
    ]
  },
  "850": {
    "detail": "obj_ch4_DCA08B_Step: при con == 2 → scr_flag_set(850, 2), flag[886]=-1, flag[891]=-1. obj_ch4_DCA08C_Create: если flag[850] < 2 → flag[850]=2; при plot >= 170 и scr_flag_get(850) == 2 уничтожается obj_followinglight_shrinking. obj_dw_church_nwconnect_Create: makeslide = true, если flag[850] >= 5 или flag[23] == true. obj_dw_gerson_study_Create: при scr_flag_get(850) >= 3 и plot < 242 создаётся jack_marker (spr_npc_jackenstein_cleaning). obj_dw_church_pianopuzzle_Create: отладочная клавиша P → flag[850]=7; при flag[850] >= 5 fightjack = false. scr_text проверяет scr_flag_get(850) >= 3 (тогда при флаге 1607 == 0 ставит scr_flag_set(1607, 1)).",
    "related": [
      886,
      891,
      23,
      1607
    ]
  },
  "851": {
    "detail": "obj_dw_church_secretpiano_Step: scr_flag_set(1547, 1) и scr_flag_set(851, 1). obj_dw_church_arena_Step: при tempflag[90] == 5 → scr_flag_set(851, 2) и scr_flag_set(852, 1) (gerson_npc.visible = 1); ветка con == 11 тоже ставит scr_flag_set(851, 2) (и флаг 1629); con == 50: con = (scr_flag_get(851) == 2) ? 60 : 99 (но con=99 при flag 36 > 0); con == 62 → scr_flag_set(851, 3). obj_dw_church_arena_Create: если scr_flag_get(852) == 0 и scr_flag_get(851) < 3 — выстраивается катсцена (con=0 при 851 == 1); при scr_flag_get(851) == 2 создаётся obj_npc_gerson. obj_dw_church_tallbookcases_Step: gerstate = 1, если flag[851] > 0. Отладка в obj_dw_church_tallbookcases_Create: клавиша P инвертирует flag[851] и ставит plot=242.",
    "related": [
      852,
      1547,
      1629,
      36
    ]
  },
  "852": {
    "detail": "Флаг отмечает получение Топора Правосудия. «На что влияет: ставится в 1 при победе над Герсоном на арене (obj_dw_church_arena), убирает маркер топора с наковальни, даёт Сьюзи титул «LV4 Axe of Justice» (obj_darkcontroller_Draw), меняет стоимость её заклинания (scr_spellinfo) и открывает реплики Герсона про кристалл (obj_npc_room, ставит 1652).»",
    "related": [
      851,
      853,
      1045,
      1569,
      1652
    ],
    "lines": [
      {
        "cond": "Реплики Герсона про Топор (получение, flag → 1)",
        "who": "gerson",
        "text": "* Magic Axe? Hmm, hmm..."
      },
      {
        "cond": "Реплики Герсона про Топор (получение, flag → 1)",
        "who": "gerson",
        "text": "* By the by, ain't it getting a bit drafty in here? I wonder why."
      },
      {
        "cond": "Реплики Герсона про Топор (получение, flag → 1)",
        "who": "gerson",
        "text": "* You still want the Axe? I'll give it to ya..."
      },
      {
        "cond": "При flag 1 — реплика Герсона про кристалл (ставит 1652)",
        "who": "gerson",
        "text": "* That crystal's got some kinda strange power."
      }
    ]
  },
  "854": {
    "detail": "obj_ch4_PDC06B_Step: при global.choice == 0 → scr_flag_set(854, 1), затем c_sprite(spr_ralsei_walk_down_blush) и c_emote(\"!\"). При global.choice == 1 → scr_flag_set(854, 2), затем c_sprite(spr_ralsei_surprised_down_subtle) и c_emote(\"!\"). Флаг фиксирует выбранный ответ Крис в этой развилке."
  },
  "872": {
    "detail": "Флаг хранит прогресс конфетной чаши лабиринта. «На что влияет: растёт при взятии «Darker Candy» (obj_dw_church_darkmaze, до значения, рисуемого как candymarker.image_index), в сюжетной сцене жёстко выставляется в 3 с разбитием чаши (snd_glassbreak).»",
    "lines": [
      {
        "cond": "При взятии конфеты в лабиринте (флаг растёт)",
        "who": "narration",
        "text": "* (You took a candy. You got Darker Candy.)"
      }
    ]
  },
  "875": {
    "detail": "Флаг хранит ответ Крис в сцене с улыбкой Ральзея. «На что влияет: при ==1 (поддержка) scr_teaamount даёт Ральзею +40 к лечению чаем и включает ветку con=45 в obj_ch4_DCC03; при ==2 идёт другая реплика Ральзея.»",
    "lines": [
      {
        "cond": "При flag[875]=2 (con=20: попросил продолжать улыбаться) — ответ Ральзея (obj_ch4_DCC03)",
        "who": "ralsei",
        "text": "* Of... of course! You can count on me!"
      },
      {
        "cond": "При flag[875]=2 (con=20: попросил продолжать улыбаться) — ответ Ральзея (obj_ch4_DCC03)",
        "who": "ralsei",
        "text": "* I'll... make sure we..."
      }
    ]
  },
  "898": {
    "detail": "Флаг хранит сумму пожертвований в фонтан. «На что влияет: вместе с bonus (зависит от флагов яиц 910/917/930) определяет состояние фонтана и ветку obj_treasure_room (порог 100), а также отображение монет/льда; при 0 фонтан пуст/заморожен. Дебаг-клавиши задают пресеты сумм.»",
    "related": [
      910,
      917,
      930,
      1537
    ],
    "lines": [
      {
        "cond": "При flag[898] > 0 (в фонтане блестят золотые монеты)",
        "who": "narration",
        "text": "* (The water is gleaming... gold coins are glittering inside.)"
      },
      {
        "cond": "При flag[898] = 0 (фонтан пуст, вода заморожена)",
        "who": "narration",
        "text": "* (The water is frozen in emptiness.)"
      },
      {
        "cond": "Приглашение бросить деньги в фонтан",
        "who": "narration",
        "text": "* (It's a pool... throw money in?)"
      }
    ]
  },
  "899": {
    "detail": "obj_dw_church_holywatercooler_Create: encounterno = 153, encounterflag = 899; проверяется global.flag[encounterflag] (т.е. flag[899]) != 0. obj_dw_church_secretpiano_Create: make[0] = abs(global.flag[899]) — ненулевое значение включает первую часть пианино; make[1] = true при global.flag[1502] >= 2.",
    "related": [
      1502
    ]
  },
  "900": {
    "detail": "Выбранная форма головы сосуда (DEVICE_GONERMAKER, PART[0], максимум 7).",
    "related": [
      901,
      902
    ]
  },
  "901": {
    "detail": "Выбранная форма тела сосуда (DEVICE_GONERMAKER, PART[1], максимум 5).",
    "related": [
      900,
      902
    ]
  },
  "902": {
    "detail": "Выбранная форма ног сосуда (DEVICE_GONERMAKER, PART[2], максимум 4).",
    "related": [
      900,
      901
    ]
  },
  "903": {
    "detail": "Флаг хранит ответ про любимую еду сосуда. «На что влияет: записывается из выбора игрока в опроснике сосуда (DEVICE_CONTACT, EVENT 39); часть набора личностных ответов 903-909.»",
    "related": [
      904,
      905,
      906,
      907,
      908,
      909
    ]
  },
  "904": {
    "detail": "Флаг хранит ответ про группу крови. «На что влияет: записывается из выбора игрока в опроснике сосуда (DEVICE_CONTACT, EVENT 44); часть набора личностных ответов 903-909.»",
    "related": [
      903,
      905,
      906,
      907,
      908,
      909
    ]
  },
  "905": {
    "detail": "Флаг хранит ответ про любимый цвет сосуда. «На что влияет: записывается из выбора игрока в опроснике сосуда (DEVICE_CONTACT, EVENT 49); часть набора личностных ответов 903-909.»",
    "related": [
      903,
      904,
      906,
      907,
      908,
      909
    ]
  },
  "906": {
    "detail": "Флаг хранит ответ про чувство к творению. «На что влияет: записывается из выбора игрока в опроснике сосуда (DEVICE_CONTACT, EVENT 54); часть набора личностных ответов 903-909.»",
    "related": [
      903,
      904,
      905,
      907,
      908,
      909
    ]
  },
  "907": {
    "detail": "Флаг хранит ответ на вопрос о честности. «На что влияет: записывается из выбора игрока в опроснике сосуда (DEVICE_CONTACT, EVENT 58); часть набора личностных ответов 903-909.»",
    "related": [
      903,
      904,
      905,
      906,
      908,
      909
    ]
  },
  "908": {
    "detail": "Флаг хранит ответ про готовность терпеть боль. «На что влияет: записывается из выбора игрока в опроснике сосуда (DEVICE_CONTACT, EVENT 63); часть набора личностных ответов 903-909.»",
    "related": [
      903,
      904,
      905,
      906,
      907,
      909
    ]
  },
  "909": {
    "detail": "Флаг хранит выбранный дар сосуду. «На что влияет: записывается из выбора игрока как 1 - global.choice в опроснике сосуда (DEVICE_CONTACT, EVENT 54.5); часть набора личностных ответов 903-909.»",
    "related": [
      903,
      904,
      905,
      906,
      907,
      908
    ]
  },
  "910": {
    "detail": "Флаг хранит прогресс пасхалки с Человеком/яйцом в лесу Гл.1. «На что влияет: 1 ставится при заходе в room_man (obj_musicer_man), 2 — после разговора и получения яйца (scr_text case 601); влияет на реплики осмотра (obj_readable_room1), появление человека в машине в Гл.2 и на bonus фонтана пожертвований в Гл.4.»",
    "related": [
      911,
      917,
      930,
      898
    ],
    "lines": [
      {
        "cond": "При flag[910] < 2 (Человек ещё в комнате) — осмотр (obj_readable_room1, room_man)",
        "who": "narration",
        "text": "* (Он стоит за деревом.)"
      },
      {
        "cond": "Осмотр дерева в комнате с яйцом (Гл.1, room_man)",
        "who": "narration",
        "text": "* (Это дерево.)"
      },
      {
        "cond": "При flag[910] ≥ 2 (Человек ушёл) — осмотр (obj_readable_room1, room_man)",
        "who": "narration",
        "text": "* (Здесь никого нет.)"
      },
      {
        "cond": "При разговоре с Человеком — выдача яйца (scr_text case 601, flag[910] → 2)",
        "who": "narration",
        "text": "* (Он вам что-то предложил.)"
      },
      {
        "cond": "При разговоре с Человеком — выдача яйца (scr_text case 601, flag[910] → 2)",
        "who": "narration",
        "text": "* (Вам дали яйцо.)"
      }
    ]
  },
  "911": {
    "detail": "Флаг хранит факт получения яйца Гл.1. «На что влияет: выставляется при старте Гл.2 по наличию предмета-яйца (scr_gamestart_chapter_override); затем суммируется со счётчиками яиц в школьных сценах Гл.3/4 (911+918, gotten_eggs).»",
    "related": [
      910,
      918,
      930
    ]
  },
  "914": {
    "detail": "Флаг хранит «с какой главы начат файл» (как chapter-1). «На что влияет: задаётся один раз при создании файла (DEVICE_MENU), показывается в меню как «Since Chapter N» (obj_overworldc_Draw); используется как подсказка определения главы.»",
    "lines": [
      {
        "cond": "Реплика NPC «rudinn» в Городке (Гл.4): завербованы все из прошлых глав → любовь Городка «Strong»",
        "who": "narration",
        "text": "* Your Town's love is Strong."
      },
      {
        "cond": "При flag[914]=0 (старт в Гл.1, не все завербованы) → любовь Городка «Plain»",
        "who": "narration",
        "text": "* This is a familiar place, yet you look like you only just got here."
      },
      {
        "cond": "При flag[914]=0 (старт в Гл.1, не все завербованы) → любовь Городка «Plain»",
        "who": "narration",
        "text": "* From here, let your love grow. All right."
      }
    ]
  },
  "915": {
    "conflicts": [
      { "self": [1,1.5,1.75,2,3,4,5,6,7,8,9,19,20], "other": 531, "otherVals": [0], "note": "915>0 требует, чтобы стычка 531 была завершена заморозкой (531=6)" },
      { "self": [1.5,1.75,2,3,4,5,6,7,8,9,19,20], "other": 559, "otherVals": [0], "note": "915≥1.5 требует заморозки стычек 559/560/561 (=6)" },
      { "self": [1.5,1.75,2,3,4,5,6,7,8,9,19,20], "other": 560, "otherVals": [0], "note": "915≥1.5 требует заморозки стычек 559/560/561 (=6)" },
      { "self": [1.5,1.75,2,3,4,5,6,7,8,9,19,20], "other": 561, "otherVals": [0], "note": "915≥1.5 требует заморозки стычек 559/560/561 (=6)" },
      { "self": [1.75,2,3,4,5,6,7,8,9,19,20], "other": 562, "otherVals": [0], "note": "915≥1.75 требует заморозки стычек 562/563 (=6)" },
      { "self": [1.75,2,3,4,5,6,7,8,9,19,20], "other": 563, "otherVals": [0], "note": "915≥1.75 требует заморозки стычек 562/563 (=6)" },
      { "self": [2,3,4,5,6,7,8,9,19,20], "other": 564, "otherVals": [0], "note": "915≥2 требует заморозки стычек 564/565/532/533 (=6)" },
      { "self": [2,3,4,5,6,7,8,9,19,20], "other": 565, "otherVals": [0], "note": "915≥2 требует заморозки стычек 564/565/532/533 (=6)" },
      { "self": [2,3,4,5,6,7,8,9,19,20], "other": 532, "otherVals": [0], "note": "915≥2 требует заморозки стычек 564/565/532/533 (=6)" },
      { "self": [2,3,4,5,6,7,8,9,19,20], "other": 533, "otherVals": [0], "note": "915≥2 требует заморозки стычек 564/565/532/533 (=6)" }
    ],
    "detail": "Флаг — главный счётчик прогресса Weird Route в Гл.2. «На что влияет: пошагово открывает события маршрута (заморозки, Морозное кольцо, особняк при 7-8, больница при 19, финал 20), переключает фазы через scr_sideb_get_phase и меняет спавны NPC/savepoint (obj_ch2_city_berdly и др.). Дробные значения 1.5/1.75 — стадии трафик-сцены.»",
    "related": [
      916,
      917,
      925
    ],
    "lines": [
      {
        "cond": "Этап маршрута: запертый Лансер",
        "who": "lancer",
        "text": "Хо-хо! Это я, Лансер! Выпустите меня и#я выпущу вас!"
      },
      {
        "cond": "Этап маршрута: ночной город (narration)",
        "who": "narration",
        "text": "(Невинные мальчики давным-давно спят.)"
      },
      {
        "cond": "Этап маршрута: сцена «мы друзья» с Ноэль",
        "who": "noelle",
        "text": "* Да! Всё верно! Мы друзья!"
      },
      {
        "cond": "Этап маршрута: сцена «мы друзья» с Ноэль",
        "who": "narration",
        "text": "* (Неожиданно... приятно слышать, как Крис это говорит...)"
      },
      {
        "cond": "Этап маршрута: сцена «мы друзья» с Ноэль",
        "who": "noelle",
        "text": "* Д... Да, верно, Крис!"
      }
    ]
  },
  "916": {
    "conflicts": [
      { "self": [0], "other": 1656, "otherVals": [1], "note": "916=0 (Странный путь не провален) несовместимо с 1656=1 (провал зафиксирован в Главе 4)" }
    ],
    "detail": "Флаг отмечает срыв Weird Route. «На что влияет: ставится в 1 при отклонении от маршрута (scr_sideb_fail); пока 0 действуют спец-условия пути (фазы scr_sideb_get_phase, спавн savepoint и NPC по флагу 915); при 1 маршрут считается проваленным.»",
    "related": [
      915
    ],
    "lines": [
      {
        "cond": "Гл.2, город: концовка боя с Птицыным (Птицын; маршрут зависит от flag[916])",
        "who": "narration",
        "text": "* D-damn it!"
      },
      {
        "cond": "Гл.2, город: Ноэль читает плакат Queen Clean (flag[915]<1.5)",
        "who": "narration",
        "text": "* (Kris and Dad are the only ones I can say no to...)"
      }
    ]
  },
  "917": {
    "detail": "Флаг хранит прогресс пасхалки с Человеком/яйцом в Гл.2. «На что влияет: 1 — встреча с Псом (obj_dogcar_controller), 2 — вход в комнату человека, 3 — разговор (scr_text case 1174, далее выдаётся яйцо при выборе); влияет на случайный заход в комнату и на bonus фонтана в Гл.4.»",
    "related": [
      910,
      918,
      930,
      898
    ],
    "lines": [
      {
        "cond": "Гл.2: разговор с Человеком в комнате яйца (flag→3)",
        "who": "narration",
        "text": "* Что думаете?"
      }
    ]
  },
  "918": {
    "detail": "Флаг хранит факт получения яйца в Гл.2. «На что влияет: ставится в 1 при согласии взять яйцо у Человека (scr_text case 1174) с выдачей ключевого предмета; далее суммируется со счётчиками яиц в школьных сценах Гл.3/4.»",
    "related": [
      911,
      917,
      930
    ],
    "lines": [
      {
        "cond": "При согласии взять Яйцо (case 1174 → 918=1)",
        "who": "narration",
        "text": "* Вы получили Яйцо."
      }
    ]
  },
  "920": {
    "detail": "Флаг отмечает найденный мох в Гл.2. «На что влияет: ставится в 1 при изучении мусорного бака (obj_npc_dumpster) с фанфарой мха; при 0 у бака горит блеск (spr_shine); при 1 даёт Крис титул «Moss Finder» (obj_darkcontroller_Draw).»",
    "related": [
      921,
      922
    ],
    "lines": [
      {
        "cond": "При изучении мусорного бака (flag → 1)",
        "who": "narration",
        "text": "* You found the [Moss]! %%"
      }
    ]
  },
  "921": {
    "detail": "Флаг отмечает поедание мха при Ноэль в отряде. «На что влияет: ставится в 1 в сцене мусорного бака при наличии Ноэль (obj_npc_dumpster); при ==1 даёт Ноэль титул «Moss Neutral» (obj_darkcontroller_Draw).»",
    "related": [
      920,
      922
    ],
    "lines": [
      {
        "cond": "При поедании мха с Ноэль в отряде (флаг → 1)",
        "who": "narration",
        "text": "* (Why do they look so pleased?)"
      }
    ]
  },
  "922": {
    "detail": "Флаг отмечает поедание мха при Сьюзи в отряде. «На что влияет: ставится в 1 в сцене мусорного бака при наличии Сьюзи (obj_npc_dumpster); при ==1 даёт Сьюзи титул «Moss Enjoyer» (obj_darkcontroller_Draw) и в Гл.3 меняет сцену у стога сена (obj_npc_sign, ставит 1153).»",
    "related": [
      920,
      921,
      1153
    ],
    "lines": [
      {
        "cond": "Гл.3 — осмотр стога сена при 922>0 (особая ветка)",
        "who": "narration",
        "text": "* (Стог сена.)"
      }
    ]
  },
  "923": {
    "detail": "obj_ch2_city_berdly_Step при con == 10: scr_spellget(4, 10), затем global.flag[923] = 1; сразу следом — если global.ThornRing, то global.flag[923] = 0. То есть значение зависит от текущего оружия Ноэль в слоте 4."
  },
  "924": {
    "detail": "obj_berdlyb2_enemy_Step: при snowgrave_con == 0 выбирается реплика Ноэль по значению флага (0, 1, 2, >=3), затем global.flag[924]++. scr_spellinfo: цель заклинания spelltarget = 3, пока global.flag[924] < 4 (после — иное поведение). Чем выше счётчик, тем «дальше» зашёл диалог принуждения.",
    "related": [
      50
    ],
    "lines": [
      {
        "cond": "При flag[924] = 0 (1-я попытка принудить Ноэль к Snowgrave)",
        "who": "noelle",
        "text": "* S.. Snowgrave?"
      },
      {
        "cond": "При flag[924] = 0 (1-я попытка принудить Ноэль к Snowgrave)",
        "who": "noelle",
        "text": "* I.. I don't know that spell."
      },
      {
        "cond": "При flag[924] = 1 (2-я попытка принуждения)",
        "who": "noelle",
        "text": "* I'm telling you, I.. I..."
      },
      {
        "cond": "При flag[924] = 1 (2-я попытка принуждения)",
        "who": "noelle",
        "text": "* I don't know what you're talking about."
      },
      {
        "cond": "При flag[924] = 2 (3-я попытка принуждения)",
        "who": "noelle",
        "text": "* I'm telling you, stop!"
      },
      {
        "cond": "При flag[924] = 2 (3-я попытка принуждения)",
        "who": "noelle",
        "text": "* I... I don't know what you're talking about!"
      },
      {
        "cond": "При flag[924] ≥ 3 (Ноэль поддаётся)",
        "who": "noelle",
        "text": "* ..."
      },
      {
        "cond": "При flag[924] ≥ 3 (Ноэль поддаётся)",
        "who": "noelle",
        "text": "* Fine. You want to see what happens so bad?"
      },
      {
        "cond": "При flag[924] ≥ 3 (Ноэль поддаётся)",
        "who": "noelle",
        "text": "* Watch what happens when I cast a spell I don't know!"
      }
    ]
  },
  "925": {
    "detail": "Флаг считает применения IceShock Ноэль. На что влияет: каждое применение увеличивает счётчик (scr_spell), поднимает шкалу «Хладнокровность» (47 + 7 за применение, потолок 100 при значении 8+) и меняет титул Ноэль на «Frostmancer» (obj_darkcontroller_Draw). Важно: сама «Хладнокровность» — показатель-индикатор и на урон НЕ влияет. Урон IceShock = (магия−10)·30 + 90, а Snowgrave = магия·40 + 600 — то есть растут от МАГИИ Ноэль, а не от этого счётчика. Магия Ноэль повышается по числу боёв (scr_levelup даёт +1 магии каждые 4 боя, пока она в отряде) и в бою с Птицыным от действия «Сосредоточиться» (+3 за раз, на странном маршруте до 10 раз) — именно так Snowgrave доводится до смертельного урона.",
    "related": [
      915,
      921
    ],
    "lines": [
      {
        "cond": "При flag[925] = 0 (IceShock ещё не применялась) — титул «Снежный маг» (obj_darkcontroller)",
        "who": "narration",
        "text": "Снежный маг (УР1)#Умеет всякие обморо-#жительные штучки."
      },
      {
        "cond": "Подпись шкалы «Хладнокр.» в меню Ноэль (при любом значении)",
        "who": "narration",
        "text": "Хладнокр.:"
      }
    ]
  },
  "926": {
    "detail": "Инкремент global.flag[926]++ происходит при scr_monsterdefeat (ch2/ch3/ch4) и в обработчиках Other_13 у obj_queen_enemy, obj_spamton_neo_enemy (Гл.2) и obj_knight_enemy (Гл.3) — везде по условию global.flag[50] == 6. Рядом стоит логика global.flag[54]: при flag[54] != 0 значение flag[50] записывается в global.flag[global.flag[54]].",
    "related": [
      50,
      54
    ]
  },
  "928": {
    "detail": "Гл.2 (Мир света, больница). Этап сцены: насколько близко Крис подошёл к Ноэль во время её кошмара. На что влияет: в Гл.3/4 scr_text сверяет flag[928]<2 и меняет реплики. Контент рядом со Snowgrave-маршрутом."
  },
  "930": {
    "detail": "Флаг хранит факт получения яйца в Гл.3. «На что влияет: ставится в 1 при получении яйца от дерева-блока (obj_blocktree_dmg); затем учитывается в счётчиках яиц Гл.4 и в bonus фонтана пожертвований, а также включает реплику Тенны (obj_npc_room).»",
    "related": [
      911,
      918,
      898,
      799
    ],
    "lines": [
      {
        "cond": "При получении яйца (obj_blocktree_dmg, flag[930]: 0→1)",
        "who": "narration",
        "text": "ВОЗЬМИ ЭТО, ЧТОБЫ НЕ ЗАБЫТЬ МЕНЯ."
      },
      {
        "cond": "При получении яйца (obj_blocktree_dmg, flag[930]: 0→1)",
        "who": "narration",
        "text": "(КРИС ПОЛУЧАЕТ ЯЙЦО.)"
      },
      {
        "cond": "obj_npc_room (Тенна) при flag[930] > 0 (особая ветка реплик)",
        "who": "tenna",
        "text": "* Кроме астрологии."
      },
      {
        "cond": "obj_npc_room (Тенна) при flag[930] > 0 (особая ветка реплик)",
        "who": "tenna",
        "text": "* Ведь я, конечно же... Звезда."
      }
    ]
  },
  "931": {
    "detail": "Флаг хранит факт получения яйца в Гл.4. «На что влияет: ставится в 1 при получении яйца у Человека церкви (obj_dw_churchb_man), читается сценой пророчества (obj_dw_churchc_angelprophecy_encounter, переменная gotegg) и влияет на событие в obj_ch4_LWF03.»",
    "related": [
      911,
      918,
      930,
      1606
    ]
  },
  "941": {
    "related": [911, 918, 930, 931],
    "lines": [
      {
        "cond": "Если выбрать получить Яйцо (значение становится 1)",
        "who": "narration",
        "text": "* (You received the \"Egg\".)"
      }
    ]
  },
  "950": {
    "detail": "GlobalScript_scr_itemuse, case 313: ветка else if (global.flag[950] == 0) срабатывает, когда условие комнаты Кибермира не выполнено; ставится global.flag[950] = 1 и показывается текст без эффекта. Противоположный случай (в комнатах Кибермира) обрабатывает флаг 952.",
    "related": [
      952
    ],
    "lines": [
      {
        "cond": "При flag[950] = 0 — кристалл применён вне Кибермира (scr_itemuse case 313, эффекта нет, flag → 1)",
        "who": "narration",
        "text": "* Вы пристально вглядываетесь в кристалл."
      },
      {
        "cond": "При flag[950] = 0 — кристалл применён вне Кибермира (scr_itemuse case 313, эффекта нет, flag → 1)",
        "who": "narration",
        "text": "* ..и ничего не происходит."
      }
    ]
  },
  "951": {
    "detail": "GlobalScript_scr_litemuseb: ветка else if (global.flag[951] == 0) ставит global.flag[951] = 1 и показывает текст без эффекта. Случай со Сьюзи в отряде (scr_havechar(2)) обрабатывает флаг 953.",
    "related": [
      953
    ],
    "lines": [
      {
        "cond": "При flag[951]=0 без нужных условий (нет Сьюзи в отряде) — «Стекло» без эффекта (scr_litemuseb → 1)",
        "who": "narration",
        "text": "* Вы вглядываетесь в стекло."
      },
      {
        "cond": "При flag[951]=0 без нужных условий (нет Сьюзи в отряде) — «Стекло» без эффекта (scr_litemuseb → 1)",
        "who": "narration",
        "text": "* ..Но ничего не происходит."
      }
    ]
  },
  "952": {
    "detail": "GlobalScript_scr_itemuse, case 313: если room >= room_dw_cyber_intro_1 и global.flag[952] == 0 → global.flag[952] = 1 и показывается видение компьютерной лаборатории. Парный флаг 950 — тот же предмет вне Кибермира.",
    "related": [
      950
    ],
    "lines": [
      {
        "cond": "Гл.2: кристалл использован в Кибермире — видение (flag[952] = 0)",
        "who": "narration",
        "text": "* Вы пристально вглядываетесь в кристалл."
      },
      {
        "cond": "Гл.2: кристалл использован в Кибермире — видение (flag[952] = 0)",
        "who": "narration",
        "text": "* По какой-то причине всего на миг..."
      },
      {
        "cond": "Гл.2: кристалл использован в Кибермире — видение (flag[952] = 0)",
        "who": "narration",
        "text": "* You thought you saw the computer lab."
      }
    ]
  },
  "953": {
    "detail": "GlobalScript_scr_litemuseb, case 11: если scr_havechar(2) и global.flag[953] == 0 → global.flag[953] = 1 и показывается видение. Парный флаг 951 — тот же предмет без нужных условий.",
    "related": [
      951
    ],
    "lines": [
      {
        "cond": "При использовании «Стекла» со Сьюзи в отряде (953=0→1)",
        "who": "narration",
        "text": "* Вы вглядываетесь в стекло."
      },
      {
        "cond": "При использовании «Стекла» со Сьюзи в отряде (953=0→1)",
        "who": "narration",
        "text": "* По какой-то причине всего на миг..."
      },
      {
        "cond": "При использовании «Стекла» со Сьюзи в отряде (953=0→1)",
        "who": "narration",
        "text": "* You thought you saw Susie glaring at you, coldly..."
      },
      {
        "cond": "При использовании «Стекла» со Сьюзи в отряде (953=0→1)",
        "who": "narration",
        "text": "* But when you moved the glass away,"
      }
    ]
  },
  "954": {
    "detail": "Флаг отмечает передачу теневого кристалла Джевила Seam. «На что влияет: ставится в 1 в магазине Seam (obj_shop1_Draw) с удалением кристалла из ключевых предметов; влияет на реплики Seam о Shadow Crystal и связан с флагами 353/961, а в Гл.4 учитывается при проверке наличия теневого кристалла.»",
    "related": [
      241,
      353,
      460,
      961
    ],
    "lines": [
      {
        "cond": "Передача кристалла Seam (flag → 1)",
        "who": "seam",
        "text": "* You three defeated that clown last time, didn't you?"
      },
      {
        "cond": "Передача кристалла Seam (flag → 1)",
        "who": "seam",
        "text": "* ... Oh? What's that? It seems like he gave something to you."
      },
      {
        "cond": "При flag 1 и 961=0 — нет второго кристалла",
        "who": "seam",
        "text": "* ... It seems that you didn't get another Shadow Crystal."
      },
      {
        "cond": "Передача кристалла Seam (flag → 1)",
        "who": "seam",
        "text": "* Aha! Another Shadow Crystal! You found it..."
      }
    ]
  },
  "961": {
    "detail": "Глава 2 (obj_shop1_Draw): если global.flag[954]==1 и global.flag[961]==0 — Seam (scr_speaker(\"seam\")) говорит, что второго кристалла нет, после чего ставится global.flag[961]=1. Глава 4 (obj_shop1_Draw): при scr_flag_get(961)==0 в ветке, где есть оба кристалла (shadow_crystal_jevil и shadow_crystal_sneo) и global.flag[1047]==1, Seam прощается, и вызывается scr_flag_set(961,1). Одноразовая реплика.",
    "related": [
      954,
      353,
      1047,
      856
    ],
    "lines": [
      {
        "cond": "Гл.2 (obj_shop1): второй кристалл не добыт — прощание Seam (flag[954]=1 и flag[961]=0 → flag[961]=1)",
        "who": "seam",
        "text": "...It seems that you didn't get another Shadow Crystal."
      },
      {
        "cond": "Гл.2 (obj_shop1): второй кристалл не добыт — прощание Seam (flag[954]=1 и flag[961]=0 → flag[961]=1)",
        "who": "seam",
        "text": "Hm. I understand. It's no small feat to fight an opponent that has one."
      },
      {
        "cond": "Гл.2 (obj_shop1): второй кристалл не добыт — прощание Seam (flag[954]=1 и flag[961]=0 → flag[961]=1)",
        "who": "seam",
        "text": "Well then, forget it all."
      },
      {
        "cond": "Гл.2 (obj_shop1): второй кристалл не добыт — прощание Seam (flag[954]=1 и flag[961]=0 → flag[961]=1)",
        "who": "seam",
        "text": "You're a Lightner. Don't take your life, well, lightly!"
      },
      {
        "cond": "Гл.4 (obj_shop1): поражение от Рыцаря (flag[1047]=2) — Seam утешает (→ scr_flag_set(961,1))",
        "who": "seam",
        "text": "Don't have a long face, now. We all knew nothing would come of this."
      },
      {
        "cond": "Гл.4 (obj_shop1): поражение от Рыцаря (flag[1047]=2) — Seam утешает (→ scr_flag_set(961,1))",
        "who": "seam",
        "text": "But it was fun... to pretend it might, for a little while."
      },
      {
        "cond": "Гл.4 (obj_shop1): поражение от Рыцаря (flag[1047]=2) — Seam утешает (→ scr_flag_set(961,1))",
        "who": "seam",
        "text": "Thank you."
      }
    ]
  },
  "1000": {
    "detail": "Флаг отмечает забранный предмет из мусорного бака зоны B3. «На что влияет: задаётся через механику сундука/бака (obj_dw_ch3_b3bs_trashcan, itemflag=1000): 1 — предмет уже взят, бак пуст.»"
  },
  "1001": {
    "detail": "Флаг хранит стадию пирамидной головоломки Rouxls на поле. «На что влияет: 1 — головоломка запущена (obj_b1pyramid1), 2 — решена через шутку (obj_b1pyramid_rouxlsjoke), 3 — завершена и проход открыт (obj_b1pyramid2); 0 — сброс у магазина блоков (obj_b2pyramidrouxlsstore).»",
    "lines": [
      {
        "cond": "Запуск пирамидной головоломки (первый визит, ставит flag[1001]=1)",
        "who": "ralsei",
        "text": "Может, внутри есть#ещё меньше?"
      },
      {
        "cond": "Запуск пирамидной головоломки (первый визит, ставит flag[1001]=1)",
        "who": "rouxls",
        "text": "Ещё меньше пирамид#не бывает в природе!"
      }
    ]
  },
  "1002": {
    "detail": "obj_board_preshadowmantle: при global.flag[1002]==0 запускается задержка (scr_delay_var con); после показа реплик вызывается bw_make(), ставится global.flag[1002]=1 и scr_tempsave(). При повторном входе (Create при global.flag[1002]==1) вступительная сцена не проигрывается заново.",
    "lines": [
      {
        "cond": "При flag[1002]=0 — вступительная сцена перед боем с Теневой мантией (obj_board_preshadowmantle, con=2)",
        "who": "narration",
        "text": "Мне в темноте всё видно."
      },
      {
        "cond": "При flag[1002]=0 — вступительная сцена перед боем с Теневой мантией (obj_board_preshadowmantle, con=2)",
        "who": "narration",
        "text": "Вопрос лишь в том..."
      },
      {
        "cond": "При flag[1002]=0 — вступительная сцена перед боем с Теневой мантией (obj_board_preshadowmantle, con=2)",
        "who": "narration",
        "text": "Видно ли тебе?"
      }
    ]
  },
  "1003": {
    "detail": "obj_gameover_board (Create): при каждом проигрыше выполняется global.flag[1003]++, затем times_lost = global.flag[1003] (выводится debug_print «times lost:»). Накопленное число влияет на сцену наказания (punishment).",
    "related": [
      1022
    ]
  },
  "1004": {
    "detail": "Флаг отмечает забранное сокровище в лабиринте Shuttah. «На что влияет: ставится в 1 при открытии сундука в лабиринте (obj_dw_teevie_shuttahmaze); при загрузке комнаты с ==1 сундук уже открыт.»"
  },
  "1006": {
    "detail": "Флаг считает пройденные лесные комнаты-телепорты на пути Меча. «На что влияет: каждое посещение увеличивает счётчик (obj_board_swordroute_treeteleportroom) и спавнит помощника-дерево; по достижении 4 появляется ледяной ключ.»"
  },
  "1007": {
    "detail": "Гл.3 (sword route). obj_b2s/obj_b3s/obj_board_1_sword_manager (Create): при global.flag[1007]==0 && global.swordboardeath==0 запускается логика менеджера меча на площадке; флаг отмечает пройденное состояние пути Меча. На что влияет: состояние/повтор сцены пути Меча. Связь: 1656 (Sword Route Гл.4), 1268.",
    "related": [
      1268,
      1656
    ]
  },
  "1008": {
    "detail": "obj_board_1_sword_shadowtease (Step): при касании obj_mainchara_board ставится global.flag[1008]=1, играет звук snd_board_mantle_move, объект подпрыгивает (vspeed=-8). В Create при global.flag[1008]==1 объект сразу уничтожается (instance_destroy) — сцена не повторяется.",
    "fx": {
      "frames": [
        "game-sprites/flagfx/spr_shadow_mantle_idle_0.png",
        "game-sprites/flagfx/spr_shadow_mantle_idle_1.png",
        "game-sprites/flagfx/spr_shadow_mantle_idle_2.png",
        "game-sprites/flagfx/spr_shadow_mantle_idle_3.png",
        "game-sprites/flagfx/spr_shadow_mantle_idle_4.png",
        "game-sprites/flagfx/spr_shadow_mantle_idle_5.png"
      ],
      "scale": 2,
      "speed": 140
    },
    "related": [
      1009,
      1010
    ]
  },
  "1009": {
    "detail": "obj_board_sword_shadowtease_face (Step): при timer==1 ставится global.flag[1009]=1, image_alpha=1 и играет звук snd_face_hit. В Create при global.flag[1009]==1 объект сразу уничтожается (instance_destroy).",
    "fx": {
      "frames": [
        "game-sprites/flagfx/spr___eyes_0.png"
      ],
      "scale": 2,
      "speed": 600,
      "big": true,
      "blink": true
    },
    "related": [
      1008,
      1010
    ]
  },
  "1010": {
    "detail": "obj_board_sword_shadowtease_teeth (Step): при con==2 ставится global.flag[1010]=1, играет звук snd_face_hit и создаётся маркер spr___laugh (scr_board_marker), объект скрывается. В Create при global.flag[1010]==1 объект сразу уничтожается (instance_destroy).",
    "fx": {
      "frames": [
        "game-sprites/flagfx/spr___laugh_0.png",
        "game-sprites/flagfx/spr___laugh_1.png",
        "game-sprites/flagfx/spr___laugh_2.png",
        "game-sprites/flagfx/spr___laugh_3.png",
        "game-sprites/flagfx/spr___laugh_4.png",
        "game-sprites/flagfx/spr___laugh_5.png",
        "game-sprites/flagfx/spr___laugh_6.png",
        "game-sprites/flagfx/spr___laugh_7.png",
        "game-sprites/flagfx/spr___laugh_8.png",
        "game-sprites/flagfx/spr___laugh_9.png"
      ],
      "scale": 2,
      "speed": 140,
      "big": true
    },
    "related": [
      1008,
      1009
    ]
  },
  "1012": {
    "detail": "Флаг хранит первую букву имени для телеигры на поле Гл.3. «На что влияет: вместе с 1013/1014 формирует имя, показываемое на поле/табло квиза (obj_quiz_podium, scr_gameshowname); по умолчанию K-R-S (KRIS), резервируется в 1274-1276, для японского кодируется через scr_ja_alphanumericarray_check. В редакторе выбирается буквой A-Z.»",
    "related": [
      1013,
      1014,
      1273,
      1274,
      1275,
      1276
    ]
  },
  "1013": {
    "detail": "Флаг хранит вторую букву имени для телеигры на поле Гл.3. «На что влияет: вместе с 1012/1014 формирует имя на поле/табло квиза (obj_quiz_podium, scr_gameshowname); по умолчанию R (KRIS), резервируется в 1275, для японского кодируется через scr_ja_alphanumericarray_check. В редакторе выбирается буквой A-Z.»",
    "related": [
      1012,
      1014,
      1273,
      1274,
      1275,
      1276
    ]
  },
  "1014": {
    "detail": "Хранит третью букву имени, введённого на телеигре Тенны. «На что влияет: вместе с 1012 (первая буква) и 1013 (вторая) формирует отображаемое имя в scr_gameshowname(); в scr_load/obj_ch3_PGS01A синхронизируется с резервной копией 1276 и флагом раскладки 1273, поэтому при правке стоит менять и эти связанные индексы. Рендерится селектом A–Z на поле.»",
    "related": [
      1012,
      1013,
      1273,
      1276
    ]
  },
  "1015": {
    "detail": "obj_mainchara_board (Step): если name==\"ralsei\", существует объект stool (i_ex(stool)) и global.flag[1015]==0, и камера занята (obj_board_camera.con != 0) — Ральзей перемещается к табурету (setxy(stool.x, stool.y))."
  },
  "1017": {
    "detail": "Хранит, кого из парочки на обрыве предпочёл игрок. «На что влияет: определяет спрайты грустной фигуры (spr_board_lanino_sad_right / spr_board_elnina_sad_right в obj_b2loverscliff), реплики obj_board_sadfriendo и итоговую награду в obj_board_sadfriendo (substring 'LANINO'/'ELNINA' → 'YOU GOT.'). Сцена поля (gameshow board) — событие об-рыва влюблённых.»",
    "lines": [
      {
        "cond": "Сцена обрыва влюблённых — причитания грустной фигуры (Гл.3, obj_board_sadfriendo)",
        "who": "narration",
        "text": "* БЕЗ ПУТЕВОДНОГО СВЕТА ЛЮБВИ..."
      },
      {
        "cond": "Сцена обрыва влюблённых — причитания грустной фигуры (Гл.3, obj_board_sadfriendo)",
        "who": "narration",
        "text": "* ЖИЗНЬ МОЯ УТЕРЯНА В МОРЕ, СЛОВНО СЛЁЗЫ В ДОЖДЕ,"
      },
      {
        "cond": "При flag[1017] = 0 (предпочтена Эльнина → грустит Ланино) — реплика Ланино",
        "who": "lanino",
        "text": "* ЛАДНО, ЖИВЁМ ОДИН РАЗ."
      }
    ]
  },
  "1019": {
    "detail": "Счётчик правильных ответов викторины. «На что влияет: задаёт бонус/штраф очков по итогам викторины (obj_quizsequence_Draw, bonus_total при <4) и развилку у Сфинкса-Тенны (obj_board_event_sphinx_tenna: при >3 — похвала и переход con=12). Чисто числовое значение, формируется автоматически из ответов отряда.»",
    "lines": [
      {
        "cond": "obj_board_event_sphinx_tenna при flag[1019] > 3 (похвала Сфинкса-Тенны, con=12)",
        "who": "tenna",
        "text": "* ОТЛИЧНО. ЗА ОТВЕТ НА ВОПРОС — ПОЛУЧИТЕ НОС!"
      }
    ]
  },
  "1020": {
    "detail": "obj_mainchara_board (Create): global.flag[1020]=1, если room != room_board_1, иначе 0. Читается в загадках поля: obj_b1cactusfield2, obj_b1pushpyramid, obj_b1quiz (при 0 weedcount обнуляется; при 1 объекты obj_board_grabbleObject можно хватать) и obj_b1lancer (при 1 показывается подсказка о захвате susiegrabhint и lancereasteregg=999).",
    "related": [
      1022
    ]
  },
  "1021": {
    "detail": "obj_ch3_couch: finished_walking = scr_flag_get(1021)==1; пока диван не ушёл, создаётся couch_marker (spr_dw_couch_walk). В Step при obj_mainchara.x<850 и scr_flag_get(1021)==0 вызывается scr_flag_set(1021,1). obj_ch3_PGS01A в Create при scr_flag_get(1021)==0 выставляет con=99/left_couch. При flag[1021]==1 obj_readable_room1 показывает readable-текст про диван.",
    "lines": [
      {
        "cond": "Осмотр «переносного дивана» (obj_readable_room1, flag[1021]=1)",
        "who": "narration",
        "text": "* (Это переносной диван.)"
      },
      {
        "cond": "Осмотр «переносного дивана» (obj_readable_room1, flag[1021]=1)",
        "who": "narration",
        "text": "* (Переносит он, видимо, сам себя.)"
      }
    ]
  },
  "1022": {
    "detail": "GlobalScript tennahere() возвращает true при global.flag[1022]==0. obj_battlecontroller (Create) создаёт obj_tennabattleconvo_controller только при flag[1022]==0 (на room_board_1/2/3). obj_quizchaser_spawner: при flag[1022]==1 и reqtenna стычка не создаётся (make=false). scr_resetgameshowcharacter меняет координаты/спрайт Тенны (obj_actor_tenna) в зависимости от 1022. obj_gameover_board подменяет реплику при flag[1022]==1. obj_board_event_ninfight сбрасывает global.flag[1022]=0.",
    "related": [
      1003,
      1017,
      1020
    ],
    "lines": [
      {
        "cond": "При flag[1022]=0 (Тенна на площадке) — сцена с Тенной",
        "who": "susie",
        "text": "Блин, а я второго Лансера хотела."
      },
      {
        "cond": "При flag[1022]=0 (Тенна на площадке) — сцена с Тенной",
        "who": "tenna",
        "text": "Два?! Мне такого профсоюз не позволит!"
      },
      {
        "cond": "При flag[1022]=0 (Тенна на площадке) — сцена с Тенной",
        "who": "tenna",
        "text": "Поздравляю, ребята! Вы это заслужили!"
      },
      {
        "cond": "При flag[1022]=1 (Тенна ушёл) — изменённая реплика проигрыша (obj_gameover_board)",
        "who": "narration",
        "text": "* Ну как так! Я ТОЛЬКО вышел, а мне уже говорят, что вы проиграли!!"
      }
    ]
  },
  "1023": {
    "detail": "В obj_mainchara_board_Step логика захвата проверяет `if (!controlled || global.flag[1023] == 1)`. Сбрасывается в 0 при инициализации зон (obj_b2intro_Create, obj_b3bintro_Create, конец головоломки моста obj_b2bridgepuzzle1_Step) и ставится в 1 в obj_b3intro_Create. Чисто состояние сцены, не сюжетный прогресс.",
    "related": [
      1024,
      1052,
      1055
    ]
  },
  "1024": {
    "detail": "Ставится в 1 на время скриптовых сцен (obj_b2fashionshop2, obj_b3grassjoke, obj_b1bonuszone, obj_b2bridgepuzzle1) и сбрасывается в 0 по их завершении (obj_b2ralseichoose, obj_b2enrichmentenclosure, obj_b3grassjoke). obj_board_camera_Step при con==99 ждёт `global.flag[1024]==0`, чтобы вызвать scr_resetgameshowcharacter для kris/susie/ralsei. 24 ссылки в коде — типичный флаг управления катсценами на поле.",
    "related": [
      1023,
      1037
    ],
    "lines": [
      {
        "cond": "Гл.3: бонус-зона телешоу — катсцена (Сьюзи/Тенна, flag 1024)",
        "who": "susie",
        "text": "Чё? По одному очку?!"
      },
      {
        "cond": "Гл.3: бонус-зона телешоу — катсцена (Сьюзи/Тенна, flag 1024)",
        "who": "tenna",
        "text": "Что?! Бюджет не резиновый!"
      }
    ]
  },
  "1025": {
    "detail": "В obj_board_pickup_Step при подборе предмета типа \"key\" одновременно увеличиваются obj_board_inventory.keycount, global.flag[1025] и global.flag[1122]. Обнуляется в obj_b1intro_Create при старте зоны. Это число (накопитель), а не переключатель.",
    "related": [
      1122
    ]
  },
  "1026": {
    "detail": "Отмечает наличие крюка-кошки на поле. «На что влияет: при ==1 в obj_mainchara_board включается возможность подтягиваться крюком (через hookbuff), что открывает перемещение по полю (gameshow board). При 0 механика недоступна.»"
  },
  "1027": {
    "detail": "В obj_dw_changing_room_stars_Step по таймеру падения (star_fall_timer==16) проигрывается snd_splat, звезда прячется (visible=0) и вызывается `scr_flag_set(1027, 1)`. В Create событие падения активно только если `scr_flag_get(1027) == 0` (тогда создаётся floor_cover/звезда). Крис — всегда «Крис»."
  },
  "1029": {
    "detail": "Хранит этап «сдвига» Рамба в гримёрке. «На что влияет: управляет тем, отодвинулся ли Рамб (is_moved в obj_room_changing_room) и открыт ли проход к консольной комнате (obj_room_console_room block_door по >=1 при plot<280 и по >=2 при plot>=150); реплики Рамба в obj_npc_ramb зависят от значения. Связан с plot и флагом 1266.»",
    "related": [
      1266,
      1055
    ],
    "lines": [
      {
        "cond": "Рамб до сдвига (о «свободе»)",
        "who": "ramb",
        "text": "* Ох, Крис... Поживи наше — и поймёшь..."
      },
      {
        "cond": "Рамб до сдвига (о «свободе»)",
        "who": "ramb",
        "text": "* Что свобода — привилегия лишь больших шишек."
      },
      {
        "cond": "Рамб при сдвиге (открывает проход, «Тенне — ни-ни»)",
        "who": "ramb",
        "text": "* Я так рад, что тебе нравится, Крис. Это меньшее, что я могу тебе дать."
      },
      {
        "cond": "Рамб при сдвиге (открывает проход, «Тенне — ни-ни»)",
        "who": "ramb",
        "text": "* Вуаля! Помнишь: Тенне — ни-ни!"
      }
    ]
  },
  "1035": {
    "detail": "Отмечает победу в гоночной мини-игре грин-рума. «На что влияет: при ==1 считается, что гонка пройдена — отключается приглашение сыграть (obj_readable_room1 msc 1262 при 0) и проигрывается катсцена с репликами Ральзея и Сьюзи (obj_ch3_green_room_racing). Связан с флагом 1034.»",
    "related": [
      1034
    ],
    "lines": [
      {
        "cond": "Осмотр гоночного автомата (obj_readable_room1 «racing») — Сьюзи отказывается играть",
        "who": "susie",
        "text": "* Не, я наигралась."
      },
      {
        "cond": "После победы в гонке (flag → 1) — катсцена (obj_ch3_green_room_racing)",
        "who": "ralsei",
        "text": "* Крис, у тебя получилось!"
      },
      {
        "cond": "После победы в гонке (flag → 1) — катсцена (obj_ch3_green_room_racing)",
        "who": "susie",
        "text": "* Как вообще... ладно, пока хватит."
      }
    ]
  },
  "1036": {
    "detail": "Определяет вариант брони «Магнитный камень». «На что влияет: меняет описание предмета (desc_text) и осмотр-реплики Сьюзи/Ральзея/Ноэль в scr_armorinfo (amessage2temp и др.); сами статы одинаковы (пули врагов дают больше ПН). Используется при показе брони в меню.»",
    "lines": [
      {
        "cond": "При flag[1036] = 0 — осмотр брони «Магнитный камень», вид раковины улитки (scr_armorinfo case 24)",
        "who": "narration",
        "text": "* Магнитный камень в виде панциря улитки.#Пули врагов дают больше ПН."
      },
      {
        "cond": "При flag[1036] = 0 — осмотр брони «Магнитный камень», вид раковины улитки (scr_armorinfo case 24)",
        "who": "susie",
        "text": "* Улитки?.. ужасно."
      },
      {
        "cond": "При flag[1036] = 0 — осмотр брони «Магнитный камень», вид раковины улитки (scr_armorinfo case 24)",
        "who": "ralsei",
        "text": "* Ничего против улиток не имею!"
      },
      {
        "cond": "При flag[1036] = 0 — осмотр брони «Магнитный камень», вид раковины улитки (scr_armorinfo case 24)",
        "who": "noelle",
        "text": "* Твоя мама съела всё, кроме панциря?"
      }
    ]
  },
  "1037": {
    "detail": "В obj_darkcontroller_Step (Гл.3 и Гл.4) при `wwho == 3 && newequip == 26` выполняется `if (global.flag[1037] < 15) global.flag[1037]++`. В scr_armorinfo выбор реплики: `amessage3temp = ral_text_lines[global.flag[1037]]` — индекс в массиве из 16 строк-кричалок. Это накопитель 0.15, а не переключатель.",
    "related": [
      1024
    ],
    "lines": [
      {
        "cond": "При 1037=0 (1-я кричалка Ральзея)",
        "who": "ralsei",
        "text": "Дай-ка мне К! Дай-ка Р!"
      },
      {
        "cond": "При 1037=1",
        "who": "ralsei",
        "text": "Дай-ка мне И! Дай-ка С!"
      },
      {
        "cond": "При 1037=2",
        "who": "ralsei",
        "text": "Дай-ка пустой кубик!"
      },
      {
        "cond": "При 1037=13",
        "who": "ralsei",
        "text": "Э-э, вот и всё!"
      },
      {
        "cond": "При 1037=14",
        "who": "ralsei",
        "text": "В... всё, больше не надо!"
      },
      {
        "cond": "При 1037=15 (последняя кричалка)",
        "who": "ralsei",
        "text": "ДА!"
      },
      {
        "cond": "Фиксированная реплика (не зависит от счётчика)",
        "who": "ralsei",
        "text": "Вперёд... к... команда?"
      }
    ]
  },
  "1039": {
    "detail": "В obj_ch3_closet_Step при первом осмотре комода `scr_flag_set(1039, 1)` и создаётся pipis-маркер/коллайдер (если не сработал флаг 1151). В obj_readable_room1_Other_10 при `scr_flag_get(1039) == 1` и подходе (y>175) вызывается scr_itemget_anytype_text(35,\"item\"), проигрывается snd_item и ставится `scr_flag_set(1039, 2)`. В Create комода стадии 1/2 восстанавливают вид ящика (drawer.image_index=1).",
    "related": [
      1151
    ],
    "lines": [
      {
        "cond": "Повторный осмотр комода после взятия предмета (obj_ch3_closet both_talk, flag[1039]=2) — реплика Крис",
        "who": "kris",
        "text": "* (Зачем...)"
      },
      {
        "cond": "Осмотр гардероба после события (obj_readable_room1, extflag «wardrobe»)",
        "who": "narration",
        "text": "* (Больше нет смысла туда смотреть.)"
      }
    ]
  },
  "1040": {
    "detail": "Совмещает фото героя и прогресс кладов на поле. «На что влияет: в obj_board_treasuremarker определяет, какие ямы-клады уже найдены (skip при holeid и пороге значения) и поднимается до 3 при выкапывании всех; в obj_b2camera вместе с 1041/1042 (фото) триггерит создание writer и подготовку битвы (prebat). Прогресс события поля (gameshow board).»",
    "related": [
      1041,
      1042
    ]
  },
  "1041": {
    "detail": "Отмечает снятое фото полуцветка. «На что влияет: входит в photocount (1041+1042+1043+1227) — по нему открывается вход в пантеон (obj_b2pantheonentrance, нужно >=3), рисуется счётчик фото (obj_board_inventory) и скрываются NPC-подсказки (b2photohint*); полный набор из 4 фото даёт секретный предмет в оценке раунда (obj_round_evaluation/obj_minigame_evaluation). Часть набора фото камеры на поле.»",
    "related": [
      1040,
      1042,
      1043,
      1227
    ],
    "lines": [
      {
        "cond": "Вступление островного игрового поля (Гл.3)",
        "who": "narration",
        "text": "* ДОБРО ПОЖАЛОВАТЬ НА ОСТРОВНОЕ ИГРОВОЕ ПОЛЕ!"
      },
      {
        "cond": "Вступление островного игрового поля (Гл.3)",
        "who": "narration",
        "text": "* НА СЕВЕРЕ ВАС ЖДЁТ АТЛАНТИДА."
      },
      {
        "cond": "Вступление островного игрового поля (Гл.3)",
        "who": "narration",
        "text": "* НО РАДУЖНЫЙ МОСТ ОТ- КРОЕТСЯ ЛИШЬ БЛАГОДАРЯ ДВУМ ВЛЮБЛЁННЫМ."
      }
    ]
  },
  "1042": {
    "detail": "Отмечает снятое весеннее фото. «На что влияет: входит в photocount (1041+1042+1043+1227) для открытия пантеона (>=3), счётчика фото и скрытия подсказок (b2photohint2/3); вместе с остальными тремя фото (==4) даёт секретный предмет в obj_round_evaluation/obj_minigame_evaluation. Часть набора фото камеры на поле.»",
    "related": [
      1040,
      1041,
      1043,
      1227
    ],
    "lines": [
      {
        "cond": "Поле острова (Гл.3, b2intro): вступительная табличка (фото входит в photocount)",
        "who": "narration",
        "text": "* ДОБРО ПОЖАЛОВАТЬ НА ОСТРОВНОЕ ИГРОВОЕ ПОЛЕ!"
      },
      {
        "cond": "Поле острова (Гл.3, b2intro): вступительная табличка (фото входит в photocount)",
        "who": "narration",
        "text": "* НА СЕВЕРЕ ВАС ЖДЁТ АТЛАНТИДА."
      },
      {
        "cond": "Поле острова (Гл.3, b2intro): вступительная табличка (фото входит в photocount)",
        "who": "narration",
        "text": "* НО РАДУЖНЫЙ МОСТ ОТ- КРОЕТСЯ ЛИШЬ БЛАГОДАРЯ ДВУМ ВЛЮБЛЁННЫМ."
      }
    ]
  },
  "1043": {
    "detail": "Отмечает снятое фото кактуса. «На что влияет: входит в photocount (1041+1042+1043+1227) — открытие пантеона (>=3), счётчик фото камеры (obj_board_inventory), скрытие подсказки b2photohint3; вместе с остальными фото (==4) выдаёт секретный предмет в obj_round_evaluation. Часть набора фото камеры на поле.»",
    "related": [
      1040,
      1041,
      1042,
      1227
    ],
    "lines": [
      {
        "cond": "Гл.3 (obj_board_npc): объявление островного игрового поля",
        "who": "narration",
        "text": "* ДОБРО ПОЖАЛОВАТЬ НА ОСТРОВНОЕ ИГРОВОЕ ПОЛЕ!"
      },
      {
        "cond": "Гл.3 (obj_board_npc): объявление островного игрового поля",
        "who": "narration",
        "text": "* НА СЕВЕРЕ ВАС ЖДЁТ АТЛАНТИДА."
      },
      {
        "cond": "Гл.3 (obj_board_npc): объявление островного игрового поля",
        "who": "narration",
        "text": "* НО РАДУЖНЫЙ МОСТ ОТ- КРОЕТСЯ ЛИШЬ БЛАГОДАРЯ ДВУМ ВЛЮБЛЁННЫМ."
      }
    ]
  },
  "1044": {
    "detail": "Баланс очков телешоу (PTs). «На что влияет: цена покупок в автомате (obj_shop_vending), разблокировка Сьюзиллы за 500 (obj_room_ranking_a), показ баланса на экране (\"N PTs\"), а при проигрыше — тип реплики Тенны и величина наказания (obj_gameover_board, punishment=floor(1044/3), при проигрыше начисляется 100 утешительных очков). Числовое значение валюты Гл.3.»",
    "lines": [
      {
        "cond": "При проигрыше на поле (1-й раз) — реакция Тенны",
        "who": "tenna",
        "text": "* Серьёзно?!.. Вы умудрились ПРОИГРАТЬ?!"
      },
      {
        "cond": "При повторном проигрыше (times_lost>1) — реакция Тенны",
        "who": "tenna",
        "text": "* Снова ПРОИГРЫШ, снова НАКАЗАНИЕ!!!"
      },
      {
        "cond": "При проигрыше — начислены 100 утешительных очков",
        "who": "narration",
        "text": "* (В качестве утешительного приза вы получили 100 ОЧКОВ.)"
      },
      {
        "cond": "Реплика торгового автомата (obj_shop_vending)",
        "who": "narration",
        "text": "* Автомат улыбнулся."
      }
    ]
  },
  "1045": {
    "detail": "Прокачка целебного заклинания СЬЮЗИ (spell 11 в scr_spell). На что влияет: с ростом значения больше лечения и ниже цена («UltraHeal»/«BetterHeal»); в Гл.4 связано с obj_sound_of_justice_enemy и flag[1569] (заклинание топора усиливает). Макс.: Гл.3 = 5, Гл.4 = 15.",
    "related": [
      1569
    ],
    "lines": [
      {
        "cond": "Меню заклинаний (Гл.3): «UltraHeal» Сьюзи — показывается всегда (цена зависит от flag[1045])",
        "who": "narration",
        "text": "* Ультрахил"
      },
      {
        "cond": "Меню заклинаний (Гл.3): «UltraHeal» Сьюзи — показывается всегда (цена зависит от flag[1045])",
        "who": "narration",
        "text": "* Крутое лечебное заклинание?.."
      }
    ]
  },
  "1047": {
    "detail": "Хранит исход боя с Ревущим Рыцарём. «На что влияет: при ==1 Крис получает Теневой Кристалл (scr_keyiteminfo crystal_amount++, scr_get_shadow_crystal(3) в Гл.4) и Seam (obj_shop1) хвалит матч; при ==2 кристалла нет и Seam утешает; DEVICE_FAILURE при поражении ставит 2 и plot=320. Дублируется в dr.ini (UraBoss).»",
    "related": [
      50,
      309
    ],
    "lines": [
      {
        "cond": "При 1 (победа — Seam хвалит матч)",
        "who": "seam",
        "text": "* Oh, it must've been a terrific match! If only I could've witnessed it..."
      },
      {
        "cond": "При 2 (поражение — Seam утешает)",
        "who": "seam",
        "text": "* Ah, I know what you're going to say. Now, now, there's no shame in it."
      }
    ]
  },
  "1048": {
    "detail": "Хранит стоимость выкупа Лансера на поле. «На что влияет: задаётся при покупке Лансера (obj_board_store_key: 1048=cost, плюс прибавка к 1117); в obj_b2savelancer по порогу <999 определяется набор реплик Лансера и итоговая строка магазина. Числовое значение цены.»",
    "related": [
      1117
    ],
    "lines": [
      {
        "cond": "Выкуп Лансера дёшево (flag[1048]<999) — благодарность Лансера (obj_b2savelancer)",
        "who": "lancer",
        "text": "* ХО-ХО! ДРУЗЕЙ НЕ КУПИШЬ..."
      },
      {
        "cond": "Выкуп Лансера дёшево (flag[1048]<999) — благодарность Лансера (obj_b2savelancer)",
        "who": "lancer",
        "text": "* НО ЕСЛИ ПРИХОДИТСЯ, ТО ХОРОШО, ЧТО ВЫШЛО НЕДОРОГО!"
      },
      {
        "cond": "Выкуп Лансера дёшево (flag[1048]<999) — благодарность Лансера (obj_b2savelancer)",
        "who": "lancer",
        "text": "* В КОШЕЛЬКЕ КОПАТЬСЯ НЕ НАДО, ЗНАЧИТ, ПОКОПАЕМ ЧТО-НИБУДЬ ДРУГОЕ."
      }
    ]
  },
  "1049": {
    "detail": "Гл.3 (Телешоу Тенны). Счётчик боёв на «поле» 1; индексирует battlegrade. На что влияет: в Гл.4 obj_minigame_evaluation/obj_round_evaluation читают как totalbattles (оценка)."
  },
  "1050": {
    "detail": "Отмечает победу над Shadow Mantle. «На что влияет: при ==1 в боях с Тенной выставляется didkrisdoswordroute=true (obj_tenna_board4_enemy, obj_tenna_enemy), меняется состояние гримёрки (obj_room_changing_room) и реплики осматриваемых объектов (obj_readable_room1). Веха пути Меча.»",
    "related": [
      1055,
      1029
    ],
    "lines": [
      {
        "cond": "При победе над Shadow Mantle — осмотр гримёрки (флаг = 1)",
        "who": "narration",
        "text": "* (За занавеской кто-то есть...)"
      }
    ]
  },
  "1052": {
    "detail": "В obj_b3grassjoke_Step при `grasspullcount >= 4` ставится `global.flag[1052] = 1` (debug_print «enough grass»). obj_b3dock1_Step и obj_b3dock2_Step ведут Сьюзи к цели через scr_pathfind_to_point только пока `global.flag[1052] == 0`. Сбрасывается в 0 в obj_b3intro_Create.",
    "related": [
      1024
    ]
  },
  "1053": {
    "detail": "Весь код флага в obj_ch3_gameshow_Step обёрнут в `if (room == room_board_3 && scr_debug())`. По хоткею (W+R) ставится 1; при `flag[1053]==1 && obj_board_camera.con==0` сбрасывается в 0 и запускается scr_board_instawarp с удалением obj_b3elevator. Это служебный/отладочный флаг, в обычной игре не используется."
  },
  "1055": {
    "detail": "Сквозной прогресс маршрута Меча. «На что влияет: включает сам маршрут (obj_puzzlecloset_manager: swordroute при >0), управляет появлением дверей/предметов и реплик (obj_room_green_room по >=1/>=3, obj_npc_ramb по 1/3), стартовой позицией камеры (obj_board_camera при ==6) и финальными головоломками (>=6). Тесно связан с plot и флагами Shadow Mantle.»",
    "related": [
      1050,
      1067,
      1185,
      1173
    ],
    "lines": [
      {
        "cond": "Реплика Рамба по ходу маршрута Меча (obj_npc_ramb)",
        "who": "ramb",
        "text": "* Ох, Крис... Поживи наше — и поймёшь..."
      },
      {
        "cond": "Реплика Рамба по ходу маршрута Меча (obj_npc_ramb)",
        "who": "ramb",
        "text": "* Вот бы оценка S была у тебя раньше..."
      },
      {
        "cond": "При использовании Ключа убежища (1055→5)",
        "who": "narration",
        "text": "* ИСПОЛЬЗОВАН КЛЮЧ ОТ УБЕЖИЩА."
      },
      {
        "cond": "После получения меча (1055=6) — указание идти к Северному сиянию",
        "who": "narration",
        "text": "* НАПРАВЛЯЙТЕСЬ К#СЕВЕРНОМУ СИЯНИЮ"
      }
    ]
  },
  "1056": {
    "detail": "В obj_room_stage_Step при завершении сцены (con==24, когда нет obj_cutscene_master) выполняется `scr_flag_set(1056, 1)`. В obj_room_stage_Create и obj_room_interstitial_Create при `scr_flag_get(1056) == 0` сцена/чёрный экран и prompt_id=1375 ставятся заново (запуск катсцены при входе). Крис — всегда «Крис»."
  },
  "1057": {
    "detail": "В obj_b3bs_introscene_Create проверка идёт только при plot>=200. В obj_ch3_GSC04_Create при 1057==1 и 1085==0 гусеница не следует за Крис (follow=0). Значение задаётся только переходом 1→2 — стартовая 1 ставится в другом месте сценария.",
    "related": [
      1085
    ]
  },
  "1058": {
    "detail": "В obj_b2s_tennamonologue_Step при con==1: global.flag[1058]=1, затем scr_speaker(\"no_name\") и серия реплик.",
    "lines": [
      {
        "cond": "Монолог Тенны (obj_b2s_tennamonologue, con==1, flag[1058] ставится в 1)",
        "who": "tenna",
        "text": "PHEW! FINALLY, SOME PEACE AND QUIET!"
      },
      {
        "cond": "Монолог Тенны (obj_b2s_tennamonologue, con==1, flag[1058] ставится в 1)",
        "who": "tenna",
        "text": "... I WONDER… IF THEY EVEN LIKE THE GAME...?"
      },
      {
        "cond": "Монолог Тенны (obj_b2s_tennamonologue, con==1, flag[1058] ставится в 1)",
        "who": "tenna",
        "text": "I'M TRYING MY BEST TO MAKE IT FUN, BUT..."
      }
    ]
  },
  "1059": {
    "detail": "Хранит исход боя с Руулсом в GSC04B. «На что влияит: при >0 убирается NPC Руулса (obj_dw_b3bs_rouxls_lanina) и считается, что событие пройдено; при ==0 остаётся пазл-пруд. Значение берётся из общего результата боя global.flag[50].»",
    "related": [
      50
    ]
  },
  "1060": {
    "detail": "Отмечает получение контроллера Эльнины. «На что влияет: при ==0 в obj_ch3_GSC04B рисуется блик-подсказка над контроллером и NPC Эльнина/Ланино произносят благодарность за бой (obj_npc_room); при ==1 (выдан key item 16) подсказка и реплики снимаются. Часть головоломки с ID-картой.»",
    "lines": [
      {
        "cond": "Контроллер Эльнины ещё не получен (flag[1060]=0): благодарность за бой (Гл.3)",
        "who": "narration",
        "text": "* Thank you in that battle there. You were an oasis..."
      },
      {
        "cond": "Контроллер Эльнины ещё не получен (flag[1060]=0): благодарность за бой (Гл.3)",
        "who": "narration",
        "text": "* Oh, the Key Card?"
      }
    ]
  },
  "1062": {
    "detail": "Отмечает получение оружия Saber10 из-за занавеса. «На что влияет: при ==0 (и plot<150) осмотр правого занавеса выдаёт Saber10 и поднимает флаг; при ==1 предмет уже взят и сцена меняется. Привязано к зоне «curtain_right» в гримёрке.»",
    "lines": [
      {
        "cond": "При flag[1062] = 0 — осмотр правого занавеса в гримёрке (plot < 150)",
        "who": "narration",
        "text": "* (Стоящий за занавеской оттолкнул вас...)"
      },
      {
        "cond": "При flag[1062] = 0 — осмотр правого занавеса в гримёрке (plot < 150)",
        "who": "narration",
        "text": "* (Получена шипага.)"
      }
    ]
  },
  "1067": {
    "detail": "Отмечает получение брони Shadow Mantle. «На что влияет: при 0 (и 1055>=6, plot>=280) в грин-руме спавнится сундук с бронёй 23 (obj_treasure_room itemflag=1067); после взятия флаг становится 1 и сундук больше не появляется. Награда пути Меча.»",
    "related": [
      1055
    ]
  },
  "1068": {
    "detail": "Отмечает катсцену с Лансером в грин-руме. «На что влияет: при ==1 убирается NPC Лансера (obj_room_green_room_Create) и считается, что проход (obj_doorAny) уже открыт; до этого сцена проигрывается и в конце ставит флаг. Веха грин-рума.»"
  },
  "1071": {
    "detail": "Проспал ли Крис вступление Тенны (заснул на диване в начале Ch3). Сьюзи уходит, и вы просыпаетесь под позднее приветствие Тенны вместо показа шоу.",
    "related": [],
    "lines": [
      {
        "cond": "Крис засыпает на диване — вступление Тенны (флаг→1)",
        "who": "susie",
        "text": "Dude, you're gonna sleep through THE DARK WORLD?"
      }
    ]
  },
  "1073": {
    "detail": "Хранит «правильный» вариант имени Лансера для викторины. «На что влияет: задаёт догадку Ральзея и эталонный ответ в scr_quiztext (вопрос lancer2), определяя, какой вариант считается верным. Значение приходит из ralseicoord в obj_quizsequence.»",
    "related": [
      1019
    ],
    "lines": [
      {
        "cond": "Викторина Тенны: вопрос об имени Лансера (scr_quiztext «lancer2»)",
        "who": "narration",
        "text": "* СЕРЬЁЗНО, ДА КАК ЕГО ЗОВУТ?!"
      }
    ]
  },
  "1074": {
    "detail": "Отмечает сдвиг стража Заппера на первом этапе рейтинга. «На что влияет: при ==1 (и plot>=120) Заппер убирается и проход в комнате-перемычке открыт (is_moved в obj_room_inbetween); на этапе plot>=160 эту роль перенимает флаг 1075. Привязано к стадии рейтинга телешоу.»",
    "related": [
      1075
    ]
  },
  "1075": {
    "detail": "Отмечает сдвиг стража на втором этапе рейтинга. «На что влияет: при plot>=160 именно 1075 (а не 1074) определяет, открыт ли проход в комнате-перемычке (is_moved в obj_room_inbetween). Следующая стадия после флага 1074.»",
    "related": [
      1074,
      1076
    ]
  },
  "1076": {
    "detail": "Хранит состояние первого фальшивого S-ранга. «На что влияет: при ==1 Крис рисуется «крутым» спрайтом (obj_mainchara, scr_set_facing_sprites, obj_b3bs_console) и считается, что ранг куплен; obj_ch3_GSB01 переводит 1→2 и возвращает обычный спрайт; obj_room_tvland_preview по нему решает can_cheat. NPC замечают подделку. Связан с 1077/1173/1174.»",
    "related": [
      1077,
      1173,
      1174
    ],
    "lines": [
      {
        "cond": "Гл.3: болтовня NPC у табло рейтинга (поддельный ранг получен, flag=1)",
        "who": "narration",
        "text": "* Я вот думаю теперь... кубиксы ж из Карточного замка?"
      },
      {
        "cond": "Гл.3: болтовня NPC у табло рейтинга (поддельный ранг получен, flag=1)",
        "who": "narration",
        "text": "* Вот он камнем станет, и чё мне делать тогда?.."
      },
      {
        "cond": "Гл.3: NPC раскусил поддельный S-ранг (flag=1)",
        "who": "narration",
        "text": "* Я видел, как вы её купили. На такую липу только дурак поведётся."
      }
    ]
  },
  "1077": {
    "detail": "Хранит состояние второго фальшивого S-ранга. «На что влияет: при ==1 (этап plot>=160) Крис «крутой» (obj_mainchara, obj_b3bs_console), а obj_ch3_GSB01 переводит 1→2 и возвращает обычный спрайт; obj_room_tvland_preview по 1076/1077/1173 решает can_cheat. NPC замечают подделку. Парный к флагу 1076.»",
    "related": [
      1076,
      1173,
      1174
    ],
    "lines": [
      {
        "cond": "NPC у второго табло рейтинга (общая реплика)",
        "who": "narration",
        "text": "* Я вот думаю теперь... кубиксы ж из Карточного замка?"
      },
      {
        "cond": "NPC у второго табло рейтинга (общая реплика)",
        "who": "narration",
        "text": "* Вот он камнем станет, и чё мне делать тогда?.."
      },
      {
        "cond": "При 1077>=1 (NPC замечает купленную подделку S-ранга)",
        "who": "narration",
        "text": "* Я видел, как вы её купили. На такую липу только дурак поведётся."
      }
    ]
  },
  "1078": {
    "detail": "Отмечает съеденный мох в Гл.3. «На что влияет: при ==1 в osмотре отряда титул Крис становится «Сыщик мха» (obj_darkcontroller_Draw) и значение учитывается при оценке раунда как mossfound (obj_round_evaluation). Также влияет на титулы Гл.4 (Moss Most). Связан с 1055.»",
    "related": [
      1055
    ],
    "lines": [
      {
        "cond": "Титул Крис при flag 0 (Режиссёр)",
        "who": "narration",
        "text": "* Режиссёр (УР3)#Руководит актёрами."
      },
      {
        "cond": "Титул Крис при flag 1 (Сыщик мха)",
        "who": "narration",
        "text": "* Сыщик мха (УР3)#Имеет средние навыки#обнаружения мха."
      }
    ]
  },
  "1079": {
    "detail": "В obj_b1intro_Create флаг сбрасывается в 0 при старте поля (если plot<80, plot=80).",
    "lines": [
      {
        "cond": "При осушении оазиса (obj_board_oasis, flag → 1)",
        "who": "narration",
        "text": "* ВЫ ВЫСОСАЛИ ВЕСЬ ОАЗИС ЧЕРЕЗ ТРУБОЧКУ."
      },
      {
        "cond": "При осушении оазиса (obj_board_oasis, flag → 1)",
        "who": "narration",
        "text": "* НА ВКУС КАК ПЕСОК ВПЕРЕМЕШКУ С ЧУВСТВОМ ВИНЫ."
      },
      {
        "cond": "При осушении оазиса (obj_board_oasis, flag → 1)",
        "who": "narration",
        "text": "* ПРИРОДА В КРИЗИСЕ."
      },
      {
        "cond": "При flag[1079] = 1 — реплика Лансера у источника (obj_b1spring): ключ из ароматной грязи",
        "who": "lancer",
        "text": "СМОТРИТЕ! ИЗ АРОМАТНОЙ ЗЕМЛИЦЫ ВЫДАВИЛСЯ КЛЮЧ."
      }
    ]
  },
  "1081": {
    "detail": "Единственная запись: scr_flag_set(1081, ending_type + 1). Сам ending_type вычисляется вне приведённого фрагмента, поэтому конкретные условия для значений 1/2/3 по данному коду не видны — известно лишь, что флаг = ending_type+1 (значение 2 соответствует ending_type 1)."
  },
  "1084": {
    "detail": "Хранит ответ Крис на вопрос Рамбли про игры. «На что влияет: при >0 при последующих разговорах Рамбли (obj_npc_ramb, plot>=150) добавляется реплика-напоминание «игры должны приносить радость»; конкретное значение (1/2) задаёт ветку реплик в scr_text (msc 1307). Косметический выбор диалога.»",
    "related": [
      1055
    ],
    "lines": [
      {
        "cond": "При 1084>0 — напоминание Рамба, что игры должны быть в радость",
        "who": "ramb",
        "text": "* Крис, игры должны приносить радость! Постарайся не превращать это в работу."
      },
      {
        "cond": "Ответ Крис — вариант 1 (1084=1)",
        "who": "ramb",
        "text": "* Ясненько... Ну и хорошо."
      },
      {
        "cond": "Ответ Крис — вариант 2 (1084=2)",
        "who": "ramb",
        "text": "* Кто-то же должен оценить старания старичка Тенны..."
      }
    ]
  },
  "1085": {
    "detail": "Запись только в одну сторону (0→1). В obj_ch3_GSC04_Create условие scr_flag_get(1057)==1 && scr_flag_get(1085)==0 переключает obj_caterpillarchara.follow=0.",
    "related": [
      1057
    ]
  },
  "1086": {
    "detail": "Отмечает победу над теневым противником на финале лава-шоу. «На что влияет: при ==1 (или после нескольких боёв) obj_ch3_GSD01 запускает уже encounter 135 вместо 134, продвигая финальную последовательность Тенны. Привязано к obj_tenna_board4_enemy.»",
    "related": [
      1050
    ]
  },
  "1087": {
    "detail": "В obj_b2d_intro_Create при kind==0 также ставятся global.flag[1055]=1.5 и global.flag[7]=1. В Step музыка glacier.ogg грузится только при 1087==0; флаг ставится в 1 в конце ветки вступления."
  },
  "1089": {
    "detail": "Гл.3, поварская мини-игра (Chef's game): +1 за каждый проигрыш. Читается в Гл.4 (перенос вперёд)."
  },
  "1092": {
    "detail": "Сквозной прогресс события Bibliox/Путёвки. «На что влияет: управляет появлением шкафа (obj_b3bs_bibliox), выдачей key item 18 (Путёвка, на стадии 4), вариантами реплик про «куда направляетесь» (scr_text по !=4), подсказкой про автомат с шарами и финальным подбором в ranking_b; 5 вместе с 1226==1 рисует триггер-блик. Привязано к секретной комнате (1226).»",
    "related": [
      1055,
      1226
    ]
  },
  "1093": {
    "detail": "Отмечает посадку жулика в клетку. «На что влияет: при выборе посадить (choice==2) флаг становится 1 и клетка закрывается (obj_b3bs_jail2.con=1); при ==0 NPC-Заппер ещё предлагает выбор (obj_npc_room msc 1315). Развилка решения игрока.»",
    "lines": [
      {
        "cond": "При выборе «Я жулик» — Заппер сажает в клетку (scr_text msc 1316, choice=2 → flag[1093]=1)",
        "who": "narration",
        "text": "* Чо?! А ну в клетку!"
      },
      {
        "cond": "Осмотр Пиппинса в Камере наказания B (obj_npc_room, extflag «Pippins»)",
        "who": "narration",
        "text": "* Я посидел в обеих. Могу сказать, что эта чуть получше первой... но не сильно."
      }
    ]
  },
  "1094": {
    "detail": "Отмечает решение первого замка чулана-головоломки. «На что влияет: при ==1 дверь-замок в room_dw_puzzlecloset_1 уже открыта/удалена (obj_dw_puzzlecloset_dooriel_Create). Парные флаги: 1095 (второй замок), 1231 (третий).»",
    "related": [
      1095,
      1231
    ]
  },
  "1095": {
    "detail": "Отмечает решение второго замка чулана-головоломки. «На что влияет: при ==1 дверь-замок в room_dw_puzzlecloset_2 уже открыта/удалена (obj_dw_puzzlecloset_dooriel_Create). Парные флаги: 1094 (первый замок), 1231 (третий).»",
    "related": [
      1094,
      1231
    ]
  },
  "1097": {
    "detail": "Прогресс пазла с ключ-картой у пруда. «На что влияет: при 0 ключ-карта спрятана за водопадом; при ==1 водопад осушён (scr_lerpvar waterfalllength) и карту можно поднять; при ==2 карта уже у игрока (obj_board_pickup). Часть головоломки мира ТВ.»",
    "related": [
      1060
    ]
  },
  "1098": {
    "detail": "В obj_b3bs_cheaterpippins Step при dtimer==15 ставится global.flag[1098]=1 и удаляются NPC со спрайтом spr_npc_pippins. В Create при flag[1098]==1 объекты pippins1/2/3 сразу удаляются (сцена уже пройдена).",
    "lines": [
      {
        "cond": "Сцена бегства жулика Пиппинса (Гл.3 → flag[1098] = 1)",
        "who": "susie",
        "text": "WHAT THE? WHY WOULD YOU THROW A DIE?"
      },
      {
        "cond": "Сцена бегства жулика Пиппинса (Гл.3 → flag[1098] = 1)",
        "who": "narration",
        "text": "WHAT? WHERE ARE YOU TAKING ME?"
      }
    ]
  },
  "1099": {
    "detail": "Счётчик контроллеров/играбельных Лансеров. «На что влияет: задаёт, сколько Лансеров можно добавить в управление (obj_b3bs_console array_push по 1099), число в названии ключ-предмета LancerCon/LancerConX (scr_keyiteminfo при >1) и реплику «Теперь вы можете играть за N Лансеров». Числовое значение.»",
    "lines": [
      {
        "cond": "При взятии контроллера, flag[1099]==1 (первый) — obj_b3bs_lancerget_console",
        "who": "narration",
        "text": "* (Теперь вы можете играть за Лансера.)"
      },
      {
        "cond": "При выборе «Вернуть контроллеры» (flag[1099]>0 → сброс в 0) — Лансер",
        "who": "lancer",
        "text": "* Бабушки-оладушки. Закидываем всё обратно..."
      }
    ]
  },
  "1100": {
    "detail": "Отмечает получение Суперобеда из сундука. «На что влияет: при 0 сундук (obj_treasure_room) в room_dw_b3bs_cooltrashy ещё содержит предмет 39 (Суперобед); после взятия флаг становится 1 и сундук пуст. Индекс флага хранится в самом сундуке (itemflag).»"
  },
  "1101": {
    "detail": "Прогресс скрытого сундука с очками. «На что влияет: при ==1 куча пыли разбита и появляется сундук (obj_ch3_couch_overworld_controller); при ==2 очки получены и сундук открыт (obj_readable_room1); значение задаёт кадр спрайта сундука (obj_dw_treasure_points image_index). Скрытая награда комнаты.»"
  },
  "1103": {
    "detail": "Отмечает открытие ледяной двери в зоне B3. «На что влияет: при ==0 проход перекрыт solidblock (obj_b3bs_watercooler, obj_dw_b3bs_zapper_a); при ==1 дверь открыта, obj_swordroute_consolestarter пропускает этап, а Рамб произносит извинение (obj_npc_ramb). Веха пути Меча.»",
    "related": [
      1055,
      1173
    ],
    "lines": [
      {
        "cond": "Гл.3 (obj_npc_ramb): реплика-извинение Рамба (plot 150–229, flag[1029]≠1)",
        "who": "ramb",
        "text": "* Извини... Меня куда-то понесло."
      },
      {
        "cond": "Гл.3 (obj_npc_ramb): реплика-извинение Рамба (plot 150–229, flag[1029]≠1)",
        "who": "ramb",
        "text": "* Чего же ждать? Порезвись на славу! Удачи."
      }
    ]
  },
  "1104": {
    "detail": "Отмечает выдачу предмета от Прыглика. «На что влияет: при срабатывании триггера в obj_dw_b3bs_rabbick_b создаётся мусорка-выдача с itemflag=1104 и флаг ставится 1 (предмет/special); денежная ветка (idchest=20) держит флаг 0. Индекс флага хранится в самом объекте-мусорке.»"
  },
  "1106": {
    "detail": "Отмечает решение мостовой головоломки у пруда. «На что влияет: при ==1 пазл считается решённым — убираются плитки-сброс (obj_board_resettile) и фиксируются водяные плитки/мосты (obj_board_watertile) в obj_dw_b3bs_rouxls_lanina. Связано с пазлом ID-карты (1097/1107).»",
    "related": [
      1097,
      1107
    ]
  },
  "1107": {
    "detail": "Отмечает активацию пазла ID-карты у Ланины. «На что влияет: при ==1 в комнате room_dw_b3bs_rouxls_lanina вокруг пазла создаются водяные плитки (obj_board_watertile, три ряда), формируя проход/механику головоломки. Связано с флагами 1097 и 1106.»",
    "related": [
      1097,
      1106
    ]
  },
  "1111": {
    "detail": "Прогресс головоломки толкаемого блока в секретной зоне поля. В Step при достижении блоком конца ставится 1 и в flag[1109]/[1110] пишутся координаты блока; когда нажаты switchtile1 и switchtile2 — ставится 2. В extrapuzzle при flag[1055]>=6 сразу выставляется 2. «На что влияет: при 2 шипы выдвинуты, напольный блок удалён, головоломка считается решённой, а при перезаходе блок восстанавливается на сохранённых координатах flag[1109]/[1110].»",
    "related": [
      1109,
      1110,
      1020,
      1018,
      1055
    ]
  },
  "1112": {
    "detail": "Маркер прохождения доп. блок-головоломки «в нигде». «На что влияет: при 1 камера разблокируется (camcontrol=false), дверной блок удаляется и проход открыт; при повторном входе сцена сразу считается завершённой.»",
    "related": [
      1111,
      1055
    ]
  },
  "1114": {
    "detail": "Фиксирует, что страж-Пультий в гримёрке был побеждён в бою. «На что влияет: при 1 (или при flag[1113]==2) NPC-страж в комнате удаляется и повторно бой не запускается.»",
    "related": [
      1113
    ]
  },
  "1115": {
    "detail": "Этап обнаружения и входа в секретную почтовую комнату телемира. «На что влияет: видимость двери maildoor, выбор сценарного пути входа (warp удаляет дверь, up проигрывает вступление) и проигрывание интро-сцены.»",
    "related": [
      1020,
      1025,
      1079
    ]
  },
  "1122": {
    "detail": "Счётчик ключей на «поле» телешоу (Гл.3). Читается в Гл.4 (перенос вперёд)."
  },
  "1135": {
    "detail": "Маркер, что стелс-режим в комнате Пультия уже открыт/просмотрен. «На что влияет: при 1 ccon=100 — вступительная сцена не проигрывается повторно при перезаходе.»",
    "related": [
      1137,
      1184
    ]
  },
  "1136": {
    "detail": "Единственная ссылка — obj_dw_b3bs_zapper_a Create: if (global.flag[1136]==1) paannounce=99 (оповещение по громкой связи пропускается). Операции записи global.flag[1136] в коде нет, значение остаётся 0."
  },
  "1137": {
    "detail": "Состояние мусорного переключателя в комнате стелса. «На что влияет: при >0 спрайт переключателя в нажатом виде и убирается закулисный свет; при 1 удаляются закрытая дверь и её триггер (проход открыт); при 2 — отдельное состояние con=10.»",
    "related": [
      1135
    ]
  },
  "1138": {
    "detail": "Отметка получения предмета из сундука комнаты Кулера. «На что влияет: при 1 завершается стелс-часть комнаты (stealthend), и предмет повторно не выдаётся.»"
  },
  "1139": {
    "detail": "Флаг сундука-предмета (idchest=2) в комнате головоломки mysterypuzzle. «На что влияет: при 1 сундук помечен открытым и предмет повторно не выдаётся.»",
    "related": [
      1111
    ]
  },
  "1140": {
    "detail": "Флаг сундука с очками (points, idchest=1) в комнате zapper_c. «На что влияет: при 1 сундук помечен открытым и очки повторно не выдаются.»"
  },
  "1142": {
    "detail": "Прогресс напоминания о камере. «На что влияет: цвет закулисной подсветки (targcolor/image_blend) и состояние головоломки; при 2 свет красится в зелёный (#13D26F), при 1 — стандартное завершение.»"
  },
  "1144": {
    "detail": "Запоминает, флиртовал игрок с кулером или сражался, и просмотрена ли сцена наблюдателя за занавеской. «На что влияет: реплики наблюдателя за занавеской, переход в 3 после сцены, а в Гл.4 — поведение святого кулера-врага (previouslyflirted) и реплика-приглашение в кафе.»",
    "related": [
      1146,
      1145
    ],
    "lines": [
      {
        "cond": "В Гл.4 — приглашение «на напитки» (если ранее флиртовал, flag[1144]=1/3)",
        "who": "narration",
        "text": "* (Seems like you're invited for drinks... but you're busy now.)"
      },
      {
        "cond": "При flag[1144]=0 — кто-то тихо сидит за занавеской",
        "who": "narration",
        "text": "* (Кто-то тихо сидит за занавесками.)"
      },
      {
        "cond": "При flag[1144]=1 — наблюдал, как вы флиртовали с кулером",
        "who": "narration",
        "text": "* (Кто-то тихонько наблюдал, как вы флиртовали с кулером.)"
      },
      {
        "cond": "При flag[1144]=1 — наблюдал, как вы флиртовали с кулером",
        "who": "narration",
        "text": "* Как хорошо... Её вода... всегда такая освежающая..."
      },
      {
        "cond": "При flag[1144]=1 — наблюдал, как вы флиртовали с кулером",
        "who": "narration",
        "text": "* Она... так сильна... и готова показать себя."
      },
      {
        "cond": "При flag[1144]=1 — наблюдал, как вы флиртовали с кулером",
        "who": "narration",
        "text": "* Вы... созданы друг для друга..."
      },
      {
        "cond": "При flag[1144]=1 — наблюдал, как вы флиртовали с кулером",
        "who": "narration",
        "text": "* (Однако эти слова прозвучали как-то грустно.)"
      },
      {
        "cond": "При flag[1144]=2 — наблюдал, как вы сражались с кулером",
        "who": "narration",
        "text": "* (Кто-то тихонько наблюдал, как вы сражались с кулером...)"
      },
      {
        "cond": "При flag[1144]=2 — наблюдал, как вы сражались с кулером",
        "who": "narration",
        "text": "* (Кажется, он доволен тем, что вы с ним не флиртовали.)"
      },
      {
        "cond": "При flag[1144]=3 — сцена за занавеской просмотрена («...»)",
        "who": "narration",
        "text": "* (...)"
      }
    ]
  },
  "1145": {
    "detail": "Состояние сундука с тайным Кулером и очками. «На что влияет: ветка взаимодействия с сундуком (trcon 8 / 8.1) и вид сундука (открыт при 2); при 1 кулер остаётся в сундуке из-за нехватки места в инвентаре.»",
    "related": [
      1144
    ]
  },
  "1147": {
    "detail": "Маркер сцены с газонокосилкой и теневыми ребятами в офисной зоне телемира. «На что влияет: блокировка стопок бумаги, наличие теневых ребят, создание ритм-врагов и условие сохранения (присутствие толпы при 0<flag<20).»",
    "related": [
      1055,
      654
    ],
    "lines": [
      {
        "cond": "Реплика Пиппинса в офисе телемира при flag[1055]≥6 (система вырублена, теневые ребята ушли)",
        "who": "narration",
        "text": "* Сейчас здесь должны были сидеть прихвостни, отрабатывать контракты Тенны..."
      },
      {
        "cond": "Реплика Пиппинса в офисе телемира при flag[1055]≥6 (система вырублена, теневые ребята ушли)",
        "who": "narration",
        "text": "* Но, похоже, все системы вырубило."
      },
      {
        "cond": "Реплика Пиппинса в офисе телемира при flag[1055]≥6 (система вырублена, теневые ребята ушли)",
        "who": "narration",
        "text": "* И что им теперь делать..."
      }
    ]
  },
  "1148": {
    "detail": "Прогресс сцены с Rouxls и поварами Эльнина/Ланино в комнате chef. «На что влияет: стартовое состояние комнаты (con 0/50/-1), запуск музыки сцены и завершение с установкой флагов вербовки 660/661.»",
    "related": [
      660,
      661
    ]
  },
  "1150": {
    "detail": "Числовой счётчик этапов третьего «родительского замка» в телемире. «На что влияет: включение ТВ, стартовая точка и доступность камеры (nocamera при <4), удаление препятствий при >=2, мост при >=3, выдача камеры и flag[1244] при достижении 4.»",
    "related": [
      1244
    ]
  },
  "1151": {
    "detail": "obj_ch3_closet Step: если alt_scene — scr_flag_set(1151,1), иначе scr_flag_set(1039,1). obj_ch3_closet Create при flag[1039]==2 или flag[1151]==1 ставит drawer.image_index=1 (ящик уже использован). В obj_readable_room1 «wardrobe»: при flag[1039]==0 и flag[1151]==0 запускается реплика msc 1264.",
    "related": [
      1039
    ],
    "lines": [
      {
        "cond": "При 1 (альт-сцена уже просмотрена)",
        "who": "narration",
        "text": "* (Больше нет смысла туда смотреть.)"
      }
    ]
  },
  "1152": {
    "detail": "Запоминает, превращался ли Ральзей в коня в ковбойской зоне. «На что влияет: текст описания Ральзея при проверке/в меню (Конь / Бывший конь) и его титул в этой главе.»",
    "lines": [
      {
        "cond": "Обычный титул Ральзея (вне ковбойской зоны)",
        "who": "narration",
        "text": "Тёмный актёр (УР3)#Ему сложно даётся#актёрское мастерство."
      },
      {
        "cond": "В ковбойской зоне при flag 0 (Конь)",
        "who": "narration",
        "text": "Конь (УР3)#Стал конём."
      },
      {
        "cond": "При flag 1 (Бывший конь)",
        "who": "narration",
        "text": "Бывший конь (УР3)#Когда-то был#конём."
      }
    ]
  },
  "1161": {
    "detail": "Отметка прохождения сцены в бонусной зоне Тенны. «На что влияет: начальная расстановка призов, глубина отрисовки большого сундука и восстановление списка оставшихся призов по числу украденных (flag[1277]).»",
    "related": [
      1277,
      1162
    ]
  },
  "1162": {
    "detail": "Состояние большого сундука Пиппина в бонусной зоне. «На что влияет: можно ли открыть сундук (только при 0) и его внешний вид при повторном входе (открытым при 1).»",
    "related": [
      1161
    ]
  },
  "1164": {
    "detail": "Маркер прохождения погони/боя в световом лабиринте. «На что влияет: при 1 лампа-преследователь удалена, сегмент лабиринта завершён (con=-999) и активируется триггер сундука.»"
  },
  "1169": {
    "detail": "Отметка получения награды за головоломку Ланины на поле. «На что влияет: при 1 награда (100 очков) уже выдана, маркер заменяется на пустую яму и повторно не срабатывает.»"
  },
  "1171": {
    "detail": "Гл.3 (Телешоу Тенны). Счётчик боёв на «поле» 2. На что влияет: в Гл.4 obj_minigame_evaluation/obj_round_evaluation читают как totalbattles (оценка)."
  },
  "1173": {
    "detail": "Оценка (грейд) за первый этап телеигрового поля. «На что влияет: реплики Рамба об игре, доступность жульничества с подделкой до получения S-ранга и поведение Пиппинса в гримёрке при максимальном (T) ранге.»",
    "related": [
      1174,
      1103,
      1076,
      1077
    ],
    "lines": [
      {
        "cond": "Напутствие Рамба перед игрой на поле",
        "who": "ramb",
        "text": "* Чего же ждать? Порезвись на славу! Удачи."
      },
      {
        "cond": "При возврате к Рамбу — этап поля пройден (флаг 1103 = 1)",
        "who": "ramb",
        "text": "* Как игра, душенька?.."
      },
      {
        "cond": "При возврате к Рамбу — этап поля пройден (флаг 1103 = 1)",
        "who": "ramb",
        "text": "* ...Что? Не проходится?"
      }
    ]
  },
  "1174": {
    "detail": "Оценка (грейд) за второй этап телеигрового поля. «На что влияет: сцены гримёрки и консольной комнаты, удаление стража-Пультия при S-ранге (flag>=4, plot>=280) и доступность жульничества во втором заходе.»",
    "related": [
      1173,
      1186,
      1192,
      1029,
      1077
    ]
  },
  "1176": {
    "detail": "Этап поиска странного контроллера для игровой консоли. «На что влияет: отрисовка логотипа консоли, появление интерактивного блестящего контроллера (при 1) и выдача ключ-предмета 16 при подборе (переход в 2).»"
  },
  "1177": {
    "detail": "Один из пяти золотых супер-призов гачапона. «На что влияет: уменьшает число оставшихся супер-призов (remainingSuperPrize) и тем самым шанс выпадения золотого приза; при выпадении всех пяти золотой приз больше не выдаётся.»",
    "related": [
      1178,
      1179,
      1180,
      1181,
      1182
    ],
    "lines": [
      {
        "cond": "Интерфейс гачапона (obj_ch3_gachapon) — подписи показателей шанса золотого приза",
        "who": "narration",
        "text": "БУДЕТ ВНЕСЕНО:"
      },
      {
        "cond": "Интерфейс гачапона (obj_ch3_gachapon) — подписи показателей шанса золотого приза",
        "who": "narration",
        "text": "ОСТАЛОСЬ ОЧКОВ:"
      },
      {
        "cond": "Интерфейс гачапона (obj_ch3_gachapon) — подписи показателей шанса золотого приза",
        "who": "narration",
        "text": "ШАНС ЗОЛ. ПРИЗА:"
      }
    ]
  },
  "1178": {
    "detail": "Один из пяти золотых супер-призов гачапона. «На что влияет: уменьшает remainingSuperPrize и шанс золотого приза; при сборе всех пяти золотой приз больше не выпадает.»",
    "related": [
      1177,
      1179,
      1180,
      1181,
      1182
    ],
    "lines": [
      {
        "cond": "Экран гачапона: подписи интерфейса (внесение очков / остаток очков / шанс золотого приза)",
        "who": "narration",
        "text": "БУДЕТ ВНЕСЕНО:"
      },
      {
        "cond": "Экран гачапона: подписи интерфейса (внесение очков / остаток очков / шанс золотого приза)",
        "who": "narration",
        "text": "ОСТАЛОСЬ ОЧКОВ:"
      },
      {
        "cond": "Экран гачапона: подписи интерфейса (внесение очков / остаток очков / шанс золотого приза)",
        "who": "narration",
        "text": "ШАНС ЗОЛ. ПРИЗА:"
      }
    ]
  },
  "1179": {
    "detail": "Один из пяти золотых супер-призов гачапона. «На что влияет: уменьшает remainingSuperPrize и шанс выпадения золотого приза; после сбора всех пяти золотой приз недоступен.»",
    "related": [
      1177,
      1178,
      1180,
      1181,
      1182
    ],
    "lines": [
      {
        "cond": "Интерфейс гачапона (Гл.3): подписи на экране",
        "who": "narration",
        "text": "БУДЕТ ВНЕСЕНО:"
      },
      {
        "cond": "Интерфейс гачапона (Гл.3): подписи на экране",
        "who": "narration",
        "text": "ОСТАЛОСЬ ОЧКОВ:"
      },
      {
        "cond": "Интерфейс гачапона (Гл.3): подписи на экране",
        "who": "narration",
        "text": "ШАНС ЗОЛ. ПРИЗА:"
      }
    ]
  },
  "1180": {
    "detail": "Один из пяти золотых супер-призов гачапона. «На что влияет: уменьшает remainingSuperPrize и шанс золотого приза; при сборе всех пяти золотой приз больше не выпадает.»",
    "related": [
      1177,
      1178,
      1179,
      1181,
      1182
    ],
    "lines": [
      {
        "cond": "Интерфейс гачапона (Гл.3): подписи ставки очков и шанса золотого приза",
        "who": "narration",
        "text": "БУДЕТ ВНЕСЕНО:"
      },
      {
        "cond": "Интерфейс гачапона (Гл.3): подписи ставки очков и шанса золотого приза",
        "who": "narration",
        "text": "ОСТАЛОСЬ ОЧКОВ:"
      },
      {
        "cond": "Интерфейс гачапона (Гл.3): подписи ставки очков и шанса золотого приза",
        "who": "narration",
        "text": "ШАНС ЗОЛ. ПРИЗА:"
      }
    ]
  },
  "1181": {
    "detail": "Один из пяти золотых супер-призов гачапона. «На что влияет: уменьшает remainingSuperPrize и шанс золотого приза; когда собраны все пять — золотой приз больше не выдаётся (nogold).»",
    "related": [
      1177,
      1178,
      1179,
      1180,
      1182
    ],
    "lines": [
      {
        "cond": "Экран гачапона (obj_ch3_gachapon): подписи интерфейса ставки/супер-приза",
        "who": "narration",
        "text": "БУДЕТ ВНЕСЕНО:"
      },
      {
        "cond": "Экран гачапона (obj_ch3_gachapon): подписи интерфейса ставки/супер-приза",
        "who": "narration",
        "text": "ОСТАЛОСЬ ОЧКОВ:"
      },
      {
        "cond": "Экран гачапона (obj_ch3_gachapon): подписи интерфейса ставки/супер-приза",
        "who": "narration",
        "text": "ШАНС ЗОЛ. ПРИЗА:"
      }
    ]
  },
  "1184": {
    "detail": "Запоминает выбор ускоренного передвижения в стелс-зонах. «На что влияет: скорость Крис в стелс-зонах (stealthspeed 2 против 16) и пропуск вступительной подсказки при перезаходе.»",
    "related": [
      1135,
      1230
    ],
    "lines": [
      {
        "cond": "При выборе «бежать быстро» в стелс-зонах (flag[1184]=1)",
        "who": "narration",
        "text": "* (Вы и Сьюзи решили бежать сломя голову в зонах стелса.)"
      }
    ]
  },
  "1185": {
    "detail": "Сохранённый выбор реплики в сцене гримёрки (доступной при ранге поля > 0). «На что влияет: запоминает выбор игрока (global.choice+1) и не даёт сцене повториться (Create запускает её только при flag[1185]==0).»",
    "related": [
      1055,
      1173
    ]
  },
  "1187": {
    "detail": "Состояние двери в скрытую комнату Z-ранга. «На что влияет: видимость прохода в комнату Z-ранга; при переходе plot>=160 открытие «первой части» (1) сбрасывается, требуя открыть заново (2).»",
    "related": [
      1174,
      1191
    ],
    "lines": [
      {
        "cond": "Гл.3: осмотр прохода в комнату Z-ранга",
        "who": "narration",
        "text": "* ..."
      }
    ]
  },
  "1188": {
    "detail": "Отметка прохождения боя с кулером в комнате C-ранга, со значением из исхода боя (flag[50]). «На что влияет: готовность к бою при входе (battle_ready только при 0); при !=0 бой считается пройденным и повторно не запускается.»",
    "related": [
      50
    ]
  },
  "1189": {
    "detail": "Отметка разблокировки мини-игры «Сьюзилла». «На что влияет: наличие Пиппинса в комнате A-ранга, разблокировка двери мини-игры и постер (при 0 — «скоро»).»",
    "related": [
      1197,
      1198,
      1219
    ],
    "lines": [
      {
        "cond": "При 1189=1 (постер открытой Сьюзиллы)",
        "who": "narration",
        "text": "МОНСТР-КАТАСТРОФА"
      }
    ]
  },
  "1191": {
    "detail": "Состояние люка между комнатой Z-ранга и консольной комнатой. «На что влияет: открыт ли люк (и наличие подсказки-readable у люка); значение зависит от стадии сюжета (plot<150 → 1, иначе 2), и проверяется отдельно в обеих комнатах.»",
    "related": [
      1187
    ]
  },
  "1193": {
    "detail": "Очки мини-игры «Готовка» (Cooking Show). Определяют ранг (1194).",
    "related": [
      1194
    ]
  },
  "1194": {
    "detail": "Лучший ранг (грейд) мини-игры готовки. «На что влияет: хранит грейд для лучшего результата (обновляется только при превышении прежнего счёта flag[1193]); используется для отображения ранга.»",
    "related": [
      1193
    ]
  },
  "1196": {
    "detail": "Лучший ранг (грейд) ритм-игры «Lightners Live». «На что влияет: хранит грейд лучшего результата (обновляется при превышении прежнего счёта flag[1195]); прочие песни сохраняются через scr_rhythmgame_score_save.»",
    "related": [
      1195
    ]
  },
  "1197": {
    "detail": "Числовой рекорд очков в мини-игре «Сьюзилла» (минимум 0). «На что влияет: при >0 повышается сложность мини-игры и расширяется набор случайных паттернов Тенны, а также растёт сложность Ральзея (ral_difficulty); значение обновляется только при новом рекорде.»",
    "related": [
      1198,
      1234,
      1189
    ]
  },
  "1198": {
    "detail": "Лучший ранг (грейд) мини-игры «Сьюзилла». «На что влияет: хранит грейд лучшего результата; при низком ранге (flag[1198]<=3 или ==0) и наличии счёта (flag[1197]>0) повышается сложность Ральзея в мини-игре.»",
    "related": [
      1197,
      1234
    ]
  },
  "1199": {
    "detail": "Отметка прохождения первой сцены сцены/интерлюдии. «На что влияет: ветвление интерлюдии (con 45/50, 97/99), запуск завершающей последовательности и доступ к реплике Сьюзи; не даёт сцене повториться.»",
    "related": [
      1200,
      1201
    ],
    "lines": [
      {
        "cond": "После просмотра сцены (flag → 1) — реплика Сьюзи",
        "who": "susie",
        "text": "* ...Ясно, чудики."
      }
    ]
  },
  "1200": {
    "detail": "Сохранённый выбор реплики Крис о лице спящего Ральзея. «На что влияет: задаёт ветку интерлюдии (con 75/80/85) в зависимости от выбранной мысли.»",
    "related": [
      1199
    ]
  },
  "1201": {
    "detail": "Сохранённый ответ Крис Сьюзи о Тенне. «На что влияет: выбирает, какую реплику говорит Сьюзи в интерлюдии (радостную при 1 или «понятно, о чём он» при 2).»",
    "related": [
      1199,
      1200
    ],
    "lines": [
      {
        "cond": "При значении 1 (согласился — было весело)",
        "who": "susie",
        "text": "* (Ага! Я ведь знала, что тебе нравится!)"
      },
      {
        "cond": "При значении 2 (другой вариант ответа)",
        "who": "susie",
        "text": "* (А. Теперь понятно, о чём он.)"
      }
    ]
  },
  "1202": {
    "detail": "Флаг сундука с очками (points, idchest=10) в комнате Прыгликов (Ribbicks). «На что влияет: при 1 сундук помечен открытым и очки повторно не выдаются.»"
  },
  "1203": {
    "detail": "Маркер открытия пустого сундука в комнате Прыгликов телешоу (room_dw_teevie_ribbicks_a, инстанс 3), задаётся через itemflag = 1203, itemtype = \"nothing\". «На что влияет: помечает, что сундук уже вскрыт (image_index сундука становится «открыто»), повторно ничего не выдаёт — внутри пусто. Сюжетных последствий нет, только состояние сундука.»",
    "related": [
      1204,
      1205,
      1206,
      1207,
      1209
    ]
  },
  "1204": {
    "detail": "Маркер вскрытия сундука с предметом (itemidchest = 37) в комнате Прыгликов (инстанс 4). «На что влияет: при ==1 сундок показывается открытым и предмет повторно не выдаётся. Снятие флага в 0 позволит снова получить предмет id 37 из этого сундука.»",
    "related": [
      1203,
      1205,
      1206,
      1207,
      1209
    ]
  },
  "1205": {
    "detail": "Маркер открытия пустого сундука в комнате Прыгликов (инстанс 5), itemtype = \"nothing\". «На что влияет: помечает сундук как уже вскрытый; внутри ничего нет, сюжетных последствий нет.»",
    "related": [
      1203,
      1204,
      1206,
      1207,
      1209
    ]
  },
  "1206": {
    "detail": "Маркер вскрытия сундука с очками (itemtype = \"points\", itemidchest = 2) в комнате Прыгликов (инстанс 6). «На что влияет: при ==1 сундук открыт, очки повторно не начисляются. Снятие в 0 позволит снова получить очки из сундука.»",
    "related": [
      1203,
      1204,
      1205,
      1207,
      1209
    ]
  },
  "1207": {
    "detail": "Маркер вскрытия сундука с очками (itemtype = \"points\", itemidchest = 50) в комнате Прыгликов (зона b, инстанс 2). «На что влияет: при ==1 сундук открыт и очки повторно не выдаются. Снятие в 0 вернёт возможность собрать очки.»",
    "related": [
      1203,
      1204,
      1205,
      1206,
      1209
    ]
  },
  "1208": {
    "detail": "Трёхступенчатый прогресс разговора Сьюзи и Тенны у интерлюдии (только после plot>=150). «На что влияет: значение 0 → дверь даёт реплику \"door_no_tenna\" (prompt 1373) и obj_room_stage запускает сцену (con=10) при plot>=160; значение 1 → дверь \"door_after_tenna\" (prompt 1375), затемнение _blackall, сцена в obj_room_stage помечается пройденной; значение 2 → разговор завершён полностью. obj_ch3_GSC05 проверяет visited_tenna = (1208>0). Управляет тем, какая катсцена и какая реплика двери проигрываются.»"
  },
  "1209": {
    "detail": "Маркер открытия пустого сундука в комнате Прыгликов (зона b, инстанс 3), itemtype = \"nothing\". «На что влияет: помечает сундук как вскрытый; внутри ничего нет, сюжетных последствий нет.»",
    "related": [
      1203,
      1204,
      1205,
      1206,
      1207
    ]
  },
  "1210": {
    "detail": "Хранит, поговорил ли Крис с Эльниной и какой ободряющий ответ выбрал. «На что влияет: при 0 — у автомата стоит pippins_npc и obj_npc_room_animated запускает сцену разговора (con=150); ответ Крис определяет реплику Эльнины (вариант 1 — «я САМА волна», вариант 2 — «девочки-синоптики и есть волна») и записывается в флаг; при 1210>0 obj_readable_room1 включает дополнительную реплику Сьюзи у экрана. Значение сохраняет выбор на будущее.»",
    "lines": [
      {
        "cond": "Ответ Крис — вариант 1 (1210=1): Эльнина «я сама — волна»",
        "who": "elnina",
        "text": "* ...А ведь и правда. Что мне снег и зной... когда я САМА С СОБОЙ!"
      },
      {
        "cond": "Ответ Крис — вариант 2 (1210=2): реплика Эльнины",
        "who": "elnina",
        "text": "* А ведь и правда. После любого дождя выходит солнце."
      },
      {
        "cond": "При 1210>0 — осмотр телевизора в гримёрке (реакция Сьюзи)",
        "who": "narration",
        "text": "* Кто вообще смотрит телик так близко?!"
      },
      {
        "cond": "При 1210>0 — осмотр телевизора в гримёрке (реакция Сьюзи)",
        "who": "susie",
        "text": "* Что ж она так убивается? Ну и что, что второе место!"
      }
    ]
  },
  "1211": {
    "detail": "Хранит исход ободряющего разговора Крис с Ланино. «На что влияет: при 0 obj_npc_room запускает сцену (con=60); выбор Крис задаёт реплику Ланино (вариант 1 — «она мне не нужна, мне никто не нужен», вариант 2 — «солнце ярче всех сияет») и спрайт shocked, и записывается в флаг как 1 или 2. Сохраняет выбор на будущее.»",
    "lines": [
      {
        "cond": "Выбор Крис → вариант 1 (flag[1211] = 1): «она мне не нужна»",
        "who": "lanino",
        "text": "* Чёрт... А ведь и правда! Она не нужна мне! Мне никто не нужен!"
      },
      {
        "cond": "Выбор Крис → вариант 2 (flag[1211] = 2): «солнце ярче всех сияет»",
        "who": "lanino",
        "text": "* А ведь и правда! Солнце в небе ярче всех сияет!"
      }
    ]
  },
  "1212": {
    "detail": "Состояние мостовой головоломки в зоне Сьюзи. «На что влияет: при 1212>=1 головоломка считается пройденной — obj_board_event_bridgepuzzle удаляется и ставится con=1 (мост на месте); при ==2 переключатель boardswitch рисуется нажатым (used=true, image_index=1). Связан с флагом 1055 (>=6 автоматически выставляет 1212=2 и ставит маркер моста). Управляет проходимостью моста.»",
    "related": [
      1055,
      1213
    ]
  },
  "1213": {
    "detail": "Маркер вскрытия сундука с 300 очками в комнате моста Сьюзи. «На что влияет: при ==1 сундук открыт, 300 очков повторно не выдаются. Снятие в 0 вернёт возможность собрать очки.»",
    "related": [
      1212
    ]
  },
  "1214": {
    "detail": "Сохраняет первый выбор Крис в сцене разговора в чулане и факт, что сцена сыграна. «На что влияет: значение = answer+1; при answer==0 (значение 1) открывается ветка con=5 (к Сьюзи); при 1214>0 obj_room_puzzle_closet_1a уничтожается в Create — сцена больше не запускается. Также проверяется (1214>1) в дальнейших ветках диалога. Хранит выбор на будущее.»",
    "related": [
      1215,
      1216,
      1217,
      1218
    ]
  },
  "1215": {
    "detail": "Хранит реакцию Крис на слова Сьюзи в чулане. «На что влияет: значение = answer+1; при answer 0 или 1 (значение 2) идёт ветка c_sel(su) — Сьюзи реагирует на ободрение; значение 3 — другой (язвительный) ответ. Управляет веткой диалога чулана и сохраняет выбор.»",
    "related": [
      1214,
      1216,
      1217,
      1218
    ]
  },
  "1216": {
    "detail": "Хранит ответ Крис Ральзею в чулане. «На что влияет: значение = answer+1; при answer==0 (значение 1) идёт ветка c_sel(ra) — Ральзей реагирует на слова Крис. Управляет веткой диалога и сохраняет выбор.»",
    "related": [
      1214,
      1215,
      1217,
      1218
    ]
  },
  "1217": {
    "detail": "Хранит согласие Крис купить мороженое Сьюзи. «На что влияет: значение = answer+1; при answer==0 открывается ветка con=11 (продолжение разговора про фестиваль). Сохраняет выбор Крис на будущее.»",
    "related": [
      1214,
      1215,
      1216,
      1218
    ]
  },
  "1218": {
    "detail": "Хранит выбор Крис о компании на фестивале. «На что влияет: значение = answer+1; ветвь at answer==0 учитывает scr_sideb_get_phase()>0. Сохраняет ответ на будущее (кого позвать), влияет на последующие реплики.»",
    "related": [
      1214,
      1215,
      1216,
      1217
    ]
  },
  "1219": {
    "detail": "Помечает, что мини-игру «Сьюзилла» хотя бы раз пробовали. «На что влияет: при ==0 дверь/афиша показывает «ЗАГАДОЧНУЮ ИГРУ» (poster_coming_soon_susiezilla), при ==1 — «МОНСТР-КАТАСТРОФУ» (poster_sprite 2531, NOW PLAYING); в obj_ch3_GSD01 при ==0 max_event_count=2, иначе 3; obj_ch3_GSC05 при ==0 проигрывает вступление. Это «сохранённый» маркер, переносится вперёд.»",
    "related": [
      1220,
      1189
    ],
    "lines": [
      {
        "cond": "При flag[1219] = 0 (не запускалась) — пункт меню у двери мини-игры",
        "who": "narration",
        "text": "Сыграть в#ЗАГАДОЧНУЮ#ИГРУ"
      },
      {
        "cond": "При flag[1219] = 1 (уже запускалась) — пункт меню у двери мини-игры",
        "who": "narration",
        "text": "Сыграть#в МОНСТР-#КАТАСТРОФУ"
      },
      {
        "cond": "Пункт меню «Остаться» (выбор у двери мини-игры, при любом значении)",
        "who": "narration",
        "text": "#Остаться"
      },
      {
        "cond": "При flag[1219] = 0 — афиша/постер двери: «ЗАГАДОЧНАЯ ИГРА» (MYSTERY GAME)",
        "who": "narration",
        "text": "ЗАГАДОЧНАЯ ИГРА"
      },
      {
        "cond": "При flag[1219] = 1 — афиша/постер двери: «МОНСТР-КАТАСТРОФА» (MONSTER MOVIE)",
        "who": "narration",
        "text": "МОНСТР-КАТАСТРОФА"
      }
    ]
  },
  "1220": {
    "detail": "Помечает победу в мини-игре «Сьюзилла». «На что влияет: при первой победе obj_victory_susiezilla ставит флаг в 1 и запускает событие (obj_event_manager.trigger_event); далее obj_gameover_minigame (Гл.3 и Гл.4) при заходе в room_dw_susiezilla с 1220!=0 не показывает экран поражения. Маркер прохождения, переносится вперёд (читается и в Гл.4).»",
    "related": [
      1219
    ]
  },
  "1221": {
    "detail": "Помечает, собраны ли очки из кратера у кулера в комнате рейтинга. «На что влияет: при ==0 чтение кратера (extflag \"crater\") запускает сцену сбора очков (con=1→6), которая начисляет очки и ставит флаг в 1; при ==1 повторно ничего не выдаётся. Маркер разовой награды.»"
  },
  "1222": {
    "detail": "Маркер получения золотой статуи Тенны. «На что влияет: хранит факт получения награды. Значение 1 = статуя получена.»"
  },
  "1223": {
    "detail": "Маркер получения приза №10 из гачапона. «На что влияет: хранит факт получения приза. Значение 1 = приз получен.»"
  },
  "1226": {
    "detail": "Помечает, что игрок открыл тайную гача-комнату (ввод 1225). «На что влияет: при ==0 в obj_room_ranking_b спавнится интерактивный триггер автомата (gatrig); в obj_ch3_gachaunknown при завершении сцены (con==6) флаг ставится в 1 и создаётся гигантская дверь obj_doorAny к Крис; при ==1 obj_room_ranking_b в Create/Step/Step2/Draw сразу выходит (автомат/сцена больше не активны). Связан с флагом 1092 (==5). Постоянный маркер открытия секрета.»",
    "related": [
      1092
    ]
  },
  "1227": {
    "detail": "Снята ли фотоцель для оценки раунда (фотоохота, 1 из 4 фото). Гл.3, читается в Гл.4."
  },
  "1228": {
    "detail": "Помечает, что катсцена входа в Холодное место сыграна. «На что влияет: при ==1 obj_ch3_GSB05 сразу ставит con=20 (без вступительной катсцены), убирает чёрный экран blackall и включает музыку wind_highplace.ogg; obj_puzzlecloset_manager при 1228>0 в room_dw_puzzlecloset_2 открывает/настраивает дверь obj_doorAny. Сохраняет факт перехода. (Отладочно сбрасывается клавишей P.)»"
  },
  "1230": {
    "detail": "Состояние стелс-участка с Пультием. «На что влияет: при поимке Step ставит 1230=1; при следующем заходе Create переводит 1 → 2 (зачёт прохождения); при выставленном флаге не зажигается свет (makelights=0) и не делается son; при ==2 спавнится пружина obj_teevie_spring и obj_b3bs_stealth разгоняет stealthspeed до 24 (быстрый проход). Управляет прохождением скрытной зоны.»",
    "related": [
      1229,
      1184,
      1243
    ]
  },
  "1231": {
    "detail": "Помечает прохождение третьего родительского замка-головоломки. «На что влияет: при ==1 obj_dw_ch3_pc3fuzz показывает помехи (alpha=1, depth 999900), obj_puzzlecloset_manager глушит звук фуза (amt2=0) и консоль становится отзывчивой; при ==0 консоль «не отвечает», а фотографирование (obj_board_playercamera) наращивает счётчик фото 1245; obj_dw_puzzlecloset_dooriel при ==1 удаляет дверь. Управляет состоянием комнаты-головоломки.»",
    "related": [
      1233,
      1244,
      1245,
      1095,
      1150
    ],
    "lines": [
      {
        "cond": "При flag[1231] = 0 (консоль «не отвечает» — The console is unresponsive)",
        "who": "narration",
        "text": "* The console is unresponsive."
      }
    ]
  },
  "1233": {
    "detail": "Помечает, открыта/использована ли дверь третьего родительского замка. «На что влияет: при ==0 obj_puzzlecloset_manager_Step следит за дверью obj_doorAny (x>640) и при касании (touched) ставит флаг в 1; при ==1 дверь обрабатывается как уже использованная. Управляет состоянием прохода в чулане-головоломке.»",
    "related": [
      1231
    ]
  },
  "1238": {
    "detail": "obj_npc_ramb_Other_10: в room_dw_console_room при scr_flag_get(1238) == 0 запускается диалог (obj_room_console_room con = 10). obj_room_console_room_Step (con == 14) ставит scr_flag_set(1238, 1). В Create, если scr_flag_get(1055) < 4, создаётся obj_npc_ramb, и при scr_flag_get(1238) > 0 его y уменьшается на 30 (ramb_npc.y -= 30).",
    "related": [
      1239,
      1055
    ]
  },
  "1239": {
    "detail": "obj_room_green_room_Create переключает осматриваемый объект по флагу: extflag = (scr_flag_get(1239) == 0) ? «pippins_drink» : «stone_ramb»; при scr_flag_get(1239) > 0 маркер напитка поднимается (pippins_drink_marker.y = 60) и добавляется второй читаемый объект. obj_readable_room1_Other_10 для «pippins_drink»: при флаге 0 — scr_flag_set(1239, 1) и con = 170. В scr_text (case 1404) при global.choice == 0 и scr_flag_get(1239) < 2 — scr_flag_set(1239, 2) и три страницы рассказа о Рамбе.",
    "related": [
      1238
    ],
    "lines": [
      {
        "cond": "Рассказ о Рамбе (scr_text 1404, выбор «Да», flag[1239]<2 → 2)",
        "who": "narration",
        "text": "* Всегда пренебрегал любыми планами, под предлогом «А как же Крис?»"
      },
      {
        "cond": "Рассказ о Рамбе (scr_text 1404, выбор «Да», flag[1239]<2 → 2)",
        "who": "narration",
        "text": "* От него не отвяжешься, поэтому Тенна посадил его за стойку..."
      },
      {
        "cond": "Рассказ о Рамбе (scr_text 1404, выбор «Да», flag[1239]<2 → 2)",
        "who": "narration",
        "text": "* Мы из карточного замка тут как влитые. Он же вообще не в своей тарелке."
      }
    ]
  },
  "1243": {
    "detail": "Состояние второй ловушки-цепи Пультия. «На что влияет: при поимке (con==4) 1243 становится 1 — путь перекрыт цепью и obj_solidblocksized (chainblock), Пультий ругается; при значении <2 стоит блок и триггер; выбор «Да» у цепи снимает блок и ставит 1243=2 (цепь снята, проход открыт). Управляет проходимостью коридора Пультия.»",
    "related": [
      1230,
      1229
    ],
    "lines": [
      {
        "cond": "При flag[1243]=1 — пойман Пультием, путь перекрыт цепью",
        "who": "narration",
        "text": "* Э, куда разбежались?"
      },
      {
        "cond": "При flag[1243]=2 — хлипкая цепь снята, проход открыт",
        "who": "narration",
        "text": "* Цепь снята."
      }
    ]
  },
  "1244": {
    "detail": "Помечает получение камеры для головоломки родительского замка. «На что влияет: при ==1 obj_b3bs_console перестаёт блокировать камеру (nocamera=false) и obj_mainchara_board включает режим камеры (camera=true) в room_dw_puzzlecloset_3. Получение завязано на флаг 1150 (>=4) или прямой подбор предмета-камеры.»",
    "related": [
      1231,
      1150,
      1245
    ]
  },
  "1250": {
    "detail": "GlobalScript_scr_text: при scr_flag_get(1250) == 0 — scr_flag_set(1250, 1) и показ вступления (ветка зависит от scr_ch3_violencecheck() < 3). Рядом задаётся меню выбора покупки (choicemsg). Говорящий — scr_speaker(\"no_name\").",
    "lines": [
      {
        "cond": "Гл.3: первая встреча с торговцем телеобедов — вступление (flag=0)",
        "who": "narration",
        "text": "* О, привет! Меня поймали за продажу телеобедов за ТЁМНЫЕ ДОЛЛАРЫ."
      },
      {
        "cond": "Гл.3: первая встреча с торговцем телеобедов — вступление (flag=0)",
        "who": "narration",
        "text": "* Но им меня не остановить. Купите телеобед?"
      },
      {
        "cond": "Меню выбора покупки телеобеда",
        "who": "narration",
        "text": "#Купить три#за 800 $"
      },
      {
        "cond": "Меню выбора покупки телеобеда",
        "who": "narration",
        "text": "Не"
      }
    ]
  },
  "1252": {
    "detail": "Хранит, в какую сторону ушёл Gouldenson от весны. «На что влияет: значение 1 (влево) или 2 (вправо) определяет, у какой пружины (name «left»/«right») появится босс (boss=1 либо -1) при bossinit. Выбор делается через меню #Да/#Нет. Сохраняет направление на будущее.»",
    "lines": [
      {
        "cond": "Выбор у пружины: вариант «Да»",
        "who": "narration",
        "text": "#Да"
      },
      {
        "cond": "Выбор у пружины: вариант «Нет»",
        "who": "narration",
        "text": "#Нет"
      }
    ]
  },
  "1253": {
    "detail": "Маркер вскрытия сундука со 120 очками в комнате Прыгликов (зона b, инстанс 4). «На что влияет: при ==1 сундук открыт, 120 очков повторно не выдаются. Снятие в 0 вернёт возможность собрать очки.»",
    "related": [
      1203,
      1204,
      1206,
      1207,
      1209
    ]
  },
  "1255": {
    "detail": "Счётчик убитых мечом врагов на Sword Route (маршрут меча, Гл.3). «На что влияет: каждое убийство врага мечом увеличивает счётчик на 1 (плюс начисляется XP Крис); при >0 значение отображается в меню статистики obj_darkcontroller (со звёздочкой «*», ограничено 0–9999). Это показатель насилия маршрута меча; влияет на меню прогресса.»"
  },
  "1260": {
    "detail": "obj_readable_room1_Other_10: в room_dw_couch_overworld_02 для extflag «ralsei» при scr_flag_get(1260) == 0 — scr_flag_set(1260, 1), scr_speaker(\"ralsei\") и две страницы (\\E5 «.» → \\EJ «.um, sorry, Kris! You don't need a hint, do you?»).",
    "related": [
      1261
    ]
  },
  "1261": {
    "detail": "obj_readable_room1_Other_10: в room_dw_couch_overworld_02 для extflag «susie» при scr_flag_get(1261) == 0 — scr_flag_set(1261, 1), scr_speaker(\"susie\") и три страницы про Ральзея и головоломки (\\EA «Dude, Kris. if Ralsei hung out with us.» → \\E2 → \\EK).",
    "related": [
      1260
    ]
  },
  "1263": {
    "detail": "DEVICE_FAILURE_Create: при global.tempflag[96] == 1 (сбрасывается в 0) проверяется show_unique_message = scr_flag_get(1263) == 0; если истинно — scr_flag_set(1263, 1) и knight_mode_con = 30 (запуск уникальной сцены)."
  },
  "1267": {
    "detail": "Лучший результат мини-игры с газонокосилкой (а также маркер связанного сундука). «На что влияет: хранит наивысший счёт (mowscore*10); при первом прохождении ставится 1, далее обновляется только если новый счёт выше; Тенна комментирует результат (couchtalk). Тот же индекс используется obj_treasure_room (room_dw_teevie_large_01) — при ==1 сундук (item id 34) считается открытым. Чем больше число, тем лучше рекорд.»"
  },
  "1269": {
    "detail": "GlobalScript_scr_itemuse (case 313): при scr_flag_get(1269) == 0 — scr_flag_set(1269, 1), scr_speaker(\"no_name\") и три страницы видения.",
    "related": [
      1270
    ],
    "lines": [
      {
        "cond": "При первом использовании кристалла (flag[1269] 0 → 1)",
        "who": "narration",
        "text": "* Вы пристально вглядываетесь в кристалл."
      },
      {
        "cond": "При первом использовании кристалла (flag[1269] 0 → 1)",
        "who": "narration",
        "text": "* По какой-то причине всего на миг..."
      },
      {
        "cond": "При первом использовании кристалла (flag[1269] 0 → 1)",
        "who": "narration",
        "text": "* Вам показалось, что вы разглядели разбитый телевизор."
      }
    ]
  },
  "1270": {
    "detail": "GlobalScript_scr_itemuse (case 313): ветка else if scr_flag_get(1270) == 0 (когда флаг 1269 уже выставлен) — scr_flag_set(1270, 1), scr_speaker(\"no_name\") и две страницы.",
    "related": [
      1269
    ],
    "lines": [
      {
        "cond": "При повторном использовании кристалла «к глазу» (флаг → 1)",
        "who": "narration",
        "text": "* Вы пристально вглядываетесь в кристалл."
      },
      {
        "cond": "При повторном использовании кристалла «к глазу» (флаг → 1)",
        "who": "narration",
        "text": "* ...и ничего не происходит."
      }
    ]
  },
  "1271": {
    "detail": "В GlobalScript_scr_litemuseb.gml, ветка case 11: при scr_flag_get(1271)==0 вызывается scr_flag_set(1271,1), speaker = no_name (повествование), и печатаются три строки про взгляд сквозь кристалл и видение Андайн во льду. Условие проверяется раньше флага 1272, поэтому первое использование всегда показывает видение.",
    "related": [
      1272
    ],
    "lines": [
      {
        "cond": "Гл.3 (scr_litemuseb, case 11): первое использование предмета «к глазу» (flag[1271]=0→1) — видение Андайн во льду",
        "who": "narration",
        "text": "Вы пристально вглядываетесь в кристалл."
      },
      {
        "cond": "Гл.3 (scr_litemuseb, case 11): первое использование предмета «к глазу» (flag[1271]=0→1) — видение Андайн во льду",
        "who": "narration",
        "text": "По какой-то причине всего на миг..."
      },
      {
        "cond": "Гл.3 (scr_litemuseb, case 11): первое использование предмета «к глазу» (flag[1271]=0→1) — видение Андайн во льду",
        "who": "narration",
        "text": "Вам показалось, что вы разглядели Андайн, вмёрзшую в лёд."
      }
    ]
  },
  "1272": {
    "detail": "GlobalScript_scr_litemuseb.gml: после ветки 1271 идёт else if scr_flag_get(1272)==0 → scr_flag_set(1272,1) и две строки повествования (no_name) о том, что сквозь стекло ничего не видно. Это второе из трёх состояний эффекта стекла в Гл.3.",
    "related": [
      1271
    ],
    "lines": [
      {
        "cond": "Повторное «к глазу» после видения (flag[1272]=0 → ничего не происходит)",
        "who": "narration",
        "text": "Вы вглядываетесь в стекло."
      },
      {
        "cond": "Повторное «к глазу» после видения (flag[1272]=0 → ничего не происходит)",
        "who": "narration",
        "text": "..Но ничего не происходит."
      }
    ]
  },
  "1277": {
    "detail": "obj_dw_pippins_steal_Step_0.gml: при steal_timer==60, если prize_marker.sprite_index == spr_treasurebox, то scr_flag_set(1277, scr_flag_get(1277)+1). obj_room_teevie_bonus_zone_Create_0.gml: var max_stolen = scr_flag_get(1277) используется в цикле по prize_list, чтобы исключить уже украденные призы. Значение — целое число (количество), а не флаг 0/1.",
    "related": [
      1161
    ]
  },
  "1278": {
    "detail": "Состояние газировки от Сьюзи на маршруте меча. «На что влияет: при ==1 (после события leavescreen и при 1055>=6) в room_board_sword_intro появляется банка obj_swordroute_event_susiesoda, которую можно подобрать; при подборе флаг становится 2, и банка больше не спавнится (instance_destroy). Сохраняет, получена ли газировка.»",
    "related": [
      1055
    ]
  },
  "1301": {
    "related": [1312, 1411, 1832],
    "lines": [
      {
        "cond": "При значении 2",
        "who": "narration",
        "text": "(кат-сцена завершена: сияние скрыто, создаются NPC фиолетового цветка и сундуки maketreasure1/maketreasure2)"
      }
    ]
  },
  "1305": {
    "lines": [
      {
        "cond": "При значении 1 (первое посещение)",
        "who": "narration",
        "text": "(событие: создаётся obj_room_garden_hospital_intro; при значении > 1 — obj_room_garden_hospital_post)"
      }
    ]
  },
  "1309": {
    "sprites": [{ "src": "spr_npc_tropicalstarwalker_0", "cond": "При значении 0 - не нашли. При значении 1 - нашли." }],
    "lines": [

    ]
  },
  "1311": {
    "related": [1340, 1341, 1342, 1888, 1392, 1412],
    "fx": {
      "cap": "Ральзей в Главе 5 — носит ли шляпу (зависит от значения флага):",
      "states": [
        {
          "cond": "1311 = 1 — в шляпе (обычный вид)",
          "img": "game-sprites/flagfx/spr_ralseid_0.png"
        },
        {
          "cond": "1311 = 0 — без шляпы",
          "img": "game-sprites/flagfx/spr_ralsei_walk_down_0.png"
        }
      ]
    },
    "lines": [

    ]
  },
  "1312": {
    "related": [1411, 1846, 925, 1045, 1255, 1301],
    "lines": [
      {
        "cond": "При получении розовых монет из сундука",
        "who": "narration",
        "text": "* (You opened the treasure chest.)"
      },
      {
        "cond": "При получении розовых монет из сундука",
        "who": "narration",
        "text": "* (Inside was ~1.)"
      },
    ]
  },
  "1315": {
    "related": [1372],
    "lines": [
      {
        "cond": "При первом взаимодействии (значение становится 1)",
        "who": "narration",
        "text": "* Fishing is for Pals Only."
      }
    ]
  },
  "1319": {
    "related": [1362, 1842],
    "lines": [
      {
        "cond": "Пока значение < 2",
        "who": "narration",
        "text": "* (The theaters sold out.)"
      },
      {
        "cond": "При значении 2 (или plot >= 280)",
        "who": "narration",
        "text": "* (The theaters sold out. No more theaters for sale.)"
      }
    ]
  },
  "1322": {
    "lines": [
      {
        "cond": "Если выбрать вариант 0 (значение становится 1)",
        "who": "susie",
        "text": "* Hell yeah, let's go."
      },
      {
        "cond": "При значении 1 (сцена в LW11A)",
        "who": "noelle",
        "text": "* You, just, um, have some trash in your hair."
      },
      {
        "cond": "При значении 1 (сцена в LW11A)",
        "who": "susie",
        "text": "* Hey, just thought I'd dress up a bit for once."
      }
    ]
  },
  "1323": {
    "related": [1736],
    "lines": [
      {
        "cond": "Первый раз (значение 0)",
        "who": "susie",
        "text": "* Kris, I told ya. No more adventures at school today."
      },
      {
        "cond": "Первый раз (значение 0)",
        "who": "noelle",
        "text": "* ... adventures???"
      },
      {
        "cond": "Если выбрать «Adventures, like Quests» (значение 1)",
        "who": "susie",
        "text": "* Yeah, uh... I mean quests. Journeys. And @*."
      }
    ]
  },
  "1324": {
    "related": [1759, 1344, 309, 342, 349, 457],
    "lines": [
      {
        "cond": "По значению (вид двора Криса)",
        "who": "narration",
        "text": "(меняет время суток двора Криса: 0 — день (scr_manage_sunstate 1); 1 — фестиваль (depthsorter OBJECTS_FESTIVAL); 2 — вечер (слои теней зданий и оверлеи деревьев, sunstate 2); 3 — после сцены)"
      }
    ]
  },
  "1326": {
    "related": [1327, 1328, 1329, 1330, 1331, 1807],
    "lines": [
      {
        "cond": "При первом осмотре фигурки (значение 0 -> 1)",
        "who": "asgore",
        "text": "* Oh, that little action figure?"
      },
      {
        "cond": "При первом осмотре фигурки (значение 0 -> 1)",
        "who": "asgore",
        "text": "* Just a gift from a, sort of, friend of mine."
      },
      {
        "cond": "При первом осмотре фигурки (значение 0 -> 1)",
        "who": "asgore",
        "text": "* Isn't she cute? She's like the store mascot!"
      }
    ]
  },
  "1327": {
    "related": [1328, 1807, 1883, 1324, 1326, 1329],
    "lines": [
      {
        "cond": "Первый раз (значение 0 -> 1)",
        "who": "asgore",
        "text": "* Oh, Kris! What a surprise to see you with Noelle!"
      },
      {
        "cond": "Первый раз (значение 0 -> 1)",
        "who": "asgore",
        "text": "* Need a chaperone for the Ferris Wheel again? Oh ho..."
      },
      {
        "cond": "Первый раз (значение 0 -> 1)",
        "who": "noelle",
        "text": "* Umm, no, fahaha..."
      },
      {
        "cond": "Первый раз (значение 0 -> 1)",
        "who": "asgore",
        "text": "* All of you, just take any flowers you like!"
      },
      {
        "cond": "Первый раз (значение 0 -> 1)",
        "who": "asgore",
        "text": "* Any friends of our family get flowers for free!"
      },
      {
        "cond": "Первый раз (значение 0 -> 1)",
        "who": "noelle",
        "text": "* (... there's no way I'm not paying him money)"
      },
      {
        "cond": "При значении 1 (повторно)",
        "who": "asgore",
        "text": "* Take any flowers you like!"
      },
      {
        "cond": "При значении 1 (повторно)",
        "who": "asgore",
        "text": "* It's all free for you, Kris!"
      }
    ]
  },
  "1328": {
    "related": [1327, 1807, 1883, 1324, 1326, 1329],
    "lines": [
      {
        "cond": "Перед выбором",
        "who": "asgore",
        "text": "* Back when we were just young buds..."
      },
      {
        "cond": "Перед выбором",
        "who": "asgore",
        "text": "* Your mother and I were voted Festival King and Queen?"
      },
      {
        "cond": "Если выбрать вариант 0 (значение 1)",
        "who": "asgore",
        "text": "* Oh... is that so?"
      },
      {
        "cond": "Если выбрать вариант 0 (значение 1)",
        "who": "asgore",
        "text": "* ... well, it wouldn't hurt to hear it again, would it?"
      },
      {
        "cond": "Если выбрать вариант 1 (значение 2)",
        "who": "asgore",
        "text": "* Oh, is that so? Well, you're going to love this story..."
      }
    ]
  },
  "1329": {
    "related": [1326, 1327, 1328, 1330, 1331, 1807],
    "lines": [
      {
        "cond": "Перед выбором",
        "who": "asgore",
        "text": "* May I bring up a serious topic for a moment...?"
      },
      {
        "cond": "Если выбрать вариант 0 (значение 1)",
        "who": "asgore",
        "text": "* Right... no need for a blue cloud on a sunny day."
      },
      {
        "cond": "Если выбрать вариант 0 (значение 1)",
        "who": "asgore",
        "text": "* Kris. Lots of smiles today, okay?"
      },
      {
        "cond": "Если выбрать вариант 1 (значение 2)",
        "who": "asgore",
        "text": "* ... Kris... your mother."
      },
      {
        "cond": "Если выбрать вариант 1 (значение 2)",
        "who": "asgore",
        "text": "* ... living on a single teacher's salary..."
      },
      {
        "cond": "Если выбрать вариант 1 (значение 2)",
        "who": "asgore",
        "text": "* She tries to hide it, but... I can't imagine it's not difficult."
      },
      {
        "cond": "Если выбрать вариант 1 (значение 2)",
        "who": "asgore",
        "text": "* ..."
      },
      {
        "cond": "Если выбрать вариант 1 (значение 2)",
        "who": "asgore",
        "text": "* Kris, if things go well with Carol..."
      },
      {
        "cond": "Если выбрать вариант 1 (значение 2)",
        "who": "asgore",
        "text": "* ..."
      }
    ]
  },
  "1330": {
    "related": [1326, 1327, 1328, 1329, 1331, 1807],
    "lines": [
      {
        "cond": "При значении 0 (первый осмотр роз)",
        "who": "narration",
        "text": "* (You looked at the roses.)"
      },
      {
        "cond": "При значении 0 (первый осмотр роз)",
        "who": "asgore",
        "text": "* Roses! A perfect pick for a romantic moment!"
      },
      {
        "cond": "При значении 0 (первый осмотр роз)",
        "who": "asgore",
        "text": "* ... does anyone here need a romantic moment?"
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "susie",
        "text": "* ..."
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "noelle",
        "text": "* ..."
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "susie",
        "text": "* We could get them for Kris to use, on someone."
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "noelle",
        "text": "* Yeah."
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "noelle",
        "text": "* I get them, for Kris to use, and... I could..."
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "noelle",
        "text": "* Give them to you... to hold onto. Until then."
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "susie",
        "text": "* Yeah and I do the same thing but, uhh, reverse."
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "susie",
        "text": "* ..."
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "noelle",
        "text": "* Or... not."
      }
    ]
  },
  "1331": {
    "related": [1326, 1327, 1328, 1329, 1330, 1807],
    "lines": [
      {
        "cond": "При значении 0 (первый раз)",
        "who": "narration",
        "text": "* (You talked to the flowers.)"
      },
      {
        "cond": "При значении 0 (первый раз)",
        "who": "asgore",
        "text": "* Good idea, Kris! A pinch of love really peps them up!"
      }
    ]
  },
  "1332": {
    "lines": [
      {
        "cond": "По значению (предмет в руках)",
        "who": "narration",
        "text": "(переносит предмет в руках Криса между комнатами: 1 — лейка obj_wateringcan (mode 0); 2 — лейка (mode 1); 3 — вертушка obj_pinwheel_held; 0 — ничего; при входе предмет воссоздаётся в руках)"
      }
    ]
  },
  "1333": {
    "related": [1334, 349, 1335, 1336, 1337, 1352],
    "lines": [
      {
        "cond": "Запись Короля (значение = выбор+1: 1 Kris, 2 Susie, 3 Noelle, 4 Berdly)",
        "who": "narration",
        "text": "* (~1 was written down as King.)"
      },
      {
        "cond": "Запись Короля (далее вопрос о Королеве)",
        "who": "narration",
        "text": "* (Who do you write down as Queen?)"
      }
    ]
  },
  "1334": {
    "related": [1333, 349, 1335, 1336, 1337, 1352],
    "lines": [
      {
        "cond": "Запись Королевы (значение = выбор+1: 1 Kris, 2 Susie, 3 Noelle, 4 Queen)",
        "who": "narration",
        "text": "* (~1 was written down as Queen.)"
      },
      {
        "cond": "Если проголосовать не за Ноэль (определённые комбинации голосов, con 35)",
        "who": "noelle",
        "text": "* (Thanks for voting, Kris... I really appreciate that you...)"
      },
      {
        "cond": "Если проголосовать не за Ноэль (con 35)",
        "who": "noelle",
        "text": "* (...)"
      },
      {
        "cond": "Если проголосовать не за Ноэль (con 35)",
        "who": "noelle",
        "text": "* (Kris!?)"
      },
      {
        "cond": "Если проголосовать не за Ноэль (con 35)",
        "who": "noelle",
        "text": "* (You're just doing this to tease me, aren't you!)"
      },
      {
        "cond": "Если проголосовать не за Ноэль (con 35)",
        "who": "noelle",
        "text": "* (Y-you don't have to SPECIFICALLY write \"not noelle\" on it!!)"
      },
      {
        "cond": "Если проголосовать не за Ноэль (con 35)",
        "who": "noelle",
        "text": "* (And draw a picture of the two of you high fiving!)"
      },
      {
        "cond": "Если проголосовать не за Ноэль (con 35)",
        "who": "noelle",
        "text": "* (O... oh yeah, well, look at what I'm drawing!)"
      }
    ]
  },
  "1335": {
    "sprites": [{ "src": "spr_jockington_lt_0", "cond": "При значении > 0" }],
    "related": [1336, 1738, 349, 457, 1324, 1333],
    "lines": [
      {
        "cond": "Вопрос о бюллетене (перед выбором)",
        "who": "narration",
        "text": "* (What do you do with the ballot?)"
      },
      {
        "cond": "Если голосование уже завершено (значение > 0)",
        "who": "narration",
        "text": "* (The votes have already been cast.)"
      }
    ]
  },
  "1336": {
    "sprites": [{ "src": "spr_jockington_lt_beard_0", "cond": "При значении >= 2" }],
    "related": [1335, 1738, 349, 457, 1311, 1324],
    "lines": [
      {
        "cond": "При первом разговоре (значение 0 -> 1)",
        "who": "narration",
        "text": "* Look, Noelle,! I'm, on track to be both King, and Queen!"
      },
      {
        "cond": "При первом разговоре (значение 0 -> 1)",
        "who": "noelle",
        "text": "* Oh, Jockington! Should've known with how popular you are!"
      },
      {
        "cond": "При первом разговоре (значение 0 -> 1)",
        "who": "narration",
        "text": "* It's all because you, Always vote for me, Noelle! Haha!"
      },
      {
        "cond": "При первом разговоре (значение 0 -> 1)",
        "who": "narration",
        "text": "* Thanks 1 million!"
      },
      {
        "cond": "При первом разговоре (значение 0 -> 1)",
        "who": "noelle",
        "text": "* ..."
      },
      {
        "cond": "При первом разговоре (значение 0 -> 1)",
        "who": "narration",
        "text": "* Thanks 1 million, and 1!"
      },
      {
        "cond": "При первом разговоре (значение 0 -> 1)",
        "who": "narration",
        "text": "* Haha, this Event is the trigger,"
      },
      {
        "cond": "При первом разговоре (значение 0 -> 1)",
        "who": "narration",
        "text": "* For me to have the confidence, to grow facial hair."
      },
      {
        "cond": "При первом разговоре (значение 0 -> 1)",
        "who": "narration",
        "text": "* It's a defining, moment of my Adolescence!"
      },
      {
        "cond": "При первом разговоре (значение 0 -> 1)",
        "who": "narration",
        "text": "* Oh no! I can already feel it, happening!"
      },
      {
        "cond": "При значении >= 2 (повторный разговор, борода выросла)",
        "who": "narration",
        "text": "* I think I need to, Shave!"
      },
      {
        "cond": "При значении >= 2 (повторный разговор)",
        "who": "narration",
        "text": "* But, my beard, was Grown. It cannot be Undone."
      }
    ]
  },
  "1337": {
    "related": [1338, 1343, 349, 457, 1333, 1334],
    "lines": [
      {
        "cond": "Пока значение 0 (сцена в доме Кэтти)",
        "who": "berdly",
        "text": "* Kris, that's cruel to the other suitors!"
      },
      {
        "cond": "Пока значение 0 (сцена в доме Кэтти)",
        "who": "berdly",
        "text": "* EVERYONE should have a fair chance to be my Queen!"
      },
      {
        "cond": "Пока значение 0 (сцена в доме Кэтти)",
        "who": "berdly",
        "text": "* Measure first, the dokis of our heart."
      },
      {
        "cond": "Пока значение 0 (сцена в доме Кэтти)",
        "who": "berdly",
        "text": "* Then ONLY AFTER... do we vote. With heart-dotted i's."
      },
      {
        "cond": "Пока значение 0 (сцена в доме Кэтти)",
        "who": "berdly",
        "text": "* That's what Democracy is, Kris."
      },
      {
        "cond": "Пока значение 0 (сцена в доме Кэтти)",
        "who": "berdly",
        "text": "* Deciding the King and Queen, correctly."
      }
    ]
  },
  "1338": {
    "related": [1337, 1343, 457, 1339],
    "lines": [
      {
        "cond": "Перед выбором (значение 0)",
        "who": "berdly",
        "text": "* Kris, you hang around the two of them like a dog,"
      },
      {
        "cond": "Перед выбором (значение 0)",
        "who": "berdly",
        "text": "* Sipping from the drink dangling from their hand as they embrace..."
      },
      {
        "cond": "Перед выбором (значение 0)",
        "who": "berdly",
        "text": "* While you're getting brain freeze, I've been calculating..."
      },
      {
        "cond": "Перед выбором (значение 0)",
        "who": "berdly",
        "text": "* A poem for Noelle to use on Susie. Lend a floppy ear?"
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "berdly",
        "text": "* But lo, a madame such purple in tone,"
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "berdly",
        "text": "* Makes me drool like a dog for bone."
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "berdly",
        "text": "* Would you take this deer to be dear to your heart?"
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "berdly",
        "text": "* And forget your love for the bluebird of smart?"
      },
      {
        "cond": "Если выбрать «Yes» (значение 1)",
        "who": "berdly",
        "text": "* ... what say you, Kris? Do you like?"
      }
    ]
  },
  "1339": {
    "related": [1337, 1338, 1343],
    "lines": [
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "berdly",
        "text": "Aha, such fine taste! Or bad taste, if that was sarcasm!"
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "berdly",
        "text": "But really good taste... if it wasn't. ... unless it was?"
      },
      {
        "cond": "при выборе второго варианта (значение 2)",
        "who": "berdly",
        "text": "As usual, true art is never appreciated by the slobbering masses."
      },
      {
        "cond": "при выборе второго варианта (значение 2)",
        "who": "berdly",
        "text": "That's it! No love poem for you this February! I mean it!"
      }
    ]
  },
  "1340": {
    "related": [1311, 1341, 1342, 1888],
    "lines": [
      {
        "cond": "при значении 1 (первый раз)",
        "who": "narration",
        "text": "You pressed Floradinn in a book to make it MORE FLAT! The memories will last forever..."
      },
      {
        "cond": "при значении 2 и выше (повторно)",
        "who": "narration",
        "text": "You flattened Floradinn!"
      }
    ]
  },
  "1341": {
    "related": [1311, 1340, 1342, 1888],
    "lines": [
      {
        "cond": "при значении 1 (первый раз)",
        "who": "narration",
        "text": "Ralsei tried to CONVINCE Floradinn!"
      },
      {
        "cond": "при значении 1 (первый раз)",
        "who": "ralsei",
        "text": "We don't want to fight you, Floradinn!"
      },
      {
        "cond": "при значении 2 и выше (повторно)",
        "who": "narration",
        "text": "Ralsei made a boring speech!"
      }
    ]
  },
  "1342": {
    "lines": [
      {
        "cond": "при значении 1 (первый раз)",
        "who": "narration",
        "text": "Susie gets ready to FLIRT!"
      },
      {
        "cond": "при значении 1 (первый раз)",
        "who": "susie",
        "text": "Heh, watch THIS. I'm way better at this now...!"
      },
      {
        "cond": "при значении 2 и выше (повторно)",
        "who": "narration",
        "text": "Susie abstains from flirting!"
      }
    ]
  },
  "1343": {
    "related": [1337, 1338, 457, 1339],
    "lines": [
      {
        "cond": "при первом разговоре (значение 0, ставит 1)",
        "who": "noelle",
        "text": "Berdly... how is your arm doing?"
      },
      {
        "cond": "при первом разговоре (значение 0, ставит 1)",
        "who": "berdly",
        "text": "It's very strange. Besides a lowered temperature..."
      },
      {
        "cond": "при первом разговоре (значение 0, ставит 1)",
        "who": "berdly",
        "text": "They can't seem to find any abnormalities."
      },
      {
        "cond": "при первом разговоре (значение 0, ставит 1)",
        "who": "berdly",
        "text": "..."
      },
      {
        "cond": "при первом разговоре (значение 0, ставит 1)",
        "who": "berdly",
        "text": "... I have my own theory about it, but..."
      },
      {
        "cond": "при первом разговоре (значение 0, ставит 1)",
        "who": "berdly",
        "text": "Ah, it's too irrational! Enjoy your date, honeys!"
      },
      {
        "cond": "при значении 1 (повторно)",
        "who": "berdly",
        "text": "Kris, I suppose it's appropriate I only have one arm."
      },
      {
        "cond": "при значении 1 (повторно)",
        "who": "berdly",
        "text": "Might make you an actual challenge in our gaming duels."
      },
      {
        "cond": "при значении 1 (повторно)",
        "who": "berdly",
        "text": "..."
      },
      {
        "cond": "при значении 1 (повторно)",
        "who": "berdly",
        "text": "Which, should actually happen, at some point."
      }
    ]
  },
  "1344": {
    "related": [1324, 349, 1216, 1759],
    "lines": [
      {
        "cond": "при первом разговоре (значение 0, ставит 1)",
        "who": "narration",
        "text": "i didn't say it was good for anything."
      },
      {
        "cond": "при первом разговоре (значение 0, ставит 1)",
        "who": "susie",
        "text": "..."
      },
      {
        "cond": "при первом разговоре (значение 0, ставит 1)",
        "who": "noelle",
        "text": "Hahahaha!! Susie, your face!!"
      }
    ]
  },
  "1345": {
    "related": [1346, 1347, 1753, 1808],
    "lines": [
      {
        "cond": "при выборе «Susie» впервые (значение 0, ставит 1)",
        "who": "susie",
        "text": "Hmm... octopus? It just tastes like... raw..."
      },
      {
        "cond": "при выборе «Susie» впервые (значение 0, ставит 1)",
        "who": "susie",
        "text": "Onion? ... yeah, no thanks."
      },
      {
        "cond": "при выборе «Susie» повторно (значение 1)",
        "who": "susie",
        "text": "No."
      }
    ]
  },
  "1346": {
    "related": [1345, 1347, 1753, 1808],
    "lines": [
      {
        "cond": "при выборе «Noelle» впервые (значение 0, ставит 1)",
        "who": "noelle",
        "text": "It doesn't have REAL octopus in it, right?"
      },
      {
        "cond": "при выборе «Noelle» впервые (значение 0, ставит 1)",
        "who": "noelle",
        "text": "You know me, I'm more a soymilk and cookies kind of girl..."
      },
      {
        "cond": "при выборе «Noelle» впервые (значение 0, ставит 1)",
        "who": "susie",
        "text": "Better than milk and ketchup. You ever try that?"
      },
      {
        "cond": "при выборе «Noelle» впервые (значение 0, ставит 1)",
        "who": "noelle",
        "text": "Only when SOMEONE said it was strawberry milk?"
      },
      {
        "cond": "при выборе «Noelle» впервые (значение 0, ставит 1)",
        "who": "susie",
        "text": "Dude, I thought I could make strawberry milk, too!"
      },
      {
        "cond": "при выборе «Noelle» впервые (значение 0, ставит 1)",
        "who": "noelle",
        "text": "U-um... (maybe she's misunderstanding, but her face...?)"
      },
      {
        "cond": "при выборе «Noelle» повторно (значение 1)",
        "who": "noelle",
        "text": "(Kris, you know I'd rather starve than eat this, right?)"
      }
    ]
  },
  "1347": {
    "related": [1345, 1346, 1753, 1808],
    "lines": [
      {
        "cond": "при выборе «съесть» впервые (значение 0, ставит 1)",
        "who": "narration",
        "text": "(You took a bite... huh? There's a fortune cookie paper inside, but it's moist...)"
      },
      {
        "cond": "при выборе «съесть» впервые (значение 0, ставит 1)",
        "who": "narration",
        "text": "(\"Try our discount code: B A L L\")"
      },
      {
        "cond": "при выборе «съесть» повторно (значение 1)",
        "who": "narration",
        "text": "(Daily ball limit reached.)"
      }
    ]
  },
  "1348": {
    "sprites": [{ "src": "spr_npc_icemascot_fake_0", "cond": "При значении 0 — не упал в воду; при 1 — упал в воду" }],
    "related": [1324],
    "lines": [
      {
        "cond": "при значении 1 (после события)",
        "who": "narration",
        "text": "(He's melting...)"
      }
    ]
  },
  "1350": {
    "related": [1351, 1757, 342, 430, 701, 832],
    "lines": [
      {
        "cond": "при значении 0 (первый раз, ставит 1)",
        "who": "narration",
        "text": "Does my best!!! Does my very best...!!!"
      },
      {
        "cond": "при значении 0 (первый раз, ставит 1)",
        "who": "narration",
        "text": "(... appears to be full of chili)"
      },
      {
        "cond": "при значении 1 (повторно)",
        "who": "narration",
        "text": "(... appears to be full of chili)"
      },
      {
        "cond": "при значении 1 (повторно)",
        "who": "susie",
        "text": "Damn that seems like a cool job"
      }
    ]
  },
  "1351": {
    "sprites": [{ "src": "spr_npc_innkeep_child_0", "cond": "при значении 0" }],
    "related": [1350, 1757, 342, 430, 701, 832],
    "lines": [
      {
        "cond": "при срабатывании события (ставит значение 1)",
        "who": "noelle",
        "text": "Susie!!!"
      }
    ]
  },
  "1352": {
    "related": [1353, 1355, 1356, 1324, 1333, 1334],
    "lines": [
      {
        "cond": "первый разговор (значение 0, до выбора)",
        "who": "narration",
        "text": "hey, wanna ride the ferris wheel?"
      },
      {
        "cond": "первый разговор (значение 0, до выбора)",
        "who": "noelle",
        "text": "..."
      },
      {
        "cond": "первый разговор (значение 0, до выбора)",
        "who": "susie",
        "text": "..."
      },
      {
        "cond": "первый разговор (значение 0, до выбора)",
        "who": "noelle",
        "text": "Umm, what do you think, Kris?"
      },
      {
        "cond": "при значении больше 0 (повторно)",
        "who": "narration",
        "text": "wanna ride the wheel?"
      },
      {
        "cond": "завершение катания на колесе",
        "who": "susie",
        "text": "Enough wheel for today."
      }
    ]
  },
  "1353": {
    "related": [1352, 1355, 1356, 1324, 1333, 1334],
    "lines": [
      {
        "cond": "при значении 1 (Ноэль отказывается)",
        "who": "noelle",
        "text": "Huh...?"
      },
      {
        "cond": "при значении 1 (Ноэль отказывается)",
        "who": "noelle",
        "text": "You... actually want to go with me?"
      },
      {
        "cond": "при значении 1 (Ноэль отказывается)",
        "who": "noelle",
        "text": "What, so you can shake the ride and scare me again?"
      },
      {
        "cond": "при значении 1 (Ноэль отказывается)",
        "who": "noelle",
        "text": "No thanks, Kris! Faha!"
      },
      {
        "cond": "при значении 2 (Ноэль настойчиво отказывается)",
        "who": "noelle",
        "text": "No thanks, Kris! Faha!"
      },
      {
        "cond": "при значении 2 (Ноэль настойчиво отказывается)",
        "who": "noelle",
        "text": "... you're not making me do anything."
      },
      {
        "cond": "при значении 2 (Ноэль настойчиво отказывается)",
        "who": "noelle",
        "text": "You hear that?"
      },
      {
        "cond": "при значении 3 (Ноэль соглашается прокатиться)",
        "who": "noelle",
        "text": "..."
      },
      {
        "cond": "при значении 3 (Ноэль соглашается прокатиться)",
        "who": "noelle",
        "text": "... yeah, let's ride, Kris!"
      },
      {
        "cond": "при значении 3 (Ноэль соглашается прокатиться)",
        "who": "noelle",
        "text": "Umm..."
      },
      {
        "cond": "при значении 3 (Ноэль соглашается прокатиться)",
        "who": "noelle",
        "text": "... sure, Kris. If you want to."
      },
      {
        "cond": "при значении 4 (Ноэль увлекают на колесо)",
        "who": "noelle",
        "text": "H-hey, Kris, wait a sec---!"
      }
    ]
  },
  "1354": {
    "related": [1333, 1334, 1352, 1353, 1355, 1356],
    "lines": [
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "noelle",
        "text": "H-HEY!!!!"
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "noelle",
        "text": "Gosh, you haven't grown up one bit, have you, Kris?"
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "noelle",
        "text": "..."
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "noelle",
        "text": "... neither... have I, I guess."
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "noelle",
        "text": "Faha... fahahahahaha!!!"
      }
    ]
  },
  "1355": {
    "related": [1352, 1353, 1356, 1324, 1333, 1334],
    "lines": [
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "susie",
        "text": "What are you doing? Making a \"C\"...?"
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "susie",
        "text": "Sure, that's a cool pose. I'll match."
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "susie",
        "text": "Hey Noelle! Look at our cool pose!"
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "susie",
        "text": "..."
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "susie",
        "text": "Huh... I dunno if know she likes it."
      }
    ]
  },
  "1356": {
    "related": [1352, 1353, 1355, 1324, 1333, 1334],
    "lines": [
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "narration",
        "text": "(You closed your eyes...)"
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "narration",
        "text": "(... you thought about what they might be doing...)"
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "narration",
        "text": "(... but you didn't think about it very hard.)"
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "narration",
        "text": "(Instead, you wondered about the qualifications of Sans.)"
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "narration",
        "text": "(... he doesn't seem certified to run a Ferris wheel.)"
      },
      {
        "cond": "при выборе первого варианта (значение 1)",
        "who": "narration",
        "text": "(... didn't someone else run this last year?)"
      },
      {
        "cond": "при выборе второго варианта (значение 2)",
        "who": "narration",
        "text": "(You closed your eyes...)"
      },
      {
        "cond": "при выборе второго варианта (значение 2)",
        "who": "narration",
        "text": "(You remember your brother riding on the ride with Dess.)"
      },
      {
        "cond": "при выборе второго варианта (значение 2)",
        "who": "narration",
        "text": "(He waves at you from the window with a big smile.)"
      },
      {
        "cond": "при выборе второго варианта (значение 2)",
        "who": "narration",
        "text": "(... you throw a dirt clod at Dess in the window and miss.)"
      }
    ]
  },
  "1358": {
    "lines": [
      {
        "cond": "при значении 0 (первая попытка)",
        "who": "susie",
        "text": "Nope. Get the hell back down here."
      },
      {
        "cond": "при значении 1 (вторая попытка)",
        "who": "susie",
        "text": "... you're just having fun, aren't you."
      }
    ]
  },
  "1362": {
    "related": [1319, 1842],
    "lines": [
      {
        "cond": "при значении больше 0 (загадка решена)",
        "who": "narration",
        "text": "I was supposed to guard here. But I think someone was impersonating me."
      },
      {
        "cond": "при значении больше 0 (загадка решена)",
        "who": "narration",
        "text": "Impersonating me and my big fluffy $$$$-ing tail..."
      }
    ]
  },
  "1363": {
    "lines": [
      {
        "cond": "при значении 0 (лейка на пьедестале, ставит 1)",
        "who": "ralsei",
        "text": "This watering can looks somewhat important..."
      },
      {
        "cond": "при значении 0 (лейка на пьедестале, ставит 1)",
        "who": "ralsei",
        "text": "Kris, perhaps if you held it in your hands, you could..."
      },
      {
        "cond": "при значении 0 (лейка на пьедестале, ставит 1)",
        "who": "ralsei",
        "text": "Okay."
      }
    ]
  },
  "1364": {
    "lines": [
      {
        "cond": "в режиме множественного укуса (значение 3 и выше, комната room_dw_fcastle_heldmushrooms)",
        "who": "narration",
        "text": "(Take all bite(s(s(s)))?)"
      }
    ]
  },
  "1371": {
    "sprites": [{ "src": "spr_treasurebox_0", "cond": "при установленном бите 9 (путь расчищен)" }],
    "related": [1831],
    "lines": [

    ]
  },
  "1372": {
    "sprites": [{ "src": "spr_kooby_developed_eating_0", "cond": "при значении 1" }],
    "related": [1315],
    "lines": [
      {
        "cond": "при значении 0 (табличка)",
        "who": "narration",
        "text": "(Specimen name: Kooby)"
      },
      {
        "cond": "при значении 0 (табличка)",
        "who": "narration",
        "text": "(Believes he looks the most like a Spring Dumpling out of any worm in the world.)"
      },
      {
        "cond": "при значении 0 (табличка)",
        "who": "narration",
        "text": "(Eats leaves and bread.)"
      },
      {
        "cond": "при значении 0 (табличка)",
        "who": "narration",
        "text": "(Not much opportunity for development.)"
      },
      {
        "cond": "при значении 1 (табличка)",
        "who": "narration",
        "text": "(He developed.)"
      },
      {
        "cond": "при значении 0 (червь Куби)",
        "who": "narration",
        "text": "Munf, munf. I look like a spring dumpling."
      },
      {
        "cond": "при значении 1 (червь Куби)",
        "who": "narration",
        "text": "I developed."
      },
      {
        "cond": "при значении 0 (скептик)",
        "who": "narration",
        "text": "Heh. That guy's never going to develop."
      },
      {
        "cond": "при значении 1 (скептик)",
        "who": "narration",
        "text": "WH-WHAT!? HE DEVELOPED!?"
      }
    ]
  },
  "1374": {
    "lines": [
      {
        "cond": "при значении 0 (куст на месте)",
        "who": "narration",
        "text": "(It's a shrub being cut into someone's ideally shaped roadblock.)"
      },
      {
        "cond": "при значении 1",
        "who": "narration",
        "text": "(RU: ножницы-NPC (shearies) удаляются, куст-преграда исчезает)"
      }
    ]
  },
  "1375": {
    "related": [309, 710, 1324, 1427, 1458],
    "lines": [
      {
        "cond": "при сборе предметов с обрыва (ставит значение 1)",
        "who": "narration",
        "text": "(You got ShadowCrystal.)"
      },
      {
        "cond": "при значении 1 (предметы собраны, осмотр)",
        "who": "narration",
        "text": "(There's a hole in the wall...)"
      },
      {
        "cond": "при значении 1 (предметы собраны, осмотр)",
        "who": "narration",
        "text": "(There's nothing inside.)"
      }
    ]
  },
  "1376": {
    "related": [342, 1324, 1377, 1466],
    "lines": [
      {
        "cond": "при использовании предмета",
        "who": "narration",
        "text": "It doesn't seem very useful."
      },
      {
        "cond": "при первом использовании в доме Ториэль (plot < 105, ставит 1)",
        "who": "narration",
        "text": "You looked through the glass."
      },
      {
        "cond": "при первом использовании в доме Ториэль (plot < 105, ставит 1)",
        "who": "narration",
        "text": "For some strange reason, for just a brief moment..."
      },
      {
        "cond": "при первом использовании в доме Ториэль (plot < 105, ставит 1)",
        "who": "narration",
        "text": "You thought you saw your mother holding someone else."
      }
    ]
  },
  "1377": {
    "related": [342, 1324, 1376, 1466],
    "lines": [
      {
        "cond": "при первом использовании во время фестиваля (plot 105–200, ставит 1)",
        "who": "narration",
        "text": "You looked through the glass."
      },
      {
        "cond": "при первом использовании во время фестиваля (plot 105–200, ставит 1)",
        "who": "narration",
        "text": "For some strange reason, for just a moment..."
      },
      {
        "cond": "при первом использовании во время фестиваля (plot 105–200, ставит 1)",
        "who": "narration",
        "text": "You thought you saw Susie in a far-off window, unkempt and glaring."
      }
    ]
  },
  "1378": {
    "related": [1379, 1514],
    "lines": [
      {
        "cond": "при первом осмотре кристалла через глаз в саду (значение 0 → 1)",
        "who": "narration",
        "text": "* You held the crystal up to your eye."
      },
      {
        "cond": "при первом осмотре кристалла через глаз в саду (значение 0 → 1)",
        "who": "narration",
        "text": "* For some strange reason, for a brief moment, it looked like..."
      },
      {
        "cond": "при первом осмотре кристалла через глаз в саду (значение 0 → 1)",
        "who": "narration",
        "text": "* Everyone else disappeared..."
      },
      {
        "cond": "при первом осмотре кристалла через глаз в саду (значение 0 → 1)",
        "who": "narration",
        "text": "* ... and you saw Noelle smiling at you, with arms full of flowers."
      }
    ]
  },
  "1379": {
    "related": [1378, 1514],
    "lines": [
      {
        "cond": "при первом использовании предмета вне сада (значение 0 → 1)",
        "who": "narration",
        "text": "* You looked through the glass."
      },
      {
        "cond": "при первом использовании предмета вне сада (значение 0 → 1)",
        "who": "narration",
        "text": "* ... but nothing happened."
      },
      {
        "cond": "при повторном использовании (значение 1)",
        "who": "narration",
        "text": "* It doesn't seem very useful."
      }
    ]
  },
  "1380": {
    "related": [1381, 1382, 1324, 1383, 1450, 1822],
    "lines": [
      {
        "cond": "при первом разговоре с Догами (значение 0 → 1)",
        "who": "narration",
        "text": "* (... the truth is, this ghost couldn't get the power tester set up alone, so...)"
      },
      {
        "cond": "при первом разговоре с Догами (значение 0 → 1)",
        "who": "narration",
        "text": "* (... we took pity and dug them out of trouble.)"
      },
      {
        "cond": "при повторном разговоре (значение 1)",
        "who": "narration",
        "text": "* (In return, they got cut up hot dogs in dog food for us...!)"
      }
    ]
  },
  "1381": {
    "related": [1380, 1382, 1324, 1383, 1450, 1822],
    "lines": [
      {
        "cond": "при первом разговоре с Догарессой (значение 0 → 1)",
        "who": "narration",
        "text": "* Heh heh, the police have lost their bite without ol' pointy teeth."
      },
      {
        "cond": "при первом разговоре с Догарессой (значение 0 → 1)",
        "who": "narration",
        "text": "* Now, we've infiltrated them completely..."
      },
      {
        "cond": "при повторном разговоре (значение 1)",
        "who": "narration",
        "text": "* Actually, they think that they've infiltrated us, but the truth is..."
      },
      {
        "cond": "при повторном разговоре (значение 1)",
        "who": "narration",
        "text": "* We actually infiltrated them infiltrating us... I think. I don't know."
      },
      {
        "cond": "при повторном разговоре (значение 1)",
        "who": "narration",
        "text": "* All I know is we really like each other."
      }
    ]
  },
  "1382": {
    "related": [1380, 1381, 1324, 1383, 1450, 1822],
    "lines": [
      {
        "cond": "при выборе напарника для игры с молотом (значение = выбор + 1)",
        "who": "noelle",
        "text": "* Umm... who should do the hammer game together?"
      }
    ]
  },
  "1383": {
    "related": [1380, 1381, 1382, 1450, 1822],
    "lines": [
      {
        "cond": "при значении 3 (успели вовремя)",
        "who": "noelle",
        "text": "* Hey, we... we actually did it! We won!"
      },
      {
        "cond": "при значении 3 (успели вовремя)",
        "who": "noelle",
        "text": "* ... neither of us could ever ring the bell as kids."
      },
      {
        "cond": "при значении 3 (успели вовремя)",
        "who": "noelle",
        "text": "* Guess we both... got stronger. Faha."
      },
      {
        "cond": "при значении 1 (ударили слишком рано)",
        "who": "noelle",
        "text": "* Um, KRIS? I hadn't finished counting yet!"
      },
      {
        "cond": "при значении 1 (ударили слишком рано)",
        "who": "noelle",
        "text": "* I just had to try to match your timing, and..."
      },
      {
        "cond": "при значении 2 (слишком долго)",
        "who": "noelle",
        "text": "* Um, KRIS? What took you so long!?"
      },
      {
        "cond": "при значении 2 (слишком долго)",
        "who": "noelle",
        "text": "* I just had to try to match your timing, and..."
      },
      {
        "cond": "после неудачи (значение 1 или 2)",
        "who": "susie",
        "text": "* Woah! You guys did perfect!"
      },
      {
        "cond": "после неудачи (значение 1 или 2)",
        "who": "noelle",
        "text": "* H-huh...?"
      },
      {
        "cond": "после неудачи (значение 1 или 2)",
        "who": "noelle",
        "text": "* N-no we didn't...!"
      }
    ]
  },
  "1388": {
    "related": [1709],
    "lines": [
      {
        "cond": "при выборе рассказать отцу (значение 0 → 1)",
        "who": "noelle",
        "text": "Dad!!"
      },
      {
        "cond": "при выборе рассказать отцу (значение 0 → 1)",
        "who": "noelle",
        "text": "* (Just so you know, Dad... I brought Susie over yesterday.)"
      },
      {
        "cond": "при выборе рассказать отцу (значение 0 → 1)",
        "who": "noelle",
        "text": "* (And I... I made her play the guitar. Mom saw, and...)"
      }
    ]
  },
  "1392": {
    "related": [1311, 207, 925, 1037, 1045, 1255],
    "lines": [
      {
        "cond": "при выборе «Let's be his friend» в погоне за Сьюзи (значение 5)",
        "who": "ralsei",
        "text": "* R-right!"
      },
      {
        "cond": "при выборе «Let's be his friend» в погоне за Сьюзи (значение 5)",
        "who": "ralsei",
        "text": "* No matter... the kind of strange feelings I might have..."
      }
    ]
  },
  "1393": {
    "related": [1394, 1395, 1396, 1397, 1418, 1419],
    "lines": [
      {
        "cond": "при первом разговоре со священником (con 10)",
        "who": "narration",
        "text": "* Kris. It's good to see you in church."
      },
      {
        "cond": "при первом разговоре со священником (con 10)",
        "who": "narration",
        "text": "* Even if it's, haunted church."
      },
      {
        "cond": "при первом разговоре со священником (con 10)",
        "who": "narration",
        "text": "* (Kris, may I... confide something in you?)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (When I arrived in the great hall to set up this morning.)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (The sight set me aghast.)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (The sanctuary, in shambles. Candles, books, torn and strewn about.)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (Fearing a robbery, I rushed to my office, where I found...)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (A handwritten note.)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (Not one of defamation or ransom, but instead...)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (A message, of encouragement.)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (Invoking my father's name,)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (It told me to follow my dreams.)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (...)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (How could they know. And how could... how could they write so.)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (So confidently. With so many misspellings. With so many errors?)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (... that's just it. The imperfection, lent to its sincerity...)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (...)"
      },
      {
        "cond": "при выборе выслушать (значение 0 → 1)",
        "who": "narration",
        "text": "* (Next time, I would like to write my own sermon, Kris.)"
      }
    ]
  },
  "1394": {
    "sprites": [{ "src": "spr_npc_catti_fortune_surprise_0", "cond": "при значении 1 (выбрано съесть)" }],
    "related": [1393, 1395, 1396, 1397, 1418, 1419],
    "lines": [
      {
        "cond": "при осмотре чаши «глазных яблок» (con 30)",
        "who": "narration",
        "text": "* (A bowl of \"eyeballs.\")"
      },
      {
        "cond": "при ответе (выбор не «съесть»)",
        "who": "susie",
        "text": "* Exactly. People put those in their mouths."
      }
    ]
  },
  "1395": {
    "related": [1393, 1394, 1396, 1397, 1418, 1419],
    "lines": [
      {
        "cond": "при повторном осмотре мумии (значение 1)",
        "who": "narration",
        "text": "* (It's protesting for the eyeballs to be recognized properly as grapes.)"
      }
    ]
  },
  "1396": {
    "sprites": [{ "src": "spr_alphys_ceiling_spin_0", "cond": "при значении 1 (после события с Альфис)" }],
    "related": [1393, 1394, 1395, 1397, 1418, 1419],
    "lines": [

    ]
  },
  "1397": {
    "related": [1393, 1394, 1395, 1396, 1418, 1419],
    "lines": [
      {
        "cond": "при первом разговоре с Кэтти (значение 0 → 1)",
        "who": "narration",
        "text": "* (K... Kris...?)"
      },
      {
        "cond": "при первом разговоре с Кэтти (значение 0 → 1)",
        "who": "narration",
        "text": "* (How could you. Let Noelle go. With the purple beast...?)"
      },
      {
        "cond": "при первом разговоре с Кэтти (значение 0 → 1)",
        "who": "narration",
        "text": "* (Is this... revenge... for all the way back then?)"
      },
      {
        "cond": "при первом разговоре с Кэтти (значение 0 → 1)",
        "who": "narration",
        "text": "* (... I told you. I already cast apology spells...)"
      },
      {
        "cond": "при первом разговоре с Кэтти (значение 0 → 1)",
        "who": "narration",
        "text": "* (I admit. I was weak. The fear took me.)"
      },
      {
        "cond": "при первом разговоре с Кэтти (значение 0 → 1)",
        "who": "narration",
        "text": "* (... I left you. To complete. The summoning alone.)"
      },
      {
        "cond": "при первом разговоре с Кэтти (значение 0 → 1)",
        "who": "narration",
        "text": "* (Do you really still. Curse me for that...?)"
      },
      {
        "cond": "при повторном разговоре (con 62)",
        "who": "narration",
        "text": "* (Kris... think back. You. Me. Noelle. We are neighbors. A tribe.)"
      },
      {
        "cond": "при повторном разговоре (con 62)",
        "who": "narration",
        "text": "* (Susie... is an invader. A dark force. Wake up, Kris!)"
      }
    ]
  },
  "1398": {
    "related": [1393, 1394, 1395, 1396, 1397, 1417],
    "lines": [
      {
        "cond": "при осмотре сока/крови (con 20)",
        "who": "narration",
        "text": "* (Cool haunted blood?)"
      }
    ]
  },
  "1403": {
    "related": [1453, 1406, 1407, 1408, 1409, 1415],
    "lines": [
      {
        "cond": "при выборе «сказать правду» (значение → 2)",
        "who": "narration",
        "text": "* ... yeah. Even if it makes him hate me..."
      },
      {
        "cond": "при выборе «сказать правду» (значение → 2)",
        "who": "narration",
        "text": "* I have to..."
      },
      {
        "cond": "при выборе «промолчать»",
        "who": "narration",
        "text": "* ... you're right. Even if he's suffering now..."
      },
      {
        "cond": "при выборе «промолчать»",
        "who": "narration",
        "text": "* Learning the truth in front of everybody else..."
      },
      {
        "cond": "при выборе «промолчать»",
        "who": "narration",
        "text": "* Might just make everything worse..."
      }
    ]
  },
  "1404": {
    "related": [1036, 1037],
    "lines": [
      {
        "cond": "если сундук уже открыт (значение ≥ 1)",
        "who": "narration",
        "text": "* (The chest is empty.)"
      },
      {
        "cond": "при открытии сундука с лентой (значение → 1)",
        "who": "ralsei",
        "text": "* Aww, Kris! Remember on our first adventure..."
      },
      {
        "cond": "при открытии сундука с лентой (значение → 1)",
        "who": "ralsei",
        "text": "* ... when we found that ribbon in a box?"
      },
      {
        "cond": "при открытии сундука с лентой (значение → 1)",
        "who": "ralsei",
        "text": "* Kind of makes me... want to wear one again."
      },
      {
        "cond": "при открытии сундука с лентой (реакция Сьюзи)",
        "who": "susie",
        "text": "Don't look so smug about it, dumbass!"
      },
      {
        "cond": "значение 2 — ленту надевает Крис (variation 0)",
        "who": "ralsei",
        "text": "* Aww, Kris! You look really nice..."
      },
      {
        "cond": "значение 2 — ленту надевает Крис (variation 0)",
        "who": "susie",
        "text": "* ... it is kinda cool. You can wear anything."
      },
      {
        "cond": "значение 2 — ленту надевает Крис (variation 0)",
        "who": "susie",
        "text": "* Here, try on Ralsei's glasses..."
      },
      {
        "cond": "значение 3 — ленту надевает Сьюзи (variation 1)",
        "who": "susie",
        "text": "* ..."
      },
      {
        "cond": "значение 3 — ленту надевает Сьюзи (variation 1)",
        "who": "ralsei",
        "text": "* Aww, Susie! You look cute!"
      },
      {
        "cond": "значение 4 — ленту надевает Ральзей (variation 2)",
        "who": "ralsei",
        "text": "* Ummm... d-do I still look cute?"
      },
      {
        "cond": "значение 4 — ленту надевает Ральзей (variation 2)",
        "who": "susie",
        "text": "* The hell do you mean \"still?\""
      },
      {
        "cond": "значение 4 — ленту надевает Ральзей (variation 2)",
        "who": "ralsei",
        "text": "* I mean, obviously I look cute normally?"
      },
      {
        "cond": "значение 4 — ленту надевает Ральзей (variation 2)",
        "who": "susie",
        "text": "* (The hell do you mean \"obviously!?\")"
      }
    ]
  },
  "1405": {
    "lines": [
      {
        "cond": "при каждом скармливании предмета Ральзею (случайная реплика)",
        "who": "ralsei",
        "text": "Mmm-mmm-good!"
      },
      {
        "cond": "при каждом скармливании предмета Ральзею (случайная реплика)",
        "who": "ralsei",
        "text": "Petalicious!"
      },
      {
        "cond": "при каждом скармливании предмета Ральзею (случайная реплика)",
        "who": "ralsei",
        "text": "Floweriffic!"
      },
      {
        "cond": "редкий шанс (1 из 101)",
        "who": "ralsei",
        "text": "Do you love your father, Kris?"
      },
      {
        "cond": "при значении 3 (третий скормленный предмет)",
        "who": "susie",
        "text": "STOP GIVING HIM ITEMS!"
      }
    ]
  },
  "1406": {
    "related": [1403, 1407, 1408, 1409, 1415, 1416],
    "lines": [
      {
        "cond": "первая реплика Айскрима (con 60, значение → 1)",
        "who": "narration",
        "text": "* ... phew. In the end, if he's smiling, that's all I can ask for."
      },
      {
        "cond": "первая реплика Айскрима (con 60, значение → 1)",
        "who": "narration",
        "text": "* I feel like... I'm getting inspiration for a new ice cream flavor!"
      },
      {
        "cond": "первая реплика Айскрима (con 60, значение → 1)",
        "who": "narration",
        "text": "* \"Pizza and Poison!\" ... the poison would be green apple syrup!"
      },
      {
        "cond": "повторно (con 60, значение 1)",
        "who": "narration",
        "text": "* It's beautiful, isn't it?"
      },
      {
        "cond": "повторно (con 60, значение 1)",
        "who": "narration",
        "text": "* I wonder..."
      },
      {
        "cond": "повторно (con 60, значение 1)",
        "who": "narration",
        "text": "* If she'll still ask me to text him for her."
      },
      {
        "cond": "первая реплика (con 62, значение → 1)",
        "who": "narration",
        "text": "* Well... he never got the girl, but he made a new friend."
      },
      {
        "cond": "первая реплика (con 62, значение → 1)",
        "who": "narration",
        "text": "* Pretty soon, the sun will come out, and it'll be smiling, too."
      },
      {
        "cond": "первая реплика (con 62, значение → 1)",
        "who": "narration",
        "text": "* I feel like I'm coming up with a new ice cream flavor."
      },
      {
        "cond": "первая реплика (con 62, значение → 1)",
        "who": "narration",
        "text": "* \"Pizza and Cat Hair\"."
      },
      {
        "cond": "первая реплика (con 62, значение → 1)",
        "who": "narration",
        "text": "* ... the cat hair will be shredded purple beet!"
      },
      {
        "cond": "повторно (con 62, значение 1)",
        "who": "narration",
        "text": "* ... maybe I never needed to do anything to make him happy."
      },
      {
        "cond": "повторно (con 62, значение 1)",
        "who": "narration",
        "text": "* ... even though I can't shake the feeling..."
      },
      {
        "cond": "повторно (con 62, значение 1)",
        "who": "narration",
        "text": "* I wish... I wish I had some way to make him happy, too."
      }
    ]
  },
  "1407": {
    "related": [1403, 1406, 1408, 1409, 1415, 1416],
    "lines": [
      {
        "cond": "первая реакция Кэтти (con 80, значение → 1)",
        "who": "narration",
        "text": "* Woah, the enemy alligator girl was his girlfriend?!"
      },
      {
        "cond": "первая реакция Кэтти (con 80, значение → 1)",
        "who": "narration",
        "text": "* OMG!!! Way to go enemy alligator girl!!"
      },
      {
        "cond": "первая реакция Кэтти (con 80, значение → 1)",
        "who": "narration",
        "text": "* I never thought ANYONE would like her!! LOL"
      },
      {
        "cond": "повторно (con 80, значение 1)",
        "who": "narration",
        "text": "* OMG, the loser boy and the hot evil girl hooking up?"
      },
      {
        "cond": "повторно (con 80, значение 1)",
        "who": "narration",
        "text": "* He must've given her, like, the boy version of toxoplasmosis! LOL"
      },
      {
        "cond": "первая реакция Кэтти (con 82, значение → 1)",
        "who": "narration",
        "text": "* OMG... Like, what just happened???"
      },
      {
        "cond": "первая реакция Кэтти (con 82, значение → 1)",
        "who": "narration",
        "text": "* I, like, didn't hear anything except \"cookies\"! LOL"
      },
      {
        "cond": "повторно (con 82, значение 1)",
        "who": "narration",
        "text": "* ... so like, are there free cookies?"
      }
    ]
  },
  "1408": {
    "related": [1403, 1406, 1407, 1409, 1415, 1416],
    "lines": [
      {
        "cond": "разговор с Алигэтти (con 70, значение → 1)",
        "who": "narration",
        "text": "* Y'know, like, I..."
      },
      {
        "cond": "разговор с Алигэтти (con 70, значение → 1)",
        "who": "narration",
        "text": "* It's really, like... all that grody pizza guy's fault, y'know?"
      },
      {
        "cond": "разговор с Алигэтти (con 70, значение → 1)",
        "who": "narration",
        "text": "* I was just... I was just, like..."
      },
      {
        "cond": "разговор с Алигэтти (con 70, значение → 1)",
        "who": "narration",
        "text": "* ..."
      },
      {
        "cond": "разговор с Алигэтти (con 70, значение → 1)",
        "who": "narration",
        "text": "* K... Krissy, go tell bunny boy, like..."
      },
      {
        "cond": "разговор с Алигэтти (con 70, значение → 1)",
        "who": "narration",
        "text": "* He's too good for that guy, y'know?"
      },
      {
        "cond": "разговор с Алигэтти (con 70, значение → 1)",
        "who": "narration",
        "text": "* Y'know, Bratty said so. And I'm like, always right, right?"
      },
      {
        "cond": "разговор с Алигэтти (con 70, повторно, flag 1415 == 1)",
        "who": "narration",
        "text": "* K... Krissy, g-go tell bunny boy it's not my fault. Haha."
      },
      {
        "cond": "разговор с Алигэтти (con 76, значение → 1)",
        "who": "narration",
        "text": "* What the-- what the hell?!"
      },
      {
        "cond": "разговор с Алигэтти (con 76, значение → 1)",
        "who": "narration",
        "text": "* How does HE deserve HER!?"
      },
      {
        "cond": "разговор с Алигэтти (con 76, значение → 1)",
        "who": "narration",
        "text": "* I like... God, I should've like..."
      },
      {
        "cond": "разговор с Алигэтти (con 76, значение → 1)",
        "who": "narration",
        "text": "* Poisoned or killed him. Like, evil style. Damn it!"
      },
      {
        "cond": "разговор с Алигэтти (con 76, повторно)",
        "who": "narration",
        "text": "* What? I sound jealous and toxic? Like, shut up?"
      },
      {
        "cond": "разговор с Алигэтти (con 76, повторно)",
        "who": "narration",
        "text": "* I'm actually like, the opposite? Healing, and like, CORRECT?"
      },
      {
        "cond": "разговор с Алигэтти (con 76, повторно)",
        "who": "narration",
        "text": "* She's just like, my copy, right? So like..."
      },
      {
        "cond": "разговор с Алигэтти (con 76, повторно)",
        "who": "narration",
        "text": "* She should have like, MY standards, too!? Damnit!"
      }
    ]
  },
  "1409": {
    "related": [1403, 1406, 1407, 1408, 1415, 1416],
    "lines": [
      {
        "cond": "первая реплика (con 42, значение → 1)",
        "who": "narration",
        "text": "* Ummmmmmmmmmmm"
      },
      {
        "cond": "первая реплика (con 42, значение → 1)",
        "who": "narration",
        "text": "* Well that was awkward"
      },
      {
        "cond": "первая реплика (con 42, значение → 1)",
        "who": "narration",
        "text": "* They're married now???"
      },
      {
        "cond": "первая реплика (con 42, значение → 1)",
        "who": "narration",
        "text": "* No one played any milk noises very cool (not)"
      },
      {
        "cond": "повторно (con 42, значение 1)",
        "who": "narration",
        "text": "* Splash splash splash (Have to make my own milk noises not cool)"
      },
      {
        "cond": "первая реплика (con 44, значение → 1)",
        "who": "narration",
        "text": "* Well well well"
      },
      {
        "cond": "первая реплика (con 44, значение → 1)",
        "who": "narration",
        "text": "* As usual cats win"
      },
      {
        "cond": "первая реплика (con 44, значение → 1)",
        "who": "narration",
        "text": "* Meaning me"
      },
      {
        "cond": "первая реплика (con 44, значение → 1)",
        "who": "narration",
        "text": "* If she's occupied by him"
      },
      {
        "cond": "первая реплика (con 44, значение → 1)",
        "who": "narration",
        "text": "* The milk will be mine"
      },
      {
        "cond": "повторно (con 44, значение 1)",
        "who": "narration",
        "text": "* Move it along losers"
      },
      {
        "cond": "повторно (con 44, значение 1)",
        "who": "narration",
        "text": "* My turf is expanding and you're standing in it"
      },
      {
        "cond": "con 46 (значение → 1)",
        "who": "narration",
        "text": "* Well well well"
      },
      {
        "cond": "con 46 (значение → 1)",
        "who": "narration",
        "text": "* The truth hurts"
      },
      {
        "cond": "con 46 (значение → 1)",
        "who": "narration",
        "text": "* But it may lead to the best outcome"
      },
      {
        "cond": "con 46 (значение → 1)",
        "who": "narration",
        "text": "* ... If your a loser!!!!!!!!! ! !!!!!!!!!!!!!!!!!!!"
      },
      {
        "cond": "con 48",
        "who": "narration",
        "text": "* Going to be honest, I thought this was a drive-in movie..."
      },
      {
        "cond": "con 48",
        "who": "narration",
        "text": "* And I'm very disappointed right now."
      }
    ]
  },
  "1411": {
    "related": [1312, 1846, 1412, 925, 1045, 1255],
    "lines": [
      {
        "cond": "в Цветочном кафе, когда все сценки просмотрены",
        "who": "narration",
        "text": "Make more friends, have more breaks?"
      },
      {
        "cond": "в Цветочном кафе, когда собраны все друзья",
        "who": "narration",
        "text": "Everyone is fully relaxed!"
      },
      {
        "cond": "при покупке в кафе без достаточного количества F$",
        "who": "narration",
        "text": "* You don't have enough Flowery Dollars..."
      },
      {
        "cond": "обмен у лиса в жёлтой пещере (предложение)",
        "who": "narration",
        "text": "* Flowery Dollars are totally useless, kon-kon, kee-kee."
      },
      {
        "cond": "обмен у лиса в жёлтой пещере (предложение)",
        "who": "narration",
        "text": "* So heavy! I'll take them off your hands... for a price."
      },
      {
        "cond": "обмен у лиса — есть F$ и золото (значение > 0)",
        "who": "narration",
        "text": "* Kon-kon, kee-kee, little do they know they have a use~"
      },
      {
        "cond": "обмен у лиса — есть F$ и золото (значение > 0)",
        "who": "narration",
        "text": "* Yes, Flower Castle's Flower Cafe~"
      },
      {
        "cond": "обмен у лиса — есть F$ и золото (значение > 0)",
        "who": "narration",
        "text": "* Drink from machine or break with friends all day!"
      },
      {
        "cond": "обмен у лиса — есть F$ и золото (значение > 0)",
        "who": "narration",
        "text": "* ... but, they'll never know that!"
      },
      {
        "cond": "обмен у лиса — недостаточно (значение 0)",
        "who": "narration",
        "text": "* What the xof!? You don't have enough dollars!?"
      },
      {
        "cond": "обмен у лиса — недостаточно (значение 0)",
        "who": "narration",
        "text": "* Oh... you must be a beggar, too..."
      },
      {
        "cond": "обмен у лиса — недостаточно (значение 0)",
        "who": "narration",
        "text": "* Oh... your tail must be as big and fluffy as mine..."
      }
    ]
  },
  "1412": {
    "related": [1311, 1411, 925, 1045, 1255, 1312],
    "lines": [
      {
        "cond": "при взятии ещё одного доллара из коробки (значение 1)",
        "who": "narration",
        "text": "* (You took another dollar from the box.)"
      },
      {
        "cond": "при взятии ещё одного доллара из коробки (значение 1)",
        "who": "narration",
        "text": "(Just one won't hurt, right?)"
      },
      {
        "cond": "когда понимаешь, что это Цветочные доллары (значение 1 → 2)",
        "who": "narration",
        "text": "* (You realized that the dollars you took weren't Dark Dollars but actually Flowery Dollars.)"
      }
    ]
  },
  "1415": {
    "related": [1403, 1406, 1407, 1408, 1409, 1416],
    "lines": [
      {
        "cond": "Первый разговор с Алигэтти (1415=0)",
        "who": "narration",
        "text": "* Y'know, like, I..."
      },
      {
        "cond": "Первый разговор с Алигэтти (1415=0)",
        "who": "narration",
        "text": "* It's really, like... all that grody pizza guy's fault, y'know?"
      },
      {
        "cond": "Первый разговор с Алигэтти (1415=0)",
        "who": "narration",
        "text": "* I was just... I was just, like..."
      },
      {
        "cond": "Первый разговор с Алигэтти (1415=0)",
        "who": "narration",
        "text": "* ..."
      },
      {
        "cond": "Первый разговор с Алигэтти (1415=0)",
        "who": "narration",
        "text": "* K... Krissy, go tell bunny boy, like..."
      },
      {
        "cond": "Первый разговор с Алигэтти (1415=0)",
        "who": "narration",
        "text": "* He's too good for that guy, y'know?"
      },
      {
        "cond": "Первый разговор с Алигэтти (1415=0)",
        "who": "narration",
        "text": "* Y'know, Bratty said so. And I'm like, always right, right?"
      },
      {
        "cond": "Повторный разговор (1415=1)",
        "who": "narration",
        "text": "* K... Krissy, g-go tell bunny boy it's not my fault. Haha."
      },
      {
        "cond": "Иначе (нет реплики)",
        "who": "narration",
        "text": "* ..."
      },
      {
        "cond": "Катсцена: Алигэтти узнаёт ответ (ставит 1415=3)",
        "who": "narration",
        "text": "* ... he said... what?"
      },
      {
        "cond": "Катсцена: Алигэтти узнаёт ответ (ставит 1415=3)",
        "who": "narration",
        "text": "* ..."
      },
      {
        "cond": "Катсцена: Алигэтти узнаёт ответ (ставит 1415=3)",
        "who": "narration",
        "text": "* ... that... makes sense."
      },
      {
        "cond": "Если позвать Алигэтти, которой нет рядом (1415=1)",
        "who": "narration",
        "text": "* ... Bratty?"
      },
      {
        "cond": "Если позвать Алигэтти, которой нет рядом (1415=1)",
        "who": "narration",
        "text": "* ..."
      },
      {
        "cond": "Если позвать Алигэтти, которой нет рядом (1415=1)",
        "who": "narration",
        "text": "* I don't have any friends named that."
      },
      {
        "cond": "Иначе — нет ответа",
        "who": "narration",
        "text": "* (There's no response...)"
      }
    ]
  },
  "1416": {
    "sprites": [{ "src": "spr_susie_walk_down_lw_unhappy_0", "cond": "при значении 1" }],
    "lines": [

    ]
  },
  "1417": {
    "related": [1393, 1394, 1395, 1396, 1397, 1398],
    "lines": [
      {
        "cond": "Осмотр (запрос на чтение)",
        "who": "narration",
        "text": "* (It's a haunted poem. Read it?)"
      },
      {
        "cond": "При выборе «Прочитать» (ставит 1417=1)",
        "who": "narration",
        "text": "* spider, spider, oh so scary"
      },
      {
        "cond": "При выборе «Прочитать» (ставит 1417=1)",
        "who": "narration",
        "text": "* crawling legs so long and Hairy"
      },
      {
        "cond": "При выборе «Прочитать» (ставит 1417=1)",
        "who": "narration",
        "text": "* calm and collected in the collection plate"
      },
      {
        "cond": "При выборе «Прочитать» (ставит 1417=1)",
        "who": "narration",
        "text": "* you dance for coins to support our fate"
      },
      {
        "cond": "При выборе «Прочитать» (ставит 1417=1)",
        "who": "narration",
        "text": "* (It seems to be encouraging you to donate...)"
      }
    ]
  },
  "1418": {
    "related": [1393, 1394, 1395, 1396, 1397, 1419],
    "lines": [
      {
        "cond": "Сцена с Кетти у церкви (ставит 1418=1, Кетти исчезает)",
        "who": "noelle",
        "text": "* (Anyway, let's just try to enjoy the rest...)"
      }
    ]
  },
  "1419": {
    "related": [1393, 1394, 1395, 1396, 1397, 1418],
    "lines": [
      {
        "cond": "После сцены, чтение знака (1419>0)",
        "who": "narration",
        "text": "Can every day be Susie Sunday?"
      }
    ]
  },
  "1420": {
    "lines": [
      {
        "cond": "Сцена с Алфис в церкви (дрожание лица Ноэль, 1420=1)",
        "who": "noelle",
        "text": "* WHY THE HELL ARE YOU HERE!?"
      },
      {
        "cond": "Сцена с Алфис в церкви (дрожание лица Ноэль, 1420=1)",
        "who": "narration",
        "text": "* S-Sorry Noelle, I... it's my first time working here, and..."
      },
      {
        "cond": "Сцена с Алфис в церкви (дрожание лица Ноэль, 1420=1)",
        "who": "noelle",
        "text": "* G-Gosh, no, I... I'm sorry! I was just... surprised you showed up!"
      },
      {
        "cond": "Сцена с Алфис в церкви (дрожание лица Ноэль, 1420=1)",
        "who": "noelle",
        "text": "* E-even though I... was just so sure I knew everything here."
      },
      {
        "cond": "Сцена с Алфис в церкви (дрожание лица Ноэль, 1420=1)",
        "who": "noelle",
        "text": "* B-but, now that I'm over it, I've got so much a-adrenaline!"
      },
      {
        "cond": "Сцена с Алфис в церкви (дрожание лица Ноэль, 1420=1)",
        "who": "noelle",
        "text": "* Th-thanks!"
      }
    ]
  },
  "1427": {
    "related": [1428, 1429, 309, 388, 710, 1324],
    "lines": [
      {
        "cond": "Повторный разговор с Королевой (1427=1)",
        "who": "queen",
        "text": "* There Is No Greater Dream Of A Mother And Queen"
      },
      {
        "cond": "Повторный разговор с Королевой (1427=1)",
        "who": "queen",
        "text": "* Than Her Two Little Daughters Getting Married"
      },
      {
        "cond": "Повторный разговор с Королевой (1427=1)",
        "who": "ralsei",
        "text": "* I think, everything. Was wrong. With what you just said."
      },
      {
        "cond": "Повторный разговор с Королевой (1427=1)",
        "who": "queen",
        "text": "* When Will I Have Little Computer Grandchildren"
      },
      {
        "cond": "Первый разговор при выполненном flag 388 (1427=0)",
        "who": "queen",
        "text": "* Susie If You Need A Place To Go After The Festival"
      },
      {
        "cond": "Первый разговор при выполненном flag 388 (1427=0)",
        "who": "queen",
        "text": "* You Could Always Bring Noelle Back Here"
      },
      {
        "cond": "Первый разговор при выполненном flag 388 (1427=0)",
        "who": "queen",
        "text": "* It Does Feel A Bit Empty In Town"
      },
      {
        "cond": "Первый разговор при выполненном flag 388 (1427=0)",
        "who": "queen",
        "text": "* And I'm Sure She Sometimes Misses Being"
      },
      {
        "cond": "Первый разговор при выполненном flag 388 (1427=0)",
        "who": "queen",
        "text": "* Kidnapped"
      },
      {
        "cond": "Повторный разговор при выполненном flag 388 (1427=1)",
        "who": "queen",
        "text": "* I Would Also Accept More Cyber Related Recruits"
      },
      {
        "cond": "Повторный разговор при выполненном flag 388 (1427=1)",
        "who": "queen",
        "text": "* Maybe Someone Named... King"
      },
      {
        "cond": "Повторный разговор при выполненном flag 388 (1427=1)",
        "who": "ralsei",
        "text": "* Um, we already..."
      },
      {
        "cond": "Повторный разговор при выполненном flag 388 (1427=1)",
        "who": "queen",
        "text": "* Okay But Like More And Better"
      }
    ]
  },
  "1428": {
    "related": [1427, 1429, 388],
    "lines": [
      {
        "cond": "Первый разговор с Лансером (1428=0)",
        "who": "lancer",
        "text": "* Don't worry, Susie! From what I know of \"Noelle...\""
      },
      {
        "cond": "Первый разговор с Лансером (1428=0)",
        "who": "lancer",
        "text": "* She's probably just as excited and preparing as you!"
      },
      {
        "cond": "Первый разговор с Лансером (1428=0)",
        "who": "susie",
        "text": "* ... yeah. She... asked me in the first place, right?"
      },
      {
        "cond": "Первый разговор с Лансером (1428=0)",
        "who": "lancer",
        "text": "* Yes-a-mundo! I bet she's trimming her dewclaws right now!"
      },
      {
        "cond": "Первый разговор с Лансером (1428=0)",
        "who": "lancer",
        "text": "* Rasping her eyelashes... gathering you beetles... and more!"
      },
      {
        "cond": "Повторный разговор (1428=1)",
        "who": "lancer",
        "text": "* If you need any MP3s for her, you can use mine!"
      },
      {
        "cond": "Повторный разговор (1428=1)",
        "who": "susie",
        "text": "* Heh, I think she likes... rock music. You got any of that?"
      }
    ]
  },
  "1429": {
    "related": [1427, 1428, 388],
    "lines": [
      {
        "cond": "Первый разговор с Тенной (1429=0)",
        "who": "tenna",
        "text": "* SUSIE! Lemme tell you some EXCLUSIVE NOELLEFACTS!"
      },
      {
        "cond": "Первый разговор с Тенной (1429=0)",
        "who": "tenna",
        "text": "* As a child, her favorite SUPER SMASHING FIGHTERS character was..."
      },
      {
        "cond": "Первый разговор с Тенной (1429=0)",
        "who": "tenna",
        "text": "* ALL THE GIRLS!"
      },
      {
        "cond": "Первый разговор с Тенной (1429=0)",
        "who": "tenna",
        "text": "* She would not fight! Only try to play \"house\" with the others!"
      },
      {
        "cond": "Первый разговор с Тенной (1429=0)",
        "who": "tenna",
        "text": "* Use this information... as you will!"
      },
      {
        "cond": "Повторный разговор (1429=1)",
        "who": "tenna",
        "text": "* ONE MORE IMPORTANT FACT! She loves TV!! Especially CRTS!"
      },
      {
        "cond": "Повторный разговор (1429=1)",
        "who": "susie",
        "text": "* Huh... pretty sure she has a flatscreen..."
      }
    ]
  },
  "1433": {
    "lines": [
      {
        "cond": "Просмотр сцены (ставит 1433=1)",
        "who": "ralsei",
        "text": "* Huh? Another one, already...?"
      },
      {
        "cond": "Просмотр сцены (ставит 1433=1)",
        "who": "susie",
        "text": "* Long as there's three of us, it's no big deal!"
      }
    ]
  },
  "1435": {
    "related": [1436, 1439, 1437, 1745, 1438, 1446],
    "lines": [
      {
        "cond": "Ториэль просит сделать тост",
        "who": "toriel",
        "text": "* ... Kris."
      },
      {
        "cond": "Ториэль просит сделать тост",
        "who": "toriel",
        "text": "* Could you be a dear and put some toast on?"
      },
      {
        "cond": "Согласиться сделать тост (1435=1)",
        "who": "toriel",
        "text": "* Thank you, dear."
      },
      {
        "cond": "Согласиться сделать тост (1435=1)",
        "who": "toriel",
        "text": "* ... and, don't forget to put honey on it, okay, honey?"
      },
      {
        "cond": "Отказаться (1435=2), если уже сливал унитаз (1436=1)",
        "who": "toriel",
        "text": "* Busy doing what? Flushing the toilet over and over? Come on now..."
      },
      {
        "cond": "Отказаться (1435=2)",
        "who": "toriel",
        "text": "* Too busy? I see... then I suppose I will just wither away..."
      }
    ]
  },
  "1436": {
    "related": [1435, 1439, 1437, 1745, 1438, 1446],
    "lines": [
      {
        "cond": "Слив унитаза",
        "who": "narration",
        "text": "* (You flushed the toilet!)"
      },
      {
        "cond": "Слишком много раз слил унитаз (ставит 1436=3)",
        "who": "toriel",
        "text": "* Kris!! That was just a joke!! You do not have to keep flushing!!"
      },
      {
        "cond": "Слишком много раз слил унитаз (ставит 1436=3)",
        "who": "toriel",
        "text": "* Everyone in this family thinks they are just so funny!!"
      }
    ]
  },
  "1437": {
    "related": [1745, 1435, 1436, 1439, 1438, 1466],
    "lines": [
      {
        "cond": "Запуск тостера (ставит 1437=1)",
        "who": "narration",
        "text": "* (You put the toast in the microwave toaster and set it to \"toast\".)"
      },
      {
        "cond": "Запуск тостера (ставит 1437=1)",
        "who": "narration",
        "text": "* (It will take 10 seconds for the toast to be done.)"
      }
    ]
  },
  "1438": {
    "related": [1435, 1436, 1437, 1439, 1745, 1746],
    "lines": [
      {
        "cond": "Разглядывание тостера (ставит 1438=1)",
        "who": "narration",
        "text": "* (You looked at the toaster.)"
      },
      {
        "cond": "Разглядывание тостера (ставит 1438=1)",
        "who": "narration",
        "text": "* (Doing this somehow makes the toast take longer to finish.)"
      }
    ]
  },
  "1439": {
    "related": [1435, 1436, 1437, 1745, 1438, 1446],
    "lines": [
      {
        "cond": "Вручение тоста Ториэль (ставит 1439=1)",
        "who": "narration",
        "text": "* (You gave Toriel the toast.)"
      },
      {
        "cond": "Слив унитаза с тостом на руках (1439=0)",
        "who": "toriel",
        "text": "* KRIS!! DON'T FLUSH MY TOAST!!!"
      }
    ]
  },
  "1443": {
    "lines": [
      {
        "cond": "Книжный ящик (запрос)",
        "who": "narration",
        "text": "* (Book drawer.)"
      },
      {
        "cond": "Заглянуть в ящик (ставит 1443=1)",
        "who": "narration",
        "text": "* (You opened the drawer and looked at How to Draw Dragons.)"
      },
      {
        "cond": "Заглянуть в ящик (ставит 1443=1)",
        "who": "narration",
        "text": "* (The cover's inappropriately dressed purple dragon stares back at you.)"
      },
      {
        "cond": "Заглянуть в ящик (ставит 1443=1)",
        "who": "narration",
        "text": "* (... even though there was a Dark World in your house...)"
      },
      {
        "cond": "Заглянуть в ящик (ставит 1443=1)",
        "who": "narration",
        "text": "* (... you didn't seem to meet a Darkner based on this object.)"
      },
      {
        "cond": "Заглянуть в ящик (ставит 1443=1)",
        "who": "narration",
        "text": "* (...)"
      },
      {
        "cond": "Заглянуть в ящик (ставит 1443=1)",
        "who": "narration",
        "text": "* (You scholarly contemplated this for an overly long period of time.)"
      },
      {
        "cond": "Отказаться смотреть",
        "who": "narration",
        "text": "* (You knew that you shouldn't.)"
      }
    ]
  },
  "1446": {
    "related": [42, 1435, 1436, 1439, 1447, 1767],
    "lines": [
      {
        "cond": "Ящик брата (запрос)",
        "who": "narration",
        "text": "* (Your brother's drawer. There are various unsent love letters inside.)"
      },
      {
        "cond": "Первая попытка прочесть письма (1446=0)",
        "who": "narration",
        "text": "* (... your body is still shaky, and feels weak, almost unfamiliar.)"
      },
      {
        "cond": "Первая попытка прочесть письма (1446=0)",
        "who": "narration",
        "text": "* (Despite your weakness, will you really make your first priority)"
      },
      {
        "cond": "Первая попытка прочесть письма (1446=0)",
        "who": "narration",
        "text": "* (Your very first priority)"
      },
      {
        "cond": "Первая попытка прочесть письма (1446=0)",
        "who": "narration",
        "text": "* (Looking through your brother's letters)"
      },
      {
        "cond": "Первая попытка прочесть письма (1446=0)",
        "who": "narration",
        "text": "* (Which you have already read)"
      },
      {
        "cond": "Первая попытка прочесть письма (1446=0)",
        "who": "narration",
        "text": "* (As if you haven't read them before?)"
      },
      {
        "cond": "Открыть письмо (ставит 1446=1)",
        "who": "narration",
        "text": "* (Despite your weakness, you proceed to open the first letter.)"
      },
      {
        "cond": "Открыть письмо (ставит 1446=1)",
        "who": "narration",
        "text": "* Dearest December"
      },
      {
        "cond": "Открыть письмо (ставит 1446=1)",
        "who": "narration",
        "text": "* (Your weakness gets the better of you. Letter dropped. Drawer closed.)"
      },
      {
        "cond": "Осмотр дезодоранта: письма ещё не читал (1446=0)",
        "who": "narration",
        "text": "* (Will you still make it your priority to look at deodorant?)"
      },
      {
        "cond": "Осмотр дезодоранта: письма уже читал (1446>0)",
        "who": "narration",
        "text": "* (Will you still make it your second priority to look at deodorant?)"
      }
    ]
  },
  "1447": {
    "related": [1435, 1436, 1439, 1446],
    "lines": [
      {
        "cond": "Выбор «Gotta Smell Good» (ставит 1447=1)",
        "who": "narration",
        "text": "* (\"Gotta smell good\" means not looking inside.)"
      }
    ]
  },
  "1449": {
    "related": [1706, 1707],
    "lines": [
      {
        "cond": "Первая встреча — показывается вступление (1449=1)",
        "who": "narration",
        "text": "* Ahuhuhu... alright, dearies! This is gonna be a long battle, so why don't you have an appetizer, first!?"
      }
    ]
  },
  "1450": {
    "related": [1380, 1381, 1382, 1383, 1822],
    "lines": [
      {
        "cond": "Первый разговор с Нэпстаблуком (ставит 1450=1)",
        "who": "narration",
        "text": "* hi... this is the strength tester..."
      },
      {
        "cond": "Первый разговор с Нэпстаблуком (ставит 1450=1)",
        "who": "narration",
        "text": "* ... usually undyne runs this..."
      },
      {
        "cond": "Первый разговор с Нэпстаблуком (ставит 1450=1)",
        "who": "narration",
        "text": "* but, also, she usually breaks it... and no one gets to use it"
      },
      {
        "cond": "Первый разговор с Нэпстаблуком (ставит 1450=1)",
        "who": "narration",
        "text": "* ..."
      },
      {
        "cond": "Первый разговор с Нэпстаблуком (ставит 1450=1)",
        "who": "narration",
        "text": "* do you want me to show you how to play...?"
      },
      {
        "cond": "Повторный разговор (1450=1)",
        "who": "narration",
        "text": "* oh... do you want to know how to use the strength tester?"
      }
    ]
  },
  "1451": {
    "related": [1324, 1733, 1758],
    "lines": [
      {
        "cond": "Первый раз заглянуть в окно (ставит 1451=1)",
        "who": "narration",
        "text": "* (Through the window, you see Catti wearing a weird outfit.)"
      },
      {
        "cond": "Первый раз заглянуть в окно (ставит 1451=1)",
        "who": "narration",
        "text": "* (Her sister tries to lick her face clean while Catti pushes her away.)"
      },
      {
        "cond": "Первый раз заглянуть в окно (ставит 1451=1)",
        "who": "narration",
        "text": "* (... you don't need to watch this.)"
      },
      {
        "cond": "Повторно (1451=1)",
        "who": "narration",
        "text": "* (You don't need to watch this.)"
      }
    ]
  },
  "1453": {
    "related": [1403, 1406, 1407, 1408, 1409, 1415],
    "lines": [
      {
        "cond": "После события, первый раз (ставит 1453=1)",
        "who": "narration",
        "text": "* That didn't sound very much like milk"
      },
      {
        "cond": "После события, первый раз (ставит 1453=1)",
        "who": "narration",
        "text": "* But I'll just keep standing here"
      },
      {
        "cond": "После события, первый раз (ставит 1453=1)",
        "who": "narration",
        "text": "* In case this is like the opening or something"
      },
      {
        "cond": "После события, повторно (1453>0)",
        "who": "narration",
        "text": "* Stop talking you're ruining the awkward silence"
      }
    ]
  },
  "1454": {
    "related": [1455, 1886, 1775, 1812, 1839, 1871],
    "lines": [
      {
        "cond": "Во время платформинга (1454<40)",
        "who": "susie",
        "text": "* K, this is impossible."
      },
      {
        "cond": "Во время платформинга (1454<40)",
        "who": "ralsei",
        "text": "* Seemingly so."
      }
    ]
  },
  "1455": {
    "related": [1454, 1812, 1906, 1850, 1862],
    "lines": [
      {
        "cond": "Сцена концовки правого крыла (показывается всегда)",
        "who": "narration",
        "text": "* A golden breastplate with her face on it, either!"
      },
      {
        "cond": "Сцена концовки правого крыла (показывается всегда)",
        "who": "narration",
        "text": "* Haha! That's my main man! Let's go."
      },
      {
        "cond": "Если правое крыло ещё не завершено (1455<100)",
        "who": "susie",
        "text": "* Hey... Kris..."
      },
      {
        "cond": "Если правое крыло ещё не завершено (1455<100)",
        "who": "susie",
        "text": "* What's with those papers your dad's gathering...?"
      }
    ]
  },
  "1456": {
    "related": [1457],
    "lines": [
      {
        "cond": "Первый разговор с Рулсом в кафе (ставит 1456=1)",
        "who": "rouxls",
        "text": "* I'm in Chargeth nowe."
      },
      {
        "cond": "Первый разговор с Рулсом в кафе (ставит 1456=1)",
        "who": "rouxls",
        "text": "* It's Goode."
      },
      {
        "cond": "Повторно (1456=1)",
        "who": "rouxls",
        "text": "* What?"
      }
    ]
  },
  "1457": {
    "related": [1456],
    "lines": [
      {
        "cond": "при значении 0 (выбор 0 — Рулс признаётся): первый разговор",
        "who": "rouxls",
        "text": "So, Sir Swatch steppedeth out for a moment..."
      },
      {
        "cond": "при значении 0 (выбор 0 — Рулс признаётся): первый разговор",
        "who": "rouxls",
        "text": "And, so I... perhapseth... as a Favore..."
      },
      {
        "cond": "при значении 0 (выбор 0 — Рулс признаётся): первый разговор",
        "who": "rouxls",
        "text": "Takingeth over for him, while he was Gone..."
      },
      {
        "cond": "при значении 0 (выбор 0 — Рулс признаётся): первый разговор",
        "who": "rouxls",
        "text": "And while he was Not Noticinge me doingeth so..."
      },
      {
        "cond": "при значении 0 (выбор 0 — Рулс признаётся): первый разговор",
        "who": "rouxls",
        "text": "..."
      },
      {
        "cond": "при значении 0 (выбор 0 — Рулс признаётся): первый разговор",
        "who": "rouxls",
        "text": "..."
      },
      {
        "cond": "при значении 0 (выбор 0 — Рулс признаётся): первый разговор",
        "who": "rouxls",
        "text": "Okay, guyse. I will be-eth \"Reale\" withst you Here."
      },
      {
        "cond": "при значении 0 (выбор 0 — Рулс признаётся): первый разговор",
        "who": "rouxls",
        "text": "Any Recruitse you made at yon Churche..."
      },
      {
        "cond": "при значении 0 (выбор 0 — Рулс признаётся): первый разговор",
        "who": "rouxls",
        "text": "They Basicallye haven'tst seen anything besides This before."
      },
      {
        "cond": "при значении 0 (выбор 0 — Рулс признаётся): первый разговор",
        "who": "rouxls",
        "text": "To them, this is Normale. So it's all coole."
      },
      {
        "cond": "при значении 0 (выбор 0 — Рулс признаётся): первый разговор",
        "who": "rouxls",
        "text": "No one will findeth out. No one notices... everyone loveths me..."
      },
      {
        "cond": "при значении 0 (выбор 0 — Рулс признаётся): первый разговор",
        "who": "rouxls",
        "text": "Just... helpeth me cleane up before Swatch gets back."
      },
      {
        "cond": "при значении 1 (повторный разговор)",
        "who": "rouxls",
        "text": "Oh, something HAPPENEDE? No, no, NOTHINGE happeneds?"
      },
      {
        "cond": "при значении 1 (повторный разговор)",
        "who": "rouxls",
        "text": "Righte? Winke winke, nodge nodge?"
      }
    ]
  },
  "1458": {
    "sprites": [{ "src": "spr_dw_door_ralsei_upgrade_0", "cond": "при значении 0 и flag710=2: над дверью этажа появляется спрайт обновлённой комнаты Ральзея" }],
    "related": [710, 394, 1459, 307, 309, 854],
    "lines": [
      {
        "cond": "при значении 0 (комната Ральзея ещё не перестроена): осмотр окна",
        "who": "narration",
        "text": "(Even though he changed his room, the window stayed.)"
      },
      {
        "cond": "при значении 0 (комната Ральзея ещё не перестроена): осмотр окна",
        "who": "narration",
        "text": "(More proof that Ralsei really likes Window.)"
      },
      {
        "cond": "при значении >0 (комната Ральзея перестроена): табличка с лицом Flowery",
        "who": "narration",
        "text": "(\"A sign of Flowery's face. Perfect for Raly's room.\")"
      },
      {
        "cond": "при значении >0 (комната Ральзея перестроена): табличка с лицом Flowery",
        "who": "ralsei",
        "text": "I don't think my room, needs this type of..."
      },
      {
        "cond": "при значении >0: сцена с лестницей (Laddery) для комнаты Ральзея",
        "who": "susie",
        "text": "Guess we could use this for Ralsei's room."
      },
      {
        "cond": "при значении >0: сцена с лестницей (Laddery) для комнаты Ральзея",
        "who": "ralsei",
        "text": "You want me to take LADDERY?"
      },
      {
        "cond": "при значении >0: сцена с лестницей (Laddery) для комнаты Ральзея",
        "who": "susie",
        "text": "Dude, your room has nowhere to climb."
      },
      {
        "cond": "при значении >0: сцена с лестницей (Laddery) для комнаты Ральзея",
        "who": "susie",
        "text": "Where are you gonna do reps?"
      },
      {
        "cond": "при значении >0: сцена с лестницей (Laddery) для комнаты Ральзея",
        "who": "ralsei",
        "text": "I could do..."
      },
      {
        "cond": "при значении >0: сцена с лестницей (Laddery) для комнаты Ральзея",
        "who": "ralsei",
        "text": "I could do isometric exercises on the windowsill!"
      },
      {
        "cond": "при значении >0: сцена с лестницей (Laddery) для комнаты Ральзея",
        "who": "susie",
        "text": "..."
      },
      {
        "cond": "при значении >0: сцена с лестницей (Laddery) для комнаты Ральзея",
        "who": "susie",
        "text": "Dude, you need Laddery."
      },
      {
        "cond": "при значении >0: сцена с лестницей (Laddery) для комнаты Ральзея",
        "who": "ralsei",
        "text": "Fine..."
      },
      {
        "cond": "при значении >0: сцена с лестницей (Laddery) для комнаты Ральзея",
        "who": "narration",
        "text": "(Laddery was taken for Ralsei's room.)"
      },
      {
        "cond": "при значении >0 (подушка дзен-кресла): шёпот Сьюзи, если подушка ещё не взята",
        "who": "susie",
        "text": "(Psst... Kris...)"
      },
      {
        "cond": "при значении >0 (подушка дзен-кресла): шёпот Сьюзи, если подушка ещё не взята",
        "who": "susie",
        "text": "(Maybe we could take the chair's pillow?)"
      },
      {
        "cond": "при значении >0 (подушка дзен-кресла): шёпот Сьюзи, если подушка ещё не взята",
        "who": "susie",
        "text": "(Could be awesome for Ralsei's room?)"
      },
      {
        "cond": "при значении >0 (подушка дзен-кресла): если подушка уже взята",
        "who": "narration",
        "text": "(You accidentally drummed your fingers on the pillow.)"
      }
    ]
  },
  "1459": {
    "related": [394, 710, 1458, 1728, 1729, 307],
    "lines": [
      {
        "cond": "при значении 0 (перестройка комнаты Ральзея — ставит флаг в 1)",
        "who": "narration",
        "text": "(It's a bed. It's so squishy...)"
      },
      {
        "cond": "при значении 0 (перестройка комнаты Ральзея — ставит флаг в 1)",
        "who": "narration",
        "text": "(... it feels like it might turn into fluff when you need it to heal.)"
      },
      {
        "cond": "осмотр холодильника в комнате Ральзея",
        "who": "narration",
        "text": "(It's a fridge. There's a partially eaten cake inside...)"
      }
    ]
  },
  "1462": {
    "related": [115, 241, 1463, 1464, 1750, 1888],
    "lines": [
      {
        "cond": "при значении 0 (отдан 4-й Кристалл Тени Seam — ставит флаг в 1)",
        "who": "narration",
        "text": "Incredible, Kris! Once again you have procured a Shadow Crystal...! Now, give it here, give it here!"
      },
      {
        "cond": "при значении 0 (отдан 4-й Кристалл Тени Seam — ставит флаг в 1)",
        "who": "narration",
        "text": "Perfect. We only need one more... yes, the next opponent shall be your final one. I'm sure you shall topple them easily!"
      },
      {
        "cond": "при значении 0 (отдан 4-й Кристалл Тени Seam — ставит флаг в 1)",
        "who": "narration",
        "text": "..."
      },
      {
        "cond": "при значении 0 (отдан 4-й Кристалл Тени Seam — ставит флаг в 1)",
        "who": "narration",
        "text": "Kris, I suppose I owe you an explanation about all this. No, you no doubt have realized yourself by now..."
      },
      {
        "cond": "при значении 0 (отдан 4-й Кристалл Тени Seam — ставит флаг в 1)",
        "who": "narration",
        "text": "The Shadow Crystals are far more than mere pieces of glass. In actuality, they contain a certain power."
      },
      {
        "cond": "при значении 0 (отдан 4-й Кристалл Тени Seam — ставит флаг в 1)",
        "who": "narration",
        "text": "You could call this the power of \"will\"."
      },
      {
        "cond": "при значении 0 (отдан 4-й Кристалл Тени Seam — ставит флаг в 1)",
        "who": "narration",
        "text": "... no, perhaps \"will\" isn't right. The power they contain is..."
      },
      {
        "cond": "при значении 0 (отдан 4-й Кристалл Тени Seam — ставит флаг в 1)",
        "who": "narration",
        "text": "\"The power of lost dreams.\""
      },
      {
        "cond": "при значении 0 (отдан 4-й Кристалл Тени Seam — ставит флаг в 1)",
        "who": "narration",
        "text": "When a strong attachment is formed... when a dream is gripped tightly... and then broken off. These... are the shards that remain."
      },
      {
        "cond": "при значении 0 (отдан 4-й Кристалл Тени Seam — ставит флаг в 1)",
        "who": "narration",
        "text": "\"Failed dreams\"... of course, these things are useless to you, Kris."
      },
      {
        "cond": "при значении 0 (отдан 4-й Кристалл Тени Seam — ставит флаг в 1)",
        "who": "narration",
        "text": "I, however, am aware of something interesting we can do with them. Something very, very, interesting."
      },
      {
        "cond": "при значении 0 (отдан 4-й Кристалл Тени Seam — ставит флаг в 1)",
        "who": "narration",
        "text": "No doubt you will find it quite entertaining! Hahaha!!!"
      }
    ]
  },
  "1463": {
    "related": [115, 241, 1462, 1464],
    "lines": [
      {
        "cond": "при значении 0 (не удалось получить 4-й Кристалл Тени — ставит флаг в 1)",
        "who": "narration",
        "text": "... ah. I see. You failed to receive the Shadow Crystal."
      },
      {
        "cond": "при значении 0 (не удалось получить 4-й Кристалл Тени — ставит флаг в 1)",
        "who": "narration",
        "text": "No, no, don't worry about disappointing me. It's only my own fault for putting such a burden on you..."
      },
      {
        "cond": "при значении 0 (не удалось получить 4-й Кристалл Тени — ставит флаг в 1)",
        "who": "narration",
        "text": "You three have a very important adventure, don't you?"
      },
      {
        "cond": "при значении 0 (не удалось получить 4-й Кристалл Тени — ставит флаг в 1)",
        "who": "narration",
        "text": "The whims of a scruffy old cat shouldn't be your priority. Well then, be on your way."
      }
    ]
  },
  "1464": {
    "related": [115, 241, 1462, 1463],
    "lines": [
      {
        "cond": "при разговоре с Seam (товары не меняются)",
        "who": "narration",
        "text": "Ah, Kris. I keep telling you, my items will never change. Nor, will I."
      },
      {
        "cond": "при разговоре с Seam (товары не меняются)",
        "who": "narration",
        "text": "Though, I do find it amusing that you return here to check."
      },
      {
        "cond": "при разговоре с Seam (товары не меняются)",
        "who": "narration",
        "text": "I suppose as long as you keep returning here, it's worth staying awake a little while longer..."
      },
      {
        "cond": "при значении 0 (первый раз) и если есть Jackenstein — ставит флаг в 1",
        "who": "narration",
        "text": "Jackenstein... he often visits my shop to buy Dark Candies."
      },
      {
        "cond": "при значении 0 (первый раз) и если есть Jackenstein — ставит флаг в 1",
        "who": "narration",
        "text": "He seems to have a habit of placing them in his head, and handing them out to people from his mouth..."
      },
      {
        "cond": "при значении 0 (первый раз) и если есть Jackenstein — ставит флаг в 1",
        "who": "narration",
        "text": "What did he call it? Treat or Treat? Ha ha ha... next time, perhaps I should give him some candy for free."
      },
      {
        "cond": "при значении 0 (первый раз) и если есть Jackenstein — ставит флаг в 1",
        "who": "narration",
        "text": "Not as if there's any point in selling it anymore..."
      }
    ]
  },
  "1465": {
    "lines": [
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "What? You dare insult my greatest mark of pride!?"
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "ralsei",
        "text": "Umm, no! We actually really like it!"
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "HA! Rich, coming from you, patsy!"
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "... fine. I shall indulge you."
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "I remember it like it was yesterday."
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "A blissful time. An era of harmony, with the Lightners."
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "A golden age, where we were held, cherished..."
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "But one day, the hand of a Lightner slipped..."
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "... and disaster struck."
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "I was torn."
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "Torn with a scar that could be seen even from the back."
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "A single scarred king... that rendered the whole kingdom..."
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "Obsolete."
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "We were banished, relegated to eternal darkness."
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "..."
      },
      {
        "cond": "при значении 0 (выбор 0 — Король рассказывает о шраме): первый раз",
        "who": "king",
        "text": "Now, this mark is my pride! A mark of glory..."
      }
    ]
  },
  "1466": {
    "related": [342, 1324, 1376, 1377, 1435, 1436],
    "lines": [
      {
        "cond": "при значении 0 (Азгор ест Медовый тост — ставит флаг в 1)",
        "who": "narration",
        "text": "What? Kris? You made toast, for me?"
      },
      {
        "cond": "при значении 0 (Азгор ест Медовый тост — ставит флаг в 1)",
        "who": "narration",
        "text": "Why, ahaha, you didn't have to do that!"
      },
      {
        "cond": "при значении 0 (Азгор ест Медовый тост — ставит флаг в 1)",
        "who": "narration",
        "text": "..."
      },
      {
        "cond": "при значении 0 (Азгор ест Медовый тост — ставит флаг в 1)",
        "who": "narration",
        "text": "(Asgore ate the Honey Toast.)"
      },
      {
        "cond": "при значении 0 (Азгор ест Медовый тост — ставит флаг в 1)",
        "who": "narration",
        "text": "This always was one of your best dishes."
      },
      {
        "cond": "при значении 0 (Азгор ест Медовый тост — ставит флаг в 1)",
        "who": "narration",
        "text": "... remember how you two used to eat bread?"
      },
      {
        "cond": "при значении 0 (Азгор ест Медовый тост — ставит флаг в 1)",
        "who": "narration",
        "text": "Fold it into quarters... take a couple bites, and..."
      },
      {
        "cond": "при значении 0 (Азгор ест Медовый тост — ставит флаг в 1)",
        "who": "narration",
        "text": "See? It's kind of like a snowflake! Hahaha!"
      },
      {
        "cond": "при значении 0 (Азгор ест Медовый тост — ставит флаг в 1)",
        "who": "narration",
        "text": "\"Too many crumbs\", your mother said."
      },
      {
        "cond": "при значении 0 (Азгор ест Медовый тост — ставит флаг в 1)",
        "who": "narration",
        "text": "But crumbs can come in handy, too. Can't they, Kris?"
      },
      {
        "cond": "при значении 0 (Азгор ест Медовый тост — ставит флаг в 1)",
        "who": "narration",
        "text": "... well. Have a wonderful day."
      }
    ]
  },
  "1467": {
    "related": [1324, 1435, 1436, 1437, 1439, 1466],
    "lines": [
      {
        "cond": "при значении 0 (использован светопредмет 19 в холле школы — ставит флаг в 1)",
        "who": "narration",
        "text": "(Your inventory feels lighter.)"
      },
      {
        "cond": "при значении 0 (использован светопредмет 19 в холле школы — ставит флаг в 1)",
        "who": "narration",
        "text": "(Also, there are crumbs around your face for some reason.)"
      }
    ]
  },
  "1468": {
    "lines": [
      {
        "cond": "при значении 0 (первый раз — макияж Сьюзи, ставит флаг в 1)",
        "who": "narration",
        "text": "Ah, if it isn't our Lady of Little Grace. (Young master Susie.)"
      },
      {
        "cond": "при значении 0 (первый раз — макияж Сьюзи, ставит флаг в 1)",
        "who": "narration",
        "text": "We heard of your romantic dreams, and we are dying to assist you."
      },
      {
        "cond": "при значении 0 (первый раз — макияж Сьюзи, ставит флаг в 1)",
        "who": "narration",
        "text": "While, I'm sure your current form is certainly passable, in some manner..."
      },
      {
        "cond": "при значении 0 (первый раз — макияж Сьюзи, ставит флаг в 1)",
        "who": "narration",
        "text": "Don't you think some makeup could serve to catch the young deer's eye?"
      },
      {
        "cond": "при значении 0 (первый раз — макияж Сьюзи, ставит флаг в 1)",
        "who": "susie",
        "text": "Uhh, I mean, I think I'm good... I mean..."
      },
      {
        "cond": "при значении 0 (первый раз — макияж Сьюзи, ставит флаг в 1)",
        "who": "susie",
        "text": "I don't even know if she thinks it's a date, y'know...?"
      },
      {
        "cond": "при значении 0 (первый раз — макияж Сьюзи, ставит флаг в 1)",
        "who": "narration",
        "text": "Hmm... very well then. Young blue master, what do you think?"
      },
      {
        "cond": "при значении 1 (повторно)",
        "who": "narration",
        "text": "Young blue master, what do you think?"
      }
    ]
  },
  "1474": {
    "lines": [
      {
        "cond": "при значении 2 (лисы съели — нет места откусить)",
        "who": "narration",
        "text": "(There's no room to take a bite...)"
      },
      {
        "cond": "при значении 2 (лисы съели — нет места откусить)",
        "who": "narration",
        "text": "(Should have made a reservation.)"
      }
    ]
  },
  "1500": {
    "detail": "Помечает выдачу награды за пожертвование 100+ монет в фонтан церкви. «На что влияет: при достижении суммы взносов (флаг 898) >=100 и 1500==0 запускается выдача награды (myinteract=10) и флаг ставится в 1, чтобы наградить только один раз. Связан со счётчиком пожертвований 898.»",
    "related": [
      898
    ]
  },
  "1501": {
    "detail": "Трёхступенчатый прогресс тёмного лабиринта церкви. «На что влияет: при 0 активны триггеры начала; первый триггер переводит 1501 в 1 (в процессе); прохождение лабиринта ставит 2 (ccon=6, телепорт Крис x=room_width*4, затухание музыки). Управляет состоянием/музыкой лабиринта.»"
  },
  "1502": {
    "detail": "Трёхступенчатый прогресс головоломки поклонения ряби в церкви. «На что влияет: первое взаимодействие ставит 1502=1 (убирает endarea, играет звук); завершение ставит 2 (event_user(0), roomstart); при >=2 obj_dw_church_secretpiano включает элемент make[1]; реплика при чтении меняется: всегда «слышен шёпот», а при >=2 добавляется «выражение застыло в поклонении». Связан с флагами 1519 и 899 (секретное пианино).»",
    "related": [
      1519,
      899
    ],
    "lines": [
      {
        "cond": "Осмотр (всегда слышен шёпот) — obj_dw_church_rippleworship (Гл.4)",
        "who": "narration",
        "text": "* (You hear whispering...)"
      },
      {
        "cond": "При flag[1502] ≥ 2 (поклонение завершено) — добавляется к осмотру",
        "who": "narration",
        "text": "* (Its expression is frozen in worship...)"
      }
    ]
  },
  "1503": {
    "detail": "Маркер завершения чайной катсцены с Герсоном в церкви. «На что влияет: пока 1503==0 и 1523==0, obj_dw_church_waterfalltearoom при создании запускает катсцену (con=0); в конце сцены (con==100) флаг ставится в 1 и делается временное сохранение; после этого посуда на столе рисуется грязной (spr_tea_party_utensils_messy) и obj_dw_church_moneyfountain меняет дверь (changedoor=1). Работает в связке с флагом 1523.»",
    "related": [
      1523
    ]
  },
  "1514": {
    "detail": "Хранит, проигрывалась ли сцена чаепития в замке (значение = выбор+1). «На что влияет: при 0 obj_room_castle_kris_susie запускает сцену (con=0) и пульт-кассета даёт prompt «tea_party_prompt»; при >0 сцена помечена пройденной (con=-1), в меню выбора (scr_text case 1413) появляется опция «We already had tea», а Сьюзи/Ральзей у лестницы и плиты дают дополнительные реплики (про чизкейк/торт Ральзею). Постоянный маркер, переносится вперёд.»",
    "lines": [
      {
        "cond": "При flag[1514] = 0 (запуск сцены чаепития, выбор Да/Нет)",
        "who": "narration",
        "text": "#Yes"
      },
      {
        "cond": "При flag[1514] = 0 (запуск сцены чаепития, выбор Да/Нет)",
        "who": "narration",
        "text": "#No"
      },
      {
        "cond": "При flag[1514] > 0 (в меню scr_text появляется опция «We already had tea»)",
        "who": "narration",
        "text": "We already had tea"
      },
      {
        "cond": "При flag[1514] > 0 (доп. реплики Сьюзи/Ральзея у лестницы/плиты)",
        "who": "susie",
        "text": "* Can you make a cheesecake this time!?"
      },
      {
        "cond": "При flag[1514] > 0 (доп. реплики Сьюзи/Ральзея у лестницы/плиты)",
        "who": "ralsei",
        "text": "* Umm, let's head upstairs, first..."
      },
      {
        "cond": "При flag[1514] > 0 (доп. реплики Сьюзи/Ральзея у лестницы/плиты)",
        "who": "susie",
        "text": "* (Hey, Kris, let's make Ralsei a cake next time!)"
      },
      {
        "cond": "При flag[1514] > 0 (доп. реплики Сьюзи/Ральзея у лестницы/плиты)",
        "who": "susie",
        "text": "* (... just help me find the ignition on this thing...)"
      }
    ]
  },
  "1517": {
    "detail": "Маркер вскрытия сундука с бронёй в молитвенной комнате церкви. «На что влияет: при ==1 сундук показан открытым, броня повторно не выдаётся. В зависимости от комнаты выдаётся броня id 51 (room_dw_church_worshiproom) либо id 52 (room_dw_churchb_worshiproom). Снятие в 0 вернёт возможность получить броню.»"
  },
  "1523": {
    "detail": "Хранит ответ игрока в чайном диалоге с Герсоном (значение = выбор+1). «На что влияет: при arg1==0 (значение 1) идёт ветка con=25; вместе с 1503 определяет, нужно ли запускать чайную катсцену (con=0 только когда оба флага 0) и менять дверь у obj_dw_church_moneyfountain (changedoor=1). Сохраняет выбор на будущее.»",
    "related": [
      1503
    ]
  },
  "1524": {
    "detail": "Рекорд времени первого отрезка бокового восхождения (в кадрах, 30 кадров=1 сек). «На что влияет: при первом прохождении записывается время; далее обновляется только если новый результат быстрее; значение 999 ставится при падении/сбросе. Для «победного» прохождения нужно 1524<=182 (и 1525<=302), оба !=0 — тогда won=true. Отображается в секундах при чтении таблички. Чем меньше, тем лучше.»",
    "related": [
      1525,
      1526
    ]
  },
  "1525": {
    "detail": "Рекорд времени второго отрезка бокового восхождения (в кадрах, 30 кадров=1 сек). «На что влияет: при первом прохождении записывается время; далее обновляется только если новый результат быстрее; значение 999 ставится при падении/сбросе. Для «победного» прохождения нужно 1525<=302 (и 1524<=182), оба !=0 — тогда won=true. Отображается в секундах при чтении таблички. Чем меньше, тем лучше.»",
    "related": [
      1524,
      1526
    ]
  },
  "1526": {
    "detail": "Гл.4, obj_dw_church_sideclimb. В Step при d_make() флаг становится 1 и defendercon++ (страж объявляет дуэль «En-guarde!»). Когда дуэль пройдена — obj_mainchara.cutscene=false, global.interact/facing=0, флаг=2, scr_tempsave(), defendercon=14. Если флаг==2 и camerax()>=1216 — флаг=3, event_user(4). В Create defendercon восстанавливается из флага: ==1 → defendercon=5, >1 → defendercon=14 (mizzle удаляется). В отладке (Create) клавиши 1/2/3 сбрасывают связку флагов 1524/1525/1526. На что влияет: состояние стража и стадию подъёма (defendercon), сохранение прогресса (scr_tempsave), реплики стража о «зарядке прыжка» и срабатывание триггера верхней площадки по камере.",
    "related": [
      1524,
      1525
    ],
    "lines": [
      {
        "cond": "Объявление дуэли стражем (d_make, флаг→1)",
        "who": "narration",
        "text": "* If you shall press further... then we shall have no choice..."
      },
      {
        "cond": "Объявление дуэли стражем (d_make, флаг→1)",
        "who": "narration",
        "text": "* ... but to duel for her honor!"
      },
      {
        "cond": "Объявление дуэли стражем (d_make, флаг→1)",
        "who": "narration",
        "text": "* En-guarde!"
      },
      {
        "cond": "Реплики стража во время подъёма",
        "who": "narration",
        "text": "* Charging up the biggest jump... That's the secret to going the fastest!"
      },
      {
        "cond": "Реплики стража во время подъёма",
        "who": "narration",
        "text": "* But I keep... bumping...! I must not... Bump! For my lady!"
      },
      {
        "cond": "Реплики стража во время подъёма",
        "who": "narration",
        "text": "* I heard some noise up there... My lady, is she in trouble?"
      },
      {
        "cond": "Реплики стража во время подъёма",
        "who": "narration",
        "text": "* I must hasten to climb up... I must charge my jump..."
      }
    ]
  },
  "1528": {
    "detail": "Гл.4 (Мир света, городок), obj_lw_town_sideb — маршрут «сторона B» (Weird Route). Активен только при scr_sideb_active() и global.plot 95–104. Счётчик из 2 сцен с Сьюзи: 0 → играет 1-я сцена (комната 24), затем ставится 1; 1 → играет 2-я сцена (комната 28, с выбором у obj_lw_town_sideb_choicer), затем ставится 2; при 2 объект самоуничтожается (всё показано).",
    "related": [
      915,
      916
    ],
    "lines": [
      {
        "cond": "При flag[1528] = 0 — 1-я сцена (комната 24), Сьюзи",
        "who": "susie",
        "text": "\\E0* Damn... that whole thing was a disaster, huh."
      },
      {
        "cond": "При flag[1528] = 0 — 1-я сцена (комната 24), Сьюзи",
        "who": "susie",
        "text": "\\EN* ... didn't even get to... hang out, really. All three of us, I mean."
      },
      {
        "cond": "При flag[1528] = 1 — 2-я сцена (комната 28), Сьюзи",
        "who": "susie",
        "text": "\\E1* Y'know, Noelle... said she wanted to talk to you."
      },
      {
        "cond": "При flag[1528] = 1 — 2-я сцена (комната 28), Сьюзи",
        "who": "susie",
        "text": "\\E0* But... something... about her look was kinda... weird."
      }
    ]
  },
  "1529": {
    "detail": "Гл.4, obj_dw_church_northprophecies (северный зал). Показывает пророчество о Рыцаре из двух строф (знаки knight2 → knight1). 1 — просмотрено. Играет darkchurch_intro.ogg. Не сбрасывается (0 ставится только debug-клавишей P).",
    "fx": {
      "proph": {
        "items": [
          {
            "icon": "proph_icon_knight1.png",
            "verse": "SHALL DUEL WITH HEROES#STRIFE BY STRIFE."
          },
          {
            "icon": "proph_icon_knight1.png",
            "verse": "THE KNIGHT WHICH MAKES#WITH BLACKENED KNIFE."
          }
        ]
      }
    }
  },
  "1537": {
    "detail": "Гл.4. В obj_treasure_room (Create) для комнаты room_dw_churchb_moneyfountain itemflag=1537, itemtype=\"item\", itemidchest=1, а val вычисляется как global.flag[898] + obj_dw_churchb_moneyfountain.bonus (накопленное «золото» пожертвований). В obj_dw_churchb_moneyfountain (Step) NPC-донатор читает itemreceived = global.flag[1537] и показывает реплику про обращённые в золото деньги. На что влияет: разовую выдачу предмета из фонтана пожертвований и логику NPC-донатора (связан с flag[898] — накопленным золотом).",
    "related": [
      898,
      1787
    ],
    "lines": [
      {
        "cond": "Гл.4: реплика NPC-донатора у денежного фонтана церкви",
        "who": "narration",
        "text": "* You are the donator. Your money has turned into fine gold."
      }
    ]
  },
  "1538": {
    "detail": "Гл.4, obj_dw_church_remotepianomove. Пока флаг==0 и !final — игра форсирует катсцену управления пианино (walktime, camcon=1, camcontrol=true, kris.freeze/fun, global.flag[7]=1). Когда camcon==1 завершается, camcon=2 и global.flag[1538]=1. После этого: obj_bookshelf_destructable (Draw) гасит active (alpha→0), obj_dw_church_remotepianomove_ui (Draw) показывает интерфейс (alpha не зануляется), obj_tutorial_text (Draw) выводит 2 строки (movepiano/exitstring). На что влияет: завершение паззла пианино, отображение UI перемещения пианино и подсказок, видимость разрушаемой книжной полки.",
    "related": [
      7
    ]
  },
  "1539": {
    "detail": "Гл.4. В obj_treasure_room (Create) при room==room_dw_churchb_libraryconnector (или i_ex объекта) задаются itemtype=\"item\", itemidchest=61, itemflag=1539. Флаг хранит факт открытия именно этого сундука. На что влияет: разовую выдачу предмета (id 61) из сундука библиотечного перехода церкви B и то, будет ли сундук показан открытым."
  },
  "1540": {
    "detail": "Гл.4. В obj_treasure_room (Create) при room==room_dw_churchb_library: itemtype=\"item\", itemidchest=2, itemflag=1540. Тот же предмет (itemidchest=2, itemflag=1540) создаётся через obj_treasure_room из obj_bookshelf_destructable (Step), когда полка ломается. На что влияет: разовую выдачу предмета id 2 из библиотеки церкви B (сундук или разрушаемая полка)."
  },
  "1541": {
    "detail": "Гл.4. В RoomCC_room_dw_churchb_library_alternate (PreCreate) выставляются extflag=\"treasure\" и flagno=1541 — то есть индекс флага хранится в переменной объекта-маркера (литерала global.flag[1541] в этом фрагменте нет). Флаг отмечает, был ли вскрыт сундук/полка в альтернативной версии библиотеки. На что влияет: разовое срабатывание клада/полки в альтернативной комнате библиотеки церкви B."
  },
  "1545": {
    "detail": "Гл.4. В obj_treasure_room (Create) при room==room_dw_churchb_gallery: itemflag=1545, itemtype=\"money\", itemidchest=500 (выдаётся 500 «золота»). Флаг хранит факт получения этого денежного тайника. На что влияет: разовую выдачу 500 денег из тайника галереи церкви B."
  },
  "1547": {
    "detail": "Гл.4. В obj_dw_church_secretpiano (Step) при con==60 — scr_flag_set(1547,1), scr_flag_set(851,1), играбельное пианино (obj_church_secretpiano_playable) блокируется (cantuse=true). В Create pianosolved=global.flag[1547]: если решено, con=-1 и пианино уже нельзя использовать. obj_dw_gerson_study (Create) при scr_flag_get(1547)==0 || plot>=242 показывает камин (show_fireplace). В scr_text Герсон при flag[1548]==1 && flag[1547]==0 && flag[1549]==0 ставит flag[1549]=1. obj_ch4_DCA10 при flag[1547]>0 && flag[1629]==0 запускает реплику Герсона. На что влияет: блокировку секретного пианино, побочный flag[851], показ камина в кабинете Герсона и связанные реплики Герсона (flag 1548/1549/1629).",
    "related": [
      851,
      1548,
      1549,
      1629
    ],
    "lines": [
      {
        "cond": "Выбор «Ничего» (global.choice=3) в разговоре с Герсоном — прощание (scr_text)",
        "who": "gerson",
        "text": "* Enjoy yourselves! You got a lot ahead of you..."
      },
      {
        "cond": "При flag[1547]>0 и flag[1629]=0 — реплика Герсона (obj_ch4_DCA10)",
        "who": "gerson",
        "text": "* By the by..."
      }
    ]
  },
  "1550": {
    "detail": "Гл.4. В obj_treasure_room (Create) при extflag==\"ripseqtreasure\": itemtype=\"item\", itemidchest=62, itemflag=1550. Флаг хранит факт открытия этого сундука. На что влияет: разовую выдачу предмета id 62 из сундука последовательности «rip» в Тёмной церкви."
  },
  "1551": {
    "detail": "Гл.4. В scr_text (case 1426): при global.choice==0 — scr_flag_set(1551,1) и Сьюзи говорит «.yeah. Let's go.», иначе scr_flag_set(1551,2) и «Whatever, I'll just go myself later.». obj_room_town_south (Create) при plot>=100 && plot<300 проверяет scr_flag_get(1551)==0 && !scr_sideb_active() && scr_flag_get(706)==0 — тогда запускает сцену со Сьюзи (susie_check=true, con=10). На что влияет: запуск сцены разговора со Сьюзи в южном городке и дальнейшую ветку «идём вместе / Сьюзи идёт сама» (связь с flag[706] и side-B маршрутом).",
    "related": [
      706
    ],
    "lines": [
      {
        "cond": "При выборе «идём вместе» (global.choice 0, flag → 1)",
        "who": "susie",
        "text": "* ... yeah. Let's go."
      },
      {
        "cond": "При отказе (flag → 2 — Сьюзи пойдёт сама)",
        "who": "susie",
        "text": "* Whatever, I'll just go myself later."
      }
    ]
  },
  "1559": {
    "detail": "Гл.4. Записывается только при global.plot>=45 && plot<50. obj_room_castle_kris_susie (Step): если flag==0 → scr_flag_set(1559,1) (чаепитие). obj_ch4_PDC05A (Step): если flag<2 → scr_flag_set(1559,2) (закусочная), заодно scr_flag_set(701,1). Позже obj_ch4_PDC08 (Step) читает: kept_waiting=flag>0, had_tea_party=flag==1, had_diner=flag==2 — и Сьюзи произносит соответствующую реплику. На что влияет: вариант сцены ожидания (чай/закусочная), побочный flag[701] и реплики Сьюзи в obj_ch4_PDC08.",
    "related": [
      701
    ],
    "lines": [
      {
        "cond": "После сцены ожидания в замке (флаг > 0)",
        "who": "susie",
        "text": "* Alright, ready to explore your house now!"
      }
    ]
  },
  "1569": {
    "detail": "Гл.4. global.flag[1569]=1 выставляется в obj_hammer_of_justice_enemy (Step, при победе, +global.mag[2]+=4) и сразу в obj_sound_of_justice_enemy (Create). При flag[1569]==1: obj_darkcontroller (Draw) считает лечение как (mag[1]*10)+2*flag[1045] вместо обычного; scr_spelltext выводит «cast BetterHeal!» вместо «cast OKHEAL!»; scr_spellinfo вместе с flag[852] меняет стоимость заклинания; scr_spell усиливает heal (case 6: *6 вместо *3.5; case heal: *7+15+2*flag[1045]). На что влияет: разблокировку усиленного лечащего приёма Сьюзи, его текст, стоимость и величину лечения (связь с flag[852], flag[1045]).",
    "related": [
      852,
      1045
    ],
    "lines": [
      {
        "cond": "Показатель лечения в бою (obj_darkcontroller, Гл.4): при flag[1569]=1 — усиленная формула лечения",
        "who": "narration",
        "text": "Healing"
      },
      {
        "cond": "Описание заклинания, когда Сьюзи не может лечить (plot≥110 и flag[850]<6) — не зависит от flag[1569]",
        "who": "narration",
        "text": "It seems the user doesn't want to use this spell."
      }
    ]
  },
  "1573": {
    "detail": "Гл.4, obj_dw_churchb_windows (Step): при trigcheck(\"leave\") con=1, global.flag[1573]++, дверь по умолчанию door1, но при flag[1573]==8 — door2. В Create (отладка, клавиша P): если flag==0 → flag=7 («Next entrance will go to man»), иначе сброс в 0. На что влияет: прохождение паззла витражных окон — на 8-м проходе игрок попадает в следующую комнату (door2)."
  },
  "1581": {
    "detail": "Гл.4. В obj_treasure_room (Create) при i_ex(obj_dw_churchb_prophecymaze): itemtype=\"item\", itemidchest=62, itemflag=1581. Флаг хранит факт открытия сундука лабиринта пророчеств. На что влияет: разовую выдачу предмета id 62 в лабиринте пророчеств церкви B."
  },
  "1582": {
    "detail": "Гл.4. В obj_treasure_room (Create) при i_ex(obj_dw_church_bookshelfpuzzle): itemtype=\"weapon\", itemidchest=54, itemflag=1582. Флаг хранит факт получения этого оружия. На что влияет: разовую выдачу оружия id 54 за паззл книжных полок церкви."
  },
  "1586": {
    "detail": "Гл.4. В obj_treasure_room (Create) при room==room_dw_church_rightconnect: itemtype=\"weapon\", itemidchest=53, itemflag=1586. Флаг хранит факт открытия сундука. На что влияет: разовую выдачу оружия id 53 в правом переходе Тёмной церкви."
  },
  "1587": {
    "detail": "Гл.4. В obj_treasure_room (Create) при room==room_dw_church_minorlegend: itemtype=\"item\", itemidchest=61, itemflag=1587. Флаг хранит факт открытия сундука. На что влияет: разовую выдачу предмета id 61 в комнате «малой легенды» Тёмной церкви."
  },
  "1588": {
    "detail": "Гл.4. В obj_treasure_room (Create) при room==room_dw_church_pianopiece_right: itemtype=\"item\", itemidchest=2, itemflag=1588. Флаг хранит факт открытия сундука. На что влияет: разовую выдачу предмета id 2 в правой комнате «фрагмента пианино» Тёмной церкви."
  },
  "1589": {
    "detail": "Гл.4. В obj_treasure_room (Create) при room==room_dw_church_trueclimbadventure: itemflag=1589, itemtype=\"item\", itemidchest=28. Флаг хранит факт открытия сундука. На что влияет: разовую выдачу предмета id 28 в комнате истинного подъёма Тёмной церкви."
  },
  "1590": {
    "detail": "Гл.4. В obj_treasure_room (Create) при room==room_dw_church_jackenstein: itemflag=1590, itemtype=\"money\", itemidchest=500. Флаг хранит факт получения этого денежного тайника. На что влияет: разовую выдачу 500 денег в комнате «Jackenstein» Тёмной церкви."
  },
  "1592": {
    "detail": "Гл.4, obj_dw_churchb_windows (Step). При выборе «съесть» — snd_moss_fanfare, реплика «(The moss was consumed with gusto!)», flag[1592]=1, объект уезжает за карту (setxy(room_width, room_height)). При другом выборе — «(You left the moss for the next person. Pass it on.)», flag[1592]=2. В Create при flag[1592]==1 объект сразу прячется (setxy(room_width*4, room_height)). На что влияет: исход «моховой» цепочки (съесть/передать дальше) и наличие объекта мха в комнате.",
    "lines": [
      {
        "cond": "При flag[1592] = 1 (мох съеден)",
        "who": "narration",
        "text": "* (The moss was consumed with gusto!)"
      },
      {
        "cond": "При flag[1592] = 2 (мох оставлен следующему)",
        "who": "narration",
        "text": "* (You left the moss for the next person. Pass it on...)"
      }
    ]
  },
  "1593": {
    "detail": "Гл.4, obj_dw_churchb_gersonstudy (Step). При flag[1593]==0 — реплики «(It's an unmanned table of item.)» / «(. take some?)» с выбором #Yes/#No. При global.choice==0 — flag[1593]=1 и Сьюзи: «Hey, that's the old man's, dumbass!» / «You gotta leave some money or something.». При choice==1 — flag[1593]=2 и Сьюзи: «. yeah, that's not the cool type of stealing.». На что влияет: одноразовую сцену у бесхозного стола Герсона и реплики Сьюзи (отдельно от счётчика покупок flag[1594]).",
    "related": [
      1594
    ],
    "lines": [
      {
        "cond": "При flag[1593] = 0 (ещё не подходили к столу) — осмотр бесхозного стола Герсона",
        "who": "narration",
        "text": "* (It's an unmanned table of item...)"
      },
      {
        "cond": "При flag[1593] = 0 (ещё не подходили к столу) — осмотр бесхозного стола Герсона",
        "who": "narration",
        "text": "* (... take some?)"
      },
      {
        "cond": "При выборе «Yes» — попытка взять бесплатно (flag[1593] → 1), Сьюзи отчитывает",
        "who": "susie",
        "text": "* Hey, that's the old man's, dumbass!"
      },
      {
        "cond": "При выборе «Yes» — попытка взять бесплатно (flag[1593] → 1), Сьюзи отчитывает",
        "who": "susie",
        "text": "* You gotta leave some money or something..."
      },
      {
        "cond": "При выборе «No» — отказ брать без оплаты (flag[1593] → 2), реплика Сьюзи",
        "who": "susie",
        "text": "* ... yeah, that's not the cool type of stealing."
      }
    ]
  },
  "1594": {
    "detail": "Гл.4, obj_dw_churchb_gersonstudy (Step). var price=99; if (global.flag[1594]>0) price=100. После успешной покупки Rhapsotea (две ветки выдачи: с реакцией «(You paid an extra $1 for the Rhapsotea.)» и обычная) списывается global.gold -= price и global.flag[1594]++. То есть после первой покупки цена 99 → 100. На что влияет: цену повторных покупок Rhapsotea (61) у стола Герсона и счётчик числа покупок.",
    "related": [
      1593
    ],
    "lines": [
      {
        "cond": "При flag[1594] > 0 (повторная покупка Rhapsotea — доплата $1, цена 99→100)",
        "who": "narration",
        "text": "* (You paid an extra $1 for the Rhapsotea...)"
      }
    ]
  },
  "1596": {
    "detail": "Гл.4, obj_dw_churchc_angelprophecy. Показывает ОДНО пророчество — «Ангел» (extflag \"angel\"); изображение неразборчивое/тёмное (рисуется spr_pxwhite, залитый чёрным), под ним строфа. 1 — просмотрено (cutscene=2, появляется зона NPC). Сьюзи не может разобрать картинку, ей отвечают, что это Ангел. Не сбрасывается (0 — только debug-клавишей P).",
    "fx": {
      "proph": {
        "items": [
          {
            "icon": "angel",
            "verse": "THE ANGEL, BANISHED, WILL#FINALLY MEET WITH ITS DESIRE."
          }
        ]
      }
    },
    "lines": [
      {
        "cond": "Просмотр пророчества «Ангел» — катсцена (флаг→1)",
        "who": "susie",
        "text": "* Hey, below the words, that picture..."
      },
      {
        "cond": "Просмотр пророчества «Ангел» — катсцена (флаг→1)",
        "who": "susie",
        "text": "* ... What the hell... is that supposed to be...?"
      },
      {
        "cond": "Просмотр пророчества «Ангел» — катсцена (флаг→1)",
        "who": "ralsei",
        "text": "* That... that's the Angel, Susie."
      },
      {
        "cond": "Просмотр пророчества «Ангел» — катсцена (флаг→1)",
        "who": "ralsei",
        "text": "* What... to my understanding, it actually looks like."
      },
      {
        "cond": "Просмотр пророчества «Ангел» — катсцена (флаг→1)",
        "who": "susie",
        "text": "* I.. I dunno about that, man."
      },
      {
        "cond": "Повторный осмотр пророчества «Ангел» (зона NPC, флаг уже =1)",
        "who": "narration",
        "text": "* (It's a prophecy...)"
      },
      {
        "cond": "Повторный осмотр пророчества «Ангел» (зона NPC, флаг уже =1)",
        "who": "narration",
        "text": "* (... Looking at it made you feel strange. You did not investigate further.)"
      }
    ]
  },
  "1597": {
    "detail": "Гл.4. obj_titan_spawn_enemy (Step) при завершении акта: global.flag[1597] += 2 (с эффектом scr_oflash у obj_herokris). obj_darkcontroller (Draw) показывает puredcount = clamp(0, global.flag[1597], 9999) под надписью «Purify» (рядом со «Slain» — flag[1598]). На что влияет: счётчик «очищенных» Titan Spawn (линия концовки с Ангелом) и его вывод на экране статистики.",
    "related": [
      1598
    ],
    "lines": [
      {
        "cond": "Статистика Гл.4 — ярлык, если убито больше очищенных (flag[1598]>flag[1597])",
        "who": "narration",
        "text": "Slain"
      },
      {
        "cond": "Статистика Гл.4 — ярлык, если очищено больше убитых (flag[1597]>flag[1598])",
        "who": "narration",
        "text": "Purify"
      }
    ]
  },
  "1598": {
    "detail": "Гл.4. GlobalScript_scr_defeatrun: при fatal==1 || i_ex(obj_titan_spawn_enemy) создаётся obj_deathanim и global.flag[1598]++ (иначе — обычная obj_defeatanim без инкремента). obj_darkcontroller (Draw) показывает slaincount = clamp(0, global.flag[1598], 9999) под надписью «Slain» (рядом с «Purify» — flag[1597]). На что влияет: счётчик убийств Главы 4 и его вывод на экране статистики (вместе с flag[1597]).",
    "related": [
      1597
    ],
    "lines": [
      {
        "cond": "Если убийств не меньше очищений (flag[1598] ≥ flag[1597]) — показывается «Slain»",
        "who": "narration",
        "text": "Slain"
      },
      {
        "cond": "Если очищений больше (flag[1597] > flag[1598]) — показывается «Purify»",
        "who": "narration",
        "text": "Purify"
      }
    ]
  },
  "1606": {
    "detail": "Гл.4, obj_dw_churchc_angelprophecy_encounter. На что влияет: вариант реплик пророка и открытие прохода. 0 — с пророком не говорили; 1 — поговорили БЕЗ тайной находки (gotegg==0): пророк «открывает проход» (makedoor=true), говорит «искать нечего, посмотри сам»; 2 — поговорили С тайной находкой (gotegg==1, есть яйцо/секрет): пророк РАСПОЗНАЁТ её и зовёт лжецом («твои руки сияют, ты брал и создавал»). Значение НЕ сбрасывается после прохода (0 ставится только debug-клавишами 1/2 в Create) — выбор сохраняется. Это НЕ показ пророчества-видения, а беседа с пророком.",
    "related": [
      931
    ],
    "lines": [
      {
        "cond": "При 1 (без тайной находки — пророк открывает проход)",
        "who": "narration",
        "text": "* Treasure? There is no treasure... only experience."
      },
      {
        "cond": "При 1 (без тайной находки — пророк открывает проход)",
        "who": "narration",
        "text": "* The other side of your mind... did you miss something there?"
      },
      {
        "cond": "При 2 (с тайной находкой — пророк зовёт лжецом)",
        "who": "narration",
        "text": "* It's absolutely true. Oh, sink me, the unbeliever. I should be a statue."
      },
      {
        "cond": "При 1 (без тайной находки — пророк открывает проход)",
        "who": "narration",
        "text": "* Of course you didn't. There's nothing to miss."
      },
      {
        "cond": "При 2 (с тайной находкой — пророк зовёт лжецом)",
        "who": "narration",
        "text": "* And none of us can know the truth now, so we're all liars!"
      },
      {
        "cond": "При 2 (с тайной находкой — пророк зовёт лжецом)",
        "who": "narration",
        "text": "* Liar! Your hands are shining. You took and made, took and made."
      }
    ]
  },
  "1610": {
    "detail": "Гл.4. В obj_treasure_room (Create) при i_ex(obj_dw_churchc_prophecies) || room==room_dw_churchc_prophecies: itemflag=1610, itemtype=\"armor\", itemidchest=53. Флаг хранит факт открытия сундука. На что влияет: разовую выдачу брони id 53 в комнате пророчеств церкви C."
  },
  "1611": {
    "detail": "Гл.4, obj_dw_churchc_prophecies (зал пророчеств церкви C). Показывает РОВНО три знамения по маркерам prop1/prop2/prop3: «Небеса и Ад» (две строфы heavenandhell1/2) и шуточное про Чёткинса (joke1). flag[1611]=1 ставится, когда игрок доходит до выхода (маркер \"return\"). Не сбрасывается.",
    "fx": {
      "proph": {
        "items": [
          {
            "icon": "proph_icon_heavenandhell1.png",
            "verse": "THEY'LL HEAR THE RING OF HEAVEN'S CALL."
          },
          {
            "icon": "proph_icon_heavenandhell2.png",
            "verse": "THEY'LL SEE THE TAIL OF HELL TAKE CRAWL."
          },
          {
            "icon": "proph_icon_joke1.png",
            "verse": "JOCKINGTON GROWS THE BEARD."
          }
        ]
      }
    }
  },
  "1614": {
    "detail": "Гл.4. В obj_treasure_room (Create) при room==room_dw_churchc_encounter2: itemflag=1614, itemtype=\"money\", itemidchest=100, image_blend=c_black (сундук затемнён). Флаг хранит факт получения денег. На что влияет: разовую выдачу 100 денег во второй встрече церкви C."
  },
  "1615": {
    "detail": "Гл.4, obj_dw_churchc_superprophecies + obj_gigaprophecy — «гига-пророчество»: стена из множества знамений (spr_dw_church_prophecy_set, 10 знаков) с параллакс-слоями, БЕЗ читаемого текста. Именно поэтому здесь мелькают все знаки сразу — так задумано в игре. 1 — просмотрено (включается музыка obj_musicer_dw_church3). Не сбрасывается (0 — только debug-клавишей P).",
    "fx": {
      "proph": {
        "mode": "wall"
      }
    }
  },
  "1616": {
    "detail": "Гл.4. В obj_treasure_room (Create) при room==room_dw_churchc_treasurechest: itemflag=1616, itemtype=\"armor\", itemidchest=50. В obj_dw_churchc_encounter2 (Step): если global.flag[1595]==1 && global.flag[1616]==true и scr_trigcheck(\"TRIGGER_BLACKOUT\") — запускается «blackout» (затемнение, продолжение встречи). На что влияет: выдачу брони id 50 из сундука и триггер затемнения встречи церкви C (в связке с flag[1595]).",
    "related": [
      1595
    ]
  },
  "1619": {
    "detail": "Гл.4, obj_ch4_PDC03A_rudy_toriel / obj_ch4_PDC03A_alphys_juice. При первой полезной реплике scr_flag_set(1619,1) и вызывается found_clue() у obj_ch4_PDC04 (реплика «(Felt like useful information.)»). Когда уже есть вторая подсказка (например scr_flag_get(1621)==1) и flag[1619]==1 — scr_flag_set(1619,2), susie_ready=true, реплика «(. Felt like you gathered enough clues to tell Susie.)». При flag[1619]<2 ход сцены идёт по ветке con=99. На что влияет: накопление подсказок о Ноэль и готовность рассказать Сьюзи (связь с flag[1620]/1621/1657).",
    "related": [
      1620,
      1621,
      1657
    ],
    "lines": [
      {
        "cond": "Реплики Ториэль — подсказка о Ноэль",
        "who": "toriel",
        "text": "* She never even kept anything at City Hall, either."
      },
      {
        "cond": "Реплики Ториэль — подсказка о Ноэль",
        "who": "toriel",
        "text": "* No keys, no documents, no... handmade gifts, anything."
      },
      {
        "cond": "Реплики Ториэль — подсказка о Ноэль",
        "who": "toriel",
        "text": "* Everything important... she always..."
      },
      {
        "cond": "Реплики Ториэль — подсказка о Ноэль",
        "who": "toriel",
        "text": "* ... keeps locked down at home."
      },
      {
        "cond": "Найдена полезная подсказка (flag → 1)",
        "who": "narration",
        "text": "* (Felt like useful information.)"
      },
      {
        "cond": "Собрано достаточно подсказок (flag → 2)",
        "who": "narration",
        "text": "* (... Felt like you gathered enough clues to tell Susie.)"
      }
    ]
  },
  "1620": {
    "detail": "Гл.4, obj_ch4_PDC03A_rudy_toriel (Step): при scr_flag_get(1620)==0 ставится scr_flag_set(1620,1) и Ноэль рассказывает, как её «запирали снаружи дома» («Huh.? You mean, um. how I. got locked out of my house?» и т.д.). Дальше условие (scr_flag_get(1620)==1 || scr_flag_get(1657)==1) используется в obj_ch4_PDC03A_alphys_juice и obj_readable_room1 — то есть «подсказка получена», и Сьюзи реагирует репликами про «glasses nerds». На что влияет: засчитывание подсказки от Ноэль для линии «рассказать Сьюзи» (наравне с flag[1657]) и реакции Сьюзи.",
    "related": [
      1619,
      1657
    ],
    "lines": [
      {
        "cond": "Сцена с Руди/Ториэль — Ноэль даёт подсказку (флаг → 1)",
        "who": "noelle",
        "text": "* Huh...? You mean, um... how I... got locked out of my house?"
      },
      {
        "cond": "Сцена с Руди/Ториэль — Ноэль даёт подсказку (флаг → 1)",
        "who": "noelle",
        "text": "* That's why I... well, I used to end up at your place sometimes."
      },
      {
        "cond": "Сцена с Руди/Ториэль — Ноэль даёт подсказку (флаг → 1)",
        "who": "noelle",
        "text": "* Y'know, you'd help me... faha, break into my own room."
      },
      {
        "cond": "При полученной подсказке — реакция Сьюзи (флаг = 1)",
        "who": "susie",
        "text": "* Hey, you got something?"
      },
      {
        "cond": "При полученной подсказке — реакция Сьюзи (флаг = 1)",
        "who": "susie",
        "text": "* Damn, if only Ralsei was there to solve it for you."
      }
    ]
  },
  "1621": {
    "detail": "Гл.4, obj_ch4_PDC03A_alphys_juice (Step): при scr_flag_get(722)>0 и flag[1621]==0 — scr_flag_set(1621,1), c_wait(15), и если flag[1619]==0 — заодно scr_flag_set(1619,1). В obj_ch4_PDC03A_rudy_toriel ветка else if (scr_flag_get(1621)==1) продвигает flag[1619] до 2. В obj_readable_room1 при flag[1621]==1 Сьюзи говорит «Man, too bad Noelle can't help us.». На что влияет: засчитывание подсказки про сок Альфис в линии сбора улик о Ноэль и связанные реплики Сьюзи (связь с flag[722]/1619).",
    "related": [
      722,
      1619
    ],
    "lines": [
      {
        "cond": "При 722>0 и 1621=0 — получение подсказки (ставит 1621=1)",
        "who": "narration",
        "text": "* (Felt like useful information.)"
      },
      {
        "cond": "При 1621=1 — реплика Сьюзи (obj_readable_room1)",
        "who": "susie",
        "text": "* Man, too bad Noelle can't help us..."
      },
      {
        "cond": "При 1621=1 — реплика Сьюзи (obj_readable_room1)",
        "who": "susie",
        "text": "* ... She'd probably figure this out in no time."
      }
    ]
  },
  "1623": {
    "detail": "Использован предмет «Стекло» (Glass) в праздничной комнате (Ch4) — Крис на миг видит и слышит Ноэль. Ставится один раз.",
    "related": [],
    "lines": [
      {
        "cond": "При использовании предмета «Стекло» в праздничной комнате Гл.4 (flag[1623] = 1)",
        "who": "narration",
        "text": "You thought you saw Noelle close against you, whispering."
      }
    ]
  },
  "1638": {
    "detail": "Гл.4. В obj_treasure_room (Create) при room==room_dw_church_dogclimb: itemflag=1638, itemtype=\"item\", itemidchest=33. Флаг хранит факт открытия сундука. На что влияет: разовую выдачу предмета id 33 в комнате «собачьего подъёма» Тёмной церкви."
  },
  "1640": {
    "detail": "Стадия подъёма в бою с Титаном/Ангелом (Тёмное святилище, Ch4). При значении ≥8 усиливает исцеление напряжением у мох-врагов: 8 → ×1.2, далее по стадиям до ×2 при ≥16.",
    "related": [
      1597,
      1598
    ]
  },
  "1651": {
    "detail": "obj_tem_school_Create_0.gml: song_index = scr_flag_get(1651), song_min=0, song_max=3. Step_0.gml: при старте песни sound_index = song_index + 1 и собирается имя файла \"snd_tem_sing_\" + string(sound_index); по окончании next_index = scr_wrap_ondy(song_index+1, 0, 3) и scr_flag_set(1651, next_index) — то есть флаг циклически перебирает 0.3."
  },
  "1652": {
    "detail": "obj_npc_room_Other_10.gml: ветка else if (scr_flag_get(852)==1 && scr_flag_get(1652)==0) → scr_flag_set(1652,1), scr_speaker(\"gerson\") и две строки Герсона о «странной силе» кристалла. Флаг лишь помечает, что эта конкретная реплика уже была показана; ни заклинания, ни «топора» в самом коде, привязанном к 1652, нет — связь с топором только косвенная (через флаг 852, отвечающий за титул/Топор правосудия Сьюзи).",
    "related": [
      852
    ],
    "lines": [
      {
        "cond": "При flag[852] = 1 и flag[1652] = 0 — одноразовая реплика Герсона про кристалл (obj_npc_room, flag → 1)",
        "who": "gerson",
        "text": "That crystal's got some kinda strange power."
      },
      {
        "cond": "При flag[852] = 1 и flag[1652] = 0 — одноразовая реплика Герсона про кристалл (obj_npc_room, flag → 1)",
        "who": "gerson",
        "text": "Gave me the skeevies, so I didn't use it! Wahaha!"
      }
    ]
  },
  "1656": {
    "conflicts": [
      { "self": [1], "other": 916, "otherVals": [0], "note": "1656=1 (провал Странного пути в Гл.4) ставится атомарно с 916=1, поэтому 916 не может быть 0" },
      { "self": [1], "other": 456, "otherVals": [0], "note": "провалить Странный путь в Гл.4 (1656=1) можно только пройдя Странный путь в Гл.2 (456=1, победа над Spamton NEO): путь Гл.4 активен лишь при scr_sideb_active (915≥7 & 916=0), а донести его до Гл.4 можно только полным прохождением Гл.2" },
      { "self": [1], "other": 915, "otherVals": [0,1,1.5,1.75,2,3,4,5,6,7,8,9,19], "note": "1656=1 требует полного Странного пути Гл.2 (915=20): 915=20 ставится в конце Гл.2, а завершить её с 915=7..19 & 916=0 нельзя" }
    ],
    "detail": "Гл.4. GlobalScript_scr_sideb_fail: внутри ветки провала side-B при global.chapter==4 выполняется scr_flag_set(1656,1). Это просто отметка «провалено» — в данном фрагменте без диалога. На что влияет: фиксацию провала тайного маршрута (Weird/side-B) именно в Главе 4."
  },
  "1657": {
    "detail": "Гл.4, obj_ch4_PDC03A_rudy_toriel (Step): при scr_flag_get(1657)==0 ставится scr_flag_set(1657,1), c_speaker(\"rudy\") и реплики «Krismeister, hey! What's the deal, snowmobile?» / «. huh? \"Locked out.?\"» / «(Noelle. wasn't stuck outside the gate again, was she, Kris.?)». Дальше условие (scr_flag_get(1620)==1 || scr_flag_get(1657)==1) в obj_readable_room1 и obj_ch4_PDC03A_alphys_juice означает «подсказка собрана». На что влияет: запуск разговора с Руди и засчитывание подсказки о Ноэль (равнозначно flag[1620]).",
    "related": [
      1619,
      1620
    ],
    "lines": [
      {
        "cond": "При первом разговоре с Руди (obj_ch4_PDC03A_rudy_toriel, scr_flag_get(1657)=0 → 1)",
        "who": "rudy",
        "text": "* Krismeister, hey! What's the deal, snowmobile?"
      },
      {
        "cond": "При первом разговоре с Руди (obj_ch4_PDC03A_rudy_toriel, scr_flag_get(1657)=0 → 1)",
        "who": "rudy",
        "text": "* ... huh? \"Locked out...?\""
      },
      {
        "cond": "При первом разговоре с Руди (obj_ch4_PDC03A_rudy_toriel, scr_flag_get(1657)=0 → 1)",
        "who": "rudy",
        "text": "* (Noelle... wasn't stuck outside the gate again, was she, Kris...?)"
      }
    ]
  },
  "1658": {
    "detail": "GlobalScript_scr_load.gml: if (scr_completed_chapter_any_slot(4) && global.plot >= 243) { global.flag[1658]=1; if (global.flag[1659]==0) global.currentroom = scr_get_id_by_room_index(261); }. obj_dw_church_knightclimbpost_Create_0.gml: if (global.flag[1658]==1) { scr_setparty(1,1); pillar = instance_create(1000,524,obj_dw_leave_ch4);. }. obj_room_castle_area_1_Create_0.gml (plot≥243) проверяет flag[1658]==1 && tempflag[58]==1 для запуска сцены.",
    "related": [
      1659,
      1660
    ]
  },
  "1659": {
    "detail": "obj_dw_church_knightclimbpost_Step_0.gml: в c_customfunc после сцены — global.flag[1659]=1; global.interact=3; затем room_goto в комнату по id из ini. Create_0.gml: ветка сцены входит только если global.flag[1659]==0 && global.plot>=243. scr_load.gml: при инициализации (flag[1658]=1) если flag[1659]==0 — currentroom переставляется на индекс 261.",
    "related": [
      1658,
      1660
    ]
  },
  "1660": {
    "detail": "obj_dw_church_knightclimbpost_Step_0.gml: при flag[1660]==0 ветка pillar_con=2 (ожидание выбора); когда pillar_con==2 && global.choice!=-1 && customcon==1 → global.flag[1660]=1. Create_0.gml: with(pillar_trigger){ image_xscale=10; image_yscale=10; if (global.flag[1660]==1) x += 40; } — то есть флаг лишь смещает зону-триггер столба-выхода.",
    "related": [
      1658,
      1659
    ]
  },
  "1661": {
    "detail": "Гл.4. obj_dw_church_knightclimbpost (Step) в катсцене: c_customfunc → global.flag[1661] += 1; при flag[1661]==1 Сьюзи говорит «. Took you long enough.». При flag[1661]>0 && plot>=240: obj_mainchara (Create) ставит Крис в x=920, y=1200; obj_room_castle_town (Create) вызывает scr_losechar(); obj_musicer_darkcastle включает lancer_annoying.ogg вместо castletown.ogg/castle_funk_long.ogg; obj_doorX_musfade при y>=1500 ведёт в room_dw_castle_area_1. При flag[1661]==0: obj_ch4_PDC06 ставит scr_setparty(1,1,0), а stanchion-контроллер делает clean_up(). На что влияет: позицию Крис и состав отряда после возвращения, музыку города-замка, маршрут двери и реплику Сьюзи.",
    "related": [
      706
    ],
    "lines": [
      {
        "cond": "После подъёма (flag[1661]≥1): Сьюзи ждёт",
        "who": "susie",
        "text": "* ... Took you long enough."
      }
    ]
  },
  "1663": {
    "detail": "obj_miccheck_Other_10: при nomic==false и global.flag[1663]==0 флаг выставляется в 1, говорящий — no_name (нарратор), показываются два сообщения про загадочный кристалл в форме микрофона. Чисто косметический флаг проверки.",
    "lines": [
      {
        "cond": "При flag[1663] = 0 — первый осмотр кристалла-микрофона (obj_miccheck)",
        "who": "narration",
        "text": "* (It's a mysterious microphone-shaped crystal.)"
      },
      {
        "cond": "При flag[1663] = 0 — первый осмотр кристалла-микрофона (obj_miccheck)",
        "who": "narration",
        "text": "* (Peering into the crystal ball, the thoughts of microphones cross your mind...)"
      }
    ]
  },
  "1664": {
    "detail": "obj_savepoint_Other_10: условие `global.darkzone == 0 && global.flag[1664] == 0` — ставит флаг в 1, включает nodialogue=0, говорящий no_name (нарратор) и выводит две строки.",
    "lines": [
      {
        "cond": "Гл.4: первое срабатывание точки сохранения в светлой зоне (flag 0 → 1)",
        "who": "narration",
        "text": "* (You could barely see it. A patch of sunlight that shouldn't be there.)"
      },
      {
        "cond": "Гл.4: первое срабатывание точки сохранения в светлой зоне (flag 0 → 1)",
        "who": "narration",
        "text": "* (It felt different in your hand. And you knew what it was.)"
      }
    ]
  },
  "1688": {
    "detail": "Гл.4, obj_dw_church_arena (Step): при noroom==0 — global.flag[1688]=1, маркер топора прячется, реплика «(JusticeAxe was added to your WEAPONS.)». При noroom==1 — global.flag[1688]=2 и «(. but, there wasn't enough room.)». При flag[1688]==2 obj_dw_gerson_study (Create) создаёт obj_treasure_room с itemflag=1688, itemtype=\"weapon\", itemidchest=52 — то есть оставленный JusticeAxe можно забрать сундуком в кабинете Герсона. На что влияет: выдачу JusticeAxe Сьюзи и появление «забытого» оружия в кабинете Герсона при нехватке места.",
    "lines": [
      {
        "cond": "При 1 (хватило места → JusticeAxe в оружие)",
        "who": "narration",
        "text": "* (JusticeAxe was added to your WEAPONS.)"
      },
      {
        "cond": "При 2 (места не хватило → оружие оставлено)",
        "who": "narration",
        "text": "* (... but, there wasn't enough room.)"
      }
    ]
  },
  "1691": {
    "detail": "Гл.4, зона замка-телевизора (obj_room_castle_tv_zone_1): статую с кошачьими ушами предлагают погладить. Выбор «Don't» → global.flag[1691]=2 и реплика Сьюзи «Hands off, dumbass!» (Крис гладит Ральзея и Сьюзи вместо статуи); выбор «Pet it» пишет флаг 1690. Записывает сделанный выбор; больше нигде в главах не читается.",
    "lines": [
      {
        "cond": "Реплика Сьюзи при выборе «Не гладить» (flag → 2)",
        "who": "susie",
        "text": "Hands off, dumbass!"
      }
    ]
  },
  "1694": {
    "detail": "Гл.4: битовая маска состояний статуй в зоне Майка (замок-телевизор) — сумма битов отдельных мини-событий со статуями. Хранит, какие из событий-статуй пройдены.",
    "related": [
      1691
    ]
  },
  "1698": {
    "detail": "Гл.4. obj_mike_minigame_controller (Step): при myscore > hiscore[minigame] — hiscore обновляется и global.flag[1698] = other.myscore (snd_won, new_hiscore=120). obj_mike_minigame_tv (Create) загружает hiscore[2]=global.flag[1698] (и т.д. для 1699/1700). obj_room_castle_tv_zone_minigame (Step) умеет сбрасывать все три: global.flag[1698]=1699=1700=0. На что влияет: сохранение и показ рекорда первой мини-игры Майка (вместе с flag[1699]/1700).",
    "related": [
      1699,
      1700
    ]
  },
  "1699": {
    "detail": "Гл.4. obj_mike_minigame_controller (Step): при новом рекорде global.flag[1699] = other.myscore (snd_won, new_hiscore=120). obj_mike_minigame_tv (Create) загружает hiscore[3]=global.flag[1699]. obj_room_castle_tv_zone_minigame (Step) сбрасывает global.flag[1698]/1699/1700 в 0. На что влияет: сохранение и показ рекорда второй мини-игры Майка (вместе с flag[1698]/1700).",
    "related": [
      1698,
      1700
    ]
  },
  "1700": {
    "detail": "Гл.4. obj_mike_minigame_controller (Other_21): при myscore > hiscore[minigame] — global.flag[1700] = other.myscore (snd_won, new_hiscore=120). obj_mike_minigame_tv (Create) загружает hiscore[4]=global.flag[1700]; пороги bronze/silver/gold/platinum заданы отдельно. obj_room_castle_tv_zone_minigame (Step) сбрасывает три флага рекордов в 0. На что влияет: сохранение и показ рекорда третьей мини-игры Майка (вместе с flag[1698]/1699).",
    "related": [
      1698,
      1699
    ]
  },
  "1703": {
    "detail": "Гл.4. itemflag=1703, itemtype=\"item\", itemidchest=34 задаётся и в obj_treasure_room (Create) при room==room_dw_castle_tv_zone_3, и в obj_room_castle_tv_zone_3 (Create), где сундук создаётся в точке (92,210). Проверка global.flag[itemflag]==1 отмечает уже вскрытый сундук. На что влияет: разовую выдачу предмета id 34 (Телеобед) в третьей ТВ-зоне города-замка."
  },
  "1704": {
    "detail": "obj_ch4_PDC14A_noelle_Step: scr_flag_set(7,0), global.plot=64, global.flag[1704]=1, room_goto в шкаф дома Ноэль. obj_ch4_PDC10C_Create проверяет (plot==62||plot==64||scr_flag_get(737)==1||flag[1704]==1); при flag[1704]==2 и scr_flag_get(737)!=1 — выход; по завершении 1 переводится в 2.",
    "related": [
      737
    ]
  },
  "1705": {
    "related": [816, 914, 1173, 1174, 1193, 1194],
    "lines": [
      {
        "cond": "при значении < 2 (4rd Sanctuary ещё не пройдено идеально): NPC Pippins",
        "who": "narration",
        "text": "Hey, I heard if you clear 4rd Sanctuary without missing a note..."
      },
      {
        "cond": "при значении < 2 (4rd Sanctuary ещё не пройдено идеально): NPC Pippins",
        "who": "narration",
        "text": "A special colored Pippins will give you a pat on the head."
      },
      {
        "cond": "при значении >= 2 (4rd Sanctuary пройдено идеально), первый раз (flag1802=0)",
        "who": "narration",
        "text": "Woah, you actually fully cleared 4rd Sanctuary...!?"
      },
      {
        "cond": "при значении >= 2 (4rd Sanctuary пройдено идеально) и flag1802=2",
        "who": "narration",
        "text": "Still, I was able to pat Pluey on the head."
      },
      {
        "cond": "при значении >= 2 (4rd Sanctuary пройдено идеально) и flag1802=2",
        "who": "narration",
        "text": "... you can do that whenever though."
      }
    ]
  },
  "1706": {
    "lines": [
      {
        "cond": "при значении 1 (свидание распознано как свидание)",
        "who": "narration",
        "text": "What is this... a date!?"
      },
      {
        "cond": "при значении 0 (свидание НЕ распознано)",
        "who": "narration",
        "text": "Wh-what's going on!? School!?"
      },
      {
        "cond": "вступление свидания",
        "who": "narration",
        "text": "And you wanna WALK ME HOME!?"
      },
      {
        "cond": "при значении 0 (вопрос 1)",
        "who": "narration",
        "text": "It's... because you think this body's CUTE, right!?"
      }
    ]
  },
  "1707": {
    "lines": [
      {
        "cond": "при значении 0 (реплика играет; при значении 1 — пропускается)",
        "who": "narration",
        "text": "Let's date, mew!"
      },
      {
        "cond": "при значении 0 (реплика играет; при значении 1 — пропускается)",
        "who": "narration",
        "text": "H-Hey, we split!!"
      }
    ]
  },
  "1709": {
    "related": [1388],
    "lines": [
      {
        "cond": "при первом разговоре с Руди (значение 0)",
        "who": "rudy",
        "text": "* (cough, cough)"
      }
    ]
  },
  "1720": {
    "related": [254],
    "lines": [
      {
        "cond": "при первом разговоре с капитаном в додзё (значение 0)",
        "who": "narration",
        "text": "* These ladies, man, they're killing me."
      },
      {
        "cond": "при первом разговоре с капитаном в додзё (значение 0)",
        "who": "narration",
        "text": "* I'm making them music, and if I don't perfectly interweave their leitmotifs"
      },
      {
        "cond": "при первом разговоре с капитаном в додзё (значение 0)",
        "who": "narration",
        "text": "* They go complete boom mic on me, chief. Or like, a third of them does."
      },
      {
        "cond": "при первом разговоре с капитаном в додзё (значение 0)",
        "who": "narration",
        "text": "* And they always want their `#$@! in 3 4, with triplets."
      },
      {
        "cond": "при первом разговоре с капитаном в додзё (значение 0)",
        "who": "narration",
        "text": "* And I'm like, ladies, I love you, my sweet beats, but 4 4 is good also."
      },
      {
        "cond": "при первом разговоре с капитаном в додзё (значение 0)",
        "who": "narration",
        "text": "* But no, they want to hear the threes. So all my music is turning into like,"
      },
      {
        "cond": "при первом разговоре с капитаном в додзё (значение 0)",
        "who": "narration",
        "text": "* Pirate movie music dance remixes, and just... life is tough, boss."
      },
      {
        "cond": "при первом разговоре с капитаном в додзё (значение 0)",
        "who": "narration",
        "text": "* Man, when it was just me and the crew, we would just like"
      },
      {
        "cond": "при первом разговоре с капитаном в додзё (значение 0)",
        "who": "narration",
        "text": "* We could interweave each others' leitmotifs all day."
      },
      {
        "cond": "при первом разговоре с капитаном в додзё (значение 0)",
        "who": "narration",
        "text": "* Swing 'em. Remix 'em."
      },
      {
        "cond": "при первом разговоре с капитаном в додзё (значение 0)",
        "who": "narration",
        "text": "* Where my boys at now. I don't know. It's been 24 hours. I might as well be dead."
      }
    ]
  },
  "1721": {
    "lines": [
      {
        "cond": "при первом разговоре (значение 0)",
        "who": "narration",
        "text": "* Hey, boss. We, uh... we kind of stopped fitting in, at the dojo."
      },
      {
        "cond": "при первом разговоре (значение 0)",
        "who": "narration",
        "text": "* So all of us rejects started a new battle frontier... here. In the bakery."
      },
      {
        "cond": "при первом разговоре (значение 0)",
        "who": "narration",
        "text": "* ... nobody has noticed yet."
      },
      {
        "cond": "если завербованы не все",
        "who": "narration",
        "text": "* ... well, I'd like to ask you to fight, boss but it seems..."
      },
      {
        "cond": "если завербованы не все",
        "who": "narration",
        "text": "* ... you didn't RECRUIT everyone up until now."
      },
      {
        "cond": "если завербованы не все",
        "who": "narration",
        "text": "* One of our guys's got a moral objection to that. Sorry, boss."
      },
      {
        "cond": "если завербованы все",
        "who": "narration",
        "text": "* What do you say, boss? Want to try?"
      }
    ]
  },
  "1722": {
    "related": [1723, 1724],
    "lines": [
      {
        "cond": "при первом осмотре гардероба (значение 0)",
        "who": "narration",
        "text": "* (There are all sorts of clothes. You could wear anything you want.)"
      },
      {
        "cond": "при первом осмотре гардероба (значение 0)",
        "who": "susie",
        "text": "* Top hats, ribbons, shirts, gowns, shorts, pants, a scuba outfit..."
      },
      {
        "cond": "при первом осмотре гардероба (значение 0)",
        "who": "susie",
        "text": "* Like, what, Ralsei? You think Kris's gonna play dress-up?"
      },
      {
        "cond": "при первом осмотре гардероба (значение 0)",
        "who": "ralsei",
        "text": "* Umm... if they want to!"
      },
      {
        "cond": "при первом осмотре гардероба (значение 0)",
        "who": "ralsei",
        "text": "* I just thought... Isn't it nice, to have some customization?"
      },
      {
        "cond": "при повторном осмотре (значение 1)",
        "who": "narration",
        "text": "* (... or, even end up wearing anything you didn't want.)"
      }
    ]
  },
  "1723": {
    "related": [394, 710, 1458, 1459, 1722, 1724],
    "lines": [
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* Kris lamp."
      },
      {
        "cond": "при повторном осмотре (значение 1)",
        "who": "narration",
        "text": "* (Kris lamp.)"
      }
    ]
  },
  "1724": {
    "related": [1722, 1723],
    "lines": [
      {
        "cond": "при осмотре трофея (значение 0)",
        "who": "narration",
        "text": "* (It's a precious, one of a kind trophy for consistently consuming moss.)"
      },
      {
        "cond": "при осмотре трофея (значение 0)",
        "who": "narration",
        "text": "* (... the trophy is also made of moss.)"
      }
    ]
  },
  "1726": {
    "related": [1727, 307, 393],
    "lines": [
      {
        "cond": "при осмотре статуи Сьюзи (вступление)",
        "who": "susie",
        "text": "* ... why did Noelle have this in her room, anyway."
      },
      {
        "cond": "при осмотре статуи Сьюзи (вступление)",
        "who": "ralsei",
        "text": "* Perhaps it has to do with her... um, tastes?"
      },
      {
        "cond": "при осмотре статуи Сьюзи (вступление)",
        "who": "susie",
        "text": "* Huh. Guess she likes statues?"
      },
      {
        "cond": "при осмотре статуи Сьюзи (вступление)",
        "who": "susie",
        "text": "* ... Kris, you know her, right? What's the deal?"
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "susie",
        "text": "* Yeah, that's what I thought, heh."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "susie",
        "text": "* ... not. What's that little stupid smirk mean, dumbass?"
      },
      {
        "cond": "выбор 2 (значение 2)",
        "who": "susie",
        "text": "* What? You're saying she likes... something else?"
      },
      {
        "cond": "выбор 2 (значение 2)",
        "who": "susie",
        "text": "* ..."
      },
      {
        "cond": "выбор 2 (значение 2)",
        "who": "susie",
        "text": "* (Anyone wanna explain \"something else\" to me?)"
      }
    ]
  },
  "1727": {
    "related": [1726, 307, 393],
    "lines": [
      {
        "cond": "после сцены с плюшем Сьюзи (значение 0→1)",
        "who": "susie",
        "text": "* (... stop doing that \"me next?\" expression, dumbass.)"
      }
    ]
  },
  "1728": {
    "related": [1459, 1729, 307, 394, 710, 1458],
    "lines": [
      {
        "cond": "при первом осмотре шкафа (значение 0)",
        "who": "ralsei",
        "text": "* Fine. Nobody ranch."
      },
      {
        "cond": "при повторном осмотре (значение 1)",
        "who": "ralsei",
        "text": "* Like you're a horse?"
      },
      {
        "cond": "при повторном осмотре (значение 1)",
        "who": "susie",
        "text": "* Know what? Nevermind"
      },
      {
        "cond": "при повторном осмотре (значение 1)",
        "who": "susie",
        "text": "* Gotta admit, all the hay..."
      },
      {
        "cond": "при повторном осмотре (значение 1)",
        "who": "susie",
        "text": "* Kinda makes it look like..."
      },
      {
        "cond": "при повторном осмотре (значение 1)",
        "who": "susie",
        "text": "* A new house for me."
      }
    ]
  },
  "1729": {
    "related": [1459, 1728, 307, 394, 710, 1458],
    "lines": [
      {
        "cond": "при осмотре чая (вступление)",
        "who": "ralsei",
        "text": "* I... I kind of want to try all sorts of different drinks."
      },
      {
        "cond": "при осмотре чая (вступление)",
        "who": "ralsei",
        "text": "* Tea... coffee... juices... and see which ones I like."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "ralsei",
        "text": "* Then, if I find something I really like..."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "ralsei",
        "text": "* I... want to share it with you two, too."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "ralsei",
        "text": "* As something... I personally like. As something I'm proud of."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "ralsei",
        "text": "* That way, it might be... even more special, right?"
      },
      {
        "cond": "выбор 2 (значение 2)",
        "who": "ralsei",
        "text": "* You're right... sorry."
      },
      {
        "cond": "выбор 2 (значение 2)",
        "who": "ralsei",
        "text": "* But I..."
      },
      {
        "cond": "выбор 2 (значение 2)",
        "who": "ralsei",
        "text": "* If you... if Kris makes the tea for me by hand..."
      },
      {
        "cond": "выбор 2 (значение 2)",
        "who": "ralsei",
        "text": "* I wonder if there wouldn't still be..."
      },
      {
        "cond": "выбор 2 (значение 2)",
        "who": "ralsei",
        "text": "* ... something a little personally special about it?"
      }
    ]
  },
  "1733": {
    "related": [1324, 1451, 1758],
    "lines": [
      {
        "cond": "при значении 0 (первый раз)",
        "who": "susie",
        "text": "* ... wait. Before you go to the beach..."
      },
      {
        "cond": "при значении 0 (первый раз)",
        "who": "susie",
        "text": "* Noelle... wanted some ice cream earlier."
      },
      {
        "cond": "при значении 0 (первый раз)",
        "who": "susie",
        "text": "* But, I couldn't, uh, find any."
      },
      {
        "cond": "при значении 0 (первый раз)",
        "who": "susie",
        "text": "* Wanna help me look?"
      },
      {
        "cond": "при повторном (значение 1)",
        "who": "susie",
        "text": "* Hey, let's go find the ice cream."
      }
    ]
  },
  "1734": {
    "related": [1754],
    "lines": [
      {
        "cond": "при первом осмотре церкви (значение 0)",
        "who": "susie",
        "text": "* Heh, be pretty funny to see you get jumpscared, but..."
      },
      {
        "cond": "при первом осмотре церкви (значение 0)",
        "who": "susie",
        "text": "* We... uh, we can't go in there. We're banned."
      },
      {
        "cond": "при первом осмотре церкви (значение 0)",
        "who": "susie",
        "text": "* I was feeling like, the eyeball grapes or whatever...?"
      },
      {
        "cond": "при первом осмотре церкви (значение 0)",
        "who": "susie",
        "text": "* And Noelle just put her hand in the bowl, and..."
      },
      {
        "cond": "при первом осмотре церкви (значение 0)",
        "who": "susie",
        "text": "* ... started... holding mine."
      },
      {
        "cond": "при первом осмотре церкви (значение 0)",
        "who": "susie",
        "text": "* ... yeah, they banned us for that. Sucks."
      },
      {
        "cond": "при повторном (значение 1)",
        "who": "susie",
        "text": "* It's kinda funny. Nothing scared her at all."
      },
      {
        "cond": "при повторном (значение 1)",
        "who": "susie",
        "text": "* ... even me. Heh."
      }
    ]
  },
  "1735": {
    "lines": [
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* Oh yeah, me and Noelle... rode this."
      },
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* She... didn't even look out the window, though."
      },
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* The whole time, she was just..."
      },
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* Resting... her head on my shoulder."
      },
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* ... dude, my heart was beating like crazy."
      },
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* I don't get how she was so calm..."
      },
      {
        "cond": "выбор «Do not» (значение 1)",
        "who": "susie",
        "text": "* Sure. We got time to later."
      },
      {
        "cond": "после поездки (значение 2)",
        "who": "susie",
        "text": "* That was pretty fun, right?"
      },
      {
        "cond": "при повторном осмотре (значение ≥2)",
        "who": "susie",
        "text": "* That was fun."
      },
      {
        "cond": "при повторном осмотре (значение ≥2)",
        "who": "susie",
        "text": "* Maybe next year we can actually break it?"
      }
    ]
  },
  "1736": {
    "related": [1323],
    "lines": [
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* Man..."
      },
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* Even Ralsei was acting kinda weird today."
      },
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* Guess he was just... worried you slept in?"
      },
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* I asked if he wanted me to do anything, and he was like..."
      },
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* He just got quiet, and shook his head."
      },
      {
        "cond": "при первом осмотре (значение 0)",
        "who": "susie",
        "text": "* ... anyway, let's see him later. After other stuff."
      },
      {
        "cond": "при повторном (значение 1)",
        "who": "susie",
        "text": "* Let's see Ralsei later, 'k?"
      }
    ]
  },
  "1738": {
    "related": [1335, 1336, 349, 457, 1324, 1333],
    "lines": [
      {
        "cond": "при разговоре в кабинке для голосования",
        "who": "narration",
        "text": "* Heighbor, neighbor! Votin' for the Festival King and Queen?"
      },
      {
        "cond": "при выборе «Yes» (значение 0→1)",
        "who": "narration",
        "text": "* What? Didn't your dad tell ya!? Well, me dad'll tell ya, then."
      },
      {
        "cond": "при выборе «Yes» (значение 0→1)",
        "who": "narration",
        "text": "* Fill out a pape, put it in the box, counter 'em up..."
      },
      {
        "cond": "при выборе «Yes» (значение 0→1)",
        "who": "narration",
        "text": "* Then tonight, on the Hometown Holiday Manor stage..."
      },
      {
        "cond": "при выборе «Yes» (значение 0→1)",
        "who": "narration",
        "text": "* Mayor Carol will crown two lucky lovey dovers KING and QUEEN!"
      },
      {
        "cond": "при выборе «Yes» (значение 0→1)",
        "who": "narration",
        "text": "* These two freaks will get to lead the Couples Parade..."
      },
      {
        "cond": "при выборе «Yes» (значение 0→1)",
        "who": "narration",
        "text": "* As all the couples in town walk hand-in-hand, down to City Hall..."
      },
      {
        "cond": "при выборе «Yes» (значение 0→1)",
        "who": "narration",
        "text": "* With Rudy's bmewtiful lights twinklin' all around!"
      },
      {
        "cond": "при выборе «Yes» (значение 0→1)",
        "who": "susie",
        "text": "* Oh."
      },
      {
        "cond": "при выборе «Yes» (значение 0→1)",
        "who": "noelle",
        "text": "* You, um, never knew about that part, Susie?"
      },
      {
        "cond": "при выборе «Yes» (значение 0→1)",
        "who": "susie",
        "text": "* No? I thought it was just like... bumper cars and $`#!$."
      },
      {
        "cond": "при выборе «Yes» (значение 0→1)",
        "who": "susie",
        "text": "* But, uh. The other thing sounds cool. To watch. Maybe."
      },
      {
        "cond": "при выборе «Yes» (значение 0→1)",
        "who": "noelle",
        "text": "* Umm, sure... watching! That... would be nice...!"
      }
    ]
  },
  "1742": {
    "related": [916, 1743],
    "lines": [
      {
        "cond": "1-я остановка («Stop», значение 1)",
        "who": "noelle",
        "text": "* No..."
      },
      {
        "cond": "1-я остановка («Stop», значение 1)",
        "who": "noelle",
        "text": "* You're supposed to say \"Proceed,\" right?"
      },
      {
        "cond": "1-я остановка («Stop», значение 1)",
        "who": "noelle",
        "text": "* Just like all the other times."
      },
      {
        "cond": "2-я остановка («Stop», значение 2)",
        "who": "noelle",
        "text": "* Stop pretending."
      },
      {
        "cond": "2-я остановка («Stop», значение 2)",
        "who": "noelle",
        "text": "* I know you remember, too!"
      },
      {
        "cond": "3-я остановка («Stop», значение 3)",
        "who": "noelle",
        "text": "* Why.. are your hands trembling...?"
      },
      {
        "cond": "3-я остановка («Stop», значение 3)",
        "who": "noelle",
        "text": "* Kris, you're the one that wanted this, aren't you?"
      },
      {
        "cond": "4-я остановка («Stop», значение 4)",
        "who": "noelle",
        "text": "* Stop pretending you're still the old Kris."
      },
      {
        "cond": "4-я остановка («Stop», значение 4)",
        "who": "noelle",
        "text": "* You can't even say \"stop\" like you used to."
      },
      {
        "cond": "5-я остановка и далее («Stop», значение ≥5)",
        "who": "noelle",
        "text": "* Proceed."
      }
    ]
  },
  "1743": {
    "related": [916, 1311, 1742, 925, 1045, 1255],
    "lines": [
      {
        "cond": "при провале/завершении сцены у озера (значение 1)",
        "who": "noelle",
        "text": "* I was wrong."
      },
      {
        "cond": "при провале/завершении сцены у озера (значение 1)",
        "who": "noelle",
        "text": "* The dream never happened."
      },
      {
        "cond": "при провале/завершении сцены у озера (значение 1)",
        "who": "noelle",
        "text": "* Kris hadn't changed."
      },
      {
        "cond": "при провале/завершении сцены у озера (значение 1)",
        "who": "noelle",
        "text": "* I hadn't changed."
      },
      {
        "cond": "при провале/завершении сцены у озера (значение 1)",
        "who": "noelle",
        "text": "* I had simply gotten carried away."
      }
    ]
  },
  "1745": {
    "related": [1437, 1435, 1436, 1439, 263, 1438],
    "lines": [
      {
        "cond": "при установке тоста (счётчик 1745 сбрасывается в 0)",
        "who": "narration",
        "text": "* (You put the toast in the microwave toaster and set it to \"toast\".)"
      },
      {
        "cond": "при установке тоста (счётчик 1745 сбрасывается в 0)",
        "who": "narration",
        "text": "* (It will take 10 seconds for the toast to be done.)"
      }
    ]
  },
  "1746": {
    "related": [1435, 1436, 1437, 1438, 1439, 1745],
    "lines": [
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* Oh, wherever did you learn that wonderful sarcasm from?"
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* ... really though."
      }
    ]
  },
  "1747": {
    "related": [1435, 1436, 1437, 1438, 1439, 1745],
    "lines": [
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* Huh...?"
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* Kris, is that, some sort of joke? Haha."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* Kris, you know where I hide the extra house key."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* ... I was surprised to find the house empty when I came home at 7."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* I tried calling you straight away."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* But your phone... I could not... get through to it."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* Kris, did you take the ICE-E charger? You know it does not work."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* Anyhow, I was very worried. I was about to go looking for you..."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* But Mr. Sans told me... he saw you and Susie... well..."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* You know. Hanging out."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "toriel",
        "text": "* ... and, well. He convinced me. Perhaps, I should leave you be."
      }
    ]
  },
  "1748": {
    "lines": [
      {
        "cond": "при осмотре двери",
        "who": "narration",
        "text": "* (Knockable door.)"
      },
      {
        "cond": "при стуке (выбор «Yes», значение 0→1)",
        "who": "susie",
        "text": "* Alright, team knock. You ready?"
      },
      {
        "cond": "при стуке (выбор «Yes», значение 0→1)",
        "who": "noelle",
        "text": "* ??? Sure...?"
      },
      {
        "cond": "при стуке (выбор «Yes», значение 0→1)",
        "who": "narration",
        "text": "* (Knock knock knock...)"
      },
      {
        "cond": "при стуке (выбор «Yes», значение 0→1)",
        "who": "narration",
        "text": "* What the!? That knock was so powerful..."
      },
      {
        "cond": "при стуке (выбор «Yes», значение 0→1)",
        "who": "narration",
        "text": "* I realize now that the strongest knock, can't be made alone."
      },
      {
        "cond": "при стуке (выбор «Yes», значение 0→1)",
        "who": "narration",
        "text": "* It must come from... the bonds of eternal companionship."
      }
    ]
  },
  "1749": {
    "sprites": [{ "src": "spr_ballperson_0", "cond": "при значении < 7 (НПС в большом бальном зале)" }],
    "related": [254, 816],
    "lines": [

    ]
  },
  "1750": {
    "related": [1462, 1888],
    "lines": [
      {
        "cond": "первая реплика в бою (значение 0)",
        "who": "narration",
        "text": "PROTECT .. KING"
      },
      {
        "cond": "последующие реплики (значение 1)",
        "who": "narration",
        "text": "GOLDHAIR GIVE WATER .. FRAIND"
      },
      {
        "cond": "последующие реплики (значение 1)",
        "who": "narration",
        "text": "HUMAN... DIGGING .. NO GOOD"
      },
      {
        "cond": "последующие реплики (значение 1)",
        "who": "narration",
        "text": "LITTLE DIRT NEVER HURT"
      }
    ]
  },
  "1751": {
    "lines": [
      {
        "cond": "при значении 0 (первый раз)",
        "who": "susie",
        "text": "* ... nah. Doesn't she look kind of... busy?"
      },
      {
        "cond": "при значении 0 (первый раз)",
        "who": "noelle",
        "text": "* Umm, I guess so...? Well, we don't have to?"
      }
    ]
  },
  "1752": {
    "related": [1311, 1888],
    "lines": [
      {
        "cond": "первая реплика (значение 0, фейкер)",
        "who": "narration",
        "text": "I'M the Original! Kon, kon, kee kee!"
      },
      {
        "cond": "последующие реплики (значение 1)",
        "who": "narration",
        "text": "Kon kon~ Kee kee~"
      },
      {
        "cond": "последующие реплики (значение 1)",
        "who": "narration",
        "text": "(Swisches my big fluffy $$$$-ing tail)"
      },
      {
        "cond": "последующие реплики (значение 1)",
        "who": "narration",
        "text": "(Stamp!) Approved as gullible..."
      },
      {
        "cond": "последующие реплики (значение 1)",
        "who": "narration",
        "text": "A fox would never enjoy tricking anyone~"
      }
    ]
  },
  "1753": {
    "related": [1808, 1324, 1345, 1346, 1347],
    "lines": [
      {
        "cond": "при разговоре (вопрос)",
        "who": "narration",
        "text": "* I.. I set an allowance for myself this year."
      },
      {
        "cond": "при разговоре (вопрос)",
        "who": "narration",
        "text": "* ... can you guess what I spent it on?"
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "narration",
        "text": "* The last of my funds, once again, down the hole..."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "narration",
        "text": "* Damn you, oh, circular dough..."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "susie",
        "text": "* Hey, screw you and don't call her circular."
      },
      {
        "cond": "выбор 1 (значение 1)",
        "who": "noelle",
        "text": "* (He didn't mean \"doe\", Susie...)"
      },
      {
        "cond": "выбор 2",
        "who": "narration",
        "text": "* I spent 2G on this. .. I didn't even know I had G!"
      }
    ]
  },
  "1754": {
    "related": [1324, 1734],
    "lines": [
      {
        "cond": "Сьюзи у тыкв (Jackenstein), первый раз — значение 0→1",
        "who": "susie",
        "text": "* Heh, with this many pumpkins..."
      },
      {
        "cond": "Сьюзи у тыкв (Jackenstein), первый раз — значение 0→1",
        "who": "susie",
        "text": "* No way they'll notice I stole Jack this morning."
      },
      {
        "cond": "Сьюзи у тыкв (Jackenstein), первый раз — значение 0→1",
        "who": "noelle",
        "text": "* Stole, um, what?"
      },
      {
        "cond": "Сьюзи у тыкв (Jackenstein), первый раз — значение 0→1",
        "who": "susie",
        "text": "* Uhh... jack! Y'know, haha. As in, nothing."
      },
      {
        "cond": "Повторный осмотр (значение 1)",
        "who": "noelle",
        "text": "(Besides, if you were a thief... I'd... want to help you.)"
      },
      {
        "cond": "Повторный осмотр (значение 1)",
        "who": "susie",
        "text": "(Dude she totally knows I stole bottled water at her house)"
      }
    ]
  },
  "1755": {
    "related": [1756, 779],
    "lines": [
      {
        "cond": "alt-сюжет Тенны, значение <8 → ставится 8",
        "who": "narration",
        "text": "* (The window is shut, and the voice talks quietly...)"
      },
      {
        "cond": "alt-сюжет Тенны, значение <8 → ставится 8",
        "who": "narration",
        "text": "* I wonder if Officer Undyne will come back soon..."
      },
      {
        "cond": "alt-сюжет Тенны, значение <8 → ставится 8",
        "who": "narration",
        "text": "* Her roughhousing really was a blemish on our society, but..."
      },
      {
        "cond": "alt-сюжет Тенны, значение <8 → ставится 8",
        "who": "narration",
        "text": "* Without her, I'm waiting... overtime, for Blooky to come home."
      },
      {
        "cond": "alt-сюжет Тенны, значение ≥8 (повторно)",
        "who": "narration",
        "text": "* Not to mention... I miss... our karaoke contests."
      },
      {
        "cond": "alt-сюжет Тенны, значение ≥8 (повторно)",
        "who": "narration",
        "text": "* She... really made it impossible to lose. Bless her."
      },
      {
        "cond": "выбор «Angry voice», значение 0/2/4 → +1",
        "who": "narration",
        "text": "* (Angry muttering. You can't hear too well.)"
      },
      {
        "cond": "выбор «Angry voice», значение 0/2/4 → +1",
        "who": "narration",
        "text": "* Can't believe he's showing off MY... to EVERYONE ELSE!"
      },
      {
        "cond": "выбор «Angry voice», значение 0/2/4 → +1",
        "who": "narration",
        "text": "* ... she's MINE, you big laverbread munching hunk!"
      },
      {
        "cond": "выбор «Angry voice», значение 0/2/4 → +1",
        "who": "narration",
        "text": "* I... I have half-a-mind to... actually leave... and..."
      },
      {
        "cond": "выбор «Angry voice», значение 0/2/4 → +1",
        "who": "narration",
        "text": "* ... mine. Mine! MINE!!!"
      },
      {
        "cond": "выбор «Glamorous voice» (Тенна отдана Меттатону/Напстаблуку, flag 779==2), значение <4 → +4",
        "who": "narration",
        "text": "* Normally I keep it shut, but..."
      },
      {
        "cond": "выбор «Glamorous voice» (Тенна отдана Меттатону/Напстаблуку, flag 779==2), значение <4 → +4",
        "who": "narration",
        "text": "* If I think of the window as a screen..."
      },
      {
        "cond": "выбор «Glamorous voice» (Тенна отдана Меттатону/Напстаблуку, flag 779==2), значение <4 → +4",
        "who": "narration",
        "text": "* The Festival sure looks gorgeous this year."
      },
      {
        "cond": "выбор «Glamorous voice» (Тенна отдана Меттатону/Напстаблуку, flag 779==2), значение <4 → +4",
        "who": "narration",
        "text": "* Here, let me videotape it for you, Tenna."
      },
      {
        "cond": "выбор «Glamorous voice» (Тенна отдана Меттатону/Напстаблуку, flag 779==2), значение <4 → +4",
        "who": "narration",
        "text": "* Then we'll both have... a little something new to watch."
      },
      {
        "cond": "тот же выбор, значение ≥4 (повторно)",
        "who": "narration",
        "text": "* Oooh, I love that fuzzy feeling..."
      },
      {
        "cond": "тот же выбор, значение ≥4 (повторно)",
        "who": "narration",
        "text": "* When I put my face right up to the screen."
      },
      {
        "cond": "тот же выбор, значение ≥4 (повторно)",
        "who": "narration",
        "text": "* It's like a nice, warm, crackling hug. Oooh, technology..."
      }
    ]
  },
  "1756": {
    "related": [779, 1755, 654, 659],
    "lines": [
      {
        "cond": "сцена с Ноэль (ставится значение 1)",
        "who": "noelle",
        "text": "* Huh? Faha, no! I just..."
      },
      {
        "cond": "сцена с Ноэль (ставится значение 1)",
        "who": "noelle",
        "text": "* ... nevermind. Faha."
      }
    ]
  },
  "1757": {
    "related": [1350, 1351, 342, 430, 701, 832],
    "lines": [
      {
        "cond": "разговор у закусочной (flag 701>0, значение 0)",
        "who": "noelle",
        "text": "* Haha, special...?"
      },
      {
        "cond": "разговор у закусочной (flag 701>0, значение 0)",
        "who": "susie",
        "text": "* Yeah. Sometimes you gotta get that one on one time."
      },
      {
        "cond": "разговор у закусочной (flag 701>0, значение 0)",
        "who": "susie",
        "text": "* Can't wait to do it again. Me and Kris."
      },
      {
        "cond": "разговор у закусочной (flag 701>0, значение 0)",
        "who": "noelle",
        "text": "* Yeah, haha! Definitely...!"
      },
      {
        "cond": "выбор 0 (значение становится 1)",
        "who": "noelle",
        "text": "(Maybe it's okay if you two have your own thing sometime...)"
      },
      {
        "cond": "выбор 0 (значение становится 1)",
        "who": "susie",
        "text": "* Oh, uh. Yeah! Yeah, yeah."
      },
      {
        "cond": "выбор 0 (значение становится 1)",
        "who": "susie",
        "text": "* And... if there's leftovers. Of, are what we eated."
      },
      {
        "cond": "выбор 0 (значение становится 1)",
        "who": "susie",
        "text": "* We would give it. To Noelle."
      },
      {
        "cond": "выбор 0 (значение становится 1)",
        "who": "noelle",
        "text": "* ... um, thanks."
      },
      {
        "cond": "выбор 0 (значение становится 1)",
        "who": "susie",
        "text": "* And also... she could be there."
      },
      {
        "cond": "выбор 0 (значение становится 1)",
        "who": "noelle",
        "text": "* Oh, um, I can?"
      },
      {
        "cond": "значение ≥4",
        "who": "narration",
        "text": "* (Should I tell her before we toss the leftovers...?)"
      }
    ]
  },
  "1758": {
    "related": [1324, 1451, 1733],
    "lines": [
      {
        "cond": "осмотр дома (Сторона Б), значение 0 → 2",
        "who": "susie",
        "text": "* Ever wish you could just, be in people's houses?"
      },
      {
        "cond": "осмотр дома (Сторона Б), значение 0 → 2",
        "who": "susie",
        "text": "* Not like, stealing. Just like, looking. Seeing their stuff."
      },
      {
        "cond": "осмотр дома (Сторона Б), значение 0 → 2",
        "who": "susie",
        "text": "* ... it's cool when people have stuff."
      },
      {
        "cond": "Сторона Б, значение >0 (повторно)",
        "who": "susie",
        "text": "* Like, look in the window."
      },
      {
        "cond": "Сторона Б, значение >0 (повторно)",
        "who": "susie",
        "text": "* Scale trimmer. We could use it on your hair."
      },
      {
        "cond": "обычный режим, значение 0 → 1",
        "who": "narration",
        "text": "* (You don't hear any hissing or screaming.)"
      },
      {
        "cond": "обычный режим, значение 0 → 1",
        "who": "narration",
        "text": "* (No one must be home.)"
      },
      {
        "cond": "обычный режим, значение 0 → 1",
        "who": "noelle",
        "text": "* (Kris? Why are you, um, looking here?)"
      },
      {
        "cond": "обычный режим, значение >0",
        "who": "noelle",
        "text": "* (Kris, we really don't need to mess around here...)"
      }
    ]
  },
  "1759": {
    "related": [1324, 1344, 1352, 1353, 1355, 1356],
    "lines": [
      {
        "cond": "первый разговор с Сансом (значение 0), перед выбором",
        "who": "narration",
        "text": "* hey, if it isn't kris and the krizzlers. 'sup?"
      },
      {
        "cond": "первый разговор с Сансом (значение 0), перед выбором",
        "who": "susie",
        "text": "* Ugh, Kris, the hell are we talking to THIS guy?"
      },
      {
        "cond": "первый разговор с Сансом (значение 0), перед выбором",
        "who": "susie",
        "text": "* Don't we like, hate him?"
      },
      {
        "cond": "выбор 0 (значение становится 1)",
        "who": "susie",
        "text": "You jerk."
      },
      {
        "cond": "выбор 0 (значение становится 1)",
        "who": "susie",
        "text": "Hell-ooo? What did he do?"
      }
    ]
  },
  "1761": {
    "related": [1324],
    "lines": [
      {
        "cond": "осмотр вывески «OPEN» (значение 0 → 1, если flag 798≥3)",
        "who": "narration",
        "text": "* (\"OPEN\".)"
      },
      {
        "cond": "осмотр вывески «OPEN» (значение 0 → 1, если flag 798≥3)",
        "who": "noelle",
        "text": "* Umm, why are you two... checking that sign so much?"
      },
      {
        "cond": "осмотр вывески «OPEN» (значение 0 → 1, если flag 798≥3)",
        "who": "susie",
        "text": "* 'Cause, ugh, it's goddamn WRONG."
      },
      {
        "cond": "осмотр вывески «OPEN» (значение 0 → 1, если flag 798≥3)",
        "who": "susie",
        "text": "* It's unlocked, but that... GUY'S blocking it."
      },
      {
        "cond": "осмотр вывески «OPEN» (значение 0 → 1, если flag 798≥3)",
        "who": "susie",
        "text": "* So, like, if it's not closed OR open..."
      },
      {
        "cond": "осмотр вывески «OPEN» (значение 0 → 1, если flag 798≥3)",
        "who": "susie",
        "text": "* It's supposed to say \"CLOPEN.\""
      },
      {
        "cond": "осмотр вывески «OPEN» (значение 0 → 1, если flag 798≥3)",
        "who": "noelle",
        "text": "* Pfffhahahahaha! CLOPEN???"
      },
      {
        "cond": "осмотр вывески «OPEN» (значение 0 → 1, если flag 798≥3)",
        "who": "noelle",
        "text": "* You're really funny, Susie..."
      },
      {
        "cond": "осмотр вывески «OPEN» (значение 0 → 1, если flag 798≥3)",
        "who": "susie",
        "text": "* Uhhh, yeah? Haha."
      },
      {
        "cond": "осмотр вывески «OPEN» (значение 0 → 1, если flag 798≥3)",
        "who": "susie",
        "text": "* Haha. My idea and joke that I made."
      },
      {
        "cond": "Сторона Б, значение >0",
        "who": "narration",
        "text": "* hey, you wanna mess with the sign again..."
      },
      {
        "cond": "Сторона Б, значение >0",
        "who": "narration",
        "text": "* got some extra letters over here."
      },
      {
        "cond": "Сторона Б, значение >0",
        "who": "susie",
        "text": "* Really? Even Q?"
      },
      {
        "cond": "Сторона Б, значение >0",
        "who": "susie",
        "text": "* I mean - no. We're not doing that."
      }
    ]
  },
  "1766": {
    "related": [1820, 1821],
    "lines": [
      {
        "cond": "сцена с Темми (ставится значение 1)",
        "who": "narration",
        "text": "* it's my original caricture"
      }
    ]
  },
  "1767": {
    "related": [42, 1446],
    "lines": [
      {
        "cond": "пробуждение в комнате Криса (значение 0 → 1, переход в Мир тьмы)",
        "who": "narration",
        "text": "* (But, when you opened your eyes...)"
      }
    ]
  },
  "1768": {
    "related": [1769, 1770, 1846],
    "lines": [
      {
        "cond": "«What is this place?», значение 0 → 1",
        "who": "narration",
        "text": "* I've never seen a sunset so breathtaking..."
      },
      {
        "cond": "«What is this place?», значение 0 → 1",
        "who": "narration",
        "text": "* Tell me, was everything always this beautiful?"
      },
      {
        "cond": "«What is this place?», значение 0 → 1",
        "who": "narration",
        "text": "* Beautiful... beautiful. Beautiful!"
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* Where I came from, the colors were bleak."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* It was like looking at the world through a napkin."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* Here, the sunset shines from the back of your eyes, like the afterglow of a light you stared at too long."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* Hee hee..."
      }
    ]
  },
  "1769": {
    "related": [1768, 1770, 1846],
    "lines": [
      {
        "cond": "«What's your name, human?», значение 0 → 1",
        "who": "narration",
        "text": "* Right, of course, I'm also human. That's why I look and feel like a flower."
      },
      {
        "cond": "«What's your name, human?», значение 0 → 1",
        "who": "narration",
        "text": "* ... then, what's my name?"
      },
      {
        "cond": "«What's your name, human?», значение 0 → 1",
        "who": "narration",
        "text": "* I suppose... it depends on the color of the sunset."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* Names, names, names! That's what everyone always thinks about."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* But, what defines you is..."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* ... well, it's your body, isn't it?"
      }
    ]
  },
  "1770": {
    "related": [1768, 1769, 1846],
    "lines": [
      {
        "cond": "«Other people?», значение 0 → 1",
        "who": "narration",
        "text": "* Asgore... he seems happy. You should be happy for him, too."
      },
      {
        "cond": "«Other people?», значение 0 → 1",
        "who": "narration",
        "text": "* Me? I've... never been able to talk to him. For... obvious reasons."
      },
      {
        "cond": "«Other people?», значение 0 → 1",
        "who": "narration",
        "text": "* I know. It's selfish, if you say it out loud. Everything... has been thanks to him."
      },
      {
        "cond": "«Other people?», значение 0 → 1",
        "who": "narration",
        "text": "* Until now, I... I couldn't really think about that."
      },
      {
        "cond": "«Other people?», значение 0 → 1",
        "who": "narration",
        "text": "* ..."
      },
      {
        "cond": "«Other people?», значение 0 → 1",
        "who": "narration",
        "text": "* I can think now, though. I'll do my best to fit in and help, too."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* Up until now, I don't think I realized what loneliness was."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* Now, looking at the sunrise, I finally noticed it. That pang in my heart..."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* ... I'm going to make friends here. I know it. Lots and lots of friends..."
      }
    ]
  },
  "1771": {
    "related": [1772, 1773, 1774, 1854],
    "lines": [
      {
        "cond": "осмотр двери Майкла",
        "who": "narration",
        "text": "* (Michaeldoor.)"
      },
      {
        "cond": "выбор «Don't knock» (Майкл)",
        "who": "narration",
        "text": "* (Resisted the temptation of Michael.)"
      },
      {
        "cond": "выбор «Don't knock» (Glooby)",
        "who": "narration",
        "text": "* (Resisted the temptation of Glooby.)"
      }
    ]
  },
  "1772": {
    "related": [1771, 1773, 1774],
    "lines": [
      {
        "cond": "приветствие Майка (выбор)",
        "who": "narration",
        "text": "* What's up."
      },
      {
        "cond": "приветствие, значение 0 (сцена) → ставится 1",
        "who": "narration",
        "text": "* We don't, uh... we..."
      },
      {
        "cond": "приветствие, значение 0 (сцена) → ставится 1",
        "who": "narration",
        "text": "* We don't know that! He could still come back! Any moment now!"
      },
      {
        "cond": "приветствие, значение 0 (сцена) → ставится 1",
        "who": "narration",
        "text": "* C'mon, can't you hear him asking for an antenna massage!?"
      },
      {
        "cond": "приветствие, значение 0 (сцена) → ставится 1",
        "who": "narration",
        "text": "* Tenna, we gotta get the next BOARD ready! Haha...!"
      },
      {
        "cond": "приветствие, значение 0 (сцена) → ставится 1",
        "who": "narration",
        "text": "* Love it when you listen to me, Tenna. Love it."
      },
      {
        "cond": "приветствие, значение 0 (сцена) → ставится 1",
        "who": "narration",
        "text": "* ... I dunno about that, boss."
      },
      {
        "cond": "приветствие, значение >0 (повторно)",
        "who": "narration",
        "text": "* Mike to meet ya. Uhh..."
      },
      {
        "cond": "приветствие, значение >0 (повторно)",
        "who": "narration",
        "text": "* I'm Plue'd to make your acquaintance."
      }
    ]
  },
  "1773": {
    "related": [1771, 1772, 1774],
    "lines": [
      {
        "cond": "разговор с Майком (выбор)",
        "who": "narration",
        "text": "* What do you want!?"
      },
      {
        "cond": "выбор «Play a game», значение 0 → 1",
        "who": "narration",
        "text": "* Oh, right! You want to play one of our MIKE MINIGAMES...!"
      },
      {
        "cond": "выбор «Play a game», значение 0 → 1",
        "who": "narration",
        "text": "* Well, get real! You know how much effort those were!?"
      },
      {
        "cond": "выбор «Play a game», значение 0 → 1",
        "who": "narration",
        "text": "* MONTHS! We spent months setting those up..."
      },
      {
        "cond": "выбор «Play a game», значение 0 → 1",
        "who": "narration",
        "text": "* Practicing emitting them as bullet patterns..."
      },
      {
        "cond": "выбор «Play a game», значение 0 → 1",
        "who": "narration",
        "text": "* Feeding the cats, training them... getting bit..."
      },
      {
        "cond": "выбор «Play a game», значение 0 → 1",
        "who": "narration",
        "text": "* And for WHAT!? No one CARED!!"
      },
      {
        "cond": "выбор «Play a game», значение 0 → 1",
        "who": "narration",
        "text": "* Tenna didn't even get the PLATINUM! Only BRONZE!"
      },
      {
        "cond": "выбор «Play a game», значение 0 → 1",
        "who": "narration",
        "text": "* You had your chance to play them YESTERDAY using the code 6453."
      },
      {
        "cond": "выбор «Play a game», значение 0 → 1",
        "who": "narration",
        "text": "* No one takes us seriously. No one!"
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* You had your chance to play them YESTERDAY using the code 6453."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* C'mon!"
      }
    ]
  },
  "1774": {
    "related": [1771, 1772, 1773],
    "lines": [
      {
        "cond": "осмотр Cat Mike, значение <2",
        "who": "narration",
        "text": "* (Cat Mike.)"
      },
      {
        "cond": "значение ≥2",
        "who": "narration",
        "text": "* (Pluey.)"
      }
    ]
  },
  "1775": {
    "related": [1454, 1743, 1871],
    "lines": [
      {
        "cond": "осмотр ванны (онсэн), значение 0 → 1",
        "who": "ralsei",
        "text": "* Umm, this is where I was taking a bath..."
      },
      {
        "cond": "осмотр ванны (онсэн), значение 0 → 1",
        "who": "ralsei",
        "text": "Why do you know the word \"consomme?\""
      },
      {
        "cond": "осмотр ванны (онсэн), значение 0 → 1",
        "who": "susie",
        "text": "* Gross. Nerd consomay."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "narration",
        "text": "* (A hot spring bath. The drain is nice and clean.)"
      }
    ]
  },
  "1776": {
    "related": [1850, 1879],
    "lines": [
      {
        "cond": "поговорить с автоматом в кафе, значение 0 → 1",
        "who": "ralsei",
        "text": "* So far, talking to machines doesn't do anything..."
      },
      {
        "cond": "поговорить с автоматом в кафе, значение 0 → 1",
        "who": "narration",
        "text": "* That's because you don't believe in yourself."
      },
      {
        "cond": "поговорить с автоматом в кафе, значение 0 → 1",
        "who": "ralsei",
        "text": "* Huh? Flowery!? Wh-where are you?"
      },
      {
        "cond": "поговорить с автоматом в кафе, значение 0 → 1",
        "who": "narration",
        "text": "* I'm not here. I'm just a voice-activated recording."
      },
      {
        "cond": "поговорить с автоматом в кафе, значение 0 → 1",
        "who": "narration",
        "text": "* Also, I predicted what you were going to say."
      },
      {
        "cond": "поговорить с автоматом в кафе, значение 0 → 1",
        "who": "ralsei",
        "text": "* ..."
      },
      {
        "cond": "поговорить с автоматом в кафе, значение 0 → 1",
        "who": "narration",
        "text": "* W-wait. You really mean it? You... like my style?"
      },
      {
        "cond": "поговорить с автоматом в кафе, значение 0 → 1",
        "who": "ralsei",
        "text": "* WHEN WOULD I SAY THAT!?"
      }
    ]
  },
  "1787": {
    "detail": "Гл.4. obj_dw_churchb_moneyfountain (Create) использует encounterflag=1787, encounterno=191 (индекс флага хранится в переменной объекта — встреча у фонтана). obj_dw_church_moneyfountain (Create) при global.plot>=242 настраивает wafernpc (spr_npc_organik_0_talk_differentrobe), и если global.flag[1787]==1 — wafernpc.x=room_width*2 (NPC уводится за пределы комнаты). На что влияет: присутствие NPC-донатора Organikk у фонтана пожертвований церкви в поздней части Гл.4 (связь с plot и flag[898]).",
    "related": [
      898,
      1537
    ]
  },
  "1791": {
    "detail": "encounterflag=1791 задаётся в obj_dw_churchc_encounter1_Create и obj_dw_bluebook_straight_Create. В Step: при flag==0 враг активен; при flag==1 obj_dw_bluebook_straight уничтожается; при flag!=1 создаётся область пуль (obj_overworld_bulletarea). Флаг стычки = бой произошёл/пройден.",
    "related": [
      1798
    ]
  },
  "1798": {
    "detail": "obj_dw_church_watercooler_Create задаёт encounterflag=1798 в room_dw_church_mizzleencounter (иначе 1783 в room_dw_church_rightconnect). obj_dw_church_mizzleencounter_Step: `if (global.flag[1798] == 1) dontbell = 1;` — при dontbell мини-игра со звоном колокольчика не проигрывается. Флаг стычки = встреча произошла/пройдена.",
    "related": [
      1791
    ]
  },
  "1801": {
    "related": [1411],
    "lines": [
      {
        "cond": "секрет разблокирован (1777+1778+1779+1800≥4), значение 0 — пункт автомата",
        "who": "narration",
        "text": "My Secret"
      },
      {
        "cond": "секрет разблокирован (1777+1778+1779+1800≥4), значение 0 — пункт автомата",
        "who": "narration",
        "text": "KEY The \"key\" to ideal happiness"
      }
    ]
  },
  "1802": {
    "related": [816, 914, 1705],
    "lines": [
      {
        "cond": "разговор с Pippins (4rd Sanctuary), вступление",
        "who": "narration",
        "text": "* Hey, I heard if you clear 4rd Sanctuary without missing a note..."
      },
      {
        "cond": "разговор с Pippins (4rd Sanctuary), вступление",
        "who": "narration",
        "text": "* A special colored Pippins will give you a pat on the head."
      },
      {
        "cond": "полностью пройдено, значение 2",
        "who": "narration",
        "text": "* Still, I was able to pat Pluey on the head."
      },
      {
        "cond": "полностью пройдено, значение 2",
        "who": "narration",
        "text": "* ... you can do that whenever though."
      },
      {
        "cond": "полностью пройдено, значение 0 или 1 → 2",
        "who": "narration",
        "text": "* Woah, you actually fully cleared 4rd Sanctuary...!?"
      },
      {
        "cond": "полностью пройдено, значение 0 или 1 → 2",
        "who": "narration",
        "text": "* ... yeah, turns out that getting a pat on the head was just a rumor."
      },
      {
        "cond": "полностью пройдено, значение 0 или 1 → 2",
        "who": "narration",
        "text": "* You know, something made up by some total sicko!"
      },
      {
        "cond": "полностью пройдено, значение 0 или 1 → 2",
        "who": "narration",
        "text": "* Only a weirdo would actually expect that to work, heh..."
      }
    ]
  },
  "1804": {
    "related": [1805],
    "lines": [
      {
        "cond": "у двери школы (выбор), реплика-вопрос",
        "who": "susie",
        "text": "* I mean, you're sure, right?"
      },
      {
        "cond": "выбор «нет» (значение → 2)",
        "who": "susie",
        "text": "* ... right. Yeah."
      },
      {
        "cond": "выбор «нет» (значение → 2)",
        "who": "susie",
        "text": "* Dunno why I asked twice."
      },
      {
        "cond": "выбор «да» / вход (значение → 1)",
        "who": "susie",
        "text": "* ... thanks, Kris."
      }
    ]
  },
  "1805": {
    "related": [1804],
    "lines": [
      {
        "cond": "север города (значение → 1)",
        "who": "susie",
        "text": "* ... hey, the lights are still up."
      },
      {
        "cond": "север города (значение → 1)",
        "who": "susie",
        "text": "* ... kinda. Heh."
      },
      {
        "cond": "центр города (значение → 2)",
        "who": "susie",
        "text": "* So, uhhh.. about what I wanted to say..."
      },
      {
        "cond": "центр города (значение → 2)",
        "who": "susie",
        "text": "* ... it's like..."
      },
      {
        "cond": "центр города (значение → 2)",
        "who": "susie",
        "text": "* ... y'know."
      },
      {
        "cond": "юг города (значение → 3)",
        "who": "susie",
        "text": "* I guess..."
      },
      {
        "cond": "юг города (значение → 3)",
        "who": "susie",
        "text": "* You and me.. make a pretty good team, right?"
      },
      {
        "cond": "юг города (значение → 3)",
        "who": "susie",
        "text": "* I've.. just been thinking about that."
      },
      {
        "cond": "юг города (значение → 3)",
        "who": "susie",
        "text": "* Thinking about.. us."
      },
      {
        "cond": "у школы (значение → 4)",
        "who": "susie",
        "text": "* Since that day in the closet..."
      },
      {
        "cond": "у школы (значение → 4)",
        "who": "susie",
        "text": "* Since our first adventure..."
      },
      {
        "cond": "у школы (значение → 4)",
        "who": "susie",
        "text": "* Kind of feels like.. all this has been..."
      },
      {
        "cond": "у школы (значение → 4)",
        "who": "susie",
        "text": "* Our special.. Kris and Susie thing."
      },
      {
        "cond": "у школы (значение → 4)",
        "who": "susie",
        "text": "* Our thing no one can take away."
      },
      {
        "cond": "у школы (значение → 4)",
        "who": "susie",
        "text": "* Our secret."
      },
      {
        "cond": "у школы (значение → 4)",
        "who": "susie",
        "text": "* Our adventures."
      },
      {
        "cond": "у школы (значение → 4)",
        "who": "susie",
        "text": "* Our thing that's just better"
      },
      {
        "cond": "у школы (значение → 4)",
        "who": "susie",
        "text": "* If it's just the two of us."
      },
      {
        "cond": "у школы (значение → 4)",
        "who": "susie",
        "text": "* You.. feel the same way, right, Kris?"
      }
    ]
  },
  "1807": {
    "related": [1327, 1328, 1883, 1324, 1326, 1329],
    "lines": [
      {
        "cond": "цветы Азгора (Сторона Б), повторно (значение 1)",
        "who": "susie",
        "text": "* Flowers are boring."
      }
    ]
  },
  "1808": {
    "related": [1753, 1324, 1345, 1346, 1347],
    "lines": [
      {
        "cond": "сцена у прилавка тако (Сторона Б), значение 0 → 1",
        "who": "susie",
        "text": "* Cool, right? We got that for free."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "susie",
        "text": "* This stand was kinda weird."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "susie",
        "text": "* ... there wasn't anyone at it today."
      },
      {
        "cond": "повторно (значение 1)",
        "who": "susie",
        "text": "* Maybe just closed early? Beats me."
      }
    ]
  },
  "1809": {
    "related": [1324],
    "lines": [
      {
        "cond": "при значении 0 (Мир света, маршрут «сторона B»)",
        "who": "narration",
        "text": "(событие: появляется сцена сияния obj_town_w_shining в городе; после неё флаг становится 1)"
      },
      {
        "cond": "во время сцены сияния (значение 0)",
        "who": "susie",
        "text": "* But, I guess... same back, if I had five bucks, too."
      }
    ]
  },
  "1812": {
    "related": [1906, 1455, 1454],
    "lines": [
      {
        "cond": "в финале сцены DWCL03 (значение становится 1)",
        "who": "narration",
        "text": "* ... well, uh, all's well that ends well, right?"
      }
    ]
  },
  "1819": {
    "related": [1311, 1889],
    "lines": [
      {
        "cond": "сцена после aqua в саду (всегда)",
        "who": "ralsei",
        "text": "* She seemed like a nice girl after all."
      },
      {
        "cond": "при значении 1 (финальный платформинг сада пройден)",
        "who": "susie",
        "text": "* ... wonder if that feather can really get us through?"
      },
      {
        "cond": "при значении 0",
        "who": "susie",
        "text": "* ... wonder what the deal with that feather thing is?"
      }
    ]
  },
  "1820": {
    "related": [1324, 1766, 1821],
    "lines": [
      {
        "cond": "диалог с Темми в городе (перед выбором)",
        "who": "narration",
        "text": "* Hey, what? Her art's like... crazy good."
      },
      {
        "cond": "перед выбором",
        "who": "narration",
        "text": "* Man, even she's like... good at stuff, huh."
      },
      {
        "cond": "если выбрать вариант 0 (значение 1)",
        "who": "susie",
        "text": "* ... yeah?"
      },
      {
        "cond": "если выбрать вариант 0 (значение 1)",
        "who": "susie",
        "text": "* I mean, it'd be stupid if you didn't."
      },
      {
        "cond": "если выбрать вариант 0 (значение 1)",
        "who": "susie",
        "text": "* Heh."
      }
    ]
  },
  "1821": {
    "related": [1766, 1820],
    "lines": [
      {
        "cond": "диалог с Темми (перед выбором)",
        "who": "narration",
        "text": "* You're gonna go too, right?"
      },
      {
        "cond": "если выбрать вариант 0 (значение 1)",
        "who": "susie",
        "text": "* ..."
      },
      {
        "cond": "если выбрать вариант 0 (значение 1)",
        "who": "susie",
        "text": "* Ugh, don't say stupid stuff like that."
      },
      {
        "cond": "если выбрать вариант 0 (значение 1)",
        "who": "susie",
        "text": "* If I wanted you to stay..."
      },
      {
        "cond": "если выбрать вариант 0 (значение 1)",
        "who": "susie",
        "text": "* ... I'd make you."
      },
      {
        "cond": "если выбрать вариант 0 (значение 1)",
        "who": "susie",
        "text": "* Hahaha!"
      }
    ]
  },
  "1822": {
    "related": [1380, 1381, 1382, 1383, 1450],
    "lines": [
      {
        "cond": "при значении 0 (первый раз)",
        "who": "susie",
        "text": "* When me and Noelle played earlier, she like..."
      },
      {
        "cond": "при значении 0 (первый раз)",
        "who": "susie",
        "text": "* ... held the hammer with me... at the same time."
      },
      {
        "cond": "при значении 0 (первый раз)",
        "who": "susie",
        "text": "* Then we hit it with the wrong end, and the bell, just..."
      },
      {
        "cond": "при значении 0 (первый раз)",
        "who": "susie",
        "text": "* ... kinda flew off somewhere."
      },
      {
        "cond": "при значении 0 (первый раз)",
        "who": "susie",
        "text": "* I asked if like... that meant if we won, and like..."
      },
      {
        "cond": "при значении 0 (первый раз)",
        "who": "susie",
        "text": "* She just said... it was better than winning. Heh."
      },
      {
        "cond": "при значении >= 1 (повторно)",
        "who": "susie",
        "text": "* ..."
      }
    ]
  },
  "1823": {
    "lines": [
      {
        "cond": "при значении 0 (увидеть портал в DW19)",
        "who": "ralsei",
        "text": "* Another... pillar back to the light world?"
      },
      {
        "cond": "при значении 0 (увидеть портал)",
        "who": "susie",
        "text": "* ... like we're gonna use that!"
      }
    ]
  },
  "1824": {
    "lines": [
      {
        "cond": "при значении 0 (первый разговор)",
        "who": "susie",
        "text": "* Hey man, didn't you, uhh, like? Being a butler and stuff?"
      },
      {
        "cond": "при значении 0 (первый разговор)",
        "who": "ralsei",
        "text": "* I'm finding, it's rather context based."
      },
      {
        "cond": "при значении 1 (второй разговор)",
        "who": "narration",
        "text": "* (The work season is over.)"
      },
      {
        "cond": "при значении 1 (второй разговор)",
        "who": "narration",
        "text": "* (Migration season begins.)"
      }
    ]
  },
  "1826": {
    "sprites": [{ "src": "spr_treasurebox_1", "cond": "при значении 1" }],
    "lines": [

    ]
  },
  "1827": {
    "related": [1835, 1836, 1840],
    "lines": [
      {
        "cond": "при значении 1 (розовая монета собрана)",
        "who": "narration",
        "text": "(сундук с розовой монетой открыт; засчитывается в счётчике монет Ферролла)"
      }
    ]
  },
  "1828": {
    "sprites": [{ "src": "spr_treasurebox_1", "cond": "при значении 1" }],
    "lines": [

    ]
  },
  "1829": {
    "sprites": [{ "src": "spr_treasurebox_1", "cond": "при значении 1" }],
    "lines": [

    ]
  },
  "1830": {
    "sprites": [{ "src": "spr_treasurebox_1", "cond": "при значении 1" }],
    "lines": [

    ]
  },
  "1831": {
    "sprites": [{ "src": "spr_treasurebox_1", "cond": "при значении 1" }],
    "related": [1371],
    "lines": [

    ]
  },
  "1832": {
    "sprites": [{ "src": "spr_treasurebox_1", "cond": "при значении 1" }],
    "related": [1301, 1411],
    "lines": [
      {
        "cond": "при значении 0 (взять сундук)",
        "who": "narration",
        "text": "* (You got 50 Flowery Dollars.)"
      },
      {
        "cond": "при значении 0 (взять сундук)",
        "who": "ralsei",
        "text": "* We don't need those."
      }
    ]
  },
  "1833": {
    "lines": [
      {
        "cond": "при взятии (значение становится 1)",
        "who": "narration",
        "text": "* (Where once was a chest, you found ~1.)"
      }
    ]
  },
  "1834": {
    "sprites": [{ "src": "spr_treasurebox_1", "cond": "при значении 1" }],
    "lines": [

    ]
  },
  "1835": {
    "sprites": [{ "src": "spr_treasurebox_1", "cond": "при значении 1 (розовая монета собрана)" }],
    "related": [1827, 1836, 1840],
    "lines": [

    ]
  },
  "1836": {
    "sprites": [{ "src": "spr_treasurebox_1", "cond": "при значении 1 (розовая монета собрана)" }],
    "related": [1827, 1835, 1840],
    "lines": [

    ]
  },
  "1837": {
    "sprites": [{ "src": "spr_treasurebox_1", "cond": "при значении 1" }],
    "lines": [

    ]
  },
  "1839": {
    "related": [1454],
    "lines": [
      {
        "cond": "при значении 0 (точка сохранения, plot < 399; значение становится 1)",
        "who": "narration",
        "text": "* (You have successfully escaped from jail...)"
      },
      {
        "cond": "при значении 0 (значение становится 1)",
        "who": "narration",
        "text": "* (You are filled with the power of obligatory jail scene.)"
      },
      {
        "cond": "при значении >= 1 и plot >= 399 (значение становится 2)",
        "who": "narration",
        "text": "* (The previous filled with power jail thing is cancelled.)"
      },
      {
        "cond": "при значении >= 1 и plot >= 399 (значение становится 2)",
        "who": "narration",
        "text": "* (You are now filled with power from Temporary Butler Ralsei.)"
      }
    ]
  },
  "1840": {
    "sprites": [{ "src": "spr_treasurebox_1", "cond": "при значении 1 (розовая монета собрана)" }],
    "related": [1827, 1835, 1836],
    "lines": [

    ]
  },
  "1841": {
    "sprites": [{ "src": "spr_treasurebox_1", "cond": "при значении 1" }],
    "lines": [

    ]
  },
  "1842": {
    "sprites": [{ "src": "spr_poof_0", "cond": "при значении 1 (первые шипы нажаты)" }],
    "related": [1362, 1319],
    "lines": [

    ]
  },
  "1846": {
    "related": [1312, 1411, 925, 1045, 1255, 1311],
    "lines": [
      {
        "cond": "при значении < 2 — продавец, приветствие в магазине",
        "who": "narration",
        "text": "* The sunset... * It's breathtaking, isn't it?"
      },
      {
        "cond": "при значении ≥ 2 — продавец, приветствие в магазине",
        "who": "narration",
        "text": "* The sunset... will it ever be this beautiful again?"
      },
      {
        "cond": "при значении < 2 — продавец при выходе",
        "who": "narration",
        "text": "* That's right, go outside. * It's beautiful."
      },
      {
        "cond": "при значении ≥ 2 — продавец при выходе",
        "who": "narration",
        "text": "* Treasure this world, won't you?"
      },
      {
        "cond": "при значении ≥ 2 — новый титул в тёмном меню",
        "who": "narration",
        "text": "LV5 Pink Rose Flirtatious, and flirtatious."
      }
    ]
  },
  "1847": {
    "related": [1848, 1849],
    "lines": [
      {
        "cond": "выбор варианта 0 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* Kris... don't worry. After we get back..."
      },
      {
        "cond": "выбор варианта 0 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* We can tell the mayor about everything we saw."
      },
      {
        "cond": "выбор варианта 0 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* I know she'll do everything she can to help."
      },
      {
        "cond": "выбор варианта 0 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* The more people are safe from this, the better..."
      },
      {
        "cond": "при значении 1 — повторный выбор варианта 0",
        "who": "narration",
        "text": "* Kris, I'm sorry. I can't say that enough."
      },
      {
        "cond": "при значении 1 — повторный выбор варианта 0",
        "who": "narration",
        "text": "* ... but... you've grown up a lot, haven't you?"
      },
      {
        "cond": "при значении 1 — повторный выбор варианта 0",
        "who": "narration",
        "text": "* When your brother finally comes home..."
      },
      {
        "cond": "при значении 1 — повторный выбор варианта 0",
        "who": "narration",
        "text": "* I can't wait to see how proud he'll be of you."
      }
    ]
  },
  "1848": {
    "related": [1847, 1849],
    "lines": [
      {
        "cond": "выбор варианта 1 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* We were both worried, Kris."
      },
      {
        "cond": "выбор варианта 1 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* ... that Asriel was going to end up your only friend."
      },
      {
        "cond": "выбор варианта 1 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* But it seems that you've met someone rather wonderful."
      },
      {
        "cond": "выбор варианта 1 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* Not only has she fought by your side through danger..."
      },
      {
        "cond": "выбор варианта 1 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* ... but, she also seems to have an interest in flowers!"
      },
      {
        "cond": "при значении 1 — повторный выбор варианта 1",
        "who": "narration",
        "text": "* Feel free to bring her by anytime, Kris."
      },
      {
        "cond": "при значении 1 — повторный выбор варианта 1",
        "who": "narration",
        "text": "* I'll give her a free snapdragon."
      }
    ]
  },
  "1849": {
    "related": [1847, 1848],
    "lines": [
      {
        "cond": "выбор варианта 2 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* (Kris's other friend...)"
      },
      {
        "cond": "выбор варианта 2 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* (It's strange. At a glance, they look a bit like Asriel...)"
      },
      {
        "cond": "выбор варианта 2 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* (But, the longer you look...)"
      },
      {
        "cond": "выбор варианта 2 впервые (флаг 0 → 1)",
        "who": "narration",
        "text": "* (The harder it is to tell if they're a monster at all.)"
      },
      {
        "cond": "при значении 1 — повторный выбор варианта 2",
        "who": "narration",
        "text": "* (Even if they look that way, Kris accepts them...)"
      },
      {
        "cond": "при значении 1 — повторный выбор варианта 2",
        "who": "narration",
        "text": "* (I hope they realize they don't have to hide themself.)"
      }
    ]
  },
  "1850": {
    "related": [1879, 1455, 1776],
    "lines": [
      {
        "cond": "выбор 0 — цветок себе (флаг → 1)",
        "who": "ralsei",
        "text": "* Umm, of course, Kris...!"
      },
      {
        "cond": "выбор 0 — цветок себе (флаг → 1)",
        "who": "ralsei",
        "text": "* Great! Then, I'll take the blue-and-pink one...!"
      },
      {
        "cond": "выбор 0 — цветок себе (флаг → 1)",
        "who": "ralsei",
        "text": "* (Kris... has me in mind, too, Flowery.)"
      },
      {
        "cond": "выбор 0 — цветок себе (флаг → 1)",
        "who": "ralsei",
        "text": "* (... I know it.)"
      },
      {
        "cond": "выбор 1 — отдать цветок Ральзею (флаг → 2)",
        "who": "susie",
        "text": "* Hey. Ralsei obviously wants that one, dumbass."
      },
      {
        "cond": "выбор 1 — отдать цветок Ральзею (флаг → 2)",
        "who": "susie",
        "text": "* You're always choosing stuff, let him have this one."
      },
      {
        "cond": "при значении 2 — в кафе (реакция на напиток)",
        "who": "ralsei",
        "text": "* Of course, Susie!"
      },
      {
        "cond": "при значении 2 — в кафе (реакция на напиток)",
        "who": "ralsei",
        "text": "* (After all, it's thanks to her I got my favorite...)"
      }
    ]
  },
  "1852": {
    "lines": [
      {
        "cond": "при значении 2 — путь меча, сцена DW30",
        "who": "narration",
        "text": "* I... I hesitated... why..."
      },
      {
        "cond": "при значении 2 — путь меча, сцена DW30",
        "who": "narration",
        "text": "* It's not right!! We have to defeat you!!! We have to!!!"
      },
      {
        "cond": "при значении 2 — путь меча, сцена DW30",
        "who": "narration",
        "text": "* Get up!!!"
      }
    ]
  },
  "1854": {
    "related": [1771],
    "lines": [
      {
        "cond": "при значении 0 — первый осмотр двери Майка (флаг → 1)",
        "who": "narration",
        "text": "* (Michaeldoor.)"
      },
      {
        "cond": "при значении 0 — первый осмотр двери Майка (флаг → 1)",
        "who": "narration",
        "text": "* (You had a strange gut feeling. That whatever's inside the door today...)"
      },
      {
        "cond": "при значении 0 — первый осмотр двери Майка (флаг → 1)",
        "who": "narration",
        "text": "* (Probably wouldn't make sense unless you had been inside yesterday.)"
      },
      {
        "cond": "при значении 0 — первый осмотр двери Майка (флаг → 1)",
        "who": "narration",
        "text": "* (Knock?)"
      },
      {
        "cond": "при значении 1 — повторный осмотр",
        "who": "narration",
        "text": "* (Michaeldoor...)"
      }
    ]
  },
  "1857": {
    "related": [357],
    "lines": [
      {
        "cond": "при значении 1 — первый разговор с Миззл",
        "who": "narration",
        "text": "* You can really... throw things?"
      },
      {
        "cond": "при значении 1 — первый разговор с Миззл",
        "who": "narration",
        "text": "* Where I hail from, most people don't even have arms. Haha."
      },
      {
        "cond": "при значении 1 — повторный разговор",
        "who": "narration",
        "text": "* I've heard people can even throw parties. But how? Isn't that 3 heroes?"
      }
    ]
  },
  "1861": {
    "related": [1458],
    "lines": [
      {
        "cond": "при значении 0 — впервые берут подушку, если флаг 1391 ≠ 1 (флаг → 1)",
        "who": "susie",
        "text": "* (... sure hope it doesn't say that every time.)"
      },
      {
        "cond": "при значении 0 — впервые берут подушку, если флаг 1391 == 1 (флаг → 1)",
        "who": "susie",
        "text": "* Great, it's so quiet for a pillow."
      },
      {
        "cond": "при значении ≥ 1 — подушка уже взята, если флаг 1391 ≠ 1",
        "who": "susie",
        "text": "* (He'll just have to kinda, uh, not roll around.)"
      },
      {
        "cond": "при значении ≥ 1 — подушка уже взята, если флаг 1391 == 1",
        "who": "susie",
        "text": "* Yeah, it's a really quiet pillow."
      },
      {
        "cond": "при значении 0 — Сьюзи предлагает забрать подушку (флаг 1458 > 0)",
        "who": "susie",
        "text": "* (Psst... Kris...)"
      },
      {
        "cond": "при значении 0 — Сьюзи предлагает забрать подушку (флаг 1458 > 0)",
        "who": "susie",
        "text": "* (Maybe we could take the chair's pillow?)"
      },
      {
        "cond": "при значении 0 — Сьюзи предлагает забрать подушку (флаг 1458 > 0)",
        "who": "susie",
        "text": "* (Could be awesome for Ralsei's room?)"
      },
      {
        "cond": "повторное взаимодействие с подушкой",
        "who": "narration",
        "text": "* (You accidentally drummed your fingers on the pillow.)"
      },
      {
        "cond": "осмотр стула при флаге 1458 == 0 (флаг → 3)",
        "who": "narration",
        "text": "* (It's a chair. It's called Chairery.)"
      },
      {
        "cond": "осмотр стула при флаге 1458 == 0 (флаг → 3)",
        "who": "narration",
        "text": "* (It's too ideal.)"
      },
      {
        "cond": "повторный осмотр стула при флаге 1458 == 0",
        "who": "narration",
        "text": "* (A chair that's too perfect to sit on.)"
      }
    ]
  },
  "1862": {
    "related": [710, 1455, 1458],
    "lines": [
      {
        "cond": "при значении 0 → 2 — знак взят",
        "who": "susie",
        "text": "* Gotta start somewhere, man."
      },
      {
        "cond": "путь flag[710] == 2 — знак для твоей комнаты (флаг → 1)",
        "who": "narration",
        "text": "* (\"A sign of Flowery's face. Perfect for Raly's room.\")"
      },
      {
        "cond": "путь flag[710] == 2 — знак для твоей комнаты (флаг → 1)",
        "who": "susie",
        "text": "* Kinda got a point..."
      },
      {
        "cond": "путь flag[710] == 2 — знак для твоей комнаты (флаг → 1)",
        "who": "ralsei",
        "text": "* My room already has enough, thank you."
      },
      {
        "cond": "путь flag[710] == 2 — знак для твоей комнаты (флаг → 1)",
        "who": "susie",
        "text": "* Huh... 'k then."
      },
      {
        "cond": "путь flag[710] == 2 — знак для твоей комнаты (флаг → 1)",
        "who": "narration",
        "text": "* (Susie got the sign for your room.)"
      },
      {
        "cond": "при значении 3 — повторно",
        "who": "susie",
        "text": "* (What's... in his room, anyway...?)"
      },
      {
        "cond": "первый осмотр знака (флаг → 3)",
        "who": "narration",
        "text": "* (\"A sign of Flowery's face. Perfect for Raly's room.\")"
      },
      {
        "cond": "первый осмотр знака (флаг → 3)",
        "who": "ralsei",
        "text": "* My... my room doesn't need anything!"
      },
      {
        "cond": "первый осмотр знака (флаг → 3)",
        "who": "narration",
        "text": "* (\"Raly might disagree, but his room needs a little spice and flavor.\")"
      },
      {
        "cond": "первый осмотр знака (флаг → 3)",
        "who": "ralsei",
        "text": "* I'm, I'm not arguing with a sign!"
      }
    ]
  },
  "1863": {
    "related": [710, 1458],
    "lines": [
      {
        "cond": "путь flag[710] == 2 и flag[864] > 0 — лестница для комнаты Ральзея (флаг → 1)",
        "who": "susie",
        "text": "* Dude, we should upgrade your room's ladder."
      },
      {
        "cond": "путь flag[710] == 2 и flag[864] > 0 — лестница для комнаты Ральзея (флаг → 1)",
        "who": "ralsei",
        "text": "* You want me to take LADDERY?"
      },
      {
        "cond": "путь flag[710] == 2 и flag[864] > 0 — лестница для комнаты Ральзея (флаг → 1)",
        "who": "susie",
        "text": "* ... yeah."
      },
      {
        "cond": "путь flag[710] == 2 и flag[864] > 0 — лестница для комнаты Ральзея (флаг → 1)",
        "who": "ralsei",
        "text": "* ... fine."
      },
      {
        "cond": "путь flag[710] == 2 и flag[864] > 0 — лестница для комнаты Ральзея (флаг → 1)",
        "who": "narration",
        "text": "* (Laddery was taken for Ralsei's room.)"
      },
      {
        "cond": "иначе — лестницу не берут (флаг → 3)",
        "who": "ralsei",
        "text": "* Kind of makes me think it would be nice..."
      },
      {
        "cond": "иначе — лестницу не берут (флаг → 3)",
        "who": "ralsei",
        "text": "* ... to have a ladder of my own."
      },
      {
        "cond": "иначе — лестницу не берут (флаг → 3)",
        "who": "susie",
        "text": "* ... yeah."
      },
      {
        "cond": "иначе — лестницу не берут (флаг → 3)",
        "who": "susie",
        "text": "* You want it?"
      },
      {
        "cond": "иначе — лестницу не берут (флаг → 3)",
        "who": "ralsei",
        "text": "* Umm... it wouldn't... fit in my room."
      },
      {
        "cond": "иначе — лестницу не берут (флаг → 3)",
        "who": "susie",
        "text": "* ... huh. Okay."
      }
    ]
  },
  "1865": {
    "related": [1874, 1045, 1873],
    "lines": [
      {
        "cond": "при значении > 1 — повторная попытка боя (реплика-баллон Флауи)",
        "who": "narration",
        "text": "Here, let me start over..."
      },
      {
        "cond": "при значении 1 — первая попытка боя (реплика-баллон Флауи)",
        "who": "narration",
        "text": "You know, I had wanted you to meet the other flowers."
      }
    ]
  },
  "1866": {
    "lines": [
      {
        "cond": "при значении 1 — сундук открыт",
        "who": "narration",
        "text": "(RU: сундук в room_dogplatforming отображается открытым — image_index = 1)"
      }
    ]
  },
  "1871": {
    "related": [1454, 1775],
    "lines": [
      {
        "cond": "при значении 0 — первая попытка подняться по «лестнице»",
        "who": "narration",
        "text": "* (... you try to climb the stairs...)"
      },
      {
        "cond": "при значении 0 — первая попытка подняться по «лестнице»",
        "who": "narration",
        "text": "* (It's not stairs.)"
      },
      {
        "cond": "при значении 1 — повторно",
        "who": "susie",
        "text": "* (Pfft, Kris thought it was stairs.)"
      }
    ]
  },
  "1873": {
    "related": [1045, 1865, 1874],
    "lines": [
      {
        "cond": "при значении < 3 — сцена лечения Флауи (баллон)",
        "who": "narration",
        "text": "No... that's not the way we're gonna beat you!"
      },
      {
        "cond": "при значении 1 — сцена лечения Флауи (баллон)",
        "who": "narration",
        "text": "Heh... aren't you supposed to listen to Kris, Raly...?"
      }
    ]
  },
  "1874": {
    "related": [1865, 1045, 1873],
    "lines": [
      {
        "cond": "ACT «Susie's Idea» (фаза 6)",
        "who": "narration",
        "text": "* (You listened to Susie's Idea!)"
      },
      {
        "cond": "при значении 0 — впервые слушают идею Сьюзи (tempflag → 1)",
        "who": "susie",
        "text": "* (Kris... I just noticed from what Flowery said, but...)"
      },
      {
        "cond": "при значении 0 — впервые слушают идею Сьюзи (tempflag → 1)",
        "who": "susie",
        "text": "* (The flowers we're on stopped going up a while ago!)"
      },
      {
        "cond": "при значении 0 — впервые слушают идею Сьюзи (tempflag → 1)",
        "who": "susie",
        "text": "* (If you want to get to the Dark Fountain...)"
      },
      {
        "cond": "при значении 0 — впервые слушают идею Сьюзи (tempflag → 1)",
        "who": "susie",
        "text": "* (We gotta find another way... got it!?)"
      },
      {
        "cond": "при значении ≥ 1 — повторно",
        "who": "susie",
        "text": "* (Kris... took a while, but...)"
      },
      {
        "cond": "при значении ≥ 1 — повторно",
        "who": "susie",
        "text": "* (We're finally up high enough for another shot!)"
      },
      {
        "cond": "при значении ≥ 1 — повторно",
        "who": "susie",
        "text": "* (You got it this time, Kris?)"
      },
      {
        "cond": "при значении ≥ 1 — повторно",
        "who": "susie",
        "text": "* Kris, this is it!! Go!!!"
      }
    ]
  },
  "1876": {
    "related": [1393, 1394, 1395, 1396, 1397, 1398],
    "lines": [
      {
        "cond": "при значении 0 — первый разговор о пианино (флаг → 1; при flag[1512] == 1 или 2)",
        "who": "noelle",
        "text": "* (Kris wouldn't go in there without Azzy, faha.)"
      },
      {
        "cond": "при значении 0 — первый разговор о пианино (флаг → 1; при flag[1512] == 1 или 2)",
        "who": "susie",
        "text": "* Psst, Noelle... maybe you don't know, but..."
      },
      {
        "cond": "при значении 0 — первый разговор о пианино (флаг → 1; при flag[1512] == 1 или 2)",
        "who": "susie",
        "text": "* Kris is... kinda awesome at piano."
      },
      {
        "cond": "при значении 0 — первый разговор о пианино (флаг → 1; при flag[1512] == 1 или 2)",
        "who": "noelle",
        "text": "* O... oh, really? Is that so...?"
      },
      {
        "cond": "при значении 0 — первый разговор о пианино (флаг → 1; при flag[1512] == 1 или 2)",
        "who": "susie",
        "text": "* ... you should hear them play sometime."
      },
      {
        "cond": "при значении 0 — первый разговор о пианино (флаг → 1; при flag[1512] == 1 или 2)",
        "who": "noelle",
        "text": "* Sure, only if... they want to."
      },
      {
        "cond": "при значении 1 — повторно, если flag[1512] == 1",
        "who": "noelle",
        "text": "* So Kris... played for you?"
      },
      {
        "cond": "при значении 1 — повторно, если flag[1512] == 1",
        "who": "susie",
        "text": "* Nah, it was for, like... uh..."
      },
      {
        "cond": "при значении 1 — повторно, если flag[1512] == 1",
        "who": "susie",
        "text": "* ... I guess I was just, listening."
      },
      {
        "cond": "при значении 1 — повторно, если flag[1512] == 1",
        "who": "noelle",
        "text": "* ... yeah."
      },
      {
        "cond": "при значении 1 — повторно, иначе",
        "who": "susie",
        "text": "* They even said... they'd show me how to..."
      },
      {
        "cond": "при значении 1 — повторно, иначе",
        "who": "noelle",
        "text": "* You KNOW, I was thinking of learning piano, TOO!"
      },
      {
        "cond": "при значении 1 — повторно, иначе",
        "who": "susie",
        "text": "* Really? Awesome, we could all play together!"
      }
    ]
  },
  "1879": {
    "related": [1850, 1776],
    "lines": [
      {
        "cond": "при значении 4 — Сьюзи делает большой глоток",
        "who": "susie",
        "text": "* Sorry, BIIIIG sip! Hahaha!!"
      },
      {
        "cond": "при значении 4 — Сьюзи делает большой глоток",
        "who": "ralsei",
        "text": "* (That... was mine...)"
      },
      {
        "cond": "выбор «Stop her!!!» (флаг → 2)",
        "who": "susie",
        "text": "* ..."
      },
      {
        "cond": "выбор «Stop her!!!» (флаг → 2)",
        "who": "ralsei",
        "text": "* ..."
      },
      {
        "cond": "выбор «Stop her!!!» (флаг → 2)",
        "who": "susie",
        "text": "* Fine, you have it."
      },
      {
        "cond": "выбор «Stop her!!!» (флаг → 2)",
        "who": "ralsei",
        "text": "* (Umm, that was an interesting idea, Kris...!)"
      },
      {
        "cond": "выбор «Stop her!!!» (флаг → 2)",
        "who": "ralsei",
        "text": "* (Biting, the opposite end of the straw...)"
      },
      {
        "cond": "выбор «Yea» (флаг → 3)",
        "who": "susie",
        "text": "* Nah, you're being weird about it."
      },
      {
        "cond": "при значении 1 — Сьюзи переборщила с глотком",
        "who": "susie",
        "text": "* Oops. My sip too big."
      },
      {
        "cond": "при значении 1 — Сьюзи переборщила с глотком",
        "who": "ralsei",
        "text": "* Kris, um, would you like some of mine...?"
      },
      {
        "cond": "при значении 1 — Сьюзи переборщила с глотком",
        "who": "ralsei",
        "text": "* Or, um, rather than asking, I can just give you some!"
      },
      {
        "cond": "при значении 1 — Сьюзи переборщила с глотком",
        "who": "susie",
        "text": "* ... weirdos."
      }
    ]
  },
  "1883": {
    "related": [1327, 1328, 1807, 1324, 1326, 1329],
    "lines": [
      {
        "cond": "при установке флага (сцена со Сьюзи у статуи Азгора)",
        "who": "susie",
        "text": "* Yeah, it was stupid anyway."
      }
    ]
  },
  "1886": {
    "sprites": [{ "src": "spr_stomp_flower_blue_stomped_0", "cond": "при значении 1 (синий цветок растоптан)" }],
    "related": [1454],
    "lines": [

    ]
  },
  "1887": {
    "lines": [
      {
        "cond": "при значении 0 (дверь ещё не осматривали)",
        "who": "narration",
        "text": "* (It's locked by a pressure plate puzzle.)"
      },
      {
        "cond": "при значении 1 (дверь уже осматривали)",
        "who": "narration",
        "text": "* (You don't have a pressure plate puzzle to put into the keyhole.)"
      }
    ]
  },
  "1888": {
    "related": [1311, 61, 1340, 1341, 1342, 1462],
    "lines": [
      {
        "cond": "при значении 1 (совместное ДЕЙСТВИЕ в бою с Green)",
        "who": "narration",
        "text": "* Susie cooked up some TP!"
      },
      {
        "cond": "при значении 1 (совместное ДЕЙСТВИЕ в бою с Green)",
        "who": "narration",
        "text": "* Ralsei cooked up some TP!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою со Scarecrow)",
        "who": "narration",
        "text": "* Susie beats up the ground!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою со Scarecrow)",
        "who": "narration",
        "text": "* Ralsei trades hats!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою со Scarecrow)",
        "who": "narration",
        "text": "* Ralsei poses like a scarecrow!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою со Scarecrow)",
        "who": "narration",
        "text": "* Ralsei eats hay!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Sheary)",
        "who": "narration",
        "text": "* Ralsei received a haircut!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Terracota)",
        "who": "narration",
        "text": "* Susie lifted weeds!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Terracota)",
        "who": "narration",
        "text": "* Ralsei alters soil pH!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Terracota)",
        "who": "narration",
        "text": "* Ralsei does the worm!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Terracota)",
        "who": "narration",
        "text": "* Ralsei acts stone!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Seth/Purple)",
        "who": "narration",
        "text": "* Susie swaps Ralsei and Seth's glasses...! ... no real effect."
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Seth/Purple)",
        "who": "narration",
        "text": "* Susie calls Seth a Berdly knockoff. It was taken with pride!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Seth/Purple)",
        "who": "narration",
        "text": "* Susie calls Seth a bookworm. It was taken with pride!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Seth/Purple)",
        "who": "narration",
        "text": "* Susie calls Seth budget Berdly!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Seth/Purple)",
        "who": "narration",
        "text": "* Susie calls Seth purple! (nice)"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Seth/Purple)",
        "who": "narration",
        "text": "* Susie calls Seth budget Ralsei!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Seth/Purple)",
        "who": "narration",
        "text": "* Ralsei listens to Seth's explanations with patience!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Seth/Purple)",
        "who": "narration",
        "text": "* Ralsei shares his Manual with Seth!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Seth/Purple)",
        "who": "narration",
        "text": "* Ralsei sniff's Seth's scent!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Seth/Purple)",
        "who": "narration",
        "text": "* Ralsei listens politely!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Seth/Purple)",
        "who": "narration",
        "text": "* Ralsei shows his Manual!"
      },
      {
        "cond": "при значении 1 (ДЕЙСТВИЕ в бою с Seth/Purple)",
        "who": "narration",
        "text": "* Ralsei admires Seth's scent! (?)"
      }
    ]
  },
  "1889": {
    "related": [1311, 1819],
    "lines": [
      {
        "cond": "финальный платформинг — напоминание про ACT",
        "who": "ralsei",
        "text": "* (Kris, remember that you can ACT by pressing ~1.)"
      },
      {
        "cond": "при значении 2 (конец восхождения)",
        "who": "narration",
        "text": "* Guess we should take a look."
      },
      {
        "cond": "если столкнуться со Сьюзи во время лазания",
        "who": "susie",
        "text": "* Stop messing around, idiot!"
      }
    ]
  },
  "1890": {
    "lines": [
      {
        "cond": "при значении 1 (первый раз смотрим в телефон)",
        "who": "narration",
        "text": "* (You glanced at your phone.)"
      },
      {
        "cond": "при значении 1 (первый раз смотрим в телефон)",
        "who": "narration",
        "text": "* (There are a number of missed calls...)"
      },
      {
        "cond": "при значении 2 и далее (повторно)",
        "who": "narration",
        "text": "* (You looked at the backside of your phone.)"
      }
    ]
  },
  "1895": {
    "lines": [

    ]
  },
  "1899": {
    "sprites": [{ "src": "spr_cheese_smallening_0", "cond": "при значении 1 (сыр растоптан)" }],
    "lines": [

    ]
  },
  "1900": {
    "related": [1403, 1406, 1407, 1408, 1409, 1415],
    "lines": [
      {
        "cond": "при значении 0 (первый разговор, ставит 1)",
        "who": "narration",
        "text": "* I'm Milklooker"
      },
      {
        "cond": "при значении 0 (первый разговор, ставит 1)",
        "who": "narration",
        "text": "* I am here hoping they play the natural sounds of milk"
      },
      {
        "cond": "при значении 1 (повторный разговор)",
        "who": "narration",
        "text": "* I might be Milklooker but I can also be Milklistener"
      }
    ]
  },
  "1901": {
    "related": [1902],
    "lines": [
      {
        "cond": "при провале восхождения (failcounter==1; счётчик попыток 1901 растёт)",
        "who": "ralsei",
        "text": "* Well, this is a tad difficult..."
      }
    ]
  },
  "1902": {
    "sprites": [{ "src": "spr_fcastle_top_fakewall_0", "cond": "при значении 0 (фальшивая стена ещё на месте)" }],
    "related": [1901],
    "lines": [
      {
        "cond": "при раскрытии прохода (буст Сьюзи)",
        "who": "susie",
        "text": "* Rocket boost!"
      }
    ]
  },
  "1906": {
    "related": [1812, 1455, 1888],
    "lines": [
      {
        "cond": "при значении -1 (Сет повержен — путь насилия)",
        "who": "narration",
        "text": "H-hey! Attacking me isn't part of the plan! Y-you...!"
      },
      {
        "cond": "при значении -1 (Сет повержен — путь насилия)",
        "who": "narration",
        "text": "Uuu, Seth, why are you lying on the ground? Are you \"Sleepy?\""
      },
      {
        "cond": "при значении -1 (Сет повержен — путь насилия)",
        "who": "narration",
        "text": "Is this \"sleep?\""
      },
      {
        "cond": "при значении -1 (Сет повержен — путь насилия)",
        "who": "narration",
        "text": "..."
      },
      {
        "cond": "при значении -1 (Сет повержен — путь насилия)",
        "who": "narration",
        "text": "Uuu, it's boring if you don't say anything back!"
      },
      {
        "cond": "при значении -1 (Сет повержен — путь насилия)",
        "who": "narration",
        "text": "Seth, Seth needs to wake up! Lazy Seth, lazy!"
      },
      {
        "cond": "при значении -1 (Аква, исход с насилием)",
        "who": "narration",
        "text": "Uee hee hee! Numbers, numbers! Is this.. pain!?"
      },
      {
        "cond": "при значении -1 (Аква, исход с насилием)",
        "who": "narration",
        "text": "A... Aqua! Are you OK!?"
      },
      {
        "cond": "при значении -1 (Аква, исход с насилием)",
        "who": "narration",
        "text": "Hey...! You... you can't hurt Aqua like that!!"
      },
      {
        "cond": "при значении -1 (Аква, исход с насилием)",
        "who": "narration",
        "text": "You know she doesn't really know what happens when you fight!!"
      },
      {
        "cond": "при значении -1 (Аква, исход с насилием)",
        "who": "narration",
        "text": "Fine! If it's grown to this, then you leaf me no choice!"
      },
      {
        "cond": "при значении -1 (Аква, исход с насилием)",
        "who": "narration",
        "text": "Retreat!!"
      }
    ]
  },
  "1909": {
    "lines": [
      {
        "cond": "если в карманах/инвентаре нет места",
        "who": "narration",
        "text": "* Oh, miba, oh mama! No rooms in your pockets!? What's in there!?"
      },
      {
        "cond": "если в карманах/инвентаре нет места",
        "who": "narration",
        "text": "* Boys and salesmen!? Oh, miba, oh mama..."
      }
    ]
  }
};
})();
