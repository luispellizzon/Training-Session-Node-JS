const {
  badRequest,
  serverError,
  noContent,
  forbidden,
} = require('../../helpers/http-helper');
const { SessionAlreadyExistsError } = require('../../errors');
class CreateSessionController {
  #validator;
  #loadSessionByUserIdAndDate;
  #createSession;
  constructor(validator, loadSessionByUserIdAndDate, createSession) {
    this.#validator = validator;
    this.#loadSessionByUserIdAndDate = loadSessionByUserIdAndDate;
    this.#createSession = createSession;
  }

  async handle(request) {
    try {
      const user_id = request.user_id;
      const error = this.#validator.validate(request.body);

      if (error) {
        return badRequest(error);
      }

      const { bookingDate } = request.body;

      const isBookingExists =
        await this.#loadSessionByUserIdAndDate.loadByUserIdAndDate(
          user_id,
          bookingDate
        );
      if (isBookingExists) {
        return forbidden(new SessionAlreadyExistsError());
      }

      await this.#createSession.create({
        ...request.body,
        user_id,
      });
      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

module.exports = CreateSessionController;
