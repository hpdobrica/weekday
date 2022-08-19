

module.exports = {

  /**
  * extract traceid to a provider-agnostic location to decouple it from api gateway
  * @param {express.Request} req
  * @param {express.Response} res
  * @param {Function} next
  */
  attachTraceId: (req, res, next) => {
    req.traceId = req.apiGateway.context.awsRequestId 
    next()
  },

  /**
  * log request details, would need to be sanitized in the future - dropping body alltogether might be a good idea 
  * @param {Logger} requestLogger
  * @returns {(express.Request, express.Response, Function) => void}
  */
  logRequest: (requestLogger) => (req, res, next) => {
    requestLogger.info("Request", {
      traceId: req.traceId,
      path: req.path,
      params: req.params,
      query: req.query,
      method: req.method,
      body: req.body
    })
    next()
  },

  /**
  * middleware that triggers if request matched no path 
  * @param {Logger} requestLogger
  * @returns {(express.Request, express.Response, Function) => void}
  */
  invalidPath: (requestLogger) => (req, res, next) => {
    const statusCode = 404
    requestLogger.info("Invalid Path", {
      path: req.path,
      method: req.method,
      statusCode,
    })
    return res.status(statusCode).json({
      error: "Not Found"
    })
  },

  /**
  * middleware that should never trigger since all errors should be handled upstream
  * it's here as a failsafe so users still get a proper response if that happens
  * @param {Logger} requestLogger
  * @returns {(Error, express.Request, express.Response, Function) => void}
  */
  failsafeErrorHandler: (requestLogger) => (error, req, res, next) => {
    requestLogger.error("Failsafe error handler caught an exception", error)

    res.status(500).send(error)
  }
}
