require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./db');

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

app.put('/api/perfil', verificarToken, async (req, res) => {
  const username = req.body.username?.trim();
  const email = req.body.email?.trim().toLowerCase();

  if (!username || !email) {
    return res.status(400).json({
      error: 'El nombre de usuario y el correo son obligatorios'
    });
  }

  try {
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

const regionesRiot = {
  EUW1: { plataforma: 'euw1', regional: 'europe' },
  EUN1: { plataforma: 'eun1', regional: 'europe' },
  TR1:  { plataforma: 'tr1', regional: 'europe' },
  RU:   { plataforma: 'ru', regional: 'europe' },

  KR:   { plataforma: 'kr', regional: 'asia' },
  JP1:  { plataforma: 'jp1', regional: 'asia' },

  NA1:  { plataforma: 'na1', regional: 'americas' },
  BR1:  { plataforma: 'br1', regional: 'americas' },
  LA1:  { plataforma: 'la1', regional: 'americas' },
  LA2:  { plataforma: 'la2', regional: 'americas' },
  OC1:  { plataforma: 'oc1', regional: 'americas' }
};

const aliasRegiones = {
  EUW: 'EUW1',
  EUNE: 'EUN1',
  NA: 'NA1',
  BR: 'BR1',
  LAN: 'LA1',
  LAS: 'LA2',
  OCE: 'OC1',
  TUR: 'TR1'
};


async function consultarRiot(url) {
  const apiKey = process.env.RIOT_API_KEY;

  if (!apiKey) {
    throw new Error('Falta configurar RIOT_API_KEY en .env');
  }

  const respuesta = await fetch(url, {
    headers: {
      'X-Riot-Token': apiKey
    }
  });

  console.log(
      `[RIOT] ${respuesta.status} - ${url.split('?')[0]}`
  );

  if (!respuesta.ok) {
    const detalle = await respuesta.text();

    console.error('[RIOT ERROR]', detalle);

    const error = new Error(
        `Riot API respondió con estado ${respuesta.status}`
    );

    error.status = respuesta.status;
    throw error;
  }

  return respuesta.json();
}


let versionDataDragon = null;

async function obtenerVersionDataDragon() {
  if (versionDataDragon) return versionDataDragon;

  const versiones = await fetch(
      'https://ddragon.leagueoflegends.com/api/versions.json'
  );

  if (!versiones.ok) {
    throw new Error('No se pudo consultar la versión de Data Dragon.');
  }

  const datos = await versiones.json();
  versionDataDragon = datos[0];

  return versionDataDragon;
}

app.get('/api/soloq/buscar', async (req, res) => {
  try {
    const gameName = String(req.query.gameName || '').trim();
    const tagLine = String(req.query.tagLine || '').trim();

    const regionSolicitada = String(
        req.query.region || 'EUW1'
    ).toUpperCase();

    const region = aliasRegiones[regionSolicitada] || regionSolicitada;
    const configuracion = regionesRiot[region];

    if (!gameName || !tagLine) {
      return res.status(400).json({
        error: 'Debes introducir el nombre y la etiqueta del Riot ID.'
      });
    }

    if (!configuracion) {
      return res.status(400).json({
        error: 'La región seleccionada no es válida.'
      });
    }

    const cuenta = await consultarRiot(
        `https://${configuracion.regional}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`
    );

    const summoner = await consultarRiot(
        `https://${configuracion.plataforma}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${encodeURIComponent(cuenta.puuid)}`
    );
    
    const ligas = await consultarRiot(
        `https://${configuracion.plataforma}.api.riotgames.com/lol/league/v4/entries/by-puuid/${encodeURIComponent(cuenta.puuid)}`
    );


    const rankedSoloQ = ligas.find(
        entrada => entrada.queueType === 'RANKED_SOLO_5x5'
    );

    const idsPartidas = await consultarRiot(
        `https://${configuracion.regional}.api.riotgames.com/lol/match/v5/matches/by-puuid/${encodeURIComponent(cuenta.puuid)}/ids?queue=420&start=0&count=10`
    );

    const version = await obtenerVersionDataDragon();

    const datosCampeonesRespuesta = await fetch(
        `https://ddragon.leagueoflegends.com/cdn/${version}/data/es_ES/champion.json`
    );

    if (!datosCampeonesRespuesta.ok) {
      throw new Error('No se pudieron consultar los datos de campeones.');
    }

    const datosCampeones = await datosCampeonesRespuesta.json();

    const campeonesPorId = {};

    Object.values(datosCampeones.data).forEach(campeon => {
      campeonesPorId[Number(campeon.key)] = campeon.id;
    });

    const partidas = [];

    for (const idPartida of idsPartidas) {
      const partida = await consultarRiot(
          `https://${configuracion.regional}.api.riotgames.com/lol/match/v5/matches/${encodeURIComponent(idPartida)}`
      );

      const participante = partida.info.participants.find(
          jugador => jugador.puuid === cuenta.puuid
      );

      if (!participante) continue;

      const nombreCampeon =
          campeonesPorId[participante.championId] ||
          participante.championName;

      partidas.push({
        championName: participante.championName,

        championIcon: nombreCampeon
            ? `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${nombreCampeon}.png`
            : null,

        win: participante.win,
        kills: participante.kills,
        deaths: participante.deaths,
        assists: participante.assists,
        lane: participante.teamPosition || participante.lane || 'UNKNOWN',
        duration: partida.info.gameDuration,
        playedAt: partida.info.gameEndTimestamp
            ? new Date(partida.info.gameEndTimestamp).toISOString()
            : new Date(partida.info.gameCreation).toISOString()
      });
    }

    res.json({
      region,

      account: {
        gameName: cuenta.gameName,
        tagLine: cuenta.tagLine,
        summonerLevel: summoner.summonerLevel,
        profileIconUrl:
            `https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${summoner.profileIconId}.png`
      },

      ranked: rankedSoloQ
          ? {
            tier: rankedSoloQ.tier,
            division: rankedSoloQ.rank,
            leaguePoints: rankedSoloQ.leaguePoints,
            wins: rankedSoloQ.wins,
            losses: rankedSoloQ.losses,
            rankIconUrl: null
          }
          : {
            tier: null,
            division: null,
            leaguePoints: 0,
            wins: 0,
            losses: 0,
            rankIconUrl: null
          },

      matches: partidas
    });

  } catch (error) {
    console.error('Error en Riot API:', error);

    if (error.status === 404) {
      return res.status(404).json({
        error: 'No se ha encontrado esa cuenta o no hay datos disponibles.'
      });
    }

    if (error.status === 401 || error.status === 403) {
      return res.status(502).json({
        error: 'La clave de Riot no es válida o ha caducado. Comprueba tu API Key.'
      });
    }

    if (error.status === 429) {
      return res.status(429).json({
        error: 'Se ha alcanzado el límite de consultas. Espera un poco y vuelve a intentarlo.'
      });
    }

    res.status(500).json({
      error: 'No se ha podido consultar Riot API. Revisa el servidor.'
    });
  }
});

app.get(/.*/, (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`);
});