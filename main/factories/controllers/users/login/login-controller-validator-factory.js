const EmailValidatorAdapter = require("../../../../../infra/validators/email-validator-adapter")
const {RequiredFieldValidator, EmailValidator, ValidatorComposite} = require("../../../../../presentation/validators")

const loginControllerFactory = () => {
    const validators = []
    const requiredFields = ["email", "password"]

    for (const requiredField of requiredFields) {
        validators.push(new RequiredFieldValidator(requiredField))
    }
        
    validators.push(new EmailValidator("email", new EmailValidatorAdapter()))
    return new ValidatorComposite(validators)
}

module.exports = loginControllerFactory