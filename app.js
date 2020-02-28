var express = require('express');

var app = express();

/**
 * Application configs
 */
require("./config/index")(app);

/**
 * Application middlewares
 */
require("./middlewares/index")(app);

/**
 * Application Routes
 */
require("./routes/index")(app);

/**
 * Error Handlers
 */
require('./services/errorHandlers')(app);

module.exports = app;
