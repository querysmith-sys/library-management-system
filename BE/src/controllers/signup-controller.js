import signupSchema from "../validation/signup-validation.js";
import pool from "../config/db.js";
import bcrypt from "bcrypt";

const signupController = async (req, res, next) => {
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ message: "Enter Valid Credentials!" });
  }
  try {
    const { username, email, password } = result.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const queryResult = await pool.query(
      `INSERT INTO users(username, email, password_hash) VALUES ($1, $2, $3)`,
      [username, email, hashedPassword],
    );

    if (queryResult.rowCount === 0) {
      res
        .status(400)
        .json({ success: false, message: "query is not executed" });
      return;
    }
    res.status(200).json({ success: true, message: "You are signed UP!" });
  } catch (error) {
    next(error);
  }
};

export default signupController;
