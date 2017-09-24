/**
 * Triggers animations by emiting events
 * DIRTY!!!
 */
export default function triggerAnimations(state, action) {
  const { type } = action;
  const { activeCamera } = state;

  // When the level starts
  // Start the Oppenheimer timer
  if (activeCamera === 'level') {
    playerOppie();
  }

  console.log('type', type);
  switch (type) {
    case 'touchDelivery':
      playRollingOrange();
      break;
    default:
      // no default
  }

  return state;
}

function playRollingOrange() {
  const elm = document.getElementById('rollingOrange');
  const alongpath = elm.getAttribute('alongpath');

  console.log('playRollingOrange', elm, alongpath);
  // start playing the path
  alongpath.isPlaying = true;
  elm.setAttribute('alongpath', alongpath);
}

function playerOppie() {
  const elm = document.getElementById('oppie');
  const alongpath = elm.getAttribute('alongpath');

  // start playing the path
  alongpath.isPlaying = true;
  elm.setAttribute('alongpath', alongpath);
}
