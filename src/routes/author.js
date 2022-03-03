var express = require("express");

var router = express.Router();
var Author = require("../db/models/author");

const statusMessage = require("../utils/constants/statusMessage");

var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
/**
 * Loading all author
 */
router.get("/", (req, res) => {
  Author.find().exec((err, data) => {
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
  const data = new Author({
    name: body.name,
    image: body.image,
    contact: body.contact?.map(ObjectId),
    desc: body.desc,
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
