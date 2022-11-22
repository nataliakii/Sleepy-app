/* eslint-disable default-param-last */
export default function SleepyReducer(state = [], action) {
  switch (action.type) {
    case 'POST_SLEEP':
      return [state, action.payload];
    case 'POST_SLEEP_ERROR':
      return [{ ...state }, { errorMessage: action.payload }];
    default:
      return state;
  }
}
