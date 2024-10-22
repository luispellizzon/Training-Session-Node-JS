const UsersMongoRepository = require('../../../../../infra/db/mongodb/account/users-repository');
const DbLoadUserById = require('../../../../../data/use-cases/users/db-load-user-by-id');
const DbLoadSessionByUserIdAndDateRange = require('../../../../../data/use-cases/sessions/db-load-sessions-by-user-id-and-date-range');
const GetSessionsByUserIdAndDateRangeController = require('../../../../../presentation/controllers/sessions/get-sessions-by-user-id-and-date-range-controller');
const getSessionsByUserIdAndDateRangeControllerValidatorFactory = require('./get-sessions-by-user-id-and-date-range-controller-validator-factory');
const SessionsRepository = require('../../../../../infra/db/mongodb/sessions/sessions-repository');

const getSessionsByUserIdAndDateRangeControllerFactory = () => {
  const loadUserByIdRepository = new UsersMongoRepository();
  const loadUserById = new DbLoadUserById(loadUserByIdRepository);
  const loadSessionsByDateRange = new SessionsRepository();
  const loadSessionsByUserId = new DbLoadSessionByUserIdAndDateRange(loadSessionsByDateRange);
  const validator = getSessionsByUserIdAndDateRangeControllerValidatorFactory();
  const controller = new GetSessionsByUserIdAndDateRangeController(
    validator,
    loadUserById,
    loadSessionsByUserId
  );
  return controller;
};

module.exports = getSessionsByUserIdAndDateRangeControllerFactory;
