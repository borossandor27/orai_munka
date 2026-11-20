// helyes azonosító adatok esetén JWT-t ad vissza
import express from 'express'
import pool from '../database/db.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import 'dotenv/config'

const route = express.Router();

route.post("/", async (req, res) => {
    let { name, password } = req.body ?? {};
    // adatok ellenőrzése
    if (name === undefined || password === undefined) {

        return res.status(401).json({ error: "hiányzó adatok" });
    }
    // felhasználói adatok lekérése az adatbázisból
    try {
        const sql = "SELECT * FROM `users` WHERE `username`= ?;"
        const [users] = await pool.execute(sql, [name]);
        if (users === undefined || users.length === 0) return res.status(401).json({ error: "nem megfelelő felhasználónév vagy jelszó!" });
        const user = users[0];
        // a talált felhasználónál a jelszó
        const egyezes = await bcrypt.compare(password.toString(), user.password.toString());

        if (egyezes) {
            // JWT előállítása
            const token = jwt.sign(
                {
                    "userid": user.userid,
                    "username": user.username,
                    "role": user.role
                },
                process.env.JWT_SECRET,
                {
                    subject: String(user.userid),
                    expiresIn: "1h"
                }
            )
            return res.status(200).json({
                message: "Sikeres bejelentkezés",
                token
            })
        }
        return res.status(401).json({ error: "nem megfelelő felhasználónév vagy jelszó!" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Szerver hiba" });
    }
    return res.status(201).json({ message: "Belépés" });
})

export default route;