/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { fetchUser } from '../actions';
import Main from './Main';
import Nav from './Nav';
import Bar from './Bar';
import Personal from './Personal';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import SleepyForm from './SleepyForm';
import TipsSleep from './TipsSleep';
import SleepyResults from './SleepyResults';
import AllDocsDisplay from './AllDocsDisplay';
import EditProfile from './EditProfile';
import FindPlayground from './FindPlayground';
import FindRestaurant from './FindRestaurant';

const App = () => {
  const dispatch = useDispatch();

  const { token } = localStorage;
  useEffect(() => {
    if (token) {
      dispatch(fetchUser(token));
    }
  }, [dispatch, token]);
  const user = useSelector((state) => state.auth || null);

  return (
    <div>
      <Nav user={user} />
      <Bar />
      <Switch>
        <Route exact path="/" render={() => <Main user={user} />} />
        <Route path="/signup" component={Signup} />
        <Route path="/signin" component={Signin} />
        <Route exact path="/personal" render={() => <Personal user={user} />} />
        <Route
          path="/sleepy-form-post"
          render={() => <SleepyForm user={user} />}
        />
        <Route path="/personal/sleepy-form-get" component={SleepyResults} />
        <Route path="/personal/all-docs-display" component={AllDocsDisplay} />
        <Route
          path="/personal/edit"
          render={() => <EditProfile user={user} />}
        />
        <Route path="/tips-sleep" component={TipsSleep} />
        <Route path="/find-playground" component={FindPlayground} />
        <Route path="/find-restaurant" component={FindRestaurant} />
      </Switch>
    </div>
  );
};

export default App;
