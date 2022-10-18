const STATUS = require("../../../utils/constants/status.constants");
const CustomError = require("../../../utils/error.utils");
const daosFactory = require("../../daos/daos.factory");

const notFoundMsg = (msg, data) => `The ${msg.toUpperCase()}: "${data}" entered does not match any message in our database.`;
const internalErrorMsg = (notReturn) => `An error occurred using dao [message], did not return [${notReturn}]`;

class MessageRepository {
	constructor() {
    this.dao = { 
      message: daosFactory().message
    };
	}
  
  async get({ id, author, all }) {
    if(id) {
      if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all id"));
      const response = await this.dao.message.getById(id);
      if(response) return response;
      else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("id", id));
    }
    if(author) {
      if(all) return await this.dao.message.getAuthorAll({ author });
      throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("author"));
    }
    return await this.dao.message.getAll();
  }

  async populate({ id, author, email, renderUserAccount, all }, dataToPopulate) {
    if(dataToPopulate == "author") {
      if(id) {
        if(all) return await this.dao.message.populateAuthorAllBy({ _id: id });
        const response = await this.dao.message.populateAuthorBy({ _id: id });
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("id", id));
      }
      if(author) {
        if(all) return await this.dao.message.populateAuthorAllBy({ author });
        const response = await this.dao.message.populateAuthorBy({ author });
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("author", author));
      }
      if(email) {
        if(all) return await this.dao.message.populateAuthorAllBy({ email });
        const response = await this.dao.message.populateAuthorBy({ email });
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("email", email));
      }
      if(renderUserAccount) {
        if(all) return await this.dao.message.populateAuthorAllBy({ renderUserAccount });
        const response = await this.dao.message.populateAuthorBy({ renderUserAccount });
        if(response) return response;
        else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("renderUserAccount", renderUserAccount));
      }
      return await this.dao.message.populateAuthorAll();
    }
    throw new CustomError(STATUS.INTERNAL_ERROR, "You have not entered a data to search in the database [message]");
  }

  async create(message) {
    return await this.dao.message.save(message);
  }


	async update(id, message) {
    await this.get({ id });
		await this.dao.message.updateById(id, message);
    return "Updated message";
	}

	async delete(id) {
    await this.get({ id });
		await this.dao.message.deleteById(id);
    return "Deleted message";
	}
}

module.exports = MessageRepository;