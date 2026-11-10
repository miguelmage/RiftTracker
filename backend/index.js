const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'secreto_rifttracker_hextech_2026';

app.use(express.static(path.join(__dirname, '../frontend')));

const verificarToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado: Token no proporcionado' });
  }

  try {
    const verificado = jwt.verify(token, JWT_SECRET);
    req.usuario = verificado;
    next();
  } catch (error) {
    res.status(403).json({ error: 'Token inválido o expirado' });
  }
};

app.post('/api/registro', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  try {
    const [existe] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (existe.length > 0) {
      return res.status(400).json({ error: 'El email ya está registrado' });
    }

    const password_hash = await bcrypt.hash(password, 10);
    const [result] = await db.query(
        'INSERT INTO usuarios (username, email, password_hash, rol) VALUES (?, ?, ?, ?)',
        [username, email, password_hash, 'user']
    );

    res.status(201).json({ mensaje: 'Usuario registrado con éxito', userId: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
});

app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  try {
    const [usuarios] = await db.query('SELECT * FROM usuarios WHERE email = ?', [email]);
    if (usuarios.length === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    const usuario = usuarios[0];

    const passwordValido = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }

    const token = jwt.sign(
        { id: usuario.id, username: usuario.username, email: usuario.email, rol: usuario.rol },
        JWT_SECRET,
        { expiresIn: '2h' }
    );

    res.json({
      mensaje: 'Inicio de sesión exitoso',
      token,
      usuario: { id: usuario.id, username: usuario.username, email: usuario.email, rol: usuario.rol }
    });
  } catch (error) {
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
});


// ==========================================
// PERFIL DE USUARIO
// ==========================================

// Obtener los datos actuales del usuario
app.get('/api/perfil', verificarToken, async (req, res) => {
  try {
    const [usuarios] = await db.query(
        `SELECT id, username, email, rol, created_at
             FROM usuarios
             WHERE id = ?`,
        [req.usuario.id]
    );

    if (usuarios.length === 0) {
      return res.status(404).json({
        error: 'Usuario no encontrado'
      });
    }

    res.json({ usuario: usuarios[0] });

  } catch (error) {
    console.error('Error al obtener el perfil:', error);
    res.status(500).json({
      error: 'Error al obtener el perfil'
    });
  }
});

// Actualizar nombre de usuario y correo electrónico
app.put('/api/perfil', verificarToken, async (req, res) => {
  const username = req.body.username?.trim();
  const email = req.body.email?.trim().toLowerCase();

  if (!username || !email) {
    return res.status(400).json({
      error: 'El nombre de usuario y el correo son obligatorios'
    });
  }

  try {
    // Comprobar si el correo pertenece a otra cuenta
    const [existentes] = await db.query(
        'SELECT id FROM usuarios WHERE email = ? AND id != ?',
        [email, req.usuario.id]
    );

    if (existentes.length > 0) {
      return res.status(409).json({
        error: 'Ese correo ya está registrado'
      });
    }

    await db.query(
        `UPDATE usuarios
             SET username = ?, email = ?
             WHERE id = ?`,
        [username, email, req.usuario.id]
    );

    const [usuarios] = await db.query(
        `SELECT id, username, email, rol, created_at
             FROM usuarios
             WHERE id = ?`,
        [req.usuario.id]
    );

    res.json({
      mensaje: 'Perfil actualizado correctamente',
      usuario: usuarios[0]
    });

  } catch (error) {
    console.error('Error al actualizar el perfil:', error);
    res.status(500).json({
      error: 'Error al actualizar el perfil'
    });
  }
});


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

app.get('/api/equipos/:id/palmares', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM palmares WHERE id_equipo = ?', [req.params.id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el palmarés' });
  }
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});