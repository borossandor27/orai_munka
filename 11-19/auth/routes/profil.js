import express from 'express'
import hitelesites from '../middleware/hitelesites.js';

const route = express.Router();
route.get("/", hitelesites, (req, res) => {
    return res.status(200).json({ message: "Saját profilod" });
})

route.post("/", (req, res) => {
    return res.status(201).json({ message: "Profil megtekintése" });
})

export default route;