require('dotenv').config()
const jwt = require('jwt-simple');
const User = require('../models/user');
const keys = require('../config/dev');

function tokenForUser(user) {
  return jwt.encode(
    {
      sub: user.id,
      iat: Math.round(Date.now() / 1000),
      exp: Math.round(Date.now() / 1000 + 5 * 60 * 60),
    },
    keys.TOKEN_SECRET
  );
}

exports.signin = function (req, res, next) {
  console.log("/signin route hit")
  res.send({
    token: tokenForUser(req.user),
    userId: req.user._id,
    name: req.user.name,
    nameKid: req.user.nameKid,
    email: req.user.email,
    kidBD: req.user.kidBD
  });
};

exports.currentUser = function (req, res, next) {
  console.log("/currentUser route hit")
  const { userId } = req.params;
  User.findById(userId)
    .exec((err, user) => {
      if (err) {
        res.status(400).send(err);
        return next(err);
      } else {
        res.status(200).send(user).end();
      }
    })
};

exports.signup = function (req, res, next) {
  console.log("/signup route hit")
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const nameKid = req.body.nameKid;
  const kidBD = req.body.kidBD;

  if (!email || !password || !name || !nameKid || !kidBD) {
    return res.status(422).send({ error: 'You must provide all necessary fields' });
  }


  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: 'This email is in use. Please, try another one or sign in with existing email.' });
    }

    const user = new User();

    user.email = email;
    user.name = name
    user.nameKid = nameKid
    user.kidBD = kidBD

    user.setPassword(password);

    user.save(function (err, user) {
      if (err) { return next(err); }

      res.send({ token: tokenForUser(user), name: user.name, nameKid: user.nameKid, kidBD: user.kidBD, email: user.email, userId: user._id, });
    });
  });
};