const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const api = require('./api')
const loggers = require('./core/loggers')

app.use(bodyParser.json())


app.use((req, res, next) => {
  req.traceId = req.apiGateway.context.awsRequestId 
  next()
})

app.use((req, res, next) => {
  loggers.request.info("Request", {
    traceId: req.traceId,
    path: req.path,
    params: req.params,
    query: req.query,
    method: req.method,
    body: req.body
  })
  next()
})

app.use(api)

app.use((req, res, next) => {
  const statusCode = 404
  loggers.request.info("Invalid Path", {
    path: req.path,
    method: req.method,
    statusCode,
  })
  return res.status(statusCode).json({
    error: "Not Found"
  })
})


app.use((error, req, res, next) => {
  loggers.request.error("Failsafe error handler caught an exception", error)
  res.status(500).send(error)
})

module.exports.handler = serverless(app);
