const { Client } = require("@googlemaps/google-maps-services-js");

exports.getLocation = function (req, res) {
  console.log("/getLocation route hit and this is req.body", req.body);
  const latitude = req.body.coord.lat;
  const longitude = req.body.coord.lng;
  const latLng = {
    lat: latitude,
    long: longitude,
  };

  const client = new Client({});

  client
    .placesNearby({
      params: {
        keyword: "playground",
        type: ["park"],
        radius: 5000000,
        location: { lat: latitude, lng: longitude },
        key: "AIzaSyAPFke-0DvZs8-Yw-IYnj8-Zr7M3G4d8l4",
      },
      timeout: 5000,
    })
    .then((r) => {
      console.log(
        "Response contains following number of items :",
        r.data.results.length
      );
      if (r.data.results.length > 0) {
        res.send(r.data.results);
      }
      if (r.data.results.status == "ZERO_RESULTS") {
        res.send("No playgrounds found nearby");
      }
    })
    .catch((e) => {
      console.log("Error detected : ", e);
    });
};
