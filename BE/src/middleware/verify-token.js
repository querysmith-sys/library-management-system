import jwt from "jsonwebtoken";

const TokenVerification = async (req, res, next) => {

    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({success:false, message:"AccessToken is Missing"});
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN);
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({success:false, message:"AccessToken Expired"});
        } else {
            next();
        }
    }
}

export default TokenVerification;