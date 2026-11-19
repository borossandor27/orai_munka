import express from 'express'
import 'dotenv/config'
import loginRoute from './routes/login.js'
import registrationRoute from './routes/registration.js'
import profileRoute from './routes/profile.js'
import userRoute from './routes/user.js'
import usersRoute from './routes/users.js'

const app = express();

app.use(express.json()); // ✅ meghívva
app.use((req, res, next) => {   // ✅ next() hívás
    console.log("Kérés érkezett");
    next();
});

app.use('/api/login', loginRoute);
app.use('/api/registration', registrationRoute);
app.use('/api/profile', profileRoute);
app.use('/api/user', userRoute);
app.use('/api/users', usersRoute);

const PORT = Number(process.env.APP_PORT) ?? 3000;
app.listen(PORT, () => {
    console.log(`Fut a http://localhost:${PORT}`);
});