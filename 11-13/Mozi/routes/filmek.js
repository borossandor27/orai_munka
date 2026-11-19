import express from 'express'
import pool from '../db/database.js'

const router = express.Router();

router.get('/:id', async (req, res) => {
    // Egyetlen film a vetítésekkel
    const id = parseInt(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ message: 'Érvénytelen azonosító!' });
    }

    try {
        const sql_id = `SELECT f.id AS film_id, f.cim, f.hossz, f.korhatar,
                               v.id AS vetites_id, t.nev AS terem, v.kezdes, v.jegyar,
                               (t.sorok * t.szekek) - COUNT(fog.id) AS szabadHely
                        FROM filmek f
                        LEFT JOIN vetitesek v ON f.id = v.film_id
                        LEFT JOIN termek t ON v.terem_id = t.id
                        LEFT JOIN foglalasok fog ON v.id = fog.vetites_id
                        WHERE f.id = ?
                        GROUP BY f.id, v.id`;
        const [rows] = await pool.execute(sql_id, [id]);

        if (rows.length === 0) {
            return res.status(404).json({ message: `Nincs ${id} azonosítójú film!` });
        }
        if (rows[0].vetites_id == null) {
            return res.status(404).json({ message: `A ${rows[0].cim} című filmet nem vetítik` });
        }

        const film = {
            id: rows[0].film_id,
            cim: rows[0].cim,
            hossz: rows[0].hossz,
            korhatar: rows[0].korhatar,
            vetitesek: rows.map(row => ({
                id: row.vetites_id,
                terem: row.terem,
                kezdes: row.kezdes,
                jegyar: row.jegyar,
                szabadHely: row.szabadHely
            }))
        };

        return res.status(200).json(film);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Szerverhiba' });
    }
});


router.get('', async (req, res) => {


    const sql_all = `SELECT filmek.id, filmek.cim, filmek.hossz, filmek.korhatar, COALESCE(v.vetitesDb, 0) AS vetitesDb, COALESCE(f.eladottJegy, 0) AS eladottJegy 
                        FROM filmek LEFT JOIN 
                        ( SELECT film_id, COUNT(id) AS vetitesDb FROM vetitesek GROUP BY film_id ) v ON filmek.id = v.film_id 
                         LEFT JOIN ( SELECT v.film_id, COUNT(f.id) AS eladottJegy 
                                        FROM vetitesek v JOIN foglalasok f ON v.id = f.vetites_id 
                                        GROUP BY v.film_id ) f ON filmek.id = f.film_id;`;
    const [filmek] = await pool.execute(sql_all);
    res.status(200).json(filmek);

})

export default router