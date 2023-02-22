const { Client } = require("@googlemaps/google-maps-services-js");
const helpingFuncs = require('../utils/helpingFuncs')

exports.getLocation = function (req, res) {
  console.log("/getLocation route hit and this is req.body", req.body);
  const { getPgs } = helpingFuncs;
  const { lat } = req.body.coord;
  const { lng } = req.body.coord;
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
          "zh","zh-CN","zh-TW","ua"
        ],
        type: ["playground", "park"],
        radius: 5000,
        location: { lat: lat, lng: lng },
        key: "AIzaSyAPFke-0DvZs8-Yw-IYnj8-Zr7M3G4d8l4",
      },
      timeout: 5000,
    })
    .then((r) => {
      if (r.data.results.length > 0) {
        console.log('r.data.results', r.data.results)
        res.send(getPgs(r.data.results));
      }
      if (r.data.results.status == "ZERO_RESULTS") {
        res.send("No playgrounds found nearby");
      }
    })
    .catch((e) => {
      console.log("Error detected : ", e);
    });
  
};

exports.getDistances = function (req, res) {
  console.log("/getDistance route hit and this is req.body", req.body);
  const { getDistance } = helpingFuncs;
  const origins = [{
    lat: req.body.coord.lat,
    lng: req.body.coord.lng
  }]
  const destination=req.body.pgs
  const client = new Client({});

  client
    .distancematrix({
      params: {
        destinations: destination,
        mode: "walking",
        origins: origins,
        key: "AIzaSyAPFke-0DvZs8-Yw-IYnj8-Zr7M3G4d8l4",
      },
      timeout: 5000,
    })
    .then((r) => {
        console.log("/////////res with directions: ", r.data)
        res.send(getDistance(r.data));
    })
    .catch((e) => {
      console.log("Error detected : ", e);
    });
  
};
