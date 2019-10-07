const express = require("express");
const exphbs = require("express-handlebars");
const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");

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

//?==================================================//
//!                    database                      //
//?==================================================//

const results = [];

const db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.get("/", function(req, res) {
  db.newsPosts.find({}, function(error, found) {
    if (error) {
      console.log(error);
    } else {
      res.render("index", {
        list: found
      });
    }
  });
});

app.get("/all", function(req, res) {
  db.newsPosts.find({}, function(error, found) {
    if (error) {
      console.log(error);
    } else {
      res.json(found);
    }
  });
});

app.get("/scrape", function(req, res) {
  results;
  console.log("This is the result" + results);
  // if (title && link && image && description) {
  // Insert the data in the scrapedData db
  db.newsPosts.insert(results, function(err, inserted) {
    if (err) {
      console.log(err);
    } else {
      console.log(inserted);
    }
  });
  res.send("Scrape Complete");
});

//?==================================================//
//!                    scrapping                     //
//?==================================================//

axios
  .get("https://www.nytimes.com/section/technology")
  .then(function(responce) {
    const $ = cheerio.load(responce.data);

    $("div.css-1l4spti").each(function(i, element) {
      const title = $(element)
        .children()
        .children("h2")
        .text();
      const image = $(element)
        .children()
        .children()
        .children("figure")
        .children()
        .children("img")
        .attr("src");
      const description = $(element)
        .children()
        .children()
        .text();
      const link = $(element)
        .children()
        .attr("href");

      results.push({
        title,
        image,
        description,
        link: `https://www.nytimes.com/${link}`
      });
    });
    console.log(results);
  });

//?==================================================//
//!                    Handlebars                    //
//?==================================================//

// require("./routes/api-routes")(app);
// require("./routes/hbs-routes")(app);
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
