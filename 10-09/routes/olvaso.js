import { Router } from 'express';
const olvasoRoutes = Router();

olvasoRoutes.get('/', (req, res) => {
    res.send('olvasóra érkeztél!');
});

olvasoRoutes.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`olvasóra érkeztél! ID: ${id}`);
});

olvasoRoutes.post('/', (req, res) => {
    res.send('olvasóra POST kérést kaptál!');
});

olvasoRoutes.put('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`olvasóra PUT kérést kaptál! ID: ${id}`);
});

olvasoRoutes.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`olvasóra DELETE kérést kaptál! ID: ${id}`);
}); 

export default olvasoRoutes;