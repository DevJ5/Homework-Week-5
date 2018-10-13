const { Router } = require('express');
const Song = require('./model');

const router = new Router();

// Lets build some routers with status codes and error handling.

router.get('/songs', (req, res, next) => {
  console.log('playlists requested');
  Song.findAll().then(song => res.send(song));
});

module.exports = router;
