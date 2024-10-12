const { serverError, success } = require('../../helpers/http-helper');

class GetSessionsByUserIdController {
  #loadSessionsByUserId;
  constructor(loadSessionsByUserId) {
    this.#loadSessionsByUserId = loadSessionsByUserId;
  }

  async handle(request) {
    try {
      const user_id = request.user_id;
      const sessions = await this.#loadSessionsByUserId.loadByUserId(user_id);
      return success(sessions);
    } catch (error) {
      return serverError(error);
    }
  }
}

module.exports = GetSessionsByUserIdController;
