const { MissingParamError } = require("../errors")

class RequiredFieldValidator{
  #requiredField;
  constructor (requiredField) {
    this.#requiredField = requiredField
  }

  validate (input) {
    if (!input[this.#requiredField]?.toString().trim()) {
      return new MissingParamError(this.#requiredField)
    }
    return null
  }
}

module.exports = RequiredFieldValidator