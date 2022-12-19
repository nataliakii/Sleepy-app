const mongoose = require("mongoose");
require("dotenv").config();
const keys = require("./keys");

const connectDB = async () => {
  try {
    await mongoose.connect(keys.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;