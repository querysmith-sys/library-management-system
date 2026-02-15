import express from "express";
import {addClerk, getClerks, editClerk, deleteClerk} from "../../controllers/admin-controller/clerk-management-controller.js"
import TokenVerification from "../../middleware/verify-token.js";
import verifyAdminRole from "../../middleware/verify-admin-role.js";

const clerkManagementRouter = express.Router();

clerkManagementRouter.post("/admin/add-clerk", TokenVerification, verifyAdminRole, addClerk);
clerkManagementRouter.get("/admin/clerks", TokenVerification, verifyAdminRole, getClerks);
clerkManagementRouter.patch("/admin/edit-clerks", TokenVerification, verifyAdminRole, editClerk);
clerkManagementRouter.delete("/admin/archieve-clerk", TokenVerification, verifyAdminRole, deleteClerk)


export default clerkManagementRouter;