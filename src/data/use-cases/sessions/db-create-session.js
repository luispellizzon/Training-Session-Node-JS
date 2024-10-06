
class DbCreateSession {
    #createSessionRepository
  constructor (createSessionRepository) {
    this.#createSessionRepository = createSessionRepository
  }

  async create (session){
    return await this.#createSessionRepository.create({...session, bookingDate: new Date(session.bookingDate)})
  }
}

module.exports = DbCreateSession