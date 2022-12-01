/* eslint-disable default-param-last */

export default function AllDocsReducer(state = [], action) {
  switch (action.type) {
    case 'ALL_DOCS':
      return action.payload;
    default:
      return state;
  }
}
