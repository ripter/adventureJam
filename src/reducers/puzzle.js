/**
 * [Description]
 */
export default function puzzle(state, action, nextAction) {
  const { type } = action;
  const { puzzle } = state;
  const { lockOrange, lockSoldier } = puzzle;

  switch (type) {
    case 'pieceLockOrange':
      puzzle.lockOrange = true;
      break;
    case 'pieceLockSoldier':
      // Soldier only locks if the orange has locked.
      if (lockOrange) {
        puzzle.lockSoldier = true;
      }
      break;
    default:
      // ignore
  }

  // Update the puzzle state
  state.puzzle = puzzle;
  return state;
}
