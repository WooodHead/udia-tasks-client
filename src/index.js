import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ReactGA from "react-ga";

import configureStore from "./modules/store";
import App from "./components/App";
import registerServiceWorker from "./registerServiceWorker";

const store = configureStore();
const supportsHistory = "pushState" in window.history;
const rootElement = document.getElementById("root");

ReactGA.initialize(process.env.REACT_APP_GA_CODE);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter forceRefresh={!supportsHistory}>
      <App />
    </BrowserRouter>
  </Provider>,
  rootElement
);
registerServiceWorker();
