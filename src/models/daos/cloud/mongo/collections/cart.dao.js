const ContainerMongo = require("../mongo.container");

class CartMongoDao extends ContainerMongo {
  static #instance;
  constructor(collection, schema) {
    if(!CartMongoDao.#instance) {
      super(collection, schema);
      CartMongoDao.#instance = this;
      return this;
    } else return CartMongoDao.#instance;
  }

  async getByAuthor(author) {
    return await this.model.readOne({ author });
  }

  async populateAuthorBy(filter) {
    return await this.model.readOne(filter, "author");
  }

  async populateAuthorAll() {
    return await this.model.readAll({}, "author");
  }

  async populateItemBy(filter) {
    return await this.model.readOne(filter, "items.product");
  }

  async populateItemAll() {
    return await this.model.readAll({}, "items.product");
  }

  async populateAllBy(filter) {
    return await this.model.readOne(filter, "author items.product");
  }

  async populateAll() {
    return await this.model.readAll({}, "author items.product");
  }
}

module.exports = CartMongoDao;