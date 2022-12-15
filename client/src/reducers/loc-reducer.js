/* eslint-disable no-unused-vars */
/* eslint-disable default-param-last */
const INITIAL_STATE = {
  error: null,
  location: { lat: 24, lon: 19 },
};

export default function LocationReducer(state = {}, action) {
  switch (action.type) {
    case 'DISPLAY_LOCATION':
      return { error: null, location: action.payload };
    case 'LOC_ERROR':
      return { location: null, error: action.payload };
    default:
      return state;
  }
}
