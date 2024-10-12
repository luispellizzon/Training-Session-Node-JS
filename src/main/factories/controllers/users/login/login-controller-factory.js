const UsersMongoRepository = require('../../../../../infra/db/mongodb/account/users-repository.js');
const DbAuthentication = require('../../../../../data/use-cases/auth/db-authentication');
const BcryptAdapter = require('../../../../../infra/cryptography/bcrypt/bcrypt-adapter.js');
const JwtAdapter = require('../../../../../infra/cryptography/jwt/jwt-adapter.js');
const loginControllerValidatorFactory = require('./login-controller-validator-factory.js');
const LoginController = require('../../../../../presentation/controllers/users/login-controller.js');

const loginControllerFactory = () => {
  const loadAccountByEmailRepository = new UsersMongoRepository();
  const hashComparer = new BcryptAdapter();
  const encrypter = new JwtAdapter(process.env.JWT_SECRET);
  const authentication = new DbAuthentication(
    loadAccountByEmailRepository,
    hashComparer,
    encrypter
  );
  const validator = loginControllerValidatorFactory();
  const controller = new LoginController(validator, authentication);
  return controller;
};

module.exports = loginControllerFactory;
