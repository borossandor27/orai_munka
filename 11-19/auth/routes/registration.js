import express from 'express'
import pool from '../database/db.js'
import bcrypt from 'bcrypt'
import 'dotenv/config'

const route = express.Router();

route.post("/", async (req, res) => {
    let { name, password } = req.body ?? {};
    console.log("name")
    // adatok ellenőrzése
    if (name === undefined || password === undefined) {
        return res.status(401).json({ error: "hiányzó adatok" });
    }
    // a kapott adatok kiírása az adatbázisba
    let passwordHash = await bcrypt.hash(password, 10);
    const sql = "INSERT INTO `users` (`userid`, `username`, `password`, `role`) VALUES (NULL, ?, ?, 'user')";
    try {
        await pool.execute(sql, [name, passwordHash]);
    } catch {
        return res.status(500).json({ succes: false, error: "létrehozás sikertelen!" })
    }
    return res.status(201).json({ message: "sikeres regisztracio" });
})

export default route;