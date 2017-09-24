import 'aframe';
import 'aframe-spritesheet-component';
import 'aframe-animation-component';
import 'aframe-curve-component';
import '@ripter/aframe-alongpath-component';
import './components/active-camera.js';
import './components/event-to-action.js';

import './store.js';
import dispatchAction from './utils/dispatchAction.js';


document.addEventListener('DOMContentLoaded', function() {
  console.log('Game Ready!', arguments);
});

// User can click anywhere to dismiss the intro screen
// document.addEventListener('click', completeIntro);
// function completeIntro() {
//   dispatchAction({
//     type: 'completeIntro'
//   });
//
//   //WARNING: Can only play once!
//   document.removeEventListener('click', completeIntro);
// }
