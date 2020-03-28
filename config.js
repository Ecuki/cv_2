const dotenv = require("dotenv");

dotenv.config();

module.exports = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.REACT_APP_MONGODB
};
