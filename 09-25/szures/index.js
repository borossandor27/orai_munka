import express from "express"; // hivatkozunk a modulra, amit telepítettünk
const app = express(); // példányosítjuk az express-t
import fs from "fs/promises"; // hivatkozunk a fájlrendszer modulra

async function adatokbeolvasasa() {
    try {
        const data = await fs.readFile("emberek.json", "utf-8"); // a fájlban lévő szöveget beolvassuk
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error("Hiba a fájl beolvasása közben:", error);
        return [];
    }

app.get("/nok", (req, res) => {
  res.send("Nők listája");
});

app.get("/ferfiak", (req, res) => {
  res.send("Férfiak listája");
});

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
