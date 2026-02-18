import express from "express"; 
import LoginController from "../controllers/login-controller.js";
import refreshTokenRouter from "../controllers/refreshToken-controller.js";

const authRouter = express.Router();

authRouter.use('/login', LoginController);
authRouter.use('/refresh', refreshTokenRouter);



export default authRouter;