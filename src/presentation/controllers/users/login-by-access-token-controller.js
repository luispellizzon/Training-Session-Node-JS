const { success, serverError } = require('../../helpers/http-helper');

class LoginByAccessTokenController {
  #loadUserById;
  constructor(loadUserById) {
    this.#loadUserById = loadUserById;
  }

  async handle(request) {
    try {
      const user_id = request.user_id;
      const userCredentials = await this.#loadUserById.loadById(user_id);

      return success(userCredentials);
    } catch (e) {
      return serverError(e);
    }
  }
}

module.exports = LoginByAccessTokenController;
