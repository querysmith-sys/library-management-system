import  express from "express";
import TokenVerification from "../../middleware/verify-token.js";
import verifyClerkRole from "../../middleware/verify-clerk-role.js";
import {addMember, editMember, deleteMember, membersList} from "../../controllers/clerk-controller/member-management.js"

const memberManagementRouter = express.Router();

memberManagementRouter.post("/clerk/add-member", TokenVerification, verifyClerkRole, addMember);
memberManagementRouter.get("/clerk/members", TokenVerification, verifyClerkRole, editMember);
memberManagementRouter.patch("/clerk/edit-member", TokenVerification, verifyClerkRole, deleteMember);
memberManagementRouter.delete("/clerk/archieve-member", TokenVerification, verifyClerkRole, membersList);

export default memberManagementRouter;