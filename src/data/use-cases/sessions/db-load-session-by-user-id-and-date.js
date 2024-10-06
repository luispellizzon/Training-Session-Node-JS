
class DbLoadSessionByUserIdAndDate {
    #loadSessionByUserIdAndDateRepository
    constructor (loadSessionByUserIdAndDateRepository) {
      this.#loadSessionByUserIdAndDateRepository = loadSessionByUserIdAndDateRepository
    }

    async loadByUserIdAndDate (user_id, bookedDate){
      return await this.#loadSessionByUserIdAndDateRepository.loadByUserIdAndDate(user_id, bookedDate)
    }
}

module.exports = DbLoadSessionByUserIdAndDate