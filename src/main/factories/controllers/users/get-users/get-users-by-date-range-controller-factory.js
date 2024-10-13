const {
  RequiredFieldValidator,
  DateValidator,
  ValidatorComposite,
} = require('../../../../../presentation/validators/index');
const DateValidatorAdapter = require('../../../../../infra/validators/date-validator-adapter');
const UsersMongoRepository = require('../../../../../infra/db/mongodb/account/users-repository');
const DbLoadUsersByDateRange = require('../../../../../data/use-cases/users/db-load-users-by-date-range');
const GetUsersByDateRangeController = require('../../../../../presentation/controllers/users/get-users-by-date-range-controller');

const getUsersByDateRangeControllerFactory = () => {
  const validations = [];
  const requiredFields = ['startDate', 'endDate'];

  for (const field of requiredFields) {
    validations.push(new RequiredFieldValidator(field));
    validations.push(new DateValidator(field, new DateValidatorAdapter()));
  }

  const validator = new ValidatorComposite(validations);
  const loadUsersByDateRangeRepository = new UsersMongoRepository();
  const loadUsersByDateRange = new DbLoadUsersByDateRange(loadUsersByDateRangeRepository);
  return new GetUsersByDateRangeController(validator, loadUsersByDateRange);
};

module.exports = getUsersByDateRangeControllerFactory;
