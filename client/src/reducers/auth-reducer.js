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
        ...state,
        authenticated: action.payload.token,
        name: action.payload.name,
        email: action.payload.email,
        nameKid: action.payload.nameKid,
        kidBD: action.payload.kidBD,
      };
    case 'AUTH_ERROR':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
