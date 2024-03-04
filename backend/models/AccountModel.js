const mongoose = require("mongoose");

// Define the Student schema
const accountSchema = new mongoose.Schema({
  studentId: { type: String, unique: true },
  pin: String,
  isFirstLogin: { type: Boolean, default: true },
  books: [
    {
      isbm: { type: String, unique: true },
      borrowDate: { type: Date },
      returnDate: { type: Date },
      dueDate: { type: Date },
      isReturned: { type: Boolean },
      overDue: { type: String },
    },
  ],
});

// Create the Account model
const Account = mongoose.model("Account", accountSchema);

module.exports = Account;
