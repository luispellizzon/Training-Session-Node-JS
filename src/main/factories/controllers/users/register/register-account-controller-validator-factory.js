const EmailValidatorAdapter = require('../../../../../infra/validators/email-validator-adapter');
const {
  RequiredFieldValidator,
  EmailValidator,
  PasswordConfirmationValidator,
  ValidatorComposite,
} = require('../../../../../presentation/validators');

const registerAccountValidatorFactory = () => {
  const validators = [];
  const requiredFields = [
    'username',
    'email',
    'password',
    'passwordConfirmation',
  ];

  for (const requiredField of requiredFields) {
    validators.push(new RequiredFieldValidator(requiredField));
  }

  validators.push(new PasswordConfirmationValidator('passwordConfirmation'));

  validators.push(new EmailValidator('email', new EmailValidatorAdapter()));
  const validator = new ValidatorComposite(validators);
  return validator;
};

module.exports = registerAccountValidatorFactory;
