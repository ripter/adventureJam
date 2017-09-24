import eventToMethod from '../utils/eventToMethod.js';

AFRAME.registerComponent('charge-fuse', eventToMethod({
  schema: {
  },

  /**
   * Called once at the beginning of the component’s lifecycle
   * reference: https://aframe.io/docs/0.6.0/core/component.html#init
   */
  init() {
    const { el } = this;

    console.log('charge-fuse', this);
    el.addEventListener('fusing', this);
  },
  /**
   * Called whenever the component is detached from the entity
   * reference: https://aframe.io/docs/0.6.0/core/component.html#remove
   */
  remove() {
    const { el } = this;

    el.removeEventListener('fusing', this);
  },

  /**
   * Called on each tick or frame of the scene’s render loop (60 to 120 times per second).
   * reference: https://aframe.io/docs/0.6.0/core/component.html#tick-time-timedelta
   * @param  {Number} time  Global uptime of the scene in milliseconds.
   * @param  {Number} delta The time difference in milliseconds since the last frame.
   */
  tick(time, delta) {
  },

  onFusing(event) {
    const { el } = this;
    const { intersectedEl, intersection, target } = event.detail;
    const canClick = intersectedEl.getAttribute('can-click');

    // play the animation
    el.emit('play-fuse');
  },
}));
