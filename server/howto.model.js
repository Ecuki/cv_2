const mongoose = require("mongoose");

const HowToSchema = mongoose.Schema(
  {
    description: String,
    url: String,
    text: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("HowTo", HowToSchema);
