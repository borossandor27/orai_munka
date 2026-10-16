import express from 'express';
import pool from './data/db.js';

const app = express();
const PORT = 3000;

// =====================================================
// Filmek feladat
// =====================================================

// GET /filmek  
app.get('/filmek',async (req, res) => {
  let sql = 'SELECT * FROM filmek';
  let eredmeny = await pool.query(sql);
  res.json(eredmeny);
});

app.get('/filmek/:id', async (req, res) => {
  let id = req.params.id;
  let sql = "SELECT * FROM filmek WHERE id = ?";
  let eredmeny = await pool.query(sql, [id]);
  res.json(eredmeny);
});

app.listen(PORT, () => console.log(`Szerver fut: http://localhost:${PORT}`));
