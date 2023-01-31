import axios from "axios";
export async function fetchPhoto(ref) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photo_reference=${ref}`
  );
  return response;
}
