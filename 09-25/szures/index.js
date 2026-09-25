import express from "express"; // hivatkozunk a modulra, amit telepítettünk
const app = express(); // példányosítjuk az express-t
import fs from "fs/promises"; // hivatkozunk a fájlrendszer modulra

async function adatokbeolvasasa() {
    try {
        const data = await fs.readFile("emberek.json", "utf-8"); // a fájlban lévő szöveget beolvassuk
        const jsonData = JSON.parse(data); // a szöveget JSON objektummá alakítjuk
        return jsonData;
    } catch (error) {
        console.error("Hiba a fájl beolvasása közben:", error);
        return [];
    }
}

app.get("/nok", async (req, res) => {
    try {
        const adatok = await adatokbeolvasasa(); // beolvassuk az adatokat
        const nok = adatok.filter((ember) => ember.nem === "no"); // szűrjük a nőket
        res.json(nok);
    } catch (error) {
        res.status(500).send("Hiba történt az adatok feldolgozása közben.");
    }
});

app.get("/ferfiak", async (req, res) => {
    try {
        const adatok = await adatokbeolvasasa(); // beolvassuk az adatokat
        const ferfiak = adatok.filter((ember) => ember.nem === "ferfi"); // szűrjük a férfiakat
        res.json(ferfiak);
    } catch (error) {
        res.status(500).send("Hiba történt az adatok feldolgozása közben.");
    }
});

app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
