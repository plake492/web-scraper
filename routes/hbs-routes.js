// const results = require("../server")(send);
const axios = require("axios");
const cheerio = require("cheerio");

const results = [];

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

module.exports = function(app) {
  app.get("/", function(req, res) {
    res.render("index", {
      list: results
    });
  });
};
