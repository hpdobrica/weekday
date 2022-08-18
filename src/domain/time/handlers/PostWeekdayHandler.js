const express = require('express')
const BaseHandler = require('../../../shared/http/BaseHandler')
const TimeService = require('../TimeService')

class PostWeekdayHandler extends BaseHandler {
  timeService

  /**
  * @param {TimeService} timeService
  * @constructor
  */
  constructor(timeService) {
    super()
    this.timeService = timeService
  }


  /**
  * @param {express.Request} req
  * @param {express.Response} res
  * @protected
  * @abstract
  */
  _executeImpl(req, res) {
    try {
      this.timeService.validateIsoDate(req.body.date)
      const weekday = this.timeService.getWeekday(req.body.date)
      this.ok(res, {day: weekday})
    } catch(err) {
      this.fail(res, err)
    }

  }
}

module.exports = PostWeekdayHandler
