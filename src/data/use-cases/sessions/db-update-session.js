class DbUpdateSession {
  #updateSessionRepository;
  constructor(updateSessionRepository) {
    this.#updateSessionRepository = updateSessionRepository;
  }

  async update(newSessionUpdates) {
    return await this.#updateSessionRepository.update(newSessionUpdates);
  }
}

module.exports = DbUpdateSession;
