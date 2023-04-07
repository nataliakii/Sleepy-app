export default function sleepyFormHelper(values) {
  const currentTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const options1 = { timeZone: currentTimeZone, timeZoneName: "short" };
  let sleepData = {
    date: values.date.$d.toLocaleDateString("end-US", options1),
    wakeUp: values.wakeUp.$d.toLocaleTimeString(),
    bedTime: values.bedTime.$d.toLocaleTimeString(),
    nap1Start: values.nap1TimeRange[0].$d.toLocaleTimeString(),
    nap1End: values.nap1TimeRange[1].$d.toLocaleTimeString(),
    nap2Start: null,
    nap2End: null,
    nap3Start: null,
    nap3End: null,
    nap4Start: null,
    nap4End: null,
  };

  if (values.nap2TimeRange) {
    sleepData.nap2Start = values.nap2TimeRange[0].$d.toLocaleTimeString();
    sleepData.nap2End = values.nap2TimeRange[1].$d.toLocaleTimeString();
  }

  if (values.nap3TimeRange) {
    sleepData.nap3Start = values.nap3TimeRange[0].$d.toLocaleTimeString();
    sleepData.nap3End = values.nap3TimeRange[1].$d.toLocaleTimeString();
  }
  if (values.nap4TimeRange) {
    sleepData.nap4Start = values.nap4TimeRange[0].$d.toLocaleTimeString();
    sleepData.nap4End = values.nap4TimeRange[1].$d.toLocaleTimeString();
  }

  return sleepData;
}
