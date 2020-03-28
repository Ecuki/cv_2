const app = require("./app");
const config = require("./config");
const dotenv = require("dotenv");

dotenv.config();
const PORT = config.PORT || 5000;
app.listen(PORT, process.env.IP, () => {
  console.log("Server is listening on port" + PORT);
});
// app.listen(PORT || 5000, process.env.IP, function() {
//   console.log("Server started on port 3000");
// });
// const express = require("express");
// const bodyParser = require("body-parser");
// const path = require("path");
// if (process.env.NODE_ENV !== "production") {
//   require("dotenv").config();
// }
// const app = express();
// const PORT = 5000;

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(express.static(path.resolve(__dirname, "./client/build")));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// require("./server/howto.routes.js")(app);
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
// app.get("*", function(request, response) {
//   response.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
// });
// app.listen(PORT, () => {
//   console.log("Server is listening on port" + PORT);
// });

// "start": "concurrently \"nodemon server/server.js\" \"npm run client\"",
// "server": "nodemon server.js",
// "client": "npm start --prefix client",
// "client-install": "npm install --prefix client",
// "dev": "concurrently \"nodemon server/server.js\" \"npm run client\"",
// "heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
