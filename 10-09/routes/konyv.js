import {Router} from 'express';
const konyvRoutes = Router();

konyvRoutes.get('/', (req, res) => {
    res.send('konyv-ra érkeztél!');
});

konyvRoutes.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`konyv-ra érkeztél! ID: ${id}`);
}); 

konyvRoutes.post('/', (req, res) => {
    res.send('konyv-ra POST kérést kaptál!');
});

konyvRoutes.put('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`konyv-ra PUT kérést kaptál! ID: ${id}`);
});

konyvRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`konyv-ra DELETE kérést kaptál! ID: ${id}`);
});

export default konyvRoutes;