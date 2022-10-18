const STATUS = require("../../../utils/constants/status.constants");
const CustomError = require("../../../utils/error.utils");
const daosFactory = require("../../daos/daos.factory");

const notFoundMsg = (msg, data) => `The ${msg.toUpperCase()}: "${data}" entered does not match any cart in our database.`;
const internalErrorMsg = (notReturn) => `An error occurred using dao [cart], did not return [${notReturn}]`;

class CartRepository {
	constructor() {
    this.dao = { 
      cart: daosFactory().cart
    };
	}

  async get({ id, author, all }) {
    if(id) {
      if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all id"));
      const response = await this.dao.cart.getById(id);
      if(response) return response;
      else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("id", id));
    }
    if(author) {
      if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all author"));
      const response = await this.dao.cart.getByAuthor(author);
      if(response) return response;
      else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("author", author));
    }
    return await this.dao.cart.getAll();
  }

  async populate({ id, author, all }, dataToPopulate) {
    if(dataToPopulate == "author") {
      if(id) {
        if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all id"));
        const response = await this.dao.cart.populateAuthorBy({ _id: id });
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("id", id));
      }
      if(author) {
        if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all author"));
        const response = await this.dao.cart.populateAuthorBy({ author });
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("author", author));
      }
      return await this.dao.cart.populateAuthorAll();
    } else if(dataToPopulate == "items") {
      if(id) {
        if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all id"));
        const response = await this.dao.cart.populateItemBy({ _id: id });
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("id", id));
      }
      if(author) {
        if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all author"));
        const response = await this.dao.cart.populateItemBy({ author });
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("author", author));
      }
      return await this.dao.cart.populateItemAll();
    } else if(dataToPopulate == "all") {
      if(id) {
        if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all id"));
        const response = await this.dao.cart.populateAllBy({ _id: id});
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("id", id));
      }
      if(author) {
        if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all author"));
        const response = await this.dao.cart.populateAllBy({ author });
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("author", author));
      }
      return await this.dao.cart.populateAll();
    }
    throw new CustomError(STATUS.INTERNAL_ERROR, "You have not entered a data to search in the database [cart]");
  }

  async create(cart) {
    return await this.dao.cart.save(cart);
  }


	async update(id, cart) {
    await this.get({ id });
		await this.dao.cart.updateById(id, cart);
    return "Updated cart";
	}

	async delete(id) {
    await this.get({ id });
		await this.dao.cart.deleteById(id);
    return "Deleted cart";
	}
}

module.exports = CartRepository;