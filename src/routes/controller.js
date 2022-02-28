var express = require("express");

var router = express.Router();
var Recipe = require("../db/models/recipe");

const statusMessage = require("../utils/constants/statusMessage");

var mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
/**
 * Home page: loading all recipe
 */
router.get("/recipe", (req, res) => {
  Recipe.aggregate([
    {
      $lookup: {
        from: "category",
        localField: "category",
        foreignField: "_id",
        pipeline: [{ $project: { _id: 0 } }],
        as: "category",
      },
    },
  ]).exec((err, data) => {
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

/**
 * Add new Recipe
 */
router.post("/recipe", (req, res) => {
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
 * Delete recipe
 */
router.delete("/recipe/:recipeId", (req, res) => {
  let recipeId = req.params.recipeId;
  Recipe.findByIdAndDelete(recipeId, (err, doc) => {
    if (err) throw err;
    res.send(doc);
  });
});

/**
 * Update recipe
 */
router.put("/recipe/:recipeId", (req, res) => {
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
