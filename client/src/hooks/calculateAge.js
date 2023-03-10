export const calculateAge = (bd) => {
  let monthAge = 0;
  let dateAge = 0;
  let yearAge = 0;
  const dob = new Date(bd);
  const dobYear = dob.getYear();
  const dobMonth = dob.getMonth();
  const dobDate = dob.getDate();
  const now = new Date();
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
};
