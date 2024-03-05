const mongoose = require("mongoose");

// Define the Student schema
const bookSchema = new mongoose.Schema({
  isbn: { type: String, unique: true },
  title: { type: String, unique: true },
  author: { type: String, unique: true },
  copies: { type: String, unique: true },
  year: { type: String },
});

// Create the Account model
const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
