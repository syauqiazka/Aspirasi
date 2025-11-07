// ======== IMPORT MODULES =========
import cron from "node-cron";
import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

// ======== KONFIGURASI DATABASE =========
const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,
    timezone: "+07:00", // WIB
    dialectOptions: {
      dateStrings: true, // hasil query dalam bentuk string, bukan UTC object
    },
    define: {
      timestamps: true, // otomatis createdAt & updatedAt
    },
    logging: false, // opsional, biar console bersih
  }
);

// ======== CRON JOB AUTO HAPUS DATA LAMA =========
// jalan setiap hari jam 00:00 WIB
cron.schedule("0 0 * * *", async () => {
  try {
    // hapus data inspirasi yang lebih dari 14 hari
    await db.query(
      "DELETE FROM inspirasi WHERE tanggal < NOW() - INTERVAL 14 DAY;"
    );
    console.log("[CRON] Data inspirasi lama dihapus otomatis");
  } catch (err) {
    console.error("[CRON ERROR]", err);
  }
});

// ======== EXPORT DB =========
export default db;
