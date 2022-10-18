const STATUS = require("../../../utils/constants/status.constants");
const CustomError = require("../../../utils/error.utils");
const daosFactory = require("../../daos/daos.factory");

const notFoundMsg = (msg, data) => `The ${msg.toUpperCase()}: "${data}" entered does not match any product in our database.`;
const internalErrorMsg = (notReturn) => `An error occurred using dao [product], did not return [${notReturn}]`;

class ProductRepository {
	constructor() {
    this.dao = { 
      product: daosFactory().product
    };
	}

  async get({ id, title, all }) {
    if(id) {
      if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all id"));
      const response = await this.dao.product.getById(id);
      if(response) return response;
      else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("id", id));
    }
    if(title) {
      if(all) return await this.dao.product.getAllByTitle(title);
      throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("title"));
    }
    return await this.dao.product.getAll();
  }

  async create(product) {
    return await this.dao.product.save(product);
  }


	async update(id, product) {
    await this.get({ id });
		await this.dao.product.updateById(id, product);
    return "Updated product";
	}

	async delete(id) {
    await this.get({ id });
		await this.dao.product.deleteById(id);
    return "Deleted product";
	}
}

module.exports = ProductRepository;