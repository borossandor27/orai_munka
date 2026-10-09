import { Router } from "express";

const kolcsonzesRoutes = Router();

app.get('/', (req, res) => {
    res.send('kolcsonzes-re érkeztél!');
});

export default kolcsonzesRoutes;