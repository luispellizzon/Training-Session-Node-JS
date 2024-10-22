class DbLoadSessionByUserIdAndDateRange {
  #loadSessionByUserIdAndDateRepository;
  constructor(loadSessionByUserIdAndDateRepository) {
    this.#loadSessionByUserIdAndDateRepository = loadSessionByUserIdAndDateRepository;
  }

  async loadByUserIdAndDateRange(user_id, dateRange) {
    return await this.#loadSessionByUserIdAndDateRepository.loadByUserIdAndDateRange(
      user_id,
      dateRange
    );
  }
}

module.exports = DbLoadSessionByUserIdAndDateRange;
