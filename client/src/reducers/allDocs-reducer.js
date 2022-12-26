/* eslint-disable default-param-last */
export default function AllDocsReducer(state = [], action) {
  switch (action.type) {
    case 'ALL_DOCS':
      return action.payload;
    case 'DELETE_DOC':
      console.log(action.payload);
      return state;
    default:
      return state;
  }
}
