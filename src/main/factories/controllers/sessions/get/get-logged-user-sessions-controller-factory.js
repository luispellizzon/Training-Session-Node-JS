const DbLoadSessionsByUserId = require('../../../../../data/use-cases/sessions/db-load-sessions-by-user-id');
const GetSessionsByLoggedUserIdController = require('../../../../../presentation/controllers/sessions/get-sessions-by-logged-user-id-controller');
const SessionsRepository = require('../../../../../infra/db/mongodb/sessions/sessions-repository');

const getSessionsByLoggedUserIdControllerFactory = () => {
  const loadSessionsByUserIdRepository = new SessionsRepository();
  const loadSessionsByUserId = new DbLoadSessionsByUserId(loadSessionsByUserIdRepository);
  const controller = new GetSessionsByLoggedUserIdController(loadSessionsByUserId);
  return controller;
};

module.exports = getSessionsByLoggedUserIdControllerFactory;
