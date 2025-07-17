import React from 'react';
import ReactDOM from 'react-dom/client';
import { configureStore } from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={configureStore({})}>
    <BrowserRouter
      basename={process.env.PUBLIC_URL}
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true, // optional, if you're handling that warning too
      }}
    >
      <App />
    </BrowserRouter>
  </Provider>
);
reportWebVitals();
