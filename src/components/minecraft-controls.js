const KEYCODE_TO_CODE = {
  '38': 'ArrowUp',
  '37': 'ArrowLeft',
  '40': 'ArrowDown',
  '39': 'ArrowRight',
  '87': 'W',
  '65': 'A',
  '83': 'S',
  '68': 'D',
};
// https://github.com/aframevr/aframe/blob/master/src/utils/index.js#L213-L221
const canCaptureKey = AFRAME.utils.shouldCaptureKeyEvent;

AFRAME.registerComponent('minecraft-controls', {
  schema: {
     fly: {default: false},
  },

  /**
   * Called once at the beginning of the component’s lifecycle
   * reference: https://aframe.io/docs/0.6.0/core/component.html#init
   */
  init: function () {
    this.isDown = {
      KeyW: false,
      KeyS: false,
      KeyD: false,
      KeyA: false,
      Space: false,
      ShiftLeft: false,
    };

    // Create a vector to handle the movement details.
    this.velocity = new THREE.Vector3();
    this.rotationEuler = new THREE.Euler(0, 0, 0, 'YXZ');
    // bind event listeners
    window.addEventListener('keydown', this);
    window.addEventListener('keyup', this);
  },
  /**
   * Called whenever the component is detached from the entity
   * reference: https://aframe.io/docs/0.6.0/core/component.html#remove
   */
  remove: function () {
    // unbind event listeners
    window.removeEventListener('keydown', this);
    window.removeEventListener('keyup', this);
  },

  /**
   * Updates this.velocity
   * @return {[type]} [description]
   */
  updateVelocity: function(delta) {
    const { velocity, isDown } = this;
    const acceleration = .25 * delta;
    const hasKeyDown = Object.keys(isDown).find((keyCode) =>  isDown[keyCode]);

    // Stop moving when the user stops pressing the button.
    if (!hasKeyDown) {
      this.velocity = velocity.set(0, 0, 0);
      return this.velocity;
    }

    // left
    if (isDown.KeyD) {
      velocity.x += acceleration;
    }
    // right
    if (isDown.KeyA) {
      velocity.x -= acceleration;
    }
    // forward
    if (isDown.KeyW) {
      velocity.z -= acceleration;
    }
    // backword
    if (isDown.KeyS) {
      velocity.z += acceleration;
    }
    // jump up
    if (isDown.Space) {
      velocity.y += acceleration;
    }
    // drop down
    if (isDown.ShiftLeft) {
      velocity.y -= acceleration;
    }

    this.velocity = velocity;
    return velocity;
  },


  update: function () {},
  /**
   * Called on each tick or frame of the scene’s render loop (60 to 120 times per second).
   * reference: https://aframe.io/docs/0.6.0/core/component.html#tick-time-timedelta
   * @param  {Number} time  Global uptime of the scene in milliseconds.
   * @param  {Number} delta The time difference in milliseconds since the last frame.
   */
  tick: function (time, delta) {
    const { el, rotationEuler } = this;
    const velocity = this.updateVelocity(delta/100);
    const rotation = el.getAttribute('rotation');
    let position = el.getAttribute('position');
    let movement = velocity.clone().multiplyScalar(delta/100);

    // Transform direction relative to heading.
    rotationEuler.set(0, THREE.Math.degToRad(rotation.y), 0);
    movement.applyEuler(rotationEuler);

    // Add the movement to the current position
    position = movement.add(position);
    el.setAttribute('position', position);
  },
  pause: function () {},
  play: function () {},

  onKeyup: function(event) {
    const { code } = event;
    // Check for a value so we can ignore keys not in the isDown object.
    if (this.isDown[code] === true) {
      this.isDown[code] = false;
    }
  },

  onKeydown: function(event) {
    const { code } = event;
    // Check for a value so we can ignore keys not in the isDown object.
    if (this.isDown[code] === false) {
      this.isDown[code] = true;
    }
  },

  /**
   * Effecent and safe way to map methods to event listeners
   * reference: https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
   * @param  {Event} event
   */
  handleEvent: function(event) {
    const { type } = event;
    // convert the first letter to upper case so the method is formatted like `onKeyup`, `onClick`
    const methodName = 'on' + type.replace(/\w/, (l) => l.toUpperCase())
    this[methodName](event);
  },
});
