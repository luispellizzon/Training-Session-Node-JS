class MongoQueryBuilder {
  #query = [];

  match(data) {
    this.#query.push({ $match: data });
    return this;
  }

  lookup(data) {
    this.#query.push({ $lookup: data });
    return this;
  }

  unwind(data) {
    this.#query.push({ $unwind: data });
    return this;
  }

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
