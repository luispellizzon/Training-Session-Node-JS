const SessionsRepository = require('../../../../../infra/db/mongodb/sessions/sessions-repository');
const GetAllSessions = require('../../../../../presentation/controllers/sessions/get-all-sessions');
const DbLoadAllSessions = require('../../../../../data/use-cases/sessions/db-load-all-sessions');

const getAllSessionsControllerFactory = () => {
  const loadAllSessionsRepository = new SessionsRepository();
  const loadAllSessions = new DbLoadAllSessions(loadAllSessionsRepository);
  const controller = new GetAllSessions(loadAllSessions);
  return controller;
};

module.exports = getAllSessionsControllerFactory;
