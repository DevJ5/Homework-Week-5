const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const Sequelize = require('sequelize');
const connectionString =
  process.env.DATABASE_URL ||
  'postgres://postgres:secret@localhost:5432/homework';
const sequelize = new Sequelize(connectionString, {
  define: { timestamps: false }
});

const Playlist = sequelize.define(
  'playlists',
  {
    name: {
      type: Sequelize.STRING,
      field: 'name',
      allowNull: false
    }
  },
  {
    timestamps: false,
    tableName: 'playlists'
  }
);

sequelize
  .sync()
  .then(() => {
    console.log('Sequelize updated database schema');
  })
  .catch(console.error);

const port = process.env.PORT || 4003;

app.get('/', (request, response) => {
  console.log(`I'll do something, I promise!`);
  response.send('there is something');
});

app.get('/playlists', (req, res, next) => {
  Playlist.findAll().then(playlist => res.send(playlist));
});

app.listen(port, () => console.log(`Express API listening on port ${port}`));
