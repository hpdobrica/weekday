const {Router} = require("express");

const timeController = require('../domain/time/controller')

const WeekdayRouter = Router()

WeekdayRouter.post('/', (req, res) => timeController.postWeekdayHandler.execute(req, res))

module.exports = WeekdayRouter
