require("dotenv").config();
const connectDB = require("../config/db");
connectDB();

const accountData = require("./accounts");
const booksData = require("./books");

const Account = require("../models/AccountModel");
const Book = require("../models/BookModel");

const importData = async () => {
  try {
    await Book.collection.dropIndexes();

    await Book.collection.deleteMany({});

    await Account.collection.deleteMany({});
    await Account.collection.deleteMany({});

    if (process.argv[2] !== "-d") {
      //Seed books data
      await Book.insertMany(booksData);
      // Seed admin user
      const existingAdmin = await Account.findOne({ studentId: "admin" });
      if (!existingAdmin) {
        const admin = new Account(accountData);
        await admin.save();
      }

      console.log("Seeder data imported successfully");
      process.exit();
      return;
    }
    console.log("Seeder data deleted successfully");
    process.exit();
  } catch (error) {
    console.error("Error while proccessing seeder data", error);
    process.exit(1);
  }
};
importData();
