require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    console.log("MongoDB Here Reach");

    // await mongoose.connect(process.env.MONGO_URI, {
    await mongoose.connect("mongodb://localhost:27017/library", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB Here Reach and Connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

// const connectDB = async () => {
//   try {
//     const response = await mongoose.connect(
//       "mongodb+srv://strawhatamit07:erKuOMFxd6Eq3cgE@lbu.8gkl7rr.mongodb.net/sesc?retryWrites=true&w=majority",
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         connectTimeoutMS: 30000, // 30 seconds
//         socketTimeoutMS: 30000, // 30 seconds
//       }
//     );
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.error("MongoDB Connection Error:", error);
//     process.exit(1);
//   }
// };

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI);
//     console.log("MongoDB Connected");
//   } catch (error) {
//     console.error("MongoDB Connection Error:", error);
//     process.exit(1);
//   }
// };

module.exports = connectDB;
