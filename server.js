require('dotenv').config()
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require("mongoose");
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user');
const allRouter = require('./routes/all');
const cors = require('cors');
const connectDB = require("./config/db");


// DB Setup
// connectDB()

// Mongoose connection
const db = mongoose.connection;

//mongoose connect
mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true
});


app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use('/user', require('./routes/user'));
app.use('/api', require('./routes/all'));
authRouter(app);


// Server Setup
const port = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);
