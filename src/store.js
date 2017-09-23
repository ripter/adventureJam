import Store from '@ripter/store';

const store = new Store({
  activeCamera: 'cameraIntro',
}, [

], function() {
  console.log('Store.onChange', arguments);
  const event = new Event('store-changed');
  document.dispatchEvent(event);
});

// Listen for action events
document.addEventListener('store-action', function(event) {
  console.log('store-action', event);
});
