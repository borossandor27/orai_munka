import express from 'express'

const route = express.Router();

route.delete("/user/:id", (req, res) => {
    let id = req.params.id;
    if (!parseInt(Number(id) > 0)) {
        return res.status(401).json({ error: "Érvénytelen azonosító" });
    }
    return res.status(201).json({ message: `${id} azonosítójú felhasználó törlése` });
})

export default route;