import express from 'express'
import filmekRoutes from './routes/filmek.js'
import vetitesekRoutes from './routes/vetitesek.js'
import statisztikaRoutes from './routes/statisztika.js'
import 'dotenv/config'
import errorHandler from './errorHandler.js'

const app = express();

app.use(express.json());

app.use('/filmek', filmekRoutes);
app.use('/statisztika', statisztikaRoutes);
app.use('/vetitesek', vetitesekRoutes);

app.use((req, res) => {
    const port = process.env.APP_PORT || 3000;
    const baseUrl = `http://localhost:${port}`;

    res.status(404).send(`
        <h1>Az oldal nem található</h1>
        <p>Elérhető főbb útvonalak:</p>
        <ul>
            <li><a href="${baseUrl}/filmek">Filmek</a></li>
            <li><a href="${baseUrl}/vetitesek">Vetítések</a></li>
            <li><a href="${baseUrl}/statisztika">Statisztika</a></li>
        </ul>
    `);
});

app.use(errorHandler);

const port = Number(process.env.APP_PORT) || 3000;

app.listen(port, () => {
    console.log(`elindult a http://localhost:${port} porton`);
})