
const TimeService = require('../../TimeService');
const PostWeekdayHandler = require('../PostWeekdayHandler');
const httpErrors = require('../../../../core/http/httpErrors')
const domainErrors = require('../../domainErrors')
 
const timeService = new TimeService()
const loggers = {
  request: {
    info: jest.fn(),
    error: jest.fn()
  }
}


const fakeExpressCall = (body) => {
  
  const fakeReq = {
    body
  }
  const fakeRes = {}
  
  fakeRes.status = jest.fn().mockReturnValue(fakeRes)
  fakeRes.json = jest.fn().mockReturnValue(fakeRes)
  fakeRes.type = jest.fn().mockReturnValue(fakeRes)
  
  const fakeNext = jest.fn()

  return {req: fakeReq, res: fakeRes, next: fakeNext}
  
}

const handler = new PostWeekdayHandler(timeService, loggers)


test('validation passes for good date', () => {
  const {req,res,next} = fakeExpressCall({date: '2022-12-31'})

  handler.validate(req, res, next)
  expect(next.mock.calls.length).toBe(1)
});

test('validation fails for invalid date', () => {
  const {req,res,next} = fakeExpressCall({date: '2022-12-32'})

  handler.validate(req,res,next)
  
  expect(next.mock.calls.length).toBe(0)
  expect(res.status.mock.calls.length).toBe(1)
  expect(res.json.mock.calls.length).toBe(1)
  expect(res.json.mock.calls[0][0].message.startsWith(new httpErrors.ValidationError().name)).toBe(true)
  expect(res.status.mock.calls[0][0]).toBe(400)
});

test('validation fails for non-iso date', () => {
  const {req,res,next} = fakeExpressCall({date: '21/12/2022'})
  handler.validate(req, res, next)
  
  expect(next.mock.calls.length).toBe(0)
  expect(res.status.mock.calls.length).toBe(1)
  expect(res.json.mock.calls.length).toBe(1)
  expect(res.json.mock.calls[0][0].message.startsWith(new httpErrors.ValidationError().name)).toBe(true)
  expect(res.status.mock.calls[0][0]).toBe(400)
});


test('execution passes for good date', async () => {
  const {req,res} = fakeExpressCall({date: '2022-12-31'})

  await handler.execute(req, res)
  expect(res.status.mock.calls[0][0]).toBe(200)
  expect(res.json.mock.calls[0][0].day).toBe("Saturday")
});

test('execution fails for invalid date', async () => {
  const {req,res} = fakeExpressCall({date: '2022-12-32'})

  await handler.execute(req, res)
  expect(res.status.mock.calls[0][0]).toBe(500)
  expect(res.json.mock.calls[0][0].message.startsWith(new domainErrors.IsoDateFormatError().name)).toBe(true)
});

test('execution fails for non-iso date', async () => {
  const {req,res} = fakeExpressCall({date: '21/12/2022'})

  await handler.execute(req, res)
  expect(res.status.mock.calls[0][0]).toBe(500)
  expect(res.json.mock.calls[0][0].message.startsWith(new domainErrors.IsoDateFormatError().name)).toBe(true)
});
