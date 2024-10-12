const {
  badRequest,
  serverError,
  noContent,
  forbidden,
} = require('../../helpers/http-helper');
const { AlreadyExistsError } = require('../../errors');

class RegisterUserController {
  #validator;
  #registerAccountUseCase;
  constructor(validator, registerAccountUseCase) {
    this.#validator = validator;
    this.#registerAccountUseCase = registerAccountUseCase;
  }

  async handle(request) {
    try {
      const error = this.#validator.validate(request.body);
      if (error) {
        return badRequest(error);
      }

      const account = await this.#registerAccountUseCase.register(request.body);
      if (!account) {
        return forbidden(new AlreadyExistsError('email'));
      }

      return noContent();
    } catch (error) {
      return serverError(error);
    }
  }
}

module.exports = RegisterUserController;
