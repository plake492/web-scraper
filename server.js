const express = require("express");
const exphbs = require("express-handlebars");
const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");
const app = express();

// Database configuration
const databaseUrl = "web-scraper-news";
const collections = ["newsPosts", "postComments"];

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
//!                 Database                         //
//?==================================================//
// const db = mongojs(databaseUrl, collections);
// db.on("error", function(error) {
//   console.log("Database Error:", error);
// });

//?==================================================//
//!               News Posts Routes                  //
//?==================================================//
// app.get("/all", function(req, res) {
//   db.newsPosts.find({}, function(error, found) {
//     if (error) {
//       console.log(error);
//     } else {
//       res.json(found);
//     }
//   });
// });

// const results = [];

// app.get("/scrape", function(req, res) {
//   console.log("Scrapping");
//   axios
//     .get("https://www.nytimes.com/section/technology")
//     .then(function(responce) {
//       const $ = cheerio.load(responce.data);

//       $("div.css-1l4spti").each(function(i, element) {
//         const title = $(element)
//           .children()
//           .children("h2")
//           .text();
//         const image = $(element)
//           .children()
//           .children()
//           .children("figure")
//           .children()
//           .children("img")
//           .attr("src");
//         const description = $(element)
//           .children()
//           .children()
//           .text();
//         const link = $(element)
//           .children()
//           .attr("href");
//         resultsPush(title, image, description, link);
//       });
//       // const uniqueResluts = new Set(results);
//       // const newResults = [...uniqueResluts];
//       console.log(results);
//       db.newsPosts.insert(results, function(err, inserted) {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(inserted);
//         }
//       });
//       res.send("Scrape Complete");
//     });
//   console.log("This is the result" + results);
// });

// app.get("/delete/:id", function(req, res) {
//   db.newsPosts.remove(
//     {
//       _id: mongojs.ObjectID(req.params.id)
//     },
//     function(error, removed) {
//       if (error) {
//         console.log(error);
//         res.send(error);
//       } else {
//         console.log(removed);
//         res.send(removed);
//       }
//     }
//   );
// });
//?==================================================//
//!                 Comments Routes                  //
//?==================================================//
// app.post("/post_comment", function(req, res) {
//   console.log("THIS IS THE BODY" + req.body);
//   db.postComments.insert(req.body, function(error, saved) {
//     if (error) {
//       console.log(error);
//     } else {
//       res.send(saved);
//     }
//   });
// });

//?==================================================//
//!                    Scrapping                     //
//?==================================================//
// function resultsPush(title, image, description, link) {
//   results.push({
//     title,
//     image,
//     description,
//     link: `https://www.nytimes.com/${link}`
//   });
// }
//?==================================================//
//!                    Handlebars                    //
//?==================================================//
// app.get("/", function(req, res) {
//   db.newsPosts.find({}, function(error, found) {
//     if (error) {
//       console.log(error);
//     }
//     db.postComments.find({}, function(error, data) {
//       if (error) {
//         console.log(error);
//       } else {
//         res.render("index", {
//           comments: data,
//           list: found
//         });
//       }
//     });
//   });
// });

require("./routes/api-routes")(app);
// require("./routes/hbs-routes")(app);

app.listen(3000, function() {
  console.log("App running on port 3000!");
});
