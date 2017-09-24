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

    // enable clicking via look
    // enableCursor();
  }

  return state;
}

function enableCursor() {
  const elm = document.getElementById('cursor');
  const cursor = elm.getAttribute('cursor');

  cursor.fuse = true;
  elm.setAttribute('cursor', cursor);
}
