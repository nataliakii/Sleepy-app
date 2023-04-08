export default function NoAuthFormReducer(state = null, action) {
  switch (action.type) {
    case "POST_SLEEP_NON_AUTH":
      return action.payload;
    case "ERROR_POST_SLEEP_NON_AUTH":
      console.log(action.payload);
      return { ...state, errorMessage: action.payload };
    default:
      return state;
  }
}
