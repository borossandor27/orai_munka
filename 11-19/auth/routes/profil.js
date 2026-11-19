import express from 'express'

const route=express.Router();

route.post("/profil", (req,res) => {
    return res.status(201).json({message: "Profil megtekintése"});
})

export default route;