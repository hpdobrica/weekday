

module.exports = {
  attachTraceId: (req, res, next) => {
    req.traceId = req.apiGateway.context.awsRequestId 
    next()
  },

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

  failsafeErrorHandler: (requestLogger) => (error, req, res, next) => {
    requestLogger.error("Failsafe error handler caught an exception", error)

    res.status(500).send(error)
  }
}
