// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
// const mongojs = require("mongojs");

// Initialize Express
const app = express();

// Database configuration
const databaseUrl = "web-scraper-news";
const collections = ["newsPosts"];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// app.get("/", function(req, res) {
//   res.render("index", {
//     list: results
//   });
// });

// // Hook mongojs configuration to the db constiable
// const db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

// Main route (simple Hello World Message)
// app.get("/", function(req, res) {
//   res.render("Hello world");
// });

// app.get("/", function(req, res) {
//   res.render("index", {
//     list: "HELLO"
//   });
// });
// require("./routes/hbs-routes.js")(app);
require("./routes/hbs-routes")(app);

app.listen(3000, function() {
  console.log("App running on port 3000!");
});
