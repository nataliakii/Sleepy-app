const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  id: Number,
  name: String,
  tags:Array,
  content:Array,
});

const ArticleModel = mongoose.model("article", articleSchema);

module.exports = ArticleModel