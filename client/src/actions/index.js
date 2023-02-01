import axios from "axios";
import _ from "lodash";
import { artRandomURL, payloadToReturn } from "../hooks/artFuncs";
import { getPlaygroundsCoord } from "../hooks/getPlaygroundsCoord";

// const url = "http://localhost:5000";
const url = "";

export const fetchUser = (token) => async (dispatch) => {
  const { userId } = localStorage;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  try {
    const response = await axios.get(`${url}/auth/${userId}`, config);
    dispatch({ type: "AUTH_USER", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

export const signout = () => async (dispatch) => {
  localStorage.clear();
  dispatch({ type: "LOG_OUT" });
};

export const signin = (formProps, callback) => async (dispatch) => {
  axios
    .post(`${url}/auth/signin`, formProps)
    .then((response) => {
      dispatch({ type: "AUTH_USER", payload: response.data });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      callback();
    })
    .catch((error) => {
      console.log(error.message);
      dispatch({ type: "AUTH_ERROR", payload: error.message });
    });
};

export const signup = (formProps, callback) => async (dispatch) => {
  axios
    .post(`${url}/auth/signup`, formProps)
    .then((response) => {
      dispatch({ type: "AUTH_USER", payload: response.data });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      callback();
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: "AUTH_ERROR",
        payload: error.response.data.error,
      });
    });
};

export const postForm = (sleepData, callback) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log(`${localStorage.getItem("token")}`);
  console.log("sleepData that is sending to server", sleepData);
  try {
    const response = await axios.post(
      `${url}/user/sleepy_post`,
      { sleepData },
      config
    );
    console.log("from post form", response);
    dispatch({ type: "POST_SLEEP", payload: response.data.sleepyDoc });
    callback();
  } catch (error) {
    dispatch({ type: "POST_ERROR", payload: error.response?.data });
    console.log(error.response?.data);
  }
};

export const fetchAllDocs = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.get(`${url}/user/sleepy_get_all`, config);
    dispatch({ type: "ALL_DOCS", payload: response.data.allDocs });
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = (data, callback) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  console.log("action update profile", data);
  try {
    const response = await axios.put(`${url}/user/edit`, { data }, config);
    console.log(response.data);
    dispatch({ type: "AUTH_USER", payload: response.data });
    callback();
  } catch (error) {
    console.log(error);
  }
};

export const deleteProfile = () => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.delete(`${url}/user/delete`, config);
    console.log(response.data);
    localStorage.clear();
    dispatch({ type: "LOG_OUT" });
  } catch (error) {
    console.log(error);
  }
};

export const fetchTips = () => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/api/getTipsArticles`);
    dispatch({ type: "DISPLAY_TIPS", payload: response.data });
    console.log("dispatched, tips are", response.data);
  } catch (error) {
    console.log(error);
  }
};

export const fetchArtwork = () => async (dispatch) => {
  try {
    const request = await axios.get(`${artRandomURL()}`);
    const artworkData = payloadToReturn(request);
    dispatch({
      type: "FETCH_ARTWORK",
      payload: artworkData,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDoc = (docId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.delete(`${url}/user/${docId}`, config);
    console.log(response.data.SleepyDocs);
    dispatch({ type: "DELETE_DOC", payload: response.data.SleepyDocs });
  } catch (error) {
    console.log(error);
  }
};

export const getOneDoc = (docId) => async (dispatch) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  try {
    const response = await axios.get(`${url}/user/${docId}`, config);
    dispatch({ type: "GET_DOC" });
  } catch (error) {
    console.log(error);
  }
};

export const fetchPlaygrounds = (coord) => async (dispatch) => {
  try {
    const response = await axios.post(`${url}/api/getLocation`, { coord });
    console.log(response);
    const c = getPlaygroundsCoord(response);
    dispatch({ type: "FETCH_PLAYGROUNDS", payload: c });
  } catch (error) {
    console.log(error);
  }
};

export const fetchErrorPic = () => async (dispatch) => {
  try {
    const response = await axios.get("https://dog.ceo/api/breeds/image/random");
    console.log(response);
    dispatch({ type: "FETCH_ERROR", payload: response.data.message });
  } catch (error) {
    console.log(error);
  }
};

export const fetchFunFact = () => async (dispatch) => {
  try {
    const response = await axios.get(`${url}/api/getFunFacts`);
    dispatch({ type: "FETCH_FUNFACT", payload: response.data });
  } catch (error) {
    console.log(error);
  }
};

// export const fetchLocation = () => (dispatch) => {
//   const options = {
//     enableHighAccuracy: true,
//     timeout: 5000,
//     maximumAge: 0,
//   };

//   function showError(error) {
//     switch (error.code) {
//       case error.PERMISSION_DENIED:
//         return "User denied the request for Geolocation.";
//       case error.POSITION_UNAVAILABLE:
//         return "Location information is unavailable.";
//       case error.TIMEOUT:
//         return "The request to get user location timed out.";
//       case error.UNKNOWN_ERROR:
//         return "An unknown error occurred.";
//       default:
//         return null;
//     }
//   }

//   function success(pos) {
//     const coordinates = { lat: pos.coords.latitude, lng: pos.coords.longitude };
//     dispatch({ type: "DISPLAY_LOCATION", payload: coordinates });
//   }

//   function error(err) {
//     console.warn(`ERROR(${err.code}): ${err.message}`);
//     dispatch({
//       type: "LOC_ERROR",
//       payload: showError(err),
//     });
//   }
//   navigator.geolocation.getCurrentPosition(success, error, options);
// };
