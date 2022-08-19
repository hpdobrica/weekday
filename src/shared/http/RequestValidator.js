const express = require('express')
const Joi = require('joi')

class RequestValidator {
  joiSchemas


  /**
  * @param {Joi.SchemaMap} joiSchemas - object where keys are express request segments (e.g. body, query, params)
  * and values are Joi schemas for validating given parts of the request
  * 
  * @example
  * const joiSchemas = {
  *   body: Joi.object().keys({
  *     name: Joi.string().required(),
  *   }),
  *   params: Joi.object().keys({
  *     number: Joi.number().required(),
  *   }),
  *   query: Joi.object().keys({
  *     city: Joi.string().required(),
  *   }),
  * }
  */
  constructor(joiSchemas) {
    this.joiSchemas = joiSchemas
  }

  /**
  * 
  * @param {express.Request} req
  * @param {express.Response} res
  * @param {Function} res
  */
  validate = (req, res, next) => {
    for (const segmentName in this.joiSchemas) {
      const schema = this.joiSchemas[segmentName]
      const reqSegment = req[segmentName]
      if(reqSegment === undefined) {
        continue
      }

      const errors = []
      if(Array.isArray(schema)) {
         errors.push(...schema.map(s => s.validate(reqSegment).error))
      } else {
        errors.push(schema.validate(reqSegment).error)
      }

      if(errors.some(err => !!err)) {
        return res.status(400).json({
          error: "VALIDATION_ERROR",
          details: errors.filter(err => err !== null)
        })
      } else{
        continue
      }
    }
    next()
  }
}

module.exports = RequestValidator

