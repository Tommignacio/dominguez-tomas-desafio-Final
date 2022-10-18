const { model } = require("mongoose");

class MongoCrud {
  constructor(collection, schema) {
    this.model = model(collection, schema);
  }

  async create(data) {
    return await this.model(data).save();
  }

  async readAll(filter, populate) {
    if(populate) return await this.model.find(filter, { __v: 0 }).populate(populate);
    return await this.model.find(filter, { __v: 0 }).lean();
  }
  async readOne(filter, populate) {
    if(populate) return await this.model.findOne(filter, { __v: 0 }).populate(populate);
    return await this.model.findOne(filter, { __v: 0 }).lean();
  }

  async update(filter, data) {
    return await this.model.updateOne(filter, { $set: data }).lean();
  }

  async delete(filter) {
    return await this.model.deleteOne(filter);
  }
}

module.exports = MongoCrud;