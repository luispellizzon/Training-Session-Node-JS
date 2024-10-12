class DbRegisterAccount {
  #role = 'user';
  #loadAccountByEmailRepository;
  #hasher;
  #registerAccountRepository;
  constructor(loadAccountByEmailRepository, hasher, registerAccountRepository) {
    this.#loadAccountByEmailRepository = loadAccountByEmailRepository;
    this.#hasher = hasher;
    this.#registerAccountRepository = registerAccountRepository;
  }

  async register(accountData) {
    const isAccount = await this.#loadAccountByEmailRepository.loadByEmail(
      accountData.email
    );
    if (isAccount) {
      return null;
    }
    const hashedPassword = await this.#hasher.hash(accountData.password);
    delete accountData.passwordConfirmation;

    const account = await this.#registerAccountRepository.register({
      ...accountData,
      password: hashedPassword,
      role: this.#role,
      createdAt: new Date(),
    });

    return account;
  }
}

module.exports = DbRegisterAccount;
