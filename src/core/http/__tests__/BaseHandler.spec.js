
const BaseHandler = require('../BaseHandler')
const coreErrors = require('../../coreErrors')
 
const loggers = {
  request: {
    info: jest.fn(),
    error: jest.fn()
  }
}

class FakeHandler extends BaseHandler{}


test('abstract class cant be instantiated', () => {
  try {
    new BaseHandler(loggers)
  } catch (err) {
    expect(err.name).toBe(new coreErrors.AbstractClassInstantiationError().name)
  }
});

test('abstract method cant be called without overriding', async () => {
  try {
    const fake = new FakeHandler(loggers)
    await fake._executeImpl()
  } catch (err) {
    expect(err.name).toBe(new coreErrors.AbstractMethodInvocationError().name)
  }

});


