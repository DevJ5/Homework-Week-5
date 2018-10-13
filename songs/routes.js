const { Router } = require('express');
const Song = require('./model');
const Playlist = require('../playlists/model');
const router = new Router();

router.post('/playlists/:id/songs', (req, res, next) => {
  const { title, artist, album } = req.body;
  const playlistId = req.params.id;
  if (!title || !artist || !album) {
    return res
      .status(404)
      .send({ message: 'Enter a valid title/artist/album' });
  }
  Song.create({
    title,
    artist,
    album,
    playlistId
  })
    .then(song => {
      if (song)
        return res.status(201).send({ message: 'Song added to playlist' });
    })
    .catch(error => next(error));
});

module.exports = router;
