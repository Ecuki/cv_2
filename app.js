const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const config = require("./config.js");
const dotenv = require("dotenv");
const compression = require("compression");
dotenv.config();
// routes

const app = express();
app.use(compression());
// CORS Middleware
app.use(cors());
// Logger Middleware
app.use(morgan("dev"));
// Bodyparser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
// Connecting to the database
mongoose.Promise = global.Promise;
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
  app.use("/", express.static(process.env.PWD + "/client/build"));
  // app.use(express.static(path.resolve(__dirname, "./client/build")));
  // app.use(express.static("client/build"));

  console.log("Dirname" + __dirname);
  console.log("PWD" + process.env.PWD);

  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(process.env.PWD, "client", "build", "index.html")
      // path.resolve(__dirname, "./client/build", "index.html")
      // path.resolve(__dirname, "client", "build", "index.html")
      // path.join(__dirname, "client", "build", "index.html")
    );
  });
}

module.exports = app;
