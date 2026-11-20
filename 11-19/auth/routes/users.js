import express from 'express'
import hitelesites from '../middleware/hitelesites';

const route = express.Router();

route.get("/users", hitelesites, (req, res)=>{
    return res.status(200).json({message: "felhasználók listája"})
})

export default route;