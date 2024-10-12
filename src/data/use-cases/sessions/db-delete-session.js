class DbDeleteSession {
  #deleteSessionRepository;
  constructor(deleteSessionRepository) {
    this.#deleteSessionRepository = deleteSessionRepository;
  }

  async delete(session_id) {
    return await this.#deleteSessionRepository.delete(session_id);
  }
}

module.exports = DbDeleteSession;
