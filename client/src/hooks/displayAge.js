/* eslint-disable eqeqeq */
const displayAge = (ageObj) => {
  let ageString = '';
  if (ageObj.years > 0 && ageObj.months > 0 && ageObj.days > 0)
    ageString = `${ageObj.years} years, ${ageObj.months} months, and ${ageObj.days} days`;
  else if (ageObj.years == 0 && ageObj.months == 0 && ageObj.days > 0)
    ageString = `Only ${ageObj.days} days!`;
  // when current month and date is same as birth date and month
  else if (ageObj.years > 0 && ageObj.months == 0 && ageObj.days == 0)
    ageString = `${ageObj.years} years old. Happy Birthday!!`;
  else if (ageObj.years > 0 && ageObj.months > 0 && ageObj.days == 0)
    ageString = `${ageObj.years} years and ${ageObj.months} months`;
  else if (ageObj.years == 0 && ageObj.months > 0 && ageObj.days > 0)
    ageString = `${ageObj.months} months and ${ageObj.days} days`;
  else if (ageObj.years > 0 && ageObj.months == 0 && ageObj.days > 0)
    ageString = `${ageObj.years} years, and${ageObj.days} days`;
  else if (ageObj.years == 0 && ageObj.months > 0 && ageObj.days == 0)
    ageString = `${ageObj.months} months`;
  // when current date is same as dob(date of birth)
  else ageString = "Welcome to Earth! <br> It's first day on Earth!";
  return ageString;
};
export default displayAge;
