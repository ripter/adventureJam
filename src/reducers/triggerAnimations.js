/**
 * Triggers animations by emiting events
 * DIRTY!!!
 * This is needed because the alongpath component can not play on event yet.
 * So we need to emit action on alongpath-trigger-activated, listen for the action, then trigger the play.
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
  switch (type) {
    case 'touchDelivery':
      playPath('rollingOrange');
      break;
    case 'touchSoldier':
      playPath('soldier');
      break;
    case 'toggleDeliveryInventory':
      console.log('updating Inventory');
      updateInventory('deliveryInventory');
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

function updateInventory(elmID) {
  const elm = document.getElementById(elmID);
  const visible = elm.getAttribute('visible');

  elm.setAttribute('visible', !visible);
}
