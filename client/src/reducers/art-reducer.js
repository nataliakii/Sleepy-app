export default function ArtReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_ARTWORK":
      return action.payload;
    default:
      return state;
  }
}
