import express from "express"; // elindul a betöltés
const app = express(); // express példányosítása


app.get("/osz", (req, res) => {
  res.send("Ősz van");
});

app.get("/tavasz", (req, res) => {
  res.send("Tavasz van");
});

app.get("/nyar", (req, res) => {
  res.send("Nyár van");
});

const PORT = 3000; // port beállítása
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.get("/tel", (req, res) => {
  res.send("Tél van");
});
