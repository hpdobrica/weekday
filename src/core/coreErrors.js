
class AbstractClassInstantiationError extends Error {
  constructor() {
    super()
    this.name = 'core:ABSTRACT_CLASS_INSTANTIATION_ERROR' 
    this.statusCode = 500
    this.message = 'You cannot instantiate an abstract class, please extend it first!'
  }
}

class AbstractMethodInvocationError extends Error {
  constructor() {
    super()
    this.name = 'core:ABSTRACT_METHOD_INVOCATION_ERROR' 
    this.statusCode = 500
    this.message = 'You cannot invoke an abstract method, please override it first!'
  }
}

module.exports = {
  AbstractMethodInvocationError,
  AbstractClassInstantiationError
}
