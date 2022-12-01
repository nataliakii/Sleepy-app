/* eslint-disable default-param-last */
export default function SleepyReducer(state = null, action) {
  switch (action.type) {
    case 'POST_SLEEP':
      return action.payload;
    // case 'POST_SLEEP_ERROR':
    //   return [{ ...state }, { errorMessage: action.payload }];
    default:
      return state;
  }
}
