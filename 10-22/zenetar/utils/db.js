import 'dotenv/config'; // a .env beolvasása - ez legyen az első import!
import myslql from 'mysql2/promise';

let dbConfig = {
    host: process.env.DB_HOST ?? 'localhost',
    port: Number(process.env.DB_PORT ?? 3306),
    user: process.env.DB_USER ?? 'root',
    password: process.env.DB_PASSWORD ?? '',
    database: process.env.DB_NAME ?? 'zenetar',
    connectionLimit: 10,
};

const pool = myslql.createPool(dbConfig);

export default pool;