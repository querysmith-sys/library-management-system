import pool from "../../config/db.js";



export const addMember = async (req, res, next) => {
    try {
    const { membername, memberemail } = req.body;
    if (membername == null || memberemail == null) {
      return res.status(400).json({
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
}

export const membersList = async (req, res, next) => {
    try {
    const result = await pool.query(
      `SELECT * FROM members WHERE deleted_at IS NULL`
    );
    if (result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "no member data found" });
    }
    return res.status(200).json({ success: true, membersData: result });
  } catch (error) {
    next(error);
  }
}

export const editMember = async (req, res, next) => {
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
      return res.status(400).json({
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
}

// soft delete member
export const deleteMember = async (req, res, next) => {
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
    return res
      .status(200)
      .json({ success: true, message: "deleted successfully!" });
  } catch (error) {
    next(error);
  }
}