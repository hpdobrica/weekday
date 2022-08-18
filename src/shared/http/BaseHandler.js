const express = require("express");

/**
* BaseHandler is an abstract class created to allow you to easily implement handlers for various use cases
* @abstract
*/
class BaseHandler {
  constructor() {
    // abstract enforcement
    if (this.constructor === BaseHandler) {
      throw new Error("Abstract class BaseHandler should not be instantiated directly!");
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
  async _executeImpl(req, res) {
    throw new Error("Abstract method _executeImpl needs to be overriden!")
  }

  /**
  * execute runs the logic of _executeImpl
  * @param {express.Request} req
  * @param {express.Response} res
  */
  async execute(req, res) {
    try {
      this._executeImpl(req, res)
    } catch(err) {
      console.log('BaseHandler error', err)
      this.fail(res, err)
    }
  }


  /**
  * ok returns a successful response to a request
  * @param {express.Response} res
  * @param {object} [dto=undefined]
  */
  ok(res, dto = undefined) {
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
  fail(res, error) {
    console.log(error) // todo add logger
    return res.status(500).json({
      message: error.toString()
    })
  }
}

module.exports = BaseHandler