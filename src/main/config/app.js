const express = require('express');
const app = express();
const setMiddlewares = require('./middleware');
const setRoutes = require('./routes');

setMiddlewares(app);
setRoutes(app);

module.exports = app;
