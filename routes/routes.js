const mongojs = require("mongojs");
const axios = require("axios");
const cheerio = require("cheerio");

// const databaseUrl = "web-scraper-news";
const collections = ["newsPosts", "postComments"];

const db = mongojs(
  `mongodb://plake492:coding492@ds127994.mlab.com:27994/heroku_hvrgjzcx`,
  collections
);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

module.exports = function(app) {
  app.get("/all", function(req, res) {
    db.newsPosts.find({}, function(error, found) {
      if (error) {
        console.log(error);
      } else {
        res.json(found);
      }
    });
  });

  const results = [];

  app.get("/scrape", function(req, res) {
    console.log("+++++++++ Scrapping ++++++++++");

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
            .text()
            .split("Image")
            .join(" ");
          const link = $(element)
            .children()
            .attr("href");
          resultsPush(title, image, description, link);
        });
        console.log(results);
        db.newsPosts.insert(results, function(err, inserted) {
          if (err) {
            console.log(err);
          } else {
            console.log(inserted);
          }
        });
        res.send("Scrape Complete");
      });
    console.log("This is the result" + results);
  });

  app.get("/delete/:id", function(req, res) {
    db.newsPosts.remove(
      {
        _id: mongojs.ObjectID(req.params.id)
      },
      function(error, removed) {
        if (error) {
          console.log(error);
          res.send(error);
        } else {
          console.log(removed);
          res.send(removed);
        }
      }
    );
  });

  app.post("/post_comment", function(req, res) {
    console.log("THIS IS THE BODY" + req.body);
    db.postComments.insert(req.body, function(error, saved) {
      if (error) {
        console.log(error);
      } else {
        res.send(saved);
      }
    });
  });

  function resultsPush(title, image, description, link) {
    results.push({
      title,
      image,
      description,
      link: `https://www.nytimes.com/${link}`
    });
  }

  app.get("/", function(req, res) {
    db.newsPosts.find({}, function(error, found) {
      if (error) {
        console.log(error);
      }
      db.postComments.find({}, function(error, data) {
        if (error) {
          console.log(error);
        } else {
          res.render("index", {
            comments: data,
            list: found
          });
        }
      });
    });
  });
};

//!============================================================================//

// // const mongojs = require("mongojs");
// const axios = require("axios");
// const cheerio = require("cheerio");
// const db = require("../models/Technews");
// var mongoose = require("mongoose");

// module.exports = function(app) {
//   // app.get("/all", function(req, res) {
//   //   db.NewPost.find({}, function(error, found) {
//   //     if (error) {
//   //       console.log(error);
//   //     } else {
//   //       res.json(found);
//   //     }
//   //   });
//   // });
//   mongoose.connect("mongodb://localhost/unit18Populater", {
//     useNewUrlParser: true
//   });

//   app.get("/scrape", function(req, res) {
//     console.log("+++++++++ Scrapping ++++++++++");

//     axios
//       .get("https://www.nytimes.com/section/technology")
//       .then(function(responce) {
//         const $ = cheerio.load(responce.data);

//         $("div.css-1l4spti").each(function(i, element) {
//           const result = {};

//           result.title = $(this)
//             .children()
//             .children("h2")
//             .text();
//           result.image = $(this)
//             .children()
//             .children()
//             .children("figure")
//             .children()
//             .children("img")
//             .attr("src");
//           result.description = $(this)
//             .children()
//             .children()
//             .text();
//           result.link = $(this)
//             .children()
//             .attr("href");

//           console.log(result);

//           db.NewPost.create(result)
//             .then(function(webScraperNews) {
//               console.log(webScraperNews);
//             })
//             .catch(function(err) {
//               // If an error occurred, log it
//               console.log(err);
//             });

//           res.send("Scrape Complete");
//         });
//       });
//   });

//   // app.get("/delete/:id", function(req, res) {
//   //   db.newsPosts.remove(
//   //     {
//   //       _id: mongojs.ObjectID(req.params.id)
//   //     },
//   //     function(error, removed) {
//   //       if (error) {
//   //         console.log(error);
//   //         res.send(error);
//   //       } else {
//   //         console.log(removed);
//   //         res.send(removed);
//   //       }
//   //     }
//   //   );
//   // });

//   // app.post("/post_comment", function(req, res) {
//   //   console.log("THIS IS THE BODY" + req.body);
//   //   db.postComments.insert(req.body, function(error, saved) {
//   //     if (error) {
//   //       console.log(error);
//   //     } else {
//   //       res.send(saved);
//   //     }
//   //   });
//   // });

//   // function resultsPush(title, image, description, link) {
//   //   results.push({
//   //     title,
//   //     image,
//   //     description,
//   //     link: `https://www.nytimes.com/${link}`
//   //   });
//   // }

//   app.get("/", function(req, res) {
//     db.NewPost.find({})
//       .then(function(dbNewsPost) {
//         res.json(dbNewsPost);
//       })
//       .catch(function(err) {
//         res.json(err);
//       });

//     // db.NewPost.find({}, function(error, data) {
//     //   if (error) {
//     //     console.log(error);
//     //   } else {
//     //     res.render("index", {
//     //       comments: data,
//     //       list: found
//     //     });
//     //   }
//     // });
//   });
// };
