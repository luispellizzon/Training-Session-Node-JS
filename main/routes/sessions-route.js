const expressMiddlewareAdapter = require("../adapters/express-middleware-adapter")
const expressRouterAdapter = require("../adapters/express-router-adapter")
const getUserSessionsControllerFactory = require("../factories/controllers/sessions/get/get-user-sessions-controller-factory")
const createSessionControllerFactory = require("../factories/controllers/sessions/create/create-session-controller-factory")
const updateSessionControllerFactory = require("../factories/controllers/sessions/update/update-session-controller-factory")
const deleteSessionControllerFactory = require("../factories/controllers/sessions/delete/delete-session-controller-factory")
const authMiddlewareFactory = require("../factories/middlewares/auth/auth-middleware-factory")

module.exports = (router) => {
    router.get("/sessions", expressMiddlewareAdapter(authMiddlewareFactory("user")), expressRouterAdapter(getUserSessionsControllerFactory()))
    router.post("/sessions/create", expressMiddlewareAdapter(authMiddlewareFactory("user")), expressRouterAdapter(createSessionControllerFactory()))
    router.patch("/sessions/:session_id", expressMiddlewareAdapter(authMiddlewareFactory("user")), expressRouterAdapter(updateSessionControllerFactory()))
    router.delete("/sessions/:session_id", expressMiddlewareAdapter(authMiddlewareFactory("user")), expressRouterAdapter(deleteSessionControllerFactory()))
}