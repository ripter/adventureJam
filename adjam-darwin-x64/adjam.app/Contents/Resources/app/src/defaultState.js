export default function defaultState() {
  return {
    activeCamera: 'intro',
    isOrangeInPlace: false,
    puzzle: {
      lockDelivery: false,
      lockSoldier: false,
      lockOrange: false,
    },
    animations: {
      soldier: 'stopped',
    },
  };
}
