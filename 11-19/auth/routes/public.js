// GET /api – publikus tartalom, nem kell hozzá bejelentkezés
import express from 'express'

const route = express.Router();

route.get("/", (req, res) => {
    return res.status(200).json({ message: "Publikus tartalom – ezt bárki láthatja" });
})

export default route;
