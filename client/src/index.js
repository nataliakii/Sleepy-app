/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

import rootReducer from './reducers/index';
import Nav from './components/Nav';
import Footer from './components/Footer';
import App from './components/App';
import Main from './components/Main';
import Bar from './components/Bar';
import Personal from './components/Personal';
import Signup from './components/auth/Signup';
import Signin from './components/auth/Signin';
import SleepyForm from './components/SleepyForm';
import TipsSleep from './components/TipsSleep';
import SleepyResults from './components/SleepyResults';
import AllDocsDisplay from './components/AllDocsDisplay';
import EditProfile from './components/EditProfile';
import FindPlayground from './components/FindPlayground';
import FindRestaurant from './components/FindRestaurant';

const store = configureStore(
  { reducer: rootReducer },
  {},
  applyMiddleware(thunk)
);

// const createStoreWithMiddleware = applyMiddleware(promise)(configureStore);
const root = ReactDOM.createRoot(document.getElementById('root'));

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
