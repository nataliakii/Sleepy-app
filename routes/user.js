const express = require('express');
const router = express.Router();
const ServerSideFuncs = require("../controllers/ServerSideFuncs");

const passportService = require('../services/passport');
const passport = require('passport');
const requireAuth = passport.authenticate('jwt', { session: false });

router.put("/edit", requireAuth, ServerSideFuncs.editProfile)
router.delete('/delete', requireAuth, ServerSideFuncs.deleteProfile)
router.post("/sleepy_post", requireAuth, ServerSideFuncs.addSleepyDoc)
router.get("/sleepy_get_all", requireAuth, ServerSideFuncs.getAllDocs)
router.get("/:docId", requireAuth, ServerSideFuncs.getDoc)
router.delete("/:docId", requireAuth, ServerSideFuncs.deleteDoc)

module.exports = router;