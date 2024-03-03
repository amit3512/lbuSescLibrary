const express = require("express");
const app = express();

const libraryRoutes = require("./libraryRoutes");
// const courseRoutes = require("./courseRoutes");
// const orderRoutes = require("./orderRoutes");

// const jwt = require("jsonwebtoken");

app.use("/library", libraryRoutes);

module.exports = app;
