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

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  // app.use(express.static("client/build"));
  app.use("/", express.static(process.env.PWD + "/client/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.resolve(process.env.PWD, "client", "build", "index.html")
    );
  });
}

module.exports = app;
// DB Config
// const db = `${config.MONGO_URI}`;

// Connect to Mongo
// mongoose
//   .connect(db, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useUnifiedTopology: true
//   }) // Adding new mongo url parser
//   .then(() => console.log("MongoDB Connected..."))
//   .catch(err => console.log(err));

//const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
// const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;

// // Connecting to the database
// mongoose
//   .connect(process.env.REACT_APP_MONGODB, {
//     useNewUrlParser: true
//   })
//   .then(() => {
//     console.log("Successfully connected to the database");
//   })
//   .catch(err => {
//     console.log("Could not connect to the database. Exiting now...", err);
//     process.exit();
//   });

// // Use Routes
// app.use("/api/howtos", routes);

// // Serve static assets if in production
// if (process.env.NODE_ENV === "production") {
//   // Set static folder
//   app.use(express.static("client/build"));

//   app.get("*", (req, res) => {
//     console.log(req);
//     console.log(res);
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

// module.exports = app;
