const { RequiredFieldValidator, DateValidator, ArrayValidator, ValidatorComposite } = require("../../../../../presentation/validators")
const DateValidatorAdapter = require("../../../../../infra/validators/date-validator-adapter")
const createSessionControllerValidatorFactory = () => {
    const validators = []
    const requiredFields = ["bookingDate", "facilities"]

    for (const requiredField of requiredFields) {
        validators.push(new RequiredFieldValidator(requiredField))
    }

    validators.push(new DateValidator("bookingDate", new DateValidatorAdapter()))
    validators.push(new ArrayValidator("facilities"))
        
    return new ValidatorComposite(validators)
}

module.exports = createSessionControllerValidatorFactory