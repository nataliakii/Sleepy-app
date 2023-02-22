import axios from "axios";
export async function fetchPhoto(link) {
  const response = await axios.get(link);
  return response;
}
