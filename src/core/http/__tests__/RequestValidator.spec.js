const Joi = require('joi')
const RequestValidator = require('../RequestValidator')
const httpErrors = require('../../http/httpErrors')
 

const joiSchemas = {
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
  params: Joi.object().keys({
    age: Joi.number().required(),
  }),
  query: Joi.object().keys({
    city: Joi.string().required(),
  }),
}


test('confirms valid body', () => {
  const validator = new RequestValidator(joiSchemas)

  const fakeReq = {
    body: {
      name: "jane doe"
    }
  }

  let errorObj
  try {
    validator.validate(fakeReq)
  } catch(err) {
    errorObj = err
  }
  expect(errorObj).toBe(undefined)
})

test('rejects invalid body', () => {
  const validator = new RequestValidator(joiSchemas)

  const fakeReq = {
    body: {
      frame: 1
    }
  }

  let errorObj
  try {
    validator.validate(fakeReq)
  } catch(err) {
    errorObj = err
  }
  expect(errorObj.name).toBe(new httpErrors.ValidationError().name)
})

test('confirms full valid request', () => {
  const validator = new RequestValidator(joiSchemas)

  const fakeReq = {
    body: {
      name: "jane doe"
    },
    params: {
      age: 23
    },
    query: {
      city: "Vancouver"
    }
  }

  let errorObj
  try {
    validator.validate(fakeReq)
  } catch(err) {
    errorObj = err
  }
  expect(errorObj).toBe(undefined)
})

test('fails if query is missing required param', () => {
  const validator = new RequestValidator(joiSchemas)

  const fakeReq = {
    body: {
      name: "jane doe"
    },
    params: {
      age: 23
    },
    query: {}
  }

  let errorObj
  try {
    validator.validate(fakeReq)
  } catch(err) {
    errorObj = err
  }

  expect(errorObj.name).toBe(new httpErrors.ValidationError().name)
})
