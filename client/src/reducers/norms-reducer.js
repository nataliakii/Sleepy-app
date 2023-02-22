export default function NormsReducer(state = null, action) {
  switch (action.type) {
    case "DISPLAY_NORMS":
      console.log("norms are dispatched");
      return action.payload;
    default:
      return state;
  }
}
