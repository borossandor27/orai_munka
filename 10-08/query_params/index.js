import express from 'express';

const app = express();

function konvertSzamma(param) {
    if (param === undefined || param === null || param === '') {
        return undefined;
    }
    return Number(param); // iteger, bigint, float, double, stb. konvertálás
}

app.get('/filmek', (req, res) => {
    const { mufaj, tol, ig } = req.query;

    if (!mufaj || !tol || !ig) {
        return res.status(400).json({ error: 'Hiányzó lekérdezési paraméterek' });
    }

    tol = konvertSzamma(tol);
    ig = konvertSzamma(ig);
    res.json({
        "műfaj": mufaj,
        "tól": tol,
        "ig": ig
    });
});

// ellenőrízzük, hogy a paraméterként kapott evszam a tól-ig tartományban van-e
app.get('/filmek/:evszam', (req, res) => {
    let { mufaj, tol, ig } = req.query;
    let { evszam } = req.params;

    if (!mufaj || !tol || !ig) {
        return res.status(400).json({ error: 'Hiányzó lekérdezési paraméterek' });
    }
    tol = konvertSzamma(tol);
    ig = konvertSzamma(ig);
    evszam = konvertSzamma(evszam);

    res.json({
        "műfaj": mufaj + " " + typeof mufaj,
        "tól": tol + " " + typeof tol,
        "ig": ig + " " + typeof ig,
        "evszam": evszam + " " + typeof evszam,
        "tartományban": evszam >= tol && evszam <= ig
    });
});
app
app.listen(3000, () => {
    console.log('Szerver fut a http://localhost:3000-es címen');
});