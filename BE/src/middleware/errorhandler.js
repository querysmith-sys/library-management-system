const errorHandler =  (req,res,next,err) =>{
    console.error(err.stack);
    res.status(500).json({success:"false", error:"Internal Server Error"});
}

export default errorHandler