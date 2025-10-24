import { DataTypes } from "sequelize";
import db from "../config/database.js";
import moment from "moment-timezone";


const Saran = db.define(
  "saran",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pesan: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
     createdAt: {
      type: DataTypes.DATE,
      get() {
        const rawValue = this.getDataValue("createdAt");
        return moment(rawValue).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      },
    },
    updatedAt: {
      type: DataTypes.DATE,
      get() {
        const rawValue = this.getDataValue("updatedAt");
        return moment(rawValue).tz("Asia/Jakarta").format("YYYY-MM-DD HH:mm:ss");
      },
    },
  },
  
  {
    timestamps: true, // otomatis tambahkan createdAt & updatedAt
    tableName: "saran", // nama tabel di database
  }
);

export default Saran;
