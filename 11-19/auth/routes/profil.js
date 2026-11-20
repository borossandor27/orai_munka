// GET /api/profil – csak a bejelentkezett felhasználó SAJÁT profilja
import express from 'express'
import pool from '../database/db.js'
import hitelesites from '../middleware/hitelesites.js'
import szerepkor from '../middleware/szerepkor.js'

const route = express.Router();

route.get("/", hitelesites, szerepkor("user"), async (req, res) => {
    try {
        // csak a tokenben szereplő userid-t kérdezzük le -> más profilját nem lehet elérni
        const sql = "SELECT `userid`, `username`, `role` FROM `users` WHERE `userid` = ?;";
        const [users] = await pool.execute(sql, [req.user.userid]);
        if (users.length === 0) {
            return res.status(404).json({ error: "A felhasználó nem található" });
        }
        return res.status(200).json({
            message: `Üdvözöllek ${req.user.username}, szerepköröd: ${req.user.role}`,
            profil: users[0]
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Szerver hiba" });
    }
})

export default route;
