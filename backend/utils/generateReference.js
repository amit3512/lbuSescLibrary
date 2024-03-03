// Function to generate a random reference
function generateReference() {
  // Implement your logic to generate a reference (e.g., timestamp + random number)
  return "INV" + Date.now() + Math.floor(Math.random() * 1000);
}
module.exports = generateReference;
