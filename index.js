const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const playlistsRouter = require('./playlists/routes');

const port = process.env.PORT || 4003;

app.get('/', (request, response) => {
  console.log(`I'll do something, I promise!`);
  response.send('there is something');
});

app.use(bodyParser.json());
app.use(playlistsRouter);

app.listen(port, () => console.log(`Express API listening on port ${port}`));
