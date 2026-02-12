import express from "express";
import { signupSchema } from "../validation/signup-validation";
import pool from "../config/db";
import bcrypt, { genSalt } from "bcrypt";
const signupController = express.Router();

signupController.post("/signup", async (req, res, next) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ message: "Enter Valid Credentials!" });
  }
  try {
    const { username, email, password } = result.data;

    const hashedPassword = bcrypt.hash(password, 10);

    const queryResult = await pool.query(
      `INSERT INTO users(username, email, password) VALUES ($1, $2, $3, $4)`,
      [username, email, hashedPassword],
    );

    if (queryResult.rowCount === 0) {
      res
        .status(400)
        .json({ success: false, message: "query is not executed" });
      return;
    }
    res.status(200).json({ success: false, message: "You are signed UP!" });
  } catch (error) { 
    next(error)
  }
});

export default signupController;
