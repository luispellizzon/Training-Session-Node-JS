const DeleteSessionByUserIdController = require("../../../../../presentation/controllers/sessions/delete-session-by-user-id")
const SessionsRepository = require("../../../../../infra/db/mongodb/sessions/sessions-repository")
const DbLoadSessionById = require('../../../../../data/use-cases/sessions/db-load-session-by-id')
const DbDeleteSession = require('../../../../../data/use-cases/sessions/db-delete-session')

const deleteSessionControllerFactory = () => {
    const loadSessionByIdRepository = new SessionsRepository()
    const loadSessionById = new DbLoadSessionById(loadSessionByIdRepository)
    const deleteSessionRepository = new SessionsRepository()
    const deleteSession = new DbDeleteSession(deleteSessionRepository)
    return new DeleteSessionByUserIdController(loadSessionById, deleteSession)
}

module.exports = deleteSessionControllerFactory