
class DbAuthentication{
    #loadAccountByEmailRepository;
    #hashComparer
    #encrypter
  constructor (
    loadAccountByEmailRepository,
    hashComparer,
    encrypter
  ) {
    this.#loadAccountByEmailRepository = loadAccountByEmailRepository
    this.#hashComparer = hashComparer
    this.#encrypter = encrypter
  }

  async auth (authCredentials){
    const { email, password } = authCredentials
    const account = await this.#loadAccountByEmailRepository.loadByEmail(email)
    if (!account) {
      return null
    }

    const isPasswordValid = await this.#hashComparer.compare(password, account.password)
    if (!isPasswordValid) {
      return null
    }

    const accessToken = await this.#encrypter.encrypt({
      _id: account._id,
      role: account.role
    })

    delete account.password

    const userCredentials = {
      ...account,
      accessToken
    }
    return userCredentials
  }
}

module.exports = DbAuthentication