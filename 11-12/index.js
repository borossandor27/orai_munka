import express from `express`
import db from `./Szallaskereso/data/db.js`
import SzallasokRouter from `./Szallaskereso/routes/szallasok.js`
import AjanlatRouter from `./Szallaskereso/routes/ajanlat.js`
import LegjobbRouter from `./Szallaskereso/routes/legjobb.js`
import OrszagokRouter from `./Szallaskereso/routes/orszagok.js`
import VarosokRouter from `./Szallaskereso/routes/varosok`

app.use(SzallasokRouter)
app.use(AjanlatRouter)
app.use(LegjobbRouter)
app.use(OrszagokRouter)
app.use(VarosokRouter)

app.listen()
