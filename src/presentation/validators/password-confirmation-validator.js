const { InvalidParamError } = require('../errors');

class PasswordConfirmationValidator {
  #fieldName;
  constructor(fieldName) {
    this.#fieldName = fieldName;
  }

  validate(obj) {
    if (obj.password !== obj[this.#fieldName]) {
      return new InvalidParamError(this.#fieldName);
    }
  }
}

module.exports = PasswordConfirmationValidator;
