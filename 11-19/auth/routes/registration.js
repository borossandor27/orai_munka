import express from 'express'
import pool from '../database/db.js'

const route=express.Router();

route.post("/", (req,res) => {
    let {name, password} = req.body ?? {};
    // adatok ellenőrzése
    if( name === undefined || password === undefined){
        return res.status(401).json({error: "hiányzó adatok"});
    }

    return res.status(201).json({message: "Regisztracio"});
})

export default route;