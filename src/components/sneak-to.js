import eventToMethod from '../utils/eventToMethod.js';

/**
 * sneak-to component
 * Events:
 *  click: moves cursor.closest('.does-sneak') twords target.
 * @type {Object}
 */
AFRAME.registerComponent('sneak-to', eventToMethod({
  schema: {
    duration: {default: 3050},
  },

  /**
   * Called once at the beginning of the component’s lifecycle
   * reference: https://aframe.io/docs/0.6.0/core/component.html#init
   */
  init() {
    const { el } = this;
    el.addEventListener('click', this);
  },
  /**
   * Called whenever the component is detached from the entity
   * reference: https://aframe.io/docs/0.6.0/core/component.html#remove
   */
  remove() {
    const { el } = this;
    el.removeEventListener('click', this);
  },

  onClick(event) {
    console.log('onClick', event);
    const { cursorEl, target } = event.detail;
    const srcElm = cursorEl.closest('.does-sneak');
    const destObject3D = target.object3D;
    const srcObject3D = srcElm.object3D;
    // Get positions relative to the world, not our local grouping.
    const srcPosition = srcObject3D.getWorldPosition();
    const destPosition = destObject3D.getWorldPosition();
    // No flying, don't change y axis
    destPosition.y = srcPosition.y;
    // Create a line for the srcElm to travel.
    const path = new THREE.Line3(srcPosition, destPosition);
    console.log('path', path);

    this.srcElm = srcElm;
    this.linePath = path;
  },

  update() {},
  /**
   * Called on each tick or frame of the scene’s render loop (60 to 120 times per second).
   * reference: https://aframe.io/docs/0.6.0/core/component.html#tick-time-timedelta
   * @param  {Number} time  Global uptime of the scene in milliseconds.
   * @param  {Number} delta The time difference in milliseconds since the last frame.
   */
  tick: function (time, delta) {
    const { linePath, srcElm } = this;
    const { duration } = this.data;
    if (!linePath) { return; }
    // Calculate the potision along the line.
    // 0 is start of the line, 1 is end of the line.
    let position = .5;

    const newPosition = linePath.at(position);
    console.log('newPosition', newPosition);
    srcElm.setAttribute('position', newPosition);
    delete this.linePath;
  },
  pause: function () {},
  play: function () {},
}));
