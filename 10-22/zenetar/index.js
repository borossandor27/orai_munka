// =====================================================
// 29. feladat - Zenetár (eloadok + albumok)
// Indítás: npm run f29
// Előtte:  1. data/zenetar.sql importálása (phpMyAdmin)
//          2. .env.example lemásolása .env néven
//          3. utils/db.js elkészítése (lásd a fő README "Adatbázisos (MySQL) változatok" részét)
// Teszteléshez: requests.http
// =====================================================

import 'dotenv/config'; // a .env beolvasása - ez legyen az első import!
import express from 'express';
import pool from './utils/db.js';
import albumRoute from './routes/albumRoute.js';
import eloadoRoute from './routes/eloadoRoute.js';

let vegpontok = [
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/eloadok`, leiras: 'Előadók listája (opcionális: ?orszag=)' },
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/eloadok/:id`, leiras: 'Egy előadó adatai + albumok tömb' },
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/albumok`, leiras: 'Albumok listája (opcionális: ?mufaj=  ?tol=  ?ig=)' },
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/albumok/kereses?q=`, leiras: 'Albumok keresése címben VAGY előadónévben (min. 2 karakter)' },
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/mufajok`, leiras: 'Műfajok listája' },
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/statisztika/eloadok`, leiras: 'Statisztika az előadókról (album nélküli előadó is!)' },
    { vegpont: `http://localhost:${process.env.PORT ?? 3000}/orszagok`, leiras: 'Országok listája' }
];


const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT ?? 3000);

app.use('/albumok', albumRoute);
app.use('/eloadok', eloadoRoute);


// TODO: GET /statisztika/eloadok   (az album nélküli előadó is!)

// TODO: GET /orszagok

// TODO: 404-es kezelő (JSON)

// TODO: hibakezelő middleware (500) - pl. ha nem fut a MySQL

app.listen(PORT, () => console.log(`Szerver fut: http://localhost:${PORT}`));
