const MongoHelper = require("../../../helpers/MongoHelper")
const MongoQueryBuilder = require("../../../helpers/MongoQueryBuilder")
const {ObjectId} = require("mongodb")

class UsersMongoRepository {
  async create (session){
      const sessionsCollection = await MongoHelper.getCollection('sessions')
      await sessionsCollection.insertOne({...session, user_id: ObjectId.createFromHexString(session.user_id), createdAt: new Date()})
  }

  async loadByUserIdAndDate (user_id, bookedDate){
    const sessionsCollection = await MongoHelper.getCollection('sessions')
    const session = await sessionsCollection.findOne({ user_id: ObjectId.createFromHexString(user_id), bookingDate: new Date(bookedDate) })
    return MongoHelper.mapObjectId(session)
  }

  async loadByUserId (user_id){
    const sessionsCollection = await MongoHelper.getCollection('sessions')
    const sessions = await sessionsCollection.find({ user_id: ObjectId.createFromHexString(user_id) }).toArray()
    return sessions.map(session => MongoHelper.mapObjectId(session))
  }
  
  async loadAll() {
    const sessionsCollection = await MongoHelper.getCollection('sessions')
    const queryBuilder = new MongoQueryBuilder();
    const query = queryBuilder
      .group({
        _id: "$bookingDate", 
        sessions: {
          $push: {
            user_id: "$user_id",  
            facilities: "$facilities" 
          }
        }
      })
      .project({
        _id: 0, 
        bookingDate: "$_id", 
        sessions: 1 
      })
      .sort({ bookingDate: 1 }) 
      .build();
    const sessions = await sessionsCollection.aggregate(query).toArray()
    return sessions
  }
}
  
module.exports = UsersMongoRepository