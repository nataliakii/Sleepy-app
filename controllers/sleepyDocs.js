const Sleepy = require('../models/sleep');
const User = require('../models/user');
const { DateTime } = require("luxon");

exports.addSleepyDoc = function(req, res) {
 User.findOne({_id: req.user._id}, function (err, user) {
   
   const calculateAge=()=>{
   const dob=new DateTime(req.user.kidBD)
   const today=new DateTime(req.body.sleepData.date)
   const month_diff = today.diff(dob, 'months')
   return  month_diff.toObject()
  }
  const sleep = {
    date: req.body.sleepData.date,
    wakeUp: req.body.sleepData.wakeUp,
    bedTime: req.body.sleepData.bedTime,
    age: calculateAge()
  }
  console.log(sleep)
    const sleepyDoc = new Sleepy.SleepyModel(sleep);
    
    sleepyDoc.save(function (err, sleep) {
      user.SleepyDocs.push(sleepyDoc);

      user.save(function (err, user) {
        res.send({
          sleepyDoc,
        });
      });
    });
  });
};

// exports.getWatchList = function(req, res) {
//   User.findOne({_id: req.user._id}, function (err, user) {
//     res.send({
//       movies: user.watchList,
//       watchListCount: user.watchList.length
//     });
//   });
// };