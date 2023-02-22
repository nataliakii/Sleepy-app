const INITIAL_STATE = {
  lat: 35,
  lng: -85,
};

export default function LocationReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "DISPLAY_LOCATION":
      return action.payload;
    default:
      return state;
  }
}
