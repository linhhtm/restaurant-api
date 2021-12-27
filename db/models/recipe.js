var mongoose = require("mongoose");

var recipeSchema = mongoose.Schema({
  name: {
    type: String,
  },
  image: {
    type: String,
  },
  category: {
    name: {
      type: String,
    },
  },
  desc: {
    type: String,
  },
  content: { type: String },
  author: {
    name: {
      type: String,
    },
  },
  createdAt: {
    type: Date,
  },
  ingredients: [
    {
      name: { type: String },
      quantity: { type: Number },
      unit: { type: String },
    },
  ],
  tags: [
    {
      name: { type: String },
    },
  ],
});

module.exports = mongoose.model("recipe", recipeSchema, "recipe");
