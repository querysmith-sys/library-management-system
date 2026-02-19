

const knowYourself = async (req, res, next) => {
    try {
        res.status(200).json({success:true, message:"Token is valid", user:req.user.user_id, role:req.user.role});
    } catch (error) {
        next(error);
    }
}

export default knowYourself;