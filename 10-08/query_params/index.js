import express from 'express';

const app = express();

app.get('/filmek', (req, res) => {
    const {mufaj, tol, ig} = req.query;

    if (!mufaj || !tol || !ig) {
        return res.status(400).json({ error: 'Hiányzó lekérdezési paraméterek' });
    }

    res.json({
        "műfaj": mufaj,
        "tól": tol,
        "ig": ig
    });
});
app.listen(3000, () => {
    console.log('Szerver fut a http://localhost:3000-es címen');
});