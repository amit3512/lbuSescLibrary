const { hashPassword } = require("../utils/hashPassword");
const hashedPin = hashPassword("123456");
const accounts = {
  studentId: "admin",
  pin: hashedPin,
};

module.exports = accounts;
