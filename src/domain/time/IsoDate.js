const Joi = require('joi');
const domainErrors = require('./domainErrors')

// abstraction around js Date object 
// if date provider is later changed to, say Moment.js, we'd only have to adapt this class
// without affecting the rest of the application
class IsoDate {
  #dateObj
  constructor(isoString) {
    // ensure passed string is valid
    if(!IsoDate.isValidIsoDateFormat(isoString)) {
      throw new domainErrors.IsoDateFormatError(isoString)
    }
    // property kept private to avoid modification - this way we don't have to validate the object after the constructor call
    // replacing - with / before creating date object to avoid timezone issues
    this.#dateObj = new Date(isoString.replace('-', '/'))
  }

  /**
  * getWeekday returns the name of the day in the week for a specified date
  * @param {string} [locale='en-US']
  * @return {string} day name - e.g. Tuesday
  */
  getWeekday(locale = 'en-US') {
    // avoids hardcoding [Sunday, Monday, Tuesday...] and allows for flexible locale
    return Intl.DateTimeFormat(locale, {weekday:'long'}).format(this.#dateObj)
  }

  /**
  * returns true if iso string is valid date by ISO 8601 standard
  * @param {string} [locale='en-US']
  * @return {boolean} true if valid, false otherwise
  */
  static isValidIsoDateFormat(isoString) {
    const schema = Joi.date().iso()
    const {error} = schema.validate(isoString)

    return !error
  }

}

module.exports = IsoDate
