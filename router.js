require('dotenv').config()
const Auth = require("./controllers/auth");
const ServerSideFuncs = require("./controllers/ServerSideFuncs");
const getLocation=require("./controllers/googleMap")
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false});
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  app.post("/auth/signin", requireSignin, Auth.signin);
  app.post("/auth/signup", Auth.signup);
  app.get("/auth/:userId", requireAuth, Auth.currentUser);
  app.put("/user/edit", requireAuth, ServerSideFuncs.editProfile);
  app.delete("/user/delete", requireAuth, ServerSideFuncs.deleteProfile);
  app.post("/user/sleepy_post", requireAuth, ServerSideFuncs.addSleepyDoc);
  app.get("/user/sleepy_get_all", requireAuth, ServerSideFuncs.getAllDocs);
  app.get("/api/addArticlesToDB", ServerSideFuncs.addArticlesToDB);
  app.get("/api/getTipsArticles", ServerSideFuncs.getArticles)
  app.get("/api/getLocation", getLocation.getLocation);
};
