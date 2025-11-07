import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    port: process.env.DB_PORT || 3306,

    // 🕖 Set zona waktu ke WIB
    timezone: "+07:00", // semua waktu otomatis pakai WIB

    dialectOptions: {
      dateStrings: true, // biar hasil query pakai string, bukan UTC Date object
    },

    define: {
      timestamps: true, // otomatis createdAt & updatedAt
    },

    logging: false, // opsional, biar console bersih
  }
);




export default db;
