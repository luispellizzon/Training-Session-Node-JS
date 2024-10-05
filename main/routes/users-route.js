const expressRouterAdapter = require("../adapters/express-router-adapter")
// const loginController = require("../../presentation/controllers/users/login-controller")
const loginControllerFactory = require("../factories/controllers/users/login/login-controller-factory")
const registerUserControllerFactory = require("../factories/controllers/users/register/register-account-controller-factory")

module.exports = (router) => {
    router.post("/login", expressRouterAdapter(loginControllerFactory()))
    router.post("/signup", expressRouterAdapter(registerUserControllerFactory()))
}