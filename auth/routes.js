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

module.exports = router;
