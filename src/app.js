var express = require("express");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "http://localhost:8080",
    // methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    // preflightContinue: false,
    // optionsSuccessStatus: 204,
  })
);

var bodyParser = require("body-parser");

var Database = require("./db/database"); //create database
var recipe = require("./routes/recipe");
var category = require("./routes/category");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Website routes
app.use("/recipe", recipe);
app.use("/category", category);

app.listen(3000, function () {
  console.log("Starting at port 3000...");
});
