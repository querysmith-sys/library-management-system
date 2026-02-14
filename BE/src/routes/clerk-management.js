import express from "express";
import {addClerk, getClerks, editClerk, deleteClerk} from "../controllers/clerk-management-controller.js"
import TokenVerification from "../middleware/verify-token.js";
import verifyRole from "../middleware/verify-role.js";

const clerkManagementRouter = express.Router();

clerkManagementRouter.post("/admin/add-clerk", TokenVerification, verifyRole, addClerk);
clerkManagementRouter.get("/admin/clerks", TokenVerification, verifyRole, getClerks);
clerkManagementRouter.patch("/admin/edit-clerks", TokenVerification, verifyRole, editClerk);
clerkManagementRouter.delete("/admin/archieve-clerk", TokenVerification, verifyRole, deleteClerk)


export default clerkManagementRouter;