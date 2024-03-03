function generateRandomStudentId() {
  const min = 1000000; // Minimum value for a 7-digit number
  const max = 9999999; // Maximum value for a 7-digit number
  const randomId =
    "c" + Math.floor(min + Math.random() * (max - min + 1)).toString();
  return randomId;
}

module.exports = { generateRandomStudentId };
