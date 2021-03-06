import Store from '@ripter/store';
import defaultState from './defaultState.js';
import dispatchChange from './utils/dispatchChange.js';

import startGame from './reducers/startGame.js';
import endGame from './reducers/endGame.js';
import triggerAnimations from './reducers/triggerAnimations.js';
import deliveryInventory from './reducers/deliveryInventory.js';
import log from './reducers/log.js';
import puzzle from './reducers/puzzle.js'

// Create a store to hold the game logic
const store = new Store(defaultState(), [
  // Reducers
  startGame,
  endGame,
  puzzle,

  // Dirty non-pure, side-effects in the reducers after this line.
  // log,
  triggerAnimations,
  deliveryInventory,
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
