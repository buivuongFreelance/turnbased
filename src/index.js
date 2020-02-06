import React from "react";
import ReactDOM from "react-dom";

import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";

import { store, persistor } from "./redux/store";

import App from "./app";

import { PersistGate } from "redux-persist/integration/react";

alertify.set('notifier', 'position', 'top-right');
alertify.set('notifier', 'delay', 3);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root'));
