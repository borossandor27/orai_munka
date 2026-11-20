import express from 'express'
import 'dotenv/config'
import loginRoute from './routes/login.js'
import registrationRoute from './routes/registration.js'
import profilRoute from './routes/profil.js'
import userRoute from './routes/user.js'
import usersRoute from './routes/users.js'
import publicRoute from './routes/public.js'

const app = express();

export const allRoles = ["admin", "user"];


app.use(express.json()); // a body tartalmat alakítja JSON formátumra

app.use("/api", publicRoute);         // GET /api – publikus
app.use("/api/login", loginRoute);
app.use("/api/registration", registrationRoute);
app.use("/api/profil", profilRoute);
app.use("/api/user", userRoute);
app.use("/api/users", usersRoute);

const PORT = Number(process.env.APP_PORT) || 3000  // ?? nem jó: Number(undefined) = NaN

app.use((err, req, res, next) => {

})

const baseUrl = `http://localhost:${PORT}/`;
const backendPoints = [
    {
        "method": "GET",
        "url": "/api",
        "role": "-",
        "megjegyzes": "publikus tartalom ",
    },
    {
        "method": "POST",
        "url": "/api/registration",
        "role": "-",
        "megjegyzes": "ha a felhasználónév már foglalt, 409-et ad. A hiányzó adatokra 400-at ad 401 helyett. ",
    },
    {
        "method": "POST",
        "url": "/api/login",
        "role": "user,admin",
        "megjegyzes": " ",
    },
    {
        "method": "GET",
        "url": "/api/profil",
        "role": "user",
        "megjegyzes": "csak user szerepkörrel érhető el, és a tokenben lévő userid alapján a saját profilt adja vissza. Így másét nem lehet lekérni. ",
    },
    {
        "method": "DELETE",
        "url": "/api/user/:id",
        "role": "admin",
        "megjegyzes": "csak admin érheti el, és ténylegesen töröl az adatbázisból. Hibás azonosítóra 400-at, nem létező felhasználóra 404-et ad, és az admin saját magát nem törölheti. ",
    },
    {
        "method": "GET",
        "url": "/api/users",
        "role": "admin",
        "megjegyzes": "csak admin érheti el, a felhasználókat az adatbázisból listázza, jelszó-hash nélkül. ",
    }
]

app.use((req, res) => {
    let htmlString = "<h1>Elérhető végpontok listája</h1>";
    htmlString += "<dl>";
    for (const item of backendPoints) {
        const url = baseUrl.replace(/\/$/, '') + item.url; // pl. http://localhost:3000/api
        const isClickable = item.method === "GET";
        const label = isClickable
            ? `<a href="${url}" target="_blank" rel="noopener">${url}</a>`
            : url;
        htmlString += `<dt style="margin-top: 10px;"><strong>- ${item.method}</strong> ${label} (${item.role})</dt>`;
        //htmlString += `<dt>${item.method} <a href="${url}" target="_blank" rel="noopener">${url}</a> (${item.role})</dt>`;
        htmlString += `<dd>${item.megjegyzes}</dd>`;
    }
    htmlString += "</dl>";
    res.status(200).type('html').send(htmlString);
});

app.listen(PORT, () => {
    console.log(`Fut a http://localhost:${PORT} url-en`);
})