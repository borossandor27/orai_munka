import express from "express";

const route = express.Router();

route.post('/', (req, res) => {
    return res.status(201).json({message: "Belépés"});
});

export default route;