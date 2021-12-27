var express = require("express");
var router = express.Router();
var Recipe = require("../db/models/recipe");
const recipe = require("../mock-data/recipe");

/**
 * Home page: loading all recipe
 */
router.get("/", (req, res) => {
  Recipe.find({})
    .then((recipes) => {
      res.send(recipes);
      // res.render('home', { recipes: recipes })
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
router.post("/", (req, res) => {
  let newProduct = new Recipe(recipe);

  newProduct
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
router.get("/update-recipe/:productId", async (req, res) => {
  try {
    let recipe = await Recipe.findById(req.params.productId).exec();
    res.send(recipe);
    // res.render('update-recipe', { recipe: recipe });
  } catch (err) {
    res.status(500).send(err);
  }
});

/**
 * Delete recipe
 */
router.delete("/:productId", (req, res) => {
  let productId = req.params.productId;
  Recipe.findByIdAndDelete(productId, (err, doc) => {
    if (err) throw err;
    res.send(doc);
  });
});

/**
 * Update recipe
 */
router.post("/:productId", (req, res) => {
  let productId = req.params.productId;
  Recipe.findByIdAndUpdate(
    { _id: productId },
    { $set: { name: req.body.productName, type: req.body.productType } },
    { useFindAndModify: false }
  ).then((doc) => {
    res.redirect("/");
  });
});

module.exports = router;
