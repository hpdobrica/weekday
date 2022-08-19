class ValidationError extends Error {
  constructor(details) {
    super()
    this.name = 'core:http:VALIDATION_ERROR' 
    this.statusCode = 400
    this.message = details || 'Something went wrong while validating your request.'
  }
}

module.exports = {
  ValidationError
}
