// DELETE /api/user/:id – felhasználó törlése (csak admin)
import express from 'express'
import pool from '../database/db.js'
import hitelesites from '../middleware/hitelesites.js'
import szerepkor from '../middleware/szerepkor.js'

const route = express.Router();

route.delete("/:id", hitelesites, szerepkor("admin"), async (req, res) => {
    const id = Number(req.params.id);
    // azonosító ellenőrzése: csak pozitív egész szám lehet
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ error: "Érvénytelen azonosító" });
    }
    // az admin saját magát ne tudja törölni
    if (id === req.user.userid) {
        return res.status(400).json({ error: "Saját magadat nem törölheted" });
    }
    try {
        const sql = "DELETE FROM `users` WHERE `userid` = ?;";
        const [result] = await pool.execute(sql, [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Nincs ilyen azonosítójú felhasználó" });
        }
        return res.status(200).json({ message: `${id} azonosítójú felhasználó törölve` });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Szerver hiba" });
    }
})

export default route;
