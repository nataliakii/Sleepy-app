/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser } from '../actions';

const App = (props) => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.auth.authenticated);

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchUser());
    }
  }, [authenticated, dispatch]);
  return <div>{props.children}</div>;
};

export default App;
