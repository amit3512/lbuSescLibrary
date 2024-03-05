require("dotenv").config();
const connectDB = require("../config/db");
connectDB();

const booksData = require("./books");

const Book = require("../models/BookModel");

const importData = async () => {
  try {
    await Book.collection.dropIndexes();

    await Book.collection.deleteMany({});

    if (process.argv[2] !== "-d") {
      await Book.insertMany(booksData);

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
