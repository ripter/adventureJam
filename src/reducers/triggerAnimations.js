/**
 * Triggers animations by emiting events
 * DIRTY!!!
 */
export default function triggerAnimations(state, action) {
  const { activeCamera } = state;

  // When the level starts
  // Start the Oppenheimer timer
  if (activeCamera === 'level') {
    const elm = document.getElementById('oppie');
    const alongpath = elm.getAttribute('alongpath');

    // start playing the path
    alongpath.isPlaying = true;
    elm.setAttribute('alongpath', alongpath);
  }

  return state;
}
