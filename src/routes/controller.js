var express = require("express");
var router = express.Router();
var Recipe = require("../db/models/recipe");
const recipe = require("../mock-data/recipe");

/**
 * Home page: loading all recipe
 */
router.get("/recipe", (req, res) => {
  // Recipe.find({})
  //   .then((recipes) => {
  //     res.send(recipes);
  //   })
    Recipe.aggregate([{
      $lookup: {
        from: "category",
        pipeline: [
          { $match: {
            _id: {
              $in: ["category"]
            } 
          } },
          { $project: { _id: 0, category: { name: "$name", image: "$image" } } },
          { $replaceRoot: { newRoot: "$category" } }
       ],
        as: "category"
      }
    },]).exec((err, recipes) => {
      if (err) {
        console.log("Error: ", err);
        res.status(500).send(err);
      } else {
        res.send(recipes);
      }
    })
});

/**
 * Add new Recipe
 */
router.post("/recipe", (req, res) => {
  // let newRecipe = new Recipe(recipe);
  const body = req.body || {};
  let newRecipe = new Recipe({
    name: body.name,
    type: body.type,
    image: body.image,
    category: body.category,
    desc: body.desc,
    content: body.content,
    author: body.author,
    ingredients: body.ingredients,
    tags: body.tags
  })
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
    { $set: { 
      name: body.name,
      type: body.type,
      image: body.image,
      category: body.category,
      desc: body.desc,
      content: body.content,
      author: body.author,
      ingredients: body.ingredients,
      tags: body.tags    
    } },
    { useFindAndModify: false }
  ).then((doc) => {
    res.send(doc);
  });
});

module.exports = router;