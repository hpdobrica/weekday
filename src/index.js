const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const api = require('./api')

app.use(bodyParser.json())

app.use(api)

app.use((req, res, next) => {
  console.log('about to 404')
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
