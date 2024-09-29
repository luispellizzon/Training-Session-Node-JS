const express = require('express');
const path = require('path');
const app = express();
const contentRouter = require('../routes/htmlRoutes');

app.set('views', 'view');
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '../../view')));
app.use('/', contentRouter);

module.exports = app;
