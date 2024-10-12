class DbLoadUserById {
  #loadUserByIdRepository;
  constructor(loadUserByIdRepository) {
    this.#loadUserByIdRepository = loadUserByIdRepository;
  }

  async loadById(userId) {
    return await this.#loadUserByIdRepository.loadById(userId);
  }
}

module.exports = DbLoadUserById;
