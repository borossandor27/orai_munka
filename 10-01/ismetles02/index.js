import express from "express";
const app = express();

app.get("/", (req, res) => {
  res.send("létrehozáshoz használja a POST metódust");
});

// create
app.post("/uj", (req, res) => {
  res.send("POST metódus sikeresen meghívva");
});

// read
app.get("/mindenki", (req, res) => {
  res.send("GET metódus sikeresen meghívva");
});

app.get("/egyedi/:id", (req, res) => {
  const id = req.params.id;
  res.send(`GET metódus sikeresen meghívva az id: ${id}`);
});

// update
app.put("/modosit/:id", (req, res) => {
  const id = req.params.id;
  res.send(`PUT metódus sikeresen meghívva az id: ${id}`);
});

// partial update
app.patch("/reszleges/:id", (req, res) => {
  const id = req.params.id;
  res.send(`PATCH metódus sikeresen meghívva az id: ${id}`);
});

// delete
app.delete("/torol/:id", (req, res) => {
  const id = req.params.id;
  res.send(`DELETE metódus sikeresen meghívva az id: ${id}`);
});

// port figyelés beállítása
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
