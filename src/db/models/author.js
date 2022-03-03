var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var contactSchema = Schema({
  name: String,
  icon: String,
  link: String,
});

var authorSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    image: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    contact: {
      type: [contactSchema],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("author", authorSchema, "author");
