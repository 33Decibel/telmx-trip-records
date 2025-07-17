import React from 'react';
// Import Scss
import './assets/scss/themes.scss';
// Import Route
import Route from './Routes';

function App() {
  // Set passive: true globally for touchstart
  const originalAddEventListener = EventTarget.prototype.addEventListener;

  EventTarget.prototype.addEventListener = function (type, listener, options) {
    if (type === 'touchstart') {
      if (options === undefined) {
        options = { passive: true };
      } else if (typeof options === 'boolean') {
        options = { capture: options, passive: true };
      } else if (typeof options === 'object' && options !== null) {
        options = { ...options, passive: true };
      }
    }
    return originalAddEventListener.call(this, type, listener, options);
  };
  return (
    <React.Fragment>
      <Route />
    </React.Fragment>
  );
}

export default App;
