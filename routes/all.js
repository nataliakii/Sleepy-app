require('dotenv').config()
const express = require('express');
const router = express.Router();
const ServerSideFuncs = require("../controllers/ServerSideFuncs");
const getLocation=require("../controllers/googleMap")

router.get("/addArticlesToDB", ServerSideFuncs.addArticlesToDB);
router.get("/getTipsArticles", ServerSideFuncs.getArticles)
router.post("/getLocation", getLocation.getLocation);
// router.get("/getNorms", ServerSideFuncs.getNorms);

module.exports = router;
