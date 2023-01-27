export default function PlaygroundsReducer(state = null, action) {
  switch (action.type) {
    case "FETCH_PLAYGROUNDS":
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
