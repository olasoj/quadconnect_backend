const express = require('express');
const user = require('../routes/users');
const auth = require('../routes/auth');

const error = require('../middleware/error');

module.exports = function(app) {
  app.use(express.json());
  app.use('/api/users', user);
  app.use('/api/auth', auth);

  app.use(error);
};
