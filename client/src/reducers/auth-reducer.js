/* eslint-disable default-param-last */

const INITIAL_STATE = {
  authenticated: localStorage.getItem('token') || '',
  errorMessage: '',
  name: null,
  nameKid: null,
};

export default function AuthReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'AUTH_USER':
      return {
        ...state,
        authenticated: action.payload.token,
        name: action.payload.name,
        nameKid: action.payload.nameKid,
      };
    case 'AUTH_ERROR':
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
