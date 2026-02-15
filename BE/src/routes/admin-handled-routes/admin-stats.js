import express from "express";
import adminStats from "../../controllers/admin-controller/admin-stats-controller.js";
import TokenVerification from "../../middleware/verify-token.js";
import verifyAdminRole from "../../middleware/verify-admin-role.js";

const adminStatsRouter = express.Router();


adminStatsRouter.get("/admin/stats", TokenVerification, verifyAdminRole, adminStats);

export default adminStatsRouter;