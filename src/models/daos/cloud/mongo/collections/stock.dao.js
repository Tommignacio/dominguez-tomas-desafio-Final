const ContainerMongo = require("../mongo.container");

class StockMongoDao extends ContainerMongo {
  static #instance;
  constructor(collection, schema) {
    if(!StockMongoDao.#instance) {
      super(collection, schema);
      StockMongoDao.#instance = this;
      return this;
    } else return StockMongoDao.#instance;
  }

  async getByTitle(title) {
    return await this.model.readOne({ title });
  }

  async getAllByPrice(price) {
    return await this.model.readAll({ price: { $lt: price } });
  }

  async getAllByCategory(category) {
    return await this.model.readAll({ category });
  }

  async getItemById(_id) {
    return await this.model.readOne({ _id }, "items");
  }

  async getItemByTitle(title) {
    return await this.model.readOne({ title }, "items");
  }
}

module.exports = StockMongoDao;