class IsoDateFormatError extends Error {
  constructor(value) {
    super()
    this.name = 'domain:time:INVALID_ISO_DATE_FORMAT' 
    this.statusCode = 500
    this.message = `Invalid ISO date format, got ${value}. See https://tc39.es/ecma262/#sec-date-time-string-format`
  }
}

module.exports = {
  IsoDateFormatError
}
