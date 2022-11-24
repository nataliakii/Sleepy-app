/* eslint-disable no-unused-vars */
import axios from 'axios';

const authUrl = 'http://localhost:5000/auth/';

export const signout = (callback) => {
  localStorage.removeItem('token');
  callback();

  return { type: 'AUTH_USER', payload: '' };
};

export async function signin(formProps, callback) {
  try {
    const response = await axios.post(`${authUrl}signin`, formProps);
    localStorage.setItem('token', response.data.token);
    callback();
    return { type: 'AUTH_USER', payload: response.data };
  } catch (error) {
    return {
      type: 'AUTH_ERROR',
      payload: error.message,
    };
  }
}

export async function signup(formProps, callback) {
  try {
    const response = await axios.post(`${authUrl}signup`, formProps);
    localStorage.setItem('token', response.data.token);
    callback();

    return { type: 'AUTH_USER', payload: response.data };
  } catch (error) {
    return {
      type: 'AUTH_ERROR',
      payload: error.response.data.error,
    };
  }
}

export async function fetchUser() {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const response = await axios.get(`${authUrl}current_user`, config);
    localStorage.setItem('token', response.data.token);
    return { type: 'AUTH_USER', payload: response.data };
  } catch (error) {
    console.log(error);
  }
}

export async function postForm(sleepData, callback) {
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
    localStorage.setItem('token', response.data.token);
    console.log(response.data)

    const responseObj = {
      date: response.data.date,
      age: response.data.age.months,
      wakeUp: response.data.wakeUp,
      // ww1: response.data.ww1,
      // nap1: response.data.nap1,
      // ww2: response.data.ww2,
      // nap2: response.data.nap2 || '-',
      // ww3: response.data.ww3 || '-',
      // nap3: response.data.nap3 || '-',
      // ww4: response.data.ww4 || '-',
      // nap4: response.data.nap4 || '-',
      bedTime: response.data.wakeUp,
      // sumAwake: response.data.sumAwake,
      // lastNap: response.data.lastNap,
    };
    console.log(responseObj);
    callback();
    return { type: 'POST_SLEEP', payload: responseObj };
  } catch (error) {
    return {
      type: 'POST_SLEEP_ERROR',
      payload: error.message,
    };
  }
}
