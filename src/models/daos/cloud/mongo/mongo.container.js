const MongoCrud = require("./mongo.crud");

class ContainerMongo {
  constructor(collection, schema) {
    this.model = new MongoCrud(collection, schema);
  }

  async getAll() {
    return await this.model.readAll({});
  }

  async getById(_id) {
    return await this.model.readOne({ _id });
  }

  async save(data) {
    return await this.model.create(data);
  }

  async updateById(_id, data) {
    return await this.model.update({ _id }, data);
  }

  async deleteById(_id) {
    return await this.model.delete({ _id });
  }
}

module.exports = ContainerMongo;