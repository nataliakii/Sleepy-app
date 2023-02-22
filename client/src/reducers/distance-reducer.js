export default function DistanceReducer(state = {}, action) {
  switch (action.type) {
    case "FETCH_DISTANCES":
      console.log("fetch distance reducer returns ", action.payload);
      return action.payload;
    default:
      return state;
  }
}
