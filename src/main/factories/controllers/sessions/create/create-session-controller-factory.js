const DbLoadSessionByUserIdAndDate = require('../../../../../data/use-cases/sessions/db-load-session-by-user-id-and-date');
const createSessionControllerValidatorFactory = require('./create-session-controller-validator-factory');
const CreateSessionController = require('../../../../../presentation/controllers/sessions/create-session-controller');
const SessionsRepository = require('../../../../../infra/db/mongodb/sessions/sessions-repository');
const DbCreateSession = require('../../../../../data/use-cases/sessions/db-create-session');

const createSessionControllerFactory = () => {
  const loadSessionByUserIdAndDateRepository = new SessionsRepository();
  const loadSessionByUserIdAndDate = new DbLoadSessionByUserIdAndDate(
    loadSessionByUserIdAndDateRepository
  );
  const createSessionRepository = new SessionsRepository();
  const createSession = new DbCreateSession(createSessionRepository);
  const validators = createSessionControllerValidatorFactory();
  const controller = new CreateSessionController(
    validators,
    loadSessionByUserIdAndDate,
    createSession
  );
  return controller;
};

module.exports = createSessionControllerFactory;
