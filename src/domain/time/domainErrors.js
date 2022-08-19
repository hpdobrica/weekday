class IsoDateFormatError extends Error {
  constructor(value) {
    super()
    this.name = 'domain:time:INVALID_ISO_DATE_FORMAT' 
    this.statusCode = 500
    this.message = `Invalid ISO date format, want 'YYYY-MM-DD', got ${value}`
  }
}

module.exports = {
  IsoDateFormatError
}
