const expressMiddlewareAdapter = require("../adapters/express-middleware-adapter")
const expressRouterAdapter = require("../adapters/express-router-adapter")
const createSessionFactory = require("../factories/controllers/sessions/create/create-session-controller-factory")
const authMiddlewareFactory = require("../factories/middlewares/auth/auth-middleware-factory")

module.exports = (router) => {
    router.post("/sessions/create", expressMiddlewareAdapter(authMiddlewareFactory("user")), expressRouterAdapter(createSessionFactory()))
}