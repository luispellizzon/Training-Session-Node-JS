const expressMiddlewareAdapter = require("../adapters/express-middleware-adapter")
const expressRouterAdapter = require("../adapters/express-router-adapter")
const getUserSessionsFactory = require("../factories/controllers/sessions/get/get-user-sessions-controller-factory")
const createSessionFactory = require("../factories/controllers/sessions/create/create-session-controller-factory")
const authMiddlewareFactory = require("../factories/middlewares/auth/auth-middleware-factory")
const getAllSessionsControllerFactory = require("../factories/controllers/sessions/get/get-all-sessions-controller-factory")

module.exports = (router) => {
    router.get("/sessions", expressMiddlewareAdapter(authMiddlewareFactory("user")), expressRouterAdapter(getUserSessionsFactory()))
    router.get("/sessions/all", expressMiddlewareAdapter(authMiddlewareFactory("admin")), expressRouterAdapter(getAllSessionsControllerFactory()))
    router.post("/sessions/create", expressMiddlewareAdapter(authMiddlewareFactory("user")), expressRouterAdapter(createSessionFactory()))
}