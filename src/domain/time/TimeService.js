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

  /**
  * getWeekday returns the name of the day in the week for a specified date
  * @param {string} date
  * @return {string} day name - e.g. Tuesday
  */
  validateIsoDate(date) {
    if(!IsoDate.isValidIsoDateFormat(date)) {
      throw new Error('INVALID_ISO_DATE_FORMAT') // todo centralize errors
    }
  }
}

module.exports = TimeService
