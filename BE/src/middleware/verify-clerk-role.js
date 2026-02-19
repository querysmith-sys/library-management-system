const verifyClerkRole = async (req, res, next) => {
    try {
        if (req.user.role !== "clerk") {
            return res.status(403).json({success:false, message:"Forbidden"});
        }
        next();
    } catch (error) {
        next(error);
    }
}

export default verifyClerkRole;