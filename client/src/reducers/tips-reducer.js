/* eslint-disable default-param-last */
export default function TipsReducer(state = [], action) {
  switch (action.type) {
    case 'DISPLAY_TIPS':
      return action.payload;
    default:
      return state;
  }
}
