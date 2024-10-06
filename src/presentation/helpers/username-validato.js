class UsernameValidator{
    #usernameRegex = /^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)/;
    isValid(value) {
        return this.#usernameRegex.test(value)
    }
}

module.exports = UsernameValidator