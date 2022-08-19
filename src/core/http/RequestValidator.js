const express = require('express')
const Joi = require('joi')
const httpErrors = require('./httpErrors')

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
  * takes an express request and validates it based on provided schemas (this.joiSchemas)
  * throws an error if request object is not compliant
  * @param {express.Request} req
  */
  validate = (req) => {
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
        throw new httpErrors.ValidationError(errors.filter(err => err !== null))
      } else{
        continue
      }
    }
  }
}

module.exports = RequestValidator

