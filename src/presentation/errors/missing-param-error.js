class MissingParamError extends Error{
    constructor(param) {
        super()
        this.name = "MissingParamError"
        this.message = `Missing Param: ${param}`
    }
}

module.exports = MissingParamError