export default function defaultState() {
  return {
    activeCamera: 'intro',
    isOrangeInPlace: false,
    puzzle: {
      lockOrange: false,
      lockSoldier: false,
    },
    animations: {
      soldier: 'stopped',
    },
  };
}
