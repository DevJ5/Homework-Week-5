const { Router } = require('express');
const Song = require('./model');
const Playlist = require('../playlists/model');
const router = new Router();

router.post('/playlists/:id/songs', (req, res, next) => {
  Playlist.findById(req.params.id)
    .then(playlist => {
      if (playlist && playlist.userId === req.user.id) {
        const { title, artist, album } = req.body;
        const playlistId = req.params.id;

        if (title && artist && album) {
          return Song.create({
            title,
            artist,
            album,
            playlistId
          })
            .then(song => {
              if (song)
                return res
                  .status(201)
                  .send({ message: 'Song added to playlist' });
            })
            .catch(error => next(error));
        }
        res.status(400).send({ message: 'Enter a valid title/artist/album' });
      } else res.status(404).send({ message: 'Playlist not found' });
    })
    .catch(error => next(error));
});

module.exports = router;
