const JwtAdapter = require('../../../../infra/cryptography/jwt/jwt-adapter');
const UsersMongoRepository = require('../../../../infra/db/mongodb/account/users-repository');
const AuthMiddleware = require('../../../../presentation/middlewares/auth/auth-middleware');
const DbLoadUserByAccessToken = require('../../../../data/use-cases/users/db-load-user-by-access-token');

const authMiddlewareFactory = (role) => {
  const decrypter = new JwtAdapter(process.env.JWT_SECRET);
  const loadAccountByIdRepository = new UsersMongoRepository();
  const loadUserByAccessToken = new DbLoadUserByAccessToken(
    decrypter,
    loadAccountByIdRepository
  );
  return new AuthMiddleware(loadUserByAccessToken, role);
};

module.exports = authMiddlewareFactory;
