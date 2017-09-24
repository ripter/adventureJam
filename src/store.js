import Store from '@ripter/store';
import dispatchChange from './utils/dispatchChange.js';

import activeCamera from './reducers/activeCamera.js';
import endGame from './reducers/endGame.js';

// Create a store to hold the game logic
const store = new Store({
  // Inital State
  activeCamera: 'intro',
  isOrangeInPlace: false,
}, [
  // Reducers
  activeCamera,
  endGame,
], function() {
  // On State Change, trigger a store-change event so components can update.
  const state = store.getState();
  dispatchChange(state);
});

// Listen for store-action events, this allows components to trigger actions.
document.addEventListener('store-action', function(event) {
  const { detail } = event;
  // perform the action on the store.
  store.action(detail);
});
