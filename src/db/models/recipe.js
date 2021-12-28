var mongoose = require("mongoose");

var recipeSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    name: {
      type: String,
    },
  },
  desc: {
    type: String,
    required: true,
  },
  content: { type: String, required: true },
  author: {
    name: {
      type: String,
    },
  },
  ingredients: [
    {
      name: { type: String, required: true, },
      quantity: { type: Number, required: true, },
      unit: { type: String },
    },
  ],
  tags: [
    {
      name: { type: String },
    },
  ],
}, {
  timestamps: true
});

module.exports = mongoose.model("recipe", recipeSchema, "recipe");
