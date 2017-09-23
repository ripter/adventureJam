import 'aframe';
import 'aframe-spritesheet-component';
import 'aframe-animation-component';
import 'aframe-curve-component';
import '@ripter/aframe-alongpath-component';
import './store.js';
import './components/store-action.js';


document.addEventListener('DOMContentLoaded', function() {
  console.log('Game Ready!', arguments);
});

document.addEventListener('store-changed', function() {
  console.log('store-changed recieved', arguments);
});

document.addEventListener('store-action', function() {
  console.log('store-changed recieved', arguments);
});

document.addEventListener('click', function() {
  console.log('click', arguments);
});
