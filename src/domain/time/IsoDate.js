
// Sunday needs to be first day as per https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

class IsoDate {
  #dateObj
  constructor(isoString) {
    if(!IsoDate.isValidIsoDateFormat(isoString)) {
      throw new Error('INVALID_ISO_DATE_FORMAT')
    }
    this.#dateObj = new Date(isoString)
  }

  getWeekday() {
    return DAY_NAMES[this.#dateObj.getDay()]
  }

  static isValidIsoDateFormat(isoString) {
    const pattern = /\d\d\d\d-\d\d-\d\d/

    // check if format is yyyy-mm-dd, but allow any-number-of-digits for year
    if(!pattern.test(isoString)) {
      return false
    }

    const parsedDate = Date.parse(isoString)

    // confirm that provided date is actually valid date, to avoid 2022/12/32
    if(isNaN(parsedDate)) {
      return false
    }

    return true
  }

}

module.exports = IsoDate
