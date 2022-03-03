var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var tagSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    item_id: {
      type: [Schema.Types.ObjectId],
      default: undefined,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tag", tagSchema, "tag");
