const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const normSchema = new Schema({
  id: Number,
  age: String,
  name: String,
  content:Object,
});

const NormModel = mongoose.model("norm", normSchema);

module.exports = NormModel