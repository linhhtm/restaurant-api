var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", categorySchema, "category");
