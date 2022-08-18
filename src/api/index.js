const {Router} = require("express");

const weekdayRouter = require('./WeekdayRouter')

const api = Router()

api.use('/weekday', weekdayRouter)

module.exports = api
