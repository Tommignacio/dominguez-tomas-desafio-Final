const STATUS = require("../../../utils/constants/status.constants");
const CustomError = require("../../../utils/error.utils");
const daosFactory = require("../../daos/daos.factory");

const notFoundMsg = (msg, data) => `The ${msg.toUpperCase()}: "${data}" entered does not match any order in our database.`;
const internalErrorMsg = (notReturn) => `An error occurred using dao [order], did not return [${notReturn}]`;

class OrderRepository {
	constructor() {
    this.dao = { 
      order: daosFactory().order
    };
	}

  async get({ id, email, all }) {
    if(id) {
      if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all id"));
      const response = await this.dao.order.getById(id);
      if(response) return response;
      else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("id", id));
    }
    if(email) {
      if(all) return await this.dao.order.getAllByEmail(email);
      throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("email"));
    }
    return await this.dao.order.getAll();
  }

  async populate({ id, all }, dataToPopulate) {
    if(dataToPopulate == "items") {
      if(id) {
        if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all id"));
        const response = await this.dao.order.populateItemBy({ _id: id });
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("id", id));
      }
      return await this.dao.order.populateItemAll();
    }
    throw new CustomError(STATUS.INTERNAL_ERROR, "You have not entered a data to search in the database [order]");
  }

  async create(order) {
    return await this.dao.order.save(order);
  }


	async update(id, order) {
    await this.get({ id });
		await this.dao.order.updateById(id, order);
    return "Updated order";
	}

	async delete(id) {
    await this.get({ id });
		await this.dao.order.deleteById(id);
    return "Deleted order";
	}
}

module.exports = OrderRepository;