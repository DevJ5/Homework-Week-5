const { Router } = require('express');
const { toJWT, toData } = require('./jwt');
const User = require('../users/model');

const router = new Router();

router.post('/tokens', (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({
    where: { email }
  }).then(entity => {
    if (!entity)
      return res
        .status(400)
        .send({ message: 'Please provide a valid email/password' });
    if (entity.password === password)
      return res.send({ jwt: toJWT({ userId: entity.id }) });
    res
      .status(400)
      .send({ message: 'Please supply a valid email and password' });
  });
});

router.get('/secret-endpoint', (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(' ');
  if (auth && auth[0] === 'Bearer' && auth[1]) {
    try {
      const data = toData(auth[1]);
      res.send({
        message: 'Welcome visitor',
        data
      });
    } catch (error) {
      res.status(400).send({
        message: `Error ${error.name}: ${error.message}`
      });
    }
  } else {
    res.status(401).send({
      message: 'Please supply valid credentials'
    });
  }
});

module.exports = router;
