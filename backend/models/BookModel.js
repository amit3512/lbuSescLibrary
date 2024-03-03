const mongoose = require("mongoose");

// Define the Student schema
const bookSchema = new mongoose.Schema({
  isbm: { type: String, unique: true },
  title: { type: String, unique: true },
  author: { type: String, unique: true },
  copies: { type: String, unique: true },
});

// Create the Account model
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
