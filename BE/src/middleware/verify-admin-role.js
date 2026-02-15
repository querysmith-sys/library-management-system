const verifyAdminRole = async (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            return res.status(401).json({success:false, message:"Forbidden"});
        }
        next();
    } catch (error) {
        next(error);
    }
}

export default verifyAdminRole;