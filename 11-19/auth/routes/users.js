// GET /api/users – az összes felhasználó listája (csak admin)
import express from 'express'
import pool from '../database/db.js'
import hitelesites from '../middleware/hitelesites.js'
import szerepkor from '../middleware/szerepkor.js'

const route = express.Router();

route.get("/", hitelesites, szerepkor("admin"), async (req, res) => {
    try {
        // a jelszó hash-t SOHA nem adjuk vissza!
        const sql = "SELECT `userid`, `username`, `role` FROM `users` ORDER BY `userid`;";
        const [users] = await pool.execute(sql);
        return res.status(200).json(users);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Szerver hiba" });
    }
})

export default route;
