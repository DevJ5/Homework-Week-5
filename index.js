const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const playlistsRouter = require('./playlists/routes');
const songsRouter = require('./songs/routes');
const authRouter = require('./auth/routes');
const usersRouter = require('./users/routes');
const authMiddleware = require('./auth/middleware');

const port = process.env.PORT || 4003;

app.use(bodyParser.json());
app.use(usersRouter);
app.use(authRouter);
app.use(authMiddleware);
app.use(playlistsRouter);
app.use(songsRouter);

app.listen(port, () => console.log(`Express API listening on port ${port}`));
