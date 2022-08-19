const Joi = require('joi');
const domainErrors = require('./domainErrors')

class IsoDate {
  #dateObj
  constructor(isoString) {
    if(!IsoDate.isValidIsoDateFormat(isoString)) {
      throw new domainErrors.IsoDateFormatError(isoString)
    }
    this.#dateObj = new Date(isoString)
  }

  getWeekday(locale = 'en-US') {
    // avoids hardcoding [Sunday, Monday, Tuesday...] and allows for flexible locale
    return Intl.DateTimeFormat(locale, {weekday:'long'}).format(this.#dateObj)
  }

  static isValidIsoDateFormat(isoString) {
    const schema = Joi.date().iso()
    const {error} = schema.validate(isoString)

    return !error
  }

}

module.exports = IsoDate
