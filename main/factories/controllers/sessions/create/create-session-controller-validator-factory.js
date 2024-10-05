const { RequiredFieldValidator, ValidatorComposite } = require("../../../../../presentation/validators")

const createSessionControllerValidatorFactory = () => {
    const validators = []
    const requiredFields = ["bookingDate", "facilities"]

    for (const requiredField of requiredFields) {
        validators.push(new RequiredFieldValidator(requiredField))
    }
        
    return new ValidatorComposite(validators)
}

module.exports = createSessionControllerValidatorFactory