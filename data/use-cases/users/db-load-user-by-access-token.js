
class DbLoadUserByAccessToken {
    #decrypter
    #loadUserByIdRepository
    constructor(decrypter, loadUserByIdRepository) {
        this.#decrypter = decrypter
        this.#loadUserByIdRepository = loadUserByIdRepository
    }

    async loadByAccessToken(accessToken) {
        const { user_id, role } = await this.#decrypter.decrypt(accessToken)
        const user = await this.#loadUserByIdRepository.loadById(user_id)
        if (!user || user.role !== role) {
            return null
        }
        return user   
    }
}

module.exports = DbLoadUserByAccessToken