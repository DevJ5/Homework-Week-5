const { Router } = require('express');
const { toJWT } = require('./jwt');

const router = new Router();

router.post('/tokens', (req, res, next) => {
  const { email, password, password_confirmation } = req.body;
  if (email && password === password_confirmation) {
    res.send(toJWT({ userId: 1, something: 'yup' }));
  }
});

module.exports = router;
