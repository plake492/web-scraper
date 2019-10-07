const db = require("../connections/db.js");
const results = require("../data/scrapper.js");
console.log("RESRESRESREWSR" + results);

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
};
