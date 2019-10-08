const databaseUrl = "web-scraper-news";
const collections = ["newsPosts", "postComments"];

const db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});