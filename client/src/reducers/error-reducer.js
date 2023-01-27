export default function ErrorReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_ERROR":
      return action.payload;
    default:
      return state;
  }
}
