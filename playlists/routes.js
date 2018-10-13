const { Router } = require('express');
const Playlist = require('./model');
const User = require('../users/model');
const Song = require('../songs/model');

const router = new Router();

router.get('/playlists', (req, res, next) => {
  Playlist.findAll({
    where: {
      userId: req.user.id
    }
  })
    .then(playlists => res.send({ playlists }))
    .catch(error => next(error));
});

router.get('/playlists/:id', (req, res, next) => {
  Playlist.findById(req.params.id, {
    where: {
      userId: req.user.id
    }
  })
    .then(playlist => {
      if (playlist) {
        return Song.findAll({
          where: {
            playlistId: playlist.id
          }
        }).then(songs => {
          res.send({ playlist, songs });
        });
      }
      return res.status(404).send({ message: 'Playlist not found' });
    })
    .catch(error => next(error));
});

router.post('/playlists', (req, res, next) => {
  const { name } = req.body;
  const userId = req.user.id;
  Playlist.create({
    name,
    userId
  })
    .then(playlist => {
      if (playlist)
        return res.status(201).send(`Created new playlist: ${name}`);
      res.status(404).send({ message: 'Playlist not found' });
    })
    .catch(error => next(error));
});

router.delete('/playlists/:id', (req, res, next) => {
  Playlist.findById(req.params.id, {
    where: {
      userId: req.user.id
    }
  })
    .then(playlist => {
      if (playlist && playlist.userId === req.user.id) {
        return playlist
          .destroy()
          .then(() => res.send({ message: 'Playlist deleted' }));
      }
      res.status(404).send({ message: 'Playlist not found' });
    })
    .catch(error => next(error));
});

module.exports = router;
