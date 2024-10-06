
class EmailValidatorAdapter{
    #emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    isValid(value) {
        return this.#emailRegex.test(value)
    }
}

module.exports = EmailValidatorAdapter