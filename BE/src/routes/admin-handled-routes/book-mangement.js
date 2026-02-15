import express from "express";
import {addBookOperation, editBookOperation, deleteBookOperation, GenerateFineReport, booksList} from "../../controllers/admin-controller/book-management-controller.js";
import TokenVerification from "../../middleware/verify-token.js";
import verifyClerkRole from "../../middleware/verify-clerk-role.js";

const bookManagementRouter = express.Router();

bookManagementRouter.post("/admin/add-book", TokenVerification, verifyClerkRole, addBookOperation);
bookManagementRouter.patch("/admin/edit-book", TokenVerification, verifyClerkRole, editBookOperation);
bookManagementRouter.delete("/admin/archieve-book", TokenVerification, verifyClerkRole, deleteBookOperation);
bookManagementRouter.get("/admin/generate-fine-report", TokenVerification, verifyClerkRole, GenerateFineReport);
bookManagementRouter.get("/books",TokenVerification, booksList);

export default bookManagementRouter;