
/**
 * Adds a handleEvent method to object.
 * This translates events like `click` to `obj.onClick(event)`
 * Listen to events with `addEventListener('click', obj);`
 * Stop listening to events with `removeEventListener('click', obj);`
 * @param  {Object} obj
 * @return {Object}
 */
export default function eventToMethod(obj) {
  obj.handleEvent = handleEvent;
  return obj;
}


/**
* Effecent and safe way to map methods to event listeners
* reference: https://medium.com/@WebReflection/dom-handleevent-a-cross-platform-standard-since-year-2000-5bf17287fd38
* @param  {Event} event
*/
export function handleEvent(event) {
  let { type } = event;
  // convert the first letter to upper case so the method is formatted like `click -> Click`
  type = type.replace(/\w/, (l) => l.toUpperCase())
  // convert dash to upperc case like `model-loaded -> modelLoaded`
  type = type.replace(/-\w/, (l) => l.substr(1).toUpperCase())
  const methodName = `on${type}`;
  // call the method, passing in the event.
  this[methodName](event);
}
