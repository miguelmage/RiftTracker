const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/api/ligas', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM ligas');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las ligas' });
  }
});

app.get('/api/ligas/:id/equipos', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM equipos WHERE id_liga = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los equipos' });
  }
});

app.get('/api/equipos/:id/jugadores', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM jugadores WHERE id_equipo = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los jugadores' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});