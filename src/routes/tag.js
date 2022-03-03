var express = require("express");

var router = express.Router();
var Tag = require("../db/models/tag");

const statusMessage = require("../utils/constants/statusMessage");

var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
/**
 * Loading all tag
 */
router.get("/", (req, res) => {
  Tag.find().exec((err, data) => {
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

router.post("/", (req, res) => {
  const body = req.body || {};
  const data = new Tag({
    name: body.name,
  });
  data
    .save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.send(err);
      console.log("Error: ", err);
      throw err;
    });
});

module.exports = router;
