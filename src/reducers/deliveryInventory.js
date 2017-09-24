/**
 * [Description]
 */
export default function deliveryInventory(state, action) {
  const isValid = (action.type !== 'deliveryPickup') && (action.type !== 'deliveryDropoff')
  if (isValid) { return state; }

  console.log('deliveryInventory', action.type);

  return state;
}
