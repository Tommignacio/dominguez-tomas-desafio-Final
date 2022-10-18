const ContainerMongo = require("../mongo.container");

class UserMongoDao extends ContainerMongo {
  static #instance;
  constructor(collection, schema) {
    if(!UserMongoDao.#instance) {
      super(collection, schema);
      UserMongoDao.#instance = this;
      return this;
    } else return UserMongoDao.#instance;
  }

  async getByEmail(email) {
    return await this.model.readOne({ email });
  }
}

module.exports = UserMongoDao;