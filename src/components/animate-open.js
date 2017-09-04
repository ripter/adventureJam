AFRAME.registerComponent('animate-open', {
  schema: {
  },

  /**
   * Called once at the beginning of the component’s lifecycle
   * reference: https://aframe.io/docs/0.6.0/core/component.html#init
   */
  init: function () {
    const { el } = this;

    this.mixer = null;
    el.addEventListener('model-loaded', this);
  },
  /**
   * Called whenever the component is detached from the entity
   * reference: https://aframe.io/docs/0.6.0/core/component.html#remove
   */
  remove: function () {
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

  onModelLoaded: function(event) {
    const { model } = event.detail;
    const mesh = model.getObjectByName('skin_0');
    const clips = mesh.geometry.animation;

    this.mixer = new THREE.AnimationMixer(mesh);
    // debugger;
    console.log('mesh', mesh);
  },

  /**
   * Effecent and safe way to map methods to event listeners
   * reference: https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
   * @param  {Event} event
   */
  handleEvent: function(event) {
    let { type } = event;
    // convert the first letter to upper case so the method is formatted like `click -> Click`
    type = type.replace(/\w/, (l) => l.toUpperCase())
    // convert dash to upperc case like `model-loaded -> modelLoaded`
    type = type.replace(/-\w/, (l) => l.substr(1).toUpperCase())
    const methodName = `on${type}`;
    // call the method, passing in the event.
    this[methodName](event);
  },
});
