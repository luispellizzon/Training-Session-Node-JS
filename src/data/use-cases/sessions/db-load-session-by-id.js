class DbLoadSessionById {
  #loadSessionByIdRepository;
  constructor(loadSessionByIdRepository) {
    this.#loadSessionByIdRepository = loadSessionByIdRepository;
  }

  async loadById(session_id) {
    return await this.#loadSessionByIdRepository.loadById(session_id);
  }
}

module.exports = DbLoadSessionById;
