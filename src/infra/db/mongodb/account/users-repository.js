const MongoHelper = require("../helpers/MongoHelper")
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
  
    async loadById (user_id){
      const usersCollection = await MongoHelper.getCollection('users')
      const user = await usersCollection.findOne({ _id: ObjectId.createFromHexString(user_id) })
      return MongoHelper.mapObjectId(user)
    }
}
  
module.exports = UsersMongoRepository