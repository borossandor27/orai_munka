import express from 'express'

const router = express.Router();

router.get('', (req,res)=>{
    res.send('vetitesek');
})

export default router