// models/Book.js

const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: true,
    minlength: [3, "Title must be at least 2 characters long"],
  }, //added index for title
  author: {
    type: String,
    required: true,
    index: true,
    minlength: [3, "Author must be at least 3 characters long"],
  }, //added index for Author
  year: {
    type: Number,
    required: true,
    min: [1000, "Year must be greater than or equal to 1000"],
  },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
