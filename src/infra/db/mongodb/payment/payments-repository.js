const MongoHelper = require('../helpers/MongoHelper');

class PaymentsRepository {
  async create(payment) {
    const paymentsCollection = await MongoHelper.getCollection('payments');
    const { insertedId } = await paymentsCollection.insertOne(payment);
    return insertedId;
  }
}

module.exports = PaymentsRepository;
