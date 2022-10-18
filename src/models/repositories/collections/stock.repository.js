const STATUS = require("../../../utils/constants/status.constants");
const CustomError = require("../../../utils/error.utils");
const daosFactory = require("../../daos/daos.factory");

const notFoundMsg = (msg, data) => `The ${msg.toUpperCase()}: "${data}" entered does not match any stock in our database.`;
const internalErrorMsg = (notReturn) => `An error occurred using dao [stock], did not return [${notReturn}]`;

class StockRepository {
	constructor() {
    this.dao = { 
      product: daosFactory().product, 
      stock: daosFactory().stock 
    };
	}

  async get({ id, title, price, category, all }) {
    if(id) {
      if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all id"));
      const response = await this.dao.stock.getById(id);
      if(response) return response;
      else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("id", id));
    }
    if(title) {
      if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all title"));
      const response = await this.dao.stock.getByTitle(title);
      if(response) return response;
      else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("name", title));
    }
    if(price) {
      if(all) return await this.dao.stock.getAllByPrice(price);
      throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("price"));
    }
    if(category) {
      if(all) return await this.dao.stock.getAllByCategory(category);
      throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("catgory"));
    }
    return await this.dao.stock.getAll();
  }

  async populate({ id, title, all }, dataToPopulate) {
    if(dataToPopulate == "items") {
      if(id) {
        if(all) throw new CustomError(STATUS.INTERNAL_ERROR, "An error occurred using dao [stock], did not return [all id]");
        const response = await this.dao.stock.getItemById(id);
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("id", id));
      }
      if(title) {
        if(all) throw new CustomError(STATUS.INTERNAL_ERROR, "An error occurred using dao [stock], did not return [all title]");
        const response = await this.dao.stock.getItemByTitle(title);
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("title", title));
      }
    }
    throw new CustomError(STATUS.INTERNAL_ERROR, "You have not entered a data to search in the database [stock]");
  }

  async create(stock) {
    return await this.dao.stock.save(stock);
  }

	async update(id, stock) {
    await this.get({ id });
		await this.dao.stock.updateById(id, stock);
    return "Updated product stock";
	}

	async delete(id) {
    const productFound = await this.get({ id });
    await productFound.items.forEach(async idProd => await this.dao.product.deleteById(idProd));
		await this.dao.stock.deleteById(id);
    return "Deleted product stock";
	}
}

module.exports = StockRepository;