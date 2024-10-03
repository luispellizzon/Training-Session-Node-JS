const isPasswordValid = (string) => {
    const passwordRegex = /.{6,}/;
    return passwordRegex.test(string)
}

module.exports = isPasswordValid