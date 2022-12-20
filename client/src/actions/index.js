/* eslint-disable no-unused-vars */
import axios from 'axios';

// const url = 'http://localhost:5000';
const url = '';

export const fetchUser = (token) => async (dispatch) => {
  const { userId } = localStorage;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`/auth/${userId}`, config);
    console.log('action payload fetchUser', response);
    dispatch({ type: 'AUTH_USER', payload: response.data });
  } catch (error) {
    localStorage.clear();
    console.log(error);
  }
};

export const signout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: 'LOG_OUT' });
};

export const signin = (formProps, callback) => async (dispatch) => {
  axios
    .post(`/auth/signin`, formProps)
    .then((response) => {
      dispatch({ type: 'AUTH_USER', payload: response.data });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
      callback();
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: 'AUTH_ERROR', payload: error });
    });
};

export const signup = (formProps, callback) => async (dispatch) => {
  axios
    .post(`/auth/signup`, formProps)
    .then((response) => {
      dispatch({ type: 'AUTH_USER', payload: response.data });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userId', response.data.userId);
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
      `/api/sleepy_post`,
      { sleepData },
      config
    );
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
    const response = await axios.get(`/api/sleepy_get_all`, config);
    dispatch({ type: 'ALL_DOCS', payload: response.data.allDocs });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (data, callback) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  console.log('action update profile', data);
  try {
    const response = await axios.put(`/auth/edit`, { data }, config);

    console.log(response.data);
    dispatch({ type: 'AUTH_USER', payload: response.data });
    callback();
  } catch (error) {
    console.log(error);
  }
};

export const deleteProfile = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  };
  try {
    const response = await axios.delete(`/auth/delete`, config);
    localStorage.clear();
    dispatch({ type: 'LOG_OUT' });
  } catch (error) {
    console.log(error);
  }
};

export const fetchTips = () => async (dispatch) => {
  try {
    const response = await axios.get(`/api/getTipsArticles`);
    dispatch({ type: 'DISPLAY_TIPS', payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const fetchLocation = () => (dispatch) => {
  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        return 'User denied the request for Geolocation.';
      case error.POSITION_UNAVAILABLE:
        return 'Location information is unavailable.';
      case error.TIMEOUT:
        return 'The request to get user location timed out.';
      case error.UNKNOWN_ERROR:
        return 'An unknown error occurred.';
      default:
        return null;
    }
  }

  function success(pos) {
    const coordinates = { lat: pos.coords.latitude, lon: pos.coords.longitude };
    dispatch({ type: 'DISPLAY_LOCATION', payload: coordinates });
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
    dispatch({
      type: 'LOC_ERROR',
      payload: showError(err),
    });
  }

  navigator.geolocation.getCurrentPosition(success, error, options);
};
