const { MongoClient } = require('mongodb');

class MongoHelper {
  static client = null;
  static uri = null;

  static async connect(uri) {
    this.uri = uri;
    this.client = await MongoClient.connect(uri);
  }

  static async disconnect() {
    if (this.client) {
      await this.client.close();
    }
    this.client = null;
  }

  static async getCollection(collection) {
    if (!this.client?.db()) {
      await this.connect(this.uri);
    }
    return this.client.db().collection(collection);
  }
}

module.exports = MongoHelper;
