import express from "express";

const route = express.Router();

route.get('/', (req, res) => {
    return res.status(201).json({message: "Profil megtekintése"});
});

export default route;