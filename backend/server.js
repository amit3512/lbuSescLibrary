const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");

const apiRoutes = require("./routes/apiRoutes");

const httpServer = createServer(app);

app.use(cors());

app.use(express.json());
app.use(cookieParser());

// mongodb connection
const connectDB = require("./config/db");
connectDB();

app.use("/api", apiRoutes);

app.use((error, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    res.status(500).json({
      message: error.message,
      stack: error.stack,
    });
  } else {
    res.status(500).json({
      message: error.message,
    });
  }
});

const PORT = process.env.PORT || 5002;

// httpServer.listen(PORT, () => console.log(`Serversss running on port ${PORT}`));
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app, httpServer };
