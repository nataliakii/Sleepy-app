export default function SleepyReducer(state = null, action) {
  switch (action.type) {
    case "POST_SLEEP":
      return action.payload;
    case "POST_ERROR":
      console.log(action.payload);
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
