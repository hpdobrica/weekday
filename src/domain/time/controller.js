const TimeService = require('./TimeService')
const PostWeekdayHandler = require('./handlers/PostWeekdayHandler')


const timeService = new TimeService()

module.exports = {
  postWeekdayHandler: new PostWeekdayHandler(timeService),
}


