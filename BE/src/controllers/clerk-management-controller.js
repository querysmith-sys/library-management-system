import crypto from "crypto";
// clerk Management routes


const addClerk = async (req, res, next) => {
    try {
      const {clerkname, clerkemail} = req.body;
    if(clerkname == null || clerkemail == null) {
        return res.status(400).json({success: false, error: "missing input"});
    }
    if(typeof clerkname !== "string" || typeof clerkemail !== "string") {
        return res.status(400).json({success: false, error: "invalid input"});
    }
    const sanitizedclerkname = clerkname.trim();
    const sanitizedclerkemail = clerkemail.trim();
    const temp_clerk_password = crypto.randomBytes(8).toString("hex");

    const  queryResult = await pool.query(`INSERT INTO users (username, email, password_hash) VALUES($1, $2, $3)`,[sanitizedclerkname,sanitizedclerkemail, temp_clerk_password]);
    if (queryResult.rowCount == 0) {
      return res
        .status(400)
        .json({ success: false, error: "query was not uneffected" });
    }
   return res
      .status(200)
      .json({ success: true, message: "clerk successfully added" });
    } catch (error) {
      next(error)
    }
}

const getClerks = async (req, res, next) => {
    try {
    const result = await pool.query(`SELECT * FROM users WHERE deleted_at IS NULL`);
    if(result.rowCount === 0) {
      return res
        .status(404)
        .json({ success: false, error: "no clerk data found" });
    }
    return res.status(200).json({ success: true, clerkData: result });
  } catch (error) {
    next(error);
  }

}

const editClerk = async (req, res, next) => {
    try {
      const {clerkname, clerkemail, clerk_id} = req.body;
       if (clerk_id == null) {
      return res
        .status(400)
        .json({ success: false, message: "clerk_id is required" });
    }
    if (typeof clerk_id !== "number" || !Number.isInteger(clerk_id)) {
      return res
        .status(400)
        .json({ success: false, message: "provide an integer input" });
    }
     let sanitizedclerkname;
     let sanitizedclerkemail;
    if (clerkname !== undefined) {
      if (clerkname === null) {
        return res
          .status(400)
          .json({ success: false, message: "clerkname cannot be null" });
      }
      if (typeof clerkname !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "provide valid clerkname" });
      }
      sanitizedclerkname = clerkname.trim();
      if (sanitizedclerkname.length === 0) {
        return res
          .status(400)
          .json({ success: false, error: "clerkname is empty" });
      }
    }

    if (clerkemail !== undefined) {
      if (clerkemail === null) {
        return res
          .status(400)
          .json({ success: false, message: "clerkemail cannot be null" });
      }
      if (typeof clerkemail !== "string") {
        return res
          .status(400)
          .json({ success: false, message: "provide valid clerkemail" });
      }
      sanitizedclerkemail = clerkemail.trim();
      if (sanitizedclerkemail.length === 0) {
        return res
          .status(400)
          .json({ success: false, error: "clerkemail is empty" });
      }
    }

    if (clerkname === undefined && clerkemail === undefined) {
      return res.status(400).json({
        success: false,
        message: "provide clerkname or clerkemail to update",
      });
    }
     await pool.query(
      `UPDATE users SET username = COALESCE($1, clerkname), email = COALESCE($2, clerkemail) WHERE user_id = $3`,
      [sanitizedclerkname, sanitizedclerkemail, clerk_id]
    );
    return res
      .status(200)
      .json({ success: true, message: "clerk info updated successfully" });
    } catch (error) {
      next(error);
    }
}

const deleteClerk = async (req, res, next) => {
    try {
    const {clerk_id} = req.body;
    if (clerk_id == null) {
      return res
        .status(400)
        .json({ success: false, message: "clerk_id is required" });
    }
    if (typeof clerk_id !== "number" || !Number.isInteger(clerk_id)) {
      return res.status(400)
        .json({ success: false, message: "provide an integer input" });
    }
    await pool.query(`UPDATE users SET deleted_at = NOW() WHERE user_id = $1`, [clerk_id]);
    return res.status(200).json({ success: true, message: "deleted successfully!" });
  } catch (error) {
    next(error);
  }
}


export default {addClerk, getClerks, editClerk, deleteClerk};