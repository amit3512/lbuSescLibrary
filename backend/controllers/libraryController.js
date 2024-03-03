const axios = require("axios");
const { hashPassword, comparePasswords } = require("../utils/hashPassword");
const generateAuthToken = require("../utils/generateReference");
const { generateRandomStudentId } = require("../utils/generateRandomStudentId");
const courses = require("../seeder/courses");
const cookie = require("cookie");
const generateReference = require("../utils/generateReference");

class LibraryController {
  constructor(AccountModel, BookModel) {
    this.Account = AccountModel;
    this.Book = BookModel;
  }

  registerUser = async (req, res, next) => {
    try {
      const { studentId, pin } = req.body;
      console.log("requireLibrarystudentId", studentId);

      if (!studentId) {
        return res.status(400).send("StudentId is required");
      }

      //Checking student account already in the database
      const accountExists = await this.Account.findOne({ studentId });

      if (!accountExists) {
        const hashedPin = hashPassword("000000");
        const account = await this.Account.create({
          studentId,
          pin: hashedPin,
          isFirstLogin: true,
        });
        res.status(201).json({
          success: "Library account created",
          data: {
            studentId,
          },
        });
      } else if (accountExists && accountExists.isFirstLogin) {
        if (pin != "000000") {
          const hashedPin = hashPassword(pin);
          await this.Account.findOneAndUpdate(
            { studentId: studentId },
            {
              $set: {
                pin: hashedPin,
                isFirstLogin: false,
              },
            },
            { new: true }
          );
          return res.status(200).send("Pin Updated");
        }
        return res.send("Pin cannot be 000000 for security reasons.");
      }
      return res.send("Student Account exists");
    } catch (err) {
      next(err);
    }
  };

  loginUser = async (req, res, next) => {
    const { studentId, pin } = req.body;

    try {
      // Find the student by ID
      const account = await this.Account.findOne({ studentId });

      if (!account) {
        return res.status(404).json({ error: "Account not found" });
      }

      // Check if the entered pin is correct
      if (pin == "000000" && !account.isFirstLogin) {
        return res
          .status(404)
          .json({ error: "You cannot have 000000 for security reasons." });
      } else if (pin == "000000" && account.isFirstLogin) {
        return res.status(404).json({ error: "You need to change your PIN." });
      }
      const isPinCorrect = await comparePasswords(pin, account.pin);

      if (isPinCorrect) {
        return res.status(200).json({ message: "Login successful" });
      } else {
        return res.status(401).json({ error: "Incorrect PIN" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  // getAccounts = async (req, res, next) => {
  //   try {
  //     const accounts = await this.Account.find({});
  //     return res.status(200).json({
  //       success: "All Finance Accounts",
  //       data: accounts,
  //     });
  //   } catch (err) {
  //     next(err);
  //   }
  // };

  getAllBooks = async (req, res, next) => {
    try {
      const books = await this.Book.find({});
      return res.status(200).json({
        success: "All Books.",
        data: books,
      });
    } catch (err) {
      next(err);
    }
  };

  updateAccountsWhenBorrowReturned = async (req, res, next) => {
    try {
      const { type } = req.params;
      const { studentId, isbm, borrowDate, returnDate } = req.body;
      const account = await this.Account.findOne({ studentId }).select("-pin");
      console.log("accounts", account);
      const existedBook = account.books.find(
        (x) => x.isbm == isbm && x.isReturned == false
      );
      if (existedBook) {
        res.status(200).json("Book Already Borrowed and has not returned yet.");
      }
      account.books.push({
        isbm,
        borrowDate,
        returnDate,
        overdue: "45",
      });
      const upadtedAccount = await account.save();
      res.status(200).json(upadtedAccount);
    } catch (err) {
      next(err);
    }
  };

  // createInvoice = async (req, res, next) => {
  //   try {
  //     const studentId = req.body.account.studentId;
  //     const invoice = await this.Invoice.create({
  //       ...req.body,
  //       reference: generateReference(),
  //       studentId: studentId,
  //     });

  //     const account = await this.Account.findOne({ studentId });

  //     if (account) {
  //       const updateAcc = await this.Account.findOneAndUpdate(
  //         { studentId: studentId }, // Query
  //         { $set: { hasOutstandingBalance: true } }, // Update
  //         { new: true } // Options: { new: true } returns the modified document
  //       );
  //       console.log("updateAcc", updateAcc);
  //     }

  //     return res
  //       .status(200)
  //       .json({ success: "Invoice Created", data: invoice });
  //   } catch {}
  // };

  // getAllInvoices = async (req, res, next) => {
  //   try {
  //     const invoices = await this.Invoice.find({});

  //     return res.status(200).json({ data: invoices });
  //   } catch {}
  // };

  // getSingleInvoice = async (req, res, next) => {
  //   try {
  //     const { reference } = req.params;
  //     const invoice = await this.Invoice.find({ reference });

  //     return res.status(200).json({ data: invoice[0] });
  //   } catch {}
  // };

  // payInvoice = async (req, res, next) => {
  //   try {
  //     const { reference } = req.params;

  //     const updatedInvoice = await this.Invoice.findOneAndUpdate(
  //       { reference },
  //       { $set: { status: "PAID" } },
  //       { new: true } // To return the updated document
  //     );

  //     if (!updatedInvoice) {
  //       return res.status(404).json({ error: "Invoice not found" });
  //     }

  //     const accountInvoices = await this.Invoice.find({
  //       studentId: updatedInvoice.studentId,
  //     });

  //     const filteredInvoices = accountInvoices.filter(
  //       (x) => x.reference != reference
  //     );

  //     const hasOutstandingBalance = filteredInvoices?.some(
  //       (x) => x.status === "OUTSTANDING"
  //     );

  //     const updateAccounts = await this.Account.findOneAndUpdate(
  //       { studentId: updatedInvoice.studentId }, // Query
  //       { $set: { hasOutstandingBalance: hasOutstandingBalance } }, // Update
  //       { new: true } // Options: { new: true } returns the modified document
  //     );

  //     return res
  //       .status(200)
  //       .json({ success: "Payment Successful", data: updatedInvoice });
  //   } catch {}
  // };

  // Add other methods as needed
}

module.exports = LibraryController;
