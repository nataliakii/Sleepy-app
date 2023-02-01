const { Client } = require("@googlemaps/google-maps-services-js");

exports.getLocation = function (req, res) {
  console.log("/getLocation route hit and this is req.body", req.body);
  const lat = req.body.coord.lat;
  const lng = req.body.coord.lng;

  const client = new Client({});

  client
    .placesNearby({
      params: {
        keyword: "Playground",
        language: [
          "da",
          "en",
          "nl",
          "et",
          "fi",
          "fr",
          "ka",
          "de",
          "iw",
          "hi",
          "is",
          "it",
          "uk",
          "tr",
          "es","es-419",
          "ru",
          "no",
          "lt",
          "lv",
          "ko",
          "ja",
          "ar",
          "ca",
          "zh","zh-CN","zh-TW"
        ],
        type: ["playground", "park"],
        radius: 5000,
        location: { lat: lat, lng: lng },
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
