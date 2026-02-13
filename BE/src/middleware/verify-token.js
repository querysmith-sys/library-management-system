import jwt from "jsonwebtoken";

// handling refresh token  after error 

const TokenVerification = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(400).json({success:false, message:"Authorization header is missing"});
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(400).json({success:false, message:"Token is missing"});
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        next(error);
    }
}

export default TokenVerification;