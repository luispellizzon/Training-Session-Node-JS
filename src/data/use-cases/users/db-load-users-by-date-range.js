class DbLoadUsersByDateRange {
  #loadUsersByDateRangeRepository;
  constructor(loadUsersByDateRangeRepository) {
    this.#loadUsersByDateRangeRepository = loadUsersByDateRangeRepository;
  }

  async loadByDateRange(startDate, endDate) {
    return await this.#loadUsersByDateRangeRepository.loadByDateRange(startDate, endDate);
  }
}

module.exports = DbLoadUsersByDateRange;
