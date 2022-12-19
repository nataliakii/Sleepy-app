/* eslint-disable default-param-last */

const INITIAL_STATE = {
  authenticated: localStorage.getItem('token') || '',
  errorMessage: '',
  name: null,
  nameKid: null,
  kidBD: null,
  email: null,
};

export default function AuthReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        authenticated: action.payload.token,
        name: action.payload.name,
        email: action.payload.email,
        nameKid: action.payload.nameKid,
        kidBD: new Date(action.payload.kidBD).toLocaleDateString(),
      };
    case 'LOG_OUT':
      return INITIAL_STATE;
    case 'AUTH_ERROR':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
