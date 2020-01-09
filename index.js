const express = require('express');
const logger = require('./startup/logging');
const config = require('config');
const app = express();

require('./startup/config')();
require('./startup/db')();
require('./startup/cors')(app);
require('./startup/routes')(app);

const port = process.env.PORT || 4000;
console.log(port);
const server = app.listen(port, () => {
  `Listening on port ${port}...`;
});

module.exports = server;
