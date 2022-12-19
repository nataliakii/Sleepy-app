/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
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
      <Routes>
        <Route exact path="/" element={<Main user={user} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route exact path="/personal" element={<Personal user={user} />} />
        <Route path="/sleepy-form-post" element={<SleepyForm user={user} />} />
        <Route path="/personal/sleepy-form-get" element={<SleepyResults />} />
        <Route path="/personal/all-docs-display" element={<AllDocsDisplay />} />
        <Route path="/personal/edit" element={<EditProfile user={user} />} />
        <Route path="/tips-sleep" element={<TipsSleep />} />
        <Route path="/find-playground" element={<FindPlayground />} />
        <Route path="/find-restaurant" element={<FindRestaurant />} />
      </Routes>
    </div>
  );
};

export default App;
