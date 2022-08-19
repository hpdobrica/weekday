const serverless = require("serverless-http");
const express = require("express");
const helmet = require("helmet");
const app = express();

const middleware = require('./server/middleware')
const api = require('./server/api')
const loggers = require('./core/loggers');

app.use(express.json())
app.use(helmet())


app.use(middleware.attachTraceId)
app.use(middleware.logRequest(loggers.request))

app.use(api)

app.use(middleware.invalidPath(loggers.request))
app.use(middleware.failsafeErrorHandler(loggers.request))

module.exports.handler = serverless(app);
