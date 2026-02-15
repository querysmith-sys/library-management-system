const verifyClerkRole = async (req, res, next) => {
    try {
        if (req.user.role !== "clerk") {
            return res.status(401).json({success:false, message:"Forbidden"});
        }
        next();
    } catch (error) {
        next(error);
    }
}

export default verifyClerkRole;