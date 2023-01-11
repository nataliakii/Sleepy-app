export default function AllDocsReducer(state = [], action) {
  switch (action.type) {
    case "ALL_DOCS":
      return action.payload;
    case "GET_DOC":
      return state;
    case "DELETE_DOC":
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
