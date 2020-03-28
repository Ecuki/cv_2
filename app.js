const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("./config.js");
const dotenv = require("dotenv");

dotenv.config();
// routes

const app = express();

// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan("dev"));
// Bodyparser Middleware
app.use(bodyParser.json());

console.log("HALLO" + howtos);
// DB Config
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var howtos = express.Router();
require("./server/howto.routes.js")(howtos);
app.use("/api", howtos);
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(config.MONGO_URI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database. Exiting now...", err);
    process.exit();
  });
// Use Routes

if (process.env.NODE_ENV === "production") {
  // app.use("/", express.static(process.env.PWD + "/client/build"));
  app.use(express.static(path.resolve(__dirname, "./client/build")));

  app.get("*", (req, res) => {
    res.sendFile(
      // path.resolve(process.env.PWD, "client", "build", "index.html")
      res.sendFile(path.resolve(__dirname, "./client/build", "index.html"))
    );
  });
}

module.exports = app;
