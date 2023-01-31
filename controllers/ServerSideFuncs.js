const _ = require('lodash');
const { SleepyModel } = require('../models/sleep');
const User = require('../models/user');
const Article = require('../models/article');
const articles = require('../utils/articles')
const helpingFuncs = require('../utils/helpingFuncs')
// const norms = require('../utils/norms');
const funFacts = require('../utils/funFacts');


exports.addSleepyDoc = function (req, res) {
  User.findOne({ _id: req.user._id }, (err, user) => {
    const { sleepData } = req.body
    const { calculateAge } = helpingFuncs;
    const { calculateWw } = helpingFuncs;
    const { calculateSumNap } = helpingFuncs;
    const { createResultObject } = helpingFuncs;
    const { findNorm } = helpingFuncs;
    const bd = req.user.kidBD.getTime()
    const dt = new Date(sleepData.date).getTime()


    if (bd > dt) {
      res.status(400).send("Kid's BD appeared to be after the date of sleepy doc, which is forbidden by the laws of physics, you need to revise the form and sleep more")
    }
    else {
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
      ww1: calculateWw(sleepData).ww1,
      ww2: calculateWw(sleepData).ww2,
      ww3: calculateWw(sleepData).ww3,
      ww4: calculateWw(sleepData).ww4,
      ww5: calculateWw(sleepData).ww5,
      sumNap: calculateSumNap(sleepData),
      lastNap: calculateWw(sleepData).lastNap,
      numberOfNaps: calculateWw(sleepData).numberOfNaps,
      norms: findNorm(
        calculateAge(req.user.kidBD, sleepData.date).ageInWeeks
      ),
    };
    sleep.result = createResultObject(sleep);
    const sleepyDoc = new SleepyModel(sleep);

    sleepyDoc.save((err, sleepyDoc) => {
      user.SleepyDocs.push(sleepyDoc);

      user.save((err, user) => {
        res.send({
          sleepyDoc,
        });
      });
    });
  }
  });
};

exports.getAllDocs = function (req, res) {

  User.findOne({ _id: req.user._id }, (err, user) => {
    res.send({ allDocs: user.SleepyDocs, docsCount: user.SleepyDocs?.length});
  });
};

exports.editProfile = async function (req, res) {
  const name1 = req.body.data.name1 || req.user.name
  const email1 = req.body.data.email1 || req.user.email
  const nameKid1 = req.body.data.nameKid1 || req.user.nameKid
  const kidBD1 = req.body.data.kidBD1 || req.user.kidBD
  const update = {
    name: name1,
    email: email1,
    nameKid: nameKid1,
    kidBD: kidBD1,
  };
  console.log(update.name, "was updated")
  const updatedUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    update,
    {
      new: true,
    }
  );
  return res.status(200).send(updatedUser);
};

exports.deleteProfile = async function (req, res) {
  console.log("/deleteProfile route hit")
  const deletedUser = await User.findOneAndDelete(
    { _id: req.user._id },
  );
  return res.status(200).send(`User ${deletedUser.name} was deleted successfully`);
};

exports.addArticlesToDB = function (req, res) {
  console.log("/addArticlesToDB route hit")
  const { loopContent } = helpingFuncs
  articles.articles.forEach(el => {
    const article = new Article({
      name: el.name,
      tags: el.tags.toString().split(",") || ['Other'],
      content: loopContent(el.content)
    })
    Article.findOne({ name: article.name }, function (err, findArticle) {
      if (!findArticle) {
        article.save((err, article) => {
          res.send(article);
        })
      }
    })
  })
}

exports.getArticles = function (req, res) {
  console.log("/getArticles route hit")
  Article.find({}).exec((err, articles) => {
    res.send(articles)
  })
}

exports.getDoc = function (req, res,next) {
  const { docId } = req.params
  SleepyModel.findById(docId).exec((err, doc) => {
      if (err) {
        res.status(400).send(err);
        return next(err);
      } else {
        console.log(doc)
        res.status(200).send(doc).end();
      }
  })
}

exports.deleteDoc = async function (req, res) {
  const { docId } = req.params;
  console.log('docId', docId);
  SleepyModel.findOneAndDelete({ _id: docId }).exec((err, doc) => {
    if (err) console.log(err);
    console.log('doc',doc);
  });
  const updateDocs = _.remove(req.user.SleepyDocs, (doc) => doc._id != docId);
  const updateUser = await User.findOneAndUpdate(
    { _id: req.user._id },
    { SleepyDocs: updateDocs },
    {
      new: true,
    }
  );
  return res.status(200).send(updateUser).end();
};

exports.getFunFacts = function (req,res) {
  const random0to11 = _.random(10);
  const arrayOfFacts=funFacts.funFacts
  res.send(arrayOfFacts[random0to11])
}
// exports.getNorms = function (req,res) {
//   const ages = norms.agesNorms;
//   const schedules = norms.schedulesNorms;

//   res.send({ages:ages, schedules:schedules}).end()
// }