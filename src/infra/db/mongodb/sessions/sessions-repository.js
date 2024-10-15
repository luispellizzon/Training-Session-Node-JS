const MongoHelper = require('../helpers/MongoHelper');
const MongoQueryBuilder = require('../helpers/MongoQueryBuilder');
const { ObjectId } = require('mongodb');

class SessionsRepository {
  async create(session) {
    const sessionsCollection = await MongoHelper.getCollection('sessions');
    await sessionsCollection.insertOne({
      ...session,
      user_id: session.user_id,
      createdAt: new Date(),
    });
  }

  async loadById(session_id) {
    const sessionsCollection = await MongoHelper.getCollection('sessions');
    const session = await sessionsCollection.findOne({
      _id: ObjectId.createFromHexString(session_id),
    });
    return MongoHelper.mapObjectId(session);
  }

  async update({ session_id, sessionFields }) {
    const sessionsCollection = await MongoHelper.getCollection('sessions');
    const updatedSession = await sessionsCollection.findOneAndUpdate(
      {
        _id: ObjectId.createFromHexString(session_id),
      },
      {
        $set: {
          bookingDate: new Date(sessionFields.bookingDate),
          facilities: sessionFields.facilities,
          updatedAt: new Date(),
        },
      },
      {
        upsert: true,
        returnDocument: 'after',
      }
    );
    return MongoHelper.mapObjectId(updatedSession);
  }

  async delete(session_id) {
    const sessionsCollection = await MongoHelper.getCollection('sessions');
    await sessionsCollection.deleteOne({
      _id: ObjectId.createFromHexString(session_id),
    });
  }

  async loadByUserIdAndDate(user_id, bookedDate) {
    const sessionsCollection = await MongoHelper.getCollection('sessions');
    const session = await sessionsCollection.findOne({
      user_id,
      bookingDate: new Date(bookedDate),
    });
    return MongoHelper.mapObjectId(session);
  }

  async loadByUserId(user_id) {
    const sessionsCollection = await MongoHelper.getCollection('sessions');
    const sessions = await sessionsCollection.find({ user_id }).toArray();
    return sessions.map((session) => MongoHelper.mapObjectId(session));
  }

  async loadAll() {
    const sessionsCollection = await MongoHelper.getCollection('sessions');
    const queryBuilder = new MongoQueryBuilder();
    const query = queryBuilder
      .group({
        _id: '$bookingDate',
        sessions: {
          $push: {
            user_id: '$user_id',
            facilities: '$facilities',
          },
        },
        facilities: {
          $addToSet: '$facilities',
        },
      })
      .project({
        _id: 0,
        bookingDate: '$_id',
        sessions: 1,
        facilities: {
          $reduce: {
            input: '$facilities',
            initialValue: [],
            in: { $setUnion: ['$$value', '$$this'] },
          },
        },
      })
      .sort({ bookingDate: 1 })
      .build();
    const sessions = await sessionsCollection.aggregate(query).toArray();
    return sessions;
  }
}

module.exports = SessionsRepository;
