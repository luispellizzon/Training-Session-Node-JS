const {InvalidParamError} = require("../errors")

class DateValidator{
    #paramName
    #dateParamValidator
  constructor (paramName, dateParamValidator) {
    this.#paramName = paramName
    this.#dateParamValidator = dateParamValidator
  }

  validate (params) {
    const isValid = this.#dateParamValidator.isValid(params[this.#paramName])
    if (!isValid) {
      return new InvalidParamError(this.#paramName)
    }
  }
}

module.exports = DateValidator