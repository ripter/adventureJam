import 'aframe';
import 'aframe-spritesheet-component';
import 'aframe-animation-component';
import 'aframe-curve-component';
import '@ripter/aframe-alongpath-component';
import './components/active-camera.js';

import './store.js';
import dispatchAction from './utils/dispatchAction.js';


document.addEventListener('DOMContentLoaded', function() {
  console.log('Game Ready!', arguments);
});

// User can click anywhere to dismiss the intro screen
document.addEventListener('click', function() {
  dispatchAction({
    type: 'completeIntro'
  });
});
