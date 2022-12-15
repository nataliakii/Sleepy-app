const _ = require('lodash');
const Sleepy = require('../models/sleep');
const User = require('../models/user');
const Article = require('../models/article');
const articles=require ('../initialData/articles')
const helpingFuncs =require('./helpingFuncs')


exports.addSleepyDoc = function (req, res) {
  User.findOne({ _id: req.user._id }, (err, user) => {
    const { sleepData } = req.body
    const { calculateAge } = helpingFuncs;
    const { calculateWw } = helpingFuncs;
    const { calculateSumNap } = helpingFuncs;
    const { createResultObject } = helpingFuncs;
    const { findNorm } = helpingFuncs;

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
      lastNap: calculateWw(sleepData).lastNap,
      numberOfNaps:calculateWw(sleepData).numberOfNaps,
      norms: findNorm(
        calculateAge(req.user.kidBD, sleepData.date).ageInWeeks
      ),
    };
    sleep.result = createResultObject(sleep);
    console.log(sleep.result)
    const sleepyDoc = new Sleepy.SleepyModel(sleep);

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

exports.addArticlesToDB = function (req,res) {
  const { loopContent } = helpingFuncs
  articles.articles.forEach(el => {
    const article=new Article({
      name:el.name,
      tags: el.tags.toString().split(",") || ['Other'],
      content: loopContent(el.content)
    })
    Article.findOne({name: article.name}, function(err,findArticle){
      if(!findArticle){
        article.save((err, article) => {
          res.send(article);
        })
      }
  })
})}

exports.getArticles = function (req,res) {
  Article.find({}).exec((err, articles)=>{
    res.send(articles)
  })
}