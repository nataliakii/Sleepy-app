require("dotenv").config();
const jwt = require("jwt-simple");
const User = require("../models/user");
const keys = require("../config/dev");
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
  console.log("/signin route hit");
  res.send({
    token: tokenForUser(req.user),
    userId: req.user._id,
    name: req.user.name,
    nameKid: req.user.nameKid,
    email: req.user.email,
    kidBD: req.user.kidBD,
  });
};

exports.currentUser = function (req, res, next) {
  console.log("/currentUser route hit");
  const { userId } = req.params;
  User.findById(userId).exec((err, user) => {
    if (err) {
      res.status(400).send(err);
      return next(err);
    } else {
      res.status(200).send(user);
    }
  });
};

exports.signup = function (req, res, next) {
  console.log("/signup route hit");
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const nameKid = req.body.nameKid;
  const kidBDString = req.body.kidBD; 

  const dateComponents = kidBDString.split(', ');
  if (dateComponents.length !== 2) {
    return res.status(422).send({ error: "Invalid date format for kidBD" });
  }
  
  const dateString = dateComponents[0];
  const timeZone = dateComponents[1];
  
  // Parse the date components
  const [day, month, year] = dateString.split('/').map(Number);
  
  // Check if the date components are valid
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    return res.status(422).send({ error: "Invalid date format for kidBD" });
  }
  
  // Create a new Date object with the parsed components
  const parsedKidBD = new Date(year, month - 1, day); // Subtract 1 from month since it's 0-based in JavaScript
  
  // Check if the date is valid
  if (isNaN(parsedKidBD)) {
    return res.status(422).send({ error: "Invalid date format for kidBD" });
  }

  if (!email || !password || !name || !nameKid || !kidBDString) {
    return res
      .status(422)
      .send({ error: "You must provide all necessary fields" });
  }

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res
        .status(422)
        .send({
          error:
            "This email is in use. Please, try another one or sign in with an existing email.",
        });
    }

    const user = new User();

    user.email = email;
    user.name = name;
    user.nameKid = nameKid;
    user.kidBD = parsedKidBD; // Use the parsed date object here

    user.setPassword(password);

    user.save(function (err, savedUser) {
      if (err) {
        return next(err);
      }
      const msg = {
        to: savedUser.email,
        from: "nataliaki@icloud.com",
        subject: "Welcome to SleepyApp! This is a confirmation email",
        text: `Hi ${savedUser.name},
        We are reaching out to say hello! We are SleepyApp, and we're excited to welcome you to our community.
        If you have any questions or need assistance, don't hesitate to reach out. We’re here to help.
        Best regards, SleepyApp`,
        html: `Hi ${savedUser.name},
        We are reaching out to say hello! We are SleepyApp, and we're excited to welcome you to our community.
        If you have any questions or need assistance, don't hesitate to reach out. We’re here to help.
        Best regards, SleepyApp`,
      };
      console.log('msg is :', msg)
      sgMail.send(msg).then(
        (res) => {console.log(res)},
        (error) => {
          console.error(error);
          if (error.response) {
            console.error(error.response.body);
          }
        }
      );

      res.send({
        token: tokenForUser(savedUser),
        name: savedUser.name,
        nameKid: savedUser.nameKid,
        kidBD: savedUser.kidBD,
        email: savedUser.email,
        userId: savedUser._id,
      });
    });
  });
};
