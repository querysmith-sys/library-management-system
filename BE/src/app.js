import express from "express";
import pool from "./config/db.js";
import {
  issueBook,
  returnBook,
  calculateFine,
} from "./services/libraryservices.js";
import { broadcast } from "./services/websockets.js";

const router = express.Router();

// check sum function
const checksum = (isbn) => {
  let lastdigit = isbn % 10;
  let isbnExceptLastdigit = Math.floor(isbn / 10);
  let arrayofNumbers = Array.from(String(isbnExceptLastdigit), Number);
  let sum = 0;
  for (let i = 0; i < arrayofNumbers.length; i++) {
    sum += arrayofNumbers[i] * ((i + 1) % 2 == 0 ? 3 : 1);
  }
  let result = (10 - (sum % 10)) % 10;
  if (result == lastdigit) {
    return true;
  } else {
    return false;
  }
};

// admin operations
router.post("/add-book", async (req, res, next) => {
  try {
    const { title, author, isbn, total_copies, available_copies } = req.body;
    if (
      title == null ||
      author == null ||
      isbn == null ||
      total_copies == null ||
      available_copies == null
    ) {
      return res.status(400).json({ success: false, error: "missing input" });
    }
    if (
      typeof title !== "string" ||
      typeof author !== "string" ||
      !Number.isInteger(isbn) ||
      !Number.isInteger(total_copies) ||
      !Number.isInteger(available_copies)
    ) {
      return res.status(400).json({ success: false, error: "invalid input" });
    }
    const sanitizedtitle = title.trim();
    const sanitizedauthor = author.trim();
    // validation
    if (checksum(isbn) == false) {
      return res
        .status(400)
        .json({ success: false, error: "isbn is not valid" });
    }
    if (sanitizedtitle.length == 0 || sanitizedauthor.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "title or author is empty." });
    }
    if (total_copies < 0 || available_copies < 0) {
      return res
        .status(400)
        .json({
          success: false,
          error: "total_copies and available_copies are invalid",
        });
    }
    const queryResult = await pool.query(
      `INSERT INTO books (title, author, isbn, total_copies, available_copies) VALUES ($1, $2, $3, $4, $5)`,
      [sanitizedtitle, sanitizedauthor, isbn, total_copies, available_copies]
    );
    if (queryResult.rowCount == 0) {
      return res
        .status(500)
        .json({ success: false, error: "query was not excepted" });
    }
    return res
      .status(200)
      .json({ success: true, message: "book successfully added" });
  } catch (error) {
    next(error);
  }
});

router.get("/generate-fine-report", async (req, res) => {
  try {
    const { fine_amt, member_id } = req.body;
    if (fine_amt == null || member_id == null) {
      return res.status(400).json({ success: false, error: "provide input" });
    }
    if (typeof fine_amt !== "number" || !Number.isInteger(fine_amt)) {
      return res
        .status(400)
        .json({ success: false, error: "invalid fine_amt" });
    }
    if (typeof member_id !== "number" || !Number.isInteger(member_id)) {
      return res
        .status(400)
        .json({ success: false, error: "invalid member_id" });
    }
    const result = await calculateFine(fine_amt, member_id);
    if (result == false) {
      return res
        .status(404)
        .json({ success: false, message: "no fine record found" });
    }
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
});

// clerk operations

router.post("/issue-book", async (req, res, next) => {
  try {
    const { book_id, member_id, date } = req.body;
    const regexPatternforDate = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/;
    if (book_id == null || member_id == null || date == null) {
      return res
        .status(404)
        .json({ success: false, message: "provide bookid, memberid and date" });
    }
    if (typeof book_id !== "number" || !Number.isInteger(book_id)) {
      return res
        .status(400)
        .json({ success: false, message: "invalid bookid" });
    }
    if (typeof member_id !== "number" || !Number.isInteger(member_id)) {
      return res
        .status(400)
        .json({ success: false, message: "invalid member_id" });
    }
    if (!regexPatternforDate.test(date)) {
      return res
        .status(400)
        .json({ success: false, error: "invalid date format" });
    }
    const dateobj = new Date(date);
    if (isNaN(dateobj.getTime())) {
      return res
        .status(400)
        .json({ success: false, error: "invalid date value" });
    }
    const due_date = dateobj.toISOString();
    const transcript = await issueBook(book_id, member_id, due_date);
    if (transcript == false) {
      return res
        .status(400)
        .json({ success: false, error: "issuebook operation failed" });
    }
    return res.status(200).json({ receipt: transcript });
  } catch (error) {
    next(error);
  }
});

router.post("/return-book", async (req, res, next) => {
  try {
    const { transaction_id, book_id, fine_amt } = req.body;
    if (transaction_id == null || book_id == null || fine_amt == null) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }
    if (
      typeof transaction_id !== "number" ||
      !Number.isInteger(transaction_id)
    ) {
      return res
        .status(400)
        .json({ success: false, error: "invalid transaction_id" });
    }
    if (typeof book_id !== "number" || !Number.isInteger(book_id)) {
      return res.status(400).json({ success: false, error: "invalid book_id" });
    }
    if (typeof fine_amt !== "number" || !Number.isInteger(fine_amt)) {
      return res
        .status(400)
        .json({ success: false, error: "invalid fine_amt" });
    }
    const ReturnedData = await returnBook(transaction_id, book_id);
    if (ReturnedData.rowCount == 0) {
      return res
        .status(404)
        .json({ success: false, error: "return book operation failed" });
    }
    // calculate fine for the same
    const result = await pool.query(
      `SELECT (CURRENT_DATE - due_date::date) * $1 AS fine FROM transactions WHERE transaction_id = $2 AND book_id = $3 AND CURRENT_TIMESTAMP > due_date`,
      [fine_amt, transaction_id, book_id]
    );
    res
      .status(200)
      .json({
        success: true,
        message: "returned book operation successfull",
        fine: result.rowCount == 0 ? 0 : result.rows[0],
      });
    try {
      broadcast(ReturnedData.rows[0]);
    } catch (error) {
      console.error("WS failed:", error.message);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/books", async (req, res) => {
  try {
    const totalBooks = await pool.query(`SELECT * FROM books`);
    if (totalBooks.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "db operation failed" });
    }
    return res.status(200).json({ success: true, totalBooks: totalBooks });
  } catch (error) {
    next(error);
  }
});

