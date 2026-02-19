import pool from "../config/db.js";
import jwt from "jsonwebtoken";

const refreshTokenRouter = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res
      .status(404)
      .json({ success: false, message: "refreshToken is Missing" });
  }

  try {
    const decoded_refreshToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN,
  );


  const queryResult = await pool.query(
    `SELECT * FROM refresh_tokens WHERE user_id = $1`,
    [decoded_refreshToken.user_id],
  );

  if (queryResult.rowCount == 0) {
    return res.status(404).json({ success: false, message: "Not Found" });
  }

  const new_access_Token = jwt.sign(
    {
      user_id: queryResult.rows[0].user_id,
      role: queryResult.rows[0].user_role,
    },
    process.env.ACCESS_TOKEN,
    { expiresIn: "15m" },
  );

  // send as httponly cookies
  res.cookie("accessToken", new_access_Token, {
    httpOnly: true, // for XSS
    secure: false, // make it true for prod
    sameSite: true, // csrf protection
    path: "/", // allow sending to all endpoints
    maxAge: 15 * 60 * 1000,
  });

  res
    .status(200)
    .json({
      success: true,
      message: "New Access Token Generated Successfully",
    });
}

 catch (error) {
    // check exipiry
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Refresh Token Expired" });
    }
    return res.status(401).json({ success: false, message: "Invalid Refresh Token" });
  }
}

export default refreshTokenRouter;
