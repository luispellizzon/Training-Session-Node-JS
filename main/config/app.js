const express = require('express');
const app = express();
const setStaticFiles = require("./staticFiles")
const setViewEngine = require("./viewEngine")
const setMiddlewares = require("./middleware")
const setRoutes = require("./routes")

setStaticFiles(app)
setViewEngine(app)
setMiddlewares(app)
setRoutes(app)

module.exports = app;
