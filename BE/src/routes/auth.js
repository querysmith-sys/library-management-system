import express from "express"; 
import LoginController from "../controllers/login-controller.js";
import signupController from "../controllers/signup-controller.js";
const authRouter = express.Router();

authRouter.use('/login', LoginController);
authRouter.use('/signup', signupController);



export default authRouter;