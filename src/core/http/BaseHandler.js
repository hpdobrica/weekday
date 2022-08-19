const express = require("express");
const RequestValidator = require('./RequestValidator')
const coreErrors = require('../coreErrors')
const loggers = require('../loggers')

/**
* BaseHandler is an abstract class created to allow you to easily implement handlers for various use cases
* @abstract
*/
class BaseHandler {

  validator
  loggers

  /**
  * @param {map[string]loggers.Logger} [loggers]
  * @param {RequestValidator} [validator]
  */
  constructor(loggers, validator=undefined) {
    this.loggers = loggers
    this.validator = validator

    // abstract enforcement
    if (this.constructor === BaseHandler) {
      throw new coreErrors.AbstractClassInstantiationError()
    }
  }


  /**
  * _executeImpl is where the functionality of the handler should be implemented
  * override this method to add your own functionality
  * @param {express.Request} req
  * @param {express.Response} res
  * @protected
  * @abstract
  */
  _executeImpl = async (req, res) => {
    throw new coreErrors.AbstractMethodInvocationError()
  }

  /**
  * execute runs the logic of _executeImpl
  * @param {express.Request} req
  * @param {express.Response} res
  */
  execute = async (req, res) => {
    try {
      await this._executeImpl(req, res)
    } catch(err) {
      this.fail(res, req.traceId, err)
    }
  }

  /**
  * validate checks the request object for validity against defined schema
  * if no validator is defined, it just calls next
  * @param {express.Request} req
  * @param {express.Response} res
  * @param {Function} next
  */
  validate = (req, res, next) => {
    if(this.validator) {
      try {
        this.validator.validate(req)
        return next()
      } catch(err) {
        this.fail(res, req.traceId, err)
      }
    } else {
      return next()
    }
  }


  /**
  * ok returns a successful response to a request
  * @param {express.Response} res
  * @param {string} traceId
  * @param {object} [data=undefined]
  */
  ok = (res, traceId, data = undefined) => {
    const statusCode = 200
    if(!!data) {
      res.type('application/json')
      this.logResponse('info', traceId, statusCode, data)
      return res.status(200).json(data)
    } else {
      this.logResponse('info', traceId, statusCode)
      return res.sendStatus(200)
    }
  }

  /**
  * fail responds to a request with an error
  * @param {Express.Response} res
  * @param {string} traceId
  * @param {Error|string} error
  */
  fail = (res, traceId, error) => {
    const statusCode = error.statusCode || 500
    const data = {
      message: error.toString()
    }
    this.logResponse('error', traceId, statusCode, data)
    return res.status(statusCode).json(data)
  }

  /**
  * logs the response for a request
  * @param {Express.Response} res
  * @param {string} traceId
  * @param {Error|string} error
  */
  logResponse = (level, traceId, statusCode, data = {}) => {
    this.loggers.request[level]("Response", {
      statusCode,
      data,
      traceId
    })
  }
}

module.exports = BaseHandler
