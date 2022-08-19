const serverless = require("serverless-http");
const express = require("express");
const helmet = require("helmet");

const middleware = require('./server/middleware')
const api = require('./server/api')
const loggers = require('./core/loggers');

const app = express();

// request pre-processing
app.use(express.json())
app.use(helmet())
app.use(middleware.attachTraceId)

// request logging
app.use(middleware.logRequest(loggers.request))

// request processing
app.use(api)

// catch-all for unhandled routes and errors
app.use(middleware.invalidPath(loggers.request))
app.use(middleware.failsafeErrorHandler(loggers.request))

module.exports.handler = serverless(app);
