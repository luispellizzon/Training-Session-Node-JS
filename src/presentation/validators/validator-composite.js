class ValidatorComposite {
  #validators = [];
  constructor(validators) {
    this.#validators = validators;
  }

  validate(obj) {
    for (const validator of this.#validators) {
      const isError = validator.validate(obj);
      if (isError) return isError;
    }
  }
}

module.exports = ValidatorComposite;
