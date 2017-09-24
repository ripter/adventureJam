/**
 * Manages the activeCamera property on state.
 */
export default function activeCamera(state, action) {
  if (action.type !== 'completeIntro') { return state; }
  
  // Change the active camera from the intro screen to the level.
  state.activeCamera = 'level';
  return state;
}
