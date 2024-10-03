class InvalidParam extends Error{
    constructor(param) {
        super()
        this.name = "InvalidParamError"
        this.message = `Invalid Param: ${param}`
    }
}

module.exports = InvalidParam