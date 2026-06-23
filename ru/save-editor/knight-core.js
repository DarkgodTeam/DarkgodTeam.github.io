(() => {
  'use strict';

  const SAVE_META = {
    1: { totalLines: 10318, flagCount: 9999, characterCount: 4, itemSlots: 13, equipmentSlots: 13, storageSlots: 0 },
    2: { totalLines: 3055, flagCount: 2500, characterCount: 5, itemSlots: 13, equipmentSlots: 48, storageSlots: 72 },
  };

  const DATA = {
    characters: [
      [0, 'Пусто'], [1, 'Kris'], [2, 'Susie'], [3, 'Ralsei'], [4, 'Noelle'],
    ],
    consumables: [
      [0, 'Empty'], [1, 'Dark Candy'], [2, 'ReviveMint'], [3, 'Glowshard'], [4, 'Manual'],
      [5, 'BrokenCake'], [6, 'TopCake'], [7, 'SpinCake'], [8, 'Darkburger'], [9, 'LancerCookie'],
      [10, 'GigaSalad'], [11, 'ClubsSandwich'], [12, 'HeartsDonut'], [13, 'ChocoDiamond'],
      [14, 'FavSandwich'], [15, 'RouxlsRoux'], [16, 'CD Bagel'], [17, 'Mannequin'],
      [18, 'Kris Tea'], [19, 'Noelle Tea'], [20, 'Ralsei Tea'], [21, 'Susie Tea'],
      [22, 'DD-Burger'], [23, 'LightCandy'], [24, 'ButlerJuice'], [25, 'SpaghettiCode'],
      [26, 'JavaCookie'], [27, 'TensionBit'], [28, 'TensionGem'], [29, 'TensionMax'],
      [30, 'ReviveDust'], [31, 'ReviveBrite'], [32, 'S. POISON'], [33, 'DogDollar'],
      [34, 'TVDinner'], [35, 'Pipis'], [36, 'FlatSoda'], [37, 'TVSlop'], [38, 'ExecBuffet'],
      [39, 'DeluxeDinner'], [60, 'AncientSweet'], [61, 'Rhapsotea'], [62, 'Scarlixir'],
      [63, 'BitterTear'],
    ],
    keyItems: [
      [0, 'Empty'], [1, 'Cell Phone'], [2, 'Egg'], [3, 'BrokenCake'], [4, 'Broken Key A'],
      [5, 'Door Key'], [6, 'Broken Key B'], [7, 'Broken Key C'], [8, 'Lancer'],
      [9, 'Rouxls Kaard'], [10, 'EmptyDisk'], [11, 'LoadedDisk'], [12, 'KeyGen'],
      [13, 'ShadowCrystal'], [14, 'Starwalker'], [15, 'PureCrystal'], [16, 'OddController'],
      [17, 'BackstagePass'], [18, 'TripTicket'], [19, 'LancerCon'], [30, 'SheetMusic'],
      [31, 'ClaimbClaws'],
    ],
    weapons: [
      [0, 'Empty'], [1, 'Wood Blade'], [2, 'Mane Ax'], [3, 'Red Scarf'], [4, 'EverybodyWeapon'],
      [5, 'Spookysword'], [6, 'Brave Ax'], [7, 'Devilsknife'], [8, 'Trefoil'], [9, 'Ragger'],
      [10, 'DaintyScarf'], [11, 'TwistedSwd'], [12, 'SnowRing'], [13, 'ThornRing'],
      [14, 'BounceBlade'], [15, 'CheerScarf'], [16, 'MechaSaber'], [17, 'AutoAxe'],
      [18, 'FiberScarf'], [19, 'Ragger2'], [20, 'BrokenSwd'], [21, 'PuppetScarf'],
      [22, 'FreezeRing'], [23, 'Saber10'], [24, 'ToxicAxe'], [25, 'FlexScarf'],
      [26, 'BlackShard'], [50, 'JingleBlade'], [51, 'ScarfMark'], [52, 'JusticeAxe'],
      [53, 'Winglade'], [54, 'AbsorbAx'],
    ],
    armors: [
      [0, 'Empty'], [1, 'Amber Card'], [2, 'Dice Brace'], [3, 'Pink Ribbon'], [4, 'White Ribbon'],
      [5, 'Iron Shackle'], [6, 'MouseToken'], [7, 'Jevilstail'], [8, 'Silver Card'],
      [9, 'TwinRibbon'], [10, 'GlowWrist'], [11, 'ChainMail'], [12, 'B.ShotBowtie'],
      [13, 'SpikeBand'], [14, 'Silver Watch'], [15, 'TensionBow'], [16, 'Mannequin'],
      [17, 'DarkGoldBand'], [18, 'SkyMantle'], [19, 'SpikeShackle'], [20, 'FrayedBowtie'],
      [21, 'Dealmaker'], [22, 'RoyalPin'], [23, 'ShadowMantle'], [24, 'LodeStone'],
      [25, 'GingerGuard'], [26, 'BlueRibbon'], [27, 'TennaTie'], [50, 'Waferguard'],
      [51, 'MysticBand'], [52, 'PowerBand'], [53, 'PrincessRBN'], [54, 'GoldWidow'],
    ],
    lightItems: [
      [0, 'Empty'], [1, 'Hot Chocolate'], [2, 'Pencil'], [3, 'Bandage'], [4, 'Bouquet'],
      [5, 'Ball of Junk'], [6, 'Halloween Pencil'], [7, 'Lucky Pencil'], [8, 'Egg'],
      [9, 'Cards'], [10, 'Box of Heart Candy'], [11, 'Glass'], [12, 'Eraser'],
      [13, 'Mech Pencil'], [14, 'Wristwatch'], [15, 'Holiday Pencil'], [16, 'CactusNeedle'],
      [17, 'BlackShard'], [18, 'QuillPen'],
    ],
    phone: [[0, 'Empty'], [201, 'Call Home'], [202, "Sans's Number"]],
    spells: [
      [0, 'Empty'], [1, 'Rude Sword'], [2, 'Heal Prayer'], [3, 'Pacify'],
      [4, 'Rude Buster'], [5, 'Red Buster'], [6, 'Dual Heal'], [7, 'ACT'],
      [8, 'Sleep Mist'], [9, 'IceShock'], [10, 'SnowGrave'], [11, 'Ultimate Heal'],
    ],
    rooms: [
      [10283, "Krisroom"], [10284, "Krishallway"], [10285, "Torroom"],
      [10286, "Torhouse"], [10287, "Torbathroom"], [10288, "Town Krisyard"],
      [10289, "Town Northwest"], [10290, "Town North"], [10291, "Beach"],
      [10292, "Town Mid"], [10293, "Town Apartments"], [10294, "Town South"],
      [10295, "Town School"], [10296, "Town Church"], [10297, "Graveyard"],
      [10298, "Town Shelter"], [10299, "Hospital Lobby"], [10300, "Hospital Hallway"],
      [10301, "Hospital Rudy"], [10302, "Hospital Room2"], [10303, "Diner"],
      [10304, "Townhall"], [10305, "Flowershop 1f"], [10306, "Flowershop 2f"],
      [10307, "Library"], [10308, "Alphysalley"], [10309, "Torielclass"],
      [10310, "Schoollobby"], [10311, "Alphysclass"], [10312, "Schooldoor"],
      [10313, "Insidecloset"], [10314, "School Unusedroom"], [10315, "Dark1"],
      [10316, "?????? (Dark World)"], [10317, "Dark2"], [10318, "Dark3"],
      [10319, "Dark3a"], [10320, "Dark Wobbles"], [10321, "Eye Puzzle"],
      [10322, "Dark7"], [10323, "Dark Chase1"], [10324, "Dark Chase2"],
      [10325, "Castle Outskirts"], [10326, "Castle Town"], [10327, "Castle Front"],
      [10328, "Castle Tutorial"], [10329, "Castle Darkdoor"], [10330, "Field - Great Door"],
      [10331, "Field Forest"], [10332, "Field1"], [10333, "Field2"],
      [10334, "Field2a"], [10335, "Field Topchef"], [10336, "Field Puzzle1"],
      [10337, "Field - Maze of Death"], [10338, "Field Puzzle2"], [10339, "Field Getsusie"],
      [10340, "Field - Seam's Shop"], [10341, "Field Puzzletutorial"], [10342, "Field3"],
      [10343, "Field Boxpuzzle"], [10344, "Field4"], [10345, "Field Secret1"],
      [10346, "Field Checkers4"], [10347, "Field Checkers2"], [10348, "Field Checkers6"],
      [10349, "Field - Great Board"], [10350, "Field Checkers1"], [10351, "Field Checkers5"],
      [10352, "Field - Great Board 2"], [10353, "Field Checkersboss"], [10354, "Forest - Entrance"],
      [10355, "Forest Area0"], [10356, "Forest Area1"], [10357, "Forest Area2"],
      [10358, "Forest Area2a"], [10359, "Forest Puzzle1"], [10360, "Forest Beforeclover"],
      [10361, "Forest Area3a"], [10362, "Forest Area3"], [10363, "Forest - Bake Sale"],
      [10364, "Forest Smith"], [10365, "Forest Area4"], [10366, "Forest Dancers1"],
      [10367, "Forest Secret1"], [10368, "Forest Thrashmaker"], [10369, "Forest Starwalker"],
      [10370, "Forest Area5"], [10371, "Forest - Before Maze"], [10372, "Forest Maze1"],
      [10373, "Forest Maze Deadend"], [10374, "Forest Maze Susie"], [10375, "Forest Maze2"],
      [10376, "Forest Maze Deadend2"], [10377, "Forest - After Maze"], [10378, "Forest - Thrashing Room"],
      [10379, "Forest Afterthrash2"], [10380, "Forest Afterthrash3"], [10381, "Forest Afterthrash4"],
      [10382, "Forest Castleview"], [10383, "Forest Chase1"], [10384, "Forest Chase2"],
      [10385, "Forest Castlefront"], [10386, "Cc Prison Cells"], [10387, "Cc Prisonlancer"],
      [10388, "Card Castle - Prison"], [10389, "Cc Prison2"], [10390, "Cc Prisonelevator"],
      [10391, "Cc Elevator"], [10392, "Card Castle - ??? (Basement)"], [10393, "Cc Joker"],
      [10394, "Cc Entrance"], [10395, "Card Castle - 1F"], [10396, "Cc Rudinn"],
      [10397, "Cc 2f"], [10398, "Cc Rurus1"], [10399, "Cc 3f"],
      [10400, "Cc Hathy"], [10401, "Cc 4f"], [10402, "Cc Rurus2"],
      [10403, "Cc Clover"], [10404, "Card Castle - 5F"], [10405, "Cc Lancer"],
      [10406, "Cc 6f"], [10407, "Card Castle - Throne"], [10408, "Cc Preroof"],
      [10409, "Cc Kingbattle"], [10410, "Cc Prefountain"], [10411, "Cc Fountain"],
      [10422, "Empty"], [10423, "Man"], [20001, "Place Dogcheck2"],
      [20002, "Intro (CH2)"], [20003, "Queen's Mansion - Rooftop"], [20004, "Mansion Prefountain"],
      [20005, "Debug Choicer Light"], [20006, "Debug Smallface"], [20007, "Debug Battle Balloon"],
      [20008, "Debug Smallface Dark"], [20009, "Debug Choicer Dark"], [20010, "Gms Debug Failsafe"],
      [20011, "Room Initialize"], [20012, "Title Placeholder"], [20013, "Battletest"],
      [20014, "Cutscene Tester"], [20015, "Sound Tester"], [20016, "Sprite Tester"],
      [20017, "Gif Tester"], [20018, "Bullettest"], [20019, "Teacup Demoauto"],
      [20020, "Teacup Demobullets"], [20021, "Shaun Puzzle"], [20022, "Gms2 Test"],
      [20023, "Cutscene Tester B"], [20024, "Debug Color"], [20025, "Debug Battle"],
      [20026, "Debug Loc"], [20027, "Place Contact"], [20028, "Krisroom (CH2)"],
      [20029, "Krishallway (CH2)"], [20030, "Torroom (CH2)"], [20031, "Torhouse (CH2)"],
      [20032, "Torbathroom (CH2)"], [20033, "Town Krisyard (CH2)"], [20034, "Town Northwest (CH2)"],
      [20035, "Town North (CH2)"], [20036, "Beach (CH2)"], [20037, "Town Mid (CH2)"],
      [20038, "Town Apartments (CH2)"], [20039, "Town South (CH2)"], [20040, "Town School (CH2)"],
      [20041, "Town Church (CH2)"], [20042, "Graveyard (CH2)"], [20043, "Town Shelter (CH2)"],
      [20044, "Hospital Lobby (CH2)"], [20045, "Hospital Hallway (CH2)"], [20046, "Hospital Rudy (CH2)"],
      [20047, "Hospital Room2 (CH2)"], [20048, "Diner (CH2)"], [20049, "Townhall (CH2)"],
      [20050, "Flowershop 1f (CH2)"], [20051, "Flowershop 2f (CH2)"], [20052, "Library (CH2)"],
      [20053, "Alphysalley (CH2)"], [20054, "Computer Lab"], [20055, "Library Upstairs"],
      [20056, "Police"], [20057, "Conbini"], [20058, "Icee Pizza"],
      [20059, "Torielclass (CH2)"], [20060, "Schoollobby (CH2)"], [20061, "Alphysclass (CH2)"],
      [20062, "Schooldoor (CH2)"], [20063, "Insidecloset (CH2)"], [20064, "School Unusedroom (CH2)"],
      [20065, "Castle Town (CH2)"], [20066, "Castle Tutorial (CH2)"], [20067, "Castle West Cliff Old"],
      [20068, "Castle East Door"], [20069, "Castle West Cliff"], [20070, "Castle Area 1"],
      [20071, "Castle Area 2"], [20072, "My Castle Town"], [20073, "Ralsei Castle Front"],
      [20074, "Castle Restaurant"], [20075, "Castle Cafe"], [20076, "Castle Dojo"],
      [20077, "Ralsei Castle 1f"], [20078, "Ralsei Castle 2f"], [20079, "Castle Dungeon"],
      [20080, "Castle Rooms Hallway"], [20081, "Castle Rooms Kris"], [20082, "Castle Rooms Susie"],
      [20083, "Castle Rooms Lancer"], [20084, "Dark World"], [20085, "Cyber Intro Connector"],
      [20086, "Cyber Intro 2"], [20087, "Cyber Field - Entrance"], [20088, "Cyber Savepoint"],
      [20089, "Cyber Battle Maze 1"], [20090, "Cyber Music Bullet"], [20091, "Cyber Field - Arcade Machine"],
      [20092, "Cyber Keyboard Puzzle 1"], [20093, "Cyber Queen Boxing"], [20094, "Cyber Musical Door"],
      [20095, "Cyber Maze Virokun"], [20096, "Cyber Keyboard Puzzle 2"], [20097, "Cyber Battle Maze 2"],
      [20098, "Cyber Field - Music Shop"], [20099, "Cyber Musical Shop"], [20100, "Cyber Teacup Final"],
      [20101, "Cyber Rollercoaster"], [20102, "Cyber Maze Fireworks"], [20103, "Cyber Maze Tasque"],
      [20104, "Cyber Maze Queenscreen"], [20105, "Cyber Viro Ring"], [20106, "Cyber Post Music Boss Slide"],
      [20107, "Cyber Keyboard Puzzle 3"], [20108, "Cyber Battle Maze 3"], [20109, "Cyber Teacup 2"],
      [20110, "Cyber Shaunsmusicalbullettunnel"], [20111, "Cyber Maze Rhythm"], [20112, "Cyber Escalator Slide"],
      [20113, "Cyber Nuberts Treasure"], [20114, "Cyber Music Fight"], [20115, "Cyber Keyboardexample"],
      [20116, "City Prototype 01"], [20117, "City Prototype 02"], [20118, "City Spamton Shop Exterior"],
      [20119, "City Spamton House"], [20120, "City Intro"], [20121, "Cyber City - Entrance"],
      [20122, "City Entrance"], [20123, "City Traffic 1"], [20124, "Cyber City - First Alleyway"],
      [20125, "City Hacker"], [20126, "City Mice"], [20127, "City Big 1"],
      [20128, "City Traffic 2"], [20129, "City Big 2"], [20130, "Cyber City - Music Shop"],
      [20131, "City Savepoint"], [20132, "City Big 3"], [20133, "City Traffic 3"],
      [20134, "City Mice2"], [20135, "Cyber City - Mouse Alley"], [20136, "City Mice3"],
      [20137, "Cyber City - Second Alleyway"], [20138, "City Berdly"], [20139, "City Traffic 4"],
      [20140, "City Spamton Alley"], [20141, "City Monologue"], [20142, "Cyber City - Heights"],
      [20143, "City Postbaseball 1"], [20144, "City Postbaseball 2"], [20145, "City Postbaseball 3"],
      [20146, "City Mansion Front"], [20147, "City Susie Ralsei Fun 1"], [20148, "City Mirrorfriend"],
      [20149, "City Treasure"], [20150, "City Dog Traffic"], [20151, "City Man"],
      [20152, "City Moss"], [20153, "City Big 3 Backup 2exits"], [20154, "City Traffic 3 2entrances"],
      [20155, "City Cheese"], [20156, "City Carnival"], [20157, "City Noelle Fight Intro"],
      [20158, "City Spamton Shop Interior"], [20159, "City Monologue Old"], [20160, "Mansion Krisroom"],
      [20161, "Queen's Mansion - Mess Hall"], [20162, "Mansion Lightner Hallway"], [20163, "Mansion Darkbulb 1"],
      [20164, "Mansion Darkbulb 2"], [20165, "Mansion Darkbulb 3"], [20166, "Queen's Mansion - Entrance"],
      [20167, "Mansion Entrance"], [20168, "Mansion Fire Paintings"], [20169, "Mansion Single Pot"],
      [20170, "Mansion Potbalance"], [20171, "Mansion Tasquepaintings"], [20172, "Mansion Traffic"],
      [20173, "Mansion East 1f E"], [20174, "Mansion East 1f Secret"], [20175, "Mansion East Teacup"],
      [20176, "Mansion East Teacup 4"], [20177, "Mansion East Teacup 3"], [20178, "Mansion East Teacup 2"],
      [20179, "Mansion B Entrance"], [20180, "Queen's Mansion - Basement"], [20181, "Mansion B Central"],
      [20182, "Mansion B West 1f"], [20183, "Mansion B West 1f A"], [20184, "Mansion B West 1f B"],
      [20185, "Mansion B West 2f"], [20186, "Mansion B East"], [20187, "Mansion B East A"],
      [20188, "Mansion B East B"], [20189, "Mansion B East Transformed"], [20190, "Mansion East 2f A"],
      [20191, "Mansion East 2f Transformed New"], [20192, "Mansion East 2f Shortcut"], [20193, "Mansion Kitchen"],
      [20194, "Mansion East 2f C"], [20195, "Mansion East 2f C A"], [20196, "Queen's Mansion - 3F"],
      [20197, "Mansion East 3f"], [20198, "Mansion East 3f Projection"], [20199, "Mansion East 3f Toilet"],
      [20200, "Mansion Acid Tunnel"], [20201, "Mansion Acid Tunnel Puzzle Entrance"], [20202, "Queen's Mansion - Acid Tunnel"],
      [20203, "Mansion Acid Tunnel Exit"], [20204, "Mansion East 4f B"], [20205, "Queen's Mansion - 4F"],
      [20206, "Mansion East 4f D"], [20207, "Mansion Top"], [20208, "Mansion Top Post"],
      [20209, "Mansion Ferris Wheel"], [20210, "Mansion Ferris Wheel Post"], [20211, "Mansion Noelle Room"],
      [20212, "Mansion Bridges"], [20213, "Mansion Bridges Funny"], [20214, "Mansion Mouselottery"],
      [20215, "Mansion Hands"], [20216, "Mansion Dining3"], [20217, "Mansion Dininghall"],
      [20218, "Mansion Dining Storage"], [20219, "Mansion East 1f B"], [20220, "Mansion East 2f C B"],
      [20221, "Mansion Traffic Original"], [20222, "Mansion East 1f A"], [20223, "Mansion East 2f Teacup"],
      [20224, "Mansion East 4f E"], [20225, "Mansion East 4f A"], [20226, "Mansion East 2f Ufo Old"],
      [20227, "Mansion East 1f D"], [20228, "Mansion East 1f C"], [20229, "Mansion Sparks"],
      [20230, "Mansion Acid Tunnel Old"], [20231, "Mansion Top Post Old"], [20232, "Mansion Elevator"],
      [20233, "Place Dog"], [20234, "Legend"], [20235, "Legend Neo"],
      [20236, "Shop1"], [20237, "Shop Ch2 Music"], [20238, "Shop Ch2 Swatch"],
      [20239, "Shop Ch2 Spamton"], [20240, "Gameover"], [20241, "Place Logo"],
      [20242, "Place Failure"], [20243, "Place Naming Jikken"], [20244, "Place Menu"],
      [20245, "Ed"], [20246, "Empty (CH2)"], [20247, "Darkempty"],
      [20248, "Darkbase Gms2"], [20249, "Cyber Battle Maze 2 Old"], [20250, "Cyber Keyboard Puzzle 1 Old"],
      [20251, "Cyber Tasque Battle Og"], [20252, "Cyber Savepoint Original"], [20253, "Cyber Battle Maze 1 Original"],
      [20254, "Cyber Music Bullet Original"], [20255, "Cyber Maze Virokun Backup"], [20256, "Cyber Battle Maze 2 Toby"],
      [20257, "City Big 1 Original"], [20258, "City Traffic 2 Old"], [20259, "City Big 2 Og"],
      [20260, "City Mice2 Og"], [20261, "Mansion East Teacup 4 Old"], [20262, "Cyber Teacup 1"],
      [20263, "Cyber Viromaze2"], [20264, "City Traffic 5 Old"], [20265, "Mansion Dining Storage Old"],
      [20266, "Cyber Virovirokun Fight"], [20267, "Mansion East 2f D Backup"], [20268, "City Traffic 3 Backup"],
      [20269, "Cc Lancer (CH2)"], [20270, "Cc Clover (CH2)"], [20271, "Cc Fountain (CH2)"],
      [20272, "City Big 3 Og"], [20273, "Mansion Bridgesold"], [20274, "City Sidewayscars"],
      [20275, "Transformation Sequence"], [20276, "Mansion Gigaqueen"], [20277, "Musical Sync Test"],
      [30094, "Tv Cutscene1g"], [30095, "Rhythm"], [30097, "Dark World"],
      [30098, "Couch Overworld 01"], [30099, "Couch Overworld 02"], [30100, "Couch Overworld 03"],
      [30101, "Couch Overworld 04"], [30102, "Couch Overworld 05"], [30103, "Nondescript Room"],
      [30104, "Nondescript Field"], [30105, "Nondescript Hallway"], [30106, "Nondescript Classroom"],
      [30107, "Backstage"], [30108, "Cold Place"], [30109, "Town Krisyard Dark"],
      [30111, "Board 1"], [30114, "Board Dungeon 2"], [30115, "Board Dungeon 3"],
      [30116, "Board Preshadowmantle"], [30117, "Shadowmantle"], [30118, "Board Prepostshadowmantle"],
      [30119, "Board Postshadowmantle"], [30120, "Ch3 Man"], [30123, "Susiezilla"],
      [30124, "Board Intro"], [30126, "Torhouse Sepia"], [30130, "Ch3 Gameshowroom"],
      [30131, "Shootout"], [30133, "Board Preshadowmantle Repeat"], [30134, "Green Room"],
      [30135, "Board 1 Sword"], [30136, "Board Sword Intro"], [30137, "Board 1 Sword Trees"],
      [30138, "Changing Room"], [30139, "Console Room"], [30140, "Board 2"],
      [30141, "Tv Closet"], [30143, "Board 3"], [30146, "B3bs Interstitial"],
      [30147, "Board 2 Sword"], [30149, "Board Empty"], [30150, "B3bs Rouxls Lanina"],
      [30152, "B3bs Rouxls Boss"], [30153, "B3bs Cheaterpippins"], [30154, "B3bs Idcardpuzzle"],
      [30155, "B3bs Intro"], [30156, "B3bs Zapper A"], [30157, "B3bs Rabbick A"],
      [30158, "B3bs Lancerget"], [30159, "B3bs Cooltrashy"], [30160, "B3bs Zapper C"],
      [30161, "B3bs Rabbick B"], [30162, "B3bs Sadshadowguys"], [30163, "B3bs Zapper B"],
      [30165, "Susiezilla"], [30166, "Inbetween"], [30167, "Teevie Preview"],
      [30168, "Chef"], [30169, "Puzzlecloset 1"], [30170, "Puzzlecloset 2"],
      [30173, "Chef Empty"], [30174, "Susiezilla Empty"], [30175, "Rhythm Empty"],
      [30176, "Board 3b"], [30178, "Goulden Sam"], [30179, "B3bs Shop"],
      [30180, "B3bs Mysterypuzzle"], [30181, "B3bs Watercooler"], [30182, "B3bs Jail2"],
      [30183, "B3bs Zapper D"], [30184, "B3bs Extrapuzzle"], [30185, "B3bs Bibliox"],
      [30187, "Board 3 Sword"], [30188, "Couch Points"], [30189, "Couch Overworld Intro Left"],
      [30190, "Couch Video"], [30191, "Snow Zone Battle"], [30193, "Puzzlecloset 0"],
      [30194, "Board Gsa02 B0"], [30195, "TV World - Before the Show"], [30196, "TV World - Entrance"],
      [30197, "Teevie Large 01"], [30198, "Teevie Large 02"], [30199, "Teevie Cowboy Zone 01 Intro"],
      [30200, "Teevie Cowboy Zone 01 After"], [30201, "Teevie Watercooler"], [30202, "Teevie Susiezilla"],
      [30203, "Teevie Cowboy Zone 02 Intro"], [30204, "Teevie Cowboy Zone 02 After"], [30205, "Teevie Shadow Guys"],
      [30206, "Teevie Stealth C"], [30207, "Teevie Stealth"], [30208, "Teevie Failure Cage"],
      [30209, "TV World - Concert"], [30210, "Teevie Maze Points"], [30211, "Teevie Maze Chef"],
      [30212, "Teevie Maze Final"], [30213, "Teevie Maze"], [30214, "TV World - Cooking Show"],
      [30215, "Teevie Cutscene Final"], [30216, "Teevie Ribbick"], [30217, "Teevie Preview South"],
      [30218, "B3bs Camerareminder"], [30219, "Puzzlecloset 3"], [30220, "Teevie Sams"],
      [30221, "Teevie Bonus Zone"], [30222, "Teevie Audiencepits"], [30224, "Teevie Lightmaze"],
      [30225, "Teevie Maze Quiz"], [30226, "Ranking Hub"], [30227, "Ranking A"],
      [30228, "Ranking B"], [30229, "Ranking C"], [30230, "Ranking Z"],
      [30231, "Ranking Z Hallway"], [30232, "Teevie Ribbicks A"], [30233, "Teevie Ribbicks B"],
      [30234, "Teevie Susiebridge"], [30235, "Teevie Shuttahmaze"], [30236, "Teevie Stealth D"],
      [30237, "Teevie Dust"], [30238, "Teevie Dust South"], [30239, "Ch3 Gacharoom Unknown"],
      [30240, "Ranking T"], [30241, "Puzzlecloset 1a"], [30242, "Rhythm Countdown"],
      [30243, "Snow Zone East Door"], [30244, "Inbetweenhall"], [40014, "Kris's Room"],
      [40015, "Krishallway (CH4)"], [40016, "Torroom (CH4)"], [40017, "Torhouse (CH4)"],
      [40018, "Torbathroom (CH4)"], [40019, "Town Krisyard (CH4)"], [40020, "Town Northwest (CH4)"],
      [40021, "Town North (CH4)"], [40022, "Beach (CH4)"], [40023, "Hometown"],
      [40024, "Town Apartments (CH4)"], [40025, "Town South (CH4)"], [40026, "Town School (CH4)"],
      [40027, "Town Church (CH4)"], [40028, "Graveyard (CH4)"], [40029, "Town Shelter (CH4)"],
      [40030, "Hospital Lobby (CH4)"], [40031, "Hospital Hallway (CH4)"], [40032, "Hospital Rudy (CH4)"],
      [40033, "Hospital Room2 (CH4)"], [40034, "Diner (CH4)"], [40035, "Townhall (CH4)"],
      [40036, "Flowershop 1f (CH4)"], [40037, "Flowershop 2f (CH4)"], [40038, "Library (CH4)"],
      [40039, "Alphysalley (CH4)"], [40040, "Computer Lab (CH4)"], [40041, "Library Upstairs (CH4)"],
      [40042, "Police (CH4)"], [40043, "Conbini (CH4)"], [40044, "Icee Pizza (CH4)"],
      [40045, "Church Entrance"], [40046, "Church Main"], [40047, "Noellehouse Main"],
      [40048, "Noelle's House"], [40049, "Noellehouse Bathroom"], [40050, "Noellehouse Keyroom"],
      [40051, "Noellehouse Noelle"], [40052, "Noellehouse Dess"], [40053, "Noellehouse Closet"],
      [40054, "Torielclass (CH4)"], [40055, "Schoollobby (CH4)"], [40056, "Alphysclass (CH4)"],
      [40057, "Schooldoor (CH4)"], [40058, "Insidecloset (CH4)"], [40059, "School Unusedroom (CH4)"],
      [40060, "Castle Tutorial (CH4)"], [40061, "Castle East Door (CH4)"], [40062, "Castle West Cliff (CH4)"],
      [40063, "Castle Area 1 (CH4)"], [40064, "Castle Town"], [40065, "My Castle Town"],
      [40066, "Castle Restaurant (CH4)"], [40067, "Castle Cafe (CH4)"], [40068, "Castle Dojo (CH4)"],
      [40069, "Ralsei Castle 1f (CH4)"], [40070, "Ralsei Castle 2f (CH4)"], [40071, "Castle Dungeon (CH4)"],
      [40072, "Castle Rooms Kris (CH4)"], [40073, "Castle Rooms Susie (CH4)"], [40083, "Place Menu (CH4)"],
      [40088, "Cc Lancer (CH4)"], [40089, "Cc Clover (CH4)"], [40090, "Cc Fountain (CH4)"],
      [40101, "Church Slidingbookshelf"], [40104, "Church Bellplay"], [40105, "Intro (CH4)"],
      [40106, "Church Candlelighting"], [40107, "Town Noellehouse"], [40108, "Dark Sanctuary - Atrium"],
      [40109, "Church Intro3"], [40110, "Church Intro Guei"], [40113, "Church Lantern Hallway"],
      [40115, "Dark Sanctuary - Study"], [40116, "Church Stairs West Bell"], [40117, "Church Librarybookenemy"],
      [40118, "Church Bookshelfpuzzle1"], [40119, "Church Bookshelfpuzzle2"], [40120, "Church Worshiproom"],
      [40121, "Church Swingingbell"], [40122, "Church Tallbookcases"], [40123, "Church Lantern2"],
      [40124, "Church Smallbells"], [40125, "Church Claw"], [40126, "Church Shelfclimb1"],
      [40127, "Church Statueclimb"], [40128, "Church Offering"], [40129, "Church Npcroom Shelfclimb"],
      [40130, "Church Stairs Stainedglass"], [40131, "Church Bellsareawest"], [40132, "Church Stairs Topright"],
      [40133, "Church Poolsroom1"], [40134, "Church Candlesroom1"], [40135, "Church Solowaterfall"],
      [40136, "Church Statueroom"], [40137, "Church Poolsroom2"], [40138, "Church Shelfclimb2"],
      [40139, "Church Statueclimb Npcroom"], [40140, "Church Bellhall West"], [40141, "Church Fountainconnection"],
      [40142, "Church Stainedglasspreview"], [40143, "Church Stairs Topleft"], [40144, "Church Npcroom Pools1"],
      [40145, "Church Poolsroom1 East"], [40146, "Church Minorlegend"], [40147, "Church Bookenemywest"],
      [40148, "Church Poolsroom2south"], [40149, "Church Office"], [40150, "Church Bellhall East"],
      [40151, "Church Bellhall Central"], [40154, "Ralsei Castle 3f"], [40155, "Castle Rooms Ralsei"],
      [40156, "Rotating Tower"], [40159, "Krisroom Dark"], [40162, "Noellehouse Vents West"],
      [40166, "Town Krisyard Dark (CH4)"], [40167, "Castle Rooms Queen"], [40168, "Castle Rooms Tenna"],
      [40171, "Church Ripplepuzzle"], [40173, "Church Glass"], [40174, "Church Staircase"],
      [40175, "Church Bellhall Bookroom"], [40176, "Church Bookcase"], [40177, "Dark Sanctuary - Lower Left"],
      [40178, "Church Dark Fire Puzzle"], [40179, "Church Turtles"], [40180, "Church Guei"],
      [40181, "Church Jackenstein"], [40182, "Church Bellhall Curtain"], [40184, "Church Dogclimb"],
      [40185, "Church Arena"], [40192, "Churchb Nongerson Post"], [40193, "Noellehouse Vents North"],
      [40194, "Noellehouse Vents East"], [40195, "Noellehouse Vents South"], [40205, "Church Climbtut"],
      [40206, "Church Fastwater"], [40207, "Church Crumbletower"], [40208, "Church Tower1"],
      [40209, "Church Choir"], [40210, "Church Bellclimb"], [40211, "Church Shiftclimb"],
      [40212, "Church Intropiano"], [40213, "Church Intro Gerson"], [40214, "Church Pianopiece Left"],
      [40215, "Church Northprophecies"], [40216, "Church Darkmaze"], [40217, "Church Quicktest"],
      [40218, "Church Pianopiece Right"], [40219, "Dark Sanctuary - Small Piano"], [40220, "Dark Sanctuary - Library"],
      [40221, "Church Rightconnect"], [40222, "Church Stairspreview"], [40223, "Church Trueclimbadventure"],
      [40224, "Church Organpuzzle"], [40225, "Church Mizzleencounter"], [40226, "Church Sideclimb"],
      [40227, "Church Secretpiano"], [40228, "Dark Sanctuary - Lower Right"], [40229, "Church Tallbookcases Backup"],
      [40230, "Church Fountain"], [40231, "Church B Intro"], [40232, "Churchc Final Prophecy"],
      [40233, "Church Bookshelfpuzzle"], [40234, "Noellehouse Basement"], [40235, "Church Biblioxencounter"],
      [40236, "Church Darkclimb"], [40237, "Church Moneyfountain"], [40239, "Church Pianopiece Left B"],
      [40240, "Church Pianopiece Rightprophecy"], [40242, "Church Shadowgerson"], [40243, "Church Holywatercooler"],
      [40244, "Church Rippleworship"], [40245, "Church Waterfallroom"], [40246, "Church Waterfalltearoom"],
      [40247, "Castle Rooms Kris Susie"], [40248, "2nd Sanctuary - Atrium"], [40249, "Churchb Prophecyencounter"],
      [40250, "Churchb Worshiproom"], [40251, "Churchb Libraryconnector"], [40252, "2nd Sanctuary - Floor"],
      [40253, "Churchb Rotatingtower"], [40254, "Churchb Bellroom"], [40255, "Churchb Escherstaircase"],
      [40256, "Churchb Prophecymaze"], [40257, "Churchb Rotatingtower2"], [40258, "2nd Sanctuary - Study"],
      [40259, "Churchb Gersonchase"], [40260, "Churchb Extinguisher"], [40261, "Church Knightclimb"],
      [40262, "Church Knightclimb Post"], [40263, "Rhythm (CH4)"], [40264, "Rhythm Countdown (CH4)"],
      [40265, "Rhythm Empty (CH4)"], [40266, "Rhythmgame Editor"], [40267, "Churchb Ripple1"],
      [40268, "Churchb Ripplepost"], [40269, "Churchb Library Alternate"], [40270, "Churchb Moneyfountain"],
      [40271, "3rd Sanctuary"], [40272, "Churchc Encounter1"], [40273, "Churchc Slidingpiano"],
      [40274, "Churchc Ripplesneak Poc"], [40275, "Churchc Encounter2"], [40276, "Churchc Finalclimb"],
      [40277, "Churchc Angelprophecy Encounter"], [40278, "3rd Sanctuary - Stairs"], [40279, "Churchc Darkswords"],
      [40280, "Churchc Pretitan"], [40281, "3rd Sanctuary - Last Chamber"], [40282, "Churchc Titandefeated"],
      [40283, "Churchb Fountain"], [40284, "Church Ripseq1"], [40285, "Church Ripseq2"],
      [40286, "Churchc Titanclimb1"], [40287, "Churchc Titanclimb2"], [40291, "Noellehouse North"],
      [40292, "Noellehouse Vents North West"], [40296, "Churchb Fireplace"], [40297, "Churchb Nongerson"],
      [40298, "Churchb Library"], [40299, "Castle Tv Rhythm"], [40300, "Castle Town - TV Building"],
      [40301, "Churchb Windows"], [40302, "Churchb Bookshelf"], [40303, "Churchb Man"],
      [40304, "Churchb Gallery"], [40305, "Churchb Rotatingtower Old"], [40306, "2nd Sanctuary - Study (Climbing Area)"],
      [40307, "Churchc Titanclimb1 Post"], [40308, "Churchc Titanclimb2 Post"], [40309, "Churchb Darkclimb Scene"],
      [40310, "Churchc Dodge"], [40311, "Churchc Insidetitan"], [40313, "Churchc Prophecies"],
      [40314, "Churchc Angelprophecy"], [40315, "Church Bookshelfpuzzle Rev"], [40317, "Churchc Treasurechest"],
      [40321, "Castle Tv Zone 1"], [40322, "MIKE ZONE"], [40323, "Castle Tv Zone 3"],
      [40324, "Castle Tv Zone Battle"], [40325, "Castle Tv Zone Minigame"], 
    ],
    flags: [
      [104, 'GOT_CHEST_ARMOR'], [107, 'GOT_REVIVEMINT_CHEST_107'], [109, 'GOT_DICE_BRACE_CHEST'], [110, 'GOT_FOREST_TOP_GOLD_CHEST'],
      [111, 'GOT_REVIVEMINT_CHEST_111'], [113, 'GOT_CLUBS_SANDWICH'], [114, 'GOT_REVIVEMINT'], [116, 'GOT_KEY_B_116'],
      [117, 'GOT_KEY_B_117'], [118, 'GOT_CYBER_LABYRINTH_ARMOR'], [120, 'GOT_BRIGHT_BRACELET'], [121, 'ENCOUNT_GAMESHOW_ZONE'],
      [122, 'GOT_TENSION_BIT'], [126, 'ENCOUNT_POPPUP_126'], [127, 'ENCOUNT_POPPUP_127'], [129, 'GOT_CYBER_TEACUP_WEAPON'],
      [130, 'GOT_CYBERCITY_WEAPON_CHEST'], [131, 'CYBER_CITY_BLOCKADE_ROOM'], [132, 'CYBER_BARRIER_ROOM'], [133, 'GOT_MANSION_MONEY_CHEST'],
      [134, 'GOT_CYBERCITY_ARMOR_CHEST'], [135, 'GOT_CHEESEMAZE_CHEST'], [136, 'GOT_MANSION_SECRET_CHEST'], [137, 'GOT_MANSION_BRIDGES_CHEST'],
      [141, 'GOT_MANSION_ARMOR_CHEST'], [160, 'ENCOUNT_CHURCH_ARENA'], [174, 'ENCOUNT_CHURCH_DCA08D'], [175, 'ENCOUNT_AFTER_TITAN_CLIMB2'],
      [176, 'ENCOUNT_CHURCHB'], [177, 'ENCOUNT_TITAN_CLIMB'], [186, 'CHURCHB_ENCOUNTER'], [525, 'ENCOUNT_CYBER_CHASER_A'],
      [530, 'ENCOUNT_POPPUP_530'], [534, 'CYBER_CHASER_CLEARED_534'], [535, 'BEAT_CYBER_CHASER_535'], [536, 'ENCOUNT_CHEESE_MAZE_536'],
      [537, 'ENCOUNT_CHEESE_MAZE_537'], [538, 'ENCOUNT_POPPUP_538'], [543, 'ENCOUNT_MANSION_KITCHEN'], [545, 'ENCOUNT_CYBER_CHASER_1'],
      [546, 'MANSION_ENCOUNTER'], [547, 'ENCOUNT_MANSION_EAST_WING'], [549, 'ENCOUNT_CYBER_CITY'], [551, 'CYBER_SCENE26_ENCOUNTER'],
      [552, 'CLEARED_CYBER_ENCOUNTER'], [553, 'BEAT_CYBER_CHASER_553'], [554, 'BEAT_CYBER_CHASER_554'], [555, 'BEAT_CYBER_CHASER_ENCOUNT'],
      [556, 'BEAT_CYBER_CHASER_556'], [557, 'ENCOUNT_CYBER_CHASER_2'], [558, 'TASQUE_PAINTINGS_ENCOUNTER'], [566, 'ENCOUNT_CYBER_CHASER_B'],
      [567, 'ENCOUNT_POPPUP_2'], [569, 'CYBER_CHASER_CLEARED_569'], [570, 'BEAT_CYBER_CHASER_B'], [572, 'ENCOUNT_POPPUP_572'],
      [585, 'ENCOUNT_TVSHOW_KITCHEN'], [600, 'ENCOUNT_GUEI_ALT'], [700, 'SEEN_CH4_INTRO_EVENT'], [702, 'SUSIE_DREW_ON_WINDOW'],
      [703, 'DINER_WINDOW_DRAW_STATE'], [706, 'SEEN_PDC06_CUTSCENE'], [707, 'SEEN_NOELLE_HOME_SCENE'], [708, 'CH4_INTRO_NOELLE_SCENE'],
      [709, 'SEEN_NORTH_TOWN_DOOR_EVENT'], [711, 'PARTY_COMMENTED_SIGN'], [712, 'SUSIE_KRIS_SIT_SCENE_STAGE'], [713, 'SUSIE_LWF02A_REPLY'],
      [714, 'CH4_RESIDENT_TALK_STAGE'], [715, 'HEARD_RESIDENT_LINE_715'], [716, 'HEARD_TOWNSFOLK_LINE_1'], [717, 'HEARD_RESIDENT_LINE_A'],
      [718, 'RESIDENT_TALK_PROGRESS'], [719, 'SUSIE_PRAISED_JUICE'], [720, 'ALPHYS_VENDING_SCENE_STATE'], [722, 'ALPHYS_VENDING_TALK_STAGE'],
      [723, 'ALPHYS_VENDING_SCENE_STAGE'], [726, 'PARTNER_COMMENTED_OBJECT'], [727, 'PARTY_COMMENTED_OBJECT'], [728, 'SEEN_DW_ONETIME_EVENT'],
      [731, 'HEARD_TOWNSFOLK_LINE_2'], [732, 'HEARD_RESIDENT_LINE_B'], [733, 'SEARCHED_NOELLE_DESK'], [746, 'INSPECTED_CH4_OBJECT_746'],
      [750, 'HEARD_RESIDENT_LINE_750'], [751, 'HEARD_RESIDENT_LINE_751'], [754, 'EXAMINED_CH4_OBJECT_A'], [756, 'SEEN_HOSPITAL_WARD_EVENT'],
      [757, 'EXAMINED_OBJECT_CH4'], [760, 'TALKED_MOVING_RESIDENT'], [761, 'HEARD_TOWNSFOLK_LINE_3'], [762, 'HEARD_RESIDENT_LINE_C'],
      [763, 'RESIDENT_FACED_PLAYER'], [764, 'HEARD_CH4_RESIDENT_LINE'], [767, 'TALKED_TOWN_RESIDENT'], [768, 'EXAMINED_OBJECT'],
      [769, 'EXAMINED_CH4_OBJECT_B'], [773, 'READ_SIGN'], [774, 'READ_SIGN_CH4'], [775, 'EXAMINED_CH4_OBJECT'],
      [776, 'HEARD_TOWNSFOLK_LINE_4'], [782, 'INSPECTED_OBJECT_CH4'], [786, 'RESIDENT_FACED_PLAYER_2'], [791, 'INSPECTED_CH4_OBJECT_791'],
      [792, 'ADDISON_STALL_POSE_STATE'], [793, 'CASTLE_TOWN_PARTY_STATE'], [795, 'CHURCH_STAIRS_LEGEND_STATE'], [797, 'HEARD_RESIDENT_LINE_797'],
      [798, 'TOWN_RESIDENT_SCENES_PROGRESS'], [799, 'EXAMINED_TOWN_EASTER_EGG'], [815, 'GOT_DOJO_PRIZE_CH4'], [832, 'TOOK_BROTHER_DRAWER_MONEY'],
      [833, 'DINER_WAITRESS_NO_MONEY'], [835, 'CHURCH_SAVE_FLAVOR_SEEN'], [836, 'GERSON_SHOP_GREETED'], [837, 'STARTED_GERSON_LETTER_TALK'],
      [838, 'GERSON_KNIGHT_TALE_STARTED'], [862, 'SHOWN_TEXT_LINE'], [871, 'OPENED_EMPTY_CHEST_CHURCH'], [873, 'READ_ROOM_SIGN'],
      [887, 'SEEN_CHURCH_PIANO_INTRO'], [888, 'CHURCH_PIANO_ROOM_MARK'], [889, 'CHURCH_DARK_MAZE_ROOM_889'], [890, 'CHURCH_DARK_MAZE_ROOM_890'],
      [1000, 'GOT_B3_TRASHCAN_ITEM'], [1065, 'SUSIE_RACE_MACHINE_LINE'], [1100, 'GOT_SUPERMEAL_CHEST'], [1139, 'GOT_MYSTERYPUZZLE_CHEST'],
      [1140, 'GOT_ZAPPER_C_POINTS_CHEST'], [1202, 'GOT_RIBBICKS_A_POINTS_CHEST'], [1203, 'OPENED_RIBBICKS_EMPTY_CHEST_1203'], [1204, 'GOT_RIBBICKS_CHEST'],
      [1205, 'OPENED_RIBBICKS_EMPTY_CHEST_1205'], [1206, 'GOT_RIBBICKS_POINTS_CHEST_1206'], [1207, 'GOT_RIBBICKS_POINTS_CHEST_1207'], [1209, 'OPENED_RIBBICKS_EMPTY_CHEST_1209'],
      [1213, 'GOT_SUSIE_BRIDGE_POINTS_CHEST'], [1223, 'GOT_GACHAPON_PRIZE_10'], [1251, 'SEEN_TVSHOW_SPRING_SCENE'], [1253, 'GOT_RIBBICKS_B_POINTS_CHEST'],
      [1513, 'SEEN_TEXT_ONCE_1'], [1517, 'GOT_WORSHIPROOM_ARMOR_CHEST'], [1539, 'GOT_CHURCHB_LIBRARY_CHEST'], [1540, 'GOT_CHURCH_LIBRARY_CHEST'],
      [1541, 'OPENED_CHURCH_LIBRARY_ALT_CHEST'], [1545, 'GOT_CHURCHB_GALLERY_GOLD'], [1549, 'SEEN_DIALOGUE_ONCE_A'], [1550, 'GOT_SCARLIXIR_CHEST'],
      [1554, 'SEEN_DIALOGUE_1554'], [1562, 'SEEN_LINE_1562'], [1567, 'SEEN_KNIGHT_CLIMB_LINE'], [1577, 'DIALOGUE_SHOWN_1577'],
      [1578, 'SEEN_DIALOGUE_LINE'], [1581, 'GOT_PROPHECY_MAZE_CHEST'], [1582, 'GOT_ABSORBAX_CHEST'], [1584, 'CHURCH_LIBRARY_BOOKS_STATE'],
      [1586, 'GOT_WINGLADE_CHEST'], [1587, 'GOT_RHAPSOTEA_CHEST'], [1588, 'GOT_PIANOPIECE_RIGHT_CHEST'], [1589, 'GOT_TRUECLIMB_TENSION_GEM_CHEST'],
      [1590, 'GOT_JACKENSTEIN_GOLD'], [1605, 'DIALOGUE_SHOWN_1605'], [1607, 'SEEN_DIALOGUE_LINE_2'], [1608, 'DIALOGUE_LINE_SHOWN_1608'],
      [1610, 'GOT_PRINCESSRBN_CHEST'], [1612, 'DIALOGUE_LINE_SHOWN_1612'], [1613, 'SEEN_DIALOGUE_ONCE_B'], [1614, 'GOT_CHURCHC_GOLD_CHEST'],
      [1630, 'SEEN_DIALOGUE_1630'], [1631, 'SEEN_LINE_1631'], [1632, 'SEEN_TEXT_ONCE_2'], [1633, 'DIALOGUE_SHOWN_1633'],
      [1638, 'GOT_DOG_DOLLAR_CHEST'], [1655, 'HINT_LINE_SHOWN'], [1703, 'GOT_TVDINNER_CHEST'], [1780, 'ENCOUNT_CHURCH_TURTLES'],
      [1781, 'MET_CHURCH_TURTLES'], [1782, 'ENCOUNT_CHURCH_MAZE'], [1783, 'SEEN_CHURCH_COOLER_SCENE'], [1784, 'ENCOUNT_CHURCHB_PROPHECY'],
      [1785, 'LIBRARY_PASSAGE_ENCOUNTER'], [1786, 'ENCOUNT_WORSHIPROOM_CH4'], [1788, 'ENCOUNT_BELL_ROOM'], [1789, 'CHURCH_GALLERY_ENCOUNTER'],
      [1790, 'CHURCHB_CLIMB_ENCOUNTER'], [1792, 'ENCOUNT_ORGANIKK'], [1793, 'MET_ANGEL_PROPHECY'], [1794, 'ENCOUNT_SECRET_PIANO'],
      [1795, 'MET_GUEI_INTRO'], [1796, 'ENCOUNT_BLUE_BOOK'], [1797, 'TALL_BOOKSHELF_ENCOUNTER'],
      [6, 'DISABLE_TEXT_SKIP'], [7, 'DISABLE_MENU'], [8, 'SIMPLIFY_VFX'], [9, 'BATTLE_MUSIC'],
      [10, 'WRIST_PROTECTOR'], [11, 'AUTO_RUN'], [12, 'DISABLE_SHAKING'], [13, 'USE_OLD_ATTACK'],
      [14, 'REMEMBER_BATTLE_MENU'], [15, 'SOUND_VOLUME'], [16, 'MUSIC_VOLUME'], [17, 'AUDIO_VOLUME'],
      [29, 'SUSIE_SHOW_EYES'], [30, 'RALSEI_HAT_STATE'], [34, 'CAN_PARTY_ACT'],
      [40, 'VIOLENCES'], [41, 'SPARES'], [42, 'PACIFIES'], [43, 'AUTOSUSIE_VIOLENCES'],
      [44, 'KILLS'], [45, 'FREEZES'], [61, 'DISABLE_RECRUITING'], [64, 'STORAGE_SIZE'],
      [65, 'TOTAL_LEVELED_COUNT'], [100, 'GOT_GLOWSHARD'], [106, 'GOT_MOSS_CH1'],
      [112, 'GOT_JEVIL_CHEST'], [115, 'GOT_KEY_A'], [200, 'RAN_IN_SCHOOL'],
      [207, 'MANUAL_STATUS'], [214, 'TEAM_NAME'], [220, 'THRASH_MACHINE_HEAD'],
      [221, 'THRASH_MACHINE_BODY'], [222, 'THRASH_MACHINE_SHOE'],
      [223, 'THRASH_MACHINE_HEAD_COLOR'], [224, 'THRASH_MACHINE_BODY_COLOR'],
      [225, 'THRASH_MACHINE_SHOE_COLOR'], [226, 'MADE_THRASH_MACHINE'],
      [241, 'JEVIL_PROGRESS'], [247, 'PEACEFUL_KING'], [248, 'VIOLENT_ENDING_CH1'],
      [252, 'INSPECTED_BEDS_CH1'], [253, 'GOT_SPINCAKE'], [254, 'STARWALKER'],
      [255, 'TALKED_RUDY'], [258, 'ONION_CH1'], [259, 'ONION_YOUR_NAME'],
      [260, 'ONION_NAME'], [262, 'ASGORE_FLOWERS_PROGRESS'], [263, 'EGG_FRIDGE'],
      [268, 'CALLED_IN_HOUSE'], [272, 'TIMES_CALLED_MOM'], [273, 'TALKED_SANS'],
      [274, 'GOT_SANS_PHONE'], [276, 'TALKED_NOELLE'], [277, 'ENTERED_HOME_COUNT'],
      [279, 'LOADED_LEGACY_FILE'], [309, 'SPAMTON_PROGRESS'],
      [312, 'TALKED_SEAM_CH2'], [325, 'RALSEI_PHOTO_STATUS'],
      [349, 'FROZEN_CHICKEN'], [386, 'VISITED_SPAMTON'],
      [414, 'INSPECTED_BEDS_CH2'], [421, 'NOELLE_FRIEND'],
      [424, 'ONION_CH2'], [430, 'TOOK_ASRIEL_MONEY'],
      [451, 'TALKED_ABOUT_PAP'], [453, 'TALKED_SNOWGRAVE_NEO'],
      [454, 'GOT_DEALMAKER'], [456, 'BEAT_SNOWGRAVE_NEO'], [457, 'BERDLY_BROKEN_ARM'],
      [460, 'GOT_JEVIL_HOLE'],
      [601, 'RECRUIT_DEBUG'], [602, 'RECRUIT_LANCER_1'], [603, 'RECRUIT_DUMMY'],
      [604, 'RECRUIT_RALSEI_TUTORIAL'], [605, 'RECRUIT_RUDINN'], [606, 'RECRUIT_HATHY'],
      [607, 'RECRUIT_CLOVER_1'], [609, 'RECRUIT_C_ROUND'], [610, 'RECRUIT_K_ROUND_1'],
      [611, 'RECRUIT_PONMAN'], [612, 'RECRUIT_LANCER_2'], [613, 'RECRUIT_RABBICK'],
      [614, 'RECRUIT_BLOXER'], [615, 'RECRUIT_JIGSAWRY'], [616, 'RECRUIT_CLOVER_2'],
      [617, 'RECRUIT_DOOMTANK'], [618, 'RECRUIT_LANCER_3'], [619, 'RECRUIT_SUSIE_AND_LANCER'],
      [620, 'RECRUIT_JEVIL'], [621, 'RECRUIT_K_ROUND_2'], [622, 'RECRUIT_RUDINN_RANGER'],
      [623, 'RECRUIT_HEAD_HATHY'], [625, 'RECRUIT_KING'],
      [630, 'RECRUIT_AMBYU_LANCE'], [631, 'RECRUIT_POPPUP'], [632, 'RECRUIT_TASQUE'],
      [633, 'RECRUIT_WEREWIRE'], [634, 'RECRUIT_MAUS'], [635, 'RECRUIT_VIROVIROKUN'],
      [636, 'RECRUIT_SWATCHLING'], [637, 'RECRUIT_CAPN'], [638, 'RECRUIT_K_K'],
      [639, 'RECRUIT_SWEET'], [640, 'RECRUIT_WEREWEREWIRE'], [641, 'RECRUIT_GRAZETEST'],
      [642, 'RECRUIT_TASQUE_MANAGER'], [643, 'RECRUIT_BERDLY_1'], [644, 'RECRUIT_MAUSWHEEL'],
      [645, 'RECRUIT_ROUXLS_1'], [646, 'RECRUIT_BERDLY_2'], [647, 'RECRUIT_CLOVER_DOJO'],
      [648, 'RECRUIT_QUEEN'], [649, 'RECRUIT_SPAMTON'], [650, 'RECRUIT_SPAMTON_NEO'],
      [651, 'RECRUIT_GIGA_QUEEN'], [652, 'RECRUIT_JIGSAW_JOE_DOJO'], [653, 'RECRUIT_PIPIS'],
      [654, 'RECRUIT_SHADOWGUY'], [655, 'RECRUIT_SHUTTAH'], [656, 'RECRUIT_ZAPPER'],
      [657, 'RECRUIT_RIBBICK'], [658, 'RECRUIT_WATERCOOLER'], [659, 'RECRUIT_PIPPINS'],
      [660, 'RECRUIT_ELNINA'], [661, 'RECRUIT_LANINO'], [662, 'RECRUIT_GUEI'],
      [663, 'RECRUIT_BALTHIZARD'], [664, 'RECRUIT_BIBLIOX'], [665, 'RECRUIT_MIZZLE'],
      [666, 'RECRUIT_WICABEL'], [667, 'RECRUIT_WINGLADE'], [668, 'RECRUIT_ORGANIKK'],
      [669, 'RECRUIT_MISS_MIZZLE'],
      [900, 'VESSEL_HEAD'], [901, 'VESSEL_BODY'], [902, 'VESSEL_LEGS'],
      [903, 'VESSEL_FOOD'], [904, 'VESSEL_BLOOD_TYPE'], [905, 'VESSEL_COLOR'],
      [906, 'VESSEL_FEELING'], [907, 'VESSEL_HONESTY'], [908, 'VESSEL_PAIN_SEIZURE'],
      [909, 'VESSEL_GIFT'], [910, 'EGG_ROOM_CH1'], [911, 'EGG_CH1'],
      [912, 'LANGUAGE'], [914, 'SINCE_CHAPTER'],
      [915, 'WEIRDROUTE_PROGRESS_CH2'], [916, 'WEIRDROUTE_FAILED'],
      [917, 'EGG_ROOM_CH2'], [918, 'GOT_CH2_EGG'], [919, 'TIMES_NOELLE_LEVELED'],
      [920, 'GOT_MOSS_CH2'], [921, 'GOT_MOSS_WITH_NOELLE'], [922, 'GOT_MOSS_WITH_SUSIE'],
      [923, 'FORGOT_RING'], [924, 'SNOWGRAVE_ATTEMPTS'],
      [925, 'NOELLE_ICE_SHOCK_COUNT'], [926, 'ICESHOCKED_ENCOUNTERS'],
      [930, 'EGG_CH3'], [931, 'EGG_CH4'],
      [950, 'SHADOW_FAILED_CH2'], [951, 'GLASS_FAILED_CH2'],
      [954, 'GAVE_JEVIL_CRYSTAL'], [961, 'FAILED_SPAM_CRYSTAL'],
      [1044, 'CH3_POINTS'], [1055, 'SWORD_PROGRESS'],
      [1078, 'GOT_MOSS_CH3'], [1152, 'RALSEI_HORSE'],
      [1240, 'STARWALKER_CH3'], [1248, 'TIMES_LEVELED_CH3'],
      [1255, 'SWORD_ROUTE_KILLS'], [1270, 'SHADOW_FAILED_CH3'],
      [1272, 'GLASS_FAILED_CH3'], [1592, 'GOT_MOSS_CH4'],
      [1597, 'PURIFIED_COUNT'], [1598, 'SLAIN_COUNT'],
    ],
  };

  const STORY_FLAGS = {
    1: {
      vessel: [900, 901, 902, 903, 904, 905, 909, 906, 907, 908],
      thrashMachine: [220, 221, 222, 223, 224, 225],
      darkWorld: [106, 206, 207, 241, 247, 248, 252, 253, 254, 300, 910],
      onion: [258, 259, 260],
      lightWorld: [255, 256, 257, 261, 262, 263, 265, 269, 270, 271, 273, 274, 276, 277, 278, 430],
    },
    2: {
      darkWorld: [409, 410, 411, 412, 413, 414, 916, 34, 300, 357, 920, 921, 922, 457, 307, 309, 325, 917, 915, 925, 462],
      lightWorld: [430, 422, 424, 425],
    },
    3: {
      gameshow: [1044, 1189, 1012, 1013, 1014, 1173, 1174, 1193, 1194, 1195, 1196, 1197, 1198],
      darkWorld: [1078, 930, 1071, 1222, 1226, 1240, 1045, 1047, 1055, 1092],
    },
    4: {
      darkWorld: [1592, 931, 789, 790, 852, 1045, 898, 1597],
      lightWorld: [747, 748, 744, 745, 1552, 1553, 1565, 1566, 1623, 1656, 779],
    },
  };

  const STORY_PERSIST = {
    1: { darkWorld: [40, 41, 42, 43, 100, 101, 102, 103, 105, 107, 108, 109, 110, 111, 115, 201, 203, 205, 211, 214, 215, 216, 217, 218, 226, 233, 234, 237, 240, 249, 252, 290, 501, 502, 520, 521, 522, 523, 524, 602, 603, 604, 607, 609, 610, 612, 616, 617, 618, 619, 620, 621, 625], lightWorld: [200, 255, 256, 261, 269, 273, 276, 278, 911] },
    2: { darkWorld: [44, 45, 66, 104, 119, 123, 125, 129, 130, 133, 134, 135, 136, 137, 138, 139, 141, 142, 302, 313, 327, 330, 332, 333, 335, 339, 340, 344, 346, 353, 356, 362, 367, 379, 382, 387, 388, 393, 394, 407, 418, 420, 421, 423, 435, 453, 454, 456, 460, 462, 465, 468, 528, 529, 531, 532, 533, 539, 540, 541, 542, 548, 550, 559, 560, 561, 562, 563, 564, 565, 571, 605, 606, 611, 613, 614, 615, 622, 623, 630, 631, 632, 633, 634, 635, 636, 637, 638, 639, 640, 641, 642, 643, 644, 645, 646, 647, 648, 649, 650, 651, 652, 653, 810, 811, 812, 813, 814, 914, 918, 924, 954], lightWorld: [308, 315, 316, 317, 342, 349, 422, 425, 439, 461, 928] },
    3: { darkWorld: [584, 590, 660, 661, 1007, 1029, 1059, 1060, 1062, 1068, 1084, 1094, 1095, 1099, 1100, 1101, 1112, 1139, 1148, 1176, 1200, 1214, 1215, 1216, 1217, 1218, 1228, 1233, 1252, 1268], gameshow: [580, 581, 582, 583, 586, 587, 588, 589, 591, 592, 593, 654, 655, 656, 657, 658, 659, 1000, 1002, 1004, 1006, 1017, 1019, 1026, 1035, 1036, 1040, 1041, 1042, 1043, 1048, 1049, 1050, 1067, 1074, 1075, 1076, 1077, 1086, 1089, 1093, 1097, 1103, 1104, 1106, 1107, 1111, 1114, 1122, 1135, 1137, 1138, 1140, 1142, 1144, 1145, 1147, 1150, 1152, 1161, 1162, 1164, 1169, 1171, 1177, 1178, 1179, 1180, 1181, 1184, 1185, 1187, 1188, 1191, 1199, 1201, 1202, 1203, 1204, 1205, 1206, 1207, 1208, 1209, 1210, 1211, 1212, 1213, 1219, 1220, 1221, 1223, 1230, 1231, 1243, 1244, 1253, 1255, 1267, 1273, 1274, 1275, 1276, 1277, 1278] },
    4: { darkWorld: [23, 128, 140, 662, 663, 664, 665, 666, 667, 668, 669, 701, 704, 705, 706, 710, 815, 832, 850, 853, 854, 872, 875, 1500, 1501, 1502, 1503, 1514, 1517, 1523, 1524, 1525, 1526, 1530, 1537, 1538, 1539, 1540, 1541, 1545, 1547, 1550, 1559, 1569, 1581, 1582, 1586, 1587, 1588, 1589, 1590, 1593, 1594, 1595, 1598, 1606, 1610, 1614, 1616, 1638, 1661, 1688, 1698, 1699, 1700, 1703, 1787], lightWorld: [733, 1551, 1619, 1620, 1621, 1657] },
  };

  const maps = Object.fromEntries(Object.entries(DATA).map(([key, value]) => [key, new Map(value)]));

  class LineCursor {
    constructor(content) {
      this.lines = String(content).trim().split(/\r?\n/);
      this.position = 0;
    }
    nextString() {
      if (this.position >= this.lines.length) throw new Error(`Неожиданный конец файла на строке ${this.position + 1}`);
      return this.lines[this.position++];
    }
    nextNumber() {
      const value = this.nextString().trim().toLowerCase();
      if (!value || value === 'null' || value === 'undefined' || value === 'nan') return 0;
      const parsed = Number(value);
      if (Number.isNaN(parsed)) throw new Error(`Не удалось прочитать число на строке ${this.position}: "${value}"`);
      return parsed;
    }
    skip(count) {
      this.position = Math.min(this.position + count, this.lines.length);
    }
    get totalLines() {
      return this.lines.length;
    }
  }

  function detectFormat(lineCount) {
    if (lineCount >= SAVE_META[1].totalLines && lineCount <= SAVE_META[1].totalLines + 10) return 1;
    if (lineCount >= SAVE_META[2].totalLines && lineCount <= SAVE_META[2].totalLines + 10) return 2;
    return null;
  }

  function detectChapter(save) {
    const hint = save.meta && Number(save.meta.chapterHint);
    if (hint >= 1 && hint <= 4) return hint;

    if (save.meta.format === 1) return 1;

    const room = Number(save.room);
    if (room >= 40000 && room < 50000) return 4;
    if (room >= 30000 && room < 40000) return 3;
    if (room >= 20000 && room < 30000) return 2;

    const sinceChapter = Number(save.flags[914]);
    if (sinceChapter >= 2 && sinceChapter <= 4) return sinceChapter;
    return 2;
  }

  function normalizeRoomId(roomId, chapter) {
    const r = Number(roomId);
    if (!Number.isFinite(r)) return r;
    if (r >= 10000) return r;
    const ch = Number(chapter);
    if (ch >= 1 && ch <= 4) return ch * 10000 + r;
    return r;
  }

  function detectCompletion(save) {
    return Number(save.room) === 18;
  }

  function readCharacter(cursor, format) {
    const character = {
      health: cursor.nextNumber(),
      maxHealth: cursor.nextNumber(),
      attack: cursor.nextNumber(),
      defence: cursor.nextNumber(),
      magic: cursor.nextNumber(),
      guts: cursor.nextNumber(),
      weapon: cursor.nextNumber(),
      primaryArmor: cursor.nextNumber(),
      secondaryArmor: cursor.nextNumber(),
      weaponStyle: format === 1 ? cursor.nextString().trim() : cursor.nextNumber(),
      weaponStats: [],
      spells: [],
    };
    for (let i = 0; i < 4; i += 1) {
      const stat = {
        attack: cursor.nextNumber(),
        defence: cursor.nextNumber(),
        magic: cursor.nextNumber(),
        bolts: cursor.nextNumber(),
        grazeAmount: cursor.nextNumber(),
        grazeSize: cursor.nextNumber(),
        boltSpeed: cursor.nextNumber(),
        special: cursor.nextNumber(),
      };
      if (format === 2) {
        stat.element = cursor.nextNumber();
        stat.elementAmount = cursor.nextNumber();
      }
      character.weaponStats.push(stat);
    }
    for (let i = 0; i < 12; i += 1) character.spells.push(cursor.nextNumber());
    return character;
  }

  function parseSave(content, meta = {}) {
    const cursor = new LineCursor(content);
    const format = detectFormat(cursor.totalLines);
    if (!format) {
      throw new Error(`Формат сохранения не распознан: ${cursor.totalLines} строк. Ожидалось около ${SAVE_META[1].totalLines} или ${SAVE_META[2].totalLines}.`);
    }
    const playerName = cursor.nextString();
    const vesselName = cursor.nextString();

    const otherNames = [];
    for (let i = 0; i < 5; i += 1) otherNames.push(cursor.nextString());
    const save = {
      meta: {
        format,
        createdAt: Date.now(),
        modifiedAt: Date.now(),
        chapter: format === 1 ? 1 : 2,
        slot: 0,
        isCompletionSave: false,
        name: meta.name || playerName || 'Save',
      },
      playerName,
      vesselName,
      otherNames,
      party: [cursor.nextNumber(), cursor.nextNumber(), cursor.nextNumber()],
      money: cursor.nextNumber(),
      xp: cursor.nextNumber(),
      lv: cursor.nextNumber(),
      inv: cursor.nextNumber(),
      invc: cursor.nextNumber(),
      inDarkWorld: !!cursor.nextNumber(),
      characters: [],
      battle: {},
      inventory: { consumables: [], keyItems: [], weapons: [], armors: [] },
      lightWorld: { items: [], phone: [] },
      flags: [],
      plot: 0,
      room: 0,
      time: 0,
    };
    save.meta.eol = String(content).includes('\r\n') ? '\r\n' : '\n';
    for (let i = 0; i < SAVE_META[format].characterCount; i += 1) save.characters.push(readCharacter(cursor, format));
    save.battle.boltSpeed = cursor.nextNumber();
    save.battle.grazeAmount = cursor.nextNumber();
    save.battle.grazeSize = cursor.nextNumber();
    for (let i = 0; i < 13; i += 1) {
      save.inventory.consumables.push(cursor.nextNumber());
      save.inventory.keyItems.push(cursor.nextNumber());
      if (format === 1) {
        save.inventory.weapons.push(cursor.nextNumber());
        save.inventory.armors.push(cursor.nextNumber());
      }
    }
    if (format === 2) {
      for (let i = 0; i < 48; i += 1) {
        save.inventory.weapons.push(cursor.nextNumber());
        save.inventory.armors.push(cursor.nextNumber());
      }
      save.inventory.storage = [];
      for (let i = 0; i < 72; i += 1) save.inventory.storage.push(cursor.nextNumber());
    }
    save.battle.tension = cursor.nextNumber();
    save.battle.maxTension = cursor.nextNumber();
    Object.assign(save.lightWorld, {
      weapon: cursor.nextNumber(),
      armor: cursor.nextNumber(),
      experience: cursor.nextNumber(),
      level: cursor.nextNumber(),
      money: cursor.nextNumber(),
      health: cursor.nextNumber(),
      maxHealth: cursor.nextNumber(),
      attack: cursor.nextNumber(),
      defence: cursor.nextNumber(),
      weaponStrength: cursor.nextNumber(),
      armorDefence: cursor.nextNumber(),
    });
    for (let i = 0; i < 8; i += 1) {
      save.lightWorld.items.push(cursor.nextNumber());
      save.lightWorld.phone.push(cursor.nextNumber());
    }
    for (let i = 0; i < SAVE_META[format].flagCount; i += 1) save.flags.push(cursor.nextNumber());
    save.plot = cursor.nextNumber();
    save.room = cursor.nextNumber();
    save.time = cursor.nextNumber();
    save.meta.chapter = detectChapter(save);
    return save;
  }

  function serializeNumber(value) {
    const number = Number(value);
    if (!Number.isFinite(number)) return '0';
    if (number >= 1e6) return number.toExponential().replace(/e\+(\d)$/, 'e+0$1');
    return String(number);
  }

  function pushCharacter(lines, character, format, noSpace) {
    ['health', 'maxHealth', 'attack', 'defence', 'magic', 'guts', 'weapon', 'primaryArmor', 'secondaryArmor'].forEach((key) => lines.push(serializeNumber(character[key])));
    if (format === 1 && noSpace) noSpace.add(lines.length);
    lines.push(format === 1 ? String(character.weaponStyle || 'Normal').trim() : serializeNumber(character.weaponStyle));
    for (let i = 0; i < 4; i += 1) {
      const stat = character.weaponStats[i] || {};
      ['attack', 'defence', 'magic', 'bolts', 'grazeAmount', 'grazeSize', 'boltSpeed', 'special'].forEach((key) => lines.push(serializeNumber(stat[key])));
      if (format === 2) {
        lines.push(serializeNumber(stat.element));
        lines.push(serializeNumber(stat.elementAmount));
      }
    }
    for (let i = 0; i < 12; i += 1) lines.push(serializeNumber(character.spells[i]));
  }

  function serializeSave(save) {
    const format = save.meta.format;
    const noSpace = new Set();
    const on = save.otherNames || [];
    const lines = [save.playerName || '', save.vesselName || '', on[0] || '', on[1] || '', on[2] || '', on[3] || '', on[4] || ''];
    save.party.forEach((value) => lines.push(serializeNumber(value)));
    ['money', 'xp', 'lv', 'inv', 'invc'].forEach((key) => lines.push(serializeNumber(save[key])));
    lines.push(save.inDarkWorld ? '1' : '0');
    for (let i = 0; i < SAVE_META[format].characterCount; i += 1) pushCharacter(lines, save.characters[i] || emptyCharacter(format), format, noSpace);
    ['boltSpeed', 'grazeAmount', 'grazeSize'].forEach((key) => lines.push(serializeNumber(save.battle[key])));
    for (let i = 0; i < 13; i += 1) {
      lines.push(serializeNumber(save.inventory.consumables[i]));
      lines.push(serializeNumber(save.inventory.keyItems[i]));
      if (format === 1) {
        lines.push(serializeNumber(save.inventory.weapons[i]));
        lines.push(serializeNumber(save.inventory.armors[i]));
      }
    }
    if (format === 2) {
      for (let i = 0; i < 48; i += 1) {
        lines.push(serializeNumber(save.inventory.weapons[i]));
        lines.push(serializeNumber(save.inventory.armors[i]));
      }
      for (let i = 0; i < 72; i += 1) lines.push(serializeNumber(save.inventory.storage?.[i]));
    }
    lines.push(serializeNumber(save.battle.tension));
    lines.push(serializeNumber(save.battle.maxTension));
    ['weapon', 'armor', 'experience', 'level', 'money', 'health', 'maxHealth', 'attack', 'defence', 'weaponStrength', 'armorDefence'].forEach((key) => lines.push(serializeNumber(save.lightWorld[key])));
    for (let i = 0; i < 8; i += 1) {
      lines.push(serializeNumber(save.lightWorld.items[i]));
      lines.push(serializeNumber(save.lightWorld.phone[i]));
    }
    for (let i = 0; i < SAVE_META[format].flagCount; i += 1) lines.push(serializeNumber(save.flags[i]));
    lines.push(serializeNumber(save.plot));
    lines.push(serializeNumber(save.room));
    lines.push(serializeNumber(save.time));
    const eol = (save.meta && save.meta.eol) || '\r\n';
    return lines.map((line, index) => (index <= 6 || noSpace.has(index) ? line : `${line} `)).join(eol);
  }

  function emptyCharacter(format) {
    return {
      health: 0, maxHealth: 0, attack: 0, defence: 0, magic: 0, guts: 0,
      weapon: 0, primaryArmor: 0, secondaryArmor: 0, weaponStyle: format === 1 ? 'Normal' : 0,
      weaponStats: Array.from({ length: 4 }, () => ({ attack: 0, defence: 0, magic: 0, bolts: 0, grazeAmount: 0, grazeSize: 0, boltSpeed: 0, special: 0, element: 0, elementAmount: 0 })),
      spells: Array(12).fill(0),
    };
  }

  function createDemoSave() {
    const save = {
      meta: { format: 2, createdAt: Date.now(), modifiedAt: Date.now(), chapter: 2, slot: 0, isCompletionSave: false, name: 'DEMO SAVE' },
      playerName: 'KRIS', vesselName: 'VESSEL', party: [1, 2, 3], money: 1284, xp: 0, lv: 2, inv: 0, invc: 0, inDarkWorld: true,
      characters: Array.from({ length: 5 }, (_, index) => ({ ...emptyCharacter(2), health: [90, 110, 70, 80, 60][index] || 0, maxHealth: [90, 110, 70, 80, 60][index] || 0, attack: 10 + index, defence: 2 + index, magic: index === 2 ? 8 : 0, guts: 0, weapon: [1, 2, 3, 12, 0][index] || 0, primaryArmor: 1, secondaryArmor: 0, spells: index === 0 ? [7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] : index === 1 ? [4, 5, 11, 0, 0, 0, 0, 0, 0, 0, 0, 0] : index === 2 ? [2, 3, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0] : index === 3 ? [2, 8, 9, 0, 0, 0, 0, 0, 0, 0, 0, 0] : Array(12).fill(0) })),
      battle: { boltSpeed: 0, grazeAmount: 0, grazeSize: 0, tension: 0, maxTension: 100 },
      inventory: { consumables: [1, 2, 8, 16, 18, 21, 27, 0, 0, 0, 0, 0, 0], keyItems: [1, 8, 9, 13, 14, 0, 0, 0, 0, 0, 0, 0, 0], weapons: Array(48).fill(0), armors: Array(48).fill(0), storage: Array(72).fill(0) },
      lightWorld: { weapon: 2, armor: 3, experience: 0, level: 1, money: 126, health: 20, maxHealth: 20, attack: 10, defence: 2, weaponStrength: 0, armorDefence: 0, items: [2, 3, 8, 0, 0, 0, 0, 0], phone: [201, 202, 0, 0, 0, 0, 0, 0] },
      flags: Array(SAVE_META[2].flagCount).fill(0),
      plot: 80, room: 20121, time: 46080,
    };
    save.inventory.weapons.splice(0, 5, 1, 2, 3, 14, 16);
    save.inventory.armors.splice(0, 5, 1, 2, 8, 10, 11);
    save.flags[914] = 2;
    save.flags[605] = 1;
    save.flags[606] = 1;
    save.flags[613] = 1;
    save.flags[614] = 1;
    save.flags[630] = 1;
    save.flags[631] = 1;
    save.flags[632] = 1;
    save.flags[635] = 1;
    return save;
  }

  function optionLabel(kind, value) {
    return maps[kind]?.get(Number(value)) || `#${value}`;
  }

  function roomLabel(roomId, chapter) {
    const id = normalizeRoomId(roomId, chapter);
    return maps.rooms?.get(Number(id)) || `Room ${roomId}`;
  }

  window.KnightCore = {
    SAVE_META,
    DATA,
    STORY_FLAGS,
    STORY_PERSIST,
    parseSave,
    serializeSave,
    createDemoSave,
    detectChapter,
    detectCompletion,
    optionLabel,
    roomLabel,
  };
})();
