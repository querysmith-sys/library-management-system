import express from "express";
import {addBookOperation, editBookOperation, deleteBookOperation, GenerateFineReport, booksList} from "../../controllers/admin-controller/book-management-controller.js";
import TokenVerification from "../../middleware/verify-token.js";
import verifyAdminRole from "../../middleware/verify-admin-role.js";

const bookManagementRouter = express.Router();

bookManagementRouter.post("/admin/add-book", TokenVerification, verifyAdminRole, addBookOperation);
bookManagementRouter.patch("/admin/edit-book", TokenVerification, verifyAdminRole, editBookOperation);
bookManagementRouter.delete("/admin/archieve-book", TokenVerification, verifyAdminRole, deleteBookOperation);
bookManagementRouter.get("/admin/generate-fine-report", TokenVerification, verifyAdminRole, GenerateFineReport);
bookManagementRouter.get("/books",TokenVerification, booksList);

export default bookManagementRouter;