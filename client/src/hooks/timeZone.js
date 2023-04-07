export default function timeZone(date, value = null) {
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options1 = { timeZone: currentTimeZone, timeZoneName: "short" };
  const localDate = date.toLocaleDateString("end-US", options1);

  if (!value) {
    return { localDate, updatedValue: null };
  } else {
    const dateObj = new Date(date);
    const newDay = dateObj.getUTCDate() + 1;
    const newMonth = dateObj.toLocaleString("default", { month: "short" });
    const newYear = dateObj.getFullYear();
    console.log("value", value);
    const updated = value.replace(
      /\d{1,2} \w{3} \d{4}/,
      `${newDay} ${newMonth} ${newYear}`
    );
    const options = {
      timeZone: currentTimeZone,
      timeZoneName: "short",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };
    const formatter = new Intl.DateTimeFormat(undefined, options);
    const updatedValue = formatter.format(new Date(updated));
    console.log(updatedValue);
    return { localDate, updatedValue };
  }
}
