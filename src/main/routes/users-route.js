const expressRouterAdapter = require('../adapters/express-router-adapter');
const expressMiddlewareAdapter = require('../adapters/express-middleware-adapter');
const loginControllerFactory = require('../factories/controllers/users/login/login-controller-factory');
const registerUserControllerFactory = require('../factories/controllers/users/register/register-account-controller-factory');
const loginByAccessTokenControllerFactory = require('../factories/controllers/users/login/login-by-access-token-factory');
const authMiddlewareFactory = require('../factories/middlewares/auth/auth-middleware-factory');
const getUsersByDateRangeControllerFactory = require('../factories/controllers/users/get-users/get-users-by-date-range-controller-factory');

module.exports = (router) => {
  router.post('/login', expressRouterAdapter(loginControllerFactory()));
  router.post('/signup', expressRouterAdapter(registerUserControllerFactory()));
  router.get(
    '/me',
    expressMiddlewareAdapter(authMiddlewareFactory(null)),
    expressRouterAdapter(loginByAccessTokenControllerFactory())
  );
  router.get(
    '/users',
    expressMiddlewareAdapter(authMiddlewareFactory('admin')),
    expressRouterAdapter(getUsersByDateRangeControllerFactory())
  );
};
