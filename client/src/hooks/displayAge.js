const displayAge = (ageObj) => {
  let ageString = "";
  if (ageObj.years > 1 && ageObj.months > 6)
    ageString = `${ageObj.years} years and ${ageObj.months} months`;
  else if (ageObj.years > 1 && ageObj.months <= 6)
    ageString = `${ageObj.years} years`;
  else if (ageObj.years == 1 && ageObj.months == 1)
    ageString = `${ageObj.years} year and ${ageObj.months} month`;
  else if (ageObj.years == 1 && ageObj.months > 1)
    ageString = `${ageObj.years} year and ${ageObj.months} months`;
  else if (ageObj.years == 1 && ageObj.months == 0)
    ageString = `${ageObj.years} year`;
  else if (
    ageObj.years < 1 &&
    ageObj.months < 1 &&
    ageObj.ageInWeeks < 1 &&
    ageObj.days > 0
  )
    ageString = `Only ${ageObj.days} days!`;
  else if (ageObj.years < 1 && ageObj.months < 3 && ageObj.ageInWeeks >= 1)
    ageString = `${ageObj.ageInWeeks} weeks`;
  else if (ageObj.ageInWeeks == 1 && ageObj.days < 5)
    ageString = `${ageObj.ageInWeeks} week`;
  else if (ageObj.ageInWeeks == 1 && ageObj.days > 4)
    ageString = `${ageObj.ageInWeeks} week and ${ageObj.days} days`;
  else if (ageObj.years > 1 && ageObj.months == 0 && ageObj.days == 0)
    ageString = `${ageObj.years} years old. Happy Birthday!!`;
  else if (ageObj.years < 1 && ageObj.months > 2)
    ageString = `${ageObj.months} months`;
  return ageString;
};
export default displayAge;
