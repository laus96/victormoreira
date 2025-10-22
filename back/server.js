const express = require('express');
const path = require('path');
const { nanoid } = require('nanoid');
const app = express();
const PORT = 3000;

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

const tokens = {};

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')));
app.get('/doblaje', (req, res) => res.sendFile(path.join(__dirname, 'doblaje', 'index.html')));
app.get('/api/get-audio', (req, res) => {
  const id = req.query.id;
  const file = audios[id];
  if (!file) return res.status(404).json({ error: 'Audio no encontrado' });

  const token = nanoid(12);
  tokens[token] = { file, type: 'audio' };

  setTimeout(() => { delete tokens[token]; }, 5 * 60 * 1000);
  res.json({ url: `/media/${token}${path.extname(file)}` });
});

app.get('/api/get-video', (req, res) => {
  const id = req.query.id;
  const file = videos[id];
  if (!file) return res.status(404).json({ error: 'Video no encontrado' });

  const token = nanoid(12);
  tokens[token] = { file, type: 'video' };

  setTimeout(() => { delete tokens[token]; }, 5 * 60 * 1000);
  res.json({ url: `/media/${token}${path.extname(file)}` });
});

app.get('/media/:tokenWithExt', (req, res) => {
  const tokenWithExt = req.params.tokenWithExt;
  const token = path.parse(tokenWithExt).name;
  const tokenData = tokens[token];

  if (!tokenData) return res.status(403).send('Token inválido o expirado');

  const folder = tokenData.type === 'audio' ? 'audios' : 'videos';
  const filePath = path.join(__dirname, folder, tokenData.file);

  const ext = path.extname(tokenData.file).toLowerCase();
  if (ext === '.mp4') res.type('video/mp4');
  else if (ext === '.m4a') res.type('audio/m4a');

  res.sendFile(filePath);
});

app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
