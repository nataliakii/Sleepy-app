const _ = require('lodash');

const helpingFuncs = {
  calculateAge: (calculateAge=(kidBD, date) => {
    let monthAge = 0;
    let dateAge = 0;
    let yearAge = 0
    const dob = new Date(kidBD);
    const dobYear = dob.getYear();
    const dobMonth = dob.getMonth();
    const dobDate = dob.getDate();
    const now = new Date(date);
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
    const ageInWeeks = Math.floor(
      yearAge * 52.14 + monthAge * 4.34 + dateAge / 7
    );
    return {
      years: yearAge,
      months: monthAge,
      days: dateAge,
      ageInWeeks,
    };
  }),

  convMins: (convMins=(mins) => {
    let str = '';
    const fullHours = Math.floor(mins / 60);
    const time = {
      hours: fullHours,
      mins: mins - fullHours * 60,
    };
  
    if (fullHours === 1 && time.mins === 0) str = `${time.hours} hour`;
    else if (fullHours === 1 && time.mins > 0)
      str = `${time.hours} hour, ${time.mins} mins`;
    else if (fullHours < 1) str = `${time.mins} mins`;
    else if (fullHours > 1 && time.mins === 0) str = `${time.hours} hours`;
    else if (fullHours > 1 && time.mins > 0)
      str = `${time.hours} hours, ${time.mins} mins`;
    return str;
  }),

  getTimeDiff: (getTimeDiff=(start, end) => {
    const [startHour, startMins] = start.split(':');
    const [endHour, endMins] = end.split(':');

    const diffHour = endHour - startHour;
    const diffMins = endMins - startMins;

    const isSameHour = diffHour === 0;
    if (isSameHour) return endMins - startMins;

    const diffHourIntoMins = diffHour * 60;
    return diffHourIntoMins + diffMins;
  }),

  calculateWw: (calculateWw =(sleepData) => {
    const ww1 = getTimeDiff(sleepData.wakeUp, sleepData.nap1Start);

    let ww2;
    let ww3;
    let ww4;
    let ww5;
    let lastNap;

    if (!sleepData.nap2Start) {
      ww2 = getTimeDiff(sleepData.nap1End, sleepData.bedTime);
      lastNap = sleepData.nap1End;
    } else if (!sleepData.nap3Start) {
      ww2 = getTimeDiff(sleepData.nap1End, sleepData.nap2Start);
      ww3 = getTimeDiff(sleepData.nap2End, sleepData.bedTime);
      lastNap = sleepData.nap2End;
    } else if (!sleepData.nap4Start) {
      ww3 = getTimeDiff(sleepData.nap2End, sleepData.nap3Start);
      ww4 = getTimeDiff(sleepData.nap3End, sleepData.bedTime);
      lastNap = sleepData.nap3End;
    } else {
      ww4 = getTimeDiff(sleepData.nap3End, sleepData.nap4Start);
      ww5 = getTimeDiff(sleepData.nap4End, sleepData.bedTime);
      lastNap = sleepData.nap4End;
    }

    return {
      ww1,
      ww2,
      ww3: ww3 || null,
      ww4: ww4 || null,
      ww5: ww5 || null,
      lastNap,
    };
  }),

  calculateSumNap: (calculateSumNap=(sleepData) => {
    const nap1Dur = getTimeDiff(sleepData.nap1Start, sleepData.nap1End);
    let nap2Dur = 0;
    let nap3Dur = 0;
    let nap4Dur = 0;
    const { nap2Start } = sleepData || null;
    const { nap3Start } = sleepData || null;
    const { nap4Start } = sleepData || null;

    if (nap2Start) {
      nap2Dur = getTimeDiff(nap2Start, sleepData.nap2End);
    }

    if (nap3Start) {
      nap3Dur = getTimeDiff(nap3Start, sleepData.nap3End);
    }

    if (nap4Start) {
      nap4Dur = getTimeDiff(nap4Start, sleepData.nap4End);
    }

    const arr = _.compact([nap1Dur, nap2Dur, nap3Dur, nap4Dur]);
    return _.sum(arr);
  }),

  createResultObject: (createResultObject=(sleep) => {
    const { norms } = sleep;
    const { ww1 } = sleep;
    const { ww2 } = sleep;
    const { ww3 } = sleep;
    const { ww4 } = sleep;
    const { ww5 } = sleep;
    const { sumNap } = sleep;

    const compareData = (normMax, normMin, input) => {
      if (input > normMin && input < normMax) {
        return 'Ok';
      }
      if (input > normMax) {
        return `Should be less than ${convMins(normMax)} `;
      }
      if (input === 0 || !input) {
        return null;
      }
      return `Should last at least ${convMins(normMin)} `;
    };

    return {
      ww1R: compareData(norms.wwMax, norms.wwMin, ww1),
      ww2R: compareData(norms.wwMax, norms.wwMin, ww2),
      ww3R: compareData(norms.wwMax, norms.wwMin, ww3),
      ww4R: compareData(norms.wwMax, norms.wwMin, ww4),
      ww5R: compareData(norms.wwMax, norms.wwMin, ww5),
      sumNapR: compareData(norms.napSumMax, norms.napSumMin, sumNap),
    };
  }),


};



module.exports = helpingFuncs
