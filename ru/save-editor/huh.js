(function () {
  'use strict';
  var heart = document.getElementById('eggHeart');
  if (!heart) return;


  var st = document.createElement('style');
  st.textContent =
    '#eggHeart{cursor:pointer;transition:box-shadow .15s,transform .15s;}' +
    '#eggHeart img{transition:filter .15s;}' +
    '#eggHeart.glow{animation:eggHeartPulse .55s ease-in-out infinite;border-color:#ff2b5e !important;box-shadow:0 0 0 3px rgba(255,43,94,.35),0 0 18px 4px rgba(255,43,94,.85) !important;}' +
    '#eggHeart.glow img{filter:drop-shadow(0 0 6px #ff2b5e) brightness(1.6) saturate(1.4);}' +
    '@keyframes eggHeartPulse{0%,100%{transform:scale(1);}50%{transform:scale(1.22);}}';
  document.head.appendChild(st);

  var armed = false, t = null;
  heart.addEventListener('click', function (e) {
    e.preventDefault();
    if (!armed) {

      armed = true;
      heart.classList.add('glow');

      clearTimeout(t);
      t = setTimeout(function () { armed = false; heart.classList.remove('glow'); }, 4000);
      return;
    }

    clearTimeout(t);

    try { sessionStorage.setItem('kn-where', Date.now().toString(36)); } catch (err) {}
    window.location.href = 'q/index.html';
  });
})();
