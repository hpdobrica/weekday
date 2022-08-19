const express = require('express')
const Joi = require('joi').extend(require('@joi/date'));
const BaseHandler = require('../../../core/http/BaseHandler')
const RequestValidator = require('../../../core/http/RequestValidator')
const TimeService = require('../TimeService')


const validationSchema = {
  body: Joi.object().keys({
    date: Joi.date().format('YYYY-MM-DD').required(),
  }),
}


class PostWeekdayHandler extends BaseHandler {
  timeService


  /**
  * @param {TimeService} timeService
  * @constructor
  */
  constructor(timeService, loggers) {
    const validator = new RequestValidator(validationSchema)
    super(loggers, validator)
    this.timeService = timeService
  }


  /**
  * @param {express.Request} req
  * @param {express.Response} res
  * @protected
  * @abstract
  */
  _executeImpl = async (req, res) => {
    try {
      const weekday = this.timeService.getWeekday(req.body.date)
      this.ok(res, req.traceId, {day: weekday})
    } catch(err) {
      this.fail(res, req.traceId, err)
    }

  }

}

module.exports = PostWeekdayHandler
