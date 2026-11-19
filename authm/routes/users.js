import express from "express";

const route = express.Router();

route.get('/', (req, res) => {
    return res.status(200).json({message: "Felhasználók listája"});
});

export default route;