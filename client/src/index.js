import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { Fragment } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { applyMiddleware } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

import rootReducer from "./reducers/index";
import App from "./components/App";

const store = configureStore(
  { reducer: rootReducer },
  {},
  applyMiddleware(thunk)
);

// const createStoreWithMiddleware = applyMiddleware(promise)(configureStore);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <>
          <App />
          {/* <Footer /> */}
        </>
      </Router>
    </Provider>
  </React.StrictMode>
);
