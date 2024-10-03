const MissingParamError = require("../errors/missing-param-error")
const isEmailValid = require("../helpers/is-email-valid")
const InvalidParamError = require("../errors/invalid-param-error")
const isPasswordValid = require("../helpers/is-password-valid")
const loginParamsValidator = (params) => {
    const requiredFields = ["email", "password"]

    for(const field of requiredFields) {
        if(!params[field])
            return new MissingParamError(field)
    }

    if (!isEmailValid(params.email)){
        return new InvalidParamError("email")
    }

    if (!isPasswordValid(params.password)) {
        return new InvalidParamError("password")
    }

    return null
}

module.exports = loginParamsValidator