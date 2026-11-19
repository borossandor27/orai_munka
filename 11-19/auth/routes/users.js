import express from 'express'

const route = express.Router();

route.get("/users", (req, res)=>{
    return res.status(200).json({message: "felhasználók listája"})
})

export default route;