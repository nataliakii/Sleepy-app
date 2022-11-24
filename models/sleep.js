const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const sleepySchema = new Schema({
  id: Number,
  date: Date,
  // age: Object,
  wakeUp:String,
  // ww1:String,
  // nap1:Object({start: String, end: String}),
  // ww2: String,
  // nap2:String,
  // ww3: String,
  // nap3:String,
  // ww4: String,
  // nap4:String,
  bedTime: String,

  // sumAwake: String,
  // lastNap: String,
  // nightSleep:String

});

const SleepyModel = mongoose.model("sleep", sleepySchema);

module.exports = {
  SleepyModel,
  SleepySchema: sleepySchema,
};