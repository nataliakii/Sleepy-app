export default function TipsReducer(state = [], action) {
  switch (action.type) {
    case "FETCH_ARTWORK":
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
