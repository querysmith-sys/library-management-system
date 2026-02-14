const verifyRole = async (req, res, next) => {
    try {
        if (req.role !== "admin") {
            return res.status(401).json({success:false, message:"Forbidden"});
        }
        next();
    } catch (error) {
        next(error);
    }
}

export default verifyRole;