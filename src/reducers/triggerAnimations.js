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
    playPath('oppie');
  }

  // Actions for starting animations
  // This is needed because the alongpath component can not play on event yet.
  // So we need to listen for the action, then trigger the play.
  switch (type) {
    case 'touchDelivery':
      playPath('rollingOrange');
      break;
    case 'touchSoldier':
      playPath('soldier');
      break;
    default:
      // no default
  }

  return state;
}

function playPath(elmID) {
  const elm = document.getElementById(elmID);
  const alongpath = elm.getAttribute('alongpath');

  // start playing the path
  alongpath.isPlaying = true;
  elm.setAttribute('alongpath', alongpath);
}
