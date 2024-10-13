const { serverError, badRequest, success } = require('../../helpers/http-helper');

class GetApprenticesByDateRangeController {
  #validator;
  #loadUsersByDateRange;
  constructor(validator, loadUsersByDateRange) {
    this.#validator = validator;
    this.#loadUsersByDateRange = loadUsersByDateRange;
  }

  async handle(request) {
    try {
      const error = this.#validator.validate(request.query);
      if (error) {
        return badRequest(error);
      }
      const { startDate, endDate } = request.query;
      const apprentices = await this.#loadUsersByDateRange.loadByDateRange(startDate, endDate);
      return success(apprentices);
    } catch (error) {
      return serverError(error);
    }
  }
}

module.exports = GetApprenticesByDateRangeController;
