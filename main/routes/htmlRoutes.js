const express = require('express');
const contentRouter = express.Router();

contentRouter.get('/', (req, res) => {
  res.render('pages/index');
});

module.exports = contentRouter;
