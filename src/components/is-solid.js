import eventToMethod from '../utils/eventToMethod.js';

AFRAME.registerComponent('is-solid', eventToMethod({
  schema: {
  },

  /**
   * Called once at the beginning of the component’s lifecycle
   * reference: https://aframe.io/docs/0.6.0/core/component.html#init
   */
  init: function () {
    const { el } = this;

    console.log('is-solid init', el);
    el.addEventListener('collide', this);
    el.addEventListener('body-loaded', this);
    el.addEventListener('click', this);
  },
  /**
   * Called whenever the component is detached from the entity
   * reference: https://aframe.io/docs/0.6.0/core/component.html#remove
   */
  remove: function () {
    el.removeEventListener('collide', this);
    el.removeEventListener('body-loaded', this);
    el.removeEventListener('click', this);
  },

  update: function () {},
  /**
   * Called on each tick or frame of the scene’s render loop (60 to 120 times per second).
   * reference: https://aframe.io/docs/0.6.0/core/component.html#tick-time-timedelta
   * @param  {Number} time  Global uptime of the scene in milliseconds.
   * @param  {Number} delta The time difference in milliseconds since the last frame.
   */
  tick: function (time, delta) {
  },
  pause: function () {},
  play: function () {},

  onCollide(event) {
     console.log('is-solid onCollide', event);
     debugger;
  },

  onBodyLoaded(event) {
    console.log('is-solid onBodyLoaded', event.detail);
    // debugger;
  },

  onClick(event) {
    console.log('is-solid onClick', event);
  },
}));
