// Dependencies
const express = require("express");
const exphbs = require("express-handlebars");
// const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");

// Initialize Express
const app = express();

// Database configuration
const databaseUrl = "web-scraper-news";
const collections = ["newsPosts"];

axios
  .get("https://www.nytimes.com/section/technology")
  .then(function(responce) {
    const $ = cheerio.load(responce.data);
    const results = [];

    $("div.css-1l4spti").each(function(i, element) {
      const title = $(element)
        .children()
        .children()
        .text();

      const link = $(element)
        .children()
        .attr("href");

      results.push({
        link,
        title
      });
    });
    console.log(results);
  });

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
// require("./routes/api-routes.js")(app);

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
