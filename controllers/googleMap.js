const { Client } = require("@googlemaps/google-maps-services-js");

exports.getLocation = function (req, res) {
  console.log("/getLocation route hit")

  const client = new Client({});

  client
    .elevation({
      params: {
        locations: [{ lat: 45, lng: -110 }],
        key: "AIzaSyAPFke-0DvZs8-Yw-IYnj8-Zr7M3G4d8l4",
      },
      timeout: 1000, // milliseconds
    })
    .then((r) => {
      console.log(r.data.results[0].location);
      res.send(r.data)
    })
    .catch((e) => {
      console.log(e.response.data.error_message);
    })

}
