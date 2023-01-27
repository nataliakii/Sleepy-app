const _ = require("lodash");
const norms = require("./norms");

const helpingFuncs = {
  calculateAge: (calculateAge = (kidBD, date) => {
    let monthAge = 0;
    let dateAge = 0;
    let yearAge = 0;
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

  convMins: (convMins = (mins) => {
    let str = "";
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

  getTimeDiff: (getTimeDiff = (start, end) => {
    const [startHour, startMins] = start.split(":");
    const [endHour, endMins] = end.split(":");

    const diffHour = endHour - startHour;
    const diffMins = endMins - startMins;

    const isSameHour = diffHour === 0;
    if (isSameHour) return endMins - startMins;

    const diffHourIntoMins = diffHour * 60;
    return diffHourIntoMins + diffMins;
  }),

  calculateWw: (calculateWw = (sleepData) => {
    const ww1 = getTimeDiff(sleepData.wakeUp, sleepData.nap1Start);

    let ww2;
    let ww3;
    let ww4;
    let ww5;
    let lastNap;

    if (!sleepData.nap2Start) {
      ww2 = getTimeDiff(sleepData.nap1End, sleepData.bedTime);
      lastNap = sleepData.nap1End;
      numberOfNaps = 1;
    } else if (!sleepData.nap3Start) {
      ww2 = getTimeDiff(sleepData.nap1End, sleepData.nap2Start);
      ww3 = getTimeDiff(sleepData.nap2End, sleepData.bedTime);
      lastNap = sleepData.nap2End;
      numberOfNaps = 2;
    } else if (!sleepData.nap4Start) {
      ww2 = getTimeDiff(sleepData.nap1End, sleepData.nap2Start);
      ww3 = getTimeDiff(sleepData.nap2End, sleepData.nap3Start);
      ww4 = getTimeDiff(sleepData.nap3End, sleepData.bedTime);
      lastNap = sleepData.nap3End;
      numberOfNaps = 3;
    } else {
      ww2 = getTimeDiff(sleepData.nap1End, sleepData.nap2Start);
      ww3 = getTimeDiff(sleepData.nap2End, sleepData.nap3Start);
      ww4 = getTimeDiff(sleepData.nap3End, sleepData.nap4Start);
      ww5 = getTimeDiff(sleepData.nap4End, sleepData.bedTime);
      lastNap = sleepData.nap4End;
      numberOfNaps = 4;
    }

    return {
      ww1,
      ww2,
      ww3: ww3 || null,
      ww4: ww4 || null,
      ww5: ww5 || null,
      lastNap,
      numberOfNaps,
    };
  }),

  calculateSumNap: (calculateSumNap = (sleepData) => {
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

  createResultObject: (createResultObject = (sleep) => {
    const { norms } = sleep;
    const { ww1 } = sleep;
    const { ww2 } = sleep;
    const { ww3 } = sleep;
    const { ww4 } = sleep;
    const { ww5 } = sleep;
    const { sumNap } = sleep;
    const { numberOfNaps } = sleep;
    const { lastNap } = sleep;

    const compareData = (normMax, normMin, input) => {
      if (input > normMin && input < normMax) {
        return { code: 200, message: "Ok" };
      }
      if (input > normMax) {
        return {
          code: 500,
          message: `Try to make it less than ${convMins(normMax)} `,
        };
      }
      if (input === 0 || !input) {
        return null;
      }
      return {
        code: 400,
        message: `Try to make it more than ${convMins(normMin)} `,
      };
    };
    const compareLastNap = (normLastNap, input) => {
      if (input <= normLastNap) {
        return { code: 200, message: "Ok" };
      } else
        return {
          code: 500,
          message: ` Try to end up last nap by ${normLastNap}`,
        };
    };
    const compareNumberNaps = (normMax, normMin, input) => {
      if (input >= normMin || input <= normMax) {
        return { code: 200, message: "Ok" };
      }
      if (input > normMax) {
        return {
          code: 500,
          message: `Try to make it less than ${normMax + 1} naps`,
        };
      } else
        return {
          code: 400,
          message: `Try to make it at least ${normMin} naps `,
        };
    };

    return {
      ww1R: {
        message: compareData(norms.wwMax, norms.wwMin, ww1).message,
        code: compareData(norms.wwMax, norms.wwMin, ww1).code,
      },
      ww2R: {
        message: compareData(norms.wwMax, norms.wwMin, ww2).message,
        code: compareData(norms.wwMax, norms.wwMin, ww2).code,
      },
      ww3R: {
        message: compareData(norms.wwMax, norms.wwMin, ww3)?.message,
        code: compareData(norms.wwMax, norms.wwMin, ww3)?.code,
      },
      ww4R: {
        message: compareData(norms.wwMax, norms.wwMin, ww4)?.message,
        code: compareData(norms.wwMax, norms.wwMin, ww4)?.code,
      },
      ww5R: {
        message: compareData(norms.wwMax, norms.wwMin, ww5)?.message,
        code: compareData(norms.wwMax, norms.wwMin, ww5)?.code,
      },
      sumNapR: {
        message: compareData(norms.napSumMax, norms.napSumMin, sumNap).message,
        code: compareData(norms.napSumMax, norms.napSumMin, sumNap).code,
      },
      numberOfNapsR: {
        message: compareNumberNaps(norms.napMax, norms.napMin, numberOfNaps)
          .message,
        code: compareNumberNaps(norms.napMax, norms.napMin, numberOfNaps).code,
      },
      lastNapR: {
        message: compareLastNap(norms.lastNap, lastNap).message,
        code: compareLastNaps(norms.napMax, norms.napMin, numberOfNaps).code,
      },
    };
  }),

  findNorm: (findNorm = (age) => {
    const ages = norms.agesNorms;
    const schedules = norms.schedulesNorms;
    const findAge = _.findKey(ages, (a) => age > a.from && age < a.till);
    return schedules[findAge];
  }),

  loopContent: (loopContent = (arr) => {
    const loopText = (text) => {
      let arrToReturn = [];
      if (text.length > 1) {
        for (let i = 0; i < text.length; i++) {
          // for(let prop in text[i])
          arrToReturn.push(text[i]);
        }
        return arrToReturn;
      } else return text;
    };

    let arrayToReturn = [];
    for (let i = 0; i < arr.length; i++) {
      const content = {
        title: arr[i].title || "",
        text: loopText(arr[i].text),
        expertTip: arr[i].expertTip || null,
      };
      arrayToReturn.push(content);
    }
    return arrayToReturn;
  }),
};

module.exports = helpingFuncs;
