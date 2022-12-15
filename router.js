const Authentication = require("./controllers/auth");
const ServerSideFuncs = require("./controllers/ServerSideFuncs");
const getLocation=require("./controllers/googleMap")
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  app.post("/auth/signin", requireSignin, Authentication.signin);
  app.post("/auth/signup", Authentication.signup);
  app.get("/auth/current_user", requireAuth, Authentication.currentUser);
  app.post("/auth/edit", requireAuth, ServerSideFuncs.editProfile);
  app.post("/api/sleepy_post", requireAuth, ServerSideFuncs.addSleepyDoc);
  app.get("/api/sleepy_get_all", requireAuth, ServerSideFuncs.getAllDocs);
  app.get("/api/addArticlesToDB", ServerSideFuncs.addArticlesToDB);
  app.get("/api/getTipsArticles", ServerSideFuncs.getArticles)
  app.get("/api/getLocation", getLocation.getLocation);
};