export default function PlaygroundsReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_PLAYGROUNDS":
      return action.payload;
    default:
      return state;
  }
}
