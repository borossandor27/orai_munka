import express from "express";
const app = express();

app.use(express.json()); // a kapott adatokat JSON formátumban dolgozzuk fel

import fs from "fs/promises";

async function beolvasas() {
    try {
        const data = await fs.readFile("emberek.json", "utf-8");
        return JSON.parse(data);
    } catch (error) {
        console.error("Hiba a fájl beolvasásakor:", error);
        return [];
    }
}

async function iras(emberek) {
    try {
        await fs.writeFile("emberek.json", JSON.stringify(emberek, null, 2));
    } catch (error) {
        console.error("Hiba a fájl írásakor:", error);
    }
}

app.get("/mindenki", async (req, res) => {
    try {
        const emberek = await beolvasas();
        res.json(emberek);
    } catch (error) {
        res.status(500).json({ error: "Hiba történt az adatok lekérésekor." });
    }
});

app.patch("/modosit/:id", async (req, res) => {
    console.log("PATCH kérés érkezett az /modosit/:id végpontra");
    const id = req.params.id;
    // Ellenőrizzük, hogy az id érvényes szám-e
    if (parseInt(id) < 0 || isNaN(parseInt(id))) {
        return res.status(400).json({ error: "Hibás azonosító." });
    }
    // Ellenőrizzük, hogy a kérés teste tartalmaz-e adatot
    const { ujkor } = req.body;
    if (ujkor === undefined) {
        return res.status(400).json({ error: "Hiányos adat." });
    }
    // Ellenőrizzük, hogy az ujkor érvényes szám-e
    if (isNaN(parseInt(ujkor))) {
        return res.status(400).json({ error: "Hibás életkor." });
    }
    // emberek beolvasása és az adott id-hez tartozó ember keresése
    let emberek = null;
    let index = null;
    console.log("PATCH kérés érkezett az /modosit/:id végpontra");
    try {
        emberek = await beolvasas();
        index = emberek.findIndex((ember) => ember.id === parseInt(id)); // a sorszám és az index nem feltétlenül egyezik meg!
        if (index === -1) {
            return res.status(404).json({ error: "Nem található az adott azonosító." });
        }
    } catch (error) {
        res.status(500).json({ error: "Hiba történt az adatok módosításakor." });
    }
    console.log(index);
    // Az ember életkorának módosítása
    emberek[index].kor = parseInt(ujkor);
    await iras(emberek);
    res.json({ message: "Sikeres módosítás." });
}
);
app.listen(3000, () => {
    console.log("Szerver fut a http://localhost:3000 porton");
});