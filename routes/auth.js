require('dotenv').config()
const Auth = require("../controllers/auth");
const passportService = require("../services/passport");
const passport = require("passport");

const requireAuth = passport.authenticate("jwt", { session: false});
const requireSignin = passport.authenticate("local", { session: false });

module.exports = function (app) {
  app.post("/auth/signin", requireSignin, Auth.signin);
  app.post("/auth/signup", Auth.signup);
  app.get("/auth/:userId", Auth.currentUser);
}