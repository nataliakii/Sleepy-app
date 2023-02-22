export function mapObjForDistances(obj, arr) {
  const from = {
    lat: obj.lat,
    lng: obj.lng,
  };

  const to = arr.reduce((acc, cur) => {
    const t = {
      lat: cur.lat,
      lng: cur.lng,
    };
    acc.push(t);
    return acc;
  }, []);

  return {
    from: [from],
    to: to,
  };
}
