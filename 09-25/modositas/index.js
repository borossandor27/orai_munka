import express from "express";
const app = express();
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