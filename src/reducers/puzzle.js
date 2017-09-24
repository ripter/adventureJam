/**
 * [Description]
 */
export default function puzzle(state, action) {
  const { type } = action;
  console.log('puzzle logic');

  switch (type) {
    case 'touchDelivery':
      console.log('Puzzle Piece: Move Orange');
      break;
    case 'touchSoldier':
      console.log('Puzzle Piece: Move Soldier');
      break;
    case 'touchTable':
      console.log('Puzzle Piece: Move Table');
      break;
    default:

  }
  return state;
}
