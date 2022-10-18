const ContainerMongo = require("../mongo.container");

class MessageMongoDao extends ContainerMongo {
  static #instance;
  constructor(collection, schema) {
    if(!MessageMongoDao.#instance) {
      super(collection, schema);
      MessageMongoDao.#instance = this;
      return this;
    } else return MessageMongoDao.#instance;
  }

  async getAuthorAll(filter) {
    return await this.model.readAll(filter);
  }

  async populateAuthorAll() {
    return await this.model.readAll({}, "author");
  }

  async populateAuthorAllBy(filter) {
    return await this.model.readAll(filter, "author");
  }

  async populateAuthorBy(filter) {
    return await this.model.readOne(filter, "author");
  }
}

module.exports = MessageMongoDao;