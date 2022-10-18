const STATUS = require("../../../utils/constants/status.constants");
const CustomError = require("../../../utils/error.utils");
const daosFactory = require("../../daos/daos.factory");

const notFoundMsg = (msg, data) => `The ${msg.toUpperCase()}: "${data}" entered does not match any user in our database.`;
const internalErrorMsg = (notReturn) => `An error occurred using dao [user], did not return [${notReturn}]`;

class UserRepository {
	constructor() {
    this.dao = { 
      user: daosFactory().user
    };
	}

  async get({ id, email, all }) {
    if(id) {
      if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all id"));
      const response = await this.dao.user.getById(id);
      if(response) return response;
      else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("id", id));
    }
    if(email) {
      if(all) throw new CustomError(STATUS.INTERNAL_ERROR, internalErrorMsg("all email"));
      const response = await this.dao.user.getByEmail(email);
      if(response) return response;
      else throw new CustomError(STATUS.NOT_FOUND, notFoundMsg("email", email));
    }
    return await this.dao.user.getAll();
  }

  async create(data) {
    return await this.dao.user.save(data);
  }

	async update(id, data) {
    await this.get({ id });
		await this.dao.user.updateById(id, data);
    return "Updated user";
	}

	async delete(id) {
    await this.get({ id });
		await this.dao.user.deleteById(id);
    return "Deleted user";
	}
}

module.exports = UserRepository;