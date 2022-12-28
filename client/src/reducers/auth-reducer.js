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
      console.log('this comes from AUTH REDUCER', action.payload);
      return {
        ...state,
        token: action.payload.token,
        name: action.payload.name,
        nameKid: action.payload.nameKid,
        kidBD: action.payload.kidBD,
        email: action.payload.email,
      };
    case 'LOG_OUT':
      console.log('this comes from LOG OUT', action.payload);
      return INITIAL_STATE;
    case 'AUTH_ERROR':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
