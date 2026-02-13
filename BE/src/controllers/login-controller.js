import bcrypt from "bcrypt";
import  loginSchema  from "../validation/login-validation.js";
import pool from "../config/db.js";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN;
const RFFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN;


const LoginController = async (req, res, next) => {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
        return res.status(400).json({success:false,message:"credentials details are invalid"})
    }
    try {
        const  {username, password}  = result.data;

        const queryResult = await pool.query(`SELECT * FROM users WHERE username = $1`, [username]);
        if (queryResult.rowCount == 0) {
            return res.status(404).json({success:false,message:"Not Found"});
        }
        const password_match = await bcrypt.compare(password, queryResult.rows[0].password_hash);

        if (!password_match) {
            return res.status(400).json({success:false, message:"Password is incorrect"});
        }
        const access_Token = jwt.sign({user_id:queryResult.rows[0].user_id,role:queryResult.rows[0].role}, ACCESS_TOKEN_KEY, {expiresIn:'15m'});
        const refresh_Token = jwt.sign({user_id:queryResult.rows[0].user_id}, RFFRESH_TOKEN_KEY, {expiresIn:'7d'});

        //  here, crreated the  http only cookie
        res.cookie("refreshToken",refresh_Token,{
            httpOnly:true, // for XSS
            secure: false, // make it true for prod
            sameSite:true, // csrf protection
            path:"/refresh", // allowed  sending this cookie to only refresh end point
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.status(200).json({message:"logged In", accessToken:access_Token});
    } catch (error) {
        next(error);
    }
}

//  rows: [
//     {
//       user_id: 2,
//       username: 'jgg',
//       email: 'jgg@example.com',
//       password_hash: '$2b$10$HAENvI5yTy6AHiM.CtsCSeAv7CD7muANpdwuxouvLxAmEglGMmFqq',
//       role: 'clerk',
//       created_at: 2026-02-13T14:48:07.024Z,
//       deleted_at: null
//     }
//   ],



export default LoginController;