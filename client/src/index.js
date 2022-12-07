/* eslint-disable no-unused-vars */
/* eslint-disable import/no-named-as-default-member */
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
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
import SleepyGet from './components/SleepyGet';
import AllDocsDisplay from './components/AllDocsDisplay';
import EditProfile from './components/EditProfile';
import TipsSleep from './components/TipsSleep';
import FindPlayground from './components/FindPlayground';

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
          <Nav />
          <App>
            <Bar />
            <Switch>
              <Route
                exact
                path="/"
                component={(props) => <Main {...props} />}
              />
              <Route
                exact
                path="/signup"
                component={(props) => <Signup {...props} />}
              />
              <Route
                exact
                path="/signin"
                component={(props) => <Signin {...props} />}
              />
              <Route
                exact
                path="/personal"
                component={(props) => <Personal {...props} />}
              />
              <Route
                exact
                path="/sleepy-form-post"
                component={(props) => <SleepyForm {...props} />}
              />
              <Route
                exact
                path="/sleepy-form-get"
                component={(props) => <SleepyGet {...props} />}
              />
              <Route
                exact
                path="/all-docs-display"
                component={(props) => <AllDocsDisplay {...props} />}
              />
              <Route
                exact
                path="/edit"
                component={(props) => <EditProfile {...props} />}
              />
              <Route exact path="/tips-sleep" component={TipsSleep} />
              <Route exact path="/find-playground" component={FindPlayground} />
            </Switch>
          </App>
          <Footer />
        </>
      </Router>
    </Provider>
  </React.StrictMode>
);
