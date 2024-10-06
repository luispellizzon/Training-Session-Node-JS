const {InvalidParamError} = require("../errors")

class ArrayValidator{
    #fieldName
  constructor (fieldName) {
    this.#fieldName = fieldName
  }

  validate (params) {
    const isValid = Array.isArray(params[this.#fieldName])
    if (!isValid) {
      return new InvalidParamError(this.#fieldName)
    }
  }
}

module.exports = ArrayValidator