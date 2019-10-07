const mongojs = require("mongojs");
const databaseUrl = "web-scraper-news";
const collections = ["newsPosts"];

module.exports = function() {
  const db = mongojs(databaseUrl, collections);
  db.on("error", function(error) {
    console.log("Database Error:", error);
  });
  console.log(db);
};
