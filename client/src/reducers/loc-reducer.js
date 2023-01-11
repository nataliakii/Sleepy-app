export default function LocationReducer(state = {}, action) {
  switch (action.type) {
    case "DISPLAY_LOCATION":
      return { error: null, location: action.payload };
    case "LOC_ERROR":
      return { location: null, error: action.payload };
    default:
      return state;
  }
}
