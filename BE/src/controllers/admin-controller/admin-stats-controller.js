import pool from "../../config/db.js";

const adminStats = async (req, res, next) => {
    try {
    const result = await pool.query(`SELECT 
      (SELECT COUNT(*) FROM books WHERE removed_at IS NULL) AS total_books,
      (SELECT COUNT(*) FROM members WHERE deleted_at IS NULL) AS total_members,
      (SELECT COUNT(*) FROM users WHERE deleted_at IS NULL AND role = 'clerk') AS total_clerks,
      (SELECT COUNT(*) FROM transactions WHERE return_date IS NULL AND due_date < NOW()) AS overdue_count
      `);
      return res.status(200).json({success: true, statsData: result.rows[0]});
  } catch (error) {
    next(error);
  }

}

export default adminStats;