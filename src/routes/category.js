var express = require("express");

var router = express.Router();
var Category = require("../db/models/category");

const statusMessage = require("../utils/constants/statusMessage");

var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
/**
 * Loading all category
 */
router.get("/", (req, res) => {
  Category.find().exec((err, data) => {
    if (err) {
      console.log("Error: ", err);
      res.status(500).send(err);
    } else {
      res.send({
        status: res.statusCode,
        message: statusMessage[200],
        data: data,
      });
    }
  });
});

module.exports = router;
