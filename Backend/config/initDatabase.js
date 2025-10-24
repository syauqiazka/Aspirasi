import db from "./database.js";

export const initDatabase = async () => {
  const createSuggestionTableQuery = `
    CREATE TABLE IF NOT EXISTS suggestions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nama VARCHAR(100) NOT NULL,
      saran TEXT NOT NULL,
      waktu DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;

  try {
    await db.query("SET time_zone = '+07:00'"); // 🕖 Set timezone WIB
    await db.query(createSuggestionTableQuery);
    console.log("✅ Table 'suggestions' ready.");
  } catch (err) {
    console.error("❌ Error initializing database:", err);
  }
};
