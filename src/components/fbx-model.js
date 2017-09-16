import 'three';
// For whatever reason, Three keeps a lot of useful code in examples, like the loader
import 'three/examples/js/loaders/FBXLoader.js';
import eventToMethod from '../utils/eventToMethod.js';

// All FBX models can share the same loader.
const loader = new THREE.FBXLoader(THREE.DefaultLoadingManager);

AFRAME.registerComponent('fbx-model', eventToMethod({
  schema: {type: 'asset'},

  /**
   * Called once at the beginning of the component’s lifecycle
   * reference: https://aframe.io/docs/0.6.0/core/component.html#init
   */
  init() {
    const { el } = this;
  },
  /**
   * Called whenever the component is detached from the entity
   * reference: https://aframe.io/docs/0.6.0/core/component.html#remove
   */
  remove() {
    const { el } = this;
  },

  /**
   * Called whenever the component’s properties change,
   * including at the beginning of the component’s lifecycle.
   * reference https://aframe.io/docs/0.6.0/core/component.html#update-olddata
   */
  update() {
    const src = this.data;
    console.log('fbx-model src', src);
    if (!src) { return; }

    loader.load(src, function() {
      console.log('loaded', arguments);
    });
  },
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
}));
