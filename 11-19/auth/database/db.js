import mysql from 'mysql2/promise'
import 'dotenv/config'

const dbConfig = {
    host: process.env.DB_HOST ?? "localhost",
    user: process.env.DB_USER ?? "root",
    password: process.env.DB_PASSWORD ?? "",
    name: process.env.DB_NAME ?? "auth",
    port: Number(process.env.DB_PORT) ?? 3306,
    datestring: true
}
const pool = mysql.createPool(dbConfig);

export default pool;