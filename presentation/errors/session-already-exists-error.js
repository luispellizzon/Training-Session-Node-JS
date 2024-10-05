class SessionAlreadyExistsError extends Error{
    constructor() {
        super()
        this.name = "SessionAlreadyExistsError"
        this.message = `You already have a session booked at this time.`
    }
}

module.exports = SessionAlreadyExistsError