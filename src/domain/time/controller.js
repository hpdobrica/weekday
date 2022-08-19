const loggers = require('../../core/loggers')
const TimeService = require('./TimeService')
const PostWeekdayHandler = require('./handlers/PostWeekdayHandler')


const timeService = new TimeService()

// create handlers here and inject their dependencies
// controller in this sense is just a collection of handlers that can be passed to express
module.exports = {
  postWeekdayHandler: new PostWeekdayHandler(timeService, loggers),
}


