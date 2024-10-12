const {
  badRequest,
  serverError,
  success,
  forbidden,
} = require('../../helpers/http-helper');
const { InvalidParamError, AccessDeniedError } = require('../../errors');

class UpdateSessionByUserIdController {
  #validator;
  #loadSessionById;
  #updateSession;
  constructor(validator, loadSessionById, updateSession) {
    this.#validator = validator;
    this.#loadSessionById = loadSessionById;
    this.#updateSession = updateSession;
  }

  async handle(request) {
    try {
      const {
        params: { session_id },
        body: sessionFields,
        user_id,
      } = request;
      const isSession = await this.#loadSessionById.loadById(session_id);

      if (!isSession) return forbidden(new InvalidParamError('survey_id'));

      if (isSession.user_id !== user_id)
        return forbidden(new AccessDeniedError());
      const error = this.#validator.validate(sessionFields);

      if (error) {
        return badRequest(error);
      }

      const updatedSession = await this.#updateSession.update({
        session_id,
        sessionFields,
      });
      return success(updatedSession);
    } catch (error) {
      return serverError(error);
    }
  }
}

module.exports = UpdateSessionByUserIdController;
