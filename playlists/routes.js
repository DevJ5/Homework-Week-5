const { Router } = require('express');
const Playlist = require('./model');

const router = new Router();

router.get('/playlists', (req, res, next) => {
  console.log('playlists requested');
  Playlist.findAll().then(playlist => res.send(playlist));
});

module.exports = router;
