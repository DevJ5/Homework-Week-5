const { Router } = require('express');
const User = require('./model');

const router = new Router();

// Improve by checking if user is already present -> error username already exists

router.post('/users', (req, res, next) => {
  const { email, password, password_confirmation } = req.body;
  if (email && password === password_confirmation) {
    User.create({ email, password });
    res.status(201).send('New user created');
  }
  res.status(401).send({ message: 'Passwords must match' });
});

module.exports = router;