router.post("/add-members", async (req, res, next) => {
  try {
    const { membername, memberemail } = req.body;
    if (membername == null || memberemail == null) {
      return res
        .status(400)
        .json({
          success: false,
          error: "membername or memberemail is missing.",
        });
    }
    if (typeof membername !== "string" || typeof memberemail !== "string") {
      return res
        .status(400)
        .json({ success: false, error: "invalid membername or memberemail." });
    }
    const sanitizedmembername = membername.trim();
    const sanitizedmemberemail = memberemail.trim();
    if (sanitizedmembername.length == 0 || sanitizedmemberemail.length == 0) {
      return res
        .status(400)
        .json({ success: false, error: "membername or memberemail is empty." });
    }
    const queryResult = await pool.query(
      `INSERT INTO members (membername, memberemail) VALUES ($1, $2)`,
      [sanitizedmembername, sanitizedmemberemail]
    );
    if (queryResult.rowCount == 0) {
      return res
        .status(500)
        .json({ success: false, error: "query was not excepted" });
    }
    return res
      .status(200)
      .json({ success: true, message: "member successfully added" });
  } catch (error) {
    next(error);
  }
});

router.get("/members", async (req, res, next) => {
  try {
    const result = await pool.query(`SELECT * FROM members WHERE deleted_at IS NULL`);
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "no member data found" });
    }
    return res.status(200).json({ success: true, membersData: result });
  } catch (error) {
    next(error);
  }
});

router.patch("/edit-members", async (req, res, next) => {
  try {
    const { membername, memberemail, member_id } = req.body;
    if (member_id == null) {
      return res
        .status(400)
        .json({ success: false, message: "member_id is required" });
    }
    if (typeof member_id !== "number" || !Number.isInteger(member_id)) {
      return res
        .status(400)
        .json({ success: false, message: "provide an integer input" });
    }
    let sanitizedmembername;
    let sanitizedmemberemail;
    if (membername !== undefined) {
      if (membername === null) {
        return res
          .status(400)
          .json({ success: false, message: "membername cannot be null" });
      }
      if (typeof membername !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "provide valid membername" });
      }
      sanitizedmembername = membername.trim();
      if (sanitizedmembername.length === 0) {
        return res
          .status(400)
          .json({ success: false, error: "membername is empty" });
      }
    }
    if (memberemail !== undefined) {
      if (memberemail === null) {
        return res
          .status(400)
          .json({ success: false, message: "memberemail cannot be null" });
      }
      if (typeof memberemail !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "provide valid memberemail" });
      }
      sanitizedmemberemail = memberemail.trim();
      if (sanitizedmemberemail.length === 0) {
        return res
          .status(400)
          .json({ success: false, error: "memberemail is empty" });
      }
    }

    if (membername === undefined && memberemail === undefined) {
      return res
        .status(400)
        .json({
          success: false,
          message: "provide membername or memberemail to update",
        });
    }

    await pool.query(
      `UPDATE members SET membername = COALESCE($1, membername), memberemail = COALESCE($2, memberemail) WHERE member_id = $3`,
      [sanitizedmembername, sanitizedmemberemail, member_id]
    );
    return res
      .status(200)
      .json({ success: true, message: "member info updated successfully" });
  } catch (error) {
    next(error);
  }
});

// soft delete member
router.delete("/archieve-members", async (req, res, next) => {
  try {
    const { member_id } = req.body;
    if (member_id == null) {
      return res
        .status(400)
        .json({ success: false, message: "member_id is required" });
    }
    if (typeof member_id !== "number" || !Number.isInteger(member_id)) {
      return res
        .status(400)
        .json({ success: false, message: "provide an integer input" });
    }
    await pool.query(
      `UPDATE members SET deleted_at = NOW() WHERE member_id = $1`,
      [member_id]
    );
    return res.status(200).json({success:true, message:"deleted successfully!"})
  } catch (error) {
    next(error);
  }
});

export default router;
