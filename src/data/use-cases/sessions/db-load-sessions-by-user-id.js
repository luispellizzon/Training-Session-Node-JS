
class DbLoadSessionsByUserId {
    #loadSessionByUserIdRepository
    constructor (loadSessionByUserIdRepository) {
      this.#loadSessionByUserIdRepository = loadSessionByUserIdRepository
    }

    async loadByUserId (user_id){
      return await this.#loadSessionByUserIdRepository.loadByUserId(user_id)
    }
}

module.exports = DbLoadSessionsByUserId