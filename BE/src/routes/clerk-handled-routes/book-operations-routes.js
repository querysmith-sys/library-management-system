import  express from "express";
import TokenVerification from "../../middleware/verify-token.js";
import verifyClerkRole from "../../middleware/verify-clerk-role.js";

const bookOperationRouter = express.Router();


bookOperationRouter.post("/clerk/issue-book", TokenVerification, verifyClerkRole);
bookOperationRouter.post("/clerk/return-book", TokenVerification, verifyClerkRole);

export default bookOperationRouter;