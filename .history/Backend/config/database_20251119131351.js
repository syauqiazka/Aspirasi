import cron from "node-cron";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: process.env.DB_PORT || 5432,
    logging: false,
  }
);

// CRON JOB
cron.schedule("0 0 * * *", async () => {
  try {
    await db.query(`DELETE FROM saran WHERE "createdAt" < NOW() - INTERVAL '14 days';`);
    console.log("[CRON] Data inspirasi lama dihapus otomatis");
  } catch (err) {
    console.error("[CRON ERROR]", err);
  }
});

export default db;
