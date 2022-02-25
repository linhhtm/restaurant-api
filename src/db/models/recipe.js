var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ingredientSchema = Schema({
  _id: { type: Schema.Types.ObjectId, required: true },
  name: { type: String },
  quantity: { type: Number },
  unit: { type: String },
})

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
    type: [Schema.Types.ObjectId],
    required: true,
    default: undefined
  },
  desc: {
    type: String,
    required: true,
  },
  content: { type: String, required: true },
  author: Schema.Types.ObjectId,
  ingredients: {
    type: [ingredientSchema],
    default: undefined,
  },
  tags: {
    type: [Schema.Types.ObjectId],
    default: undefined,
  },
},
  {
    timestamps: true
  });

module.exports = mongoose.model("recipe", recipeSchema, "recipe");
