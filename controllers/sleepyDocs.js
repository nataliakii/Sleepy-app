const _ = require('lodash');
const Sleepy = require('../models/sleep');
const User = require('../models/user');
const findNorm=require('./normsData');
const helpingFuncs =require('./helpingFuncs')


exports.addSleepyDoc = function (req, res) {
  User.findOne({ _id: req.user._id }, (err, user) => {
    const { sleepData } = req.body
    const { calculateAge } = helpingFuncs;
    const { calculateWw } = helpingFuncs;
    const { calculateSumNap } = helpingFuncs;
    const { createResultObject } = helpingFuncs;

    const sleep = {
      date: sleepData.date,
      wakeUp: sleepData.wakeUp,
      bedTime: sleepData.bedTime,
      age: calculateAge(req.user.kidBD, sleepData.date),
      nap1: {
        start: sleepData.nap1Start,
        end: sleepData.nap1End,
      },
      nap2: {
        start: sleepData.nap2Start,
        end: sleepData.nap2End,
      },
      nap3: {
        start: sleepData.nap3Start,
        end: sleepData.nap3End,
      },
      nap4: {
        start: sleepData.nap4Start,
        end: sleepData.nap4End,
      },
      ww1:  calculateWw(sleepData).ww1,
      ww2: calculateWw(sleepData).ww2,
      ww3: calculateWw(sleepData).ww3,
      ww4: calculateWw(sleepData).ww4,
      ww5: calculateWw(sleepData).ww5,
      sumNap: calculateSumNap(sleepData),
      norms: findNorm(
        calculateAge(req.user.kidBD, sleepData.date).ageInWeeks
      ),
    };
    sleep.result = createResultObject(sleep);
    const sleepyDoc = new Sleepy.SleepyModel(sleep);
    console.log(sleepyDoc);

    sleepyDoc.save((err, sleep) => {
      user.SleepyDocs.push(sleepyDoc);

      user.save((err, user) => {
        res.send({
          sleepyDoc,
        });
      });
    });
  });
};

exports.getAllDocs = function (req, res) {
  User.findOne({ _id: req.user._id }, (err, user) => {
    res.send({ allDocs: user.SleepyDocs, docsCount: user.SleepyDocs.length });
    console.log(err);
  });
};

exports.editProfile = function (req, res) {
  User.findOne({ _id: req.user._id }, (err, user) => {
    user.name = req.body.data.name || user.name;
    user.email = req.body.data.email || user.email;
    user.nameKid = req.body.data.nameKid || user.nameKid;
    user.kidBD = req.body.data.kidBD || user.kidBD;

    user.save((err, user) => {
      res.send(user);
      console.log(err);
    });
  });
};
