const jwt = require('jwt-simple');
const User = require('../models/user');
const keys = require('../config/dev');

function tokenForUser(user) {
  return jwt.encode({ sub: user.id,
    iat: Math.round(Date.now() / 1000),
    exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)}, keys.TOKEN_SECRET)
};

exports.signin = function(req, res, next) {
  // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({
    token: tokenForUser(req.user),
    name: req.user.name,
    nameKid: req.user.nameKid
  });
};

exports.currentUser = function(req, res) {
  const user = {
    token: tokenForUser(req.user),
    name: req.user.name,
    nameKid: req.user.nameKid
  };

  res.send(user);
};

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const nameKid = req.body.nameKid;
  const kidBD = req.body.kidBD;

  console.log(nameKid, kidBD);

  if (!email || !password || !name || !nameKid || !kidBD) {
    return res.status(422).send({ error: 'You must provide all necessary fields'});
  }

  // See if a user with the given email exists
  User.findOne({ email: email }, function(err, existingUser) {
    if (err) { return next(err); }

    // If a user with email does exist, return an error
    if (existingUser) {
      return res.status(422).send({ error: 'This email is in use. Please, try another one or sign in with existing email.' });
    }

    // If a user with email does NOT exist, create and save user record
    const user = new User();

    user.email = email;
    user.name = name
    user.nameKid= nameKid
    user.kidBD=kidBD

    user.setPassword(password);

    user.save(function(err, user) {
      if (err) { return next(err); }

      // Respond to request indicating the user was created
      res.send({ token: tokenForUser(user),name : user.name, nameKid: user.nameKid});
    });
  });
};