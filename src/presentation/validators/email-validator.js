const { InvalidParamError } = require('../errors/invalid-param-error');

class EmailValidator {
  #fieldName;
  #emailValidator;
  constructor(fieldName, emailValidator) {
    this.#fieldName = fieldName;
    this.#emailValidator = emailValidator;
  }

  validate(obj) {
    const isValid = this.#emailValidator.isValid(obj[this.#fieldName]);
    if (!isValid) {
      return new InvalidParamError(this.#fieldName);
    }
  }
}

module.exports = EmailValidator;
