var express = require("express");

var router = express.Router();
var Recipe = require("../db/models/recipe");

const statusMessage = require("../utils/constants/statusMessage");

var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
/**
 * Loading all recipe
 */
router.get("/", (req, res) => {
  Recipe.aggregate([
    {
      $lookup: {
        from: "category",
        localField: "category",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 0 } }], //remove field _id in category array
        as: "category",
      },
    },
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

/**
 * Add new Recipe
 */
router.post("/", (req, res) => {
  // let newRecipe = new Recipe(recipe);
  const body = req.body || {};
  let newRecipe = new Recipe({
    name: body.name,
    image: body.image,
    category: body.category?.map(ObjectId),
    desc: body.desc,
    content: body.content,
    author: ObjectId(body.author),
    ingredients: body.ingredients?.map((el) => ({
      _id: ObjectId(el),
    })),
    tags: body.tags?.map(ObjectId),
  });
  newRecipe
    .save()
    .then((doc) => {
      res.send(doc);
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log("Error: ", err);
      throw err;
    });
});

/**
 * Trending recipe
 */
router.get("/trending", (req, res) => {
  Recipe.aggregate([
    {
      $lookup: {
        from: "category",
        localField: "category",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 0 } }], //remove field _id in category array
        as: "category",
      },
    },
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
  ])
    .sort({ updatedAt: -1 })
    .limit(3)
    .exec((err, data) => {
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

/**
 * Delete recipe
 */
router.delete("/:recipeId", (req, res) => {
  let recipeId = req.params.recipeId;
  Recipe.findByIdAndDelete(recipeId, (err, doc) => {
    if (err) throw err;
    res.send(doc);
  });
});

/**
 * Update recipe
 */
router.put("/:recipeId", (req, res) => {
  let recipeId = req.params.recipeId;
  const body = req.body || {};

  Recipe.findByIdAndUpdate(
    { _id: recipeId },
    {
      $set: {
        name: body.name,
        type: body.type,
        image: body.image,
        category: body.category,
        desc: body.desc,
        content: body.content,
        author: body.author,
        ingredients: body.ingredients,
        tags: body.tags,
      },
    },
    { useFindAndModify: false }
  ).then((doc) => {
    res.send(doc);
  });
});

module.exports = router;
