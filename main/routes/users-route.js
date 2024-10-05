const expressRouterAdapter = require("../adapters/express-router-adapter")
// const loginController = require("../../presentation/controllers/users/login-controller")
const registerUserControllerFactory = require("../factories/controllers/users/register/register-account-controller-factory")

module.exports = (router) => {
    // router.post("/login", expressRouterAdapter(loginController))
    router.post("/register", expressRouterAdapter(registerUserControllerFactory()))
}