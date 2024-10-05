class AccessDeniedError extends Error {
    constructor () {
      super()
        this.name = 'AccessDeniedError'
        this.message = 'You do not have permission to access this resource'
    }
}

module.exports = AccessDeniedError