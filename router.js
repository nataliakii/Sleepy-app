const Authentication = require("./controllers/auth");
const SleepyDocs = require("./controllers/sleepyDocs");
const passportService = require("./services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false });
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  app.post("/auth/signin", requireSignin, Authentication.signin);
  app.post("/auth/signup", Authentication.signup);
  app.get("/auth/current_user", requireAuth, Authentication.currentUser);
  app.post("/api/sleepy_post", requireAuth, SleepyDocs.addSleepyDoc);
  // app.get("/api/sleepy", requireAuth, SleepyDocs.getDocs);
};