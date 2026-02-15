import pool from "../../config/db.js";


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



export const addBookOperation = async (req, res, next) => {
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
      return res.status(400).json({
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
        .status(400)
        .json({ success: false, error: "query was not executed" });
    }
    return res
      .status(200)
      .json({ success: true, message: "book successfully added" });
  } catch (error) {
    next(error);
  }
}

export const editBookOperation = async (req, res, next) => {
    try {
    const { title, author, total_copies, available_copies, book_id } = req.body;
    if (book_id == null) {
      return res
        .status(400)
        .json({ success: false, message: "book_id is required" });
    }
    if (typeof book_id !== "number" || !Number.isInteger(book_id)) {
      return res
        .status(400)
        .json({ success: false, message: "provide an integer input" });
    }

    let sanitizedtitle;
    let sanitizedauthor;

    if (title !== undefined) {
      if (title === null) {
        return res
          .status(400)
          .json({ success: false, message: "title cannot be null" });
      }
      if (typeof title !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "provide valid title" });
      }
      sanitizedtitle = title.trim();
      if (sanitizedtitle.length === 0) {
        return res
          .status(400)
          .json({ success: false, error: "title is empty" });
      }
    }

    if (author !== undefined) {
      if (author === null) {
        return res
          .status(400)
          .json({ success: false, message: "author cannot be null" });
      }
      if (typeof author !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "provide valid author" });
      }
      sanitizedauthor = author.trim();
      if (sanitizedauthor.length === 0) {
        return res
          .status(400)
          .json({ success: false, error: "author is empty" });
      }
    }

    if (total_copies !== undefined) {
      if (total_copies === null) {
        return res
          .status(400)
          .json({ success: false, message: "total_copies cannot be null" });
      }
      if (typeof total_copies !== "number" || !Number.isInteger(total_copies)) {
        return res
          .status(400)
          .json({ success: false, message: "total_copies is of type INT" });
      }
    }

    if (available_copies !== undefined) {
      if (available_copies === null) {
        return res
          .status(400)
          .json({ success: false, message: "total_copies cannot be null" });
      }
      if (
        typeof available_copies !== "number" ||
        !Number.isInteger(available_copies)
      ) {
        return res
          .status(400)
          .json({ success: false, message: "total_copies is of type INT" });
      }
    }

    if (
      title == undefined &&
      author == undefined &&
      total_copies == undefined &&
      available_copies == undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "provide any of the InputField to update",
      });
    }

    await pool.query(
      `UPDATE books SET title = COALESCE($1, title), author = COALESCE($2, author), total_copies = COALESCE($3, total_copies), available_copies = COALESCE($4, available_copies) WHERE book_id = $5`,
      [title, author, total_copies, available_copies, book_id]
    );
    return res
      .status(200)
      .json({ success: true, message: "member info updated successfully" });
  } catch (error) {
    next(error);
  }
}

export const deleteBookOperation = async (req, res, next) => {
    try {
    const { book_id } = req.body;
    if (book_id == null) {
      return res
        .status(400)
        .json({ success: false, message: "book_id is required" });
    }
    if (typeof book_id !== "number" || !Number.isInteger(book_id)) {
      return res
        .status(400)
        .json({ success: false, message: "provide an integer input" });
    }
    await pool.query(`UPDATE books SET removed_at = NOW() WHERE book_id = $1`, [
      book_id,
    ]);
    return res
      .status(200)
      .json({ success: true, message: "removed successfully!" });
  } catch (error) {
    next(error);
  }
}

export const  booksList = async (req, res, next) => {
  try {
    const totalBooks = await pool.query(
      `SELECT * FROM books WHERE removed_at IS NULL`
    );
    if (totalBooks.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "db operation failed" });
    }
    return res.status(200).json({ success: true, totalBooks: totalBooks });
  } catch (error) {
    next(error);
  }
}

export const GenerateFineReport = async (req, res, next) => {
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
}