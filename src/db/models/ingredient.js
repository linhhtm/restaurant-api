var mongoose = require("mongoose");

var ingredientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("ingredient", ingredientSchema, "ingredient");
