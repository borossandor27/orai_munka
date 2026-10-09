import express from 'express';
import olvasoRoutes from './routes/olvaso.js';
import konyvRoutes from './routes/konyv.js';
import kolcsonzesRoutes from './routes/kolcsonzes.js';

const app = express();

app.use('/olvaso', olvasoRoutes); // req, res, next átadása a routernek
app.use('/konyv', konyvRoutes); // req, res, next átadása a routernek
app.use('/kolcsonzes', kolcsonzesRoutes); // req, res, next átadása a routernek

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});