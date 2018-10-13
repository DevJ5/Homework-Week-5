const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const playlistsRouter = require('./playlists/routes');
const songsRouter = require('./songs/routes');
const authRouter = require('./auth/routes');
const usersRouter = require('./users/routes');

const port = process.env.PORT || 4003;

app.get('/', (request, response) => {
  console.log(`I'll do something, I promise!`);
  response.send('there is something');
});

app.use(bodyParser.json());
app.use(authRouter);
app.use(playlistsRouter);
app.use(songsRouter);
app.use(usersRouter);

app.listen(port, () => console.log(`Express API listening on port ${port}`));
