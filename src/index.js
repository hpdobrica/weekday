const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const api = require('./api')

app.use(bodyParser.json())

app.use(api)

app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});


app.use((error, req, res, next) => {
  console.log('Failsafe error handler triggered!')
  res.status(500).send(error)
})

module.exports.handler = serverless(app);
