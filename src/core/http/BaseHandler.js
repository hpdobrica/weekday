const express = require("express");
const RequestValidator = require('./RequestValidator')
const coreErrors = require('../coreErrors')

/**
* BaseHandler is an abstract class created to allow you to easily implement handlers for various use cases
* @abstract
*/
class BaseHandler {

  validator

  /**
  * @param {RequestValidator} [validator]
  */
  constructor(validator=undefined) {
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
      this.fail(res, err)
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
        this.fail(res, err)
      }
    } else {
      return next()
    }
  }


  /**
  * ok returns a successful response to a request
  * @param {express.Response} res
  * @param {object} [dto=undefined]
  */
  ok = (res, dto = undefined) => {
    if(!!dto) {
      res.type('application/json')
      return res.status(200).json(dto)
    } else {
      return res.sendStatus(200)
    }
  }

  /**
  * fail responds to a request with an error
  * @param {Express.Response} res
  * @param {Error|string} error
  */
  fail = (res, error) => {
    console.log(error) // todo add logger
    return res.status(error.statusCode || 500).json({
      message: error.toString()
    })
  }
}

module.exports = BaseHandler
