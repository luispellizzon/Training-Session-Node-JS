const {badRequest, unauthorized, success, serverError} = require("../../helpers/http-helper")
class LoginController{
    #validator
    #authentication
  constructor (validator, authentication) {
    this.#validator = validator
    this.#authentication = authentication
  }

  async handle (request){
    try {
      const error = this.#validator.validate(request.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = request.body
      const userCredentials = await this.#authentication.auth({ email, password })
      if (!userCredentials?.accessToken) {
        return unauthorized()
      }
        
      return success(userCredentials)
    } catch (e) {
      console.log(e)
      return serverError(e)
    }
  }
}

module.exports = LoginController