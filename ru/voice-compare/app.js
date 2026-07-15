(function () {
  'use strict';
  var DATASETS = {
    1: window.__VOICE_COMPARE_CH1 || null,
    2: window.__VOICE_COMPARE_CH2 || null,
    3: window.__VOICE_COMPARE_CH3 || null,
    4: window.__VOICE_COMPARE_CH4 || null,
    5: window.__VOICE_COMPARE_CH5 || null
  };
  var currentChapter = 5;
  var data = DATASETS[currentChapter] || { chapter: currentChapter, objects: [], team: '' };
  var objects = data.objects || [];
  var teams = normalizeTeams(data);
  var sharedJapaneseByChapter = {
    1: data.sharedJapanese || [],
    5: [
    'snd_flowery_coin_big',
    'snd_flowery_voiceclip_blingo_blizzard',
    'snd_flowery_voiceclip_calling_for_help',
    'snd_flowery_voiceclip_flowery',
    'snd_flowery_voiceclip_get_a_chance_2',
    'snd_flowery_voiceclip_goodbye',
    'snd_flowery_voiceclip_hah',
    'snd_flowery_voiceclip_hereicome',
    'snd_flowery_voiceclip_hereicomesanfrandisco_weak',
    'snd_flowery_voiceclip_hey',
    'snd_flowery_voiceclip_hoo',
    'snd_flowery_voiceclip_huh',
    'snd_flowery_voiceclip_huhillshowyou',
    'snd_flowery_voiceclip_nonono',
    'snd_flowery_voiceclip_powering_up',
    'snd_flowery_voiceclip_sanfran',
    'snd_flowery_voiceclip_spiral_dance',
    'snd_flowery_voicenoise_1',
    'snd_flowery_voicenoise_2',
    'snd_flowery_voicenoise_3',
    'snd_flowery_voicenoise_loop',
    'snd_lo',
    'snd_ol',
    'snd_ruoy',
    'snd_your',
      'snd_your_long'
    ]
  };
  var sharedJapaneseTracks = new Set(sharedJapaneseByChapter[currentChapter]);
  var query = document.getElementById('query');
  var clear = document.getElementById('clear');
  var rows = document.getElementById('rows');
  var count = document.getElementById('count');
  var speedSlider = document.getElementById('speedSlider');
  var speedNumber = document.getElementById('speedNumber');
  var speedValue = document.getElementById('speedValue');
  var speedPresets = document.getElementById('speedPresets');
  var chapterSelect = document.getElementById('voiceChapter');
  var heroChapter = document.getElementById('heroChapter');
  var voiceTable = document.getElementById('voiceTable');
  var headerRow = document.getElementById('headerRow');
  var wallpaperToggle = document.getElementById('wallpaperToggle');
  var russianOnlyButton = document.getElementById('russianOnly');
  var speedPanel = document.querySelector('.speed-panel');
  speedPanel.insertAdjacentHTML('afterend', '<div class="volume-panel"><div class="speed-head"><span>\u041e\u0431\u0449\u0430\u044f \u0433\u0440\u043e\u043c\u043a\u043e\u0441\u0442\u044c</span><strong id="volumeValue">100%</strong></div><div class="volume-body"><input class="volume-slider" id="volumeSlider" type="range" min="0" max="200" step="1" value="100" aria-label="\u041e\u0431\u0449\u0430\u044f \u0433\u0440\u043e\u043c\u043a\u043e\u0441\u0442\u044c, \u0434\u043e 200 \u043f\u0440\u043e\u0446\u0435\u043d\u0442\u043e\u0432"><label class="volume-number-wrap"><input class="volume-number" id="volumeNumber" type="text" inputmode="numeric" value="100" aria-label="\u0413\u0440\u043e\u043c\u043a\u043e\u0441\u0442\u044c \u0432 \u043f\u0440\u043e\u0446\u0435\u043d\u0442\u0430\u0445, \u0434\u043e 200"><span>%</span></label></div></div>');
  var volumeSlider = document.getElementById('volumeSlider');
  var volumeNumber = document.getElementById('volumeNumber');
  var volumeValue = document.getElementById('volumeValue');
  var SPEED_KEY = 'voice-compare-ch5-speed-v1';
  var VOLUME_KEY = 'voice-compare-ch5-volume-v1';
  var CHAPTER_KEY = 'voice-compare-chapter-v1';
  var WALLPAPER_KEY = 'voice-compare-wallpaper-dim-v1';
  var RUSSIAN_ONLY_KEY = 'voice-compare-russian-only-v1';
  var speed = 1;
  var volume = 1;
  var russianOnly = false;
  var audioContext = null;
  var masterGain = null;
  var audioSources = new WeakMap();

  function queryStoreKey() {
    return 'voice-compare-ch' + currentChapter + '-state-v1';
  }

  function setWallpaperDim(dimmed, saveChoice) {
    document.documentElement.classList.toggle('wallpaper-dim', dimmed);
    wallpaperToggle.setAttribute('aria-pressed', dimmed ? 'true' : 'false');
    wallpaperToggle.textContent = dimmed ? 'Убрать затемнение' : 'Затемнить обои';
    if (saveChoice) try { localStorage.setItem(WALLPAPER_KEY, dimmed ? '1' : '0'); } catch (_) {}
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, function (char) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char];
    });
  }

  function normalizeTeams(dataset) {
    var source = Array.isArray(dataset.teams)
      ? dataset.teams
      : (dataset.team ? [{ name: dataset.team, side: dataset.teamSide || 'dumpycats', objects: dataset.teamObjects || dataset.objects }] : []);
    return source.map(function (team) {
      var trackMap = {};
      Object.keys(team.tracks || {}).forEach(function (object) {
        var files = Array.isArray(team.tracks[object]) ? team.tracks[object] : [team.tracks[object]];
        trackMap[object] = files.filter(Boolean).map(String);
      });
      var teamObjectList = Array.isArray(team.objects)
        ? team.objects.slice()
        : (Object.keys(trackMap).length ? [] : (dataset.objects || []).slice());
      Object.keys(trackMap).forEach(function (object) {
        if (teamObjectList.indexOf(object) === -1) teamObjectList.push(object);
      });
      return { name: team.name, side: team.side, objectSet: new Set(teamObjectList), trackMap: trackMap };
    });
  }

  function teamFilesForObject(team, object) {
    if (team.trackMap[object]) return team.trackMap[object];
    return team.objectSet.has(object) ? [object] : [];
  }

  function setRussianOnly(value, saveChoice, rerender) {
    russianOnly = Boolean(value);
    russianOnlyButton.setAttribute('aria-pressed', russianOnly ? 'true' : 'false');
    if (saveChoice) try { localStorage.setItem(RUSSIAN_ONLY_KEY, russianOnly ? '1' : '0'); } catch (_) {}
    if (rerender) render();
  }

  function audioPath(side, object) {
    return '../../assets/audio/voice-compare/ch' + data.chapter + '/' + side + '/' + encodeURIComponent(object) + '.mp3';
  }

  function formatSpeed(value) {
    return Number(value).toFixed(2).replace(/0+$/, '').replace(/\.$/, '').replace('.', ',');
  }

  function parseSpeed(value) {
    var parsed = Number(String(value).trim().replace(',', '.'));
    return Number.isFinite(parsed) ? Math.max(0.1, Math.min(2, parsed)) : speed;
  }

  function setSpeed(value, save) {
    speed = parseSpeed(value);
    speedSlider.value = String(speed);
    speedNumber.value = formatSpeed(speed);
    speedValue.textContent = formatSpeed(speed) + '×';
    speedPresets.querySelectorAll('[data-speed]').forEach(function (button) {
      button.classList.toggle('on', Math.abs(Number(button.dataset.speed) - speed) < 0.001);
    });
    document.querySelectorAll('audio').forEach(function (audio) { audio.playbackRate = speed; });
    if (save) try { localStorage.setItem(SPEED_KEY, String(speed)); } catch (_) {}
  }

  function parseVolume(value) {
    var parsed = Number(String(value).trim().replace(',', '.'));
    return Number.isFinite(parsed) ? Math.max(0, Math.min(200, Math.round(parsed))) : Math.round(volume * 100);
  }

  function ensureAudioGraph(audio) {
    var AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      audio.volume = Math.min(1, volume);
      return;
    }
    if (!audioContext) {
      audioContext = new AudioContextClass();
      masterGain = audioContext.createGain();
      masterGain.gain.value = volume;
      masterGain.connect(audioContext.destination);
    }
    if (!audioSources.has(audio)) {
      var source = audioContext.createMediaElementSource(audio);
      source.connect(masterGain);
      audioSources.set(audio, source);
    }
    audio.volume = 1;
    if (audioContext.state === 'suspended') audioContext.resume().catch(function () {});
  }

  function setVolume(value, save) {
    var percent = parseVolume(value);
    volume = percent / 100;
    volumeSlider.value = String(percent);
    volumeNumber.value = String(percent);
    volumeValue.textContent = percent + '%';
    if (masterGain && audioContext) masterGain.gain.setValueAtTime(volume, audioContext.currentTime);
    document.querySelectorAll('audio').forEach(function (audio) {
      audio.volume = audioSources.has(audio) ? 1 : Math.min(1, volume);
    });
    if (save) try { localStorage.setItem(VOLUME_KEY, String(percent)); } catch (_) {}
  }

  function formatTime(value) {
    if (!Number.isFinite(value) || value < 0) return '–:––';
    var seconds = Math.floor(value % 60);
    return Math.floor(value / 60) + ':' + String(seconds).padStart(2, '0');
  }

  function playerHtml(side, object, teamName) {
    var label = side === 'original' ? 'Оригинал English' : (side === 'original-ja' ? 'Оригинал 日本語' : teamName);
    var isTeam = side !== 'original' && side !== 'original-ja';
    var playerClass = isTeam ? ' team' : (side === 'original-ja' ? ' japanese' : '');
    var path = audioPath(side, object);
    var fileSuffix = side === 'original' ? '-en' : (side === 'original-ja' ? '-ja' : '-' + side);
    return '<div class="audio-player' + playerClass + '">' +
      '<button class="player-btn player-toggle" type="button" aria-label="Воспроизвести: ' + escapeHtml(label) + '">▶</button>' +
      '<input class="player-seek" type="range" min="0" max="1000" step="1" value="0" aria-label="Позиция дорожки">' +
      '<span class="player-time">0:00 / –:––</span>' +
      '<a class="player-download" href="' + path + '" download="' + escapeHtml(object + fileSuffix + '.mp3') + '" title="Скачать MP3" aria-label="Скачать ' + escapeHtml(label) + ' в MP3"><span aria-hidden="true">↓</span></a>' +
      '<audio preload="none" src="' + path + '"></audio></div>';
  }

  function wirePlayers() {
    document.querySelectorAll('.audio-player').forEach(function (player) {
      var audio = player.querySelector('audio');
      var toggle = player.querySelector('.player-toggle');
      var seek = player.querySelector('.player-seek');
      var time = player.querySelector('.player-time');
      audio.playbackRate = speed;
      audio.volume = Math.min(1, volume);

      function updateTime() {
        var progress = audio.duration ? Math.min(1000, Math.round(audio.currentTime / audio.duration * 1000)) : 0;
        seek.value = String(progress);
        seek.style.setProperty('--seek', (progress / 10) + '%');
        time.textContent = formatTime(audio.currentTime) + ' / ' + formatTime(audio.duration);
      }
      toggle.addEventListener('click', function () {
        if (audio.paused) {
          toggle.textContent = '…';
          audio.playbackRate = speed;
          if (audio.readyState === 0) audio.load();
          ensureAudioGraph(audio);
          audio.play().catch(function (error) {
            if (!error || error.name !== 'NotAllowedError') player.classList.add('error');
            toggle.textContent = '▶';
          });
        } else audio.pause();
      });
      seek.addEventListener('input', function () {
        if (audio.duration) audio.currentTime = Number(seek.value) / 1000 * audio.duration;
        seek.style.setProperty('--seek', (Number(seek.value) / 10) + '%');
      });
      audio.addEventListener('loadedmetadata', updateTime);
      audio.addEventListener('durationchange', updateTime);
      audio.addEventListener('timeupdate', updateTime);
      audio.addEventListener('play', function () { player.classList.add('playing'); toggle.textContent = 'Ⅱ'; toggle.setAttribute('aria-label', 'Пауза'); });
      audio.addEventListener('pause', function () { player.classList.remove('playing'); toggle.textContent = '▶'; toggle.setAttribute('aria-label', 'Воспроизвести'); });
      audio.addEventListener('ended', function () { audio.currentTime = 0; updateTime(); });
      audio.addEventListener('error', function () { player.classList.add('error'); toggle.textContent = '!'; });
    });
  }

  function render() {
    var needle = query.value.trim().toLowerCase();
    var filtered = objects.filter(function (object) {
      var matchesQuery = !needle || object.toLowerCase().indexOf(needle) !== -1;
      var hasRussianTrack = teams.some(function (team) { return teamFilesForObject(team, object).length > 0; });
      return matchesQuery && (!russianOnly || hasRussianTrack);
    });
    var hasTeam = teams.length > 0;
    var columnCount = 3 + teams.length;
    var objectWidth = teams.length >= 3 ? 18 : (teams.length > 1 ? 24 : (hasTeam ? 28 : 36));
    var contentWidth = (100 - objectWidth) / (2 + teams.length);
    voiceTable.classList.toggle('no-team', !hasTeam);
    voiceTable.classList.toggle('many-teams', teams.length >= 3);
    voiceTable.style.setProperty('--object-column-width', objectWidth + '%');
    voiceTable.style.setProperty('--content-column-width', contentWidth + '%');
    headerRow.querySelectorAll('.team-header').forEach(function (header) { header.remove(); });
    teams.forEach(function (team) {
      headerRow.insertAdjacentHTML('beforeend', '<th class="team-header">' + escapeHtml(team.name) + '</th>');
    });
    count.innerHTML = 'Найдено: <b>' + filtered.length.toLocaleString('ru-RU') + '</b> <span>из ' + objects.length.toLocaleString('ru-RU') + '</span>';
    if (!filtered.length) {
      rows.innerHTML = '<tr><td class="empty" colspan="' + columnCount + '">Звуковые объекты не найдены.</td></tr>';
      return;
    }
    rows.innerHTML = filtered.map(function (object) {
      var safe = escapeHtml(object);
      var japaneseTrack = sharedJapaneseTracks.has(object)
        ? '<div class="shared-track"><span aria-hidden="true">—</span> одинаковые дорожки с eng</div>'
        : playerHtml('original-ja', object);
      var teamCells = teams.map(function (team) {
        var teamFiles = teamFilesForObject(team, object);
        var teamTrack = teamFiles.length
          ? '<div class="team-track-stack">' + teamFiles.map(function (file) {
              var fileLabel = teamFiles.length > 1 ? '<code class="team-track-id">' + escapeHtml(file) + '</code>' : '';
              return '<div class="team-track-entry">' + fileLabel + playerHtml(team.side, file, team.name) + '</div>';
            }).join('') + '</div>'
          : '<div class="team-missing" aria-label="Нет дорожки команды">—</div>';
        return '<td class="team-cell" data-label="' + escapeHtml(team.name) + '">' + teamTrack + '</td>';
      }).join('');
      return '<tr><td><code class="sound-id">' + safe + '</code></td>' +
        '<td>' + playerHtml('original', object) + '</td>' +
        '<td>' + japaneseTrack + '</td>' +
        teamCells + '</tr>';
    }).join('');
    wirePlayers();
  }

  function activateChapter(value, restoreQuery) {
    var nextChapter = Number(value);
    var nextData = DATASETS[nextChapter];
    if (!nextData) return;
    currentChapter = nextChapter;
    data = nextData;
    objects = data.objects || [];
    teams = normalizeTeams(data);
    var sharedJapanese = data.sharedJapanese === true
      ? objects
      : (data.sharedJapanese || sharedJapaneseByChapter[currentChapter] || []);
    if (data.localizedJapanese) {
      var localizedJapanese = new Set(data.localizedJapanese);
      sharedJapanese = objects.filter(function (object) { return !localizedJapanese.has(object); });
    }
    sharedJapaneseTracks = new Set(sharedJapanese);
    chapterSelect.value = String(currentChapter);
    heroChapter.textContent = 'ГЛАВА ' + currentChapter;
    if (restoreQuery) try { query.value = localStorage.getItem(queryStoreKey()) || ''; } catch (_) { query.value = ''; }
    render();
  }

  document.addEventListener('play', function (event) {
    if (event.target.tagName !== 'AUDIO') return;
    document.querySelectorAll('audio').forEach(function (audio) { if (audio !== event.target) audio.pause(); });
  }, true);
  query.addEventListener('input', function () {
    render();
    try { localStorage.setItem(queryStoreKey(), query.value); } catch (_) {}
  });
  clear.addEventListener('click', function () { query.value = ''; render(); query.focus(); try { localStorage.removeItem(queryStoreKey()); } catch (_) {} });
  speedPresets.addEventListener('click', function (event) {
    var button = event.target.closest('[data-speed]');
    if (button) setSpeed(button.dataset.speed, true);
  });
  speedSlider.addEventListener('input', function () { setSpeed(speedSlider.value, true); });
  function commitSpeedNumber() { setSpeed(speedNumber.value, true); }
  speedNumber.addEventListener('change', commitSpeedNumber);
  speedNumber.addEventListener('blur', commitSpeedNumber);
  speedNumber.addEventListener('keydown', function (event) { if (event.key === 'Enter') { commitSpeedNumber(); speedNumber.blur(); } });
  volumeSlider.addEventListener('input', function () { setVolume(volumeSlider.value, true); });
  function commitVolumeNumber() { setVolume(volumeNumber.value, true); }
  volumeNumber.addEventListener('change', commitVolumeNumber);
  volumeNumber.addEventListener('blur', commitVolumeNumber);
  volumeNumber.addEventListener('keydown', function (event) { if (event.key === 'Enter') { commitVolumeNumber(); volumeNumber.blur(); } });
  if (chapterSelect) chapterSelect.addEventListener('change', function () {
    try {
      localStorage.setItem(queryStoreKey(), query.value);
      localStorage.setItem(CHAPTER_KEY, chapterSelect.value);
    } catch (_) {}
    activateChapter(chapterSelect.value, true);
  });
  wallpaperToggle.addEventListener('click', function () {
    setWallpaperDim(!document.documentElement.classList.contains('wallpaper-dim'), true);
  });
  russianOnlyButton.addEventListener('click', function () {
    setRussianOnly(!russianOnly, true, true);
  });
  try { speed = parseSpeed(localStorage.getItem(SPEED_KEY) || '1'); } catch (_) { speed = 1; }
  try { volume = parseVolume(localStorage.getItem(VOLUME_KEY) || '100') / 100; } catch (_) { volume = 1; }
  try { russianOnly = localStorage.getItem(RUSSIAN_ONLY_KEY) === '1'; } catch (_) { russianOnly = false; }
  if (chapterSelect) try {
    var savedChapter = localStorage.getItem(CHAPTER_KEY);
    Array.prototype.some.call(chapterSelect.options, function (option) {
      if (option.value === savedChapter && !option.disabled) { chapterSelect.value = savedChapter; return true; }
      return false;
    });
  } catch (_) {}
  setWallpaperDim(document.documentElement.classList.contains('wallpaper-dim'), false);
  window.addEventListener('beforeunload', function () {
    try {
      localStorage.setItem(queryStoreKey(), query.value);
      localStorage.setItem(SPEED_KEY, String(speed));
      localStorage.setItem(VOLUME_KEY, String(Math.round(volume * 100)));
      localStorage.setItem(RUSSIAN_ONLY_KEY, russianOnly ? '1' : '0');
      if (chapterSelect) localStorage.setItem(CHAPTER_KEY, chapterSelect.value);
    } catch (_) {}
  });
  setSpeed(speed, false);
  setVolume(volume * 100, false);
  setRussianOnly(russianOnly, false, false);
  activateChapter(chapterSelect ? chapterSelect.value : '5', true);
})();
