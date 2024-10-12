class MongoQueryBuilder {
  #query = [];

  group(data) {
    this.#query.push({ $group: data });
    return this;
  }

  sort(data) {
    this.#query.push({ $sort: data });
    return this;
  }

  project(data) {
    this.#query.push({ $project: data });
    return this;
  }

  build() {
    return this.#query;
  }
}

module.exports = MongoQueryBuilder;
