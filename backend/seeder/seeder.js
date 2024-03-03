require("dotenv").config();
const connectDB = require("../config/db");
connectDB();

const courseData = require("./courses");

const Course = require("../models/BookModel");

const importData = async () => {
  try {
    await Course.collection.dropIndexes();

    await Course.collection.deleteMany({});

    if (process.argv[2] !== "-d") {
      await Course.insertMany(courseData);

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
