import express from 'express'
import 'dotenv/config'
import loginRoute from './routes/login.js'
import registrationRoute from './routes/registration.js'
import profilRoute from './routes/profil.js'
import userRoute from './routes/user.js'
import usersRoute from './routes/users.js'
import publicRoute from './routes/public.js'

const app = express();

export const allRoles=["admin", "user"];


app.use(express.json()); // a body tartalmat alakítja JSON formátumra

app.use("/api", publicRoute);         // GET /api – publikus
app.use("/api/login", loginRoute);
app.use("/api/registration", registrationRoute);
app.use("/api/profil", profilRoute);
app.use("/api/user", userRoute);
app.use("/api/users", usersRoute);

const PORT = Number(process.env.APP_PORT) || 3000  // ?? nem jó: Number(undefined) = NaN
app.listen(PORT, ()=>{
    console.log(`Fut a http://localhost:${PORT} url-en`);
})