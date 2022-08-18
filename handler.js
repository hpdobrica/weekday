const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "Hello from root!",
  });
});


// Sunday needs to be first day as per https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

app.post("/weekday", (req, res, next) => {

  const dateInput = req.body.date

  const date = new Date(dateInput)

  return res.status(200).json({
    day: dayNames[date.getDay()]
  });
});


app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
