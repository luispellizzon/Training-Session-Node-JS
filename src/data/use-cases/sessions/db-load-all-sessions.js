
class DbLoadAllSessions {
    #loadAllSessionsRepository
  constructor (loadAllSessionsRepository) {
    this.#loadAllSessionsRepository = loadAllSessionsRepository
  }

  async loadAll (){
    return await this.#loadAllSessionsRepository.loadAll()
  }
}

module.exports = DbLoadAllSessions