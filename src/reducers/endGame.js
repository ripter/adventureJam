/**
 * [Description]
 */
export default function endGame(state, action) {
  if (action.type !== 'endGame') { return state; }
  const { isOrangeInPlace, activeCamera } = state;


  state.activeCamera = 'intro';
  return state;
}
