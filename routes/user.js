const express = require('express');
const User = require('../models/user');
const router = express.Router();
const ServerSideFuncs = require("../controllers/ServerSideFuncs");

const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.put("/edit", requireAuth, ServerSideFuncs.editProfile)
router.delete('/delete', requireAuth, ServerSideFuncs.deleteProfile)
router.post("/sleepy_post", requireAuth, ServerSideFuncs.addSleepyDoc)
router.get("/sleepy_get_all", requireAuth, ServerSideFuncs.getAllDocs)

module.exports = router;