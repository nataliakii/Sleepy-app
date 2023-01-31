import { fetchPhoto } from "../hooks/fetchPhoto";

export function getPlaygroundsCoord(obj) {
  let playgroundsCoord = [];

  obj.data.forEach((pg) => {
    let pgData = {
      opening: pg.opening_hours?.open_now,
      address: pg.formatted_address || null,
      vicinity: pg.vicinity,
      photoRef: pg.photos[0].photo_reference,
      // photo: fetchPhoto(pg.photos[0].photo_reference),
      lat: pg.geometry.location.lat,
      lng: pg.geometry.location.lng,
      id: pg.place_id,
      link: `https://www.google.com/maps/search/?api=1&query=Google&query_place_id=${pg.place_id}`,
    };
    playgroundsCoord.push(pgData);
  });
  return playgroundsCoord;
}
