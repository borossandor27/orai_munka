import pool from './utils/db.js';
import { Router } from 'express';

const mufajRouter = Router();

// TODO: GET /mufajok
mufajRouter.get('/', async (req, res) => {
    try {
        const [rows] = await pool.execute('SELECT distinct albumok.mufaj FROM albumok');
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Hiba történt az adatok lekérdezésekor.' });
    }
});

export default mufajRouter;