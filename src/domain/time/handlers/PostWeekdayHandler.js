const express = require('express')
const Joi = require('joi').extend(require('@joi/date'));
const BaseHandler = require('../../../core/http/BaseHandler')
const RequestValidator = require('../../../core/http/RequestValidator')
const TimeService = require('../TimeService')


// logic for validating the POST /weekday api input
const validationSchema = {
  body: Joi.object().keys({
    date: Joi.date().format('YYYY-MM-DD').required(),
  }),
}

// logic for handling the POST /weekday api
// this class is the final http boundary, express details shouldn't be passed any further - pure business logic ahead
class PostWeekdayHandler extends BaseHandler {
  timeService

  /**
  * @param {TimeService} timeService
  * @param {map[string]loggers.Logger} loggers
  * @constructor
  */
  constructor(timeService, loggers) {
    const validator = new RequestValidator(validationSchema)
    super(loggers, validator)
    this.timeService = timeService
  }


  /**
  * main request processing happens here
  * @param {express.Request} req
  * @param {express.Response} res
  * @protected
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
