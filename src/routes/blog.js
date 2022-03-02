var express = require("express");

var router = express.Router();
var Blog = require("../db/models/blog");

const statusMessage = require("../utils/constants/statusMessage");

var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
/**
 * Loading all blog
 */
router.get("/", (req, res) => {
  Blog.aggregate([
    {
      $lookup: {
        from: "author",
        localField: "author",
        foreignField: "_id",
        pipeline: [{ $project: { name: 1 } }],
        as: "author",
      },
    },
    { $unwind: "$author" },
  ]).exec((err, data) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).send(err);
    } else {
      res.send({
        status: res.statusCode,
        message: statusMessage[res.statusCode],
        data: data,
      });
    }
  });
});

module.exports = router;
