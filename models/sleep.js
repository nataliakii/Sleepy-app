const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define our model
const sleepySchema = new Schema({
  id: Number,
  date: Date,
  age: Object,
  wakeUp:String,
  ww1:String,
  nap1:Object({start: String, end: String}),
  ww2: String,
  nap2:Object({start: String, end: String}),
  ww3: String,
  nap3:Object({start: String, end: String}),
  ww4: String,
  nap4:Object({start: String, end: String}),
  ww5: String,
  bedTime: String,
  sumNap: String,
  lastNap: String,
  numberOfNaps:Number,
  result: Object  
});

const SleepyModel = mongoose.model("sleep", sleepySchema);

module.exports = {
  SleepyModel,
  SleepySchema: sleepySchema,
};