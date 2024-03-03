const express = require("express");
const router = express.Router();

// Make sure to import your actual  model here
const accountModel = require("../models/AccountModel");
const bookModel = require("../models/BookModel");

const LibraryController = require("../controllers/libraryController");

const libraryController = new LibraryController(accountModel, bookModel);

router.post("/accounts/register", libraryController.registerUser);
router.post("/accounts/login", libraryController.loginUser);

// router.get("/accounts", financeController.getAccounts);
// router.post("/accounts/invoices", financeController.createInvoice);
router.get("/books", libraryController.getAllBooks);
router.get("/books/:type/", libraryController.updateAccountsWhenBorrowReturned);
// router.put("/accounts/invoices/pay/:reference", financeController.payInvoice);

module.exports = router;
