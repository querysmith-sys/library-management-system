import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import pool from "./config/db.js";
import apiroutes from "./app.js";
import errorHandler from "./middleware/errorhandler.js";
import "./services/websockets.js";
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

const rundb = async () => {
  const res = await pool.query("SELECT NOW()");
  console.log(res.rows);
};
rundb();

app.use(express.json());
app.use("/api", apiroutes);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
