import dispatchAction from '../utils/dispatchAction.js';

AFRAME.registerComponent('action-endgame', {
  schema: {
    onEvents: {default: ['click', 'alongpath-trigger-activated']},
  },

  /**
   * Called once at the beginning of the component’s lifecycle
   * reference: https://aframe.io/docs/0.6.0/core/component.html#init
   */
  init() {
    const { el } = this;
    const { onEvents } = this.data;

    onEvents.forEach((eventName) => {
      el.addEventListener(eventName, this);
    });
  },
  /**
   * Called whenever the component is detached from the entity
   * reference: https://aframe.io/docs/0.6.0/core/component.html#remove
   */
  remove() {
    const { el } = this;
    const { onEvents } = this.data;

    onEvents.forEach((eventName) => {
      el.removeEventListener(eventName, this);
    });
  },

  handleEvent(event) {
    console.log('action-endgame', event.type, event);
    dispatchAction({
      type: 'endGame'  
    });
  }
});
