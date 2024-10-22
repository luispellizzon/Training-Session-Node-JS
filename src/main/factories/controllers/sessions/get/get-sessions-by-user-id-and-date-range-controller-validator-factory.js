const {
  RequiredFieldValidator,
  ValidatorComposite,
  DateValidator,
} = require('../../../../../presentation/validators');
const DateValidatorAdapter = require('../../../../../infra/validators/date-validator-adapter');

const getSessionsByUserIdAndDateRangeControllerValidatorFactory = () => {
  const validators = [];
  const requiredFields = ['from', 'to'];

  for (const requiredField of requiredFields) {
    validators.push(new RequiredFieldValidator(requiredField));
    validators.push(new DateValidator(requiredField, new DateValidatorAdapter()));
  }

  return new ValidatorComposite(validators);
};

module.exports = getSessionsByUserIdAndDateRangeControllerValidatorFactory;
