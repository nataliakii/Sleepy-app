const _ = require('lodash');
const Sleepy = require('../models/sleep');
const User = require('../models/user');
const findNorm=require('../models/normsData');


exports.addSleepyDoc = function (req, res) {
  User.findOne({ _id: req.user._id }, (err, user) => {
    const calculateAge = () => {
      let monthAge = 0;
      let dateAge = 0;
      const dob = new Date(req.user.kidBD);
      const dobYear = dob.getYear();
      const dobMonth = dob.getMonth();
      const dobDate = dob.getDate();
      const now = new Date(req.body.sleepData.date);
      const currentYear = now.getYear();
      const currentMonth = now.getMonth();
      const currentDate = now.getDate();
      yearAge = currentYear - dobYear;
      if (currentMonth >= dobMonth) {
        monthAge = currentMonth - dobMonth;
      } else {
        yearAge--;
        monthAge = 12 + currentMonth - dobMonth;
      }
      if (currentDate >= dobDate) {
        dateAge = currentDate - dobDate;
      } else {
        monthAge--;
        dateAge = 31 + currentDate - dobDate;
      }
      if (monthAge < 0) {
        monthAge = 11;
        yearAge--;
      }
      const ageInWeeks=Math.floor(yearAge*52.14+monthAge*4.34+dateAge/7)
      return {
        years: yearAge,
        months: monthAge,
        days: dateAge,
        ageInWeeks:ageInWeeks
      };
    };
    const getTimeDiff = (start, end) => {
      const [startHour, startMins] = start.split(':');
      const [endHour, endMins] = end.split(':');

      const diffHour = endHour - startHour;
      const diffMins = endMins - startMins;

      const isSameHour = diffHour === 0;
      if (isSameHour) return endMins - startMins;

      const diffHourIntoMins = diffHour * 60;
      return diffHourIntoMins + diffMins;
    };
    const calculateWw = () => {
      const ww1 = getTimeDiff(
        req.body.sleepData.wakeUp,
        req.body.sleepData.nap1Start
      );
      const { nap2Start } = req.body.sleepData || null;
      const { nap3Start } = req.body.sleepData || null;
      const { nap4Start } = req.body.sleepData || null;
      let ww2 = 0;
      let ww3 = 0;
      let ww4 = 0;
      let ww5 = 0;
      let lastNap = '';
      if (!nap2Start) {
        ww2 = getTimeDiff(
          req.body.sleepData.nap1End,
          req.body.sleepData.bedTime
        );
        lastNap = req.body.sleepData.nap1End;
      } else if (!nap3Start) {
        ww2 = getTimeDiff(
          req.body.sleepData.nap1End,
          req.body.sleepData.nap2Start
        );
        ww3 = getTimeDiff(
          req.body.sleepData.nap2End,
          req.body.sleepData.bedTime
        );
        lastNap = req.body.sleepData.nap2End;
      } else if (!nap4Start) {
        ww3 = getTimeDiff(
          req.body.sleepData.nap2End,
          req.body.sleepData.nap3Start
        );
        ww4 = getTimeDiff(
          req.body.sleepData.nap2End,
          req.body.sleepData.nap3Start
        );
        lastNap = req.body.sleepData.nap3End;
      } else {
        ww4 = getTimeDiff(
          req.body.sleepData.nap3End,
          req.body.sleepData.bedTime
        );
        ww5 = getTimeDiff(
          req.body.sleepData.nap4End,
          req.body.sleepData.bedTime
        );
        lastNap = req.body.sleepData.nap4End;
      }

      return {
        ww1,
        ww2,
        ww3: ww3 || null,
        ww4: ww4 || null,
        ww5: ww5 || null,
        lastNap,
      };
    };
    const calculateSumNap = () => {
      const nap1Dur = getTimeDiff(
        req.body.sleepData.nap1Start,
        req.body.sleepData.nap1End
      );
      let nap2Dur = 0;
      let nap3Dur = 0;
      let nap4Dur = 0;
      const { nap2Start } = req.body.sleepData || null;
      const { nap3Start } = req.body.sleepData || null;
      const { nap4Start } = req.body.sleepData || null;

      if (nap2Start) {
        nap2Dur = getTimeDiff(
          req.body.sleepData.nap2Start,
          req.body.sleepData.nap2End
        );
      }

      if (nap3Start) {
        nap3Dur = getTimeDiff(
          req.body.sleepData.nap3Start,
          req.body.sleepData.nap3End
        );
      }

      if (nap4Start) {
        nap4Dur = getTimeDiff(
          req.body.sleepData.nap4Start,
          req.body.sleepData.nap4End
        );
      }

      const arr = _.compact([nap1Dur, nap2Dur, nap3Dur, nap4Dur]);
      return _.sum(arr);
    };

    const sleep = {
      date: req.body.sleepData.date,
      wakeUp: req.body.sleepData.wakeUp,
      bedTime: req.body.sleepData.bedTime,
      age: calculateAge(),
      nap1: {
        start: req.body.sleepData.nap1Start,
        end: req.body.sleepData.nap1End,
      },
      nap2: {
        start: req.body.sleepData.nap2Start,
        end: req.body.sleepData.nap2End,
      },
      nap3: {
        start: req.body.sleepData.nap3Start,
        end: req.body.sleepData.nap3End,
      },
      nap4: {
        start: req.body.sleepData.nap4Start,
        end: req.body.sleepData.nap4End,
      },
      ww1: calculateWw().ww1,
      ww2: calculateWw().ww2,
      ww3: calculateWw().ww3,
      ww4: calculateWw().ww4,
      ww5: calculateWw().ww5,
      sumNap: calculateSumNap(),
      norms: findNorm(calculateAge().ageInWeeks)
    };

    const createResultObject=()=>{
      const norms=sleep.norms
      const ww1=sleep.ww1
      const ww2=sleep.ww2 
      const ww3=sleep.ww3
      const ww4=sleep.ww4
      const ww5=sleep.ww5
      const sumNap=sleep.sumNap

      const compareData=(normMax,normMin,input)=>{
        if(input>normMin&&input<normMax){
          return "Ok"
        }
        else if(input>normMax){
          return `Should be less than ${normMax} mins`
        }
        else if (input==0){
          return null
        }
        else return `Should last at least ${normMin} mins`
      }


      return {
        ww1R:compareData(norms.wwMax,norms.wwMin,ww1),
        ww2R:compareData(norms.wwMax,norms.wwMin,ww2),
        ww3R:compareData(norms.wwMax,norms.wwMin,ww3),
        ww4R:compareData(norms.wwMax,norms.wwMin,ww4),
        ww5R:compareData(norms.wwMax,norms.wwMin,ww5),
        sumNapR:compareData(norms.napSumMax,norms.napSumMin,sumNap)
      }
    }
    sleep.result=createResultObject()
    console.log(sleep)
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
    res.send({allDocs:user.SleepyDocs,
    docsCount: user.SleepyDocs.length})
    console.log(err)
  })
} 