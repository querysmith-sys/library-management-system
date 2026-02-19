import express from "express";
import knowYourself from "../controllers/me.js";
import TokenVerification from "../middleware/verify-token.js";


const knowYourselfRouter = express.Router();
knowYourselfRouter.get("/me", TokenVerification, knowYourself);

export default knowYourselfRouter;