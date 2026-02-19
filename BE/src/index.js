// import dotenv from "dotenv";
// dotenv.config();
import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import errorHandler from "./middleware/errorhandler.js";
import authRouter from "./routes/auth.js";
import clerkManagementRouter from "./routes/admin-handled-routes/clerk-management.js";
import bookManagementRouter from "./routes/admin-handled-routes/book-mangement.js";
import adminStatsRouter from "./routes/admin-handled-routes/admin-stats.js";
import memberManagementRouter from "./routes/clerk-handled-routes/member-management-routes.js";
import bookOperationRouter from "./routes/clerk-handled-routes/book-operations-routes.js";
import knowYourselfRouter from "./routes/knowYourself-routes.js";
import "./services/websockets.js";
import cookieParser from  "cookie-parser";
import app from "./app.js";

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const rundb = async () => {
  const res = await pool.query("SELECT NOW()");
  console.log(res.rows);
};
rundb();

app.use(express.json());
app.use(cookieParser());
// Routes defined here
// app.use("/api", apiroutes);
app.use("/auth", authRouter);
app.use("/api", clerkManagementRouter);
app.use("/api", bookManagementRouter);
app.use("/api", adminStatsRouter);
app.use("/api", knowYourselfRouter);
app.use("/api", memberManagementRouter);
app.use("/api", bookOperationRouter);

app.use(errorHandler);
