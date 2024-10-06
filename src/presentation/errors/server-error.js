class ServerError extends Error {
    constructor (stack) {
        super()
        this.name = 'ServerError'
        this.message = 'Internal Server Error'
        this.stack = stack
    }
}

module.exports = ServerError