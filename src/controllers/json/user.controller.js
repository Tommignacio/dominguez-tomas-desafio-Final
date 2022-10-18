const Service = require("../../api/services/index.service");
const Repository = require("../../models/repositories/index.repository");
const STATUS = require("../../utils/constants/status.constants");
const env = require("../../utils/config/env.config");
const { apiResponse } = require("../../utils/response.utils");
const sendEmail = require("../../utils/sendEmail.utils");

const repo = new Repository();
const service = new Service();

class UserController {
	async getUser(req, res, next) {
		const { OK, NOT_AUTHORIZED } = STATUS;
		const { idUser } = req.params;
		try {
			if (idUser) {
				const userFound = await repo.user.get({ id: idUser });
				if (userFound._id.toString() == req.user?._id.toString())
					return res.status(OK.code).json(apiResponse(userFound, OK.code));
				else {
					const message = `You are not authorized to view this user.`;
					return res
						.status(NOT_AUTHORIZED.code)
						.json(apiResponse(message, NOT_AUTHORIZED.code));
				}
			}
			res.status(OK.code).json(apiResponse(await repo.user.get({}), OK.code));
		} catch (error) {
			next(error);
		}
	}

	async postUser(req, res, next) {
		const { CREATED, BAD_REQUEST } = STATUS;
		let idCart;
		let idUser;
		try {
			const { user, cart, error } = await service.user.signup(
				req.body.email,
				req.body,
				req.body,
				!env.CREATE_CART_TOGETHER_WITH_USER
			);

			idCart = cart?._id;
			idUser = user?._id;
			// console.log(idCart, idUser);
			if (error)
				return res
					.status(BAD_REQUEST.code)
					.json(
						apiResponse(
							"An error occurred while creating the user.",
							BAD_REQUEST.code
						)
					);
			await sendEmail({ user }, `Nuevo registro`);
			if (!env.CREATE_CART_TOGETHER_WITH_USER) {
				const response = { copyIdUser: user._id };
				return res
					.status(CREATED.code)
					.json(apiResponse(response, CREATED.code));
			}
			res.status(CREATED.code).json(apiResponse(user, CREATED.code));
		} catch (error) {
			await (async () => {
				await service.user.unregistered(idUser, idCart);
				next(error);
			})();
		}
	}

	async putUser(req, res, next) {
		const { code: status } = STATUS.ACEPTED;
		const {
			params: { idUser },
			body,
		} = req;
		try {
			const response = await service.user.update(idUser, body);
			res.status(status).json(apiResponse(response, status));
		} catch (error) {
			next(error);
		}
	}

	async deleteUser(req, res, next) {
		const { code: status } = STATUS.ACEPTED;
		const { idUser } = req.params;
		try {
			const response = await repo.user.delete(idUser);
			res.status(status).json(apiResponse(response, status));
		} catch (error) {
			next(error);
		}
	}
}
module.exports = new UserController();
