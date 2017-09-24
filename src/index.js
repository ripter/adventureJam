import 'aframe';
import 'aframe-spritesheet-component';
import 'aframe-animation-component';
import 'aframe-curve-component';
import '@ripter/aframe-alongpath-component';
import './components/active-camera.js';
import './components/event-to-action.js';
import './components/actor-delivery-driver.js';

import './store.js';
import dispatchAction from './utils/dispatchAction.js';

document.addEventListener('DOMContentLoaded', function() {
  console.log('Game Ready!', arguments);
});
