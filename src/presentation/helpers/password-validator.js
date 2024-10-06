
class PasswordValidator{
    #passwordRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    isValid(value) {
        return this.#passwordRegex.test(value)
    }
}

module.exports = PasswordValidator