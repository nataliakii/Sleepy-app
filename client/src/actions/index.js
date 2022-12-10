/* eslint-disable no-unused-vars */
import axios from 'axios';

const authUrl = 'http://localhost:5000/auth/';

export const fetchUser = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const response = await axios.get(`${authUrl}current_user`, config);
    dispatch({ type: 'AUTH_USER', payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const signout = (callback) => (dispatch) => {
  localStorage.removeItem('token');

  dispatch({ type: 'AUTH_USER', payload: '' });
  callback();
};

export const signin = (formProps, callback) => (dispatch) => {
  axios
    .post(`${authUrl}signin`, formProps)
    .then((response) => {
      dispatch({ type: 'AUTH_USER', payload: response.data });
      localStorage.setItem('token', response.data.token);
      callback();
    })
    .catch((error) => {
      dispatch({ type: 'AUTH_ERROR', payload: error });
    });
};

export const signup = (formProps, callback) => (dispatch) => {
  axios
    .post(`${authUrl}signup`, formProps)
    .then((response) => {
      dispatch({ type: 'AUTH_USER', payload: response.data });
      localStorage.setItem('token', response.data.token);
      callback();
    })
    .catch((error) => {
      dispatch({
        type: 'AUTH_ERROR',
        payload: error.response.data.error,
      });
    });
};

export const postForm = (sleepData, callback) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const response = await axios.post(
      'http://localhost:5000/api/sleepy_post',
      { sleepData },
      config
    );
    console.log(response);
    dispatch({ type: 'POST_SLEEP', payload: response.data.sleepyDoc });
    callback();
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllDocs = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const response = await axios.get(
      'http://localhost:5000/api/sleepy_get_all',
      config
    );
    console.log(response);
    dispatch({ type: 'ALL_DOCS', payload: response.data.allDocs });
  } catch (error) {
    console.log(error);
  }
};

export const submitEditProfile = (data) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  console.log(data);
  try {
    const response = await axios.post(`${authUrl}edit`, { data }, config);

    console.log(response.data);
    dispatch({ type: 'AUTH_USER', payload: response.data });
  } catch (error) {
    console.log(error);
  }
};
