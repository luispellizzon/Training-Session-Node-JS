class DbRegisterAccount {
  #role = 'user';
  #loadAccountByEmailRepository;
  #hasher;
  #encrypter;
  #idGenerator;
  #registerAccountRepository;
  constructor(
    loadAccountByEmailRepository,
    hasher,
    encrypter,
    idGenerator,
    registerAccountRepository
  ) {
    this.#loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.#hasher = hasher;
    this.#encrypter = encrypter;
    this.#idGenerator = idGenerator;
    this.#registerAccountRepository = registerAccountRepository;
  }

  async register(accountData) {
    const isAccount = await this.#loadAccountByEmailRepository.loadByEmail(accountData.email);
    if (isAccount) {
      return null;
    }
    const hashedPassword = await this.#hasher.hash(accountData.password);
    delete accountData.passwordConfirmation;

    const _id = this.#idGenerator.generate();

    const account = await this.#registerAccountRepository.register({
      ...accountData,
      _id,
      password: hashedPassword,
      role: this.#role,
      createdAt: new Date(),
    });

    const accessToken = await this.#encrypter.encrypt({
      user_id: account._id,
      role: account.role,
    });

    return { ...account, accessToken };
  }
}

module.exports = DbRegisterAccount;
