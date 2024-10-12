const UsersMongoRepository = require('../../../../../infra/db/mongodb/account/users-repository');
const DbLoadUserById = require('../../../../../data/use-cases/users/db-load-user-by-id');
const LoginByAccessTokenController = require('../../../../../presentation/controllers/users/login-by-access-token-controller');

const loginByTokenControllerFactory = () => {
  const loadUserByIdRepository = new UsersMongoRepository();
  const loadUserById = new DbLoadUserById(loadUserByIdRepository);
  return new LoginByAccessTokenController(loadUserById);
};

module.exports = loginByTokenControllerFactory;
