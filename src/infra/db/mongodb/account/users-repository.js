const MongoHelper = require('../helpers/MongoHelper');
const MongoQueryBuilder = require('../helpers/MongoQueryBuilder');
const { ObjectId } = require('mongodb');

class UsersMongoRepository {
  async register(credentials) {
    const usersCollection = await MongoHelper.getCollection('users');
    const { insertedId } = await usersCollection.insertOne(credentials);
    const user = MongoHelper.mapObjectId({ _id: insertedId.toString(), ...credentials });
    return user;
  }

  async loadByEmail(email) {
    const usersCollection = await MongoHelper.getCollection('users');
    const user = await usersCollection.findOne({ email });
    return MongoHelper.mapObjectId(user);
  }

  async loadById(user_id) {
    const usersCollection = await MongoHelper.getCollection('users');
    const user = await usersCollection.findOne({
      _id: ObjectId.createFromHexString(user_id),
    });
    return MongoHelper.mapObjectId(user);
  }

  async loadByDateRange(startDate, endDate) {
    const collection = await MongoHelper.getCollection('users');
    const query = new MongoQueryBuilder()
      .match({
        role: 'user',
        createdAt: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      })
      .lookup({
        from: 'sessions',
        foreignField: 'user_id',
        localField: '_id',
        as: 'sessions',
      })
      .project({
        _id: 0,
        user_id: { $toString: '$_id' },
        username: '$username',
        email: '$email',
        createdAt: '$createdAt',
        sessions: {
          $map: {
            input: '$sessions',
            as: 'session',
            in: {
              bookingDate: '$$session.bookingDate',
              facilities: '$$session.facilities',
              session_id: { $toString: '$$session._id' },
              createdAt: '$$session.createdAt',
            },
          },
        },
      })
      .sort({ createdAt: -1 })
      .build();

    const users = await collection.aggregate(query).toArray();
    return users;
  }
}

module.exports = UsersMongoRepository;
