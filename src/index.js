import 'aframe';
import 'aframe-spritesheet-component';
import 'aframe-animation-component';


document.addEventListener("DOMContentLoaded", function() {
  const player = document.getElementById('player');
  const npc = document.getElementById('npc');

  // look-controls add the wasd-controls, remove it so we can do pure minecraft-controls
  // player.removeAttribute('wasd-controls');
  console.log('Game Ready!');

  playJump(npc);
});

function playJump(entity) {


  // set the animation frames
  entity.setAttribute('sprite-sheet', 'firstFrame: 0; lastFrame: 5');
  console.log('playJump', entity);
}
