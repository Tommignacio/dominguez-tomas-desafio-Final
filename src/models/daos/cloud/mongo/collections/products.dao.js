const ContainerMongo = require("../mongo.container");

class ProductMongoDao extends ContainerMongo {
  static #instance;
  constructor(collection, schema) {
    if(!ProductMongoDao.#instance) {
      super(collection, schema);
      ProductMongoDao.#instance = this;
      return this;
    } else return ProductMongoDao.#instance;
  }

  async getAllByTitle(title) {
    return await this.model.readAll({ title });
  }
}

module.exports = ProductMongoDao;