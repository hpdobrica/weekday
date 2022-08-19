const {Router} = require("express");

const timeController = require('../../domain/time/controller')

const WeekdayRouter = Router()

WeekdayRouter.post('/',timeController.postWeekdayHandler.validate, timeController.postWeekdayHandler.execute)

module.exports = WeekdayRouter
