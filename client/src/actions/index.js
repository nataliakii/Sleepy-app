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
    const responseObj = {
      date: response.data.sleepyDoc.date,
      age: {
        years: response.data.sleepyDoc.age.years,
        months: response.data.sleepyDoc.age.months,
        days: response.data.sleepyDoc.age.days,
      },
      wakeUp: response.data.sleepyDoc.wakeUp,
      ww1: response.data.sleepyDoc.ww1,
      ww2: response.data.sleepyDoc.ww2,
      ww3: response.data.sleepyDoc.ww3,
      ww4: response.data.sleepyDoc.ww4,
      ww5: response.data.sleepyDoc.ww5,
      bedTime: response.data.sleepyDoc.bedTime,
      sumNap: response.data.sleepyDoc.sumNap,
      result: {
        ww1R: response.data.sleepyDoc.result.ww1R,
        ww2R: response.data.sleepyDoc.result.ww2R,
        ww3R: response.data.sleepyDoc.result.ww3R,
        ww4R: response.data.sleepyDoc.result.ww4R,
        ww5R: response.data.sleepyDoc.result.ww5R,
        sumNapR: response.data.sleepyDoc.result.sumNapR,
      },
    };
    console.log(responseObj);
    dispatch({ type: 'POST_SLEEP', payload: responseObj });
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
