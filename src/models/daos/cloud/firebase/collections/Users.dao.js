import MongoDBContainer from "../containers/Mongodb.container.js";
import UserSchema from "../schemas/User.schema.js";
import STATUS from "../../utils/constants/api.constants.js";
import formatResponse from "../../utils/formatter/send.format.js";
import { errorLogger } from "../../utils/config/logger.config.js";

const collection = "User";

class UsersDao extends MongoDBContainer {
	static instance;
	constructor() {
		if (!UsersDao.instance) {
			super(collection, UserSchema);
			UsersDao.instance = this;
			return this;
		} else return UsersDao.instance;
	}

	async createUser(userItem) {
		try {
			const user = new this.model(userItem);
			await user.save();
			return user;
		} catch (error) {
			throw new Error(error);
		}
	}

	async getByEmail(email) {
		try {
			const document = await this.model.findOne({ email }, { __v: 0 });
			if (!document) {
				const message = `Wrong username or password`;
				throw new Error(
					JSON.stringify(formatResponse(true, STATUS.NOT_FOUND, message))
				);
			} else return document;
		} catch (error) {
			throw new Error(
				JSON.stringify(
					formatResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
		}
	}

	async updateById(id, myCart) {
		try {
			const document = await this.model.updateOne({ id }, { myCart }).lean();
			if (!document) {
				const message = `Resource with id ${id} does not exist in our records`;
				errorLogger.error(
					JSON.stringify(formatResponse(true, STATUS.NOT_FOUND, message))
				);
				throw new Error(
					JSON.stringify(formatResponse(true, STATUS.NOT_FOUND, message))
				);
			} else return document;
		} catch (error) {
			errorLogger.error(
				JSON.stringify(
					formatResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
			throw new Error(
				JSON.stringify(
					formatResponse(true, STATUS.INTERNAL_ERROR, error.message)
				)
			);
		}
	}
}

export default UsersDao;
