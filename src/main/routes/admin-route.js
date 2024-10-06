const expressMiddlewareAdapter = require("../adapters/express-middleware-adapter")
const expressRouterAdapter = require("../adapters/express-router-adapter")
const authMiddlewareFactory = require("../factories/middlewares/auth/auth-middleware-factory")
const getAllSessionsControllerFactory = require("../factories/controllers/sessions/get/get-all-sessions-controller-factory")

module.exports = (router) => {
    router.get("/admin/sessions", expressMiddlewareAdapter(authMiddlewareFactory("admin")), expressRouterAdapter(getAllSessionsControllerFactory()))
}