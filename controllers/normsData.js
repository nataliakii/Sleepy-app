// everything is in weeks and mins
const _ = require('lodash');

const findNorm = (age) => {
  const ages = {
    ageN: { from: -1, till: 5 },
    age1: { from: 4, till: 10 },
    age2: { from: 9, till: 14 },
    age3: { from: 13, till: 18 },
    age4: { from: 17, till: 22 },
    age5: { from: 21, till: 27 },
    age6: { from: 26, till: 29 },
    age7: { from: 28, till: 36 },
    age8: { from: 35, till: 40 },
    age9: { from: 39, till: 44 },
    age10: { from: 43, till: 49 },
    age11: { from: 48, till: 53 },
    age12: { from: 52, till: 57 },
    age13: { from: 56, till: 79 },
    age14: { from: 78, till: 105 },
    age15: { from: 108, till: 157 },
  };
  const schedules = {
    ageN: { wwMin: 35, wwMax: 62, napSumMin: 420, napSumMax: 600 },
    age1: { wwMin: 59, wwMax: 87, napSumMin: 325, napSumMax: 482 },
    age2: { wwMin: 75, wwMax: 87, napSumMin: 295, napSumMax: 422 },
    age3: { wwMin: 79, wwMax: 97, napSumMin: 265, napSumMax: 362 },
    age4: { wwMin: 89, wwMax: 122, napSumMin: 235, napSumMax: 302 },
    age5: { wwMin: 109, wwMax: 137, napSumMin: 175, napSumMax: 242 },
    age6: { wwMin: 130, wwMax: 152, napSumMin: 175, napSumMax: 242 },
    age7: { wwMin: 150, wwMax: 182, napSumMin: 205, napSumMax: 212 },
    age8: { wwMin: 175, wwMax: 222, napSumMin: 175, napSumMax: 182 },
    age9: { wwMin: 195, wwMax: 227, napSumMin: 115, napSumMax: 182 },
    age10: { wwMin: 200, wwMax: 232, napSumMin: 115, napSumMax: 182 },
    age11: { wwMin: 205, wwMax: 272, napSumMin: 115, napSumMax: 152 },
    age12: { wwMin: 205, wwMax: 272, napSumMin: 115, napSumMax: 152 },
    age13: { wwMin: 225, wwMax: 332, napSumMin: 115, napSumMax: 152 },
    age14: { wwMin: 235, wwMax: 362, napSumMin: 65, napSumMax: 152 },
    age15: { wwMin: 295, wwMax: 362, napSumMin: 65, napSumMax: 152 },
  };
  const findAge = _.findKey(ages, (a) => age > a.from && age < a.till);
  return schedules[findAge];
};

module.exports = findNorm;
