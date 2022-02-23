var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var recipeSchema = Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: Array,
    default: [{
      _id: {
        type: Schema.Types.ObjectId,
      },
    }],
  },
  desc: {
    type: String,
    required: true,
  },
  content: { type: String, required: true },
  author: {
    type: Object,
    default: [{
      _id: {
        type: Schema.Types.ObjectId,
      },
    }]
  },
  ingredients: {
    type: Array,
    default: [{
      _id: { type: Schema.Types.ObjectId, required: true },
      name: { type: String },
      quantity: { type: Number },
      unit: { type: String },
    }],
  },
  tags: {
    type: Array,
    default: [{
      _id: { type: Schema.Types.ObjectId },
    }],
  },
}, {
  timestamps: true
});

module.exports = mongoose.model("recipe", recipeSchema, "recipe");
