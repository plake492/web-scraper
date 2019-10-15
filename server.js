const logger = require("morgan");
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

// const db = require("./models/Technews");

const app = express();

const PORT = process.env.MONGODB_URI || 8080;

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// mongoose.connect("mongodb://localhost/unit18Populater", {
//   useNewUrlParser: true
// });

app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

require("./routes/routes")(app);

app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
