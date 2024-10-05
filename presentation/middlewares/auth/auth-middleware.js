const { unauthorized, forbidden, success, serverError } = require("../../helpers/http-helper");
const {AccessDeniedError} = require("../../errors/")


class AuthMiddleware{
    #role
    #loadUserByAccessToken
    constructor (loadUserByAccessToken, role) {
        this.#loadUserByAccessToken = loadUserByAccessToken
        this.#role = role
    }

    async handle(httpRequest) {
        try {
            const authHeader = httpRequest.headers["authorization"]
            if (!authHeader) {
                return unauthorized()
            }
            
            const accessToken = authHeader.replace("Bearer", "").trim()
            if (!accessToken) {
                return unauthorized()
            }

            const user = await this.#loadUserByAccessToken.loadByAccessToken(accessToken)
            if (!user || user.role !== this.#role) {
                return forbidden(new AccessDeniedError())
            }

            return success({ user_id:user._id })
        } catch (error) {
            return serverError(error)
        }
  }
}

module.exports = AuthMiddleware