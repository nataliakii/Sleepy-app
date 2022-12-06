export default function displayTime(mins) {
  let str = '';
  const fullHours = Math.floor(mins / 60);
  const time = {
    hours: fullHours,
    mins: mins - fullHours * 60,
  };

  if (!mins) return null;

  if (fullHours === 1 && time.mins === 0) str = `${time.hours} hour`;
  else if (fullHours === 1 && time.mins > 0)
    str = `${time.hours}hour, ${time.mins}mins`;
  else if (fullHours < 1) str = `${time.mins}mins`;
  else if (fullHours > 1 && time.mins === 0) str = `${time.hours} hours`;
  else if (fullHours > 1 && time.mins > 0)
    str = `${time.hours}hours, ${time.mins}mins`;
  return str;
}
