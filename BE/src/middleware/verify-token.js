import jwt from "jsonwebtoken";
import pool from "../config/db.js";

const TokenVerification = async (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(400).json({success:false, message:"Authorization header is missing"});
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({success:false, message:"Token is missing"});
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            //  refresh token handling
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(404).json({success:false, message:"refreshToken is Missing"});
            }

            const decoded_refreshToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN);

            const queryResult = await pool.query(`SELECT * FROM refresh_tokens WHERE user_id = $1`, [decoded_refreshToken.user_id]);

            if (queryResult.rowCount == 0) {
                return res.status(404).json({success:false, message:"Not Found"});
            }

            const new_access_Token = jwt.sign({user_id:queryResult.rows[0].user_id,role:queryResult.rows[0].user_role}, process.env.ACCESS_TOKEN, {expiresIn:'15m'});

            res.status(200).json({success:true, new_accessToken:new_access_Token});

        } else {
            next();
        }
    }
}

export default TokenVerification;