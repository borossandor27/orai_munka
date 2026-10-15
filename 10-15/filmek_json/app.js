import express from 'express';
import fs from 'fs/promise';

const app = express();
const PORT = 3000;
const filmek = JSON.parse(await fs.readFile('./filmek.json', 'utf-8'));

// =====================================================
// Filmek feladat
// =====================================================

// GET /filmek  ?mufaj= ?min= ?tol= ?ig= ?rendez=cim|ev|ertekeles
app.get('/filmek', (req, res) => {
  let eredmeny = [...filmek];
  const { mufaj, min, tol, ig, rendez } = req.query;

  if (mufaj) eredmeny = eredmeny.filter((f) => f.mufaj === mufaj);
  if (min) eredmeny = eredmeny.filter((f) => f.ertekeles >= Number(min));
  if (tol) eredmeny = eredmeny.filter((f) => f.ev >= Number(tol));
  if (ig) eredmeny = eredmeny.filter((f) => f.ev <= Number(ig));

  if (rendez === 'cim') eredmeny.sort((a, b) => a.cim.localeCompare(b.cim, 'hu'));
  else if (rendez === 'ev') eredmeny.sort((a, b) => a.ev - b.ev);
  else if (rendez === 'ertekeles') eredmeny.sort((a, b) => b.ertekeles - a.ertekeles);

  res.json(eredmeny);
});

// FONTOS: a fix útvonalak (/filmek/cimek) a /filmek/:id ELŐTT legyenek!
app.get('/filmek/cimek', (req, res) => {
  res.json(filmek.map((f) => f.cim));
});

app.get('/filmek/rendezo/:nev', (req, res) => {
  const keresett = req.params.nev.toLowerCase();
  res.json(filmek.filter((f) => f.rendezo.toLowerCase().includes(keresett)));
});

app.get('/filmek/:id', (req, res) => {
  const film = filmek.find((f) => f.id === Number(req.params.id));
  if (!film) return res.status(404).json({ hiba: 'Nincs ilyen film' });
  res.json(film);
});

app.get('/statisztika', (req, res) => {
  const osszErtekeles = filmek.reduce((s, f) => s + f.ertekeles, 0);
  const osszHossz = filmek.reduce((s, f) => s + f.hossz, 0);
  const leghosszabb = filmek.reduce((max, f) => (f.hossz > max.hossz ? f : max));
  const legregebbi = filmek.reduce((min, f) => (f.ev < min.ev ? f : min));

  res.json({
    darab: filmek.length,
    atlagErtekeles: Number((osszErtekeles / filmek.length).toFixed(2)),
    osszesPerc: osszHossz,
    leghosszabb: leghosszabb.cim,
    legregebbi: legregebbi.cim,
  });
});

app.get('/mufajok', (req, res) => {
  const mufajok = [...new Set(filmek.map((f) => f.mufaj))].sort((a, b) => a.localeCompare(b, 'hu'));
  res.json(mufajok);
});

app.get('/mufajok/darab', (req, res) => {
  const darab = filmek.reduce((obj, f) => {
    obj[f.mufaj] = (obj[f.mufaj] || 0) + 1;
    return obj;
  }, {});
  res.json(darab);
});

app.get('/top/:n', (req, res) => {
  const n = Number(req.params.n);
  if (!Number.isInteger(n) || n < 1) {
    return res.status(400).json({ hiba: 'Az n pozitív egész szám legyen' });
  }
  const top = [...filmek].sort((a, b) => b.ertekeles - a.ertekeles).slice(0, n);
  res.json(top.map((f) => ({ cim: f.cim, ertekeles: f.ertekeles })));
});

app.get('/evtized/:ev', (req, res) => {
  const ev = Number(req.params.ev);
  if (!Number.isInteger(ev)) {
    return res.status(400).json({ hiba: 'Az évtized egész szám legyen, pl. 1990' });
  }
  const kezdo = Math.floor(ev / 10) * 10;
  const talalatok = filmek.filter((f) => f.ev >= kezdo && f.ev <= kezdo + 9);
  res.json({ evtized: `${kezdo}-${kezdo + 9}`, darab: talalatok.length, filmek: talalatok });
});

app.use((req, res) => {
  res.status(404).json({ hiba: 'Nincs ilyen végpont' });
});

app.listen(PORT, () => console.log(`Szerver fut: http://localhost:${PORT}`));
