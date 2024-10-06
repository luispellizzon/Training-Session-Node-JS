const DbLoadSessionsByUserId = require("../../../../../data/use-cases/sessions/db-load-sessions-by-user-id")
const GetUserSessionsController = require("../../../../../presentation/controllers/sessions/get-sessions-by-user-id-controller")
const SessionsRepository = require("../../../../../infra/db/mongodb/sessions/sessions-repository")

const getSessionsByUserIdControllerFactory = () => {
    const loadSessionsByUserIdRepository = new SessionsRepository()
    const loadSessionsByUserId = new DbLoadSessionsByUserId(loadSessionsByUserIdRepository)
    const controller = new GetUserSessionsController(loadSessionsByUserId)
    return controller
}

module.exports = getSessionsByUserIdControllerFactory