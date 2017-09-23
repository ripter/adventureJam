import Store from '@ripter/store';

const store = new Store({}, [

], function() {
  console.log('Store.onChange', arguments);
  const event = new Event('store-changed');
  document.dispatchEvent(event);
});
