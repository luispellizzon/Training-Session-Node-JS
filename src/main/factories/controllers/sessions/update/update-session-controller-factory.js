const UpdateSessionByUserIdController = require('../../../../../presentation/controllers/sessions/update-session-by-user-id');
const SessionsRepository = require('../../../../../infra/db/mongodb/sessions/sessions-repository');
const DbLoadSessionById = require('../../../../../data/use-cases/sessions/db-load-session-by-id');
const DbLoadSessionByUserIdAndDate = require('../../../../../data/use-cases/sessions/db-load-session-by-user-id-and-date');
const DbUpdateSession = require('../../../../../data/use-cases/sessions/db-update-session');
const updateSessionControllerValidatorFactory = require('./update-session-controller-validator-factory');

const updateSessionControllerFactory = () => {
  const loadSessionByIdRepository = new SessionsRepository();
  const loadSessionById = new DbLoadSessionById(loadSessionByIdRepository);
  const loadSessionByUserIdAndDateRepository = new SessionsRepository();
  const loadSessionByUserIdAndDate = new DbLoadSessionByUserIdAndDate(
    loadSessionByUserIdAndDateRepository
  );
  const updateSessionRepository = new SessionsRepository();
  const updateSession = new DbUpdateSession(updateSessionRepository);
  const validator = updateSessionControllerValidatorFactory();
  return new UpdateSessionByUserIdController(
    validator,
    loadSessionById,
    loadSessionByUserIdAndDate,
    updateSession
  );
};

module.exports = updateSessionControllerFactory;
