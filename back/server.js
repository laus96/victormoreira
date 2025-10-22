const express = require('express');
const path = require('path');
const session = require('express-session');
const { nanoid } = require('nanoid');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// ---- CORS ----
app.use(cors({
  origin: ['https://laus96.github.io' ],
  methods: ['GET'],
  credentials: true
}));
// ---- Sesiones ----
app.use(session({
  secret: 'una-clave-secreta', // cambia esto por algo seguro
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 día
}));

// ---- Archivos ----
const audios = {
  audio1: 'audiolibros1.mp3',
  audio2: 'audiolibros2.mp3',
  juegos2: 'videojuegos2.mp3',
  juegos3: 'videojuegos3.mp3',
};

const videos = {
  ani1: 'animacion1.mp4',
  ani2: 'animacion2.mp4',
  dob1: 'doblaje1.mp4',
  dob2: 'doblaje2.mp4',
  dob3: 'doblaje3.mp4',
  locu1:'locuion1.mp4',
  publi1: 'publicidad1.mp4',
  juegos1: 'videojuegos1.mp4',
};

// ---- Assets estáticos (opcional) ----
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// ---- API para audios ----
app.get('/api/get-audio', (req, res) => {
  const id = req.query.id;
  const file = audios[id];
  if (!file) return res.status(404).json({ error: 'Audio no encontrado' });

  const token = nanoid(12);

  // Crear objeto tokens en sesión si no existe
  if (!req.session.tokens) req.session.tokens = {};
  req.session.tokens[token] = { file, type: 'audio' };

  res.json({ url: `/media/${token}${path.extname(file)}` });
});

// ---- API para videos ----
app.get('/api/get-video', (req, res) => {
  const id = req.query.id;
  const file = videos[id];
  if (!file) return res.status(404).json({ error: 'Video no encontrado' });

  const token = nanoid(12);

  if (!req.session.tokens) req.session.tokens = {};
  req.session.tokens[token] = { file, type: 'video' };

  res.json({ url: `/media/${token}${path.extname(file)}` });
});

// ---- Servir archivos protegidos ----
app.get('/media/:tokenWithExt', (req, res) => {
  const token = path.parse(req.params.tokenWithExt).name;
  const tokenData = req.session.tokens ? req.session.tokens[token] : null;

  if (!tokenData) return res.status(403).send('Token inválido o expirado');

  const folder = tokenData.type === 'audio' ? 'audios' : 'videos';
  const filePath = path.join(__dirname, folder, tokenData.file);

  const ext = path.extname(tokenData.file).toLowerCase();
  if (ext === '.mp4') res.type('video/mp4');
  else if (ext === '.m4a') res.type('audio/m4a');
  else if (ext === '.mp3') res.type('audio/mpeg');

  res.sendFile(filePath);
});

// ---- Servidor ----
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
