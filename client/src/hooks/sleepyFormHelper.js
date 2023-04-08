export default function sleepyFormHelper(values) {
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options1 = { timeZone: currentTimeZone, timeZoneName: "short" };
  const options = {
    hour12: false,
  };
  let sleepData = {
    date: values.date.$d.toLocaleDateString("en-US", options1),
    wakeUp: values.wakeUp.$d.toLocaleTimeString("en-US", options),
    bedTime: values.bedTime.$d.toLocaleTimeString("en-US", options),
    nap1Start: values.nap1TimeRange[0].$d.toLocaleTimeString("en-US", options),
    nap1End: values.nap1TimeRange[1].$d.toLocaleTimeString("en-US", options),
    nap2Start: null,
    nap2End: null,
    nap3Start: null,
    nap3End: null,
    nap4Start: null,
    nap4End: null,
  };

  if (values.nap2TimeRange) {
    sleepData.nap2Start = values.nap2TimeRange[0].$d.toLocaleTimeString(
      "en-US",
      options
    );
    sleepData.nap2End = values.nap2TimeRange[1].$d.toLocaleTimeString(
      "en-US",
      options
    );
  }

  if (values.nap3TimeRange) {
    sleepData.nap3Start = values.nap3TimeRange[0].$d.toLocaleTimeString(
      "en-US",
      options
    );
    sleepData.nap3End = values.nap3TimeRange[1].$d.toLocaleTimeString(
      "en-US",
      options
    );
  }
  if (values.nap4TimeRange) {
    sleepData.nap4Start = values.nap4TimeRange[0].$d.toLocaleTimeString(
      "en-US",
      options
    );
    sleepData.nap4End = values.nap4TimeRange[1].$d.toLocaleTimeString(
      "en-US",
      options
    );
  }
  if (values.bd) {
    sleepData.bd = values.bd.$d.toLocaleDateString("en-US", options1);
  }

  return sleepData;
}
