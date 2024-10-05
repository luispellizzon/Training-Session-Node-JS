const MongoHelper = require("../../../helpers/MongoHelper")
const {ObjectId} = require("mongodb")

class UsersMongoRepository {
    async register (credentials){
      const usersCollection = await MongoHelper.getCollection('users')
      const { insertedId } = await usersCollection.insertOne(credentials)
      const user = { _id: insertedId.toString(), ...credentials }
      return user
    }
  
    async loadByEmail (email){
      const usersCollection = await MongoHelper.getCollection('users')
      const user = await usersCollection.findOne({ email })
      return MongoHelper.mapObjectId(user)
    }
  
    async loadById (userId){
      const usersCollection = await MongoHelper.getCollection('users')
      const user = await usersCollection.findOne({ _id: new ObjectId(userId) })
      return MongoHelper.mapObjectId(user)
    }
  
    async deleteById (userId) {
      const usersCollection = await MongoHelper.getCollection('users')
      const deleteResult = await usersCollection.deleteOne({ _id: new ObjectId(userId) })
      return deleteResult.deletedCount === 1
    }
}
  
module.exports = UsersMongoRepository