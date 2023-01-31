const INITIAL_STATE =
  "Btw, you're the best mom ever.  And even when you're awake! :)";

export default function funFactReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCH_FUNFACT":
      return action.payload;
    default:
      return state;
  }
}
