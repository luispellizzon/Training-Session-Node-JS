const {
  serverError,
  forbidden,
  noContent,
} = require('../../helpers/http-helper');
const { InvalidParamError, AccessDeniedError } = require('../../errors');

class DeleteSessionByUserIdController {
  #loadSessionById;
  #deleteSession;
  constructor(loadSessionById, deleteSession) {
    this.#loadSessionById = loadSessionById;
    this.#deleteSession = deleteSession;
  }

  async handle(request) {
    try {
      const {
        params: { session_id },
        user_id,
      } = request;
      const isSession = await this.#loadSessionById.loadById(session_id);

      if (!isSession) return forbidden(new InvalidParamError('survey_id'));

      if (isSession.user_id !== user_id)
        return forbidden(new AccessDeniedError());

      await this.#deleteSession.delete(session_id);
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

module.exports = DeleteSessionByUserIdController;
