import {
  issueBook,
  returnBook,
} from "./services/libraryservices.js";
import pool from "../../config/db.js";
import { broadcast } from "../../services/websockets.js";

export const IssueBookOperation = async (req, res, next) => {
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
}

export const ReturnBookOperation = async (req, res, next) => {
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
    res.status(200).json({
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
}