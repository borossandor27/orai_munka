// POST /api/registration – új felhasználó létrehozása (publikus)
import express from 'express'
import pool from '../database/db.js'
import bcrypt from 'bcrypt'

const route = express.Router();

route.post("/", async (req, res) => {
    const { name, password } = req.body ?? {};
    // adatok ellenőrzése
    if (!name || !password) {
        return res.status(400).json({ error: "Hiányzó adatok" });
    }
    try {
        // foglalt-e már a felhasználónév?
        const [letezo] = await pool.execute("SELECT `userid` FROM `users` WHERE `username` = ?;", [name]);
        if (letezo.length > 0) {
            return res.status(409).json({ error: "A felhasználónév már foglalt" });
        }
        // a kapott adatok kiírása az adatbázisba (jelszó csak hash-elve!)
        const passwordHash = await bcrypt.hash(String(password), 10);
        const sql = "INSERT INTO `users` (`userid`, `username`, `password`, `role`) VALUES (NULL, ?, ?, 'user');";
        await pool.execute(sql, [name, passwordHash]);
        return res.status(201).json({ message: "Sikeres regisztráció" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Létrehozás sikertelen!" });
    }
})

export default route;
