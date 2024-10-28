const { UserNotFoundError } = require('../../errors');
const { serverError, success, notFound, badRequest } = require('../../helpers/http-helper');

class GetSessionsByUserIdAndDateRangeController {
  #validator;
  #loadUserById;
  #loadSessionsByUserIdAndDateRange;
  constructor(validator, loadUserById, loadSessionsByUserIdAndDateRange) {
    this.#validator = validator;
    this.#loadUserById = loadUserById;
    this.#loadSessionsByUserIdAndDateRange = loadSessionsByUserIdAndDateRange;
  }

  async handle(request) {
    try {
      const { user_id } = request.params;
      const isUser = await this.#loadUserById.loadById(user_id);
      if (!isUser) {
        return notFound(new UserNotFoundError());
      }

      const { from, to } = request.body;
      const error = await this.#validator.validate({ from, to });
      if (error) {
        return badRequest(error);
      }
      const sessions = await this.#loadSessionsByUserIdAndDateRange.loadByUserIdAndDateRange(
        user_id,
        { from, to }
      );
      return success({
        username: isUser.username,
        ...sessions,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}

module.exports = GetSessionsByUserIdAndDateRangeController;
