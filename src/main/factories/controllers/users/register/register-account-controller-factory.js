const BcryptAdapter = require('../../../../../infra/cryptography/bcrypt/bcrypt-adapter');
const UsersRepository = require('../../../../../infra/db/mongodb/account/users-repository');
const DbRegisterAccount = require('../../../../../data/use-cases/users/db-register-account');
const registerAccountValidatorFactory = require('./register-account-controller-validator-factory');
const RegisterUserController = require('../../../../../presentation/controllers/users/register-controller');

const registerAccountControllerFactory = () => {
  const loadAccountByEmailRepository = new UsersRepository();
  const hasher = new BcryptAdapter();
  const registerAccountRepository = new UsersRepository();
  const registerAccountUseCase = new DbRegisterAccount(
    loadAccountByEmailRepository,
    hasher,
    registerAccountRepository
  );
  const validators = registerAccountValidatorFactory();
  const controller = new RegisterUserController(
    validators,
    registerAccountUseCase
  );
  return controller;
};

module.exports = registerAccountControllerFactory;