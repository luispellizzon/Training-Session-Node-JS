const { serverError, success } = require('../../helpers/http-helper');

class GetAllSessions {
  #loadAllSessions;
  constructor(loadAllSessions) {
    this.#loadAllSessions = loadAllSessions;
  }

  // eslint-disable-next-line no-unused-vars
  async handle(request) {
    try {
      const sessions = await this.#loadAllSessions.loadAll();
      return success(sessions);
    } catch (error) {
      return serverError(error);
    }
  }
}

module.exports = GetAllSessions;
