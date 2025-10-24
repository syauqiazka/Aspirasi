import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/database.js";
import saran from "./routes/kotak.js";
import Saran from "./models/saranmodel.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

try {
  await db.authenticate();
  console.log("✅ Database connected successfully.");
  await db.sync(); // Sequelize akan auto buat table kalau belum ada
  console.log("✅ Models synchronized.");
} catch (err) {
  console.error("❌ Database connection failed:", err);
}

app.use("/api", saran);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
