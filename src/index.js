import 'aframe';
import 'aframe-physics-system';
import 'aframe-curve-component';
import 'aframe-alongpath-component';
import 'aframe-animation-component';
import './components/sneak-to.js';


document.addEventListener("DOMContentLoaded", function() {
  const player = document.getElementById('player');

  // look-controls add the wasd-controls, remove it so we can do pure minecraft-controls
  // player.removeAttribute('wasd-controls');
  console.log('Game Ready!');
});
