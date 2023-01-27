export function getPlaygroundsCoord(obj) {
  let playgroundsCoord = [];
  obj.data.forEach((pg) => {
    let pgData = {
      lat: pg.geometry.location.lat,
      lng: pg.geometry.location.lng,
      id: pg.place_id,
    };
    playgroundsCoord.push(pgData);
  });
  return playgroundsCoord;
}
