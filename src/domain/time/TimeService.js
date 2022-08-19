const IsoDate = require('./IsoDate')

class TimeService {
  /**
  * getWeekday returns the name of the day in the week for a specified date
  * @param {string} date
  * @return {string} day name - e.g. Tuesday
  */
  getWeekday(date) {
    const isoDate = new IsoDate(date)
    return isoDate.getWeekday()
  }

}

module.exports = TimeService
