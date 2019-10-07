const db = require("../connections/db");

module.exports = function(app) {
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
};
