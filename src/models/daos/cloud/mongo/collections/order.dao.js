const ContainerMongo = require("../mongo.container");

class OrderMongoDao extends ContainerMongo {
  static #instance;
  constructor(collection, schema) {
    if(!OrderMongoDao.#instance) {
      super(collection, schema);
      OrderMongoDao.#instance = this;
      return this;
    } else return OrderMongoDao.#instance;
  }

  async getAllByEmail(author) {
    return await this.model.readAll({ author });
  }

  async populateItemBy(filter) {
    return await this.model.readOne(filter, "items.products");
  }

  async populateItemAll() {
    return await this.model.readAll({}, "items.products");
  }
}

module.exports = OrderMongoDao;