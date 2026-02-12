import express from "express";
import { loginSchema } from "../validation/login-validation";

const LoginController = express.Router();

LoginController.post("/login", async (req, res) => {

})



export default LoginController;