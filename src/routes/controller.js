var express = require("express");
var router = express.Router();
var Recipe = require("../db/models/recipe");
const recipe = require("../mock-data/recipe");

/**
 * Home page: loading all recipe
 */
router.get("/recipe", (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      res.send(recipes);
    })
    .catch((err) => {
      console.log("Error: ", err);
      res.status(500).send(err);
      throw err;
    });
});

/**
 * Add new Recipe
 */
router.post("/recipe", (req, res) => {
  // let newRecipe = new Recipe(recipe);
  const body = req.body || {};
  console.log(body.name)
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
      res.redirect("/");
    })
    .catch((err) => {
      res.status(500).send(err);
      console.log("Error: ", err);
      throw err;
    });
});

/**
 * Go to Update Recipe page
 */
router.get("/update-recipe/:recipeId", async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.recipeId).exec();
    res.send(recipe);
    // res.render('update-recipe', { recipe: recipe });
  } catch (err) {
    res.status(500).send(err);
  }
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
router.post("/:recipeId", (req, res) => {
  let recipeId = req.params.recipeId;
  Recipe.findByIdAndUpdate(
    { _id: recipeId },
    { $set: { name: req.body.recipeName, type: req.body.recipeType } },
    { useFindAndModify: false }
  ).then((doc) => {
    res.redirect("/");
  });
});

module.exports = router;
