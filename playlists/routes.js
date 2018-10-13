const { Router } = require('express');
const Playlist = require('./model');

const router = new Router();

// Lets build some routers with status codes and error handling.

router.get('/playlists', (req, res, next) => {
  console.log('playlists requested');
  Playlist.findAll().then(playlist => res.send(playlist));
});

module.exports = router;
