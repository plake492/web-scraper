const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NewPostSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true
  },
  image: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    unique: true
  },
  link: {
    type: String,
    unique: true
  },
  postCreated: {
      type: Date,
      default: Date.now
  }
});

const NewPost = mongoose.model("NewPost", NewPostSchema);

module.exports = NewPost;
