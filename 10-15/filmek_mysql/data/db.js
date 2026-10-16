import mysql from 'mysql2/promise'; // az aszinkron módú mysql2 csomag importálása
import 'dotenv/config'; // a .env fájl betöltése

const dbConfig = {
  host: process.env.DB_HOST || 'localhost', // Adatbázis szerver címe
  user: process.env.DB_USER || 'root',      // Adatbázis felhasználó neve
  password: process.env.DB_PASSWORD || '',      // Adatbázis jelszó
  database: process.env.DB_NAME || 'filmek', // Adatbázis neve
  port: process.env.DB_PORT || 3306,        // Adatbázis portja (alapértelmezett MySQL port)
};

// Adatbázis kapcsolat létrehozása
const pool = mysql.createPool(dbConfig);

export default pool; // A kapcsolatot exportáljuk, hogy más modulokban is használható legyen