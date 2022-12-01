const calculateAge=()=>{
  let monthAge=0
  let dateAge=0
  const dob=new Date(req.user.kidBD);  
  const dobYear = dob.getYear();  
  const dobMonth = dob.getMonth();  
  const dobDate = dob.getDate();  
  const now = new Date(req.body.sleepData.date);  
  const currentYear = now.getYear();  
  const currentMonth = now.getMonth();  
  const currentDate = now.getDate();  
  yearAge = currentYear - dobYear;  
  if (currentMonth >= dobMonth)  {
    monthAge = currentMonth - dobMonth;  }
  else {  
    yearAge--;  
    monthAge = 12 + currentMonth - dobMonth;  
  }  
  if (currentDate >= dobDate)  {
  dateAge = currentDate - dobDate;  }
  else {  
  monthAge--;  
  dateAge = 31 + currentDate - dobDate;  
  }
  if (monthAge < 0) {  
  monthAge = 11;  
  yearAge--;  
  }   
 return {
    years: yearAge,  
    months: monthAge,  
    days: dateAge
  }
}

const getTimeDiff=(start, end) =>{
  const [startHour, startMins] = start.split(":");
  const [endHour, endMins] = end.split(":");

  const diffHour = endHour - startHour;
  const diffMins = endMins - startMins;

  const isSameHour = diffHour === 0;
  if (isSameHour) return endMins - startMins;

  const diffHourIntoMins = diffHour * 60;
  return diffHourIntoMins + diffMins;
}

const calculateWw =()=>{
  const ww1=getTimeDiff(req.body.sleepData.wakeUp,req.body.sleepData.nap1Start)
  const nap2Start=req.body.sleepData.nap2Start
  const nap3Start=req.body.sleepData.nap3Start
  const nap4Start=req.body.sleepData.nap4Start
  let ww2=0
  let ww3=0
  let ww4=0
  let ww5=0
  let lastNap=''

  if(!nap2Start){
    ww2=getTimeDiff(req.body.sleepData.nap1End, req.body.sleepData.bedTime)
    lastNap=req.body.sleepData.nap1End
  } else if (!nap3Start){
      ww2=getTimeDiff(req.body.sleepData.nap1End, req.body.sleepData.nap2Start)
      ww3=getTimeDiff(req.body.sleepData.nap2End, req.body.sleepData.bedTime)
      lastNap=req.body.sleepData.nap2End}
      else if(!nap4Start) {
        ww3=getTimeDiff(req.body.sleepData.nap2End, req.body.sleepData.nap3Start)
        ww4=getTimeDiff(req.body.sleepData.nap2End, req.body.sleepData.nap3Start)
        lastNap=req.body.sleepData.nap3End
          }
        else {
          ww4=getTimeDiff(req.body.sleepData.nap3End, req.body.sleepData.bedTime)
          ww5=getTimeDiff(req.body.sleepData.nap4End, req.body.sleepData.bedTime)
          lastNap=req.body.sleepData.nap4End
        }
    
return {
  ww1:ww1,
  ww2:ww2,
  ww3:ww3 || 0,
  ww4:ww4 || 0,
  ww5:ww5 || 0,
  lastNap:lastNap
}
}

const calculateSumAwake=()=>{
  const arr=_.compact([calculateWw().ww1,calculateWw().ww2,calculateWw().ww3,calculateWw().ww4])
  return _.sum(arr)
}




module.exports = {
  calculateAge: calculateAge(),
  getTimeDiff: getTimeDiff(),
  calculateWw:calculateWw(),
  calculateSumAwake:calculateSumAwake()
};